"""Migrate ecosolutions.co.za (Plone) content into JSON + local media.

usage: python3 -I migrate.py <paths.txt> <out_content_dir> <out_media_dir> <cache_dir>
"""
import sys, os, re, json, ssl, hashlib, html, subprocess, urllib.request, urllib.parse
import concurrent.futures as cf
from html.parser import HTMLParser

CTX = ssl._create_unverified_context()
BASE = "https://ecosolutions.co.za"
paths_file, out_dir, media_dir, cache_dir = sys.argv[1:5]
os.makedirs(out_dir, exist_ok=True); os.makedirs(media_dir, exist_ok=True); os.makedirs(cache_dir, exist_ok=True)

def fetch(url, binary=False):
    key = os.path.join(cache_dir, hashlib.md5(url.encode()).hexdigest())
    if os.path.exists(key):
        data = open(key, "rb").read()
    else:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (migration)"})
        with urllib.request.urlopen(req, context=CTX, timeout=40) as r:
            data = r.read()
        open(key, "wb").write(data)
    return data if binary else data.decode("utf-8", "ignore")

ALLOWED = {"p","h2","h3","h4","h5","ul","ol","li","a","strong","b","em","i","img","table","thead","tbody","tr","td","th",
           "blockquote","figure","figcaption","br","iframe","sup","sub","hr","video","source"}
VOID = {"img","br","hr","source"}
IFRAME_OK = ("youtube.com","youtube-nocookie.com","google.com/maps","vimeo.com","player.vimeo.com","facebook.com/plugins","ipcamlive","rtsp.me","angelcam","soundcloud","anchor.fm","spotify")

class Grab(HTMLParser):
    """Collect meta + the raw markup of section#content-core."""
    def __init__(s):
        super().__init__(convert_charrefs=False)
        s.meta = {}; s.title = ""; s.desc = ""; s._in = None; s.depth = 0; s.core = []; s.lead = None
    def handle_starttag(s, t, a):
        d = dict(a)
        if t == "meta":
            k = d.get("name") or d.get("property")
            if k: s.meta[k] = d.get("content", "")
        if s.depth:
            s.depth += t not in VOID
            s.core.append(s.get_starttag_text()); return
        if t == "section" and d.get("id") == "content-core":
            s.depth = 1; return
        cls = d.get("class", "") or ""
        if t == "h1" and "documentFirstHeading" in cls: s._in = "title"
        if t == "div" and "documentDescription" in cls: s._in = "desc"
        if t == "img" and "newsImage" in cls and not s.lead: s.lead = d.get("src")
    def handle_startendtag(s, t, a):
        if s.depth: s.core.append(s.get_starttag_text()); return
        s.handle_starttag(t, a)
    def handle_endtag(s, t):
        if s.depth:
            if t not in VOID: s.depth -= 1
            if s.depth == 0: return
            s.core.append(f"</{t}>"); return
        if t in ("h1", "div"): s._in = None
    def handle_data(s, d):
        if s.depth: s.core.append(d); return
        if s._in == "title": s.title += d
        if s._in == "desc": s.desc += d
    def handle_entityref(s, n):
        x = f"&{n};"
        if s.depth: s.core.append(x)
        elif s._in == "title": s.title += html.unescape(x)
        elif s._in == "desc": s.desc += html.unescape(x)
    def handle_charref(s, n): s.handle_entityref("#" + n)

media_lock_names = {}
def localise_image(src, page_slug):
    if not src: return None
    url = urllib.parse.urljoin(BASE + "/", src)
    if "@@site-logo" in url: return None
    url = urllib.parse.quote(url, safe=":/@%?=&#~+")
    host = urllib.parse.urlparse(url).netloc
    if "ecosolutions.co.za" not in host: return {"src": url, "w": None, "h": None}
    # prefer full-size: Plone scale urls like /@@images/image/preview -> /@@images/image
    url = re.sub(r"/@@images/image/(tile|thumb|mini|preview|large|icon|listing)$", "/@@images/image", url)
    ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower()
    if ext not in (".jpg", ".jpeg", ".png", ".gif", ".webp"): ext = ".jpg"
    name = hashlib.md5(url.encode()).hexdigest()[:10] + ext
    folder = os.path.join(media_dir, page_slug); os.makedirs(folder, exist_ok=True)
    dest = os.path.join(folder, name)
    if not os.path.exists(dest):
        try:
            data = fetch(url, binary=True)
            if len(data) < 200 or data[:1] in (b"{", b"<"): return None
            open(dest, "wb").write(data)
        except Exception as e:
            print("  img fail", url, e, file=sys.stderr); return None
    w = h = None
    try:
        out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", dest], capture_output=True, text=True).stdout
        w = int(re.search(r"pixelWidth: (\d+)", out).group(1)); h = int(re.search(r"pixelHeight: (\d+)", out).group(1))
    except Exception: pass
    return {"src": f"/media/{page_slug}/{name}", "w": w, "h": h}

def norm_link(href):
    if not href: return href
    href = href.strip()
    if href.startswith(("mailto:", "tel:", "#")): return href
    u = urllib.parse.urlparse(urllib.parse.urljoin(BASE + "/", href))
    if u.netloc in ("ecosolutions.co.za", "www.ecosolutions.co.za"):
        p = u.path.rstrip("/") or "/"
        return p + (("#" + u.fragment) if u.fragment else "")
    return href

class Clean(HTMLParser):
    def __init__(s, slug):
        super().__init__(convert_charrefs=True); s.slug = slug; s.out = []; s.stack = []; s.skip = 0; s.images = []
    def handle_starttag(s, t, a):
        d = dict(a)
        if t in ("script", "style"): s.skip += 1; return
        if s.skip: return
        if t == "h1": t = "h2"
        if t == "h6": t = "h5"
        if t not in ALLOWED: return
        attrs = ""
        if t == "a":
            href = norm_link(d.get("href"))
            if not href: return
            if re.search(r"/@@images/|\.(jpe?g|png|gif)(/view)?$", href, re.I) and not href.startswith("http"):
                s.stack.append("a-skip"); return  # lightbox link around image: drop wrapper
            ext = href.startswith("http")
            attrs = f' href="{html.escape(href, quote=True)}"' + (' rel="noopener" target="_blank"' if ext else "")
        elif t == "img":
            info = localise_image(d.get("src"), s.slug)
            if not info: return
            s.images.append(info)
            alt = html.escape(d.get("alt") or d.get("title") or "", quote=True)
            dims = f' width="{info["w"]}" height="{info["h"]}"' if info.get("w") else ""
            cls = d.get("class", "") or ""
            align = " class=\"float-left\"" if "image-left" in cls else (" class=\"float-right\"" if "image-right" in cls else "")
            s.out.append(f'<img src="{info["src"]}" alt="{alt}"{dims}{align} loading="lazy" decoding="async">'); return
        elif t == "iframe":
            src = d.get("src", "")
            if src.startswith("//"): src = "https:" + src
            if not any(k in src for k in IFRAME_OK): s.skip += 1; s.stack.append("iframe-skip"); return
            attrs = f' src="{html.escape(src, quote=True)}" loading="lazy" allowfullscreen'
        elif t in ("video",):
            attrs = ' controls preload="none"'
        elif t == "source":
            src = norm_link(d.get("src", ""))
            if src and not src.startswith("http"): src = BASE + src
            attrs = f' src="{html.escape(src, quote=True)}"'
        elif t in ("td", "th"):
            for k in ("colspan", "rowspan"):
                if d.get(k): attrs += f' {k}="{html.escape(d[k])}"'
        if t in VOID:
            s.out.append(f"<{t}{attrs}>"); return
        s.stack.append(t); s.out.append(f"<{t}{attrs}>")
    def handle_startendtag(s, t, a): s.handle_starttag(t, a)
    def handle_endtag(s, t):
        if t in ("script", "style"): s.skip = max(0, s.skip - 1); return
        if t == "iframe" and "iframe-skip" in s.stack:
            s.stack.remove("iframe-skip"); s.skip = max(0, s.skip - 1); return
        if s.skip: return
        if t == "h1": t = "h2"
        if t == "h6": t = "h5"
        if t == "a" and s.stack and "a-skip" in s.stack:
            # close most recent anchor marker
            for i in range(len(s.stack) - 1, -1, -1):
                if s.stack[i] in ("a", "a-skip"):
                    if s.stack[i] == "a-skip": s.stack.pop(i); return
                    break
        if t not in ALLOWED or t in VOID: return
        if t in s.stack:
            while s.stack:
                x = s.stack.pop()
                if x in ("a-skip", "iframe-skip"): continue
                s.out.append(f"</{x}>")
                if x == t: break
    def handle_data(s, d):
        if not s.skip: s.out.append(html.escape(d, quote=False))
    def result(s):
        while s.stack:
            x = s.stack.pop()
            if x not in ("a-skip", "iframe-skip"): s.out.append(f"</{x}>")
        out = "".join(s.out)
        out = out.replace("\xa0", " ")
        out = re.sub(r"<(p|li|h[2-5]|strong|em|b|i|a)(\s[^>]*)?>\s*</\1>", "", out)  # empties
        out = re.sub(r"<(p|li|h[2-5]|strong|em|b|i)(\s[^>]*)?>\s*</\1>", "", out)
        out = re.sub(r"(<br>\s*){2,}", "<br>", out)
        out = re.sub(r"[ \t]+", " ", out)
        out = re.sub(r"\n\s*\n+", "\n", out)
        return out.strip()

def slugify_path(p):
    return p.strip("/").replace("/", "__") or "home"

def migrate(path):
    try: return _migrate(path)
    except Exception as e: return f"{path} !! FAILED {e!r}"

def _migrate(path):
    url = BASE + path
    raw = fetch(url)
    g = Grab(); g.feed(raw)
    slug = slugify_path(path)
    c = Clean(slug); c.feed("".join(g.core))
    body = c.result()
    lead = None
    og = g.meta.get("og:image") or ""
    if og and "ecosolutions.co.za" in og: lead = localise_image(og, slug)
    elif g.lead: lead = localise_image(g.lead, slug)
    if not lead and c.images: lead = c.images[0]
    title = html.unescape(g.title).strip() or g.meta.get("og:title", "")
    desc = re.sub(r"\s+", " ", html.unescape(g.desc)).strip() or g.meta.get("description", "")
    rec = {
        "path": path, "title": re.sub(r"\s+", " ", title), "description": desc, "html": body,
        "image": lead, "created": g.meta.get("DC.date.created"), "modified": g.meta.get("DC.date.modified"),
        "type": g.meta.get("DC.type"),
    }
    json.dump(rec, open(os.path.join(out_dir, slug + ".json"), "w"), ensure_ascii=False, indent=1)
    return f"{path} :: {rec['title']} :: {len(body)} chars, {len(c.images)} imgs"

paths = [l.strip() for l in open(paths_file) if l.strip()]
with cf.ThreadPoolExecutor(8) as ex:
    for r in ex.map(lambda p: (lambda: migrate(p))() if True else None, paths):
        print(r)

import sys, re, json, html, os, glob, datetime
sys.path.insert(0, os.path.dirname(__file__))
listing_dir, status_file, out_json, media_dir, cache_dir = sys.argv[1:6]
sys.argv = ["x", "/dev/null", "/tmp/unused", media_dir, cache_dir]
import migrate  # reuse fetch/localise
ext = {}
for l in open(status_file):
    p = l.split()
    if len(p) >= 3 and p[1] == "302": ext[p[0]] = p[2]
items = {}
for f in glob.glob(os.path.join(listing_dir, "*.html")):
    raw = open(f, encoding="utf-8", errors="ignore").read()
    for art in re.findall(r'<article class="entry">(.*?)</article>', raw, re.S):
        m = re.search(r'<a href="https://ecosolutions\.co\.za(/news/[^"]+)" class="contenttype-([\w-]+)[^"]*"[^>]*>(.*?)</a>', art, re.S)
        if not m: continue
        path, ctype, title = m.group(1), m.group(2), html.unescape(re.sub(r"\s+", " ", m.group(3))).strip()
        date = re.search(r'itemPublished">([^<]+)<', art); author = re.search(r'itemAuthor">([^<]+)<', art)
        desc = re.search(r'<p class="description">(.*?)</p>', art, re.S)
        img = re.search(r'<img class="image-tile" src="([^"]+)"', art)
        d = None
        if date:
            try: d = datetime.datetime.strptime(date.group(1).strip(), "%d %b, %Y").date().isoformat()
            except ValueError: d = None
        slug = path.split("/news/")[1]
        thumb = None
        if img:
            src = img.group(1).replace("/@@images/image/tile", "/@@images/image/preview")
            r = migrate.localise_image(src, "news-thumbs")
            if r and r.get("w"): thumb = r
        items[path] = {"slug": slug, "path": path, "title": title, "description": html.unescape(re.sub(r"\s+"," ",desc.group(1))).strip() if desc else "",
                       "date": d, "author": author.group(1).strip() if author else None, "kind": "link" if path in ext else "article",
                       "externalUrl": ext.get(path), "image": thumb}
out = sorted(items.values(), key=lambda x: x["date"] or "", reverse=True)
json.dump(out, open(out_json, "w"), ensure_ascii=False, indent=1)
print(len(out), sum(1 for x in out if x["kind"] == "article"), "articles", sum(1 for x in out if x["image"]), "with images")

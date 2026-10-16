import sanitizeHtml from "sanitize-html";
import { localShopHref } from "@/lib/shop-links";

/**
 * Every piece of HTML we didn't write ourselves (Shopify product descriptions,
 * migrated pages and news) passes through here before it is rendered with
 * dangerouslySetInnerHTML. Only plain content markup survives: no scripts,
 * no event handlers, no javascript: links, and iframes only from known players.
 */

const EMBED_HOSTS = [
  "www.youtube.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
  "w.soundcloud.com",
  "open.spotify.com",
  "www.google.com",
  "g2.ipcamlive.com",
];

const base: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "hr", "h2", "h3", "h4", "h5", "strong", "b", "em", "i", "u", "blockquote",
    "ul", "ol", "li", "a", "img", "table", "thead", "tbody", "tr", "th", "td",
  ],
  allowedAttributes: {
    a: ["href", "rel", "target"],
    img: ["src", "alt", "width", "height", "loading", "decoding", "class"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan"],
  },
  allowedClasses: { img: ["float-left", "float-right"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesAppliedToAttributes: ["href", "src"],
  allowProtocolRelative: false,
  transformTags: { a: (tagName, attribs) => ({ tagName, attribs: link(attribs) }) },
};

/**
 * Old Shopify storefront links point at the same product or category on this
 * site instead (in the same tab). Links opening a new tab must not get a
 * handle on this page.
 */
function link(attribs: sanitizeHtml.Attributes): sanitizeHtml.Attributes {
  const local = attribs.href ? localShopHref(attribs.href) : null;
  if (local) {
    const rest: sanitizeHtml.Attributes = { ...attribs, href: local };
    delete rest.target;
    delete rest.rel;
    return rest;
  }
  return attribs.target ? { ...attribs, rel: "noopener noreferrer" } : attribs;
}

/** Shopify product descriptions: text, lists, tables, links. No media. */
export function sanitizeProductHtml(html: string) {
  return sanitizeHtml(html, {
    ...base,
    allowedTags: (base.allowedTags as string[]).filter((t) => t !== "img"),
    allowedAttributes: { a: ["href", "rel"], td: ["colspan", "rowspan"], th: ["colspan", "rowspan"] },
    transformTags: {
      a: (tagName, attribs) => {
        const local = attribs.href ? localShopHref(attribs.href) : null;
        const next: sanitizeHtml.Attributes = local ? { href: local } : { ...attribs, rel: "noopener" };
        return { tagName, attribs: next };
      },
    },
  });
}

/** Migrated pages and news: also images, video and embeds from known players. */
export function sanitizeContentHtml(html: string) {
  return sanitizeHtml(html, {
    ...base,
    allowedTags: [...(base.allowedTags as string[]), "iframe", "video", "source"],
    allowedAttributes: {
      ...base.allowedAttributes,
      iframe: ["src", "loading", "allowfullscreen", "title"],
      video: ["preload", "controls", "poster"],
      source: ["src", "type"],
    },
    allowedIframeHostnames: EMBED_HOSTS,
  });
}

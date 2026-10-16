import sanitizeHtml from "sanitize-html";

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
  // Links opening a new tab must not get a handle on this page.
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: attribs.target ? { ...attribs, rel: "noopener noreferrer" } : attribs,
    }),
  },
};

/** Shopify product descriptions: text, lists, tables, links. No media. */
export function sanitizeProductHtml(html: string) {
  return sanitizeHtml(html, {
    ...base,
    allowedTags: (base.allowedTags as string[]).filter((t) => t !== "img"),
    allowedAttributes: { a: ["href", "rel"], td: ["colspan", "rowspan"], th: ["colspan", "rowspan"] },
    transformTags: { a: sanitizeHtml.simpleTransform("a", { rel: "noopener" }) },
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
    transformTags: {
      ...base.transformTags,
      // Screen readers announce frames by title; migrated embeds rarely have one.
      iframe: (tagName, attribs) => ({ tagName, attribs: { title: "Embedded media", ...attribs } }),
    },
  });
}

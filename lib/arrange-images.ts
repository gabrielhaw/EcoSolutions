/**
 * Lays out photos in migrated page HTML so long pages read like a magazine
 * rather than a column of identical images: single photos alternate right
 * and left with text wrapping round them, and photos big enough to stay
 * sharp across the full width (and not sharing a paragraph with text) run
 * full width.
 * Groups of 2+ photos keep their grid (see .prose-eco in globals.css).
 *
 * Runs before sanitizeContentHtml, which keeps only the float-left /
 * float-right classes it sets.
 */
const WIDE_MIN_PX = 1000;

export function arrangeImages(html: string): string {
  let floats = 0;
  return html.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/g, (para, inner: string) => {
    const imgs = inner.match(/<img\b[^>]*>/g) ?? [];
    if (imgs.length !== 1) return para;
    const img = imgs[0];
    const width = Number(img.match(/\bwidth="(\d+)"/)?.[1] ?? 0);
    const hasText = inner.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim().length > 0;
    const wide = !hasText && width >= WIDE_MIN_PX;
    const cls = wide ? "" : floats++ % 2 === 0 ? "float-right" : "float-left";
    const next = img.replace(/\sclass="[^"]*"/, "").replace(/<img\b/, cls ? `<img class="${cls}"` : "<img");
    return para.replace(img, next);
  });
}

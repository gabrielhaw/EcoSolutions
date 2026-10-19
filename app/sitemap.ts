import type { MetadataRoute } from "next";
import redirects from "@/content/redirects.json";
import { allPages, news } from "@/lib/content";
import { seoFor } from "@/lib/seo";
import { getProducts } from "@/lib/shop";
import { extraSections, sections, site } from "@/lib/site";

const TESTIMONIAL = /^\/testimonials\/.+/;
const REDIRECTED = new Set(redirects.map((r) => r.source));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entry = (path: string, priority: number, lastModified?: string | null): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: lastModified ? new Date(lastModified) : now,
    priority,
  });

  const hubs = [...sections, ...extraSections].map((s) => s.href);
  const money = new Set(sections.flatMap((s) => s.children.map((c) => c.href)));

  const pages = allPages()
    .filter((p) => !p.path.startsWith("/news/") && !TESTIMONIAL.test(p.path) && !hubs.includes(p.path) && !REDIRECTED.has(p.path) && !seoFor(p.path).canonical)
    .map((p) => entry(p.path, money.has(p.path) ? 0.8 : 0.6, p.modified));

  const articles = news
    .filter((n) => n.kind === "article")
    .map((n) => entry(n.path, 0.4, n.date));

  const products = (await getProducts()).map((p) => entry(`/shop/${p.handle}`, 0.7));

  return [
    entry("/", 1),
    entry("/shop", 0.9),
    ...products,
    entry("/contact-us", 0.9),
    entry("/request-a-callback", 0.8),
    entry("/about", 0.7),
    entry("/news", 0.6),
    ...["/owlproject", "/schools", "/our-work/international"].map((p) => entry(p, 0.5)),
    ...hubs.map((h) => entry(h, 0.9)),
    ...pages,
    ...articles,
  ];
}

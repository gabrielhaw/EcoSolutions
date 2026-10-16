import fs from "node:fs";
import path from "node:path";
import newsIndex from "@/content/news-index.json";
import { extraSections, sections, type NavLink, type Section } from "@/lib/site";

export type Img = { src: string; w: number | null; h: number | null };

export type LegacyPage = {
  path: string;
  title: string;
  description: string;
  html: string;
  image: Img | null;
  created: string | null;
  modified: string | null;
  type: string | null;
};

export type NewsItem = {
  slug: string;
  path: string;
  title: string;
  description: string;
  date: string | null;
  author: string | null;
  kind: "article" | "link";
  externalUrl: string | null;
  image: Img | null;
};

const LEGACY_DIR = path.join(process.cwd(), "content", "legacy");

let cache: Map<string, LegacyPage> | null = null;

function load(): Map<string, LegacyPage> {
  if (cache) return cache;
  cache = new Map();
  for (const file of fs.readdirSync(LEGACY_DIR)) {
    if (!file.endsWith(".json")) continue;
    const page = JSON.parse(fs.readFileSync(path.join(LEGACY_DIR, file), "utf8")) as LegacyPage;
    cache.set(page.path, page);
  }
  return cache;
}

export function getPage(p: string): LegacyPage | undefined {
  return load().get(p);
}

export function allPages(): LegacyPage[] {
  return [...load().values()];
}

export const news = newsIndex as NewsItem[];

export function getNewsArticle(slug: string) {
  const item = news.find((n) => n.slug === slug && n.kind === "article");
  const page = getPage(`/news/${slug}`);
  return item && page ? { item, page } : undefined;
}

const allSections: Section[] = [...sections, ...extraSections];

/** Hub paths render as section landing pages rather than legacy folder listings. */
export function getSection(p: string): Section | undefined {
  return allSections.find((s) => s.href === p);
}

/** The section a page belongs to (by URL prefix first, then by IA membership). */
export function sectionFor(p: string): Section | undefined {
  return (
    allSections.find((s) => p.startsWith(s.href + "/")) ??
    allSections.find((s) => s.children.some((c) => c.href === p))
  );
}

export function siblingsFor(p: string, limit = 6): NavLink[] {
  const s = sectionFor(p);
  if (!s) return [];
  return s.children.filter((c) => c.href !== p).slice(0, limit);
}

/** Children found on disk under a path (e.g. bat species, testimonials). */
export function childPages(p: string): LegacyPage[] {
  const depth = p.split("/").length;
  return allPages()
    .filter((pg) => pg.path.startsWith(p + "/") && pg.path.split("/").length === depth + 1)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export type Crumb = { name: string; href: string };

export function breadcrumbsFor(p: string, title: string): Crumb[] {
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }];
  const s = sectionFor(p);
  if (s && s.href !== p) crumbs.push({ name: s.eyebrow, href: s.href });
  const parentPath = p.split("/").slice(0, -1).join("/");
  if (parentPath && parentPath !== s?.href && getPage(parentPath)) {
    crumbs.push({ name: getPage(parentPath)!.title, href: parentPath });
  }
  crumbs.push({ name: title, href: p });
  return crumbs;
}

export function plainText(html: string, max = 160): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

/** Clamp a description to a search-snippet-friendly length. */
export function metaDescription(text: string, max = 158): string {
  return plainText(text, max);
}

/**
 * A meta description from the page's own summary, topped up from its text when
 * the summary is too short to tell searchers what the page covers.
 */
export function describe(summary: string | undefined, html: string): string {
  const s = plainText(summary ?? "", 1000);
  if (s.length >= 70) return metaDescription(s);
  const body = plainText(html, 1000);
  return metaDescription(s && !body.startsWith(s) ? `${s.replace(/[:.]?$/, ".")} ${body}` : body);
}

/**
 * The <title>. The layout appends " | EcoSolutions"; when that would push the
 * title past what Google shows (about 60 characters), the suffix is dropped
 * so the keywords at the start aren't cut off.
 */
export function pageTitle(title: string): string | { absolute: string } {
  return title.length + " | EcoSolutions".length > 60 ? { absolute: title } : title;
}

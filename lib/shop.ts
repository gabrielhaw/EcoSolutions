import snapshot from "@/content/shop-snapshot.json";
import type { LiveVariant } from "@/lib/cart-check";
import { sanitizeProductHtml } from "@/lib/sanitize";
import { DUPLICATE_PRODUCTS } from "@/lib/shop-links";

/**
 * Products come straight from the EcoSolutions Shopify store's public
 * products.json, refreshed hourly. Browsing and the cart live on this site;
 * payment hands over to Shopify's checkout via a cart permalink.
 */
export const SHOP_ORIGIN = "https://shop.ecosolutions.co.za";

type RawProduct = (typeof snapshot.products)[number];

export type Variant = { id: number; title: string; price: number; available: boolean };
export type ProductImage = { src: string; width: number; height: number; alt: string };
export type Category = "owls" | "bats" | "services" | "garden" | "gifts";
export type Product = {
  handle: string;
  title: string;
  category: Category;
  html: string;
  summary: string;
  images: ProductImage[];
  variants: Variant[];
  priceFrom: number;
  poa: boolean;
};

export const categories: { id: Category; label: string; blurb: string }[] = [
  { id: "owls", label: "Owl boxes", blurb: "Boxes, kits and the Owl Box Project package" },
  { id: "bats", label: "Bat houses", blurb: "Slimline, Nursery and Rocket bat houses" },
  { id: "services", label: "Services", blurb: "Consultations, exclusions and annual servicing" },
  { id: "garden", label: "Garden wildlife", blurb: "Homes and feeders for other garden species" },
  { id: "gifts", label: "Gifts", blurb: "Hampers, vouchers and owl goodies" },
];

/** Duplicate listings in the Shopify store, hidden here (see lib/shop-links.ts). */
const HIDDEN = new Set(Object.keys(DUPLICATE_PRODUCTS));

function categorise(p: RawProduct): Category {
  const t = `${p.product_type} ${p.title} ${p.handle}`.toLowerCase();
  if (/service|consult|exclusion|rodent|bats in your roof/.test(t)) return "services";
  if (/hamper|voucher|shirt|purse|scientist/.test(t)) return "gifts";
  if (/bush baby|feeder/.test(t)) return "garden";
  if (/bat/.test(t)) return "bats";
  return "owls";
}

/**
 * Shopify's editor wraps text in nested spans and data attributes; keep only clean markup.
 * Descriptions can be edited by anyone with Shopify access, so they go through the
 * shared allowlist sanitizer rather than being trusted.
 */
function cleanHtml(html: string) {
  return sanitizeProductHtml(html)
    .replace(/<p>\s*(&nbsp;|\u00a0)?\s*<\/p>/g, "")
    .trim();
}

const plain = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

function normalise(p: RawProduct): Product {
  const variants = p.variants.map((v) => ({ id: v.id, title: v.title, price: Number(v.price), available: v.available }));
  const html = cleanHtml(p.body_html ?? "");
  const text = plain(html).replace(/^P\.O\.A\.?\s*/i, "");
  const firstSentences = text.match(/^(.{40,220}?[.!?])(\s|$)/)?.[1] ?? text.slice(0, 180);
  return {
    handle: p.handle,
    title: p.title,
    category: categorise(p),
    html,
    summary: firstSentences,
    images: p.images.map((i) => ({ src: i.src, width: i.width, height: i.height, alt: ("alt" in i && (i.alt as string)) || p.title })),
    variants,
    priceFrom: Math.min(...variants.map((v) => v.price)),
    poa: variants.some((v) => /p\.?o\.?a/i.test(v.title)) || /^<p>P\.O\.A/i.test(html),
  };
}

export async function getProducts(): Promise<Product[]> {
  let raw: RawProduct[] = snapshot.products;
  try {
    const res = await fetch(`${SHOP_ORIGIN}/products.json?limit=250`, { next: { revalidate: 3600 } });
    if (res.ok) raw = ((await res.json()) as { products: RawProduct[] }).products;
  } catch {
    // Shopify unreachable at build time: fall back to the saved snapshot.
  }
  return raw.filter((p) => !HIDDEN.has(p.handle)).map(normalise);
}

/**
 * Every variant as Shopify has it at this moment, for checking a saved cart.
 * Bypasses the hourly cache and never falls back to the snapshot: if Shopify
 * can't be reached or answers oddly this throws, so stale data is never
 * passed off as current stock or pricing.
 */
export async function fetchLiveVariants(): Promise<Map<number, LiveVariant>> {
  const live = new Map<number, LiveVariant>();
  for (let page = 1; page <= 20; page++) {
    const res = await fetch(`${SHOP_ORIGIN}/products.json?limit=250&page=${page}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Shopify products.json answered ${res.status}`);
    const { products } = (await res.json()) as { products?: RawProduct[] };
    if (!Array.isArray(products)) throw new Error("Shopify products.json had no products list");
    for (const p of products) {
      for (const v of p.variants) {
        live.set(v.id, { id: v.id, handle: p.handle, title: p.title, variant: v.title, price: Number(v.price), available: v.available });
      }
    }
    if (products.length < 250) {
      // An empty catalogue is far more likely a glitch than a real store; don't empty carts over it.
      if (live.size === 0) throw new Error("Shopify products.json was empty");
      return live;
    }
  }
  throw new Error("Shopify catalogue larger than expected");
}

export async function getProduct(handle: string) {
  return (await getProducts()).find((p) => p.handle === handle);
}

export const formatRand = (n: number) =>
  `R${n.toLocaleString("en-ZA", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).replace(/ /g, " ")}`;

/** Ask Shopify's CDN for a resized copy (it also serves WebP/AVIF), instead of re-processing large PNGs ourselves. */
export const shopImg = (src: string, width: number) => `${src}${src.includes("?") ? "&" : "?"}width=${width}`;

/** Shopify cart permalink: sends the whole cart straight to checkout. */
export const checkoutUrl = (lines: { id: number; qty: number }[]) =>
  `${SHOP_ORIGIN}/cart/${lines.map((l) => `${l.id}:${l.qty}`).join(",")}`;

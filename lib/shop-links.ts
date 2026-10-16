/**
 * Links into the old Shopify storefront (ecosolutions.myshopify.com or
 * shop.ecosolutions.co.za), mapped to the same thing on this site so browsing
 * stays here. Cart and checkout links are left alone: Shopify handles payment.
 * No imports, so the sanitizer and lib/shop.ts can both use it.
 */

const STOREFRONT = /^(?:www\.)?(?:ecosolutions\.myshopify\.com|shop\.ecosolutions\.co\.za)$/i;

/**
 * Old or duplicate Shopify handles ("copy-of-…" and older listings) → the listing
 * this site shows. The one list for hiding duplicates, redirecting their URLs
 * and rewriting old links.
 */
export const HANDLE_ALIASES: Record<string, string> = {
  "owl-box": "spotted-eagle-owl-box",
  "rocket-bat-hotel": "rocket-bat-box",
  "copy-of-bats-in-your-roof": "bat-exclusion",
  "copy-of-bat-exclusion-consultation-for-residential-properties": "bat-exclusion",
  "copy-of-service-an-existing-owl-box-1": "annual-owl-box-service-1",
  "copy-of-service-your-bat-house": "annual-owl-box-service",
  "copy-of-control-rodents-at-home": "rodent-consultation",
  "bat-boxes-for-homes": "bat-box",
};

/** Products no longer in the store that old newsletters still link to. */
const RETIRED_PRODUCTS: Record<string, string> = {
  "barbet-nesting-log": "/shop?c=garden",
  "suet-ball": "/shop?c=garden",
  "ecosolutions-flasher": "/shop",
};

/** Shopify collections → this site's shop categories (see `categories` in lib/shop.ts). */
const COLLECTIONS: Record<string, string> = {
  owls: "/shop?c=owls",
  bats: "/shop?c=bats",
  services: "/shop?c=services",
  hampers: "/shop?c=gifts",
  birds: "/shop?c=garden",
  frontpage: "/shop",
  all: "/shop",
};

/** Paths that must stay on Shopify: cart, checkout, customer accounts and order status. */
const SHOPIFY_ONLY = /^\/(?:cart|checkouts?|account|orders|\d+\/(?:orders|checkouts))(?:\/|$)/;

/** This site's path for a storefront URL, or null if it isn't one (or must stay on Shopify). */
export function localShopHref(href: string): string | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  if (!STOREFRONT.test(url.hostname) || SHOPIFY_ONLY.test(url.pathname)) return null;
  const path = url.pathname.replace(/\/+$/, "");
  const product = path.match(/^(?:\/collections\/[^/]+)?\/products\/([^/]+)$/)?.[1];
  if (product) {
    const handle = decodeURIComponent(product).toLowerCase();
    return RETIRED_PRODUCTS[handle] ?? `/shop/${HANDLE_ALIASES[handle] ?? handle}`;
  }
  const collection = path.match(/^\/collections\/([^/]+)$/)?.[1];
  if (collection) return COLLECTIONS[collection.toLowerCase()] ?? "/shop";
  if (path === "" || path === "/collections" || path === "/products") return "/shop";
  return null;
}

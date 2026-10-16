// Old Shopify storefront links → this site (lib/shop-links.ts). Cart, checkout
// and account links must stay on Shopify. Run: npm test
import assert from "node:assert/strict";
import { test } from "node:test";
import { HANDLE_ALIASES, localShopHref } from "../lib/shop-links.ts";

const cases = [
  ["https://ecosolutions.myshopify.com/collections/owls/products/annual-owl-box-service-1", "/shop/annual-owl-box-service-1"],
  ["http://ecosolutions.myshopify.com/collections/bats/products/bats-and-stables", "/shop/bats-and-stables"],
  ["https://shop.ecosolutions.co.za/products/owl-box?variant=1", "/shop/spotted-eagle-owl-box"],
  ["https://ecosolutions.myshopify.com/collections/services/products/copy-of-control-rodents-at-home", "/shop/rodent-consultation"],
  // Discontinued products go to their category; other unlisted handles to /shop/<handle> (shop 404 page).
  ["http://ecosolutions.myshopify.com/collections/birds/products/barbet-nesting-log", "/shop?c=garden"],
  ["https://ecosolutions.myshopify.com/products/ecosolutions-flasher", "/shop"],
  ["https://shop.ecosolutions.co.za/products/some-future-product", "/shop/some-future-product"],
  ["https://ecosolutions.myshopify.com/collections/hampers", "/shop?c=gifts"],
  ["https://ecosolutions.myshopify.com/collections/frontpage", "/shop"],
  ["https://ecosolutions.myshopify.com/collections/all", "/shop"],
  ["https://ecosolutions.myshopify.com/collections/under-r100", "/shop"],
  ["https://shop.ecosolutions.co.za/", "/shop"],
  // Must stay on Shopify
  ["https://shop.ecosolutions.co.za/cart/123:1", null],
  ["https://shop.ecosolutions.co.za/cart", null],
  ["https://shop.ecosolutions.co.za/checkouts/cn/abc", null],
  ["https://shop.ecosolutions.co.za/account/login", null],
  ["https://shop.ecosolutions.co.za/12345/orders/abc", null],
  ["https://shop.ecosolutions.co.za/pages/contact", null],
  // Not the storefront
  ["https://www.youtube.com/watch?v=x", null],
  ["/owls-and-owl-boxes", null],
  ["mailto:info@ecosolutions.co.za", null],
];

for (const [href, want] of cases) test(href, () => assert.equal(localShopHref(href), want));

test("every alias points at a handle that isn't itself an alias", () => {
  for (const [from, to] of Object.entries(HANDLE_ALIASES)) assert.ok(!(to in HANDLE_ALIASES), `${from} → ${to}`);
});

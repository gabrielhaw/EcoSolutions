"use client";

import Link from "next/link";
import { useState } from "react";
import { formatRand, type Product } from "@/lib/shop";
import ShopImage from "./ShopImage";
import { site } from "@/lib/site";
import { useCart } from "./Cart";

/** Photo gallery + option picker + add to cart for one product. */
export default function BuyBox({ product }: { product: Product }) {
  const { add } = useCart();
  const [img, setImg] = useState(0);
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set([0]));
  const preload = (i: number) => setSeen((s) => (s.has(i) ? s : new Set(s).add(i)));
  const show = (i: number) => {
    preload(i);
    setImg(i);
  };
  const [vid, setVid] = useState(product.variants.find((v) => v.available)?.id ?? product.variants[0].id);
  const [qty, setQty] = useState(1);
  const variant = product.variants.find((v) => v.id === vid)!;
  const hasOptions = product.variants.length > 1 || product.variants[0].title !== "Default Title";
  const sellsHere = product.priceFrom > 0;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-canvas-2">
          {/* Only photos already shown (or hovered in the strip) are loaded, not the whole gallery up front. */}
          {product.images.map((im, i) =>
            seen.has(i) ? (
              <ShopImage aspect={1}
                key={im.src}
                src={im.src}
                alt={im.alt}
                fill
                sizes="(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 92vw"
                priority={i === 0}
                className={`object-cover transition-opacity duration-500 ${i === img ? "opacity-100" : "opacity-0"}`}
              />
            ) : null,
          )}
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-3">
            {product.images.map((im, i) => (
              <button
                key={im.src}
                type="button"
                onClick={() => show(i)}
                onPointerEnter={() => preload(i)}
                onFocus={() => preload(i)}
                aria-label={`Show photo ${i + 1}`}
                className={`relative size-20 overflow-hidden rounded-xl border-2 transition ${i === img ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <ShopImage aspect={1} src={im.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <h1 className="display text-display-m">{product.title}</h1>
          <p className="mt-4 text-2xl tabular-nums">
            {sellsHere ? formatRand(variant.price) : "Amount of your choice"}
            {product.poa && <span className="ml-2 align-middle text-[13px] text-fg-3">deposit · final price on quote</span>}
          </p>
          <p className="mt-5 text-[16px] leading-relaxed text-fg-2">{product.summary}</p>

          {hasOptions && sellsHere && (
            <fieldset className="mt-8">
              <legend className="label text-fg-3">Option</legend>
              <div className="mt-3 grid gap-2">
                {product.variants.map((v) => (
                  <label
                    key={v.id}
                    className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 text-[15px] transition-colors ${
                      v.id === vid ? "border-accent bg-accent-soft" : "border-line-strong hover:border-fg"
                    } ${v.available ? "" : "cursor-not-allowed opacity-50"}`}
                  >
                    <input type="radio" name="variant" value={v.id} checked={v.id === vid} disabled={!v.available} onChange={() => setVid(v.id)} className="sr-only" />
                    <span>{v.title}</span>
                    <span className="tabular-nums text-fg-2">{formatRand(v.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {sellsHere ? (
            <div className="mt-8 flex gap-3">
              <div className="flex items-center rounded-full border border-line-strong">
                <button type="button" aria-label="Fewer" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-12 place-items-center text-fg-2 hover:text-fg">
                  −
                </button>
                <span className="w-6 text-center tabular-nums">{qty}</span>
                <button type="button" aria-label="More" onClick={() => setQty((q) => q + 1)} className="grid size-12 place-items-center text-fg-2 hover:text-fg">
                  +
                </button>
              </div>
              <button
                type="button"
                disabled={!variant.available}
                onClick={() =>
                  add({ id: variant.id, handle: product.handle, title: product.title, variant: variant.title, price: variant.price, image: product.images[0]?.src }, qty)
                }
                className="flex-1 rounded-full bg-accent px-6 py-3.5 font-medium text-canvas transition-colors hover:bg-accent-2 disabled:opacity-50"
              >
                {variant.available ? "Add to cart" : "Sold out"}
              </button>
            </div>
          ) : (
            // No fixed price (gift vouchers): Shopify has no amount picker either, so arrange it with us.
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact-us?topic=voucher" className="inline-flex rounded-full bg-accent px-6 py-3.5 font-medium text-canvas hover:bg-accent-2">
                Ask for a voucher
              </Link>
              <a href={`https://wa.me/${site.whatsapp}`} rel="noopener" className="inline-flex rounded-full border border-line-strong px-6 py-3.5 font-medium hover:border-fg">
                WhatsApp us
              </a>
            </div>
          )}

          <ul className="mt-8 grid gap-2 border-t border-line pt-6 text-[14px] text-fg-2">
            <li>✓ Made and installed by our own team</li>
            <li>✓ Secure payment through Shopify</li>
            <li>✓ Questions? WhatsApp 072 365 9777</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

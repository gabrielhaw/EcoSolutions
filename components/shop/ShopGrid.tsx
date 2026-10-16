"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, formatRand, type Category, type Product } from "@/lib/shop";
import ShopImage from "./ShopImage";

export default function ShopGrid({ products, initial }: { products: Product[]; initial?: Category }) {
  const [cat, setCat] = useState<Category | "all">(initial ?? "all");
  const shown = cat === "all" ? products : products.filter((p) => p.category === cat);

  const pill = (active: boolean) =>
    `rounded-full border px-4 py-2 text-[14px] transition-colors ${
      active ? "border-fg bg-fg text-canvas" : "border-line-strong text-fg-2 hover:border-fg hover:text-fg"
    }`;

  return (
    <>
      <div role="tablist" aria-label="Filter products" className="flex flex-wrap gap-2">
        <button role="tab" aria-selected={cat === "all"} onClick={() => setCat("all")} className={pill(cat === "all")}>
          All <span className="ml-1 text-fg-3">{products.length}</span>
        </button>
        {categories.map((c) => {
          const n = products.filter((p) => p.category === c.id).length;
          return n ? (
            <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)} className={pill(cat === c.id)}>
              {c.label} <span className={cat === c.id ? "ml-1 opacity-60" : "ml-1 text-fg-3"}>{n}</span>
            </button>
          ) : null;
        })}
      </div>

      <ul className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <li key={p.handle} className="animate-rise" style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}>
            <Link href={`/shop/${p.handle}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-canvas-2">
                {p.images[0] && (
                  <ShopImage aspect={4 / 3}
                    src={p.images[0].src}
                    alt={p.images[0].alt}
                    fill
                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw"
                    priority={i < 2}
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                )}
                {/* Second photo fades in on hover; not rendered (so not downloaded) on touch screens */}
                {p.images[1] && (
                  <ShopImage aspect={4 / 3}
                    src={p.images[1].src}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, 48vw"
                    className="hidden object-cover opacity-0 transition duration-700 group-hover:opacity-100 [@media(hover:hover)]:block"
                  />
                )}
                <span className="label absolute left-4 top-4 rounded-full bg-canvas/85 px-3 py-1.5 text-fg-2 backdrop-blur-md">
                  {categories.find((c) => c.id === p.category)?.label}
                </span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[1.15rem] font-medium leading-snug tracking-tight transition-colors group-hover:text-accent">{p.title}</h2>
                  <p className="mt-1 line-clamp-2 text-[14px] leading-snug text-fg-3">{p.summary}</p>
                </div>
                <p className="shrink-0 text-[15px] tabular-nums">
                  {p.priceFrom > 0 ? (
                    <>
                      {p.variants.length > 1 && <span className="text-fg-3">from </span>}
                      {formatRand(p.priceFrom)}
                    </>
                  ) : (
                    <span className="text-fg-3">Choose amount</span>
                  )}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type Problem = { label: string; href: string; blurb: string; image: string; alt: string };

/** Problem list; hovering or focusing a row swaps the photo on the right. */
export default function ProblemPicker({ problems }: { problems: Problem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <ol className="lg:col-span-7">
        {problems.map((p, i) => (
          <li key={p.href} className="border-t border-line last:border-b">
            <Link
              href={p.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6"
            >
              <span className={`label transition-colors ${active === i ? "text-accent" : "text-fg-3"}`}>{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className={`block text-[1.4rem] font-medium leading-tight tracking-tight transition-colors sm:text-[1.65rem] ${active === i ? "text-fg" : "text-fg-2"}`}>
                  {p.label}
                </span>
                <span className="mt-2 block max-w-lg text-[15px] leading-relaxed text-fg-3 lg:hidden">{p.blurb}</span>
              </span>
              <span
                aria-hidden
                className={`grid size-10 place-items-center rounded-full border transition-all duration-300 ${
                  active === i ? "border-accent bg-accent text-canvas" : "border-line-strong text-fg-3"
                }`}
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="relative hidden lg:col-span-5 lg:block">
        <div data-theme="dark" className="sticky top-28 aspect-[4/5] overflow-hidden rounded-3xl bg-canvas-2">
          {problems.map((p, i) => (
            <div key={p.href} aria-hidden={active !== i} className={`absolute inset-0 transition-opacity duration-700 ${active === i ? "opacity-100" : "opacity-0"}`}>
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="40vw"
                className={`object-cover transition-transform duration-[1.6s] ease-out ${active === i ? "scale-100" : "scale-110"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-7 text-[1.2rem] font-medium leading-snug tracking-tight text-white">{p.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

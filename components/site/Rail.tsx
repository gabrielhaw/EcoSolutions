"use client";

import { useRef } from "react";

/**
 * Horizontal, swipeable row of cards with snap points and prev/next buttons.
 * Children should be <li> elements; they keep their own widths.
 */
export default function Rail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const btn =
    "grid size-11 place-items-center rounded-full border border-line-strong text-fg-2 transition-colors hover:border-fg hover:text-fg";

  return (
    <div>
      <ul
        ref={ref}
        aria-label={label}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      <div className="mt-6 flex justify-end gap-2">
        <button type="button" onClick={() => step(-1)} aria-label="Scroll back" className={btn}>
          ←
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Scroll forward" className={btn}>
          →
        </button>
      </div>
    </div>
  );
}

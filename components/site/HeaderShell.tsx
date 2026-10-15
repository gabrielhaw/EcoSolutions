"use client";

import { useEffect, useState } from "react";

/** Solid sticky header; gains a soft shadow once the page scrolls. */
export default function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "border-line bg-canvas/90 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)] backdrop-blur-xl" : "border-line bg-canvas"
      }`}
    >
      {children}
    </header>
  );
}

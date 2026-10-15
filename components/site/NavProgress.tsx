"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Thin bar at the top of the window that starts the moment an internal link
 * is clicked, so a click always gets instant feedback while the next page loads.
 */
export default function NavProgress() {
  const pathname = usePathname();
  // The path we were on when loading started; arriving anywhere else ends it.
  const [loadingFrom, setLoadingFrom] = useState<string | null>(null);
  const loading = loadingFrom !== null && loadingFrom === pathname;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      // Same-page links (filters, anchors) finish instantly, so skip those.
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      setLoadingFrom(location.pathname);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <div aria-hidden className={`pointer-events-none fixed inset-x-0 top-0 z-[80] h-0.5 transition-opacity duration-300 ${loading ? "opacity-100" : "opacity-0"}`}>
      <div className={`h-full bg-accent transition-[width] ease-out ${loading ? "w-[85%] duration-[6s]" : "w-0 duration-0"}`} />
    </div>
  );
}

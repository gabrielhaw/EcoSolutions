"use client";

/**
 * Light/dark switch. The theme starts from the time of day (see the script in
 * app/layout.tsx); a choice made here sticks for the rest of the visit.
 * Icons swap via the `dark:` variant, so no state is needed.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const d = document.documentElement;
    const next = d.dataset.theme === "dark" ? "light" : "dark";
    d.dataset.theme = next;
    try {
      sessionStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      title="Light / dark"
      className={`grid size-10 place-items-center rounded-full border border-line-strong text-fg-2 transition-colors hover:text-fg ${className}`}
    >
      {/* Moon in light mode, sun in dark mode */}
      <svg aria-hidden viewBox="0 0 24 24" className="size-[18px] dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
      </svg>
      <svg aria-hidden viewBox="0 0 24 24" className="hidden size-[18px] dark:block" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
      </svg>
    </button>
  );
}

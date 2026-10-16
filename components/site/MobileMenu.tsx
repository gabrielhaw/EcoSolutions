"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { menu, site } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

export default function MobileMenu() {
  const pathname = usePathname();
  // Store the path the menu was opened on; navigating anywhere closes it.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenedAt((typeof next === "function" ? next(open) : next) ? pathname : null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenedAt(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 items-center gap-2.5 rounded-full border border-line-strong bg-canvas/40 px-4 text-[14px] font-medium backdrop-blur-md"
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden className="relative block h-2.5 w-4">
          <span className={`absolute left-0 h-px w-4 bg-fg transition ${open ? "top-1/2 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 h-px w-4 bg-fg transition ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
        </span>
      </button>

      {/* Portalled to <body>: once scrolled, the header's backdrop-blur makes it the
          containing block for fixed children, which squashed the panel to 0px high. */}
      {open &&
        createPortal(
          <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[72px] z-40 animate-fade overflow-y-auto overscroll-contain bg-canvas lg:hidden">
            <nav aria-label="Mobile" className="px-4 pb-16 pt-2 sm:px-6">
              {menu.map((m) =>
                m.items ? (
                  <details key={m.href} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-2xl font-medium tracking-tight">
                      {m.label}
                      <span aria-hidden className="text-fg-3 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <ul className="pb-5">
                      {m.items.map((c) => (
                        <li key={c.href}>
                          {c.href.startsWith("http") ? (
                            <a href={c.href} rel="noopener" className="block py-2 text-[16px] text-fg-2">
                              {c.label}
                            </a>
                          ) : (
                            <Link href={c.href} className="block py-2 text-[16px] text-fg-2">
                              {c.label}
                            </Link>
                          )}
                        </li>
                      ))}
                      <li>
                        <Link href={m.href} className="block py-2 text-[16px] font-medium text-accent">
                          Everything on {m.label.toLowerCase()} →
                        </Link>
                      </li>
                    </ul>
                  </details>
                ) : (
                  <Link key={m.href} href={m.href} className="block border-b border-line py-5 text-2xl font-medium tracking-tight">
                    {m.label}
                  </Link>
                ),
              )}
              {[
                { label: "News", href: "/news" },
                { label: "Contact", href: "/contact-us" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block border-b border-line py-5 text-2xl font-medium tracking-tight">
                  {l.label}
                </Link>
              ))}
              <div className="flex items-center justify-between border-b border-line py-5">
                <span className="text-[16px] text-fg-2">Light / dark</span>
                <ThemeToggle />
              </div>
              <div className="mt-8 grid gap-3" data-cta-location="mobile_menu">
                <Link href="/request-a-callback" data-track="enquiry_click" data-cta="request_a_callback" className="rounded-full bg-accent px-4 py-3.5 text-center font-medium text-canvas">
                  Request a callback
                </Link>
                <a href={`tel:${site.phone.mobile.replace(/[^+\d]/g, "")}`} className="rounded-full border border-line-strong px-4 py-3.5 text-center font-medium">
                  Call {site.phone.mobile}
                </a>
                <a href={`https://wa.me/${site.whatsapp}`} className="rounded-full border border-line-strong px-4 py-3.5 text-center font-medium">
                  WhatsApp us
                </a>
                <Link href="/contact-us" className="rounded-full border border-line-strong px-4 py-3.5 text-center font-medium">
                  Book a site visit
                </Link>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}

"use client";

import Script from "next/script";
import { useEffect } from "react";
import { bareUrl, GA_ID, SHOP_HOSTS, track } from "@/lib/analytics";

/**
 * Loads GA4 (only when NEXT_PUBLIC_GA_ID is set) and reports contact and shop
 * clicks from one listener, so each click is counted once however many
 * components render such links. Page views, including client-side navigation,
 * come from GA4's enhanced measurement ("page changes based on browser history").
 *
 * Links can describe themselves with data attributes:
 *   data-track="enquiry_click"  a button leading to a form or the contact page
 *   data-cta="request_callback" which button (a fixed label, never user input)
 *   data-cta-location="hero"     where on the page; falls back to the nearest
 *                                 ancestor's data-cta-location
 *   data-track="manual"          skip: the component sends its own events
 */
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      // Links that report their own events once the action really happens (cart checkout).
      if (!a || a.dataset.track === "manual") return;
      const href = a.getAttribute("href") ?? "";
      const location = a.closest<HTMLElement>("[data-cta-location]")?.dataset.ctaLocation;
      const cta = a.dataset.cta;

      if (href.startsWith("tel:")) return track("phone_click", { cta_location: location, cta });
      if (href.startsWith("mailto:")) return track("email_click", { cta_location: location, cta });

      let url: URL;
      try {
        url = new URL(a.href);
      } catch {
        return;
      }
      if (url.hostname === "wa.me" || url.hostname.endsWith("whatsapp.com")) {
        return track("whatsapp_click", { cta_location: location, cta });
      }
      if (SHOP_HOSTS.includes(url.hostname)) {
        return track("shop_visit", { cta_location: location, cta, link_url: bareUrl(a.href) });
      }
      if (a.dataset.track === "enquiry_click") {
        return track("enquiry_click", { cta_location: location, cta, link_url: bareUrl(a.href) });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag("js",new Date());gtag("config",${JSON.stringify(
          GA_ID,
        )},{linker:{domains:${JSON.stringify(SHOP_HOSTS)}}});`}
      </Script>
    </>
  );
}

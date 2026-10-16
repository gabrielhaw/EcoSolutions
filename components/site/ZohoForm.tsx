"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { forms, type FormId } from "@/lib/forms";
import { site } from "@/lib/site";

const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;

/**
 * An embedded Zoho form. The frame only loads once it's near the screen, and
 * reports `form_view` once when it is actually seen. A submission is counted
 * on /enquiry-received, never here: we can't see inside Zoho's frame.
 *
 * When the form's embed link is missing (lib/forms.ts), visitors get phone,
 * WhatsApp and email instead of an empty frame.
 */
export default function ZohoForm({ id, location }: { id: FormId; location: string }) {
  const form = forms[id];
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !form.url) return;
    let seen = false;
    const near = new IntersectionObserver(([e]) => e.isIntersecting && setLoad(true), { rootMargin: "600px" });
    const visible = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !seen) {
          seen = true;
          track("form_view", { form_id: id, cta_location: location });
          visible.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    near.observe(el);
    visible.observe(el);
    return () => {
      near.disconnect();
      visible.disconnect();
    };
  }, [form.url, id, location]);

  if (!form.url) {
    return (
      <div className="rounded-3xl border border-line bg-canvas-2 p-6 sm:p-8" data-cta-location={location}>
        <p className="text-[16px] leading-relaxed text-fg-2">Call, WhatsApp or email us and we’ll take your order or answer your question.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          <li>
            <a href={tel(site.phone.mobile)} className="block rounded-2xl border border-line-strong px-4 py-3.5 text-center font-medium hover:border-fg">
              Call {site.phone.mobile.replace("+27 ", "0")}
            </a>
          </li>
          <li>
            <a href={`https://wa.me/${site.whatsapp}`} className="block rounded-2xl border border-line-strong px-4 py-3.5 text-center font-medium hover:border-fg">
              WhatsApp us
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="block rounded-2xl border border-line-strong px-4 py-3.5 text-center font-medium hover:border-fg">
              Email us
            </a>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-line bg-white" style={{ minHeight: form.height }}>
      {load ? (
        <iframe title={form.title} src={form.url} loading="lazy" className="block w-full border-0" style={{ height: form.height }} />
      ) : (
        <p className="p-8 text-[15px] text-neutral-600">Loading the form…</p>
      )}
      <noscript>
        <a href={form.url} className="block p-8 text-[15px] underline">
          Open the {form.title.toLowerCase()} form
        </a>
      </noscript>
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { isFormId } from "@/lib/forms";

/**
 * Reports one `generate_lead` per form per browser tab session, so reloading or
 * revisiting the thank-you page doesn't count the same enquiry twice. Only the
 * form's id is sent; Zoho must not append form fields to the redirect URL.
 */
export default function LeadConfirmed() {
  const params = useSearchParams();
  const form = params.get("form");

  useEffect(() => {
    if (!isFormId(form)) return;
    const key = `lead:${form}`;
    const sent = () => {
      try {
        return sessionStorage.getItem(key) !== null;
      } catch {
        return false; // Storage blocked: count it once for this page view.
      }
    };
    if (sent()) return;
    // gtag loads after hydration; wait for it rather than drop the lead.
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const send = () => {
      if ((window as unknown as { gtag?: unknown }).gtag) {
        track("generate_lead", { form_id: form });
        try {
          sessionStorage.setItem(key, "1");
        } catch {}
        return;
      }
      if (++tries < 40) timer = setTimeout(send, 250);
    };
    send();
    return () => clearTimeout(timer);
  }, [form]);

  return null;
}

import type { Metadata } from "next";
import { Suspense } from "react";
import LeadConfirmed from "@/components/site/LeadConfirmed";
import { ButtonLink, Wrap } from "@/components/site/ui";
import { site } from "@/lib/site";

/**
 * Zoho Forms redirects here after a completed submission (see lib/forms.ts).
 * This is the only place a lead (`generate_lead`) is reported.
 */
export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
  alternates: { canonical: "/enquiry-received" },
};

export default function EnquiryReceivedPage() {
  return (
    <Wrap className="py-20 sm:py-28">
      <Suspense>
        <LeadConfirmed />
      </Suspense>
      <p className="label text-accent">Enquiry received</p>
      <h1 className="display mt-6 max-w-3xl text-display-l">Thank you. We’ll be in touch.</h1>
      <p className="mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-fg-2">
        One of our consultants will get back to you during office hours ({site.hours.toLowerCase()}). If it’s urgent, call or WhatsApp us on{" "}
        {site.phone.mobile.replace("+27 ", "0")}.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to the home page</ButtonLink>
        <ButtonLink href="/shop" variant="outline">
          Visit the shop
        </ButtonLink>
      </div>
    </Wrap>
  );
}

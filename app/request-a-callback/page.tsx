import type { Metadata } from "next";
import ZohoForm from "@/components/site/ZohoForm";
import { Breadcrumbs, Wrap } from "@/components/site/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Call Back",
  description:
    "Leave your details and an EcoSolutions consultant will call you back about bat removal, rodent control, owl boxes or bat houses. Or call 072 365 9777.",
  alternates: { canonical: "/request-a-callback" },
};

const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;

export default function RequestCallbackPage() {
  return (
    <>
      <header className="border-b border-line">
        <Wrap className="pb-10 pt-10 lg:pb-14 lg:pt-14">
          <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "Request a call back", href: "/request-a-callback" }]} />
          <h1 className="display mt-8 max-w-4xl text-display-l">Request a call back</h1>
          <p className="mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-fg-2">
            Leave your details and one of our consultants will call you back. For bats, the first step is usually an evening site visit with a dusk survey.
          </p>
        </Wrap>
      </header>
      <Wrap className="grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-8">
          <ZohoForm id="callback" location="callback_page" />
        </div>
        <aside className="space-y-8 lg:col-span-4" data-cta-location="callback_page_aside">
          <div>
            <p className="label text-fg-3">Rather talk now?</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={tel(site.phone.mobile)} className="display text-2xl hover:text-accent-2">
                  {site.phone.mobile}
                </a>
              </li>
              <li>
                <a href={tel(site.phone.office)} className="display text-2xl hover:text-accent-2">
                  {site.phone.office}
                </a>
              </li>
              <li className="pt-1">
                <a href={`https://wa.me/${site.whatsapp}`} className="link-underline text-[15px]">
                  Message us on WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-underline text-[15px]">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="label text-fg-3">Office hours</p>
            <p className="mt-3 text-[16px]">{site.hours}</p>
          </div>
        </aside>
      </Wrap>
    </>
  );
}

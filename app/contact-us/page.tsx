import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/site/ContactForm";
import { Breadcrumbs, Wrap } from "@/components/site/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Book a Pest Control Site Visit",
  description:
    "Contact EcoSolutions in Randpark Ridge, Randburg: 072 365 9777 or info@ecosolutions.co.za. Book a site visit for rodent control, bat removal or owl boxes.",
  alternates: { canonical: "/contact-us" },
};

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.9775842857595!2d27.94125796295167!3d-26.0948375408699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e957454660d9929%3A0xb6ad801da1fdb4cc!2sEcoSolutions!5e0!3m2!1sen!2sza!4v1771157144291!5m2!1sen!2sza";

const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;

export default function ContactPage() {
  return (
    <>
      <header className="border-b border-line">
        <Wrap className="pb-12 pt-10 lg:pb-16 lg:pt-14">
          <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact-us" }]} />
          <h1 className="display mt-8 max-w-4xl text-display-xl">Tell us what’s moving in.</h1>
          <p className="mt-6 max-w-2xl text-[1.15rem] leading-relaxed text-fg-2">
            Most jobs start with a site visit. For bats it’s done at dusk so we can watch where they come out. For farms and estates, we can plan remotely using satellite imagery.
          </p>
        </Wrap>
      </header>

      <Wrap className="grid gap-16 py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-7">
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>

        <aside className="space-y-10 lg:col-span-5 lg:border-l lg:border-line lg:pl-12">
          <div>
            <p className="label text-fg-3">Call or WhatsApp</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={tel(site.phone.mobile)} className="display text-3xl hover:text-accent-2">
                  {site.phone.mobile}
                </a>
              </li>
              <li>
                <a href={tel(site.phone.office)} className="display text-3xl hover:text-accent-2">
                  {site.phone.office}
                </a>
              </li>
              <li className="pt-1">
                <a href={`https://wa.me/${site.whatsapp}`} className="link-underline text-[15px]">
                  Message us on WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="label text-fg-3">Email</p>
            <a href={`mailto:${site.email}`} className="mt-3 block text-[17px] hover:text-accent-2">
              {site.email}
            </a>
          </div>
          <div>
            <p className="label text-fg-3">Office hours</p>
            <p className="mt-3 text-[17px]">{site.hours}</p>
          </div>
          <div>
            <p className="label text-fg-3">Visit us</p>
            <address className="mt-3 not-italic text-[17px] leading-relaxed">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              {site.address.suburb}, {site.address.city}, {site.address.postalCode}
            </address>
          </div>
          <div>
            <p className="label text-fg-3">Prefer to order directly?</p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-fg-2">
              Owl boxes, bat houses, barbet logs and annual services can be ordered from our{" "}
              <a href={site.shop} className="link-underline text-fg" rel="noopener">
                online shop
              </a>
              .
            </p>
          </div>
        </aside>
      </Wrap>

      <div className="border-t border-line">
        <iframe
          title="Map to the EcoSolutions office in Randpark Ridge"
          src={MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[420px] w-full grayscale-[60%]"
        />
      </div>
    </>
  );
}

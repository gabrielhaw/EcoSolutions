import Image from "next/image";
import Link from "next/link";
import ZohoForm from "@/components/site/ZohoForm";
import { ButtonLink, ctaId, Wrap } from "@/components/site/ui";
import { forms } from "@/lib/forms";
import { formatRand, getProducts, shopImg } from "@/lib/shop";
import { CALLBACK_ANCHOR, type Service } from "@/lib/services";
import { site } from "@/lib/site";

const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;
const local = (n: string) => n.replace("+27 ", "0");

/** The buttons under a service page's title: the main enquiry, then call and WhatsApp. */
export function EnquiryActions({ service, location }: { service: Service; location: string }) {
  return (
    <div className="flex flex-wrap gap-3" data-cta-location={location}>
      <ButtonLink href={service.primary.href} cta={ctaId(service.primary.label)}>
        {service.primary.label}
      </ButtonLink>
      {service.secondary && (
        <ButtonLink href={service.secondary.href} variant="outline" cta={ctaId(service.secondary.label)}>
          {service.secondary.label}
        </ButtonLink>
      )}
      <ButtonLink href={tel(site.phone.mobile)} variant="outline">
        Call {local(site.phone.mobile)}
      </ButtonLink>
      <ButtonLink href={`https://wa.me/${site.whatsapp}`} variant="outline">
        WhatsApp
      </ButtonLink>
    </div>
  );
}

/** What we offer, where we work and how to enquire, before the long article. */
export function ServiceSummary({ service }: { service: Service }) {
  return (
    <section aria-label={`${service.name} at a glance`} className="border-y border-line bg-canvas-2/60">
      <Wrap className="grid gap-10 py-10 md:grid-cols-12 lg:py-14">
        <div className="md:col-span-6">
          <h2 className="label text-accent">What we offer</h2>
          <ul className="mt-4 space-y-3">
            {service.offer.map((o) => (
              <li key={o} className="flex gap-3 text-[16px] leading-relaxed text-fg">
                <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <h2 className="label text-accent">Where we work</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-fg">{service.area}</p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-fg-2">
            Office: Lifestyle Garden Centre, Randburg, {site.address.city}. {site.hours}.
          </p>
        </div>
        <div className="md:col-span-3" data-cta-location="summary">
          <h2 className="label text-accent">How to enquire</h2>
          <ul className="mt-4 space-y-2.5 text-[16px]">
            <li>
              <a href={service.primary.href} data-track="enquiry_click" data-cta={ctaId(service.primary.label)} className="link-underline font-medium">
                {service.primary.label}
              </a>
            </li>
            <li>
              Call <a href={tel(site.phone.mobile)} className="link-underline">{local(site.phone.mobile)}</a> or{" "}
              <a href={tel(site.phone.office)} className="link-underline">{local(site.phone.office)}</a>
            </li>
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} className="link-underline">WhatsApp us</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-underline break-all">{site.email}</a>
            </li>
          </ul>
        </div>
      </Wrap>
    </section>
  );
}

/** Shopify products that go with a service. Payment happens in Shopify's checkout. */
export async function ServiceProducts({ service }: { service: Service }) {
  const all = await getProducts();
  const products = service.products.map((h) => all.find((p) => p.handle === h)).filter((p) => p !== undefined);
  if (!products.length) return null;
  return (
    <section aria-labelledby="order-online" className="border-t border-line py-14 sm:py-20" data-cta-location="service_products">
      <Wrap>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label text-fg-3">Order online</p>
            <h2 id="order-online" className="display mt-3 text-display-m">
              Book or buy in our shop
            </h2>
          </div>
          <p className="max-w-sm text-[14.5px] leading-relaxed text-fg-2">Secure payment through Shopify’s checkout.</p>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <li key={p.handle}>
              <Link href={`/shop/${p.handle}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-canvas-2">
                  {p.images[0] && (
                    <Image
                      src={shopImg(p.images[0].src, 600)}
                      alt={p.images[0].alt}
                      fill
                      unoptimized
                      loading="lazy"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="mt-3 text-[15px] font-medium leading-snug tracking-tight group-hover:text-accent">{p.title}</p>
                <p className="mt-1 text-[14px] tabular-nums text-fg-2">
                  {p.priceFrom > 0 ? (
                    <>
                      {p.variants.length > 1 && <span className="text-fg-3">from </span>}
                      {formatRand(p.priceFrom)}
                    </>
                  ) : (
                    "Choose an amount"
                  )}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

/** The embedded enquiry form at the foot of a service page; "Request a callback" buttons scroll here. */
export function ServiceForm({ service }: { service: Service }) {
  if (!service.form) return null;
  const form = forms[service.form];
  return (
    <section id={service.form === "callback" ? CALLBACK_ANCHOR : `form-${service.form}`} aria-labelledby="enquiry-form" className="scroll-mt-24 border-t border-line py-14 sm:py-20">
      <Wrap className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label text-fg-3">{service.name}</p>
          <h2 id="enquiry-form" className="display mt-3 text-display-m">
            {form.title}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-fg-2">
            {service.form === "callback"
              ? "Leave your details and one of our consultants will call you back."
              : "Tell us what you’d like to order and we’ll get back to you."}
          </p>
          <p className="mt-4 text-[14.5px] text-fg-3">{site.hours}.</p>
        </div>
        <div className="lg:col-span-8">
          <ZohoForm id={service.form} location={`${service.path}#form`} />
        </div>
      </Wrap>
    </section>
  );
}

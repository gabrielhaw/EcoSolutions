import Link from "next/link";
import Image from "next/image";
import type { Crumb } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site, type NavLink } from "@/lib/site";

export function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function ButtonLink({
  href,
  children,
  variant = "clay",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "clay" | "ink" | "outline" | "outline-light";
  className?: string;
}) {
  const styles = {
    clay: "bg-accent text-canvas hover:bg-accent-2",
    ink: "bg-fg text-canvas hover:bg-fg-2",
    outline: "border border-line-strong text-fg hover:border-fg",
    "outline-light": "border border-fg/30 text-fg hover:border-fg",
  }[variant];
  const external = href.startsWith("http");
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium transition-colors ${styles} ${className}`;
  return external ? (
    <a href={href} className={cls} rel="noopener">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <nav aria-label="Breadcrumb" className="label text-fg-3">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {crumbs.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {i === crumbs.length - 1 ? (
                <span aria-current="page" className="text-fg-2">
                  {c.name.length > 48 ? c.name.slice(0, 46) + "…" : c.name}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-fg">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** Index-style list of links — used for hubs and "keep reading" blocks. */
export function LinkIndex({ links, numbered = true }: { links: (NavLink & { image?: string | null })[]; numbered?: boolean }) {
  return (
    <ol className="border-t border-line">
      {links.map((l, i) => (
        <li key={l.href} className="border-b border-line">
          <Link href={l.href} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-5 sm:grid-cols-[3.5rem_1fr_1fr_auto]">
            <span className="label text-fg-3">{numbered ? String(i + 1).padStart(2, "0") : "—"}</span>
            <span className="font-display font-medium tracking-tight text-[1.35rem] leading-tight text-fg transition-colors group-hover:text-accent-2 sm:text-2xl">{l.label}</span>
            <span className="col-span-2 col-start-2 text-[15px] leading-relaxed text-fg-3 sm:col-span-1 sm:col-start-3 sm:row-start-1">{l.blurb}</span>
            <span aria-hidden className="col-start-3 row-start-1 text-fg-3 transition-transform group-hover:translate-x-1 group-hover:text-accent sm:col-start-4">
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function CtaBand({
  title = "Tell us what's moving in. We'll find a way to move it on, without poison.",
  image = "/images/spotted-eagle-owlets-in-owl-box.jpg",
  alt = "Three Spotted Eagle Owl chicks in an EcoSolutions owl box",
  cta = { label: "Book a site visit", href: "/contact-us" },
}: {
  title?: string;
  cta?: { label: string; href: string };
  image?: string;
  alt?: string;
}) {
  return (
    <section className="px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-12">
      <div data-theme="dark" className="relative mx-auto grid max-w-[77rem] overflow-hidden rounded-3xl border border-line bg-deep lg:grid-cols-2">
        <div className="relative z-10 p-8 sm:p-12 lg:p-16" data-reveal>
          <p className="label text-accent">Get in touch</p>
          <h2 className="display mt-5 max-w-xl text-display-m">{title}</h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-fg-2">
            Call, WhatsApp or send a message. One of our consultants will get back to you to arrange a site visit or a remote assessment using satellite imagery.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
            <ButtonLink href={`https://wa.me/${site.whatsapp}`} variant="outline-light">
              WhatsApp {site.phone.mobile.replace("+27 ", "0")}
            </ButtonLink>
          </div>
        </div>
        <div className="relative min-h-72 lg:min-h-full">
          <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          {/* Only a thin blend at the seam; the photo itself stays bright. */}
          <span aria-hidden className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-deep to-transparent lg:inset-y-0 lg:left-0 lg:right-auto lg:h-full lg:w-24 lg:bg-gradient-to-r" />
        </div>
      </div>
    </section>
  );
}

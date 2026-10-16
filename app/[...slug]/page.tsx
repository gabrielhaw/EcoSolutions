import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AtAGlance from "@/components/site/AtAGlance";
import JaneGoodall from "@/components/site/JaneGoodall";
import { EnquiryActions, ServiceForm, ServiceProducts, ServiceSummary } from "@/components/site/Service";
import { Breadcrumbs, ButtonLink, CtaBand, JsonLd, LinkIndex, Wrap } from "@/components/site/ui";
import {
  allPages,
  breadcrumbsFor,
  childPages,
  getPage,
  getSection,
  metaDescription,
  plainText,
  sectionFor,
  siblingsFor,
  type Crumb,
  type LegacyPage,
} from "@/lib/content";
import { faqJsonLd, seoFor, serviceJsonLd } from "@/lib/seo";
import { arrangeImages } from "@/lib/arrange-images";
import { sanitizeContentHtml } from "@/lib/sanitize";
import { serviceFor } from "@/lib/services";
import { getProducts, localiseShopLinks, withStorePrices } from "@/lib/shop";
import { withSubheadings } from "@/lib/subheadings";
import { extraSections, menu, sections, site, type Section } from "@/lib/site";

/** Thin pages that now live inside a parent page (see redirects in next.config.ts). */
const MERGED = /^\/testimonials\/.+/;
/** Legacy paths that now have their own route under app/. */
const OWN_ROUTE = new Set(["/more/occupied-owl-box-map"]);

export const dynamicParams = false;

export function generateStaticParams() {
  const paths = new Set<string>();
  for (const p of allPages()) {
    if (p.path.startsWith("/news/") || MERGED.test(p.path) || OWN_ROUTE.has(p.path)) continue;
    paths.add(p.path);
  }
  for (const s of [...sections, ...extraSections]) paths.add(s.href);
  return [...paths].map((p) => ({ slug: p.slice(1).split("/") }));
}

type Props = { params: Promise<{ slug: string[] }> };

function toPath(slug: string[]) {
  return "/" + slug.map(decodeURIComponent).join("/");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = toPath((await params).slug);
  const page = getPage(path);
  const section = getSection(path);
  const seo = seoFor(path);
  const title = seo.title ?? page?.title ?? section?.eyebrow ?? "EcoSolutions";
  const description = metaDescription(
    seo.description ?? (page?.description || (page ? page.html : section?.intro ?? site.description)),
  );
  const image = page?.image?.src;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function LegacyRoute({ params }: Props) {
  const path = toPath((await params).slug);
  const section = getSection(path);
  const page = getPage(path);
  if (section) return <Hub section={section} page={page} />;
  if (!page) notFound();
  return <Article page={page} />;
}

/* ---------------- Hub ---------------- */

function Hub({ section, page }: { section: Section; page?: LegacyPage }) {
  const seo = seoFor(section.href);
  const crumbs = breadcrumbsFor(section.href, section.eyebrow);
  const links = section.children.map((c) => ({
    ...c,
    blurb: c.blurb ?? (getPage(c.href)?.description || ""),
  }));
  const menuImg = menu.find((m) => m.href === section.href)?.image;
  const heroImg = page?.image && (page.image.w ?? 0) >= 800 ? page.image : menuImg ? { src: menuImg } : null;
  const groups = links.some((l) => l.group)
    ? [...new Set(links.map((l) => l.group ?? "More"))].map((g) => ({ title: g, links: links.filter((l) => (l.group ?? "More") === g) }))
    : null;
  const isTestimonials = section.href === "/testimonials";

  if (isTestimonials) return <TestimonialsPage crumbs={crumbs} />;

  return (
    <>
      <header className="border-b border-line">
        <Wrap className="grid gap-10 pb-14 pt-10 lg:grid-cols-12 lg:pb-20 lg:pt-14">
          <div className="lg:col-span-7">
            <Breadcrumbs crumbs={crumbs} />
            <h1 className="display mt-8 text-display-xl">{seo.h1 ?? section.eyebrow}</h1>
            <p className="mt-6 max-w-2xl text-[1.15rem] leading-relaxed text-fg-2">{section.intro}</p>
          </div>
          {heroImg && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-5">
              <Image src={heroImg.src} alt="" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          )}
        </Wrap>
      </header>

      {groups ? (
        <section className="py-16 sm:py-24">
          <Wrap className={`grid gap-4 ${groups.length > 2 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
            {groups.map((g, gi) => (
              <div key={g.title} className="rounded-3xl border border-line bg-canvas-2 p-6 sm:p-8" data-reveal style={{ "--d": `${gi * 90}ms` } as React.CSSProperties}>
                <p className="label text-accent">{g.title}</p>
                <ul className="mt-6">
                  {g.links.map((l) => (
                    <li key={l.href} className="border-t border-line first:border-t-0">
                      <Link href={l.href} className="group flex items-start justify-between gap-4 py-4">
                        <span>
                          <span className="block text-[1.1rem] font-medium tracking-tight transition-colors group-hover:text-accent">{l.label}</span>
                          {l.blurb && <span className="mt-1 block text-[14px] leading-snug text-fg-3">{l.blurb}</span>}
                        </span>
                        <span aria-hidden className="mt-1 text-fg-3 transition group-hover:translate-x-1 group-hover:text-accent">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Wrap>
        </section>
      ) : (
        <section className="py-16 sm:py-24">
          <Wrap className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="label text-fg-3">{links.length} guides</p>
            </div>
            <div className="lg:col-span-9">
              <LinkIndex links={links} />
            </div>
          </Wrap>
        </section>
      )}

      <CtaBand />
    </>
  );
}

function TestimonialsPage({ crumbs }: { crumbs: Crumb[] }) {
  const quotes = childPages("/testimonials")
    .map((t) => ({ quote: plainText(t.html, 700), who: t.title.replace(/ in /, ", ") }))
    .filter((q) => q.quote);
  return (
    <>
      <header>
        <Wrap className="pt-10 lg:pt-14">
          <Breadcrumbs crumbs={crumbs} />
        </Wrap>
      </header>
      <section className="pb-20 pt-8 sm:pb-28">
        <Wrap>
          <JaneGoodall as="h1" />
        </Wrap>
      </section>
      <section className="border-t border-line bg-canvas-2/50 py-14 sm:py-20">
        <Wrap>
          <h2 className="display text-display-m">What our clients say</h2>
          <ul className="mt-10 columns-1 gap-5 md:columns-2 lg:columns-3">
            {quotes.map((q) => (
              <li key={q.who} className="mb-5 break-inside-avoid rounded-2xl border border-line bg-canvas p-6">
                <p className="text-[15.5px] leading-relaxed text-fg-2">“{q.quote}”</p>
                <p className="mt-4 text-[14px] font-medium text-fg">{q.who}</p>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>
      <CtaBand />
    </>
  );
}

/* ---------------- Article ---------------- */

/** Keep the intro under the title to a couple of sentences. */
function shortLede(text: string | undefined, max = 230) {
  if (!text || text.length <= max) return text;
  const cut = text.slice(0, max);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  return end > 80 ? cut.slice(0, end + 1) : cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

async function Article({ page }: { page: LegacyPage }) {
  const seo = seoFor(page.path);
  const service = serviceFor(page.path);
  const products = await getProducts();
  const html = withStorePrices(localiseShopLinks(page.html, new Set(products.map((p) => p.handle))), products);
  const crumbs = breadcrumbsFor(page.path, page.title);
  const section = sectionFor(page.path);
  const siblings = siblingsFor(page.path, 6);
  const kids = childPages(page.path);
  const lede = shortLede(seo.lede ?? page.description);
  const heroImg = page.image && (page.image.w ?? 0) >= 640 && !page.html.includes(page.image.src) ? page.image : null;
  const description = seo.description ?? (page.description || plainText(page.html));

  return (
    <>
      {seo.service && <JsonLd data={serviceJsonLd(page.path, seo.service, description)} />}
      {seo.faqs && <JsonLd data={faqJsonLd(seo.faqs)} />}

      {/* Title on the left, the page's photo beside it */}
      <header>
        <Wrap className={`grid gap-10 pb-12 pt-10 lg:pb-16 lg:pt-14 ${heroImg ? "lg:grid-cols-12 lg:items-center" : ""}`}>
          <div className={heroImg ? "lg:col-span-7" : "max-w-4xl"}>
            <Breadcrumbs crumbs={crumbs} />
            <h1 className="display mt-8 text-display-l">{seo.h1 ?? page.title}</h1>
            {lede && <p className="mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-fg-2">{lede}</p>}
            {service ? (
              <div className="mt-8">
                <EnquiryActions service={service} location="hero" />
              </div>
            ) : seo.service && (
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={seo.service.cta.href}>{seo.service.cta.label}</ButtonLink>
                <ButtonLink href={`https://wa.me/${site.whatsapp}`} variant="outline">
                  WhatsApp us
                </ButtonLink>
              </div>
            )}
          </div>
          {heroImg && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-canvas-2 lg:col-span-5">
              <Image src={heroImg.src} alt={page.title} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          )}
        </Wrap>
      </header>

      {service && <ServiceSummary service={service} />}

      {seo.facts && (
        <Wrap className={service ? "pb-4 pt-12" : "pb-4"}>
          <AtAGlance facts={seo.facts} />
        </Wrap>
      )}

      {/* Full-width reading column; photos float left and right within it (lib/arrange-images.ts) */}
      <Wrap className="pb-16 lg:pb-24">
        <article className={`pt-12 lg:pt-16 ${seo.facts || service ? "" : "border-t border-line"}`}>
          <div className="prose-eco" dangerouslySetInnerHTML={{ __html: sanitizeContentHtml(arrangeImages(withSubheadings(html, page.path))) }} />

          {kids.length > 0 && (
            <div className="clear-both pt-16">
              <h2 className="display text-display-m">In this section</h2>
              <div className="mt-8">
                <LinkIndex links={kids.map((k) => ({ label: k.title, href: k.path, blurb: k.description }))} />
              </div>
            </div>
          )}

          {seo.faqs && (
            <section className="clear-both pt-16" aria-labelledby="faq">
              <h2 id="faq" className="display text-display-m">
                Common questions
              </h2>
              <div className="mt-8 border-t border-line">
                {seo.faqs.map((f) => (
                  <details key={f.q} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.15rem] font-medium tracking-tight">
                      {f.q}
                      <span aria-hidden className="mt-1 text-fg-3 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="pb-6 text-[16px] leading-relaxed text-fg-2">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>
      </Wrap>

      {service && <ServiceProducts service={service} />}
      {service && <ServiceForm service={service} />}

      {siblings.length > 0 && section && (
        <nav aria-label={`More in ${section.eyebrow}`} className="border-t border-line py-16 sm:py-20">
          <Wrap>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-display-m">More on {section.label.toLowerCase()}</h2>
              <Link href={section.href} className="link-underline text-[15px]">
                See everything
              </Link>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-line px-5 py-4 transition-colors hover:border-line-strong hover:bg-canvas-2">
                    <span className="text-[15.5px] font-medium tracking-tight">{s.label}</span>
                    <span aria-hidden className="text-fg-3 transition group-hover:translate-x-0.5 group-hover:text-accent">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Wrap>
        </nav>
      )}

      <CtaBand
        title={seo.service ? `${seo.service.name}: let’s get started.` : undefined}
        cta={service ? service.primary : seo.service ? seo.service.cta : undefined}
      />
    </>
  );
}

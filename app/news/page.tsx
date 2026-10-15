import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs, CtaBand, Wrap } from "@/components/site/ui";
import { news, type NewsItem } from "@/lib/content";

export const metadata: Metadata = {
  title: "News & Press — Owls, Bats and Poison-Free Pest Control",
  description:
    "EcoSolutions in the press, plus news on owls, bats, rodents and the case against rat poison. Over 280 stories since 2009.",
  alternates: { canonical: "/news" },
};

const fmt = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }) : "";

function href(n: NewsItem) {
  return n.kind === "link" && n.externalUrl ? n.externalUrl : n.path;
}

function source(n: NewsItem) {
  if (n.kind !== "link" || !n.externalUrl) return "EcoSolutions";
  try {
    const host = new URL(n.externalUrl).hostname.replace(/^www\./, "");
    return host === "zc.vg" ? "Newsletter" : host;
  } catch {
    return "Press";
  }
}

export default function NewsPage() {
  const [feature, ...rest] = news;
  const top = rest.slice(0, 6);
  const byYear = new Map<string, NewsItem[]>();
  for (const n of rest.slice(6)) {
    const y = n.date?.slice(0, 4) ?? "Undated";
    byYear.set(y, [...(byYear.get(y) ?? []), n]);
  }

  return (
    <>
      <header className="border-b border-line">
        <Wrap className="pb-12 pt-10 lg:pb-16 lg:pt-14">
          <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "News", href: "/news" }]} />
          <h1 className="display mt-8 text-display-xl">News &amp; press</h1>
          <p className="mt-6 max-w-2xl text-[1.15rem] leading-relaxed text-fg-2">
            Owlets ringed, bats rescued, suburbs gone poison-free, and the research behind our work.
          </p>
        </Wrap>
      </header>

      {feature && (
        <section className="border-b border-line py-14 lg:py-20">
          <Wrap>
            <a href={href(feature)} rel={feature.kind === "link" ? "noopener" : undefined} className="group grid gap-8 lg:grid-cols-12">
              {feature.image && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-canvas-2 lg:col-span-7">
                  <Image src={feature.image.src} alt="" fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
                </div>
              )}
              <div className="flex flex-col justify-end lg:col-span-5">
                <p className="label text-accent-2">
                  Latest · {fmt(feature.date)} · {source(feature)}
                </p>
                <h2 className="display mt-4 text-display-m group-hover:text-accent-2">{feature.title}</h2>
                <p className="mt-4 text-[16.5px] leading-relaxed text-fg-2">{feature.description}</p>
              </div>
            </a>
          </Wrap>
        </section>
      )}

      <section className="py-14 lg:py-20">
        <Wrap>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {top.map((n) => (
              <li key={n.slug}>
                <a href={href(n)} rel={n.kind === "link" ? "noopener" : undefined} className="group block">
                  {n.image && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-canvas-2">
                      <Image src={n.image.src} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                    </div>
                  )}
                  <p className="label mt-4 text-fg-3">
                    {fmt(n.date)} · {source(n)}
                  </p>
                  <h3 className="mt-2 font-display font-medium tracking-tight text-[1.4rem] leading-snug group-hover:text-accent-2">{n.title}</h3>
                  {n.description && <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-fg-3">{n.description}</p>}
                </a>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <section className="border-t border-line py-14 lg:py-20">
        <Wrap>
          <h2 className="display text-display-m">Archive</h2>
          <div className="mt-10 space-y-14">
            {[...byYear.entries()].map(([year, items]) => (
              <div key={year} className="grid gap-6 lg:grid-cols-12">
                <h3 className="display text-4xl text-fg-3 lg:col-span-2">{year}</h3>
                <ul className="border-t border-line lg:col-span-10">
                  {items.map((n) => (
                    <li key={n.slug} className="border-b border-line">
                      <a
                        href={href(n)}
                        rel={n.kind === "link" ? "noopener" : undefined}
                        className="group grid gap-1 py-4 sm:grid-cols-[7rem_1fr_auto] sm:items-baseline sm:gap-6"
                      >
                        <span className="label text-fg-3">{fmt(n.date)}</span>
                        <span className="text-[16px] text-fg group-hover:text-accent-2">{n.title}</span>
                        <span className="label text-fg-3">
                          {source(n)}
                          {n.kind === "link" ? " ↗" : ""}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <CtaBand />
    </>
  );
}

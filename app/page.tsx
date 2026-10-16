import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BackgroundVideo from "@/components/site/BackgroundVideo";
import PartnerMarquee from "@/components/site/PartnerMarquee";
import { ButtonLink, CtaBand, Wrap } from "@/components/site/ui";
import { childPages, news, plainText, type NewsItem } from "@/lib/content";
import { getOwlBoxes } from "@/lib/owl-boxes";
import { site } from "@/lib/site";

/** The results section reads the live occupied-box map (Google My Maps), refreshed hourly. */
export const revalidate = 3600;

export const metadata: Metadata = {
  description:
    "Poison-free pest control in Johannesburg: rodent proofing, humane bat removal, owl boxes and bat houses. Safe for children, pets and wildlife. Call 072 365 9777.",
  alternates: { canonical: "/" },
};

/** The four things most visitors come for, in the order the brief sets. */
const routes = [
  {
    label: "Bats in your roof",
    blurb: "Humane bat exclusion: we confirm how bats get in, let them leave safely, then seal the gaps behind them.",
    href: "/bats-and-bat-boxes/bat-exclusions",
    image: "/media/bats-and-bat-boxes__bat-exclusions/773796afd4.jpg",
    alt: "A colony of bats roosting on a brick wall inside a roof",
  },
  {
    label: "Rats or mice",
    blurb: "Non-toxic rodent control: we find where they get in, proof it properly and remove what draws them.",
    href: "/non-toxic-pest-control/non-toxic-rodent-control-1",
    image: "/images/barn-owl-with-rat.jpg",
    alt: "A Barn Owl holding a rat",
  },
  {
    label: "Owl boxes",
    blurb: "Spotted Eagle and Barn Owl boxes made by our team, to buy, have installed and have serviced each year.",
    href: "/products-services/owl-boxes",
    image: "/images/spotted-eagle-owl-box.jpg",
    alt: "A Spotted Eagle Owl sitting in an EcoSolutions owl box",
  },
  {
    label: "Bat houses",
    blurb: "Slimline, Nursery and Rocket bat houses for homes, estates and farms, installed by us or collected.",
    href: "/products-services/bat-boxes",
    image: "/images/bat-house-chimney.jpg",
    alt: "An EcoSolutions Slimline bat house mounted on a chimney",
  },
];

/** Smaller routes for two groups the four cards don't cover. There is no single farms page yet. */
const supportRoutes = [
  {
    label: "Farms and orchards",
    links: [
      { label: "Barn owls for rodent control", href: "/non-toxic-pest-control/owls-and-agricultural-rodent-control-1" },
      { label: "Bat houses for crop and orchard insects", href: "/non-toxic-pest-control/bats-and-agricultural-pest-control" },
    ],
  },
  {
    label: "Already have an owl box?",
    links: [
      { label: "Annual owl box servicing", href: "/owls-and-owl-boxes/servicing" },
      { label: "Why is my box still empty?", href: "/owls-and-owl-boxes/empty" },
    ],
  },
];

const steps = [
  { t: "We assess", d: "A site visit, or for some properties a remote assessment using satellite imagery, to see what's going on and why." },
  { t: "We recommend and do the work", d: "Only what the situation needs, carried out by our own team." },
  { t: "We explain what comes next", d: "What to watch for afterwards, and whether any follow-up or servicing makes sense for you." },
];

/**
 * Testimonials shown in full on the home page, with what each was about: three, so the column
 * ends level with the results beside it. The rest are on /testimonials.
 */
const testimonialJobs: Record<string, string> = {
  "kiran-reddy": "Bat exclusion",
  "ian-hall-in-emmarentia": "Owl box installation",
  "beryl-scott-payet-steyn-city": "Owl boxes and bat houses",
};

const fmtDate = (d: string | null) => (d ? new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }) : "");
const newsHref = (n: NewsItem) => (n.kind === "link" && n.externalUrl ? n.externalUrl : n.path);

/** What a news item is, from where it lives: our news, our newsletter, or another site. */
function newsCategory(n: NewsItem) {
  if (n.kind !== "link" || !n.externalUrl || n.externalUrl.startsWith("/")) return "EcoSolutions news";
  try {
    const host = new URL(n.externalUrl).hostname.replace(/^(www|news)\./, "");
    return host === "zc.vg" ? "Our newsletter" : `External article · ${host}`;
  } catch {
    return "External article";
  }
}

const firstSentence = (s: string) => s.match(/^.{20,180}?[.!?](\s|$)/)?.[0].trim() ?? s.slice(0, 160);

export default async function HomePage() {
  const boxes = await getOwlBoxes();
  const years = boxes.map((b) => b.occupiedYear).filter((y): y is number => !!y);
  const firstYear = years.length ? Math.min(...years) : null;
  // Every customer testimonial page, in the order above, quoted in full with its own attribution.
  const pages = childPages("/testimonials");
  const quotes = Object.entries(testimonialJobs).flatMap(([slug, job]) => {
    const page = pages.find((p) => p.path.endsWith(`/${slug}`));
    const quote = page ? plainText(page.html, 600) : "";
    return page && quote ? [{ quote, who: page.title.replace(/ in /, ", "), job }] : [];
  });
  const latest = news.slice(0, 2);

  return (
    <>
      {/* 1. Hero: what we do and where, without needing the video */}
      <div className="px-2 pt-2 sm:px-3 sm:pt-3">
        <section data-theme="dark" className="relative isolate flex min-h-[calc(100svh-84px)] overflow-hidden rounded-[1.75rem] bg-[#1d2a33]">
          <BackgroundVideo className="absolute inset-0 -z-10 size-full object-cover" poster="/images/hero-poster.jpg" mobile="/media/video/hero-540.mp4" desktop="/media/video/hero-1080.mp4" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/10 to-black/45" />

          {/* Message top-left on the video itself (not the page column), calls to action bottom-right. */}
          <div className="relative z-10 flex min-h-[inherit] w-full flex-col justify-between gap-10 px-5 pb-8 pt-8 sm:px-8 sm:pb-12 sm:pt-12 lg:px-12 lg:pt-14">
            <div>
              <p className="label animate-rise text-accent">Poison-free pest control</p>
              <h1 className="display mt-5 max-w-4xl animate-rise text-display-xl [animation-delay:120ms]">
                Pest control that works the <span className="text-accent">night shift.</span>
              </h1>
              <p className="mt-6 max-w-xl animate-rise text-[1.1rem] font-medium leading-relaxed text-fg [animation-delay:260ms]">
                We remove bats from roofs humanely, rodent-proof homes without poison, and make, install and service owl boxes and bat houses. Based in Johannesburg, working with homes, estates and farms across South Africa.
              </p>
            </div>
            {/* Right inset keeps the buttons clear of the floating "Ask us" chat button. */}
            <div className="flex animate-rise flex-wrap gap-3 [animation-delay:380ms] lg:justify-end lg:pr-16" data-cta-location="home_hero">
              <ButtonLink href="/contact-us" cta="contact_our_team">
                Contact our team
              </ButtonLink>
              <ButtonLink href="/shop" variant="outline-light" className="bg-white/10 backdrop-blur-md">
                Shop owl &amp; bat boxes
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>

      {/* 2. Who we've worked with, and how (moving banner, captioned) */}
      <PartnerMarquee />

      {/* 3. How can we help? */}
      <section aria-labelledby="help" className="py-14 sm:py-20">
        <Wrap>
          <h2 id="help" className="display text-display-l">How can we help?</h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-fg-2">Choose the closest match to see how we handle it.</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map((r) => (
              <li key={r.href}>
                {/* Phones: a compact row (photo beside the text); larger screens: photo on top. */}
                <Link href={r.href} className="group flex h-full overflow-hidden rounded-2xl border border-line bg-canvas transition-colors hover:border-line-strong sm:flex-col">
                  <div className="relative w-28 shrink-0 overflow-hidden bg-canvas-2 sm:aspect-[16/10] sm:w-full">
                    <Image src={r.image} alt={r.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 112px" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 items-start justify-between gap-3 p-4 sm:p-5">
                    <span>
                      <span className="block text-[1.15rem] font-medium leading-snug tracking-tight group-hover:text-accent">{r.label}</span>
                      <span className="mt-1.5 block text-[14.5px] leading-snug text-fg-2">{r.blurb}</span>
                    </span>
                    <span aria-hidden className="mt-0.5 text-fg-3 transition group-hover:translate-x-1 group-hover:text-accent">→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {supportRoutes.map((s) => (
              <li key={s.label} className="rounded-2xl border border-line bg-canvas-2 p-5">
                <h3 className="text-[1.05rem] font-medium tracking-tight">{s.label}</h3>
                <ul className="mt-2 space-y-1.5">
                  {s.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group inline-flex items-baseline gap-2 py-1 text-[15px] text-fg-2 hover:text-accent">
                        {l.label}
                        <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* 4. Our approach: why not poison, and the steps any job follows. Text on a dark panel, the
          photo beside it undimmed (the owlet sits mid-frame, so it can't go behind the text). */}
      <section data-theme="dark" aria-labelledby="approach" className="bg-deep">
        <div className="mx-auto grid max-w-[90rem] lg:grid-cols-12">
          <div className="relative h-72 sm:h-96 lg:order-2 lg:col-span-5 lg:h-auto">
            <Image
              src="/images/owlet-in-owl-box.jpg"
              alt="A Spotted Eagle owlet looking out of an EcoSolutions owl box"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_55%]"
            />
          </div>
          <div className="px-4 py-14 sm:px-6 sm:py-20 lg:order-1 lg:col-span-7 lg:px-12 xl:pl-[max(3rem,calc((100vw-80rem)/2+1.5rem))]">
            <p className="label text-accent">Our approach</p>
            <h2 id="approach" className="display mt-4 max-w-2xl text-display-l">
              Poison doesn’t stay with the rat.
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-fg">
              A poisoned rat takes days to die, and the owls, cats and dogs that catch it are poisoned too, while rodents grow resistant. We deal with why animals are there instead.
            </p>
            <ol className="mt-10 grid max-w-2xl gap-6">
              {steps.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-white/20 pt-5">
                  <span className="label pt-1 text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="text-[1.15rem] font-medium tracking-tight">{s.t}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-fg-2">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/non-toxic-pest-control" className="mt-10 inline-flex items-baseline gap-2 text-[15px] text-fg hover:text-accent">
              More on non-toxic pest control <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Results and customer experiences */}
      <section aria-labelledby="results" className="py-14 sm:py-20">
        <Wrap className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="results" className="display text-display-l">Results and experiences</h2>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-line p-5">
                <dt className="label text-fg-3">Occupied-box map</dt>
                <dd className="mt-3">
                  <span className="display block text-[2.4rem] leading-none">{boxes.length}</span>
                  <span className="mt-2 block text-[14.5px] leading-snug text-fg-2">
                    owl boxes on our public map where owls have been recorded{firstYear ? `, since ${firstYear}` : ""}.
                  </span>
                  <Link href="/more/occupied-owl-box-map" className="mt-3 inline-block text-[14px] text-fg-2 underline underline-offset-2 hover:text-accent">
                    See the map
                  </Link>
                </dd>
              </div>
              <div className="rounded-2xl border border-line p-5">
                <dt className="label text-fg-3">Case study · Irene, Gauteng</dt>
                <dd className="mt-3">
                  <span className="display block text-[2.4rem] leading-none">9,000+</span>
                  <span className="mt-2 block text-[14.5px] leading-snug text-fg-2">
                    rodents a year eaten by Barn Owls from 12 boxes, measured by pellet analysis.
                  </span>
                  <Link href="/non-toxic-pest-control/owls-and-agricultural-rodent-control-1" className="mt-3 inline-block text-[14px] text-fg-2 underline underline-offset-2 hover:text-accent">
                    About the project
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
          {/* Stretches to the results column; the link sits at the bottom so both columns end level. */}
          <div className="lg:col-span-6 lg:flex lg:flex-col lg:justify-between lg:border-l lg:border-line lg:pl-10">
            <ul className="space-y-7">
              {quotes.map((q) => (
                <li key={q.who}>
                  <blockquote className="text-[16.5px] leading-relaxed">“{q.quote}”</blockquote>
                  <p className="mt-2 text-[14px] text-fg-3">
                    {q.who} · {q.job}
                  </p>
                </li>
              ))}
            </ul>
            <Link href="/testimonials" className="link-underline mt-8 inline-block text-[15px]">
              Read all testimonials
            </Link>
          </div>
        </Wrap>
      </section>

      {/* 6. From the field: two recent items and our non-profit */}
      <section aria-labelledby="field" className="border-t border-line py-14 sm:py-20">
        <Wrap className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="field" className="display text-display-m">From the field</h2>
              <Link href="/news" className="link-underline text-[15px]">
                All news
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {latest.map((n) => {
                const href = newsHref(n);
                const external = href.startsWith("http");
                return (
                  <li key={n.slug}>
                    <a href={href} rel={external ? "noopener" : undefined} className="group block">
                      <p className="label text-fg-3">
                        {fmtDate(n.date)} · {newsCategory(n)}
                      </p>
                      <h3 className="mt-2 text-[1.1rem] font-medium leading-snug tracking-tight group-hover:text-accent">
                        {n.title}
                        {external && <span aria-label=" (opens another site)"> ↗</span>}
                      </h3>
                      {n.description && <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">{firstSentence(n.description)}</p>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-2xl bg-canvas-2 p-6 lg:col-span-4">
            <p className="label text-fg-3">Our non-profit</p>
            <h3 className="mt-3 text-[1.2rem] font-medium leading-snug tracking-tight">Owlproject.org</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-2">Owl boxes and lessons in townships and schools, changing what children think of owls.</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
              <Link href="/owlproject" className="link-underline">
                About Owlproject.org
              </Link>
              <a href={site.owlproject} rel="noopener" className="link-underline">
                owlproject.org ↗
              </a>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 7. Final contact, for people unsure what they need */}
      <CtaBand
        title="Not sure what you need? Tell us what’s happening."
        body="Describe what you’ve seen or heard, and where. One of our consultants will get back to you to arrange a site visit or, where it suits, a remote assessment using satellite imagery."
        cta={{ label: "Contact our team", href: "/contact-us" }}
        phone
      />
    </>
  );
}

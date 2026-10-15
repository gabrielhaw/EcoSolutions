import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BackgroundVideo from "@/components/site/BackgroundVideo";
import CountUp from "@/components/site/CountUp";
import PartnerMarquee from "@/components/site/PartnerMarquee";
import ProblemPicker, { type Problem } from "@/components/site/ProblemPicker";
import Rail from "@/components/site/Rail";
import { ButtonLink, CtaBand, Wrap } from "@/components/site/ui";
import { childPages, news, plainText } from "@/lib/content";
import { formatRand, getProducts, shopImg } from "@/lib/shop";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  description:
    "Poison-free pest control in Johannesburg: rodent proofing, humane bat removal, owl boxes and bat houses. Safe for children, pets and wildlife. Call 072 365 9777.",
  alternates: { canonical: "/" },
};

const problems: Problem[] = [
  {
    label: "Rats or mice in the house",
    href: "/non-toxic-pest-control/non-toxic-rodent-control-1",
    blurb: "We find how they get in, seal it properly and remove what attracts them.",
    image: "/images/barn-owl-with-rat.jpg",
    alt: "A Barn Owl holding a rat",
  },
  {
    label: "Bats in the roof",
    href: "/bats-and-bat-boxes/bat-exclusions",
    blurb: "Permitted, humane exclusion plus a bat house so they don't come back.",
    image: "/media/bats-and-bat-boxes__bat-exclusions/773796afd4.jpg",
    alt: "A colony of bats roosting on a brick wall inside a roof",
  },
  {
    label: "Rodents on the farm",
    href: "/non-toxic-pest-control/owls-and-agricultural-rodent-control-1",
    blurb: "Barn owl programmes planned from satellite imagery and installed nationwide.",
    image: "/images/owl-box-in-gum-tree.jpg",
    alt: "An EcoSolutions owl box mounted in a gum tree",
  },
  {
    label: "Insects in crops or orchards",
    href: "/non-toxic-pest-control/bats-and-agricultural-pest-control",
    blurb: "Bat banks that hunt crop pests every night of the season.",
    image: "/media/non-toxic-pest-control__bats-and-agricultural-pest-control/c6f8a0fdaa.jpg",
    alt: "A bat bank on poles above a farm dam",
  },
  {
    label: "I'd like owls in my garden",
    href: "/owls-and-owl-boxes/join-the-owl-box-project",
    blurb: "Join the Owl Box Project: installation, annual service and monitoring.",
    image: "/images/spotted-eagle-owlets-in-owl-box.jpg",
    alt: "Three Spotted Eagle owlets in an owl box",
  },
  {
    label: "My owl box is still empty",
    href: "/owls-and-owl-boxes/empty",
    blurb: "Usually it's the substrate or the spot. Here's what to check.",
    image: "/images/owl-box-service.jpg",
    alt: "A technician servicing an owl box from a ladder",
  },
];

const steps = [
  {
    t: "Take away the reasons to stay",
    d: "Seal every gap over 6 mm with steel, mesh or cement, and cut the creepers and branches rodents use as highways.",
  },
  {
    t: "Bring in the predators",
    d: "One owlet eats 2–3 rodents a night; one bat house, up to 60,000 insects. We place boxes where they get used.",
  },
  {
    t: "Keep it working",
    d: "An annual service before breeding season: new substrate, varnish, bee-proofing, and data on every box.",
  },
];

// Shop products featured on the home page rail, in this order (live prices from Shopify).
const featured = [
  "spotted-eagle-owl-box",
  "barn-owl-box",
  "owl-box-project-package-installation-5-year-service-plan",
  "bat-box",
  "bat-hotel",
  "rocket-bat-box",
  "bats-and-stables",
  "annual-owl-box-service-1",
  "build-it-kit-diy-owl-home",
  "junior-scientist-kit",
];

const whyNotPoison = [
  { href: "/news/41-children-hospitalised-after-rat-poison-consumption", label: "41 children hospitalised after rat poison consumption" },
  { href: "/news/a-new-breed-of-2018super-rodents2019-resistant-to-poison-could-be-dangerous-to-humans", label: "Poison-resistant ‘super rodents’ are spreading" },
  { href: "/news/cat-poisoned-and-dying-dog2019s-blood-saves-his-life", label: "A cat poisoned by rodenticide, saved by a dog’s blood" },
];

function testimonials() {
  return childPages("/testimonials")
    .filter((t) => !t.path.endsWith("karen-stander-krugersdorp"))
    .map((t) => ({ quote: plainText(t.html, 260), who: t.title.replace(/ in /, ", ") }));
}

const newsHref = (n: (typeof news)[number]) => (n.kind === "link" && n.externalUrl ? n.externalUrl : n.path);

export default async function HomePage() {
  const shop = await getProducts();
  const rail = featured.map((h) => shop.find((p) => p.handle === h)).filter((p) => p !== undefined);
  const quotes = testimonials();
  const latest = news.slice(0, 8);
  const delay = (i: number, step = 80) => ({ "--d": `${i * step}ms` }) as React.CSSProperties;

  return (
    <>
      {/* Hero: bats leaving a bat house at dusk */}
      <div className="px-2 pt-2 sm:px-3 sm:pt-3">
        <section data-theme="dark" className="relative isolate flex min-h-[calc(100svh-84px)] items-end overflow-hidden rounded-[1.75rem] bg-[#1d2a33]">
          <BackgroundVideo className="absolute inset-0 -z-10 size-full object-cover" poster="/images/hero-poster.jpg" mobile="/media/video/hero-540.mp4" desktop="/media/video/hero-1080.mp4" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

          <Wrap className="relative z-10 pb-10 pt-32 sm:pb-14">
            <p className="label animate-rise text-accent">Poison-free pest control · Johannesburg</p>
            <h1 className="display mt-5 max-w-4xl animate-rise text-display-xl [animation-delay:120ms]">
              Pest control that works the <span className="text-accent">night shift.</span>
            </h1>
            <div className="mt-8 grid animate-rise items-end gap-6 [animation-delay:260ms] lg:grid-cols-12">
              <p className="max-w-lg text-[1.1rem] font-medium leading-relaxed text-fg lg:col-span-7">
                Bats and owls hunt pests every night. We give them a home, seal rodents out, and remove bats from roofs humanely.
              </p>
              <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                <ButtonLink href="/contact-us">Book a site visit</ButtonLink>
                <ButtonLink href="/shop" variant="outline-light" className="bg-white/10 backdrop-blur-md">
                  Shop owl &amp; bat boxes
                </ButtonLink>
              </div>
            </div>
            <p className="mt-10 flex animate-fade items-center gap-2.5 text-[13px] text-fg-2 [animation-delay:600ms]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Bats leaving one of our bat houses at dusk
            </p>
          </Wrap>
        </section>
      </div>

      <PartnerMarquee />

      {/* Proof in numbers */}
      <section aria-label="EcoSolutions in numbers" className="pt-16 sm:pt-20">
        <Wrap>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
            {[
              { fig: <CountUp to={160} suffix="+" />, label: "occupied EcoSolutions owl boxes in Gauteng", href: "/more/occupied-owl-box-map" },
              { fig: <CountUp to={9000} suffix="+" />, label: "rodents a year eaten from 12 owl boxes at Irene", href: "/non-toxic-pest-control/owls-and-agricultural-rodent-control-1" },
              { fig: "GDARD", label: "accredited for permitted bat exclusions in Gauteng", href: "/bats-and-bat-boxes/bat-exclusions" },
              { fig: <CountUp to={260000} />, label: "children and parents reached by Owlproject.org", href: "/owlproject" },
            ].map((f, i) => (
              <li key={f.href} className="bg-canvas" data-reveal style={delay(i, 90)}>
                <Link href={f.href} className="group flex h-full flex-col justify-between gap-6 p-5 transition-colors hover:bg-canvas-2 sm:gap-10 sm:p-8">
                  <span className="display block text-[clamp(1.9rem,1.4rem+2.4vw,3.6rem)] leading-none">{f.fig}</span>
                  <span className="flex items-end justify-between gap-4 text-[13.5px] leading-snug text-fg-2 sm:text-[14.5px]">
                    <span className="max-w-[24ch]">{f.label}</span>
                    <span aria-hidden className="text-fg-3 transition group-hover:translate-x-1 group-hover:text-accent">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>


      {/* What's the problem? */}
      <section className="py-14 sm:py-20">
        <Wrap>
          <div className="mb-12 max-w-2xl" data-reveal>
            <p className="label text-fg-3">Start here</p>
            <h2 className="display mt-4 text-display-l">What’s the problem?</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-fg-2">Pick the one closest to yours.</p>
          </div>
          <ProblemPicker problems={problems} />
        </Wrap>
      </section>

      {/* Why not poison */}
      <section data-theme="dark" className="relative isolate overflow-hidden">
        <Image src="/images/owlet-in-owl-box.jpg" alt="A Spotted Eagle owlet looking out of an EcoSolutions owl box" fill sizes="100vw" className="-z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/10" />
        <Wrap className="py-16 sm:py-24">
          <div className="max-w-xl" data-reveal>
            <p className="label text-accent">Why not just use poison?</p>
            <h2 className="display mt-4 text-display-l">Poison doesn’t stay with the rat.</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-fg">
              A poisoned rat takes days to die, and the owls, cats and dogs that catch it are poisoned too. Meanwhile, rodents are becoming resistant.
            </p>
            <ul className="mt-8 border-t border-white/20">
              {whyNotPoison.map((l) => {
                const item = news.find((n) => n.path === l.href);
                const href = item ? newsHref(item) : l.href;
                return (
                  <li key={l.href} className="border-b border-white/20">
                    <a href={href} rel={href.startsWith("http") ? "noopener" : undefined} className="group flex items-baseline justify-between gap-4 py-3.5 text-[15px] text-fg hover:text-accent">
                      <span>{l.label}</span>
                      <span aria-hidden>{href.startsWith("http") ? "↗" : "→"}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Wrap>
      </section>

      {/* How we do it, with layered photos */}
      <section className="overflow-hidden py-14 sm:py-24">
        <Wrap className="grid items-center gap-16 lg:grid-cols-12">
          <div className="relative h-[420px] sm:h-[540px] lg:col-span-6" aria-hidden>
            <div className="drift-slow absolute left-0 top-0 h-[78%] w-[78%] overflow-hidden rounded-3xl">
              <Image src="/images/bat-bank-at-sunset.jpg" alt="" fill sizes="(min-width: 1024px) 38vw, 78vw" className="object-cover" />
            </div>
            <div className="drift-fast absolute bottom-0 right-0 h-[52%] w-[50%] overflow-hidden rounded-3xl border-[6px] border-canvas shadow-2xl shadow-black/30">
              <Image src="/images/owl-box-service.jpg" alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <p className="label text-fg-3" data-reveal>How we do it</p>
            <h2 className="display mt-4 text-display-l" data-reveal>
              Three steps.
              <br />
              <span className="text-fg-3">No poison.</span>
            </h2>
            <ol className="mt-10">
              {steps.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-6" data-reveal style={delay(i, 100)}>
                  <span className="label pt-1.5 text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="text-[1.3rem] font-medium tracking-tight">{s.t}</h3>
                    <p className="mt-2 max-w-xl text-[15.5px] leading-relaxed text-fg-2">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Wrap>
      </section>

      {/* Testimonials: Jane Goodall leads; every quote links to the full page */}
      <section className="border-t border-line py-14 sm:py-20">
        <Wrap className="grid gap-14 lg:grid-cols-12">
          <Link href="/testimonials" className="group block lg:col-span-7" data-reveal>
            <p className="label text-fg-3">From Dr Jane Goodall</p>
            <blockquote className="display mt-6 text-[clamp(1.6rem,1.2rem+1.6vw,2.5rem)] leading-[1.2]">
              <span className="text-accent">“</span>Together we can make this a better world for all, save some of the amazing animals with whom we share this planet. What you are doing is amazing &amp; I truly look forward to working with you.”
            </blockquote>
            <p className="mt-6 flex items-center gap-2 text-[15px] text-fg-3">
              Handwritten note to Jonathan Haw
              <span className="text-accent transition-transform group-hover:translate-x-1">→ see the letter</span>
            </p>
          </Link>
          <ul className="space-y-8 lg:col-span-5 lg:border-l lg:border-line lg:pl-10">
            {quotes.slice(0, 3).map((q, i) => (
              <li key={q.who} data-reveal style={delay(i, 90)}>
                <Link href="/testimonials" className="group block">
                  <p className="text-[15.5px] leading-relaxed text-fg-2 transition-colors group-hover:text-fg">“{q.quote}”</p>
                  <p className="mt-2 text-[14px] text-fg-3">{q.who}</p>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/testimonials" className="link-underline text-[15px]">
                Read all testimonials
              </Link>
            </li>
          </ul>
        </Wrap>
      </section>

      {/* Shop */}
      <section className="py-14 sm:py-20">
        <Wrap>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="label text-fg-3">Made, installed &amp; serviced by us</p>
              <h2 className="display mt-4 text-display-l">Homes for the pest controllers</h2>
            </div>
            <ButtonLink href="/shop" variant="outline-light">
              Visit the shop
            </ButtonLink>
          </div>
          <Rail label="Featured products">
            {rail.map((p) => (
              <li key={p.handle} className="w-[64%] shrink-0 snap-start min-[480px]:w-[calc(50%-10px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)]">
                <Link href={`/shop/${p.handle}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-canvas-2">
                    {p.images[0] && (
                      <Image src={shopImg(p.images[0].src, 700)} alt={p.images[0].alt} fill unoptimized className="object-cover transition duration-700 group-hover:scale-105" />
                    )}
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <span className="line-clamp-2 text-[15px] font-medium leading-snug tracking-tight group-hover:text-accent">{p.title}</span>
                    <span className="shrink-0 text-[13.5px] tabular-nums text-fg-2">
                      {p.variants.length > 1 && <span className="text-fg-3">from </span>}
                      {formatRand(p.priceFrom)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </Rail>
        </Wrap>
      </section>

      {/* News */}
      <section className="border-t border-line py-14 sm:py-20">
        <Wrap>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="label text-fg-3">News &amp; press</p>
              <h2 className="display mt-4 text-display-l">From the field</h2>
            </div>
            <ButtonLink href="/news" variant="outline-light">
              All news
            </ButtonLink>
          </div>
          <Rail label="Latest news">
            {latest.map((n) => (
              <li key={n.slug} className="w-[64%] shrink-0 snap-start min-[480px]:w-[calc(50%-10px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)]">
                <a href={newsHref(n)} rel={n.kind === "link" ? "noopener" : undefined} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-canvas-2">
                    {n.image && <Image src={n.image.src} alt="" fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 64vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                  </div>
                  <p className="label mt-4 text-fg-3">
                    {n.date && new Date(n.date).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
                    {n.kind === "link" && " · press ↗"}
                  </p>
                  <h3 className="mt-1.5 line-clamp-2 text-[15px] font-medium leading-snug tracking-tight transition-colors group-hover:text-accent">{n.title}</h3>
                </a>
              </li>
            ))}
          </Rail>
        </Wrap>
      </section>

      {/* Owlproject */}
      <section className="border-t border-line py-14 sm:py-16">
        <Wrap className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <p className="label text-fg-3">Our non-profit</p>
            <h2 className="display mt-4 text-display-m">
              Owlproject.org puts owl boxes in townships and schools, <span className="text-fg-3">and changes what children think of owls.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <ButtonLink href="/owlproject" variant="ink">
              About Owlproject.org
            </ButtonLink>
            <ButtonLink href={site.owlproject} variant="outline-light">
              owlproject.org ↗
            </ButtonLink>
          </div>
        </Wrap>
      </section>

      <CtaBand />
    </>
  );
}

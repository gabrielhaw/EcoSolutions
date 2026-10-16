import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, CtaBand, Wrap } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "About EcoSolutions | Urban Ecology & Poison-Free Pest Control",
  description:
    "EcoSolutions is a Johannesburg urban ecology company that replaces poison with owls, bats and exclusion. Led by director Jonathan Haw. Winner of BirdLife SA's 2025 Owl Award.",
  alternates: { canonical: "/about" },
};

const pillars = [
  { k: "Exclude", v: "Seal entry points and remove what attracts rodents. Sole distributor of the E2 humane trap, about 300 installed." },
  { k: "Relocate", v: "Permitted bat exclusions, with a bat house provided so the colony has somewhere to go. GDARD-accredited in Gauteng." },
  { k: "Recruit", v: "Owl boxes and bat houses, built, installed and serviced by us, with data kept on height, orientation, design and occupancy." },
];

const projects = [
  { where: "Irene, Gauteng", what: "Barn owl rodent control", stat: "9,000+", unit: "rodents a year from 12 boxes", img: "/images/owl-box-in-gum-tree.jpg", href: "/non-toxic-pest-control/owls-and-agricultural-rodent-control-1" },
  { where: "Macadamia orchards", what: "Bats against stink bugs", stat: "100", unit: "bat houses with Univen & Subtrop", img: "/images/bat-bank-at-sunset.jpg", href: "/non-toxic-pest-control/bats-and-agricultural-pest-control" },
  { where: "Parkhurst, Johannesburg", what: "A poison-free suburb", stat: "20", unit: "owl territories mapped", img: "/images/spotted-eagle-owl-box.jpg", href: "/non-toxic-pest-control/poison-free-suburbs" },
  { where: "Schools & townships", what: "Owlproject.org", stat: "260,000", unit: "children & parents since 2001", img: "/images/spotted-eagle-owlets-in-owl-box.jpg", href: "/owlproject" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="px-2 pt-2 sm:px-3 sm:pt-3">
        <header data-theme="dark" className="relative flex min-h-[78svh] items-end overflow-hidden rounded-[1.75rem]">
          <Image src="/images/barn-owl-portrait.jpg" alt="A Barn Owl looking out into the night" fill priority sizes="100vw" className="animate-fade object-cover object-[60%_40%]" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          <Wrap className="relative pb-12 pt-32 sm:pb-16">
            <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
            <h1 className="display mt-6 max-w-4xl animate-rise text-display-xl font-semibold">An urban ecology company that does pest control.</h1>
            <p className="mt-6 max-w-xl animate-rise text-[1.2rem] font-medium leading-relaxed text-white/90 [animation-delay:150ms]">
              Our cities have plenty of owls and bats, too few places for them to breed, and too much poison. Fix that, and much of the pest control takes care of itself.
            </p>
          </Wrap>
        </header>
      </div>

      {/* Approach */}
      <section className="py-14 sm:py-20">
        <Wrap className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="label text-fg-3">How we work</p>
            <h2 className="display mt-4 text-display-l">Integrated pest management, built on data.</h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-fg-2">
              Based in Randpark Ridge, Randburg, and led by director Jonathan Haw. We work for homes, schools, estates, farms and stables across Gauteng, and run projects nationally and abroad.
            </p>
          </div>
          <ol className="lg:col-span-7">
            {pillars.map((p, i) => (
              <li key={p.k} className="grid grid-cols-[3rem_9rem_1fr] items-baseline gap-4 border-t border-line py-6 last:border-b max-sm:grid-cols-[3rem_1fr]" data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                <span className="label text-accent">0{i + 1}</span>
                <h3 className="text-[1.5rem] font-medium tracking-tight">{p.k}</h3>
                <p className="text-[15.5px] leading-relaxed text-fg-2 max-sm:col-start-2">{p.v}</p>
              </li>
            ))}
          </ol>
        </Wrap>
      </section>

      {/* Projects as photo cards */}
      <section className="border-t border-line py-14 sm:py-20">
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="label text-fg-3">Selected projects</p>
              <h2 className="display mt-4 text-display-l">Work in the field</h2>
            </div>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p, i) => (
              <li key={p.what} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                <Link href={p.href} data-theme="dark" className="group relative isolate flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-3xl p-6">
                  <Image src={p.img} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/20 to-black/85" />
                  <span>
                    <span className="label text-accent">{p.where}</span>
                    <span className="mt-2 block text-[1.4rem] font-semibold leading-tight tracking-tight">{p.what}</span>
                  </span>
                  <span>
                    <span className="display block text-[2.6rem] leading-none">{p.stat}</span>
                    <span className="mt-2 block text-[14px] font-medium text-white/85">{p.unit}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* Recognition: bento grid */}
      <section id="awards" className="scroll-mt-24 border-t border-line bg-canvas-2 py-14 sm:py-20">
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="label text-fg-3">Awards &amp; recognition</p>
              <h2 className="display mt-4 text-display-l">Recognised by people who know owls.</h2>
            </div>
            <Link href="/more/podcasts-and-interviews" className="link-underline text-[15px]">
              Hear Jonathan Haw on podcasts &amp; radio
            </Link>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-4 lg:grid-rows-2">
            {/* Feature: BirdLife SA Owl Award */}
            <div
              data-theme="dark"
              className="group relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl p-7 sm:p-9 lg:col-span-2 lg:row-span-2"
              data-reveal
            >
              <Image src="/media/news-thumbs/48024576a4.jpg" alt="The EcoSolutions team receiving BirdLife South Africa's 2025 Owl Award" fill sizes="(min-width: 1024px) 50vw, 100vw" className="-z-10 object-cover object-[50%_15%]" />
              <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/30 via-45% to-transparent" />
              <span className="absolute left-7 top-7 rounded-full bg-accent px-3.5 py-1.5 text-[13px] font-semibold text-canvas sm:left-9 sm:top-9">2025 · Winner</span>
              <span className="display text-[clamp(1.9rem,1.4rem+1.8vw,2.8rem)] font-semibold leading-tight">BirdLife South Africa Owl Award</span>
              <span className="mt-3 max-w-md text-[16px] font-medium leading-relaxed text-white/90">For championing owl conservation and natural, poison-free pest control.</span>
            </div>

            <div className="flex flex-col justify-between gap-8 rounded-3xl border border-line bg-canvas p-7 lg:col-span-2" data-reveal style={{ "--d": "90ms" } as React.CSSProperties}>
              <div className="flex items-start justify-between gap-6">
                <span className="label text-accent">2018 · Houston, USA</span>
                <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-white">
                  <Image src="/media/news__owls-and-education-changing-owl-perceptions-in-southern-africa/abd272b33d.jpeg" alt="International Owl Center logo" fill sizes="80px" className="object-contain p-1.5" />
                </span>
              </div>
              <div>
                <p className="text-[1.4rem] font-medium leading-tight tracking-tight">World Owl Hall of Fame Special Achievement Award</p>
                <p className="mt-2 text-[14.5px] text-fg-2">International Owl Center, for Owlproject.org’s education work.</p>
              </div>
            </div>

            <Link href="/news/art-awards-and-awareness" className="group flex flex-col justify-between gap-8 rounded-3xl border border-line bg-canvas p-7 transition-colors hover:border-line-strong" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
              <span className="label text-accent">2017 · Évora, Portugal</span>
              <span>
                <span className="block text-[1.2rem] font-medium leading-tight tracking-tight group-hover:text-accent">World Owl Conference</span>
                <span className="mt-2 block text-[14px] leading-snug text-fg-2">Paper: “From Cures to Curses: owls in traditional healing in southern Africa”.</span>
              </span>
            </Link>

            <div className="flex flex-col justify-between gap-8 rounded-3xl border border-line bg-canvas p-7" data-reveal style={{ "--d": "230ms" } as React.CSSProperties}>
              <span className="label text-accent">2014 – 2015</span>
              <span>
                <span className="block text-[1.2rem] font-medium leading-tight tracking-tight">Dr Jane Goodall &amp; SABC</span>
                <span className="mt-2 block text-[14px] leading-snug text-fg-2">The Township Owl Project, supported by Jane Goodall and featured on SABC.</span>
              </span>
            </div>
          </div>
        </Wrap>
      </section>

      <CtaBand />
    </>
  );
}

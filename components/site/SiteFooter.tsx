import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const telHref = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;

const columns = [
  {
    title: "Services",
    links: [
      { label: "Rodent control", href: "/non-toxic-pest-control/non-toxic-rodent-control-1" },
      { label: "Humane bat removal", href: "/bats-and-bat-boxes/bat-exclusions" },
      { label: "Owls for farms", href: "/non-toxic-pest-control/owls-and-agricultural-rodent-control-1" },
      { label: "Bats for farms", href: "/non-toxic-pest-control/bats-and-agricultural-pest-control" },
      { label: "Owl box service", href: "/owls-and-owl-boxes/servicing" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Owls & owl boxes", href: "/owls-and-owl-boxes" },
      { label: "Bats & bat houses", href: "/bats-and-bat-boxes" },
      { label: "Owl box FAQ", href: "/faqs/owl-box-faq" },
      { label: "Owl cams", href: "/owl-webcam" },
      { label: "News & press", href: "/news" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Shop", href: "/shop" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Owlproject.org", href: "/owlproject" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
];

// Smaller stories worth a look, each with a one-line hook.
const explore = [
  { label: "Schools programme", note: "Owl boxes in partner schools, mapped", href: "/schools" },
  { label: "International owl project", note: "Owlproject.org's exchanges abroad", href: "/our-work/international" },
  { label: "Bats & insects", note: "A short film on bats as pest control", href: "/bats-and-insects-video" },
  { label: "Owlet diary", note: "A Spotted Eagle owlet, day 7 to day 31", href: "/spotted-eagle-owl-webcam-1" },
  { label: "Owl box questions", note: "How long until owls move in?", href: "/owls-and-owl-boxes/autumn-newsletter-2017" },
];

const socials = [
  { label: "Facebook", href: site.social.facebook, d: "M14 8h3V4h-3a5 5 0 0 0-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9a1 1 0 0 1 1-1Z" },
  { label: "Instagram", href: site.social.instagram, d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" },
  { label: "YouTube", href: site.social.youtube, d: "M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.4-1.2.4-3.8.4-3.8s0-2.6-.4-3.8ZM10 15V9l5.2 3L10 15Z" },
  { label: "X", href: site.social.x, d: "M17.8 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L1.8 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" },
];

export default function SiteFooter() {
  return (
    <footer data-theme="dark" className="relative mx-2 mt-10 overflow-hidden rounded-t-[1.75rem] bg-canvas text-fg-2 sm:mx-3 sm:mt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Links */}
        <div className="grid gap-12 pb-14 pt-16 lg:grid-cols-12 lg:pt-20">
          <address className="grid content-start gap-1.5 not-italic text-[14.5px] leading-relaxed lg:col-span-3">
            <Image src="/brand/logo-white.png" alt="EcoSolutions" width={1200} height={292} sizes="140px" className="h-8 w-auto" />
            <p className="mb-5 mt-4 max-w-[26ch] text-fg-3">Poison-free pest control from Johannesburg.</p>
            <a href={telHref(site.phone.mobile)} className="text-fg hover:text-accent">{site.phone.mobile}</a>
            <a href={telHref(site.phone.office)} className="text-fg hover:text-accent">{site.phone.office}</a>
            <a href={`mailto:${site.email}`} className="text-fg hover:text-accent">{site.email}</a>
            <span className="mt-3">
              {site.address.lines[0]}, {site.address.lines[1]}
              <br />
              {site.address.suburb}, {site.address.city}
            </span>
            <a href={site.address.mapsUrl} rel="noopener" className="link-underline w-fit text-fg">
              Get directions
            </a>
          </address>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="label text-fg-3">{c.title}</p>
                <ul className="mt-5 space-y-3 text-[14.5px]">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="transition-colors hover:text-fg">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <p className="label text-fg-3">Explore</p>
            <ul className="mt-5 divide-y divide-line rounded-2xl border border-line">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-canvas-2">
                    <span>
                      <span className="block text-[14.5px] text-fg">{l.label}</span>
                      <span className="block text-[13px] text-fg-3">{l.note}</span>
                    </span>
                    <span aria-hidden className="text-fg-3 transition group-hover:translate-x-0.5 group-hover:text-accent">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse gap-6 border-t border-line py-8 text-[13px] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} · {site.hours}
          </p>
          <ul className="flex gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} rel="noopener" aria-label={s.label} className="grid size-10 place-items-center rounded-full border border-line text-fg-2 transition-colors hover:border-fg hover:text-fg">
                  <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]" fill="currentColor">
                    <path d={s.d} fillRule="evenodd" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Oversized wordmark, cropped at the bottom edge */}
      <p aria-hidden className="pointer-events-none select-none whitespace-nowrap text-center text-[15.5vw] font-semibold leading-[0.72] tracking-[-0.06em] text-fg/[0.05]">
        EcoSolutions
      </p>
    </footer>
  );
}

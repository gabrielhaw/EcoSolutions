import { site } from "@/lib/site";
import type { Crumb } from "@/lib/content";

export type Faq = { q: string; a: string };

export type PageSeo = {
  /** <title> — keyword-led, kept under ~60 chars (the " | EcoSolutions" suffix is added by the layout). */
  title?: string;
  /** Meta description, ~150 chars, written to earn the click. */
  description?: string;
  /** Visible H1 when it should differ from the legacy page title. */
  h1?: string;
  /** Short lede shown under the H1. */
  lede?: string;
  /** Marks the page as a bookable service: adds Service schema + booking panel. */
  service?: { name: string; serviceType: string; cta: { label: string; href: string } };
  faqs?: Faq[];
};

/**
 * Per-URL search overrides. URLs are unchanged from the old site; only the
 * on-page targeting is sharpened.
 */
export const seo: Record<string, PageSeo> = {
  "/non-toxic-pest-control": {
    title: "Non-Toxic Pest Control in Johannesburg & Gauteng",
    description:
      "Poison-free pest control from EcoSolutions: rodent proofing, humane bat removal, owl boxes and bat houses. Safe for children, pets and wildlife.",
    h1: "Pest control without poison",
  },
  "/non-toxic-pest-control/non-toxic-rodent-control-1": {
    title: "Non-Toxic Rodent Control | Poison-Free Rat Control",
    description:
      "Get rid of rats and mice without poison. EcoSolutions seals entry points, removes harbourage and installs humane traps for homes and businesses in Gauteng.",
    h1: "Non-toxic rodent control",
    lede: "Rat poison is a short-term fix that harms pets and owls. Proofing your property against rodents lasts much longer.",
    service: { name: "Non-toxic rodent control", serviceType: "Rodent control", cta: { label: "Book a rodent consultation", href: "/contact-us?topic=rodents" } },
    faqs: [
      { q: "How small a gap can rats and mice get through?", a: "Mice and bats can pass through gaps of about 6 mm; rats need roughly 13 mm. Every gap larger than that in exterior walls, doors and roof lines needs to be sealed." },
      { q: "Is spray foam enough to keep rodents out?", a: "No. Foam on its own is one of the least effective exclusion methods because rodents chew straight through it. Gaps should be packed with stainless steel or copper wool, mesh or cement." },
      { q: "Do you use poison at all?", a: "No. We combine exclusion, habitat changes and toxin-free CO2-powered humane traps, and we encourage owls, which eat rodents naturally." },
    ],
  },
  "/bats-and-bat-boxes/bat-exclusions": {
    title: "Humane Bat Removal Johannesburg | Bats in Your Roof?",
    description:
      "Bats in the roof? EcoSolutions is permitted by GDARD to do humane bat exclusions in Gauteng. One-way valves, sealing and a bat house so they don't return.",
    h1: "Bats in your roof? Humane bat removal",
    lede: "EcoSolutions is the only company accredited by GDARD to carry out permitted bat exclusions in Gauteng. The bats leave unharmed and can't get back in.",
    service: { name: "Humane bat exclusion", serviceType: "Wildlife removal", cta: { label: "Book a dusk site visit", href: "/contact-us?topic=bats" } },
    faqs: [
      { q: "How do I know if there are bats in my roof?", a: "Look out for squeaking and scratching at dusk, droppings (guano) and white streaks of urine on the walls near where the bats get in and out." },
      { q: "Is it legal to remove bats myself?", a: "No. Bats are protected under the NEMBA Act 10 of 2004 and the Gauteng Nature Conservation Bill. You need a permit to catch, capture, keep or transport them. Spraying them with chemicals is illegal and unethical." },
      { q: "How does a bat exclusion work?", a: "After an evening site visit and dusk survey, we seal every secondary gap and fit a one-way valve to the main exit. The bats leave at night and can't come back. Once the roof is clear, the valve comes off and the hole is sealed permanently." },
      { q: "Why do you install a bat house?", a: "Bats are very loyal to their roosts. A nearby bat house gives them an alternative, which makes the exclusion far more likely to succeed. We don't do exclusions without one." },
    ],
  },
  "/non-toxic-pest-control/owls-and-agricultural-rodent-control-1": {
    title: "Barn Owl Rodent Control for Farms | Owl Box Programmes",
    description:
      "Barn owl boxes as farm rodent control. One EcoSolutions project of 12 occupied boxes eats more than 9,000 rodents a year. Remote planning, nationwide installation.",
    h1: "Owls for agricultural rodent control",
    service: { name: "Barn owl rodent control programme", serviceType: "Agricultural pest control", cta: { label: "Speak to a consultant", href: "/contact-us?topic=farm" } },
  },
  "/non-toxic-pest-control/bats-and-agricultural-pest-control": {
    title: "Bats for Agricultural Pest Control | Bat Banks for Farms",
    description:
      "Insect-eating bats cut crop pests and spray cycles. EcoSolutions designs, installs and services bat bank programmes for orchards, vineyards and farms.",
    service: { name: "Agricultural bat house programme", serviceType: "Agricultural pest control", cta: { label: "Plan a bat bank", href: "/contact-us?topic=farm" } },
  },
  "/non-toxic-pest-control/poison-free-suburbs": {
    title: "Poison-Free Suburbs | Community Owl Box Networks",
    description:
      "How EcoSolutions maps owl territories across a suburb to build a poison-free network of owl boxes. The Parkhurst model, with interactive maps.",
  },
  "/owls-and-owl-boxes": {
    title: "Owl Boxes & the Owl Box Project | Johannesburg",
    description:
      "Everything about owl boxes in South Africa: location, orientation, occupancy and servicing. From the team behind 160+ occupied owl boxes in Gauteng.",
    h1: "Owls & owl boxes",
  },
  "/owls-and-owl-boxes/servicing": {
    title: "Owl Box Service | Annual Owl Box Maintenance",
    description:
      "An owl box without fresh substrate won't be used. Our annual owl box service cleans, re-gravels, varnishes and bee-proofs your box before breeding season.",
    service: { name: "Annual owl box service", serviceType: "Owl box maintenance", cta: { label: "Book your service", href: "/shop/annual-owl-box-service-1" } },
  },
  "/owls-and-owl-boxes/join-the-owl-box-project": {
    title: "Join the Owl Box Project | Get an Owl Box Installed",
    description:
      "Join the Owl Box Project and give Spotted Eagle Owls and Barn Owls a safe place to breed. Installation, annual servicing and monitoring in Gauteng.",
    lede: "We install an owl box for Spotted Eagle Owls or Barn Owls, service it every year and keep records on it. You get owls; the owls get a safe place to breed.",
    service: { name: "Owl Box Project package", serviceType: "Owl box installation and servicing", cta: { label: "See the package", href: "/shop/owl-box-project-package-installation-5-year-service-plan" } },
  },
  "/bats-and-bat-boxes": {
    title: "Bats & Bat Houses | Bat Removal and Bat Boxes",
    description:
      "Humane bat removal, bat houses for homes and farms, and what bats do for pest control. EcoSolutions, Johannesburg.",
    h1: "Bats & bat houses",
  },
  "/products-services": {
    title: "Owl Boxes, Bat Houses & Barbet Logs | Products & Services",
    description:
      "Owl boxes, bat houses and barbet nesting logs, built, installed and serviced by EcoSolutions. Order online or book an annual service.",
    h1: "Products & services",
  },
  "/products-services/owl-boxes": {
    title: "Owl Boxes for Sale & Installation | Spotted Eagle & Barn Owl",
    description:
      "EcoSolutions makes, installs and services owl boxes for Spotted Eagle Owls and Barn Owls, with more than 150 occupied boxes nationally. Order yours online.",
    service: { name: "Owl box supply and installation", serviceType: "Owl box installation", cta: { label: "Order an owl box", href: "/shop?c=owls" } },
  },
  "/products-services/bat-boxes": {
    title: "Bat Houses & Bat Boxes | Installed in Gauteng",
    description:
      "Slimline bat houses (up to 100 bats) and Nursery and Rocket bat hotels (up to 300 bats), made and installed by EcoSolutions. Natural mosquito control.",
    service: { name: "Bat house supply and installation", serviceType: "Bat house installation", cta: { label: "Order a bat house", href: "/shop?c=bats" } },
  },
  "/products-services/barbet-nesting-logs": {
    title: "Barbet Nesting Logs | 100% Sisal Barbet Logs",
    description:
      "Sisal barbet nesting logs that barbets excavate themselves. Bring breeding barbets into your garden. Delivered and installed by EcoSolutions.",
  },
  "/products-services/annual-services": {
    title: "Annual Owl Box & Bat House Servicing",
    description:
      "Annual servicing keeps owl boxes and bat houses occupied: structural checks, new substrate, re-varnishing and bee-proofing before breeding season.",
    service: { name: "Annual owl box and bat house service", serviceType: "Wildlife habitat maintenance", cta: { label: "Book a service", href: site.bookService } },
  },
  "/faqs": { title: "Owl Box FAQs", description: "Answers to common questions about owl box occupancy, orientation, location and servicing." },
  "/testimonials": { title: "Client Testimonials", description: "What homeowners, estates and conservationists say about EcoSolutions' owl box, bat house and bat exclusion work." },
};

export function seoFor(path: string): PageSeo {
  return seo[path] ?? {};
}

/* ---------- JSON-LD ---------- */

const ORG_ID = `${site.url}/#organization`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    logo: `${site.url}/logo.png`,
    image: `${site.url}/images/barn-owl-with-rat.jpg`,
    email: site.email,
    telephone: site.phone.mobile,
    priceRange: "R",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: `${site.address.suburb}, ${site.address.city}`,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    sameAs: Object.values(site.social),
    knowsAbout: [
      "Non-toxic pest control",
      "Rodent exclusion",
      "Humane bat removal",
      "Owl boxes",
      "Bat houses",
      "Integrated pest management",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-ZA",
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.href === "/" ? "" : c.href}`,
    })),
  };
}

export function serviceJsonLd(path: string, s: NonNullable<PageSeo["service"]>, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.serviceType,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(a: { path: string; title: string; description: string; image?: string | null; date?: string | null; modified?: string | null }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    url: `${site.url}${a.path}`,
    mainEntityOfPage: `${site.url}${a.path}`,
    image: a.image ? `${site.url}${a.image}` : undefined,
    datePublished: a.date ?? undefined,
    dateModified: a.modified ?? a.date ?? undefined,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

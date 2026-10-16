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
  /** "At a glance" numbers shown above the long-form article, with sources where the article cites them. */
  facts?: Fact[];
};

export type Fact = { figure: string; label: string; source?: string };

/**
 * Per-URL search overrides. URLs are unchanged from the old site; only the
 * on-page targeting is sharpened. Facts come from EcoSolutions' own published content.
 */
export const seo: Record<string, PageSeo> = {
  "/non-toxic-pest-control": {
    title: "Non-Toxic Pest Control in Johannesburg & Gauteng",
    description:
      "Poison-free pest control from EcoSolutions: rodent proofing, humane bat removal, owl boxes and bat houses. Safe for children, pets and wildlife.",
    h1: "Pest control without poison",
  },
  "/non-toxic-pest-control/non-toxic-rodent-control-1": {
    facts: [
      { figure: "6 mm", label: "gap a house mouse (Mus musculus) can squeeze through", source: "Greenhall & Franz, 1994" },
      { figure: "13 mm", label: "gap for Norway and roof rats (Rattus norvegicus, R. rattus)", source: "Corrigan, 1997" },
      { figure: "Steel", label: "or copper wool behind every foam seal. Foam on its own gets chewed through" },
      { figure: "0", label: "poison used. Proofing and habitat changes are permanent" },
    ],
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
    facts: [
      { figure: "GDARD", label: "the only company accredited for permitted bat exclusions in Gauteng" },
      { figure: "NEMBA", label: "all South African bats are protected under Act 10 of 2004, s56" },
      { figure: "1-way", label: "valve lets bats leave at dusk but not return; we confirm before sealing" },
      { figure: "Dusk", label: "survey on the first visit, to watch exactly where they come out" },
    ],
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
    facts: [
      { figure: "9,000+", label: "rodents a year eaten from 12 boxes on our Irene project" },
      { figure: "2–3", label: "rodents per owlet per night over a 40–50 day nestling period" },
      { figure: "8–20", label: "eggs in a Barn Owl “super clutch” when rodent numbers erupt" },
      { figure: "−62%", label: "rodent damage in Malaysian palm groves, with poison eliminated", source: "275 boxes, 1 per 5 ha" },
    ],
    title: "Barn Owl Rodent Control for Farms | Owl Box Programmes",
    description:
      "Barn owl boxes as farm rodent control. One EcoSolutions project of 12 occupied boxes eats more than 9,000 rodents a year. Remote planning, nationwide installation.",
    h1: "Owls for agricultural rodent control",
    service: { name: "Barn owl rodent control programme", serviceType: "Agricultural pest control", cta: { label: "Speak to a consultant", href: "/contact-us?topic=farm" } },
  },
  "/non-toxic-pest-control/bats-and-agricultural-pest-control": {
    facts: [
      { figure: "~2,000", label: "mosquitoes a night for one 8 g Cape Serotine (Neoromicia capensis)" },
      { figure: ">100%", label: "of body weight in insects for a lactating Little Brown Bat on a peak night", source: "Kurta et al., 2010" },
      { figure: "100", label: "bat houses in macadamia orchards with Univen and Subtrop" },
      { figure: "Fear", label: "effect: moths dive and change course when they hear echolocation", source: "Roeder, 1964" },
    ],
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
    facts: [
      { figure: "1×", label: "a year, before the owl breeding season starts" },
      { figure: "4", label: "checks: new substrate, secure fixing, fresh varnish, intact bee-proofing" },
      { figure: "Sticks", label: "left by squirrels, geese and genets stop owls breeding; we remove them" },
    ],
    service: { name: "Annual owl box service", serviceType: "Owl box maintenance", cta: { label: "Book your service", href: "/shop/annual-owl-box-service-1" } },
  },
  "/owls-and-owl-boxes/join-the-owl-box-project": {
    title: "Join the Owl Box Project | Get an Owl Box Installed",
    description:
      "Join the Owl Box Project and give Spotted Eagle Owls and Barn Owls a safe place to breed. Installation, annual servicing and monitoring in Gauteng.",
    lede: "We install an owl box for Spotted Eagle Owls or Barn Owls, service it every year and keep records on it. You get owls; the owls get a safe place to breed.",
    service: { name: "Owl Box Project package", serviceType: "Owl box installation and servicing", cta: { label: "See the package", href: "/shop/owl-box-project-package-installation-5-year-service-plan" } },
    facts: [
      { figure: "150+", label: "occupied EcoSolutions owl boxes on our database" },
      { figure: "1×", label: "service a year before breeding season. Without it, owls rarely breed" },
      { figure: "5", label: "things we record for every box: height, orientation, design, placement, maintenance" },
      { figure: "2", label: "species: Spotted Eagle Owl (Bubo africanus) and Barn Owl (Tyto alba)" },
    ],
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
    facts: [
      { figure: "150+", label: "occupied EcoSolutions owl boxes on our database" },
      { figure: "2", label: "designs: Barn Owl (Tyto alba) and Spotted Eagle Owl (Bubo africanus)" },
      { figure: "1×", label: "service a year before breeding season: new substrate, varnish, bee-proofing" },
    ],
    title: "Owl Boxes for Sale & Installation | Spotted Eagle & Barn Owl",
    description:
      "EcoSolutions makes, installs and services owl boxes for Spotted Eagle Owls and Barn Owls, with more than 150 occupied boxes nationally. Order yours online.",
    service: { name: "Owl box supply and installation", serviceType: "Owl box installation", cta: { label: "Order an owl box", href: "/shop?c=owls" } },
    faqs: [
      { q: "Which owls are your boxes for?", a: "We make two designs: one for Spotted Eagle Owls (Bubo africanus), our most successful owl box occupants, and one for Barn Owls (Tyto alba), the rodent specialists of the owl world." },
      { q: "Why does an owl box need an annual service?", a: "Squirrels, Egyptian geese, genets and other birds use owl boxes out of season and fill them with sticks, paper and litter. Unless that is removed and the substrate replaced, owls won’t breed in the box. The service also checks that the box is still firmly attached, re-varnishes it and renews the bee-proofing." },
      { q: "What if I can’t commit to the annual service?", a: "Then it may be worth not installing one. Without fresh substrate each year owls won’t use the box, and an empty box usually brings disappointment." },
      { q: "Can I collect a box instead of having it installed?", a: "Yes. Each box is available with installation, with installation on a gum pole, or ready for collection." },
    ],
  },
  "/products-services/bat-boxes": {
    facts: [
      { figure: "100", label: "bats in a Slimline house, wall-mounted in afternoon sun" },
      { figure: "300", label: "bats in a Nursery or Rocket bat hotel on a gum pole" },
      { figure: "60,000", label: "insects a night eaten by one occupied bat house" },
    ],
    title: "Bat Houses & Bat Boxes | Installed in Gauteng",
    description:
      "Slimline bat houses (up to 100 bats) and Nursery and Rocket bat hotels (up to 300 bats), made and installed by EcoSolutions. Natural mosquito control.",
    service: { name: "Bat house supply and installation", serviceType: "Bat house installation", cta: { label: "Order a bat house", href: "/shop?c=bats" } },
    faqs: [
      { q: "Which bat house should I choose?", a: "The Slimline bat house holds up to 100 bats and goes against a wall that gets afternoon sun. The Nursery and Rocket bat hotels hold up to 300 bats and are mounted on a gum pole in full sun." },
      { q: "Are bats harmful to people or pets?", a: "No. Bats are unobtrusive, aren’t harmful to you or your pets and have no interest in getting caught in your hair. They help keep mosquitoes under control." },
      { q: "Does a bat house need servicing?", a: "Yes, once a year. Without it a bat house deteriorates and becomes uninhabitable. The service covers re-varnishing, a bee treatment, an occupancy check and fixing or replacing worn boxes." },
      { q: "Why is my bat house still empty?", a: "Placement, heat and patience all play a part. Our guide “Why is my bat box empty?” explains what to check." },
    ],
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
  "/online-order-form": {
    title: "Order Owl Boxes, Bat Houses & Services Online",
    description: "Order EcoSolutions owl boxes, bat houses and annual services online, or ask us to call you back. Installation in Gauteng; secure payment through Shopify.",
    h1: "Order online",
    lede: "Owl boxes, bat houses and annual services are in our online shop. For anything else, call, WhatsApp or ask us to call you back.",
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

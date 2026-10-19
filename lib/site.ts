export const site = {
  name: "EcoSolutions",
  legalName: "EcoSolutions Urban Ecology",
  domain: "ecosolutions.co.za",
  url: "https://ecosolutions.co.za",
  tagline: "Poison-free pest control with owls, bats and smart exclusion.",
  description:
    "EcoSolutions is a Johannesburg-based, poison-free pest control company. We control rodents and insects with owl boxes, bat houses, humane bat removal and rodent exclusion — effective, sustainable and safe for children, pets and wildlife.",
  director: "Jonathan Haw",
  phone: { mobile: "+27 72 365 9777", office: "+27 11 791 7326" },
  whatsapp: "27723659777",
  email: "info@ecosolutions.co.za",
  hours: "Weekdays 08:00 – 17:00",
  address: {
    // Confirmed by Gabriel, 16 Oct 2026.
    lines: ["Building B, Ground Floor", "Lifestyle Business Park", "Lifestyle Garden Centre", "Cnr Ysterhout & Beyers Naudé Drive"],
    street: "Building B, Ground Floor, Lifestyle Business Park, Cnr Ysterhout Drive & Beyers Naudé Drive",
    suburb: "Randpark Ridge",
    city: "Randburg",
    postalCode: "2196",
    region: "Gauteng",
    country: "ZA",
    geo: { lat: -26.0948375, lng: 27.941258 },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=EcoSolutions+Lifestyle+Business+Park+Randpark+Ridge",
  },
  shop: "/shop",
  bookService: "/shop?c=services",
  owlproject: "https://owlproject.org/",
  social: {
    facebook: "https://www.facebook.com/Ecosolutionsurbanecology/",
    instagram: "https://www.instagram.com/ecosolutionssa/",
    x: "https://twitter.com/EcoSolutionsSA",
    youtube: "https://www.youtube.com/channel/UC0PEokYmQM9G2dPqkFEqE2Q",
  },
  areaServed: ["Johannesburg", "Pretoria", "Gauteng", "South Africa"],
} as const;

export type NavLink = { label: string; href: string; blurb?: string; group?: string };
export type Section = NavLink & { eyebrow: string; intro: string; children: NavLink[] };

/**
 * Site architecture. Paths mirror the original ecosolutions.co.za URLs so existing
 * Google rankings and backlinks carry straight over. Drives the nav, footer,
 * hub pages, breadcrumbs, related links and sitemap.
 */
export const sections: Section[] = [
  {
    label: "Pest control",
    href: "/non-toxic-pest-control",
    eyebrow: "Non-toxic pest control",
    intro:
      "Rodenticides kill the owls, cats and dogs that eat poisoned rats, and the rats come back. We remove the reasons pests move in, then let predators keep the numbers down.",
    children: [
      { label: "Non-toxic rodent control", href: "/non-toxic-pest-control/non-toxic-rodent-control-1", group: "Homes & businesses", blurb: "Rat and mouse proofing for homes, estates and businesses. No poison." },
      { label: "Humane bat removal", href: "/bats-and-bat-boxes/bat-exclusions", group: "Homes & businesses", blurb: "Permitted bat exclusions that get bats out of your roof without harming them." },
      { label: "Owls for agricultural rodent control", href: "/non-toxic-pest-control/owls-and-agricultural-rodent-control-1", group: "Farms & estates", blurb: "Barn owl box programmes for farms, feedlots and stables." },
      { label: "Bats for agricultural pest control", href: "/non-toxic-pest-control/bats-and-agricultural-pest-control", group: "Farms & estates", blurb: "Bat banks that reduce crop-damaging insects and spray cycles." },
      { label: "Poison-free suburbs", href: "/non-toxic-pest-control/poison-free-suburbs", group: "Homes & businesses", blurb: "Mapped owl box networks that make whole neighbourhoods poison-free." },
    ],
  },
  {
    label: "Owls",
    href: "/owls-and-owl-boxes",
    eyebrow: "Owls & owl boxes",
    intro:
      "We have serviced more than 160 occupied owl boxes across Gauteng. Our advice on placement, orientation and servicing comes from that record.",
    children: [
      { label: "Join the Owl Box Project", href: "/owls-and-owl-boxes/join-the-owl-box-project", group: "Get started", blurb: "How the programme works and what you commit to." },
      { label: "Owl box service", href: "/owls-and-owl-boxes/servicing", group: "Get started", blurb: "Why the annual service decides whether owls breed." },
      { label: "Owl box location", href: "/owls-and-owl-boxes/owl-box-location", group: "Owl box guide", blurb: "Picking an undisturbed spot in an urban garden." },
      { label: "Owl box orientation", href: "/owls-and-owl-boxes/owl-box-orientation", group: "Owl box guide", blurb: "What our data says about which way boxes face." },
      { label: "Owl box occupancy", href: "/owls-and-owl-boxes/owl-box-occupancy", group: "Owl box guide", blurb: "How long before owls move in? An honest answer." },
      { label: "Plastic vs wooden owl boxes", href: "/owls-and-owl-boxes/plastic-vs-wooden-owl-boxes", group: "Owl box guide", blurb: "Materials, heat and why we build in wood." },
      { label: "Owls in agriculture", href: "/owls-and-owl-boxes/owls-in-agriculture", group: "About owls", blurb: "Barn owls as a working part of farm IPM." },
      { label: "Still empty?", href: "/owls-and-owl-boxes/empty", group: "Owl box guide", blurb: "Troubleshooting a box that hasn't been used." },
      { label: "About owls", href: "/owls-and-owl-boxes/about-owls", group: "About owls", blurb: "Spotted Eagle Owls and Barn Owls in South Africa." },
      { label: "Success stories", href: "/owls-and-owl-boxes/success-stories-gallery", group: "About owls", blurb: "Occupied boxes and owlets from our members." },
      { label: "Owl ring recoveries", href: "/owls-and-owl-boxes/owl-ring-recoveries", group: "About owls", blurb: "Where our ringed owls turned up later." },
      { label: "Owl cams", href: "/owl-webcam", group: "Get started", blurb: "Live and archived footage from inside our boxes." },
    ],
  },
  {
    label: "Bats",
    href: "/bats-and-bat-boxes",
    eyebrow: "Bats & bat houses",
    intro:
      "One bat colony can eat thousands of mosquitoes and crop pests a night. We get bats out of roofs humanely and give them better homes nearby.",
    children: [
      { label: "Bats in the roof? Humane bat removal", href: "/bats-and-bat-boxes/bat-exclusions", group: "Bats in your roof", blurb: "Permitted, insurance-friendly bat exclusions." },
      { label: "Bats in agriculture (IPM)", href: "/bats-and-bat-boxes/bats-in-agriculture-ipm", group: "Farms & stables", blurb: "Bat banks for orchards, vineyards and crops." },
      { label: "Bats around horses & stables", href: "/bats-and-bat-boxes/can-bats-help-reduce-flying-insects-around-horses-and-stables", group: "Farms & stables", blurb: "Fewer midges and mosquitoes around your horses." },
      { label: "The science behind bats and stables", href: "/bats-and-bat-boxes/bats-and-stables", group: "Farms & stables", blurb: "The research, including African Horse Sickness vectors." },
      { label: "Ecosystem services provided by bats", href: "/bats-and-bat-boxes/pest-control-through-bats", group: "Farms & stables", blurb: "What bats are worth to farmers." },
      { label: "About bats", href: "/bats-and-bat-boxes/about-bats", group: "About bats", blurb: "Common myths, and what bats actually do." },
      { label: "Bat species", href: "/bats-and-bat-boxes/bat-species", group: "About bats", blurb: "A field guide to bats that use our houses." },
      { label: "Why is my bat box empty?", href: "/bats-and-bat-boxes/why-is-my-bat-box-empty", group: "About bats", blurb: "Placement, heat and patience." },
    ],
  },
  {
    label: "Products & services",
    href: "/products-services",
    eyebrow: "Products & services",
    intro:
      "We make our owl boxes, bat houses and barbet logs ourselves, install them, and service them every year so they stay in use.",
    children: [
      { label: "Owl boxes", href: "/products-services/owl-boxes", blurb: "Spotted Eagle Owl and Barn Owl boxes, installed." },
      { label: "Bat boxes", href: "/products-services/bat-boxes", blurb: "Slimline, Nursery and Rocket bat houses." },
      { label: "Barbet nesting logs", href: "/products-services/barbet-nesting-logs", blurb: "Sisal logs that barbets excavate themselves." },
      { label: "Annual services", href: "/products-services/annual-services", blurb: "The yearly service that keeps boxes occupied." },
      { label: "Order form", href: "/online-order-form", blurb: "Order installation or delivery." },
    ],
  },
];

export const extraSections: Section[] = [
  {
    label: "FAQs",
    href: "/faqs",
    eyebrow: "Frequently asked",
    intro: "Answers to the questions we hear most about owl boxes and servicing.",
    children: [
      { label: "Owl box FAQ", href: "/faqs/owl-box-faq" },
      { label: "Owl box service (voice note)", href: "/faqs/owl-box-service" },
      { label: "Reversed sexual dimorphism", href: "/faqs/reversed-sexual-dimorphism" },
    ],
  },
  {
    label: "More",
    href: "/more",
    eyebrow: "Media & maps",
    intro: "Interviews, maps and videos about our work with owls and bats.",
    children: [
      { label: "Podcasts & interviews", href: "/more/podcasts-and-interviews", blurb: "Jonathan Haw on owls, bats and poison-free pest control." },
      { label: "Occupied owl box map", href: "/more/occupied-owl-box-map", blurb: "Every occupied EcoSolutions owl box in Gauteng." },
      { label: "Bats as integrated pest management (video)", href: "/more/bats-as-integrated-pest-management", blurb: "A short film on bat banks in agriculture." },
    ],
  },
  {
    label: "Owl cams",
    href: "/owl-webcam",
    eyebrow: "Owl cams",
    intro: "Cameras inside our owl boxes. They go live during the breeding season, and past footage is on our YouTube channel.",
    children: [
      { label: "Linden owl cam", href: "/owl-webcam/linden", blurb: "Spotted Eagle Owls breeding in a Linden garden." },
      { label: "Mziki owl cam", href: "/owl-webcam/mziki", blurb: "Verreaux's Eagle Owls at Mziki." },
    ],
  },
  {
    label: "Testimonials",
    href: "/testimonials",
    eyebrow: "Testimonials",
    intro: "What clients say after we install and service their boxes.",
    children: [],
  },
];

export const primaryNav: NavLink[] = [
  ...sections.map(({ label, href }) => ({ label, href })),
  { label: "Owlproject.org", href: "/owlproject" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
];

/** The four services people look for most (GA4, Oct 2026): homepage shortcuts and the top of the Services menu. */
export const keyServices: (NavLink & { image: string; alt: string })[] = [
  {
    label: "Bats in the roof",
    href: "/bats-and-bat-boxes/bat-exclusions",
    blurb: "Permitted, humane bat exclusion.",
    image: "/media/bats-and-bat-boxes__bat-exclusions/773796afd4.jpg",
    alt: "A colony of bats roosting on a brick wall inside a roof",
  },
  {
    label: "Owl boxes",
    href: "/products-services/owl-boxes",
    blurb: "Made, installed and serviced by our team.",
    image: "/images/spotted-eagle-owl-box.jpg",
    alt: "A Spotted Eagle Owl sitting in an EcoSolutions owl box",
  },
  {
    label: "Non-toxic rodent control",
    href: "/non-toxic-pest-control/non-toxic-rodent-control-1",
    blurb: "Rat and mouse proofing. No poison.",
    image: "/images/barn-owl-with-rat.jpg",
    alt: "A Barn Owl holding a rat",
  },
  {
    label: "Bat houses",
    href: "/products-services/bat-boxes",
    blurb: "Homes for up to 100 or 300 bats.",
    image: "/images/bat-house-chimney.jpg",
    alt: "An EcoSolutions Slimline bat house mounted on a chimney",
  },
];

export type MenuItem = NavLink & { items?: NavLink[]; image?: string; intro?: string };

/**
 * The condensed header menu: a handful of key pages per topic. Every other page
 * stays one click away on its section hub, so nothing loses internal links.
 */
export const menu: MenuItem[] = [
  {
    label: "Services",
    href: "/non-toxic-pest-control",
    image: "/images/barn-owl-with-rat.jpg",
    intro: "Humane bat removal, rodent proofing, owl boxes and bat houses for homes, estates and farms.",
    items: [
      { label: "Bats in the roof? Humane bat removal", href: "/bats-and-bat-boxes/bat-exclusions" },
      { label: "Non-toxic rodent control", href: "/non-toxic-pest-control/non-toxic-rodent-control-1" },
      { label: "Owl boxes, installed & serviced", href: "/products-services/owl-boxes" },
      { label: "Bat houses, installed & serviced", href: "/products-services/bat-boxes" },
      { label: "Owls for farms", href: "/non-toxic-pest-control/owls-and-agricultural-rodent-control-1" },
      { label: "Bats for farms", href: "/non-toxic-pest-control/bats-and-agricultural-pest-control" },
      { label: "Poison-free suburbs", href: "/non-toxic-pest-control/poison-free-suburbs" },
    ],
  },
  {
    label: "Owls",
    href: "/owls-and-owl-boxes",
    image: "/images/barn-owl-portrait.jpg",
    intro: "Owl boxes made, installed and serviced by us, with a live map of the boxes owls have moved into.",
    items: [
      { label: "Join the Owl Box Project", href: "/owls-and-owl-boxes/join-the-owl-box-project" },
      { label: "Owl box service", href: "/owls-and-owl-boxes/servicing" },
      { label: "Is my box still empty?", href: "/owls-and-owl-boxes/empty" },
      { label: "Owl cams", href: "/owl-webcam" },
    ],
  },
  {
    label: "Bats",
    href: "/bats-and-bat-boxes",
    image: "/images/bat-bank-at-sunset.jpg",
    intro: "The only GDARD-accredited bat exclusion company in Gauteng.",
    items: [
      { label: "Bats in the roof?", href: "/bats-and-bat-boxes/bat-exclusions" },
      { label: "Bats in agriculture", href: "/bats-and-bat-boxes/bats-in-agriculture-ipm" },
      { label: "Bats & stables", href: "/bats-and-bat-boxes/can-bats-help-reduce-flying-insects-around-horses-and-stables" },
      { label: "About bats", href: "/bats-and-bat-boxes/about-bats" },
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    image: "/images/spotted-eagle-owl-box.jpg",
    intro: "Owl boxes, bat houses and services, made, installed and serviced by us.",
    items: [
      { label: "Owl boxes", href: "/shop?c=owls" },
      { label: "Bat houses", href: "/shop?c=bats" },
      { label: "Services & consultations", href: "/shop?c=services" },
      { label: "Gifts & hampers", href: "/shop?c=gifts" },
    ],
  },
  { label: "Owlproject", href: "/owlproject" },
  { label: "About", href: "/about" },
];

/**
 * Partners and organisations we've worked with or been recognised by.
 * `logo` is a trimmed, transparent PNG in /public/logos/partners (with its pixel size,
 * used to size logos evenly); partners without one show as text.
 */
export const partners: {
  name: string;
  logo?: { src: string; width: number; height: number };
  /**
   * What the relationship was, where the site's own pages record it. All organisations in this
   * list were confirmed as worked with by Gabriel (16 Oct 2026); the others have no write-up yet.
   */
  relation?: string;
}[] = [
  {
    name: "International Owl Center",
    logo: { src: "/logos/partners/international-owl-center.png", width: 540, height: 410 },
    // /news/art-awards-and-awareness
    relation: "Owl Hall of Fame award to Owlproject.org",
  },
  { name: "BirdLife South Africa", logo: { src: "/logos/partners/birdlife.png", width: 1262, height: 939 } },
  {
    name: "Steyn City",
    logo: { src: "/logos/partners/steyn-city.png", width: 1494, height: 372 },
    // /news/barn-owls-tyto-alba-thrive-in-chartwell, /testimonials/beryl-scott-payet-steyn-city
    relation: "Owl Box Project estate",
  },
  {
    name: "University of Venda",
    logo: { src: "/logos/partners/university-of-venda.png", width: 200, height: 198 },
    // /non-toxic-pest-control/bats-and-agricultural-pest-control
    relation: "Macadamia bat house research",
  },
  {
    name: "Subtrop",
    logo: { src: "/logos/partners/subtrop.png", width: 505, height: 193 },
    relation: "Macadamia bat house research",
  },
  { name: "Dainfern", logo: { src: "/logos/partners/dainfern.png", width: 946, height: 750 } },
  { name: "Nestlé South Africa", logo: { src: "/logos/partners/nestle.png", width: 346, height: 92 } },
  { name: "The Coves", logo: { src: "/logos/partners/the-coves.png", width: 586, height: 294 } },
  { name: "GDARD", logo: { src: "/logos/partners/gdard.png", width: 800, height: 244 } },
  { name: "National Council of SPCAs", logo: { src: "/logos/partners/spca.png", width: 906, height: 868 } },
];

import type { FormId } from "@/lib/forms";

/**
 * The bookable services, with a short summary of each and the Shopify products
 * that go with it. Wording comes from the existing service pages and the
 * Shopify listings; nothing here is new information. Drives the summary panel
 * on service pages, "Order online" on service pages and "About this service"
 * on product pages.
 */
export type Service = {
  path: string;
  name: string;
  /** What we offer, in a few short lines. */
  offer: string[];
  /** Where we work, as already stated on the site or in the shop. */
  area: string;
  /** How to enquire: the main button, then the others. */
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Zoho form embedded lower on the page, if any. */
  form?: FormId;
  /** Shopify product handles, most relevant first. */
  products: string[];
};

export const CALLBACK_ANCHOR = "request-callback";

export const services: Service[] = [
  {
    path: "/bats-and-bat-boxes/bat-exclusions",
    name: "Humane bat exclusion",
    offer: [
      "An evening site visit: a consultation, a site inspection and a dusk survey, followed by a quote.",
      "Every secondary gap sealed, and a one-way valve on the main exit so the bats leave at dusk and can’t get back in.",
      "A follow-up visit to make sure the roof is clear, then the last hole sealed permanently.",
      "A bat house nearby for the colony. We don’t do exclusions without one.",
    ],
    area: "Gauteng. EcoSolutions is the only company accredited by GDARD to carry out permitted bat exclusions in Gauteng.",
    primary: { label: "Request a callback", href: `#${CALLBACK_ANCHOR}` },
    secondary: { label: "Book the site visit online", href: "/shop/bat-exclusion" },
    form: "callback",
    products: ["bat-exclusion", "bat-box", "bat-hotel", "rocket-bat-box"],
  },
  {
    path: "/non-toxic-pest-control/non-toxic-rodent-control-1",
    name: "Non-toxic rodent control",
    offer: [
      "A site visit and consultation that looks at everything drawing rodents to your property.",
      "Exclusion: every gap over 6 mm sealed with steel or copper wool, mesh or cement. Never foam on its own.",
      "Changes to the garden and buildings that remove shelter and access: creepers, branches, bins and compost heaps.",
      "Toxin-free, CO2-powered humane traps, and owls to keep numbers down. No poison.",
    ],
    area: "Homes and businesses in Gauteng, from our office in Randpark Ridge, Johannesburg.",
    primary: { label: "Request a callback", href: `#${CALLBACK_ANCHOR}` },
    secondary: { label: "Book a consultation online", href: "/shop/rodent-consultation" },
    form: "callback",
    products: ["rodent-consultation", "barn-owl-box", "spotted-eagle-owl-box"],
  },
  {
    path: "/products-services/owl-boxes",
    name: "Owl boxes",
    offer: [
      "Breeding boxes for Spotted Eagle Owls and Barn Owls, made by our own team from recycled weatherproof plywood.",
      "Installed in a tree or on a gum pole, or ready for you to collect.",
      "An annual service before breeding season: new substrate, fresh varnish, bee-proofing and a check that the box is secure.",
      "The Owl Box Project package: installation plus five years of annual servicing.",
    ],
    area: "Installation in Gauteng. Boxes can also be collected.",
    primary: { label: "Shop owl boxes", href: "/shop?c=owls" },
    secondary: { label: "Request a callback", href: `#${CALLBACK_ANCHOR}` },
    form: "callback",
    products: [
      "spotted-eagle-owl-box",
      "barn-owl-box",
      "owl-box-project-package-installation-5-year-service-plan",
      "annual-owl-box-service-1",
      "build-it-kit-diy-owl-home",
    ],
  },
  {
    path: "/products-services/bat-boxes",
    name: "Bat houses",
    offer: [
      "The Slimline bat house, for up to 100 bats, mounted on a wall that gets afternoon sun.",
      "The Nursery and Rocket bat hotels, for up to 300 bats, on a gum pole in full sun.",
      "Installation, or ready for you to collect.",
      "An annual bat house service: re-varnishing, a bee treatment, an occupancy check and repairs.",
    ],
    area: "Installation in Gauteng. For farms, we install and manage bat house projects nationally, planned with satellite imagery.",
    primary: { label: "Shop bat houses", href: "/shop?c=bats" },
    secondary: { label: "Request a callback", href: `#${CALLBACK_ANCHOR}` },
    form: "callback",
    products: ["bat-box", "bat-hotel", "rocket-bat-box", "annual-owl-box-service", "bats-and-stables"],
  },
  {
    path: "/owls-and-owl-boxes/servicing",
    name: "Annual owl box service",
    offer: [
      "A clean-out of sticks and litter left by squirrels, geese and genets.",
      "New pea gravel substrate, which owls need to lay their eggs.",
      "A check that the box is firmly attached, a new coat of varnish and intact bee-proofing.",
    ],
    area: "Boxes are serviced by area, once a year before the owl breeding season.",
    primary: { label: "Book your service", href: "/shop/annual-owl-box-service-1" },
    secondary: { label: "Request a callback", href: "/request-a-callback" },
    products: ["annual-owl-box-service-1", "owl-box-project-package-installation-5-year-service-plan"],
  },
  {
    path: "/online-order-form",
    name: "Ordering",
    offer: [
      "Owl boxes, bat houses and annual services can be ordered and paid for in our online shop.",
      "Payment goes through Shopify’s secure checkout.",
      "For anything else, including installation questions, ask us to call you back.",
    ],
    area: "Installation in Gauteng. Boxes can also be collected.",
    primary: { label: "Go to the shop", href: "/shop" },
    secondary: { label: "Request a callback", href: "/request-a-callback" },
    form: "order",
    products: ["spotted-eagle-owl-box", "barn-owl-box", "bat-box", "bat-hotel", "annual-owl-box-service-1"],
  },
];

export function serviceFor(path: string): Service | undefined {
  return services.find((s) => s.path === path);
}

/**
 * The service page that explains a product. A product can appear on several
 * service pages; the first one listing it as its lead product wins, then the
 * first that lists it at all.
 */
export function serviceForProduct(handle: string): Service | undefined {
  const real = services.filter((s) => s.path !== "/online-order-form");
  return real.find((s) => s.products[0] === handle) ?? real.find((s) => s.products.includes(handle));
}

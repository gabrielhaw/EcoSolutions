// Generates content/redirects.json from the migrated news index plus a
// hand-maintained map of retired ecosolutions.co.za (Plone) URLs.
// Run: node scripts/build-redirects.mjs
import fs from "node:fs";

const news = JSON.parse(fs.readFileSync("content/news-index.json", "utf8"));

const manual = {
  "/news/aggregator": "/news",
  "/home-links": "/",
  "/home-links/annual-service": "/products-services/annual-services",
  "/home-links/bats-as-pest-control": "/non-toxic-pest-control/bats-and-agricultural-pest-control",
  "/home-links/bats-out-of-your-roof": "/bats-and-bat-boxes/bat-exclusions",
  "/home-links/non-toxic-rodent-control": "/non-toxic-pest-control/non-toxic-rodent-control-1",
  "/home-links/order-online": "/online-order-form",
  "/home-links/owls-as-pest-control": "/non-toxic-pest-control/owls-and-agricultural-rodent-control-1",
  "/owls-and-owl-boxes/owl-cams": "/owl-webcam",
  "/township-owl-box-project": "/owlproject",
  "/owl-box-project/owl-box-faq": "/faqs/owl-box-faq",
  "/owl-box-project": "/owls-and-owl-boxes/join-the-owl-box-project",
  "/owl-box-project/owl-ring-recoveries/owl-ring-recoveries": "/owls-and-owl-boxes/owl-ring-recoveries",
  "/owl-box-project/:path*": "/owls-and-owl-boxes/:path*",
  "/bat-boxes": "/bats-and-bat-boxes",
  "/bat-boxes/:path*": "/bats-and-bat-boxes/:path*",
  "/pest-control/owls-and-integrated-pest-management": "/non-toxic-pest-control/owls-and-agricultural-rodent-control-1",
  "/pest-control": "/non-toxic-pest-control",
  "/national-owl-box-database": "/more/occupied-owl-box-map",
  "/siteworkspace/parkhurst-2013-the-owl-box-programme-aims-to-make-parkhurst-the-first-poison-free-suburb": "/non-toxic-pest-control/poison-free-suburbs",
  "/siteworkspace/owls-as-a-valuable-component-in-natural-and-poison-free-rodent-control": "/non-toxic-pest-control/owls-and-agricultural-rodent-control-1",
  "/siteworkspace/rodent-control": "/non-toxic-pest-control/non-toxic-rodent-control-1",
  "/siteworkspace/rodent-page": "/non-toxic-pest-control/non-toxic-rodent-control-1",
  "/siteworkspace/bat-exclusion": "/bats-and-bat-boxes/bat-exclusions",
  "/siteworkspace/barn-owl-webpage": "/non-toxic-pest-control/owls-and-agricultural-rodent-control-1",
  "/siteworkspace/5-tips": "/news/5-tips-for-a-rodent-free-winter",
  "/siteworkspace/spotted-eagle-owls-bubo-africanus-new-start": "/owls-and-owl-boxes/about-owls",
  "/siteworkspace/owl-boxes-tab": "/products-services/owl-boxes",
  // Placeholder routes from the first draft of the new site
  "/contact": "/contact-us",
  "/services": "/products-services",
  "/products": "/products-services",
  "/projects": "/about",
  "/conservation": "/about",
};

const permanent = Object.entries(manual).map(([source, destination]) => ({ source, destination, permanent: true }));

// Thin testimonial pages now live on /testimonials
for (const f of fs.readdirSync("content/legacy")) {
  if (f.startsWith("testimonials__")) {
    const slug = f.replace("testimonials__", "").replace(".json", "");
    permanent.push({ source: `/testimonials/${slug}`, destination: `/testimonials#${slug}`, permanent: true });
  }
}

const press0 = [];
// Root-level press link on the old site
press0.push({
  source: "/birds-and-bats-reduce-vineyard-pests-boost-yields-naturally",
  destination: "https://www.vinetur.com/en/2025082290523/birds-and-bats-found-to-significantly-reduce-vineyard-pests-and-crop-losses-in-hungary.html",
  permanent: false,
});

// Press links: the old site 302'd these to the external article. Keep doing so.
const press = [...press0, ...news
  .filter((n) => n.kind === "link")
  .map((n) => {
    let ok = false;
    try {
      ok = Boolean(new URL(n.externalUrl).hostname);
    } catch {}
    // drop tracking params (some contain a stray "http://" that breaks path-to-regexp)
    const dest = ok ? n.externalUrl.replace(/[?&]fbclid=.*$/, "") : null;
    return dest
      ? { source: n.path, destination: dest, permanent: false }
      : { source: n.path, destination: "/news", permanent: true };
  })];

const out = [...permanent, ...press].map((r) => ({
  ...r,
  // path-to-regexp treats these as syntax
  source: r.source.includes("/:") ? r.source : r.source.replace(/([():*+?])/g, "\\$1"),
}));

fs.writeFileSync("content/redirects.json", JSON.stringify(out, null, 1));
console.log(`${out.length} redirects (${permanent.length} permanent, ${press.length} press)`);

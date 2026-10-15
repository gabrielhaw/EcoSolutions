/**
 * Small subheadings so readers can see what each part of a long page is about.
 * 1. Bold-only lines the old site used as headings ("Implementation:") become <h3>s.
 * 2. Pages with no headings at all get a few written ones, keyed by the index of
 *    the <p> they sit above (counting every <p> in the page's HTML).
 */

const BAT_FARMING = { 0: "How bats cut insect numbers", 2: "Fewer sprays, safer food" };

const written: Record<string, Record<number, string>> = {
  "/non-toxic-pest-control/bats-and-agricultural-pest-control": BAT_FARMING,
  "/bats-and-bat-boxes/bats-in-agriculture-ipm": BAT_FARMING,
  "/bats-and-bat-boxes/bats-and-stables": BAT_FARMING,
  "/bats-and-bat-boxes/pest-control-through-bats": {
    0: "What biological control means",
    3: "Meet the bats",
    5: "Bats on farms",
    6: "Our field project",
  },
  "/owls-and-owl-boxes/join-the-owl-box-project": {
    0: "Why join",
    2: "Commit to the service",
    4: "What the service covers",
  },
  "/products-services/owl-boxes": { 0: "Before you order", 5: "Why the service matters" },
  "/products-services/bat-boxes": { 0: "Our bat houses", 2: "Why welcome bats", 4: "How bats hunt" },
  "/products-services/annual-services": { 0: "Why boxes need a service", 1: "Owl boxes", 2: "Bat houses", 6: "Booking" },
  "/township-owl-box-project": { 0: "How it started", 1: "260,000 children later", 2: "Why owls matter here" },
};

const BOLD_LINE = /<p[^>]*>\s*<(strong|b)>([^<]{2,70})<\/\1>\s*(?:&nbsp;)?\s*<\/p>/g;

export function withSubheadings(html: string, path: string): string {
  let out = html.replace(BOLD_LINE, (whole, _tag, text: string) => {
    const t = text.trim();
    // Statements, sign-offs and contact lines are not headings.
    if (/[.!]$/.test(t) || /\d{3}/.test(t)) return whole;
    return `<h3>${t.replace(/:$/, "")}</h3>`;
  });

  const add = written[path];
  if (add) {
    let i = -1;
    out = out.replace(/<p[\s>]/g, (m) => {
      i++;
      return add[i] ? `<h3>${add[i]}</h3>${m}` : m;
    });
  }
  return out;
}

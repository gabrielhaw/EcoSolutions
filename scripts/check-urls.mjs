// Checks that old and current URLs still land somewhere useful on a running
// copy of the site (`npm run build && npm start`, then run this).
//
//   node scripts/check-urls.mjs [base-url]      (default http://localhost:3000)
//
// It requests, without following redirects:
//   - every literal `source` in content/redirects.json and next.config.ts
//   - every page path recorded in the website's GA4 export (scripts/fixtures/ga-site-paths.txt)
//   - every URL in the site's own sitemap
// and follows each redirect hop by hop, reporting:
//   - broken: the chain ends on anything other than 200 (404, 500…)
//   - loop:   the chain revisits a URL
//   - chain:  more than one hop before the final page (slower, and leaks ranking)
//   - home:   a deep old URL that lands on the home page instead of a related page
// Exits non-zero when anything is broken or loops.
import fs from "node:fs";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const MAX_HOPS = 8;

const redirects = JSON.parse(fs.readFileSync("content/redirects.json", "utf8"));
const literal = (s) => !/[:*()]/.test(s.replace(/\\[():*+?]/g, ""));
const unescape = (s) => s.replace(/\\([():*+?])/g, "$1");

const sources = new Map(); // path -> where it came from
const add = (p, from) => {
  if (!p.startsWith("/") || sources.has(p)) return;
  sources.set(p, from);
};

for (const r of redirects) if (literal(r.source) && !/^https?:/.test(r.destination)) add(unescape(r.source), "redirects.json");
for (const p of fs.readFileSync("scripts/fixtures/ga-site-paths.txt", "utf8").split("\n").map((l) => l.trim()).filter(Boolean)) {
  // The Zoho thank-you page is on forms.zohopublic.com, not on this site.
  if (p.startsWith("/info4949/form/")) continue;
  add(p, "GA4 pages report");
}
try {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const m of xml.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)?<\/loc>/g)) add(m[1] || "/", "sitemap");
} catch (e) {
  console.error(`Could not read ${base}/sitemap.xml: ${e.message}`);
  process.exit(2);
}

async function trace(path) {
  const hops = [];
  const seen = new Set();
  let url = path;
  for (let i = 0; i <= MAX_HOPS; i++) {
    if (seen.has(url)) return { hops, status: "loop" };
    seen.add(url);
    const res = await fetch(base + url, { redirect: "manual" });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location") ?? "";
      const next = new URL(loc, base + url);
      hops.push({ status: res.status, to: next.origin === base ? next.pathname + next.search + next.hash : next.href });
      if (next.origin !== base) return { hops, status: "external" };
      url = next.pathname + next.search;
      continue;
    }
    return { hops, status: res.status };
  }
  return { hops, status: "too many hops" };
}

const rows = [];
const queue = [...sources.entries()];
const workers = Array.from({ length: 8 }, async () => {
  while (queue.length) {
    const [path, from] = queue.shift();
    const t = await trace(path);
    const final = t.hops.at(-1)?.to ?? path;
    const issues = [];
    if (t.status === "loop" || t.status === "too many hops") issues.push("loop");
    else if (t.status !== 200 && t.status !== "external") issues.push("broken");
    if (t.hops.length > 1) issues.push("chain");
    if (final === "/" && path.split("/").filter(Boolean).length > 1) issues.push("home");
    rows.push({ path, from, status: t.status, hops: t.hops.length, final, issues });
  }
});
await Promise.all(workers);
rows.sort((a, b) => a.path.localeCompare(b.path));

const flagged = rows.filter((r) => r.issues.length);
for (const r of flagged) {
  console.log(`${r.issues.join(",").padEnd(14)} ${String(r.status).padEnd(5)} ${r.path}  →  ${r.final}  (${r.hops} hop${r.hops === 1 ? "" : "s"}; ${r.from})`);
}
const count = (k) => rows.filter((r) => r.issues.includes(k)).length;
console.log(`\n${rows.length} URLs checked: ${count("broken")} broken, ${count("loop")} loops, ${count("chain")} chains, ${count("home")} sent to the home page.`);
process.exit(count("broken") || count("loop") ? 1 : 0);

// Saves the Google My Maps owl box map as content/owl-box-map-snapshot.json.
// The site reads the live map hourly; this copy is only used when Google can't
// be reached. Run now and then: node scripts/snapshot-owl-box-map.mjs
import { writeFileSync } from "node:fs";

const url = "https://www.google.com/maps/d/kml?mid=1u74Wqi1fs2DvSU2wfSU4VYJBsoo&forcekml=1";
const res = await fetch(url);
const kml = await res.text();
if (!res.ok || !kml.includes("<Placemark>")) throw new Error(`Unexpected response from My Maps (${res.status})`);

const out = new URL("../content/owl-box-map-snapshot.json", import.meta.url);
writeFileSync(out, JSON.stringify({ fetched: new Date().toISOString(), kml }) + "\n");
console.log(`Saved ${(kml.match(/<Placemark>/g) ?? []).length} boxes to content/owl-box-map-snapshot.json`);

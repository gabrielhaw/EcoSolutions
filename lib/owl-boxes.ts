import snapshot from "@/content/owl-box-map-snapshot.json";
import type { OwlBox, Species } from "@/lib/owl-box-types";

export { speciesInfo, type OwlBox, type Species } from "@/lib/owl-box-types";

/**
 * Occupied owl boxes come from the team's Google My Maps map (still edited
 * there), read as KML and refreshed hourly, like the shop. If Google can't be
 * reached we fall back to the saved snapshot (scripts/snapshot-owl-box-map.mjs).
 *
 * Descriptions are free text typed into My Maps, so we only ever pull plain
 * text and photo URLs out of them; none of their HTML reaches the page.
 */
export const OWL_MAP_ID = "1u74Wqi1fs2DvSU2wfSU4VYJBsoo";
export const OWL_MAP_KML = `https://www.google.com/maps/d/kml?mid=${OWL_MAP_ID}&forcekml=1`;
export const OWL_MAP_GOOGLE = `https://www.google.com/maps/d/viewer?mid=${OWL_MAP_ID}`;

const OTHER_SPECIES: [RegExp, string][] = [
  [/marsh owl|asio capensis/i, "Marsh Owl"],
  [/black[- ]shouldered kite|black[- ]winged kite|elanus caeruleus/i, "Black-winged Kite"],
  [/black sparrowhawk|accipiter melanoleucus/i, "Black Sparrowhawk"],
  [/kestrel/i, "Rock Kestrel"],
];

const MONTHS = "January|February|March|April|May|June|July|August|September|October|November|December";

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

const tag = (xml: string, name: string) => decode(xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? "").trim();

/** HTML from a My Maps description → plain text with line breaks. */
function toText(html: string) {
  return html
    .replace(/<img[^>]*>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

/** Only photos hosted by My Maps itself. */
const isPhoto = (u: string) => /^https:\/\/mymaps\.usercontent\.google\.com\/hostedimage\//.test(u);

function firstDate(text: string, word: RegExp) {
  const m = text.match(new RegExp(`${word.source}[^.]*?\\b((?:(?:${MONTHS})\\s+)?\\d{4})\\b`, "i"));
  return m?.[1];
}

function speciesOf(text: string): { species: Species; speciesName?: string } {
  const spotted = text.search(/bubo afr|spotted eagle/i);
  const barn = text.search(/tyto al|barn owl/i);
  if (spotted >= 0 && (barn < 0 || spotted < barn)) return { species: "spotted" };
  if (barn >= 0) return { species: "barn" };
  for (const [re, name] of OTHER_SPECIES) if (re.test(text)) return { species: "other", speciesName: name };
  return { species: "unknown" };
}

export function parseKml(kml: string): OwlBox[] {
  const boxes: OwlBox[] = [];
  const placemarks = kml.match(/<Placemark>[\s\S]*?<\/Placemark>/g) ?? [];
  placemarks.forEach((pm, i) => {
    const [lng, lat] = tag(pm, "coordinates").split(",").map(Number);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    const data: Record<string, string> = {};
    for (const m of pm.matchAll(/<Data name="([^"]+)">\s*(?:<value>([\s\S]*?)<\/value>|<value\/>)/g)) data[m[1]] = decode(m[2] ?? "").trim();

    const descHtml = tag(pm, "description");
    const photos = [
      ...(data.gx_media_links ?? "").split(/\s+/),
      ...[...descHtml.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]),
    ].filter(isPhoto);

    // Newer entries use My Maps' table fields; older ones are a written paragraph.
    const structured = "INSTALLED" in data || "OCCUPIED" in data;
    const notes = structured
      ? (data.NOTES ?? "")
      : toText(descHtml)
          // Every old description ends with the same contact line; the page shows it once.
          .replace(/\s*For further information[\s\S]*?info@ecosolutions\.co\.za\.?/i, "")
          .trim();
    const allText = [data.Species, notes, descHtml].join(" ");

    const installed = (structured ? data.INSTALLED : firstDate(notes, /install\w*/)) || undefined;
    const occupied = (structured ? data.OCCUPIED : firstDate(notes, /occup\w*/)) || undefined;
    const occupiedYear = occupied ? Number(occupied.match(/\d{4}/)?.[0]) || undefined : undefined;

    boxes.push({
      id: `box-${i}`,
      name: tag(pm, "name") || "Owl box",
      lat,
      lng,
      ...speciesOf(allText),
      installed,
      occupied,
      occupiedYear,
      rings: [...new Set(allText.match(/\b[A-Z]\d{4,6}\b/g) ?? [])],
      notes,
      photos: [...new Set(photos)],
    });
  });
  return boxes;
}

export async function getOwlBoxes(): Promise<OwlBox[]> {
  let kml = snapshot.kml;
  try {
    const res = await fetch(OWL_MAP_KML, { next: { revalidate: 3600 } });
    const text = res.ok ? await res.text() : "";
    if (text.includes("<Placemark>")) kml = text;
  } catch {
    // Google unreachable: use the saved snapshot.
  }
  return parseKml(kml);
}

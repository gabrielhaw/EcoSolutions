"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GeoJSONSource, Map as MlMap } from "maplibre-gl";
import { version as maplibreVersion } from "maplibre-gl/package.json";
import { speciesInfo, type OwlBox, type Species } from "@/lib/owl-box-types";

/**
 * Interactive map of occupied owl boxes: clustered pins in the site's colours,
 * species filters, a searchable list and a detail panel with photos.
 * Tiles are OpenFreeMap (no key, no tracking); the style follows the site theme.
 */

type Theme = "light" | "dark";

const STYLE: Record<Theme, string> = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/dark",
};

/** Pin colours per theme, matched to the site's accent and canvas tokens. */
const PALETTE: Record<Theme, Record<Species | "cluster" | "clusterText" | "stroke" | "canvas", string>> = {
  light: {
    spotted: "#3f7d2c",
    barn: "#b8741a",
    other: "#2f6f8f",
    unknown: "#7d8a81",
    cluster: "#111713",
    clusterText: "#f8f9f8",
    stroke: "#ffffff",
    canvas: "#eef1ef",
  },
  dark: {
    spotted: "#a6d86f",
    barn: "#f0b45a",
    other: "#7cc4e4",
    unknown: "#85908a",
    cluster: "#f2f5f2",
    clusterText: "#141a17",
    stroke: "#141a17",
    canvas: "#141a17",
  },
};

const FILTERS: Species[] = ["spotted", "barn", "other", "unknown"];

const readTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function toGeoJson(boxes: OwlBox[]): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
    type: "FeatureCollection",
    features: boxes.map((b) => ({
      type: "Feature",
      id: b.id,
      geometry: { type: "Point", coordinates: [b.lng, b.lat] },
      properties: { id: b.id, species: b.species },
    })),
  };
}

/**
 * Opening view: the central 94% of boxes, so the odd box far outside Gauteng
 * (Middelburg, Rosendal) doesn't zoom the whole map out. They're still on it.
 */
function coreBounds(boxes: OwlBox[]): [[number, number], [number, number]] {
  const pick = (vals: number[], p: number) => vals[Math.round(p * (vals.length - 1))];
  const lats = boxes.map((b) => b.lat).sort((a, b) => a - b);
  const lngs = boxes.map((b) => b.lng).sort((a, b) => a - b);
  return [
    [pick(lngs, 0.03), pick(lats, 0.03)],
    [pick(lngs, 0.97), pick(lats, 0.97)],
  ];
}

export default function OwlBoxMap({ boxes }: { boxes: OwlBox[] }) {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [species, setSpecies] = useState<Set<Species>>(() => new Set(FILTERS));
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c = { spotted: 0, barn: 0, other: 0, unknown: 0 } as Record<Species, number>;
    for (const b of boxes) c[b.species]++;
    return c;
  }, [boxes]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return boxes
      .filter((b) => species.has(b.species) && (!q || b.name.toLowerCase().includes(q)))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [boxes, species, query]);

  const selected = useMemo(() => boxes.find((b) => b.id === selectedId) ?? null, [boxes, selectedId]);

  // Latest values for map event handlers, which are bound once.
  const visibleRef = useRef(visible);
  const selectedRef = useRef(selectedId);
  useEffect(() => {
    visibleRef.current = visible;
    selectedRef.current = selectedId;
  });

  /** (Re)adds our source and layers; runs after every style load (theme switch). */
  const addLayers = useCallback((map: MlMap) => {
    const theme = readTheme();
    const c = PALETTE[theme];
    if (map.getLayer("background")) map.setPaintProperty("background", "background-color", c.canvas);
    if (map.getSource("boxes")) return;

    map.addSource("boxes", {
      type: "geojson",
      data: toGeoJson(visibleRef.current),
      cluster: true,
      clusterRadius: 44,
      clusterMaxZoom: 13,
    });
    map.addLayer({
      id: "clusters",
      type: "circle",
      source: "boxes",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": c.cluster,
        "circle-opacity": 0.92,
        "circle-radius": ["step", ["get", "point_count"], 15, 10, 19, 30, 24],
        "circle-stroke-width": 3,
        "circle-stroke-color": c.cluster,
        "circle-stroke-opacity": 0.18,
      },
    });
    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "boxes",
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-font": ["Noto Sans Bold"],
        "text-size": 13,
        "text-allow-overlap": true,
      },
      paint: { "text-color": c.clusterText },
    });
    map.addLayer({
      id: "selected-halo",
      type: "circle",
      source: "boxes",
      filter: ["==", ["get", "id"], selectedRef.current ?? ""],
      paint: {
        "circle-radius": 16,
        "circle-color": ["match", ["get", "species"], "spotted", c.spotted, "barn", c.barn, "other", c.other, c.unknown],
        "circle-opacity": 0.25,
      },
    });
    map.addLayer({
      id: "boxes",
      type: "circle",
      source: "boxes",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 5, 14, 8],
        "circle-color": ["match", ["get", "species"], "spotted", c.spotted, "barn", c.barn, "other", c.other, c.unknown],
        "circle-stroke-width": 2,
        "circle-stroke-color": c.stroke,
      },
    });
  }, []);

  // Create the map once.
  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | undefined;
    (async () => {
      try {
        const maplibre = await import("maplibre-gl");
        if (cancelled || !el.current) return;
        // Worker files are copied to /public by scripts/copy-maplibre-worker.mjs.
        maplibre.setWorkerUrl(`/vendor/maplibre-gl/${maplibreVersion}/maplibre-gl-worker.mjs`);
        const bounds = coreBounds(boxes);

        const map = new maplibre.Map({
          container: el.current,
          style: STYLE[readTheme()],
          bounds,
          fitBoundsOptions: { padding: 48 },
          maxZoom: 17,
          cooperativeGestures: true,
          attributionControl: { compact: true },
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
        });
        mapRef.current = map;
        map.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-right");
        map.addControl(new maplibre.FullscreenControl(), "top-right");

        map.on("style.load", () => {
          addLayers(map);
          setReady(true);
        });
        map.on("error", (e) => {
          // A missing tile is fine; a style that never loads is not.
          if (!map.isStyleLoaded() && !cancelled) console.error(e.error);
        });

        map.on("click", "clusters", async (e) => {
          const f = e.features?.[0];
          if (!f) return;
          const src = map.getSource("boxes") as GeoJSONSource;
          const zoom = await src.getClusterExpansionZoom(f.properties.cluster_id as number);
          map.easeTo({ center: (f.geometry as GeoJSON.Point).coordinates as [number, number], zoom: zoom + 0.5 });
        });
        map.on("click", "boxes", (e) => {
          const id = e.features?.[0]?.properties.id as string | undefined;
          if (id) setSelectedId(id);
        });
        for (const layer of ["clusters", "boxes"]) {
          map.on("mouseenter", layer, () => (map.getCanvas().style.cursor = "pointer"));
          map.on("mouseleave", layer, () => (map.getCanvas().style.cursor = ""));
        }

        // Follow the site's light/dark toggle.
        let theme = readTheme();
        observer = new MutationObserver(() => {
          const next = readTheme();
          if (next === theme) return;
          theme = next;
          map.setStyle(STYLE[next]);
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      } catch (err) {
        console.error(err);
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
      observer?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [boxes, addLayers]);

  // Filters and search change the pins.
  useEffect(() => {
    const src = mapRef.current?.getSource("boxes") as GeoJSONSource | undefined;
    src?.setData(toGeoJson(visible));
  }, [visible, ready]);

  // Highlight and fly to the selected box.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !map.getLayer("selected-halo")) return;
    map.setFilter("selected-halo", ["==", ["get", "id"], selectedId ?? ""]);
    if (!selected) return;
    // On small screens the detail card covers the lower part of the map; keep the pin above it.
    const overlay = window.matchMedia("(max-width: 1023px)").matches;
    const offsetY = overlay ? -map.getContainer().clientHeight * 0.3 : 0;
    map.easeTo({ center: [selected.lng, selected.lat], zoom: Math.max(map.getZoom(), 14), offset: [0, offsetY], duration: 700 });
  }, [selected, selectedId, ready]);

  const toggle = (s: Species) =>
    setSpecies((cur) => {
      // First click on a filter shows only that species; clicking the last one shows all again.
      if (cur.size === FILTERS.length) return new Set([s]);
      const next = new Set(cur);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next.size ? next : new Set(FILTERS);
    });

  const presentFilters = FILTERS.filter((s) => counts[s] > 0);

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-canvas-2 lg:grid lg:grid-cols-[minmax(0,1fr)_23rem]">
      {/* Map */}
      <div className="relative h-[62vh] min-h-[420px] lg:h-[78vh] lg:max-h-[860px]">
        <div ref={el} className="size-full" aria-label="Map of occupied owl boxes" role="region" />
        {!ready && !failed && (
          <div className="absolute inset-0 grid place-items-center bg-canvas-2 text-[14px] text-fg-3">Loading map…</div>
        )}
        {failed && (
          <div className="absolute inset-0 grid place-items-center bg-canvas-2 p-6 text-center text-[15px] text-fg-2">
            The map couldn’t load. The list of boxes is still available{" "}
            <span className="lg:hidden">below</span>
            <span className="hidden lg:inline">alongside</span>.
          </div>
        )}

        {/* Legend (on phones the filter buttons below carry the colours) */}
        <ul className="pointer-events-none absolute bottom-3 left-3 hidden flex-wrap sm:flex gap-x-3 gap-y-1 rounded-xl bg-canvas/90 px-3 py-2 text-[12.5px] text-fg-2 shadow-sm backdrop-blur">
          {presentFilters.map((s) => (
            <li key={s} className="flex items-center gap-1.5">
              <Dot species={s} />
              {speciesInfo[s].label}
            </li>
          ))}
        </ul>

        {/* Selected box on small screens: a card over the map */}
        {selected && (
          <div className="absolute inset-x-2 bottom-2 z-10 max-h-[58%] overflow-y-auto rounded-2xl border border-line bg-canvas shadow-xl lg:hidden">
            <BoxDetail box={selected} onClose={() => setSelectedId(null)} />
          </div>
        )}
      </div>

      {/* Sidebar: filters, search, list or detail */}
      <aside className="flex min-h-0 flex-col border-t border-line bg-canvas lg:h-[78vh] lg:max-h-[860px] lg:border-l lg:border-t-0">
        {selected ? (
          <div className="hidden min-h-0 flex-1 overflow-y-auto lg:block">
            <BoxDetail box={selected} onClose={() => setSelectedId(null)} />
          </div>
        ) : null}

        <div className={`flex min-h-0 flex-1 flex-col ${selected ? "lg:hidden" : ""}`}>
          <div className="space-y-4 border-b border-line p-4 sm:p-5">
            <div role="group" aria-label="Filter by species" className="flex flex-wrap gap-2">
              {presentFilters.map((s) => {
                const on = species.has(s) && species.size !== FILTERS.length;
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(s)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13.5px] transition-colors ${
                      on ? "border-fg bg-fg text-canvas" : "border-line-strong text-fg-2 hover:border-fg"
                    }`}
                  >
                    <Dot species={s} />
                    {speciesInfo[s].label}
                    <span className={on ? "text-canvas/70" : "text-fg-3"}>{counts[s]}</span>
                  </button>
                );
              })}
            </div>
            <label className="block">
              <span className="sr-only">Search by street or suburb</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a street or suburb"
                className="w-full rounded-xl border border-line-strong bg-canvas-2 px-4 py-2.5 text-[16px] text-fg placeholder:text-fg-3 focus:border-fg focus:outline-none"
              />
            </label>
            <p className="label text-fg-3" aria-live="polite">
              {visible.length} of {boxes.length} boxes
            </p>
          </div>
          <ul className="max-h-[50vh] min-h-0 flex-1 overflow-y-auto lg:max-h-none">
            {visible.map((b) => (
              <li key={b.id} className="border-b border-line last:border-b-0">
                <button
                  type="button"
                  onClick={() => setSelectedId(b.id)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-canvas-2 sm:px-5 ${
                    b.id === selectedId ? "bg-canvas-2" : ""
                  }`}
                >
                  <Dot species={b.species} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-medium text-fg">{b.name}</span>
                    <span className="block truncate text-[13px] text-fg-3">
                      {b.species === "unknown" ? "Occupied owl box" : (b.speciesName ?? speciesInfo[b.species].label)}
                      {b.occupied ? ` · occupied ${b.occupied}` : ""}
                    </span>
                  </span>
                  {b.photos.length > 0 && (
                    <span className="label shrink-0 normal-case tracking-normal text-fg-3">
                      {b.photos.length} photo{b.photos.length > 1 ? "s" : ""}
                    </span>
                  )}
                </button>
              </li>
            ))}
            {visible.length === 0 && <li className="p-5 text-[15px] text-fg-3">No boxes match that search.</li>}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function Dot({ species }: { species: Species }) {
  const cls = {
    spotted: "bg-[#3f7d2c] dark:bg-[#a6d86f]",
    barn: "bg-[#b8741a] dark:bg-[#f0b45a]",
    other: "bg-[#2f6f8f] dark:bg-[#7cc4e4]",
    unknown: "bg-[#7d8a81] dark:bg-[#85908a]",
  }[species];
  return <span aria-hidden className={`inline-block size-2.5 shrink-0 rounded-full ${cls}`} />;
}

function BoxDetail({ box, onClose }: { box: OwlBox; onClose: () => void }) {
  const info = speciesInfo[box.species];
  // Older entries' notes often only repeat the species and dates shown above them.
  const notes = box.notes && box.notes.length > 60 ? box.notes : box.notes && !/owl/i.test(box.notes) ? box.notes : "";
  return (
    <article className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="label flex items-center gap-2 text-fg-3">
            <Dot species={box.species} />
            {box.species === "unknown" ? "Occupied owl box" : (box.speciesName ?? info.label)}
          </p>
          <h3 className="mt-2 text-[1.3rem] font-medium leading-tight tracking-tight text-fg">{box.name}</h3>
          {info.latin && box.species !== "other" && <p className="mt-1 text-[14px] italic text-fg-3">{info.latin}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close and show all boxes"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-fg-2 transition-colors hover:border-fg hover:text-fg"
        >
          <span aria-hidden>✕</span>
        </button>
      </div>

      {box.photos.length > 0 && (
        <ul className="-mx-4 mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 sm:-mx-5 sm:px-5">
          {box.photos.map((src, i) => (
            <li key={src} className="relative aspect-[4/3] w-[85%] shrink-0 snap-start overflow-hidden rounded-xl bg-canvas-2">
              <Image src={src} alt={`${box.name}, photo ${i + 1}`} fill sizes="320px" className="object-cover" />
            </li>
          ))}
        </ul>
      )}

      {(box.installed || box.occupied) && (
        <dl className="mt-4 grid grid-cols-2 gap-2">
          {box.installed && (
            <div className="rounded-xl border border-line p-3">
              <dt className="label text-fg-3">Installed</dt>
              <dd className="mt-1 text-[15px] font-medium text-fg">{box.installed}</dd>
            </div>
          )}
          {box.occupied && (
            <div className="rounded-xl border border-line p-3">
              <dt className="label text-fg-3">Occupied</dt>
              <dd className="mt-1 text-[15px] font-medium text-fg">{box.occupied}</dd>
            </div>
          )}
        </dl>
      )}

      {box.rings.length > 0 && (
        <div className="mt-4">
          <p className="label text-fg-3">SAFRING ring numbers</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {box.rings.map((r) => (
              <li key={r} className="rounded-md bg-canvas-2 px-2 py-1 font-mono text-[12.5px] text-fg-2">
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {notes && <p className="mt-4 whitespace-pre-line text-[14.5px] leading-relaxed text-fg-2">{notes}</p>}

      <p className="mt-5 border-t border-line pt-4 text-[13.5px] leading-relaxed text-fg-3">
        For ring numbers, clutch sizes or fledging records,{" "}
        <Link href="/contact-us?topic=owls" className="text-fg underline underline-offset-2 hover:text-accent">
          contact EcoSolutions
        </Link>
        .
      </p>
    </article>
  );
}

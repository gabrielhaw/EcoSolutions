/** Owl box map types, kept apart from lib/owl-boxes.ts so the browser bundle doesn't pull in the map snapshot. */

export type Species = "spotted" | "barn" | "other" | "unknown";

export const speciesInfo: Record<Species, { label: string; latin?: string }> = {
  spotted: { label: "Spotted Eagle Owl", latin: "Bubo africanus" },
  barn: { label: "Barn Owl", latin: "Tyto alba" },
  other: { label: "Other raptors" },
  unknown: { label: "Species not recorded" },
};

export type OwlBox = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  species: Species;
  /** Specific name when it's not one of the two main owls, e.g. "Marsh Owl". */
  speciesName?: string;
  installed?: string;
  occupied?: string;
  occupiedYear?: number;
  rings: string[];
  notes: string;
  photos: string[];
};

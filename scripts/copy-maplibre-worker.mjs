// MapLibre 6 runs its tile work in a module Worker loaded from its own files,
// which the Next bundler doesn't emit. Copy them to public/vendor (versioned, so
// browsers never mix old and new halves) and point MapLibre at them with
// setWorkerUrl. Runs before `dev` and `build`.
import { copyFileSync, mkdirSync, readFileSync, rmSync } from "node:fs";

const root = new URL("../", import.meta.url);
const pkg = JSON.parse(readFileSync(new URL("node_modules/maplibre-gl/package.json", root), "utf8"));
const outBase = new URL("public/vendor/maplibre-gl/", root);
const out = new URL(`${pkg.version}/`, outBase);

rmSync(outBase, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const f of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  copyFileSync(new URL(`node_modules/maplibre-gl/dist/${f}`, root), new URL(f, out));
}
console.log(`maplibre-gl ${pkg.version} worker copied to public/vendor/maplibre-gl/${pkg.version}/`);

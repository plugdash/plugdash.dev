// Writes public/og/plugins/<slug>.png using socialcard's own renderer.
// Run: pnpm og:cards, then commit the PNGs (no WASM at deploy time).
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { renderCard } from "@plugdash/socialcard/card";
import { plugins } from "../src/data/plugins.ts";

// svgToPng is not a public export of socialcard, so load its render chunk.
const dist = dirname(fileURLToPath(import.meta.resolve("@plugdash/socialcard")));
const chunk = (await readdir(dist)).find((f) => /^render-.*\.mjs$/.test(f));
const { svgToPng } = await import(pathToFileURL(join(dist, chunk)).href);

const out = new URL("../public/og/plugins/", import.meta.url);
await mkdir(out, { recursive: true });
for (const p of plugins) {
	const svg = renderCard({ title: p.npmPackage, author: "plugdash.dev" }, { template: "default" });
	await writeFile(new URL(`${p.slug}.png`, out), await svgToPng(svg));
}
console.log(`wrote ${plugins.length} cards`);

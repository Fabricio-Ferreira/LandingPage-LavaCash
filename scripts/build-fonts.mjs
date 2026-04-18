/**
 * Generates src/assets/css/fonts-selfhosted.css (latin + latin-ext only)
 * and copies referenced .woff2 files into src/assets/fonts/.
 */

import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const bricRoot = join(root, "node_modules/@fontsource/bricolage-grotesque");
const dmRoot = join(root, "node_modules/@fontsource/dm-sans");
const fontDir = join(root, "src/assets/fonts");
const cssOut = join(root, "src/assets/css/fonts-selfhosted.css");

const bricWeights = ["400", "500", "600", "700", "800"];

/**
 * @param {string} pkgRoot
 * @param {string} rel
 * @returns {string}
 */
function readAndRewrite(pkgRoot, rel) {
  const text = readFileSync(join(pkgRoot, rel), "utf8");
  return text
    .replace(/url\(\.\/files\//g, "url(/assets/fonts/")
    .replace(/, url\(\/assets\/fonts\/[^)]+\.woff\)/g, "");
}

mkdirSync(fontDir, { recursive: true });

const chunks = [];
for (const w of bricWeights) {
  chunks.push(readAndRewrite(bricRoot, `latin-${w}.css`));
  chunks.push(readAndRewrite(bricRoot, `latin-ext-${w}.css`));
}
chunks.push(readAndRewrite(dmRoot, "400.css"));
chunks.push(readAndRewrite(dmRoot, "500.css"));
chunks.push(readAndRewrite(dmRoot, "700.css"));
chunks.push(readAndRewrite(dmRoot, "400-italic.css"));

const combined = chunks.join("\n");
writeFileSync(cssOut, combined);

const referenced = new Set();
for (const m of combined.matchAll(/url\(\/assets\/fonts\/([^)]+?)\)/g)) {
  referenced.add(m[1]);
}

const byName = new Map();
for (const pkgFiles of [
  join(bricRoot, "files"),
  join(dmRoot, "files"),
]) {
  for (const name of readdirSync(pkgFiles)) {
    byName.set(name, join(pkgFiles, name));
  }
}

for (const name of referenced) {
  const src = byName.get(name);
  if (!src) {
    throw new Error(`Missing font file for ${name}`);
  }
  copyFileSync(src, join(fontDir, name));
}

console.log(
  `fonts-selfhosted.css + ${referenced.size} woff2 file(s) → src/assets/fonts/`,
);

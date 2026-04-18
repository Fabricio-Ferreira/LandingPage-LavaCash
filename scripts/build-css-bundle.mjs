/**
 * Concatenates fonts-selfhosted.css + section CSS into lavacash.bundle.css.
 * Run `node scripts/build-fonts.mjs` first.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const cssDir = join(root, "src/assets/css");

const parts = [
  "fonts-selfhosted.css",
  "tokens-base.css",
  "header-hero-marquee.css",
  "sections-demos-pain.css",
  "benefits-pricing-testimonials.css",
  "faq-cta-footer-reveal-responsive.css",
  "lavacash-improvements.css",
];

const missing = parts.filter((f) => !existsSync(join(cssDir, f)));
if (missing.length > 0) {
  throw new Error(
    `build-css-bundle: missing file(s): ${missing.join(", ")} — run node scripts/build-fonts.mjs first`,
  );
}

const bundle = parts
  .map((name) => readFileSync(join(cssDir, name), "utf8"))
  .join("\n");

writeFileSync(join(cssDir, "lavacash.bundle.css"), bundle);
console.log("lavacash.bundle.css written");

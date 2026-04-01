/**
 * LavaCash landing — entry (bundled to /assets/js/app.js).
 */

import { initReveal } from "./modules/reveal.js";
import { initNav } from "./modules/nav.js";
import { initNavScroll } from "./modules/nav-scroll.js";

function bootstrap() {
  initReveal();
  initNav();
  initNavScroll();
}

bootstrap();

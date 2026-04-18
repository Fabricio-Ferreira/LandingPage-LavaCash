/**
 * LavaCash landing — entry (bundled to /assets/js/app.js).
 */

import { initReveal } from "./modules/reveal.js";
import { initNav } from "./modules/nav.js";
import { initNavScroll } from "./modules/nav-scroll.js";
import { initLeadPopup } from "./modules/lead-popup.js";
import { initFloatingCta } from "./modules/floating-cta.js";
import { initLazyDemoVideos } from "./modules/lazy-demo-videos.js";

function bootstrap() {
  initLazyDemoVideos();
  initReveal();
  initNav();
  initNavScroll();
  initFloatingCta();
  const leadRoot = document.querySelector("[data-lead-popup]");
  if (leadRoot) {
    initLeadPopup(leadRoot);
  }
}

bootstrap();

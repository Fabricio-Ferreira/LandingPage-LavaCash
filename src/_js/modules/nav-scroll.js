/**
 * Adds scrolled state to `.site-nav` for header styling.
 */

const NAV_SELECTOR = ".site-nav";
const SCROLL_THRESHOLD_PX = 40;
const SCROLLED_CLASS = "is-scrolled";

/**
 * @returns {void}
 */
export function initNavScroll() {
  const nav = document.querySelector(NAV_SELECTOR);
  if (!nav) {
    return;
  }
  let ticking = false;
  const onScroll = () => {
    nav.classList.toggle(SCROLLED_CLASS, window.scrollY > SCROLL_THRESHOLD_PX);
    ticking = false;
  };
  onScroll();
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(onScroll);
    },
    { passive: true },
  );
}

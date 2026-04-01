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
  const onScroll = () => {
    nav.classList.toggle(SCROLLED_CLASS, window.scrollY > SCROLL_THRESHOLD_PX);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

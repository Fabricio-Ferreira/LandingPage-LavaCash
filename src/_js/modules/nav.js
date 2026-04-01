/**
 * Mobile navigation toggle, Escape to close, link click to close,
 * and close when viewport crosses desktop breakpoint (responsive).
 */

const NAV_SELECTOR = ".site-nav";
const TOGGLE_SELECTOR = "[data-nav-toggle]";
const MENU_ID = "primary-menu";
const OPEN_CLASS = "is-open";
const DESKTOP_MIN_WIDTH = "(min-width: 769px)";

/**
 * @param {HTMLElement} nav
 * @param {(open: boolean) => void} setOpen
 * @returns {void}
 */
function bindResponsiveClose(nav, setOpen) {
  const mqDesktop = window.matchMedia(DESKTOP_MIN_WIDTH);
  const onViewportChange = () => {
    if (mqDesktop.matches && nav.classList.contains(OPEN_CLASS)) {
      setOpen(false);
    }
  };
  if (typeof mqDesktop.addEventListener === "function") {
    mqDesktop.addEventListener("change", onViewportChange);
  } else {
    mqDesktop.addListener(onViewportChange);
  }
}

/**
 * @returns {void}
 */
export function initNav() {
  const nav = document.querySelector(NAV_SELECTOR);
  const toggle = document.querySelector(TOGGLE_SELECTOR);
  const menu = document.getElementById(MENU_ID);
  if (!nav || !toggle || !menu) {
    return;
  }
  const setOpen = (open) => {
    nav.classList.toggle(OPEN_CLASS, open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Menu");
  };
  toggle.addEventListener("click", () => {
    setOpen(!nav.classList.contains(OPEN_CLASS));
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  });
  bindResponsiveClose(nav, setOpen);
}

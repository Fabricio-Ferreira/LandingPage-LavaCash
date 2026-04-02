// src/_js/modules/reveal.js
var REVEAL_SELECTOR = ".reveal";
var VISIBLE_CLASS = "visible";
var REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function initReveal() {
  const reveals = document.querySelectorAll(REVEAL_SELECTOR);
  if (reveals.length === 0) {
    return;
  }
  const prefersReduced = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  if (prefersReduced) {
    reveals.forEach((el) => el.classList.add(VISIBLE_CLASS));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(VISIBLE_CLASS);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
}

// src/_js/modules/nav.js
var NAV_SELECTOR = ".site-nav";
var TOGGLE_SELECTOR = "[data-nav-toggle]";
var MENU_ID = "primary-menu";
var OPEN_CLASS = "is-open";
var DESKTOP_MIN_WIDTH = "(min-width: 769px)";
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
function initNav() {
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

// src/_js/modules/nav-scroll.js
var NAV_SELECTOR2 = ".site-nav";
var SCROLL_THRESHOLD_PX = 40;
var SCROLLED_CLASS = "is-scrolled";
function initNavScroll() {
  const nav = document.querySelector(NAV_SELECTOR2);
  if (!nav) {
    return;
  }
  const onScroll = () => {
    nav.classList.toggle(SCROLLED_CLASS, window.scrollY > SCROLL_THRESHOLD_PX);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// src/_js/main.js
function bootstrap() {
  initReveal();
  initNav();
  initNavScroll();
}
bootstrap();
//# sourceMappingURL=app.js.map

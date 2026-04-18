/**
 * Mobile: FAB (+) abre/fecha painel com APK + WhatsApp (menos obstrução).
 * Desktop: painel sempre visível; FAB oculto (CSS).
 */

const HOST_SELECTOR = "[data-floating-cta]";
const PANEL_ID = "floating-cta-panel";
const OPEN_CLASS = "is-open";
const MQ = "(max-width: 600px)";

/**
 * @param {HTMLElement} host
 * @param {MediaQueryList} mq
 * @returns {void}
 */
function closePanel(host, mq) {
  if (!mq.matches) {
    return;
  }
  host.classList.remove(OPEN_CLASS);
  const fab = host.querySelector(".floating-cta-fab");
  const panel = document.getElementById(PANEL_ID);
  if (fab) {
    fab.setAttribute("aria-expanded", "false");
  }
  if (panel) {
    panel.setAttribute("aria-hidden", "true");
  }
}

/**
 * @param {HTMLElement} host
 * @param {MediaQueryList} mq
 * @returns {void}
 */
function openPanel(host, mq) {
  if (!mq.matches) {
    return;
  }
  host.classList.add(OPEN_CLASS);
  const fab = host.querySelector(".floating-cta-fab");
  const panel = document.getElementById(PANEL_ID);
  if (fab) {
    fab.setAttribute("aria-expanded", "true");
  }
  if (panel) {
    panel.setAttribute("aria-hidden", "false");
  }
}

/**
 * @returns {void}
 */
export function initFloatingCta() {
  const host = document.querySelector(HOST_SELECTOR);
  if (!host) {
    return;
  }
  const fab = host.querySelector(".floating-cta-fab");
  const panel = document.getElementById(PANEL_ID);
  if (!fab || !panel) {
    return;
  }
  const mq = window.matchMedia(MQ);
  panel.setAttribute("aria-hidden", mq.matches ? "true" : "false");

  const syncForViewport = () => {
    if (!mq.matches) {
      host.classList.remove(OPEN_CLASS);
      fab.setAttribute("aria-expanded", "false");
      panel.removeAttribute("aria-hidden");
    } else {
      const isOpen = host.classList.contains(OPEN_CLASS);
      fab.setAttribute("aria-expanded", isOpen ? "true" : "false");
      panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
    }
  };

  fab.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!mq.matches) {
      return;
    }
    if (host.classList.contains(OPEN_CLASS)) {
      closePanel(host, mq);
    } else {
      openPanel(host, mq);
    }
  });

  document.addEventListener(
    "click",
    (e) => {
      if (!mq.matches || !host.classList.contains(OPEN_CLASS)) {
        return;
      }
      const t = /** @type {Node} */ (e.target);
      if (host.contains(t)) {
        return;
      }
      closePanel(host, mq);
    },
    true,
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePanel(host, mq);
    }
  });

  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", syncForViewport);
  } else {
    mq.addListener(syncForViewport);
  }
  syncForViewport();
}

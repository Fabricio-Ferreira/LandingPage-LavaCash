/**
 * Popup de e-mail com <dialog>.showModal() — usa a top layer nativa (cliques fiáveis).
 * Fallback: sem showModal o módulo não inicializa.
 */

/** Incrementar quando mudar lógica/armazenamento (invalida dismiss/submit antigos). */
const POPUP_STORAGE_VERSION = "v5";

const STORAGE_DISMISS = `lc-lead-popup-dismiss-${POPUP_STORAGE_VERSION}`;
const STORAGE_SUBMIT = `lc-lead-popup-submit-${POPUP_STORAGE_VERSION}`;

const POPUP_TIMING = {
  minMsMobile: 24000,
  minMsDesktop: 18000,
  scrollRatioMobile: 0.48,
  scrollRatioDesktop: 0.38,
  pollIntervalMs: 3200,
};

function shouldSkipStorage() {
  try {
    return (
      window.localStorage.getItem(STORAGE_DISMISS) === "1" ||
      window.localStorage.getItem(STORAGE_SUBMIT) === "1"
    );
  } catch {
    return false;
  }
}

function maybeResetPopupFromQuery() {
  try {
    const params = new URLSearchParams(window.location.search);
    const flag = params.get("reset-popup");
    if (flag !== "1" && flag !== "true") {
      return;
    }
    for (let i = window.localStorage.length - 1; i >= 0; i--) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith("lc-lead-popup-")) {
        window.localStorage.removeItem(k);
      }
    }
    params.delete("reset-popup");
    const q = params.toString();
    const next = `${window.location.pathname}${q ? `?${q}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", next);
  } catch {
    /* ignore */
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 768px)").matches;
}

/**
 * @param {HTMLElement} root
 */
export function initLeadPopup(root) {
  if (!root) {
    return;
  }
  const dlg = /** @type {HTMLDialogElement} */ (root);
  if (typeof dlg.showModal !== "function") {
    return;
  }
  maybeResetPopupFromQuery();
  if (shouldSkipStorage()) {
    return;
  }
  if (prefersReducedMotion()) {
    return;
  }
  const form = dlg.querySelector(".lead-popup-form");
  const emailInput = dlg.querySelector("#lead-popup-email");
  const leadSection = document.getElementById("dicas");
  let opened = false;
  let leadSectionSeen = false;
  const startMs = Date.now();
  const mobile = isMobileViewport();
  const minMs = mobile
    ? POPUP_TIMING.minMsMobile
    : POPUP_TIMING.minMsDesktop;
  const scrollRatioNeed = mobile
    ? POPUP_TIMING.scrollRatioMobile
    : POPUP_TIMING.scrollRatioDesktop;

  if (leadSection) {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.15) {
            leadSectionSeen = true;
            obs.disconnect();
          }
        }
      },
      { threshold: [0, 0.15, 0.3] },
    );
    obs.observe(leadSection);
  }

  function scrollRatio() {
    const doc = document.documentElement;
    const h = doc.scrollHeight - window.innerHeight;
    if (h <= 0) {
      return 1;
    }
    return window.scrollY / h;
  }

  function tryOpen() {
    if (opened || leadSectionSeen) {
      return;
    }
    if (Date.now() - startMs < minMs) {
      return;
    }
    if (scrollRatio() < scrollRatioNeed) {
      return;
    }
    open();
  }

  function open() {
    if (dlg.open) {
      return;
    }
    opened = true;
    try {
      dlg.showModal();
    } catch {
      opened = false;
      return;
    }
    window.setTimeout(() => {
      emailInput?.focus();
    }, 80);
  }

  function closeDialog() {
    if (dlg.open) {
      dlg.close();
    }
  }

  dlg.addEventListener("close", () => {
    try {
      window.localStorage.setItem(STORAGE_DISMISS, "1");
    } catch {
      /* ignore */
    }
  });

  function isPointInsideDialog(clientX, clientY) {
    const r = dlg.getBoundingClientRect();
    return (
      clientX >= r.left &&
      clientX <= r.right &&
      clientY >= r.top &&
      clientY <= r.bottom
    );
  }

  /**
   * Clique fora do retângulo do painel (backdrop) — mais fiável que e.target === dialog.
   */
  function onDocPointerDown(ev) {
    if (!dlg.open) {
      return;
    }
    if (isPointInsideDialog(ev.clientX, ev.clientY)) {
      return;
    }
    ev.preventDefault();
    closeDialog();
  }

  document.addEventListener("pointerdown", onDocPointerDown, true);

  dlg.querySelectorAll("[data-lead-popup-close]").forEach((el) => {
    el.addEventListener("click", (ev) => {
      ev.preventDefault();
      closeDialog();
    });
  });

  window.addEventListener("scroll", tryOpen, { passive: true });
  window.setInterval(tryOpen, POPUP_TIMING.pollIntervalMs);

  if (form) {
    form.addEventListener("submit", () => {
      try {
        window.localStorage.setItem(STORAGE_SUBMIT, "1");
      } catch {
        /* ignore */
      }
    });
  }
}

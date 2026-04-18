/**
 * GA4 (gtag) + Meta Pixel (fbq): eventos customizados quando os scripts existem.
 */

/**
 * @param {string} name
 * @param {Record<string, string | number | undefined>} [params]
 */
function gaEvent(name, params) {
  const g = typeof window !== "undefined" ? window.gtag : undefined;
  if (typeof g !== "function") {
    return;
  }
  g("event", name, params || {});
}

/**
 * @param {string} name
 * @param {Record<string, unknown>} [params]
 */
function fbCustom(name, params) {
  const f = typeof window !== "undefined" ? window.fbq : undefined;
  if (typeof f !== "function") {
    return;
  }
  f("trackCustom", name, params || {});
}

let scroll50Sent = false;

function checkScrollDepth() {
  if (scroll50Sent) {
    return;
  }
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  if (max <= 0) {
    return;
  }
  const ratio = window.scrollY / max;
  if (ratio < 0.5) {
    return;
  }
  scroll50Sent = true;
  gaEvent("scroll_depth", { percent_scrolled: 50 });
  fbCustom("ScrollDepth50", { percent: 50 });
  window.removeEventListener("scroll", onScrollDepthScroll);
}

function onScrollDepthScroll() {
  checkScrollDepth();
}

/**
 * @param {HTMLElement} el
 */
function handleClick(el) {
  const ev = el.getAttribute("data-ga-event");
  if (!ev) {
    return;
  }
  const loc = el.getAttribute("data-ga-location") || "";
  gaEvent(ev, { location: loc, link_url: el.href || "" });
  if (ev === "download_apk") {
    fbCustom("DownloadAPK", { location: loc });
  } else if (ev === "cta_whatsapp" || ev === "cta_trial") {
    fbCustom(ev === "cta_whatsapp" ? "WhatsAppClick" : "TrialClick", {
      location: loc,
    });
  } else {
    fbCustom("Engagement", { event: ev, location: loc });
  }
}

/**
 * @param {SubmitEvent} e
 */
function onFormSubmit(e) {
  const form = e.target;
  if (!(form instanceof HTMLFormElement)) {
    return;
  }
  if (
    form.name !== "lead-lavacash" &&
    form.name !== "lead-lavacash-popup"
  ) {
    return;
  }
  gaEvent("generate_lead", { method: "newsletter", form_name: form.name });
  fbCustom("LeadSubmit", { form_name: form.name });
}

export function initAnalytics() {
  checkScrollDepth();
  window.addEventListener("scroll", onScrollDepthScroll, { passive: true });
  document.body.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) {
      return;
    }
    const el = t.closest("[data-ga-event]");
    if (el instanceof HTMLElement) {
      handleClick(el);
    }
  });
  document.addEventListener("submit", onFormSubmit, true);
}

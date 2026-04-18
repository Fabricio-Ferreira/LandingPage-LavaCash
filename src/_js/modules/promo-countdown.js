/**
 * Atualiza o texto do contador da promoção a partir de data-ends (ISO 8601).
 */

const ROOT = "[data-promo-countdown]";
const DISPLAY = "[data-countdown-display]";

/**
 * @param {number} ms
 */
function formatRemaining(ms) {
  if (ms <= 0) {
    return "Encerrada";
  }
  const sec = Math.floor(ms / 1000);
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (d > 0) {
    return `${d}d ${h}h ${m}m`;
  }
  if (h > 0) {
    return `${h}h ${m}m ${s}s`;
  }
  return `${m}m ${s}s`;
}

export function initPromoCountdown() {
  const root = document.querySelector(ROOT);
  if (!root) {
    return;
  }
  const endsRaw = root.getAttribute("data-ends");
  if (!endsRaw) {
    return;
  }
  const end = new Date(endsRaw).getTime();
  if (Number.isNaN(end)) {
    return;
  }
  const display = root.querySelector(DISPLAY);
  if (!(display instanceof HTMLElement)) {
    return;
  }
  function tick() {
    const left = end - Date.now();
    display.textContent = formatRemaining(left);
  }
  tick();
  const id = window.setInterval(() => {
    tick();
    if (end - Date.now() <= 0) {
      window.clearInterval(id);
    }
  }, 1000);
}

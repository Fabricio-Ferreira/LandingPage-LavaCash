/**
 * Loads demo section videos only when near the viewport so initial bandwidth
 * goes to hero video and critical assets.
 */

const SECTION_SELECTOR = ".demos-section";
const LAZY_ATTR = "data-lazy-src";

/**
 * @param {HTMLVideoElement} video
 * @returns {void}
 */
function activateVideo(video) {
  const url = video.getAttribute(LAZY_ATTR);
  if (!url) {
    return;
  }
  video.removeAttribute(LAZY_ATTR);
  video.src = url;
  video.autoplay = true;
  video.load();
  video.play().catch(() => {});
}

/**
 * @returns {void}
 */
export function initLazyDemoVideos() {
  const root = document.querySelector(SECTION_SELECTOR);
  if (!root) {
    return;
  }
  const videos = root.querySelectorAll(`video[${LAZY_ATTR}]`);
  if (videos.length === 0) {
    return;
  }
  const prefersReduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    videos.forEach((v) => {
      const url = v.getAttribute(LAZY_ATTR);
      if (url) {
        v.removeAttribute(LAZY_ATTR);
        v.src = url;
        v.controls = true;
        v.autoplay = false;
        v.load();
      }
    });
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = /** @type {HTMLVideoElement} */ (entry.target);
          observer.unobserve(video);
          activateVideo(video);
        }
      });
    },
    { rootMargin: "120px 0px", threshold: 0.01 },
  );
  videos.forEach((v) => observer.observe(v));
}

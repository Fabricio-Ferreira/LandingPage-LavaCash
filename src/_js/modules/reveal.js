/**
 * Scroll-triggered visibility for elements with `.reveal`.
 */

const REVEAL_SELECTOR = ".reveal";
const VISIBLE_CLASS = "visible";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * @returns {void}
 */
export function initReveal() {
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
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
  );
  reveals.forEach((el) => observer.observe(el));
}

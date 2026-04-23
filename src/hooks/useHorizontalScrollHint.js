import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const DEFAULT_MOBILE_MQ = "(max-width: 767px)";
const REDUCED_MOTION_MQ = "(prefers-reduced-motion: reduce)";

/**
 * When `rootRef` first intersects the viewport (e.g. on mobile), nudge `scrollerRef`
 * horizontally and scroll back so users notice the row is scrollable. Runs once per mount.
 *
 * @param {React.RefObject<HTMLElement | null>} rootRef – observed for visibility (often a wrapper)
 * @param {React.RefObject<HTMLElement | null>} scrollerRef – element with horizontal overflow
 * @param {object} [options]
 * @param {string} [options.mobileMediaQuery] – hint only runs when this matches
 * @param {number} [options.afterVisibleMs] – delay after first intersection before nudging
 * @param {number} [options.holdAtPeekMs] – wait after forward smooth-scroll before scrolling back (keep ≥ ~900)
 * @param {number} [options.intersectionThreshold]
 * @param {string} [options.rootMargin] – passed to IntersectionObserver
 */
export function useHorizontalScrollHint(rootRef, scrollerRef, options = {}) {
  const {
    mobileMediaQuery = DEFAULT_MOBILE_MQ,
    afterVisibleMs = 1000,
    holdAtPeekMs = 500,
    intersectionThreshold = 0.12,
    rootMargin = "0px",
  } = options;

  const reducedMotion = usePrefersReducedMotion();
  const hasHintedRef = useRef(false);
  const armRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const root = rootRef?.current;
    const el = scrollerRef?.current;
    if (!root || !el) return undefined;

    let delayId;
    let returnId;
    let observer;

    const runHint = () => {
      if (hasHintedRef.current) return;
      if (window.matchMedia(REDUCED_MOTION_MQ).matches) {
        armRef.current = false;
        return;
      }
      if (!window.matchMedia(mobileMediaQuery).matches) {
        armRef.current = false;
        return;
      }
      if (el.scrollWidth <= el.clientWidth + 2) {
        armRef.current = false;
        return;
      }

      hasHintedRef.current = true;
      observer?.disconnect();

      const start = el.scrollLeft;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const peek = Math.min(72, Math.max(28, Math.round(maxScroll * 0.18)));

      el.scrollTo({ left: Math.min(start + peek, maxScroll), behavior: "smooth" });

      returnId = window.setTimeout(() => {
        el.scrollTo({ left: start, behavior: "smooth" });
      }, holdAtPeekMs);
    };

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting && !hasHintedRef.current && !armRef.current) {
          armRef.current = true;
          delayId = window.setTimeout(runHint, afterVisibleMs);
        }

        if (!entry.isIntersecting && armRef.current && !hasHintedRef.current) {
          window.clearTimeout(delayId);
          armRef.current = false;
        }
      },
      { threshold: intersectionThreshold, rootMargin },
    );

    observer.observe(root);

    return () => {
      observer?.disconnect();
      window.clearTimeout(delayId);
      window.clearTimeout(returnId);
    };
  }, [
    reducedMotion,
    rootRef,
    scrollerRef,
    mobileMediaQuery,
    afterVisibleMs,
    holdAtPeekMs,
    intersectionThreshold,
    rootMargin,
  ]);
}

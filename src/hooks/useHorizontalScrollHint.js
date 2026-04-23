import { useEffect, useRef } from "react";
import { MOBILE_VIEWPORT_MQ } from "./useIsMobileViewport";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const REDUCED_MOTION_MQ = "(prefers-reduced-motion: reduce)";
/** Treat the row as “on screen” if its top is within this many px below the viewport bottom. */
const NEAR_VIEWPORT_BOTTOM_PX = 200;
const AFTER_VISIBLE_MS = 1200;
const HOLD_AT_PEEK_MS = 500;

function isRootNearViewport(root) {
  const rect = root.getBoundingClientRect();
  const vh =
    typeof window !== "undefined"
      ? window.innerHeight || document.documentElement.clientHeight
      : 0;
  const bottomBound = vh + NEAR_VIEWPORT_BOTTOM_PX;
  return rect.bottom > 0 && rect.top < bottomBound;
}

/**
 * Once per mount on narrow viewports: nudge a horizontal scroller so users notice overflow.
 * Listens to scroll / resize / layout; re-reads refs each tick.
 */
export function useHorizontalScrollHint(rootRef, scrollerRef) {
  const reducedMotion = usePrefersReducedMotion();
  const hasHintedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) return undefined;

    let raf = 0;
    let hintTimer = null;
    let returnTimer = null;
    let cancelled = false;

    const clearHintTimer = () => {
      if (hintTimer != null) {
        window.clearTimeout(hintTimer);
        hintTimer = null;
      }
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      if (cancelled || hasHintedRef.current) return;

      const root = rootRef?.current;
      const el = scrollerRef?.current;
      if (!root || !el) return;

      if (window.matchMedia(REDUCED_MOTION_MQ).matches) return;
      if (!window.matchMedia(MOBILE_VIEWPORT_MQ).matches) {
        clearHintTimer();
        return;
      }

      const near = isRootNearViewport(root);
      const overflow = el.scrollWidth > el.clientWidth + 2;

      if (!near || !overflow) {
        clearHintTimer();
        return;
      }

      if (hintTimer != null) return;

      hintTimer = window.setTimeout(() => {
        hintTimer = null;
        if (cancelled || hasHintedRef.current) return;

        const r2 = rootRef?.current;
        const e2 = scrollerRef?.current;
        if (!r2 || !e2) return;
        if (!isRootNearViewport(r2)) return;
        if (e2.scrollWidth <= e2.clientWidth + 2) return;
        if (window.matchMedia(REDUCED_MOTION_MQ).matches) return;
        if (!window.matchMedia(MOBILE_VIEWPORT_MQ).matches) return;

        hasHintedRef.current = true;

        const start = e2.scrollLeft;
        const maxScroll = e2.scrollWidth - e2.clientWidth;
        const peek = Math.min(88, Math.max(32, Math.round(maxScroll * 0.22)));
        const targetLeft = Math.min(start + peek, maxScroll);

        e2.scrollTo({ left: targetLeft, behavior: "smooth" });

        returnTimer = window.setTimeout(() => {
          if (cancelled) return;
          e2.scrollTo({ left: start, behavior: "smooth" });
        }, HOLD_AT_PEEK_MS);
      }, AFTER_VISIBLE_MS);
    };

    const ro = new ResizeObserver(schedule);
    const el0 = scrollerRef.current;
    const root0 = rootRef.current;
    if (el0) ro.observe(el0);
    if (root0) ro.observe(root0);

    const mq = window.matchMedia(MOBILE_VIEWPORT_MQ);
    const onMq = () => schedule();
    mq.addEventListener("change", onMq);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    schedule();

    return () => {
      cancelled = true;
      mq.removeEventListener("change", onMq);
      cancelAnimationFrame(raf);
      clearHintTimer();
      window.clearTimeout(returnTimer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
    };
  }, [reducedMotion, rootRef, scrollerRef]);
}

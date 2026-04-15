import { useScroll, useSpring, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * Scroll-driven offsets for alpine depth planes — slow far, slightly faster near.
 */
export function useAlpineParallax() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 100, damping: 42 });

  const still = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const mountains = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const sky = useTransform(x, [0, 0.5], ["0%", "20%"]);
  const hill = useTransform(x, [0, 0.5], ["0%", "40%"]);
  const meadow = useTransform(x, [0, 0.5], ["0%", "0%"]);

  if (prefersReducedMotion) {
    return {
      skyY: still,
      mountainsY: still,
      hillY: still,
      meadowY: still,
      reducedMotion: true,
    };
  }

  return {
    skyY: sky,
    mountainsY: mountains,
    hillY: hill,
    meadowY: meadow,
    reducedMotion: false,
  };
}

import { motion } from "motion/react";
import { coutureEase } from "../lib/coutureMotion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const LOGO_SRC = "/assets/wnj_logo.png";
const WORDMARK = "why not Julio";

const ease = coutureEase;

const BUBBLE_SPRING = { type: "spring", stiffness: 380, damping: 18, mass: 0.78 };
const BLOOM_S = 0.88;
const LOGO_DELAY = 0.1;
const LOGO_S = 0.58;

const WORD_DELAY = 0.46;
const WORD_WIPE_S = 0.72;

/** “Portfolio” in `Navbar` — after wordmark is mostly on. */
export const NAV_BRAND_REVEAL_TAIL_S = WORD_DELAY + WORD_WIPE_S * 0.88;

const goldMarkStyle = {
  filter: "brightness(1.08) sepia(0.42) saturate(1.42) hue-rotate(-8deg)",
};

/** Simple glass bubble (the version you liked) — no extra water layers. */
const bubbleClassName =
  "relative -mr-[5px] flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full " +
  "border border-white/55 bg-gradient-to-b from-white/50 to-white/[0.16] " +
  "shadow-[inset_0_2px_10px_rgba(255,255,255,0.62),inset_0_-2px_8px_rgba(191,162,86,0.08),0_6px_26px_rgba(0,0,0,0.07)] " +
  "backdrop-blur-md ring-1 ring-gold/25 sm:h-12 sm:w-12";

export default function NavbarBrand() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <span className="inline-flex min-w-0 items-center gap-2.5 sm:gap-3">
        <div className={bubbleClassName}>
          <img
            src={LOGO_SRC}
            alt=""
            decoding="async"
            className="relative z-10 h-7 w-auto max-h-7 max-w-[2.1rem] object-contain drop-shadow-[0_0_8px_rgba(191,162,86,0.35)] sm:h-8 sm:max-h-8 sm:max-w-[2.35rem]"
            style={goldMarkStyle}
          />
        </div>
        <span className="min-w-0 truncate font-serif text-2xl font-semibold tracking-tight text-ink md:text-[1.35rem]">
          {WORDMARK}
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex min-w-0 items-center gap-2.5 sm:gap-3">
      <motion.div
        className={bubbleClassName}
        initial={{ scale: 0.52, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={BUBBLE_SPRING}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_42%,rgba(191,162,86,0.36)_0%,rgba(154,118,52,0.11)_40%,transparent_70%)]"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.7, 1.08, 1.15] }}
          transition={{ duration: BLOOM_S, times: [0, 0.32, 1], ease: [ease, ease] }}
        />

        <motion.img
          src={LOGO_SRC}
          alt=""
          decoding="async"
          className="relative z-10 h-7 w-auto max-h-7 max-w-[2.1rem] object-contain drop-shadow-[0_0_12px_rgba(191,162,86,0.4)] sm:h-8 sm:max-h-8 sm:max-w-[2.35rem]"
          style={goldMarkStyle}
          initial={{ opacity: 0, scale: 0.88, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: LOGO_DELAY, duration: LOGO_S, ease }}
        />
      </motion.div>

      <motion.span
        className="min-w-0 overflow-hidden"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ delay: WORD_DELAY, duration: WORD_WIPE_S, ease }}
      >
        <span className="block truncate font-serif text-2xl font-semibold tracking-tight text-ink md:text-[1.35rem]">
          {WORDMARK}
        </span>
      </motion.span>
    </span>
  );
}

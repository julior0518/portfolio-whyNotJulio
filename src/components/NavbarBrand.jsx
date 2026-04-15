import { motion } from "motion/react";
import { coutureEase } from "../lib/coutureMotion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const LABEL = "whyNotJulio";

/**
 * Logo load: staggered letter rise + subtle brass sheen line, then settled title.
 */
export default function NavbarBrand() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <span className="font-serif text-2xl font-semibold tracking-tight text-ink md:text-[1.35rem]">
        {LABEL}
      </span>
    );
  }

  return (
    <span className="relative inline-block align-middle perspective-[640px]">
      {/* One-time sheen under the word */}
      <motion.span
        className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-brass/70 to-transparent"
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.75, ease: coutureEase }}
      />

      <span className="relative z-10 inline-flex transform-gpu font-serif text-2xl font-semibold tracking-tight md:text-[1.35rem]">
        {LABEL.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block text-ink"
            initial={{ y: 14, opacity: 0, rotateX: -28 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{
              delay: 0.04 * i,
              duration: 0.62,
              ease: coutureEase,
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {char}
          </motion.span>
        ))}
      </span>

      {/* Soft bloom once letters land */}
      <motion.span
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-gold/[0.07] via-transparent to-gold/[0.05] blur-xl"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.9, ease: coutureEase }}
      />
    </span>
  );
}

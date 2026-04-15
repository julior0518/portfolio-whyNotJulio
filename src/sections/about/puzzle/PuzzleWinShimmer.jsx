import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { coutureEase } from "../../../lib/coutureMotion";

const TRAIL_SYMBOLS = ["✦", "✧", "·", "✶", "＊"];
const SPAWN_MS = 38;
const MAX_STARS = 64;

export default function PuzzleWinShimmer({ active }) {
  const reduced = usePrefersReducedMotion();
  const [stars, setStars] = useState([]);
  const idRef = useRef(0);

  const removeStar = useCallback((id) => {
    setStars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  useEffect(() => {
    if (!active || reduced) {
      setStars([]);
      return;
    }

    const tick = () => {
      const count = idRef.current % 4 === 0 ? 3 : 2;
      const batch = [];
      for (let k = 0; k < count; k++) {
        idRef.current += 1;
        const id = idRef.current;
        const sym = TRAIL_SYMBOLS[id % TRAIL_SYMBOLS.length];
        const jitter = (id % 11) * 0.5 - 2.5;
        const x = 4 + Math.random() * 92 + jitter;
        const y = 4 + Math.random() * 92 + jitter * 0.7;
        const entryScale = 1.08 + (id % 6) * 0.14;
        batch.push({ id, x, y, symbol: sym, entryScale });
      }

      setStars((prev) => {
        const next = [...prev, ...batch];
        return next.length > MAX_STARS ? next.slice(-MAX_STARS) : next;
      });
    };

    tick();
    const interval = setInterval(tick, SPAWN_MS);
    return () => clearInterval(interval);
  }, [active, reduced]);

  if (!active || reduced) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 overflow-visible"
      aria-hidden
    >
      <AnimatePresence>
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none text-[1.2rem] font-medium text-brass drop-shadow-[0_0_14px_rgba(184,140,70,0.95)] drop-shadow-[0_0_28px_rgba(212,175,106,0.45)] will-change-transform md:text-[1.55rem]"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
            }}
            initial={{
              opacity: 1,
              scale: s.entryScale,
              y: 0,
              rotate: (s.id % 7) - 3,
            }}
            animate={{
              opacity: 0,
              scale: 0.22,
              y: 52,
              rotate: (s.id % 5) * 8 - 16,
            }}
            transition={{
              duration: 1.45,
              ease: coutureEase,
            }}
            onAnimationComplete={() => removeStar(s.id)}
          >
            {s.symbol}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

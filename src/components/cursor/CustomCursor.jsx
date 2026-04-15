import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { coutureEase } from "../../lib/coutureMotion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const TRAIL_SYMBOLS = ["✦", "✧", "·"];
/** Smaller = denser trail (more stars behind the cursor) */
const MIN_DIST = 7;
/** More stars on screen at once = longer visible trail */
const MAX_STARS = 52;

/**
 * Luxury dot + ring cursor with trailing sparkles. Disabled on touch / reduced motion.
 */
export default function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const [stars, setStars] = useState([]);
  const target = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const lastSpawn = useRef({ x: -9999, y: -9999 });
  const idRef = useRef(0);
  const rafRef = useRef(0);
  const didInit = useRef(false);

  const removeStar = useCallback((id) => {
    setStars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setActive(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  useEffect(() => {
    if (!active || reduced) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor-on");

    const onMove = (e) => {
      const p = { x: e.clientX, y: e.clientY };
      if (!didInit.current) {
        didInit.current = true;
        smooth.current = { ...p };
      }
      target.current = p;

      const dx = e.clientX - lastSpawn.current.x;
      const dy = e.clientY - lastSpawn.current.y;
      if (dx * dx + dy * dy < MIN_DIST * MIN_DIST) return;

      lastSpawn.current = { x: e.clientX, y: e.clientY };
      const sym = TRAIL_SYMBOLS[idRef.current % TRAIL_SYMBOLS.length];
      idRef.current += 1;
      const id = idRef.current;
      const jitter = (id % 7) * 0.4 - 1.2;

      setStars((prev) => {
        const next = [
          ...prev,
          {
            id,
            x: e.clientX + jitter,
            y: e.clientY + jitter * 0.8,
            symbol: sym,
          },
        ];
        return next.length > MAX_STARS ? next.slice(-MAX_STARS) : next;
      });
    };

    const onLeave = () => {
      target.current = { x: -100, y: -100 };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const loop = () => {
      const t = 0.14;
      smooth.current.x += (target.current.x - smooth.current.x) * t;
      smooth.current.y += (target.current.y - smooth.current.y) * t;

      const x = smooth.current.x;
      const y = smooth.current.y;

      const tf = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = tf;
      if (dotRef.current) dotRef.current.style.transform = tf;

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      root.classList.remove("custom-cursor-on");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, reduced]);

  if (!active || reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden
    >
      <AnimatePresence>
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="fixed -translate-x-1/2 -translate-y-1/2 select-none text-[0.95rem] text-brass/80 shadow-sm will-change-transform md:text-[1.1rem]"
            style={{
              left: s.x,
              top: s.y,
            }}
            initial={{ opacity: 0.95, scale: 1, y: 0 }}
            animate={{ opacity: 0, scale: 0.4, y: 28 }}
            transition={{
              duration: 1.15,
              ease: coutureEase,
            }}
            onAnimationComplete={() => removeStar(s.id)}
          >
            {s.symbol}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Outer ring — slight lag vs dot for depth */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-brass/55 bg-transparent shadow-[0_0_20px_rgba(168,132,61,0.12)] will-change-transform md:h-10 md:w-10"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
      {/* Inner gem */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-brass/90 shadow-[0_0_8px_rgba(168,132,61,0.45)] will-change-transform md:h-2 md:w-2"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
    </div>
  );
}

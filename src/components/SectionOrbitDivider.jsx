import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const VARIANTS = {
  comet: {
    dotTrack: ["-18%", "112%"],
    dotArc: [22, -18, 20],
    dotSpin: [-16, 20],
    starTrack: ["108%", "-16%"],
    starArc: [-10, 12, -6],
    starGlyph: "✦",
  },
  pulse: {
    dotTrack: ["-10%", "110%"],
    dotArc: [10, -4, 12],
    dotSpin: [-8, 10],
    starTrack: ["104%", "-8%"],
    starArc: [0, 8, 0],
    starGlyph: "·",
  },
};

export default function SectionOrbitDivider({ variant = "comet" }) {
  const reduced = usePrefersReducedMotion();
  const selected = VARIANTS[variant] || VARIANTS.comet;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const dotLeft = useTransform(scrollYProgress, [0, 1], selected.dotTrack);
  const dotY = useTransform(scrollYProgress, [0, 0.5, 1], selected.dotArc);
  const dotRotate = useTransform(scrollYProgress, [0, 1], selected.dotSpin);
  const dotScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.92, 1.14, 0.94]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.4, 1, 1, 0.45]);
  const trailOpacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0, 0.55, 0.45, 0]);
  const starLeft = useTransform(scrollYProgress, [0, 1], selected.starTrack);
  const starY = useTransform(scrollYProgress, [0, 0.5, 1], selected.starArc);
  const starOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.6, 0.6, 0]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none relative mx-auto my-2 h-20 w-full max-w-6xl overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
      >
        <path
          d="M40 40 Q 250 15 500 40 T 960 40"
          fill="none"
          className="stroke-gold/25"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="3 6"
        />
        <path
          d="M60 44 Q 280 62 500 44 T 940 44"
          fill="none"
          className="stroke-brass/20"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      {reduced ? (
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brass/50 bg-brass/80 shadow-[0_0_10px_rgba(168,132,61,0.35)]" />
      ) : (
        <>
          <motion.div
            style={{ left: dotLeft, y: dotY, opacity: trailOpacity }}
            className="absolute top-1/2 h-2 w-16 -translate-x-[90%] -translate-y-1/2 rounded-full bg-gradient-to-r from-gold/0 via-gold/35 to-gold/0 blur-[1px]"
          />
          <motion.div
            style={{ left: dotLeft, y: dotY, rotate: dotRotate, scale: dotScale, opacity: dotOpacity }}
            className="absolute top-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass/55 bg-canvas/90 shadow-[0_0_18px_rgba(168,132,61,0.24)]"
          >
            <span className="h-2 w-2 rounded-full bg-brass/90 shadow-[0_0_10px_rgba(168,132,61,0.5)]" />
          </motion.div>
          <motion.span
            style={{ left: starLeft, y: starY, opacity: starOpacity }}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-base text-gold/80"
          >
            {selected.starGlyph}
          </motion.span>
        </>
      )}
    </div>
  );
}

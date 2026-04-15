import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { useAlpineParallax } from "./useAlpineParallax";

const enter = { duration: 1.4, ease: [0.22, 1, 0.36, 1] };

/**
 * Scroll-driven y lives on the inner motion.div; entrance "rise" lives on the outer
 * wrapper so Motion never mixes animate(y) with style={{ y: MotionValue }}.
 */
export default function AlpineParallaxStage({ contained = false }) {
  const { skyY, mountainsY, hillY, meadowY } = useAlpineParallax();

  return (
    <div
      className={cn(
        "overflow-hidden",
        contained
          ? "absolute inset-0 isolate min-h-0 w-full"
          : "relative h-screen min-h-[100dvh]",
      )}
    >
      {/* Sky — scroll only (no vertical entrance) */}
      <motion.div
        className={cn(
          "absolute inset-0",
          contained ? "z-0" : "-z-50",
        )}
        style={{
          y: skyY,
          backgroundImage: "url(/assets/mountains/sky.jpg)",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={enter}
      />

      {/* Mountains — rise into frame, then scroll-parallax */}
      <motion.div
        className={cn("absolute inset-0", contained ? "z-[1]" : "-z-40")}
        initial={{ y: "5%" }}
        animate={{ y: "0%" }}
        transition={enter}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            y: mountainsY,
            backgroundImage: "url(/assets/mountains/mountains.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
      </motion.div>

      {/* Hill */}
      <motion.div
        className={cn(
          "absolute inset-0",
          contained ? "z-[2]" : "-z-10 mt-32",
        )}
        initial={{ y: "10%" }}
        animate={{ y: "0%" }}
        transition={enter}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            y: hillY,
            backgroundImage: "url(/assets/mountains/hill.png)",
            backgroundPosition: "top",
            backgroundSize: "cover",
          }}
        />
      </motion.div>

      {/* Meadow — scroll only */}
      <motion.div
        className={cn("absolute inset-0", contained ? "z-[3]" : "-z-10")}
        style={{
          y: meadowY,
          backgroundImage: "url(/assets/mountains/meadow.png)",
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
      />

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-porcelain/30 via-transparent to-burgundy/12",
          contained ? "z-[4]" : "z-0",
        )}
        aria-hidden
      />
    </div>
  );
}

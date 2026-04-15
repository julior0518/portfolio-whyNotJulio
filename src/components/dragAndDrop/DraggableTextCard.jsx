import { motion } from "motion/react";
import { useMemo } from "react";
import { dragMotionProps } from "./dragMotionProps";

const COLORS = [
  "bg-red-500/40",
  "bg-orange-500/40",
  "bg-yellow-400/40",
  "bg-green-400/40",
  "bg-teal-400/40",
  "bg-blue-500/40",
  "bg-indigo-500/40",
  "bg-purple-500/40",
  "bg-pink-500/40",
];

export default function DraggableTextCard({ text, style, containerRef }) {
  const randomColor = useMemo(
    () => COLORS[Math.floor(Math.random() * COLORS.length)],
    [],
  );

  return (
    <motion.div
      className={`absolute flex h-[6rem] w-[6rem] cursor-grab items-center justify-center rounded-full border border-white/10 text-center text-[0.65rem] font-extralight leading-tight text-white shadow-lg backdrop-blur-xs mix-blend-multiply md:h-38 md:w-38 md:text-xl md:leading-normal ${randomColor}`}
      style={style}
      whileHover={{ scale: 1.5 }}
      {...dragMotionProps(containerRef)}
    >
      {text}
    </motion.div>
  );
}

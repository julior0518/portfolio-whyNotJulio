import { motion } from "motion/react";
import { dragMotionProps } from "./dragMotionProps";

export default function DraggableImageCard({
  src,
  alt = "",
  style,
  containerRef,
}) {
  return (
    <motion.img
      className="absolute w-10 cursor-grab md:w-20"
      src={src}
      alt={alt}
      style={style}
      whileHover={{ scale: 2 }}
      {...dragMotionProps(containerRef)}
    />
  );
}

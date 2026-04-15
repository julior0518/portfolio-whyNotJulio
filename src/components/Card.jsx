import { motion } from "motion/react";
import { useMemo } from "react";

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

const Card = ({ style, text, image, containerRef }) => {
  const randomColor = useMemo(
    () => COLORS[Math.floor(Math.random() * COLORS.length)],
    [],
  );

  if (image && !text) {
    return (
      <motion.img
        className="absolute w-16 cursor-grab"
        src={image}
        style={style}
        whileHover={{ scale: 1.05 }}
        drag
        dragConstraints={containerRef}
        dragElastic={1}
      />
    );
  }

  return (
    <motion.div
      className={`absolute flex items-center justify-center text-xl text-center font-extralight 
                rounded-full w-32 h-32 cursor-grab text-white shadow-lg 
                backdrop-blur-xs ${randomColor} mix-blend-multiply border border-white/10`}
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    >
      {text}
    </motion.div>
  );
};

export default Card;

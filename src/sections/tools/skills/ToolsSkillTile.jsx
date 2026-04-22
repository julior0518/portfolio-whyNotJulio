import { motion } from "motion/react";
import {
  DIM_ICON_STYLE,
  MATCH_ICON_STYLE,
  iconDimTransition,
  pushTransition,
  returnTransition,
} from "./toolsGrid.constants";

const iconClassName =
  "h-10 w-10 md:h-16 md:w-16 select-none rounded-lg object-contain will-change-transform md:h-20 md:w-20";

/**
 * One tool icon: repulsion wrapper + search highlight on the image.
 */
export default function ToolsSkillTile({
  slug,
  isMatched,
  shift,
  shiftMode,
  setItemRef,
}) {
  return (
    <motion.div
      ref={setItemRef}
      className="pointer-events-none flex items-center justify-center"
      animate={{
        x: shift?.x ?? 0,
        y: shift?.y ?? 0,
      }}
      transition={shiftMode === "return" ? returnTransition : pushTransition}
    >
      <motion.img
        src={`/assets/tech/${slug}.png`}
        alt={slug.replace(/-/g, " ")}
        layout={false}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          ...(isMatched ? MATCH_ICON_STYLE : DIM_ICON_STYLE),
          scale: 1,
        }}
        transition={iconDimTransition}
        className={iconClassName}
        draggable={false}
      />
    </motion.div>
  );
}

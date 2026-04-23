import { motion } from "motion/react";
import ToolsSkillTile from "./ToolsSkillTile";
import { TOOLS_GRID_EASE } from "./toolsGrid.constants";
import { useToolsRepulsion } from "./useToolsRepulsion";

const gridClassName =
  "pointer-events-none grid min-h-[min(48vh,30rem)] w-full touch-none grid-cols-4 content-start justify-items-center gap-6 py-12 md:pointer-events-auto md:cursor-crosshair md:grid-cols-6 md:gap-8 lg:grid-cols-8";

/**
 * Full tool stack: pointer repulsion + optional search dimming (matchedSet).
 */
export default function ToolsSkillsGrid({
  slugs,
  matchedSet = null,
  noSearchMatches = false,
}) {
  const count = slugs.length;
  const {
    containerRef,
    itemRefs,
    shifts,
    shiftModes,
    handlePointerMove,
    handlePointerLeave,
  } = useToolsRepulsion(count);

  return (
    <div className="mx-auto mt-6 w-full max-w-5xl px-2 sm:px-4">
      <div
        ref={containerRef}
        role="presentation"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={gridClassName}
      >
        {slugs.map((slug, index) => {
          const isMatched =
            matchedSet == null ? true : matchedSet.has(slug);
          return (
            <ToolsSkillTile
              key={slug}
              slug={slug}
              isMatched={isMatched}
              shift={shifts[index]}
              shiftMode={shiftModes[index]}
              setItemRef={(el) => {
                itemRefs.current[index] = el;
              }}
            />
          );
        })}

        {noSearchMatches && (
          <motion.p
            key="no-search-matches"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: TOOLS_GRID_EASE }}
            className="col-span-full py-4 text-center font-sans text-sm text-muted"
          >
            No matches — everything stays visible but dimmed.
          </motion.p>
        )}
      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  PIECE_COUNT,
  SNAP_OVERLAP_RATIO,
  SNAP_PAD_PX,
  allPieceIndices,
  scatterStyleForIndex,
  shouldLockPieceInOwnSlot,
  tileBackgroundStyle,
} from "./puzzleUtils";
import PuzzleWinShimmer from "./PuzzleWinShimmer";

export default function Puzzle() {
  const boardRef = useRef(null);
  const slotRefs = useRef([]);
  const [locked, setLocked] = useState(() => new Set());
  const [dragging, setDragging] = useState(null);

  const slotRects = useCallback(() => {
    return slotRefs.current.map((el) =>
      el ? el.getBoundingClientRect() : null,
    );
  }, []);

  const handleDragEnd = useCallback(
    (pieceIndex, event) => {
      setDragging(null);
      const rects = slotRects();
      if (
        shouldLockPieceInOwnSlot(
          pieceIndex,
          event,
          rects,
          SNAP_PAD_PX,
          SNAP_OVERLAP_RATIO,
        )
      ) {
        setLocked((prev) => new Set(prev).add(pieceIndex));
      }
    },
    [slotRects],
  );

  const floating = useMemo(
    () => allPieceIndices().filter((i) => !locked.has(i)),
    [locked],
  );

  const complete = locked.size === PIECE_COUNT;

  return (
    <div className="grid-default grid-1 relative flex h-full min-h-0 flex-col overflow-visible">
      <div
        ref={boardRef}
        className="relative min-h-0 flex-1 touch-manipulation p-3 md:p-4"
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 grid grid-cols-3 grid-rows-3 gap-1.5 rounded-xl border border-gold/15 bg-porcelain/80 p-1.5 md:gap-2 md:p-2"
          aria-hidden
        >
          {allPieceIndices().map((i) => (
            <div
              key={`slot-${i}`}
              ref={(el) => {
                slotRefs.current[i] = el;
              }}
              className="relative min-h-[2.5rem] overflow-hidden rounded-md border border-gold/10 bg-white/40 md:min-h-0"
            >
              {locked.has(i) && (
                <div
                  className="absolute inset-0 bg-no-repeat"
                  style={{
                    ...tileBackgroundStyle(i),
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="absolute inset-0 z-20">
          {floating.map((pieceIndex) => (
            <motion.div
              key={pieceIndex}
              className="absolute aspect-square w-[min(30%,10rem)] cursor-grab rounded-md border border-white/25 shadow-lux-sm"
              style={{
                ...scatterStyleForIndex(pieceIndex),
                ...tileBackgroundStyle(pieceIndex),
                backgroundRepeat: "no-repeat",
                zIndex: dragging === pieceIndex ? 50 : 10 + pieceIndex,
              }}
              drag
              dragConstraints={boardRef}
              dragElastic={0.1}
              dragMomentum={false}
              dragTransition={{ bounceStiffness: 500, bounceDamping: 35 }}
              onDragStart={() => setDragging(pieceIndex)}
              onDragEnd={(e) => handleDragEnd(pieceIndex, e)}
              onPointerCancel={() => setDragging(null)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98, cursor: "grabbing" }}
              whileDrag={{ scale: 1.04, cursor: "grabbing" }}
            />
          ))}
        </div>

        <PuzzleWinShimmer active={complete} />
      </div>
    </div>
  );
}

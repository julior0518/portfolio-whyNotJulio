import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { computeRepulsionShifts, computeShiftModes } from "./repulsion";

/**
 * Pointer-driven repulsion for a grid of items (container ref + per-cell refs).
 * @param {number} itemCount
 */
export function useToolsRepulsion(itemCount) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const rafRef = useRef(0);
  const prevShiftsRef = useRef({});
  const [shifts, setShifts] = useState({});
  const [shiftModes, setShiftModes] = useState({});

  useEffect(() => {
    itemRefs.current.length = itemCount;
  }, [itemCount]);

  const cancelRaf = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    cancelRaf();
    const n = itemCount;
    const cleared = {};
    const modes = {};
    for (let i = 0; i < n; i++) {
      cleared[i] = { x: 0, y: 0 };
      modes[i] = "return";
    }
    prevShiftsRef.current = cleared;
    setShiftModes(modes);
    setShifts({});
  }, [cancelRaf, itemCount]);

  const handlePointerMove = useCallback(
    (e) => {
      cancelRaf();
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const next = computeRepulsionShifts(
          rect,
          e.clientX,
          e.clientY,
          itemRefs.current,
        );
        const modes = computeShiftModes(
          prevShiftsRef.current,
          next,
          itemCount,
        );
        prevShiftsRef.current = { ...next };
        setShiftModes(modes);
        setShifts(next);
      });
    },
    [cancelRaf, itemCount],
  );

  useEffect(() => () => cancelRaf(), [cancelRaf]);

  return {
    containerRef,
    itemRefs,
    shifts,
    shiftModes,
    handlePointerMove,
    handlePointerLeave,
  };
}

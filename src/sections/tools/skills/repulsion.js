import {
  MAX_PUSH,
  REPEL_FALLOFF_EXP,
  REPEL_RADIUS,
  SHIFT_MODE_EPSILON,
} from "./toolsGrid.constants";

/**
 * @typedef {{ x: number, y: number }} Shift
 */

/**
 * Target shifts for each grid cell, in container-local space.
 * @param {DOMRectReadOnly} containerRect
 * @param {number} pointerClientX
 * @param {number} pointerClientY
 * @param {(HTMLElement | null)[]} itemNodes
 * @returns {Record<number, Shift>}
 */
export function computeRepulsionShifts(
  containerRect,
  pointerClientX,
  pointerClientY,
  itemNodes,
) {
  const mx = pointerClientX - containerRect.left;
  const my = pointerClientY - containerRect.top;
  /** @type {Record<number, Shift>} */
  const next = {};
  const n = itemNodes.length;

  for (let i = 0; i < n; i++) {
    const node = itemNodes[i];
    if (!node) {
      next[i] = { x: 0, y: 0 };
      continue;
    }

    const r = node.getBoundingClientRect();
    const cx = r.left + r.width / 2 - containerRect.left;
    const cy = r.top + r.height / 2 - containerRect.top;
    const dx = cx - mx;
    const dy = cy - my;
    const d = Math.hypot(dx, dy);

    if (d < 1e-3) {
      next[i] = { x: 0, y: 0 };
      continue;
    }

    if (d < REPEL_RADIUS) {
      const t = (REPEL_RADIUS - d) / REPEL_RADIUS;
      const mag = MAX_PUSH * t ** REPEL_FALLOFF_EXP;
      next[i] = { x: (dx / d) * mag, y: (dy / d) * mag };
    } else {
      next[i] = { x: 0, y: 0 };
    }
  }

  return next;
}

/**
 * @param {Record<number, Shift>} prev
 * @param {Record<number, Shift>} next
 * @param {number} count
 * @returns {Record<number, "push" | "return">}
 */
export function computeShiftModes(prev, next, count) {
  /** @type {Record<number, "push" | "return">} */
  const modes = {};
  for (let i = 0; i < count; i++) {
    const prevS = prev[i] ?? { x: 0, y: 0 };
    const curr = next[i] ?? { x: 0, y: 0 };
    const prevMag = Math.hypot(prevS.x, prevS.y);
    const nextMag = Math.hypot(curr.x, curr.y);
    modes[i] =
      nextMag >= prevMag - SHIFT_MODE_EPSILON ? "push" : "return";
  }
  return modes;
}

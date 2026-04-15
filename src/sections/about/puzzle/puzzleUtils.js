export const GRID_SIZE = 3;
export const PIECE_COUNT = GRID_SIZE * GRID_SIZE;
export const PUZZLE_IMAGE = "/assets/bull-face.jpg";
/** px — expand slot rect for pointer / overlap snap */
export const SNAP_PAD_PX = 14;
/** fraction of tile area overlapping its slot (padded) to count as placed */
export const SNAP_OVERLAP_RATIO = 0.2;

/** Stable pseudo-random scatter per index (no hydration mismatch). */
export function scatterStyleForIndex(index) {
  const rot = ((index * 17) % 50) - 25;
  const top = 8 + ((index * 23) % 62);
  const left = 4 + ((index * 31) % 68);
  return {
    top: `${top}%`,
    left: `${left}%`,
    rotate: `${rot}deg`,
  };
}

export function allPieceIndices() {
  return Array.from({ length: PIECE_COUNT }, (_, i) => i);
}

/** CSS background slice for one cell of the puzzle grid. */
export function tileBackgroundStyle(pieceIndex) {
  const row = Math.floor(pieceIndex / GRID_SIZE);
  const col = pieceIndex % GRID_SIZE;
  const max = GRID_SIZE - 1;
  return {
    backgroundImage: `url(${PUZZLE_IMAGE})`,
    backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
    backgroundPosition: `${(col / max) * 100}% ${(row / max) * 100}%`,
  };
}

function eventClientPoint(event) {
  if (typeof event?.clientX === "number" && typeof event?.clientY === "number") {
    return { x: event.clientX, y: event.clientY };
  }
  const t = event?.changedTouches?.[0];
  if (t) return { x: t.clientX, y: t.clientY };
  return null;
}

function expandRect(r, pad) {
  return {
    left: r.left - pad,
    right: r.right + pad,
    top: r.top - pad,
    bottom: r.bottom + pad,
  };
}

function pointInRect(px, py, r) {
  return px >= r.left && px <= r.right && py >= r.top && py <= r.bottom;
}

function intersectionArea(a, b) {
  const x1 = Math.max(a.left, b.left);
  const y1 = Math.max(a.top, b.top);
  const x2 = Math.min(a.right, b.right);
  const y2 = Math.min(a.bottom, b.bottom);
  const w = Math.max(0, x2 - x1);
  const h = Math.max(0, y2 - y1);
  return w * h;
}

/** Lock when release is over the piece's slot (padded) or tile overlaps enough. */
export function shouldLockPieceInOwnSlot(
  pieceIndex,
  event,
  slotRects,
  padPx,
  overlapRatio,
) {
  const own = slotRects[pieceIndex];
  if (!own) return false;

  const p = eventClientPoint(event);
  if (p) {
    const expanded = expandRect(own, padPx);
    if (pointInRect(p.x, p.y, expanded)) return true;
  }

  const el = event?.currentTarget;
  if (!el || typeof el.getBoundingClientRect !== "function") return false;
  const piece = el.getBoundingClientRect();
  const area = Math.max(1, piece.width * piece.height);
  const overlap = intersectionArea(piece, expandRect(own, padPx));
  return overlap / area >= overlapRatio;
}

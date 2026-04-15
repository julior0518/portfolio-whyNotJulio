import { coutureEase } from "../../../lib/coutureMotion";

/** Shared easing for grid motion */
export const TOOLS_GRID_EASE = coutureEase;

/** px — pointer influence radius */
export const REPEL_RADIUS = 268;

/** Max displacement at bubble center */
export const MAX_PUSH = 108;

/** Falloff curve inside the bubble (between linear and quadratic) */
export const REPEL_FALLOFF_EXP = 1.55;

/** Hysteresis when classifying push vs return */
export const SHIFT_MODE_EPSILON = 0.4;

export const pushTransition = {
  type: "tween",
  duration: 0.16,
  ease: [0.25, 0.1, 0.25, 1],
};

export const returnTransition = {
  type: "tween",
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1],
};

export const iconDimTransition = {
  duration: 0.38,
  ease: TOOLS_GRID_EASE,
};

/** Matched vs filtered-out search styling */
export const MATCH_ICON_STYLE = {
  opacity: 0.92,
  filter: "grayscale(0) brightness(1)",
};

export const DIM_ICON_STYLE = {
  opacity: 0.28,
  filter: "grayscale(1) brightness(0.72)",
};

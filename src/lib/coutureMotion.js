/** Cinematic motion — fabric drift, not UI bounce. Easing: cubic-bezier(0.22, 1, 0.36, 1) */
export const coutureEase = [0.22, 1, 0.36, 1];

export const couture = {
  micro: { duration: 0.35, ease: coutureEase },
  hover: { duration: 0.5, ease: coutureEase },
  reveal: { duration: 0.95, ease: coutureEase },
  scene: { duration: 1.15, ease: coutureEase },
  ambient: { duration: 2.5, ease: "easeInOut" },
};

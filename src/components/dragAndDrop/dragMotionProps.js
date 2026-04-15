/** Shared Motion drag config for constrained cards inside a ref-bound box. */
export function dragMotionProps(containerRef) {
  return {
    drag: true,
    dragConstraints: containerRef,
    dragElastic: 1,
  };
}

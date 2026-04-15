import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element enters the viewport (optionally prefetching with rootMargin).
 */
export function useInViewOnce(options = {}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const { rootMargin = "120px", threshold = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || active) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [active, rootMargin, threshold]);

  return [ref, active];
}

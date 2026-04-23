import { useEffect, useState } from "react";

/** Tailwind `md` — same breakpoint as the default mobile hint in `useHorizontalScrollHint`. */
export const MOBILE_VIEWPORT_MQ = "(max-width: 767px)";

export function useIsMobileViewport() {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(MOBILE_VIEWPORT_MQ).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_VIEWPORT_MQ);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

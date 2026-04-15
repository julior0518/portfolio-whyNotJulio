import { useEffect, useMemo, useState } from "react";

const NAV_SECTION_IDS = ["home", "about", "tools", "work", "contact"];

/**
 * Tracks which main section is most visible in the viewport (scroll-spy for nav).
 */
export function useActiveChapter(options = {}) {
  const { rootMargin = "-42% 0px -42% 0px", threshold = 0 } = options;
  const sectionIds = useMemo(() => [...NAV_SECTION_IDS], []);
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "home");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin, threshold },
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [rootMargin, threshold, sectionIds]);

  return activeId;
}

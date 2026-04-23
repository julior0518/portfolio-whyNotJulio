import { useCallback, useMemo, useRef, useState } from "react";

/**
 * Encapsulates Work section selection state, including the original first-click lock.
 */
export function useWorkSelection(items) {
  const [selectedId, setSelectedId] = useState(null);
  const clickGuardRef = useRef({ locked: false, hasLockedOnce: false });

  const selectedWork = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId],
  );

  const screenImage = selectedWork?.screenImage ?? "";

  const selectWork = useCallback((work, event) => {
    event?.stopPropagation?.();

    const guard = clickGuardRef.current;
    if (guard.locked) return;

    if (!guard.hasLockedOnce) {
      guard.hasLockedOnce = true;
      guard.locked = true;

      setTimeout(() => {
        clickGuardRef.current.locked = false;
      }, 5000);
    }

    setSelectedId(work.id);
  }, []);

  return {
    selectedWork,
    screenImage,
    selectWork,
  };
}

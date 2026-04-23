import { useCallback, useEffect, useState } from "react";

/**
 * Local open state for an image preview overlay, with optional auto-close when
 * `resetWhen` changes (e.g. selected item id).
 */
export function useImagePreview({ resetWhen } = {}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [resetWhen]);

  const toggle = useCallback(() => {
    setOpen((p) => !p);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const openPreview = useCallback(() => {
    setOpen(true);
  }, []);

  return { open, setOpen, toggle, close, openPreview };
}

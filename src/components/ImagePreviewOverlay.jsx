import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect } from "react";

export default function ImagePreviewOverlay({
  open,
  onClose,
  src,
  alt,
  backdropClassName = "fixed inset-0 z-[100] flex cursor-default items-center justify-center bg-canvas/85 p-6 pointer-events-auto md:p-10",
  frameClassName = "w-auto overflow-hidden rounded-xl border border-gold/20 shadow-lux-lg",
  imgClassName = "block h-full w-full max-h-full object-contain",
  frameStyle = {
    maxHeight: "min(85vh, 52rem)",
    maxWidth: "min(92vw, 56rem)",
  },
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const stopInnerClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="image-preview-overlay"
          data-image-preview-root
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={backdropClassName}
          aria-hidden
          onClick={onClose}
        >
          <div
            className={frameClassName}
            style={frameStyle}
            onClick={stopInnerClick}
          >
            <img src={src} alt={alt} className={imgClassName} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

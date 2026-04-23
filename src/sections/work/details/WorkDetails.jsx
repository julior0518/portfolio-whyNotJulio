import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { couture } from "../../../lib/coutureMotion";
import { DEFAULT_SCREEN_IMAGE } from "../scene/workScene.constants";

export default function WorkDetails({ selectedWork }) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const previewSrc =
    selectedWork?.screenImage && String(selectedWork.screenImage).trim()
      ? String(selectedWork.screenImage).trim()
      : DEFAULT_SCREEN_IMAGE;

  useEffect(() => {
    setPreviewOpen(false);
  }, [selectedWork?.id]);

  useEffect(() => {
    if (!previewOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setPreviewOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewOpen]);

  const handleCardClick = useCallback(() => {
    setPreviewOpen((p) => !p);
  }, []);

  const stopPreviewInnerClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!selectedWork) {
    return (
      <div className="flex justify-center -mt-30 md:mt-0 lg:pt-8">
        <p className="mx-auto mt-3 w-[75%] text-center font-sans text-xs font-light text-muted">
          Pick a tab above to load a project into the Macbook.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="relative z-10 max-w-[36rem] cursor-pointer rounded-2xl border border-gold/20 bg-white/75 p-5 shadow-lux-sm backdrop-blur-sm transition-all duration-300 hover:border-gold/35 hover:bg-white/85 -mt-30 md:-mt-20 md:p-6"
        onClick={handleCardClick}
      >
        <motion.h2
          key={selectedWork.id}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={couture.reveal}
          className="font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl"
        >
          {selectedWork.title}
        </motion.h2>
        <p className="mt-4 max-w-[32rem] font-sans text-sm font-light leading-relaxed text-charcoal md:text-base">
          {selectedWork.description}
        </p>
        {Boolean(selectedWork.tools?.length) && (
          <div
            className="mt-5 flex flex-wrap gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedWork.tools.map((tool) => (
              <img
                key={tool}
                src={`/assets/tech/${tool}.png`}
                alt=""
                className="h-9 w-9 rounded-md border border-gold/15 bg-white/90 object-contain p-1 shadow-lux-sm"
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {previewOpen && (
          <motion.div
            key="work-screen-preview"
            data-work-preview-root
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex cursor-default items-center justify-center bg-canvas/85 p-6 pointer-events-auto md:p-10"
            aria-hidden
            onClick={() => setPreviewOpen(false)}
          >
            <div
              className="w-auto overflow-hidden rounded-xl border border-gold/20 shadow-lux-lg"
              style={{
                maxHeight: "min(85vh, 52rem)",
                maxWidth: "min(92vw, 56rem)",
              }}
              onClick={stopPreviewInnerClick}
            >
              <img
                src={previewSrc}
                alt={`${selectedWork.title} screen preview`}
                className="block h-full w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

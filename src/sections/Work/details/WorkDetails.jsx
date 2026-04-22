import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { couture } from "../../../lib/coutureMotion";
import { DEFAULT_SCREEN_IMAGE } from "../scene/workScene.constants";

const previewEase = [0.22, 1, 0.36, 1];

function isCoarsePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

export default function WorkDetails({ selectedWork }) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const previewSrc =
    selectedWork?.screenImage && String(selectedWork.screenImage).trim()
      ? String(selectedWork.screenImage).trim()
      : DEFAULT_SCREEN_IMAGE;

  useEffect(() => {
    setPreviewOpen(false);
  }, [selectedWork?.id]);

  const handleCardClick = useCallback(() => {
    if (!isCoarsePointer()) return;
    setPreviewOpen((p) => !p);
  }, []);

  if (!selectedWork) {
    return (
      <div className="flex justify-center -mt-30 md:mt-0 lg:pt-8">
        <p className="mx-auto mt-3 w-[75%] text-center font-sans text-xs font-light text-muted">
          Pick a tab above the load a project into the Macbook.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="relative z-10 max-w-[30rem] rounded-2xl border border-gold/10 bg-white/75 p-5 shadow-lux-sm backdrop-blur-sm -mt-30 md:-mt-20 md:p-6"
        onMouseEnter={() => setPreviewOpen(true)}
        onMouseLeave={() => setPreviewOpen(false)}
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
        <p className="mt-4 max-w-[26rem] font-sans text-sm font-light leading-relaxed text-charcoal md:text-base">
          {selectedWork.description}
        </p>
        {selectedWork.tools?.length > 0 && (
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
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex cursor-default items-center justify-center bg-canvas/85 p-6 max-md:pointer-events-auto md:pointer-events-none md:p-10"
            aria-hidden
            onClick={(e) => {
              if (e.target !== e.currentTarget) return;
              if (isCoarsePointer()) setPreviewOpen(false);
            }}
          >
            <motion.img
              src={previewSrc}
              alt={`${selectedWork.title} screen preview`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.28, ease: previewEase }}
              className="pointer-events-auto max-h-[min(85vh,52rem)] w-auto max-w-[min(92vw,56rem)] rounded-xl border border-gold/20 object-contain shadow-lux-lg md:pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

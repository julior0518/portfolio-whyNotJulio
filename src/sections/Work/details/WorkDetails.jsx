import { motion } from "motion/react";
import { useCallback } from "react";
import ImagePreviewOverlay from "../../../components/ImagePreviewOverlay";
import { useImagePreview } from "../../../hooks/useImagePreview";
import { couture } from "../../../lib/coutureMotion";
import { DEFAULT_SCREEN_IMAGE } from "../scene/workScene.constants";

export default function WorkDetails({ selectedWork }) {
  const { open: previewOpen, toggle: togglePreview, close: closePreview } =
    useImagePreview({ resetWhen: selectedWork?.id });

  const previewSrc =
    selectedWork?.screenImage && String(selectedWork.screenImage).trim()
      ? String(selectedWork.screenImage).trim()
      : DEFAULT_SCREEN_IMAGE;

  const handleCardClick = useCallback(() => {
    togglePreview();
  }, [togglePreview]);

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
        className="relative z-10 max-w-[36rem] cursor-pointer rounded-2xl border border-gold/20 bg-white/75 p-5 pb-11 shadow-lux-sm backdrop-blur-sm transition-all duration-300 hover:border-gold/35 hover:bg-white/85 -mt-30 md:-mt-20 md:p-6 md:pb-12"
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
            className="mt-5 flex flex-wrap gap-3 pointer-events-none"
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
        <button
          type="button"
          className="pointer-events-none absolute bottom-4 right-4 rounded-md border border-gold/35 bg-white/40 px-2.5 py-1 font-sans text-[10px] font-small lowercase tracking-[0.12em] text-gold shadow-lux-sm backdrop-blur-sm transition-colors hover:border-gold/55 hover:bg-white/60 md:bottom-5 md:right-5 md:text-[11px]"
        >
          show more
        </button>
      </div>

      <ImagePreviewOverlay
        open={previewOpen}
        onClose={closePreview}
        src={previewSrc}
        alt={`${selectedWork.title} screen preview`}
      />
    </>
  );
}

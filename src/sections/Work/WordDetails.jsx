import { motion } from "motion/react";
import { couture } from "../../lib/coutureMotion";

const WorkDetails = ({ selectedWork }) => {
  if (!selectedWork) {
    return (
      <div className="flex min-h-[120px] flex-col justify-end pt-8">
        <p className="max-w-md font-serif text-2xl font-medium italic leading-snug text-ink/90 md:text-3xl">
          Select a collection — the stage updates its surface.
        </p>
        <p className="mt-3 font-sans text-sm font-light text-muted">
          One gesture, one narrative frame.
        </p>
      </div>
    );
  }

  const title = selectedWork.name ?? selectedWork.title;

  return (
    <div className="flex flex-col gap-4 pt-4">
      <motion.h2
        key={title}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={couture.reveal}
        className="font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl"
      >
        {title}
      </motion.h2>
      <p className="max-w-[26rem] font-sans text-sm font-light leading-relaxed text-charcoal md:text-base">
        {selectedWork.description}
      </p>
      {selectedWork.icons?.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-1">
          {selectedWork.icons.map((icon) => (
            <img
              key={icon}
              src={`/assets/tech/${icon}.png`}
              alt=""
              className="h-9 w-9 rounded-md border border-gold/15 bg-white/90 object-contain p-1 shadow-lux-sm"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkDetails;

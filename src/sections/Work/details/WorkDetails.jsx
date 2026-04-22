import { motion } from "motion/react";
import { couture } from "../../../lib/coutureMotion";

export default function WorkDetails({ selectedWork }) {
  if (!selectedWork) {
    return (
      <div className="flex   justify-center -mt-30 md:mt-0 lg:pt-8">
        <p className="mt-3 font-sans text-xs  text-center font-light text-muted w-[75%] mx-auto">
          Pick a tab above the load a project into the Macbook.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[30rem] rounded-2xl border border-gold/10 bg-white/75 p-5 shadow-lux-sm backdrop-blur-sm md:p-6  -mt-30 md:mt-0">
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
        <div className="mt-5 flex flex-wrap gap-3">
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
  );
}

import { motion } from "motion/react";
import { aboutCardViewport, couture } from "../../../lib/coutureMotion";

const Intro = () => {
  const textVariants = {
    hidden: { opacity: 1, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: couture.scene,
    },
  };

  const imageVariants = {
    hidden: { opacity: 1, scale: 1.2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { ...couture.scene, delay: 0.08 },
    },
  };

  return (
    <motion.div
      className="grid-default grid-1 relative max-md:!aspect-auto max-md:block max-md:h-auto md:flex md:h-full md:items-end"
      initial="hidden"
      whileInView="visible"
      viewport={aboutCardViewport}
    >
      <motion.img
        src="/assets/tech-gadgets.jpg"
        className="pointer-events-none absolute inset-0 z-0 h-full min-h-full w-full object-cover"
        alt=""
        decoding="async"
        variants={imageVariants}
      />

      <div className="relative z-10 p-6 backdrop-blur-[4px] max-md:h-auto max-md:overflow-visible md:absolute md:inset-0 md:h-full md:overflow-hidden md:p-8">
        <motion.h2
          className="mb-3 font-serif text-4xl font-medium leading-[1.1] text-ink sm:text-5xl md:text-6xl"
          variants={textVariants}
        >
          I love blending <span className="text-brass italic">code</span>,
          design, and strategy <br className="hidden md:block" />
          to build things that matter.
        </motion.h2>

        <motion.p
          className="pb-6 font-sans text-base font-light leading-relaxed text-charcoal/90 md:text-lg"
          variants={textVariants}
          transition={{ delay: 0.12 }}
        >
          I bring together development, design, and strategy to turn ideas into
          real products. Whether it’s building MVPs for startups or exploring
          new ways to make the web more interactive and engaging for mature
          platforms, I’m driven by curiosity, innovation, and solid execution.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Intro;

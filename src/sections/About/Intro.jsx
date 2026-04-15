import { motion } from "motion/react";
import { couture } from "../../lib/coutureMotion";

const Intro = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: couture.scene,
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.04 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { ...couture.scene, delay: 0.08 },
    },
  };

  return (
    <motion.div
      className="grid-default grid-1 relative flex items-end"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.img
        src="/assets/tech-gadgets.jpg"
        className="h-full w-full object-cover"
        alt=""
        variants={imageVariants}
      />

      <div className="absolute z-10 h-full overflow-y-auto p-6 backdrop-blur-[2px] md:overflow-hidden md:p-8">
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

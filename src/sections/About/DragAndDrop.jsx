import { motion } from "motion/react";
import { useRef } from "react";
import Card from "../../components/Card";
import { couture } from "../../lib/coutureMotion";

const DragAndDrop = () => {
  const draggable = useRef();

  const textCards = [
    "SOLID",
    "MVP",
    "Fast",
    "UX/UI",
    "Design",
    "Detailed",
    "Clean",
    "Maintainable",
    "Scalable",
  ];

  const imageCards = [
    "/assets/tech/react.png",
    "/assets/tech/graphql.png",
    "/assets/tech/node.png",
  ];

  const getRandomStyle = () => ({
    rotate: `${Math.floor(Math.random() * 90 - 45)}deg`,
    top: `${Math.floor(Math.random() * 80)}%`,
    left: `${Math.floor(Math.random() * 80)}%`,
  });

  const animationVariants = {
    hidden: { opacity: 0, y: -16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: couture.reveal,
    },
  };

  return (
    <motion.div
      className="grid-default grid-2"
      variants={animationVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div
        ref={draggable}
        className="relative flex h-full w-full items-center justify-center"
      >
        <p className="flex items-end font-serif text-2xl font-medium italic text-charcoal/80 md:text-3xl">
          Coding is magical
        </p>

        {textCards.map((text, index) => (
          <Card
            key={index}
            text={text}
            style={getRandomStyle()}
            containerRef={draggable}
          />
        ))}

        {imageCards.map((image, index) => (
          <Card
            key={`img-${index}`}
            image={image}
            style={getRandomStyle()}
            containerRef={draggable}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default DragAndDrop;

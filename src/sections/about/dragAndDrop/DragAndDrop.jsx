import { motion } from "motion/react";
import { useMemo, useRef } from "react";
import DraggableImageCard from "../../../components/dragAndDrop/DraggableImageCard";
import DraggableTextCard from "../../../components/dragAndDrop/DraggableTextCard";
import { scatterStyleForKey } from "../../../components/dragAndDrop/scatterStyle";
import { couture } from "../../../lib/coutureMotion";

const TEXT_CARDS = [
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

const IMAGE_CARDS = [
  { src: "/assets/tech/react.png", alt: "React" },
  { src: "/assets/tech/graphql.png", alt: "GraphQL" },
  { src: "/assets/tech/node.png", alt: "Node.js" },
];

function DragAndDrop() {
  const draggable = useRef();

  const textLayouts = useMemo(
    () =>
      TEXT_CARDS.map((text) => ({
        text,
        style: scatterStyleForKey(text),
      })),
    [],
  );

  const imageLayouts = useMemo(
    () =>
      IMAGE_CARDS.map(({ src, alt }) => ({
        src,
        alt,
        style: scatterStyleForKey(src),
      })),
    [],
  );

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
      className="grid-default grid-1"
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

        {textLayouts.map(({ text, style }) => (
          <DraggableTextCard
            key={text}
            text={text}
            style={style}
            containerRef={draggable}
          />
        ))}

        {imageLayouts.map(({ src, alt, style }) => (
          <DraggableImageCard
            key={src}
            src={src}
            alt={alt}
            style={style}
            containerRef={draggable}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default DragAndDrop;

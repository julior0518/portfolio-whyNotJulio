import { useMemo, useRef } from "react";
import DraggableImageCard from "../../../components/dragAndDrop/DraggableImageCard";
import DraggableTextCard from "../../../components/dragAndDrop/DraggableTextCard";
import { scatterStyleForKey } from "../../../components/dragAndDrop/scatterStyle";

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

  return (
    <div className="grid-default grid-1">
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
    </div>
  );
}

export default DragAndDrop;

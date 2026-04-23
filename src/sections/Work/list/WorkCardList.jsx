import { useRef } from "react";
import { useHorizontalScrollHint } from "../../../hooks/useHorizontalScrollHint";
import WorkCard from "./WorkCard";

export default function WorkCardList({ items, selectedWork, onSelectWork }) {
  const rootRef = useRef(null);
  const scrollerRef = useRef(null);

  useHorizontalScrollHint(rootRef, scrollerRef);

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-[3rem] border border-gold/10 bg-porcelain/60 shadow-lux-sm backdrop-blur-sm md:px-3 md:py-3"
    >
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 md:flex-wrap md:overflow-visible md:px-0"
      >
        {items.map((item) => (
          <WorkCard
            key={item.id}
            item={item}
            selected={selectedWork?.id === item.id}
            onSelect={(event) => onSelectWork(item, event)}
          />
        ))}
      </div>
    </div>
  );
}

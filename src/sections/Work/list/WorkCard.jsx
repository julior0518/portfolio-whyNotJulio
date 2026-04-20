import { cn } from "../../../lib/cn";

export default function WorkCard({ item, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex h-20 min-w-[11rem] shrink-0 snap-start items-center gap-3 overflow-hidden rounded-full border px-4 py-3 text-left transition-all duration-300 md:min-w-0 md:flex-1 md:basis-0",
        selected
          ? "border-gold/45 bg-white text-ink shadow-lux-sm"
          : "border-gold/12 bg-white/45 text-charcoal hover:border-gold/28 hover:bg-white/75",
      )}
      aria-pressed={selected}
    >
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full transition-colors duration-300",
          selected ? "bg-brass" : "bg-gold/25 group-hover:bg-gold/45",
        )}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate whitespace-nowrap font-sans text-[0.58rem] font-medium uppercase tracking-[0.24em] text-muted">
          {item.eyebrow}
        </span>
        <span className="block truncate whitespace-nowrap font-serif text-base font-medium tracking-tight md:text-lg">
          {item.title}
        </span>
      </span>
    </button>
  );
}

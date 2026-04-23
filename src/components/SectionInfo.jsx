import { cn } from "../lib/cn";

export default function SectionInfo({ eyebrow, title, description, className }) {
  return (
    <div className={cn("mx-auto mb-16 max-w-5xl text-left", className)}>
      <div className="border-l-2 border-gold/30 pl-5 md:border-l-[3px] md:pl-8">
        <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-brass">
          {eyebrow}
        </p>
        <h2 className="mt-1 font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-ink md:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
          {title}
        </h2>
        <p className="mt-8 max-w-3xl font-sans text-base font-normal leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}

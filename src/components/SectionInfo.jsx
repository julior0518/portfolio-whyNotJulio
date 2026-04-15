export default function SectionInfo({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-16 max-w-3xl">
      <div>
        <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.35em] text-brass">
          {eyebrow}
        </p>
        <h2 className="mt-0 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      <p className="mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-muted md:text-lg">
        {description}
      </p>
    </div>
  );
}

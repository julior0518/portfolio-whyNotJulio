const Footer = () => {
  return (
    <footer className="app-padding border-t border-gold/15 bg-canvas pb-10 pt-8">
      <div className="mx-auto flex max-w-7xl flex-row items-center justify-between gap-4 text-sm text-muted">
        <a
          href="/"
          className="inline-flex shrink-0 opacity-50 transition-opacity hover:opacity-100"
          aria-label="Why Not Julio — home"
        >
          <span
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-brass/55 bg-canvas/90 shadow-[0_0_20px_rgba(168,132,61,0.12)] md:h-10 md:w-10"
            aria-hidden
          >
            <img
              src="/assets/wnj_logo.png"
              alt=""
              className="size-[1.35rem] object-contain md:size-6"
            />
          </span>
        </a>
        <p className="text-right font-serif text-base text-charcoal/70">
          © {new Date().getFullYear()} whyNotJulio
        </p>
      </div>
    </footer>
  );
};

export default Footer;

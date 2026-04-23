const Footer = () => {
  return (
    <footer className="app-padding border-t border-gold/15 bg-canvas pb-10 pt-8">
      <div className="mx-auto flex max-w-screen-2xl flex-row items-center justify-between gap-4 text-sm text-muted">
        <a
          href="/"
          className="inline-flex shrink-0 opacity-50 transition-opacity hover:opacity-100"
          aria-label="Why Not Julio — home"
        >
          <img
            src="/assets/wnj_logo.png"
            alt=""
            className="h-10 w-10 rounded-full border border-brass/55 bg-canvas/90 object-contain p-1.5 shadow-[0_0_20px_rgba(168,132,61,0.12)] md:h-12 md:w-12 md:p-2"
          />
        </a>
        <p className="text-right font-serif text-base text-charcoal/70">
          © {new Date().getFullYear()} whyNotJulio
        </p>
      </div>
    </footer>
  );
};

export default Footer;

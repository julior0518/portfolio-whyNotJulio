import { mySocials } from "../constants";

const Footer = () => {
  return (
    <footer className="app-padding border-t border-gold/15 bg-canvas pb-10 pt-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans uppercase tracking-[0.2em]">
          <span>Terms</span>
          <span className="text-gold/40">·</span>
          <span>Privacy</span>
        </div>
        <div className="flex gap-5">
          {mySocials.map((social) => (
            <a
              href={social.href}
              key={social.name}
              className="opacity-80 transition-opacity hover:opacity-100"
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={
                social.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              <img
                src={social.icon}
                className="h-5 w-5"
                alt={social.name}
              />
            </a>
          ))}
        </div>
        <p className="font-serif text-base text-charcoal/70">
          © {new Date().getFullYear()} whyNotJulio
        </p>
      </div>
    </footer>
  );
};

export default Footer;

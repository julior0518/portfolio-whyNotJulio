import { mySocials } from "../constants";

const Footer = () => {
  return (
    <footer className="app-padding border-t border-gold/15 bg-canvas pb-10 pt-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        
        <p className="font-serif text-base text-charcoal/70">
          © {new Date().getFullYear()} whyNotJulio
        </p>
      </div>
    </footer>
  );
};

export default Footer;

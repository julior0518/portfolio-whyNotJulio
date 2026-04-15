import { useState } from "react";
import { motion } from "motion/react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { couture } from "../lib/coutureMotion";
import { useActiveChapter } from "../hooks/useActiveChapter";
import { cn } from "../lib/cn";
import NavbarBrand from "../components/NavbarBrand";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "tech", label: "Craft" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

const Navigation = ({ onNavigate, activeId }) => {
  return (
    <div className="relative z-20 flex h-full flex-col items-center justify-center gap-10 sm:flex-row sm:flex-wrap sm:justify-end md:gap-6 lg:gap-8">
      {NAV_LINKS.map((link) => {
        const active = activeId === link.id;
        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={() => onNavigate?.()}
            className={cn(
              "border-b border-transparent pb-0.5 font-sans text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-500 md:text-[0.7rem] md:tracking-[0.22em]",
              active
                ? "border-brass/60 text-ink"
                : "text-charcoal hover:border-gold/30 hover:text-brass",
            )}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const activeId = useActiveChapter();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <header className="fixed left-0 top-0 z-[200] w-full border-b border-gold/15 bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-10 lg:px-14">
        <a
          href="#home"
          className="group flex min-w-0 shrink-0 items-center gap-3"
        >
          <NavbarBrand />
          <motion.span
            className="hidden font-sans text-[0.6rem] font-medium uppercase tracking-[0.3em] text-muted sm:inline md:max-w-[10rem] md:truncate lg:max-w-none"
            aria-live="polite"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              reducedMotion
                ? undefined
                : { delay: 1.05, duration: 0.55, ease: couture.reveal.ease }
            }
          >
            Portfolio
          </motion.span>
        </a>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-charcoal transition-colors hover:text-brass sm:hidden"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <nav className="hidden sm:block" aria-label="Primary">
          <Navigation activeId={activeId} />
        </nav>
      </div>

      {isOpen && (
        <motion.div
          className="border-t border-gold/10 bg-canvas/98 sm:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={couture.reveal}
        >
          <div className="min-h-[50vh] py-10">
            <Navigation onNavigate={closeMenu} activeId={activeId} />
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;

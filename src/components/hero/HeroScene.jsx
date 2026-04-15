import { cn } from "../../lib/cn";

/**
 * Scene shell: establishes isolate stacking, full-viewport frame, and rhythm (breathable negative space).
 * Layers use a fixed z-scale so fg/mg/bg read as depth, not stacked divs.
 */
const z = {
  background: "z-[0]",
  atmosphere: "z-[1]",
  midground: "z-[10]",
  foreground: "z-[20]",
};

function Root({ id, className, children }) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate min-h-[100dvh] overflow-hidden app-padding",
        className,
      )}
    >
      {children}
    </section>
  );
}

function Background({ className, children }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        z.background,
        className,
      )}
    >
      {children}
    </div>
  );
}

function Atmosphere({ className, children }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        z.atmosphere,
        className,
      )}
    >
      {children}
    </div>
  );
}

function Midground({ className, children }) {
  return (
    <div className={cn("absolute inset-0", z.midground, className)}>
      {children}
    </div>
  );
}

function Foreground({ className, children }) {
  return (
    <div
      className={cn(
        "relative w-full max-w-7xl mx-auto",
        z.foreground,
        className,
      )}
    >
      {children}
    </div>
  );
}

export const HeroScene = Object.assign(Root, {
  Background,
  Atmosphere,
  Midground,
  Foreground,
});

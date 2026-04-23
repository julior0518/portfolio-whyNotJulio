import { cn } from "../../lib/cn";

/**
 * Stages 3D or hero objects like campaign pieces — arch / frame / pedestal variants.
 */
export default function ObjectStage({
  variant = "frame",
  as: Tag = "div",
  className,
  children,
  label,
}) {
  return (
    <Tag
      className={cn(
        "relative",
        variant === "arch" &&
          "mx-auto w-full max-w-[min(100%,64rem)] overflow-hidden rounded-t-[min(28vw,9.5rem)] border border-gold/20 border-b-0 bg-transparent shadow-[inset_0_1px_0_0_rgba(198,169,98,0.12)]",
        variant === "frame" &&
          "rounded-md border border-gold/15 shadow-lux-md ring-1 ring-gold/5",
        variant === "pedestal" &&
          "mx-auto max-w-6xl rounded-sm border border-gold/10 bg-gradient-to-b from-porcelain/40 to-canvas/80 pt-2 shadow-lux-lg",
        className,
      )}
      data-object-stage={variant}
    >
      {label && (
        <span className="pointer-events-none absolute left-4 top-3 hidden font-sans text-[0.6rem] font-medium uppercase tracking-[0.35em] text-brass/90 sm:block">
          {label}
        </span>
      )}
      {children}
    </Tag>
  );
}

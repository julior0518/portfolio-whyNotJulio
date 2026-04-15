import ObjectStage from "../../../components/scene/ObjectStage";
import { cn } from "../../../lib/cn";

/** Curved-top frame around the home parallax + 3D scene. */
export default function HomeArchStage({ className, children }) {
  return (
    <ObjectStage
      variant="arch"
      className={cn(
        "relative max-w-none h-[min(56vh,37rem)] w-full md:h-[min(62vh,44rem)]",
        className,
      )}
    >
      {children}
    </ObjectStage>
  );
}

import { useState, useEffect } from "react";
import { cn } from "../lib/cn";

export const Keypad = ({ className }) => {
  const [pressedKeys, setPressedKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  // Keyboard listeners for physical keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (["w", "a", "s", "d"].includes(key)) {
        setPressedKeys((prev) => ({ ...prev, [key]: true }));
      }
    };
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (["w", "a", "s", "d"].includes(key)) {
        setPressedKeys((prev) => ({ ...prev, [key]: false }));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Handles both mouse and touch events
  const handlePressStart = (key) => {
    setPressedKeys((prev) => ({ ...prev, [key]: true }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key }));
  };
  const handlePressEnd = (key) => {
    setPressedKeys((prev) => ({ ...prev, [key]: false }));
    window.dispatchEvent(new KeyboardEvent("keyup", { key }));
  };

  return (
    <div
      className={cn(
        "absolute bottom-4 right-4 grid w-max grid-cols-3 grid-rows-2 gap-1 md:gap-3",
        className,
      )}
    >
      {/* W */}
      <button
        type="button"
        className={`col-start-2 row-start-1 h-10 w-10 rounded-md border border-gold/25 bg-charcoal/90 text-lg text-porcelain shadow-lux-sm backdrop-blur-sm transition-transform md:h-16 md:w-16 md:text-xl ${
          pressedKeys.w ? "scale-95 border-brass/50 bg-equestrian/90" : ""
        }`}
        onMouseDown={() => handlePressStart("w")}
        onMouseUp={() => handlePressEnd("w")}
        onMouseLeave={() => handlePressEnd("w")}
        onTouchStart={() => handlePressStart("w")}
        onTouchEnd={() => handlePressEnd("w")}
      >
        W
      </button>

      {/* A */}
      <button
        type="button"
        className={`col-start-1 row-start-2 h-10 w-10 rounded-md border border-gold/25 bg-charcoal/90 text-lg text-porcelain shadow-lux-sm backdrop-blur-sm transition-transform md:h-16 md:w-16 md:text-xl ${
          pressedKeys.a ? "scale-95 border-brass/50 bg-equestrian/90" : ""
        }`}
        onMouseDown={() => handlePressStart("a")}
        onMouseUp={() => handlePressEnd("a")}
        onMouseLeave={() => handlePressEnd("a")}
        onTouchStart={() => handlePressStart("a")}
        onTouchEnd={() => handlePressEnd("a")}
      >
        A
      </button>

      {/* S */}
      <button
        type="button"
        className="col-start-2 row-start-2 h-10 w-10 cursor-not-allowed rounded-md border border-gold/15 bg-charcoal/50 text-lg text-muted md:h-16 md:w-16 md:text-xl"
        disabled
      >
        S
      </button>

      {/* D */}
      <button
        type="button"
        className={`col-start-3 row-start-2 h-10 w-10 rounded-md border border-gold/25 bg-charcoal/90 text-lg text-porcelain shadow-lux-sm backdrop-blur-sm transition-transform md:h-16 md:w-16 md:text-xl ${
          pressedKeys.d ? "scale-95 border-brass/50 bg-equestrian/90" : ""
        }`}
        onMouseDown={() => handlePressStart("d")}
        onMouseUp={() => handlePressEnd("d")}
        onMouseLeave={() => handlePressEnd("d")}
        onTouchStart={() => handlePressStart("d")}
        onTouchEnd={() => handlePressEnd("d")}
      >
        D
      </button>
    </div>
  );
};

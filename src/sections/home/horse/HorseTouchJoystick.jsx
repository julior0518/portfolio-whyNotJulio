import { useCallback, useRef, useState } from "react";
import { useHorseKeys } from "./HorseKeysContext.jsx";

/** Outer dial size (px) — keep in sync with `-mt-1/2` overlap in Home.jsx */
export const HORSE_JOYSTICK_OUTER_PX = 68;

const STICK_RANGE = 22;
const STICK_THRESHOLD = 9;
const KNOB_PX = 30;

/**
 * Two-layer glass joystick: outer ring + inner knob. Maps to W / A / D.
 */
export default function HorseTouchJoystick() {
  const keysRef = useHorseKeys();
  const zoneRef = useRef(null);
  const [stick, setStick] = useState({ x: 0, y: 0 });
  const active = useRef(false);

  const clearKeys = useCallback(() => {
    keysRef.current.w = false;
    keysRef.current.a = false;
    keysRef.current.d = false;
  }, [keysRef]);

  const applyFromClient = useCallback(
    (clientX, clientY) => {
      const el = zoneRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      let dx = clientX - cx;
      let dy = clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > STICK_RANGE && dist > 0) {
        dx = (dx / dist) * STICK_RANGE;
        dy = (dy / dist) * STICK_RANGE;
      }
      setStick({ x: dx, y: dy });
      keysRef.current.w = dy < -STICK_THRESHOLD;
      keysRef.current.a = dx < -STICK_THRESHOLD;
      keysRef.current.d = dx > STICK_THRESHOLD;
    },
    [keysRef],
  );

  const endDrag = useCallback(() => {
    active.current = false;
    setStick({ x: 0, y: 0 });
    clearKeys();
  }, [clearKeys]);

  const outer = HORSE_JOYSTICK_OUTER_PX;

  return (
    <div
      ref={zoneRef}
      role="application"
      aria-label="Horse controls — drag up to walk, sideways to turn"
      className="relative shrink-0 touch-none select-none rounded-full bg-white/[0.18] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-8px_16px_rgba(255,255,255,0.12),0_4px_20px_rgba(0,0,0,0.06)] ring-1 ring-white/40 backdrop-blur-xl"
      style={{ width: outer, height: outer }}
      onPointerDown={(e) => {
        e.preventDefault();
        active.current = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
        applyFromClient(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (!active.current) return;
        applyFromClient(e.clientX, e.clientY);
      }}
      onPointerUp={(e) => {
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
        endDrag();
      }}
      onPointerCancel={endDrag}
      onLostPointerCapture={endDrag}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full bg-white/[0.35] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-white/50 backdrop-blur-md"
        style={{
          width: KNOB_PX,
          height: KNOB_PX,
          transform: `translate(calc(-50% + ${stick.x}px), calc(-50% + ${stick.y}px))`,
        }}
      />
    </div>
  );
}

"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function Globe({ className }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pointer = useRef(null);
  const phi = useRef(0);
  const hasDrawn = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const buffer = { width: 0, height: 0 };

    const applySize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(2, Math.round(rect.width * 2));
      const h = Math.max(2, Math.round(rect.height * 2));
      if (w === buffer.width && h === buffer.height) return;
      buffer.width = w;
      buffer.height = h;
      canvas.width = w;
      canvas.height = h;
    };

    let globe = null;

    const mountGlobe = () => {
      if (globe) return;
      applySize();
      if (buffer.width < 4 || buffer.height < 4) return;
      globe = createGlobe(canvas, {
        width: buffer.width,
        height: buffer.height,
        devicePixelRatio: 2,
        phi: phi.current,
        theta: 0.3,
        dark: 0,
        diffuse: 1,
        baseColor: [1, 1, 1],
        mapBrightness: 1.2,
        mapSamples: 16000,
        glowColor: [1, 1, 1],
        markerColor: [1, 0, 0],
        markers: [
          { location: [40.4168, -3.7038], size: 0.08 }, // Madrid
          { location: [25.7617, -80.1918], size: 0.08 }, // Miami
          { location: [34.0522, -118.2437], size: 0.08 }, // Los Angeles
          { location: [40.7128, -74.0060], size: 0.08 }, // New York
        ],
        onRender: (state) => {
          if (!hasDrawn.current) {
            hasDrawn.current = true;
            canvas.style.opacity = "1";
          }

          if (!pointer.current) {
            phi.current += 0.003;
          }

          state.phi = phi.current;
          state.width = buffer.width;
          state.height = buffer.height;
        },
      });
    };

    const ro = new ResizeObserver(() => {
      applySize();
      mountGlobe();
    });
    ro.observe(container);

    const onWindowResize = () => {
      applySize();
      mountGlobe();
    };
    window.addEventListener("resize", onWindowResize);

    applySize();
    mountGlobe();
    const rafId = requestAnimationFrame(() => {
      applySize();
      mountGlobe();
    });

    const onPointerDown = (e) => {
      pointer.current = { prevX: e.clientX };
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!pointer.current) return;
      const delta = e.clientX - pointer.current.prevX;
      phi.current += delta / 200;
      pointer.current.prevX = e.clientX;
    };

    const onPointerUp = (e) => {
      pointer.current = null;
      canvas.releasePointerCapture(e.pointerId);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", onWindowResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerUp);
      globe?.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`mx-auto aspect-square w-full max-w-[600px] bg-porcelain/90 ${className ?? ""}`}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-200"
      />
    </div>
  );
}

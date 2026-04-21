"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function Globe({ className }) {
  const canvasRef = useRef(null);
  const pointer = useRef(null);
  const phi = useRef(0);
  const hasDrawn = useRef(false);

  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasRef.current) return { width: 0, height: 0 };

      const rect = canvasRef.current.getBoundingClientRect();
      const width = rect.width * 2; // multiply by devicePixelRatio
      const height = rect.height * 2;

      canvasRef.current.width = width;
      canvasRef.current.height = height;

      return { width, height };
    };

    let { width, height } = resizeCanvas();

    createGlobe(canvasRef.current, {
      width,
      height,
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
      ],
      onRender: (state) => {
        if (!hasDrawn.current && canvasRef.current) {
          hasDrawn.current = true;
          canvasRef.current.style.opacity = "1";
        }

        if (!pointer.current) {
          phi.current += 0.003; // Change this value to control the speed of auto-rotation
        }

        state.phi = phi.current;

        const { width, height } = resizeCanvas();
        state.width = width;
        state.height = height;
      },
    });

    const onPointerDown = (e) => {
      pointer.current = { prevX: e.clientX };
      canvasRef.current.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!pointer.current) return;
      const delta = e.clientX - pointer.current.prevX;
      phi.current += delta / 200;
      pointer.current.prevX = e.clientX;
    };

    const onPointerUp = (e) => {
      pointer.current = null;
      canvasRef.current.releasePointerCapture(e.pointerId);
    };

    canvasRef.current.addEventListener("pointerdown", onPointerDown);
    canvasRef.current.addEventListener("pointermove", onPointerMove);
    canvasRef.current.addEventListener("pointerup", onPointerUp);
    canvasRef.current.addEventListener("pointerleave", onPointerUp);

    window.addEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div  className={`mx-auto aspect-square w-full max-w-[600px] bg-porcelain/90 ${className ?? ""}`}>
      <canvas ref={canvasRef}  className="h-full w-full opacity-0 transition-opacity duration-200" />
    </div>
  );
}

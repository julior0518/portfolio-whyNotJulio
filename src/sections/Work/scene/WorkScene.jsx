import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import MacbookModel from "./MacbookModel";
import { SCENE_CAMERA } from "./workScene.constants";

export default function WorkScene({ image }) {
  return (
    <figure className="pointer-events-none relative z-[2] mx-auto h-[min(500px,55svh)] w-full md:h-[min(100svh,900px)]">
      <Canvas
        className="pointer-events-none h-full w-full"
        camera={SCENE_CAMERA}
        pointerEvents="none"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} intensity={4} castShadow />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#333" intensity={1} />
          <MacbookModel image={image} />
        </Suspense>
      </Canvas>
    </figure>
  );
}

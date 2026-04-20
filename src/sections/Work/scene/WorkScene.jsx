import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import MacbookModel from "./MacbookModel";
import { SCENE_CAMERA } from "./workScene.constants";

export default function WorkScene({ image }) {
  return (
    <figure className="pointer-events-none absolute left-0 top-0 z-[2] -ml-[60px] h-[500px] w-[500px] md:inset-x-0 md:ml-0 md:h-[min(100vh,900px)] md:w-full">
      <Canvas camera={SCENE_CAMERA} pointerEvents="none">
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

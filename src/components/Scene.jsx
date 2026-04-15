/* eslint-disable react/no-unknown-property */
import { useEffect, useLayoutEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

const WALK_IN_SEC = 2.2;
const MAX_DELTA = 1 / 30;

const Horse = ({ position = [-1.5, -1.2, 0], ...props }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/horse.glb");
  const { actions } = useAnimations(animations, group);

  const keys = useRef({ w: false, a: false, d: false, s: false });
  const introComplete = useRef(false);
  const introTime = useRef(0);
  /** Avoid one frame at origin before RAF — R3F default position is 0,0,0 */
  const placedRef = useRef(false);

  const px = position[0];
  const py = position[1];
  const pz = position[2];
  const zWalkInStart = pz + 0.55;

  useEffect(() => {
    const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    const handleKeyDown = (e) => {
      if (arrowKeys.includes(e.key)) e.preventDefault();
      if (e.repeat) return;

      const k = e.key;
      if (k === "ArrowUp" || k === "w" || k === "W") keys.current.w = true;
      if (k === "ArrowLeft" || k === "a" || k === "A") keys.current.a = true;
      if (k === "ArrowRight" || k === "d" || k === "D") keys.current.d = true;
      if (k === "ArrowDown" || k === "s" || k === "S") keys.current.s = true;
    };

    const handleKeyUp = (e) => {
      if (arrowKeys.includes(e.key)) e.preventDefault();
      const k = e.key;
      if (k === "ArrowUp" || k === "w" || k === "W") keys.current.w = false;
      if (k === "ArrowLeft" || k === "a" || k === "A") keys.current.a = false;
      if (k === "ArrowRight" || k === "d" || k === "D") keys.current.d = false;
      if (k === "ArrowDown" || k === "s" || k === "S") keys.current.s = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;

    const walkAction = actions["Horse_walk"];
    if (!walkAction) return;

    const dt = Math.min(delta, MAX_DELTA);

    /* First RAF: snap to walk-in start (hidden until then — avoids flash at origin) */
    if (!placedRef.current) {
      group.current.position.set(px, py, zWalkInStart);
      group.current.visible = true;
      placedRef.current = true;
      introTime.current = 0;
      walkAction.paused = false;
      if (!walkAction.isRunning()) walkAction.play();
      return;
    }

    /* Short walk-in on load: move forward along Z with walk clip playing */
    if (!introComplete.current) {
      introTime.current += dt;
      const t = Math.min(1, introTime.current / WALK_IN_SEC);
      const eased = 1 - (1 - t) ** 3;

      group.current.position.set(
        px,
        py,
        THREE.MathUtils.lerp(zWalkInStart, pz, eased),
      );

      walkAction.paused = false;
      if (!walkAction.isRunning()) walkAction.play();

      if (t >= 1) {
        introComplete.current = true;
        walkAction.paused = true;
        group.current.position.set(px, py, pz);
      }
      return;
    }

    const speed = 0.4;
    const turnSpeed = 1.5;

    const a = keys.current.a;
    const w = keys.current.w;
    const d = keys.current.d;
    const s = keys.current.s;

    const moving = w || s || a || d;

    if (moving) {
      walkAction.paused = false;
      if (!walkAction.isRunning()) {
        walkAction.play();
      }
    } else {
      walkAction.paused = true;
    }

    if (a) group.current.rotation.y += turnSpeed * dt;
    if (d) group.current.rotation.y -= turnSpeed * dt;
    if (w) {
      group.current.position.x +=
        Math.sin(group.current.rotation.y) * speed * dt;
      group.current.position.z +=
        Math.cos(group.current.rotation.y) * speed * dt;
    }
    if (s) {
      group.current.position.x -=
        Math.sin(group.current.rotation.y) * speed * dt;
      group.current.position.z -=
        Math.cos(group.current.rotation.y) * speed * dt;
    }
  });

  return (
    <group ref={group} visible={false} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Horse-rig_41">
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.defaultMat}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <group name="Object_2_40" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

// Preload runs when this module loads (after lazy import) — keeps first paint light.
useGLTF.preload("/models/horse.glb");

export const Scene = () => {
  const position = [-0.08, -0.55, 3.11];
  return (
    <figure className="absolute inset-0 h-full w-full overflow-hidden">
      <Canvas camera={{ position: position, fov: 45 }}>
        <Suspense fallback={<></>}>
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <hemisphereLight
            skyColor={"#b1e1ff"}
            groundColor={"#333"}
            intensity={0.5}
          />
          <ResponsiveCamera />
          <Horse
            position={[-1.5, -1.2, 0]}
            scale={0.5}
            rotation={[0.2, Math.PI / 3, 0]}
          />
        </Suspense>
      </Canvas>
    </figure>
  );
};

const ResponsiveCamera = () => {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    const updateCamera = () => {
      const w = size.width;
      const h = size.height;
      if (w < 2 || h < 2 || !Number.isFinite(w / h)) return;

      const aspect = w / h;
      const baseX = -0.08;
      const baseY = -0.55;
      const baseZ = 3.11;

      const adjustedY = baseY - Math.min((aspect - 1) * 0.2, 0.8);
      const adjustedZ = baseZ / aspect + (aspect - 1) * 0.4;

      camera.position.set(baseX, adjustedY, adjustedZ);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", updateCamera);
    updateCamera();

    return () => window.removeEventListener("resize", updateCamera);
  }, [camera, size]);

  return null;
};

export default Scene;

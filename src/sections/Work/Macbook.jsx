/* eslint-disable react/display-name */
/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { TextureLoader } from "three";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";

const MODEL_PATH = "/models/macbook2.glb";
const DEFAULT_SCREEN_IMAGE = "/assets/tech/react.png";
const INITIAL_LID_ROTATION = [4.2, 3.47, 0.55];
const FINAL_LID_ROTATION = [3, 0, 0];
const MACBOOK_POSITION = [0, 0.5, 0];
const FINAL_MACBOOK_POSITION = [0, 0, 0];
const MACBOOK_ROTATION = [0.8, 2.5, 3.1];
const MACBOOK_SCALE = 5;

const ScreenImage = ({ image }) => {
  const materialRef = useRef();
  const loaderRef = useRef(new TextureLoader());
  const textureRef = useRef(null);

  // Load DEFAULT texture only once
  if (!textureRef.current) {
    textureRef.current = loaderRef.current.load(DEFAULT_SCREEN_IMAGE);
    textureRef.current.colorSpace = THREE.SRGBColorSpace;
    textureRef.current.minFilter = THREE.LinearFilter;
    textureRef.current.magFilter = THREE.LinearFilter;
  }

  useEffect(() => {
    if (!image) return;

    loaderRef.current.load(
      image,
      (newTex) => {
        newTex.colorSpace = THREE.SRGBColorSpace;
        newTex.minFilter = THREE.LinearFilter;
        newTex.magFilter = THREE.LinearFilter;
        newTex.flipY = true; // VERY important for GLTF UVs

        // Replace the whole texture, not just .image
        textureRef.current.dispose(); // free GPU memory
        textureRef.current = newTex;

        // Assign the new map
        if (materialRef.current) {
          materialRef.current.map = newTex;
          materialRef.current.needsUpdate = true;
        }
      },
      undefined,
      (error) => {
        console.warn("Failed to load texture:", error);
      },
    );
  }, [image]);

  return (
    <meshStandardMaterial
      ref={materialRef}
      map={textureRef.current}
      toneMapped={false}
      attach="material"
    />
  );
};

const MacbookModel = ({ nodes, materials, image, animatedRotation }) => {
  return (
    <a.group name="Sketchfab_model" rotation={animatedRotation}>
      <group name="root">
        <group name="GLTF_SceneRootNode" rotation={[0, 0, 0]}>
          <group name="Bevels_2" position={[0, 0.008, -0.104]} scale={0.275}>
            <mesh
              geometry={nodes.Object_4.geometry}
              material={materials.Black_Glass}
            />
            <mesh
              geometry={nodes.Object_5.geometry}
              material={materials.Black_Plastic}
            />
            <mesh
              geometry={nodes.Object_6.geometry}
              material={materials.Glass}
            />
            {/* SCREEN */}
            <mesh geometry={nodes.Object_7.geometry}>
              <ScreenImage attach="material" image={image} />
            </mesh>
            <mesh
              geometry={nodes.Object_8.geometry}
              material={materials.Space_Grey}
            />
            <mesh
              geometry={nodes.Object_9.geometry}
              material={materials["Space_Grey.001"]}
            />
            <group
              name="Empty_1"
              position={[0, 0.001, 0]}
              rotation={[-Math.PI, 0, 0]}
              scale={[-0.039, 0.039, 0.039]}
            >
              <group
                name="Camera_Light_0"
                position={[0, 0.077, -0.044]}
                rotation={[-1.192, 0, 0]}
                scale={[-25.381, 25.381, 25.381]}
              >
                <mesh
                  geometry={nodes.Object_12.geometry}
                  material={materials.Camera_Light}
                />
              </group>
            </group>
          </group>
          <group
            name="Caps_Lock_Light_3"
            position={[0, -0.014, 0]}
            scale={0.275}
          >
            <mesh
              geometry={nodes.Object_14.geometry}
              material={materials.Caps_Lock_Light}
            />
          </group>
          <group
            name="Macbook_Pro_4"
            position={[0, 0.008, -0.104]}
            rotation={[1.949, 0, 0]}
            scale={0.275}
          >
            <mesh
              geometry={nodes.Object_16.geometry}
              material={materials["Material.001"]}
            />
          </group>
          <group name="Main_Body_5" position={[0, -0.014, 0]} scale={0.275}>
            <mesh
              geometry={nodes.Object_18.geometry}
              material={materials.Space_Grey}
            />
            <mesh
              geometry={nodes.Object_19.geometry}
              material={materials.Black_Plastic}
            />
            <mesh
              geometry={nodes.Object_20.geometry}
              material={materials.Black_Plastic}
            />
            <mesh
              geometry={nodes.Object_21.geometry}
              material={materials["Keys.001"]}
            />
          </group>
          <group name="Touch_Bar_6" position={[0, -0.014, 0]} scale={0.275}>
            <mesh
              geometry={nodes.Object_23.geometry}
              material={materials.Black_Plastic}
            />
            <mesh
              geometry={nodes.Object_24.geometry}
              material={materials.Black_Glass}
            />
            <mesh
              geometry={nodes.Object_25.geometry}
              material={materials.Keys}
            />
          </group>
          <group
            name="Touch_Bar_Shot_7"
            position={[0, -0.014, 0]}
            scale={0.275}
          >
            <mesh
              geometry={nodes.Object_27.geometry}
              material={materials["Touch_Bar_Shot_2021-04-02_at_18.13.28"]}
            />
          </group>
          <group name="Keyboard_8" position={[0, -0.014, 0]} scale={0.275}>
            <mesh
              geometry={nodes.Object_29.geometry}
              material={materials.Black_Plastic}
            />
            <mesh
              geometry={nodes.Object_30.geometry}
              material={materials.Keys}
            />
          </group>
          <group name="Cube_9" position={[0, -0.014, 0]}>
            <mesh
              geometry={nodes.Object_32.geometry}
              material={materials.Black_Plastic}
            />
          </group>
          <group
            name="Circle001_12"
            position={[0.203, 0.008, -0.104]}
            rotation={[0.011, -0.75, 1.274]}
          />
        </group>
      </group>
    </a.group>
  );
};

const Mackbook = React.memo(({ image }) => {
  const group = useRef();
  const hasAnimatedRef = useRef(false);
  const lastImageRef = useRef(null);
  const animationTimeout = useRef(null);
  const pauseTimeout = useRef(null);

  const { nodes, materials, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, group);

  const [springs, api] = useSpring(() => ({
    position: MACBOOK_POSITION,
    rotation: INITIAL_LID_ROTATION,
    config: { mass: 3, tension: 40, friction: 60 },
  }));

  const rotation = useMemo(() => MACBOOK_ROTATION, []);
  const scale = MACBOOK_SCALE;
  const finalRotation = useMemo(() => FINAL_LID_ROTATION, []);
  const finalPosition = useMemo(() => FINAL_MACBOOK_POSITION, []);

  const normalizedImage = typeof image === "string" ? image.trim() : image;

  useEffect(() => {
    if (!normalizedImage || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;
    lastImageRef.current = normalizedImage;

    api.start({ rotation: finalRotation, position: finalPosition });
    animationTimeout.current = setTimeout(() => {
      const action = actions && actions["Animation"];
      if (action) {
        action.reset().fadeIn(0.5).play();
      }
    }, 2000);

    pauseTimeout.current = setTimeout(() => {
      const action = actions && actions["Animation"];
      if (action) {
        action.paused = true;
      }
    }, 7000);
  }, [normalizedImage, api, actions, finalRotation, finalPosition]);

  useEffect(() => {
    if (!hasAnimatedRef.current) return;
    if (!normalizedImage) return;

    if (normalizedImage === lastImageRef.current) return;

    api.set({ rotation: finalRotation, position: finalPosition });

    lastImageRef.current = normalizedImage;
  }, [normalizedImage, api, finalRotation, finalPosition]);

  useEffect(() => {
    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
      if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    };
  }, []);

  return (
    <a.group
      ref={group}
      position={springs.position}
      scale={scale}
      rotation={rotation}
      dispose={null}
    >
      <group name="Sketchfab_Scene">
        <MacbookModel
          nodes={nodes}
          materials={materials}
          image={image}
          animatedRotation={springs.rotation}
        />
      </group>
    </a.group>
  );
});

useGLTF.preload(MODEL_PATH);

export const Scene = ({ image }) => {
  return (
    <figure className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[min(520px,55vh)] w-full md:h-[min(100vh,900px)]">
      <Canvas
        camera={{ position: [-0.08, -0.55, 3.11], fov: 45 }}
        pointerEvents="none"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} intensity={4} castShadow />
          <hemisphereLight
            skyColor={"#b1e1ff"}
            groundColor={"#333"}
            intensity={1}
          />
          <Mackbook image={image} />
        </Suspense>
      </Canvas>
    </figure>
  );
};

export default Scene;

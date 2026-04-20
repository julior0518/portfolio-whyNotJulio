/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import ScreenImageMaterial from "./ScreenImageMaterial";
import {
  FINAL_LID_ROTATION,
  FINAL_MACBOOK_POSITION,
  INITIAL_LID_ROTATION,
  INITIAL_MACBOOK_POSITION,
  MACBOOK_ROTATION,
  MACBOOK_SCALE,
  MODEL_PATH,
} from "./workScene.constants";

function LaptopMeshes({ nodes, materials, image, animatedRotation }) {
  return (
    <a.group name="Sketchfab_model" rotation={animatedRotation}>
      <group name="root">
        <group name="GLTF_SceneRootNode" rotation={[0, 0, 0]}>
          <group name="Bevels_2" position={[0, 0.008, -0.104]} scale={0.275}>
            <mesh geometry={nodes.Object_4.geometry} material={materials.Black_Glass} />
            <mesh geometry={nodes.Object_5.geometry} material={materials.Black_Plastic} />
            <mesh geometry={nodes.Object_6.geometry} material={materials.Glass} />
            <mesh geometry={nodes.Object_7.geometry}>
              <ScreenImageMaterial image={image} />
            </mesh>
            <mesh geometry={nodes.Object_8.geometry} material={materials.Space_Grey} />
            <mesh geometry={nodes.Object_9.geometry} material={materials["Space_Grey.001"]} />
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
                <mesh geometry={nodes.Object_12.geometry} material={materials.Camera_Light} />
              </group>
            </group>
          </group>
          <group name="Caps_Lock_Light_3" position={[0, -0.014, 0]} scale={0.275}>
            <mesh geometry={nodes.Object_14.geometry} material={materials.Caps_Lock_Light} />
          </group>
          <group
            name="Macbook_Pro_4"
            position={[0, 0.008, -0.104]}
            rotation={[1.949, 0, 0]}
            scale={0.275}
          >
            <mesh geometry={nodes.Object_16.geometry} material={materials["Material.001"]} />
          </group>
          <group name="Main_Body_5" position={[0, -0.014, 0]} scale={0.275}>
            <mesh geometry={nodes.Object_18.geometry} material={materials.Space_Grey} />
            <mesh geometry={nodes.Object_19.geometry} material={materials.Black_Plastic} />
            <mesh geometry={nodes.Object_20.geometry} material={materials.Black_Plastic} />
            <mesh geometry={nodes.Object_21.geometry} material={materials["Keys.001"]} />
          </group>
          <group name="Touch_Bar_6" position={[0, -0.014, 0]} scale={0.275}>
            <mesh geometry={nodes.Object_23.geometry} material={materials.Black_Plastic} />
            <mesh geometry={nodes.Object_24.geometry} material={materials.Black_Glass} />
            <mesh geometry={nodes.Object_25.geometry} material={materials.Keys} />
          </group>
          <group name="Touch_Bar_Shot_7" position={[0, -0.014, 0]} scale={0.275}>
            <mesh
              geometry={nodes.Object_27.geometry}
              material={materials["Touch_Bar_Shot_2021-04-02_at_18.13.28"]}
            />
          </group>
          <group name="Keyboard_8" position={[0, -0.014, 0]} scale={0.275}>
            <mesh geometry={nodes.Object_29.geometry} material={materials.Black_Plastic} />
            <mesh geometry={nodes.Object_30.geometry} material={materials.Keys} />
          </group>
          <group name="Cube_9" position={[0, -0.014, 0]}>
            <mesh geometry={nodes.Object_32.geometry} material={materials.Black_Plastic} />
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
}

export default function MacbookModel({ image }) {
  const group = useRef();
  const hasAnimatedRef = useRef(false);
  const lastImageRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  const { nodes, materials, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, group);

  const [springs, api] = useSpring(() => ({
    position: INITIAL_MACBOOK_POSITION,
    rotation: INITIAL_LID_ROTATION,
    config: { mass: 3, tension: 40, friction: 60 },
  }));

  const baseRotation = useMemo(() => MACBOOK_ROTATION, []);
  const finalRotation = useMemo(() => FINAL_LID_ROTATION, []);
  const finalPosition = useMemo(() => FINAL_MACBOOK_POSITION, []);
  const normalizedImage = typeof image === "string" ? image.trim() : image;

  useEffect(() => {
    if (!normalizedImage || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;
    lastImageRef.current = normalizedImage;
    api.start({ rotation: finalRotation, position: finalPosition });

    animationTimeoutRef.current = setTimeout(() => {
      const action = actions?.Animation;
      if (action) action.reset().fadeIn(0.5).play();
    }, 2000);

    pauseTimeoutRef.current = setTimeout(() => {
      const action = actions?.Animation;
      if (action) action.paused = true;
    }, 7000);
  }, [actions, api, finalPosition, finalRotation, normalizedImage]);

  useEffect(() => {
    if (!hasAnimatedRef.current || !normalizedImage) return;
    if (normalizedImage === lastImageRef.current) return;

    api.set({ rotation: finalRotation, position: finalPosition });
    lastImageRef.current = normalizedImage;
  }, [api, finalPosition, finalRotation, normalizedImage]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  return (
    <a.group
      ref={group}
      position={springs.position}
      scale={MACBOOK_SCALE}
      rotation={baseRotation}
      dispose={null}
    >
      <group name="Sketchfab_Scene">
        <LaptopMeshes
          nodes={nodes}
          materials={materials}
          image={image}
          animatedRotation={springs.rotation}
        />
      </group>
    </a.group>
  );
}

useGLTF.preload(MODEL_PATH);

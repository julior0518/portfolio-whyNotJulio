import { useEffect, useRef } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";
import { DEFAULT_SCREEN_IMAGE } from "./workScene.constants";

function configureTexture(texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
}

export default function ScreenImageMaterial({ image }) {
  const materialRef = useRef();
  const loaderRef = useRef(new TextureLoader());
  const textureRef = useRef(null);

  if (!textureRef.current) {
    textureRef.current = loaderRef.current.load(DEFAULT_SCREEN_IMAGE);
    configureTexture(textureRef.current);
  }

  useEffect(() => {
    if (!image) return;

    loaderRef.current.load(
      image,
      (newTexture) => {
        configureTexture(newTexture);
        newTexture.flipY = true;

        textureRef.current?.dispose?.();
        textureRef.current = newTexture;

        if (materialRef.current) {
          materialRef.current.map = newTexture;
          materialRef.current.needsUpdate = true;
        }
      },
      undefined,
      (error) => {
        console.warn("Failed to load texture:", error);
      },
    );
  }, [image]);

  useEffect(() => {
    return () => textureRef.current?.dispose?.();
  }, []);

  return (
    <meshStandardMaterial
      ref={materialRef}
      map={textureRef.current}
      toneMapped={false}
      attach="material"
    />
  );
}

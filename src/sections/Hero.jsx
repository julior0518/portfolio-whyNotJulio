import { lazy, Suspense } from "react";
import { HeroScene } from "../components/hero/HeroScene";
import AlpineParallaxStage from "../components/hero/AlpineParallaxStage";
import HeroAtmosphere from "../components/hero/HeroAtmosphere";
import ObjectStage from "../components/scene/ObjectStage";

const SceneLazy = lazy(() => import("../components/Scene.jsx"));

const Hero = () => {
  return (
    <HeroScene id="home" className="px-3 sm:px-4 lg:px-6">
      <HeroScene.Background>
        <div
          className="absolute inset-0 bg-gradient-to-b from-porcelain/40 via-canvas to-canvas"
          aria-hidden
        />
      </HeroScene.Background>

      <div className="relative z-20 flex min-h-[100dvh] w-full flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center pb-6 pt-14 md:pb-10 md:pt-16">
          <ObjectStage
            variant="arch"
            className="relative max-w-none h-[min(56vh,37rem)] w-full md:h-[min(62vh,44rem)]"
          >
            <div className="relative isolate h-full min-h-[12rem] w-full">
              <AlpineParallaxStage contained />
              <div className="pointer-events-none absolute inset-0 z-[5]">
                <HeroAtmosphere />
              </div>
              <div className="absolute inset-0 z-10">
                <Suspense fallback={null}>
                  <SceneLazy />
                </Suspense>
              </div>
            </div>
          </ObjectStage>
          <p className="mx-auto mt-3 max-w-lg text-center font-sans text-[0.65rem] font-light leading-relaxed tracking-[0.12em] text-muted md:mt-4 md:text-[0.7rem] md:tracking-[0.14em]">
            Guide the horse with{" "}
            <span className="text-charcoal/90">W</span>,{" "}
            <span className="text-charcoal/90">A</span>,{" "}
            <span className="text-charcoal/90">S</span>,{" "}
            <span className="text-charcoal/90">D</span> or the arrow keys.
          </p>
        </div>
      </div>
    </HeroScene>
  );
};

export default Hero;

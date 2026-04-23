import { lazy, Suspense } from "react";
import { cn } from "../../lib/cn";
import HomeArchStage from "./arch/HomeArchStage";
import AlpineParallaxStage from "./parallax/AlpineParallaxStage";
import { HorseKeysProvider } from "./horse/HorseKeysContext.jsx";
import HorseTouchJoystick, {
  HORSE_JOYSTICK_OUTER_PX,
} from "./horse/HorseTouchJoystick.jsx";

const HomeHorseSceneLazy = lazy(() => import("./horse/HomeHorseScene.jsx"));

export default function Home() {
  const joystickOverlap = HORSE_JOYSTICK_OUTER_PX / 2;

  return (
    <section
      id="home"
      className={cn("relative isolate min-h-[100svh] overflow-hidden")}
    >
      <div className="pointer-events-none absolute inset-0 z-[0]">
        <div
          className="absolute inset-0 bg-gradient-to-b from-porcelain/40 via-canvas to-canvas"
          aria-hidden
        />
      </div>

      <div className="relative z-20 flex min-h-[100svh] w-full flex-col">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col justify-center pb-6 pt-14 app-padding md:pb-10 md:pt-16">
          <HorseKeysProvider>
            <HomeArchStage>
              <div className="relative isolate h-full min-h-[12rem] w-full overflow-visible">
                <AlpineParallaxStage contained />
                <div className="absolute inset-0 z-10 overflow-visible">
                  <Suspense fallback={null}>
                    <HomeHorseSceneLazy />
                  </Suspense>
                </div>
              </div>
            </HomeArchStage>
            <div
              className="relative z-30 flex justify-center md:hidden"
              style={{ marginTop: -joystickOverlap }}
            >
              <HorseTouchJoystick />
            </div>
            <p className="mx-auto mt-3 hidden max-w-2xl text-center font-sans text-[0.65rem] font-light leading-relaxed tracking-[0.12em] text-muted md:mt-4 md:block md:text-[0.7rem] md:tracking-[0.14em]">
              Guide the horse with{" "}
              <span className="text-charcoal/90">W</span>,{" "}
              <span className="text-charcoal/90">A</span>,{" "}
              <span className="text-charcoal/90">D</span>, or the arrow keys
              (forward and turn only).
            </p>
          </HorseKeysProvider>
        </div>
      </div>
    </section>
  );
}

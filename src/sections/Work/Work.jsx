import { lazy, Suspense, useState, useRef } from "react";
import WorkCard from "./WorkCard";
import { workArray } from "./work.constants";
import WorkDetails from "./WordDetails";
import ObjectStage from "../../components/scene/ObjectStage";

const WorkSceneLazy = lazy(() => import("./Macbook.jsx"));

const Work = () => {
  const [screen, setScreen] = useState("");
  const [selectedWork, setSelectedWork] = useState(null);
  const clickGuardRef = useRef({
    locked: false,
    hasLockedOnce: false,
  });

  const onCardClick = (work) => (event) => {
    event.stopPropagation();

    const guard = clickGuardRef.current;

    if (guard.locked) return;

    if (!guard.hasLockedOnce) {
      guard.hasLockedOnce = true;
      guard.locked = true;

      setTimeout(() => {
        clickGuardRef.current.locked = false;
      }, 5000);
    }

    setScreen(work.image);
    setSelectedWork(work);
  };

  return (
    <div
      id="work"
      className="relative mt-24 overflow-hidden border-t border-gold/15 bg-gradient-to-b from-porcelain via-canvas to-porcelain text-ink scroll-mt-28 app-padding md:mt-32"
    >
      <div className="relative h-[1000px] overflow-hidden md:h-[100vh]">
        <div className="pointer-events-none absolute left-0 right-0 top-8 z-0 px-6 md:px-10">
          <div>
            <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.35em] text-brass">
              Atelier showcase
            </p>
            <h2 className="mt-0 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
              Selected works
            </h2>
          </div>
          <p className="mt-4 max-w-lg font-sans text-sm font-light text-muted">
            The machine below is staged like an object on set — choose a line
            to dress the screen.
          </p>
        </div>

        <div className="absolute inset-x-0 top-[6%] z-[2] flex justify-center md:top-[8%]">
          <ObjectStage
            variant="pedestal"
            label="La machine"
            className="relative h-[min(58vh,520px)] w-[min(94vw,56rem)]"
          >
            <Suspense fallback={null}>
              <WorkSceneLazy image={screen} />
            </Suspense>
          </ObjectStage>
        </div>
        <div className="absolute inset-0 bottom-80 z-[5] app-padding pt-40 md:pt-48">
          <WorkDetails selectedWork={selectedWork} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col flex-wrap gap-3 px-4 pb-10 md:bottom-24 md:flex-row md:gap-4 md:px-8">
          {workArray.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              selected={selectedWork === work}
              onClick={onCardClick(work)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

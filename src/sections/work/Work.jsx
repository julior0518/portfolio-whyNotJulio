import { lazy, Suspense } from "react";
import { cn } from "../../lib/cn";
import { WORK_ITEMS } from "./data/work.constants";
import WorkDetails from "./details/WorkDetails";
import WorkInfo from "./info/WorkInfo";
import WorkCardList from "./list/WorkCardList";
import { useWorkSelection } from "./useWorkSelection";

const WorkSceneLazy = lazy(() => import("./scene/WorkScene"));

export default function Work() {
  const { selectedWork, screenImage, selectWork } = useWorkSelection(WORK_ITEMS);

  return (
    <section
      id="work"
      className={cn(
        "relative overflow-visible border-t-2 border-gold/20 bg-porcelain/35 text-ink section-spacing scroll-mt-28 md:-mb-60",
        selectedWork ? "-mb-70" : "-mb-110",
      )}
    >
      <div className="mx-auto w-full max-w-screen-2xl app-padding">
        <WorkInfo />
        <WorkCardList
          items={WORK_ITEMS}
          selectedWork={selectedWork}
          onSelectWork={selectWork}
        />
      </div>

      <div className="relative mt-8 h-[780px] w-[calc(100%)] min-w-0  overflow-x-clip md:mt-10 md:h-[920px]">
        <div className="absolute inset-x-0 top-0 z-[20] md:top-[2%] pointer-events-none">
          <Suspense fallback={null}>
            <WorkSceneLazy image={screenImage} />
          </Suspense>
        </div>

        <div className="pointer-events-auto absolute inset-x-0 top-[48%] z-[30] md:top-[54%]">
          <div className="relative mx-auto w-full max-w-screen-2xl app-padding">
            <WorkDetails selectedWork={selectedWork} />
          </div>
        </div>
      </div>
    </section>
  );
}

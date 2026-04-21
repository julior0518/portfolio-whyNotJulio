import { lazy, Suspense } from "react";
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
      className="relative overflow-visible border-t border-gold/10 bg-canvas text-ink app-padding section-spacing scroll-mt-28"
    >
      <WorkInfo />

      <div className="mx-auto max-w-6xl    lg:px-8">
        <WorkCardList
          items={WORK_ITEMS}
          selectedWork={selectedWork}
          onSelectWork={selectWork}
        />
      </div>

      <div className="relative mt-8 h-[780px] w-[calc(100%+2.5rem)] min-w-0 -mx-5 overflow-x-clip md:mt-10 md:h-[920px] sm:w-[calc(100%+5rem)] sm:-mx-10 lg:w-[calc(100%+7rem)] lg:-mx-14">
        <div className="absolute inset-x-0 top-0 z-[20] md:top-[2%]">
          <Suspense fallback={null}>
            <WorkSceneLazy image={screenImage} />
          </Suspense>
        </div>

        <div className="absolute inset-x-0 top-[48%] z-[5] md:top-[54%]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <WorkDetails selectedWork={selectedWork} />
          </div>
        </div>
      </div>
    </section>
  );
}

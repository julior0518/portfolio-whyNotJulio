import AboutInfo from "./info/AboutInfo";
import DragAndDrop from "./dragAndDrop/DragAndDrop";
import Intro from "./intro/Intro";
import Location from "./location/Location";
import Puzzle from "./puzzle/Puzzle";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-gold/10 bg-canvas text-ink app-padding section-spacing scroll-mt-28"
    >
      <AboutInfo />
      <div className="grid grid-cols-1 gap-6 py-4 md:auto-rows-[18rem] md:grid-cols-6 md:gap-8">
        <Intro />
        <Puzzle />
        <DragAndDrop />
        <Location />
      </div>
    </section>
  );
}

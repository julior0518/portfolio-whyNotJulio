import AboutInfo from "./info/AboutInfo";
import DragAndDrop from "./dragAndDrop/DragAndDrop";
import Intro from "./intro/Intro";
import Location from "./location/Location";
import Puzzle from "./puzzle/Puzzle";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t-2 border-gold/20 bg-mist/40 text-ink section-spacing scroll-pt-28"
    >
      <div className="mx-auto w-full max-w-screen-2xl app-padding">
        <AboutInfo />
        <div className="grid grid-cols-1 gap-6 py-4 md:auto-rows-[18rem] md:grid-cols-6 md:gap-8">
          <Intro />
          <Puzzle />
          <DragAndDrop />
          <Location />
        </div>
      </div>
    </section>
  );
}

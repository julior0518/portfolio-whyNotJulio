import Intro from "./Intro";
import DragAndDrop from "./DragAndDrop";
import Location from "./Location";

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-gold/10 bg-canvas text-ink app-padding section-spacing scroll-mt-28"
    >
      <div className="mx-auto mb-16 max-w-3xl">
        <div>
          <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.35em] text-brass">
            The atelier
          </p>
          <h2 className="mt-0 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
            Composed for clarity — built for motion.
          </h2>
        </div>
        <p className="mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-muted md:text-lg">
          A quiet editorial beat after the alpine opening: who you are, how you
          work, and where the world finds you.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 py-4 md:auto-rows-[18rem] md:grid-cols-6 md:gap-8">
        <Intro />
        <DragAndDrop />
        <Location />
      </div>
    </section>
  );
};

export default About;

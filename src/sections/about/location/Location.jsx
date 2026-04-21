import { Globe } from "../../../components/Globe";

const Location = () => {
  return (
    <div className="grid-black-color grid-1 relative overflow-hidden">
      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-10 text-center md:px-10 md:py-12 pointer-events-none">
        <h4 className="mx-auto max-w-md font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl md:text-4xl">
          I was born in <span className="text-burgundy">Spain</span> and
        </h4>
        <h4 className="mx-auto mt-3 max-w-md font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl md:text-4xl">
          live in <span className="text-alpine">Miami</span>
        </h4>
      </div>

      <figure
        className="pointer-events-auto absolute inset-0 z-0 bg-porcelain/50"
        aria-label="Globe with Spain and Miami markers"
      >
        <div className="absolute -bottom-[6%] -right-[28%] aspect-square w-[min(28rem,95vw)] sm:-right-[24%] sm:w-[min(32rem,85vw)] md:-right-[20%] md:w-[min(36rem,55vw)]">
          <Globe className="!mx-0 h-full w-full !max-w-none" />
        </div>
      </figure>
    </div>
  );
};

export default Location;

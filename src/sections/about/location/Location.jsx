import { Globe } from "../../../components/Globe";

const Location = () => {
  return (
    <div className="grid-black-color grid-1 relative overflow-hidden">
      <div className="pointer-events-none relative z-10 flex min-h-0 flex-1 flex-col items-start justify-start px-6 py-10 text-left md:px-10 md:py-12">
        <h4 className="max-w-md font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl md:text-4xl">
          I am from <span className="font-bold">Madrid</span>,
        </h4>
        <h4 className="mt-3 max-w-md font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl md:text-4xl">
          work in <span className="font-bold">New York</span>
        </h4>
        <h4 className="mt-3 max-w-md font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl md:text-4xl">
          currently in <span className="font-bold">Miami</span>
        </h4>
        <h4 className="mt-3 max-w-md font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl md:text-4xl">
          soon to <span className="font-bold">Los Angeles</span>
        </h4>
      </div>

      <figure
        className="pointer-events-auto absolute inset-0 z-0 bg-porcelain/50"
        aria-label="Globe with Spain and Miami markers"
      >
        <div className="absolute -bottom-[6%] -right-[28%] aspect-square w-[min(28rem,95svw)] sm:-right-[24%] sm:w-[min(32rem,85svw)] md:-right-[20%] md:w-[min(36rem,55svw)]">
          <Globe className="!mx-0 h-full w-full !max-w-none" />
        </div>
      </figure>
    </div>
  );
};

export default Location;

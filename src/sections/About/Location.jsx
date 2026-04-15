import { Globe } from "../../components/globe";

const Location = () => {
  return (
    <div className="grid-black-color grid-3">
      <div className="z-10 p-5 md:p-6">
        <h4 className="w-[55%] font-serif text-2xl font-medium leading-tight text-ink sm:w-[50%] sm:text-4xl">
          I was born in <span className="text-burgundy">Spain</span> and
        </h4>
        <h4 className="mb-6 mt-2 w-[55%] font-serif text-2xl font-medium leading-tight text-ink sm:w-[42%] md:w-[38%] sm:text-4xl">
          live in <span className="text-alpine">Miami</span>
        </h4>
      </div>
      <figure className="absolute left-[28%] top-[8%] md:left-[30%] md:top-[10%]">
        <Globe />
      </figure>
    </div>
  );
};

export default Location;

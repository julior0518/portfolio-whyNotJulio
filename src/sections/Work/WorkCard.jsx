const WorkCard = ({ work, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative max-h-[100px] min-h-[72px] w-full cursor-pointer overflow-hidden rounded-2xl text-left shadow-lux-sm transition-all duration-500 md:max-h-none md:min-h-[200px] md:flex-1 ${
        selected
          ? "flex-[1.15] ring-2 ring-gold/50 ring-offset-2 ring-offset-canvas md:max-h-[220px]"
          : "hover:-translate-y-0.5 hover:shadow-lux-md"
      } `}
    >
      <img
        className="h-full w-full object-cover"
        src={work.background}
        alt=""
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink/55 via-ink/10 to-transparent p-4 backdrop-blur-[2px]">
        <h2
          className={`font-serif font-medium tracking-tight text-porcelain transition-all duration-500 ${
            selected ? "text-3xl md:text-4xl" : "text-lg md:text-2xl"
          }`}
        >
          {work.title}
        </h2>
      </div>
    </button>
  );
};

export default WorkCard;

import { RiArrowRightLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

const MoodCard = ({ mood }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label={`Explore ${mood.name} mood`}
      onClick={() => navigate(`/mood/${mood.value}`)}
      className={`group relative isolate flex aspect-square w-full max-w-56 min-w-0
        flex-col items-center justify-between overflow-hidden
        rounded-[2rem_1rem_2rem_1rem] border border-violet-100/20
        bg-[#100b20]/75 p-4 text-center text-white shadow-lg backdrop-blur-sm
        transition duration-300 hover:-translate-y-1 hover:border-fuchsia-100/35
        hover:shadow-2xl active:scale-[0.98] cursor-pointer`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 rounded-[inherit]
          bg-linear-to-br ${mood.color}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] bg-linear-to-b from-[#100b20]/10 via-[#100b20]/25 to-[#090712]/75"
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-8 -top-8 z-0
          h-36 w-36 rounded-full bg-linear-to-br ${mood.color}
          opacity-80 transition-transform duration-500 group-hover:scale-125`}
      />

      <div className="relative z-10 flex w-full items-center justify-between">
        <span className="font-display text-[9px] font-semibold uppercase tracking-[0.24em] text-white/55">
          Moodify
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-100/20 bg-white/5 text-white/80 transition group-hover:bg-fuchsia-100 group-hover:text-violet-950">
          <RiArrowRightLine size={17} />
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-fuchsia-100/20 bg-[#211633]/70 text-xl shadow-[0_0_24px_rgba(168,85,247,0.15)] transition duration-300 group-hover:rotate-3 group-hover:scale-105 lg:h-16 lg:w-16 lg:rounded-2xl lg:text-3xl">
          {mood.emoji}
        </span>
        <h2 className="font-display text-base font-semibold tracking-wide sm:text-lg">
          {mood.name}
        </h2>
        <p className="mt-1 max-w-full px-1 font-display text-[10px] leading-snug text-white/65 sm:text-xs">
          {mood.description}
        </p>
      </div>

      <div className="relative z-10 h-px w-full bg-linear-to-r from-transparent via-white/40 to-transparent" />
    </button>
  );
};

export default MoodCard;

import { RiArrowRightLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

const MoodCard = ({ mood }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/mood/${mood.value}`)}
      className={`group relative flex aspect-square w-full max-w-56 min-w-0
        flex-col items-center justify-center gap-1 rounded-[60%_40%_30%_70%/60%_30%_70%_40%]
        border border-white/20 bg-linear-to-br ${mood.color} p-3
        shadow-xl backdrop-blur-xl transition-all duration-700
        hover:-translate-y-2 hover:scale-105
        hover:rounded-[30%_70%_70%_30%/30%_30%_70%_70%]
        cursor-pointer`}
    >
   
      <div
        className={`pointer-events-none absolute -inset-2 -z-10
          rounded-[inherit] bg-linear-to-br ${mood.color}
          blur-2xl opacity-40 transition-opacity duration-500
          group-hover:opacity-100`}
      />

 
      <span className="text-3xl sm:text-3xl lg:text-4xl">
        {mood.emoji}
      </span>

   
      <h2 className="font-display text-sm font-semibold text-center text-white sm:text-lg">
        {mood.name}
      </h2>

    
      <p className="max-w-full px-1 text-center font-display
        text-[10px] leading-tight text-gray-300
        sm:px-3 sm:text-xs lg:text-sm">
        {mood.description}
      </p>

     
      <span
        className="mt-1 flex h-6 w-6 shrink-0 items-center
          justify-center rounded-full border border-white/30
          text-white transition group-hover:bg-white
          group-hover:text-black sm:mt-2 sm:h-8 sm:w-8"
      >
        <RiArrowRightLine size={16} />
      </span>
    </div>
  );
};

export default MoodCard;
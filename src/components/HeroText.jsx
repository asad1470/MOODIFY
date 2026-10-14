export const HeroText = () => {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-4 px-4 text-center sm:mt-12 sm:gap-5 lg:mt-15">
      <h1 className="font-display text-xs tracking-[0.2em] text-[#c8c1e9] sm:text-sm sm:tracking-widest md:text-base">
        YOUR MOOD · YOUR MUSIC
      </h1>

      <h1 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        How Are You{" "}
        <span className="bg-linear-to-r from-white to-[#852988] bg-clip-text font-display text-transparent">
          Feeling
        </span>{" "}
        Today
      </h1>

      <h2 className="font-display text-base text-gray-300 sm:text-lg md:text-xl">
        Pick a mood and let the music find you
      </h2>
    </div>
  )
}

export default HeroText

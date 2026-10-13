import React from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import moods from "../moods"
import Credit from "../components/Credit"

const features = [
  {
    emoji: "🎧",
    title: "Pick a mood",
    text: "Choose how you feel and Moodify opens a page made for that vibe.",
  },
  {
    emoji: "🎶",
    title: "Play instantly",
    text: "Every song plays right on its card, with volume and progress controls.",
  },
  {
    emoji: "🔎",
    title: "Search by mood",
    text: "Type a mood in the search bar and jump straight to its songs.",
  },
]

const glass =
  "rounded-3xl border border-white/25 bg-white/10 backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.25)]"

const About = () => {
  return (
    <div
      className="relative min-h-screen overflow-x-clip bg-cover bg-center bg-no-repeat bg-scroll lg:bg-fixed"
      style={{ backgroundImage: "url('/bg5.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 pb-20">
        <Navbar />

        <section className="mx-auto mt-2 max-w-3xl px-4 pb-8 pt-8 text-center text-white sm:mt-5 sm:px-6 sm:pb-10 sm:pt-12">
          <h1 className="bg-linear-to-r from-white via-[#d9a8dc] to-[#852988] bg-clip-text font-display text-4xl font-bold leading-tight text-transparent sm:text-5xl lg:text-6xl">
            About Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-display text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg">
            Music is better when it matches how you feel. Moodify turns your
            mood into a soundtrack, with no endless scrolling and no
            hunting for the right playlist.
          </p>
        </section>

        <section className="mx-auto mt-2 grid max-w-5xl grid-cols-1 gap-4 px-4 sm:mt-5 sm:grid-cols-2 sm:gap-6 sm:px-6 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className={`${glass} min-w-0 p-4 text-center transition-all duration-500 sm:p-6 lg:hover:-translate-y-2 lg:hover:bg-white/15`}
            >
              <div className="text-3xl sm:text-4xl">{f.emoji}</div>
              <h2 className="mt-3 font-display text-lg font-semibold text-white sm:text-xl">
                {f.title}
              </h2>
              <p className="mt-2 font-display text-sm leading-relaxed text-white/70 sm:text-base">{f.text}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto mt-10 w-full max-w-4xl px-4 text-center sm:mt-16 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Find your mood
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {moods.map((m) => (
              <Link
                key={m.value}
                to={`/mood/${m.value}`}
                className={`flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-full border border-white/25 bg-linear-to-br ${m.color} px-2 py-3 font-display text-sm text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-4 sm:text-base`}
              >
                <span>{m.emoji}</span>
                <span className="truncate">{m.name}</span>
              </Link>
            ))}
          </div>
        </section>

    
      </div>
      <Credit/>
    </div>
  )
}

export default About

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
      className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/bg5.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 pb-10 pt-12 text-center text-white mt-5">
          <h1 className={`bg-linear-to-r from-white via-[#d9a8dc] to-[#852988] bg-clip-text font-display text-5xl font-bold text-transparent sm:text-6xl`}>
            About Us
          </h1>
          <p className="mt-6 text-lg text-white/80 font-display">
            Music is better when it matches how you feel. Moodify turns your
            mood into a soundtrack, with no endless scrolling and no
            hunting for the right playlist.
          </p>
        </section>

        <section className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-3 mt-5">
          {features.map((f) => (
            <div
              key={f.title}
              className={`${glass} p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:bg-white/15`}
            >
              <div className="text-4xl">{f.emoji}</div>
              <h2 className="mt-3 font-display text-xl font-semibold text-white">
                {f.title}
              </h2>
              <p className="mt-2 text-sm text-white/70 font-display">{f.text}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto mt-16 max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl font-semibold text-white">
            Find your mood
          </h2>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3 w-full ">
            {moods.map((m) => (
              <Link
                key={m.value}
                to={`/mood/${m.value}`}
                className={`flex items-center gap-2 rounded-full border border-white/25 bg-linear-to-br ${m.color} px-8 py-3 font-display text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 `}
              >
                <span>{m.emoji}</span>
                <span>{m.name}</span>
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
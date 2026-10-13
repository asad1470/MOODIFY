import React, { useState } from "react"
import Navbar from "../components/Navbar"
import MusicCard from "../components/MusicCard"
import songs from "../songs"
const lists = Object.values(songs)
const longest = Math.max(...lists.map((l) => l.length))

const allSongs = Array.from({ length: longest })
  .flatMap((_, i) => lists.map((l) => l[i]).filter(Boolean))
  .slice(0, 12)  

const Favorites = () => {
  const [playing, setPlaying] = useState(null)

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-scroll lg:bg-fixed"
      style={{ backgroundImage: "url('/bg5.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10">
        <Navbar />

        <div className="px-5 py-8 text-white sm:p-10">
          <h1 className="text-3xl font-bold sm:text-5xl">Favorites</h1>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            Every song, every mood, all in one place.
          </p>
        </div>

        <div className="mt-3 grid justify-center gap-8 pb-20 sm:grid-cols-[repeat(2,280px)] lg:grid-cols-[repeat(3,280px)]">
          {allSongs.map((song) => {
            const key = `${song.title}-${song.artist}`
            return (
              <MusicCard
                key={key}
                song={song}
                isPlaying={playing === key}
                onToggle={() => setPlaying(playing === key ? null : key)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Favorites

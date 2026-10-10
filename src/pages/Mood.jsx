import { useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import MusicCard from "../components/MusicCard"
import moods from "../moods"
import songs from "../songs"
import Credit from "../components/Credit"


const Mood = () => {
  const { mood: moodParam } = useParams()
  const mood = moods.find((m) => m.value === moodParam)
  const moodSongs = songs[moodParam] ?? []
  const [playing, setPlaying] = useState(null)

  if (!mood) {
    return (
      <main className="min-h-screen bg-black text-white text-5xl">
        <Navbar />
        <p className="p-30">Mood not found.</p>
      </main>
    )
  }


  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('${mood.image}')` }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10">
        <Navbar mood={mood} />

        <div className="p-10 text-white">
          <h1 className="mt-4 text-5xl font-bold capitalize">{mood.name}</h1>
          <p className="mt-4 text-white/70 text-md">
            {mood.tagline}.
          </p>
        </div>

        <div className="grid  sm:grid-cols-[repeat(2,280px)] lg:grid-cols-[repeat(3,280px)] justify-center gap-8 mt-3 ">
          {moodSongs.map((song) => (
            <MusicCard
              key={song.title}
              song={song}
              isPlaying={playing === song.title}
              onToggle={() =>
                setPlaying(playing === song.title ? null : song.title)
              }
            />
          ))}
        </div>
      
      </div>
       <Credit/>
    </main>
  )
}

export default Mood
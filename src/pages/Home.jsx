import Navbar from '../components/Navbar'
import HeroText from '../components/HeroText'
import MoodCard from '../components/MoodCard'
import moods from '../moods'
import Credit from '../components/Credit'

const Home = () => {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg5.jpg')" }}
    >
      <div className="min-h-screen bg-black/50">
        <Navbar />
        <HeroText />

        <div className="mt-12 grid grid-cols-2 min-[496px]:grid-cols-[repeat(2,minmax(0,14rem))] sm:grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),14rem))] justify-items-center justify-center gap-4 px-4 sm:mt-16">
          {moods.map((mood) => (
            <MoodCard key={mood.value} mood={mood} />
          ))}
        </div>

        <Credit />
      </div>
    </div>
  )
}

export default Home
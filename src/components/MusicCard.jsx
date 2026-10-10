import { useEffect, useRef, useState } from "react"
import {
  RiPlayFill,
  RiPauseFill,
  RiVolumeUpFill,
  RiVolumeDownFill,
  RiVolumeMuteFill,
} from "@remixicon/react"

const MusicCard = ({ song, isPlaying, onToggle }) => {
  const audioRef = useRef(null)
  const volRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) audio.play().catch(() => {})
    else audio.pause()
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    audio.muted = muted
  }, [volume, muted])

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100)
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
  }

 
  const setVolumeFromPointer = (e) => {
    const rect = volRef.current.getBoundingClientRect()
    const v = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    setVolume(v)
    setMuted(v === 0)
  }

  const isSilent = muted || volume === 0
  const VolumeIcon = isSilent
    ? RiVolumeMuteFill
    : volume < 0.5
      ? RiVolumeDownFill
      : RiVolumeUpFill

  return (
    <div
      className="group relative flex h-70 w-70 flex-col items-center justify-between overflow-hidden
        rounded-3xl border border-white/25 bg-white/10 p-5
        backdrop-blur-2xl backdrop-saturate-150
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.25)]
        transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:bg-white/15"
    >
      <audio ref={audioRef} src={song.src} onTimeUpdate={handleTimeUpdate} onEnded={onToggle} />

      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-br from-white/30 via-transparent to-transparent opacity-60" />

     
      <div className="group/vol absolute right-4 top-4 z-10 flex items-center gap-2">
        <div
          ref={volRef}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId)
            setVolumeFromPointer(e)
          }}
          onPointerMove={(e) => e.buttons === 1 && setVolumeFromPointer(e)}
          className="flex h-5 w-0 cursor-pointer touch-none items-center overflow-hidden opacity-0
            transition-all duration-300
            group-hover/vol:w-20 group-hover/vol:opacity-100"
        >
          <div className="h-1.5 w-full rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${isSilent ? 0 : volume * 100}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMuted(!muted)}
          className="text-white/70 transition hover:text-white cursor-pointer"
        >
          <VolumeIcon size={20} />
        </button>
      </div>

      <div className="relative pt-4 text-center">
        <h1 className="font-display text-xl font-semibold text-white">{song.title}</h1>
        <h3 className="font-display text-sm text-white/70">{song.artist}</h3>
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="relative flex h-16 w-16 items-center justify-center rounded-full
          border border-white/30 bg-white/20 text-white
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]
          transition-all duration-350 hover:bg-white hover:text-black cursor-pointer "
      >
        {isPlaying ? <RiPauseFill size={32} /> : <RiPlayFill size={32} />}
      </button>

      <div
        onClick={handleSeek}
        className="relative h-2 w-full cursor-pointer overflow-hidden rounded-full bg-white/20"
      >
        <div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

export default MusicCard
import { useEffect, useRef, useState } from "react"
import {
  RiPlayFill,
  RiPauseFill,
  RiVolumeUpFill,
  RiVolumeDownFill,
  RiVolumeMuteFill,
} from "@remixicon/react"


const SONGS_BASE = import.meta.env.VITE_SONGS_URL ?? ""
const canSetVolume = (() => {
  const audio = document.createElement("audio")
  audio.volume = 0.5
  return audio.volume === 0.5
})()

const MusicCard = ({ song, isPlaying, onToggle }) => {
  const title = song.title.trim()
  const artist = song.artist.trim()
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
    if (!audio.duration) return
    const nextProgress = Number(e.currentTarget.value)
    setProgress(nextProgress)
    audio.currentTime = (nextProgress / 100) * audio.duration
  }

  const setVolumeFromPointer = (e) => {
    const rect = volRef.current.getBoundingClientRect()
    if (!rect.width) return
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
      className="group relative z-0 flex h-70 w-70 flex-col items-center justify-between overflow-hidden
        rounded-3xl border border-white/15 bg-white/10 p-5
        backdrop-blur-sm sm:backdrop-blur-2xl sm:backdrop-saturate-150
        shadow-lg sm:shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        transition-colors duration-300 sm:transition-all sm:duration-500
        sm:hover:-translate-y-2 sm:hover:scale-105 sm:hover:bg-white/5"
    >
      <audio
        ref={audioRef}
        src={SONGS_BASE + song.src}
        preload="none"
        onTimeUpdate={handleTimeUpdate}
        onEnded={onToggle}
      />

      <div className="relative px-2 pt-2 text-center">
        <h2 className="line-clamp-2 font-display text-lg font-semibold leading-tight text-white sm:text-xl">
          {title}
        </h2>
        <p className="truncate font-display text-sm text-white/70 sm:text-sm">
          {artist}
        </p>
      </div>

    
      <button
        type="button"
        onClick={onToggle}
        className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full
          border border-white/30 bg-white/20 text-white
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]
          transition-all duration-350 hover:bg-white hover:text-black"
      >
        {isPlaying ? <RiPauseFill size={32} /> : <RiPlayFill size={32} />}
      </button>

      <div className="relative -mb-[30px] flex w-full justify-end">
        <div className="group/vol flex items-center gap-2">
          {canSetVolume && (
            <div
              ref={volRef}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId)
                setVolumeFromPointer(e)
              }}
              onPointerMove={(e) => e.buttons === 1 && setVolumeFromPointer(e)}
              className="flex h-6 w-0 cursor-pointer touch-none items-center overflow-hidden opacity-0
                transition-all duration-300
                group-hover/vol:w-24 group-hover/vol:opacity-100
                [@media(pointer:coarse)]:w-24 [@media(pointer:coarse)]:opacity-100"
            >
              <div className="h-1.5 w-full rounded-full bg-white/25">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${isSilent ? 0 : volume * 100}%` }}
                />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMuted(!muted)}
            className="cursor-pointer text-white/70 transition hover:text-white"
          >
            <VolumeIcon size={20} />
          </button>
        </div>
      </div>

      {/* progress bar */}
      <div className="relative flex h-6 w-full items-center">
        <div className="absolute inset-x-0 h-1.5 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleSeek}
          aria-label={`Seek ${title}`}
          className="seek-slider relative z-10 h-full w-full cursor-pointer touch-none appearance-none bg-transparent"
        />
      </div>
    </div>
  )
}

export default MusicCard

import { useCallback, useEffect, useRef, useState } from 'react'

import { TRACKS } from './tracks'

export function useMediaPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [index, setIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const track = TRACKS[index]

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'none'
    audioRef.current = audio
    const onTime = () => setCurrentTime(audio.currentTime)
    const onMeta = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  const load = useCallback((i: number) => {
    const audio = audioRef.current
    if (!audio) return
    const next = (i + TRACKS.length) % TRACKS.length
    setIndex(next)
    setCurrentTime(0)
    setDuration(0)
    audio.src = TRACKS[next].src
    setStarted(true)
    audio.play().catch(() => setIsPlaying(false))
  }, [])

  // Autoplay next track on end.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnded = () => load(index + 1)
    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [index, load])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (!started) return load(index)
    if (audio.paused) audio.play().catch(() => undefined)
    else audio.pause()
  }, [started, index, load])

  const seek = useCallback((time: number) => {
    if (audioRef.current && started) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [started])

  return {
    track,
    started,
    isPlaying,
    currentTime,
    duration,
    toggle,
    seek,
    next: () => load(index + 1),
    prev: () => (currentTime > 3 && audioRef.current ? seek(0) : load(index - 1)),
  }
}

export type MediaPlayerState = ReturnType<typeof useMediaPlayer>

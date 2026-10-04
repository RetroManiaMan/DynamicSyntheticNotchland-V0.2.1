export type Track = {
  id: string
  title: string
  artist: string
  src: string
  art: string
}

const base = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-'

export const TRACKS: Track[] = [
  { id: '1', title: 'Neon Drive', artist: 'SoundHelix', src: `${base}1.mp3`, art: 'linear-gradient(135deg,#d4f11e,#2f6b00)' },
  { id: '2', title: 'Midnight Loop', artist: 'T. Schürger', src: `${base}2.mp3`, art: 'linear-gradient(135deg,#6ee7ff,#3b2bd9)' },
  { id: '3', title: 'Afterglow', artist: 'SoundHelix', src: `${base}3.mp3`, art: 'linear-gradient(135deg,#ff9a5a,#b0143c)' },
]

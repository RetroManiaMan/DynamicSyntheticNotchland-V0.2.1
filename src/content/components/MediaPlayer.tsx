import type { MediaPlayerState } from '../media/useMediaPlayer'

const fmt = (s: number) => {
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

export function MediaPlayer({ player }: { player: MediaPlayerState }) {
  const { track, isPlaying, currentTime, duration, toggle, next, prev, seek } = player
  const pct = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="dsn-media">
      <div className="dsn-media-head">
        <div className="dsn-media-art" style={{ background: track.art }}>
          <span className="dsn-media-badge">♪</span>
        </div>
        <div className="dsn-media-meta">
          <div className="dsn-media-label">{isPlaying ? 'NOW PLAYING' : 'PAUSED'}</div>
          <div className="dsn-media-title">{track.title}</div>
          <div className="dsn-media-artist">{track.artist}</div>
        </div>
        <span className={`dsn-bars ${isPlaying ? 'is-playing' : ''}`} aria-hidden="true">
          <i /><i /><i /><i />
        </span>
      </div>

      <input
        className="dsn-media-seek"
        type="range"
        aria-label="Seek"
        min={0}
        max={duration || 1}
        step={0.1}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        style={{ ['--pct' as string]: `${pct}%` }}
      />
      <div className="dsn-media-times">
        <span>{fmt(currentTime)}</span>
        <span>{duration ? `−${fmt(duration - currentTime)}` : '--:--'}</span>
      </div>

      <div className="dsn-media-controls">
        <button type="button" className="dsn-media-btn" aria-label="Previous" onClick={prev}>⏮</button>
        <button type="button" className="dsn-media-btn is-main" aria-label={isPlaying ? 'Pause' : 'Play'} onClick={toggle}>
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button type="button" className="dsn-media-btn" aria-label="Next" onClick={next}>⏭</button>
      </div>
    </div>
  )
}

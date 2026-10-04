import type { Track } from '../media/tracks'

type NotchCollapsedProps = {
  time: string
  isExpanded: boolean
  onToggle: () => void
  track?: Track
  isPlaying?: boolean
}

export function NotchCollapsed({ time, isExpanded, onToggle, track, isPlaying }: NotchCollapsedProps) {
  return (
    <button
      type="button"
      className={`dsn-notch ${isExpanded ? 'is-expanded' : ''} ${track ? 'has-media' : ''}`}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? 'Collapse DSN' : 'Expand DSN'}
      onClick={onToggle}
    >
      {track ? (
        <>
          <span className="dsn-notch-art" style={{ background: track.art }} aria-hidden="true" />
          <span className="dsn-notch-source">{track.artist}</span>
          <span className={`dsn-bars ${isPlaying ? 'is-playing' : ''}`} aria-hidden="true">
            <i /><i /><i />
          </span>
        </>
      ) : (
        <>
          <span className="dsn-notch-indicator" aria-hidden="true" />
          <span className="dsn-collapsed-time">{time}</span>
        </>
      )}
    </button>
  )
}

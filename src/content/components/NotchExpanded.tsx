import { type KeyboardEvent, useState } from 'react'

import type { MediaPlayerState } from '../media/useMediaPlayer'
import { MediaPlayer } from './MediaPlayer'
import { Clock } from './Clock'
import { QuickActions } from './QuickActions'
import { SearchBar } from './SearchBar'

type NotchExpandedProps = {
  searchValue: string
  onSearchChange: (value: string) => void
  onSearchSubmit: (value: string) => void
  onCollapse: () => void
  player: MediaPlayerState
}

export function NotchExpanded({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onCollapse,
  player,
}: NotchExpandedProps) {
  const { formattedTime, formattedDate } = Clock()
  const [view, setView] = useState(player.started ? 'media' : 'home')

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onCollapse()
    }
  }

  return (
    <div
      className="dsn-expanded-panel"
      role="dialog"
      aria-modal="false"
      aria-label="Dynamic Synthetic Notchland panel"
      onKeyDown={handleKeyDown}
    >
      {view === 'media' ? (
        <MediaPlayer player={player} />
      ) : (
        <>
      <div className="dsn-expanded-topline">
        <div className="dsn-expanded-clock">{formattedTime}</div>
        <div className="dsn-expanded-date">{formattedDate}</div>
      </div>

      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
        onCollapse={onCollapse}
      />

        </>
      )}

      <QuickActions active={view === 'media' ? 'media' : undefined} onSelect={(id) => setView(id === 'media' ? 'media' : 'home')} />
    </div>
  )
}

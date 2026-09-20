import { type KeyboardEvent } from 'react'

import { Clock } from './Clock'
import { QuickActions } from './QuickActions'
import { SearchBar } from './SearchBar'

type NotchExpandedProps = {
  searchValue: string
  onSearchChange: (value: string) => void
  onSearchSubmit: (value: string) => void
  onCollapse: () => void
}

export function NotchExpanded({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onCollapse,
}: NotchExpandedProps) {
  const { formattedTime, formattedDate } = Clock()

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

      <QuickActions />
    </div>
  )
}

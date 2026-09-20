type NotchCollapsedProps = {
  time: string
  isExpanded: boolean
  onToggle: () => void
}

export function NotchCollapsed({ time, isExpanded, onToggle }: NotchCollapsedProps) {
  return (
    <button
      type="button"
      className={`dsn-notch ${isExpanded ? 'is-expanded' : ''}`}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? 'Collapse DSN' : 'Expand DSN'}
      onClick={onToggle}
    >
      <span className="dsn-notch-indicator" aria-hidden="true" />
      <span className="dsn-collapsed-time">{time}</span>
    </button>
  )
}

const quickActions = [
  { label: 'Search', id: 'search' },
  { label: 'AI', id: 'ai' },
  { label: 'Apps', id: 'apps' },
  { label: 'Media', id: 'media' },
]

type QuickActionsProps = {
  active?: string
  onSelect?: (id: string) => void
}

export function QuickActions({ active, onSelect }: QuickActionsProps) {
  return (
    <div className="dsn-actions" aria-label="Quick actions">
      {quickActions.map((action) => (
        <button
          key={action.id}
          type="button"
          className={`dsn-action ${active === action.id ? 'is-active' : ''}`}
          aria-label={action.label}
          onClick={() => onSelect?.(action.id)}
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}

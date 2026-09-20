const quickActions = [
  { label: 'Search', id: 'search' },
  { label: 'AI', id: 'ai' },
  { label: 'Apps', id: 'apps' },
]

export function QuickActions() {
  return (
    <div className="dsn-actions" aria-label="Quick actions">
      {quickActions.map((action) => (
        <button
          key={action.id}
          type="button"
          className="dsn-action"
          aria-label={action.label}
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}

import { GridIcon, SearchIcon, TerminalIcon } from './Icons'

type QuickActionsProps = {
  activeView: string
  onSearch: () => void
  onCommands: () => void
  onApps: () => void
}

const actions = [
  { id: 'search', label: 'Search', Icon: SearchIcon },
  { id: 'commands', label: 'Commands', Icon: TerminalIcon },
  { id: 'apps', label: 'Apps', Icon: GridIcon },
]

export function QuickActions({ activeView, onSearch, onCommands, onApps }: QuickActionsProps) {
  const handlers: Record<string, () => void> = {
    search: onSearch,
    commands: onCommands,
    apps: onApps,
  }

  return (
    <div className="nt-actions" role="group" aria-label="Quick actions">
      {actions.map(({ id, label, Icon }) => {
        const isActive = activeView === id
        return (
          <button
            key={id}
            type="button"
            className={`nt-action ${isActive ? 'is-active' : ''}`}
            onClick={handlers[id]}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}

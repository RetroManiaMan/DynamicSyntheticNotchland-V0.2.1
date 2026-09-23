import { useState } from 'react'
import { motion } from 'framer-motion'

import { ChevronLeftIcon, GridIcon, HomeIcon, SearchIcon, StarIcon, TerminalIcon, UserIcon } from './Icons'

type SidebarProps = {
  activeView: string
  onNavigate: (view: string) => void
}

const navItems = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'search', label: 'Search', Icon: SearchIcon },
  { id: 'commands', label: 'Commands', Icon: TerminalIcon },
  { id: 'apps', label: 'Apps', Icon: GridIcon },
]

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <aside className={`nt-sidebar ${isExpanded ? 'is-expanded' : ''}`}>
      <button
        type="button"
        className="nt-sidebar-logo"
        onClick={() => setIsExpanded((v) => !v)}
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <StarIcon size={22} />
        <span className="nt-sidebar-logo-text">DSN</span>
      </button>

      <div className="nt-sidebar-divider" />

      <nav className="nt-sidebar-nav" aria-label="Notchland navigation">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeView === id
          return (
            <button
              key={id}
              type="button"
              className={`nt-sidebar-item ${isActive ? 'is-active' : ''}`}
              onClick={() => onNavigate(id)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.div
                  className="nt-sidebar-item-bg"
                  layoutId="sidebar-active"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon size={20} className="nt-sidebar-item-icon" />
              <span className="nt-sidebar-label">{label}</span>
            </button>
          )
        })}
      </nav>

      <div className="nt-sidebar-divider" />

      <button
        type="button"
        className="nt-sidebar-item nt-sidebar-profile"
        aria-label="Profile"
      >
        <span className="nt-sidebar-badge">12</span>
        <UserIcon size={20} />
        <span className="nt-sidebar-label">Profile</span>
      </button>

      <button
        type="button"
        className="nt-sidebar-toggle"
        onClick={() => setIsExpanded((v) => !v)}
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <ChevronLeftIcon size={18} className="nt-sidebar-toggle-icon" />
        <span className="nt-sidebar-label">Collapse</span>
      </button>
    </aside>
  )
}

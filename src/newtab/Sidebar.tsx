import { useState } from 'react'
import { motion } from 'framer-motion'

import { BookmarkIcon, ChevronLeftIcon, GridIcon, HomeIcon, SearchIcon, StarIcon, TerminalIcon, UserIcon } from './Icons'
import type { HistoryItem } from './useRecentHistory'

type SidebarProps = {
  activeView: string
  onNavigate: (view: string) => void
  recentHistory: HistoryItem[]
}

const navItems = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'search', label: 'Search', Icon: SearchIcon },
  { id: 'commands', label: 'Commands', Icon: TerminalIcon },
  { id: 'apps', label: 'Apps', Icon: GridIcon },
  { id: 'bookmarks', label: 'Bookmarks', Icon: BookmarkIcon },
]

export function Sidebar({ activeView, onNavigate, recentHistory }: SidebarProps) {
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

      {isExpanded && recentHistory.length > 0 && (
        <>
          <div className="nt-sidebar-divider" />
          <div className="nt-sidebar-recent">
            <span className="nt-sidebar-section-label">Recent</span>
            {recentHistory.map((item) => (
              <a key={item.id} href={item.url} className="nt-sidebar-recent-item" title={item.url}>
                <span className="nt-sidebar-recent-dot" />
                <span className="nt-sidebar-recent-title">{item.title}</span>
              </a>
            ))}
          </div>
        </>
      )}

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

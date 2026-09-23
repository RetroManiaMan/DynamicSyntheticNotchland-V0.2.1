import { motion } from 'framer-motion'

import { GridIcon, HomeIcon, SearchIcon, StarIcon, TerminalIcon, UserIcon } from './Icons'

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
  return (
    <motion.aside
      className="nt-sidebar"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nt-sidebar-logo">
        <StarIcon size={22} />
      </div>

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
      </button>
    </motion.aside>
  )
}

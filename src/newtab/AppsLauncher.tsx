import { motion } from 'framer-motion'

import { CloseIcon, GridIcon, InfoIcon, SearchIcon, TerminalIcon } from './Icons'

type AppsLauncherProps = {
  onClose: () => void
  onAppSelect: (appId: string) => void
}

const apps = [
  { id: 'search', label: 'Search', Icon: SearchIcon, available: true },
  { id: 'commands', label: 'Commands', Icon: TerminalIcon, available: true },
  { id: 'about', label: 'About', Icon: InfoIcon, available: true },
  { id: 'ai', label: 'AI', Icon: SparkleIcon, available: false },
  { id: 'weather', label: 'Weather', Icon: CloudIcon, available: false },
  { id: 'calendar', label: 'Calendar', Icon: CalendarIcon, available: false },
]

function SparkleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 L13.2 9.8 L20 11 L13.2 12.2 L12 19 L10.8 12.2 L4 11 L10.8 9.8 Z" />
    </svg>
  )
}

function CloudIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.5 2A4 4 0 0 0 6 19h11.5z" />
    </svg>
  )
}

function CalendarIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </svg>
  )
}

export function AppsLauncher({ onClose, onAppSelect }: AppsLauncherProps) {
  return (
    <motion.div
      className="nt-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <button type="button" className="nt-overlay-close" onClick={onClose} aria-label="Close">
        <CloseIcon size={20} />
      </button>
      <motion.div
        className="nt-panel"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="nt-panel-header">
          <GridIcon size={18} className="nt-panel-accent" />
          <span className="nt-panel-title">Apps</span>
        </div>
        <div className="nt-apps-grid">
          {apps.map(({ id, label, Icon, available }) => (
            <button
              key={id}
              type="button"
              className={`nt-app-card ${available ? '' : 'is-disabled'}`}
              onClick={() => available && onAppSelect(id)}
              disabled={!available}
            >
              <div className="nt-app-icon">
                <Icon size={22} />
              </div>
              <span className="nt-app-label">{label}</span>
              {!available && <span className="nt-app-soon">Soon</span>}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

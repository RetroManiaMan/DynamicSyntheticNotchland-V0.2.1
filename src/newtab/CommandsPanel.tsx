import { motion } from 'framer-motion'

import { ArrowRightIcon, CloseIcon, TerminalIcon } from './Icons'

type CommandsPanelProps = {
  onClose: () => void
  onSelect: (command: string) => void
}

const commands = [
  { syntax: '/search <query>', desc: 'Search the web', fill: '/search ' },
  { syntax: '/open <url>', desc: 'Open a URL', fill: '/open ' },
  { syntax: '/help', desc: 'Show available commands', fill: '/help' },
  { syntax: '/newtab/help', desc: 'New Tab help', fill: '/newtab/help' },
]

export function CommandsPanel({ onClose, onSelect }: CommandsPanelProps) {
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
          <TerminalIcon size={18} className="nt-panel-accent" />
          <span className="nt-panel-title">Commands</span>
        </div>
        <div className="nt-commands-list">
          {commands.map(({ syntax, desc, fill }) => (
            <button
              key={syntax}
              type="button"
              className="nt-command-row"
              onClick={() => onSelect(fill)}
            >
              <span className="nt-command-syntax">{syntax}</span>
              <span className="nt-command-desc">{desc}</span>
              <ArrowRightIcon size={16} className="nt-command-arrow" />
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

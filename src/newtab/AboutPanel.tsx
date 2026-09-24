import { motion } from 'framer-motion'

import { CloseIcon, InfoIcon } from './Icons'

type AboutPanelProps = {
  onClose: () => void
}

export function AboutPanel({ onClose }: AboutPanelProps) {
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
          <InfoIcon size={18} className="nt-panel-accent" />
          <span className="nt-panel-title">About</span>
        </div>
        <div className="nt-about-content">
          <div>
            <div className="nt-about-name">Dynamic Synthetic Notchland</div>
            <div className="nt-about-version">V0.2.1 — New Tab</div>
          </div>
          <div className="nt-about-philosophy">
            <strong>The notch is the doorway.</strong>
            <br />
            <strong>Notchland is the environment.</strong>
          </div>
          <p className="nt-about-desc">
            A custom browser New Tab experience. DSN transforms the new tab into a calm,
            futuristic environment — a lightweight browser-native interface that grows
            alongside you.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

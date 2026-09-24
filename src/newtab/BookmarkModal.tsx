import { type FormEvent, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import { CloseIcon, PlusIcon } from './Icons'

type BookmarkModalProps = {
  onClose: () => void
  onAdd: (label: string, url: string) => void
}

export function BookmarkModal({ onClose, onAdd }: BookmarkModalProps) {
  const [label, setLabel] = useState('')
  const [url, setUrl] = useState('')
  const labelRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    labelRef.current?.focus()
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!label.trim() || !url.trim()) return
    onAdd(label, url)
    onClose()
  }

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
          <PlusIcon size={18} className="nt-panel-accent" />
          <span className="nt-panel-title">Add Bookmark</span>
        </div>
        <form className="nt-bookmark-form" onSubmit={handleSubmit}>
          <div className="nt-bookmark-field">
            <label htmlFor="bm-label">Name</label>
            <input
              id="bm-label"
              ref={labelRef}
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="My Bookmark"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <div className="nt-bookmark-field">
            <label htmlFor="bm-url">URL</label>
            <input
              id="bm-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="example.com"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <button
            type="submit"
            className="nt-bookmark-submit"
            disabled={!label.trim() || !url.trim()}
          >
            Add Bookmark
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

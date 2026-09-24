import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import { BookmarkIcon, CloseIcon } from './Icons'
import type { Bookmark } from './useBookmarks'

type BookmarkSearchProps = {
  bookmarks: Bookmark[]
  onClose: () => void
}

export function BookmarkSearch({ bookmarks, onClose }: BookmarkSearchProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const filtered = query.trim()
    ? bookmarks.filter(
        (bm) =>
          bm.label.toLowerCase().includes(query.toLowerCase()) ||
          bm.url.toLowerCase().includes(query.toLowerCase()),
      )
    : bookmarks

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
          <BookmarkIcon size={18} className="nt-panel-accent" />
          <span className="nt-panel-title">Search Bookmarks</span>
        </div>
        <input
          ref={inputRef}
          className="nt-bm-search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your bookmarks..."
          autoComplete="off"
          spellCheck={false}
          aria-label="Search bookmarks"
        />
        <div className="nt-bm-results">
          {filtered.length === 0 ? (
            <div className="nt-bm-empty">
              {bookmarks.length === 0
                ? 'No bookmarks yet. Add one from the Quick Access + button.'
                : 'No bookmarks match your search.'}
            </div>
          ) : (
            filtered.map((bm) => (
              <a
                key={bm.id}
                href={bm.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nt-bm-result"
                onClick={onClose}
              >
                <span className="nt-bm-result-letter">{bm.label.charAt(0).toUpperCase()}</span>
                <div className="nt-bm-result-info">
                  <div className="nt-bm-result-label">{bm.label}</div>
                  <div className="nt-bm-result-url">{bm.url}</div>
                </div>
              </a>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

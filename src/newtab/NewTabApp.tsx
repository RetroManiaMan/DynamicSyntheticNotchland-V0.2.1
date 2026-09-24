import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useClock } from './useClock'
import { useBookmarks } from './useBookmarks'
import { useRecentHistory } from './useRecentHistory'
import { AboutPanel } from './AboutPanel'
import { AppsLauncher } from './AppsLauncher'
import { BookmarkModal } from './BookmarkModal'
import { BookmarkSearch } from './BookmarkSearch'
import { CommandsPanel } from './CommandsPanel'
import { QuickAccess } from './QuickAccess'
import { QuickActions } from './QuickActions'
import { SearchCommand } from './SearchCommand'
import { Sidebar } from './Sidebar'
import './newtab.css'

type View = 'home' | 'commands' | 'apps' | 'about' | 'bookmarks'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function looksLikeUrl(input: string): boolean {
  if (input.includes(' ')) return false
  return /^[\w.-]+\.[a-z]{2,}([/?#].*)?$/i.test(input)
}

function normalizeUrl(input: string): string {
  if (/^https?:\/\//i.test(input)) return input
  return `https://${input}`
}

export function NewTabApp() {
  const [searchValue, setSearchValue] = useState('')
  const [activeView, setActiveView] = useState<View>('home')
  const [showBookmarkModal, setShowBookmarkModal] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { formattedTime, formattedDate } = useClock()
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks()
  const recentHistory = useRecentHistory()

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveView('home')
        setShowBookmarkModal(false)
        inputRef.current?.blur()
        return
      }

      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setActiveView('home')
        inputRef.current?.focus()
        return
      }

      if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
        event.preventDefault()
        setActiveView('bookmarks')
        return
      }

      const target = event.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
      if (event.metaKey || event.ctrlKey || event.altKey) return

      if (event.key === '/') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleNavigate(view: string) {
    if (view === 'search') {
      setActiveView('home')
      inputRef.current?.focus()
    } else {
      setActiveView(view as View)
    }
  }

  function handleSearchSubmit(value: string) {
    const trimmed = value.trim()
    if (!trimmed) return

    if (trimmed.startsWith('/')) {
      const parts = trimmed.slice(1).split(/\s+/)
      const cmd = parts[0].toLowerCase()
      const args = parts.slice(1).join(' ')

      switch (cmd) {
        case 'search':
          if (args) {
            window.open(
              `https://www.google.com/search?q=${encodeURIComponent(args)}`,
              '_blank',
              'noopener,noreferrer',
            )
          }
          break
        case 'open':
          if (args) {
            window.open(normalizeUrl(args), '_blank', 'noopener,noreferrer')
          }
          break
        case 'help':
        case 'newtab/help':
          setActiveView('commands')
          break
      }
      return
    }

    if (looksLikeUrl(trimmed)) {
      window.open(normalizeUrl(trimmed), '_blank', 'noopener,noreferrer')
    } else {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`,
        '_blank',
        'noopener,noreferrer',
      )
    }
  }

  function handleCommandSelect(fill: string) {
    setSearchValue(fill)
    setActiveView('home')
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  function handleAppSelect(appId: string) {
    if (appId === 'search') {
      setActiveView('home')
      requestAnimationFrame(() => inputRef.current?.focus())
    } else if (appId === 'commands') {
      setActiveView('commands')
    } else if (appId === 'about') {
      setActiveView('about')
    }
  }

  const sidebarActive =
    activeView === 'commands' ? 'commands'
    : activeView === 'apps' ? 'apps'
    : activeView === 'bookmarks' ? 'bookmarks'
    : 'home'

  return (
    <div className="nt-page">
      <div className="nt-ambient" />
      <Sidebar activeView={sidebarActive} onNavigate={handleNavigate} recentHistory={recentHistory} />

      <main className="nt-main">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'contents' }}
        >
          <motion.div className="nt-clock" variants={itemVariants}>
            <div className="nt-clock-time">{formattedTime}</div>
            <div className="nt-clock-date">{formattedDate}</div>
          </motion.div>

          <div className="nt-hero">
            <motion.h1 className="nt-identity" variants={itemVariants}>
              Notchland
            </motion.h1>

            <motion.div variants={itemVariants} style={{ width: '100%' }}>
              <SearchCommand
                value={searchValue}
                onChange={setSearchValue}
                onSubmit={handleSearchSubmit}
                inputRef={inputRef}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <QuickActions
                activeView={activeView}
                onSearch={() => {
                  setActiveView('home')
                  inputRef.current?.focus()
                }}
                onCommands={() => setActiveView('commands')}
                onApps={() => setActiveView('apps')}
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <QuickAccess
              bookmarks={bookmarks}
              onAddBookmark={() => setShowBookmarkModal(true)}
              onRemoveBookmark={removeBookmark}
            />
          </motion.div>
        </motion.div>
      </main>

      <AnimatePresence>
        {activeView === 'apps' && (
          <AppsLauncher onClose={() => setActiveView('home')} onAppSelect={handleAppSelect} />
        )}
        {activeView === 'commands' && (
          <CommandsPanel onClose={() => setActiveView('home')} onSelect={handleCommandSelect} />
        )}
        {activeView === 'about' && <AboutPanel onClose={() => setActiveView('home')} />}
        {activeView === 'bookmarks' && (
          <BookmarkSearch bookmarks={bookmarks} onClose={() => setActiveView('home')} />
        )}
        {showBookmarkModal && (
          <BookmarkModal
            onClose={() => setShowBookmarkModal(false)}
            onAdd={addBookmark}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

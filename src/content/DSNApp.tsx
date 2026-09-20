import { useEffect, useRef, useState } from 'react'

import { Clock } from './components/Clock'
import { NotchCollapsed } from './components/NotchCollapsed'
import { NotchExpanded } from './components/NotchExpanded'
import { NotchShell } from './components/NotchShell'

export function DSNApp() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const shellRef = useRef<HTMLDivElement | null>(null)
  const { formattedTime } = Clock()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!shellRef.current) {
        return
      }

      if (!shellRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  const handleSearchSubmit = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }

    const url = `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setIsExpanded(false)
  }

  return (
    <NotchShell
      ref={shellRef}
      isExpanded={isExpanded || isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      collapsedContent={
        <NotchCollapsed
          time={formattedTime}
          isExpanded={isExpanded || isHovered}
          onToggle={() => setIsExpanded((value) => !value)}
        />
      }
      expandedContent={
        <NotchExpanded
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearchSubmit={handleSearchSubmit}
          onCollapse={() => setIsExpanded(false)}
        />
      }
    />
  )
}

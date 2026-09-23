import { useCallback, useEffect, useState } from 'react'

export type Bookmark = {
  id: string
  label: string
  url: string
}

const STORAGE_KEY = 'dsn-newtab-bookmarks'

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as Bookmark[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
    } catch {
      /* ignore */
    }
  }, [bookmarks])

  const addBookmark = useCallback((label: string, url: string) => {
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`
    setBookmarks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), label: label.trim(), url: normalized },
    ])
  }, [])

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }, [])

  return { bookmarks, addBookmark, removeBookmark }
}

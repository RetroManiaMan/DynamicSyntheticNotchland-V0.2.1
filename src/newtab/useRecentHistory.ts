import { useEffect, useState } from 'react'

export type HistoryItem = {
  id: string
  title: string
  url: string
}

export function useRecentHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const chromeApi = (globalThis as any).chrome
    if (!chromeApi?.history) return

    try {
      chromeApi.history.search(
        {
          text: '',
          maxResults: 20,
          startTime: Date.now() - 7 * 24 * 60 * 60 * 1000,
        },
        (results: any[]) => {
          setHistory(
            results
              .filter(
                (item: any) =>
                  item.url &&
                  !item.url.startsWith('chrome://') &&
                  !item.url.startsWith('chrome-extension://'),
              )
              .slice(0, 5)
              .map((item: any) => ({
                id: item.id as string,
                title: (item.title || item.url) as string,
                url: item.url as string,
              })),
          )
        },
      )
    } catch {
      /* chrome.history not available — dev preview */
    }
  }, [])

  return history
}

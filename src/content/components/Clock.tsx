import { useEffect, useMemo, useState } from 'react'

export function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [])

  const formattedTime = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: '2-digit',
      }).format(now),
    [now],
  )

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        month: 'long',
        day: 'numeric',
      }).format(now),
    [now],
  )

  return {
    formattedTime,
    formattedDate,
  }
}

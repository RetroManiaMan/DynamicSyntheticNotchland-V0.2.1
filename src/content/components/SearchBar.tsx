import { type FormEvent, type KeyboardEvent, useEffect, useRef } from 'react'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  onCollapse: () => void
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  onCollapse,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      inputRef.current?.blur()
      onCollapse()
    }
  }

  return (
    <form className="dsn-search-form" onSubmit={handleSubmit}>
      <label htmlFor="dsn-search" className="sr-only">
        Search the web
      </label>
      <div className="dsn-search-wrap">
        <span className="dsn-search-icon" aria-hidden="true">
          ⌕
        </span>
        <input
          id="dsn-search"
          ref={inputRef}
          className="dsn-search-input"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search the web or type a command..."
          autoComplete="off"
          spellCheck={false}
          aria-label="Search the web"
        />
      </div>
    </form>
  )
}

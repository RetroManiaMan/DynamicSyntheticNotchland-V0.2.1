import { type FormEvent, type RefObject, useState } from 'react'
import { motion } from 'framer-motion'

import { SearchIcon, TerminalIcon } from './Icons'

type SearchCommandProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  inputRef: RefObject<HTMLInputElement | null>
}

export function SearchCommand({ value, onChange, onSubmit, inputRef }: SearchCommandProps) {
  const [isFocused, setIsFocused] = useState(false)
  const isCommand = value.trim().startsWith('/')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(value)
  }

  return (
    <form className="nt-search-form" onSubmit={handleSubmit}>
      <motion.div
        className={`nt-search-wrap ${isFocused ? 'is-focused' : ''} ${isCommand ? 'is-command' : ''}`}
        animate={{ scale: isFocused ? 1.01 : 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="nt-search-icon">
          {isCommand ? <TerminalIcon size={18} /> : <SearchIcon size={18} />}
        </span>
        <input
          ref={inputRef}
          className="nt-search-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search the web or type a command..."
          autoComplete="off"
          spellCheck={false}
          aria-label="Search the web or type a command"
        />
        <kbd className="nt-search-kbd">⌘K</kbd>
      </motion.div>
    </form>
  )
}

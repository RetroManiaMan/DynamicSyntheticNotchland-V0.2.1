type IconProps = { className?: string; size?: number }

const svgProps = (size = 20) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export function StarIcon({ className, size }: IconProps) {
  return (
    <svg className={className} {...svgProps(size)}>
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
    </svg>
  )
}

export function HomeIcon({ className, size }: IconProps) {
  return (
    <svg className={className} {...svgProps(size)}>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z" />
    </svg>
  )
}

export function SearchIcon({ className, size }: IconProps) {
  return (
    <svg className={className} {...svgProps(size)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function TerminalIcon({ className, size }: IconProps) {
  return (
    <svg className={className} {...svgProps(size)}>
      <path d="m4 17 6-6-6-6" />
      <path d="M12 19h8" />
    </svg>
  )
}

export function GridIcon({ className, size }: IconProps) {
  return (
    <svg className={className} {...svgProps(size)}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}

export function UserIcon({ className, size }: IconProps) {
  return (
    <svg className={className} {...svgProps(size)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </svg>
  )
}

export function PlusIcon({ className, size }: IconProps) {
  return (
    <svg className={className} {...svgProps(size)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function InfoIcon({ className, size }: IconProps) {
  return (
    <svg className={className} {...svgProps(size)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  )
}

export function CloseIcon({ className, size }: IconProps) {
  return (
    <svg className={className} {...svgProps(size)}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export function ArrowRightIcon({ className, size }: IconProps) {
  return (
    <svg className={className} {...svgProps(size)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function SparkleIcon({ className, size }: IconProps) {
  return (
    <svg className={className} {...svgProps(size)}>
      <path d="M12 3 L13.2 9.8 L20 11 L13.2 12.2 L12 19 L10.8 12.2 L4 11 L10.8 9.8 Z" />
      <path d="M19 3v3M20.5 4.5h-3" />
    </svg>
  )
}

export function ChevronLeftIcon({ className, size }: IconProps) {
  return (
    <svg className={className} {...svgProps(size)}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

/* Brand icons for Quick Access — filled, no stroke */
export function GoogleIcon({ className, size = 20 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10 0-.69-.07-1.36-.2-2H12v3h5.3c-.23 1.25-.9 2.31-1.92 3.02V18h3.1c1.81-1.67 2.87-4.13 2.87-7.02 0-.69-.07-1.36-.2-2H12z" />
    </svg>
  )
}

export function GitHubIcon({ className, size = 20 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.4 9.4 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  )
}

export function YouTubeIcon({ className, size = 20 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26.1 26.1 0 0 0 2 12a26.1 26.1 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.1 26.1 0 0 0 22 12a26.1 26.1 0 0 0-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
    </svg>
  )
}

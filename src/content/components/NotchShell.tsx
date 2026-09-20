import { forwardRef, type ReactNode } from 'react'

type NotchShellProps = {
  isExpanded: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  collapsedContent: ReactNode
  expandedContent: ReactNode
}

export const NotchShell = forwardRef<HTMLDivElement, NotchShellProps>(
  ({ isExpanded, onMouseEnter, onMouseLeave, collapsedContent, expandedContent }, ref) => {
    return (
      <div className="dsn-shell-wrap" ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div
          className={`dsn-shell ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
          role="presentation"
          aria-live="polite"
        >
          {!isExpanded && collapsedContent}
          {isExpanded && expandedContent}
        </div>
      </div>
    )
  },
)

NotchShell.displayName = 'NotchShell'

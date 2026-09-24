import { CloseIcon, GitHubIcon, GoogleIcon, PlusIcon, YouTubeIcon } from './Icons'
import type { Bookmark } from './useBookmarks'

type QuickAccessProps = {
  bookmarks: Bookmark[]
  onAddBookmark: () => void
  onRemoveBookmark: (id: string) => void
}

const defaultLinks = [
  { label: 'Google', url: 'https://google.com', Icon: GoogleIcon },
  { label: 'GitHub', url: 'https://github.com', Icon: GitHubIcon },
  { label: 'YouTube', url: 'https://youtube.com', Icon: YouTubeIcon },
]

export function QuickAccess({ bookmarks, onAddBookmark, onRemoveBookmark }: QuickAccessProps) {
  return (
    <div className="nt-quick-access">
      <span className="nt-quick-access-label">Quick Access</span>
      <div className="nt-quick-access-items">
        {defaultLinks.map(({ label, url, Icon }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="nt-quick-access-item"
            aria-label={label}
            title={label}
          >
            <Icon size={20} />
          </a>
        ))}

        {bookmarks.map((bm) => (
          <a
            key={bm.id}
            href={bm.url}
            target="_blank"
            rel="noopener noreferrer"
            className="nt-quick-access-item nt-quick-access-bookmark"
            aria-label={bm.label}
            title={`${bm.label} — ${bm.url}`}
          >
            <span className="nt-quick-access-letter">{bm.label.charAt(0).toUpperCase()}</span>
            <button
              type="button"
              className="nt-quick-access-delete"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onRemoveBookmark(bm.id)
              }}
              aria-label={`Remove ${bm.label}`}
            >
              <CloseIcon size={11} />
            </button>
          </a>
        ))}

        <button
          type="button"
          className="nt-quick-access-item nt-quick-access-add"
          onClick={onAddBookmark}
          aria-label="Add bookmark"
        >
          <PlusIcon size={16} />
        </button>
      </div>
    </div>
  )
}

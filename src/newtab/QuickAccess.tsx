import { GitHubIcon, GoogleIcon, PlusIcon, YouTubeIcon } from './Icons'

const quickLinks = [
  { label: 'Google', url: 'https://google.com', Icon: GoogleIcon },
  { label: 'GitHub', url: 'https://github.com', Icon: GitHubIcon },
  { label: 'YouTube', url: 'https://youtube.com', Icon: YouTubeIcon },
]

export function QuickAccess() {
  return (
    <div className="nt-quick-access">
      <span className="nt-quick-access-label">Quick Access</span>
      <div className="nt-quick-access-items">
        {quickLinks.map(({ label, url, Icon }) => (
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
        <button
          type="button"
          className="nt-quick-access-item nt-quick-access-add"
          aria-label="Add quick access"
        >
          <PlusIcon size={16} />
        </button>
      </div>
    </div>
  )
}

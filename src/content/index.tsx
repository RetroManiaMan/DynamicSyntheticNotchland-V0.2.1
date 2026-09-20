import React from 'react'
import { createRoot } from 'react-dom/client'

import { DSNApp } from './DSNApp'
import styles from './dsn.css?inline'

const rootId = 'dsn-root'

const host = document.getElementById(rootId) ?? document.createElement('div')
host.id = rootId
host.setAttribute('data-dsn-host', 'true')
host.style.position = 'fixed'
host.style.top = '8px'
host.style.left = '50%'
host.style.transform = 'translateX(-50%)'
host.style.zIndex = '2147483646'
host.style.pointerEvents = 'none'

if (!host.shadowRoot) {
  host.attachShadow({ mode: 'open' })
}

const shadowRoot = host.shadowRoot!
const mountNode =
  (shadowRoot.querySelector('[data-dsn-mount]') as HTMLDivElement | null) ??
  document.createElement('div')
mountNode.setAttribute('data-dsn-mount', 'true')
mountNode.style.pointerEvents = 'auto'

if (!shadowRoot.contains(mountNode)) {
  shadowRoot.appendChild(mountNode)
}

const root = createRoot(mountNode)
root.render(
  <React.StrictMode>
    <>
      <style>{styles}</style>
      <DSNApp />
    </>
  </React.StrictMode>,
)

if (!host.parentNode) {
  document.body.appendChild(host)
}

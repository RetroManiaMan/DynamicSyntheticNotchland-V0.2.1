;(function () {
  const rootId = 'dsn-root'
  if (document.getElementById(rootId)) return

  const host = document.createElement('div')
  host.id = rootId
  host.setAttribute('data-dsn-host', 'true')
  Object.assign(host.style, {
    position: 'fixed', top: '8px', left: '50%', transform: 'translateX(-50%)',
    zIndex: '2147483646', pointerEvents: 'none',
  })
  const shadow = host.attachShadow({ mode: 'open' })
  const mount = document.createElement('div')
  mount.style.pointerEvents = 'auto'
  shadow.appendChild(mount)

  const style = document.createElement('style')
  style.textContent = `
    :host, * { box-sizing: border-box; }
    .dsn-shell-wrap { position: relative; display: flex; justify-content: center; pointer-events: none; user-select: none; }
    .dsn-shell { width: 250px; overflow: hidden; pointer-events: auto; border: 1px solid rgba(255,255,255,.08); border-radius: 24px; background: radial-gradient(ellipse 80% 100% at 20% 50%, rgba(193,216,47,.05), transparent 70%), linear-gradient(180deg, rgba(20,20,22,.94), rgba(10,10,12,.9)); box-shadow: 0 8px 32px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.03), inset 0 1px 0 rgba(255,255,255,.06); backdrop-filter: blur(20px) saturate(1.2); color: rgba(255,255,255,.96); font: 14px ui-sans-serif, system-ui, sans-serif; transition: box-shadow .4s cubic-bezier(.22,1,.36,1), width .28s ease, border-radius .28s ease; }
    .dsn-shell:hover { box-shadow: 0 12px 40px rgba(0,0,0,.6), 0 0 24px rgba(212,241,30,.12), 0 0 0 1px rgba(255,255,255,.06), inset 0 1px 0 rgba(255,255,255,.08); }
    button, input { font: inherit; } button { color: inherit; }
    .dsn-notch { width: 100%; height: 40px; display: flex; align-items: center; justify-content: center; gap: 10px; border: 0; background: transparent; cursor: pointer; transition: transform .3s cubic-bezier(.22,1,.36,1); }
    .dsn-notch:hover { transform: translateY(-1px); }
    .dsn-notch:active { transform: translateY(0) scale(.98); }
    .dsn-notch-indicator { width: 8px; height: 8px; border-radius: 50%; background: #d4f11e; box-shadow: 0 0 6px rgba(212,241,30,.7), 0 0 14px rgba(212,241,30,.4); animation: dsn-pulse 3s ease-in-out infinite; }
    @keyframes dsn-pulse { 0%,100% { box-shadow: 0 0 6px rgba(212,241,30,.7), 0 0 14px rgba(212,241,30,.4); } 50% { box-shadow: 0 0 8px rgba(212,241,30,.8), 0 0 18px rgba(212,241,30,.5); } }
    .dsn-collapsed-time { font-size: .92rem; font-weight: 600; }
    .dsn-expanded-panel { display: flex; flex-direction: column; gap: 16px; width: 100%; padding: 20px 20px 18px; }
    .dsn-expanded-topline, .dsn-view-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 2px 4px 0; }
    .dsn-expanded-clock { font-size: 1.45rem; font-weight: 600; }
    .dsn-expanded-date, .dsn-view-kicker, .dsn-command-hint { color: rgba(255,255,255,.5); font-size: .76rem; }
    .dsn-search-form { width: 100%; } .dsn-search-wrap { display: flex; align-items: center; gap: 10px; min-height: 48px; padding: 0 14px; border: 1px solid rgba(255,255,255,.08); border-radius: 14px; background: rgba(255,255,255,.03); }
    .dsn-search-wrap:focus-within { border-color: rgba(212,241,30,.3); box-shadow: 0 0 0 3px rgba(212,241,30,.08); }
    .dsn-search-input { width: 100%; padding: 12px 0; border: 0; outline: 0; background: transparent; color: rgba(255,255,255,.96); } .dsn-search-input::placeholder { color: rgba(255,255,255,.4); }
    .dsn-actions { display: flex; gap: 10px; padding-top: 2px; } .dsn-action, .dsn-app-card { border: 1px solid rgba(255,255,255,.08); border-radius: 12px; background: rgba(255,255,255,.03); cursor: pointer; }
    .dsn-action { flex: 1; min-height: 38px; transition: background .25s cubic-bezier(.22,1,.36,1), border-color .25s ease, transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s ease; } .dsn-action:hover, .dsn-action.is-active, .dsn-app-card:hover { border-color: rgba(212,241,30,.25); background: rgba(212,241,30,.08); } .dsn-action:active { transform: translateY(0) scale(.98); }
    .dsn-module-view { display: flex; flex-direction: column; gap: 12px; } .dsn-view-heading strong { font-size: 1rem; }
    .dsn-feedback { padding: 9px 10px; border: 1px solid rgba(212,241,30,.18); border-radius: 10px; color: #c1d82f; background: rgba(212,241,30,.06); font-size: .76rem; }
    .dsn-app-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; } .dsn-app-card { display: flex; align-items: center; gap: 10px; min-width: 0; padding: 12px; text-align: left; color: inherit; }
    .dsn-app-icon { display: grid; flex: 0 0 30px; place-items: center; width: 30px; height: 30px; border-radius: 9px; color: #d4f11e; background: rgba(212,241,30,.1); }
    .dsn-app-card { transition: background .25s ease, border-color .25s ease, transform .25s ease; } .dsn-app-card:hover { transform: translateY(-1px); }
    .dsn-app-card span:last-child { display: flex; min-width: 0; flex-direction: column; gap: 3px; } .dsn-app-card small { overflow: hidden; color: rgba(255,255,255,.5); font-size: .68rem; text-overflow: ellipsis; white-space: nowrap; }
    @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }
  `
  shadow.appendChild(style)

  const state = { view: 'collapsed', value: '', feedback: '', hovered: false }
  const shellWrap = document.createElement('div')
  shellWrap.className = 'dsn-shell-wrap'
  const shell = document.createElement('div')
  shell.className = 'dsn-shell'
  shellWrap.appendChild(shell)
  mount.appendChild(shellWrap)

  const parse = (input) => {
    const trimmed = input.trim()
    if (!trimmed) return { type: 'empty' }
    if (!trimmed.startsWith('/')) return { type: 'search', query: trimmed }
    const tokens = trimmed.slice(1).trim().split(/\s+/).filter(Boolean)
    return { type: 'command', command: (tokens[0] || '').toLowerCase(), args: tokens.slice(1) }
  }

  const route = (input) => {
    const parsed = parse(input)
    if (parsed.type === 'empty') return { kind: 'empty' }
    if (parsed.type === 'search') return { kind: 'search', query: parsed.query }
    const argument = parsed.args.join(' ')
    if (parsed.command === 'search') return argument ? { kind: 'search', query: argument } : { kind: 'error', message: '/search requires a query.' }
    if (parsed.command === 'open') {
      if (!argument) return { kind: 'error', message: '/open requires a URL.' }
      try {
        const normalizedUrl = argument.includes('://') ? argument : 'https://' + argument
        const url = new URL(normalizedUrl)
        if (!['http:', 'https:'].includes(url.protocol)) throw new Error()
        return { kind: 'browser', action: { type: 'open', url: normalizedUrl }, message: `Opening ${url.hostname}...` }
      } catch (_) { return { kind: 'error', message: "That doesn't appear to be a valid URL." } }
    }
    if (parsed.command === 'newtab') return { kind: 'browser', action: { type: 'newtab' }, message: 'Opening a new tab...' }
    if (parsed.command === 'help' || parsed.command === 'commands') return { kind: 'help', message: 'Commands: /search <query>, /open <url>, /newtab, /help' }
    return { kind: 'error', message: 'Unknown command. Try /help.' }
  }

  const browserAction = (action) => {
    if (typeof chrome === 'undefined' || !chrome.runtime?.sendMessage) return Promise.reject(new Error('bridge unavailable'))
    return new Promise((resolve, reject) => chrome.runtime.sendMessage({ type: 'dsn:browser-action', action }, (response) => {
      if (chrome.runtime.lastError || response?.ok === false) {
        reject(new Error(chrome.runtime.lastError?.message || 'Browser action failed'))
        return
      }
      resolve()
    }))
  }

  const submit = () => {
    const result = route(state.value)
    if (result.kind === 'empty') return
    if (result.kind === 'search') {
      window.open('https://www.google.com/search?q=' + encodeURIComponent(result.query), '_blank', 'noopener,noreferrer')
      state.view = 'collapsed'; render(); return
    }
    if (result.kind === 'help' || result.kind === 'error') {
      state.feedback = result.message; state.view = 'commands'; render(); return
    }
    state.feedback = result.message
    browserAction(result.action)
      .then(() => { state.view = 'commands'; render() })
      .catch(() => {
        if (result.action.type === 'open') {
          window.open(result.action.url, '_blank', 'noopener,noreferrer')
          state.view = 'collapsed'
          render()
          return
        }
        state.feedback = 'The browser action could not be completed.'
        render()
      })
  }

  const navigate = (view) => { state.view = view; state.feedback = ''; render() }
  const time = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  const date = () => new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })
  const button = (label, active, handler) => { const element = document.createElement('button'); element.type = 'button'; element.className = 'dsn-action' + (active ? ' is-active' : ''); element.textContent = label; element.setAttribute('aria-pressed', String(active)); element.addEventListener('click', handler); return element }
  const searchInput = () => {
    const form = document.createElement('form'); form.className = 'dsn-search-form'; form.addEventListener('submit', (event) => { event.preventDefault(); submit() }); form.addEventListener('pointerdown', (event) => event.stopPropagation())
    const wrap = document.createElement('div'); wrap.className = 'dsn-search-wrap'; wrap.addEventListener('pointerdown', (event) => event.stopPropagation())
    const icon = document.createElement('span'); icon.textContent = '⌕'; icon.style.color = 'rgba(255,255,255,.5)'
    const input = document.createElement('input'); input.className = 'dsn-search-input'; input.type = 'text'; input.value = state.value; input.placeholder = 'Search the web or type a command...'; input.autocomplete = 'off'; input.spellcheck = false; input.setAttribute('aria-label', 'Search the web'); input.addEventListener('input', () => { state.value = input.value }); input.addEventListener('pointerdown', (event) => event.stopPropagation()); input.addEventListener('keydown', (event) => { if (event.key === 'Escape') { state.view = 'collapsed'; render() } })
    wrap.append(icon, input); form.appendChild(wrap); return { form, input }
  }

  const render = () => {
    const expanded = state.view !== 'collapsed' || state.hovered
    shell.style.width = expanded ? 'min(640px, calc(100vw - 32px))' : '250px'; shell.style.borderRadius = expanded ? '24px' : '999px'; shell.replaceChildren()
    if (!expanded) {
      const collapsed = document.createElement('button'); collapsed.type = 'button'; collapsed.className = 'dsn-notch'; collapsed.setAttribute('aria-label', 'Expand DSN'); collapsed.innerHTML = '<span class="dsn-notch-indicator"></span><span class="dsn-collapsed-time"></span>'; collapsed.querySelector('.dsn-collapsed-time').textContent = time(); collapsed.addEventListener('click', () => { state.view = 'expanded'; render() }); shell.appendChild(collapsed); return
    }
    const panel = document.createElement('div'); panel.className = 'dsn-expanded-panel'
    const top = document.createElement('div'); top.className = 'dsn-expanded-topline'; top.innerHTML = `<strong class="dsn-expanded-clock">${time()}</strong><span class="dsn-expanded-date">${date()}</span>`; panel.appendChild(top)
    if (state.view === 'apps') {
      const heading = document.createElement('div'); heading.className = 'dsn-view-heading'; heading.innerHTML = '<span class="dsn-view-kicker">Notchland</span><strong>Apps</strong>'; panel.appendChild(heading)
      const grid = document.createElement('div'); grid.className = 'dsn-app-grid'; [['⌕', 'Search', 'Search the web', 'search'], ['/', 'Commands', 'Run DSN commands', 'commands']].forEach(([icon, name, description, id]) => { const card = document.createElement('button'); card.type = 'button'; card.className = 'dsn-app-card'; card.innerHTML = `<span class="dsn-app-icon">${icon}</span><span><strong>${name}</strong><small>${description}</small></span>`; card.addEventListener('click', () => navigate(id)); grid.appendChild(card) }); panel.appendChild(grid)
    } else {
      if (state.view === 'commands') { const heading = document.createElement('div'); heading.className = 'dsn-view-heading'; heading.innerHTML = '<span class="dsn-view-kicker">Notchland</span><strong>Commands</strong>'; panel.appendChild(heading) }
      const search = searchInput(); panel.appendChild(search.form); if (state.view === 'commands') { const hint = document.createElement('div'); hint.className = 'dsn-command-hint'; hint.textContent = 'Try /search, /open, /newtab, or /help'; panel.appendChild(hint) }
      if (state.feedback) { const feedback = document.createElement('div'); feedback.className = 'dsn-feedback'; feedback.setAttribute('role', 'status'); feedback.textContent = state.feedback; panel.appendChild(feedback) }
      if (state.view === 'search' || state.view === 'expanded') setTimeout(() => search.input.focus(), 0)
    }
    const actions = document.createElement('div'); actions.className = 'dsn-actions'; actions.appendChild(button('Search', state.view === 'search' || state.view === 'expanded', () => navigate('search'))); actions.appendChild(button('Commands', state.view === 'commands', () => navigate('commands'))); actions.appendChild(button('Apps', state.view === 'apps', () => navigate('apps'))); panel.appendChild(actions); shell.appendChild(panel)
  }

  shellWrap.addEventListener('mouseenter', () => { state.hovered = true; render() }); shellWrap.addEventListener('mouseleave', () => { state.hovered = false; render() })
  document.addEventListener('pointerdown', (event) => { if (state.view === 'collapsed') return; const path = event.composedPath ? event.composedPath() : []; if (!path.includes(host) && !path.includes(shellWrap) && !path.includes(shell)) { state.view = 'collapsed'; render() } })
  document.body ? document.body.appendChild(host) : document.documentElement.appendChild(host)
  render()
  setInterval(() => {
    const collapsedTime = shadow.querySelector('.dsn-collapsed-time')
    const expandedClock = shadow.querySelector('.dsn-expanded-clock')
    const expandedDate = shadow.querySelector('.dsn-expanded-date')
    if (collapsedTime) collapsedTime.textContent = time()
    if (expandedClock) expandedClock.textContent = time()
    if (expandedDate) expandedDate.textContent = date()
  }, 1000)
})()

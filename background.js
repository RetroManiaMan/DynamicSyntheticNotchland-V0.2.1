chrome.runtime.onInstalled.addListener(() => {
  console.info('Dynamic Synthetic Notchland installed')
})

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== 'dsn:browser-action' || !message.action) {
    return
  }

  const action = message.action
  const properties = action.type === 'newtab'
    ? {}
    : action.type === 'open' && action.url
      ? { url: action.url }
      : null

  if (!properties) {
    sendResponse({ ok: false })
    return
  }

  chrome.tabs.create(properties, () => {
    sendResponse({ ok: !chrome.runtime.lastError })
  })

  return true
})

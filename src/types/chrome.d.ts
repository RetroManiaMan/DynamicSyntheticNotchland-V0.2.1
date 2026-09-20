declare const chrome: {
  runtime: {
    onInstalled: {
      addListener: (listener: () => void) => void
    }
  }
}

# DSN V0.1

Dynamic Synthetic Notchland (DSN) is a browser-native interface that brings dynamic controls, search, time, and more into a unified interactive notch.

This V0.1 implementation is a Manifest V3 Chrome-compatible extension built with React, TypeScript, and Vite. It injects an isolated shadow-root UI into normal HTTPS pages.

## Development

Install dependencies with Bun, then build the extension:

```sh
bun install
bun run build
```

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

Load the generated `dist` directory as an unpacked extension from the browser's extensions page.

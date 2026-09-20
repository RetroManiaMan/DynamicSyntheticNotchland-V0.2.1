# DSN V0.1

Dynamic Synthetic Notchland (DSN) is a browser-native interface that brings dynamic controls, search, time, and more into a unified interactive notch.

This V0.1 implementation is a Manifest V3 Chrome-compatible extension built with React, TypeScript, and Vite. It injects an isolated shadow-root UI into normal HTTPS pages.

## Pictures
<img width="1470" height="956" alt="Screenshot 2026-09-20 at 4 08 03 PM" src="https://github.com/user-attachments/assets/febc4968-5b09-43be-b5d7-3d273fcaab85" />
<img width="1470" height="956" alt="Screenshot 2026-09-20 at 3 43 02 PM" src="https://github.com/user-attachments/assets/19fc4d7a-d4be-4afd-b067-67488fc4a73d" />
<img width="1470" height="956" alt="Screenshot 2026-09-20 at 4 07 57 PM" src="https://github.com/user-attachments/assets/8d029c19-e442-45a1-8c02-3e7cc9cf19c6" />
<img width="1470" height="956" alt="Screenshot 2026-09-20 at 4 02 59 PM" src="https://github.com/user-attachments/assets/793d94ea-6d00-4f59-9694-820e2de37745" />
<img width="1470" height="956" alt="Screenshot 2026-09-20 at 3 43 44 PM" src="https://github.com/user-attachments/assets/bbfe8667-f8a1-4248-b412-49067c5f680c" />

## Development

Install dependencies with Bun, then build the extension:

```sh
bun install
bun run build
```

Load the generated `dist` directory as an unpacked extension from the browser's extensions page.

# DSN — Dynamic Synthetic Notchland

## What this is
A Manifest V3 Chrome extension (React + TypeScript + Vite) that injects a shadow-root "notch" UI into pages. There is no backend, database, or external service — it is a pure frontend project.

## Dev preview
`vite dev` serves `index.html` → `src/main.tsx` → `App` → `DSNApp`, rendering the notch UI directly in the browser. This is the preview path; the extension's content-script/background entry points (`src/content/index.tsx`, `src/background/service-worker.ts`) are only used in the production build (`bun run build`).

## Stack
- Runtime: Bun (lockfile is `bun.lock`)
- Framework: React 19 + Vite 8
- No environment variables or secrets required

## Verify it works
- `docker compose -f docker-compose.base44.yml up -d --build`
- Curl `localhost:3000` — should return the Vite-served HTML with the notch UI
- The notch appears as a dark pill at the top-center; click or hover to expand

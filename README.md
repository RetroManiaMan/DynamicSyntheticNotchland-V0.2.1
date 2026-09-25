# DSN

Dynamic Synthetic Notchland (DSN) is a Chrome extension that replaces the default new tab with a compact, green-and-black, Base44-inspired dashboard experience.

## Version

DSN v0.2.1

## What’s new in v0.2.1

- Refined new-tab experience with a stronger DSN visual identity
- Expanded search field for a more prominent browser-native layout
- Smooth expandable sidebar interaction with reduced motion stiffness
- Quick Access bookmarks for frequently used websites
- Clean green/black styling inspired by the Base44 aesthetic
- DSN branding integrated into the sidebar state
- Removed the sidebar search action and edge clock from the final layout
- Updated extension packaging to remain compatible with Chrome Manifest V3 requirements

## Features

- Custom new-tab page override
- Sidebar navigation with expand/collapse behavior
- Search-first layout with a wider focus area
- Fast Quick Access bookmarks
- Minimal browser-native experience with DSN theming
- Lightweight extension structure with no inline runtime script required

## Installation

1. Open Chrome or Edge.
2. Go to chrome://extensions (or edge://extensions).
3. Enable Developer Mode.
4. Click Load unpacked.
5. Select this project folder.
6. Open a new tab to see the DSN interface.

## Project structure

- manifest.json — Chrome extension manifest
- notchtab.html — new-tab entry page
- notchtab.css — DSN styling
- notchtab.js — runtime behavior for the page
- asset source files — additional UI/build source under the assets folder

## Licensing

- Source code: MIT License — see LICENSE
- Design assets, documentation, screenshots, and other creative files: CC BY-SA 4.0 — see LICENSE-ASSETS

## Notes

This repository contains both code and design assets. The code is permissively licensed for reuse and modification, while the non-code visual/design content is shared under Creative Commons Attribution-ShareAlike 4.0.

## Status

The extension is currently aligned to the DSN v0.2.1 design direction and is ready for local installation and testing in Chrome-based browsers.

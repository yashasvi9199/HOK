---
description: Configure an offline-first Progressive Web App (PWA) with Service Worker, Web App Manifest, and Cache Storage
---

# Offline-First PWA Setup Task

1. **Generate Web App Manifest:**
   - Create `public/manifest.json` (or `manifest.webmanifest`) declaring:
     - `name`, `short_name`, `theme_color`, and `background_color`.
     - `display: "standalone"`, `start_url: "/"`, and `orientation: "portrait"`.
     - Standard icon mappings for `192x192` and `512x512` resolutions.
   - Link the manifest inside `index.html`.

2. **Implement Service Worker & Offline Cache:**
   - Create the Service Worker file (e.g., `public/sw.js` or via a Vite PWA plugin like `vite-plugin-pwa`).
   - Configure cache versioning and implement Cache-First / Stale-While-Revalidate strategies for:
     - Static assets (HTML, compiled CSS, JS chunks, and favicons).
     - Standard offline application shell fallback.

3. **Register Service Worker:**
   - Create a registration utility (e.g., `src/utils/registerSW.ts`) that executes on window load.
   - Add an update-detection event listener to notify the client when a new version of the app shell is waiting to activate.

4. **Verify Offline Data Storage:**
   - Ensure utilities are available to persist API data into `IndexedDB` when network calls fail, enabling offline-first browsing.
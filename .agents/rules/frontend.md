# FRONTEND UI/UX, MOTION & MOBILE STANDARDS

1. **Architecture & State Partitioning:**
   - Standardize on Vite + React SPA/PWA architecture.
   - Use Zustand strictly for global client UI state (modals, drawers, navigation, local user flags).
   - Use TanStack Query / SWR for all server state, mutations, and caching. Never duplicate server cache into Zustand.

2. **Responsive Styling & Feature Scope:**
   - Standardize on Tailwind CSS for layouts and primitives. Ban arbitrary inline style overrides and dark/light mode toggle complexity.
   - Prohibit monolithic global stylesheets. Each feature module must maintain a dedicated `.styles.css` file for scoped animations or complex pseudo-selectors.

3. **Desktop vs. Mobile View Separation:**
   - **Static / Standard UI:** Implement responsive Tailwind breakpoint classes within a single component.
   - **Motion / 3D / Complex Scroll Pages:** Maintain dedicated UI views (`View.desktop.tsx` vs `View.mobile.tsx`). Isolate mouse/wheel-based GSAP ScrollTriggers to Desktop, and touch-optimized pointer gestures to Mobile.
   - Explicitly configure CSS `touch-action: pan-y` and gesture recognizers on touch views to prevent inverted or fighting scroll axis states.

4. **Conversion & Visual Hierarchy:**
   - Place the primary Call to Action (CTA) above the fold on all initial viewports.
   - Implement an explicit sticky mobile CTA bar for viewports under `768px`.

5. **Interface State Feedback:**
   - Every interactive form, async mutation, and data fetch must include explicit loading states (skeletons or disabled spinner states) and localized inline form validation error states.

6. **Browser Storage Strategy:**
   - **Cookies (`httpOnly`, `Secure`, `SameSite`):** Strictly reserved for authentication tokens and session identifiers. Never store auth tokens in LocalStorage.
   - **LocalStorage:** Reserved exclusively for non-sensitive, persistent preferences (e.g., drawer collapsed, language).
   - **SessionStorage:** Reserved for transient, tab-specific multi-step form data.
   - **IndexedDB:** Reserved for heavy structured payloads, offline caching, and PWA synchronization.

7. **Capacitor Android Integration:**
   - Store auth tokens in Native Secure Storage on Capacitor builds.
   - Explicitly handle Android hardware back-button listeners (`App.addListener('backButton')`), app pause/resume state listeners, and graceful native permissions.
   - Deploy dynamic runtime URL resolution using ternary fallback: Deployment Platform Variable -> `.env`/`dev.vars` -> `localhost`.
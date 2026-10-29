---
description: Scaffold production-ready responsive UI routes for 404, 500, downtime, and redirect fallbacks
---

# Edge-Case UI Scaffolding Task

1. **Verify Project Structure:**
   - Inspect the current routing setup (`react-router-dom`, TanStack Router, etc.) to determine the routing convention.
   - Identify the primary UI library/Tailwind tokens already configured in the workspace.

2. **Generate Standardized View Templates:**
   - Create or update the following dedicated route components inside the project's view/page directory:
     - `NotFoundView.tsx` (Custom 404): Include a clear error statement, primary home button, search/navigation fallback, and an above-the-fold CTA.
     - `ErrorBoundaryView.tsx` (Generic 500): Implement a React Error Boundary fallback view that captures crash metrics, presents a user-friendly error payload without leaking internal stack traces, and provides an immediate refresh/retry CTA.
     - `MaintenanceView.tsx` (Downtime): Create a clean, static, standalone downtime splash view detailing service status and estimated recovery.
     - `RedirectView.tsx`: Build an animated redirection interstitial component featuring a fallback link in case automatic redirection is delayed.

3. **Enforce Responsive Layouts:**
   - Ensure all scaffolded templates are fully responsive with sticky action buttons on mobile screens.
   - Verify that all visual assets referenced have descriptive `alt` tags and contain no missing dependencies.
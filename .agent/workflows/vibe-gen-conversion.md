---
description: Scaffold a dedicated Post-Conversion Thank You and confirmation view with analytics triggers
---

# Post-Conversion UI Scaffolding Task

1. **Locate Target Feature Module:**
   - Identify which feature or route requires the conversion transition (e.g., `features/checkout`, `features/auth`, or `features/lead-gen`).

2. **Scaffold the Confirmation View (`ThankYouView.tsx`):**
   - Place primary confirmation elements above the fold:
     - Success confirmation banner/check animation.
     - Dynamic transaction ID or account reference identifier.
     - Clear summary of the user's action and explicit next steps.
     - Primary and secondary navigation buttons (e.g., "Go to Dashboard", "Download Receipt").
   - Ensure the layout is responsive and contains a sticky CTA bar on mobile screens.

3. **Attach Analytics & State Handlers:**
   - Inject an event dispatch hook for analytics tracking (reading track IDs conditionally from environment variables).
   - Ensure back-button navigation is handled cleanly so users cannot accidentally re-submit the previous conversion form.
---
description: Scaffold interactive cookie consent banner and wire it to localStorage and telemetry gating
---

# DPDP / GDPR Cookie Consent Banner Task

1. **Scaffold Banner Component (`src/components/common/CookieBanner.tsx`):**
   - Design a fixed bottom modal or drawer responsive across desktop and mobile viewports.
   - Include clear explanatory text regarding essential vs. non-essential analytics cookies.
   - Provide explicit "Accept All", "Reject Non-Essential", and "Customize" action buttons.

2. **State & Storage Binding:**
   - Store user preference in `localStorage` under `dpdp_cookie_consent` (`"granted"` | `"denied"`).
   - Ensure banner does not re-render if a valid preference is already stored.

3. **Link to Telemetry Engine:**
   - Connect the consent status to the telemetry gate (`src/lib/telemetry.ts`):
     - If `"granted"`, initialize analytics and trigger pending page views.
     - If `"denied"` or unselected, prevent any outbound tracking pings.
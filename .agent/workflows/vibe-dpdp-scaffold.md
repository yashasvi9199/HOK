---
description: Scaffold complete DPDP compliance pages (Privacy Policy, Terms, Grievance route) and Consent Checkbox component
---

# DPDP Legal Route & Component Scaffolding Task

1. **Scaffold Shared Legal Views:**
   - Inspect existing routing setup (`react-router-dom`, TanStack Router, etc.).
   - Create or update the following views:
     - `src/pages/legal/PrivacyPolicyView.tsx`: Comprehensive policy covering collection purposes, third-party services, retention windows, and user rights.
     - `src/pages/legal/TermsView.tsx`: Standard platform terms, acceptable use, liability limits, and dispute jurisdiction.
     - `src/pages/legal/GrievanceView.tsx`: Displays statutory Grievance Officer email/address with an interactive form containing action reasons:
       - "Delete / Erase My Personal Data"
       - "Rectify / Update Outdated Information"
       - "Revoke Consent"
       - "General Inquiry"

2. **Scaffold Consent Checkbox Component:**
   - Create `src/components/common/DPDPCheckbox.tsx`:
     - Native `<input type="checkbox">` defaulted strictly to `checked={false}`.
     - Descriptive label with clickable routing links to `/privacy` and `/terms`.
     - Required validation hook integration (e.g., React Hook Form / Zod).

3. **Verify Routing & Footer Links:**
   - Register the three views in the main application router.
   - Inject footer anchor links pointing to `/privacy`, `/terms`, and `/grievance`.
   
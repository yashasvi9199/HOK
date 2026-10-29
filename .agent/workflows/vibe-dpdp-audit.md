---
description: Audit forms for mandatory unticked DPDP checkboxes, policy links, and public footer address
---

# DPDP Act Compliance Audit Task

1. **Form Consent Scan:**
   - Search the workspace for all form components (`<form>`, `handleSubmit`, auth views).
   - Verify every user-facing intake form includes an unticked `DPDPCheckbox`.
   - Flag any form where the consent checkbox defaults to pre-checked (`checked={true}`).

2. **Routing & Legal Page Verification:**
   - Verify `/privacy`, `/terms`, and `/grievance` routes exist and render complete content.
   - Confirm the grievance form includes data erasure/removal options.

3. **Footer & Entity Identity Verification:**
   - Inspect public footer templates to ensure a registered contact address and legal links are rendered.

4. **Output Structured Report:**
   - Print a pass/fail table of all scanned forms and views with exact file paths.
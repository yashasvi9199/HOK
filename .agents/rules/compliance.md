# DPDP & REGULATORY COMPLIANCE INVARIANTS

1. **Explicit Affirmative Consent Gate:**
   - Every user registration, signup, contact, and data-intake form must include an explicit consent checkbox for the DPDP Act.
   - Checkboxes must remain unticked by default. Form submission must be blocked until checked.
   - The checkbox label must explicitly link to `/privacy` and `/terms`.

2. **Statutory Grievance Redressal:**
   - The application must maintain an accessible `/grievance` route detailing the Grievance Officer's contact details and a direct inquiry form.
   - The form must provide explicit action categories: "Erase/Delete My Data", "Correct Personal Data", and "General Privacy Concern".

3. **Consent-Gated Cookie Telemetry:**
   - Non-essential cookies, localStorage analytics markers, and telemetry SDKs must remain completely dormant until explicit consent is given via the cookie banner.

4. **Public Entity & Address Verification:**
   - The primary footer and legal pages must display a verified physical or registered business address to satisfy regulatory transparency requirements.
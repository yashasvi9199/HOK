# DOCUMENTATION & LEDGER INVARIANTS

1. **Explicit Trigger & SemVer Sync:**
   - Update documentation files only when explicitly requested, or immediately following any Semantic Version increment in `docs/CHANGELOG.md`.
   - Never generate unsolicited documentation files during standard feature edits.

2. **Semantic Versioning Ledger (`docs/CHANGELOG.md`):**
   - Strictly follow Semantic Versioning (`X.Y.Z`):
     - `X` (Major): Breaking API/architectural changes or foundational feature overhauls.
     - `Y` (Minor): Backward-compatible new features, new endpoints, or UI additions.
     - `Z` (Patch): Backward-compatible bug fixes, UI styling tweaks, or minor refactors.
   - Categorize entries under clear SemVer subheadings: `### Added`, `### Changed`, `### Fixed`, or `### Removed`.

3. **Developer Onboarding Manual (`docs/GUIDE.md`):**
   - Maintain a practical, reproducible guide for onboarding new developers.
   - Detail project setup commands (`pnpm install`, `pnpm dev`), system prerequisites, all required environment variable keys (with explanations for how to obtain them), and local build scripts.

4. **Immutable Database Ledger (`docs/DATABASE.sql`):**
   - Maintain an append-only transaction ledger of all database schema changes.
   - Every entry must append to the bottom of the file with:
     - ISO Timestamp and Date.
     - Target table/entity and operational objective (Rationale).
     - The exact executable SQL mutation query (`CREATE TABLE`, `ALTER TABLE`, `CREATE INDEX`).
   - Entries written to this file are strictly immutable: past queries must never be edited, refactored, or deleted.
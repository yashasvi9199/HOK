---
description: Scan codebase against rules/ and specs, initialize .pending-tasks/, and synchronize checklist.md
---

# Task Synchronization & Audit Task

1. **Initialize Task Storage:**
   - Verify if `.pending-tasks/` directory exists. If not, create it.
   - Verify if `.pending-tasks/checklist.md` exists. If not, initialize with standard category headers:
     - `## Core & Types`
     - `## API & Backend`
     - `## Security & Validation`
     - `## Frontend & UI States`
     - `## SEO & Analytics`
     - `## Compliance & Legal`

2. **Audit Workspace Compliance:**
   - Inspect recent changes against active rule files in `rules/`.
   - Scan for:
     - Missing error boundaries or fallback views (`404`, `500`)
     - Missing `alt` attributes or uncompressed assets
     - Routes missing meta titles, descriptions, or canonical tags
     - Unused or loose `any` types in `.types.ts`
     - Pending OpenSpec changes (`openspec/changes/`)
     - Pending security checks: unhardened headers (run `/vibe-harden-headers`) or unverified dependencies (run `/vibe-audit-security`)

3. **Update `.pending-tasks/checklist.md`:**
   - Append newly identified gaps under appropriate category headers.
   - Retain existing tasks; do not overwrite in-progress items.
   - Display a concise markdown summary in chat: total pending items, high-priority count, and next suggested action.
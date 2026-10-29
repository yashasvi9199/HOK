# PENDING TASKS & LEDGER INVARIANTS

1. **Single Source of Truth:**
   - All pending implementations, rule debts, and architectural gaps must be tracked in `.pending-tasks/checklist.md`.
   - The `.pending-tasks/` directory must be committed to git to persist state across sessions.

2. **Status Notation:**
   - `[ ]` Pending Task: Unstarted item with domain scope and rule reference.
   - `[-]` In Progress: Task actively being executed.
   - `[x]` Completed: Verified via build/typecheck (`tsc --noEmit`).
   - `[!]` Blocked: Awaiting external credentials, packages, or user input.

3. **Task Entry Format:**
   `- [ ] [<CATEGORY>] <Task Description> (@rules/<RULE_FILE>.md#<RuleNumber>) [Priority: High|Med|Low]`

4. **Verification Gate:**
   - Tasks must never be marked `[x]` without verifying that code compiles without type errors (`pnpm tsc --noEmit`).
---
description: Run dependency audit and scan project for secret leaks or gitignore flaws
---

# Security Audit Task
1. Execute `pnpm audit` in the terminal and report vulnerabilities by severity.
2. Inspect `.gitignore` to ensure `.env`, `.env.local`, and custom secret files are excluded.
3. Search the workspace tree for hardcoded API keys, JWT secrets, or unparameterized queries.
4. Confirm `.env.example` contains variable placeholders with dummy data only.
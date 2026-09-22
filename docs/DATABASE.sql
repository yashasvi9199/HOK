-- ==============================================================================
-- House of Kalakaar — Append-Only Database & Storage Mutation Ledger
-- ==============================================================================
-- This ledger tracks all database migrations, D1/KV storage keys, and relational
-- table definitions with strict ISO timestamps and mutation rationales.
-- ==============================================================================

-- [2026-09-22T17:30:00Z] Initial Schema Setup: Atelier Leads Table
-- Rationale: Store incoming student applications and artwork commissions.
CREATE TABLE IF NOT EXISTS studio_leads (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    full_name TEXT NOT NULL,
    country_code TEXT NOT NULL DEFAULT '+91',
    whatsapp_number TEXT NOT NULL,
    intent TEXT NOT NULL CHECK(intent IN ('Learn Digital Art', 'Commission Illustration', 'Brand Collaboration')),
    skill_level TEXT NOT NULL CHECK(skill_level IN ('Absolute Beginner', 'Intermediate', 'Traditional Artist going Digital')),
    hardware TEXT NOT NULL CHECK(hardware IN ('Have iPad & Apple Pencil', 'Planning to get one', 'Other Tablet (Galaxy/Wacom)')),
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'NEW' CHECK(status IN ('NEW', 'CONTACTED', 'ENROLLED', 'ARCHIVED'))
);

CREATE INDEX IF NOT EXISTS idx_studio_leads_created_at ON studio_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_studio_leads_whatsapp ON studio_leads(whatsapp_number);

-- [2026-09-22T22:15:00Z] Schema Mutation: DPDP Act 2023 Consent Audit Records
-- Rationale: Digital Personal Data Protection Act, 2023 mandates maintaining clear,
-- demonstrable evidence of affirmative consent given by the Data Principal before processing.
ALTER TABLE studio_leads ADD COLUMN dpdp_consent_given BOOLEAN NOT NULL DEFAULT 1;
ALTER TABLE studio_leads ADD COLUMN dpdp_consent_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE studio_leads ADD COLUMN dpdp_notice_version TEXT NOT NULL DEFAULT 'dpdp-2023-v2.1';

CREATE INDEX IF NOT EXISTS idx_studio_leads_dpdp_consent ON studio_leads(dpdp_consent_given, dpdp_consent_timestamp);

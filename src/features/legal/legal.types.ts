// * Type definitions for legal, compliance, and DPDP Act 2023 constructs
export type CookieConsentStatus = 'accepted' | 'declined' | 'undecided';

export interface CookiePreferences {
  readonly status: CookieConsentStatus;
  readonly timestamp: string;
  readonly version: string;
}

export interface DataPrincipalRights {
  readonly title: string;
  readonly legalSection: string;
  readonly description: string;
  readonly procedure: string;
}

export interface LegalNoticeDetails {
  readonly fiduciaryName: string;
  readonly dpoContact: string;
  readonly dpoEmail: string;
  readonly studioAddress: string;
  readonly grievanceRedressalWindowDays: number;
  readonly appellateBody: string;
}

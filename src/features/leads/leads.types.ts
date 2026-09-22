// * Lead qualification options and form payloads
export type LeadIntent = 'Learn Digital Art' | 'Commission Illustration' | 'Brand Collaboration';
export type SkillLevel = 'Absolute Beginner' | 'Intermediate' | 'Traditional Artist going Digital';
export type HardwareStatus = 'Have iPad & Apple Pencil' | 'Planning to get one' | 'Other Tablet (Galaxy/Wacom)';

export interface LeadFormData {
  readonly intent: LeadIntent;
  readonly skillLevel: SkillLevel;
  readonly hardware: HardwareStatus;
  readonly fullName: string;
  readonly whatsappNumber: string;
  readonly countryCode: string;
  readonly notes?: string;
}

import { z } from 'zod';

// ? Strict Zod schema validating inbound customer lead details
export const leadFormSchema = z.object({
  intent: z.enum(['Learn Digital Art', 'Commission Illustration', 'Brand Collaboration']),
  skillLevel: z.enum(['Absolute Beginner', 'Intermediate', 'Traditional Artist going Digital']),
  hardware: z.enum(['Have iPad & Apple Pencil', 'Planning to get one', 'Other Tablet (Galaxy/Wacom)']),
  fullName: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(64, 'Name exceeds limit'),
  whatsappNumber: z
    .string()
    .trim()
    .regex(/^\d{7,15}$/, 'Please enter a valid phone number (digits only, 7-15 characters)'),
  countryCode: z.string().trim().default('+91'),
  notes: z.string().trim().max(500, 'Notes cannot exceed 500 characters').optional(),
  consentAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must agree to the Terms & Conditions and consent to data processing under the DPDP Act 2023.',
    }),
  consentTimestamp: z.string().optional(),
});

export type ValidatedLeadPayload = z.infer<typeof leadFormSchema>;

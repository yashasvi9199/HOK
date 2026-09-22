import React, { useState } from 'react';
import { MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { LeadFormData, LeadIntent, SkillLevel, HardwareStatus } from '../features/leads/leads.types';
import { leadFormSchema } from '../features/leads/leads.schema';
import { useWhatsAppRedirect } from '../hooks/useWhatsAppRedirect';
import { AtelierButton } from './AtelierButton';

interface LeadCaptureFormProps {
  className?: string;
  isCompact?: boolean;
}

// * Interactive Atelier Lead Qualification Form with zero-trust validation
export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  className = '',
  isCompact = false,
}) => {
  const { submitLeadToWhatsApp } = useWhatsAppRedirect();

  const [formData, setFormData] = useState<LeadFormData>({
    intent: 'Learn Digital Art',
    skillLevel: 'Absolute Beginner',
    hardware: 'Have iPad & Apple Pencil',
    fullName: '',
    whatsappNumber: '',
    countryCode: '+91',
    notes: '',
  });

  const [errors, setErrors] = useState<{ fullName?: string; whatsappNumber?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const intentOptions: readonly LeadIntent[] = [
    'Learn Digital Art',
    'Commission Illustration',
    'Brand Collaboration',
  ];

  const skillOptions: readonly SkillLevel[] = [
    'Absolute Beginner',
    'Intermediate',
    'Traditional Artist going Digital',
  ];

  const hardwareOptions: readonly HardwareStatus[] = [
    'Have iPad & Apple Pencil',
    'Planning to get one',
    'Other Tablet (Galaxy/Wacom)',
  ];

  // ? Enforce zero-trust validation via Zod schema
  const validate = (): boolean => {
    try {
      const result = leadFormSchema.safeParse(formData);
      if (!result.success) {
        const fieldErrors: { fullName?: string; whatsappNumber?: string } = {};
        for (const issue of result.error.issues) {
          if (issue.path[0] === 'fullName') {
            fieldErrors.fullName = issue.message;
          } else if (issue.path[0] === 'whatsappNumber') {
            fieldErrors.whatsappNumber = issue.message;
          }
        }
        setErrors(fieldErrors);
        return false;
      }
      setErrors({});
      return true;
    } catch (err) {
      console.error('Validation unexpected exception:', err);
      return false;
    }
  };

  // * Handle form submission with confetti burst and safe redirection
  const handleSubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!validate()) return;

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#C5A059', '#1C1917', '#E5D5BA'],
        });
      } catch (confettiErr) {
        // ! Fallback gracefully if canvas context fails
        console.warn('Confetti animation failed:', confettiErr);
      }

      setIsSubmitted(true);
      submitLeadToWhatsApp(formData);
    } catch (submitErr) {
      console.error('Form submission exception:', submitErr);
    }
  };

  return (
    <div
      id="lead-capture-form"
      className={`bg-[#FFFFFF] border border-[#C5A059]/40 shadow-xl p-6 sm:p-8 md:p-10 relative overflow-hidden ${className}`}
    >
      {/* Decorative Atelier Corner Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C5A059]/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C5A059]" />

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span className="text-[11px] font-sans tracking-[0.22em] uppercase font-semibold text-[#C5A059]">
            Direct Atelier Inquiry
          </span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-semibold tracking-tight">
          Begin Your Journey at House of Kalakaar
        </h3>
        <p className="text-sm font-sans text-[#78716C] mt-2">
          Select your creative focus and hardware profile to connect directly with Vrinda Haldia and the studio admissions team via WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Creative Intent Tags */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-2.5">
            1. Your Creative Intent:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {intentOptions.map((option) => {
              const selected = formData.intent === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData({ ...formData, intent: option })}
                  className={`px-4 py-3 text-xs sm:text-sm font-medium transition-all text-left border flex items-center justify-between cursor-pointer ${
                    selected
                      ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] shadow-xs'
                      : 'bg-[#FAF7F2] text-[#1C1917] border-[#F0ECE1] hover:border-[#C5A059]'
                  }`}
                >
                  <span>{option}</span>
                  {selected && <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Skill Level Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-2.5">
            2. Your Experience Level:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {skillOptions.map((option) => {
              const selected = formData.skillLevel === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData({ ...formData, skillLevel: option })}
                  className={`px-3 py-2.5 text-xs sm:text-sm font-medium transition-all text-left border flex items-center justify-between cursor-pointer ${
                    selected
                      ? 'bg-[#FAF7F2] text-[#1C1917] border-[#C5A059] ring-1 ring-[#C5A059]'
                      : 'bg-[#FFFFFF] text-[#78716C] border-[#F0ECE1] hover:border-[#C5A059]/60'
                  }`}
                >
                  <span>{option}</span>
                  {selected && <span className="text-[#C5A059] font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Hardware Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-2.5">
            3. Hardware & Stylus Setup:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {hardwareOptions.map((option) => {
              const selected = formData.hardware === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData({ ...formData, hardware: option })}
                  className={`px-3 py-2.5 text-xs sm:text-sm font-medium transition-all text-left border flex items-center justify-between cursor-pointer ${
                    selected
                      ? 'bg-[#FAF7F2] text-[#1C1917] border-[#C5A059] ring-1 ring-[#C5A059]'
                      : 'bg-[#FFFFFF] text-[#78716C] border-[#F0ECE1] hover:border-[#C5A059]/60'
                  }`}
                >
                  <span className="truncate">{option}</span>
                  {selected && <span className="text-[#C5A059] font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 4: Name & WhatsApp Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Radhika Kapoor"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full px-4 py-2.5 bg-[#FAF7F2] border text-sm font-sans focus:outline-none focus:border-[#C5A059] transition-colors ${
                errors.fullName ? 'border-red-500' : 'border-[#F0ECE1]'
              }`}
            />
            {errors.fullName && (
              <span className="text-xs text-red-500 mt-1 block">{errors.fullName}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-1.5">
              WhatsApp Number *
            </label>
            <div className="flex">
              <select
                value={formData.countryCode}
                onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                className="bg-[#F0ECE1] border border-r-0 border-[#F0ECE1] px-2.5 py-2.5 text-xs font-mono text-[#1C1917] focus:outline-none"
              >
                <option value="+91">🇮🇳 +91 (IN)</option>
                <option value="+1">🇺🇸 +1 (US/CA)</option>
                <option value="+44">🇬🇧 +44 (UK)</option>
                <option value="+971">🇦🇪 +971 (UAE)</option>
                <option value="+61">🇦🇺 +61 (AU)</option>
                <option value="+65">🇸🇬 +65 (SG)</option>
                <option value="+49">🇩🇪 +49 (DE)</option>
              </select>
              <input
                type="tel"
                placeholder="9876543210"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className={`w-full px-4 py-2.5 bg-[#FAF7F2] border text-sm font-sans focus:outline-none focus:border-[#C5A059] transition-colors ${
                  errors.whatsappNumber ? 'border-red-500' : 'border-[#F0ECE1]'
                }`}
              />
            </div>
            {errors.whatsappNumber && (
              <span className="text-xs text-red-500 mt-1 block">{errors.whatsappNumber}</span>
            )}
          </div>
        </div>

        {/* Optional Notes */}
        {!isCompact && (
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5">
              Specific Goals or Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Tell us what you want to create, questions on brush packs, or timeline..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#F0ECE1] text-sm font-sans focus:outline-none focus:border-[#C5A059] transition-colors"
            />
          </div>
        )}

        {/* Submit Action */}
        <div className="pt-2">
          <AtelierButton
            type="submit"
            variant="whatsapp"
            size="lg"
            className="w-full justify-center text-sm sm:text-base py-3.5 shadow-md group"
            icon={<MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />}
          >
            Continue on WhatsApp with My Preferences
          </AtelierButton>
          <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-[#78716C]">
            <span>🔒 Direct studio link</span>
            <span>•</span>
            <span>Formatted wa.me message auto-generated</span>
            <span>•</span>
            <span>No spam guaranteed</span>
          </div>
        </div>

        {isSubmitted && (
          <div className="p-3 bg-[#FAF7F2] border border-[#C5A059]/50 text-xs text-[#1C1917] flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>Preferences saved! WhatsApp is opening with your formatted inquiry.</span>
          </div>
        )}
      </form>
    </div>
  );
};

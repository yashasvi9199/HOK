import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, CheckCircle2, Sparkles, Shield, ChevronDown, ChevronUp } from 'lucide-react';
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
    consentAccepted: false,
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    whatsappNumber?: string;
    consentAccepted?: string;
  }>({});
  const [showNoticeSummary, setShowNoticeSummary] = useState(false);
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

  // ? Enforce zero-trust validation via Zod schema including DPDP consent
  const validate = (): boolean => {
    try {
      const result = leadFormSchema.safeParse(formData);
      if (!result.success) {
        const fieldErrors: {
          fullName?: string;
          whatsappNumber?: string;
          consentAccepted?: string;
        } = {};
        for (const issue of result.error.issues) {
          if (issue.path[0] === 'fullName') {
            fieldErrors.fullName = issue.message;
          } else if (issue.path[0] === 'whatsappNumber') {
            fieldErrors.whatsappNumber = issue.message;
          } else if (issue.path[0] === 'consentAccepted') {
            fieldErrors.consentAccepted = issue.message;
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

        {/* Step 5: Statutory DPDP Act 2023 Consent Checkbox & Notice */}
        <div className="pt-3 border-t border-[#F0ECE1] space-y-2.5">
          <div className="flex items-start gap-3">
            <input
              id="dpdp-consent-checkbox"
              type="checkbox"
              checked={formData.consentAccepted}
              onChange={(e) => {
                const checked = e.target.checked;
                setFormData({
                  ...formData,
                  consentAccepted: checked,
                  consentTimestamp: checked ? new Date().toISOString() : undefined,
                });
                if (checked) {
                  setErrors((prev) => ({ ...prev, consentAccepted: undefined }));
                }
              }}
              className="mt-0.5 w-4 h-4 rounded-xs border-[#C5A059] text-[#C5A059] focus:ring-[#C5A059] cursor-pointer shrink-0 accent-[#C5A059]"
            />
            <label
              htmlFor="dpdp-consent-checkbox"
              className="text-xs font-sans text-[#1C1917] leading-relaxed cursor-pointer select-none"
            >
              I consent to House of Kalakaar collecting and processing my name, phone number, and artistic preferences to contact me via WhatsApp or phone regarding masterclass admissions and atelier services, in accordance with the{' '}
              <Link to="/privacy" className="text-[#C5A059] font-medium underline hover:text-[#1C1917] transition-colors">
                Privacy Notice
              </Link>{' '}
              and{' '}
              <Link to="/terms" className="text-[#C5A059] font-medium underline hover:text-[#1C1917] transition-colors">
                Terms & Conditions
              </Link>{' '}
              pursuant to India's DPDP Act, 2023. I understand I may withdraw this consent at any time. *
            </label>
          </div>

          {errors.consentAccepted && (
            <div className="text-xs text-red-500 font-medium pl-7 animate-in fade-in">
              {errors.consentAccepted}
            </div>
          )}

          {/* Collapsible DPDP Statutory Notice Summary */}
          <div className="pl-7">
            <button
              type="button"
              onClick={() => setShowNoticeSummary(!showNoticeSummary)}
              className="inline-flex items-center gap-1.5 text-[11px] font-sans text-[#78716C] hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{showNoticeSummary ? 'Hide DPDP Notice Details' : 'View DPDP Section 5 Notice Summary'}</span>
              {showNoticeSummary ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showNoticeSummary && (
              <div className="mt-2 p-3 bg-[#FAF7F2] border border-[#F0ECE1] text-[11px] font-sans text-[#78716C] space-y-1.5 animate-in fade-in">
                <p>
                  <strong>Data Fiduciary:</strong> House of Kalakaar by Vrinda Haldia, Jaipur, Rajasthan, India.
                </p>
                <p>
                  <strong>Specified Purpose:</strong> Evaluating student readiness, coordinating cohorts, and providing tailored consultation.
                </p>
                <p>
                  <strong>Rights & Withdrawal:</strong> Exercise rights to access, correction, erasure, or withdraw consent at any time via <a href="mailto:privacy@houseofkalakaar.com" className="text-[#C5A059] underline">privacy@houseofkalakaar.com</a>.
                </p>
                <p>
                  <strong>Appeals:</strong> Redressal through our Grievance Officer, with escalation rights to the Data Protection Board of India.
                </p>
              </div>
            )}
          </div>
        </div>

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

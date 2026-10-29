import React, { useState } from 'react';
import { MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LeadFormData, LeadIntent, SkillLevel, HardwareStatus } from '../types';
import { useWhatsAppRedirect } from '../hooks/useWhatsAppRedirect';
import { AtelierButton } from './AtelierButton';

interface LeadCaptureFormProps {
  className?: string;
  isCompact?: boolean;
}

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

  const intentOptions: LeadIntent[] = [
    'Learn Digital Art',
    'Commission Illustration',
    'Brand Collaboration',
  ];

  const skillOptions: SkillLevel[] = [
    'Absolute Beginner',
    'Intermediate',
    'Traditional Artist going Digital',
  ];

  const hardwareOptions: HardwareStatus[] = [
    'Have iPad & Apple Pencil',
    'Planning to get one',
    'Other Tablet (Galaxy/Wacom)',
  ];

  const validate = () => {
    const newErrors: { fullName?: string; whatsappNumber?: string } = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your name';
    }
    const cleanPhone = formData.whatsappNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      newErrors.whatsappNumber = 'Please enter a valid phone/WhatsApp number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#a33533', '#ece7d5', '#806055', '#30292a'],
      });
    } catch {
      // safe fallback
    }

    setIsSubmitted(true);
    submitLeadToWhatsApp(formData);
  };

  return (
    <div
      id="lead-capture-form"
      className={`bg-[#30292a] text-[#ece7d5] border border-[#ece7d5]/25 shadow-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden ${className}`}
    >
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#a33533]" />
          <span className="text-[11px] font-sans tracking-[0.22em] uppercase font-semibold text-[#ece7d5]/80">
            Direct Atelier Inquiry
          </span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#ece7d5] font-semibold tracking-tight">
          Begin Your Journey at House of Kalakaar
        </h3>
        <p className="text-sm font-sans text-[#ece7d5]/75 mt-2">
          Select your creative focus and hardware profile to connect directly with Vrinda Haldia and the studio admissions team via WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Creative Intent Tags */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#ece7d5] mb-2.5">
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
                      ? 'bg-[#a33533] text-[#ece7d5] border-[#a33533] shadow-xs'
                      : 'bg-[#837d75]/25 text-[#ece7d5] border-[#ece7d5]/20 hover:border-[#ece7d5]'
                  }`}
                >
                  <span>{option}</span>
                  {selected && <CheckCircle2 className="w-4 h-4 text-[#ece7d5]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Skill Level Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#ece7d5] mb-2.5">
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
                      ? 'bg-[#806055] text-[#ece7d5] border-[#ece7d5]'
                      : 'bg-[#30292a] text-[#ece7d5]/75 border-[#ece7d5]/20 hover:border-[#ece7d5]/60'
                  }`}
                >
                  <span>{option}</span>
                  {selected && <span className="text-[#ece7d5] font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Hardware Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#ece7d5] mb-2.5">
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
                      ? 'bg-[#806055] text-[#ece7d5] border-[#ece7d5]'
                      : 'bg-[#30292a] text-[#ece7d5]/75 border-[#ece7d5]/20 hover:border-[#ece7d5]/60'
                  }`}
                >
                  <span className="truncate">{option}</span>
                  {selected && <span className="text-[#ece7d5] font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 4: Name & WhatsApp Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#ece7d5] mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Radhika Kapoor"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full px-4 py-2.5 bg-[#837d75]/20 border text-sm font-sans text-[#ece7d5] placeholder:text-[#ece7d5]/40 focus:outline-none focus:border-[#a33533] transition-colors ${
                errors.fullName ? 'border-[#a33533]' : 'border-[#ece7d5]/25'
              }`}
            />
            {errors.fullName && (
              <span className="text-xs text-[#a33533] mt-1 block">{errors.fullName}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#ece7d5] mb-1.5">
              WhatsApp Number *
            </label>
            <div className="flex">
              <select
                value={formData.countryCode}
                onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                className="bg-[#806055] border border-r-0 border-[#ece7d5]/25 px-2.5 py-2.5 text-xs font-mono text-[#ece7d5] focus:outline-none"
              >
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US/CA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+971">+971 (UAE)</option>
                <option value="+61">+61 (AU)</option>
                <option value="+65">+65 (SG)</option>
                <option value="+49">+49 (DE)</option>
              </select>
              <input
                type="tel"
                placeholder="9876543210"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className={`w-full px-4 py-2.5 bg-[#837d75]/20 border text-sm font-sans text-[#ece7d5] placeholder:text-[#ece7d5]/40 focus:outline-none focus:border-[#a33533] transition-colors ${
                  errors.whatsappNumber ? 'border-[#a33533]' : 'border-[#ece7d5]/25'
                }`}
              />
            </div>
            {errors.whatsappNumber && (
              <span className="text-xs text-[#a33533] mt-1 block">{errors.whatsappNumber}</span>
            )}
          </div>
        </div>

        {/* Optional Notes */}
        {!isCompact && (
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#ece7d5]/80 mb-1.5">
              Specific Goals or Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Tell us what you want to create, questions on brush packs, or timeline..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#837d75]/20 border border-[#ece7d5]/25 text-sm font-sans text-[#ece7d5] placeholder:text-[#ece7d5]/40 focus:outline-none focus:border-[#a33533] transition-colors"
            />
          </div>
        )}

        {/* Submit Action */}
        <div className="pt-2">
          <AtelierButton
            type="submit"
            variant="primary"
            size="lg"
            className="w-full justify-center text-sm sm:text-base py-3.5 shadow-md group"
            icon={<MessageCircle className="w-5 h-5" />}
          >
            Continue on WhatsApp with My Preferences
          </AtelierButton>
          <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-[#ece7d5]/70">
            <span>Direct studio link</span>
            <span>·</span>
            <span>Formatted wa.me message auto-generated</span>
          </div>
        </div>

        {isSubmitted && (
          <div className="p-3 bg-[#806055]/40 border border-[#ece7d5]/30 text-xs text-[#ece7d5] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#ece7d5] shrink-0" />
            <span>Preferences saved! WhatsApp is opening with your formatted inquiry.</span>
          </div>
        )}
      </form>
    </div>
  );
};

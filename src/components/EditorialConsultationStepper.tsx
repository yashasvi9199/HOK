import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, ArrowRight, ArrowLeft, Check, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import consultationData from '../data/consultation.json';
import { AtelierButton } from './AtelierButton';
import { useWhatsAppRedirect } from '../hooks/useWhatsAppRedirect';

export const EditorialConsultationStepper: React.FC = () => {
  const { submitLeadToWhatsApp } = useWhatsAppRedirect();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedFocus, setSelectedFocus] = useState<string>('focus-couture');
  const [selectedExp, setSelectedExp] = useState<string>('exp-beginner');
  const [selectedHardware, setSelectedHardware] = useState<string>('hw-ready');
  const [fullName, setFullName] = useState<string>('');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+91');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const focusOptions = consultationData.steps[0].options || [];
  const expOptions = consultationData.steps[1].options || [];
  const hwOptions = consultationData.steps[2].options || [];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    const cleanPhone = whatsappNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      setErrorMsg('Please enter a valid WhatsApp phone number');
      return;
    }
    setErrorMsg('');

    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#a33533', '#ece7d5', '#806055', '#d4b483'],
      });
    } catch {
      // safe fallback
    }

    setIsCompleted(true);

    const focusLabel =
      focusOptions.find((o) => o.id === selectedFocus)?.label || selectedFocus;
    const expLabel = expOptions.find((o) => o.id === selectedExp)?.label || selectedExp;
    const hwLabel = hwOptions.find((o) => o.id === selectedHardware)?.label || selectedHardware;

    submitLeadToWhatsApp({
      fullName,
      whatsappNumber,
      countryCode,
      intent: focusLabel as any,
      skillLevel: expLabel as any,
      hardware: hwLabel as any,
      notes: 'Submitted via Editorial Consultation Stepper',
    });
  };

  return (
    <section
      id="consultation-section"
      className="py-24 md:py-32 bg-[#837d75] text-[#ece7d5] relative overflow-hidden border-t border-[#ece7d5]/15 select-none"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Banner Notice */}
        <div className="mb-6 p-3 bg-[#30292a] border border-[#a33533] text-center text-xs font-sans tracking-widest uppercase text-[#ece7d5] flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#a33533]" />
          <span>{consultationData.cohortBanner}</span>
        </div>

        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="text-xs font-sans tracking-[0.25em] uppercase font-semibold text-[#a33533] mb-2">
            {consultationData.sectionKicker}
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#ece7d5] tracking-tight">
            {consultationData.sectionTitle}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#ece7d5]/85 mt-2.5 max-w-xl mx-auto">
            {consultationData.sectionSubtitle}
          </p>
        </div>

        {/* Stepper Card Container */}
        <div className="bg-[#30292a] border-2 border-[#ece7d5]/25 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#ece7d5]/20">
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono transition-all ${
                    currentStep === stepNum
                      ? 'bg-[#a33533] text-[#ece7d5] font-bold ring-2 ring-[#ece7d5]/40'
                      : currentStep > stepNum
                      ? 'bg-[#806055] text-[#ece7d5]'
                      : 'bg-[#1a1718] text-[#ece7d5]/40'
                  }`}
                >
                  {currentStep > stepNum ? '✓' : stepNum}
                </div>
              ))}
            </div>

            <span className="text-xs font-mono uppercase tracking-wider text-[#ece7d5]/75">
              Step {currentStep} of 4: {consultationData.steps[currentStep - 1].title}
            </span>
          </div>

          {/* Stepper Step Panels */}
          <AnimatePresence mode="wait">
            {/* STEP 1: Creative Focus */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl text-[#ece7d5] font-medium">
                    {consultationData.steps[0].question}
                  </h3>
                  <p className="text-xs font-sans text-[#ece7d5]/70 mt-1">
                    Select the signature direction you wish to master.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {focusOptions.map((opt) => {
                    const isSelected = selectedFocus === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedFocus(opt.id)}
                        className={`p-4 border text-left flex items-start justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#806055] border-[#ece7d5] text-[#ece7d5] shadow-lg ring-1 ring-[#ece7d5]'
                            : 'bg-[#1e191a] border-[#ece7d5]/20 text-[#ece7d5]/80 hover:border-[#ece7d5]/60'
                        }`}
                      >
                        <div>
                          <div className="font-serif text-lg font-semibold text-[#ece7d5]">
                            {opt.label}
                          </div>
                          <p className="text-xs font-sans text-[#ece7d5]/80 mt-1">
                            {opt.desc}
                          </p>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-[#ece7d5] shrink-0 ml-3" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <AtelierButton
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                    onClick={handleNext}
                  >
                    Continue to Experience Profile
                  </AtelierButton>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Experience Profile */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl text-[#ece7d5] font-medium">
                    {consultationData.steps[1].question}
                  </h3>
                  <p className="text-xs font-sans text-[#ece7d5]/70 mt-1">
                    We tailor curriculum pacing to your exact background.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {expOptions.map((opt) => {
                    const isSelected = selectedExp === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedExp(opt.id)}
                        className={`p-4 border text-left flex items-start justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#806055] border-[#ece7d5] text-[#ece7d5] shadow-lg ring-1 ring-[#ece7d5]'
                            : 'bg-[#1e191a] border-[#ece7d5]/20 text-[#ece7d5]/80 hover:border-[#ece7d5]/60'
                        }`}
                      >
                        <div>
                          <div className="font-serif text-lg font-semibold text-[#ece7d5]">
                            {opt.label}
                          </div>
                          <p className="text-xs font-sans text-[#ece7d5]/80 mt-1">
                            {opt.desc}
                          </p>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-[#ece7d5] shrink-0 ml-3" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <AtelierButton
                    variant="outline"
                    size="md"
                    icon={<ArrowLeft className="w-4 h-4" />}
                    onClick={handleBack}
                  >
                    Back
                  </AtelierButton>
                  <AtelierButton
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                    onClick={handleNext}
                  >
                    Continue to Hardware Setup
                  </AtelierButton>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Hardware Setup */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl text-[#ece7d5] font-medium">
                    {consultationData.steps[2].question}
                  </h3>
                  <p className="text-xs font-sans text-[#ece7d5]/70 mt-1">
                    Helps us verify brushpack compatibility and canvas presets.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {hwOptions.map((opt) => {
                    const isSelected = selectedHardware === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedHardware(opt.id)}
                        className={`p-4 border text-left flex items-start justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#806055] border-[#ece7d5] text-[#ece7d5] shadow-lg ring-1 ring-[#ece7d5]'
                            : 'bg-[#1e191a] border-[#ece7d5]/20 text-[#ece7d5]/80 hover:border-[#ece7d5]/60'
                        }`}
                      >
                        <div>
                          <div className="font-serif text-lg font-semibold text-[#ece7d5]">
                            {opt.label}
                          </div>
                          <p className="text-xs font-sans text-[#ece7d5]/80 mt-1">
                            {opt.desc}
                          </p>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-[#ece7d5] shrink-0 ml-3" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <AtelierButton
                    variant="outline"
                    size="md"
                    icon={<ArrowLeft className="w-4 h-4" />}
                    onClick={handleBack}
                  >
                    Back
                  </AtelierButton>
                  <AtelierButton
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                    onClick={handleNext}
                  >
                    Final Step: Contact Details
                  </AtelierButton>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Atelier Contact & WhatsApp Launch */}
            {currentStep === 4 && (
              <motion.form
                key="step-4"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl text-[#ece7d5] font-medium">
                    {consultationData.steps[3].question}
                  </h3>
                  <p className="text-xs font-sans text-[#ece7d5]/70 mt-1">
                    Vrinda will review your artistic profile and send your cohort admissions packet.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-[#ece7d5] mb-1.5">
                      {consultationData.steps[3].nameLabel}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Radhika Kapoor"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1e191a] border border-[#ece7d5]/25 text-sm font-sans text-[#ece7d5] focus:outline-none focus:border-[#a33533] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-[#ece7d5] mb-1.5">
                      {consultationData.steps[3].phoneLabel}
                    </label>
                    <div className="flex">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-[#806055] border border-r-0 border-[#ece7d5]/25 px-2.5 py-3 text-xs font-mono text-[#ece7d5] focus:outline-none"
                      >
                        <option value="+91">+91 (IN)</option>
                        <option value="+1">+1 (US/CA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+971">+971 (UAE)</option>
                        <option value="+61">+61 (AU)</option>
                        <option value="+65">+65 (SG)</option>
                      </select>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1e191a] border border-[#ece7d5]/25 text-sm font-sans text-[#ece7d5] focus:outline-none focus:border-[#a33533] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {errorMsg && (
                  <div className="text-xs font-sans text-[#a33533] bg-[#a33533]/20 border border-[#a33533] p-2.5">
                    {errorMsg}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4">
                  <AtelierButton
                    type="button"
                    variant="outline"
                    size="md"
                    icon={<ArrowLeft className="w-4 h-4" />}
                    onClick={handleBack}
                  >
                    Back
                  </AtelierButton>
                  <AtelierButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={<MessageCircle className="w-4 h-4" />}
                  >
                    {consultationData.steps[3].cta}
                  </AtelierButton>
                </div>

                {isCompleted && (
                  <div className="p-3 bg-[#806055]/50 border border-[#ece7d5]/40 text-xs text-[#ece7d5] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ece7d5] shrink-0" />
                    <span>Application formatted! Launching direct WhatsApp chat with Vrinda Haldia...</span>
                  </div>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

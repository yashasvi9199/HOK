import React from 'react';
import { Mail, MessageCircle, MapPin, Instagram, Youtube, Sparkles, Clock, Globe } from 'lucide-react';
import { AtelierButton } from '../../components/AtelierButton';
import { LeadCaptureForm } from '../../components/LeadCaptureForm';
import { useWhatsAppRedirect, STUDIO_INSTAGRAM_URL, STUDIO_YOUTUBE_URL } from '../../hooks/useWhatsAppRedirect';

export const ContactPage: React.FC = () => {
  const { openDirectWhatsApp } = useWhatsAppRedirect();

  return (
    <div className="py-12 md:py-20 animate-in fade-in duration-300">
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto px-5 mb-12 sm:mb-16 text-center">
        <div className="inline-flex items-center gap-2 mb-3 bg-[#FAF7F2] border border-[#C5A059]/40 px-3.5 py-1">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase font-semibold text-[#1C1917]">
            The Studio Parlour
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#1C1917] tracking-tight mb-4">
          Connect with the Atelier
        </h1>
        <p className="text-base sm:text-lg font-sans text-[#78716C] leading-relaxed max-w-2xl mx-auto">
          Whether you seek tailored Procreate mentorship, bespoke bridal artwork commissions, or brand collaborations — we welcome your creative vision.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Studio Contact Information & Atelier Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#FFFFFF] border border-[#F0ECE1] p-8 shadow-xs">
              <h3 className="font-serif text-2xl font-semibold text-[#1C1917] mb-6">
                Studio Coordinates
              </h3>

              <div className="space-y-6 text-sm font-sans">
                {/* Physical Atelier */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1C1917]">The Jaipur Atelier</h4>
                    <p className="text-[#78716C] mt-0.5">
                      Civil Lines, C-Scheme Arts Enclave<br />
                      Jaipur, Rajasthan 302006, India
                    </p>
                    <span className="text-xs text-[#C5A059] block mt-1">
                      Private in-person visits by prior appointment only
                    </span>
                  </div>
                </div>

                {/* Direct WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059]">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1C1917]">Direct Atelier WhatsApp</h4>
                    <p className="text-[#78716C] mt-0.5">
                      +91 98765 43210 (Studio Admissions & Commissions)
                    </p>
                    <button
                      onClick={() => openDirectWhatsApp()}
                      className="text-xs text-[#128C7E] font-medium hover:underline block mt-1 cursor-pointer"
                    >
                      Click to start instant WhatsApp chat →
                    </button>
                  </div>
                </div>

                {/* Email Inquiries */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1C1917]">Curatorial & Brand Email</h4>
                    <a
                      href="mailto:curator@houseofkalakaar.com"
                      className="text-[#78716C] hover:text-[#C5A059] transition-colors mt-0.5 block"
                    >
                      curator@houseofkalakaar.com
                    </a>
                  </div>
                </div>

                {/* Studio Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1C1917]">Atelier Office Hours</h4>
                    <p className="text-[#78716C] mt-0.5">
                      Monday – Saturday: 10:00 AM – 7:00 PM IST<br />
                      Sunday: Masterclass cohorts in session
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-[#F0ECE1]">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#78716C] block mb-3">
                  Follow Our Process
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={STUDIO_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-[#FAF7F2] border border-[#F0ECE1] hover:border-[#C5A059] text-xs font-sans text-[#1C1917] transition-all"
                  >
                    <Instagram className="w-4 h-4 text-[#C5A059]" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={STUDIO_YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-[#FAF7F2] border border-[#F0ECE1] hover:border-[#C5A059] text-xs font-sans text-[#1C1917] transition-all"
                  >
                    <Youtube className="w-4 h-4 text-red-600" />
                    <span>YouTube Tutorials</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="p-6 bg-[#F5EFEB] border-l-2 border-[#C5A059]">
              <p className="font-serif italic text-base text-[#1C1917] leading-relaxed">
                "Digital tools never replace the soul of an artist; they expand the reach of our brushstrokes."
              </p>
              <span className="text-xs font-sans text-[#78716C] mt-2 block font-medium">
                — Vrinda Haldia, Founder
              </span>
            </div>
          </div>

          {/* Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <LeadCaptureForm />
          </div>
        </div>
      </div>
    </div>
  );
};

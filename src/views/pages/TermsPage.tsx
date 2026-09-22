import React from 'react';
import { Shield, Sparkles, Scale, FileText, CheckCircle2, AlertCircle, ArrowLeft, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AtelierButton } from '../../components/AtelierButton';
import { useWhatsAppRedirect } from '../../hooks/useWhatsAppRedirect';

// * Legally compliant Terms & Conditions for House of Kalakaar Atelier
export const TermsPage: React.FC = () => {
  const { openDirectWhatsApp } = useWhatsAppRedirect();
  const lastUpdated = 'September 22, 2026';

  return (
    <div className="py-12 md:py-20 animate-in fade-in duration-300">
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto px-5 mb-12 sm:mb-16 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-sans text-[#78716C] hover:text-[#1C1917] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Atelier Home</span>
        </Link>

        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="inline-flex items-center gap-2 bg-[#FAF7F2] border border-[#C5A059]/40 px-3.5 py-1">
            <Scale className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[11px] font-sans tracking-[0.25em] uppercase font-semibold text-[#1C1917]">
              Legal Governance & Contracts
            </span>
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#1C1917] tracking-tight mb-4">
          Terms & Conditions of Service
        </h1>
        <p className="text-sm sm:text-base font-sans text-[#78716C] max-w-2xl mx-auto leading-relaxed">
          Please review the binding agreement governing enrollment in House of Kalakaar masterclasses, custom artwork commissions, and proprietary digital atelier assets.
        </p>
        <div className="mt-4 text-xs font-mono text-[#C5A059]">
          Effective Date: {lastUpdated} • Version 2.4 (Republic of India)
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="bg-[#FFFFFF] border border-[#F0ECE1] shadow-xs p-6 sm:p-10 md:p-12 space-y-12">
          {/* Executive Overview Banner */}
          <div className="bg-[#FAF7F2] border-l-2 border-[#C5A059] p-5 text-sm font-sans text-[#1C1917] leading-relaxed">
            <p className="font-semibold text-xs tracking-wider uppercase text-[#C5A059] mb-1">
              Atelier Commitment
            </p>
            Welcome to House of Kalakaar ("Atelier", "we", "us", or "our"), founded and curated by Vrinda Haldia. By accessing our website, enrolling in Procreate masterclasses, purchasing custom brush libraries, or commissioning artwork, you ("Client", "Student", or "User") agree to be bound by these Terms and our companion <Link to="/privacy" className="text-[#C5A059] font-medium underline">Privacy Policy</Link>.
          </div>

          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">01.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Scope of Atelier Services & Educational Programs
              </h2>
            </div>
            <div className="text-sm font-sans text-[#78716C] leading-relaxed space-y-3">
              <p>
                House of Kalakaar delivers specialized digital fashion illustration instruction, Procreate mentorship cohorts, bespoke couture rendering commissions, and proprietary digital asset distributions (custom brushes, color palettes, and process guides).
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#1C1917]">
                <li>
                  <strong>Cohort Formats:</strong> Masterclass cohorts are capped at designated cohort capacities (e.g., 20 atelier seats) to maintain uncompromised critique rigor.
                </li>
                <li>
                  <strong>Technical Requirements:</strong> Students are solely responsible for ensuring access to an Apple iPad compatible with Apple Pencil and a licensed copy of the Procreate® software application.
                </li>
                <li>
                  <strong>Non-Accreditation:</strong> Programs provided by the Atelier are private artistic mentorship masterclasses and do not represent formal university degrees or statutory diplomas.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">02.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Intellectual Property & Proprietary Brush Systems
              </h2>
            </div>
            <div className="text-sm font-sans text-[#78716C] leading-relaxed space-y-3">
              <p>
                All course curriculum materials, bespoke brush engine presets (<span className="font-mono text-xs">.brushset</span>), color swatches, video demonstrations, croquis templates, and editorial writings remain the exclusive intellectual property of Vrinda Haldia and House of Kalakaar, safeguarded under the Indian Copyright Act, 1957.
              </p>
              <div className="p-4 bg-[#FAF7F2] border border-[#F0ECE1] rounded-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
                  <AlertCircle className="w-4 h-4 text-[#C5A059]" />
                  <span>Prohibited Commercial Infringements:</span>
                </div>
                <p className="text-xs text-[#78716C]">
                  You are granted a single-user, non-exclusive, non-transferable revocable license for personal artistic practice. You may <strong>NOT</strong> resell, repackage, sub-license, upload to public torrents, or distribute our proprietary brush libraries or masterclass recordings in part or whole.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">03.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Commissioned Artworks & Commercial Licensing
              </h2>
            </div>
            <div className="text-sm font-sans text-[#78716C] leading-relaxed space-y-3">
              <p>
                For private bridal portraits, editorial fashion renderings, or corporate branding commissions:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#1C1917]">
                <li>
                  <strong>Scope Document:</strong> All bespoke commissions require formal execution of an Artwork Specification Sheet detailing resolution, deliverables, layer files, and delivery milestones.
                </li>
                <li>
                  <strong>Licensing:</strong> Unless exclusive commercial buyout rights are explicitly contracted in writing, House of Kalakaar retains the right to display artwork iterations in our studio portfolio, social channels, and retrospective publications.
                </li>
                <li>
                  <strong>Revisions:</strong> Standard commissions include up to two (2) complimentary revision rounds at pencil sketch / flat wash stages. Structural changes post-final rendering incur hourly atelier fees.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">04.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Enrollment, Seat Reservation & Refund Policy
              </h2>
            </div>
            <div className="text-sm font-sans text-[#78716C] leading-relaxed space-y-3">
              <p>
                Given that our signature cohorts are strictly capped at 20 seats with personalized review of each student's progress:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#1C1917]">
                <li>
                  <strong>Non-Refundable Seat Booking:</strong> Cohort seat reservations and tuition deposits are non-refundable once enrollment is confirmed.
                </li>
                <li>
                  <strong>Cohort Transfer:</strong> If genuine emergency circumstances prevent participation, students may request a one-time transfer to a subsequent cohort, provided written notice is received at least seven (7) business days prior to cohort commencement.
                </li>
                <li>
                  <strong>Digital Downloads:</strong> Digital asset bundles, brushes, and instant-access download packs are strictly non-refundable once license keys or files are accessed.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">05.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Atelier Community Code of Conduct
              </h2>
            </div>
            <div className="text-sm font-sans text-[#78716C] leading-relaxed space-y-2">
              <p>
                House of Kalakaar fosters a supportive, respectful sanctuary for artistic growth. We uphold zero tolerance for harassment, derogatory language, intellectual property theft of fellow students' work, or unauthorized commercial spamming within studio group chats or critique channels. Breach of this code warrants immediate expulsion without refund.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">06.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Limitation of Liability & Warranty Disclaimer
              </h2>
            </div>
            <div className="text-sm font-sans text-[#78716C] leading-relaxed space-y-3">
              <p>
                Services, digital tools, and courses are provided on an "as is" and "as available" basis. House of Kalakaar disclaims all implied warranties of merchantability or fitness for a specific commercial outcome. In no event shall our total aggregate liability exceed the actual fee paid by you for the specific service under dispute.
              </p>
              <p className="text-xs text-[#78716C]">
                Procreate® is a registered trademark of Savage Interactive Pty Ltd. House of Kalakaar operates as an independent atelier and is not formally affiliated with or endorsed by Apple Inc. or Savage Interactive.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">07.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Governing Law & Exclusive Jurisdiction
              </h2>
            </div>
            <div className="text-sm font-sans text-[#78716C] leading-relaxed space-y-2">
              <p>
                These Terms shall be interpreted and governed exclusively in accordance with the substantive laws of the Republic of India. Any disputes, claims, or controversies arising out of or relating to these Terms or Atelier services shall be submitted to the exclusive jurisdiction of the competent civil courts situated at <strong>Jaipur, Rajasthan, India</strong>.
              </p>
            </div>
          </section>

          {/* Section 8: Studio Coordinates & Official Contact */}
          <section className="space-y-4 pt-4 border-t border-[#F0ECE1]">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
              Atelier Legal & Curatorial Inquiries
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-[#78716C]">
              <div className="p-4 bg-[#FAF7F2] border border-[#F0ECE1] space-y-1">
                <div className="flex items-center gap-2 font-semibold text-[#1C1917] mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Verified Physical Atelier:</span>
                </div>
                <p>House of Kalakaar by Vrinda Haldia</p>
                <p>Civil Lines, C-Scheme Arts Enclave</p>
                <p>Jaipur, Rajasthan 302006, India</p>
              </div>

              <div className="p-4 bg-[#FAF7F2] border border-[#F0ECE1] space-y-1">
                <div className="flex items-center gap-2 font-semibold text-[#1C1917] mb-1">
                  <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Direct Communication:</span>
                </div>
                <p>
                  Legal & Admissions:{' '}
                  <a href="mailto:curator@houseofkalakaar.com" className="text-[#C5A059] underline">
                    curator@houseofkalakaar.com
                  </a>
                </p>
                <p>
                  Privacy Officer:{' '}
                  <a href="mailto:privacy@houseofkalakaar.com" className="text-[#C5A059] underline">
                    privacy@houseofkalakaar.com
                  </a>
                </p>
                <p>Official Desk: +91 98765 43210</p>
              </div>
            </div>
          </section>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#F0ECE1] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/privacy">
              <AtelierButton variant="outline" size="sm">
                View DPDP Privacy Policy →
              </AtelierButton>
            </Link>

            <AtelierButton
              variant="whatsapp"
              size="sm"
              onClick={() => openDirectWhatsApp('Hello Vrinda, I have a question regarding House of Kalakaar terms and enrollment.')}
            >
              Contact Atelier on WhatsApp
            </AtelierButton>
          </div>
        </div>
      </div>
    </div>
  );
};

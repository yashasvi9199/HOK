import React from 'react';
import { Shield, Sparkles, Lock, Eye, RefreshCw, UserCheck, AlertTriangle, ArrowLeft, Mail, MapPin, Phone, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AtelierButton } from '../../components/AtelierButton';
import { useWhatsAppRedirect } from '../../hooks/useWhatsAppRedirect';

// * Full statutory DPDP Act 2023 Privacy Notice & Policy for House of Kalakaar Atelier
export const PrivacyPage: React.FC = () => {
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
            <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[11px] font-sans tracking-[0.25em] uppercase font-semibold text-[#1C1917]">
              DPDP Act 2023 Statutory Notice
            </span>
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#1C1917] tracking-tight mb-4">
          Digital Personal Data Privacy Notice
        </h1>
        <p className="text-sm sm:text-base font-sans text-[#78716C] max-w-2xl mx-auto leading-relaxed">
          Formulated pursuant to Section 5 of India's <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>. Learn how House of Kalakaar safeguards your digital identity with reverence.
        </p>
        <div className="mt-4 text-xs font-mono text-[#C5A059]">
          Notice Version: 2.1 • Statutory Jurisdiction: Republic of India • Effective: {lastUpdated}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="bg-[#FFFFFF] border border-[#F0ECE1] shadow-xs p-6 sm:p-10 md:p-12 space-y-12">
          {/* Statutory Plain-Language Notice Summary Box */}
          <div className="bg-[#FAF7F2] border-2 border-[#C5A059]/40 p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                Notice to Data Principals (Summary)
              </h3>
            </div>
            <p className="text-sm font-sans text-[#78716C] leading-relaxed">
              Under Section 5 of the DPDP Act 2023, you ("Data Principal") are entitled to clear notice before providing consent. We collect solely your name, phone number, and creative preferences to process masterclass admissions, consult on art commissions, and coordinate via WhatsApp. We never sell your data. You may withdraw consent at any time as easily as you granted it.
            </p>
          </div>

          {/* Section 1: Data Fiduciary Identity */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">01.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Identity of the Data Fiduciary
              </h2>
            </div>
            <div className="text-sm font-sans text-[#78716C] leading-relaxed space-y-2">
              <p>
                Under the DPDP Act 2023, the <strong>Data Fiduciary</strong> determining the purpose and means of your personal data processing is:
              </p>
              <div className="p-4 bg-[#FAF7F2] border border-[#F0ECE1] text-xs font-sans text-[#1C1917] space-y-1">
                <p className="font-semibold text-sm">House of Kalakaar (by Vrinda Haldia)</p>
                <p>Civil Lines, C-Scheme Arts Enclave, Jaipur, Rajasthan 302006, India</p>
                <p>Curatorial Email: curator@houseofkalakaar.com</p>
                <p>Data Protection Point of Contact: privacy@houseofkalakaar.com</p>
              </div>
            </div>
          </section>

          {/* Section 2: Personal Data Collected & Purpose */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">02.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Categories of Data Collected & Specified Purposes
              </h2>
            </div>
            <div className="text-sm font-sans text-[#78716C] leading-relaxed space-y-4">
              <p>
                In strict adherence to the DPDP Act principles of <strong>Purpose Limitation</strong> and <strong>Data Minimization</strong>, we collect only data necessary for your creative inquiries:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border border-[#F0ECE1]">
                  <thead className="bg-[#FAF7F2] text-[#1C1917] font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3 border-b border-[#F0ECE1]">Data Field</th>
                      <th className="p-3 border-b border-[#F0ECE1]">Specified Purpose</th>
                      <th className="p-3 border-b border-[#F0ECE1]">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0ECE1] text-[#78716C]">
                    <tr>
                      <td className="p-3 font-semibold text-[#1C1917]">Full Name</td>
                      <td className="p-3">Personalized mentorship address, student registration, certificate generation</td>
                      <td className="p-3 font-mono">Explicit Consent</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#1C1917]">WhatsApp Phone Number & Country Code</td>
                      <td className="p-3">Admissions communication, cohort scheduling, inquiry resolution via WhatsApp</td>
                      <td className="p-3 font-mono">Explicit Consent</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#1C1917]">Creative Intent, Skill & Hardware</td>
                      <td className="p-3">Evaluating student readiness, tailoring brush pack advice, preparing bespoke commission quotes</td>
                      <td className="p-3 font-mono">Explicit Consent</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#1C1917]">Optional Inquiry Notes</td>
                      <td className="p-3">Addressing bespoke requirements, wedding timelines, or collaborative proposals</td>
                      <td className="p-3 font-mono">Explicit Consent</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#1C1917]">Cookie & Viewport Preference</td>
                      <td className="p-3">Retaining consent state and providing responsive desktop/mobile layouts locally</td>
                      <td className="p-3 font-mono">Legitimate Use (Local)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 3: Consent Framework & Withdrawal */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">03.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Consent Mechanism & Your Right to Withdraw Consent
              </h2>
            </div>
            <div className="text-sm font-sans text-[#78716C] leading-relaxed space-y-3">
              <p>
                <strong>Unbundled Affirmative Action:</strong> Per Section 6 of the DPDP Act 2023, consent must be free, specific, informed, unconditional, and unambiguous. We enforce this through an active, un-ticked checkbox accompanied by clear notice before you submit any form on our platform.
              </p>
              <div className="p-4 bg-[#FAF7F2] border-l-2 border-[#C5A059] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-xs text-[#1C1917]">
                  <RefreshCw className="w-4 h-4 text-[#C5A059]" />
                  <span>Right to Withdraw Consent at Any Time (Section 6(4)):</span>
                </div>
                <p className="text-xs text-[#78716C]">
                  You may withdraw your consent at any time as easily as it was given. To withdraw consent, simply send an email with the subject "DPDP Consent Withdrawal" to{' '}
                  <a href="mailto:privacy@houseofkalakaar.com" className="text-[#C5A059] underline font-medium">
                    privacy@houseofkalakaar.com
                  </a>{' '}
                  or text our studio WhatsApp at <strong>+91 98765 43210</strong>. Upon receiving your request, we will cease processing your personal data within a reasonable period, except where retention is required by applicable law or active tax/accounting compliance.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Data Principal Rights */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">04.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Your Statutory Rights as a Data Principal (Chapter III)
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              {/* Right to Access */}
              <div className="p-4 bg-[#FAF7F2] border border-[#F0ECE1] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
                  <Eye className="w-4 h-4 text-[#C5A059]" />
                  <span>1. Right to Access Information (Sec 11)</span>
                </div>
                <p className="text-[#78716C]">
                  You have the right to obtain a summary of your personal data being processed by us and the identities of any processors with whom it has been shared.
                </p>
              </div>

              {/* Right to Correction and Erasure */}
              <div className="p-4 bg-[#FAF7F2] border border-[#F0ECE1] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                  <span>2. Right to Correction & Erasure (Sec 12)</span>
                </div>
                <p className="text-[#78716C]">
                  You have the right to request correction of inaccurate data, completion of incomplete data, updating, and erasure of personal data that is no longer necessary.
                </p>
              </div>

              {/* Right of Grievance Redressal */}
              <div className="p-4 bg-[#FAF7F2] border border-[#F0ECE1] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
                  <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                  <span>3. Right of Grievance Redressal (Sec 13)</span>
                </div>
                <p className="text-[#78716C]">
                  You have the right to readily available grievance redressal mechanisms from our designated Grievance Officer regarding any act or omission by the Atelier.
                </p>
              </div>

              {/* Right to Nominate */}
              <div className="p-4 bg-[#FAF7F2] border border-[#F0ECE1] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
                  <UserCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>4. Right to Nominate (Sec 14)</span>
                </div>
                <p className="text-[#78716C]">
                  You have the right to nominate any other individual who shall, in the event of your death or incapacity, exercise your Data Principal rights.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Grievance Officer & Data Protection Board of India */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">05.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Grievance Redressal Officer & Appeals to DPBI
              </h2>
            </div>
            <div className="text-sm font-sans text-[#78716C] leading-relaxed space-y-3">
              <p>
                In compliance with Section 8(9) and Section 12 of the DPDP Act 2023, House of Kalakaar has appointed a designated Grievance Redressal Officer to address all inquiries, concerns, or rights requests:
              </p>

              <div className="p-5 bg-[#FAF7F2] border border-[#C5A059]/40 space-y-2 text-xs font-sans text-[#1C1917]">
                <div className="font-semibold text-sm">Grievance Redressal Officer:</div>
                <p><strong>Designation:</strong> Lead Curator & Data Protection Officer</p>
                <p><strong>Entity:</strong> House of Kalakaar by Vrinda Haldia</p>
                <p><strong>Atelier Coordinates:</strong> Civil Lines, C-Scheme Arts Enclave, Jaipur, Rajasthan 302006, India</p>
                <p><strong>Email for Grievances:</strong> <a href="mailto:privacy@houseofkalakaar.com" className="text-[#C5A059] underline">privacy@houseofkalakaar.com</a></p>
                <p><strong>Direct Studio Telephone:</strong> +91 98765 43210</p>
                <p className="text-stone-500 italic mt-1">
                  Response SLA: We endeavor to address and resolve all grievances within thirty (30) days from formal receipt.
                </p>
              </div>

              <div className="p-4 bg-amber-50/50 border border-amber-200 text-xs text-[#1C1917] space-y-1">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Appellate Authority: Data Protection Board of India (DPBI)</span>
                </div>
                <p className="text-[#78716C]">
                  If you are unsatisfied with the resolution provided by our Grievance Officer, or if no response is received within the statutory timeframe, you hold the statutory right to escalate your complaint directly to the <strong>Data Protection Board of India</strong> pursuant to Section 28 of the DPDP Act 2023.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Security Safeguards & Cross-Border Processing */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">06.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Security Safeguards & Cross-Border Infrastructure
              </h2>
            </div>
            <div className="text-sm font-sans text-[#78716C] leading-relaxed space-y-3">
              <p>
                Under Section 8(5) of the Act, we implement reasonable technical and organizational measures to prevent personal data breaches:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#1C1917]">
                <li><strong>Transport Security:</strong> All web traffic is routed over strict HTTPS with TLS 1.3 encryption.</li>
                <li><strong>Zero Data Selling:</strong> We do not monetize, sell, or rent student or client contact registries under any pretext.</li>
                <li><strong>Edge Architecture:</strong> Our web application is hosted across global edge networks (Cloudflare Pages), adhering to international information security standards. Inbound inquiries transition directly to end-to-end encrypted messaging via WhatsApp (Meta Platforms).</li>
              </ul>
            </div>
          </section>

          {/* Section 7: Minors and Children's Data */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-2">
              <span className="font-mono text-sm text-[#C5A059] font-semibold">07.</span>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Protection of Children's Personal Data (Section 9)
              </h2>
            </div>
            <div className="text-sm font-sans text-[#78716C] leading-relaxed space-y-2">
              <p>
                House of Kalakaar does not knowingly collect or process the digital personal data of individuals under the age of eighteen (18) without verifiable parental or lawful guardian consent. We do not engage in behavioral tracking or targeted advertising directed at children.
              </p>
            </div>
          </section>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#F0ECE1] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/terms">
              <AtelierButton variant="outline" size="sm">
                ← View Terms of Service
              </AtelierButton>
            </Link>

            <AtelierButton
              variant="whatsapp"
              size="sm"
              onClick={() => openDirectWhatsApp('Hello Vrinda, I have a question regarding my data privacy and DPDP Act rights.')}
            >
              Contact Privacy Desk via WhatsApp
            </AtelierButton>
          </div>
        </div>
      </div>
    </div>
  );
};

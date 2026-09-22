import React, { useState } from 'react';
import { ChevronDown, Sparkles, Check, HelpCircle, MessageCircle, Tablet } from 'lucide-react';
import { FAQS } from '../../data/faqs';
import { AtelierButton } from '../../components/AtelierButton';
import { useWhatsAppRedirect } from '../../hooks/useWhatsAppRedirect';

export const FAQPage: React.FC = () => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const { openDirectWhatsApp } = useWhatsAppRedirect();

  const categories = [
    'All',
    'Prerequisites & Hardware',
    'Curriculum & Workshops',
    'Commissions & Licensing',
  ];

  const filteredFaqs = selectedCat === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === selectedCat);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <div className="py-12 md:py-20 animate-in fade-in duration-300">
      <div className="max-w-4xl mx-auto px-5 mb-12 sm:mb-16 text-center">
        <div className="inline-flex items-center gap-2 mb-3 bg-[#FAF7F2] border border-[#C5A059]/40 px-3.5 py-1">
          <HelpCircle className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase font-semibold text-[#1C1917]">
            Knowledge Atelier
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#1C1917] tracking-tight mb-4">
          Course Prerequisites & Guidance
        </h1>
        <p className="text-base sm:text-lg font-sans text-[#78716C] leading-relaxed max-w-2xl mx-auto">
          Everything you need to know regarding iPad compatibility, Apple Pencil pressure sensitivity, beginner learning curves, and mentoring formats.
        </p>
      </div>

      {/* Hardware Compatibility Matrix Box */}
      <div className="max-w-4xl mx-auto px-5 mb-16">
        <div className="bg-[#FFFFFF] border border-[#C5A059]/40 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4 text-[#1C1917]">
            <Tablet className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif text-xl sm:text-2xl font-semibold">
              Hardware & Apple Pencil Compatibility Matrix
            </h3>
          </div>
          <p className="text-sm text-[#78716C] font-sans mb-6">
            Procreate runs smoothly across all modern iPads with iPadOS 16.4+. Here is our curated guide:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
              <thead>
                <tr className="border-b-2 border-[#1C1917] bg-[#FAF7F2] text-[#1C1917]">
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider">Device Tier</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider">Supported iPad Models</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider">Recommended Stylus</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0ECE1]">
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#1C1917]">Flagship Studio Tier</td>
                  <td className="py-3 px-4 text-[#78716C]">iPad Pro 11" & 13" (M1, M2, M4)</td>
                  <td className="py-3 px-4 text-[#78716C]">Apple Pencil Pro / 2nd Gen (Hover & Barrel Roll)</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 text-xs font-medium">
                      <Check className="w-3 h-3" /> Ideal
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#1C1917]">Creative Workhorse</td>
                  <td className="py-3 px-4 text-[#78716C]">iPad Air 4th, 5th, & M2</td>
                  <td className="py-3 px-4 text-[#78716C]">Apple Pencil 2nd Gen / Pencil Pro</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 text-xs font-medium">
                      <Check className="w-3 h-3" /> Excellent
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#1C1917]">Beginner Friendly</td>
                  <td className="py-3 px-4 text-[#78716C]">iPad 9th & 10th Generation</td>
                  <td className="py-3 px-4 text-[#78716C]">Apple Pencil 1st Gen / USB-C</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 text-xs font-medium">
                      <Check className="w-3 h-3" /> Fully Supported
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#1C1917]">Portable Travel</td>
                  <td className="py-3 px-4 text-[#78716C]">iPad mini 6th & 7th Gen</td>
                  <td className="py-3 px-4 text-[#78716C]">Apple Pencil 2nd Gen / Pro</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-stone-700 bg-stone-100 px-2 py-0.5 text-xs font-medium">
                      <Check className="w-3 h-3" /> Compact Canvas
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-3xl mx-auto px-5 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 text-xs font-sans tracking-wide transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917]'
                    : 'bg-[#FFFFFF] text-[#78716C] border-[#F0ECE1] hover:border-[#C5A059]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="max-w-3xl mx-auto px-5 space-y-4">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-[#FFFFFF] border border-[#F0ECE1] transition-all duration-200"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer group"
                aria-expanded={isOpen}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#C5A059] font-medium mb-1">
                    {faq.category}
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-medium text-[#1C1917] group-hover:text-[#C5A059] transition-colors">
                    {faq.question}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full border border-[#F0ECE1] flex items-center justify-center shrink-0 text-[#1C1917] transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#FAF7F2]' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base font-sans text-[#78716C] leading-relaxed border-t border-[#FAF7F2] animate-in fade-in">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Banner CTA */}
      <div className="max-w-3xl mx-auto px-5 mt-16 text-center">
        <div className="bg-[#FAF7F2] border border-[#C5A059]/40 p-8">
          <Sparkles className="w-6 h-6 text-[#C5A059] mx-auto mb-2" />
          <h3 className="font-serif text-2xl font-medium text-[#1C1917] mb-2">
            Have a Specific Question for Vrinda?
          </h3>
          <p className="text-sm font-sans text-[#78716C] mb-6 max-w-md mx-auto">
            Our admissions team is available daily on WhatsApp to review your current portfolio, iPad specs, and suggest the right cohort.
          </p>
          <AtelierButton
            variant="whatsapp"
            size="md"
            icon={<MessageCircle className="w-4 h-4" />}
            onClick={() => openDirectWhatsApp('Hi Vrinda! I have a question regarding course eligibility and my iPad setup.')}
          >
            Chat with Admissions on WhatsApp
          </AtelierButton>
        </div>
      </div>
    </div>
  );
};

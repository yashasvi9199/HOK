import React, { useState } from 'react';
import {
  MessageCircle,
  Instagram,
  Youtube,
  ArrowUp,
  ArrowUpRight,
  Compass,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Logo } from '../assets/Logo';
import {
  useWhatsAppRedirect,
  STUDIO_INSTAGRAM_URL,
  STUDIO_YOUTUBE_URL,
} from '../hooks/useWhatsAppRedirect';

interface AtelierFooterProps {
  onNavigate: (sectionId: string) => void;
  isMobile?: boolean;
}

const ATELIER_CHAPTERS = [
  { code: '01', label: 'The Atelier Runway', targetId: 'hero-section' },
  { code: '02', label: 'The 4 Cards Gallery', targetId: 'parallax-cards-section' },
  { code: '03', label: '8-Stage Canvas Anatomy', targetId: 'anatomy-section' },
  { code: '04', label: 'Artist Story & Voice Memo', targetId: 'artist-story-section' },
  { code: '05', label: 'Student Transformations', targetId: 'student-work-section' },
  { code: '06', label: 'Voices of the Atelier', targetId: 'testimonials-section' },
  { code: '07', label: 'Cohort Admissions Stepper', targetId: 'consultation-section' },
];

const ACADEMY_TRACKS = [
  {
    code: 'I',
    title: 'Couture Croquis & Drapery Masterclass',
    detail: '8 Weeks · Live Procreate Critique',
    inquiry:
      'Hello Vrinda, I would like curriculum details for Track I: Couture Croquis & Drapery Masterclass.',
  },
  {
    code: 'II',
    title: 'Tactile Oil Pastel & Gouache Glazing',
    detail: '6 Weeks · Custom Atelier Brushset',
    inquiry:
      'Hello Vrinda, I would like curriculum details for Track II: Tactile Oil Pastel & Gouache Glazing.',
  },
  {
    code: 'III',
    title: '24k Zardozi & Bridal Couture Rendering',
    detail: 'Advanced Intensive · 1-on-1 Mentorship',
    inquiry:
      'Hello Vrinda, I would like curriculum details for Track III: 24k Zardozi & Bridal Couture Rendering.',
  },
  {
    code: 'IV',
    title: 'Bespoke Fashion & Editorial Commissions',
    detail: 'Bridal Houses & Luxury Lookbooks',
    inquiry:
      'Hello Vrinda, I am inquiring regarding a bespoke fashion illustration or brand commission.',
  },
];

const SIGNATURE_PALETTE = [
  { name: 'Smoke Whisper', hex: '#ece7d5' },
  { name: 'Weathered Steel', hex: '#837d75' },
  { name: 'Drystone Clay', hex: '#806055' },
  { name: 'Cindered Red', hex: '#a33533' },
  { name: 'Obsidian Veil', hex: '#30292a' },
];

export const AtelierFooter: React.FC<AtelierFooterProps> = ({
  onNavigate,
  isMobile = false,
}) => {
  const { openDirectWhatsApp } = useWhatsAppRedirect();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="atelier-colophon"
      className="relative bg-[#30292a] text-[#ece7d5] border-t-2 border-[#a33533] overflow-hidden select-none"
    >
      {/* Subtle Architectural Background Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(circle at 80% 20%, rgba(163, 53, 51, 0.28) 0%, rgba(128, 96, 85, 0.18) 45%, transparent 75%)',
        }}
      />

      {/* 1. OPERATIONAL STUDIO UTILITY RIBBON */}
      <div className="relative z-10 bg-[#806055]/25 border-b border-[#ece7d5]/15 px-5 sm:px-8 md:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono tracking-wider uppercase text-[#ece7d5]/85">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 text-[#a33533] font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              {/* <span>Jaipur & New Delhi Atelier</span> */}
            </span>
            <span className="text-[#ece7d5]/35">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#ece7d5]/60" />
              <span>Studio Hours: Mon–Sat 10:00–19:00 IST</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#ece7d5]/75">
            <Sparkles className="w-3.5 h-3.5 text-[#a33533]" />
            <span>Cohort 17 Enrolling · Apple Pencil & iPad Pro Calibrated</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN EDITORIAL COLOPHON ARCHIVE GRID */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-14 pb-12">
        <div
          className={`grid grid-cols-1 ${
            isMobile ? 'gap-10' : 'md:grid-cols-12 gap-10 lg:gap-12'
          } pb-12 border-b border-[#ece7d5]/15`}
        >
          {/* COLUMN 1: Brand Crest, Artist Signature & Color Grading Swatches (4 cols) */}
          <div className={`${isMobile ? '' : 'md:col-span-4'} space-y-5`}>
            <button
              type="button"
              onClick={() => onNavigate('hero-section')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <Logo variant="full" theme="dark" />
            </button>

            <p className="text-sm font-sans text-[#ece7d5]/80 leading-relaxed max-w-sm">
              An avant-garde digital fashion atelier and Procreate mentoring academy founded by Vrinda Haldia—bridging heirloom Indian textile craftsmanship with contemporary iPad illustration.
            </p>

            {/* Handwritten Artist Accent */}
            <div className="pt-1">
              <p className="font-script text-2xl sm:text-3xl text-[#ece7d5] tracking-wide">
                &ldquo;Art that breathes authenticity.&rdquo;
              </p>
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#837d75] mt-1">
                — Vrinda Haldia, Principal Illustrator
              </p>
            </div>

            {/* Interactive Global Color Grading Bar */}
            <div className="pt-3 border-t border-[#ece7d5]/15">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#ece7d5]/65 mb-2">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-[#a33533]" />
                  <span>Atelier Color Grading (Click to Copy HEX)</span>
                </span>
                {copiedHex && (
                  <span className="text-[#ece7d5] font-semibold">
                    Copied {copiedHex}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {SIGNATURE_PALETTE.map((swatch) => (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => handleCopyHex(swatch.hex)}
                    title={`${swatch.name} (${swatch.hex})`}
                    className="group flex flex-col items-start p-1.5 bg-[#806055]/15 hover:bg-[#806055]/35 border border-[#ece7d5]/20 transition-colors cursor-pointer"
                  >
                    <span
                      className="w-full h-5 border border-[#ece7d5]/30 mb-1"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="text-[9px] font-mono text-[#ece7d5]/80 uppercase">
                      {swatch.hex}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: Verified 7-Chapter Atelier Index (4 cols) */}
          <div className={`${isMobile ? '' : 'md:col-span-4'} space-y-4`}>
            <div className="text-xs font-mono uppercase tracking-[0.22em] text-[#a33533] font-semibold pb-2 border-b border-[#ece7d5]/15">
              01 · Verified Atelier Checkpoints
            </div>

            <ul className="divide-y divide-[#ece7d5]/10">
              {ATELIER_CHAPTERS.map((chap) => (
                <li key={chap.targetId}>
                  <button
                    type="button"
                    onClick={() => onNavigate(chap.targetId)}
                    className="w-full py-2.5 flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#a33533] tabular-nums">
                        {chap.code}
                      </span>
                      <span className="text-sm font-serif text-[#ece7d5]/85 group-hover:text-[#ece7d5] transition-colors">
                        {chap.label}
                      </span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#ece7d5]/40 group-hover:text-[#a33533] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Mentorship Tracks & Direct Studio Dispatch (4 cols) */}
          <div className={`${isMobile ? '' : 'md:col-span-4'} space-y-5`}>
            <div className="text-xs font-mono uppercase tracking-[0.22em] text-[#a33533] font-semibold pb-2 border-b border-[#ece7d5]/15">
              02 · Mentorship & Commissions
            </div>

            <div className="space-y-2.5">
              {ACADEMY_TRACKS.map((track) => (
                <button
                  key={track.code}
                  type="button"
                  onClick={() => openDirectWhatsApp(track.inquiry)}
                  className="w-full p-3 bg-[#806055]/20 hover:bg-[#806055]/40 border border-[#ece7d5]/15 hover:border-[#a33533] text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-serif text-[#ece7d5] group-hover:text-[#ece7d5]">
                      Track {track.code}: {track.title}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#a33533] shrink-0" />
                  </div>
                  <div className="text-[11px] font-mono text-[#ece7d5]/65 mt-0.5">
                    {track.detail}
                  </div>
                </button>
              ))}
            </div>

            {/* Direct WhatsApp & Verified Social Channels */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() =>
                  openDirectWhatsApp(
                    'Hello Vrinda, I am reaching out from the House of Kalakaar Atelier Colophon regarding admissions.'
                  )
                }
                className="flex-1 min-w-[180px] py-3 px-4 bg-[#a33533] hover:bg-[#806055] text-[#ece7d5] text-xs font-sans uppercase tracking-wider font-medium flex items-center justify-center gap-2 border border-[#ece7d5]/25 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Studio</span>
              </button>

              <a
                href={STUDIO_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-[#806055]/25 hover:bg-[#a33533] border border-[#ece7d5]/25 flex items-center justify-center text-[#ece7d5] transition-colors"
                aria-label="House of Kalakaar Instagram"
                title="Instagram (@houseofkalakaar)"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={STUDIO_YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-[#806055]/25 hover:bg-[#a33533] border border-[#ece7d5]/25 flex items-center justify-center text-[#ece7d5] transition-colors"
                aria-label="House of Kalakaar YouTube"
                title="YouTube Studio Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM ARCHIVAL IMPRINT & RETURN TO RUNWAY TOP */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#ece7d5]/65">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span>
              © {new Date().getFullYear()} House of Kalakaar by Vrinda Haldia.
            </span>
            <span>·</span>
            <span>All Original Artworks & Curricula Reserved.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#806055]/30 hover:bg-[#a33533] text-[#ece7d5] border border-[#ece7d5]/25 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>Return to Runway Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

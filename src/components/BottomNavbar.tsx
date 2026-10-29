import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Layers,
  Sparkles,
  Compass,
  Check,
} from 'lucide-react';
import { useWhatsAppRedirect } from '../hooks/useWhatsAppRedirect';

interface BottomNavbarProps {
  activeSectionId?: string;
  onNavigate?: (sectionId: string) => void;
}

const CHAPTERS = [
  {
    id: 'hero-section',
    number: '01',
    act: 'ACT I',
    name: 'Runway Prelude',
    sub: 'Silhouette & Brand Reveal',
    accentColor: '#ece7d5',
  },
  {
    id: 'parallax-cards-section',
    number: '02',
    act: 'ACT II',
    name: 'Atelier Gallery',
    sub: '4 Parallax Book Folios',
    accentColor: '#806055',
  },
  {
    id: 'anatomy-section',
    number: '03',
    act: 'ACT III',
    name: 'Canvas Anatomy',
    sub: '4-Layer Deconstructor',
    accentColor: '#a33533',
  },
  {
    id: 'artist-story-section',
    number: '04',
    act: 'ACT IV',
    name: 'Artist Story',
    sub: 'Vrinda Haldia Voice & Notes',
    accentColor: '#837d75',
  },
  {
    id: 'consultation-section',
    number: '05',
    act: 'ACT V',
    name: 'Cohort Admissions',
    sub: 'Editorial Intake Stepper',
    accentColor: '#a33533',
  },
];

export const BottomNavbar: React.FC<BottomNavbarProps> = ({
  activeSectionId,
  onNavigate,
}) => {
  const { openDirectWhatsApp } = useWhatsAppRedirect();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isChapterMenuOpen, setIsChapterMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll position to determine active chapter
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 500);

      const chapterEls = CHAPTERS.map((c) => ({
        id: c.id,
        el: document.getElementById(c.id),
      }));

      for (let i = chapterEls.length - 1; i >= 0; i--) {
        const item = chapterEls[i];
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setCurrentIdx(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (idx: number) => {
    const targetIdx = Math.max(0, Math.min(CHAPTERS.length - 1, idx));
    const target = CHAPTERS[targetIdx];
    setCurrentIdx(targetIdx);
    setIsChapterMenuOpen(false);

    if (onNavigate) {
      onNavigate(target.id);
    } else {
      const el = document.getElementById(target.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentChapter = CHAPTERS[currentIdx] || CHAPTERS[0];

  return (
    <>
      {/* Chapter Dial Quick Selector Modal / Popover */}
      {isChapterMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div
            className="w-full max-w-md bg-[#30292a] border border-[#ece7d5]/20 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#806055]/50">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#a33533]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#ece7d5]">
                  Atelier Chapter Dial
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsChapterMenuOpen(false)}
                className="text-xs text-[#ece7d5]/60 hover:text-[#ece7d5] cursor-pointer"
              >
                Close [ESC]
              </button>
            </div>

            <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
              {CHAPTERS.map((chap, idx) => {
                const isSelected = idx === currentIdx;
                return (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => navigateTo(idx)}
                    className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#806055]/50 border border-[#a33533] text-[#ece7d5]'
                        : 'bg-[#30292a] hover:bg-[#806055]/20 text-[#ece7d5]/75 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono bg-[#30292a] border border-[#ece7d5]/20 text-[#a33533]">
                        {chap.number}
                      </span>
                      <div>
                        <div className="text-xs font-serif tracking-wide text-[#ece7d5]">
                          {chap.name}
                        </div>
                        <div className="text-[10px] text-[#ece7d5]/60 font-sans">{chap.sub}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#ece7d5]/50">
                      {chap.act}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Floating Tool Dock Container */}
      <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] sm:w-auto max-w-3xl">
        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 bg-[#30292a]/92 backdrop-blur-xl border border-[#ece7d5]/25 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.55)]">
          {/* Chapter Stepper Buttons (< / >) */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => navigateTo(currentIdx - 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#ece7d5] hover:bg-[#806055]/40 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              aria-label="Previous Chapter"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Chapter Dial Trigger Display */}
            <button
              type="button"
              onClick={() => setIsChapterMenuOpen(!isChapterMenuOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#806055]/30 hover:bg-[#806055]/50 border border-[#ece7d5]/15 text-left cursor-pointer transition-all group"
            >
              <span className="text-[10px] font-mono text-[#a33533] uppercase font-bold tracking-wider">
                {currentChapter.act}
              </span>
              <span className="text-xs font-serif text-[#ece7d5] tracking-wide truncate max-w-[90px] sm:max-w-[150px] md:max-w-[180px]">
                {currentChapter.name}
              </span>
              <span className="hidden md:inline text-[10px] text-[#ece7d5]/40 font-mono">
                {currentIdx + 1}/{CHAPTERS.length}
              </span>
            </button>

            <button
              type="button"
              disabled={currentIdx === CHAPTERS.length - 1}
              onClick={() => navigateTo(currentIdx + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#ece7d5] hover:bg-[#806055]/40 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              aria-label="Next Chapter"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Section Pip Indicators (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 border-l border-r border-[#ece7d5]/15">
            {CHAPTERS.map((chap, idx) => (
              <button
                key={chap.id}
                type="button"
                onClick={() => navigateTo(idx)}
                title={`${chap.act}: ${chap.name}`}
                className={`transition-all duration-200 cursor-pointer rounded-full ${
                  idx === currentIdx
                    ? 'w-5 h-2 bg-[#a33533]'
                    : 'w-2 h-2 bg-[#ece7d5]/40 hover:bg-[#ece7d5]'
                }`}
              />
            ))}
          </div>

          {/* Right Actions: Tactile Admissions Trigger + Scroll Top */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* WhatsApp Direct Admission Trigger */}
            <button
              type="button"
              onClick={() =>
                openDirectWhatsApp(
                  `Inquiring about ${currentChapter.name} at House of Kalakaar.`
                )
              }
              className="flex items-center gap-1.5 sm:gap-2 bg-[#a33533] hover:bg-[#806055] text-[#ece7d5] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-sans tracking-wide uppercase font-medium transition-all duration-200 cursor-pointer shadow-md active:scale-95 border border-[#ece7d5]/20"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admissions Inquiry</span>
              <span className="sm:hidden">Inquire</span>
            </button>

            {/* Scroll Back to Top Button */}
            {showScrollTop && (
              <button
                type="button"
                onClick={scrollToTop}
                title="Return to Atelier Top"
                className="w-8 h-8 rounded-lg bg-[#30292a] hover:bg-[#806055]/40 border border-[#ece7d5]/20 flex items-center justify-center text-[#ece7d5] cursor-pointer transition-all"
                aria-label="Back to Top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

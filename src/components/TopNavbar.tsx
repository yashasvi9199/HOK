import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, Copy, Check, Compass } from 'lucide-react';
import { Logo } from '../assets/Logo';
import { useWhatsAppRedirect } from '../hooks/useWhatsAppRedirect';

interface TopNavbarProps {
  activeSectionId?: string;
  onNavigate?: (sectionId: string) => void;
  isMobile?: boolean;
}

const BRAND_PALETTE = [
  { name: 'Smoke Whisper', hex: '#ece7d5' },
  { name: 'Weathered Steel', hex: '#837d75' },
  { name: 'Drystone Clay', hex: '#806055' },
  { name: 'Cindered Red', hex: '#a33533' },
  { name: 'Obsidian Veil', hex: '#30292a' },
];

const SECTIONS = [
  { id: 'hero-section', number: '01', label: 'The Atelier' },
  { id: 'parallax-cards-section', number: '02', label: 'Gallery' },
  { id: 'anatomy-section', number: '03', label: 'Anatomy' },
  { id: 'artist-story-section', number: '04', label: 'Artist Story' },
  { id: 'consultation-section', number: '05', label: 'Admissions' },
];

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeSectionId,
  onNavigate,
  isMobile = false,
}) => {
  const { openDirectWhatsApp } = useWhatsAppRedirect();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentActiveId, setCurrentActiveId] = useState('hero-section');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Real-time scroll progress filament calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Calculate which section is most in view
      const sectionElements = SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setCurrentActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopiedHex(hex);
    setTimeout(() => {
      setCopiedHex(null);
    }, 1800);
  };

  const effectiveActive = activeSectionId || currentActiveId;

  return (
    <header className="sticky top-2 sm:top-3 md:top-4 z-40 w-full px-3 sm:px-6 md:px-8 max-w-7xl mx-auto transition-all duration-300">
      {/* Floating Frosted Dock Container */}
      <div className="relative overflow-hidden rounded-2xl bg-[#30292a]/85 backdrop-blur-xl border border-[#ece7d5]/20 shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-all">
        {/* Scroll Progress Filament Bar at top rim */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#30292a]">
          <div
            className="h-full bg-gradient-to-r from-[#806055] via-[#a33533] to-[#ece7d5] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* ZONE 1: BRAND LOGO & MONOGRAM */}
          <button
            type="button"
            onClick={() => handleNavClick('hero-section')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none shrink-0"
          >
            <Logo variant="compact" theme="dark" />
            <div className="hidden lg:flex flex-col">
              <span className="font-serif text-xs sm:text-sm tracking-[0.16em] text-[#ece7d5] uppercase font-light group-hover:text-[#a33533] transition-colors">
                House of Kalakaar
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#ece7d5]/60 font-sans uppercase">
                Vrinda Haldia Atelier
              </span>
            </div>
          </button>

          {/* ZONE 2: MAGNETIC NAVIGATION LINKS (DESKTOP) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-3 xl:gap-5">
            {SECTIONS.map((sec) => {
              const isActive = effectiveActive === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleNavClick(sec.id)}
                  className={`relative px-3 py-2 text-xs font-sans tracking-wider uppercase transition-all duration-200 cursor-pointer group focus:outline-none ${
                    isActive
                      ? 'text-[#ece7d5] font-semibold'
                      : 'text-[#ece7d5]/70 hover:text-[#ece7d5]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[#a33533] font-mono opacity-80 group-hover:opacity-100">
                      {sec.number}
                    </span>
                    <span>{sec.label}</span>
                  </span>
                  {/* Magnetic Active Indicator Bar */}
                  {isActive ? (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#a33533] rounded-full shadow-[0_0_8px_#a33533]" />
                  ) : (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#ece7d5]/40 group-hover:w-3/4 transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: ATELIER UTILITIES & PRIMARY ACTION */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Active Color Palette Swatches Utility */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#30292a]/90 border border-[#806055]/40 text-xs">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#ece7d5]/60 mr-1 flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#a33533]" /> Palette
              </span>
              <div className="flex items-center gap-1">
                {BRAND_PALETTE.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    title={`Click to copy ${c.name} (${c.hex})`}
                    onClick={() => copyColor(c.hex)}
                    className="relative w-4 h-4 rounded-full border border-[#ece7d5]/40 transition-transform hover:scale-125 cursor-pointer focus:outline-none"
                    style={{ backgroundColor: c.hex }}
                  >
                    {copiedHex === c.hex && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-[#30292a] text-[#ece7d5] text-[9px] font-mono border border-[#a33533] shadow-md z-50 whitespace-nowrap">
                        Copied
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <button
              type="button"
              onClick={() => openDirectWhatsApp()}
              className="flex items-center gap-2 bg-[#a33533] hover:bg-[#806055] text-[#ece7d5] px-3.5 py-2 rounded-xl text-xs font-sans tracking-wide uppercase transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-95 border border-[#ece7d5]/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ece7d5] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ece7d5]" />
              </span>
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">Direct WhatsApp</span>
              <span className="sm:hidden font-medium">WhatsApp</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#ece7d5] hover:bg-[#806055]/30 border border-[#ece7d5]/20 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#806055]/40 bg-[#30292a] px-6 py-4 space-y-3">
            <div className="grid grid-cols-1 gap-1">
              {SECTIONS.map((sec) => {
                const isActive = effectiveActive === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleNavClick(sec.id)}
                    className={`flex items-center justify-between py-2 px-3 text-left rounded-lg text-sm font-sans tracking-wider uppercase transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#806055]/40 text-[#ece7d5] font-semibold border-l-2 border-[#a33533]'
                        : 'text-[#ece7d5]/80 hover:bg-[#806055]/20'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[11px] text-[#a33533] font-mono">{sec.number}</span>
                      <span>{sec.label}</span>
                    </span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#a33533]" />}
                  </button>
                );
              })}
            </div>

            {/* Mobile Color Palette Row */}
            <div className="pt-3 border-t border-[#ece7d5]/15 flex items-center justify-between text-xs text-[#ece7d5]/70">
              <span className="text-[10px] uppercase font-mono tracking-wider">Atelier Palette</span>
              <div className="flex items-center gap-2">
                {BRAND_PALETTE.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => copyColor(c.hex)}
                    className="w-5 h-5 rounded-full border border-[#ece7d5]/40 cursor-pointer"
                    style={{ backgroundColor: c.hex }}
                    title={c.hex}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

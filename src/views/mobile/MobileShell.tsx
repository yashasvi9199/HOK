import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  MessageCircle,
  Sparkles,
  Instagram,
  Youtube,
  Award,
  Compass,
  ChevronRight,
} from 'lucide-react';
import { Logo } from '../../assets/Logo';
import { AtelierButton } from '../../components/AtelierButton';
import { HeroWalkGpuSection } from '../../components/HeroWalkGpuSection';
import {
  ParallaxBookCardsSection,
  ActiveBookCardId,
} from '../../components/ParallaxBookCardsSection';
import { ArtworkCarousel } from '../../components/ArtworkCarousel';
import { StudentWorkGrid } from '../../components/StudentWorkGrid';
import { TestimonialCards } from '../../components/TestimonialCards';
import { LeadCaptureForm } from '../../components/LeadCaptureForm';
import { ArtworkModal } from '../../components/ArtworkModal';
import { SectionWrapper } from '../../components/SectionWrapper';
import {
  useWhatsAppRedirect,
  STUDIO_INSTAGRAM_URL,
  STUDIO_YOUTUBE_URL,
} from '../../hooks/useWhatsAppRedirect';
import { Artwork } from '../../types';
import { generateOilPastelArtwork } from '../../utils/proceduralArtGenerator';

interface MobileShellProps {
  children?: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openDirectWhatsApp } = useWhatsAppRedirect();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [activeBookCard, setActiveBookCard] = useState<ActiveBookCardId>(null);

  const isHome = location.pathname === '/';

  const artistPortraitUrl = useMemo(
    () => generateOilPastelArtwork('illustration_portrait', 640, 800),
    []
  );

  const navLinks = [
    { name: 'The Atelier', path: '/' },
    { name: 'Gallery', path: '/gallery', isGalleryOption: true },
    { name: 'Guidance & FAQ', path: '/faq' },
    { name: 'Contact & Studio', path: '/contact' },
  ];

  const handleNavClick = (path: string, isGalleryOption?: boolean) => {
    setIsDrawerOpen(false);
    if (isGalleryOption && activeBookCard !== null) {
      setActiveBookCard(null);
      setTimeout(() => {
        document.getElementById('parallax-cards-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return;
    }
    setActiveBookCard(null);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#837d75] text-[#ece7d5] flex flex-col pb-16 selection:bg-[#a33533] selection:text-[#ece7d5]">
      <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />

      {/* Mobile Sticky Editorial Header */}
      <header className="sticky top-0 z-40 bg-[#30292a]/95 backdrop-blur-md border-b border-[#ece7d5]/15 px-4 py-2.5 flex items-center justify-between shadow-md">
        <Link
          to="/"
          className="cursor-pointer"
          onClick={() => {
            setIsDrawerOpen(false);
            setActiveBookCard(null);
          }}
        >
          <Logo variant="compact" theme="dark" />
        </Link>

        {/* Right Actions: Quick Gallery Return + WhatsApp + Hamburger */}
        <div className="flex items-center gap-2">
          {activeBookCard !== null && (
            <button
              type="button"
              onClick={() => setActiveBookCard(null)}
              className="px-2.5 py-1 text-xs font-sans bg-[#a33533] text-[#ece7d5] border border-[#ece7d5]/30 cursor-pointer"
            >
              Gallery
            </button>
          )}

          <button
            type="button"
            onClick={() =>
              openDirectWhatsApp(
                'Hello Vrinda, I am inquiring from the House of Kalakaar mobile portal.'
              )
            }
            className="w-9 h-9 bg-[#a33533] text-[#ece7d5] flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-transform"
            aria-label="Direct WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="w-9 h-9 border border-[#ece7d5]/25 flex items-center justify-center text-[#ece7d5] cursor-pointer active:scale-95 transition-transform"
            aria-label="Toggle Navigation Drawer"
          >
            {isDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 top-[64px] z-50 bg-[#30292a]/80 backdrop-blur-xs flex flex-col">
          <div className="bg-[#30292a] border-b border-[#a33533] p-6 flex flex-col space-y-5 shadow-2xl">
            <nav className="flex flex-col space-y-1 divide-y divide-[#ece7d5]/15">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleNavClick(link.path, link.isGalleryOption)}
                    className={`py-3.5 text-left text-base font-serif flex items-center justify-between cursor-pointer ${
                      isActive ? 'text-[#a33533] font-bold' : 'text-[#ece7d5]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#ece7d5]/50" />
                  </button>
                );
              })}
            </nav>

            <div className="pt-2 space-y-3">
              <AtelierButton
                variant="primary"
                className="w-full justify-center text-sm py-3"
                icon={<MessageCircle className="w-4 h-4" />}
                onClick={() => {
                  setIsDrawerOpen(false);
                  openDirectWhatsApp();
                }}
              >
                Chat Direct on WhatsApp
              </AtelierButton>
            </div>
          </div>
        </div>
      )}

      {/* Main Presentation Area */}
      <main className="flex-1">
        {isHome ? (
          <div>
            {/* SECTION 1: HERO SECTION (Lady Walking Left-to-Right + GPU Brand Reveal) */}
            <HeroWalkGpuSection
              isMobile={true}
              onExploreCards={() => {
                document
                  .getElementById('parallax-cards-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenWhatsApp={() => openDirectWhatsApp()}
            />

            {/* SECTION 2: 4 PARALLAX CARDS & BOOK-OPENING OVERLAYS */}
            <ParallaxBookCardsSection
              activeCard={activeBookCard}
              onSelectCard={(id) => setActiveBookCard(id)}
            />

            {/* SECTION 3: ARTIST BIO & PORTRAIT */}
            <SectionWrapper bg="obsidian" className="py-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-[10px] font-sans tracking-[0.2em] uppercase font-semibold text-[#a33533]">
                  <Award className="w-3.5 h-3.5" />
                  <span>The Artist Story</span>
                </div>

                {/* Portrait */}
                <div className="relative bg-[#806055] p-3 border border-[#ece7d5]/25">
                  <div className="aspect-[4/5] overflow-hidden bg-[#30292a]">
                    <img
                      src={artistPortraitUrl}
                      alt="Vrinda Haldia"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="mt-2.5 text-center">
                    <span className="font-serif text-lg font-semibold text-[#ece7d5] block">
                      Vrinda Haldia
                    </span>
                    <span className="text-[11px] font-sans text-[#ece7d5]/80 uppercase tracking-wider">
                      Founder, Fashion Illustrator & Mentor
                    </span>
                  </div>

                  {/* Flowing handwritten script accent */}
                  <div className="mt-2 text-center bg-[#30292a] border border-[#a33533] py-2 px-3">
                    <span className="font-script text-2xl text-[#ece7d5]">
                      "Art that breathes authenticity."
                    </span>
                  </div>
                </div>

                {/* Mobile Narrative */}
                <div className="space-y-3 text-sm font-sans text-[#ece7d5]/85 leading-relaxed">
                  <p>
                    Trained in classical fashion design and Indian textiles, Vrinda Haldia bridged traditional oil pastel, gouache, and gold leaf crafts into Procreate with custom hand-calibrated brush algorithms.
                  </p>
                  <p>
                    Through House of Kalakaar, she has personally trained 2,500+ students worldwide, equipping them to render runway croquis, bridal couture, and bespoke fashion lookbooks.
                  </p>
                </div>
              </div>
            </SectionWrapper>

            {/* SECTION 4: INFINITE ARTWORK SHOWCASE CAROUSEL */}
            <section className="py-12 bg-[#837d75] border-b border-[#ece7d5]/15">
              <div className="px-5 mb-6 flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] uppercase font-semibold text-[#ece7d5]/80">
                    <Compass className="w-3 h-3 text-[#a33533]" />
                    <span>The Atelier Gallery</span>
                  </div>
                  <h2 className="font-serif text-2xl text-[#ece7d5] font-semibold mt-0.5">
                    Original Masterpieces
                  </h2>
                </div>
                <Link to="/gallery" className="text-xs text-[#ece7d5] font-sans font-semibold underline">
                  View All →
                </Link>
              </div>

              <ArtworkCarousel onSelectArtwork={(art) => setSelectedArtwork(art)} isMobile={true} />
            </section>

            {/* SECTION 5: STUDENT ART SHOWCASE */}
            <SectionWrapper bg="clay" className="py-12">
              <div className="text-center mb-8">
                <div className="text-[10px] font-sans tracking-[0.2em] uppercase font-semibold text-[#ece7d5]/80 mb-1">
                  Student Spotlight
                </div>
                <h2 className="font-serif text-2xl text-[#ece7d5] font-semibold">
                  Student Transformations
                </h2>
                <p className="text-xs font-sans text-[#ece7d5]/80 mt-1">
                  Works created during our Procreate workshops
                </p>
              </div>

              <StudentWorkGrid />
            </SectionWrapper>

            {/* SECTION 6: STUDENT & CLIENT TESTIMONIALS */}
            <SectionWrapper bg="obsidian" className="py-12">
              <div className="text-center mb-8">
                <div className="text-[10px] font-sans tracking-[0.2em] uppercase font-semibold text-[#a33533] mb-1">
                  Student Reviews
                </div>
                <h2 className="font-serif text-2xl text-[#ece7d5] font-semibold">
                  Loved by Designers & Students
                </h2>
              </div>

              <TestimonialCards />
            </SectionWrapper>

            {/* SECTION 7: INTERACTIVE CREATIVE LEAD CAPTURE FORM */}
            <SectionWrapper bg="steel" className="py-12" id="admissions">
              <LeadCaptureForm isCompact={true} />
            </SectionWrapper>
          </div>
        ) : (
          children
        )}
      </main>

      {/* Mobile Footer */}
      <footer className="bg-[#30292a] text-[#ece7d5] pt-12 pb-16 px-5 border-t-2 border-[#a33533]">
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <Logo variant="compact" theme="dark" />
          </div>

          <p className="text-xs font-sans text-[#ece7d5]/75 max-w-xs mx-auto leading-relaxed">
            High-end digital art studio, fashion illustration brand, and Procreate mentoring academy by Vrinda Haldia.
          </p>

          <div className="flex justify-center gap-4 py-2">
            <a
              href={STUDIO_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#ece7d5]/25 flex items-center justify-center text-[#ece7d5] hover:text-[#a33533]"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={STUDIO_YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#ece7d5]/25 flex items-center justify-center text-[#ece7d5] hover:text-[#a33533]"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => openDirectWhatsApp()}
              className="w-9 h-9 rounded-full border border-[#ece7d5]/25 flex items-center justify-center text-[#ece7d5] hover:text-[#a33533]"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] font-sans text-[#ece7d5]/60 pt-4 border-t border-[#ece7d5]/15">
            © {new Date().getFullYear()} House of Kalakaar by Vrinda Haldia.
          </div>
        </div>
      </footer>

      {/* Thumb-Friendly Sticky Mobile Action Bar (Within 15% Mobile Viewport Cap) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#30292a]/95 backdrop-blur-md border-t border-[#ece7d5]/20 p-2 flex items-center gap-2 shadow-2xl">
        <button
          type="button"
          onClick={() =>
            openDirectWhatsApp(
              'Hello Vrinda, I would like to inquire about enrolling in House of Kalakaar masterclasses.'
            )
          }
          className="flex-1 bg-[#a33533] text-[#ece7d5] py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer shadow-xs active:scale-[0.98]"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (location.pathname !== '/') {
              navigate('/');
              setTimeout(() => {
                document
                  .getElementById('lead-capture-form')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }, 200);
            } else {
              document.getElementById('lead-capture-form')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex-1 bg-[#806055] text-[#ece7d5] py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer shadow-xs active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ece7d5]" />
          <span>Enroll Now</span>
        </button>
      </div>
    </div>
  );
};

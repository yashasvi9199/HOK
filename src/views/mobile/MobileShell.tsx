import React, { useState } from 'react';
import {
  Menu,
  X,
  MessageCircle,
  Sparkles,
  Instagram,
  Youtube,
  ChevronRight,
} from 'lucide-react';
import { Logo } from '../../assets/Logo';
import { AtelierButton } from '../../components/AtelierButton';
import { HeroWalkGpuSection } from '../../components/HeroWalkGpuSection';
import {
  ParallaxBookCardsSection,
  ActiveBookCardId,
} from '../../components/ParallaxBookCardsSection';
import { ArtworkLayerDeconstructor } from '../../components/ArtworkLayerDeconstructor';
import { ArtistStorySection } from '../../components/ArtistStorySection';
import { StudentWorkGrid } from '../../components/StudentWorkGrid';
import { TestimonialCards } from '../../components/TestimonialCards';
import { EditorialConsultationStepper } from '../../components/EditorialConsultationStepper';
import { SectionWrapper } from '../../components/SectionWrapper';
import {
  useWhatsAppRedirect,
  STUDIO_INSTAGRAM_URL,
  STUDIO_YOUTUBE_URL,
} from '../../hooks/useWhatsAppRedirect';

interface MobileShellProps {
  children?: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({ children }) => {
  const { openDirectWhatsApp } = useWhatsAppRedirect();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeBookCard, setActiveBookCard] = useState<ActiveBookCardId>(null);

  const scrollToSection = (id: string) => {
    setIsDrawerOpen(false);
    setActiveBookCard(null);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'The Atelier', targetId: 'hero-section' },
    { name: 'Gallery', targetId: 'parallax-cards-section' },
    { name: 'Anatomy', targetId: 'anatomy-section' },
    { name: 'Artist Story', targetId: 'artist-story-section' },
    { name: 'Admissions', targetId: 'consultation-section' },
  ];

  return (
    <div className="min-h-screen bg-[#837d75] text-[#ece7d5] flex flex-col pb-16 selection:bg-[#a33533] selection:text-[#ece7d5]">
      {/* Mobile Sticky Editorial Header */}
      <header className="sticky top-0 z-40 bg-[#30292a]/95 backdrop-blur-md border-b border-[#ece7d5]/15 px-4 py-2.5 flex items-center justify-between shadow-md">
        <button
          type="button"
          onClick={() => scrollToSection('hero-section')}
          className="cursor-pointer text-left focus:outline-none"
        >
          <Logo variant="compact" theme="dark" />
        </button>

        {/* Right Actions: Gallery Checkpoint Button + WhatsApp + Hamburger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToSection('parallax-cards-section')}
            className="px-2.5 py-1 text-xs font-sans bg-[#806055] text-[#ece7d5] border border-[#ece7d5]/30 cursor-pointer"
          >
            Gallery
          </button>

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
        <div className="fixed inset-0 top-[56px] z-50 bg-[#30292a]/80 backdrop-blur-xs flex flex-col">
          <div className="bg-[#30292a] border-b border-[#a33533] p-6 flex flex-col space-y-4 shadow-2xl">
            <nav className="flex flex-col space-y-1 divide-y divide-[#ece7d5]/15">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => scrollToSection(link.targetId)}
                  className="py-3 text-left text-base font-serif flex items-center justify-between text-[#ece7d5] hover:text-[#a33533] cursor-pointer"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-[#ece7d5]/50" />
                </button>
              ))}
            </nav>

            <div className="pt-2">
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
        {/* SECTION 1: HERO SECTION */}
        <div id="hero-section">
          <HeroWalkGpuSection
            isMobile={true}
            onExploreCards={() => scrollToSection('parallax-cards-section')}
            onOpenWhatsApp={() => openDirectWhatsApp()}
          />
        </div>

        {/* SECTION 2: 4 PARALLAX CARDS (Gallery Checkpoint) */}
        <ParallaxBookCardsSection
          activeCard={activeBookCard}
          onSelectCard={(id) => setActiveBookCard(id)}
        />

        {/* SECTION 3: ARTWORK LAYER DECONSTRUCTOR */}
        <ArtworkLayerDeconstructor />

        {/* SECTION 4: ARTIST STORY */}
        <ArtistStorySection />

        {/* SECTION 5: STUDENT TRANSFORMATIONS & WORKS */}
        <SectionWrapper bg="clay" className="py-12">
          <StudentWorkGrid />
        </SectionWrapper>

        {/* SECTION 6: TESTIMONIALS */}
        <SectionWrapper bg="obsidian" className="py-12">
          <TestimonialCards />
        </SectionWrapper>

        {/* SECTION 7: EDITORIAL CONSULTATION STEPPER */}
        <EditorialConsultationStepper />
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
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={STUDIO_YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#ece7d5]/25 flex items-center justify-center text-[#ece7d5] hover:text-[#a33533]"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => openDirectWhatsApp()}
              className="w-9 h-9 rounded-full border border-[#ece7d5]/25 flex items-center justify-center text-[#ece7d5] hover:text-[#a33533]"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] font-sans text-[#ece7d5]/60 pt-4 border-t border-[#ece7d5]/15">
            © {new Date().getFullYear()} House of Kalakaar by Vrinda Haldia.
          </div>
        </div>
      </footer>

      {/* Thumb-Friendly Sticky Mobile Action Bar */}
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
          onClick={() => scrollToSection('consultation-section')}
          className="flex-1 bg-[#806055] text-[#ece7d5] py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer shadow-xs active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ece7d5]" />
          <span>Apply Now</span>
        </button>
      </div>
    </div>
  );
};

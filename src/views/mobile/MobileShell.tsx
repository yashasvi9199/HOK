import React, { useState } from 'react';
import {
  MessageCircle,
  Instagram,
  Youtube,
} from 'lucide-react';
import { Logo } from '../../assets/Logo';
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
import { TopNavbar } from '../../components/TopNavbar';
import { BottomNavbar } from '../../components/BottomNavbar';

interface MobileShellProps {
  children?: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({ children }) => {
  const { openDirectWhatsApp } = useWhatsAppRedirect();
  const [activeBookCard, setActiveBookCard] = useState<ActiveBookCardId>(null);

  const scrollToSection = (id: string) => {
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
    <div className="min-h-screen bg-[#837d75] text-[#ece7d5] flex flex-col pb-20 selection:bg-[#a33533] selection:text-[#ece7d5]">
      {/* Fascinating Floating Frosted Top Navbar */}
      <TopNavbar isMobile={true} onNavigate={scrollToSection} />

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

      {/* Floating Tool Dock & Chapter Dial */}
      <BottomNavbar onNavigate={scrollToSection} />
    </div>
  );
};

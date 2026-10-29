import React, { useState } from 'react';
import { MessageCircle, Instagram, Youtube } from 'lucide-react';
import { Logo } from '../../assets/Logo';
import { AtelierButton } from '../../components/AtelierButton';
import { HeroWalkGpuSection } from '../../components/HeroWalkGpuSection';
import { ParallaxBookCardsSection, ActiveBookCardId } from '../../components/ParallaxBookCardsSection';
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

interface DesktopShellProps {
  children?: React.ReactNode;
}

export const DesktopShell: React.FC<DesktopShellProps> = ({ children }) => {
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
    <div className="min-h-screen bg-[#837d75] text-[#ece7d5] flex flex-col selection:bg-[#a33533] selection:text-[#ece7d5] pb-20">
      {/* Fascinating Floating Frosted Top Navbar */}
      <TopNavbar onNavigate={scrollToSection} />

      {/* Main Presentation Area */}
      <main className="flex-1">
        {/* SECTION 1: HERO SECTION (Lady Walking Left-to-Right + GPU Brand & Logo Reveal) */}
        <div id="hero-section">
          <HeroWalkGpuSection
            isMobile={false}
            onExploreCards={() => scrollToSection('parallax-cards-section')}
            onOpenWhatsApp={() => openDirectWhatsApp()}
          />
        </div>

        {/* SECTION 2: 4 PARALLAX CARDS (The New Gallery Checkpoint) */}
        <ParallaxBookCardsSection
          activeCard={activeBookCard}
          onSelectCard={(id) => setActiveBookCard(id)}
        />

        {/* SECTION 3: ARTWORK LAYER DECONSTRUCTOR ("The Anatomy of a Couture Canvas") */}
        <ArtworkLayerDeconstructor />

        {/* SECTION 4: ARTIST STORY (Handwritten Notes, Voice Memo & Callouts) */}
        <ArtistStorySection />

        {/* SECTION 5: STUDENT TRANSFORMATIONS & WORKS */}
        <SectionWrapper bg="clay">
          <StudentWorkGrid />
        </SectionWrapper>

        {/* SECTION 6: VOICES OF THE ATELIER (Testimonials) */}
        <SectionWrapper bg="obsidian">
          <TestimonialCards />
        </SectionWrapper>

        {/* SECTION 7: EDITORIAL STUDIO CONSULTATION STEPPER (Replaces Standard Form) */}
        <EditorialConsultationStepper />
      </main>

      {/* MINIMALIST EDITORIAL FOOTER */}
      <footer className="bg-[#30292a] text-[#ece7d5] pt-16 pb-12 border-t-2 border-[#a33533]">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="grid grid-cols-12 gap-12 pb-14 border-b border-[#ece7d5]/15">
            {/* Brand Manifesto (5 cols) */}
            <div className="col-span-5 space-y-4">
              <Logo variant="full" theme="dark" />
              <p className="text-sm font-sans text-[#ece7d5]/75 leading-relaxed max-w-sm">
                A high-end digital art studio, fashion illustration brand, and Procreate mentoring academy founded by Vrinda Haldia. Preserving tactile heritage in the digital age.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={STUDIO_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#ece7d5]/25 hover:border-[#a33533] flex items-center justify-center text-[#ece7d5] hover:text-[#a33533] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={STUDIO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#ece7d5]/25 hover:border-[#a33533] flex items-center justify-center text-[#ece7d5] hover:text-[#a33533] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => openDirectWhatsApp()}
                  className="w-10 h-10 rounded-full border border-[#ece7d5]/25 hover:border-[#a33533] flex items-center justify-center text-[#ece7d5] hover:text-[#a33533] transition-colors cursor-pointer"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Quick Scroll (3 cols) */}
            <div className="col-span-3 space-y-3">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a33533]">
                Atelier Checkpoints
              </h4>
              <ul className="space-y-2 text-sm font-sans text-[#ece7d5]/75">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('hero-section')}
                    className="hover:text-[#ece7d5] transition-colors cursor-pointer text-left"
                  >
                    The Atelier Runway
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('parallax-cards-section')}
                    className="hover:text-[#ece7d5] transition-colors cursor-pointer text-left"
                  >
                    The 4 Cards Gallery Checkpoint
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('anatomy-section')}
                    className="hover:text-[#ece7d5] transition-colors cursor-pointer text-left"
                  >
                    The Anatomy of a Couture Canvas
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('artist-story-section')}
                    className="hover:text-[#ece7d5] transition-colors cursor-pointer text-left"
                  >
                    The Artist Story & Voice Memo
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('consultation-section')}
                    className="hover:text-[#ece7d5] transition-colors cursor-pointer text-left"
                  >
                    Cohort Admissions Stepper
                  </button>
                </li>
              </ul>
            </div>

            {/* Programs & Academies (2 cols) */}
            <div className="col-span-2 space-y-3">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a33533]">
                Programs
              </h4>
              <ul className="space-y-2 text-sm font-sans text-[#ece7d5]/75">
                <li>Cohort 17 Masterclass</li>
                <li>Oil Pastel & Glazing</li>
                <li>Private Commissions</li>
              </ul>
            </div>

            {/* Contact Studio (2 cols) */}
            <div className="col-span-2 space-y-3">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a33533]">
                Atelier Location
              </h4>
              <p className="text-xs font-sans text-[#ece7d5]/75 leading-relaxed">
                Jaipur / New Delhi<br />
                Rajasthan, India<br />
                curator@houseofkalakaar.com
              </p>
              <AtelierButton
                variant="primary"
                size="sm"
                className="w-full text-xs"
                onClick={() => openDirectWhatsApp()}
              >
                WhatsApp Us
              </AtelierButton>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#ece7d5]/60">
            <div>
              © {new Date().getFullYear()} House of Kalakaar by Vrinda Haldia. All rights reserved.
            </div>
            <div className="flex items-center gap-3">
              <span>Tactile Modernism Atelier</span>
              <span>·</span>
              <span>Procreate Certified Workflow</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Tool Dock & Chapter Dial */}
      <BottomNavbar onNavigate={scrollToSection} />
    </div>
  );
};

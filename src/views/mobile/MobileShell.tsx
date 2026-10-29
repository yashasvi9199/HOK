import React, { useState } from 'react';
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
import { useWhatsAppRedirect } from '../../hooks/useWhatsAppRedirect';
import { BottomNavbar } from '../../components/BottomNavbar';
import { AtelierFooter } from '../../components/AtelierFooter';

interface MobileShellProps {
  children?: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = () => {
  const { openDirectWhatsApp } = useWhatsAppRedirect();
  const [activeBookCard, setActiveBookCard] = useState<ActiveBookCardId>(null);

  const scrollToSection = (id: string) => {
    setActiveBookCard(null);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#837d75] text-[#ece7d5] flex flex-col selection:bg-[#a33533] selection:text-[#ece7d5]">
      {/* Main Presentation Area (Full-Bleed Top Entry without Top Navbar) */}
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

        {/* SECTION 3: 8-STAGE ARTWORK LAYER DECONSTRUCTOR */}
        <ArtworkLayerDeconstructor />

        {/* SECTION 4: ARTIST STORY */}
        <ArtistStorySection />

        {/* SECTION 5: STUDENT TRANSFORMATIONS & WORKS */}
        <SectionWrapper id="student-work-section" bg="clay" className="py-12">
          <StudentWorkGrid />
        </SectionWrapper>

        {/* SECTION 6: TESTIMONIALS */}
        <SectionWrapper id="testimonials-section" bg="obsidian" className="py-12">
          <TestimonialCards />
        </SectionWrapper>

        {/* SECTION 7: EDITORIAL CONSULTATION STEPPER */}
        <EditorialConsultationStepper />
      </main>

      {/* SECTION 8: EDITORIAL ATELIER COLOPHON (Revamped Section Below Admissions) */}
      <AtelierFooter onNavigate={scrollToSection} isMobile={true} />

      {/* Floating Tool Dock & 7-Chapter Dial (Auto-hides at Atelier Colophon) */}
      <BottomNavbar onNavigate={scrollToSection} />
    </div>
  );
};

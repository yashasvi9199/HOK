import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MessageCircle, Instagram, Youtube, Award, Compass } from 'lucide-react';
import { Logo } from '../../assets/Logo';
import { AtelierButton } from '../../components/AtelierButton';
import { HeroWalkGpuSection } from '../../components/HeroWalkGpuSection';
import { ParallaxBookCardsSection, ActiveBookCardId } from '../../components/ParallaxBookCardsSection';
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

interface DesktopShellProps {
  children?: React.ReactNode;
}

export const DesktopShell: React.FC<DesktopShellProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openDirectWhatsApp } = useWhatsAppRedirect();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [activeBookCard, setActiveBookCard] = useState<ActiveBookCardId>(null);

  const isHome = location.pathname === '/';

  const artistPortraitUrl = useMemo(
    () => generateOilPastelArtwork('illustration_portrait', 760, 950),
    []
  );

  const navLinks = [
    { name: 'The Atelier', path: '/' },
    { name: 'Gallery', path: '/gallery', isGalleryOption: true },
    { name: 'Guidance & FAQ', path: '/faq' },
    { name: 'Contact & Studio', path: '/contact' },
  ];

  const handleGalleryNavClick = (e: React.MouseEvent) => {
    // If a book card overlay is open, clicking 'Gallery' in the top nav bar returns to the 4 cards section
    if (activeBookCard !== null) {
      e.preventDefault();
      setActiveBookCard(null);
      setTimeout(() => {
        document.getElementById('parallax-cards-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  };

  return (
    <div className="min-h-screen bg-[#837d75] text-[#ece7d5] flex flex-col selection:bg-[#a33533] selection:text-[#ece7d5]">
      <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />

      {/* Minimalist Editorial Desktop Header (Strict 3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 bg-[#30292a]/95 backdrop-blur-md border-b border-[#ece7d5]/15 transition-all">
        <div className="max-w-7xl mx-auto px-8 md:px-12 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark & Logo */}
          <Link
            to="/"
            onClick={() => setActiveBookCard(null)}
            className="group cursor-pointer shrink-0"
          >
            <Logo variant="full" theme="dark" />
          </Link>

          {/* Zone 2: 4 Clean Single-Line Navigation Links */}
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path && !activeBookCard;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={link.isGalleryOption ? handleGalleryNavClick : () => setActiveBookCard(null)}
                  className={`text-sm font-sans tracking-wide transition-colors relative py-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#ece7d5] font-semibold'
                      : 'text-[#ece7d5]/75 hover:text-[#ece7d5]'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#a33533] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <AtelierButton
              variant="primary"
              size="sm"
              icon={<MessageCircle className="w-4 h-4 text-[#ece7d5]" />}
              onClick={() => openDirectWhatsApp()}
            >
              Direct WhatsApp
            </AtelierButton>
          </div>
        </div>
      </header>

      {/* Main Presentation Area */}
      <main className="flex-1">
        {isHome ? (
          <div>
            {/* SECTION 1: HERO SECTION (Lady Walking Left-to-Right + GPU Brand & Logo Reveal) */}
            <HeroWalkGpuSection
              isMobile={false}
              onExploreCards={() => {
                document
                  .getElementById('parallax-cards-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenWhatsApp={() => openDirectWhatsApp()}
            />

            {/* SECTION 2: 4 PARALLAX CARDS & 3D BOOK-OPENING OVERLAYS (01 About us, 02 Digital Media, 03, 04) */}
            <ParallaxBookCardsSection
              activeCard={activeBookCard}
              onSelectCard={(id) => setActiveBookCard(id)}
            />

            {/* SECTION 3: ARTIST BIO & PORTRAIT (Retained Below with Scroll Animations) */}
            <SectionWrapper bg="obsidian">
              <div className="grid grid-cols-12 gap-12 items-center">
                {/* Artist Portrait (5 cols) */}
                <motion.div
                  initial={{ opacity: 0, x: -36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7 }}
                  className="col-span-5 relative"
                >
                  <div className="bg-[#806055] p-4 border border-[#ece7d5]/25 shadow-2xl">
                    <div className="aspect-[4/5] relative overflow-hidden bg-[#30292a]">
                      <img
                        src={artistPortraitUrl}
                        alt="Vrinda Haldia - Fashion Designer, Digital Artist & Educator"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <span className="font-serif text-lg font-semibold text-[#ece7d5]">
                        Vrinda Haldia
                      </span>
                      <p className="text-xs font-sans text-[#ece7d5]/80 uppercase tracking-wider">
                        Founder, Lead Artist & Fashion Illustrator
                      </p>
                    </div>
                  </div>

                  {/* Flowing handwritten script accent */}
                  <div className="absolute -bottom-6 right-0 bg-[#30292a] border border-[#a33533] py-2 px-5 shadow-xl">
                    <span className="font-script text-3xl text-[#ece7d5]">
                      "Art that breathes authenticity."
                    </span>
                  </div>
                </motion.div>

                {/* Narrative (7 cols) */}
                <motion.div
                  initial={{ opacity: 0, x: 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="col-span-7 space-y-6 pl-4"
                >
                  <div className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase font-semibold text-[#a33533]">
                    <Award className="w-3.5 h-3.5 text-[#a33533]" />
                    <span>The Artist & Atelier Story</span>
                  </div>

                  <h2
                    className="font-serif text-4xl lg:text-5xl font-normal text-[#ece7d5] tracking-tight leading-snug"
                    style={{ textWrap: 'balance' }}
                  >
                    Bridging Traditional Indian Heritage with Digital Canvas Mastery.
                  </h2>

                  <div className="space-y-4 text-base font-sans text-[#ece7d5]/85 leading-relaxed">
                    <p>
                      Trained in classical fashion design and textile history, Vrinda Haldia spent a decade sketching haute couture collections with oil pastels, gouache, dry inks, and gold foil leaves before bringing her signature technique into the digital realm.
                    </p>
                    <p>
                      Disappointed by the cold, plastic look of generic digital brushes, she spent years hand-calibrating the{' '}
                      <strong className="text-[#ece7d5]">House of Kalakaar Atelier Brush Library</strong> — simulating the real drag of oil pastel and sable hair against cold-pressed cotton paper, the gleam of pure gold zardozi threads, and the delicate translucency of organza drapes.
                    </p>
                    <p>
                      Today, through House of Kalakaar, Vrinda has guided over 2,500 students across 18 countries — transforming beginner sketchers into confident digital illustrators capable of rendering runway collections, bridal stationery, and fine art pieces.
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-[#806055]/40 border border-[#ece7d5]/20">
                      <div className="font-serif text-base font-semibold text-[#ece7d5]">
                        Couture & Oil Pastel Expertise
                      </div>
                      <p className="text-xs text-[#ece7d5]/80 mt-1 font-sans">
                        Specialized in royal Indian bridal wear, still life compositions, and runway croquis.
                      </p>
                    </div>

                    <div className="p-4 bg-[#806055]/40 border border-[#ece7d5]/20">
                      <div className="font-serif text-base font-semibold text-[#ece7d5]">
                        Zero-Jargon Mentorship
                      </div>
                      <p className="text-xs text-[#ece7d5]/80 mt-1 font-sans">
                        Step-by-step guidance tailored for complete beginners and traditional artists.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </SectionWrapper>

            {/* SECTION 4: INFINITE ARTWORK SHOWCASE CAROUSEL */}
            <section className="py-20 bg-[#837d75] border-b border-[#ece7d5]/15">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65 }}
                className="max-w-7xl mx-auto px-8 md:px-12 mb-10 flex items-end justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase font-semibold text-[#ece7d5]/80 mb-2">
                    <Compass className="w-3.5 h-3.5 text-[#a33533]" />
                    <span>The Atelier Gallery</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#ece7d5] font-semibold">
                    Original Masterpieces & Process Studies
                  </h2>
                  <p className="text-sm font-sans text-[#ece7d5]/80 mt-1">
                    Hover over any canvas to inspect specifications, brushes used, and layer hierarchies.
                  </p>
                </div>

                <Link to="/gallery">
                  <AtelierButton variant="outline" size="sm">
                    View Full Catalog →
                  </AtelierButton>
                </Link>
              </motion.div>

              <ArtworkCarousel onSelectArtwork={(art) => setSelectedArtwork(art)} isMobile={false} />
            </section>

            {/* SECTION 5: STUDENT ART SHOWCASE */}
            <SectionWrapper bg="clay">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="text-xs font-sans tracking-[0.25em] uppercase font-semibold text-[#ece7d5]/85 mb-2">
                  Academy Spotlight
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#ece7d5] font-semibold">
                  Student Transformations & Works
                </h2>
                <p className="text-base font-sans text-[#ece7d5]/85 mt-3">
                  See how aspiring designers, traditional artists, and absolute beginners brought their creative visions to life in our Procreate cohorts.
                </p>
              </div>

              <StudentWorkGrid />
            </SectionWrapper>

            {/* SECTION 6: STUDENT & CLIENT TESTIMONIALS */}
            <SectionWrapper bg="obsidian">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="text-xs font-sans tracking-[0.25em] uppercase font-semibold text-[#a33533] mb-2">
                  Voices of the Atelier
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#ece7d5] font-semibold">
                  Loved by Designers, Students & Collectors
                </h2>
                <p className="text-base font-sans text-[#ece7d5]/80 mt-2">
                  Read genuine feedback from artists who joined our cohorts and fashion brands who commissioned bespoke works.
                </p>
              </div>

              <TestimonialCards />
            </SectionWrapper>

            {/* SECTION 7: INTERACTIVE CREATIVE LEAD CAPTURE FORM */}
            <SectionWrapper bg="steel" id="admissions">
              <div className="max-w-4xl mx-auto">
                <LeadCaptureForm />
              </div>
            </SectionWrapper>
          </div>
        ) : (
          children
        )}
      </main>

      {/* MINIMALIST EDITORIAL FOOTER */}
      <footer className="bg-[#30292a] text-[#ece7d5] pt-20 pb-12 border-t-2 border-[#a33533]">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="grid grid-cols-12 gap-12 pb-16 border-b border-[#ece7d5]/15">
            {/* Brand Manifesto (5 cols) */}
            <div className="col-span-5 space-y-5">
              <Logo variant="full" theme="dark" />
              <p className="text-sm font-sans text-[#ece7d5]/75 leading-relaxed max-w-sm">
                A high-end digital art studio, fashion illustration brand, and Procreate mentoring academy founded by Vrinda Haldia. Preserving tactile heritage in the age of digital canvases.
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

            {/* Quick Links (2 cols) */}
            <div className="col-span-2 space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a33533]">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-sm font-sans text-[#ece7d5]/75">
                <li>
                  <Link to="/" className="hover:text-[#ece7d5] transition-colors">
                    The Atelier
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-[#ece7d5] transition-colors">
                    Artwork Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-[#ece7d5] transition-colors">
                    Guidance & FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#ece7d5] transition-colors">
                    Studio Coordinates
                  </Link>
                </li>
              </ul>
            </div>

            {/* Programs & Academies (3 cols) */}
            <div className="col-span-3 space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a33533]">
                Programs
              </h4>
              <ul className="space-y-2.5 text-sm font-sans text-[#ece7d5]/75">
                <li>
                  <span className="text-[#ece7d5] block font-medium">
                    Couture Masterclass (Cohort 17)
                  </span>
                  <span className="text-xs text-[#ece7d5]/60">
                    4-Week Immersive Weekend Cohort
                  </span>
                </li>
                <li>
                  <span className="text-[#ece7d5] block font-medium">
                    Oil Pastel & Digital Glazing
                  </span>
                  <span className="text-xs text-[#ece7d5]/60">
                    Impasto Texture & Light Diffusion
                  </span>
                </li>
                <li>
                  <span className="text-[#ece7d5] block font-medium">
                    Custom Art Commissions
                  </span>
                  <span className="text-xs text-[#ece7d5]/60">
                    Bridal & Commercial Lookbooks
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Studio (2 cols) */}
            <div className="col-span-2 space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a33533]">
                Atelier Location
              </h4>
              <p className="text-xs font-sans text-[#ece7d5]/75 leading-relaxed">
                Jaipur / New Delhi
                <br />
                Rajasthan, India
                <br />
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
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#ece7d5]/60">
            <div>
              © {new Date().getFullYear()} House of Kalakaar by Vrinda Haldia. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Procreate is a registered trademark of Savage Interactive Pty Ltd.</span>
              <span>·</span>
              <span className="text-[#ece7d5]/80">Tactile Modernism Atelier</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

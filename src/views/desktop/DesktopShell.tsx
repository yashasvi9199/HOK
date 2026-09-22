import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, Sparkles, ArrowRight, Instagram, Youtube, Award, Brush, Compass } from 'lucide-react';
import { Logo } from '../../assets/Logo';
import { AtelierButton } from '../../components/AtelierButton';
import { ArtworkCarousel } from '../../components/ArtworkCarousel';
import { StudentWorkGrid } from '../../components/StudentWorkGrid';
import { TestimonialCards } from '../../components/TestimonialCards';
import { LeadCaptureForm } from '../../components/LeadCaptureForm';
import { ArtworkModal } from '../../components/ArtworkModal';
import { SectionWrapper } from '../../components/SectionWrapper';
import { CookieBanner } from '../../components/CookieBanner';
import { useWhatsAppRedirect, STUDIO_INSTAGRAM_URL, STUDIO_YOUTUBE_URL } from '../../hooks/useWhatsAppRedirect';
import { Artwork } from '../../types';

interface DesktopShellProps {
  children?: React.ReactNode;
}

export const DesktopShell: React.FC<DesktopShellProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openDirectWhatsApp } = useWhatsAppRedirect();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'The Atelier', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Guidance & FAQ', path: '/faq' },
    { name: 'Contact & Studio', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] flex flex-col selection:bg-[#C5A059]/20 selection:text-[#1C1917]">
      <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />

      {/* Top Notification Ribbon */}
      <div className="bg-[#1C1917] text-[#FAF7F2] py-2 px-6 text-center text-xs font-sans tracking-widest uppercase border-b border-[#C5A059]/30 flex items-center justify-center gap-3">
        <span className="text-[#C5A059]">✦</span>
        <span>Admissions Open for Signature Procreate Couture Cohort 17 • Limited to 20 Atelier Seats</span>
        <span className="text-[#C5A059]">✦</span>
      </div>

      {/* Minimalist Editorial Desktop Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#F0ECE1] transition-all">
        <div className="max-w-7xl mx-auto px-8 md:px-12 h-24 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group cursor-pointer">
            <Logo variant="full" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-sans tracking-wide transition-colors relative py-1.5 cursor-pointer ${
                    isActive
                      ? 'text-[#1C1917] font-semibold'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  {link.name}
                  {/* Subtle Underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Direct WhatsApp CTA Button */}
          <div className="flex items-center gap-4">
            <AtelierButton
              variant="outline"
              size="sm"
              icon={<MessageCircle className="w-4 h-4 text-[#128C7E]" />}
              onClick={() => openDirectWhatsApp()}
              className="border-[#1C1917]/20 hover:border-[#1C1917]"
            >
              Direct WhatsApp
            </AtelierButton>

            <AtelierButton
              variant="primary"
              size="sm"
              onClick={() => {
                if (location.pathname !== '/') {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('lead-capture-form')?.scrollIntoView({ behavior: 'smooth' });
                  }, 200);
                } else {
                  document.getElementById('lead-capture-form')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Enroll Now
            </AtelierButton>
          </div>
        </div>
      </header>

      {/* Main Presentation Area */}
      <main className="flex-1">
        {isHome ? (
          <div>
            {/* 1. HERO BANNER SECTION (Desktop Expanded Editorial Layout) */}
            <section className="relative overflow-hidden pt-12 pb-24 border-b border-[#F0ECE1]">
              <div className="max-w-7xl mx-auto px-8 md:px-12">
                <div className="grid grid-cols-12 gap-12 items-center">
                  {/* Left Column: Editorial Headline & Manifesto (7 cols) */}
                  <div className="col-span-7 space-y-8 pr-4">
                    <div className="inline-flex items-center gap-2.5 bg-[#FFFFFF] border border-[#C5A059]/40 px-3.5 py-1.5 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="text-[11px] font-sans tracking-[0.25em] uppercase font-semibold text-[#1C1917]">
                        Digital Atelier & Academy
                      </span>
                    </div>

                    <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-light text-[#1C1917] leading-[1.08] tracking-tight">
                      The Digital Atelier:{' '}
                      <span className="italic font-normal text-[#C5A059] block mt-1">
                        Where Fashion Meets Procreate.
                      </span>
                    </h1>

                    <p className="font-sans text-lg text-[#78716C] leading-relaxed max-w-xl">
                      Master the art of luxury fashion illustration, bridal lehenga rendering, and digital couture on iPad Pro. We merge timeless handloom traditions with contemporary Apple Pencil craft — preserving the authentic, tactile soul of traditional art.
                    </p>

                    {/* CTAs */}
                    <div className="flex items-center gap-4 pt-2">
                      <AtelierButton
                        variant="primary"
                        size="lg"
                        icon={<ArrowRight className="w-4 h-4 text-[#C5A059]" />}
                        onClick={() => {
                          document.getElementById('lead-capture-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Explore Masterclasses
                      </AtelierButton>

                      <Link to="/gallery">
                        <AtelierButton variant="outline" size="lg">
                          View Atelier Gallery
                        </AtelierButton>
                      </Link>

                      <button
                        onClick={() => openDirectWhatsApp('Hello Vrinda, I would love to learn more about the Procreate masterclass curriculum.')}
                        className="p-3.5 border border-[#1C1917]/20 hover:border-[#128C7E] hover:bg-white text-[#128C7E] transition-all cursor-pointer shadow-xs"
                        title="Quick WhatsApp Chat"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Editorial Stats Strip */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#F0ECE1] max-w-lg">
                      <div>
                        <div className="font-serif text-3xl font-semibold text-[#1C1917]">2,500+</div>
                        <div className="text-xs font-sans text-[#78716C] uppercase tracking-wider mt-1">
                          Artists Mentored
                        </div>
                      </div>
                      <div>
                        <div className="font-serif text-3xl font-semibold text-[#1C1917]">35+</div>
                        <div className="text-xs font-sans text-[#78716C] uppercase tracking-wider mt-1">
                          Custom Brushes
                        </div>
                      </div>
                      <div>
                        <div className="font-serif text-3xl font-semibold text-[#1C1917]">18</div>
                        <div className="text-xs font-sans text-[#78716C] uppercase tracking-wider mt-1">
                          Countries Reached
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: High-Impact Visual Frame (5 cols) */}
                  <div className="col-span-5 relative">
                    {/* Shadowed Canvas Container */}
                    <div className="relative bg-[#FFFFFF] p-4 shadow-2xl border border-[#C5A059]/40 group">
                      <div className="relative aspect-[3/4] overflow-hidden bg-stone-900">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
                          alt="Fashion Illustration Artwork on Procreate"
                          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                        />

                        {/* Overlaid Palette Swatches */}
                        <div className="absolute top-4 right-4 bg-[#1C1917]/85 backdrop-blur-md p-2.5 border border-white/10 flex flex-col gap-1.5 shadow-lg">
                          <span className="text-[9px] uppercase tracking-widest text-stone-300 font-sans text-center mb-1">
                            Palette
                          </span>
                          <div className="w-5 h-5 bg-[#C5A059] border border-white/20" title="Antique Studio Gold" />
                          <div className="w-5 h-5 bg-[#FAF7F2] border border-white/20" title="Natural Linen" />
                          <div className="w-5 h-5 bg-[#1C1917] border border-white/20" title="Deep Charcoal" />
                          <div className="w-5 h-5 bg-[#8E2824] border border-white/20" title="Crimson Silk" />
                        </div>

                        {/* Floating iPad Canvas Specs Tag */}
                        <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-md p-3 border border-[#C5A059]/40 text-[#1C1917] flex items-center justify-between shadow-md">
                          <div className="flex items-center gap-2">
                            <Brush className="w-4 h-4 text-[#C5A059]" />
                            <span className="text-xs font-sans font-medium">
                              Apple Pencil Procreate Canvas • 68 Layers
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-[#78716C]">
                            300 DPI Ultra HD
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Decorative Seal */}
                    <div className="absolute -bottom-6 -left-6 bg-[#1C1917] text-[#FAF7F2] w-28 h-28 rounded-full border-2 border-[#C5A059] flex flex-col items-center justify-center p-2 text-center shadow-xl">
                      <span className="font-serif text-lg text-[#C5A059] font-bold">100%</span>
                      <span className="text-[9px] font-sans tracking-wider uppercase text-stone-300 leading-tight">
                        Tactile Texture Authentic
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. ARTIST BIO & PORTRAIT (Asymmetric Editorial Layout) */}
            <SectionWrapper bg="alabaster">
              <div className="grid grid-cols-12 gap-12 items-center">
                {/* Artist Portrait (5 cols) */}
                <div className="col-span-5 relative">
                  <div className="bg-[#FAF7F2] p-4 border border-[#F0ECE1] shadow-lg">
                    <div className="aspect-[4/5] relative overflow-hidden bg-stone-200">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                        alt="Vrinda Haldia - Fashion Designer, Digital Artist & Educator"
                        className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <span className="font-serif text-lg font-semibold text-[#1C1917]">
                        Vrinda Haldia
                      </span>
                      <p className="text-xs font-sans text-[#78716C] uppercase tracking-wider">
                        Founder, Lead Artist & Fashion Illustrator
                      </p>
                    </div>
                  </div>

                  {/* Flowing handwritten script accent */}
                  <div className="absolute -bottom-6 right-0 bg-[#FFFFFF] border border-[#C5A059]/40 py-2 px-5 shadow-md">
                    <span className="font-script text-3xl text-[#C5A059]">
                      "Art that breathes authenticity."
                    </span>
                  </div>
                </div>

                {/* Narrative (7 cols) */}
                <div className="col-span-7 space-y-6 pl-4">
                  <div className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.25em] uppercase font-semibold text-[#C5A059]">
                    <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>The Artist & Atelier Story</span>
                  </div>

                  <h2 className="font-serif text-4xl lg:text-5xl font-normal text-[#1C1917] tracking-tight leading-snug">
                    Bridging Traditional Indian Heritage with Digital Canvas Mastery.
                  </h2>

                  <div className="space-y-4 text-base font-sans text-[#78716C] leading-relaxed">
                    <p>
                      Trained in classical fashion design and textile history, Vrinda Haldia spent a decade sketching haute couture collections with gouache, dry inks, and gold foil leaves before bringing her signature technique into the digital realm.
                    </p>
                    <p>
                      Disappointed by the cold, plastic look of generic digital brushes, she spent years hand-calibrating the <strong className="text-[#1C1917]">House of Kalakaar Atelier Brush Library</strong> — simulating the real drag of sable hair against cold-pressed cotton paper, the luminous gleam of pure gold zardozi threads, and the delicate translucency of organza drapes.
                    </p>
                    <p>
                      Today, through House of Kalakaar, Vrinda has guided over 2,500 students across 18 countries — transforming beginner sketchers into confident digital illustrators capable of rendering runway collections, bridal stationery, and fine art pieces.
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-[#FAF7F2] border border-[#F0ECE1]">
                      <div className="font-serif text-base font-semibold text-[#1C1917] flex items-center gap-2">
                        <span className="text-[#C5A059]">✦</span> Couture Expertise
                      </div>
                      <p className="text-xs text-[#78716C] mt-1 font-sans">
                        Specialized in royal Indian bridal wear, jewellery faceting, and runway croquis.
                      </p>
                    </div>

                    <div className="p-4 bg-[#FAF7F2] border border-[#F0ECE1]">
                      <div className="font-serif text-base font-semibold text-[#1C1917] flex items-center gap-2">
                        <span className="text-[#C5A059]">✦</span> Zero-Jargon Mentorship
                      </div>
                      <p className="text-xs text-[#78716C] mt-1 font-sans">
                        Step-by-step guidance tailored for complete beginners and traditional artists.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionWrapper>

            {/* 3. INFINITE ARTWORK SHOWCASE CAROUSEL (Framer Motion Strip) */}
            <section className="py-20 bg-[#FAF7F2] border-b border-[#F0ECE1]">
              <div className="max-w-7xl mx-auto px-8 md:px-12 mb-10 flex items-end justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.25em] uppercase font-semibold text-[#C5A059] mb-2">
                    <Compass className="w-3.5 h-3.5" />
                    <span>The Atelier Gallery</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-semibold">
                    Original Masterpieces & Process Studies
                  </h2>
                  <p className="text-sm font-sans text-[#78716C] mt-1">
                    Hover over any canvas to inspect specifications, brushes used, and layer hierarchies.
                  </p>
                </div>

                <Link to="/gallery">
                  <AtelierButton variant="outline" size="sm">
                    View Full Catalog →
                  </AtelierButton>
                </Link>
              </div>

              <ArtworkCarousel onSelectArtwork={(art) => setSelectedArtwork(art)} isMobile={false} />
            </section>

            {/* 4. STUDENT ART SHOWCASE */}
            <SectionWrapper bg="cream">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.25em] uppercase font-semibold text-[#C5A059] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Academy Spotlight</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-semibold">
                  Student Transformations & Works
                </h2>
                <p className="text-base font-sans text-[#78716C] mt-3">
                  See how aspiring designers, traditional artists, and absolute beginners brought their creative visions to life in our Procreate cohorts.
                </p>
              </div>

              <StudentWorkGrid />
            </SectionWrapper>

            {/* 5. STUDENT & CLIENT TESTIMONIALS */}
            <SectionWrapper bg="alabaster">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.25em] uppercase font-semibold text-[#C5A059] mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Voices of the Atelier</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-semibold">
                  Loved by Designers, Students & Collectors
                </h2>
                <p className="text-base font-sans text-[#78716C] mt-2">
                  Read genuine feedback from artists who joined our cohorts and fashion brands who commissioned bespoke works.
                </p>
              </div>

              <TestimonialCards />
            </SectionWrapper>

            {/* 6. INTERACTIVE CREATIVE LEAD CAPTURE FORM */}
            <SectionWrapper bg="linen" id="admissions">
              <div className="max-w-4xl mx-auto">
                <LeadCaptureForm />
              </div>
            </SectionWrapper>
          </div>
        ) : (
          children
        )}
      </main>

      {/* 7. MINIMALIST EDITORIAL FOOTER */}
      <footer className="bg-[#1C1917] text-[#FAF7F2] pt-20 pb-12 border-t-2 border-[#C5A059]">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="grid grid-cols-12 gap-12 pb-16 border-b border-stone-800">
            {/* Brand Manifesto (5 cols) */}
            <div className="col-span-5 space-y-5">
              <Logo variant="full" theme="dark" />
              <p className="text-sm font-sans text-stone-400 leading-relaxed max-w-sm">
                A high-end digital art studio, fashion illustration brand, and Procreate mentoring academy founded by Vrinda Haldia. Preserving tactile heritage in the age of digital canvases.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={STUDIO_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-stone-700 hover:border-[#C5A059] flex items-center justify-center text-stone-300 hover:text-[#C5A059] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={STUDIO_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-stone-700 hover:border-[#C5A059] flex items-center justify-center text-stone-300 hover:text-red-400 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <button
                  onClick={() => openDirectWhatsApp()}
                  className="w-10 h-10 rounded-full border border-stone-700 hover:border-[#128C7E] flex items-center justify-center text-stone-300 hover:text-[#128C7E] transition-colors cursor-pointer"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Links (2 cols) */}
            <div className="col-span-2 space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-sm font-sans text-stone-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">The Atelier</Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-white transition-colors">Artwork Gallery</Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white transition-colors">Guidance & FAQ</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">Studio Coordinates</Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[#C5A059] transition-colors">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-[#C5A059] transition-colors">DPDP Privacy Notice</Link>
                </li>
              </ul>
            </div>

            {/* Programs & Academies (3 cols) */}
            <div className="col-span-3 space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
                Programs
              </h4>
              <ul className="space-y-2.5 text-sm font-sans text-stone-400">
                <li>
                  <span className="text-stone-300 block font-medium">Couture Masterclass (Cohort 17)</span>
                  <span className="text-xs text-stone-500">4-Week Immersive Weekend Cohort</span>
                </li>
                <li>
                  <span className="text-stone-300 block font-medium">Digital Portraiture & Glazing</span>
                  <span className="text-xs text-stone-500">Skin Tone & Light Diffusion</span>
                </li>
                <li>
                  <span className="text-stone-300 block font-medium">Custom Art Commissions</span>
                  <span className="text-xs text-stone-500">Bridal & Commercial Lookbooks</span>
                </li>
              </ul>
            </div>

            {/* Contact Studio (2 cols) */}
            <div className="col-span-2 space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
                Atelier Location
              </h4>
              <p className="text-xs font-sans text-stone-400 leading-relaxed">
                Civil Lines, C-Scheme<br />
                Jaipur, Rajasthan 302006, India<br />
                curator@houseofkalakaar.com
              </p>
              <AtelierButton
                variant="whatsapp"
                size="sm"
                className="w-full text-xs"
                onClick={() => openDirectWhatsApp()}
              >
                WhatsApp Us
              </AtelierButton>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-stone-500">
            <div>
              © {new Date().getFullYear()} House of Kalakaar by Vrinda Haldia. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link to="/terms" className="hover:text-stone-300 transition-colors">Terms</Link>
              <span className="text-stone-700">•</span>
              <Link to="/privacy" className="hover:text-stone-300 transition-colors">Privacy (DPDP)</Link>
              <span className="text-stone-700">•</span>
              <span>Procreate® Savage Interactive Pty Ltd</span>
              <span className="text-stone-700">•</span>
              <span className="text-stone-400">Tactile Modernism Atelier</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global DPDP Cookie & Privacy Consent Banner */}
      <CookieBanner />
    </div>
  );
};

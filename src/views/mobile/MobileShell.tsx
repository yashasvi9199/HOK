import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MessageCircle, Sparkles, ArrowRight, Instagram, Youtube, Award, Brush, Compass, ChevronRight } from 'lucide-react';
import { Logo } from '../../assets/Logo';
import { AtelierButton } from '../../components/AtelierButton';
import { ArtworkCarousel } from '../../components/ArtworkCarousel';
import { StudentWorkGrid } from '../../components/StudentWorkGrid';
import { TestimonialCards } from '../../components/TestimonialCards';
import { LeadCaptureForm } from '../../components/LeadCaptureForm';
import { ArtworkModal } from '../../components/ArtworkModal';
import { SectionWrapper } from '../../components/SectionWrapper';
import { useWhatsAppRedirect, STUDIO_INSTAGRAM_URL, STUDIO_YOUTUBE_URL } from '../../hooks/useWhatsAppRedirect';
import { Artwork } from '../../types';

interface MobileShellProps {
  children?: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openDirectWhatsApp } = useWhatsAppRedirect();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'The Atelier', path: '/' },
    { name: 'Artwork Gallery', path: '/gallery' },
    { name: 'Guidance & FAQ', path: '/faq' },
    { name: 'Contact & Studio', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    setIsDrawerOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] flex flex-col pb-20 selection:bg-[#C5A059]/20 selection:text-[#1C1917]">
      <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />

      {/* Top Mobile Notice Strip */}
      <div className="bg-[#1C1917] text-[#FAF7F2] py-1.5 px-4 text-center text-[10px] font-sans tracking-widest uppercase border-b border-[#C5A059]/30 flex items-center justify-center gap-2">
        <span className="text-[#C5A059]">✦</span>
        <span>Cohort 17 Enrolling • 20 Atelier Seats Only</span>
        <span className="text-[#C5A059]">✦</span>
      </div>

      {/* Mobile Sticky Editorial Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#F0ECE1] px-4 py-3 flex items-center justify-between shadow-xs">
        {/* Logo */}
        <Link to="/" className="cursor-pointer" onClick={() => setIsDrawerOpen(false)}>
          <Logo variant="compact" />
        </Link>

        {/* Right Actions: Quick WhatsApp + Hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => openDirectWhatsApp('Hello Vrinda, I am inquiring from the House of Kalakaar mobile portal.')}
            className="w-9 h-9 rounded-full bg-[#128C7E] text-white flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-transform"
            aria-label="Direct WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="w-9 h-9 border border-[#1C1917]/20 flex items-center justify-center text-[#1C1917] cursor-pointer active:scale-95 transition-transform"
            aria-label="Toggle Navigation Drawer"
          >
            {isDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 top-[88px] z-50 bg-[#1C1917]/70 backdrop-blur-xs flex flex-col">
          <div className="bg-[#FAF7F2] border-b border-[#C5A059]/40 p-6 flex flex-col space-y-5 shadow-2xl animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-1 divide-y divide-[#F0ECE1]">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.path)}
                    className={`py-3.5 text-left text-base font-serif flex items-center justify-between cursor-pointer ${
                      isActive ? 'text-[#C5A059] font-bold' : 'text-[#1C1917]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>
                );
              })}
            </nav>

            <div className="pt-2 space-y-3">
              <AtelierButton
                variant="whatsapp"
                className="w-full justify-center text-sm py-3"
                icon={<MessageCircle className="w-4 h-4" />}
                onClick={() => {
                  setIsDrawerOpen(false);
                  openDirectWhatsApp();
                }}
              >
                Chat Direct on WhatsApp
              </AtelierButton>

              <AtelierButton
                variant="primary"
                className="w-full justify-center text-sm py-3"
                onClick={() => {
                  setIsDrawerOpen(false);
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
                Enroll in Cohort 17
              </AtelierButton>
            </div>

            <div className="flex items-center justify-center gap-6 pt-3 border-t border-[#F0ECE1] text-xs text-[#78716C]">
              <a
                href={STUDIO_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[#1C1917]"
              >
                <Instagram className="w-4 h-4 text-[#C5A059]" />
                <span>Instagram</span>
              </a>
              <a
                href={STUDIO_YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[#1C1917]"
              >
                <Youtube className="w-4 h-4 text-red-600" />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Presentation Area */}
      <main className="flex-1">
        {isHome ? (
          <div>
            {/* 1. MOBILE HERO BANNER SECTION */}
            <section className="relative px-5 pt-8 pb-12 border-b border-[#F0ECE1]">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 bg-[#FFFFFF] border border-[#C5A059]/40 px-3 py-1 shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-semibold text-[#1C1917]">
                    Digital Atelier & Academy
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1917] leading-tight tracking-tight">
                  The Digital Atelier:{' '}
                  <span className="italic font-normal text-[#C5A059] block mt-1">
                    Where Fashion Meets Procreate.
                  </span>
                </h1>

                <p className="font-sans text-sm text-[#78716C] leading-relaxed">
                  Master the art of luxury fashion illustration, bridal rendering, and couture croquis on iPad Pro with genuine tactile authenticity.
                </p>

                {/* Mobile Touch Visual Frame */}
                <div className="relative bg-[#FFFFFF] p-2.5 shadow-lg border border-[#C5A059]/40 mt-3">
                  <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                      alt="Couture Artwork on Procreate"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-[#FAF7F2]/95 backdrop-blur-md p-2 border border-[#C5A059]/40 text-[#1C1917] flex items-center justify-between text-[11px] font-sans">
                      <div className="flex items-center gap-1.5">
                        <Brush className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span className="font-medium">Procreate Canvas</span>
                      </div>
                      <span className="text-[9px] font-mono text-[#78716C]">68 Layers</span>
                    </div>
                  </div>
                </div>

                {/* Mobile CTAs */}
                <div className="space-y-2.5 pt-2">
                  <AtelierButton
                    variant="primary"
                    size="md"
                    className="w-full justify-center text-sm py-3.5"
                    icon={<ArrowRight className="w-4 h-4 text-[#C5A059]" />}
                    onClick={() => {
                      document.getElementById('lead-capture-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explore Masterclasses
                  </AtelierButton>

                  <Link to="/gallery" className="block w-full">
                    <AtelierButton variant="outline" size="md" className="w-full justify-center text-sm py-3">
                      View Atelier Gallery
                    </AtelierButton>
                  </Link>
                </div>

                {/* Mobile Stats Ribbon */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#F0ECE1] text-center">
                  <div className="p-2 bg-[#FFFFFF] border border-[#F0ECE1]">
                    <div className="font-serif text-xl font-semibold text-[#1C1917]">2,500+</div>
                    <div className="text-[10px] font-sans text-[#78716C] uppercase tracking-wider mt-0.5">
                      Artists
                    </div>
                  </div>
                  <div className="p-2 bg-[#FFFFFF] border border-[#F0ECE1]">
                    <div className="font-serif text-xl font-semibold text-[#1C1917]">35+</div>
                    <div className="text-[10px] font-sans text-[#78716C] uppercase tracking-wider mt-0.5">
                      Brushes
                    </div>
                  </div>
                  <div className="p-2 bg-[#FFFFFF] border border-[#F0ECE1]">
                    <div className="font-serif text-xl font-semibold text-[#1C1917]">18</div>
                    <div className="text-[10px] font-sans text-[#78716C] uppercase tracking-wider mt-0.5">
                      Countries
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. ARTIST BIO & PORTRAIT */}
            <SectionWrapper bg="alabaster" className="py-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-[10px] font-sans tracking-[0.2em] uppercase font-semibold text-[#C5A059]">
                  <Award className="w-3.5 h-3.5" />
                  <span>The Artist Story</span>
                </div>

                {/* Portrait */}
                <div className="relative bg-[#FAF7F2] p-3 border border-[#F0ECE1]">
                  <div className="aspect-[4/5] overflow-hidden bg-stone-200">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80"
                      alt="Vrinda Haldia"
                      className="w-full h-full object-cover object-top filter grayscale contrast-105"
                    />
                  </div>
                  <div className="mt-2.5 text-center">
                    <span className="font-serif text-lg font-semibold text-[#1C1917] block">
                      Vrinda Haldia
                    </span>
                    <span className="text-[11px] font-sans text-[#78716C] uppercase tracking-wider">
                      Founder, Fashion Illustrator & Mentor
                    </span>
                  </div>

                  {/* Flowing handwritten script accent */}
                  <div className="mt-2 text-center bg-[#FFFFFF] border border-[#C5A059]/40 py-2 px-3">
                    <span className="font-script text-2xl text-[#C5A059]">
                      "Art that breathes authenticity."
                    </span>
                  </div>
                </div>

                {/* Mobile Narrative */}
                <div className="space-y-3 text-sm font-sans text-[#78716C] leading-relaxed">
                  <p>
                    Trained in classical fashion design and Indian textiles, Vrinda Haldia bridged traditional gouache and gold leaf crafts into Procreate with custom hand-calibrated brush algorithms.
                  </p>
                  <p>
                    Through House of Kalakaar, she has personally trained 2,500+ students worldwide, equipping them to render runway croquis, bridal couture, and bespoke fashion lookbooks.
                  </p>
                </div>
              </div>
            </SectionWrapper>

            {/* 3. INFINITE ARTWORK SHOWCASE CAROUSEL */}
            <section className="py-12 bg-[#FAF7F2] border-b border-[#F0ECE1]">
              <div className="px-5 mb-6 flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] uppercase font-semibold text-[#C5A059]">
                    <Compass className="w-3 h-3" />
                    <span>The Atelier Gallery</span>
                  </div>
                  <h2 className="font-serif text-2xl text-[#1C1917] font-semibold mt-0.5">
                    Original Masterpieces
                  </h2>
                </div>
                <Link to="/gallery" className="text-xs text-[#C5A059] font-sans font-semibold">
                  View All →
                </Link>
              </div>

              <ArtworkCarousel onSelectArtwork={(art) => setSelectedArtwork(art)} isMobile={true} />
            </section>

            {/* 4. STUDENT ART SHOWCASE */}
            <SectionWrapper bg="cream" className="py-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] uppercase font-semibold text-[#C5A059] mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Student Spotlight</span>
                </div>
                <h2 className="font-serif text-2xl text-[#1C1917] font-semibold">
                  Student Transformations
                </h2>
                <p className="text-xs font-sans text-[#78716C] mt-1">
                  Works created during our Procreate workshops
                </p>
              </div>

              <StudentWorkGrid />
            </SectionWrapper>

            {/* 5. STUDENT & CLIENT TESTIMONIALS */}
            <SectionWrapper bg="alabaster" className="py-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] uppercase font-semibold text-[#C5A059] mb-1">
                  <Award className="w-3 h-3" />
                  <span>Student Reviews</span>
                </div>
                <h2 className="font-serif text-2xl text-[#1C1917] font-semibold">
                  Loved by Designers & Students
                </h2>
              </div>

              <TestimonialCards />
            </SectionWrapper>

            {/* 6. INTERACTIVE CREATIVE LEAD CAPTURE FORM */}
            <SectionWrapper bg="linen" className="py-12" id="admissions">
              <LeadCaptureForm isCompact={true} />
            </SectionWrapper>
          </div>
        ) : (
          children
        )}
      </main>

      {/* Mobile Footer */}
      <footer className="bg-[#1C1917] text-[#FAF7F2] pt-12 pb-16 px-5 border-t-2 border-[#C5A059]">
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <Logo variant="compact" theme="dark" />
          </div>

          <p className="text-xs font-sans text-stone-400 max-w-xs mx-auto leading-relaxed">
            High-end digital art studio, fashion illustration brand, and Procreate mentoring academy by Vrinda Haldia.
          </p>

          <div className="flex justify-center gap-4 py-2">
            <a
              href={STUDIO_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center text-stone-300 hover:text-[#C5A059]"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={STUDIO_YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center text-stone-300 hover:text-red-400"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <button
              onClick={() => openDirectWhatsApp()}
              className="w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center text-stone-300 hover:text-[#128C7E]"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] font-sans text-stone-500 pt-4 border-t border-stone-800">
            © {new Date().getFullYear()} House of Kalakaar by Vrinda Haldia.
          </div>
        </div>
      </footer>

      {/* Thumb-Friendly Sticky Mobile Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#C5A059]/40 p-2.5 flex items-center gap-2 shadow-2xl">
        <button
          onClick={() => openDirectWhatsApp('Hello Vrinda, I would like to inquire about enrolling in House of Kalakaar masterclasses.')}
          className="flex-1 bg-[#128C7E] text-white py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer shadow-xs active:scale-[0.98]"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </button>

        <button
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
          className="flex-1 bg-[#1C1917] text-[#FAF7F2] py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer shadow-xs active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Enroll Now</span>
        </button>
      </div>
    </div>
  );
};

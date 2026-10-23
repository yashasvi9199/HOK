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
import { Skiper19 } from '../../components/Skiper19';
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

  const [isNavVisible, setIsNavVisible] = useState(!isHome);
  const [isVideoEnded, setIsVideoEnded] = useState(!isHome);
  const [isScrolled, setIsScrolled] = useState(!isHome);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const navLinks = [
    { name: 'The Atelier', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Scroll Effect', path: '/scroll-effect' },
    { name: 'Guidance & FAQ', path: '/faq' },
    { name: 'Contact & Studio', path: '/contact' },
  ];

  // Lock scroll while video is playing as loading screen on desktop home
  React.useEffect(() => {
    if (!isHome || isVideoEnded) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'instant' });

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'Space', 'PageDown', 'PageUp', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
    };
  }, [isHome, isVideoEnded]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      if (time >= 7 && !isNavVisible) {
        setIsNavVisible(true);
      }
      if (time >= 7.95 && !isVideoEnded) {
        setIsVideoEnded(true);
        videoRef.current.pause();
      }
    }
  };

  const handleVideoEnded = () => {
    setIsNavVisible(true);
    setIsVideoEnded(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Safety fallback after 8.2s if video autoplay fails or is delayed
  React.useEffect(() => {
    if (!isHome) {
      setIsNavVisible(true);
      setIsVideoEnded(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsNavVisible(true);
      setIsVideoEnded(true);
    }, 8200);

    return () => clearTimeout(timer);
  }, [isHome]);

  // Monitor scroll to reveal top bar header when scrolled past hero
  React.useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const scrollToAdmissions = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('admissions') || document.getElementById('lead-capture-form');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      const el = document.getElementById('admissions') || document.getElementById('lead-capture-form');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] flex flex-col selection:bg-[#C5A059]/20 selection:text-[#1C1917]">
      <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />

      {/* Top Header & Ribbon - Shown when scrolled down on Home, or always on other pages */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isHome
            ? `fixed top-0 left-0 right-0 z-50 ${
                isScrolled
                  ? 'translate-y-0 opacity-100 pointer-events-auto'
                  : '-translate-y-full opacity-0 pointer-events-none'
              }`
            : 'sticky top-0 z-40'
        }`}
      >
        {/* Top Notification Ribbon */}
        <div className="bg-[#1C1917] text-[#FAF7F2] py-2 px-6 text-center text-xs font-sans tracking-widest uppercase border-b border-[#C5A059]/30 flex flex-wrap items-center justify-center gap-3">
          <span className="text-[#C5A059]">✦</span>
          <span>Admissions Open for Signature Procreate Couture Cohort 17</span>
          <span className="text-[#C5A059]">•</span>
          <Link
            to="/scroll-effect"
            className="inline-flex items-center gap-1.5 bg-[#C5A059]/20 hover:bg-[#C5A059]/35 border border-[#C5A059]/60 text-[#FAF7F2] px-2.5 py-0.5 rounded text-[11px] font-sans font-medium transition-colors"
          >
            <Sparkles className="w-3 h-3 text-[#C2F84F]" />
            <span>Interactive Scroll Effect (@skiper-ui/skiper19)</span>
          </Link>
          <span className="text-[#C5A059]">✦</span>
        </div>

        {/* Minimalist Editorial Desktop Header */}
        <header className="bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#F0ECE1] shadow-xs transition-all">
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
                onClick={scrollToAdmissions}
              >
                Enroll Now
              </AtelierButton>
            </div>
          </div>
        </header>
      </div>

      {/* Main Presentation Area */}
      <main className="flex-1">
        {isHome ? (
          <div>
            {/* 1. IMMERSIVE HERO VIDEO LOADING & NAVIGATION SECTION (Desktop View Only) */}
            <section className="relative w-full h-screen overflow-hidden bg-[#1C1917] flex items-center justify-center select-none">
              <video
                ref={videoRef}
                src="/hero-noLogo.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Contrast Vignette Gradient on Left to Guarantee Nav Readability */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent transition-opacity duration-1000 pointer-events-none ${
                  isNavVisible ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Left-Aligned Vertical Navigation Overlay with Top-Left Logo */}
              <div
                className={`absolute inset-0 z-20 flex flex-col justify-between p-10 lg:p-14 pointer-events-none transition-all duration-1000 ease-out ${
                  isNavVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                }`}
              >
                {/* Top-Left Logo with /Logo.png */}
                <div className="pointer-events-auto">
                  <Link to="/" className="group cursor-pointer inline-flex items-center gap-3.5">
                    <img
                      src="/Logo.png"
                      alt="House of Kalakaar"
                      className="w-12 h-12 lg:w-14 lg:h-14 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
                    />
                    <div className="flex flex-col text-left">
                      <span className="font-serif text-xl lg:text-2xl font-semibold tracking-tight text-white leading-tight drop-shadow-md">
                        House of Kalakaar
                      </span>
                      <span className="text-[10px] lg:text-[11px] font-sans tracking-[0.22em] uppercase font-medium text-[#C5A059] drop-shadow-md">
                        by Vrinda Haldia
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Left-Aligned Vertical Navigation Menu */}
                <div className="pointer-events-auto flex flex-col gap-6 my-auto max-w-sm">
                  <nav className="flex flex-col gap-5">
                    {navLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.name}
                          to={link.path}
                          className={`group flex items-center gap-3.5 text-lg lg:text-xl font-serif tracking-wider transition-all duration-300 cursor-pointer ${
                            isActive
                              ? 'text-[#C5A059] font-medium translate-x-2'
                              : 'text-stone-200 hover:text-[#C5A059] hover:translate-x-2'
                          }`}
                        >
                          <span
                            className={`h-[1.5px] bg-[#C5A059] transition-all duration-300 ${
                              isActive ? 'w-6' : 'w-0 group-hover:w-4'
                            }`}
                          />
                          <span className="drop-shadow-lg">{link.name}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Overlaid Quick Action Buttons */}
                  <div className="flex items-center gap-4 pt-2">
                    <AtelierButton
                      variant="primary"
                      size="sm"
                      onClick={scrollToAdmissions}
                      className="shadow-xl"
                    >
                      Enroll Now
                    </AtelierButton>

                    <AtelierButton
                      variant="outline"
                      size="sm"
                      icon={<MessageCircle className="w-4 h-4 text-[#128C7E]" />}
                      onClick={() => openDirectWhatsApp()}
                      className="bg-black/40 text-white border-white/30 hover:bg-white/20 hover:text-white shadow-xl"
                    >
                      Direct WhatsApp
                    </AtelierButton>
                  </div>
                </div>

                {/* Bottom Scroll Cue (Visible once video ends and scroll is unlocked) */}
                <div
                  className={`transition-all duration-700 ${
                    isVideoEnded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <button
                    onClick={() => {
                      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                    }}
                    className="pointer-events-auto inline-flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.25em] text-stone-300 hover:text-white transition-colors cursor-pointer group"
                  >
                    <span>Scroll to Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-90 text-[#C5A059] group-hover:translate-y-1 transition-transform" />
                  </button>
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

            {/* INTERACTIVE @skiper-ui/skiper19 SCROLL ANIMATION SHOWCASE */}
            <section className="relative py-28 bg-[#1C1917] text-[#FAF7F2] overflow-hidden border-y-2 border-[#C5A059]/30">
              {/* Dynamic SVG Follow Scroll stroke drawing with scroll */}
              <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden opacity-75">
                <Skiper19
                  className="w-full h-full max-w-6xl max-h-[140%] translate-y-12"
                  strokeColor="#C5A059"
                  strokeWidth={16}
                  pathLengthRange={[0, 1]}
                />
              </div>

              <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
                <div className="inline-flex items-center gap-2 mb-4 bg-stone-900 border border-[#C5A059]/50 px-4 py-1.5 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#C2F84F]" />
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C5A059]">
                    @skiper-ui/skiper19 Component Demo
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight mb-4">
                  The Living Stroke: Dynamic Scroll-Driven SVG
                </h2>

                <p className="text-base sm:text-lg text-stone-300 font-sans leading-relaxed max-w-2xl mx-auto mb-8">
                  As you scroll, this gold atelier stroke dynamically draws along an intricate curved path using Framer Motion's <span className="text-[#C2F84F] font-mono">useScroll</span> and <span className="text-[#C2F84F] font-mono">useTransform</span>.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link to="/scroll-effect">
                    <AtelierButton variant="primary" size="md">
                      Open Fullscreen 350vh Experience →
                    </AtelierButton>
                  </Link>

                  <AtelierButton
                    variant="outline"
                    size="md"
                    onClick={scrollToAdmissions}
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Apply for Cohort 17
                  </AtelierButton>
                </div>
              </div>
            </section>

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

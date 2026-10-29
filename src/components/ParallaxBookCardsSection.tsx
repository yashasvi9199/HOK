import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { X, BookOpen, Lock, Sparkles } from 'lucide-react';
import aboutData from '../data/about.json';
import {
  generateOilPastelArtwork,
  generateDrippingPaintBackground,
  PastelSubject,
} from '../utils/proceduralArtGenerator';
import { BRAND_LOGO_URL } from '../assets/Logo';

export type ActiveBookCardId = '01' | '02' | null;

interface ParallaxBookCardsSectionProps {
  activeCard: ActiveBookCardId;
  onSelectCard: (cardId: ActiveBookCardId) => void;
}

interface DigitalMediaSlide {
  id: string;
  title: string;
  issue: string;
  subject: PastelSubject;
  customUrl?: string;
}

const TOP_ROW_SLIDES: DigitalMediaSlide[] = [
  { id: 'dm-t1', title: 'SOLAR COUTURE DRAPE', issue: 'ISSUE 01', subject: 'illustration_drape' },
  { id: 'dm-t2', title: 'VELVET NOCTURNE STUDY', issue: 'ISSUE 02', subject: 'digital_velvet_4' },
  { id: 'dm-t3', title: 'CRIMSON SILK & OCHRE', issue: 'ISSUE 03', subject: 'digital_couture_2' },
  { id: 'dm-t4', title: 'HERITAGE ZARDOZI ARCHIVE', issue: 'ISSUE 04', subject: 'digital_heritage_5' },
  { id: 'dm-t5', title: 'PASTEL IMPASTO CROQUIS', issue: 'ISSUE 05', subject: 'composition_abstract' },
  { id: 'dm-t6', title: 'ATELIER VESSELS & LINEN', issue: 'ISSUE 06', subject: 'stilllife_vessels' },
];

const BOTTOM_ROW_SLIDES: DigitalMediaSlide[] = [
  { id: 'dm-b1', title: 'CHIAROSCURO GAZE', issue: 'VOL. I', subject: 'illustration_portrait' },
  { id: 'dm-b2', title: 'ROYAL BOTANICAL CROWN', issue: 'VOL. II', subject: 'stilllife_botanical' },
  { id: 'dm-b3', title: 'THE ARTIST TABLE STUDY', issue: 'VOL. III', subject: 'composition_atelier' },
  { id: 'dm-b4', title: 'GILDED BANARASI WEAVE', issue: 'VOL. IV', subject: 'digital_couture_1' },
  { id: 'dm-b5', title: 'EDITORIAL MONOGRAPH', issue: 'VOL. V', subject: 'digital_editorial_3' },
  { id: 'dm-b6', title: 'LUMINOUS GLAZE PORTRAIT', issue: 'VOL. VI', subject: 'digital_glaze_6' },
];

export const ParallaxBookCardsSection: React.FC<ParallaxBookCardsSectionProps> = ({
  activeCard,
  onSelectCard,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [comingSoonToast, setComingSoonToast] = useState<string | null>(null);
  const [bookOpeningId, setBookOpeningId] = useState<ActiveBookCardId>(null);

  // Parallax scroll progress for the 4 cards container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Distinct parallax vertical offsets for each of the 4 cards
  const yCard1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [110, -95]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const yCard4 = useTransform(scrollYProgress, [0, 1], [95, -80]);

  // Generate high-res procedural oil pastel & dripping paint data URLs once
  const artworks = useMemo(() => {
    return {
      drippingBg: generateDrippingPaintBackground(1200, 800),
      // 6 layered images for Section 2.01 About us
      bottomLeftRect: generateOilPastelArtwork('illustration_drape', 840, 630),
      bottomMiddleSquare: generateOilPastelArtwork('composition_abstract', 640, 640),
      bottomRightSquare: generateOilPastelArtwork('stilllife_vessels', 640, 640),
      middleLeftSquare: generateOilPastelArtwork('illustration_portrait', 640, 640),
      middleRightRect: generateOilPastelArtwork('composition_atelier', 840, 630),
      topCenterSquare: generateOilPastelArtwork('stilllife_botanical', 640, 640),
      // Digital media uniform slides
      digitalMediaMap: {
        illustration_drape: generateOilPastelArtwork('illustration_drape', 760, 520),
        digital_velvet_4: generateOilPastelArtwork('digital_velvet_4', 760, 520),
        digital_couture_2: generateOilPastelArtwork('digital_couture_2', 760, 520),
        digital_heritage_5: generateOilPastelArtwork('digital_heritage_5', 760, 520),
        composition_abstract: generateOilPastelArtwork('composition_abstract', 760, 520),
        stilllife_vessels: generateOilPastelArtwork('stilllife_vessels', 760, 520),
        illustration_portrait: generateOilPastelArtwork('illustration_portrait', 760, 520),
        stilllife_botanical: generateOilPastelArtwork('stilllife_botanical', 760, 520),
        composition_atelier: generateOilPastelArtwork('composition_atelier', 760, 520),
        digital_couture_1: generateOilPastelArtwork('digital_couture_1', 760, 520),
        digital_editorial_3: generateOilPastelArtwork('digital_editorial_3', 760, 520),
        digital_glaze_6: generateOilPastelArtwork('digital_glaze_6', 760, 520),
      } as Record<PastelSubject, string>,
    };
  }, []);

  // Escape key handler to return to 4 cards section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeCard !== null) {
        onSelectCard(null);
        setBookOpeningId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCard, onSelectCard]);

  // Lock body scroll while full-screen book overlay is open
  useEffect(() => {
    if (activeCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeCard]);

  const handleCardClick = (id: '01' | '02' | '03' | '04', label: string) => {
    if (id === '03' || id === '04') {
      setComingSoonToast(`${label} chapter is currently being curated in the atelier — Coming Soon.`);
      setTimeout(() => setComingSoonToast(null), 3400);
      return;
    }

    // Trigger 3D book cover opening before full-screen expansion
    setBookOpeningId(id);
    setTimeout(() => {
      onSelectCard(id);
    }, 340);
  };

  const handleCloseOverlay = () => {
    onSelectCard(null);
    setBookOpeningId(null);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  // Repeat marquee text for seamless right-to-left loop
  const marqueeItems = Array.from({ length: 14 }, (_, i) => i);

  return (
    <section
      id="parallax-cards-section"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#837d75] text-[#ece7d5] overflow-hidden border-b border-[#30292a]/40"
    >
      {/* Subtle Architectural Grid Lines */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 relative z-10">
        {/* Section Heading with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#ece7d5]/25 pb-8"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase text-[#ece7d5]/80 mb-3">
              <span>Interactive Atelier Volumes</span>
              <span aria-hidden="true">·</span>
              <span>Select a Volume to Open</span>
            </div>
            <h2
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#ece7d5] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              The Four Pillars of Kalakaar
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#ece7d5]/85 max-w-md leading-relaxed">
            Each card is bound like an artist monograph. Click Volume 01 or Volume 02 to unfold its cover in 3D space and immerse yourself in the full-screen folio.
          </p>
        </motion.div>

        {/* Coming Soon Notification Banner for Cards 03 & 04 */}
        <AnimatePresence>
          {comingSoonToast && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mb-8 p-4 bg-[#30292a] border border-[#a33533] text-[#ece7d5] flex items-center justify-between text-xs sm:text-sm font-sans shadow-xl"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#a33533] shrink-0" />
                <span>{comingSoonToast}</span>
              </div>
              <button
                type="button"
                onClick={() => setComingSoonToast(null)}
                className="text-[#ece7d5]/70 hover:text-[#ece7d5] cursor-pointer px-2"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4 PARALLAX CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 perspective-book">
          {/* CARD 01: '01 About us' — Solid #806055 with Splash Tropical Font in #ffffff */}
          <motion.div
            style={{ y: yCard1 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="perspective-book"
          >
            <motion.div
              onClick={() => handleCardClick('01', '01 About us')}
              animate={
                bookOpeningId === '01'
                  ? { rotateY: -115, scale: 1.06, opacity: 0.4 }
                  : { rotateY: 0, scale: 1, opacity: 1 }
              }
              whileHover={{ rotateY: -10, scale: 1.015 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[380px] sm:h-[430px] w-full bg-[#806055] border-2 border-[#ece7d5]/30 shadow-[0_24px_60px_rgba(48,41,42,0.5)] cursor-pointer overflow-hidden flex flex-col justify-between p-8 sm:p-10 preserve-3d book-spine-origin select-none"
            >
              {/* Book Spine Crease on Left Edge */}
              <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-[#30292a]/60 via-[#ece7d5]/15 to-transparent pointer-events-none" />
              <div className="absolute top-3 bottom-3 right-2 w-1.5 border-r border-y border-[#ffffff]/30 pointer-events-none" />

              {/* Top Header Row */}
              <div className="flex items-center justify-between z-10">
                <span className="font-splash text-2xl sm:text-3xl text-[#ffffff] tracking-wider">
                  01
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-splash text-[#ffffff]/90 border border-[#ffffff]/35 px-3 py-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Book</span>
                </span>
              </div>

              {/* Center/Bottom Label in Splash Tropical Font #ffffff */}
              <div className="my-auto py-6 text-center z-10">
                <h3 className="font-splash text-5xl sm:text-6xl lg:text-7xl text-[#ffffff] drop-shadow-[0_4px_16px_rgba(48,41,42,0.35)] group-hover:scale-105 transition-transform duration-500">
                  01 About us
                </h3>
                <p className="font-splash text-lg sm:text-xl text-[#ffffff]/90 mt-4">
                  Oil Pastel Heritage · Studio Manifesto · Layered Works
                </p>
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between text-xs font-splash text-[#ffffff]/80 border-t border-[#ffffff]/25 pt-4 z-10">
                <span>Solid Drystone Clay Edition</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  Click to unfold cover →
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* CARD 02: '02 Digital Media' — Dripping Paint Background + Afrocultures Font */}
          <motion.div
            style={{ y: yCard2 }}
            initial={{ opacity: 0, y: 65 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="perspective-book md:mt-12"
          >
            <motion.div
              onClick={() => handleCardClick('02', '02 Digital Media')}
              animate={
                bookOpeningId === '02'
                  ? { rotateY: -115, scale: 1.06, opacity: 0.4 }
                  : { rotateY: 0, scale: 1, opacity: 1 }
              }
              whileHover={{ rotateY: -10, scale: 1.015 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[380px] sm:h-[430px] w-full bg-[#30292a] border-2 border-[#ece7d5]/30 shadow-[0_24px_60px_rgba(48,41,42,0.55)] cursor-pointer overflow-hidden flex flex-col justify-between p-8 sm:p-10 preserve-3d book-spine-origin select-none"
            >
              {/* Dripping Paint Image Background */}
              {artworks.drippingBg && (
                <img
                  src={artworks.drippingBg}
                  alt="Dripping Paint Artwork Background"
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Contrast Scrim for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#30292a]/95 via-[#30292a]/55 to-[#30292a]/30 pointer-events-none" />

              {/* Book Spine Crease */}
              <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/80 via-white/10 to-transparent pointer-events-none z-10" />
              <div className="absolute top-3 bottom-3 right-2 w-1.5 border-r border-y border-[#ece7d5]/30 pointer-events-none z-10" />

              {/* Top Header Row */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-afrocultures text-xl sm:text-2xl font-extrabold text-[#ece7d5] bg-[#a33533] px-3 py-1">
                  02
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-afrocultures text-[#ece7d5] bg-[#30292a]/85 border border-[#ece7d5]/40 px-3 py-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#a33533]" />
                  <span>Open Book</span>
                </span>
              </div>

              {/* Center Title in Afrocultures Font */}
              <div className="relative z-10 my-auto py-6 text-center">
                <h3 className="font-afrocultures text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ece7d5] tracking-wider drop-shadow-[0_6px_20px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500">
                  02 Digital Media
                </h3>
                <p className="font-afrocultures text-xs sm:text-sm text-[#ece7d5]/90 mt-4 tracking-[0.2em]">
                  LOGBOOK MAGAZINE ART · DUAL MOTION ARCHIVE
                </p>
              </div>

              {/* Bottom Footer */}
              <div className="relative z-10 flex items-center justify-between text-xs font-afrocultures text-[#ece7d5]/85 border-t border-[#ece7d5]/25 pt-4">
                <span>Dripping Pigment Edition</span>
                <span className="text-[#a33533] font-bold group-hover:translate-x-1 transition-transform">
                  UNFOLD FOLIO →
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* CARD 03: '03 illustration' — Obsidian Veil & Cindered Red (Coming Soon) */}
          <motion.div
            style={{ y: yCard3 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="perspective-book"
          >
            <motion.div
              onClick={() => handleCardClick('03', '03 illustration')}
              whileHover={{ rotateY: -6, scale: 1.01 }}
              transition={{ duration: 0.35 }}
              className="group relative h-[360px] sm:h-[400px] w-full bg-[#30292a] border-2 border-[#a33533]/60 shadow-[0_24px_60px_rgba(48,41,42,0.5)] cursor-pointer overflow-hidden flex flex-col justify-between p-8 sm:p-10 preserve-3d book-spine-origin select-none"
            >
              {/* Book Spine Crease */}
              <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/70 via-[#a33533]/20 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between z-10">
                <span className="font-serif text-2xl sm:text-3xl text-[#a33533] font-semibold">
                  03
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-widest text-[#ece7d5]/80 border border-[#ece7d5]/25 px-3 py-1">
                  <Lock className="w-3 h-3 text-[#a33533]" />
                  <span>Coming Soon</span>
                </span>
              </div>

              <div className="my-auto py-6 text-center z-10">
                <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#ece7d5] italic font-normal tracking-tight">
                  03 illustration
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#ece7d5]/70 mt-3 uppercase tracking-[0.22em]">
                  Runway Croquis & Couture Line Studies
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-sans text-[#ece7d5]/60 border-t border-[#ece7d5]/15 pt-4 z-10">
                <span>Obsidian Veil Folio</span>
                <span>In Curation · Coming Soon</span>
              </div>
            </motion.div>
          </motion.div>

          {/* CARD 04: '04 design process' — Smoke Whisper #ece7d5 & Obsidian #30292a (Coming Soon) */}
          <motion.div
            style={{ y: yCard4 }}
            initial={{ opacity: 0, y: 65 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="perspective-book md:mt-12"
          >
            <motion.div
              onClick={() => handleCardClick('04', '04 design process')}
              whileHover={{ rotateY: -6, scale: 1.01 }}
              transition={{ duration: 0.35 }}
              className="group relative h-[360px] sm:h-[400px] w-full bg-[#ece7d5] text-[#30292a] border-2 border-[#30292a]/30 shadow-[0_24px_60px_rgba(48,41,42,0.45)] cursor-pointer overflow-hidden flex flex-col justify-between p-8 sm:p-10 preserve-3d book-spine-origin select-none"
            >
              {/* Book Spine Crease */}
              <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-[#30292a]/35 via-[#806055]/15 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between z-10">
                <span className="font-serif text-2xl sm:text-3xl text-[#806055] font-semibold">
                  04
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-widest text-[#30292a]/80 border border-[#30292a]/25 px-3 py-1">
                  <Lock className="w-3 h-3 text-[#a33533]" />
                  <span>Coming Soon</span>
                </span>
              </div>

              <div className="my-auto py-6 text-center z-10">
                <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#30292a] font-normal tracking-tight">
                  04 design process
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#806055] mt-3 uppercase tracking-[0.22em]">
                  From Charcoal Sketch to 68-Layer Procreate Master
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-sans text-[#30292a]/70 border-t border-[#30292a]/15 pt-4 z-10">
                <span>Smoke Whisper Edition</span>
                <span>In Curation · Coming Soon</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* =====================================================================
          FULL-SCREEN 3D BOOK OVERLAYS (Section 2.01 About us & Section 2.02 Digital Media)
      ===================================================================== */}
      <AnimatePresence>
        {activeCard === '01' && (
          <motion.div
            key="overlay-01-about"
            initial={{ opacity: 0, rotateY: -85, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -65, scale: 0.94 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left center' }}
            className="fixed inset-0 z-50 w-screen h-screen bg-[#806055] text-[#ffffff] overflow-y-auto overflow-x-hidden flex flex-col justify-between font-splash shadow-2xl"
          >
            {/* Book Spine Shadow on Left Edge */}
            <div className="fixed top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-[#30292a]/70 to-transparent pointer-events-none z-30" />

            {/* Top Navigation Bar inside Overlay (Supports 'Gallery' option + Top-Right Cross '✕' + ESC) */}
            <header className="sticky top-0 z-40 flex items-center justify-between px-6 sm:px-10 py-4 bg-[#806055]/95 backdrop-blur-md border-b border-[#ffffff]/20">
              <div className="flex items-center gap-3">
                <img
                  src={BRAND_LOGO_URL}
                  alt="House of Kalakaar"
                  className="w-10 h-10 object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="font-splash text-xl sm:text-2xl text-[#ffffff]">
                  {aboutData.cardNumber} · {aboutData.cardTitle}
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                {/* Top Nav Bar option 'Gallery' to return to 4 cards section */}
                <button
                  type="button"
                  onClick={handleCloseOverlay}
                  className="font-splash text-lg sm:text-xl text-[#ffffff] hover:text-[#ece7d5] underline underline-offset-4 cursor-pointer transition-colors"
                >
                  Gallery
                </button>

                <span className="hidden md:inline text-sm font-splash text-[#ffffff]/75">
                  {aboutData.closeHint}
                </span>

                {/* Top-Right Cross (✕) */}
                <button
                  type="button"
                  onClick={handleCloseOverlay}
                  aria-label="Close About Us Book Overlay"
                  className="w-11 h-11 bg-[#30292a] hover:bg-[#a33533] text-[#ffffff] border border-[#ffffff]/40 flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </header>

            {/* Main Content & Bottom-Right 6-Image Uneven Layered Stack */}
            <div className="relative flex-1 max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-14 pt-8 pb-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
              {/* Left Narrative Column (All text loaded from src/data/about.json in Splash Tropical Font) */}
              <div className="w-full lg:w-[48%] space-y-6 my-auto z-10">
                <div className="text-lg sm:text-xl text-[#ece7d5] tracking-wider">
                  {aboutData.overlayKicker}
                </div>

                <h1 className="font-splash text-4xl sm:text-6xl lg:text-7xl text-[#ffffff] leading-[1.12] drop-shadow-sm">
                  {aboutData.headline}
                </h1>

                <p className="font-splash text-2xl sm:text-3xl text-[#ece7d5] leading-snug">
                  {aboutData.subheadline}
                </p>

                <div className="space-y-4 text-lg sm:text-xl text-[#ffffff]/95 leading-relaxed pt-2">
                  {aboutData.paragraphs.map((paragraph, idx) => (
                    <p key={idx} className="font-splash">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* 3 Studio Pillars from about.json */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#ffffff]/25">
                  {aboutData.pillars.map((pillar, index) => (
                    <div
                      key={index}
                      className="p-3.5 bg-[#30292a]/35 border border-[#ffffff]/20"
                    >
                      <div className="font-splash text-xl text-[#ece7d5]">
                        {pillar.label}
                      </div>
                      <p className="font-splash text-sm text-[#ffffff]/85 mt-1 leading-snug">
                        {pillar.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-2xl sm:text-3xl text-[#ece7d5]">
                  {aboutData.signatureNote}
                </div>
              </div>

              {/* Right / Bottom-Right Corner: 6 Images Stacked Unevenly in 3 Layers with 1.5px Padding */}
              <div className="w-full lg:w-[50%] flex flex-col items-end justify-end self-end z-10 mt-6 lg:mt-0">
                <div className="mb-2 text-right font-splash text-sm sm:text-base text-[#ece7d5]/90">
                  {aboutData.collageCaption}
                </div>

                {/* Uneven Layered Stack Container with exact 1.5px padding between all images */}
                <div className="flex flex-col gap-[1.5px] bg-[#30292a]/40 p-[1.5px] shadow-[0_24px_60px_rgba(48,41,42,0.55)] ml-auto">
                  {/* LAYER 3 (Top Row): 1 Square in center of arrangement */}
                  <div className="flex justify-center w-full">
                    <div className="relative w-[105px] h-[105px] sm:w-[142px] sm:h-[142px] md:w-[158px] md:h-[158px] overflow-hidden bg-[#30292a] group">
                      <img
                        src={artworks.topCenterSquare}
                        alt={aboutData.artworks.topCenterSquare.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#30292a]/90 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="font-splash text-xs text-[#ffffff] leading-none">
                          {aboutData.artworks.topCenterSquare.title}
                        </div>
                        <div className="font-splash text-[10px] text-[#ece7d5]/80">
                          {aboutData.artworks.topCenterSquare.category}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LAYER 2 (Middle Row): 2 images above bottom row (Square, Rectangle) from left to right */}
                  <div className="flex items-end justify-center gap-[1.5px] ml-4 sm:ml-8">
                    {/* Square (Left) */}
                    <div className="relative w-[105px] h-[105px] sm:w-[142px] sm:h-[142px] md:w-[158px] md:h-[158px] overflow-hidden bg-[#30292a] group shrink-0">
                      <img
                        src={artworks.middleLeftSquare}
                        alt={aboutData.artworks.middleLeftSquare.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#30292a]/90 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="font-splash text-xs text-[#ffffff] leading-none">
                          {aboutData.artworks.middleLeftSquare.title}
                        </div>
                        <div className="font-splash text-[10px] text-[#ece7d5]/80">
                          {aboutData.artworks.middleLeftSquare.category}
                        </div>
                      </div>
                    </div>

                    {/* Rectangle (Right) */}
                    <div className="relative w-[148px] h-[105px] sm:w-[205px] sm:h-[142px] md:w-[228px] md:h-[158px] overflow-hidden bg-[#30292a] group shrink-0">
                      <img
                        src={artworks.middleRightRect}
                        alt={aboutData.artworks.middleRightRect.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#30292a]/90 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="font-splash text-xs text-[#ffffff] leading-none">
                          {aboutData.artworks.middleRightRect.title}
                        </div>
                        <div className="font-splash text-[10px] text-[#ece7d5]/80">
                          {aboutData.artworks.middleRightRect.category}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LAYER 1 (Bottom Row): 3 images at bottom (Rectangle, Square, Square) from left to right */}
                  <div className="flex items-end justify-end gap-[1.5px]">
                    {/* Rectangle (Left) */}
                    <div className="relative w-[148px] h-[105px] sm:w-[205px] sm:h-[142px] md:w-[228px] md:h-[158px] overflow-hidden bg-[#30292a] group shrink-0">
                      <img
                        src={artworks.bottomLeftRect}
                        alt={aboutData.artworks.bottomLeftRect.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#30292a]/90 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="font-splash text-xs text-[#ffffff] leading-none">
                          {aboutData.artworks.bottomLeftRect.title}
                        </div>
                        <div className="font-splash text-[10px] text-[#ece7d5]/80">
                          {aboutData.artworks.bottomLeftRect.category}
                        </div>
                      </div>
                    </div>

                    {/* Square (Middle) */}
                    <div className="relative w-[105px] h-[105px] sm:w-[142px] sm:h-[142px] md:w-[158px] md:h-[158px] overflow-hidden bg-[#30292a] group shrink-0">
                      <img
                        src={artworks.bottomMiddleSquare}
                        alt={aboutData.artworks.bottomMiddleSquare.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#30292a]/90 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="font-splash text-xs text-[#ffffff] leading-none">
                          {aboutData.artworks.bottomMiddleSquare.title}
                        </div>
                        <div className="font-splash text-[10px] text-[#ece7d5]/80">
                          {aboutData.artworks.bottomMiddleSquare.category}
                        </div>
                      </div>
                    </div>

                    {/* Square (Right) */}
                    <div className="relative w-[105px] h-[105px] sm:w-[142px] sm:h-[142px] md:w-[158px] md:h-[158px] overflow-hidden bg-[#30292a] group shrink-0">
                      <img
                        src={artworks.bottomRightSquare}
                        alt={aboutData.artworks.bottomRightSquare.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#30292a]/90 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="font-splash text-xs text-[#ffffff] leading-none">
                          {aboutData.artworks.bottomRightSquare.title}
                        </div>
                        <div className="font-splash text-[10px] text-[#ece7d5]/80">
                          {aboutData.artworks.bottomRightSquare.category}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===================================================================
            OVERLAY 2.02: DIGITAL MEDIA (Afrocultures Font, Broad Black Borders,
            Thin Red Center Strips with R->L Marquee, Two Thick Counter-Moving Rows)
        =================================================================== */}
        {activeCard === '02' && (
          <motion.div
            key="overlay-02-digital-media"
            initial={{ opacity: 0, rotateY: -85, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -65, scale: 0.94 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left center' }}
            className="fixed inset-0 z-50 w-screen h-screen bg-[#30292a] text-[#ece7d5] overflow-y-auto overflow-x-hidden flex flex-col justify-between font-afrocultures select-none"
          >
            {/* Dripping Paint Ambient Backdrop at Low Opacity */}
            {artworks.drippingBg && (
              <img
                src={artworks.drippingBg}
                alt=""
                aria-hidden="true"
                className="fixed inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
              />
            )}

            {/* Top Navigation Bar inside Digital Media Overlay (Gallery + ESC + Cross '✕') */}
            <header className="relative z-40 flex items-center justify-between px-6 sm:px-10 py-3.5 bg-[#120f10] border-b border-[#ece7d5]/15">
              <div className="flex items-center gap-3">
                <img
                  src={BRAND_LOGO_URL}
                  alt="House of Kalakaar"
                  className="w-9 h-9 object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="font-afrocultures text-base sm:text-xl font-bold text-[#ece7d5]">
                  02 · DIGITAL MEDIA
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                {/* Top nav bar option 'Gallery' to return to 4 cards section */}
                <button
                  type="button"
                  onClick={handleCloseOverlay}
                  className="font-afrocultures text-xs sm:text-sm font-bold text-[#ece7d5] hover:text-[#a33533] underline underline-offset-4 cursor-pointer transition-colors"
                >
                  GALLERY
                </button>

                <span className="hidden md:inline text-xs font-afrocultures text-[#ece7d5]/60">
                  ESC OR CROSS TO EXIT
                </span>

                {/* Top-Right Cross (✕) */}
                <button
                  type="button"
                  onClick={handleCloseOverlay}
                  aria-label="Close Digital Media Book Overlay"
                  className="w-10 h-10 bg-[#a33533] hover:bg-[#806055] text-[#ece7d5] border border-[#ece7d5]/40 flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Main Carousel Viewport Framed by Broad Top & Bottom Black Borders */}
            <div className="relative z-20 flex-1 flex flex-col justify-between my-auto">
              {/* TOP BROAD BLACK BORDER with Thin Red Strip Justified Center (Marquee R -> L) */}
              <div className="w-full bg-[#090808] py-5 sm:py-7 flex items-center justify-center border-y-2 border-[#30292a] shadow-xl">
                <div className="w-full bg-[#a33533] py-1.5 overflow-hidden flex items-center">
                  <div className="animate-marquee-rtl whitespace-nowrap flex items-center">
                    {marqueeItems.map((idx) => (
                      <span
                        key={`top-m-${idx}`}
                        className="font-afrocultures text-xs sm:text-sm font-extrabold text-[#ece7d5] tracking-[0.22em] mx-4"
                      >
                        LOGBOOK MAGAZINE ART | LOGBOOK MAGAZINE ART |
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* TWO THICK ROWS OF IMAGES IN CAROUSEL MOTION */}
              <div className="flex-1 flex flex-col justify-center gap-6 sm:gap-8 py-6 bg-[#1c1819]/90 overflow-hidden">
                {/* TOP THICK ROW: Moving Right to Left (R -> L) */}
                <div className="w-full overflow-hidden">
                  <div className="animate-carousel-rtl flex items-center gap-5 sm:gap-6 px-3">
                    {[...TOP_ROW_SLIDES, ...TOP_ROW_SLIDES].map((slide, idx) => {
                      const imgSrc =
                        slide.customUrl || artworks.digitalMediaMap[slide.subject];
                      return (
                        <div
                          key={`${slide.id}-${idx}`}
                          className="relative w-[270px] h-[195px] sm:w-[360px] sm:h-[250px] lg:w-[410px] lg:h-[275px] shrink-0 overflow-hidden bg-[#30292a] border-2 border-[#ece7d5]/25 group shadow-2xl"
                        >
                          {/* Uniform Single-Size Auto-Zoom & Crop Image */}
                          <img
                            src={imgSrc}
                            alt={slide.title}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#090808]/90 via-transparent to-transparent flex flex-col justify-end p-4">
                            <span className="font-afrocultures text-[10px] text-[#a33533] font-bold tracking-widest">
                              {slide.issue}
                            </span>
                            <h4 className="font-afrocultures text-sm sm:text-base text-[#ece7d5] font-bold truncate">
                              {slide.title}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* BOTTOM THICK ROW: Moving Left to Right (L -> R) */}
                <div className="w-full overflow-hidden">
                  <div className="animate-carousel-ltr flex items-center gap-5 sm:gap-6 px-3">
                    {[...BOTTOM_ROW_SLIDES, ...BOTTOM_ROW_SLIDES].map((slide, idx) => {
                      const imgSrc =
                        slide.customUrl || artworks.digitalMediaMap[slide.subject];
                      return (
                        <div
                          key={`${slide.id}-${idx}`}
                          className="relative w-[270px] h-[195px] sm:w-[360px] sm:h-[250px] lg:w-[410px] lg:h-[275px] shrink-0 overflow-hidden bg-[#30292a] border-2 border-[#ece7d5]/25 group shadow-2xl"
                        >
                          {/* Uniform Single-Size Auto-Zoom & Crop Image */}
                          <img
                            src={imgSrc}
                            alt={slide.title}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#090808]/90 via-transparent to-transparent flex flex-col justify-end p-4">
                            <span className="font-afrocultures text-[10px] text-[#a33533] font-bold tracking-widest">
                              {slide.issue}
                            </span>
                            <h4 className="font-afrocultures text-sm sm:text-base text-[#ece7d5] font-bold truncate">
                              {slide.title}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* BOTTOM BROAD BLACK BORDER with Thin Red Strip Justified Center (Marquee R -> L) */}
              <div className="w-full bg-[#090808] py-5 sm:py-7 flex items-center justify-center border-y-2 border-[#30292a] shadow-xl">
                <div className="w-full bg-[#a33533] py-1.5 overflow-hidden flex items-center">
                  <div className="animate-marquee-rtl whitespace-nowrap flex items-center">
                    {marqueeItems.map((idx) => (
                      <span
                        key={`bot-m-${idx}`}
                        className="font-afrocultures text-xs sm:text-sm font-extrabold text-[#ece7d5] tracking-[0.22em] mx-4"
                      >
                        LOGBOOK MAGAZINE ART | LOGBOOK MAGAZINE ART |
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

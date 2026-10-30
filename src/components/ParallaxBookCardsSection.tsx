import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { X, BookOpen } from 'lucide-react';
import aboutData from '../data/about.json';
import digitalMediaData from '../data/digital_media.json';
import { generateDrippingPaintBackground } from '../utils/proceduralArtGenerator';
import { BRAND_LOGO_URL } from '../assets/Logo';
import { LiveColorPaletteOverlay } from './LiveColorPaletteOverlay';

export type ActiveBookCardId = '01' | '02' | '03' | '04' | null;

interface BookOriginRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface BookVolumeMeta {
  id: '01' | '02' | '03' | '04';
  number: string;
  title: string;
  subtitle: string;
  coverBg: string;
  coverText: string;
  accentColor: string;
  firstPageBg: string;
}

const BOOK_VOLUMES: Record<'01' | '02' | '03' | '04', BookVolumeMeta> = {
  '01': {
    id: '01',
    number: '01',
    title: '01 · Our Story',
    subtitle: 'Why HOK exists, what we believe and how we teach.',
    coverBg: '#806055',
    coverText: '#ffffff',
    accentColor: '#ece7d5',
    firstPageBg: '#806055',
  },
  '02': {
    id: '02',
    number: '02',
    title: '02 · The Art Portfolio',
    subtitle: 'Your selected illustrations, projects and creative process.',
    coverBg: '#30292a',
    coverText: '#ece7d5',
    accentColor: '#a33533',
    firstPageBg: '#30292a',
  },
  '03': {
    id: '03',
    number: '03',
    title: '03 · Behind the Process',
    subtitle: 'Experiments, sketches, iterations and finished work.',
    coverBg: '#30292a',
    coverText: '#ece7d5',
    accentColor: '#a33533',
    firstPageBg: '#ece7d5',
  },
  '04': {
    id: '04',
    number: '04',
    title: '04 · Design Process & Studio',
    subtitle: 'Curated studio notes, visual research and foundational explorations.',
    coverBg: '#ece7d5',
    coverText: '#30292a',
    accentColor: '#806055',
    firstPageBg: '#ece7d5',
  },
};

interface ParallaxBookCardsSectionProps {
  activeCard: ActiveBookCardId;
  onSelectCard: (cardId: ActiveBookCardId) => void;
}

export const ParallaxBookCardsSection: React.FC<ParallaxBookCardsSectionProps> = ({
  activeCard,
  onSelectCard,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Record<'01' | '02' | '03' | '04', HTMLDivElement | null>>({
    '01': null,
    '02': null,
    '03': null,
    '04': null,
  });
  const [originRect, setOriginRect] = useState<BookOriginRect | null>(null);

  // Parallax scroll progress for the 4 books container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Distinct parallax vertical offsets for each of the 4 volumes
  const yCard1 = useTransform(scrollYProgress, [0, 1], [55, -55]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [100, -85]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const yCard4 = useTransform(scrollYProgress, [0, 1], [90, -75]);

  // High-res public images organized under /public/images/about us & /public/images/digital media
  const artworks = useMemo(() => {
    return {
      drippingBg: generateDrippingPaintBackground(1200, 800),
      bottomLeftRect: '/images/about us/02-draped-silk-reverie.png',
      bottomMiddleSquare: '/images/about us/03-cinder-clay-gesture.png',
      bottomRightSquare: '/images/about us/04-terracotta-vessels.png',
      middleLeftSquare: '/images/about us/05-chiaroscuro-muse.png',
      middleRightRect: '/images/about us/06-artist-table.png',
      topCenterSquare: '/images/about us/07-botanical-heirloom.png',
      digitalMediaMap: {
        illustration_drape: '/images/digital media/01-couture-drape-study.png',
        digital_velvet_4: '/images/digital media/02-velvet-silhouette-editorial.png',
        digital_couture_2: '/images/digital media/03-haute-couture-gold-zardozi.png',
        digital_heritage_5: '/images/digital media/04-heritage-mughal-tapestry.png',
        composition_abstract: '/images/digital media/05-abstract-cinder-clay.png',
        stilllife_vessels: '/images/digital media/06-terracotta-still-life.png',
        illustration_portrait: '/images/about us/05-chiaroscuro-muse.png',
        stilllife_botanical: '/images/about us/07-botanical-heirloom.png',
        composition_atelier: '/images/about us/06-artist-table.png',
        digital_couture_1: '/images/digital media/01-couture-drape-study.png',
        digital_editorial_3: '/images/digital media/02-velvet-silhouette-editorial.png',
        digital_glaze_6: '/images/digital media/03-haute-couture-gold-zardozi.png',
      } as Record<string, string>,
    };
  }, []);

  // Escape key handler to close open volume
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeCard !== null) {
        onSelectCard(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCard, onSelectCard]);

  // Lock body scroll while full-screen book is open
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

  const handleCardClick = (id: '01' | '02' | '03' | '04') => {
    const cardEl = cardRefs.current[id];
    if (cardEl) {
      const rect = cardEl.getBoundingClientRect();
      setOriginRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    } else {
      setOriginRect({
        top: window.innerHeight * 0.15,
        left: window.innerWidth * 0.15,
        width: window.innerWidth * 0.7,
        height: window.innerHeight * 0.7,
      });
    }
    onSelectCard(id);
  };

  const handleCloseOverlay = () => {
    onSelectCard(null);
  };

  const marqueeItems = Array.from({ length: 14 }, (_, i) => i);

  // Helper to render the front cover face inside both the table card and the swinging 3D book portal
  const renderFrontCoverFace = (id: '01' | '02' | '03' | '04') => {
    const vol = BOOK_VOLUMES[id];

    if (id === '01') {
      return (
        <div className="relative w-full h-full bg-[#806055] border-2 border-[#ece7d5]/35 flex flex-col justify-between p-8 sm:p-10 overflow-hidden select-none">
          {/* Hardcover Spine Crease & French Groove */}
          <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-[#30292a]/70 via-[#ece7d5]/15 to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-[22px] w-[2px] bg-[#30292a]/45 shadow-[1px_0_0_rgba(236,231,213,0.2)] pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between pl-3">
            <span className="font-splash text-2xl sm:text-3xl text-[#ffffff] tracking-wider">
              {vol.number}
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-splash text-[#ffffff]/95 border border-[#ffffff]/35 px-3 py-1 bg-[#30292a]/20">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Open Book</span>
            </span>
          </div>

          <div className="relative z-10 my-auto py-6 text-center px-2 sm:px-4">
            <h3 className="font-splash text-4xl sm:text-5xl lg:text-6xl text-[#ffffff] drop-shadow-[0_4px_16px_rgba(48,41,42,0.35)]">
              {vol.title}
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#ece7d5]/95 mt-4 max-w-md mx-auto leading-relaxed">
              {vol.subtitle}
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-end text-xs font-splash text-[#ffffff]/85 border-t border-[#ffffff]/25 pt-4 pl-3">
            <span className="group-hover:translate-x-1 transition-transform">
              Click to unfold cover →
            </span>
          </div>
        </div>
      );
    }

    if (id === '02') {
      return (
        <div className="relative w-full h-full bg-[#30292a] border-2 border-[#ece7d5]/30 flex flex-col justify-between p-8 sm:p-10 overflow-hidden select-none">
          {artworks.drippingBg && (
            <img
              src={artworks.drippingBg}
              alt="Dripping Paint Artwork Background"
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#30292a]/95 via-[#30292a]/60 to-[#30292a]/35 pointer-events-none" />
          {/* Hardcover Spine Crease & French Groove */}
          <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/85 via-white/10 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 bottom-0 left-[22px] w-[2px] bg-black/65 shadow-[1px_0_0_rgba(236,231,213,0.18)] pointer-events-none z-10" />

          <div className="relative z-10 flex items-center justify-between pl-3">
            <span className="font-afrocultures text-xl sm:text-2xl font-extrabold text-[#ece7d5] bg-[#a33533] px-3 py-1">
              {vol.number}
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-afrocultures text-[#ece7d5] bg-[#30292a]/85 border border-[#ece7d5]/40 px-3 py-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#a33533]" />
              <span>Open Book</span>
            </span>
          </div>

          <div className="relative z-10 my-auto py-6 text-center px-2 sm:px-4">
            <h3 className="font-afrocultures text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#ece7d5] tracking-wider drop-shadow-[0_6px_20px_rgba(0,0,0,0.85)]">
              {vol.title}
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#ece7d5]/90 mt-4 max-w-md mx-auto leading-relaxed">
              {vol.subtitle}
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-end text-xs font-afrocultures text-[#ece7d5]/85 border-t border-[#ece7d5]/25 pt-4 pl-3">
            <span className="text-[#a33533] font-bold group-hover:translate-x-1 transition-transform">
              UNFOLD FOLIO →
            </span>
          </div>
        </div>
      );
    }

    if (id === '03') {
      return (
        <div className="relative w-full h-full bg-[#30292a] border-2 border-[#a33533]/65 flex flex-col justify-between p-8 sm:p-10 overflow-hidden select-none">
          {/* Hardcover Spine Crease & French Groove */}
          <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/85 via-[#a33533]/20 to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-[22px] w-[2px] bg-black/70 shadow-[1px_0_0_rgba(163,53,51,0.35)] pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between pl-3">
            <span className="font-serif text-2xl sm:text-3xl text-[#a33533] font-semibold">
              {vol.number}
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#ece7d5]/90 border border-[#ece7d5]/30 px-3 py-1 bg-[#ece7d5]/5">
              <BookOpen className="w-3.5 h-3.5 text-[#a33533]" />
              <span>Open Book</span>
            </span>
          </div>

          <div className="relative z-10 my-auto py-6 text-center px-2 sm:px-4">
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#ece7d5] italic font-normal tracking-tight">
              {vol.title}
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#ece7d5]/85 mt-4 max-w-md mx-auto leading-relaxed">
              {vol.subtitle}
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-end text-xs font-sans text-[#ece7d5]/80 border-t border-[#ece7d5]/15 pt-4 pl-3">
            <span className="text-[#a33533] font-medium group-hover:translate-x-1 transition-transform">
              Click to unfold cover →
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full bg-[#ece7d5] text-[#30292a] border-2 border-[#30292a]/35 flex flex-col justify-between p-8 sm:p-10 overflow-hidden select-none">
        {/* Hardcover Spine Crease & French Groove */}
        <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-[#30292a]/35 via-[#806055]/15 to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-[22px] w-[2px] bg-[#30292a]/30 shadow-[1px_0_0_rgba(255,255,255,0.6)] pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between pl-3">
          <span className="font-serif text-2xl sm:text-3xl text-[#806055] font-semibold">
            {vol.number}
          </span>
          <span className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#30292a]/90 border border-[#30292a]/30 px-3 py-1 bg-[#30292a]/5">
            <BookOpen className="w-3.5 h-3.5 text-[#a33533]" />
            <span>Open Book</span>
          </span>
        </div>

        <div className="relative z-10 my-auto py-6 text-center px-2 sm:px-4">
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#30292a] font-normal tracking-tight">
            {vol.title}
          </h3>
          <p className="font-sans text-sm sm:text-base text-[#806055] mt-4 max-w-md mx-auto leading-relaxed">
            {vol.subtitle}
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-end text-xs font-sans text-[#30292a]/80 border-t border-[#30292a]/15 pt-4 pl-3">
          <span className="text-[#a33533] font-medium group-hover:translate-x-1 transition-transform">
            Click to unfold cover →
          </span>
        </div>
      </div>
    );
  };

  // Renders a thick hardcover book card resting on the table (Normal + Hover Pull & Tilt states)
  const renderBookVolumeOnTable = (
    id: '01' | '02' | '03' | '04',
    yMotion: ReturnType<typeof useTransform<number, number>>,
    extraDelay = 0,
    staggerClass = ''
  ) => {
    const isCurrentlyOpen = activeCard === id;

    return (
      <motion.div
        style={{ y: yMotion }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: extraDelay }}
        className={`perspective-book ${staggerClass}`}
      >
        <div
          ref={(el) => {
            cardRefs.current[id] = el;
          }}
          onClick={() => handleCardClick(id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick(id);
            }
          }}
          aria-label={`Open ${BOOK_VOLUMES[id].title}`}
          className={`book-table-card group relative h-[390px] sm:h-[430px] w-full cursor-pointer select-none ${
            isCurrentlyOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Back Hardcover Board Lip (Bottom & Right Slab Base) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-[11px] translate-y-[11px] bg-[#30292a] border border-[#ece7d5]/25 pointer-events-none"
          />

          {/* Thick Cream Archival Page Block (Revealed First Page Stack Underneath Cover) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-[#ece7d5] border-r-[5px] border-b-[5px] border-[#d5ccb8] shadow-inner pointer-events-none flex flex-col justify-between p-6"
          >
            {/* Subtle page-edge horizontal/vertical ruling lines to simulate stacked sheets */}
            <div className="w-full border-b border-[#30292a]/10 pb-2 flex justify-between text-[10px] font-sans uppercase tracking-widest text-[#30292a]/40">
              <span>House of Kalakaar</span>
              <span>Folio {id}</span>
            </div>
          </div>

          {/* Front Hardcover Leaf (Slightly cracks open on hover to preview page thickness) */}
          <div className="relative w-full h-full preserve-3d book-spine-origin transition-transform duration-500 ease-out group-hover:[transform:rotateY(-7deg)]">
            {renderFrontCoverFace(id)}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="parallax-cards-section"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#837d75] text-[#ece7d5] overflow-hidden border-b border-[#30292a]/40"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#ece7d5]/25 pb-8"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase text-[#ece7d5]/80 mb-3">
              <span>The Gallery Checkpoint</span>
              <span aria-hidden="true">·</span>
              <span>Select an Atelier Volume to Unfold</span>
            </div>
            <h2
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#ece7d5] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              The Four Pillars of Kalakaar
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#ece7d5]/85 max-w-md leading-relaxed">
            Hover any volume to lift it from the studio table. Click to swing open its hardcover in 3D space and unfold the full-screen atelier folio.
          </p>
        </motion.div>

        {/* 4 HARDCOVER VOLUMES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 perspective-book pr-3 pb-3">
          {renderBookVolumeOnTable('01', yCard1, 0, '')}
          {renderBookVolumeOnTable('02', yCard2, 0.08, 'md:mt-12')}
          {renderBookVolumeOnTable('03', yCard3, 0.14, '')}
          {renderBookVolumeOnTable('04', yCard4, 0.2, 'md:mt-12')}
        </div>
      </div>

      {/* STATE 3: CLICK STATE — 3D BOOK OPENING & FULL-SCREEN SCALE UP FOR ALL 4 VOLUMES */}
      <AnimatePresence>
        {activeCard !== null && (
          <motion.div
            key={`book-stage-${activeCard}`}
            initial={{ backgroundColor: 'rgba(48, 41, 42, 0)' }}
            animate={{ backgroundColor: 'rgba(48, 41, 42, 0.72)' }}
            exit={{ backgroundColor: 'rgba(48, 41, 42, 0)' }}
            transition={{ duration: 0.55 }}
            className="fixed inset-0 z-50 perspective-book overflow-hidden"
          >
            {/* Dynamic Book Frame: Scales smoothly from the clicked card's exact bounding rect to 100vw x 100vh */}
            <motion.div
              initial={{
                top: originRect ? originRect.top : 120,
                left: originRect ? originRect.left : 120,
                width: originRect ? originRect.width : 520,
                height: originRect ? originRect.height : 420,
              }}
              animate={{
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
              }}
              exit={{
                top: originRect ? originRect.top : 120,
                left: originRect ? originRect.left : 120,
                width: originRect ? originRect.width : 520,
                height: originRect ? originRect.height : 420,
                opacity: 0,
              }}
              transition={{
                duration: 0.88,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ position: 'fixed' }}
              className="preserve-3d shadow-[0_40px_120px_rgba(0,0,0,0.75)]"
            >
              {/* =====================================================================
                  THE REVEAL: UNDERLYING "FIRST PAGE" & FULL-SCREEN DETAIL CONTENT
                  ===================================================================== */}
              <div
                className="relative w-full h-full overflow-y-auto overflow-x-hidden"
                style={{ backgroundColor: BOOK_VOLUMES[activeCard].firstPageBg }}
              >
                {/* VOLUME 01 INTERIOR: 01 · Our Story */}
                {activeCard === '01' && (
                  <div className="min-h-full w-full bg-[#806055] text-[#ffffff] flex flex-col justify-between font-splash">
                    <div className="fixed top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-[#30292a]/70 to-transparent pointer-events-none z-30" />

                    <header className="sticky top-0 z-40 flex items-center justify-between px-6 sm:px-10 py-4 bg-[#806055]/95 backdrop-blur-md border-b border-[#ffffff]/20">
                      <div className="flex items-center gap-3">
                        <img
                          src={BRAND_LOGO_URL}
                          alt="House of Kalakaar"
                          className="w-10 h-10 object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-splash text-xl sm:text-2xl text-[#ffffff]">
                          {BOOK_VOLUMES['01'].title}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6">
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

                        <button
                          type="button"
                          onClick={handleCloseOverlay}
                          aria-label="Close Our Story Book Overlay"
                          className="w-11 h-11 bg-[#30292a] hover:bg-[#a33533] text-[#ffffff] border border-[#ffffff]/40 flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                    </header>

                    <div className="relative flex-1 max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-14 pt-8 pb-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
                      <div className="w-full lg:w-[48%] space-y-6 my-auto z-10">
                        <div className="text-lg sm:text-xl text-[#ece7d5] tracking-wider">
                          {aboutData.overlayKicker}
                        </div>

                        <h1 className="font-splash text-4xl sm:text-6xl lg:text-7xl text-[#ffffff] leading-[1.12]">
                          {aboutData.headline}
                        </h1>

                        <p className="font-splash text-2xl sm:text-3xl text-[#ece7d5] leading-snug">
                          {BOOK_VOLUMES['01'].subtitle}
                        </p>

                        <div className="space-y-4 text-lg sm:text-xl text-[#ffffff]/95 leading-relaxed pt-2">
                          {aboutData.paragraphs.map((paragraph, idx) => (
                            <p key={idx} className="font-splash">
                              {paragraph}
                            </p>
                          ))}
                        </div>

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

                      {/* 6 Images Stacked Unevenly on Bottom-Right Corner in Layers with 1.5px padding */}
                      <div className="w-full lg:w-[50%] flex flex-col items-end justify-end self-end z-10 mt-6 lg:mt-0">
                        <div className="mb-2 text-right font-splash text-sm sm:text-base text-[#ece7d5]/90">
                          {aboutData.collageCaption}
                        </div>

                        <div className="flex flex-col gap-[1.5px] bg-[#30292a]/40 p-[1.5px] shadow-[0_24px_60px_rgba(48,41,42,0.55)] ml-auto">
                          {/* LAYER 3: 1 Square in Center */}
                          <div className="flex justify-center w-full">
                            <div className="relative w-[105px] h-[105px] sm:w-[142px] sm:h-[142px] md:w-[158px] md:h-[158px] overflow-hidden bg-[#30292a] group">
                              <img
                                src={artworks.topCenterSquare}
                                alt={aboutData.artworks.topCenterSquare.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <LiveColorPaletteOverlay
                                  palette={['#ece7d5', '#a33533', '#30292a', '#806055']}
                                />
                              </div>
                            </div>
                          </div>

                          {/* LAYER 2: 2 Images Above Bottom (Square, Rectangle) */}
                          <div className="flex items-end justify-center gap-[1.5px] ml-4 sm:ml-8">
                            <div className="relative w-[105px] h-[105px] sm:w-[142px] sm:h-[142px] md:w-[158px] md:h-[158px] overflow-hidden bg-[#30292a] group shrink-0">
                              <img
                                src={artworks.middleLeftSquare}
                                alt={aboutData.artworks.middleLeftSquare.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <LiveColorPaletteOverlay
                                  palette={['#30292a', '#806055', '#ece7d5', '#a33533']}
                                />
                              </div>
                            </div>

                            <div className="relative w-[148px] h-[105px] sm:w-[205px] sm:h-[142px] md:w-[228px] md:h-[158px] overflow-hidden bg-[#30292a] group shrink-0">
                              <img
                                src={artworks.middleRightRect}
                                alt={aboutData.artworks.middleRightRect.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <LiveColorPaletteOverlay
                                  palette={['#806055', '#ece7d5', '#d4b483', '#30292a']}
                                />
                              </div>
                            </div>
                          </div>

                          {/* LAYER 1: 3 Images at Bottom (Rectangle, Square, Square) */}
                          <div className="flex items-end justify-end gap-[1.5px]">
                            <div className="relative w-[148px] h-[105px] sm:w-[205px] sm:h-[142px] md:w-[228px] md:h-[158px] overflow-hidden bg-[#30292a] group shrink-0">
                              <img
                                src={artworks.bottomLeftRect}
                                alt={aboutData.artworks.bottomLeftRect.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <LiveColorPaletteOverlay
                                  palette={['#ece7d5', '#a33533', '#806055', '#30292a']}
                                />
                              </div>
                            </div>

                            <div className="relative w-[105px] h-[105px] sm:w-[142px] sm:h-[142px] md:w-[158px] md:h-[158px] overflow-hidden bg-[#30292a] group shrink-0">
                              <img
                                src={artworks.bottomMiddleSquare}
                                alt={aboutData.artworks.bottomMiddleSquare.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <LiveColorPaletteOverlay
                                  palette={['#837d75', '#ece7d5', '#806055', '#a33533']}
                                />
                              </div>
                            </div>

                            <div className="relative w-[105px] h-[105px] sm:w-[142px] sm:h-[142px] md:w-[158px] md:h-[158px] overflow-hidden bg-[#30292a] group shrink-0">
                              <img
                                src={artworks.bottomRightSquare}
                                alt={aboutData.artworks.bottomRightSquare.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <LiveColorPaletteOverlay
                                  palette={['#806055', '#ece7d5', '#30292a', '#d4b483']}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* VOLUME 02 INTERIOR: 02 · The Art Portfolio */}
                {activeCard === '02' && (
                  <div className="min-h-full w-full bg-[#30292a] text-[#ece7d5] flex flex-col justify-between font-afrocultures select-none">
                    {artworks.drippingBg && (
                      <img
                        src={artworks.drippingBg}
                        alt=""
                        aria-hidden="true"
                        className="fixed inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
                      />
                    )}

                    <header className="relative z-40 flex items-center justify-between px-6 sm:px-10 py-3.5 bg-[#120f10] border-b border-[#ece7d5]/15">
                      <div className="flex items-center gap-3">
                        <img
                          src={BRAND_LOGO_URL}
                          alt="House of Kalakaar"
                          className="w-9 h-9 object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-afrocultures text-base sm:text-xl font-bold text-[#ece7d5]">
                          {BOOK_VOLUMES['02'].title}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6">
                        <button
                          type="button"
                          onClick={handleCloseOverlay}
                          className="font-afrocultures text-xs sm:text-sm font-bold text-[#ece7d5] hover:text-[#a33533] underline underline-offset-4 cursor-pointer transition-colors"
                        >
                          GALLERY
                        </button>

                        <button
                          type="button"
                          onClick={handleCloseOverlay}
                          aria-label="Close The Art Portfolio Book Overlay"
                          className="w-10 h-10 bg-[#a33533] hover:bg-[#806055] text-[#ece7d5] border border-[#ece7d5]/40 flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </header>

                    <div className="relative z-20 flex-1 flex flex-col justify-between my-auto">
                      {/* TOP BROAD BLACK BORDER with Centered Red Marquee Strip */}
                      <div className="w-full bg-[#090808] py-5 sm:py-7 flex items-center justify-center border-y-2 border-[#30292a] shadow-xl">
                        <div className="w-full bg-[#a33533] py-1.5 overflow-hidden flex items-center">
                          <div className="animate-marquee-rtl whitespace-nowrap flex items-center">
                            {marqueeItems.map((idx) => (
                              <span
                                key={`top-m-${idx}`}
                                className="font-afrocultures text-xs sm:text-sm font-extrabold text-[#ece7d5] tracking-[0.22em] mx-4"
                              >
                                {digitalMediaData.marqueeText}{' '}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* TWO THICK ROWS OF IMAGES */}
                      <div className="flex-1 flex flex-col justify-center gap-6 sm:gap-8 py-6 bg-[#1c1819]/90 overflow-hidden">
                        {/* TOP THICK ROW: Moving Right to Left */}
                        <div className="w-full overflow-hidden">
                          <div className="animate-carousel-rtl flex items-center gap-5 sm:gap-6 px-3">
                            {[...digitalMediaData.topRow, ...digitalMediaData.topRow].map(
                              (slide, idx) => {
                                const imgSrc = artworks.digitalMediaMap[slide.subject];
                                return (
                                  <div
                                    key={`${slide.id}-${idx}`}
                                    className="relative w-[270px] h-[195px] sm:w-[360px] sm:h-[250px] lg:w-[410px] lg:h-[275px] shrink-0 overflow-hidden bg-[#30292a] border-2 border-[#ece7d5]/25 group shadow-2xl"
                                  >
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
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                      <LiveColorPaletteOverlay palette={slide.palette} />
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>

                        {/* BOTTOM THICK ROW: Moving Left to Right */}
                        <div className="w-full overflow-hidden">
                          <div className="animate-carousel-ltr flex items-center gap-5 sm:gap-6 px-3">
                            {[...digitalMediaData.bottomRow, ...digitalMediaData.bottomRow].map(
                              (slide, idx) => {
                                const imgSrc = artworks.digitalMediaMap[slide.subject];
                                return (
                                  <div
                                    key={`${slide.id}-${idx}`}
                                    className="relative w-[270px] h-[195px] sm:w-[360px] sm:h-[250px] lg:w-[410px] lg:h-[275px] shrink-0 overflow-hidden bg-[#30292a] border-2 border-[#ece7d5]/25 group shadow-2xl"
                                  >
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
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                      <LiveColorPaletteOverlay palette={slide.palette} />
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>

                      {/* BOTTOM BROAD BLACK BORDER with Centered Red Marquee Strip */}
                      <div className="w-full bg-[#090808] py-5 sm:py-7 flex items-center justify-center border-y-2 border-[#30292a] shadow-xl">
                        <div className="w-full bg-[#a33533] py-1.5 overflow-hidden flex items-center">
                          <div className="animate-marquee-rtl whitespace-nowrap flex items-center">
                            {marqueeItems.map((idx) => (
                              <span
                                key={`bot-m-${idx}`}
                                className="font-afrocultures text-xs sm:text-sm font-extrabold text-[#ece7d5] tracking-[0.22em] mx-4"
                              >
                                {digitalMediaData.marqueeText}{' '}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* VOLUMES 03 & 04 INTERIOR: ARCHIVAL BLANK PARCHMENT SPREAD WITH HEADER & CLOSE BUTTON */}
                {(activeCard === '03' || activeCard === '04') && (
                  <div className="min-h-screen w-full bg-[#ece7d5] text-[#30292a] flex flex-col justify-between relative">
                    {/* Left Book Spine Binding Shadow & Center Spread Fold Crease */}
                    <div className="fixed top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#30292a]/25 via-[#806055]/10 to-transparent pointer-events-none z-20" />
                    <div className="hidden lg:block fixed top-0 bottom-0 left-1/2 w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#30292a]/10 to-transparent pointer-events-none z-20" />

                    <header className="sticky top-0 z-40 flex items-center justify-between px-6 sm:px-10 py-4 bg-[#ece7d5]/95 backdrop-blur-md border-b border-[#30292a]/15">
                      <div className="flex items-center gap-3">
                        <img
                          src={BRAND_LOGO_URL}
                          alt="House of Kalakaar"
                          className="w-9 h-9 object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-serif text-xl sm:text-2xl font-semibold text-[#30292a]">
                            {BOOK_VOLUMES[activeCard].title}
                          </span>
                          <p className="hidden sm:block font-sans text-xs text-[#806055]">
                            {BOOK_VOLUMES[activeCard].subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6">
                        <button
                          type="button"
                          onClick={handleCloseOverlay}
                          className="font-serif text-base sm:text-lg text-[#30292a] hover:text-[#a33533] underline underline-offset-4 cursor-pointer transition-colors"
                        >
                          Gallery
                        </button>

                        <span className="hidden md:inline text-xs font-sans text-[#30292a]/60">
                          Press ESC or click Cross to close volume
                        </span>

                        <button
                          type="button"
                          onClick={handleCloseOverlay}
                          aria-label={`Close ${BOOK_VOLUMES[activeCard].title}`}
                          className="w-11 h-11 bg-[#30292a] hover:bg-[#a33533] text-[#ece7d5] border border-[#30292a]/30 flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </header>

                    {/* Empty Archival Parchment Spread Canvas */}
                    <div className="flex-1 w-full max-w-[1440px] mx-auto px-8 sm:px-14 py-12 flex flex-col justify-between" />

                    <footer className="relative z-30 px-8 sm:px-12 py-4 border-t border-[#30292a]/10 flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.2em] text-[#30292a]/45">
                      <span>House of Kalakaar · Archival Spread</span>
                      <span>Folio {activeCard}</span>
                    </footer>
                  </div>
                )}
              </div>

              {/* =====================================================================
                  THE SWING OPEN: 3D FRONT COVER ROTATING -180DEG ON LEFT EDGE
                  ===================================================================== */}
              <motion.div
                initial={{ rotateY: -12 }}
                animate={{ rotateY: -180 }}
                exit={{ rotateY: 0 }}
                transition={{
                  duration: 0.92,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                }}
                className="pointer-events-none absolute inset-0 z-50"
              >
                {/* Front Face of the Swinging Cover */}
                <div className="absolute inset-0 backface-hidden shadow-2xl">
                  {renderFrontCoverFace(activeCard)}
                </div>

                {/* Inside Front Cover / Archival Endpaper (Visible as cover rotates past -90deg to -180deg) */}
                <div
                  style={{ transform: 'rotateY(180deg)' }}
                  className="absolute inset-0 backface-hidden bg-[#e3dcc7] border-r-4 border-[#30292a]/30 flex flex-col justify-between p-10 text-[#30292a]/45 shadow-inner"
                >
                  <div className="text-xs font-sans uppercase tracking-[0.25em]">
                    Ex Libris · House of Kalakaar
                  </div>
                  <div className="my-auto text-center">
                    <div className="font-serif italic text-2xl sm:text-3xl text-[#30292a]/35">
                      {BOOK_VOLUMES[activeCard].title}
                    </div>
                  </div>
                  <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-right">
                    Atelier Monograph · Vol. {activeCard}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


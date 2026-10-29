import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Play, ZoomIn, Sparkles } from 'lucide-react';
import { ARTWORKS } from '../data/artworks';
import { Artwork } from '../types';
import { generateOilPastelArtwork, PastelSubject } from '../utils/proceduralArtGenerator';

interface ArtworkCarouselProps {
  onSelectArtwork: (artwork: Artwork) => void;
  isMobile?: boolean;
}

const SUBJECT_LIST: PastelSubject[] = [
  'illustration_drape',
  'digital_velvet_4',
  'illustration_portrait',
  'composition_atelier',
  'digital_couture_1',
  'digital_couture_2',
  'stilllife_botanical',
  'digital_heritage_5',
];

export const ArtworkCarousel: React.FC<ArtworkCarouselProps> = ({
  onSelectArtwork,
  isMobile = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const generatedArtMap = useMemo(() => {
    const map: Record<string, string> = {};
    ARTWORKS.forEach((art, idx) => {
      const subj = SUBJECT_LIST[idx % SUBJECT_LIST.length];
      map[art.id] = generateOilPastelArtwork(subj, 720, 920);
    });
    return map;
  }, []);

  const enrichedArtworks = useMemo(() => {
    return ARTWORKS.map((art) => ({
      ...art,
      imageUrl: generatedArtMap[art.id] || art.imageUrl,
    }));
  }, [generatedArtMap]);

  const carouselItems = [...enrichedArtworks, ...enrichedArtworks, ...enrichedArtworks];

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Editorial Gradient fade edges */}
      <div className="absolute top-0 bottom-0 left-0 w-12 md:w-28 bg-gradient-to-r from-[#837d75] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-12 md:w-28 bg-gradient-to-l from-[#837d75] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-6 md:gap-8 items-center cursor-grab active:cursor-grabbing w-max"
        animate={{
          x: isHovered && !isMobile ? 0 : [0, -1800],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: isMobile ? 35 : 45,
            ease: 'linear',
          },
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        drag={isMobile ? 'x' : false}
        dragConstraints={{ left: -2400, right: 0 }}
      >
        {carouselItems.map((item, index) => {
          const isTimelapse = item.category === 'Procreate Timelapses';

          return (
            <div
              key={`${item.id}-${index}`}
              onClick={() => onSelectArtwork(item)}
              className="group relative flex-shrink-0 w-[260px] sm:w-[320px] md:w-[360px] bg-[#30292a] border border-[#ece7d5]/25 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-[#a33533] cursor-pointer overflow-hidden"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#30292a]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Unboxed Category Metadata */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#30292a]/85 text-[#ece7d5] text-[10px] uppercase font-sans tracking-widest px-2.5 py-1 backdrop-blur-xs border border-[#ece7d5]/15">
                  {isTimelapse ? (
                    <>
                      <Play className="w-3 h-3 text-[#a33533] fill-[#a33533]" />
                      <span>Timelapse 4K</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 text-[#a33533]" />
                      <span>{item.category.split(' ')[0]}</span>
                    </>
                  )}
                </div>

                {/* Hover overlay on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#30292a]/95 via-[#30292a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-[#ece7d5]">
                  <div className="flex items-center gap-2 text-xs text-[#a33533] mb-1">
                    <ZoomIn className="w-4 h-4" />
                    <span className="font-sans uppercase tracking-wider font-semibold">
                      Inspect Atelier Layer Specs
                    </span>
                  </div>
                  <p className="text-xs text-[#ece7d5]/85 line-clamp-2">{item.description}</p>
                </div>
              </div>

              {/* Title & Medium caption bar */}
              <div className="p-4 bg-[#30292a] border-t border-[#ece7d5]/15 flex flex-col justify-between">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-serif text-lg font-medium text-[#ece7d5] group-hover:text-[#a33533] transition-colors truncate">
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-sans text-[#ece7d5]/70 shrink-0 font-medium tabular-nums">
                    {item.year}
                  </span>
                </div>
                <p className="text-xs font-sans text-[#ece7d5]/70 truncate mt-1">
                  {item.medium}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

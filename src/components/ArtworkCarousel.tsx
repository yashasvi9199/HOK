import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, ZoomIn, Sparkles } from 'lucide-react';
import { ARTWORKS } from '../data/artworks';
import { Artwork } from '../types';

interface ArtworkCarouselProps {
  onSelectArtwork: (artwork: Artwork) => void;
  isMobile?: boolean;
}

export const ArtworkCarousel: React.FC<ArtworkCarouselProps> = ({
  onSelectArtwork,
  isMobile = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate items to ensure seamless infinite animation loop
  const carouselItems = [...ARTWORKS, ...ARTWORKS, ...ARTWORKS];

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Editorial Gradient fade edges */}
      <div className="absolute top-0 bottom-0 left-0 w-12 md:w-28 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-12 md:w-28 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

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
              className="group relative flex-shrink-0 w-[260px] sm:w-[320px] md:w-[360px] bg-[#FFFFFF] border border-[#F0ECE1] shadow-xs hover:shadow-xl transition-all duration-300 hover:border-[#C5A059]/60 cursor-pointer overflow-hidden"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#1C1917]/80 text-[#FAF7F2] text-[10px] uppercase font-sans tracking-widest px-2.5 py-1 backdrop-blur-xs border border-white/10">
                  {isTimelapse ? (
                    <>
                      <Play className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
                      <span>Timelapse 4K</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 text-[#C5A059]" />
                      <span>{item.category.split(' ')[0]}</span>
                    </>
                  )}
                </div>

                {/* Hover overlay on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-[#FAF7F2]">
                  <div className="flex items-center gap-2 text-xs text-[#C5A059] mb-1">
                    <ZoomIn className="w-4 h-4" />
                    <span className="font-sans uppercase tracking-wider font-semibold">
                      Inspect Atelier Layer Specs
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 line-clamp-2">{item.description}</p>
                </div>
              </div>

              {/* Title & Medium caption bar */}
              <div className="p-4 bg-[#FAF7F2] border-t border-[#F0ECE1] flex flex-col justify-between">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-serif text-lg font-medium text-[#1C1917] group-hover:text-[#C5A059] transition-colors truncate">
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-sans text-[#78716C] shrink-0 font-medium">
                    {item.year}
                  </span>
                </div>
                <p className="text-xs font-sans text-[#78716C] truncate mt-1">
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

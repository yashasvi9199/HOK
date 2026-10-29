import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Filter } from 'lucide-react';
import { ARTWORKS } from '../../data/artworks';
import { Artwork } from '../../types';
import { AtelierButton } from '../../components/AtelierButton';
import { ArtworkModal } from '../../components/ArtworkModal';
import { useWhatsAppRedirect } from '../../hooks/useWhatsAppRedirect';
import { generateOilPastelArtwork, PastelSubject } from '../../utils/proceduralArtGenerator';

const GALLERY_SUBJECTS: PastelSubject[] = [
  'illustration_drape',
  'digital_velvet_4',
  'illustration_portrait',
  'composition_atelier',
  'digital_couture_1',
  'digital_couture_2',
  'stilllife_botanical',
  'digital_heritage_5',
];

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const { openDirectWhatsApp } = useWhatsAppRedirect();

  const categories = [
    'All',
    'Fashion Illustration',
    'Bridal & Couture',
    'Digital Portraits',
    'Concept Art',
    'Procreate Timelapses',
  ];

  const enrichedArtworks = useMemo(() => {
    return ARTWORKS.map((art, idx) => ({
      ...art,
      imageUrl: generateOilPastelArtwork(
        GALLERY_SUBJECTS[idx % GALLERY_SUBJECTS.length],
        760,
        950
      ),
    }));
  }, []);

  const filteredArtworks =
    activeCategory === 'All'
      ? enrichedArtworks
      : enrichedArtworks.filter((art) => art.category === activeCategory);

  return (
    <div className="py-12 md:py-20 bg-[#837d75] text-[#ece7d5]">
      <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />

      {/* Gallery Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center px-5 mb-12 sm:mb-16"
      >
        <div className="text-xs font-sans tracking-[0.25em] uppercase font-semibold text-[#ece7d5]/80 mb-3">
          The Curated Catalog
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#ece7d5] tracking-tight mb-4">
          Atelier Masterworks & Oil Pastel Studies
        </h1>
        <p className="text-base sm:text-lg font-sans text-[#ece7d5]/80 leading-relaxed max-w-2xl mx-auto">
          Explore digital paintings and oil pastel compositions created with tactile authentic textures, hand-calibrated Procreate brush strokes, and intricate Indian handloom details.
        </p>

        {/* Quick CTA */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <AtelierButton
            variant="primary"
            size="sm"
            icon={<MessageCircle className="w-4 h-4" />}
            onClick={() =>
              openDirectWhatsApp(
                'Hello Vrinda! I would like to inquire about private art commissions and licensing options.'
              )
            }
          >
            Commission an Original
          </AtelierButton>
        </div>
      </motion.div>

      {/* Category Filter Tabs */}
      <div className="max-w-6xl mx-auto px-5 mb-10">
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 border-b border-[#ece7d5]/20 pb-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#ece7d5]/80 uppercase font-sans mr-2 font-medium">
            <Filter className="w-3.5 h-3.5 text-[#a33533]" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-sans tracking-wide transition-all border cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#a33533] text-[#ece7d5] border-[#a33533] shadow-xs'
                    : 'bg-[#30292a] text-[#ece7d5]/80 border-[#ece7d5]/20 hover:border-[#ece7d5] hover:text-[#ece7d5]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredArtworks.map((art, index) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              onClick={() => setSelectedArtwork(art)}
              className="group cursor-pointer bg-[#30292a] border border-[#ece7d5]/20 hover:border-[#a33533] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Artwork Frame */}
              <div className="relative aspect-[4/5] bg-[#30292a] overflow-hidden">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#30292a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-[#ece7d5]">
                  <span className="text-xs text-[#a33533] font-sans font-semibold uppercase tracking-wider mb-1">
                    Click to Inspect Atelier Specs
                  </span>
                  <p className="text-xs text-[#ece7d5]/85 line-clamp-2">{art.description}</p>
                </div>
              </div>

              {/* Caption */}
              <div className="p-5 bg-[#30292a] flex flex-col justify-between flex-1">
                <div>
                  <div className="text-xs text-[#a33533] font-sans mb-1">{art.category}</div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-xl font-medium text-[#ece7d5] group-hover:text-[#a33533] transition-colors">
                      {art.title}
                    </h3>
                    <span className="text-xs text-[#ece7d5]/70 font-mono tabular-nums">
                      {art.year}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-[#ece7d5]/70 mt-1 line-clamp-1">
                    {art.medium}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#ece7d5]/15 flex items-center justify-between text-xs text-[#ece7d5] font-medium font-sans">
                  <span>View Layers & Brushes</span>
                  <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

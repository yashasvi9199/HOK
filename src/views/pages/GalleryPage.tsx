import React, { useState } from 'react';
import { Sparkles, MessageCircle, Filter } from 'lucide-react';
import { ARTWORKS } from '../../data/artworks';
import { Artwork } from '../../types';
import { AtelierButton } from '../../components/AtelierButton';
import { ArtworkModal } from '../../components/ArtworkModal';
import { useWhatsAppRedirect } from '../../hooks/useWhatsAppRedirect';

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

  const filteredArtworks = activeCategory === 'All'
    ? ARTWORKS
    : ARTWORKS.filter((art) => art.category === activeCategory);

  return (
    <div className="py-12 md:py-20 animate-in fade-in duration-300">
      <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />

      {/* Gallery Editorial Header */}
      <div className="max-w-4xl mx-auto text-center px-5 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-3 bg-[#FAF7F2] border border-[#C5A059]/40 px-3.5 py-1">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase font-semibold text-[#1C1917]">
            The Curated Catalog
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#1C1917] tracking-tight mb-4">
          Atelier Masterworks & Couture Studies
        </h1>
        <p className="text-base sm:text-lg font-sans text-[#78716C] leading-relaxed max-w-2xl mx-auto">
          Explore digital paintings created with tactile authentic textures, hand-calibrated Procreate brush strokes, and intricate Indian handloom details.
        </p>

        {/* Quick CTA */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <AtelierButton
            variant="whatsapp"
            size="sm"
            icon={<MessageCircle className="w-4 h-4" />}
            onClick={() => openDirectWhatsApp('Hello Vrinda! I would like to inquire about private art commissions and licensing options.')}
          >
            Commission an Original
          </AtelierButton>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="max-w-6xl mx-auto px-5 mb-10">
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 border-b border-[#F0ECE1] pb-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#78716C] uppercase font-sans mr-2 font-medium">
            <Filter className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-sans tracking-wide transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#78716C] border-[#F0ECE1] hover:border-[#C5A059] hover:text-[#1C1917]'
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
          {filteredArtworks.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArtwork(art)}
              className="group cursor-pointer bg-[#FFFFFF] border border-[#F0ECE1] hover:border-[#C5A059]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Artwork Frame */}
              <div className="relative aspect-[4/5] bg-stone-900 overflow-hidden">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#1C1917] text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 border border-[#C5A059]/40">
                  {art.category}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-xs text-[#C5A059] font-sans font-semibold uppercase tracking-wider mb-1">
                    Click to Inspect Atelier Specs
                  </span>
                  <p className="text-xs text-stone-200 line-clamp-2">
                    {art.description}
                  </p>
                </div>
              </div>

              {/* Caption */}
              <div className="p-5 bg-[#FAF7F2] flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-xl font-medium text-[#1C1917] group-hover:text-[#C5A059] transition-colors">
                      {art.title}
                    </h3>
                    <span className="text-xs text-[#78716C] font-mono">{art.year}</span>
                  </div>
                  <p className="text-xs font-sans text-[#78716C] mt-1 line-clamp-1">
                    {art.medium}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs text-[#C5A059] font-medium font-sans">
                  <span>View Layers & Brushes</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

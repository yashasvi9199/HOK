import React, { useEffect } from 'react';
import { X, MessageCircle, Sparkles, Layers, Palette, Maximize2 } from 'lucide-react';
import { Artwork } from '../types';
import { AtelierButton } from './AtelierButton';
import { useWhatsAppRedirect } from '../hooks/useWhatsAppRedirect';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, onClose }) => {
  const { inquireAboutArtwork } = useWhatsAppRedirect();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (artwork) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [artwork, onClose]);

  if (!artwork) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C1917]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#FAF7F2] text-[#1C1917] shadow-2xl border border-[#C5A059]/30 flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#FAF7F2]/90 hover:bg-[#FAF7F2] border border-[#1C1917]/15 rounded-full flex items-center justify-center text-[#1C1917] hover:text-[#C5A059] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Artwork Visual Display */}
        <div className="md:w-3/5 bg-[#1C1917] flex items-center justify-center relative p-4 md:p-8 min-h-[300px] md:min-h-[500px]">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="max-h-[75vh] w-auto object-contain shadow-lg"
          />
          <div className="absolute bottom-4 left-4 bg-[#1C1917]/80 text-[#FAF7F2] text-xs px-3 py-1.5 backdrop-blur-xs flex items-center gap-1.5 border border-white/10">
            <Maximize2 className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Digital Atelier Master Original</span>
          </div>
        </div>

        {/* Artwork Curatorial Details */}
        <div className="md:w-2/5 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-sans tracking-[0.2em] uppercase font-semibold text-[#C5A059]">
                {artwork.category}
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-xs text-[#78716C]">{artwork.year}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-semibold leading-snug mb-3">
              {artwork.title}
            </h2>

            <p className="text-sm sm:text-base text-[#78716C] font-sans leading-relaxed mb-6">
              {artwork.description}
            </p>

            {/* Atelier Technical Metadata */}
            <div className="space-y-3 py-4 border-y border-[#F0ECE1] text-xs sm:text-sm font-sans">
              <div className="flex items-start gap-2.5">
                <Palette className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#1C1917]">Medium: </span>
                  <span className="text-[#78716C]">{artwork.medium}</span>
                </div>
              </div>

              {artwork.brushDetails && (
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1C1917]">Brush Profile: </span>
                    <span className="text-[#78716C]">{artwork.brushDetails}</span>
                  </div>
                </div>
              )}

              {artwork.procreateLayers && (
                <div className="flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1C1917]">Procreate Layers: </span>
                    <span className="text-[#78716C]">{artwork.procreateLayers} layers, CMYK Proofed</span>
                  </div>
                </div>
              )}

              {artwork.canvasSpecs && (
                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 text-[#C5A059] shrink-0 text-center font-serif text-xs font-bold">⊞</span>
                  <div>
                    <span className="font-medium text-[#1C1917]">Canvas Dimensions: </span>
                    <span className="text-[#78716C]">{artwork.canvasSpecs}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            {artwork.tags && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {artwork.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-sans bg-[#F5EFEB] text-[#78716C] px-2.5 py-1 border border-[#F0ECE1]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action */}
          <div className="pt-4 border-t border-[#F0ECE1]">
            <AtelierButton
              variant="whatsapp"
              className="w-full justify-center"
              icon={<MessageCircle className="w-4 h-4" />}
              onClick={() => inquireAboutArtwork(artwork.title, artwork.category)}
            >
              Inquire About Original / Prints
            </AtelierButton>
          </div>
        </div>
      </div>
    </div>
  );
};

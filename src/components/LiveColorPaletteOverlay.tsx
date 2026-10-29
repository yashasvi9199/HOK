import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, Palette } from 'lucide-react';

interface LiveColorPaletteOverlayProps {
  palette: string[];
  artworkTitle?: string;
  className?: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-right' | 'bottom-bar';
}

const COLOR_NAMES: Record<string, string> = {
  '#ece7d5': 'Smoke Whisper',
  '#837d75': 'Weathered Steel',
  '#806055': 'Drystone Clay',
  '#a33533': 'Cindered Red',
  '#30292a': 'Obsidian Veil',
  '#d4b483': 'Antique Studio Gold',
  '#ffffff': 'Pure Alabaster',
  '#241e1f': 'Deep Ink Carbon',
  '#c97b63': 'Terracotta Ochre',
  '#6e2322': 'Crimson Silk',
  '#5a3a36': 'Raw Umber',
};

export const LiveColorPaletteOverlay: React.FC<LiveColorPaletteOverlayProps> = ({
  palette,
  artworkTitle,
  className = '',
  position = 'bottom-bar',
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1800);
    } catch {
      // safe fallback
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`select-none pointer-events-auto ${className}`}
    >
      <div className="bg-[#30292a]/90 backdrop-blur-md border border-[#ece7d5]/25 px-3 py-2 shadow-xl flex items-center justify-between gap-3 transition-all duration-300">
        <div className="flex items-center gap-1.5 text-[10px] font-sans text-[#ece7d5]/85 uppercase tracking-wider shrink-0">
          <Palette className="w-3 h-3 text-[#a33533]" />
          <span className="hidden sm:inline">Palette</span>
        </div>

        {/* Circular Color Swatches */}
        <div className="flex items-center gap-1.5">
          {palette.map((hex, index) => {
            const colorName = COLOR_NAMES[hex.toLowerCase()] || hex;
            const isCopied = copiedHex === hex;

            return (
              <button
                key={`${hex}-${index}`}
                type="button"
                onClick={(e) => handleCopy(hex, e)}
                title={`Click to copy: ${colorName} (${hex})`}
                className="group/swatch relative w-5 h-5 rounded-full border border-[#ece7d5]/40 hover:scale-125 transition-transform duration-200 cursor-pointer shadow-xs focus:outline-none"
                style={{ backgroundColor: hex }}
              >
                {isCopied && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full text-[9px] text-[#ece7d5]">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Copy Feedback Toast */}
        <AnimatePresence>
          {copiedHex ? (
            <motion.div
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-mono text-[#ece7d5] bg-[#a33533] px-2 py-0.5 rounded-xs flex items-center gap-1"
            >
              <Check className="w-2.5 h-2.5" />
              <span>{copiedHex}</span>
            </motion.div>
          ) : (
            <span className="text-[9px] font-sans text-[#ece7d5]/60 hover:text-[#ece7d5] cursor-default hidden md:inline">
              Tap swatch to copy
            </span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

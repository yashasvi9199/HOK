import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Paintbrush,
  Compass,
  Palette,
  Copy,
  Check,
} from 'lucide-react';
import anatomyData from '../data/anatomy.json';

interface AnatomyLayer {
  id: string;
  index: number;
  stageCode: string;
  shortLabel: string;
  name: string;
  category: string;
  blendMode: string;
  brush: string;
  technique: string;
  opacity: number;
  imageUrl: string;
  description: string;
  palette: string[];
  pigmentNames: string[];
  techniqueTip: string;
}

export const ArtworkLayerDeconstructor: React.FC = () => {
  const layers = anatomyData.layers as AnatomyLayer[];

  // Default to Stage 8 so the full multi-layered couture piece is shown on load
  const [activeStage, setActiveStage] = useState<number>(8);
  const [layerVisibility, setLayerVisibility] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
  });
  const [hoveredCircleLayer, setHoveredCircleLayer] = useState<number | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const activeLayerData =
    layers.find((l) => l.index === activeStage) || layers[layers.length - 1];

  // Toggle individual layer visibility from the right-hooked vertical circular rail
  const toggleLayer = (layerIdx: number) => {
    // If the user clicks a layer higher than current activeStage, expand activeStage to include it
    if (layerIdx > activeStage) {
      setActiveStage(layerIdx);
      setLayerVisibility((prev) => ({
        ...prev,
        [layerIdx]: true,
      }));
      return;
    }

    setLayerVisibility((prev) => ({
      ...prev,
      [layerIdx]: !prev[layerIdx],
    }));
  };

  const handleCopyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1600);
    } catch {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1600);
    }
  };

  // Active visible stages up to activeStage
  const visibleStagesUpToActive = layers.filter(
    (l) => l.index <= activeStage && layerVisibility[l.index]
  );
  const visibleCount = visibleStagesUpToActive.length;

  return (
    <section
      id="anatomy-section"
      className="py-10 md:py-12 bg-[#837d75] text-[#ece7d5] relative overflow-hidden border-b border-[#30292a]/40 select-none"
    >
      {/* Subtle Atmospheric Studio Lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          background:
            'radial-gradient(circle at 28% 45%, rgba(163, 53, 51, 0.22) 0%, rgba(128, 96, 85, 0.28) 50%, rgba(48, 41, 42, 0.48) 100%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-10 relative z-10">
        {/* COMPACT EDITORIAL HEADER (Fitted for Single-Viewport Clarity) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-[#ece7d5]/25 gap-3"
        >
          <div>
            <div className="flex items-center gap-2 text-[11px] font-sans tracking-[0.24em] uppercase text-[#a33533] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{anatomyData.sectionKicker}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#ece7d5] tracking-tight leading-none">
              {anatomyData.sectionTitle}
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-sans text-[#ece7d5]/85 max-w-md leading-snug md:text-right">
            {anatomyData.sectionSubtitle}
          </p>
        </motion.div>

        {/* =========================================================================
            GEOMETRIC 3-ZONE STUDIO CONSOLE (Single-Viewport Balanced Architecture)
            Zone 1 (Left, 5 cols)  : Registered 2D Couture Canvas Frame
            Zone 2 (Center, 6 cols): Horizontal Master Progression + Technical Inspector
            Zone 3 (Right, 1 col)  : Right-Hooked Vertical Circular Isolate/Mute Rail
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* ZONE 1: REGISTERED 2D CANVAS VIEWPORT */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 bg-[#30292a] p-3 sm:p-4 border border-[#ece7d5]/30 shadow-[0_20px_50px_rgba(48,41,42,0.55)] flex flex-col justify-between">
              {/* Top Archival Registration Bar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#ece7d5]/15 text-[11px] font-mono text-[#ece7d5]/80">
                <span className="uppercase tracking-wider">
                  {activeLayerData.name}
                </span>
                <span className="text-[#a33533] font-semibold">
                  {visibleCount} / 8 LAYERS ACTIVE
                </span>
              </div>

              {/* Strictly Aligned 2D Registered Canvas Stage (Full Figure Visible Without Cropping) */}
              <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[490px] bg-[#ffffff] overflow-hidden border border-[#ece7d5]/25 flex items-center justify-center">
                {visibleStagesUpToActive.length > 0 ? (
                  visibleStagesUpToActive.map((stageLayer) => (
                    <img
                      key={stageLayer.id}
                      src={stageLayer.imageUrl}
                      alt={stageLayer.name}
                      style={{ opacity: stageLayer.opacity / 100 }}
                      className="absolute inset-0 w-full h-full object-contain object-center select-none pointer-events-none transition-opacity duration-300"
                    />
                  ))
                ) : (
                  <div className="text-center px-6 text-xs font-mono uppercase tracking-widest text-[#30292a]/50">
                    All stages muted — toggle any circular stage node on the right rail
                  </div>
                )}

                {/* Subtle Corner Registration Hairlines */}
                <div className="pointer-events-none absolute inset-2 border border-[#30292a]/10 z-20" />

                {/* Floating Stage Badge Top-Left */}
                <div className="absolute top-3 left-3 z-20 bg-[#30292a]/90 text-[#ece7d5] px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border border-[#ece7d5]/25">
                  STAGE {activeLayerData.stageCode} · {activeLayerData.shortLabel}
                </div>
              </div>

              {/* Compact Prev / Next Stage Bar Inside Frame */}
              <div className="mt-2.5 pt-2 border-t border-[#ece7d5]/15 flex items-center justify-between gap-2">
                <button
                  type="button"
                  disabled={activeStage <= 1}
                  onClick={() => setActiveStage((s) => Math.max(1, s - 1))}
                  className="px-3 py-1.5 bg-[#806055]/45 hover:bg-[#a33533] disabled:opacity-30 disabled:pointer-events-none text-[11px] font-sans uppercase tracking-wider text-[#ece7d5] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <span className="text-xs font-serif italic text-[#ece7d5]/90 truncate">
                  {activeLayerData.name}
                </span>

                <button
                  type="button"
                  disabled={activeStage >= 8}
                  onClick={() => setActiveStage((s) => Math.min(8, s + 1))}
                  className="px-3 py-1.5 bg-[#806055]/45 hover:bg-[#a33533] disabled:opacity-30 disabled:pointer-events-none text-[11px] font-sans uppercase tracking-wider text-[#ece7d5] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ZONE 2: HORIZONTAL MASTER PROGRESSION SCRUBBER & STAGE TECHNICAL INSPECTOR */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {/* MODULE A: HORIZONTAL MASTER PROGRESSION SCRUBBER (Distinct Linear Timeline) */}
            <div className="bg-[#30292a]/95 border border-[#ece7d5]/25 p-4 sm:p-5 shadow-lg">
              <div className="flex items-center justify-between mb-2.5">
                <label
                  htmlFor="anatomy-stage-slider"
                  className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#ece7d5]/90 flex items-center gap-2 font-semibold"
                >
                  <Layers className="w-3.5 h-3.5 text-[#a33533]" />
                  <span>Scrub Master Progression (STAGE 01 – 08)</span>
                </label>
                <span className="text-xs font-mono text-[#a33533] font-semibold tabular-nums">
                  STAGE 0{activeStage} / 08 ({Math.round((activeStage / 8) * 100)}%)
                </span>
              </div>

              {/* Linear Range Scrubber */}
              <input
                id="anatomy-stage-slider"
                type="range"
                min={1}
                max={8}
                step={1}
                value={activeStage}
                onChange={(e) => setActiveStage(Number(e.target.value))}
                className="w-full h-1.5 bg-[#837d75]/45 accent-[#a33533] cursor-pointer mb-3.5"
              />

              {/* Compact 8-Step Horizontal Timeline Strip */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                {layers.map((l) => {
                  const isCurrent = activeStage === l.index;
                  const isPassed = l.index < activeStage;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setActiveStage(l.index)}
                      className={`py-1.5 px-1 text-center border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#a33533] text-[#ece7d5] border-[#ece7d5] shadow-sm'
                          : isPassed
                          ? 'bg-[#806055]/45 text-[#ece7d5]/90 border-[#ece7d5]/25 hover:border-[#ece7d5]'
                          : 'bg-[#30292a] text-[#ece7d5]/45 border-[#ece7d5]/10 hover:border-[#ece7d5]/30'
                      }`}
                    >
                      <div className="text-[10px] font-mono font-semibold leading-tight">
                        {l.stageCode}
                      </div>
                      <div className="text-[10px] font-sans truncate mt-0.5 leading-tight">
                        {l.shortLabel}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MODULE B: ACTIVE STAGE TECHNICAL INSPECTOR (Brush, Technique & Color Pigments) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayerData.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex-1 p-5 sm:p-6 bg-[#30292a] border-t-2 border-t-[#a33533] border-x border-b border-[#ece7d5]/25 flex flex-col justify-between gap-4 shadow-xl"
              >
                {/* Stage Header & Blend Specs */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#ece7d5]/75 mb-1.5">
                    <span className="uppercase tracking-widest text-[#a33533] font-semibold">
                      {activeLayerData.category}
                    </span>
                    <span>
                      Blend: <strong className="text-[#ece7d5]">{activeLayerData.blendMode}</strong>
                      {' · '}
                      Opacity: <strong className="text-[#ece7d5]">{activeLayerData.opacity}%</strong>
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#ece7d5] tracking-tight">
                    {activeLayerData.name}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#ece7d5]/85 leading-relaxed mt-2">
                    {activeLayerData.description}
                  </p>
                </div>

                {/* BRUSH & TECHNIQUE SPECS (2-Column Architectural Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 1. BRUSH */}
                  <div className="p-3.5 bg-[#806055]/25 border border-[#ece7d5]/20 flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#a33533] font-semibold">
                      <Paintbrush className="w-3.5 h-3.5" />
                      <span>Brush</span>
                    </div>
                    <div className="text-sm font-serif text-[#ece7d5] mt-1.5 leading-snug">
                      {activeLayerData.brush}
                    </div>
                  </div>

                  {/* 2. TECHNIQUE */}
                  <div className="p-3.5 bg-[#806055]/25 border border-[#ece7d5]/20 flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#a33533] font-semibold">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Technique</span>
                    </div>
                    <div className="text-sm font-serif text-[#ece7d5] mt-1.5 leading-snug">
                      {activeLayerData.technique}
                    </div>
                  </div>
                </div>

                {/* 3. COLOR PIGMENTS (Interactive Swatch Cards with Names & Hex Codes) */}
                <div className="p-3.5 bg-[#806055]/20 border border-[#ece7d5]/20">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#ece7d5]/85 font-semibold">
                      <Palette className="w-3.5 h-3.5 text-[#a33533]" />
                      <span>Color Pigments</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#ece7d5]/55">
                      Click swatch to copy HEX
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {activeLayerData.palette.map((hex, idx) => {
                      const pigmentName =
                        activeLayerData.pigmentNames?.[idx] || `Pigment 0${idx + 1}`;
                      const isCopied = copiedHex === hex;
                      return (
                        <button
                          key={`${activeLayerData.id}-${hex}-${idx}`}
                          type="button"
                          onClick={() => handleCopyHex(hex)}
                          className="group flex items-center gap-2.5 p-2 bg-[#30292a]/90 border border-[#ece7d5]/20 hover:border-[#a33533] transition-colors text-left cursor-pointer"
                        >
                          <span
                            className="w-6 h-6 rounded-full border border-[#ece7d5]/40 shrink-0 shadow-inner"
                            style={{ backgroundColor: hex }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] font-serif text-[#ece7d5] truncate leading-tight">
                              {pigmentName}
                            </div>
                            <div className="text-[10px] font-mono text-[#ece7d5]/60 flex items-center gap-1 mt-0.5">
                              <span>{isCopied ? 'COPIED' : hex.toUpperCase()}</span>
                              {isCopied ? (
                                <Check className="w-2.5 h-2.5 text-[#a33533]" />
                              ) : (
                                <Copy className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Atelier Execution Note */}
                <div className="flex items-start gap-2.5 text-xs font-sans text-[#ece7d5]/90 pt-2.5 border-t border-[#ece7d5]/15">
                  <CheckCircle2 className="w-4 h-4 text-[#a33533] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <strong className="uppercase tracking-wider text-[#ece7d5]">
                      Atelier Note:{' '}
                    </strong>
                    {activeLayerData.techniqueTip}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ZONE 3: RIGHT-HOOKED VERTICAL CIRCULAR LAYER ISOLATE / MUTE DOCK */}
          <div className="lg:col-span-1 flex flex-col justify-between bg-[#30292a]/95 border border-[#ece7d5]/25 p-3 shadow-2xl relative">
            <div className="text-center border-b border-[#ece7d5]/15 pb-2 mb-2">
              <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#a33533] font-semibold">
                Isolate
              </div>
              <div className="text-[10px] font-serif text-[#ece7d5]/85">
                Layers
              </div>
            </div>

            {/* Vertical Connecting Spine Line (Desktop) */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-16 bottom-12 left-1/2 -translate-x-1/2 w-[1px] bg-[#ece7d5]/20 pointer-events-none"
            />

            {/* 8 Circular Layer Buttons Expanding Vertically */}
            <div className="flex flex-row lg:flex-col items-center justify-between gap-2 sm:gap-2.5 flex-1 py-1 relative z-10 flex-wrap lg:flex-nowrap">
              {layers.map((l) => {
                const isVisible = layerVisibility[l.index];
                const isWithinStage = l.index <= activeStage;
                const isActiveVisually = isVisible && isWithinStage;

                return (
                  <div
                    key={`circle-layer-${l.id}`}
                    className="relative flex items-center justify-center"
                    onMouseEnter={() => setHoveredCircleLayer(l.index)}
                    onMouseLeave={() => setHoveredCircleLayer(null)}
                  >
                    {/* Hover Tooltip Expanding Leftward */}
                    <AnimatePresence>
                      {hoveredCircleLayer === l.index && (
                        <motion.div
                          initial={{ opacity: 0, x: 6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 6 }}
                          transition={{ duration: 0.15 }}
                          className="hidden lg:flex items-center gap-2 absolute right-full mr-3 px-3 py-1.5 bg-[#30292a] border border-[#ece7d5]/35 text-[#ece7d5] whitespace-nowrap shadow-xl pointer-events-none z-30"
                        >
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: l.palette[0] }}
                          />
                          <span className="text-xs font-serif">
                            {l.stageCode} · {l.shortLabel}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-[#806055]/40 text-[#ece7d5]/90">
                            {isActiveVisually ? 'Visible' : 'Muted'}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Circular Design Toggle Button */}
                    <button
                      type="button"
                      onClick={() => toggleLayer(l.index)}
                      aria-label={`Toggle ${l.name} visibility`}
                      title={`${l.name} (${isActiveVisually ? 'Visible - Click to Mute' : 'Muted - Click to Show'})`}
                      className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all duration-200 cursor-pointer border-2 relative ${
                        isActiveVisually
                          ? 'bg-[#806055] text-[#ece7d5] border-[#ece7d5] shadow-[0_4px_14px_rgba(0,0,0,0.45)] scale-100 hover:bg-[#a33533]'
                          : 'bg-[#30292a] text-[#ece7d5]/40 border-[#ece7d5]/20 hover:border-[#ece7d5]/60 hover:text-[#ece7d5]/80'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold leading-none">
                        {l.stageCode}
                      </span>
                      <span className="mt-0.5">
                        {isActiveVisually ? (
                          <Eye className="w-3 h-3 text-[#ece7d5]" />
                        ) : (
                          <EyeOff className="w-3 h-3 text-[#ece7d5]/40" />
                        )}
                      </span>

                      {/* Active Status Dot on Circle Rim */}
                      <span
                        className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#30292a] ${
                          isActiveVisually ? 'bg-[#a33533]' : 'bg-[#837d75]/40'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="text-center border-t border-[#ece7d5]/15 pt-2 mt-2 text-[10px] font-mono text-[#ece7d5]/70">
              {visibleCount}/8 ON
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


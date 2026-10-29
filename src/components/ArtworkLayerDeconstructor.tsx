import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Eye, EyeOff, Sparkles, Box, Sliders, CheckCircle2 } from 'lucide-react';
import anatomyData from '../data/anatomy.json';
import { LiveColorPaletteOverlay } from './LiveColorPaletteOverlay';

export const ArtworkLayerDeconstructor: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(4); // Default to full composite (all 4 layers)
  const [is3DExploded, setIs3DExploded] = useState<boolean>(false);
  const [layerVisibility, setLayerVisibility] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const canvasRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef3 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef4 = useRef<HTMLCanvasElement | null>(null);

  // Draw authentic anatomical canvas artwork layers
  useEffect(() => {
    const W = 640;
    const H = 840;

    // --- LAYER 1: 9-Head Runway Croquis (Graphite pencil lines on parchment) ---
    if (canvasRef1.current) {
      const c1 = canvasRef1.current;
      c1.width = W;
      c1.height = H;
      const ctx = c1.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, W, H);
        // Parchment paper background
        ctx.fillStyle = '#ece7d5';
        ctx.fillRect(0, 0, W, H);

        // Subtle graphite sketch grid lines
        ctx.strokeStyle = 'rgba(131, 125, 117, 0.25)';
        ctx.lineWidth = 1;
        for (let y = 80; y < H; y += 80) {
          ctx.beginPath();
          ctx.moveTo(40, y);
          ctx.lineTo(W - 40, y);
          ctx.stroke();
        }

        // 9-Head Croquis Figure Outline (Loose gesture lines)
        ctx.strokeStyle = '#30292a';
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Head & Chignon
        ctx.beginPath();
        ctx.ellipse(320, 110, 22, 28, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(336, 100, 14, 0, Math.PI * 2);
        ctx.stroke();

        // Neck & Collarbones
        ctx.beginPath();
        ctx.moveTo(314, 138);
        ctx.lineTo(312, 175);
        ctx.moveTo(326, 138);
        ctx.lineTo(328, 175);
        ctx.moveTo(270, 185);
        ctx.lineTo(370, 185);
        ctx.stroke();

        // Dynamic Runway Bodice & Shoulders
        ctx.beginPath();
        ctx.moveTo(270, 185);
        ctx.lineTo(290, 290); // Left waist
        ctx.lineTo(320, 310); // Center pelvic arch
        ctx.lineTo(350, 290); // Right waist
        ctx.lineTo(370, 185);
        ctx.stroke();

        // Royal Lehenga Skirt Hemlines & Dynamic Pleat Creases
        const pleats = [
          [290, 290, 180, 780],
          [300, 295, 240, 795],
          [312, 305, 305, 805],
          [328, 305, 340, 805],
          [340, 295, 410, 795],
          [350, 290, 480, 780],
        ];
        pleats.forEach(([x1, y1, x2, y2]) => {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo((x1 + x2) * 0.5 - 25, (y1 + y2) * 0.5, x2, y2);
          ctx.stroke();
        });

        // Hem Arc
        ctx.beginPath();
        ctx.moveTo(180, 780);
        ctx.quadraticCurveTo(325, 825, 480, 780);
        ctx.stroke();
      }
    }

    // --- LAYER 2: Underpainting & Gouache Wash (Warm skin tones & base ochre silk) ---
    if (canvasRef2.current) {
      const c2 = canvasRef2.current;
      c2.width = W;
      c2.height = H;
      const ctx = c2.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, W, H);
        // Face & Neck warm drystone clay gouache wash
        ctx.fillStyle = '#806055';
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.ellipse(320, 110, 22, 28, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(313, 138, 14, 38);

        // Raw Silk Skirt & Bodice Base Pigment
        const silkGrad = ctx.createLinearGradient(180, 200, 480, 800);
        silkGrad.addColorStop(0, '#806055');
        silkGrad.addColorStop(0.5, '#a33533');
        silkGrad.addColorStop(1, '#6e2322');
        ctx.fillStyle = silkGrad;
        ctx.globalAlpha = 0.9;

        ctx.beginPath();
        ctx.moveTo(270, 185);
        ctx.lineTo(370, 185);
        ctx.lineTo(350, 290);
        ctx.lineTo(480, 780);
        ctx.quadraticCurveTo(325, 825, 180, 780);
        ctx.lineTo(290, 290);
        ctx.closePath();
        ctx.fill();
      }
    }

    // --- LAYER 3: Velvet Drapery & Chiaroscuro (Deep obsidian & cinder shadows) ---
    if (canvasRef3.current) {
      const c3 = canvasRef3.current;
      c3.width = W;
      c3.height = H;
      const ctx = c3.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#30292a';
        ctx.globalAlpha = 0.88;

        // Deep shadow folds between pleats
        for (let i = 0; i < 5; i++) {
          const sx = 295 + i * 14;
          const ex = 210 + i * 65;
          ctx.beginPath();
          ctx.moveTo(sx, 300);
          ctx.quadraticCurveTo(ex - 35, 540, ex, 790);
          ctx.quadraticCurveTo(ex - 15, 540, sx + 8, 300);
          ctx.closePath();
          ctx.fill();
        }

        // Drapery side shade vignette
        ctx.beginPath();
        ctx.moveTo(180, 780);
        ctx.lineTo(240, 785);
        ctx.quadraticCurveTo(270, 480, 290, 290);
        ctx.lineTo(270, 185);
        ctx.closePath();
        ctx.fill();
      }
    }

    // --- LAYER 4: 24k Zardozi Embroidery & Specular Glaze (Pure gold & brocade) ---
    if (canvasRef4.current) {
      const c4 = canvasRef4.current;
      c4.width = W;
      c4.height = H;
      const ctx = c4.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, W, H);

        // Pure gold leaf floral brocade & borders
        ctx.strokeStyle = '#d4b483';
        ctx.fillStyle = '#ece7d5';
        ctx.lineWidth = 3;

        // Waistband Zardozi Border
        ctx.strokeRect(286, 290, 68, 14);
        for (let x = 290; x < 350; x += 10) {
          ctx.beginPath();
          ctx.arc(x, 297, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Royal Skirt Hemline Embroidered Band
        ctx.save();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#d4b483';
        ctx.beginPath();
        ctx.moveTo(180, 765);
        ctx.quadraticCurveTo(325, 810, 480, 765);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(180, 775);
        ctx.quadraticCurveTo(325, 820, 480, 775);
        ctx.stroke();
        ctx.restore();

        // 180+ Specular Gold Zardozi Glaze Stipples
        for (let i = 0; i < 220; i++) {
          const t = Math.random();
          const x = 230 + (Math.random() - 0.5) * 190 * (1 + t * 0.9);
          const y = 330 + t * 430;
          const r = 1 + Math.random() * 2.8;

          ctx.fillStyle = i % 4 === 0 ? '#ffffff' : '#d4b483';
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();

          // 4-point star specular flare on selected sequins
          if (i % 24 === 0) {
            ctx.strokeStyle = 'rgba(255,255,255,0.9)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x - 7, y);
            ctx.lineTo(x + 7, y);
            ctx.moveTo(x, y - 7);
            ctx.lineTo(x, y + 7);
            ctx.stroke();
          }
        }
      }
    }
  }, []);

  const activeLayerData = useMemo(() => {
    return anatomyData.layers[Math.min(activeStage - 1, 3)];
  }, [activeStage]);

  const toggleLayer = (layerIdx: number) => {
    setLayerVisibility((prev) => ({
      ...prev,
      [layerIdx]: !prev[layerIdx],
    }));
  };

  return (
    <section
      id="anatomy-section"
      className="py-24 md:py-32 bg-[#30292a] text-[#ece7d5] relative overflow-hidden border-b border-[#ece7d5]/15 select-none"
    >
      {/* Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(circle at 65% 45%, rgba(163, 53, 51, 0.35) 0%, rgba(128, 96, 85, 0.2) 50%, rgba(48, 41, 42, 0) 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#ece7d5]/20 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-sans tracking-[0.26em] uppercase text-[#a33533] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{anatomyData.sectionKicker}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#ece7d5] tracking-tight">
              {anatomyData.sectionTitle}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle: 2D Composite vs 3D Exploded Perspective */}
            <button
              type="button"
              onClick={() => setIs3DExploded(!is3DExploded)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-sans uppercase tracking-wider transition-all border cursor-pointer ${
                is3DExploded
                  ? 'bg-[#a33533] text-[#ece7d5] border-[#a33533] shadow-md'
                  : 'bg-[#806055] text-[#ece7d5] border-[#ece7d5]/30 hover:border-[#ece7d5]'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>{is3DExploded ? '3D Exploded Mode Active' : 'Enable 3D Layer Stack'}</span>
            </button>
          </div>
        </motion.div>

        {/* MAIN DECONSTRUCTOR VIEWPORT (Split 2-Column Desktop Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Visual Canvas Stack (2D or 3D Exploded) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div
              className={`relative w-full max-w-[420px] aspect-[4/5] bg-[#1a1718] border-2 border-[#ece7d5]/30 shadow-[0_28px_80px_rgba(0,0,0,0.7)] transition-all duration-700 ${
                is3DExploded ? 'perspective-book p-4' : 'p-2'
              }`}
              style={{
                perspective: is3DExploded ? '1500px' : 'none',
              }}
            >
              <div
                className="relative w-full h-full preserve-3d transition-transform duration-700"
                style={{
                  transform: is3DExploded
                    ? 'rotateX(22deg) rotateY(-22deg) scale(0.92)'
                    : 'none',
                }}
              >
                {/* LAYER 1: Croquis */}
                <canvas
                  ref={canvasRef1}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-all duration-500"
                  style={{
                    display: layerVisibility[1] && activeStage >= 1 ? 'block' : 'none',
                    transform: is3DExploded ? 'translateZ(0px)' : 'none',
                    boxShadow: is3DExploded ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
                  }}
                />

                {/* LAYER 2: Underpainting */}
                <canvas
                  ref={canvasRef2}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-all duration-500"
                  style={{
                    display: layerVisibility[2] && activeStage >= 2 ? 'block' : 'none',
                    mixBlendMode: 'multiply',
                    transform: is3DExploded ? 'translateZ(85px)' : 'none',
                    boxShadow: is3DExploded ? '0 10px 30px rgba(0,0,0,0.4)' : 'none',
                  }}
                />

                {/* LAYER 3: Velvet Drapery Shadows */}
                <canvas
                  ref={canvasRef3}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-all duration-500"
                  style={{
                    display: layerVisibility[3] && activeStage >= 3 ? 'block' : 'none',
                    mixBlendMode: 'multiply',
                    transform: is3DExploded ? 'translateZ(170px)' : 'none',
                    boxShadow: is3DExploded ? '0 10px 30px rgba(0,0,0,0.4)' : 'none',
                  }}
                />

                {/* LAYER 4: 24k Zardozi Embroidery */}
                <canvas
                  ref={canvasRef4}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-all duration-500"
                  style={{
                    display: layerVisibility[4] && activeStage >= 4 ? 'block' : 'none',
                    transform: is3DExploded ? 'translateZ(255px)' : 'none',
                    boxShadow: is3DExploded ? '0 15px 40px rgba(0,0,0,0.6)' : 'none',
                  }}
                />
              </div>

              {/* Live Color Palette Extractor overlay on hover */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <LiveColorPaletteOverlay
                  palette={activeLayerData.palette}
                  artworkTitle={activeLayerData.name}
                />
              </div>
            </div>

            {/* Canvas File Specs Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#ece7d5]/75">
              <span>{anatomyData.canvasSpecs.dimensions}</span>
              <span>·</span>
              <span>{anatomyData.canvasSpecs.resolution}</span>
              <span>·</span>
              <span>{anatomyData.canvasSpecs.colorSpace}</span>
            </div>
          </div>

          {/* Right Column: Layer Inspector & Controls */}
          <div className="lg:col-span-6 space-y-6">
            {/* Stage Stepper Buttons */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-[0.2em] text-[#ece7d5]/75 mb-3">
                Select Construction Stage (1 to 4):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {anatomyData.layers.map((l) => {
                  const isActive = activeStage === l.index;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setActiveStage(l.index)}
                      className={`py-3 px-2 text-center border cursor-pointer transition-all ${
                        isActive
                          ? 'bg-[#a33533] text-[#ece7d5] border-[#a33533] shadow-md font-bold'
                          : 'bg-[#806055]/30 text-[#ece7d5]/80 border-[#ece7d5]/20 hover:border-[#ece7d5]'
                      }`}
                    >
                      <div className="text-xs uppercase tracking-wider font-sans">
                        Stage 0{l.index}
                      </div>
                      <div className="text-[10px] font-mono text-[#ece7d5]/70 truncate mt-0.5">
                        {l.category.split(' ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Layer Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayerData.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-[#806055]/30 border border-[#ece7d5]/20 space-y-4 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono bg-[#a33533] text-[#ece7d5] px-2.5 py-0.5 uppercase tracking-wider">
                    {activeLayerData.category}
                  </span>
                  <span className="text-xs font-mono text-[#ece7d5]/80">
                    Blend Mode: <strong className="text-[#ece7d5]">{activeLayerData.blendMode}</strong>
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#ece7d5]">
                  {activeLayerData.name}
                </h3>

                <p className="font-sans text-sm text-[#ece7d5]/85 leading-relaxed">
                  {activeLayerData.description}
                </p>

                {/* Brush Spec */}
                <div className="p-3 bg-[#30292a] border border-[#ece7d5]/15 flex items-center justify-between text-xs font-sans">
                  <span className="text-[#ece7d5]/70">Calibrated Procreate Brush:</span>
                  <strong className="text-[#ece7d5] font-serif tracking-wide">
                    {activeLayerData.brush}
                  </strong>
                </div>

                {/* Technique Pro-Tip */}
                <div className="flex items-start gap-2.5 text-xs font-sans text-[#ece7d5]/85 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-[#a33533] shrink-0 mt-0.5" />
                  <span>
                    <strong>Atelier Technique: </strong>
                    {activeLayerData.techniqueTip}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Individual Layer Visibility Toggles (Solo/Mute) */}
            <div>
              <div className="flex items-center justify-between text-xs font-sans uppercase tracking-[0.2em] text-[#ece7d5]/75 mb-2.5">
                <span>Toggle Individual Layers:</span>
                <span className="text-[11px] font-mono text-[#a33533]">
                  {Object.values(layerVisibility).filter(Boolean).length} of 4 visible
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {anatomyData.layers.map((l) => {
                  const isVisible = layerVisibility[l.index];
                  return (
                    <button
                      key={`toggle-${l.id}`}
                      type="button"
                      onClick={() => toggleLayer(l.index)}
                      className={`p-2.5 border text-left flex items-center justify-between text-xs font-sans transition-all cursor-pointer ${
                        isVisible
                          ? 'bg-[#30292a] border-[#ece7d5]/30 text-[#ece7d5]'
                          : 'bg-[#1a1718] border-[#ece7d5]/10 text-[#ece7d5]/40'
                      }`}
                    >
                      <span className="truncate">Layer {l.index}: {l.category.split(' ')[0]}</span>
                      {isVisible ? (
                        <Eye className="w-3.5 h-3.5 text-[#a33533]" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

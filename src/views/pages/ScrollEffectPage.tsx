import React, { useState, useEffect } from 'react';
import { useScroll, motion, useMotionValueEvent } from 'motion/react';
import { Sparkles, ArrowDown, Palette, Sliders, Check, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skiper19 } from '../../components/Skiper19';
import { AtelierButton } from '../../components/AtelierButton';
import type { StrokeColorOption, StrokeWidthOption, Milestone } from './scroll-effect.types';

const MILESTONES: readonly Milestone[] = [
  {
    id: '01',
    progress: 0.15,
    tag: 'Phase 01 • 15%',
    title: 'The Initial Gesture Stroke',
    description: 'Every couture masterpiece begins with a single confident vector stroke, mapping gesture and dynamic poise.',
  },
  {
    id: '02',
    progress: 0.45,
    tag: 'Phase 02 • 45%',
    title: 'Textural Curves & Handloom Weave',
    description: 'Simulating the fluid drag of dry ink and Indian raw silk textures as the path loops through dimensional space.',
  },
  {
    id: '03',
    progress: 0.75,
    tag: 'Phase 03 • 75%',
    title: 'Zardozi Gold & Light Diffusion',
    description: 'Intricate micro-curves emulating royal metallic embroidery catching light under runway spotlights.',
  },
  {
    id: '04',
    progress: 0.95,
    tag: 'Phase 04 • 95%',
    title: 'Couture Synthesis Complete',
    description: 'The stroke terminates into full digital equilibrium — ready for atelier publishing and exhibition.',
  },
];

export const ScrollEffectPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [strokeColor, setStrokeColor] = useState<StrokeColorOption>('#C5A059');
  const [strokeWidth, setStrokeWidth] = useState<StrokeWidthOption>(16);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setCurrentProgress(Math.round(latest * 100));
  });

  const colors: readonly { label: string; value: StrokeColorOption; hex: string }[] = [
    { label: 'Atelier Gold', value: '#C5A059', hex: '#C5A059' },
    { label: 'Skiper Lime', value: '#C2F84F', hex: '#C2F84F' },
    { label: 'Crimson Vermilion', value: '#E05A47', hex: '#E05A47' },
    { label: 'Sky Azure', value: '#38BDF8', hex: '#38BDF8' },
    { label: 'Royal Violet', value: '#A855F7', hex: '#A855F7' },
  ];

  const widths: readonly StrokeWidthOption[] = [8, 14, 20, 28];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-[#1C1917] text-[#FAF7F2] min-h-[350vh] w-full selection:bg-[#C5A059]/30">
      {/* Floating HUD Controller */}
      <div className="fixed top-24 right-6 sm:right-10 z-40 bg-[#1C1917]/90 backdrop-blur-md border border-[#C5A059]/40 p-4 sm:p-5 rounded-lg shadow-2xl max-w-xs w-full">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>@skiper-ui/skiper19</span>
          </div>
          <span className="font-mono text-sm font-semibold text-white">
            {currentProgress}%
          </span>
        </div>

        {/* Progress bar line */}
        <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-[#C5A059] to-[#C2F84F] transition-all duration-150"
            style={{ width: `${currentProgress}%` }}
          />
        </div>

        {/* Stroke Color Selector */}
        <div className="space-y-2 mb-3">
          <label className="text-[11px] font-sans uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
            <Palette className="w-3 h-3 text-[#C5A059]" />
            <span>Stroke Color</span>
          </label>
          <div className="flex items-center gap-2">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => setStrokeColor(c.value)}
                className={`w-6 h-6 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                  strokeColor === c.value ? 'scale-110 ring-2 ring-white' : 'opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.label}
              >
                {strokeColor === c.value && <Check className="w-3 h-3 text-black stroke-[3]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Stroke Width Selector */}
        <div className="space-y-2">
          <label className="text-[11px] font-sans uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
            <Sliders className="w-3 h-3 text-[#C5A059]" />
            <span>Stroke Thickness: {strokeWidth}px</span>
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {widths.map((w) => (
              <button
                key={w}
                onClick={() => setStrokeWidth(w)}
                className={`py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
                  strokeWidth === w
                    ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold'
                    : 'border-stone-700 text-stone-300 hover:border-stone-500'
                }`}
              >
                {w}px
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-stone-800 mt-4 flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="text-[11px] uppercase tracking-wider text-stone-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Top</span>
          </button>
          <Link
            to="/"
            className="text-[11px] uppercase tracking-wider text-[#C5A059] hover:underline"
          >
            Return to Studio →
          </Link>
        </div>
      </div>

      {/* SVG Follow Scroll Path - Fixed in viewport or spanning the scroll canvas */}
      <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden">
        <Skiper19
          className="w-full h-full max-w-7xl max-h-screen opacity-90 drop-shadow-[0_0_25px_rgba(197,160,89,0.35)]"
          scrollYProgress={scrollYProgress}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          pathLengthRange={[0, 1]}
        />
      </div>

      {/* Narrative milestones aligned along the 350vh scroll journey */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 py-24 space-y-[60vh]">
        {/* Intro Banner */}
        <div className="text-center pt-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 bg-stone-900 border border-[#C5A059]/50 px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C5A059]">
              Scroll Animation Effect
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight mb-6">
            The SVG Stroke That Follows Your Scroll
          </h1>
          <p className="text-base sm:text-lg text-stone-300 font-sans leading-relaxed mb-8">
            An interactive demonstration of <strong className="text-white">@skiper-ui/skiper19</strong> dynamically bound to Framer Motion's <code className="text-[#C5A059] bg-stone-900 px-1.5 py-0.5 rounded text-sm">useScroll</code> and <code className="text-[#C5A059] bg-stone-900 px-1.5 py-0.5 rounded text-sm">useTransform</code>.
          </p>
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-stone-400 animate-bounce">
            <ArrowDown className="w-4 h-4 text-[#C5A059]" />
            <span>Scroll Down to Draw the Path</span>
            <ArrowDown className="w-4 h-4 text-[#C5A059]" />
          </div>
        </div>

        {/* Milestone Cards positioned throughout the scroll */}
        {MILESTONES.map((milestone, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className={`flex ${isEven ? 'justify-start' : 'justify-end'}`}
            >
              <div className="bg-[#1C1917]/90 backdrop-blur-md border border-stone-800 p-8 rounded-lg max-w-md shadow-2xl relative overflow-hidden group hover:border-[#C5A059]/60 transition-colors">
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#C5A059] to-[#C2F84F] w-full" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#C5A059] block mb-2 font-semibold">
                  {milestone.tag}
                </span>
                <h3 className="font-serif text-2xl text-white font-normal mb-3">
                  {milestone.title}
                </h3>
                <p className="text-sm font-sans text-stone-300 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Finale Section */}
        <div className="text-center pb-24 max-w-xl mx-auto">
          <div className="bg-[#1C1917]/90 backdrop-blur-md border border-[#C5A059]/40 p-8 rounded-xl shadow-2xl">
            <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto mb-4" />
            <h2 className="font-serif text-3xl text-white mb-3">
              Stroke Path Fully Rendered
            </h2>
            <p className="text-sm text-stone-300 font-sans mb-6 leading-relaxed">
              The scroll progress has completed 100% of the SVG path calculation. Seamlessly integrated into House of Kalakaar's digital atelier architecture.
            </p>
            <div className="flex items-center justify-center gap-4">
              <AtelierButton variant="primary" size="md" onClick={scrollToTop}>
                Scroll Back Up
              </AtelierButton>
              <Link to="/">
                <AtelierButton variant="outline" size="md">
                  Back to Homepage
                </AtelierButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollEffectPage;

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, Award, Sparkles } from 'lucide-react';
import storyData from '../data/artist_story.json';
import { generateOilPastelArtwork } from '../utils/proceduralArtGenerator';
import { LiveColorPaletteOverlay } from './LiveColorPaletteOverlay';

export const ArtistStorySection: React.FC = () => {
  const [isPlayingVoiceNote, setIsPlayingVoiceNote] = useState<boolean>(false);
  const portraitUrl = storyData.portraitUrl || '/images/about us/01-vrinda-haldia-portrait.png';

  return (
    <section
      id="artist-story-section"
      className="py-24 md:py-32 bg-[#806055] text-[#ece7d5] relative overflow-hidden border-b border-[#ece7d5]/15 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Asymmetric Portrait with Handwritten Note & Live Palette */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="bg-[#30292a] p-4 border-2 border-[#ece7d5]/25 shadow-2xl relative group">
              <div className="aspect-[4/5] relative overflow-hidden bg-[#1e191a]">
                <img
                  src={portraitUrl}
                  alt={storyData.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                {/* Live Color Palette Extractor overlay on hover */}
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <LiveColorPaletteOverlay
                    palette={['#30292a', '#806055', '#a33533', '#ece7d5', '#d4b483']}
                    artworkTitle="Artist Portrait Study"
                  />
                </div>
              </div>

              <div className="mt-3.5 text-center">
                <span className="font-serif text-xl font-semibold text-[#ece7d5]">
                  {storyData.name}
                </span>
                <p className="text-xs font-sans text-[#ece7d5]/80 uppercase tracking-wider mt-0.5">
                  {storyData.role}
                </p>
              </div>
            </div>

            {/* Flowing handwritten script accent */}
            <div className="absolute -bottom-6 right-0 bg-[#30292a] border border-[#a33533] py-2.5 px-6 shadow-xl">
              <span className="font-script text-3xl text-[#ece7d5]">
                "{storyData.signatureQuote}"
              </span>
            </div>
          </motion.div>

          {/* Right Column: Visual Callouts, Voice Memo Player & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 lg:pl-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase font-semibold text-[#ece7d5]">
              <Award className="w-3.5 h-3.5 text-[#a33533]" />
              <span>{storyData.kicker}</span>
            </div>

            <h2
              className="font-serif text-3xl sm:text-5xl font-normal text-[#ece7d5] tracking-tight leading-snug"
              style={{ textWrap: 'balance' }}
            >
              {storyData.headline}
            </h2>

            {/* Interactive Atelier Voice Memo Player Aesthetic */}
            <div className="p-5 bg-[#30292a] border border-[#ece7d5]/20 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-sans text-[#ece7d5]/75">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#a33533]" />
                  <span className="font-medium text-[#ece7d5]">{storyData.voiceNote.title}</span>
                </div>
                <span className="font-mono">{storyData.voiceNote.duration}</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsPlayingVoiceNote(!isPlayingVoiceNote)}
                  className="w-11 h-11 bg-[#a33533] hover:bg-[#806055] text-[#ece7d5] rounded-full flex items-center justify-center shrink-0 cursor-pointer shadow-md transition-colors"
                >
                  {isPlayingVoiceNote ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>

                {/* Simulated Audio Waveform Bars */}
                <div className="flex-1 flex items-center gap-1 h-7">
                  {Array.from({ length: 34 }).map((_, i) => {
                    const barHeight = isPlayingVoiceNote
                      ? 20 + Math.sin(i * 0.6) * 15 + Math.random() * 10
                      : 8 + (i % 5) * 4;
                    return (
                      <span
                        key={i}
                        className="flex-1 bg-[#ece7d5]/60 rounded-full transition-all duration-150"
                        style={{ height: `${barHeight}%` }}
                      />
                    );
                  })}
                </div>
              </div>

              <p className="text-xs font-serif italic text-[#ece7d5]/85 leading-relaxed pt-1">
                "{storyData.voiceNote.transcript}"
              </p>
            </div>

            {/* 3 Editorial Callout Fragments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {storyData.fragments.map((frag, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#30292a]/45 border border-[#ece7d5]/20 hover:border-[#a33533] transition-colors"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#a33533] block mb-1">
                    {frag.badge}
                  </span>
                  <div className="font-serif text-base font-semibold text-[#ece7d5] leading-tight">
                    {frag.title}
                  </div>
                  <p className="text-xs font-sans text-[#ece7d5]/80 mt-1.5 leading-relaxed">
                    {frag.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#ece7d5]/25">
              {storyData.stats.map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#ece7d5]">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-sans text-[#ece7d5]/75 uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

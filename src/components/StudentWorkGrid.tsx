import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Quote, MapPin } from 'lucide-react';
import studentData from '../data/student_work.json';
import { generateOilPastelArtwork, PastelSubject } from '../utils/proceduralArtGenerator';
import { LiveColorPaletteOverlay } from './LiveColorPaletteOverlay';

const STUDENT_SUBJECTS: PastelSubject[] = [
  'stilllife_vessels',
  'illustration_drape',
  'illustration_portrait',
  'digital_couture_2',
];

export const StudentWorkGrid: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const artUrls = useMemo(() => {
    const map: Record<string, string> = {};
    studentData.works.forEach((work, i) => {
      const subj = STUDENT_SUBJECTS[i % STUDENT_SUBJECTS.length];
      map[work.id] = generateOilPastelArtwork(subj, 800, 600);
    });
    return map;
  }, []);

  const filtered =
    selectedTag === 'All'
      ? studentData.works
      : studentData.works.filter((item) => item.tag === selectedTag);

  return (
    <div>
      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {studentData.categories.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 text-xs font-sans tracking-wide transition-all border cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#a33533] text-[#ece7d5] border-[#a33533] shadow-xs'
                  : 'bg-[#30292a] text-[#ece7d5]/80 border-[#ece7d5]/20 hover:border-[#ece7d5] hover:text-[#ece7d5]'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Student Work Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filtered.map((work, index) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="bg-[#30292a] text-[#ece7d5] border border-[#ece7d5]/20 hover:border-[#a33533] transition-all duration-300 shadow-xl flex flex-col overflow-hidden group relative"
          >
            {/* Artwork Frame with Live Color Palette Extractor */}
            <div className="relative aspect-[4/3] bg-[#1a1718] overflow-hidden">
              <img
                src={artUrls[work.id]}
                alt={work.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Live Color Palette Extractor on Hover */}
              <div className="absolute bottom-3 left-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <LiveColorPaletteOverlay
                  palette={work.palette}
                  artworkTitle={work.title}
                />
              </div>
            </div>

            {/* Content & Student Context */}
            <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-sans text-[#ece7d5]/75 mb-2">
                  <span className="text-[#a33533] font-medium">{work.tag}</span>
                  <span aria-hidden="true">·</span>
                  <span>{work.workshopBatch}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#a33533]" />
                    {work.city}
                  </span>
                </div>

                <h4 className="font-serif text-xl font-medium text-[#ece7d5] group-hover:text-[#a33533] transition-colors">
                  {work.title}
                </h4>

                <div className="text-xs font-sans font-medium text-[#ece7d5]/75 mt-1 mb-3">
                  by {work.studentName}{' '}
                  {work.studentHandle && (
                    <span className="text-[#ece7d5]/60 font-normal">· {work.studentHandle}</span>
                  )}
                </div>

                {work.beforeNote && (
                  <div className="p-3 bg-[#806055]/35 border border-[#ece7d5]/15 text-xs text-[#ece7d5]/90 mb-3">
                    <span className="font-semibold text-[#ece7d5]">Starting Point: </span>
                    {work.beforeNote}
                  </div>
                )}

                <div className="relative pt-1 text-xs sm:text-sm text-[#ece7d5]/90 italic font-serif leading-relaxed">
                  <Quote className="w-4 h-4 text-[#a33533] inline mr-1 -mt-1" />
                  "{work.quote}"
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Sparkles, Quote, MapPin } from 'lucide-react';
import { STUDENT_WORKS } from '../data/studentWork';
import { StudentWork } from '../types';

interface StudentWorkGridProps {
  onSelectStudentWork?: (work: StudentWork) => void;
}

export const StudentWorkGrid: React.FC<StudentWorkGridProps> = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', "Beginner's First Piece", 'Fashion Sketching', 'Portrait Shading', 'Couture Rendering'];

  const filtered = selectedTag === 'All'
    ? STUDENT_WORKS
    : STUDENT_WORKS.filter((item) => item.tag === selectedTag);

  return (
    <div>
      {/* Category Tag Filter Pill Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {tags.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 text-xs font-sans tracking-wide transition-all border cursor-pointer ${
                isActive
                  ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917]'
                  : 'bg-[#FAF7F2] text-[#78716C] border-[#F0ECE1] hover:border-[#C5A059] hover:text-[#1C1917]'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Showcase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filtered.map((work) => (
          <div
            key={work.id}
            className="bg-[#FFFFFF] border border-[#F0ECE1] hover:border-[#C5A059]/50 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col overflow-hidden group"
          >
            {/* Artwork Frame */}
            <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
              <img
                src={work.artworkUrl}
                alt={work.title}
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs text-[#1C1917] text-[10px] font-sans font-semibold tracking-wider uppercase px-2.5 py-1 border border-[#C5A059]/40 flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span>{work.tag}</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-[#1C1917]/85 text-[#FAF7F2] text-[10px] font-sans px-2 py-0.5 backdrop-blur-xs">
                {work.workshopBatch}
              </div>
            </div>

            {/* Content & Student Context */}
            <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-serif text-xl font-medium text-[#1C1917] group-hover:text-[#C5A059] transition-colors">
                    {work.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#78716C]">
                    <MapPin className="w-3 h-3 text-[#C5A059]" />
                    <span>{work.city}</span>
                  </div>
                </div>

                <div className="text-xs font-sans font-medium text-[#78716C] mb-3">
                  by {work.studentName} {work.studentHandle && <span className="text-[#C5A059] font-normal">{work.studentHandle}</span>}
                </div>

                {work.beforeNote && (
                  <div className="p-2.5 bg-[#FAF7F2] border-l-2 border-[#C5A059] text-xs text-[#78716C] mb-3">
                    <span className="font-semibold text-[#1C1917]">Starting Point: </span>
                    {work.beforeNote}
                  </div>
                )}

                <div className="relative pt-1 text-xs sm:text-sm text-[#1C1917] italic font-serif leading-relaxed">
                  <Quote className="w-4 h-4 text-[#C5A059]/40 inline mr-1 -mt-1" />
                  "{work.quote}"
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

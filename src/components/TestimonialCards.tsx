import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';

export const TestimonialCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {TESTIMONIALS.map((t) => (
        <div
          key={t.id}
          className="bg-[#FFFFFF] border border-[#F0ECE1] p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group hover:border-[#C5A059]/40"
        >
          {/* Subtle top gold line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#F0ECE1] group-hover:bg-[#C5A059] transition-colors" />

          <div>
            {/* Stars */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
              ))}
            </div>

            {/* Quote content */}
            <p className="text-sm font-sans text-[#1C1917] leading-relaxed mb-6 italic">
              "{t.content}"
            </p>
          </div>

          {/* Author info */}
          <div className="pt-4 border-t border-[#F0ECE1] flex items-center gap-3">
            <img
              src={t.avatarUrl}
              alt={t.name}
              className="w-10 h-10 rounded-full object-cover border border-[#C5A059]/30"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="font-serif text-sm font-semibold text-[#1C1917] leading-snug">
                {t.name}
              </span>
              <span className="text-[11px] font-sans text-[#78716C] leading-tight">
                {t.role} • {t.location}
              </span>
              <span className="text-[10px] font-sans text-[#C5A059] mt-0.5 font-medium">
                {t.courseOrProject}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

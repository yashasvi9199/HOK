import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import testimonialsData from '../data/testimonials.json';
import { generateOilPastelArtwork, PastelSubject } from '../utils/proceduralArtGenerator';

const AVATAR_SUBJECTS: PastelSubject[] = [
  'illustration_portrait',
  'digital_glaze_6',
  'illustration_drape',
  'digital_couture_2',
];

export const TestimonialCards: React.FC = () => {
  const avatarUrls = useMemo(() => {
    const map: Record<string, string> = {};
    testimonialsData.testimonials.forEach((t, idx) => {
      map[t.id] = generateOilPastelArtwork(
        AVATAR_SUBJECTS[idx % AVATAR_SUBJECTS.length],
        240,
        240
      );
    });
    return map;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {testimonialsData.testimonials.map((t, index) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
          className="bg-[#806055] border border-[#ece7d5]/25 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group hover:border-[#ece7d5]"
        >
          <div>
            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#ece7d5] text-[#ece7d5]" />
              ))}
            </div>

            {/* Quote content */}
            <p className="text-sm font-sans text-[#ece7d5] leading-relaxed mb-6 italic">
              "{t.content}"
            </p>
          </div>

          {/* Author info */}
          <div className="pt-4 border-t border-[#ece7d5]/20 flex items-center gap-3">
            <img
              src={avatarUrls[t.id]}
              alt={t.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-[#ece7d5]/40 shrink-0"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="font-serif text-sm font-semibold text-[#ece7d5] leading-snug">
                {t.name}
              </span>
              <span className="text-[11px] font-sans text-[#ece7d5]/80 leading-tight">
                {t.role} · {t.location}
              </span>
              <span className="text-[10px] font-sans text-[#ece7d5]/70 mt-0.5 font-medium">
                {t.courseOrProject}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';

interface SectionWrapperProps {
  id?: string;
  bg?: 'steel' | 'clay' | 'whisper' | 'obsidian' | 'linen' | 'alabaster' | 'cream' | 'charcoal';
  className?: string;
  children: React.ReactNode;
  containerSize?: 'default' | 'narrow' | 'wide' | 'full';
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  bg = 'steel',
  className = '',
  children,
  containerSize = 'default',
}) => {
  const bgClasses = {
    steel: 'bg-[#837d75] text-[#ece7d5] border-b border-[#30292a]/25',
    clay: 'bg-[#806055] text-[#ece7d5] border-y border-[#30292a]/30',
    whisper: 'bg-[#ece7d5] text-[#30292a]',
    obsidian: 'bg-[#30292a] text-[#ece7d5] border-y border-[#30292a]/40',
    // Map legacy tokens to the new Global Color Grading
    linen: 'bg-[#837d75] text-[#ece7d5]',
    alabaster: 'bg-[#837d75] text-[#ece7d5] border-b border-[#30292a]/25',
    cream: 'bg-[#806055] text-[#ece7d5] border-y border-[#30292a]/30',
    charcoal: 'bg-[#30292a] text-[#ece7d5]',
  }[bg];

  const containerClasses = {
    default: 'max-w-7xl mx-auto px-5 sm:px-8 md:px-12',
    narrow: 'max-w-4xl mx-auto px-5 sm:px-8',
    wide: 'max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12',
    full: 'w-full px-0',
  }[containerSize];

  return (
    <section id={id} className={`py-16 md:py-24 relative overflow-hidden ${bgClasses} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className={containerClasses}
      >
        {children}
      </motion.div>
    </section>
  );
};

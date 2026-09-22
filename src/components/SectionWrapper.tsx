import React from 'react';

interface SectionWrapperProps {
  id?: string;
  bg?: 'linen' | 'alabaster' | 'cream' | 'charcoal';
  className?: string;
  children: React.ReactNode;
  containerSize?: 'default' | 'narrow' | 'wide' | 'full';
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  bg = 'linen',
  className = '',
  children,
  containerSize = 'default',
}) => {
  const bgClasses = {
    linen: 'bg-[#FAF7F2] text-[#1C1917]',
    alabaster: 'bg-[#FFFFFF] text-[#1C1917] border-y border-[#F0ECE1]',
    cream: 'bg-[#F5EFEB] text-[#1C1917]',
    charcoal: 'bg-[#1C1917] text-[#FAF7F2]',
  }[bg];

  const containerClasses = {
    default: 'max-w-7xl mx-auto px-5 sm:px-8 md:px-12',
    narrow: 'max-w-4xl mx-auto px-5 sm:px-8',
    wide: 'max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12',
    full: 'w-full px-0',
  }[containerSize];

  return (
    <section id={id} className={`py-16 md:py-24 relative ${bgClasses} ${className}`}>
      <div className={containerClasses}>{children}</div>
    </section>
  );
};

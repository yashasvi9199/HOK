import React from 'react';

interface LogoProps {
  variant?: 'full' | 'monogram' | 'compact';
  className?: string;
  theme?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  theme = 'light'
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-stone-100' : 'text-[#1C1917]';
  const subColor = isDark ? 'text-stone-400' : 'text-[#78716C]';
  const goldColor = '#C5A059';

  if (variant === 'monogram') {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        <div className="w-10 h-10 rounded-full border border-[#C5A059]/40 bg-[#FAF7F2] flex items-center justify-center relative shadow-xs">
          <span className="font-serif text-lg font-semibold tracking-wider text-[#1C1917]">
            H<span className="text-[#C5A059] font-serif">K</span>
          </span>
          <div className="absolute -bottom-0.5 w-3 h-0.5 bg-[#C5A059]/60 rounded-full" />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <div className="w-9 h-9 rounded-full border border-[#C5A059]/40 bg-[#FFFFFF] flex items-center justify-center relative shadow-xs">
          <span className="font-serif text-base font-semibold tracking-wider text-[#1C1917]">
            H<span className="text-[#C5A059]">K</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className={`font-serif text-base tracking-wide font-medium ${textColor}`}>
            House of Kalakaar
          </span>
          <span className="text-[10px] tracking-widest uppercase font-sans text-[#78716C]">
            by Vrinda Haldia
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Monogram Crest Icon */}
      <div className="relative w-11 h-11 rounded-full border border-[#C5A059]/50 bg-gradient-to-b from-[#FAF7F2] to-[#F0ECE1] flex items-center justify-center shadow-xs group-hover:border-[#C5A059] transition-colors">
        <span className="font-serif text-xl font-medium tracking-tight text-[#1C1917]">
          H<span className="text-[#C5A059] italic font-serif ml-0.5">K</span>
        </span>
        <span className="absolute -top-1 right-0 text-[9px] text-[#C5A059]">✦</span>
      </div>

      {/* Brand Typographic Identity */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif text-lg md:text-xl font-semibold tracking-tight ${textColor} leading-tight`}>
            House of Kalakaar
          </span>
        </div>
        <span className={`text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase font-medium ${subColor}`}>
          by Vrinda Haldia
        </span>
      </div>
    </div>
  );
};

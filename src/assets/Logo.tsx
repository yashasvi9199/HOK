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
        <img
          src="/Logo.png"
          alt="House of Kalakaar"
          className="w-10 h-10 object-contain rounded-full shadow-xs"
        />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <img
          src="/Logo.png"
          alt="House of Kalakaar"
          className="w-9 h-9 object-contain"
        />
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
      {/* Brand Emblem from Logo.png */}
      <img
        src="/Logo.png"
        alt="House of Kalakaar"
        className="w-11 h-11 object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
      />

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

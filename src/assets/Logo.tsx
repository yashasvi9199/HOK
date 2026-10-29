import React from 'react';

export const BRAND_LOGO_URL = '/Logo png.png';

interface LogoProps {
  variant?: 'full' | 'monogram' | 'compact' | 'hero';
  className?: string;
  theme?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-[#ece7d5]' : 'text-[#30292a]';
  const subColor = isDark ? 'text-[#ece7d5]/75' : 'text-[#806055]';

  if (variant === 'hero') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 flex items-center justify-center">
          <img
            src={BRAND_LOGO_URL}
            alt="House of Kalakaar by Vrinda Haldia Logo"
            className="w-full h-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  if (variant === 'monogram') {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        <div className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center relative">
          <img
            src={BRAND_LOGO_URL}
            alt="HK Monogram"
            className="w-full h-full object-contain scale-110"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
        <div className="w-11 h-11 overflow-hidden flex items-center justify-center shrink-0">
          <img
            src={BRAND_LOGO_URL}
            alt="House of Kalakaar Logo"
            className="w-full h-full object-contain scale-115"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col">
          <span className={`font-serif text-base tracking-wide font-semibold whitespace-nowrap ${textColor}`}>
            House of Kalakaar
          </span>
          <span className={`text-[10px] tracking-widest uppercase font-sans whitespace-nowrap ${subColor}`}>
            by Vrinda Haldia
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      <div className="relative w-14 h-14 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
        <img
          src={BRAND_LOGO_URL}
          alt="House of Kalakaar by Vrinda Haldia"
          className="w-full h-full object-contain scale-115 drop-shadow-md"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex flex-col text-left">
        <span className={`font-serif text-lg md:text-xl font-semibold tracking-tight whitespace-nowrap ${textColor} leading-tight`}>
          House of Kalakaar
        </span>
        <span className={`text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase font-medium whitespace-nowrap ${subColor}`}>
          by Vrinda Haldia
        </span>
      </div>
    </div>
  );
};

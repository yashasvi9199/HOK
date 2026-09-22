import React from 'react';

interface AtelierButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const AtelierButton: React.FC<AtelierButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524] border border-[#1C1917] shadow-xs active:scale-[0.99]',
    secondary:
      'bg-[#C5A059] text-white hover:bg-[#B38F48] border border-[#C5A059] shadow-xs active:scale-[0.99]',
    outline:
      'bg-transparent text-[#1C1917] border border-[#1C1917]/25 hover:border-[#1C1917] hover:bg-[#FAF7F2] active:scale-[0.99]',
    whatsapp:
      'bg-[#128C7E] text-white hover:bg-[#075E54] border border-[#128C7E] shadow-xs active:scale-[0.99]',
    ghost:
      'bg-transparent text-[#1C1917] hover:text-[#C5A059] hover:bg-[#FAF7F2]/60',
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-none ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
};

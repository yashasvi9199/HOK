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
      'bg-[#a33533] text-[#ece7d5] hover:bg-[#30292a] border border-[#a33533] hover:border-[#ece7d5]/40 shadow-xs active:scale-[0.99]',
    secondary:
      'bg-[#806055] text-[#ece7d5] hover:bg-[#30292a] border border-[#ece7d5]/30 shadow-xs active:scale-[0.99]',
    outline:
      'bg-transparent text-[#ece7d5] border border-[#ece7d5]/35 hover:border-[#ece7d5] hover:bg-[#30292a]/60 active:scale-[0.99]',
    whatsapp:
      'bg-[#a33533] text-[#ece7d5] hover:bg-[#30292a] border border-[#ece7d5]/30 shadow-xs active:scale-[0.99]',
    ghost:
      'bg-transparent text-[#ece7d5] hover:text-[#a33533] hover:bg-[#30292a]/40',
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-none whitespace-nowrap shrink-0 ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
};

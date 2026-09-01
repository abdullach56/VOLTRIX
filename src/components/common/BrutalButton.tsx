import React from 'react';

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'teal' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-bold uppercase tracking-wider border-2 border-black transition-all cursor-pointer select-none font-syne disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
    md: 'px-5 py-2.5 text-xs tracking-widest shadow-brutal active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-brutal-lg',
    lg: 'px-7 py-3.5 text-sm tracking-widest shadow-brutal-lg active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal-xl'
  };

  const variantClasses = {
    primary: 'bg-[#FF5C00] text-white hover:bg-[#E05200]', // Radiant Persimmon
    secondary: 'bg-[#2E5BFF] text-white hover:bg-[#204AE0]', // Electric Cobalt
    accent: 'bg-[#CCFF00] text-black hover:bg-[#BAE800]', // Acid Lime
    teal: 'bg-[#005F69] text-white hover:bg-[#004A52]', // Deep Teal
    dark: 'bg-black text-white hover:bg-neutral-900',
    outline: 'bg-white text-black hover:bg-[#FDFCF0]'
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {children}
    </button>
  );
};

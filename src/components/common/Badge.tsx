import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'lime' | 'cobalt' | 'persimmon' | 'teal' | 'black' | 'white';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'lime',
  className = ''
}) => {
  const variantStyles = {
    lime: 'bg-[#CCFF00] text-black border-black',
    cobalt: 'bg-[#2E5BFF] text-white border-black',
    persimmon: 'bg-[#FF5C00] text-white border-black',
    teal: 'bg-[#005F69] text-white border-black',
    black: 'bg-black text-white border-black',
    white: 'bg-white text-black border-black'
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wider border-2 ${variantStyles[variant]} select-none ${className}`}>
      {children}
    </span>
  );
};

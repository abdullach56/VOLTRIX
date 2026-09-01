import React from 'react';

interface BrutalCardProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  accentBarColor?: string;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const BrutalCard: React.FC<BrutalCardProps> = ({
  children,
  className = '',
  bgColor = 'bg-white',
  accentBarColor,
  shadow = 'md',
  onClick,
  hoverEffect = false
}) => {
  const shadowClasses = {
    sm: 'shadow-brutal-sm',
    md: 'shadow-brutal',
    lg: 'shadow-brutal-lg',
    none: ''
  };

  const hoverClasses = hoverEffect
    ? 'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg transition-transform cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`border-2 border-black ${bgColor} ${shadowClasses[shadow]} ${hoverClasses} relative overflow-hidden ${className}`}
    >
      {accentBarColor && (
        <div className={`h-2 w-full border-b-2 border-black ${accentBarColor}`} />
      )}
      {children}
    </div>
  );
};

import React from 'react';

interface VoltrixLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'color';
  showText?: boolean;
  className?: string;
  subtext?: string;
}

export const VoltrixLogo: React.FC<VoltrixLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  subtext
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Geometric Voltrix Glyph */}
      <div
        className={`${iconSizes[size]} relative flex-shrink-0 bg-black p-0.5 border-2 border-black shadow-brutal-sm group-hover:-translate-y-0.5 transition-transform`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background grid texture */}
          <rect width="100" height="100" fill="#0D0D0D" />
          
          {/* Dynamic Electric Accent Facet */}
          <polygon points="12,14 42,14 26,52" fill="#CCFF00" />
          
          {/* Cobalt Power Facet */}
          <polygon points="58,14 88,14 74,52" fill="#2E5BFF" />
          
          {/* Persimmon Central Core Vertex */}
          <polygon points="26,52 74,52 50,90" fill="#FF5C00" />
          
          {/* Sharp Lightning Slash Accent */}
          <polyline
            points="48,16 34,48 54,48 44,84"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Perimeter Tech Corner Notches */}
          <line x1="8" y1="8" x2="16" y2="8" stroke="#CCFF00" strokeWidth="3" />
          <line x1="8" y1="8" x2="8" y2="16" stroke="#CCFF00" strokeWidth="3" />
          <line x1="92" y1="92" x2="84" y2="92" stroke="#2E5BFF" strokeWidth="3" />
          <line x1="92" y1="92" x2="92" y2="84" stroke="#2E5BFF" strokeWidth="3" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center tracking-tight font-black uppercase text-black">
            <span className={`${textSizes[size]} font-extrabold tracking-tighter`}>
              VOLTRIX
            </span>
            <span className="ml-1 w-2 h-2 rounded-full bg-[#FF5C00] inline-block animate-pulse"></span>
          </div>
          {subtext ? (
            <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-600 uppercase mt-0.5">
              {subtext}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
};

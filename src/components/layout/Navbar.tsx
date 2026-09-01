import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { BrutalButton } from '../common/BrutalButton';
import { VoltrixLogo } from '../common/VoltrixLogo';
import { Menu, X, Terminal, Shield, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenTool?: (toolId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Tools', route: 'tools' },
    { label: 'Features', route: 'features' },
    { label: 'Resources', route: 'resources' },
    { label: 'Developer', route: 'developer' },
    { label: 'About', route: 'about' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-black selection:bg-[#CCFF00]">
      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('home')}
            className="group cursor-pointer text-left focus:outline-none"
            aria-label="VOLTRIX Home"
          >
            <VoltrixLogo size="md" subtext="Workspace" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-extrabold uppercase tracking-widest">
            {navLinks.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => onNavigate(item.route)}
                  className={`py-1 relative transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#2E5BFF] font-black'
                      : 'text-black hover:text-[#FF5C00]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2E5BFF]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <BrutalButton
            variant="primary"
            size="sm"
            onClick={() => onNavigate('tools')}
            className="hidden sm:inline-flex"
          >
            Explore Tools
          </BrutalButton>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 border-2 border-black bg-white hover:bg-[#CCFF00] shadow-brutal-sm cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-black bg-[#FDFCF0] p-6 space-y-4 shadow-brutal-lg">
          <div className="flex flex-col space-y-3 font-bold uppercase tracking-wider text-sm">
            {navLinks.map((item) => (
              <button
                key={item.route}
                onClick={() => {
                  onNavigate(item.route);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 px-3 border-2 border-black ${
                  currentRoute === item.route
                    ? 'bg-[#2E5BFF] text-white shadow-brutal-sm'
                    : 'bg-white text-black hover:bg-[#CCFF00]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <BrutalButton
              variant="primary"
              size="md"
              fullWidth
              onClick={() => {
                onNavigate('tools');
                setMobileMenuOpen(false);
              }}
            >
              Explore All Tools
            </BrutalButton>
          </div>
        </div>
      )}
    </header>
  );
};

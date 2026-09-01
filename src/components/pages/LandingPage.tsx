import React from 'react';
import { SEO } from '../common/SEO';
import { PageRoute } from '../../types';
import { HeroSection } from '../landing/HeroSection';
import { ToolsPreviewSection } from '../landing/ToolsPreviewSection';
import { FeaturesSection } from '../landing/FeaturesSection';
import { HowItWorksSection } from '../landing/HowItWorksSection';

interface LandingPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenTool: (toolId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onOpenTool }) => {
  return (
    <div className="w-full">
      <SEO
        title="VELTRIX — Powerful Web Utilities. One Workspace."
        description="Free browser-based utility platform. Document scanner, JSON validator, Crypto lab, Regex tester, SVG optimizer & more. No installation. No account. 100% private."
        keywords="VELTRIX, web utilities, document scanner PDF, JSON validator, regex tester, crypto hash, SVG optimizer, color contrast, markdown editor, free online tools"
        urlPath="/"
      />
      <HeroSection onNavigate={onNavigate} onOpenTool={onOpenTool} />
      <ToolsPreviewSection onOpenTool={onOpenTool} onNavigate={onNavigate} />
      <FeaturesSection />
      <HowItWorksSection />
    </div>
  );
};

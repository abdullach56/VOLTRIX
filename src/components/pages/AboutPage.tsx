import React from 'react';
import { SEO } from '../common/SEO';
import { Badge } from '../common/Badge';
import { BrutalCard } from '../common/BrutalCard';
import { BrutalButton } from '../common/BrutalButton';
import { PageRoute } from '../../types';
import { Target, Compass, Sparkles, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FDFCF0] py-12 sm:py-16 selection:bg-[#CCFF00]">
      <SEO
        title="About VELTRIX — Mission, Privacy & Philosophy"
        description="VELTRIX is a privacy-first web utility platform. Zero ads, zero trackers, zero server uploads. Built on the belief that powerful tools should run entirely in your browser."
        keywords="about VELTRIX, privacy-first tools, no tracking web tools, browser-only utilities, open web tools, zero ads utility, digital brutalism design"
        urlPath="/#about"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <Badge variant="lime" className="mb-3">MISSION & MANIFESTO</Badge>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-syne text-black">
            The VELTRIX Philosophy
          </h1>
          <p className="text-base sm:text-lg text-neutral-800 mt-4 font-medium leading-relaxed">
            We believe the modern web is congested with slow, privacy-invasive utility sites. VELTRIX exists to restore utility to its purest, fastest, and most respectful form.
          </p>
        </div>

        {/* Manifesto Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Main Statement */}
          <div className="lg:col-span-8 bg-white border-2 border-black p-8 sm:p-12 shadow-brutal flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-xs font-mono font-bold uppercase text-[#2E5BFF] block">
                STATEMENT OF PURPOSE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-syne text-black">
                Fewer, Better, More Useful Tools.
              </h2>
              <p className="text-sm text-neutral-700 leading-relaxed font-medium">
                Traditional online converters and utility sites force users through cookie consent banners, aggressive advertising networks, artificial queues, and mandatory account registrations just to format a single block of JSON or scan a document.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed font-medium">
                VELTRIX is built on the premise that modern client machines possess abundant processing power. By leveraging official browser hardware APIs, we eliminate servers from the processing pipeline entirely.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-black flex flex-wrap items-center justify-between gap-4 font-mono text-xs font-bold uppercase">
              <span className="text-[#FF5C00]">• ZERO ADS</span>
              <span className="text-[#2E5BFF]">• ZERO TRACKERS</span>
              <span className="text-[#005F69]">• 100% WEB ENGINE</span>
            </div>
          </div>

          {/* Side Highlights */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#CCFF00] border-2 border-black p-6 shadow-brutal text-black">
              <span className="text-[10px] font-mono font-bold uppercase bg-black text-white px-2 py-0.5 inline-block mb-3">
                PILLAR 01
              </span>
              <h3 className="text-xl font-black uppercase font-syne mb-2">
                Uncompromising Privacy
              </h3>
              <p className="text-xs font-medium text-neutral-800 leading-relaxed">
                If an operation can be performed on your device, it will NEVER touch our servers. Your documents and keys remain yours.
              </p>
            </div>

            <div className="bg-[#FF5C00] border-2 border-black p-6 shadow-brutal text-white">
              <span className="text-[10px] font-mono font-bold uppercase bg-white text-black px-2 py-0.5 inline-block mb-3">
                PILLAR 02
              </span>
              <h3 className="text-xl font-black uppercase font-syne mb-2">
                Real Engines Only
              </h3>
              <p className="text-xs font-medium text-white/90 leading-relaxed">
                No mock stubs or repetitive single-line converters. Every tool in VELTRIX is a dedicated, production-ready workspace.
              </p>
            </div>

            <div className="bg-[#005F69] border-2 border-black p-6 shadow-brutal text-white">
              <span className="text-[10px] font-mono font-bold uppercase bg-[#CCFF00] text-black px-2 py-0.5 inline-block mb-3">
                PILLAR 03
              </span>
              <h3 className="text-xl font-black uppercase font-syne mb-2">
                Digital Brutalism
              </h3>
              <p className="text-xs font-medium text-neutral-200 leading-relaxed">
                Bold, intentional visual hierarchy. Crisp borders and purposeful high-contrast pigments over generic SaaS clichés.
              </p>
            </div>
          </div>

        </div>

        {/* Creator Attribution Card */}
        <div className="bg-white border-2 border-black p-8 shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2E5BFF] border-2 border-black flex items-center justify-center font-syne font-black text-white text-xl shadow-brutal-sm">
              A
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-500">
                FOUNDER & ARCHITECT
              </span>
              <h4 className="text-xl font-black uppercase text-black">
                Abdullah Charoliya
              </h4>
              <p className="text-xs text-neutral-600 font-medium">
                Designing deterministic tools for the open web.
              </p>
            </div>
          </div>

          <BrutalButton
            variant="outline"
            size="sm"
            onClick={() => onNavigate('developer')}
          >
            View Developer Dossier →
          </BrutalButton>
        </div>

      </div>
    </div>
  );
};

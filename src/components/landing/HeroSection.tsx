import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { BrutalButton } from '../common/BrutalButton';
import { Badge } from '../common/Badge';
import { ArrowRight, ScanLine, Play, CheckCircle2, ShieldCheck, Zap, Terminal } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (route: PageRoute) => void;
  onOpenTool: (toolId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenTool }) => {
  const [jsonInput, setJsonInput] = useState('{\n  "engine": "VELTRIX",\n  "status": "ready",\n  "modules": 7\n}');
  const [formattedOutput, setFormattedOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleMiniFormat = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormattedOutput(JSON.stringify(parsed, null, 2));
    } catch {
      setFormattedOutput('// Error: Invalid JSON structure');
    }
  };

  return (
    <div className="w-full border-b-2 border-black bg-[#FDFCF0]">
      {/* Master Grid Composition based on the Vibrant Palette Brutalist Blueprint */}
      <div className="max-w-7xl mx-auto border-x-0 sm:border-x-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Main Hero Statement (Col 1-7 on desktop) */}
          <section className="lg:col-span-7 border-b-2 lg:border-b-0 lg:border-r-2 border-black p-8 sm:p-12 lg:p-14 bg-white relative overflow-hidden flex flex-col justify-center min-h-[440px]">
            {/* Dynamic Brutalist Decorative Corner Badge */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#CCFF00] border-l-2 border-b-2 border-black flex items-center justify-center -rotate-12 translate-x-10 -translate-y-6 shadow-brutal-sm pointer-events-none select-none">
              <span className="font-syne font-black text-4xl text-black">!</span>
            </div>

            <div className="z-10">
              <div className="inline-flex items-center gap-2 mb-4">
                <Badge variant="lime">V2.0 BROWSER ENGINE</Badge>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-600">
                  LAT:40.71 • ZERO CLOUD UPLOADS
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-tight sm:leading-none font-black uppercase tracking-tight mb-6 text-black">
                Powerful <br />
                <span className="text-[#2E5BFF]">Tools.</span> <br />
                One <span className="font-normal italic tracking-tight text-[#FF5C00]">Space.</span>
              </h1>

              <p className="text-base sm:text-lg font-medium max-w-lg leading-snug text-neutral-800 mb-8">
                Professional web-based utility platform. Fewer, better, genuinely useful tools engineered for high-performance client-side execution.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <BrutalButton
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => onNavigate('tools')}
                >
                  Explore Workspaces
                </BrutalButton>

                <BrutalButton
                  variant="accent"
                  size="lg"
                  icon={<ScanLine className="w-4 h-4" />}
                  onClick={() => onOpenTool('document-scanner')}
                >
                  Launch Scanner
                </BrutalButton>
              </div>
            </div>
          </section>

          {/* Right Side Column (Col 8-12 on desktop) */}
          <div className="lg:col-span-5 grid grid-cols-1 divide-y-2 divide-black">
            
            {/* Top Right: Featured Scanner Block */}
            <section
              onClick={() => onOpenTool('document-scanner')}
              className="bg-[#CCFF00] p-8 flex flex-col justify-between hover:bg-[#BAE800] transition-colors cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest bg-black text-white px-2 py-0.5 border border-black">
                  Featured Module
                </span>
                <span className="text-xs font-mono font-bold uppercase bg-white text-black px-2 py-0.5 border-2 border-black group-hover:translate-x-1 transition-transform">
                  LAUNCH →
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none font-syne text-black">
                  Document <br /> Scanner
                </h2>
                <p className="text-xs font-bold uppercase tracking-wider text-black mt-2">
                  High-precision camera capture, filters & multi-page PDF compiler
                </p>
              </div>
            </section>

            {/* Bottom Right: Interactive JSON / Developer Sandbox Tile */}
            <section className="bg-[#2E5BFF] p-6 sm:p-8 flex flex-col justify-center overflow-hidden">
              <div className="w-full bg-white border-2 border-black p-4 shadow-brutal">
                <div className="flex items-center justify-between mb-3 border-b-2 border-black/10 pb-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5C00] border border-black"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] border border-black"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2E5BFF] border border-black"></div>
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-600">
                    JSON_STUDIO_LIVE.EXE
                  </span>
                </div>

                <div className="font-mono text-xs space-y-1 bg-[#FDFCF0] p-2.5 border border-black overflow-x-auto text-black">
                  <div className="text-[#2E5BFF] font-bold">{'{'}</div>
                  <div className="pl-3 text-neutral-800">
                    <span className="text-[#005F69]">"platform"</span>: <span className="text-[#FF5C00]">"VELTRIX"</span>,
                  </div>
                  <div className="pl-3 text-neutral-800">
                    <span className="text-[#005F69]">"architecture"</span>: <span className="text-[#005F69]">"Client-Side Only"</span>,
                  </div>
                  <div className="pl-3 text-neutral-800">
                    <span className="text-[#005F69]">"storage"</span>: <span className="text-[#2E5BFF]">"Zero Cloud Uploads"</span>,
                  </div>
                  <div className="pl-3 text-neutral-800">
                    <span className="text-[#005F69]">"status"</span>: <span className="bg-[#CCFF00] text-black px-1 font-bold">"VERIFIED"</span>
                  </div>
                  <div className="text-[#2E5BFF] font-bold">{'}'}</div>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                    Interactive Engine
                  </span>
                  <button
                    onClick={() => onOpenTool('json-studio')}
                    className="text-[10px] font-syne font-black uppercase tracking-wider bg-black text-white px-2.5 py-1 hover:bg-[#FF5C00] transition-colors cursor-pointer"
                  >
                    Open JSON Studio
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* 3-Column Bottom Identity Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
          
          {/* Block 1: Radiant Persimmon */}
          <section className="bg-[#FF5C00] p-8 text-white flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center justify-between">
              <span className="text-4xl sm:text-5xl font-black leading-none uppercase font-syne text-white">
                01
              </span>
              <Zap className="w-6 h-6 text-[#CCFF00]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase mt-4 leading-tight font-syne">
                No Installation <br /> Required.
              </h3>
              <p className="text-xs font-semibold text-white/90 mt-1">
                Open domain → use instantly in any modern browser.
              </p>
            </div>
          </section>

          {/* Block 2: White Developer Spotlight */}
          <section
            onClick={() => onNavigate('developer')}
            className="bg-white p-8 flex flex-col justify-between hover:bg-[#FDFCF0] transition-colors cursor-pointer group min-h-[160px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2E5BFF]">
                LEAD ARCHITECT
              </span>
              <span className="text-[10px] font-bold uppercase bg-black text-white px-1.5 py-0.5 group-hover:bg-[#FF5C00]">
                PROFILE →
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
                Abdullah Charoliya
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-600 mt-1">
                Crafted with rigorous performance standards
              </p>
            </div>

            <div className="flex gap-2 mt-3">
              <div className="w-6 h-6 border-2 border-black bg-[#CCFF00]"></div>
              <div className="w-6 h-6 border-2 border-black bg-[#2E5BFF]"></div>
              <div className="w-6 h-6 border-2 border-black bg-[#FF5C00]"></div>
            </div>
          </section>

          {/* Block 3: Deep Teal Privacy Block */}
          <section className="bg-[#005F69] p-8 text-white flex flex-col justify-between sm:col-span-2 lg:col-span-1 min-h-[160px]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#CCFF00]">
                FOUNDATION / 2026
              </p>
              <ShieldCheck className="w-6 h-6 text-[#CCFF00]" />
            </div>

            <div className="text-right mt-4">
              <p className="text-3xl sm:text-4xl font-black tracking-tighter uppercase leading-none font-syne">
                Privacy <br /> First.
              </p>
              <p className="text-xs font-semibold text-neutral-200 mt-2">
                Your files & data never leave your device.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

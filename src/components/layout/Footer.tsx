import React from 'react';
import { PageRoute } from '../../types';
import { VoltrixLogo } from '../common/VoltrixLogo';
import { ShieldCheck, Cpu, Terminal, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenTool: (toolId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTool }) => {
  return (
    <footer className="border-t-2 border-black bg-white selection:bg-[#CCFF00] mt-auto">
      {/* Top Banner Block */}
      <div className="bg-[#005F69] text-white border-b-2 border-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#CCFF00]">
              ZERO INSTALLATION • HIGH PERFORMANCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1">
              Ready to elevate your browser workspace?
            </h3>
          </div>
          <button
            onClick={() => onNavigate('tools')}
            className="px-6 py-3 bg-[#CCFF00] text-black font-black uppercase tracking-wider text-xs border-2 border-black shadow-brutal hover:bg-white hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-2"
          >
            Launch All Tools <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4 md:col-span-1">
            <VoltrixLogo size="sm" />
            <p className="text-xs text-neutral-700 leading-relaxed font-medium">
              A high-precision web utility platform. Fewer, better, more useful tools engineered for private in-browser execution.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#FDFCF0] border-2 border-black text-[11px] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#005F69]" />
              <span>Private & Local Runtime</span>
            </div>
          </div>

          {/* Col 2: Featured Tools */}
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest text-black mb-3 border-b-2 border-black pb-1 inline-block">
              Core Tools
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-700">
              <li>
                <button
                  onClick={() => onOpenTool('document-scanner')}
                  className="hover:text-[#FF5C00] hover:underline cursor-pointer"
                >
                  Document Scanner & PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenTool('json-studio')}
                  className="hover:text-[#2E5BFF] hover:underline cursor-pointer"
                >
                  JSON Studio & Types
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenTool('crypto-security-lab')}
                  className="hover:text-[#FF5C00] hover:underline cursor-pointer"
                >
                  Crypto & Security Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenTool('regex-precision-lab')}
                  className="hover:text-[#005F69] hover:underline cursor-pointer"
                >
                  Regex Precision Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenTool('color-synthesizer')}
                  className="hover:text-[#2E5BFF] hover:underline cursor-pointer"
                >
                  Color & Contrast Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Architecture & Platform */}
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest text-black mb-3 border-b-2 border-black pb-1 inline-block">
              Platform
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-700">
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-[#2E5BFF] hover:underline cursor-pointer">
                  Platform Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-[#2E5BFF] hover:underline cursor-pointer">
                  Documentation & Specs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#2E5BFF] hover:underline cursor-pointer">
                  Product Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('developer')} className="hover:text-[#FF5C00] hover:underline cursor-pointer">
                  Developer Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Developer Credit */}
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest text-black mb-3 border-b-2 border-black pb-1 inline-block">
              Creator
            </h4>
            <div className="p-3 bg-[#FDFCF0] border-2 border-black shadow-brutal-sm space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#2E5BFF] block">
                DEVELOPED BY
              </span>
              <p className="font-black text-base uppercase text-black">
                Abdullah Charoliya
              </p>
              <button
                onClick={() => onNavigate('developer')}
                className="text-[11px] font-bold uppercase tracking-wider text-[#FF5C00] hover:underline flex items-center gap-1 cursor-pointer"
              >
                View Profile & Links →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-black bg-[#FDFCF0] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono font-bold uppercase">
          <div>© {new Date().getFullYear()} VELTRIX WEB PLATFORM • ALL RIGHTS RESERVED</div>
          <div className="flex items-center gap-4 text-neutral-700">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
              SYSTEM: OPTIMAL
            </span>
            <span>•</span>
            <span>NO COOKIES • NO TRACKERS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

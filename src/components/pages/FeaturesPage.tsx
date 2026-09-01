import React from 'react';
import { SEO } from '../common/SEO';
import { Badge } from '../common/Badge';
import { BrutalCard } from '../common/BrutalCard';
import { BrutalButton } from '../common/BrutalButton';
import { PageRoute } from '../../types';
import { Shield, Zap, Lock, Cpu, Globe, Terminal, ArrowRight, Check } from 'lucide-react';

interface FeaturesPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenTool: (toolId: string) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate, onOpenTool }) => {
  return (
    <div className="min-h-screen bg-[#FDFCF0] py-12 sm:py-16 selection:bg-[#CCFF00]">
      <SEO
        title="Platform Features — VELTRIX High-Performance Web Utilities"
        description="VELTRIX runs entirely in your browser using W3C WebCrypto, HTML5 Canvas, and MediaStream APIs. Zero server uploads. Zero tracking. No account needed."
        keywords="browser-based tools, WebCrypto API, client-side processing, private web tools, zero server, HTML5 Canvas, no upload tools, secure web utilities"
        urlPath="/#features"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="max-w-3xl mb-12">
          <Badge variant="cobalt" className="mb-3">PLATFORM ARCHITECTURE</Badge>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-syne text-black">
            High Performance. Zero Cloud Risk.
          </h1>
          <p className="text-base sm:text-lg text-neutral-800 mt-4 font-medium leading-relaxed">
            VELTRIX is re-architecting how developers and professionals interact with everyday utilities. All execution happens in-memory, deterministic, and isolated.
          </p>
        </div>

        {/* Deep Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1 */}
          <div className="bg-white border-2 border-black p-8 shadow-brutal flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#CCFF00] border-2 border-black text-black shadow-brutal-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <Badge variant="black">SECURITY MODEL</Badge>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight font-syne text-black mb-3">
                Local Memory Sandbox
              </h2>
              <p className="text-xs text-neutral-700 font-medium leading-relaxed mb-6">
                Unlike traditional SaaS converter sites that transmit uploaded files and JSON payloads to third-party servers, VELTRIX executes all algorithms inside your browser’s V8/SpiderMonkey sandbox. Your sensitive data never crosses network wires.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-neutral-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#005F69]" /> Zero server logs or data retention
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#005F69]" /> No external analytics tracking user files
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#005F69]" /> Safe for proprietary code and credentials
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border-2 border-black p-8 shadow-brutal flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#2E5BFF] border-2 border-black text-white shadow-brutal-sm">
                  <Cpu className="w-6 h-6" />
                </div>
                <Badge variant="cobalt">W3C STANDARDS</Badge>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight font-syne text-black mb-3">
                Native Web Hardware APIs
              </h2>
              <p className="text-xs text-neutral-700 font-medium leading-relaxed mb-6">
                Direct integration with modern browser standards including the Web Cryptography API for sub-millisecond SHA and HMAC hashing, HTML5 MediaStream for live camera document feeds, and high-performance 2D Canvas matrix operations.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-neutral-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2E5BFF]" /> W3C WebCrypto cryptographic acceleration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2E5BFF]" /> Real-time camera stream document capture
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2E5BFF]" /> Off-screen canvas pixel manipulation
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border-2 border-black p-8 shadow-brutal flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#FF5C00] border-2 border-black text-white shadow-brutal-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <Badge variant="persimmon">EFFICIENCY</Badge>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight font-syne text-black mb-3">
                Zero Friction Workflow
              </h2>
              <p className="text-xs text-neutral-700 font-medium leading-relaxed mb-6">
                No sign-up forms, no email verifications, and no paywalls. Bookmark any tool URL directly (e.g. <code>/tools/document-scanner</code>) and begin work instantly.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-neutral-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5C00]" /> Instant route access with clean URLs
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5C00]" /> Zero subscription tiers or banner ads
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5C00]" /> Reliable offline and low-bandwidth capability
                </li>
              </ul>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#005F69] text-white border-2 border-black p-8 shadow-brutal flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white border-2 border-black text-black shadow-brutal-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase bg-[#CCFF00] text-black px-2 py-0.5 border border-black">
                  WEB-FIRST
                </span>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight font-syne mb-3">
                Clean Responsive Engineering
              </h2>
              <p className="text-xs text-white/90 font-medium leading-relaxed mb-6">
                Designed as a responsive web platform that adapts cleanly across desktop monitors, laptops, and tablets without wrapping in slow hybrid shells.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-neutral-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#CCFF00]" /> Clean viewport adaptation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#CCFF00]" /> Accessible keyboard navigation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#CCFF00]" /> High-contrast visual readability
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="bg-[#CCFF00] border-2 border-black p-8 text-black flex flex-col sm:flex-row items-center justify-between gap-6 shadow-brutal">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight font-syne">
              Experience the Workspaces
            </h3>
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-800 mt-1">
              Select any tool and start processing instantly.
            </p>
          </div>
          <BrutalButton
            variant="dark"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={() => onNavigate('tools')}
          >
            Launch Tools Catalog
          </BrutalButton>
        </div>

      </div>
    </div>
  );
};

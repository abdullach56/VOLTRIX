import React from 'react';
import { SEO } from '../common/SEO';
import { Badge } from '../common/Badge';
import { BrutalCard } from '../common/BrutalCard';
import { BrutalButton } from '../common/BrutalButton';
import { PageRoute } from '../../types';
import { BookOpen, Terminal, Code2, ShieldAlert, Cpu, ExternalLink } from 'lucide-react';

interface ResourcesPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenTool: (toolId: string) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate, onOpenTool }) => {
  const specs = [
    {
      title: 'Web Cryptography Standard',
      desc: 'W3C Recommendation for client-side cryptographic hashing (SHA-256, SHA-512) and key generation using SubtleCrypto.',
      tag: 'W3C CRYPTO',
      linkText: 'Test in Crypto Lab',
      toolId: 'crypto-security-lab'
    },
    {
      title: 'MediaStream Image Capture',
      desc: 'High-definition video frame capture for document scanning, canvas projection, and perspective correction.',
      tag: 'MEDIA_STREAM',
      linkText: 'Open Document Scanner',
      toolId: 'document-scanner'
    },
    {
      title: 'ECMAScript 2026 RegExp Spec',
      desc: 'Unicode-aware regex pattern matching with named group capture, state evaluation, and execution performance.',
      tag: 'ES_REGEXP',
      linkText: 'Open Regex Lab',
      toolId: 'regex-precision-lab'
    },
    {
      title: 'WCAG 2.1 Accessibility Matrix',
      desc: 'Relative luminance formulas for calculating contrast ratios across graphic UI components and body typography.',
      tag: 'WCAG_2.1',
      linkText: 'Open Color Synthesizer',
      toolId: 'color-synthesizer'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF0] py-12 sm:py-16 selection:bg-[#CCFF00]">
      <SEO
        title="Technical Resources & Standards — VELTRIX"
        description="Explore the web standards powering VELTRIX: W3C WebCrypto, ECMAScript RegExp, MediaStream Capture, and WCAG 2.1 accessibility specifications. All operations are browser-native."
        keywords="W3C WebCrypto standard, ECMAScript regex, WCAG 2.1 contrast ratio, MediaStream API, browser web standards, client-side cryptography documentation"
        urlPath="/#resources"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <Badge variant="persimmon" className="mb-3">TECHNICAL RESOURCES</Badge>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-syne text-black">
            Documentation & Standards
          </h1>
          <p className="text-base sm:text-lg text-neutral-800 mt-4 font-medium leading-relaxed">
            VELTRIX implements modern browser standards and deterministic algorithms. Explore technical guidelines and browser APIs utilized across the platform.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-black p-8 shadow-brutal flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase bg-black text-white px-2 py-0.5 border border-black">
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-500">
                    SPEC #0{idx + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight font-syne text-black mb-3">
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-700 font-medium leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t-2 border-black flex items-center justify-between">
                <button
                  onClick={() => onOpenTool(item.toolId)}
                  className="text-xs font-syne font-black uppercase text-[#2E5BFF] hover:text-[#FF5C00] flex items-center gap-1.5 cursor-pointer"
                >
                  {item.linkText} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Security Notice */}
        <div className="p-8 bg-[#005F69] text-white border-2 border-black shadow-brutal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <ShieldAlert className="w-8 h-8 text-[#CCFF00] shrink-0 mt-1" />
            <div>
              <h4 className="text-xl font-black uppercase font-syne">
                Browser Execution Verification
              </h4>
              <p className="text-xs text-neutral-200 mt-1 max-w-xl font-medium">
                You can audit network traffic in your browser DevTools (Network tab) at any time to confirm that zero payloads or documents are transferred to external endpoints during tool execution.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('developer')}
            className="px-5 py-2.5 bg-[#CCFF00] text-black font-syne font-black uppercase text-xs border-2 border-black shadow-brutal-sm hover:bg-white transition-colors shrink-0 cursor-pointer"
          >
            Developer Dossier
          </button>
        </div>

      </div>
    </div>
  );
};

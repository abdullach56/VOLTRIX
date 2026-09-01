import React from 'react';
import { Shield, Zap, Globe, HardDrive, Wrench, Layers } from 'lucide-react';
import { Badge } from '../common/Badge';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      tag: 'SPEED',
      title: 'Ultra-Fast Execution',
      desc: 'Instant compute directly in your browser JavaScript/Wasm engine. No server latency, queuing, or cold-starts.',
      bgColor: 'bg-[#FF5C00]', // Radiant Persimmon
      textColor: 'text-white'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      tag: 'SECURITY',
      title: 'Zero Cloud Storage',
      desc: 'Your documents, keys, passwords, and data payloads are processed purely in local RAM and never leave your machine.',
      bgColor: 'bg-[#005F69]', // Deep Teal
      textColor: 'text-white'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      tag: 'STANDARDS',
      title: 'Browser-Native Engine',
      desc: 'Powered by official W3C standards: Web Cryptography API, MediaStream camera access, and Canvas raster pipelines.',
      bgColor: 'bg-[#CCFF00]', // Acid Lime
      textColor: 'text-black'
    },
    {
      icon: <HardDrive className="w-6 h-6" />,
      tag: 'SIMPLICITY',
      title: 'No App Installation',
      desc: 'Zero APKs, wrappers, or executable installers. Bookmark the domain or open it on any device to work instantly.',
      bgColor: 'bg-[#2E5BFF]', // Electric Cobalt
      textColor: 'text-white'
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      tag: 'PURPOSE',
      title: 'Practical Workspaces',
      desc: 'No toy demos or redundant converters. Comprehensive, well-engineered workspaces built for daily utility.',
      bgColor: 'bg-white',
      textColor: 'text-black'
    },
    {
      icon: <Layers className="w-6 h-6" />,
      tag: 'ISOLATION',
      title: 'Isolated Engines',
      desc: 'Each tool executes in a modular, sandboxed state. Failures are contained and do not destabilize the platform.',
      bgColor: 'bg-[#FDFCF0]',
      textColor: 'text-black'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="teal" className="mb-3">CORE PRINCIPLES</Badge>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-syne text-black">
            Engineered for Precision & Privacy
          </h2>
          <p className="text-sm sm:text-base text-neutral-700 mt-4 font-medium">
            VELTRIX is built on the philosophy of fewer, better, more dependable tools designed to run natively inside your browser.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={`p-8 border-2 border-black shadow-brutal flex flex-col justify-between ${feat.bgColor} ${feat.textColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 border-2 border-black bg-white text-black shadow-brutal-sm">
                    {feat.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-black text-white border border-black">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight font-syne mb-3">
                  {feat.title}
                </h3>

                <p className={`text-xs font-medium leading-relaxed ${feat.bgColor === 'bg-white' || feat.bgColor === 'bg-[#FDFCF0]' || feat.bgColor === 'bg-[#CCFF00]' ? 'text-neutral-800' : 'text-white/90'}`}>
                  {feat.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-black/20 flex items-center justify-between font-mono text-[10px] font-bold uppercase">
                <span>STAGE: VERIFIED</span>
                <span>PROTOCOL: CLIENT_V2</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

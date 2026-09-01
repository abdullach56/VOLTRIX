import React, { useState } from 'react';
import { ToolMetadata } from '../../types';
import { Badge } from './Badge';
import { BrutalButton } from './BrutalButton';
import { ArrowLeft, BookOpen, ShieldCheck, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface ToolHeaderProps {
  tool: ToolMetadata;
  onBack: () => void;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({ tool, onBack }) => {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div className="border-b-2 border-black bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <button
              onClick={onBack}
              className="p-2 bg-[#FDFCF0] border-2 border-black shadow-brutal-sm hover:bg-[#CCFF00] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer mt-1"
              title="Return to Tools"
              aria-label="Return to Tools"
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="black">{tool.category.toUpperCase()}</Badge>
                {tool.isClientSideOnly && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-[#CCFF00] text-black px-2 py-0.5 border-2 border-black">
                    <ShieldCheck className="w-3.5 h-3.5" /> Local Runtime
                  </span>
                )}
                {tool.badge && (
                  <Badge variant="persimmon">{tool.badge}</Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black font-syne">
                {tool.name}
              </h1>
              <p className="text-sm text-neutral-700 font-medium max-w-3xl mt-1">
                {tool.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <BrutalButton
              variant={guideOpen ? 'accent' : 'outline'}
              size="sm"
              icon={<BookOpen className="w-4 h-4" />}
              onClick={() => setGuideOpen(!guideOpen)}
            >
              {guideOpen ? 'Hide Guide' : 'How To Use'}
            </BrutalButton>
          </div>
        </div>

        {/* Collapsible Guide Drawer */}
        {guideOpen && (
          <div className="mt-6 p-6 border-2 border-black bg-[#FDFCF0] shadow-brutal animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#FF5C00]" />
                <h3 className="font-syne font-black text-sm uppercase tracking-wider">
                  Operational Guide & Specs
                </h3>
              </div>
              <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 border border-black">
                ZERO_CLOUD_STORAGE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-medium">
              <div>
                <h4 className="font-bold uppercase text-black mb-3 text-xs tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#2E5BFF] inline-block"></span> Execution Steps
                </h4>
                <ol className="space-y-2 list-decimal list-inside text-neutral-800">
                  {tool.guideSteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">
                      <span className="font-bold text-black">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="font-bold uppercase text-black mb-3 text-xs tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#FF5C00] inline-block"></span> Privacy & Hardware Architecture
                </h4>
                <div className="p-3 bg-white border-2 border-black space-y-2 text-neutral-700">
                  <p className="font-semibold text-black">
                    All computations run strictly within your web browser runtime sandbox.
                  </p>
                  {tool.limitations?.map((lim, idx) => (
                    <p key={idx} className="text-[11px] leading-normal">
                      • {lim}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

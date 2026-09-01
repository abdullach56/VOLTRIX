import React from 'react';
import { Badge } from '../common/Badge';
import { MousePointerClick, Cpu, Download } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <MousePointerClick className="w-6 h-6 text-black" />,
      title: 'Select & Launch Workspace',
      desc: 'Pick the exact utility you require from the workspace directory. No account creation, login barriers, or subscriptions.',
      color: 'bg-[#CCFF00]'
    },
    {
      num: '02',
      icon: <Cpu className="w-6 h-6 text-white" />,
      title: 'Process Locally in RAM',
      desc: 'Manipulate JSON, scan documents, compute SHA hashes, or test regular expressions. All computation executes privately on your device.',
      color: 'bg-[#2E5BFF]'
    },
    {
      num: '03',
      icon: <Download className="w-6 h-6 text-white" />,
      title: 'Export & Download',
      desc: 'Copy validated artifacts to clipboard or download compiled PDFs, optimized images, and code definitions with zero watermarks.',
      color: 'bg-[#FF5C00]'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FDFCF0] border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <Badge variant="persimmon" className="mb-2">WORKFLOW</Badge>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-syne text-black">
            How VELTRIX Works
          </h2>
          <p className="text-sm text-neutral-700 mt-2 font-medium">
            A frictionless, browser-first workflow designed to respect your time and preserve your privacy.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-black p-8 shadow-brutal flex flex-col justify-between relative"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-syne font-black text-4xl text-black">
                  {step.num}
                </span>
                <div className={`p-3 border-2 border-black ${step.color} shadow-brutal-sm`}>
                  {step.icon}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black uppercase tracking-tight font-syne text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-700 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-black flex items-center justify-between text-[10px] font-mono font-bold uppercase text-neutral-600">
                <span>STEP {idx + 1} OF 3</span>
                <span className="text-[#2E5BFF]">READY</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

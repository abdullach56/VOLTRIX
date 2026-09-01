import React, { useState } from 'react';
import { TOOLS_REGISTRY } from '../../registry/tools';
import { ToolCategory, PageRoute } from '../../types';
import { BrutalCard } from '../common/BrutalCard';
import { BrutalButton } from '../common/BrutalButton';
import { Badge } from '../common/Badge';
import {
  ScanLine,
  Braces,
  ShieldCheck,
  Regex,
  Image,
  Palette,
  FileText,
  ArrowUpRight,
  Sparkles,
  Lock
} from 'lucide-react';

interface ToolsPreviewSectionProps {
  onOpenTool: (toolId: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const ToolsPreviewSection: React.FC<ToolsPreviewSectionProps> = ({
  onOpenTool,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; label: string; color: string }[] = [
    { id: 'all', label: 'All Engines', color: 'bg-black text-white' },
    { id: 'documents', label: 'Documents & PDF', color: 'bg-[#CCFF00] text-black' },
    { id: 'developer', label: 'Developer', color: 'bg-[#2E5BFF] text-white' },
    { id: 'security', label: 'Crypto & Security', color: 'bg-[#FF5C00] text-white' },
    { id: 'media', label: 'Media & Images', color: 'bg-[#005F69] text-white' },
    { id: 'design', label: 'Design & Color', color: 'bg-[#CCFF00] text-black' }
  ];

  const filteredTools = selectedCategory === 'all'
    ? TOOLS_REGISTRY
    : TOOLS_REGISTRY.filter((t) => t.category === selectedCategory);

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'ScanLine': return <ScanLine className="w-6 h-6" />;
      case 'Braces': return <Braces className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Regex': return <Regex className="w-6 h-6" />;
      case 'Image': return <Image className="w-6 h-6" />;
      case 'Palette': return <Palette className="w-6 h-6" />;
      case 'FileText': return <FileText className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FDFCF0] border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b-2 border-black gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="cobalt">WORKSPACES</Badge>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600">
                FEWER, BETTER, PRACTICAL
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-syne text-black">
              Engineered Tools
            </h2>
            <p className="text-sm text-neutral-700 max-w-xl mt-2 font-medium">
              Every tool is complete, functional, and operates with zero background cloud transmission.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-syne font-bold uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? `${cat.color} shadow-brutal-sm -translate-y-0.5`
                    : 'bg-white text-black hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onOpenTool(tool.id)}
              className="bg-white border-2 border-black shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group overflow-hidden"
            >
              {/* Card Header Ribbon */}
              <div
                className="h-3 border-b-2 border-black w-full"
                style={{ backgroundColor: tool.accentColor }}
              />

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3 border-2 border-black shadow-brutal-sm text-black"
                      style={{ backgroundColor: tool.accentColor }}
                    >
                      {getToolIcon(tool.iconName)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {tool.badge && (
                        <Badge variant="persimmon">{tool.badge}</Badge>
                      )}
                      <span className="text-[10px] font-mono font-bold uppercase bg-[#FDFCF0] px-1.5 py-0.5 border border-black text-black">
                        LOCAL
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-black uppercase tracking-tight font-syne text-black group-hover:text-[#2E5BFF] transition-colors mb-2">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-neutral-600 font-medium leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-black flex items-center justify-between mt-auto bg-[#FDFCF0] -mx-6 -mb-6 px-6 py-3">
                  <span className="text-[11px] font-mono font-bold uppercase text-neutral-700 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#005F69]" /> Private Sandbox
                  </span>
                  <span className="text-xs font-black uppercase text-black group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Launch <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <BrutalButton
            variant="outline"
            size="md"
            onClick={() => onNavigate('tools')}
          >
            View Complete Workspace Catalog →
          </BrutalButton>
        </div>

      </div>
    </section>
  );
};

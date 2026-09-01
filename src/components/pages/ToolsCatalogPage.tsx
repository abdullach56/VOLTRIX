import React, { useState } from 'react';
import { SEO } from '../common/SEO';
import { TOOLS_REGISTRY } from '../../registry/tools';
import { ToolMetadata, ToolCategory } from '../../types';
import { Badge } from '../common/Badge';
import { BrutalButton } from '../common/BrutalButton';
import {
  Search,
  ScanLine,
  Braces,
  ShieldCheck,
  Regex,
  Image,
  Palette,
  FileText,
  ArrowUpRight,
  Filter,
  Sparkles,
  Lock
} from 'lucide-react';

interface ToolsCatalogPageProps {
  onOpenTool: (toolId: string) => void;
}

export const ToolsCatalogPage: React.FC<ToolsCatalogPageProps> = ({ onOpenTool }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Engines', count: TOOLS_REGISTRY.length },
    { id: 'documents', label: 'Documents & PDF', count: TOOLS_REGISTRY.filter(t => t.category === 'documents').length },
    { id: 'developer', label: 'Developer', count: TOOLS_REGISTRY.filter(t => t.category === 'developer').length },
    { id: 'security', label: 'Crypto & Security', count: TOOLS_REGISTRY.filter(t => t.category === 'security').length },
    { id: 'media', label: 'Media & Image', count: TOOLS_REGISTRY.filter(t => t.category === 'media').length },
    { id: 'design', label: 'Design & Color', count: TOOLS_REGISTRY.filter(t => t.category === 'design').length }
  ];

  const filteredTools = TOOLS_REGISTRY.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    <div className="min-h-screen bg-[#FDFCF0] py-12 sm:py-16 selection:bg-[#CCFF00]">
      <SEO
        title="Tools Catalog — VELTRIX Workspaces"
        description="Explore 7 high-precision browser-based tool workspaces: Document Scanner, JSON Studio, Crypto Lab, Regex Lab, SVG Optimizer, Color Synthesizer & Markdown Editor. All client-side."
        keywords="document scanner online, JSON formatter, regex tester, SHA256 hash generator, SVG optimizer, WCAG contrast checker, markdown editor, free developer tools"
        urlPath="/#tools"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="lime">DIRECTORY</Badge>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600">
              {TOOLS_REGISTRY.length} VERIFIED WORKSPACES
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-syne text-black">
            Explore Workspaces
          </h1>
          <p className="text-base text-neutral-700 font-medium max-w-2xl mt-2">
            Every tool is client-side, deterministic, and ready to use without an account.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-brutal mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-black absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools by name, keyword, or category..."
                className="w-full pl-10 pr-4 py-3 bg-[#FDFCF0] border-2 border-black text-xs font-bold uppercase tracking-wider text-black placeholder:text-neutral-500 focus:outline-none focus:bg-white focus:shadow-brutal-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold uppercase bg-black text-white px-1.5 py-0.5"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Category Selectors */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 text-xs font-syne font-bold uppercase tracking-wider border-2 border-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-black text-white shadow-brutal-sm -translate-y-0.5'
                      : 'bg-[#FDFCF0] text-black hover:bg-neutral-100'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1 py-0.2 border ${selectedCategory === cat.id ? 'bg-[#CCFF00] text-black border-black' : 'bg-white text-black border-black'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Results Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => onOpenTool(tool.id)}
                className="bg-white border-2 border-black shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group overflow-hidden"
              >
                {/* Accent top ribbon */}
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
                        <Badge variant="black">{tool.category.toUpperCase()}</Badge>
                        {tool.badge && (
                          <Badge variant="persimmon">{tool.badge}</Badge>
                        )}
                      </div>
                    </div>

                    <h2 className="text-xl font-black uppercase tracking-tight font-syne text-black group-hover:text-[#2E5BFF] transition-colors mb-2">
                      {tool.name}
                    </h2>

                    <p className="text-xs text-neutral-600 font-medium leading-relaxed mb-6">
                      {tool.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t-2 border-black flex items-center justify-between mt-auto bg-[#FDFCF0] -mx-6 -mb-6 px-6 py-3">
                    <span className="text-[11px] font-mono font-bold uppercase text-neutral-700 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#005F69]" /> Private Runtime
                    </span>
                    <span className="text-xs font-black uppercase text-black group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Open Workspace <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-black p-12 text-center shadow-brutal">
            <h3 className="font-syne font-black text-2xl uppercase mb-2">
              No Workspaces Match Your Query
            </h3>
            <p className="text-xs text-neutral-600 font-medium max-w-md mx-auto mb-6">
              Try searching with different keywords or reset your category filter.
            </p>
            <BrutalButton
              variant="primary"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Reset Filters
            </BrutalButton>
          </div>
        )}

      </div>
    </div>
  );
};

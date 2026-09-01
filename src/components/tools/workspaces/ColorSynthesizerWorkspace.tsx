import React, { useState } from 'react';
import { ToolMetadata } from '../../../types';
import { ToolHeader } from '../../common/ToolHeader';
import { BrutalButton } from '../../common/BrutalButton';
import { Badge } from '../../common/Badge';
import {
  Palette,
  CheckCircle2,
  XCircle,
  Copy,
  Sparkles,
  RefreshCw,
  Eye,
  Sliders,
  Code2,
  Layers
} from 'lucide-react';

interface ColorSynthesizerWorkspaceProps {
  tool: ToolMetadata;
  onBack: () => void;
}

export const ColorSynthesizerWorkspace: React.FC<ColorSynthesizerWorkspaceProps> = ({ tool, onBack }) => {
  const [bgColor, setBgColor] = useState<string>('#FDFCF0');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [accent1, setAccent1] = useState<string>('#2E5BFF');
  const [accent2, setAccent2] = useState<string>('#FF5C00');
  const [accent3, setAccent3] = useState<string>('#CCFF00');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Convert Hex to RGB
  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      return {
        r: parseInt(cleanHex[0] + cleanHex[0], 16) || 0,
        g: parseInt(cleanHex[1] + cleanHex[1], 16) || 0,
        b: parseInt(cleanHex[2] + cleanHex[2], 16) || 0
      };
    }
    return {
      r: parseInt(cleanHex.substring(0, 2), 16) || 0,
      g: parseInt(cleanHex.substring(2, 4), 16) || 0,
      b: parseInt(cleanHex.substring(4, 6), 16) || 0
    };
  };

  // Calculate Relative Luminance per W3C WCAG 2.1 formula
  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  // Calculate Contrast Ratio
  const getContrastRatio = (hex1: string, hex2: string) => {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const contrastRatio = getContrastRatio(bgColor, textColor);
  const ratioRounded = contrastRatio.toFixed(2);

  // WCAG Compliance Checks
  const passAANormal = contrastRatio >= 4.5;
  const passAALarge = contrastRatio >= 3.0;
  const passAAANormal = contrastRatio >= 7.0;
  const passAAALarge = contrastRatio >= 4.5;
  const passUI = contrastRatio >= 3.0;

  // Preset Brutalist Palettes
  const brutalistPalettes = [
    {
      name: 'Vibrant Palette (Veltrix Master)',
      bg: '#FDFCF0',
      text: '#000000',
      a1: '#2E5BFF',
      a2: '#FF5C00',
      a3: '#CCFF00'
    },
    {
      name: 'Cyber Lithic Teal',
      bg: '#04292E',
      text: '#E0F4F7',
      a1: '#8B00FF',
      a2: '#FFAA4C',
      a3: '#FFE600'
    },
    {
      name: 'Ultramarine Post-Modern',
      bg: '#121285',
      text: '#FFFFFF',
      a1: '#FF5C5C',
      a2: '#7DFF52',
      a3: '#EBE7FF'
    },
    {
      name: 'Deep Forest Jade',
      bg: '#062A22',
      text: '#E7FFF8',
      a1: '#FF007A',
      a2: '#FF7A00',
      a3: '#8BA3FF'
    }
  ];

  const applyPalette = (p: typeof brutalistPalettes[0]) => {
    setBgColor(p.bg);
    setTextColor(p.text);
    setAccent1(p.a1);
    setAccent2(p.a2);
    setAccent3(p.a3);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(`${label} copied!`);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const generateCssVariables = () => {
    return `:root {\n  --canvas-bg: ${bgColor};\n  --ink-text: ${textColor};\n  --accent-cobalt: ${accent1};\n  --accent-persimmon: ${accent2};\n  --accent-lime: ${accent3};\n}`;
  };

  const generateTailwindConfig = () => {
    return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        canvas: '${bgColor}',\n        ink: '${textColor}',\n        primary: '${accent1}',\n        secondary: '${accent2}',\n        accent: '${accent3}'\n      }\n    }\n  }\n};`;
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] pb-24 selection:bg-[#CCFF00]">
      <ToolHeader tool={tool} onBack={onBack} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Top Header */}
        <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-brutal mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 block">
                COLOR_ENGINE // WCAG_2.1_LUMINANCE
              </span>
              <h2 className="text-xl font-black uppercase tracking-tight font-syne text-black">
                Contrast Auditor & Palette Synthesizer
              </h2>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-neutral-600 mr-1">
                PALETTES:
              </span>
              {brutalistPalettes.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPalette(p)}
                  className="px-2.5 py-1 text-xs font-syne font-bold uppercase border-2 border-black bg-[#FDFCF0] hover:bg-[#CCFF00] transition-colors cursor-pointer"
                >
                  {p.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Copy Feedback */}
        {copyFeedback && (
          <div className="p-3 mb-6 bg-[#CCFF00] text-black border-2 border-black shadow-brutal flex items-center gap-2 text-xs font-bold uppercase animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{copyFeedback}</span>
          </div>
        )}

        {/* Main 2-Column Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Left: Interactive Color Pickers & Live Preview Stage (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Color Selectors */}
            <div className="bg-white border-2 border-black p-6 shadow-brutal space-y-4">
              <span className="font-syne font-black text-xs uppercase text-black block border-b-2 border-black pb-2">
                Color Value Inputs
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Background Color */}
                <div className="p-3 bg-[#FDFCF0] border border-black flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-syne font-bold uppercase text-black">
                      Background Canvas
                    </label>
                    <span className="text-xs font-mono font-bold text-neutral-600">{bgColor}</span>
                  </div>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 border-2 border-black cursor-pointer bg-transparent"
                  />
                </div>

                {/* Text Color */}
                <div className="p-3 bg-[#FDFCF0] border border-black flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-syne font-bold uppercase text-black">
                      Foreground Ink
                    </label>
                    <span className="text-xs font-mono font-bold text-neutral-600">{textColor}</span>
                  </div>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-10 h-10 border-2 border-black cursor-pointer bg-transparent"
                  />
                </div>
              </div>

              {/* Accent Palette Controls */}
              <div className="pt-2">
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-2">
                  Accent Tones (Cobalt, Persimmon, Acid Lime)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 p-2 bg-[#FDFCF0] border border-black">
                    <input
                      type="color"
                      value={accent1}
                      onChange={(e) => setAccent1(e.target.value)}
                      className="w-8 h-8 border border-black cursor-pointer bg-transparent"
                    />
                    <span className="text-[10px] font-mono font-bold">{accent1}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#FDFCF0] border border-black">
                    <input
                      type="color"
                      value={accent2}
                      onChange={(e) => setAccent2(e.target.value)}
                      className="w-8 h-8 border border-black cursor-pointer bg-transparent"
                    />
                    <span className="text-[10px] font-mono font-bold">{accent2}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#FDFCF0] border border-black">
                    <input
                      type="color"
                      value={accent3}
                      onChange={(e) => setAccent3(e.target.value)}
                      className="w-8 h-8 border border-black cursor-pointer bg-transparent"
                    />
                    <span className="text-[10px] font-mono font-bold">{accent3}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Simulated UI Component Canvas */}
            <div
              className="border-2 border-black p-8 shadow-brutal transition-colors"
              style={{ backgroundColor: bgColor, color: textColor }}
            >
              <div className="flex items-center justify-between border-b-2 border-current pb-3 mb-6">
                <span className="font-syne font-black text-xl tracking-tighter uppercase">
                  SIMULATED COMPONENT
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 border border-current">
                  RATIO: {ratioRounded}:1
                </span>
              </div>

              <h3 className="text-3xl font-black uppercase font-syne mb-2">
                Digital Brutalism in High Contrast
              </h3>

              <p className="text-sm font-medium leading-relaxed max-w-lg mb-6">
                Evaluating real typographic legibility against calculated background luminance. The relative luminance equation adheres to WCAG 2.1 standards.
              </p>

              {/* Accent Button Previews */}
              <div className="flex flex-wrap gap-3">
                <button
                  className="px-4 py-2 border-2 border-black text-white font-syne font-bold uppercase text-xs shadow-brutal-sm"
                  style={{ backgroundColor: accent1 }}
                >
                  Action Primary
                </button>
                <button
                  className="px-4 py-2 border-2 border-black text-white font-syne font-bold uppercase text-xs shadow-brutal-sm"
                  style={{ backgroundColor: accent2 }}
                >
                  Action Secondary
                </button>
                <button
                  className="px-4 py-2 border-2 border-black text-black font-syne font-bold uppercase text-xs shadow-brutal-sm"
                  style={{ backgroundColor: accent3 }}
                >
                  Highlight Tone
                </button>
              </div>
            </div>

          </div>

          {/* Right: WCAG Scorecard & Code Export (Col 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contrast Ratio Scorecard */}
            <div className="bg-white border-2 border-black p-6 shadow-brutal space-y-4">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <span className="font-syne font-black text-sm uppercase text-black">
                  WCAG 2.1 Compliance Matrix
                </span>
                <span className="text-2xl font-black font-mono text-black">
                  {ratioRounded}:1
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'WCAG AA Normal Text (≥ 4.5:1)', pass: passAANormal, req: '4.5:1' },
                  { label: 'WCAG AA Large Text (≥ 3.0:1)', pass: passAALarge, req: '3.0:1' },
                  { label: 'WCAG AAA Normal Text (≥ 7.0:1)', pass: passAAANormal, req: '7.0:1' },
                  { label: 'WCAG AAA Large Text (≥ 4.5:1)', pass: passAAALarge, req: '4.5:1' },
                  { label: 'UI Components & Graphics (≥ 3.0:1)', pass: passUI, req: '3.0:1' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FDFCF0] border border-black flex items-center justify-between text-xs font-mono"
                  >
                    <span className="font-bold text-neutral-800">{item.label}</span>
                    <span className={`px-2 py-0.5 border font-bold uppercase ${
                      item.pass ? 'bg-[#CCFF00] text-black border-black' : 'bg-red-500 text-white border-black'
                    }`}>
                      {item.pass ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Export Box */}
            <div className="bg-white border-2 border-black p-6 shadow-brutal space-y-4">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <span className="font-syne font-black text-sm uppercase text-black">
                  Export Configuration
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(generateCssVariables(), 'CSS Variables')}
                    className="px-2 py-1 bg-[#FDFCF0] border border-black text-[10px] font-mono font-bold uppercase hover:bg-[#CCFF00] cursor-pointer"
                  >
                    Copy CSS
                  </button>
                  <button
                    onClick={() => copyToClipboard(generateTailwindConfig(), 'Tailwind Config')}
                    className="px-2 py-1 bg-[#FDFCF0] border border-black text-[10px] font-mono font-bold uppercase hover:bg-[#CCFF00] cursor-pointer"
                  >
                    Copy Tailwind
                  </button>
                </div>
              </div>

              <pre className="p-4 bg-[#0D1117] text-[#CCFF00] font-mono text-xs border border-black overflow-x-auto leading-relaxed">
                <code>{generateCssVariables()}</code>
              </pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

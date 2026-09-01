import React, { useState, useRef, useEffect } from 'react';
import { ToolMetadata } from '../../../types';
import { ToolHeader } from '../../common/ToolHeader';
import { BrutalButton } from '../../common/BrutalButton';
import { Badge } from '../../common/Badge';
import {
  Image,
  Upload,
  Download,
  Copy,
  CheckCircle2,
  Sliders,
  Sparkles,
  RefreshCw,
  Eye,
  FileCode
} from 'lucide-react';

interface SvgImageStudioWorkspaceProps {
  tool: ToolMetadata;
  onBack: () => void;
}

const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <!-- VELTRIX NEO-BRUTALIST EMBLEM -->
  <rect width="200" height="200" fill="#FDFCF0" />
  <rect x="20" y="20" width="160" height="160" fill="#2E5BFF" stroke="#000000" stroke-width="4" />
  <circle cx="100" cy="100" r="50" fill="#CCFF00" stroke="#000000" stroke-width="4" />
  <polygon points="100,50 140,130 60,130" fill="#FF5C00" stroke="#000000" stroke-width="4" />
  <text x="100" y="175" font-family="sans-serif" font-size="14" font-weight="900" text-anchor="middle" fill="#000000">VELTRIX</text>
</svg>`;

export const SvgImageStudioWorkspace: React.FC<SvgImageStudioWorkspaceProps> = ({ tool, onBack }) => {
  const [activeMode, setActiveMode] = useState<'svg' | 'raster'>('raster');
  
  // SVG State
  const [svgInput, setSvgInput] = useState<string>(defaultSvg);
  const [svgScale, setSvgScale] = useState<number>(2);
  const [svgBg, setSvgBg] = useState<'checker' | 'white' | 'dark'>('checker');

  // Raster Image State
  const [rasterSrc, setRasterSrc] = useState<string | null>(null);
  const [rasterWidth, setRasterWidth] = useState<number>(800);
  const [rasterHeight, setRasterHeight] = useState<number>(600);
  const [aspectRatio, setAspectRatio] = useState<number>(4 / 3);
  const [targetFormat, setTargetFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/webp');
  const [quality, setQuality] = useState<number>(0.85);
  const [originalFileSize, setOriginalFileSize] = useState<number>(0);
  const [processedFileSize, setProcessedFileSize] = useState<number>(0);
  const [processedDataUrl, setProcessedDataUrl] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // SVG Minifier function
  const minifySvgCode = (code: string) => {
    return code
      .replace(/<!--[\s\S]*?-->/g, '') // remove comments
      .replace(/\s+/g, ' ') // collapse whitespace
      .replace(/> </g, '><') // remove whitespace between tags
      .trim();
  };

  const handleMinifySvg = () => {
    setSvgInput(minifySvgCode(svgInput));
  };

  // Convert SVG to PNG download
  const downloadSvgAsPng = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    const svgBlob = new Blob([svgInput], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = (img.width || 400) * svgScale;
      canvas.height = (img.height || 400) * svgScale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `Veltrix_Vector_${svgScale}x.png`;
      a.click();
    };
    img.src = url;
  };

  // Handle Raster Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalFileSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setRasterSrc(dataUrl);

      const img = new window.Image();
      img.onload = () => {
        setRasterWidth(img.width);
        setRasterHeight(img.height);
        setAspectRatio(img.width / img.height);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Process raster image transformation
  useEffect(() => {
    if (!rasterSrc) return;

    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = rasterWidth;
      canvas.height = rasterHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, rasterWidth, rasterHeight);
      const dataUrl = canvas.toDataURL(targetFormat, quality);
      setProcessedDataUrl(dataUrl);

      // Estimate byte length
      const head = `data:${targetFormat};base64,`;
      const base64Data = dataUrl.substring(head.length);
      const byteLength = Math.round((base64Data.length * 3) / 4);
      setProcessedFileSize(byteLength);
    };
    img.src = rasterSrc;
  }, [rasterSrc, rasterWidth, rasterHeight, targetFormat, quality]);

  const downloadRaster = () => {
    if (!processedDataUrl) return;
    const ext = targetFormat === 'image/webp' ? 'webp' : targetFormat === 'image/png' ? 'png' : 'jpg';
    const a = document.createElement('a');
    a.href = processedDataUrl;
    a.download = `Optimized_Image_Veltrix.${ext}`;
    a.click();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(`${label} copied!`);
    setTimeout(() => setCopyStatus(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] pb-24 selection:bg-[#CCFF00]">
      <ToolHeader tool={tool} onBack={onBack} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Mode Switcher */}
        <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-brutal mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 block">
                IMAGE_OPTIMIZER // CANVAS_PIPELINE
              </span>
              <h2 className="text-xl font-black uppercase tracking-tight font-syne text-black">
                Vector & Raster Processing Studio
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveMode('svg')}
                className={`px-4 py-2 text-xs font-syne font-bold uppercase border-2 border-black cursor-pointer transition-all ${
                  activeMode === 'svg'
                    ? 'bg-[#FF5C00] text-white shadow-brutal-sm -translate-y-0.5'
                    : 'bg-[#FDFCF0] text-black hover:bg-white'
                }`}
              >
                SVG Vector Studio
              </button>
              <button
                onClick={() => setActiveMode('raster')}
                className={`px-4 py-2 text-xs font-syne font-bold uppercase border-2 border-black cursor-pointer transition-all ${
                  activeMode === 'raster'
                    ? 'bg-[#2E5BFF] text-white shadow-brutal-sm -translate-y-0.5'
                    : 'bg-[#FDFCF0] text-black hover:bg-white'
                }`}
              >
                Image Transcoder & Scale
              </button>
            </div>
          </div>
        </div>

        {/* Copy Feedback */}
        {copyStatus && (
          <div className="p-3 mb-6 bg-[#CCFF00] text-black border-2 border-black shadow-brutal flex items-center gap-2 text-xs font-bold uppercase animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{copyStatus}</span>
          </div>
        )}

        {/* SVG STUDIO MODE */}
        {activeMode === 'svg' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: SVG Code Editor (Col 1-6) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white border-2 border-black p-6 shadow-brutal">
                <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-3">
                  <span className="font-syne font-black text-xs uppercase text-black">
                    SVG Vector Markup
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleMinifySvg}
                      className="px-2 py-1 bg-[#FDFCF0] border border-black text-[10px] font-mono font-bold uppercase hover:bg-[#CCFF00] cursor-pointer"
                    >
                      Minify SVG
                    </button>
                    <button
                      onClick={() => copyToClipboard(svgInput, 'SVG code')}
                      className="px-2 py-1 bg-[#FDFCF0] border border-black text-[10px] font-mono font-bold uppercase hover:bg-[#CCFF00] cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <textarea
                  value={svgInput}
                  onChange={(e) => setSvgInput(e.target.value)}
                  rows={16}
                  className="w-full p-4 font-mono text-xs bg-[#FDFCF0] border-2 border-black text-black leading-relaxed focus:outline-none focus:bg-white resize-y"
                  spellCheck={false}
                />

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono font-bold text-neutral-600">
                  <span>LENGTH: {svgInput.length} BYTES</span>
                  <span>STANDARD: W3C SVG 1.1</span>
                </div>
              </div>
            </div>

            {/* Right: SVG Live Canvas Preview & PNG Render (Col 7-12) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white border-2 border-black p-6 shadow-brutal">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-3 mb-4">
                  <span className="font-syne font-black text-xs uppercase text-black">
                    Vector Render Stage
                  </span>

                  {/* Backdrop Toggles */}
                  <div className="flex items-center gap-1">
                    {(['checker', 'white', 'dark'] as const).map((bg) => (
                      <button
                        key={bg}
                        onClick={() => setSvgBg(bg)}
                        className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase border border-black cursor-pointer ${
                          svgBg === bg ? 'bg-black text-white' : 'bg-[#FDFCF0] text-black'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG Visual Stage */}
                <div
                  className={`border-2 border-black p-8 flex items-center justify-center min-h-[320px] max-h-[420px] overflow-hidden ${
                    svgBg === 'checker' ? 'bg-dot-pattern bg-neutral-100' : svgBg === 'white' ? 'bg-white' : 'bg-neutral-900'
                  }`}
                  dangerouslySetInnerHTML={{ __html: svgInput }}
                />

                {/* PNG Export Controls */}
                <div className="mt-6 pt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-neutral-700">
                      Raster Scale:
                    </span>
                    {[1, 2, 4].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSvgScale(s)}
                        className={`px-2.5 py-1 text-xs font-mono font-bold border border-black cursor-pointer ${
                          svgScale === s ? 'bg-[#2E5BFF] text-white' : 'bg-[#FDFCF0] text-black'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>

                  <BrutalButton
                    variant="primary"
                    size="sm"
                    icon={<Download className="w-3.5 h-3.5" />}
                    onClick={downloadSvgAsPng}
                  >
                    Render to PNG ({svgScale}x)
                  </BrutalButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RASTER IMAGE TRANSCODER MODE */}
        {activeMode === 'raster' && (
          <div className="space-y-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />

            {!rasterSrc ? (
              <div className="bg-white border-2 border-black p-12 text-center shadow-brutal">
                <div className="w-16 h-16 bg-[#2E5BFF] border-2 border-black text-white mx-auto flex items-center justify-center shadow-brutal-sm mb-4">
                  <Image className="w-8 h-8" />
                </div>
                <h3 className="font-syne font-black text-2xl uppercase text-black mb-2">
                  Upload Image For Processing
                </h3>
                <p className="text-xs text-neutral-600 font-medium max-w-md mx-auto mb-6">
                  Select a PNG, JPEG, or WebP image to transcode, resize, and compress with client-side canvas algorithms.
                </p>
                <BrutalButton
                  variant="primary"
                  size="md"
                  icon={<Upload className="w-4 h-4" />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose Image File
                </BrutalButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Controls (Col 1-5) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-white border-2 border-black p-6 shadow-brutal space-y-4">
                    <div className="flex items-center justify-between border-b-2 border-black pb-3">
                      <span className="font-syne font-black text-sm uppercase text-black">
                        Transcoder Settings
                      </span>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs font-mono font-bold uppercase text-[#2E5BFF] hover:underline cursor-pointer"
                      >
                        Change File
                      </button>
                    </div>

                    {/* Format Selector */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-1">
                        Target Format
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'image/webp', label: 'WebP' },
                          { id: 'image/jpeg', label: 'JPEG' },
                          { id: 'image/png', label: 'PNG' }
                        ].map((fmt) => (
                          <button
                            key={fmt.id}
                            onClick={() => setTargetFormat(fmt.id as any)}
                            className={`p-2 text-xs font-syne font-bold uppercase border border-black cursor-pointer ${
                              targetFormat === fmt.id ? 'bg-black text-white shadow-brutal-sm' : 'bg-[#FDFCF0] text-black'
                            }`}
                          >
                            {fmt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quality Slider (for lossy formats) */}
                    {targetFormat !== 'image/png' && (
                      <div>
                        <div className="flex justify-between text-xs font-mono font-bold uppercase text-neutral-700 mb-1">
                          <span>Compression Quality</span>
                          <span>{Math.round(quality * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.05"
                          value={quality}
                          onChange={(e) => setQuality(parseFloat(e.target.value))}
                          className="w-full accent-black cursor-pointer"
                        />
                      </div>
                    )}

                    {/* Dimension Controls */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase text-neutral-700 mb-1">
                          Width (px)
                        </label>
                        <input
                          type="number"
                          value={rasterWidth}
                          onChange={(e) => {
                            const w = parseInt(e.target.value) || 100;
                            setRasterWidth(w);
                            setRasterHeight(Math.round(w / aspectRatio));
                          }}
                          className="w-full p-2 bg-[#FDFCF0] border border-black text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase text-neutral-700 mb-1">
                          Height (px)
                        </label>
                        <input
                          type="number"
                          value={rasterHeight}
                          onChange={(e) => {
                            const h = parseInt(e.target.value) || 100;
                            setRasterHeight(h);
                            setRasterWidth(Math.round(h * aspectRatio));
                          }}
                          className="w-full p-2 bg-[#FDFCF0] border border-black text-xs font-mono font-bold"
                        />
                      </div>
                    </div>

                    {/* Footprint Comparison */}
                    <div className="p-3 bg-[#FDFCF0] border border-black space-y-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Original Size:</span>
                        <span className="font-bold">{(originalFileSize / 1024).toFixed(1)} KB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Optimized Size:</span>
                        <span className="font-bold text-green-700">{(processedFileSize / 1024).toFixed(1)} KB</span>
                      </div>
                    </div>

                    <BrutalButton
                      variant="primary"
                      size="md"
                      fullWidth
                      icon={<Download className="w-4 h-4" />}
                      onClick={downloadRaster}
                    >
                      Download Transcoded Asset
                    </BrutalButton>
                  </div>
                </div>

                {/* Right: Preview (Col 6-12) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-white border-2 border-black p-6 shadow-brutal">
                    <span className="font-syne font-black text-xs uppercase text-black block mb-3 border-b-2 border-black pb-2">
                      Live Output Preview
                    </span>

                    <div className="bg-neutral-900 border-2 border-black p-4 flex items-center justify-center min-h-[360px] max-h-[480px] overflow-hidden">
                      {processedDataUrl && (
                        <img
                          src={processedDataUrl}
                          alt="Processed Asset"
                          className="max-h-[420px] max-w-full object-contain"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

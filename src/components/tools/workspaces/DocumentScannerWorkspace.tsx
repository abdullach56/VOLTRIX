import React, { useState, useRef, useEffect } from 'react';
import { ToolMetadata } from '../../../types';
import { ToolHeader } from '../../common/ToolHeader';
import { BrutalButton } from '../../common/BrutalButton';
import { Badge } from '../../common/Badge';
import { jsPDF } from 'jspdf';
import {
  Camera,
  Upload,
  RefreshCw,
  Plus,
  Trash2,
  RotateCw,
  ArrowUp,
  ArrowDown,
  FileDown,
  Eye,
  Sliders,
  CheckCircle2,
  AlertCircle,
  VideoOff,
  Sparkles,
  Layers,
  FileText,
  ScanLine
} from 'lucide-react';

interface DocumentScannerWorkspaceProps {
  tool: ToolMetadata;
  onBack: () => void;
}

interface ScannedPage {
  id: string;
  originalDataUrl: string;
  processedDataUrl: string;
  rotation: number; // 0, 90, 180, 270
  filter: 'original' | 'magic' | 'bw' | 'grayscale' | 'vivid';
  timestamp: number;
}

export const DocumentScannerWorkspace: React.FC<DocumentScannerWorkspaceProps> = ({ tool, onBack }) => {
  // State
  const [pages, setPages] = useState<ScannedPage[]>([]);
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>('Scanned_Document_Veltrix');
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'fit'>('a4');

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera when unmounting
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera MediaStream API is not supported in this browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: 'environment'
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(
        err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
          ? 'Camera permission was denied. Please allow camera access in your browser address bar settings or use the file upload option below.'
          : `Unable to access camera: ${err.message || 'Check camera connection'}`
      );
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Image Processing Filter Function
  const applyFilterToImage = (
    imgSrc: string,
    filter: 'original' | 'magic' | 'bw' | 'grayscale' | 'vivid',
    rotation: number
  ): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(imgSrc);
          return;
        }

        // Handle rotation dimensions
        const isRotated90or270 = rotation === 90 || rotation === 270;
        canvas.width = isRotated90or270 ? img.height : img.width;
        canvas.height = isRotated90or270 ? img.width : img.height;

        // Apply rotation transform
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        // If original, return as-is
        if (filter === 'original') {
          resolve(canvas.toDataURL('image/jpeg', 0.92));
          return;
        }

        // Apply Pixel Filters
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (filter === 'grayscale') {
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
          } else if (filter === 'bw') {
            // High contrast black & white document threshold
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            const threshold = 140;
            const val = gray > threshold ? 255 : 0;
            data[i] = val;
            data[i + 1] = val;
            data[i + 2] = val;
          } else if (filter === 'magic') {
            // Magic clean: dynamic contrast boost & white paper background leveling
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            // Contrast stretch
            const contrast = 1.35;
            let val = (gray - 128) * contrast + 128;
            if (val > 200) val = 255; // whiten paper background
            if (val < 60) val = 0;   // sharpen black ink
            val = Math.max(0, Math.min(255, val));

            data[i] = val;
            data[i + 1] = val;
            data[i + 2] = val;
          } else if (filter === 'vivid') {
            // Color saturation & contrast boost
            data[i] = Math.min(255, r * 1.15);
            data[i + 1] = Math.min(255, g * 1.15);
            data[i + 2] = Math.min(255, b * 1.15);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      };
      img.src = imgSrc;
    });
  };

  // Capture current video frame
  const captureFrame = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);

    const processed = await applyFilterToImage(dataUrl, 'magic', 0);

    const newPage: ScannedPage = {
      id: `page_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      originalDataUrl: dataUrl,
      processedDataUrl: processed,
      rotation: 0,
      filter: 'magic',
      timestamp: Date.now()
    };

    setPages((prev) => [...prev, newPage]);
    setSelectedPageIndex(pages.length);
  };

  // Handle uploaded files
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const rawUrl = event.target?.result as string;
        if (rawUrl) {
          const processed = await applyFilterToImage(rawUrl, 'magic', 0);
          const newPage: ScannedPage = {
            id: `page_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            originalDataUrl: rawUrl,
            processedDataUrl: processed,
            rotation: 0,
            filter: 'magic',
            timestamp: Date.now()
          };
          setPages((prev) => [...prev, newPage]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Update filter on active page
  const setPageFilter = async (filter: 'original' | 'magic' | 'bw' | 'grayscale' | 'vivid') => {
    if (pages.length === 0) return;
    const currentPage = pages[selectedPageIndex];
    const newProcessed = await applyFilterToImage(currentPage.originalDataUrl, filter, currentPage.rotation);

    setPages((prev) =>
      prev.map((p, idx) =>
        idx === selectedPageIndex
          ? { ...p, filter, processedDataUrl: newProcessed }
          : p
      )
    );
  };

  // Rotate active page 90 degrees
  const rotatePage = async () => {
    if (pages.length === 0) return;
    const currentPage = pages[selectedPageIndex];
    const newRotation = (currentPage.rotation + 90) % 360;
    const newProcessed = await applyFilterToImage(currentPage.originalDataUrl, currentPage.filter, newRotation);

    setPages((prev) =>
      prev.map((p, idx) =>
        idx === selectedPageIndex
          ? { ...p, rotation: newRotation, processedDataUrl: newProcessed }
          : p
      )
    );
  };

  // Move page up/down in order
  const movePage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= pages.length) return;
    const updated = [...pages];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setPages(updated);
    setSelectedPageIndex(toIndex);
  };

  // Delete page
  const deletePage = (index: number) => {
    const updated = pages.filter((_, idx) => idx !== index);
    setPages(updated);
    if (selectedPageIndex >= updated.length) {
      setSelectedPageIndex(Math.max(0, updated.length - 1));
    }
  };

  // Generate & Download PDF using jsPDF
  const generatePdf = async () => {
    if (pages.length === 0) return;
    setIsGeneratingPdf(true);
    setPdfSuccessMessage(null);

    try {
      // Create jsPDF instance
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: pageSize === 'fit' ? 'a4' : pageSize
      });

      for (let i = 0; i < pages.length; i++) {
        if (i > 0) {
          doc.addPage();
        }

        const page = pages[i];
        const img = new Image();
        img.src = page.processedDataUrl;

        await new Promise((resolve) => {
          img.onload = () => {
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            const imgRatio = img.width / img.height;
            const pageRatio = pageWidth / pageHeight;

            let renderWidth = pageWidth;
            let renderHeight = pageHeight;
            let xOffset = 0;
            let yOffset = 0;

            if (imgRatio > pageRatio) {
              renderHeight = pageWidth / imgRatio;
              yOffset = (pageHeight - renderHeight) / 2;
            } else {
              renderWidth = pageHeight * imgRatio;
              xOffset = (pageWidth - renderWidth) / 2;
            }

            doc.addImage(
              page.processedDataUrl,
              'JPEG',
              xOffset,
              yOffset,
              renderWidth,
              renderHeight,
              undefined,
              'FAST'
            );
            resolve(true);
          };
        });
      }

      const cleanFileName = pdfFileName.trim() || 'Scanned_Document';
      doc.save(`${cleanFileName}.pdf`);
      setPdfSuccessMessage(`Compiled & downloaded ${pages.length} page(s) as ${cleanFileName}.pdf`);
    } catch (err: any) {
      console.error('PDF generation error:', err);
      alert(`PDF Compilation failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const activePage = pages[selectedPageIndex];

  return (
    <div className="min-h-screen bg-[#FDFCF0] pb-24 selection:bg-[#CCFF00]">
      <ToolHeader tool={tool} onBack={onBack} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Camera Permission Alert if Error */}
        {cameraError && (
          <div className="mb-6 p-4 bg-white border-2 border-black shadow-brutal flex items-start gap-3 text-xs font-semibold">
            <AlertCircle className="w-5 h-5 text-[#FF5C00] shrink-0 mt-0.5" />
            <div>
              <p className="text-black font-bold uppercase">{cameraError}</p>
              <p className="text-neutral-600 mt-1">
                You can still scan and generate PDF documents by dragging and dropping photos into the upload area below.
              </p>
            </div>
          </div>
        )}

        {/* Top Action Bar */}
        <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-brutal mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Input Options: Camera / File Upload */}
            <div className="flex flex-wrap items-center gap-3">
              {!isCameraActive ? (
                <BrutalButton
                  variant="accent"
                  size="md"
                  icon={<Camera className="w-4 h-4" />}
                  onClick={startCamera}
                >
                  Start Camera Feed
                </BrutalButton>
              ) : (
                <>
                  <BrutalButton
                    variant="primary"
                    size="md"
                    icon={<Camera className="w-4 h-4" />}
                    onClick={captureFrame}
                  >
                    Capture Page ({pages.length + 1})
                  </BrutalButton>
                  <BrutalButton
                    variant="outline"
                    size="sm"
                    icon={<VideoOff className="w-4 h-4" />}
                    onClick={stopCamera}
                  >
                    Close Camera
                  </BrutalButton>
                </>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/png, image/jpeg, image/webp"
                multiple
                className="hidden"
                id="doc-file-upload"
              />
              <BrutalButton
                variant="outline"
                size="sm"
                icon={<Upload className="w-4 h-4" />}
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Images
              </BrutalButton>
            </div>

            {/* Document Compilation Stats & PDF Export Trigger */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase bg-[#FDFCF0] px-3 py-2 border-2 border-black">
                PAGES: {pages.length}
              </span>

              <BrutalButton
                variant="primary"
                size="md"
                disabled={pages.length === 0 || isGeneratingPdf}
                icon={<FileDown className="w-4 h-4" />}
                onClick={generatePdf}
              >
                {isGeneratingPdf ? 'Compiling PDF...' : 'Compile & Export PDF'}
              </BrutalButton>
            </div>

          </div>
        </div>

        {/* Live Camera Viewport (When active) */}
        {isCameraActive && (
          <div className="bg-black border-2 border-black p-4 mb-8 shadow-brutal relative">
            <div className="relative aspect-video max-h-[480px] mx-auto overflow-hidden bg-neutral-900 flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-contain"
              />

              {/* Viewfinder Target Overlay */}
              <div className="absolute inset-8 border-2 border-[#CCFF00] border-dashed pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between text-[11px] font-mono font-bold bg-black/70 text-[#CCFF00] px-2 py-0.5 self-start">
                  DOCUMENT_VIEWFINDER // ALIGN_EDGES
                </div>
                <div className="text-center text-xs font-mono font-bold bg-black/70 text-white px-3 py-1 self-center">
                  Align document within bounding frame & click "Capture Page"
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-white text-xs font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                LIVE VIDEO STREAMING
              </span>
              <button
                onClick={captureFrame}
                className="px-4 py-1.5 bg-[#CCFF00] text-black font-syne font-black uppercase text-xs hover:bg-white transition-colors cursor-pointer"
              >
                Take Snapshot ↵
              </button>
            </div>
          </div>
        )}

        {/* PDF Download Success Banner */}
        {pdfSuccessMessage && (
          <div className="p-4 mb-8 bg-[#CCFF00] text-black border-2 border-black shadow-brutal flex items-center justify-between font-bold text-xs uppercase animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-black" />
              <span>{pdfSuccessMessage}</span>
            </div>
            <button
              onClick={() => setPdfSuccessMessage(null)}
              className="text-xs font-mono font-black underline cursor-pointer"
            >
              DISMISS
            </button>
          </div>
        )}

        {/* Workspace Center (Dual Pane: Pages Shelf + Active Page Inspector) */}
        {pages.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Pages Thumbnail Stack (Col 1-4) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border-2 border-black p-4 shadow-brutal">
                <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
                  <h3 className="font-syne font-black text-sm uppercase tracking-wider text-black flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#2E5BFF]" /> Page Sequence ({pages.length})
                  </h3>
                  <button
                    onClick={() => {
                      if (confirm('Clear all scanned pages?')) {
                        setPages([]);
                        setSelectedPageIndex(0);
                      }
                    }}
                    className="text-[10px] font-mono font-bold uppercase text-red-600 hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {/* Thumbnails list */}
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {pages.map((p, idx) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPageIndex(idx)}
                      className={`p-3 border-2 border-black transition-all cursor-pointer flex items-center gap-3 ${
                        selectedPageIndex === idx
                          ? 'bg-[#2E5BFF] text-white shadow-brutal-sm -translate-y-0.5'
                          : 'bg-[#FDFCF0] text-black hover:bg-white'
                      }`}
                    >
                      <span className="font-syne font-black text-sm w-6">
                        #{idx + 1}
                      </span>
                      <div className="w-14 h-18 bg-white border border-black overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <img
                          src={p.processedDataUrl}
                          alt={`Page ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold uppercase truncate ${selectedPageIndex === idx ? 'text-white' : 'text-black'}`}>
                          Page {idx + 1}
                        </p>
                        <span className={`text-[10px] font-mono block uppercase ${selectedPageIndex === idx ? 'text-[#CCFF00]' : 'text-neutral-500'}`}>
                          FILTER: {p.filter.toUpperCase()}
                        </span>
                      </div>

                      {/* Reorder & Delete controls */}
                      <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          disabled={idx === 0}
                          onClick={() => movePage(idx, idx - 1)}
                          className="p-1 bg-white border border-black text-black disabled:opacity-30 hover:bg-[#CCFF00]"
                          title="Move Page Up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          disabled={idx === pages.length - 1}
                          onClick={() => movePage(idx, idx + 1)}
                          className="p-1 bg-white border border-black text-black disabled:opacity-30 hover:bg-[#CCFF00]"
                          title="Move Page Down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PDF Settings Box */}
              <div className="bg-white border-2 border-black p-4 shadow-brutal space-y-3 text-xs">
                <h4 className="font-syne font-bold uppercase tracking-wider text-black">
                  PDF Compilation Settings
                </h4>
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Output File Name
                  </label>
                  <input
                    type="text"
                    value={pdfFileName}
                    onChange={(e) => setPdfFileName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFCF0] border-2 border-black text-xs font-bold text-black focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Page Dimension Target
                  </label>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FDFCF0] border-2 border-black text-xs font-bold text-black focus:outline-none focus:bg-white cursor-pointer"
                  >
                    <option value="a4">Standard A4 (210 × 297 mm)</option>
                    <option value="letter">US Letter (8.5 × 11 in)</option>
                    <option value="fit">Auto-Fit (Preserve Image Aspect)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right: Active Page Canvas & Enhancement Tools (Col 5-12) */}
            <div className="lg:col-span-8 space-y-6">
              {activePage && (
                <div className="bg-white border-2 border-black p-6 shadow-brutal">
                  {/* Active Page Header Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-syne font-black text-lg text-black uppercase">
                        Active View: Page #{selectedPageIndex + 1}
                      </span>
                      <Badge variant="lime">
                        ROTATION: {activePage.rotation}°
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={rotatePage}
                        className="px-3 py-1.5 bg-[#FDFCF0] border-2 border-black font-syne font-bold uppercase text-xs shadow-brutal-sm hover:bg-[#CCFF00] flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5" /> Rotate 90°
                      </button>
                      <button
                        onClick={() => deletePage(selectedPageIndex)}
                        className="px-3 py-1.5 bg-red-100 border-2 border-black font-syne font-bold uppercase text-xs shadow-brutal-sm hover:bg-red-600 hover:text-white flex items-center gap-1 cursor-pointer text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove Page
                      </button>
                    </div>
                  </div>

                  {/* Filter Selector Buttons */}
                  <div className="mb-6">
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-2">
                      Enhancement Filter
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { id: 'magic', label: 'Magic Clean', desc: 'Auto paper whiten' },
                        { id: 'bw', label: 'High-Contrast B&W', desc: 'Ink threshold' },
                        { id: 'grayscale', label: 'Grayscale', desc: 'Smooth tonality' },
                        { id: 'vivid', label: 'Vivid Boost', desc: 'Color richness' },
                        { id: 'original', label: 'Original', desc: 'Raw sensor data' }
                      ].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setPageFilter(f.id as any)}
                          className={`p-2.5 border-2 border-black text-left transition-all cursor-pointer ${
                            activePage.filter === f.id
                              ? 'bg-black text-white shadow-brutal-sm -translate-y-0.5'
                              : 'bg-[#FDFCF0] text-black hover:bg-neutral-100'
                          }`}
                        >
                          <span className="font-syne font-bold uppercase text-[11px] block">
                            {f.label}
                          </span>
                          <span className={`text-[9px] font-mono block ${activePage.filter === f.id ? 'text-[#CCFF00]' : 'text-neutral-500'}`}>
                            {f.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Document Display Stage */}
                  <div className="bg-[#111] border-2 border-black p-4 flex items-center justify-center min-h-[480px] max-h-[640px] overflow-hidden">
                    <img
                      src={activePage.processedDataUrl}
                      alt="Active Page Document"
                      className="max-h-[580px] max-w-full object-contain shadow-2xl border border-neutral-700 bg-white"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[11px] font-mono font-bold text-neutral-600">
                    <span>STATUS: READY FOR COMPILATION</span>
                    <span>RESOLUTION: FULL PIXEL FIDELITY</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border-2 border-black p-12 text-center shadow-brutal">
            <div className="w-16 h-16 bg-[#CCFF00] border-2 border-black mx-auto flex items-center justify-center shadow-brutal-sm mb-4">
              <ScanLine className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-black mb-2">
              No Document Pages Scanned Yet
            </h3>
            <p className="text-xs text-neutral-600 font-medium max-w-md mx-auto mb-6">
              Start your browser camera stream above to snap physical documents, or click "Upload Images" to process existing receipts, contracts, and scans.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <BrutalButton
                variant="accent"
                size="md"
                icon={<Camera className="w-4 h-4" />}
                onClick={startCamera}
              >
                Launch Camera
              </BrutalButton>
              <BrutalButton
                variant="outline"
                size="md"
                icon={<Upload className="w-4 h-4" />}
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Images
              </BrutalButton>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

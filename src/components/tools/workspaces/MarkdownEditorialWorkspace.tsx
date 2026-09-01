import React, { useState, useMemo } from 'react';
import { ToolMetadata } from '../../../types';
import { ToolHeader } from '../../common/ToolHeader';
import { BrutalButton } from '../../common/BrutalButton';
import { Badge } from '../../common/Badge';
import {
  FileText,
  Copy,
  Download,
  CheckCircle2,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Code,
  Table,
  CheckSquare,
  Sparkles,
  Printer
} from 'lucide-react';

interface MarkdownEditorialWorkspaceProps {
  tool: ToolMetadata;
  onBack: () => void;
}

const initialMarkdown = `# VELTRIX ARCHITECTURAL SPECIFICATION

> **System Philosophy:** Fewer, better, more dependable tools engineered for local browser execution.

## 01. Client-Side Cryptographic Runtime
All cryptographic hash calculations (including **SHA-256**, **SHA-512**, and **HMAC**) are executed directly using the \`SubtleCrypto\` W3C API.

### Key Capabilities:
- **Zero Cloud Storage:** Local in-memory processing prevents sensitive data transmission.
- **Hardware Acceleration:** Native browser engine optimization.
- **Deterministic Workspaces:** Predictable input-to-output pipeline.

## 02. Supported Workspaces
| Tool Identifier | Core Specialty | Execution Target |
| :--- | :--- | :--- |
| \`document-scanner\` | Multi-Page PDF & Camera | Local Client Canvas |
| \`json-studio\` | Validator & TypeScript Engine | Local V8 Sandbox |
| \`crypto-security\` | WebCrypto Hashes & JWT | Native SubtleCrypto |

## 03. Checklist
- [x] Establish Clean Web Architecture
- [x] Implement Vibrant Palette Digital Brutalism
- [x] Guarantee Zero Server File Uploads
- [ ] Connect custom profile links in configuration

*Engineered by **Abdullah Charoliya** for the open web.*`;

export const MarkdownEditorialWorkspace: React.FC<MarkdownEditorialWorkspaceProps> = ({ tool, onBack }) => {
  const [markdown, setMarkdown] = useState<string>(initialMarkdown);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Compute live analytics
  const metrics = useMemo(() => {
    const text = markdown.trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const chars = text.length;
    const paragraphs = text ? text.split(/\n\n+/).filter(Boolean).length : 0;
    const readMinutes = Math.max(1, Math.ceil(words / 200));
    return { words, chars, paragraphs, readMinutes };
  }, [markdown]);

  // Client-side markdown renderer parser
  const renderedHtml = useMemo(() => {
    let html = markdown;

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-black uppercase font-syne mt-4 mb-2 text-black">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-black uppercase font-syne mt-6 mb-3 text-[#2E5BFF] border-b-2 border-black pb-1">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl sm:text-4xl font-black uppercase font-syne mb-4 text-black">$1</h1>');

    // Blockquote
    html = html.replace(/^\> (.*$)/gim, '<blockquote class="p-3 my-3 bg-[#CCFF00] text-black border-2 border-black font-semibold shadow-brutal-sm">$1</blockquote>');

    // Bold & Italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-black">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // Code blocks & inline code
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="p-4 my-3 bg-[#0D1117] text-[#CCFF00] font-mono text-xs border-2 border-black overflow-x-auto"><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-neutral-200 border border-black font-mono text-xs text-black font-bold">$1</code>');

    // Checkboxes
    html = html.replace(/^- \[x\] (.*$)/gim, '<div class="flex items-center gap-2 my-1 text-xs font-bold text-green-800"><span class="w-4 h-4 bg-[#CCFF00] border border-black flex items-center justify-center text-[10px]">✓</span> $1</div>');
    html = html.replace(/^- \[ \] (.*$)/gim, '<div class="flex items-center gap-2 my-1 text-xs font-medium text-neutral-700"><span class="w-4 h-4 bg-white border border-black inline-block"></span> $1</div>');

    // Unordered Lists
    html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-xs font-medium text-neutral-800 my-1">$1</li>');

    // Tables (Basic markdown table regex)
    html = html.replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter((c) => c.trim().length > 0);
      if (cells.some((c) => c.includes('---'))) {
        return '';
      }
      return `<tr class="border-b border-black">${cells.map((c) => `<td class="p-2 border-r border-black text-xs font-medium">${c.trim()}</td>`).join('')}</tr>`;
    });

    return html;
  }, [markdown]);

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('markdown-editor-area') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end) || 'Sample Text';

    const replacement = `${prefix}${selected}${suffix}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    setMarkdown(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  const insertTable = () => {
    const tableTemplate = `\n| Column 1 | Column 2 | Column 3 |\n| :--- | :--- | :--- |\n| Item Alpha | Data 01 | Active |\n| Item Beta | Data 02 | Verified |\n`;
    setMarkdown((prev) => prev + tableTemplate);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(`${label} copied!`);
    setTimeout(() => setCopyStatus(null), 2500);
  };

  const downloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] pb-24 selection:bg-[#CCFF00]">
      <ToolHeader tool={tool} onBack={onBack} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Formatting Toolbar */}
        <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-brutal mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Quick Insert Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => insertFormatting('**', '**')}
                className="p-2 bg-[#FDFCF0] border border-black hover:bg-[#CCFF00] text-black shadow-brutal-sm"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertFormatting('*', '*')}
                className="p-2 bg-[#FDFCF0] border border-black hover:bg-[#CCFF00] text-black shadow-brutal-sm"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertFormatting('# ')}
                className="p-2 bg-[#FDFCF0] border border-black hover:bg-[#CCFF00] text-black shadow-brutal-sm"
                title="H1 Heading"
              >
                <Heading1 className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertFormatting('## ')}
                className="p-2 bg-[#FDFCF0] border border-black hover:bg-[#CCFF00] text-black shadow-brutal-sm"
                title="H2 Heading"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertFormatting('- ')}
                className="p-2 bg-[#FDFCF0] border border-black hover:bg-[#CCFF00] text-black shadow-brutal-sm"
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertFormatting('- [ ] ')}
                className="p-2 bg-[#FDFCF0] border border-black hover:bg-[#CCFF00] text-black shadow-brutal-sm"
                title="Checklist Task"
              >
                <CheckSquare className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertFormatting('```\n', '\n```')}
                className="p-2 bg-[#FDFCF0] border border-black hover:bg-[#CCFF00] text-black shadow-brutal-sm"
                title="Code Block"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                onClick={insertTable}
                className="p-2 bg-[#FDFCF0] border border-black hover:bg-[#CCFF00] text-black shadow-brutal-sm"
                title="Insert Markdown Table"
              >
                <Table className="w-4 h-4" />
              </button>
            </div>

            {/* Export Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <BrutalButton
                variant="outline"
                size="sm"
                icon={<Copy className="w-3.5 h-3.5" />}
                onClick={() => copyToClipboard(markdown, 'Raw Markdown')}
              >
                Copy .md
              </BrutalButton>
              <BrutalButton
                variant="primary"
                size="sm"
                icon={<Download className="w-3.5 h-3.5" />}
                onClick={() => downloadFile(markdown, 'Document.md', 'text/markdown')}
              >
                Save .md
              </BrutalButton>
              <BrutalButton
                variant="accent"
                size="sm"
                icon={<Download className="w-3.5 h-3.5" />}
                onClick={() => downloadFile(renderedHtml, 'Document.html', 'text/html')}
              >
                Export HTML
              </BrutalButton>
            </div>

          </div>

          {/* Document Metrics Bar */}
          <div className="mt-4 pt-3 border-t-2 border-black flex flex-wrap items-center justify-between text-xs font-mono font-bold text-neutral-700">
            <div className="flex flex-wrap gap-4">
              <span>WORDS: {metrics.words}</span>
              <span>•</span>
              <span>CHARACTERS: {metrics.chars}</span>
              <span>•</span>
              <span>PARAGRAPHS: {metrics.paragraphs}</span>
            </div>
            <span className="text-[#2E5BFF]">READING TIME: ~{metrics.readMinutes} MIN</span>
          </div>
        </div>

        {/* Copy Feedback */}
        {copyStatus && (
          <div className="p-3 mb-6 bg-[#CCFF00] text-black border-2 border-black shadow-brutal flex items-center gap-2 text-xs font-bold uppercase animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{copyStatus}</span>
          </div>
        )}

        {/* Split Screen Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Editor */}
          <div className="bg-white border-2 border-black p-6 shadow-brutal flex flex-col">
            <span className="font-syne font-black text-xs uppercase text-black block mb-3 border-b-2 border-black pb-2">
              Markdown Editor
            </span>
            <textarea
              id="markdown-editor-area"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={24}
              className="w-full flex-1 p-4 font-mono text-xs sm:text-sm bg-[#FDFCF0] border-2 border-black text-black leading-relaxed focus:outline-none focus:bg-white resize-y"
              spellCheck={false}
            />
          </div>

          {/* Right Rendered Preview */}
          <div className="bg-white border-2 border-black p-6 shadow-brutal flex flex-col">
            <span className="font-syne font-black text-xs uppercase text-black block mb-3 border-b-2 border-black pb-2">
              Rendered Document Preview
            </span>
            <div
              className="p-6 bg-[#FDFCF0] border-2 border-black flex-1 overflow-y-auto max-h-[640px] prose prose-sm max-w-none text-black"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

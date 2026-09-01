import React, { useState, useEffect } from 'react';
import { ToolMetadata } from '../../../types';
import { ToolHeader } from '../../common/ToolHeader';
import { BrutalButton } from '../../common/BrutalButton';
import { Badge } from '../../common/Badge';
import {
  Braces,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  Code2,
  FolderTree,
  FileCode,
  Sparkles,
  ArrowRight,
  Maximize2,
  Minimize2,
  FileSpreadsheet
} from 'lucide-react';

interface JsonStudioWorkspaceProps {
  tool: ToolMetadata;
  onBack: () => void;
}

type ViewMode = 'editor' | 'tree' | 'typescript' | 'csv';

export const JsonStudioWorkspace: React.FC<JsonStudioWorkspaceProps> = ({ tool, onBack }) => {
  const initialPayload = JSON.stringify(
    {
      platform: 'VELTRIX',
      version: '2.0.0',
      activeStatus: true,
      metrics: {
        totalTools: 7,
        clientSideExecution: 1.0,
        privacyRating: 'AAA'
      },
      engines: [
        { id: 'doc-scanner', name: 'Document Scanner', category: 'documents', verified: true },
        { id: 'json-studio', name: 'JSON Studio', category: 'developer', verified: true },
        { id: 'crypto-lab', name: 'Crypto Security Lab', category: 'security', verified: true }
      ]
    },
    null,
    2
  );

  const [inputJson, setInputJson] = useState<string>(initialPayload);
  const [parsedObject, setParsedObject] = useState<any>(null);
  const [parseError, setParseError] = useState<{ message: string; line?: number; column?: number } | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('editor');
  const [copyNotification, setCopyNotification] = useState<string | null>(null);

  // Validate and parse JSON continuously
  useEffect(() => {
    if (!inputJson.trim()) {
      setParsedObject(null);
      setParseError(null);
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      setParsedObject(parsed);
      setParseError(null);
    } catch (err: any) {
      setParsedObject(null);
      
      // Extract line & column from standard syntax error if possible
      let line = 1;
      let column = 1;
      const match = err.message.match(/position\s+(\d+)/);
      if (match) {
        const position = parseInt(match[1], 10);
        const lines = inputJson.slice(0, position).split('\n');
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }

      setParseError({
        message: err.message || 'Malformed JSON syntax',
        line,
        column
      });
    }
  }, [inputJson]);

  // Actions
  const handleFormat = (spaces: number = 2) => {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, spaces));
    } catch (e) {
      // Keep existing error state
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed));
    } catch (e) {
      // Keep existing error state
    }
  };

  const handleCopy = (textToCopy: string, label: string = 'Content') => {
    navigator.clipboard.writeText(textToCopy);
    setCopyNotification(`${label} copied to clipboard`);
    setTimeout(() => setCopyNotification(null), 2500);
  };

  const handleDownload = (content: string, filename: string, mimeType: string = 'application/json') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Generate TypeScript Interface from parsed object
  const generateTypeScriptInterface = (obj: any, rootName: string = 'RootObject'): string => {
    if (obj === null) return 'type RootObject = null;';
    if (typeof obj !== 'object') return `type RootObject = ${typeof obj};`;

    const interfaces: { [name: string]: string } = {};

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const inferType = (val: any, key: string): string => {
      if (val === null) return 'null | any';
      if (Array.isArray(val)) {
        if (val.length === 0) return 'any[]';
        const firstType = inferType(val[0], key.endsWith('s') ? key.slice(0, -1) : key + 'Item');
        return `${firstType}[]`;
      }
      if (typeof val === 'object') {
        const nestedName = capitalize(key);
        generateInterface(val, nestedName);
        return nestedName;
      }
      return typeof val;
    };

    const generateInterface = (targetObj: any, name: string) => {
      if (Array.isArray(targetObj)) return;
      const lines: string[] = [`export interface ${name} {`];
      for (const [key, value] of Object.entries(targetObj)) {
        const typeStr = inferType(value, key);
        lines.push(`  ${key}: ${typeStr};`);
      }
      lines.push('}');
      interfaces[name] = lines.join('\n');
    };

    generateInterface(obj, rootName);

    return Object.values(interfaces).join('\n\n');
  };

  // Convert JSON array to CSV
  const jsonToCsv = (obj: any): string => {
    if (!obj) return '';
    const array = Array.isArray(obj) ? obj : [obj];
    if (array.length === 0) return '';

    const headers = Object.keys(array[0]);
    const csvRows = [headers.join(',')];

    for (const row of array) {
      const values = headers.map((header) => {
        const val = row[header];
        const escaped = typeof val === 'object' ? JSON.stringify(val) : String(val ?? '');
        return `"${escaped.replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  };

  // Sample payloads
  const loadSample = (sampleType: 'api' | 'user' | 'ecommerce') => {
    if (sampleType === 'api') {
      setInputJson(
        JSON.stringify(
          {
            status: 200,
            endpoint: '/api/v1/workspaces',
            latencyMs: 14.2,
            data: {
              serverTime: new Date().toISOString(),
              features: ['offline_ready', 'cryptography', 'ocr_scanning'],
              rateLimitRemaining: 9999
            }
          },
          null,
          2
        )
      );
    } else if (sampleType === 'user') {
      setInputJson(
        JSON.stringify(
          [
            { id: 101, username: 'abdullah_charoliya', role: 'Lead Architect', active: true, points: 1980 },
            { id: 102, username: 'veltrix_guest', role: 'Operator', active: false, points: 320 }
          ],
          null,
          2
        )
      );
    } else {
      setInputJson(
        JSON.stringify(
          {
            orderId: 'ORD-89410',
            currency: 'USD',
            items: [
              { sku: 'VLTX-01', item: 'Document Scanner Engine', price: 0, qty: 1 },
              { sku: 'VLTX-02', item: 'Crypto Security Lab', price: 0, qty: 1 }
            ],
            total: 0.0,
            freeTier: true
          },
          null,
          2
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] pb-24 selection:bg-[#CCFF00]">
      <ToolHeader tool={tool} onBack={onBack} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Top Control Header */}
        <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-brutal mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Formatting Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <BrutalButton
                variant="primary"
                size="sm"
                icon={<Braces className="w-3.5 h-3.5" />}
                onClick={() => handleFormat(2)}
              >
                Beautify (2 Spaces)
              </BrutalButton>

              <BrutalButton
                variant="outline"
                size="sm"
                onClick={() => handleFormat(4)}
              >
                4 Spaces
              </BrutalButton>

              <BrutalButton
                variant="outline"
                size="sm"
                onClick={handleMinify}
              >
                Minify
              </BrutalButton>

              {/* Sample loader */}
              <div className="hidden sm:flex items-center gap-1.5 ml-2 border-l-2 border-black pl-3">
                <span className="text-[11px] font-mono font-bold uppercase text-neutral-500">
                  SAMPLES:
                </span>
                <button
                  onClick={() => loadSample('api')}
                  className="text-xs font-mono font-bold uppercase px-2 py-1 bg-[#FDFCF0] border border-black hover:bg-[#CCFF00]"
                >
                  API
                </button>
                <button
                  onClick={() => loadSample('user')}
                  className="text-xs font-mono font-bold uppercase px-2 py-1 bg-[#FDFCF0] border border-black hover:bg-[#CCFF00]"
                >
                  Array
                </button>
              </div>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-[#FDFCF0] p-1 border-2 border-black">
              {[
                { id: 'editor', label: 'Editor', icon: <Code2 className="w-3.5 h-3.5" /> },
                { id: 'tree', label: 'Tree View', icon: <FolderTree className="w-3.5 h-3.5" /> },
                { id: 'typescript', label: 'TypeScript', icon: <FileCode className="w-3.5 h-3.5" /> },
                { id: 'csv', label: 'CSV Export', icon: <FileSpreadsheet className="w-3.5 h-3.5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setViewMode(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-syne font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === tab.id
                      ? 'bg-black text-white shadow-brutal-sm'
                      : 'text-black hover:bg-white'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Copy Success Banner */}
        {copyNotification && (
          <div className="p-3 mb-6 bg-[#CCFF00] text-black border-2 border-black shadow-brutal flex items-center gap-2 text-xs font-bold uppercase animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{copyNotification}</span>
          </div>
        )}

        {/* Status Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-3 bg-white border-2 border-black shadow-brutal-sm">
          <div className="flex items-center gap-3">
            {parseError ? (
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>SYNTAX ERROR: {parseError.message} (Line {parseError.line}, Col {parseError.column})</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-700 font-mono text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>JSON STRUCTURE VALID • {inputJson.length.toLocaleString()} BYTES</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(inputJson, 'Raw JSON')}
              className="px-3 py-1 bg-[#FDFCF0] border border-black text-xs font-mono font-bold uppercase hover:bg-[#CCFF00] flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" /> Copy JSON
            </button>
            <button
              onClick={() => handleDownload(inputJson, 'data.json')}
              className="px-3 py-1 bg-black text-white border border-black text-xs font-mono font-bold uppercase hover:bg-[#FF5C00] flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download .json
            </button>
          </div>
        </div>

        {/* Main Viewport */}
        {viewMode === 'editor' && (
          <div className="bg-white border-2 border-black p-4 shadow-brutal">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-neutral-200">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                INPUT_BUFFER // JSON_CODE_EDITOR
              </span>
              <button
                onClick={() => setInputJson('')}
                className="text-[10px] font-mono font-bold text-red-600 uppercase hover:underline cursor-pointer"
              >
                Clear Buffer
              </button>
            </div>
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder="Paste or type JSON payload here..."
              rows={22}
              className="w-full p-4 font-mono text-xs sm:text-sm bg-[#FDFCF0] border-2 border-black text-black leading-relaxed focus:outline-none focus:bg-white resize-y"
              spellCheck={false}
            />
          </div>
        )}

        {viewMode === 'typescript' && (
          <div className="bg-white border-2 border-black p-6 shadow-brutal space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div>
                <h3 className="font-syne font-black text-lg uppercase text-black">
                  TypeScript Type Definitions
                </h3>
                <p className="text-xs text-neutral-600 font-medium">
                  Auto-inferred interface structures generated directly from your JSON model.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <BrutalButton
                  variant="accent"
                  size="sm"
                  icon={<Copy className="w-3.5 h-3.5" />}
                  onClick={() => handleCopy(generateTypeScriptInterface(parsedObject), 'TypeScript Types')}
                >
                  Copy TS Code
                </BrutalButton>
                <BrutalButton
                  variant="outline"
                  size="sm"
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => handleDownload(generateTypeScriptInterface(parsedObject), 'types.ts', 'text/plain')}
                >
                  Download .ts
                </BrutalButton>
              </div>
            </div>

            {parsedObject ? (
              <pre className="p-6 bg-[#0D1117] text-[#CCFF00] font-mono text-xs sm:text-sm border-2 border-black overflow-x-auto leading-relaxed">
                <code>{generateTypeScriptInterface(parsedObject)}</code>
              </pre>
            ) : (
              <div className="p-12 text-center text-xs font-mono font-bold text-neutral-500 bg-[#FDFCF0] border border-black">
                Fix JSON syntax errors to generate TypeScript definitions.
              </div>
            )}
          </div>
        )}

        {viewMode === 'tree' && (
          <div className="bg-white border-2 border-black p-6 shadow-brutal space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div>
                <h3 className="font-syne font-black text-lg uppercase text-black">
                  Interactive Node Explorer
                </h3>
                <p className="text-xs text-neutral-600 font-medium">
                  Hierarchical tree representation with data type inspection.
                </p>
              </div>
            </div>

            {parsedObject ? (
              <div className="p-6 bg-[#FDFCF0] border-2 border-black font-mono text-xs max-h-[600px] overflow-y-auto space-y-2">
                <JsonTreeNode label="root" value={parsedObject} isRoot={true} />
              </div>
            ) : (
              <div className="p-12 text-center text-xs font-mono font-bold text-neutral-500 bg-[#FDFCF0] border border-black">
                Invalid JSON. Please correct syntax in Editor mode.
              </div>
            )}
          </div>
        )}

        {viewMode === 'csv' && (
          <div className="bg-white border-2 border-black p-6 shadow-brutal space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div>
                <h3 className="font-syne font-black text-lg uppercase text-black">
                  CSV Spreadsheet Conversion
                </h3>
                <p className="text-xs text-neutral-600 font-medium">
                  Tabular CSV representation of objects and arrays.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <BrutalButton
                  variant="primary"
                  size="sm"
                  icon={<Copy className="w-3.5 h-3.5" />}
                  onClick={() => handleCopy(jsonToCsv(parsedObject), 'CSV')}
                >
                  Copy CSV
                </BrutalButton>
                <BrutalButton
                  variant="outline"
                  size="sm"
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => handleDownload(jsonToCsv(parsedObject), 'export.csv', 'text/csv')}
                >
                  Download .csv
                </BrutalButton>
              </div>
            </div>

            {parsedObject ? (
              <pre className="p-6 bg-[#FDFCF0] border-2 border-black font-mono text-xs sm:text-sm overflow-x-auto text-black leading-relaxed">
                <code>{jsonToCsv(parsedObject)}</code>
              </pre>
            ) : (
              <div className="p-12 text-center text-xs font-mono font-bold text-neutral-500 bg-[#FDFCF0] border border-black">
                Provide valid JSON to convert to CSV format.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

// Subcomponent: Recursive Tree Node
interface TreeNodeProps {
  label: string;
  value: any;
  isRoot?: boolean;
}

const JsonTreeNode: React.FC<TreeNodeProps> = ({ label, value, isRoot = false }) => {
  const [collapsed, setCollapsed] = useState(false);

  if (value === null) {
    return (
      <div className="pl-4 py-0.5">
        <span className="text-[#FF5C00] font-bold">{label}:</span>{' '}
        <span className="text-neutral-500 italic">null</span>
      </div>
    );
  }

  if (typeof value === 'object') {
    const isArr = Array.isArray(value);
    const keys = Object.keys(value);

    return (
      <div className={`${isRoot ? '' : 'pl-4 border-l-2 border-neutral-300 ml-2'} py-1`}>
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200/50 p-1 select-none"
        >
          <span className="text-[10px] font-mono px-1 bg-black text-white font-bold">
            {collapsed ? '+' : '−'}
          </span>
          <span className="font-bold text-[#2E5BFF]">{label}</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 bg-neutral-200 border border-neutral-400">
            {isArr ? `Array[${keys.length}]` : `Object{${keys.length}}`}
          </span>
        </div>

        {!collapsed && (
          <div className="mt-1 space-y-1">
            {keys.map((k) => (
              <JsonTreeNode key={k} label={k} value={value[k]} />
            ))}
          </div>
        )}
      </div>
    );
  }

  const valueColor =
    typeof value === 'string'
      ? 'text-green-700'
      : typeof value === 'number'
      ? 'text-[#2E5BFF]'
      : typeof value === 'boolean'
      ? 'text-[#FF5C00]'
      : 'text-neutral-900';

  return (
    <div className="pl-4 py-0.5 flex items-center gap-2">
      <span className="text-neutral-800 font-bold">{label}:</span>
      <span className={`font-mono font-semibold ${valueColor}`}>
        {typeof value === 'string' ? `"${value}"` : String(value)}
      </span>
      <span className="text-[9px] font-mono text-neutral-600 bg-neutral-100 px-1">
        {typeof value}
      </span>
    </div>
  );
};

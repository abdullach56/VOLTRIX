import React, { useState, useMemo } from 'react';
import { ToolMetadata } from '../../../types';
import { ToolHeader } from '../../common/ToolHeader';
import { BrutalButton } from '../../common/BrutalButton';
import { Badge } from '../../common/Badge';
import {
  Regex,
  CheckCircle2,
  AlertCircle,
  Copy,
  Code2,
  Sparkles,
  BookOpen,
  Replace,
  Layers,
  ArrowRight
} from 'lucide-react';

interface RegexPrecisionWorkspaceProps {
  tool: ToolMetadata;
  onBack: () => void;
}

interface MatchResult {
  match: string;
  index: number;
  groups: string[];
}

export const RegexPrecisionWorkspace: React.FC<RegexPrecisionWorkspaceProps> = ({ tool, onBack }) => {
  const [pattern, setPattern] = useState<string>('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})');
  const [flags, setFlags] = useState<{ g: boolean; i: boolean; m: boolean; s: boolean; u: boolean }>({
    g: true,
    i: true,
    m: false,
    s: false,
    u: false
  });
  const [testString, setTestString] = useState<string>(
    'Contact the engineering team at dev@veltrix.example or reach out to security@veltrix.example. For architectural questions, email abdullah.charoliya@lead.veltrix.example!'
  );
  const [replacementPattern, setReplacementPattern] = useState<string>('[$1 at domain $2]');
  const [activeTab, setActiveTab] = useState<'matches' | 'replace' | 'codegen' | 'cheatsheet'>('matches');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Active flag string
  const activeFlagsString = Object.entries(flags)
    .filter(([_, val]) => val)
    .map(([key]) => key)
    .join('');

  // Evaluate RegExp
  const { matches, error, highlightedHtml, replacedText } = useMemo(() => {
    if (!pattern) {
      return { matches: [], error: null, highlightedHtml: testString, replacedText: testString };
    }

    try {
      const regex = new RegExp(pattern, activeFlagsString);
      const matchesList: MatchResult[] = [];
      let replaced = '';

      try {
        replaced = testString.replace(regex, replacementPattern);
      } catch {
        replaced = testString;
      }

      if (flags.g) {
        let match: RegExpExecArray | null;
        let lastIndex = 0;
        let htmlParts: string[] = [];

        // Safety counter against catastrophic backtracking loops
        let iterations = 0;
        const maxIterations = 2000;

        while ((match = regex.exec(testString)) !== null && iterations < maxIterations) {
          iterations++;
          const matchText = match[0];
          const matchIndex = match.index;

          matchesList.push({
            match: matchText,
            index: matchIndex,
            groups: match.slice(1)
          });

          // Prevent zero-width infinite loop
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        const singleMatch = regex.exec(testString);
        if (singleMatch) {
          matchesList.push({
            match: singleMatch[0],
            index: singleMatch.index,
            groups: singleMatch.slice(1)
          });
        }
      }

      // Build Highlighted HTML
      let html = '';
      if (matchesList.length > 0) {
        let cursor = 0;
        // Sort matches by index
        const sorted = [...matchesList].sort((a, b) => a.index - b.index);
        for (const m of sorted) {
          if (m.index >= cursor) {
            html += escapeHtml(testString.slice(cursor, m.index));
            html += `<mark class="bg-[#CCFF00] text-black font-bold px-1 py-0.5 border border-black">${escapeHtml(m.match)}</mark>`;
            cursor = m.index + m.match.length;
          }
        }
        html += escapeHtml(testString.slice(cursor));
      } else {
        html = escapeHtml(testString);
      }

      return {
        matches: matchesList,
        error: null,
        highlightedHtml: html,
        replacedText: replaced
      };
    } catch (err: any) {
      return {
        matches: [],
        error: err.message || 'Invalid Regular Expression syntax',
        highlightedHtml: escapeHtml(testString),
        replacedText: testString
      };
    }
  }, [pattern, activeFlagsString, testString, replacementPattern, flags.g]);

  function escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/\n/g, '<br/>');
  }

  const toggleFlag = (flagKey: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [flagKey]: !prev[flagKey] }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(`${label} copied!`);
    setTimeout(() => setCopyStatus(null), 2500);
  };

  // Common Presets
  const presets = [
    { label: 'Email Address', pattern: '([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})', flags: 'gi' },
    { label: 'URL / Domain', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', flags: 'gi' },
    { label: 'IPv4 Address', pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b', flags: 'g' },
    { label: 'ISO 8601 Date', pattern: '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])', flags: 'g' },
    { label: 'UUID v4', pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}', flags: 'gi' }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF0] pb-24 selection:bg-[#CCFF00]">
      <ToolHeader tool={tool} onBack={onBack} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Pattern Definition Engine */}
        <div className="bg-white border-2 border-black p-6 shadow-brutal mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold uppercase text-neutral-500">
              EXPRESSION_INPUT // JAVASCRIPT_REGEX_PARSER
            </span>

            {/* Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase text-black mr-1">
                PRESETS:
              </span>
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setPattern(p.pattern)}
                  className="px-2 py-1 bg-[#FDFCF0] border border-black text-[10px] font-mono font-bold uppercase hover:bg-[#CCFF00] cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Regex Input Bar */}
          <div className="flex items-stretch border-2 border-black bg-[#FDFCF0]">
            <span className="px-4 py-3 font-mono font-black text-lg text-[#2E5BFF] bg-neutral-100 border-r-2 border-black select-none">
              /
            </span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. ([a-zA-Z0-9]+)"
              className="flex-1 px-4 py-3 font-mono text-sm sm:text-base font-bold text-black focus:outline-none bg-transparent"
              spellCheck={false}
            />
            <span className="px-4 py-3 font-mono font-black text-lg text-[#2E5BFF] bg-neutral-100 border-l-2 border-black select-none">
              /{activeFlagsString}
            </span>
          </div>

          {/* Flags Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-neutral-600 mr-2">
                ACTIVE FLAGS:
              </span>
              {[
                { key: 'g', label: 'g (Global)' },
                { key: 'i', label: 'i (Insensitive)' },
                { key: 'm', label: 'm (Multiline)' },
                { key: 's', label: 's (DotAll)' },
                { key: 'u', label: 'u (Unicode)' }
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => toggleFlag(f.key as any)}
                  className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border border-black cursor-pointer transition-colors ${
                    flags[f.key as keyof typeof flags]
                      ? 'bg-black text-[#CCFF00]'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {error ? (
              <div className="flex items-center gap-1.5 text-red-600 text-xs font-mono font-bold">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-green-700 text-xs font-mono font-bold">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> {matches.length} MATCH{matches.length === 1 ? '' : 'ES'} FOUND
              </div>
            )}
          </div>
        </div>

        {/* Copy Feedback */}
        {copyStatus && (
          <div className="p-3 mb-6 bg-[#CCFF00] text-black border-2 border-black shadow-brutal flex items-center gap-2 text-xs font-bold uppercase animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{copyStatus}</span>
          </div>
        )}

        {/* Main Test String Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Left: Input Text and Live Match Highlighter (Col 1-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border-2 border-black p-6 shadow-brutal">
              <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                <h3 className="font-syne font-black text-sm uppercase text-black">
                  Test String Buffer
                </h3>
                <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                  {testString.length} CHARS
                </span>
              </div>

              <textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                rows={7}
                className="w-full p-4 font-mono text-xs sm:text-sm bg-[#FDFCF0] border-2 border-black text-black leading-relaxed focus:outline-none focus:bg-white resize-y"
                placeholder="Enter sample text to match against regex..."
              />

              {/* Live Rendered Highlight Box */}
              <div className="mt-4 pt-4 border-t-2 border-black">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold uppercase text-neutral-600">
                    VISUAL MATCH HIGHLIGHTER
                  </span>
                </div>
                <div
                  className="p-4 bg-[#FDFCF0] border-2 border-black font-mono text-xs sm:text-sm leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                />
              </div>
            </div>
          </div>

          {/* Right: Inspection & Actions Panel (Col 8-12) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border-2 border-black p-6 shadow-brutal">
              
              {/* Tab Selector */}
              <div className="flex border-b-2 border-black pb-3 mb-4 gap-2">
                {[
                  { id: 'matches', label: 'Matches' },
                  { id: 'replace', label: 'Replace' },
                  { id: 'codegen', label: 'Code' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`px-3 py-1 text-xs font-syne font-bold uppercase border border-black cursor-pointer ${
                      activeTab === t.id ? 'bg-[#2E5BFF] text-white shadow-brutal-sm' : 'bg-[#FDFCF0] text-black'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* MATCHES TAB */}
              {activeTab === 'matches' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-neutral-600">
                      MATCH LIST ({matches.length})
                    </span>
                  </div>

                  {matches.length > 0 ? (
                    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                      {matches.map((m, idx) => (
                        <div key={idx} className="p-3 bg-[#FDFCF0] border-2 border-black font-mono text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#FF5C00]">Match #{idx + 1}</span>
                            <span className="text-[10px] text-neutral-500">Index: {m.index}</span>
                          </div>
                          <div className="font-bold text-black bg-white p-1.5 border border-black break-all">
                            {m.match}
                          </div>
                          {m.groups.length > 0 && (
                            <div className="pt-1 text-[11px] text-neutral-700 space-y-0.5">
                              {m.groups.map((g, gIdx) => (
                                <div key={gIdx} className="flex gap-2">
                                  <span className="text-[#2E5BFF] font-bold">Group ${gIdx + 1}:</span>
                                  <span className="break-all">{g}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-xs font-mono font-bold text-neutral-500 bg-[#FDFCF0] border border-black">
                      No matches found.
                    </div>
                  )}
                </div>
              )}

              {/* REPLACE TAB */}
              {activeTab === 'replace' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-black mb-1">
                      Substitution Template (e.g. $1, $&, REPLACED)
                    </label>
                    <input
                      type="text"
                      value={replacementPattern}
                      onChange={(e) => setReplacementPattern(e.target.value)}
                      className="w-full p-2.5 font-mono text-xs bg-[#FDFCF0] border-2 border-black text-black"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold uppercase text-neutral-600">
                        Result After Replacement
                      </span>
                      <button
                        onClick={() => copyToClipboard(replacedText, 'Replaced text')}
                        className="text-[10px] font-mono font-bold uppercase hover:underline cursor-pointer"
                      >
                        Copy Result
                      </button>
                    </div>
                    <pre className="p-3 bg-[#FDFCF0] border-2 border-black font-mono text-xs overflow-x-auto whitespace-pre-wrap text-black">
                      <code>{replacedText}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* CODE GEN TAB */}
              {activeTab === 'codegen' && (
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <span className="font-bold text-[#2E5BFF] uppercase block mb-1">
                      JavaScript / TypeScript
                    </span>
                    <pre className="p-3 bg-[#0D1117] text-[#CCFF00] border border-black overflow-x-auto">
                      <code>{`const regex = /${pattern}/${activeFlagsString};\nconst str = \`${testString.slice(0, 40)}...\`;\nconst matches = [...str.matchAll(regex)];`}</code>
                    </pre>
                  </div>

                  <div>
                    <span className="font-bold text-[#FF5C00] uppercase block mb-1">
                      Python 3
                    </span>
                    <pre className="p-3 bg-[#0D1117] text-white border border-black overflow-x-auto">
                      <code>{`import re\npattern = r"${pattern}"\ntext = """${testString.slice(0, 40)}..."""\nmatches = re.findall(pattern, text)`}</code>
                    </pre>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

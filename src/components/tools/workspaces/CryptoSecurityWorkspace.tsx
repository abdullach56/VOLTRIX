import React, { useState, useEffect } from 'react';
import { ToolMetadata } from '../../../types';
import { ToolHeader } from '../../common/ToolHeader';
import { BrutalButton } from '../../common/BrutalButton';
import { Badge } from '../../common/Badge';
import {
  ShieldCheck,
  Key,
  Lock,
  Binary,
  Cpu,
  Copy,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  AlertTriangle
} from 'lucide-react';

interface CryptoSecurityWorkspaceProps {
  tool: ToolMetadata;
  onBack: () => void;
}

type CryptoMode = 'hash' | 'hmac' | 'encoding' | 'jwt' | 'password' | 'uuid';

export const CryptoSecurityWorkspace: React.FC<CryptoSecurityWorkspaceProps> = ({ tool, onBack }) => {
  const [activeMode, setActiveMode] = useState<CryptoMode>('hash');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Hash State
  const [hashInput, setHashInput] = useState('VELTRIX WEB PLATFORM // 2026 HIGH-PRECISION SECURITY');
  const [sha256Hash, setSha256Hash] = useState('');
  const [sha512Hash, setSha512Hash] = useState('');
  const [sha1Hash, setSha1Hash] = useState('');
  const [sha384Hash, setSha384Hash] = useState('');

  // HMAC State
  const [hmacInput, setHmacInput] = useState('User Authentication Token Request');
  const [hmacSecret, setHmacSecret] = useState('super-secret-system-key-2026');
  const [hmacSha256, setHmacSha256] = useState('');

  // Encoding State
  const [encodingInput, setEncodingInput] = useState('Hello, Veltrix Web Platform!');
  const [encodingType, setEncodingType] = useState<'base64' | 'hex' | 'url'>('base64');
  const [encodedOutput, setEncodedOutput] = useState('');
  const [decodedOutput, setDecodedOutput] = useState('');

  // JWT State
  const [jwtInput, setJwtInput] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFiZHVscmFjaGFyb2RlIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.4zC9jSgLkWw0-pU9kYy37Lh2a2Qp7yN8L9nO0rX3e6w'
  );
  const [jwtHeader, setJwtHeader] = useState<any>(null);
  const [jwtPayload, setJwtPayload] = useState<any>(null);
  const [jwtError, setJwtError] = useState<string | null>(null);

  // Password Generator State
  const [pwdLength, setPwdLength] = useState(20);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordEntropy, setPasswordEntropy] = useState<number>(0);

  // UUID State
  const [uuidBatch, setUuidBatch] = useState<string[]>([]);
  const [uuidCount, setUuidCount] = useState(5);

  // Compute Hashes using Web Cryptography API
  useEffect(() => {
    const calculateWebCryptoHashes = async () => {
      if (!hashInput) {
        setSha256Hash('');
        setSha512Hash('');
        setSha1Hash('');
        setSha384Hash('');
        return;
      }

      const encoder = new TextEncoder();
      const data = encoder.encode(hashInput);

      const bufferToHex = (buffer: ArrayBuffer) => {
        return Array.from(new Uint8Array(buffer))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
      };

      try {
        const [h256, h512, h1, h384] = await Promise.all([
          crypto.subtle.digest('SHA-256', data),
          crypto.subtle.digest('SHA-512', data),
          crypto.subtle.digest('SHA-1', data),
          crypto.subtle.digest('SHA-384', data)
        ]);

        setSha256Hash(bufferToHex(h256));
        setSha512Hash(bufferToHex(h512));
        setSha1Hash(bufferToHex(h1));
        setSha384Hash(bufferToHex(h384));
      } catch (err) {
        console.error('Hash calculation error:', err);
      }
    };

    calculateWebCryptoHashes();
  }, [hashInput]);

  // Compute HMAC
  useEffect(() => {
    const calculateHmac = async () => {
      if (!hmacInput || !hmacSecret) {
        setHmacSha256('');
        return;
      }

      try {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(hmacSecret);
        const msgData = encoder.encode(hmacInput);

        const cryptoKey = await crypto.subtle.importKey(
          'raw',
          keyData,
          { name: 'HMAC', hash: 'SHA-256' },
          false,
          ['sign']
        );

        const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData);
        const hex = Array.from(new Uint8Array(signature))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        setHmacSha256(hex);
      } catch (e) {
        console.error('HMAC error:', e);
      }
    };

    calculateHmac();
  }, [hmacInput, hmacSecret]);

  // Compute Encoding/Decoding
  useEffect(() => {
    try {
      if (encodingType === 'base64') {
        setEncodedOutput(btoa(unescape(encodeURIComponent(encodingInput))));
        try {
          setDecodedOutput(decodeURIComponent(escape(atob(encodingInput))));
        } catch {
          setDecodedOutput('(Invalid Base64 input for decode)');
        }
      } else if (encodingType === 'hex') {
        const hex = Array.from(new TextEncoder().encode(encodingInput))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        setEncodedOutput(hex);
        try {
          const match = encodingInput.replace(/\s+/g, '').match(/.{1,2}/g);
          if (match) {
            const bytes = new Uint8Array(match.map((byte) => parseInt(byte, 16)));
            setDecodedOutput(new TextDecoder().decode(bytes));
          } else {
            setDecodedOutput('');
          }
        } catch {
          setDecodedOutput('(Invalid Hex sequence)');
        }
      } else if (encodingType === 'url') {
        setEncodedOutput(encodeURIComponent(encodingInput));
        try {
          setDecodedOutput(decodeURIComponent(encodingInput));
        } catch {
          setDecodedOutput('(Invalid URL encoding)');
        }
      }
    } catch {
      setEncodedOutput('');
    }
  }, [encodingInput, encodingType]);

  // Decode JWT
  useEffect(() => {
    if (!jwtInput.trim()) {
      setJwtHeader(null);
      setJwtPayload(null);
      setJwtError(null);
      return;
    }

    try {
      const parts = jwtInput.trim().split('.');
      if (parts.length < 2) {
        throw new Error('JWT must contain at least 2 period-delimited parts (Header.Payload)');
      }

      const parseBase64Url = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        return JSON.parse(decodeURIComponent(escape(atob(base64))));
      };

      const header = parseBase64Url(parts[0]);
      const payload = parseBase64Url(parts[1]);

      setJwtHeader(header);
      setJwtPayload(payload);
      setJwtError(null);
    } catch (err: any) {
      setJwtHeader(null);
      setJwtPayload(null);
      setJwtError(err.message || 'Invalid JWT Format');
    }
  }, [jwtInput]);

  // Generate Password
  const generateNewPassword = () => {
    let charset = '';
    if (useLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) {
      setGeneratedPassword('');
      setPasswordEntropy(0);
      return;
    }

    const randomValues = new Uint32Array(pwdLength);
    crypto.getRandomValues(randomValues);

    let result = '';
    for (let i = 0; i < pwdLength; i++) {
      result += charset[randomValues[i] % charset.length];
    }

    setGeneratedPassword(result);

    // Calculate Shannon entropy bits: length * log2(charset.length)
    const entropy = Math.round(pwdLength * Math.log2(charset.length));
    setPasswordEntropy(entropy);
  };

  useEffect(() => {
    generateNewPassword();
  }, [pwdLength, useUpper, useLower, useNumbers, useSymbols]);

  // Generate UUIDs
  const generateUuids = () => {
    const list: string[] = [];
    for (let i = 0; i < uuidCount; i++) {
      list.push(crypto.randomUUID());
    }
    setUuidBatch(list);
  };

  useEffect(() => {
    generateUuids();
  }, [uuidCount]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(`${label} copied to clipboard`);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] pb-24 selection:bg-[#CCFF00]">
      <ToolHeader tool={tool} onBack={onBack} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation Mode Selector */}
        <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-brutal mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 block">
                CRYPTO_SUITE // ENGINE_SELECT
              </span>
              <h2 className="text-xl font-black uppercase tracking-tight font-syne text-black">
                Cryptographic Sub-Systems
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'hash', label: 'SHA Hashing', icon: <Lock className="w-3.5 h-3.5" /> },
                { id: 'hmac', label: 'HMAC Signatures', icon: <Key className="w-3.5 h-3.5" /> },
                { id: 'jwt', label: 'JWT Inspector', icon: <Cpu className="w-3.5 h-3.5" /> },
                { id: 'password', label: 'Entropy Password', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
                { id: 'encoding', label: 'Base64 & Hex', icon: <Binary className="w-3.5 h-3.5" /> },
                { id: 'uuid', label: 'UUID Generator', icon: <RefreshCw className="w-3.5 h-3.5" /> }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMode(m.id as any)}
                  className={`px-3 py-2 text-xs font-syne font-bold uppercase tracking-wider border-2 border-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeMode === m.id
                      ? 'bg-[#FF5C00] text-white shadow-brutal-sm -translate-y-0.5'
                      : 'bg-[#FDFCF0] text-black hover:bg-neutral-100'
                  }`}
                >
                  {m.icon} {m.label}
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

        {/* SHA HASHING WORKSPACE */}
        {activeMode === 'hash' && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-black p-6 shadow-brutal">
              <label className="block text-xs font-mono font-bold uppercase text-black mb-2">
                Input Text Payload
              </label>
              <textarea
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                rows={4}
                className="w-full p-4 font-mono text-xs sm:text-sm bg-[#FDFCF0] border-2 border-black text-black focus:outline-none focus:bg-white resize-y"
                placeholder="Enter string or message to hash..."
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { name: 'SHA-256 Digest (Standard)', hash: sha256Hash, color: 'border-l-4 border-l-[#2E5BFF]' },
                { name: 'SHA-512 Digest (High Security)', hash: sha512Hash, color: 'border-l-4 border-l-[#FF5C00]' },
                { name: 'SHA-384 Digest', hash: sha384Hash, color: 'border-l-4 border-l-[#005F69]' },
                { name: 'SHA-1 Digest (Legacy Reference)', hash: sha1Hash, color: 'border-l-4 border-l-neutral-600' }
              ].map((item, idx) => (
                <div key={idx} className={`bg-white border-2 border-black p-4 shadow-brutal-sm ${item.color}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-syne font-black text-xs uppercase text-black">
                      {item.name}
                    </span>
                    <button
                      onClick={() => copyToClipboard(item.hash, item.name)}
                      className="px-2 py-1 bg-[#FDFCF0] border border-black text-[10px] font-mono font-bold uppercase hover:bg-[#CCFF00] flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                  <div className="p-3 bg-[#FDFCF0] border border-black font-mono text-xs break-all text-neutral-900 select-all">
                    {item.hash || 'Computing...'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HMAC WORKSPACE */}
        {activeMode === 'hmac' && (
          <div className="bg-white border-2 border-black p-6 shadow-brutal space-y-6">
            <div className="border-b-2 border-black pb-3">
              <h3 className="font-syne font-black text-lg uppercase text-black">
                HMAC-SHA256 Keyed Hash Signature
              </h3>
              <p className="text-xs text-neutral-600 font-medium">
                Cryptographic authentication signature calculated with browser WebCrypto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-black mb-2">
                  Message String
                </label>
                <textarea
                  value={hmacInput}
                  onChange={(e) => setHmacInput(e.target.value)}
                  rows={4}
                  className="w-full p-3 font-mono text-xs bg-[#FDFCF0] border-2 border-black focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-black mb-2">
                  Secret Key
                </label>
                <input
                  type="text"
                  value={hmacSecret}
                  onChange={(e) => setHmacSecret(e.target.value)}
                  className="w-full p-3 font-mono text-xs bg-[#FDFCF0] border-2 border-black focus:outline-none focus:bg-white"
                  placeholder="Enter secret key..."
                />
                <div className="mt-3 p-3 bg-neutral-100 border border-black text-[11px] font-mono text-neutral-700">
                  Algorithm: HMAC (SHA-256 Digest)
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#FDFCF0] border-2 border-black">
              <div className="flex items-center justify-between mb-2">
                <span className="font-syne font-bold uppercase text-xs text-black">
                  Calculated HMAC-SHA256 Hex Digest
                </span>
                <BrutalButton
                  variant="primary"
                  size="sm"
                  icon={<Copy className="w-3 h-3" />}
                  onClick={() => copyToClipboard(hmacSha256, 'HMAC')}
                >
                  Copy HMAC
                </BrutalButton>
              </div>
              <div className="p-3 bg-black text-[#CCFF00] font-mono text-xs sm:text-sm break-all">
                {hmacSha256}
              </div>
            </div>
          </div>
        )}

        {/* JWT WORKSPACE */}
        {activeMode === 'jwt' && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-black p-6 shadow-brutal">
              <label className="block text-xs font-mono font-bold uppercase text-black mb-2">
                Encoded JWT Token
              </label>
              <textarea
                value={jwtInput}
                onChange={(e) => setJwtInput(e.target.value)}
                rows={3}
                className="w-full p-3 font-mono text-xs bg-[#FDFCF0] border-2 border-black focus:outline-none focus:bg-white break-all"
                placeholder="Paste Bearer JWT token here..."
              />
            </div>

            {jwtError ? (
              <div className="p-4 bg-white border-2 border-black shadow-brutal flex items-center gap-2 text-red-600 text-xs font-bold uppercase">
                <AlertTriangle className="w-4 h-4" />
                <span>{jwtError}</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Header */}
                <div className="bg-white border-2 border-black p-6 shadow-brutal">
                  <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                    <span className="font-syne font-black text-xs uppercase text-[#2E5BFF]">
                      1. Header (Algorithm & Token Type)
                    </span>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(jwtHeader, null, 2), 'JWT Header')}
                      className="text-[10px] font-mono font-bold uppercase hover:underline cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="p-4 bg-[#FDFCF0] border border-black font-mono text-xs overflow-x-auto text-black">
                    <code>{JSON.stringify(jwtHeader, null, 2)}</code>
                  </pre>
                </div>

                {/* Payload */}
                <div className="bg-white border-2 border-black p-6 shadow-brutal">
                  <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                    <span className="font-syne font-black text-xs uppercase text-[#FF5C00]">
                      2. Payload Claims Data
                    </span>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(jwtPayload, null, 2), 'JWT Payload')}
                      className="text-[10px] font-mono font-bold uppercase hover:underline cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="p-4 bg-[#FDFCF0] border border-black font-mono text-xs overflow-x-auto text-black">
                    <code>{JSON.stringify(jwtPayload, null, 2)}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PASSWORD ENTROPY WORKSPACE */}
        {activeMode === 'password' && (
          <div className="bg-white border-2 border-black p-6 sm:p-8 shadow-brutal space-y-6">
            <div className="border-b-2 border-black pb-3">
              <h3 className="font-syne font-black text-lg uppercase text-black">
                Cryptographically Secure Password & Entropy Engine
              </h3>
              <p className="text-xs text-neutral-600 font-medium">
                Generated using hardware-random bytes from <code>crypto.getRandomValues</code>.
              </p>
            </div>

            {/* Generated Password Result Display */}
            <div className="p-4 bg-[#FDFCF0] border-2 border-black space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase text-neutral-600">
                  GENERATED PASSWORD
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 border border-black ${
                    passwordEntropy > 80 ? 'bg-[#CCFF00] text-black' : 'bg-[#FF5C00] text-white'
                  }`}>
                    {passwordEntropy} BITS ENTROPY ({passwordEntropy > 80 ? 'VERY STRONG' : 'MODERATE'})
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white border-2 border-black font-mono text-base sm:text-xl font-bold tracking-wider break-all text-black flex items-center justify-between gap-4">
                <span>{generatedPassword}</span>
                <button
                  onClick={() => copyToClipboard(generatedPassword, 'Password')}
                  className="p-2 bg-[#CCFF00] border-2 border-black shadow-brutal-sm hover:bg-white transition-colors cursor-pointer shrink-0"
                  title="Copy Password"
                >
                  <Copy className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-black mb-1">
                  Length: {pwdLength} Characters
                </label>
                <input
                  type="range"
                  min="8"
                  max="64"
                  value={pwdLength}
                  onChange={(e) => setPwdLength(parseInt(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-syne font-bold uppercase text-black p-3 bg-[#FDFCF0] border border-black cursor-pointer">
                <input
                  type="checkbox"
                  checked={useUpper}
                  onChange={(e) => setUseUpper(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                Uppercase (A-Z)
              </label>

              <label className="flex items-center gap-2 text-xs font-syne font-bold uppercase text-black p-3 bg-[#FDFCF0] border border-black cursor-pointer">
                <input
                  type="checkbox"
                  checked={useNumbers}
                  onChange={(e) => setUseNumbers(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                Numbers (0-9)
              </label>

              <label className="flex items-center gap-2 text-xs font-syne font-bold uppercase text-black p-3 bg-[#FDFCF0] border border-black cursor-pointer">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={(e) => setUseSymbols(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                Symbols (!@#$)
              </label>
            </div>

            <div className="flex justify-end pt-2">
              <BrutalButton
                variant="primary"
                size="sm"
                icon={<RefreshCw className="w-3.5 h-3.5" />}
                onClick={generateNewPassword}
              >
                Regenerate Token
              </BrutalButton>
            </div>
          </div>
        )}

        {/* ENCODING WORKSPACE */}
        {activeMode === 'encoding' && (
          <div className="bg-white border-2 border-black p-6 shadow-brutal space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-3">
              <h3 className="font-syne font-black text-lg uppercase text-black">
                Text & Binary Encoder / Decoder
              </h3>
              <div className="flex gap-2">
                {(['base64', 'hex', 'url'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setEncodingType(fmt)}
                    className={`px-3 py-1 text-xs font-syne font-bold uppercase border border-black cursor-pointer ${
                      encodingType === fmt ? 'bg-black text-white' : 'bg-[#FDFCF0] text-black'
                    }`}
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-black mb-2">
                  Input String
                </label>
                <textarea
                  value={encodingInput}
                  onChange={(e) => setEncodingInput(e.target.value)}
                  rows={6}
                  className="w-full p-3 font-mono text-xs bg-[#FDFCF0] border-2 border-black focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono font-bold uppercase text-black">
                    Encoded ({encodingType.toUpperCase()})
                  </label>
                  <button
                    onClick={() => copyToClipboard(encodedOutput, 'Encoded string')}
                    className="text-[10px] font-mono font-bold uppercase hover:underline cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
                <textarea
                  value={encodedOutput}
                  readOnly
                  rows={6}
                  className="w-full p-3 font-mono text-xs bg-[#FDFCF0] border-2 border-black text-black"
                />
              </div>
            </div>
          </div>
        )}

        {/* UUID WORKSPACE */}
        {activeMode === 'uuid' && (
          <div className="bg-white border-2 border-black p-6 shadow-brutal space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-3">
              <div>
                <h3 className="font-syne font-black text-lg uppercase text-black">
                  Cryptographic UUID v4 Generator
                </h3>
                <p className="text-xs text-neutral-600 font-medium">
                  Compliant with RFC 4122 standard utilizing native browser crypto.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={uuidCount}
                  onChange={(e) => setUuidCount(parseInt(e.target.value))}
                  className="px-3 py-1.5 bg-[#FDFCF0] border-2 border-black text-xs font-bold font-mono"
                >
                  <option value={1}>1 UUID</option>
                  <option value={5}>5 UUIDs</option>
                  <option value={10}>10 UUIDs</option>
                  <option value={25}>25 UUIDs</option>
                </select>
                <BrutalButton
                  variant="primary"
                  size="sm"
                  icon={<RefreshCw className="w-3.5 h-3.5" />}
                  onClick={generateUuids}
                >
                  Generate Batch
                </BrutalButton>
              </div>
            </div>

            <div className="space-y-2">
              {uuidBatch.map((u, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#FDFCF0] border border-black flex items-center justify-between font-mono text-xs"
                >
                  <span className="font-bold text-black">{u}</span>
                  <button
                    onClick={() => copyToClipboard(u, 'UUID')}
                    className="px-2 py-1 bg-white border border-black text-[10px] uppercase font-bold hover:bg-[#CCFF00] cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <BrutalButton
                variant="outline"
                size="sm"
                icon={<Copy className="w-3.5 h-3.5" />}
                onClick={() => copyToClipboard(uuidBatch.join('\n'), 'UUID Batch')}
              >
                Copy All ({uuidBatch.length}) to Clipboard
              </BrutalButton>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

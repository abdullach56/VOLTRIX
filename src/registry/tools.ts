import { ToolMetadata } from '../types';

export const TOOLS_REGISTRY: ToolMetadata[] = [
  {
    id: 'document-scanner',
    name: 'Document Scanner & PDF Studio',
    shortName: 'Doc Scanner',
    tagline: 'High-precision browser camera capture, enhancement filters, & multi-page PDF generation',
    description: 'Capture documents directly through your webcam or upload existing scans. Apply high-contrast B&W, color enhancement, and edge adjustments, organize multi-page batches, and export pristine PDF files entirely client-side.',
    category: 'documents',
    badge: 'Featured',
    accentColor: '#CCFF00', // Acid Lime
    iconName: 'ScanLine',
    isClientSideOnly: true,
    popular: true,
    guideSteps: [
      'Grant camera permission to stream your webcam, or drag-and-drop existing document photos.',
      'Align your paper document inside the viewport and click "Capture Page".',
      'Select an enhancement filter (Magic Clean, High Contrast B&W, Grayscale, or Vivid).',
      'Capture additional pages if needed, reorder them, or rotate any orientation.',
      'Click "Compile & Download PDF" to instantly generate a standardized multi-page PDF locally.'
    ],
    limitations: [
      'Camera feed requires HTTPS and browser camera access authorization.',
      'All image processing and PDF compilation executes in your local browser memory (zero server uploads).'
    ]
  },
  {
    id: 'json-studio',
    name: 'JSON Studio & Validator',
    shortName: 'JSON Studio',
    tagline: 'Format, validate, minify, explore trees, and generate TypeScript interfaces',
    description: 'A comprehensive JSON workbench. Detects precise line & column syntax errors, beautifies or minifies payloads, exposes interactive collapsible node trees, and converts JSON models directly into TypeScript type definitions.',
    category: 'developer',
    badge: 'Core Engine',
    accentColor: '#2E5BFF', // Electric Cobalt
    iconName: 'Braces',
    isClientSideOnly: true,
    popular: true,
    guideSteps: [
      'Paste your raw JSON payload into the input editor or load sample payloads.',
      'View real-time syntax validation status and exact error positions if parsing fails.',
      'Use action controls to Beautify (2 or 4 spaces) or Minify into a single line.',
      'Switch between Raw Code view, Collapsible Interactive Tree view, and TypeScript Interface generator.',
      'Copy transformed output or download as a .json / .ts file.'
    ],
    limitations: [
      'Handles large payloads up to browser RAM limits smoothly without background network calls.'
    ]
  },
  {
    id: 'crypto-security-lab',
    name: 'Crypto & Hash Security Lab',
    shortName: 'Crypto Lab',
    tagline: 'Web Crypto SHA hashing, HMAC signatures, JWT inspection, & entropy password generator',
    description: 'Real-time cryptographic operations powered by the standard W3C Web Cryptography API. Calculate SHA-256, SHA-512, SHA-1, and MD5 hashes, generate HMAC signatures with custom secret keys, inspect & decode JWT structures, and audit password entropy.',
    category: 'security',
    accentColor: '#FF5C00', // Radiant Persimmon
    iconName: 'ShieldCheck',
    isClientSideOnly: true,
    popular: true,
    guideSteps: [
      'Select your desired cryptographic tool mode (Hashing, HMAC, Base64/Hex, JWT Inspector, or Password Entropy).',
      'Provide your input text or message payload.',
      'Optionally supply secret keys or choose salt parameters for HMAC operations.',
      'Examine the computed cryptographic digest, entropy score, or decoded JWT claims.',
      'Click copy to quickly transfer verified digests to your clipboard.'
    ],
    limitations: [
      'All cryptographic operations use local browser Web Crypto APIs — secrets are never transmitted.'
    ]
  },
  {
    id: 'regex-precision-lab',
    name: 'Regex Precision Lab',
    shortName: 'Regex Lab',
    tagline: 'Real-time regular expression tester with capture group inspector & multi-language code export',
    description: 'Craft and validate regular expressions against test strings with live visual match highlighting, capture group extraction, replacement dry-runs, flag toggles, and instant code generation for JavaScript, Python, and Go.',
    category: 'developer',
    accentColor: '#005F69', // Deep Teal
    iconName: 'Regex',
    isClientSideOnly: true,
    popular: false,
    guideSteps: [
      'Enter your regular expression pattern in the expression bar.',
      'Toggle active regex flags (Global, Case-Insensitive, Multiline, DotAll, Unicode).',
      'Input test text into the sandbox area to view live highlighted matches.',
      'Inspect detailed capture group tables with start/end index offsets.',
      'Test replacement templates or export ready-to-use code snippets in JS, Python, or Go.'
    ],
    limitations: [
      'Regular expressions execute under standard JavaScript RegExp engine rules.'
    ]
  },
  {
    id: 'svg-image-studio',
    name: 'SVG & Image Optimizer Studio',
    shortName: 'Image Studio',
    tagline: 'SVG vector minification, format transcode (PNG/WebP/JPEG/AVIF), & canvas compression',
    description: 'Optimize SVG vector markup, remove unnecessary metadata, and render vector files into high-resolution raster images. Convert images across PNG, JPEG, and WebP formats with interactive compression and dimension scaling.',
    category: 'media',
    accentColor: '#FF5C00', // Persimmon
    iconName: 'Image',
    isClientSideOnly: true,
    popular: false,
    guideSteps: [
      'Paste raw SVG code or upload an image file (PNG, JPG, SVG, WebP).',
      'Review real-time live preview and file footprint metrics.',
      'For SVGs: Minify markup, clean attributes, or render directly to PNG at custom scale factors.',
      'For Bitmaps: Choose target format (WebP, PNG, JPEG), adjust quality slider, or rescale dimensions.',
      'Download the processed asset directly to your device.'
    ],
    limitations: [
      'Processing takes place on an off-screen HTML5 Canvas. Max image dimensions subject to browser hardware.'
    ]
  },
  {
    id: 'color-synthesizer',
    name: 'Color & Contrast Synthesizer',
    shortName: 'Color Studio',
    tagline: 'WCAG 2.1 AA/AAA accessibility audit, color space converter, & brutalist palette generator',
    description: 'Design mathematically sound color palettes with strict accessibility guarantees. Calculate WCAG 2.1 contrast ratios for text and UI elements, convert values across HEX, RGB, HSL, and OKLCH, and export Tailwind/CSS configurations.',
    category: 'design',
    accentColor: '#CCFF00', // Acid Lime
    iconName: 'Palette',
    isClientSideOnly: true,
    popular: false,
    guideSteps: [
      'Input background and foreground color values using color pickers or hex inputs.',
      'Evaluate live WCAG AA and AAA pass/fail metrics for normal text, large headings, and graphical components.',
      'Generate complementary, triadic, or brutalist palette sets with one click.',
      'Convert values across HEX, RGB, HSL, and OKLCH color spaces.',
      'Export the palette code directly as CSS variables or a Tailwind CSS configuration object.'
    ],
    limitations: [
      'Contrast equations strictly follow W3C WCAG 2.1 relative luminance standards.'
    ]
  },
  {
    id: 'markdown-editorial',
    name: 'Markdown & Editorial Studio',
    shortName: 'Markdown Studio',
    tagline: 'Live split-pane markdown workspace with table helpers, word analytics, & clean HTML export',
    description: 'An uncluttered, distraction-free markdown editing environment. Features synchronous side-by-side preview, reading time calculators, quick formatting toolbar, table scaffolding tools, and raw HTML / Markdown exports.',
    category: 'documents',
    accentColor: '#2E5BFF', // Cobalt
    iconName: 'FileText',
    isClientSideOnly: true,
    popular: false,
    guideSteps: [
      'Type or paste Markdown content in the editor on the left pane.',
      'Use the quick toolbar to insert headings, blockquotes, tables, code blocks, or checklists.',
      'View formatted output updated in real-time on the right preview pane.',
      'Check live reading time, word count, character count, and paragraph metrics.',
      'Export the finished document as rendered HTML, raw Markdown (.md), or print to PDF.'
    ],
    limitations: [
      'Fully client-side with automatic session scratchpad recovery.'
    ]
  }
];

export const DEVELOPER_PROFILE: {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  skills: string[];
  interests: string[];
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
} = {
  name: 'Abdullah Charoliya',
  role: 'Creator & Lead Architect',
  tagline: 'Engineering high-performance web systems and browser-first utility software.',
  bio: 'Passionate about building fast, private, and deterministic web tools that eliminate cloud dependency. Focused on modern web standards, client-side cryptographic and document engines, and unapologetic digital brutalist design systems.',
  skills: [
    'TypeScript & Modern JavaScript',
    'Browser Web APIs & WebCrypto',
    'HTML5 Canvas & Document Engines',
    'Client-Side Architecture',
    'Design Systems & Digital Brutalism',
    'Performance Optimization & WebAssembly'
  ],
  interests: [
    'Privacy-preserving web tools',
    'High-efficiency offline computing',
    'Brutalist and Swiss editorial UI',
    'System-level browser capabilities'
  ],
  socialLinks: {
    // Obvious configuration placeholders - easily populated by the developer
    github: 'https://github.com/abdullach56',
    linkedin: 'https://www.linkedin.com/in/abdulla-charoliya-b67219397',
    twitter: 'https://x.com/AbdullaCha96154',
    instagram: ''
  }
};

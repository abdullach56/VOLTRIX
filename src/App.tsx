import React, { useState, useEffect } from 'react';
import { PageRoute, ToolMetadata } from './types';
import { TOOLS_REGISTRY } from './registry/tools';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/pages/LandingPage';
import { ToolsCatalogPage } from './components/pages/ToolsCatalogPage';
import { FeaturesPage } from './components/pages/FeaturesPage';
import { ResourcesPage } from './components/pages/ResourcesPage';
import { DeveloperPage } from './components/pages/DeveloperPage';
import { AboutPage } from './components/pages/AboutPage';

// Workspaces
import { DocumentScannerWorkspace } from './components/tools/workspaces/DocumentScannerWorkspace';
import { JsonStudioWorkspace } from './components/tools/workspaces/JsonStudioWorkspace';
import { CryptoSecurityWorkspace } from './components/tools/workspaces/CryptoSecurityWorkspace';
import { RegexPrecisionWorkspace } from './components/tools/workspaces/RegexPrecisionWorkspace';
import { SvgImageStudioWorkspace } from './components/tools/workspaces/SvgImageStudioWorkspace';
import { ColorSynthesizerWorkspace } from './components/tools/workspaces/ColorSynthesizerWorkspace';
import { MarkdownEditorialWorkspace } from './components/tools/workspaces/MarkdownEditorialWorkspace';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  // Sync with browser hash on load and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash || hash === '/' || hash === 'home') {
        setCurrentRoute('home');
        setActiveToolId(null);
      } else if (hash.startsWith('tools/')) {
        const toolId = hash.replace('tools/', '');
        const tool = TOOLS_REGISTRY.find((t) => t.id === toolId);
        if (tool) {
          setCurrentRoute('tool-workspace');
          setActiveToolId(tool.id);
        } else {
          setCurrentRoute('tools');
          setActiveToolId(null);
        }
      } else if (hash === 'tools') {
        setCurrentRoute('tools');
        setActiveToolId(null);
      } else if (hash === 'features') {
        setCurrentRoute('features');
        setActiveToolId(null);
      } else if (hash === 'resources') {
        setCurrentRoute('resources');
        setActiveToolId(null);
      } else if (hash === 'developer') {
        setCurrentRoute('developer');
        setActiveToolId(null);
      } else if (hash === 'about') {
        setCurrentRoute('about');
        setActiveToolId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    setActiveToolId(null);
    window.location.hash = route === 'home' ? '' : route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openTool = (toolId: string) => {
    setActiveToolId(toolId);
    setCurrentRoute('tool-workspace');
    window.location.hash = `tools/${toolId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeTool = TOOLS_REGISTRY.find((t) => t.id === activeToolId);

  const renderToolWorkspace = () => {
    if (!activeTool) {
      return <ToolsCatalogPage onOpenTool={openTool} />;
    }

    switch (activeTool.id) {
      case 'document-scanner':
        return <DocumentScannerWorkspace tool={activeTool} onBack={() => navigateTo('tools')} />;
      case 'json-studio':
        return <JsonStudioWorkspace tool={activeTool} onBack={() => navigateTo('tools')} />;
      case 'crypto-security-lab':
        return <CryptoSecurityWorkspace tool={activeTool} onBack={() => navigateTo('tools')} />;
      case 'regex-precision-lab':
        return <RegexPrecisionWorkspace tool={activeTool} onBack={() => navigateTo('tools')} />;
      case 'svg-image-studio':
        return <SvgImageStudioWorkspace tool={activeTool} onBack={() => navigateTo('tools')} />;
      case 'color-synthesizer':
        return <ColorSynthesizerWorkspace tool={activeTool} onBack={() => navigateTo('tools')} />;
      case 'markdown-editorial':
        return <MarkdownEditorialWorkspace tool={activeTool} onBack={() => navigateTo('tools')} />;
      default:
        return <ToolsCatalogPage onOpenTool={openTool} />;
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-[#FDFCF0] text-[#000000] selection:bg-[#CCFF00] selection:text-black">
      {/* Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenTool={openTool}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full">
        {currentRoute === 'home' && (
          <LandingPage onNavigate={navigateTo} onOpenTool={openTool} />
        )}

        {currentRoute === 'tools' && (
          <ToolsCatalogPage onOpenTool={openTool} />
        )}

        {currentRoute === 'tool-workspace' && renderToolWorkspace()}

        {currentRoute === 'features' && (
          <FeaturesPage onNavigate={navigateTo} onOpenTool={openTool} />
        )}

        {currentRoute === 'resources' && (
          <ResourcesPage onNavigate={navigateTo} onOpenTool={openTool} />
        )}

        {currentRoute === 'developer' && (
          <DeveloperPage />
        )}

        {currentRoute === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} onOpenTool={openTool} />
    </div>
  );
}

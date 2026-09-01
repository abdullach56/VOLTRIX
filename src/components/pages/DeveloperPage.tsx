import React from 'react';
import { SEO } from '../common/SEO';
import { DEVELOPER_PROFILE } from '../../registry/tools';
import { Badge } from '../common/Badge';
import { BrutalCard } from '../common/BrutalCard';
import { BrutalButton } from '../common/BrutalButton';
import {
  Code,
  Globe,
  Terminal,
  Cpu,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ExternalLink,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

export const DeveloperPage: React.FC = () => {
  const profile = DEVELOPER_PROFILE;

  const socialConfigs = [
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      url: profile.socialLinks.github,
      placeholder: 'github.com/abdullahcharoliya',
      color: 'bg-black text-white'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: profile.socialLinks.linkedin,
      placeholder: 'linkedin.com/in/abdullahcharoliya',
      color: 'bg-[#2E5BFF] text-white'
    },
    {
      name: 'Twitter / X',
      icon: <Twitter className="w-5 h-5" />,
      url: profile.socialLinks.twitter,
      placeholder: 'x.com/abdullahcharoliya',
      color: 'bg-[#FF5C00] text-white'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      url: profile.socialLinks.instagram,
      placeholder: 'instagram.com/abdullahcharoliya',
      color: 'bg-[#CCFF00] text-black'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF0] py-12 sm:py-16 selection:bg-[#CCFF00]">
      <SEO
        title="Abdullah Charoliya — Developer & Architect | VELTRIX"
        description="Meet Abdullah Charoliya, creator of VELTRIX. Full-stack engineer specializing in browser Web APIs, client-side cryptography, HTML5 Canvas engines, and digital brutalist design systems."
        keywords="Abdullah Charoliya, web developer, full stack engineer, browser APIs, WebCrypto developer, client-side architecture, digital brutalism, TypeScript developer"
        urlPath="/#developer"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Badge */}
        <div className="flex items-center gap-3 mb-8">
          <Badge variant="cobalt">DEVELOPER PROFILE</Badge>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600">
            SYSTEM ARCHITECT & CREATOR
          </span>
        </div>

        {/* Master Developer Dossier Card */}
        <div className="bg-white border-2 border-black shadow-brutal-xl overflow-hidden mb-12">
          {/* Accent Ribbon */}
          <div className="h-4 bg-[#FF5C00] border-b-2 border-black"></div>

          <div className="p-8 sm:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Avatar & Key Metadata (Col 1-4) */}
              <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                {/* Neo-brutalist Portrait Frame */}
                <div className="relative mb-6">
                  <div className="w-44 h-44 sm:w-52 sm:h-52 bg-[#CCFF00] border-3 border-black shadow-brutal flex flex-col items-center justify-center p-4 relative group">
                    {/* Stylized Avatar Graphic */}
                    <div className="w-32 h-32 bg-white border-2 border-black flex flex-col items-center justify-center shadow-brutal-sm">
                      <span className="font-syne font-black text-5xl text-[#2E5BFF]">
                        A
                      </span>
                      <span className="text-[9px] font-mono font-bold uppercase bg-black text-white px-1.5 py-0.5 mt-2">
                        LEAD_DEV
                      </span>
                    </div>

                    {/* Corner Tag */}
                    <div className="absolute -bottom-3 -right-3 bg-[#FF5C00] text-white text-[10px] font-mono font-bold px-2 py-1 border-2 border-black shadow-brutal-sm">
                      DEV_ID #001
                    </div>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-syne text-black">
                  {profile.name}
                </h1>
                <span className="text-xs font-bold uppercase tracking-widest text-[#2E5BFF] mt-1 font-mono">
                  {profile.role}
                </span>

                <p className="text-xs text-neutral-700 font-medium mt-4 leading-relaxed max-w-sm">
                  {profile.tagline}
                </p>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="text-[10px] font-mono font-bold uppercase bg-[#005F69] text-white px-2 py-1 border border-black">
                    ARCHITECT
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase bg-[#CCFF00] text-black px-2 py-1 border border-black">
                    FULL-STACK
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase bg-[#FDFCF0] text-black px-2 py-1 border border-black">
                    CLIENT-FIRST
                  </span>
                </div>
              </div>

              {/* Biography & Skills (Col 5-12) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Bio Block */}
                <div className="p-6 bg-[#FDFCF0] border-2 border-black shadow-brutal-sm">
                  <h3 className="font-syne font-black text-sm uppercase tracking-wider text-black mb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#FF5C00] inline-block"></span>
                    Engineering Philosophy
                  </h3>
                  <p className="text-sm text-neutral-800 font-medium leading-relaxed">
                    {profile.bio}
                  </p>
                </div>

                {/* Technical Competencies */}
                <div>
                  <h3 className="font-syne font-black text-base uppercase tracking-wider text-black mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-[#2E5BFF]" /> Technical Core Competencies
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {profile.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white border-2 border-black flex items-center gap-3 shadow-brutal-sm"
                      >
                        <span className="w-2 h-2 bg-[#2E5BFF]"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-black">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Areas of Interest */}
                <div>
                  <h3 className="font-syne font-black text-base uppercase tracking-wider text-black mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#005F69]" /> Specialized Focus Areas
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {profile.interests.map((interest, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white border-2 border-black flex items-center gap-3 shadow-brutal-sm"
                      >
                        <span className="w-2 h-2 bg-[#CCFF00]"></span>
                        <span className="text-xs font-semibold text-neutral-800">
                          {interest}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Profiles & Configuration Placeholders */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-syne font-black text-base uppercase tracking-wider text-black flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#FF5C00]" /> Professional Channels
                    </h3>
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-500">
                      PLACEHOLDER LINKS CONFIGURED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {socialConfigs.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border-2 border-black shadow-brutal-sm flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 border-2 border-black ${item.color} shadow-brutal-sm`}>
                            {item.icon}
                          </div>
                          <div>
                            <span className="text-xs font-black uppercase font-syne block text-black">
                              {item.name}
                            </span>
                            <span className="text-[11px] font-mono text-neutral-500">
                              {item.url || item.placeholder}
                            </span>
                          </div>
                        </div>

                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-[#CCFF00] border-2 border-black hover:bg-white transition-colors cursor-pointer"
                            title={`Open ${item.name}`}
                          >
                            <ExternalLink className="w-4 h-4 text-black" />
                          </a>
                        ) : (
                          <span
                            className="text-[9px] font-mono font-bold uppercase bg-neutral-100 text-neutral-600 px-2 py-1 border border-neutral-300"
                            title="Insert URL in registry/tools.ts"
                          >
                            CONFIG
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] font-mono text-neutral-500 mt-2">
                    * Note: Profile URLs are intentionally mapped to clean configuration placeholders ready for direct linking.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

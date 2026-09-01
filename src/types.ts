export type ToolCategory = 
  | 'documents'
  | 'developer'
  | 'security'
  | 'media'
  | 'design';

export interface ToolMetadata {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  badge?: string;
  accentColor: string; // e.g. '#2E5BFF' (Cobalt), '#FF5C00' (Persimmon), '#CCFF00' (Lime), '#005F69' (Teal)
  iconName: string;
  isClientSideOnly: boolean;
  guideSteps: string[];
  limitations?: string[];
  popular?: boolean;
}

export type PageRoute = 
  | 'home'
  | 'tools'
  | 'tool-workspace'
  | 'features'
  | 'resources'
  | 'developer'
  | 'about';

export interface DeveloperProfile {
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
}

import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  urlPath?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = 'VELTRIX, web utilities, document scanner, developer tools, local runtime, client-side',
  urlPath = '',
  image = 'https://veltrix.netlify.app/og-image.png'
}) => {
  const canonicalUrl = `https://veltrix.netlify.app${urlPath}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to update or create meta tags
    const updateMetaTag = (selector: string, attribute: string, value: string, createAttrKey: string, createAttrValue: string) => {
      let element = document.querySelector(`meta[${selector}]`);
      if (element) {
        element.setAttribute(attribute, value);
      } else {
        element = document.createElement('meta');
        element.setAttribute(createAttrKey, createAttrValue);
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
    };

    // 3. Update Standard Meta
    updateMetaTag('name="description"', 'content', description, 'name', 'description');
    updateMetaTag('name="keywords"', 'content', keywords, 'name', 'keywords');

    // 4. Update Open Graph (OG) Tags
    updateMetaTag('property="og:title"', 'content', title, 'property', 'og:title');
    updateMetaTag('property="og:description"', 'content', description, 'property', 'og:description');
    updateMetaTag('property="og:url"', 'content', canonicalUrl, 'property', 'og:url');
    updateMetaTag('property="og:image"', 'content', image, 'property', 'og:image');
    updateMetaTag('property="og:type"', 'content', 'website', 'property', 'og:type');

    // 5. Update Twitter Card Tags
    updateMetaTag('name="twitter:card"', 'content', 'summary_large_image', 'name', 'twitter:card');
    updateMetaTag('name="twitter:title"', 'content', title, 'name', 'twitter:title');
    updateMetaTag('name="twitter:description"', 'content', description, 'name', 'twitter:description');
    updateMetaTag('name="twitter:image"', 'content', image, 'name', 'twitter:image');

    // 6. Update Canonical Link
    let linkElement = document.querySelector('link[rel="canonical"]');
    if (linkElement) {
      linkElement.setAttribute('href', canonicalUrl);
    } else {
      linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'canonical');
      linkElement.setAttribute('href', canonicalUrl);
      document.head.appendChild(linkElement);
    }

  }, [title, description, keywords, canonicalUrl, image]);

  return null;
};

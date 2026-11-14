import { useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  structuredData?: Record<string, unknown>;
}

function setMetaTag(selector: string, attrName: string, attrValue: string, content: string) {
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function SeoHead({ title, description, canonicalPath, structuredData }: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    const baseOrigin =
      siteConfig.seo.siteUrl || (typeof window !== 'undefined' ? window.location.origin : '');
    const currentPath =
      canonicalPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const canonicalUrl = `${baseOrigin}${currentPath}`;

    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    const scriptId = 'railpower-jsonld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;

    const defaultOrganizationSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.brand.name,
      url: baseOrigin,
      description: siteConfig.seo.defaultDescription,
    };

    const jsonPayload = structuredData || defaultOrganizationSchema;

    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(jsonPayload);
  }, [title, description, canonicalPath, structuredData]);

  return null;
}

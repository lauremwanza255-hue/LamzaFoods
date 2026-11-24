import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { indexingEnabled } from '@/lib/config';

/** Staging and preview deployments stay out of search indexes unless SITE_INDEXING=true. */
export default function robots(): MetadataRoute.Robots {
  if (!indexingEnabled) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/', disallow: ['/api/'] }, sitemap: `${site.url}/sitemap.xml`, host: site.url };
}

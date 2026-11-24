import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { categories, products } from '@/data/products';
import { markets } from '@/data/markets';
import { articles } from '@/data/news';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    '', '/about', '/products', '/our-process', '/markets', '/news', '/contact', '/become-a-partner', '/request-a-quote',
    '/partners', '/careers', '/food-safety', '/certifications', '/faqs', '/documents', '/privacy-policy', '/terms-of-use',
  ];
  return [
    ...staticPaths.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${site.url}/products/category/${c.slug}`, lastModified: now, priority: 0.6 })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}`, lastModified: now, priority: 0.8 })),
    ...markets.map((m) => ({ url: `${site.url}/markets/${m.slug}`, lastModified: now, priority: 0.6 })),
    ...articles.filter((a) => a.status === 'published').map((a) => ({ url: `${site.url}/news/${a.slug}`, lastModified: new Date(a.publishedAt), priority: 0.5 })),
  ];
}

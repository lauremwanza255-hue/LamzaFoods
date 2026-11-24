import type { Metadata } from 'next';
import { site } from '@/data/site';
import { indexingEnabled } from '@/lib/config';

export function pageMetadata({
  title,
  description,
  path,
  image = '/images/og/lamza-foods-og.jpg',
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type,
      locale: 'en_CA',
      images: [{ url: image, width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    robots: indexingEnabled ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export function organizationJsonLd() {
  const sameAs = site.social.map((s) => s.url).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/logo-primary.png`,
    slogan: site.tagline,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

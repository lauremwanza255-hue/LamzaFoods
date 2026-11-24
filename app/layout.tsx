import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/ui/JsonLd';
import { site } from '@/data/site';
import { indexingEnabled } from '@/lib/config';
import { organizationJsonLd } from '@/lib/seo';
import { hindSiliguri, libreBaskerville } from './fonts';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Lamza Foods | Authentic African Food Products & Global Supply',
    template: '%s | Lamza Foods',
  },
  description:
    'Lamza Foods connects African food producers with retailers, wholesalers and consumers through authentic African food products, responsible sourcing and business partnerships.',
  applicationName: site.name,
  robots: indexingEnabled ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    siteName: site.name,
    type: 'website',
    locale: 'en_CA',
    images: [{ url: '/images/og/lamza-foods-og.jpg', width: 1200, height: 630, alt: site.name }],
  },
};

export const viewport: Viewport = {
  themeColor: '#1A2453',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${hindSiliguri.variable} ${libreBaskerville.variable}`}>
      <body>
        <a
          href="#main"
          className="btn btn-primary fixed left-3 top-3 z-[100] -translate-y-[150%] focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}

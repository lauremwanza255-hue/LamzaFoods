import type { Metadata } from 'next';
import { HeroSection } from '@/components/homepage/HeroSection';
import { TrustBar } from '@/components/homepage/TrustBar';
import { FeaturedProducts } from '@/components/homepage/FeaturedProducts';
import { AboutSection } from '@/components/homepage/AboutSection';
import { BenefitsSection } from '@/components/homepage/BenefitsSection';
import { PartnershipBanner } from '@/components/homepage/PartnershipBanner';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Lamza Foods | Authentic African Food Products & Global Supply',
    description:
      'Lamza Foods connects African food producers with retailers, wholesalers and consumers through authentic African food products, responsible sourcing and business partnerships.',
    path: '/',
  }),
  title: { absolute: 'Lamza Foods | Authentic African Food Products & Global Supply' },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeaturedProducts />
      <AboutSection />
      <BenefitsSection />
      <PartnershipBanner />
    </>
  );
}

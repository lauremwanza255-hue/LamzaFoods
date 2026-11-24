import type { Metadata } from 'next';
import Link from 'next/link';
import { PageBanner } from '@/components/ui/PageBanner';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { DraftNotice } from '@/components/sections/DraftNotice';
import { CtaBand } from '@/components/sections/CtaBand';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ title: 'Food Safety', description: 'How Lamza Foods approaches food safety, traceability and product information.', path: '/food-safety' });

export default function FoodSafetyPage() {
  return (
    <>
      <PageBanner eyebrow="Food safety" title="Our approach to food safety" intro="Food safety, traceability and sustainability are at the heart of everything we do." crumbs={[{ name: 'Food Safety', path: '/food-safety' }]} image={{ src: '/images/agriculture/african-farmland-sunrise.webp', alt: '' }} />
      <section aria-labelledby="principles" className="bg-white py-14 lg:py-[calc(48*var(--u))]">
        <div className="container-site">
          <DraftNotice>principles describe the intended approach. Add specific procedures, inspections or standards only once Lamza Foods has confirmed and documented them.</DraftNotice>
          <h2 id="principles" className="title-section">Our principles</h2>
          <div className="mt-10">
            <FeatureGrid
              items={[
                { icon: 'users', title: 'Known suppliers', body: 'We aim to work with producers and suppliers we know, and to understand how their products are made.' },
                { icon: 'package-check', title: 'Traceability', body: 'We aim to keep records that link each product batch to where it came from.' },
                { icon: 'clipboard-check', title: 'Clear information', body: 'We provide product information such as ingredients and allergens on request, and will publish it as it is confirmed.' },
                { icon: 'warehouse', title: 'Careful handling', body: 'Dried and milled foods are stored and moved in conditions that suit them.' },
                { icon: 'shield-check', title: 'Applicable rules', body: 'We work to meet the food rules that apply in the markets we serve.' },
                { icon: 'file-text', title: 'Documentation', body: 'Verified documents will be listed on our Certifications and Documents pages.' },
              ]}
            />
          </div>
          <p className="mt-10 max-w-[64ch] text-[16px] leading-[1.7] text-ink-2">
            Need specific food safety information for a product? <Link href="/contact?subject=Product%20Inquiry" className="prose-link">Contact our team</Link> and name the product.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

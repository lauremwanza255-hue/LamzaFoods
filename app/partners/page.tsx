import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { EmptyState } from '@/components/ui/EmptyState';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { CtaBand } from '@/components/sections/CtaBand';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Our Partners',
  description: 'Lamza Foods works with producers, suppliers, retailers and distributors. Learn about partnership opportunities.',
  path: '/partners',
});

/** Add approved partners here as { name, logo, url }. Never list a partner without written approval. */
const approvedPartners: { name: string; logo: string; url?: string }[] = [];

export default function PartnersPage() {
  return (
    <>
      <PageBanner eyebrow="Our partners" title="Growing through partnership" intro="Our business is built on relationships with African producers on one side and food businesses on the other." crumbs={[{ name: 'Our Partners', path: '/partners' }]} image={{ src: '/images/hero/hero-food-flatlay.webp', alt: '', position: 'object-[70%_50%]' }} />
      <section aria-labelledby="types" className="bg-white py-14 lg:py-[calc(48*var(--u))]">
        <div className="container-site">
          <SectionHeading id="types" eyebrow="Who we partner with" title="Partnership opportunities" />
          <div className="mt-10">
            <FeatureGrid
              columns={4}
              items={[
                { icon: 'tractor', title: 'Producers', body: 'Farmers, fishers and processors who make authentic African food products.' },
                { icon: 'store', title: 'Retailers', body: 'Grocery stores and supermarkets that want African products on their shelves.' },
                { icon: 'boxes', title: 'Wholesalers & distributors', body: 'Businesses that supply stores, restaurants and caterers.' },
                { icon: 'ship', title: 'Importers & exporters', body: 'Trade partners who move food products between markets.' },
              ]}
            />
          </div>
        </div>
      </section>
      <section aria-labelledby="current" className="bg-gray-soft/60 py-14">
        <div className="container-site">
          <h2 id="current" className="title-section">Our partners</h2>
          <div className="mt-6">
            {approvedPartners.length ? (
              <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {approvedPartners.map((p) => (
                  <li key={p.name} className="rounded-md bg-white p-6 text-center">{p.name}</li>
                ))}
              </ul>
            ) : (
              <EmptyState icon="handshake" title="Partner profiles coming soon" body="We will introduce our partners here once they have agreed to be featured. Interested in working with us?" action={{ label: 'Become a partner', href: '/become-a-partner' }} />
            )}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

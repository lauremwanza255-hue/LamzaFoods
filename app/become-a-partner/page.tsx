import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { PartnershipForm } from '@/components/forms/PartnershipForm';
import { ContactAside } from '@/components/sections/ContactAside';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/types/content';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Become a Partner',
  description:
    'Retailers, wholesalers, distributors and importers: partner with Lamza Foods for authentic African food products. Send a partnership inquiry.',
  path: '/become-a-partner',
});

const benefits: { icon: IconName; title: string; body: string }[] = [
  { icon: 'leaf', title: 'Authentic African food products', body: 'Dried fish, flours, powders, spices and specialty foods your customers ask for.' },
  { icon: 'briefcase', title: 'Business-oriented supply', body: 'Inquiries handled with wholesale quantities and repeat orders in mind.' },
  { icon: 'sprout', title: 'Product sourcing opportunities', body: 'Tell us what your market needs and we will look at what we can source.' },
  { icon: 'handshake', title: 'Reliable communication', body: 'One point of contact for questions, specifications and follow-up.' },
  { icon: 'users', title: 'Long-term collaboration', body: 'We are looking for partners to grow with, not one-off orders.' },
  { icon: 'shield-check', title: 'Quality-focused partnerships', body: 'Product quality and clear information come first in every partnership.' },
];

export default function BecomeAPartnerPage() {
  return (
    <>
      <PageBanner
        eyebrow="Become a partner"
        title="Let’s grow together."
        intro="Lamza Foods works with retailers, wholesalers, distributors, importers and food businesses that want to offer authentic African food products. Tell us about your business and what you need."
        crumbs={[{ name: 'Become a Partner', path: '/become-a-partner' }]}
        image={{ src: '/images/hero/hero-food-flatlay.webp', alt: '', position: 'object-[70%_50%]' }}
      />
      <section aria-labelledby="benefits-heading" className="bg-white py-12 lg:py-[calc(40*var(--u))]">
        <div className="container-site">
          <h2 id="benefits-heading" className="title-section">What partners can expect</h2>
          <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-4">
                <Icon name={b.icon} className="size-9 shrink-0 text-green" />
                <div>
                  <h3 className="font-display text-[17px] font-bold text-navy">{b.title}</h3>
                  <p className="mt-1 text-[15px] leading-[1.55] text-ink-2">{b.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="form-heading" className="bg-gray-soft/60 py-12 lg:py-[calc(40*var(--u))]">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="rounded-md bg-white p-6 shadow-[0_1px_2px_rgba(26,36,83,0.06)] sm:p-8">
            <h2 id="form-heading" className="title-section">Partnership inquiry</h2>
            <p className="mb-6 mt-2 text-[15px] text-ink-2">It takes about three minutes. Our team reviews every partnership inquiry it receives.</p>
            <PartnershipForm />
          </div>
          <div className="space-y-6">
            <ContactAside title="Prefer to talk first?" />
          </div>
        </div>
      </section>
    </>
  );
}

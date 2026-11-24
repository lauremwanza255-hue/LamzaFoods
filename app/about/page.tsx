import type { Metadata } from 'next';
import Image from 'next/image';
import { PageBanner } from '@/components/ui/PageBanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { CtaBand } from '@/components/sections/CtaBand';
import { DraftNotice } from '@/components/sections/DraftNotice';
import { StatisticsGrid } from '@/components/homepage/StatisticsGrid';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description:
    'Lamza Foods connects African food producers with global markets, supplying authentic African food products to retailers, wholesalers and consumers in Canada and beyond.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="About Lamza Foods"
        title="Rooted in Africa. Committed to quality."
        intro="We connect African food producers with international markets by sourcing, processing and supplying authentic, high-quality African food products."
        crumbs={[{ name: 'About Us', path: '/about' }]}
        image={{ src: '/images/agriculture/african-farmland-sunrise.webp', alt: '' }}
      />

      <section aria-labelledby="overview" className="bg-white py-14 lg:py-[calc(48*var(--u))]">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-[calc(48*var(--u))]">
          <div>
            <SectionHeading id="overview" eyebrow="Who we are" title="A bridge between African producers and global markets" />
            <div className="mt-5 space-y-4 text-[16px] leading-[1.7] text-ink-2">
              <p>
                Lamza Foods is a food sourcing and distribution company focused on African food products for Canadian and
                international markets. We work with producers and suppliers to bring authentic products to retailers,
                wholesalers, food businesses and households.
              </p>
              <p>
                The bridge in our logo says what we do: connect the richness of African agriculture with the people and
                businesses who want it, wherever they are.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image src="/images/hero/hero-food-flatlay.webp" alt="Bowls of rice, beans, grains, spices and chillies around a Lamza Foods pouch" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[65%_50%]" />
          </div>
        </div>
      </section>

      <section aria-labelledby="mission" className="bg-gray-soft/60 py-14 lg:py-[calc(48*var(--u))]">
        <div className="container-site">
          <DraftNotice>mission, vision and values are proposed marketing drafts.</DraftNotice>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-md border-t-4 border-green bg-white p-7">
              <p className="eyebrow">Our mission</p>
              <h2 id="mission" className="sr-only">Mission and vision</h2>
              <p className="mt-3 font-display text-[20px] leading-[1.45] text-navy">
                To connect African producers with global markets by delivering authentic, nutritious and high-quality African
                food products through responsible sourcing, reliable supply and trusted partnerships.
              </p>
            </article>
            <article className="rounded-md border-t-4 border-navy bg-white p-7">
              <p className="eyebrow">Our vision</p>
              <p className="mt-3 font-display text-[20px] leading-[1.45] text-navy">
                To become a trusted international African food brand, connecting the richness of African agriculture with
                consumers and businesses worldwide.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="values" className="bg-white py-14 lg:py-[calc(48*var(--u))]">
        <div className="container-site">
          <SectionHeading id="values" eyebrow="Core values" title="What guides our work" />
          <div className="mt-10">
            <FeatureGrid
              items={[
                { icon: 'badge-check', title: 'Quality', body: 'We hold every product to clear quality expectations before it reaches a customer.' },
                { icon: 'leaf', title: 'Authenticity', body: 'We supply foods as they are known and cooked across Africa.' },
                { icon: 'shield-check', title: 'Integrity', body: 'We are honest about what we offer and what we can deliver.' },
                { icon: 'sprout', title: 'Sustainability', body: 'We aim for sourcing that respects producers, communities and land.' },
                { icon: 'truck', title: 'Reliability', body: 'We plan supply so partners can count on us.' },
                { icon: 'handshake', title: 'Partnership', body: 'We build long-term relationships with producers and buyers.' },
              ]}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="approach" className="on-dark bg-navy py-14 text-white lg:py-[calc(48*var(--u))]">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our approach</p>
            <h2 id="approach" className="title-section mt-2 lg:text-[calc(25*var(--u))]">From African farms to your shelves</h2>
            <div className="mt-5 space-y-5 text-[16px] leading-[1.7] text-white/88">
              <div>
                <h3 className="font-semibold text-white">African sourcing focus</h3>
                <p className="mt-1">We concentrate on products with deep roots in African cuisines: dried fish, staple flours, fruit powders, spices and specialty foods.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Commitment to quality</h3>
                <p className="mt-1">Food safety, traceability and clear product information are central to how we choose and present products.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Sustainability</h3>
                <p className="mt-1">We want our growth to create value for producers and their communities as well as for our customers.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">International positioning</h3>
                <p className="mt-1">Starting with Canada, we serve buyers who want African food products, and we welcome inquiries from other markets.</p>
              </div>
            </div>
          </div>
          <div className="self-center">
            <StatisticsGrid />
          </div>
        </div>
      </section>

      <section aria-labelledby="brand" className="bg-white py-14 lg:py-[calc(48*var(--u))]">
        <div className="container-site">
          <SectionHeading id="brand" eyebrow="Our brand" title="Packaging that carries the bridge" intro="Lamza Foods packaging uses our navy, green and bridge pattern so customers can find our products on the shelf." />
          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              { src: '/images/packaging/packaging-gift-box.webp', alt: 'Lamza Foods gift box and jar with tomatoes, basil and spices' },
              { src: '/images/packaging/packaging-shopping-bag.webp', alt: 'White Lamza Foods shopping bag with the green bridge pattern' },
              { src: '/images/packaging/packaging-takeaway.webp', alt: 'Lamza Foods kraft bag, food container and wrapped food on a dark table' },
            ].map((im) => (
              <li key={im.src} className="relative aspect-square overflow-hidden rounded-md">
                <Image src={im.src} alt={im.alt} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import { PageBanner } from '@/components/ui/PageBanner';
import { CtaBand } from '@/components/sections/CtaBand';
import { DraftNotice } from '@/components/sections/DraftNotice';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/types/content';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Our Process',
  description: 'How Lamza Foods approaches sourcing, supplier selection, inspection, quality assurance, packaging and delivery of African food products.',
  path: '/our-process',
});

/** Proposed process structure; confirm each stage with Lamza Foods before launch. */
const steps: { icon: IconName; title: string; body: string }[] = [
  { icon: 'sprout', title: 'Responsible sourcing', body: 'We look for producers and suppliers whose products and practices meet our standards.' },
  { icon: 'users', title: 'Supplier selection', body: 'We get to know each supplier, their products and how they work before we buy.' },
  { icon: 'microscope', title: 'Product inspection', body: 'Products are checked for appearance, condition and consistency against what was agreed.' },
  { icon: 'factory', title: 'Processing and preparation', body: 'Products are dried, milled, cleaned or prepared according to the product and its traditional method.' },
  { icon: 'clipboard-check', title: 'Quality assurance', body: 'We check products against our quality expectations before they are packed.' },
  { icon: 'package-check', title: 'Packaging and traceability', body: 'Products are packed and labelled so each batch can be traced back to its source.' },
  { icon: 'warehouse', title: 'Storage and logistics', body: 'Goods are stored and moved in conditions that suit dried and milled foods.' },
  { icon: 'truck', title: 'Distribution and delivery', body: 'Orders are prepared and delivered to retailers, wholesalers and partners.' },
];

export default function OurProcessPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our process"
        title="From source to shelf"
        intro="Eight stages describe how African food products move from producers to our partners, with quality and traceability in mind at each step."
        crumbs={[{ name: 'Our Process', path: '/our-process' }]}
        image={{ src: '/images/agriculture/african-farmland-sunrise.webp', alt: '' }}
      />
      <section aria-labelledby="steps-heading" className="bg-white py-14 lg:py-[calc(48*var(--u))]">
        <div className="container-site">
          <DraftNotice>this is a proposed process structure. Confirm which stages Lamza Foods performs directly and which are handled by suppliers or partners.</DraftNotice>
          <h2 id="steps-heading" className="sr-only">Process stages</h2>
          <ol className="grid gap-x-8 gap-y-10 md:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy font-display text-[18px] font-bold text-white">
                    {i + 1}
                  </span>
                  {i < steps.length - 1 && <span aria-hidden="true" className="mt-2 w-px flex-1 bg-line-strong md:hidden" />}
                </div>
                <div className="pb-2">
                  <div className="flex items-center gap-2.5">
                    <Icon name={s.icon} className="size-6 text-green" />
                    <h3 className="font-display text-[19px] font-bold text-navy">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-[16px] leading-[1.65] text-ink-2">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section aria-label="Products in our process" className="bg-gray-soft/60 py-12">
        <div className="container-site grid grid-cols-2 gap-4 md:grid-cols-4">
          {['dried-smoked-catfish', 'cassava-flour', 'baobab-powder', 'african-spices'].map((s) => (
            <div key={s} className="relative aspect-[552/448] overflow-hidden rounded-md">
              <Image src={`/images/products/${s}.webp`} alt="" fill sizes="(min-width: 768px) 22vw, 46vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Work with us" body="Partner with Lamza Foods for authentic African food products supplied with care." />
    </>
  );
}

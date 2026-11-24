import type { Metadata } from 'next';
import Link from 'next/link';
import { PageBanner } from '@/components/ui/PageBanner';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CtaBand } from '@/components/sections/CtaBand';
import { faqGroups } from '@/data/faqs';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ title: 'Frequently Asked Questions', description: 'Answers to common questions about Lamza Foods products, wholesale inquiries, partnerships, packaging, shipping and specifications.', path: '/faqs' });

export default function FaqsPage() {
  return (
    <>
      <PageBanner eyebrow="FAQs" title="Frequently asked questions" intro="Quick answers about our products, wholesale inquiries and partnerships." crumbs={[{ name: 'FAQs', path: '/faqs' }]} />
      <section aria-label="Questions and answers" className="bg-white py-14 lg:py-[calc(48*var(--u))]">
        <div className="container-site grid gap-10 lg:grid-cols-[220px_1fr]">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {faqGroups.map((g) => (
                <li key={g.title}><a href={`#${g.title.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex min-h-[40px] items-center rounded-sm px-3 text-[15px] font-medium text-navy hover:bg-gray-soft hover:text-green">{g.title}</a></li>
              ))}
            </ul>
          </nav>
          <div className="space-y-12">
            {faqGroups.map((g) => (
              <FAQAccordion key={g.title} id={g.title.toLowerCase().replace(/\s+/g, '-')} title={g.title} items={g.items} />
            ))}
            <p className="text-[16px] text-ink-2">Didn’t find your answer? <Link href="/contact" className="prose-link">Contact our team</Link>.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

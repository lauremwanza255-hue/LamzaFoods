import type { Metadata } from 'next';
import { Download } from 'lucide-react';
import { PageBanner } from '@/components/ui/PageBanner';
import { EmptyState } from '@/components/ui/EmptyState';
import { CtaBand } from '@/components/sections/CtaBand';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ title: 'Documents', description: 'Company profile, product catalogue and product documents from Lamza Foods.', path: '/documents' });

/** Add approved files to public/documents and list them here. */
const documents: { title: string; description: string; file: string; size: string }[] = [];

export default function DocumentsPage() {
  return (
    <>
      <PageBanner eyebrow="Resources" title="Documents" intro="Company profile, product catalogue, specifications and food safety documents." crumbs={[{ name: 'Documents', path: '/documents' }]} />
      <section aria-labelledby="docs" className="bg-white py-14 lg:py-[calc(48*var(--u))]">
        <div className="container-site">
          <h2 id="docs" className="title-section">Downloads</h2>
          <div className="mt-6">
            {documents.length ? (
              <ul className="divide-y divide-line border-y border-line">
                {documents.map((d) => (
                  <li key={d.file} className="flex items-center justify-between gap-4 py-4">
                    <div><p className="font-semibold text-navy">{d.title}</p><p className="text-[16px] text-ink-2">{d.description}</p></div>
                    <a href={d.file} download className="btn btn-outline-dark btn-sm"><Download aria-hidden="true" className="size-4" />Download<span className="sr-only"> {d.title}</span> ({d.size})</a>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState icon="file-text" title="Documents available on request" body="Our company profile, product catalogue and specification sheets are not yet available to download. Tell us which document you need and we will send it to you." action={{ label: 'Request a document', href: '/contact?subject=General%20Inquiry' }} />
            )}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

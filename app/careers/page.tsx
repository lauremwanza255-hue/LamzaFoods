import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { EmptyState } from '@/components/ui/EmptyState';
import { CtaBand } from '@/components/sections/CtaBand';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ title: 'Careers', description: 'Careers at Lamza Foods. See current vacancies or get in touch.', path: '/careers' });

/** Add confirmed vacancies here. */
const vacancies: { title: string; location: string; type: string; href: string }[] = [];

export default function CareersPage() {
  return (
    <>
      <PageBanner eyebrow="Careers" title="Work with Lamza Foods" intro="We are building a team that cares about good food, honest business and the communities behind our products." crumbs={[{ name: 'Careers', path: '/careers' }]} />
      <section aria-labelledby="vacancies" className="bg-white py-14 lg:py-[calc(48*var(--u))]">
        <div className="container-site">
          <h2 id="vacancies" className="title-section">Current vacancies</h2>
          <div className="mt-6">
            {vacancies.length ? (
              <ul className="divide-y divide-line border-y border-line">
                {vacancies.map((v) => (
                  <li key={v.title} className="py-4"><a href={v.href} className="font-semibold text-navy hover:text-green">{v.title}</a> – {v.location}, {v.type}</li>
                ))}
              </ul>
            ) : (
              <EmptyState icon="briefcase" title="No open positions right now" body="We don’t have any vacancies at the moment. You are welcome to contact us to introduce yourself; we will keep your details in mind as we grow." action={{ label: 'Contact us', href: '/contact?subject=Other' }} />
            )}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

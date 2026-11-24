import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { EmptyState } from '@/components/ui/EmptyState';
import { CtaBand } from '@/components/sections/CtaBand';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ title: 'Certifications', description: 'Verified certifications and supporting documents for Lamza Foods products.', path: '/certifications' });

/** Only add certifications that Lamza Foods holds and can document (name, issuer, scope, valid until, file). */
const certifications: { name: string; issuer: string; scope: string; validUntil: string; file?: string }[] = [];

export default function CertificationsPage() {
  return (
    <>
      <PageBanner eyebrow="Certifications" title="Certifications" intro="Verified certifications and supporting documents for our products and operations." crumbs={[{ name: 'Certifications', path: '/certifications' }]} />
      <section aria-labelledby="certs" className="bg-white py-14 lg:py-[calc(48*var(--u))]">
        <div className="container-site">
          <h2 id="certs" className="title-section">Current certifications</h2>
          <div className="mt-6">
            {certifications.length ? (
              <table className="w-full text-left text-[15px]">
                <thead><tr className="border-b border-line-strong"><th className="py-3">Certification</th><th>Issuer</th><th>Scope</th><th>Valid until</th></tr></thead>
                <tbody>{certifications.map((c) => (<tr key={c.name} className="border-b border-line"><td className="py-3">{c.name}</td><td>{c.issuer}</td><td>{c.scope}</td><td>{c.validUntil}</td></tr>))}</tbody>
              </table>
            ) : (
              <EmptyState icon="award" title="Certification details on request" body="We are preparing our certification documents for publication. If you need documentation for a product or a tender, contact us and we will tell you what is available." action={{ label: 'Request documentation', href: '/contact?subject=Product%20Inquiry' }} />
            )}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

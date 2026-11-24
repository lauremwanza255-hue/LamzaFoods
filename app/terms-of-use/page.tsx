import type { Metadata } from 'next';
import Link from 'next/link';
import { PageBanner } from '@/components/ui/PageBanner';
import { Prose } from '@/components/sections/Prose';
import { LegalDraftBanner } from '@/components/sections/LegalDraftBanner';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ title: 'Terms of Use', description: 'Terms that apply to the use of the Lamza Foods website.', path: '/terms-of-use' });

export default function TermsPage() {
  return (
    <>
      <PageBanner title="Terms of Use" crumbs={[{ name: 'Terms of Use', path: '/terms-of-use' }]} />
      <section className="bg-white py-12 lg:py-[calc(40*var(--u))]">
        <div className="container-site">
          <LegalDraftBanner />
          <Prose>
            <p>These terms apply to your use of the {site.name} website. By using the site you agree to them.</p>
            <h2>About this website</h2>
            <p>This website presents {site.name} and its products and lets businesses and individuals send inquiries. It does not sell products online or take payments.</p>
            <h2>Product information</h2>
            <p>Product descriptions and photographs are provided for general information. Specifications, availability and prices are confirmed only in a written quotation or agreement. Photographs may show serving suggestions or packaging designs that differ from supplied products.</p>
            <h2>Inquiries and quotes</h2>
            <p>Sending an inquiry or quote request does not create a contract. Any supply of products is subject to a separate written agreement.</p>
            <h2>Intellectual property</h2>
            <p>The {site.name} name, logo, bridge symbol, brand pattern, text and images on this site belong to {site.name} or its licensors. Do not copy or reuse them without permission.</p>
            <h2>Acceptable use</h2>
            <p>Do not misuse the site or its forms, for example by sending spam, attempting to gain unauthorised access or interfering with its operation.</p>
            <h2>Liability</h2>
            <p>[Limitation of liability wording to be supplied by legal counsel.]</p>
            <h2>Governing law</h2>
            <p>[Governing law and jurisdiction, for example the laws of Alberta and the federal laws of Canada applicable there, to be confirmed by legal counsel.]</p>
            <h2>Contact</h2>
            <p>Questions about these terms? <Link href="/contact">Contact us</Link>.</p>
            <p className="text-[16px] text-ink-2">Last updated: [date of approval]</p>
          </Prose>
        </div>
      </section>
    </>
  );
}

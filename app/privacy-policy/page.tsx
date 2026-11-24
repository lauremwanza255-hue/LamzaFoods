import type { Metadata } from 'next';
import Link from 'next/link';
import { PageBanner } from '@/components/ui/PageBanner';
import { Prose } from '@/components/sections/Prose';
import { LegalDraftBanner } from '@/components/sections/LegalDraftBanner';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ title: 'Privacy Policy', description: 'How Lamza Foods collects, uses and protects personal information submitted through this website.', path: '/privacy-policy' });

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner title="Privacy Policy" crumbs={[{ name: 'Privacy Policy', path: '/privacy-policy' }]} />
      <section className="bg-white py-12 lg:py-[calc(40*var(--u))]">
        <div className="container-site">
          <LegalDraftBanner />
          <Prose>
            <p>This policy explains what personal information {site.name} collects through this website, why, and how it is handled.</p>
            <h2>Information we collect</h2>
            <p>We collect only the information you choose to send us through our contact, partnership and quote request forms:</p>
            <ul>
              <li>your name, company name, email address and telephone number;</li>
              <li>your country, city, business type and business website, where requested;</li>
              <li>the products, quantities, packaging and delivery details you include;</li>
              <li>the content of your message and your consent to be contacted;</li>
              <li>the date and time of the submission and an inquiry reference number.</li>
            </ul>
            <p>Our servers also process your IP address briefly to prevent abuse of the forms (rate limiting). This website does not use advertising or analytics cookies or third-party tracking scripts.</p>
            <h2>How we use it</h2>
            <p>We use your information to reply to your inquiry, prepare quotes, discuss partnerships and keep a record of our business correspondence. We do not sell your information or use it for unrelated marketing without your separate consent.</p>
            <h2>Service providers</h2>
            <p>Depending on how the website is configured, inquiries may be stored in a database hosted by our database provider and delivered by email through our transactional email provider. These providers process the information on our behalf. [List the providers, their locations and safeguards before publication.]</p>
            <h2>Retention</h2>
            <p>[Set a retention period, for example: inquiries are kept for up to 24 months after our last contact with you, unless a longer period is required for business or legal reasons.]</p>
            <h2>Your choices and rights</h2>
            <p>You may ask to see, correct or delete the personal information we hold about you, or withdraw your consent, by contacting us. Canadian privacy law, including PIPEDA and, where applicable, Alberta’s Personal Information Protection Act, may give you further rights.</p>
            <h2>Contact</h2>
            <p>Questions about this policy? <Link href="/contact">Contact us</Link>.</p>
            <p className="text-[16px] text-ink-2">Last updated: [date of approval]</p>
          </Prose>
        </div>
      </section>
    </>
  );
}

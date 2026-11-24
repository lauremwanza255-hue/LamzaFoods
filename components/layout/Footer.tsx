import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { footerColumns, site } from '@/data/site';
import { showClaim } from '@/lib/config';
import { BrandLogo } from './BrandLogo';

const socialIcons = { Facebook, Instagram, LinkedIn: Linkedin, YouTube: Youtube } as const;

function SocialLinks() {
  return (
    <ul className="mt-4 flex gap-3 lg:mt-[calc(10*var(--u))] lg:gap-[calc(14*var(--u))]" aria-label="Social media">
      {site.social.map((s) => {
        const I = socialIcons[s.name as keyof typeof socialIcons];
        const circle = (
          <span className="inline-flex size-[30px] items-center justify-center rounded-full bg-white text-navy lg:size-[max(24px,calc(19*var(--u)))]">
            <I aria-hidden="true" className="size-[58%]" strokeWidth={2} />
          </span>
        );
        return (
          <li key={s.name}>
            {s.url ? (
              <a href={s.url} rel="noopener noreferrer" target="_blank" aria-label={`${site.name} on ${s.name}`} className="block transition-opacity hover:opacity-80">
                {circle}
              </a>
            ) : (
              // No verified profile URL configured yet: shown as an inactive placeholder, not a link.
              <span className="block opacity-90" title={`${s.name} profile coming soon`}>
                {circle}
                <span className="sr-only">{s.name} profile not yet available</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = site;
  return (
    <footer className="on-dark border-t border-white/10 bg-navy text-white">
      <div className="container-site pt-12 lg:pl-[calc(78*var(--u))] lg:pt-[calc(18*var(--u))]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-[calc(215*var(--u))_calc(129*var(--u))_calc(133*var(--u))_calc(129*var(--u))_calc(128*var(--u))_1fr] lg:gap-x-0 lg:gap-y-0">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <BrandLogo variant="dark" width="clamp(140px, calc(145 * var(--u)), 200px)" />
            <p className="mt-4 max-w-[30ch] text-[14px] leading-[1.5] text-white/90 lg:mt-[calc(8*var(--u))] lg:max-w-[calc(160*var(--u))] lg:text-[max(11.5px,calc(10*var(--u)))] lg:leading-[1.38]">
              {site.footerBlurb}
            </p>
            <SocialLinks />
          </div>
          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.02em] text-white lg:text-[max(11.5px,calc(10.4*var(--u)))]">
                {col.heading}
              </h2>
              <ul className="mt-3 space-y-1 lg:mt-[calc(5*var(--u))] lg:space-y-0">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="flex min-h-[24px] w-fit items-center py-1.5 text-[14px] text-white/85 transition-colors hover:text-green-light lg:py-0 lg:text-[max(11.5px,calc(10*var(--u)))] lg:leading-[1.52]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-2 sm:col-span-1">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.02em] text-white lg:text-[max(11.5px,calc(10.4*var(--u)))]">
              Contact
            </h2>
            <ul className="mt-3 space-y-3 text-[14px] text-white/85 lg:mt-[calc(8*var(--u))] lg:space-y-[calc(7*var(--u))] lg:text-[max(11.5px,calc(10*var(--u)))]">
              {showClaim(contact.location) && (
                <li className="flex gap-2.5">
                  <MapPin aria-hidden="true" className="mt-[2px] size-4 shrink-0 text-white" />
                  <address className="not-italic leading-[1.4]">
                    {contact.locationLines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </li>
              )}
              {showClaim(contact.phone) && (
                <li className="flex items-center gap-2.5">
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-white" />
                  <a href={contact.phoneHref} className="hover:text-green-light">
                    {contact.phone.value}
                  </a>
                </li>
              )}
              {showClaim(contact.email) && (
                <li className="flex items-center gap-2.5">
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-white" />
                  <a href={`mailto:${contact.email.value}`} className="break-all hover:text-green-light">
                    {contact.email.value}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 py-5 text-[13px] text-white/80 sm:flex-row sm:items-center sm:justify-between lg:mt-[calc(4*var(--u))] lg:border-t-0 lg:py-[calc(8*var(--u))] lg:text-[max(11px,calc(9.6*var(--u)))]">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex items-center">
            <li>
              <Link href="/privacy-policy" className="inline-block py-1 hover:text-green-light">
                Privacy Policy
              </Link>
            </li>
            <li aria-hidden="true" className="mx-4 h-4 w-px bg-white/50" />
            <li>
              <Link href="/terms-of-use" className="inline-block py-1 hover:text-green-light">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

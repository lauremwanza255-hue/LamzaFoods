import { Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/data/site';
import { showClaim } from '@/lib/config';

/** Contact details block. Values come from data/site.ts and respect the verification flag. */
export function ContactAside({ title = 'Talk to our team' }: { title?: string }) {
  const { contact } = site;
  const items = [
    showClaim(contact.email) && { icon: Mail, label: 'Email', node: <a className="prose-link break-all" href={`mailto:${contact.email.value}`}>{contact.email.value}</a> },
    showClaim(contact.phone) && { icon: Phone, label: 'Telephone', node: <a className="prose-link" href={contact.phoneHref}>{contact.phone.value}</a> },
    showClaim(contact.location) && { icon: MapPin, label: 'Location', node: <span>{contact.location.value}</span> },
  ].filter(Boolean) as { icon: typeof Mail; label: string; node: React.ReactNode }[];
  return (
    <aside aria-label={title} className="rounded-md border border-line-strong bg-white p-6">
      <h2 className="font-display text-[20px] font-bold text-navy">{title}</h2>
      {items.length ? (
        <ul className="mt-4 space-y-4">
          {items.map((it) => (
            <li key={it.label} className="flex gap-3">
              <it.icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-green" strokeWidth={1.6} />
              <div className="text-[15px]">
                <p className="font-semibold text-navy">{it.label}</p>
                <div className="text-ink-2">{it.node}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-[15px] text-ink-2">Use the form and our team will reply by email.</p>
      )}
    </aside>
  );
}

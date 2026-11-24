'use client';

import { Check, Link2, Linkedin, Facebook, Mail } from 'lucide-react';
import { useState } from 'react';

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: Linkedin },
    { label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: Facebook },
    { label: 'Share by email', href: `mailto:?subject=${t}&body=${u}`, Icon: Mail },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[14px] font-semibold text-navy">Share</span>
      {links.map(({ label, href, Icon }) => (
        <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={label} className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-navy transition-colors hover:border-green hover:text-green">
          <Icon aria-hidden="true" className="size-[18px]" />
        </a>
      ))}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          } catch {
            /* clipboard unavailable */
          }
        }}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-[14px] font-medium text-navy hover:border-green hover:text-green"
      >
        {copied ? <Check aria-hidden="true" className="size-4 text-green" /> : <Link2 aria-hidden="true" className="size-4" />}
        {copied ? 'Link copied' : 'Copy link'}
      </button>
      <span role="status" className="sr-only">{copied ? 'Link copied to clipboard' : ''}</span>
    </div>
  );
}

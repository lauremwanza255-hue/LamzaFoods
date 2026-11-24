import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="on-dark relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="bg-brand-pattern absolute inset-0 -z-10 opacity-[0.07]" />
      <div className="container-site flex min-h-[60vh] flex-col items-start justify-center py-20">
        <Image src="/brand/brand-icon.svg" alt="" width={96} height={55} unoptimized className="h-auto w-[96px]" />
        <p className="eyebrow mt-8">Error 404</p>
        <h1 id="nf-title" className="mt-2 font-display text-[clamp(2rem,6vw,3rem)] font-bold leading-tight">This page could not be found</h1>
        <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-white/90">The link may be out of date or the page may have moved. Use the links below to keep exploring.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">Go to the homepage <ArrowRight aria-hidden="true" className="btn-arrow" /></Link>
          <Link href="/products" className="btn btn-outline-light">Browse products</Link>
        </div>
      </div>
    </section>
  );
}

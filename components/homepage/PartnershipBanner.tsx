import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function PartnershipBanner() {
  return (
    <section aria-labelledby="partner-title" className="on-dark relative isolate overflow-hidden bg-navy text-white">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[calc(334*var(--u))] sm:block sm:w-[45%] lg:w-[calc(334*var(--u))]"
      >
        <Image
          src="/images/partnerships/business-handshake.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 45vw"
          className="object-cover object-right opacity-60 [mask-image:linear-gradient(to_right,transparent,black_45%)] lg:opacity-100"
        />
      </div>
      <div className="container-site flex flex-col gap-6 py-12 lg:min-h-[calc(87*var(--u))] lg:flex-row lg:items-center lg:gap-0 lg:py-[calc(14*var(--u))]">
        <div className="lg:w-[calc(492*var(--u))] lg:pl-[calc(18*var(--u))]">
          <h2 id="partner-title" className="font-display text-[26px] leading-tight lg:text-[calc(18.5*var(--u))]">
            Let’s grow together.
          </h2>
          <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.55] text-white/90 lg:mt-[calc(6*var(--u))] lg:max-w-[calc(300*var(--u))] lg:text-[max(12px,calc(10*var(--u)))] lg:leading-[1.55]">
            We partner with retailers, distributors and businesses that share our commitment to quality and excellence.
          </p>
        </div>
        <div>
          <Link href="/become-a-partner" className="btn btn-primary">
            Become a partner
            <ArrowRight aria-hidden="true" className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}

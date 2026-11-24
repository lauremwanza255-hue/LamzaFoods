import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="on-dark relative isolate overflow-hidden bg-navy text-white">
      {/* Photography: right side on desktop, blended into the navy ground */}
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/8] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[62.2%]">
        <Image
          src="/images/hero/hero-food-flatlay.webp"
          alt="Lamza Foods dried catfish pouch surrounded by bowls of rice, beans, grains, ground spices, chillies, onion and garlic"
          fill
          priority
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-[70%_50%] lg:object-left [mask-image:linear-gradient(to_bottom,black_70%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.55)_9%,black_22%)]"
        />
      </div>
      <div className="container-site relative -mt-10 pb-12 lg:mt-0 lg:flex lg:min-h-[calc(367*var(--u))] lg:items-center lg:pb-0">
        <div className="max-w-[560px] lg:max-w-[calc(400*var(--u))] lg:pt-[calc(10*var(--u))]">
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.1rem,7.4vw,2.9rem)] font-bold leading-[1.1] tracking-[-0.012em] lg:text-[calc(39.5*var(--u))] lg:leading-[1.13]"
          >
            <span className="lg:block">Bringing Africa’s </span>
            <span className="lg:block">finest foods to </span>
            <span className="lg:block">
              the world<span className="text-green-light lg:text-green">.</span>
            </span>
          </h1>
          <span aria-hidden="true" className="rule-green mt-5 lg:mt-[calc(16*var(--u))]" />
          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-white/90 lg:mt-[calc(17*var(--u))] lg:max-w-[calc(330*var(--u))] lg:text-[max(13px,calc(12.4*var(--u)))] lg:leading-[1.62]">
            Lamza Foods sources, processes and delivers high-quality African food products to retailers, wholesalers and
            consumers across Canada and beyond.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-[calc(22*var(--u))] lg:gap-[calc(15*var(--u))]">
            <Link href="/products" className="btn btn-primary">
              Explore our products
              <ArrowRight aria-hidden="true" className="btn-arrow" />
            </Link>
            <Link href="/become-a-partner" className="btn btn-outline-light">
              Partner with us
              <ArrowRight aria-hidden="true" className="btn-arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import { Award } from 'lucide-react';
import { StatisticsGrid } from './StatisticsGrid';

export function AboutSection() {
  return (
    <section aria-labelledby="about-title" className="on-dark relative bg-navy text-white">
      <div className="lg:grid lg:min-h-[calc(257*var(--u))] lg:grid-cols-[calc(446*var(--u))_1fr]">
        {/* Photograph with the quality panel overlapping its lower-left corner */}
        <div className="relative lg:pl-[calc(49*var(--u))]">
          <div className="relative aspect-[3/2] lg:aspect-auto lg:h-full">
            <Image
              src="/images/agriculture/african-farmland-sunrise.webp"
              alt="Rows of green crops on farmland at sunrise, with trees on the horizon"
              fill
              sizes="(min-width: 1024px) 39vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative mx-5 -mt-12 rounded-[4px] bg-green p-5 sm:mx-8 sm:max-w-[340px] lg:absolute lg:bottom-[calc(13*var(--u))] lg:left-[calc(30*var(--u))] lg:m-0 lg:w-[calc(156*var(--u))] lg:max-w-none lg:p-[calc(13*var(--u))]">
            <div className="flex items-center gap-3 lg:gap-[calc(9*var(--u))]">
              <Award aria-hidden="true" strokeWidth={1.3} className="size-9 shrink-0 lg:size-[calc(30*var(--u))]" />
              <p className="text-[16px] font-semibold uppercase leading-[1.3] lg:text-[max(11.5px,calc(10.4*var(--u)))]">
                Quality you can trust
              </p>
            </div>
            <p className="mt-3 text-[16px] leading-[1.5] lg:mt-[calc(9*var(--u))] lg:text-[max(11.5px,calc(10*var(--u)))] lg:leading-[1.45]">
              Food safety, traceability and sustainability are at the heart of everything we do.
            </p>
          </div>
        </div>

        <div className="container-site py-12 lg:m-0 lg:max-w-none lg:py-[calc(22*var(--u))] lg:pl-[calc(50*var(--u))] lg:pr-[calc(40*var(--u))]">
          <p className="eyebrow">About Lamza Foods</p>
          <h2 id="about-title" className="title-section mt-2 lg:mt-[calc(5*var(--u))] lg:text-[calc(23.5*var(--u))] lg:leading-[1.2]">
            <span className="lg:block">Rooted in Africa. </span>
            <span className="lg:block">Committed to quality.</span>
          </h2>
          <span aria-hidden="true" className="rule-green mt-4 lg:mt-[calc(12*var(--u))]" />
          <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.6] text-white/88 lg:mt-[calc(12*var(--u))] lg:max-w-[calc(372*var(--u))] lg:text-[max(11.5px,calc(10*var(--u)))] lg:leading-[1.5]">
            We are passionate about connecting African producers with global markets. Our mission is to provide nutritious,
            authentic and sustainable food products while creating value for our partners and communities.
          </p>
          <StatisticsGrid className="mt-8 lg:mt-[calc(16*var(--u))]" />
        </div>
      </div>
    </section>
  );
}

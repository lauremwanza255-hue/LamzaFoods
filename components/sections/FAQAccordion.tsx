import { ChevronDown } from 'lucide-react';

/** Native <details> accordion: keyboard and screen-reader accessible without script. */
export function FAQAccordion({ id, title, items }: { id: string; title: string; items: { q: string; a: string }[] }) {
  return (
    <section aria-labelledby={`${id}-title`} id={id} className="scroll-mt-28">
      <h2 id={`${id}-title`} className="title-section">{title}</h2>
      <div className="mt-4 divide-y divide-line border-y border-line">
        {items.map((it) => (
          <details key={it.q} className="group">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16.5px] font-semibold text-navy marker:hidden hover:text-green [&::-webkit-details-marker]:hidden">
              {it.q}
              <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-green transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <p className="pb-5 pr-8 text-[16px] leading-[1.7] text-ink-2">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

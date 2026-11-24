export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  id,
  as: H = 'h2',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  id?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-[640px] text-center' : 'max-w-[640px]'}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H id={id} className="title-section mt-2 lg:text-[calc(25*var(--u))]">
        {title}
      </H>
      {intro && (
        <p className="mt-3 text-[16px] leading-[1.6] text-ink-2 lg:text-[max(14px,calc(12.4*var(--u)))]">{intro}</p>
      )}
    </div>
  );
}

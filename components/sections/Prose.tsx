/** Typographic container for long-form text (legal pages, policies). */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[72ch] text-[16.5px] leading-[1.75] text-[#2d3550] [&_a]:text-green [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:text-navy [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-navy [&_li]:mt-1.5 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
      {children}
    </div>
  );
}

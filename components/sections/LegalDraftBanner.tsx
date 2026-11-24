/** Always visible until the policy has been reviewed by a lawyer and this banner removed. */
export function LegalDraftBanner() {
  return (
    <p className="mb-8 rounded-sm border border-dashed border-[#c98a00] bg-[#fff8e6] px-4 py-3 text-[16px] leading-[1.55] text-[#6b4a00]">
      <strong>Draft – pending legal review.</strong> This document describes how this website currently works. It must be
      reviewed by a qualified lawyer and approved by Lamza Foods before the site goes live.
    </p>
  );
}

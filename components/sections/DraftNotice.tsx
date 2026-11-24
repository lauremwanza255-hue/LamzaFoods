/** Visible marker for proposed copy that still needs Lamza Foods' approval (shown outside production builds). */
export function DraftNotice({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === 'production' && process.env.SHOW_DRAFT_CONTENT !== 'true') return null;
  return (
    <p className="mb-6 rounded-sm border border-dashed border-[#c98a00] bg-[#fff8e6] px-4 py-2.5 text-[13px] text-[#6b4a00]">
      <strong>Draft for approval:</strong> {children}
    </p>
  );
}

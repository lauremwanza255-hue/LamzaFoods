import type { Claim } from '@/types/content';

/** When true, values still marked unverified are hidden across the site. */
export const hideUnverified = process.env.NEXT_PUBLIC_HIDE_UNVERIFIED === 'true';

/** Whether search engines may index this deployment. Off unless explicitly enabled. */
export const indexingEnabled = process.env.SITE_INDEXING === 'true';

export function showClaim(claim: Claim<unknown> | null | undefined): boolean {
  if (!claim) return false;
  return claim.verified || !hideUnverified;
}

export function showItem(item: { verified: boolean }): boolean {
  return item.verified || !hideUnverified;
}

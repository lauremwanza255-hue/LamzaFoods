/**
 * Content models for Lamza Foods.
 *
 * Every business fact carries a `verified` flag. Unverified values come from the
 * supplied design reference or are proposed marketing drafts; they can be hidden
 * site-wide with NEXT_PUBLIC_HIDE_UNVERIFIED=true and are listed in
 * docs/CONTENT-VERIFICATION.md.
 */

export type Claim<T = string> = {
  value: T;
  verified: boolean;
  /** Where the value came from, e.g. "homepage reference", "proposed draft". */
  source?: string;
};

export type IconName =
  | 'sprout'
  | 'leaf'
  | 'shield-check'
  | 'globe'
  | 'truck'
  | 'handshake'
  | 'hand-heart'
  | 'badge-check'
  | 'package'
  | 'users'
  | 'award'
  | 'wheat'
  | 'clipboard-check'
  | 'microscope'
  | 'factory'
  | 'package-check'
  | 'warehouse'
  | 'ship'
  | 'store'
  | 'tractor'
  | 'boxes'
  | 'briefcase'
  | 'file-text';

export type ProductCategorySlug = 'dried-fish' | 'flours-powders' | 'african-spices' | 'other-products';

export type ProductCategory = {
  slug: ProductCategorySlug;
  name: string;
  navLabel: string;
  description: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategorySlug;
  shortDescription: string;
  fullDescription: string[];
  primaryImage: ProductImage;
  gallery: ProductImage[];
  /** Only shown when set. Leave null until confirmed by Lamza Foods. */
  countryOfOrigin: Claim | null;
  ingredients: Claim | null;
  packagingOptions: Claim<string[]> | null;
  storage: Claim | null;
  shelfLife: Claim | null;
  allergens: Claim | null;
  specifications: Claim<{ label: string; value: string }[]> | null;
  verifiedClaims: string[];
  availability: 'available' | 'on-request' | 'coming-soon';
  wholesale: boolean;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  /** Copy status: drafts need approval before launch. */
  copyStatus: 'draft' | 'approved';
};

export type NewsCategory =
  | 'Company Updates'
  | 'African Food'
  | 'Agriculture'
  | 'Product Highlights'
  | 'Food Quality'
  | 'Sustainability'
  | 'Market Insights';

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  category: NewsCategory;
  excerpt: string;
  content: string[];
  featuredImage: ProductImage;
  publishedAt: string; // ISO date
  author: string;
  status: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
};

export type InquiryType = 'contact' | 'product' | 'partnership' | 'wholesale' | 'quote';

export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

export type Stat = {
  icon: IconName;
  heading: string;
  value: Claim;
  caption: string;
};

export type Feature = {
  icon: IconName;
  title: string;
  description: string;
  verified: boolean;
};

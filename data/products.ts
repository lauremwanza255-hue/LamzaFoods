import type { Product, ProductCategory, ProductCategorySlug } from '@/types/content';

export const categories: ProductCategory[] = [
  {
    slug: 'dried-fish',
    name: 'Dried Fish',
    navLabel: 'Dried Fish',
    description: 'Traditionally dried and smoked fish used across African cuisines.',
  },
  {
    slug: 'flours-powders',
    name: 'Flours & Powders',
    navLabel: 'Flours & Powders',
    description: 'Milled staples and fruit powders for traditional and contemporary cooking.',
  },
  {
    slug: 'african-spices',
    name: 'African Spices',
    navLabel: 'African Spices',
    description: 'Whole and ground spices with the aromas of African kitchens.',
  },
  {
    slug: 'other-products',
    name: 'Other Products',
    navLabel: 'Other Products',
    description: 'Specialty foods from Africa’s diverse culinary heritage.',
  },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

const img = (slug: string, alt: string) => ({
  src: `/images/products/${slug}.webp`,
  alt,
  width: 552,
  height: 448,
});

/**
 * Initial catalogue: the six products from the homepage reference, in reference order.
 * Descriptions are draft catalogue copy. Fields left as null are not displayed;
 * product pages then say "Contact us for product specifications".
 * Never add prices, nutrition, allergen or regulatory claims without verified data.
 */
export const products: Product[] = [
  {
    id: 'p-001',
    slug: 'dried-smoked-catfish',
    name: 'Dried & Smoked Catfish',
    category: 'dried-fish',
    shortDescription:
      'Traditional dried and smoked catfish, offering the distinctive taste associated with authentic African cuisine.',
    fullDescription: [
      'Traditional dried and smoked catfish, offering the distinctive taste associated with authentic African cuisine.',
      'Smoked catfish is a familiar base for soups, stews and sauces in many West and Central African kitchens. Contact our team for available sizes, packaging and wholesale quantities.',
    ],
    primaryImage: img('dried-smoked-catfish', 'Whole dried and smoked catfish on a rustic wooden board with green leaves'),
    gallery: [],
    countryOfOrigin: null,
    ingredients: null,
    packagingOptions: null,
    storage: null,
    shelfLife: null,
    allergens: null,
    specifications: null,
    verifiedClaims: [],
    availability: 'on-request',
    wholesale: true,
    featured: true,
    seoTitle: 'Dried & Smoked Catfish | Lamza Foods',
    seoDescription:
      'Traditional dried and smoked African catfish for retailers, wholesalers and distributors. Request a quote from Lamza Foods.',
    copyStatus: 'draft',
  },
  {
    id: 'p-002',
    slug: 'dried-lake-malawi-sardines-usipa',
    name: 'Dried Lake Malawi Sardines (Usipa)',
    category: 'dried-fish',
    shortDescription: 'Small dried fish associated with Lake Malawi and traditional Malawian cuisine.',
    fullDescription: [
      'Small dried fish associated with Lake Malawi and traditional Malawian cuisine.',
      'Usipa are usually cooked whole with tomato and onion and served with nsima. Contact our team for available grades, packaging and wholesale quantities.',
    ],
    primaryImage: img('dried-lake-malawi-sardines-usipa', 'Small dried Lake Malawi sardines (usipa) piled in a round bowl'),
    gallery: [],
    countryOfOrigin: null,
    ingredients: null,
    packagingOptions: null,
    storage: null,
    shelfLife: null,
    allergens: null,
    specifications: null,
    verifiedClaims: [],
    availability: 'on-request',
    wholesale: true,
    featured: true,
    seoTitle: 'Dried Lake Malawi Sardines (Usipa) | Lamza Foods',
    seoDescription:
      'Dried Lake Malawi sardines (usipa) for African food retailers and wholesalers in Canada and beyond. Request a quote.',
    copyStatus: 'draft',
  },
  {
    id: 'p-003',
    slug: 'cassava-flour',
    name: 'Cassava Flour',
    category: 'flours-powders',
    shortDescription:
      'Finely milled cassava flour suitable for a variety of traditional and contemporary food preparations.',
    fullDescription: [
      'Finely milled cassava flour suitable for a variety of traditional and contemporary food preparations.',
      'Cassava flour is used for swallows such as fufu and ugali as well as for baking. Contact our team for available pack sizes and wholesale quantities.',
    ],
    primaryImage: img('cassava-flour', 'White cassava flour in a wooden bowl beside cut cassava roots'),
    gallery: [],
    countryOfOrigin: null,
    ingredients: null,
    packagingOptions: null,
    storage: null,
    shelfLife: null,
    allergens: null,
    specifications: null,
    verifiedClaims: [],
    availability: 'on-request',
    wholesale: true,
    featured: true,
    seoTitle: 'Cassava Flour | Lamza Foods',
    seoDescription: 'Finely milled African cassava flour for retail and wholesale supply. Request a quote from Lamza Foods.',
    copyStatus: 'draft',
  },
  {
    id: 'p-004',
    slug: 'baobab-powder',
    name: 'Baobab Powder',
    category: 'flours-powders',
    shortDescription:
      'Natural powder derived from baobab fruit, suitable for beverages, smoothies and a range of culinary applications.',
    fullDescription: [
      'Natural powder derived from baobab fruit, suitable for beverages, smoothies and a range of culinary applications.',
      'The pulp of the baobab fruit dries naturally inside its shell and is milled into a fine, tangy powder. Contact our team for available pack sizes and wholesale quantities.',
    ],
    primaryImage: img('baobab-powder', 'Beige baobab fruit powder in a bowl surrounded by baobab pods'),
    gallery: [],
    countryOfOrigin: null,
    ingredients: null,
    packagingOptions: null,
    storage: null,
    shelfLife: null,
    allergens: null,
    specifications: null,
    verifiedClaims: [],
    availability: 'on-request',
    wholesale: true,
    featured: true,
    seoTitle: 'Baobab Powder | Lamza Foods',
    seoDescription: 'Baobab fruit powder for beverages and cooking, supplied to retailers and wholesalers. Request a quote.',
    copyStatus: 'draft',
  },
  {
    id: 'p-005',
    slug: 'african-spices',
    name: 'African Spices',
    category: 'african-spices',
    shortDescription: 'A selection of African spices offering distinctive aromas, flavours and culinary traditions.',
    fullDescription: [
      'A selection of African spices offering distinctive aromas, flavours and culinary traditions.',
      'Ask our team which whole and ground spices are currently available and in which pack sizes.',
    ],
    primaryImage: img('african-spices', 'Bowls of ground African spices with dried red chillies, seen from above'),
    gallery: [],
    countryOfOrigin: null,
    ingredients: null,
    packagingOptions: null,
    storage: null,
    shelfLife: null,
    allergens: null,
    specifications: null,
    verifiedClaims: [],
    availability: 'on-request',
    wholesale: true,
    featured: true,
    seoTitle: 'African Spices | Lamza Foods',
    seoDescription: 'Whole and ground African spices for retail and wholesale supply in Canada and beyond. Request a quote.',
    copyStatus: 'draft',
  },
  {
    id: 'p-006',
    slug: 'edible-dried-caterpillars',
    name: 'Edible Dried Caterpillars',
    category: 'other-products',
    shortDescription: 'Traditional edible dried caterpillars representing Africa’s diverse culinary heritage.',
    fullDescription: [
      'Traditional edible dried caterpillars representing Africa’s diverse culinary heritage.',
      'Dried caterpillars are rehydrated and cooked in stews or fried with onion and tomato. Contact our team for availability and wholesale quantities.',
    ],
    primaryImage: img('edible-dried-caterpillars', 'Edible dried caterpillars in a wooden bowl'),
    gallery: [],
    countryOfOrigin: null,
    ingredients: null,
    packagingOptions: null,
    storage: null,
    shelfLife: null,
    allergens: null,
    specifications: null,
    verifiedClaims: [],
    availability: 'on-request',
    wholesale: true,
    featured: true,
    seoTitle: 'Edible Dried Caterpillars | Lamza Foods',
    seoDescription: 'Traditional edible dried caterpillars from Africa for specialty retailers and wholesalers. Request a quote.',
    copyStatus: 'draft',
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productsInCategory = (slug: ProductCategorySlug) => products.filter((p) => p.category === slug);
export const featuredProducts = () => products.filter((p) => p.featured);
export const relatedProducts = (product: Product, limit = 3) => {
  const same = products.filter((p) => p.category === product.category && p.slug !== product.slug);
  const others = products.filter((p) => p.category !== product.category);
  return [...same, ...others].slice(0, limit);
};

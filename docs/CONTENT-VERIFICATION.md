# Content verification checklist

Everything below must be confirmed (or corrected) by Lamza Foods before the website goes live.
Business facts live in `data/site.ts`, `data/products.ts`, `data/markets.ts`, `data/faqs.ts` and
`data/news.ts`. Each claim has a `verified` flag; set it to `true` once confirmed.

Setting `NEXT_PUBLIC_HIDE_UNVERIFIED=true` hides every value still marked unverified (statistics,
phone, email, location, trust-bar claims) for a cautious launch.

Legend: **REF** = copied from the supplied homepage reference · **DRAFT** = proposed copy written
for this build · **PLACEHOLDER** = editable stand-in.

## 1. Company details (`data/site.ts`)

| Item | Current value | Source | Action |
|---|---|---|---|
| Telephone | +1 (780) 123 4567 | REF | **Looks like a placeholder number.** Replace with the real number. |
| Email | info@lamzafoods.com | REF | Confirm the mailbox exists and is monitored. |
| Location | Edmonton, Alberta, Canada | REF | Confirm. No street address is shown and no map is used until one is supplied. |
| Social media | Facebook, Instagram, LinkedIn, YouTube | REF (icons only) | Supply profile URLs. Icons are inactive placeholders until then. |
| Domain | https://www.lamzafoods.com | assumption | Confirm the production domain (`NEXT_PUBLIC_SITE_URL`). |

## 2. Statistics (homepage About section and About page)

| Statistic | Value | Source |
|---|---|---|
| Direct partnerships – farmers & suppliers | 100+ | REF, PLACEHOLDER |
| Quality control – tested & verified | 100% | REF, PLACEHOLDER |
| Products – quality products | 50+ | REF, PLACEHOLDER. The catalogue currently lists **6** products. |
| Markets – countries | 2+ | REF, PLACEHOLDER |

## 3. Operational and quality claims

| Where | Claim | Source |
|---|---|---|
| Trust bar | "We work directly with farmers and trusted suppliers across Africa." | REF |
| Trust bar | "Strict quality control ensures safe and authentic products." | REF |
| Trust bar | "We meet international food safety and compliance standards." | REF. Name the standards, or soften the wording. |
| Trust bar | "Timely and efficient delivery to your business." | REF |
| Benefits | Food safety: "We follow strict food safety and hygiene standards." | REF |
| Benefits | Reliable supply: "Consistent quality and on-time delivery." | REF |
| Benefits | Global reach: "Serving markets in Canada and beyond." | REF |
| Benefits | Sustainable impact: "Supporting communities and sustainable growth." | REF |
| About section | Green panel: "Quality you can trust – Food safety, traceability and sustainability…" (decorative icon, not a certification) | REF |
| Hero | "Lamza Foods sources, processes and delivers…" (implies processing activity) | REF |

## 4. Hero photograph packaging text

The hero photograph (taken from the supplied homepage design) shows a pouch printed with
**"Premium Quality", "Product of Africa", "Natural", "High Protein", "No Preservatives", "500g"**.
In Canada, nutrient content claims such as "high protein" and composition claims such as
"no preservatives" are regulated (CFIA labelling rules). Confirm these claims are true for the
product and approved, or supply a photograph of the real packaging.

The pouch artwork in the photograph also shows a slightly different, AI-style rendering of the
logo; replace it with real product photography when available.

## 5. Proposed drafts (need approval)

- About page: company overview, mission, vision, six core values, approach paragraphs.
- Our Process: eight-stage process. **Confirm which stages Lamza Foods performs itself.** The
  site does not claim to own facilities, laboratories, factories or warehouses.
- Markets: Canada, Wholesale, Retail, Export pages (positioning only; no networks, territories or
  agreements are claimed).
- Product descriptions (all six), including the second paragraph on each product page.
- Become a Partner: six partnership benefits.
- FAQs: all answers (written to avoid unconfirmed details).
- Food Safety principles (intended approach, no named procedures or standards).
- News: two **draft** explainer articles (`status: 'draft'`). They are hidden in production and
  appear only in `next dev` or with `SHOW_DRAFT_CONTENT=true`.
- Order volume options on the partnership form (`orderVolumes` in `data/site.ts`).

## 6. Product data still missing (`data/products.ts`)

For every product: country of origin, ingredients, packaging options and weights, storage, shelf
life, allergen information, specifications, and real product photography. Product pages show
"Contact us for product specifications" until these fields are filled in. No prices are shown.

Confirm the Edible Dried Caterpillars species before naming it anywhere. The current copy does not
name a species.

## 7. Empty states awaiting real content

Our Partners (no partner names or logos), Careers (no vacancies), Certifications (no
certifications), Documents (no downloads), News (no published articles).

## 8. Legal

Privacy Policy and Terms of Use are **drafts** with a visible "pending legal review" banner and
bracketed sections (service providers, retention period, liability, governing law). They must be
reviewed by a lawyer; remove `LegalDraftBanner` once approved.

## 9. Brand assets

| Asset | Status |
|---|---|
| Logo SVGs (`public/brand/logo-*.svg`, `brand-icon.svg`) | Traced from the supplied 1290×881 JPEG with potrace, filled with the official colours. Replace with the designer’s original vector files when available. |
| Brand pattern (`brand-pattern.svg`) | Rebuilt from the traced bridge-M plus small geometric marks following the brand guide. Replace with the designer’s pattern file if one exists. |
| Photography | See README → Photography. All photos currently come from the supplied mock-ups and need high-resolution originals. |

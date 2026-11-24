// Captures full-page screenshots of key routes at several widths.
//   node scripts/screenshots.cjs [baseUrl] [outDir] [widths]
const { chromium } = require('playwright');
const fs = require('node:fs');
(async () => {
  const base = process.argv[2] || 'http://localhost:3000';
  const out = process.argv[3] || 'docs/screenshots';
  const widths = (process.argv[4] || '1440,1024,768,390').split(',').map(Number);
  const routes = (process.argv[5] || '/,/products,/products/cassava-flour,/about,/our-process,/markets,/become-a-partner,/request-a-quote,/contact,/faqs').split(',');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
    for (const r of routes) {
      await page.goto(base + r, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      const name = (r === '/' ? 'home' : r.slice(1).replace(/[/?=&%]/g, '_')) + `-${w}.png`;
      await page.screenshot({ path: `${out}/${name}`, fullPage: true });
      console.log(w, r, overflow > 0 ? `OVERFLOW ${overflow}px` : 'ok');
    }
    await page.close();
  }
  await browser.close();
})();

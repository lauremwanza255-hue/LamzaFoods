// Visual QA: capture the homepage at the reference width and build a side-by-side
// comparison with the supplied 1024x1536 reference.
//   node scripts/visual-compare.cjs [baseUrl] [outDir]
const { chromium } = require('playwright');
const sharp = require('sharp');
const path = require('node:path');
const fs = require('node:fs');

(async () => {
  const base = process.argv[2] || 'http://localhost:3000';
  const out = process.argv[3] || 'docs/visual-qa';
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const shot = path.join(out, 'homepage-1024.png');
  await page.screenshot({ path: shot, fullPage: true });
  const sections = await page.evaluate(() => {
    const els = [document.querySelector('header'), ...document.querySelectorAll('main > section'), document.querySelector('footer')];
    return els.filter(Boolean).map((el) => {
      const r = el.getBoundingClientRect();
      return { id: el.getAttribute('aria-labelledby') || el.getAttribute('aria-label') || el.tagName.toLowerCase(), top: Math.round(r.top + scrollY), height: Math.round(r.height) };
    });
  });
  await browser.close();
  const ref = path.join(__dirname, '..', 'assets-src/reference/homepage-reference.jpg');
  const a = await sharp(shot).metadata();
  const H = Math.max(a.height, 1536);
  await sharp({ create: { width: 1024 * 2 + 20, height: H, channels: 3, background: '#ff00ff' } })
    .composite([{ input: ref, left: 0, top: 0 }, { input: shot, left: 1044, top: 0 }])
    .png()
    .toFile(path.join(out, 'compare-reference-vs-build.png'));
  console.log(JSON.stringify({ height: a.height, sections }, null, 1));
})();

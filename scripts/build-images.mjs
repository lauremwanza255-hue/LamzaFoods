// Builds optimised website photography from assets-src.
//
// Source priority for each image:
//   1. assets-src/originals/<name>.(jpg|png|webp)  - full-resolution originals from Lamza Foods
//   2. assets-src/upscaled/<name>.png              - 4x ESRGAN upscale of the reference crop
//   3. assets-src/crops/<name>.png                 - crop of the supplied homepage reference
//
// Drop the photographer's originals into assets-src/originals and run `npm run images:build`.
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'assets-src');
const OUT = path.join(ROOT, 'public/images');

function source(name) {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
    const p = path.join(SRC, 'originals', `${name}.${ext}`);
    if (existsSync(p)) return { file: p, kind: 'original' };
  }
  const up = path.join(SRC, 'upscaled', `${name}.png`);
  if (existsSync(up)) return { file: up, kind: 'upscaled' };
  return { file: path.join(SRC, 'crops', `${name}.png`), kind: 'crop' };
}

async function build(name, outRel, width, { quality = 82, sharpen = true, height } = {}) {
  const { file, kind } = source(name);
  const meta = await sharp(file).metadata();
  let img = sharp(file).resize({ width, height, fit: 'cover', kernel: 'lanczos3', withoutEnlargement: kind === 'original' });
  if (sharpen && kind !== 'original') img = img.sharpen({ sigma: 0.6, m1: 0.6, m2: 1.2 });
  const outFile = path.join(OUT, outRel);
  await mkdir(path.dirname(outFile), { recursive: true });
  const info = await img.webp({ quality, effort: 5 }).toFile(outFile);
  return { name, kind, from: `${meta.width}x${meta.height}`, out: `${info.width}x${info.height}`, kb: Math.round(info.size / 1024) };
}

const report = [];
report.push(await build('hero', 'hero/hero-food-flatlay.webp', 1400));

const products = [
  'dried-smoked-catfish',
  'dried-lake-malawi-sardines-usipa',
  'cassava-flour',
  'baobab-powder',
  'african-spices',
  'edible-dried-caterpillars',
];
for (const p of products) report.push(await build(p, `products/${p}.webp`, 552, { height: 448 }));

report.push(await build('farmland', 'agriculture/african-farmland-sunrise.webp', 1200));
report.push(await build('partnership-handshake', 'partnerships/business-handshake.webp', 1000));

// Brand applications (from the brand guide): packaging and bag mock-ups.
for (const n of ['packaging-gift-box', 'packaging-shopping-bag', 'packaging-takeaway']) {
  if (existsSync(path.join(SRC, 'crops', `${n}.png`)) || existsSync(path.join(SRC, 'upscaled', `${n}.png`)))
    report.push(await build(n, `packaging/${n}.webp`, 900));
}

// Social sharing image: navy ground, dark logo, hero photography.
{
  const W = 1200, H = 630;
  const hero = await sharp(source('hero').file).resize({ width: 760, height: H, fit: 'cover', position: 'right' }).toBuffer();
  const fade = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="${H}"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#1A2453" stop-opacity="1"/><stop offset="0.35" stop-color="#1A2453" stop-opacity="0"/></linearGradient></defs><rect width="760" height="${H}" fill="url(#g)"/></svg>`,
  );
  const logo = await sharp(path.join(ROOT, 'public/brand/logo-dark.svg')).resize({ width: 420 }).png().toBuffer();
  const out = path.join(OUT, 'og/lamza-foods-og.jpg');
  await mkdir(path.dirname(out), { recursive: true });
  await sharp({ create: { width: W, height: H, channels: 3, background: '#1A2453' } })
    .composite([
      { input: hero, left: W - 760, top: 0 },
      { input: fade, left: W - 760, top: 0 },
      { input: logo, left: 70, top: Math.round(H / 2 - 70) },
    ])
    .jpeg({ quality: 84 })
    .toFile(out);
  report.push({ name: 'og', out: `${W}x${H}` });
}

await writeFile(path.join(SRC, 'image-build-report.json'), JSON.stringify(report, null, 2));
console.table(report);

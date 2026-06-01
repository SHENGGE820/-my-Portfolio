import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'assets', 'previews');

const sites = [
  {
    url: 'https://shengge820.github.io/-The-Adventure-of-Atiliia/',
    file: 'atiliia.png',
  },
  {
    url: 'https://shengge820.github.io/shengge/',
    file: 'shengge.png',
  },
  {
    url: 'https://shengge820.github.io/hitcard-web/student.html',
    file: 'hitcard-student.png',
  },
  {
    url: 'https://shengge820.github.io/hitcard-web/teacher.html',
    file: 'hitcard-teacher.png',
  },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const site of sites) {
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(outDir, site.file),
      fullPage: false,
    });
    console.log('OK', site.file);
  } catch (err) {
    console.error('FAIL', site.file, err.message);
  }
}

await browser.close();

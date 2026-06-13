import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlPath = join(__dirname, 'battle_report_SLM_vs_TS_rematch.html');
const pdfPath  = join(__dirname, 'battle_report_SLM_vs_TS_rematch.pdf');

const browser = await puppeteer.launch({ headless: true });
const page    = await browser.newPage();

await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, {
  waitUntil: 'networkidle2',
  timeout: 30000,
});

// Give Google Fonts a moment to load
await new Promise(r => setTimeout(r, 2000));

await page.addStyleTag({ content: `
  @media print {
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
` });

await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
});

await browser.close();
console.log('PDF saved to:', pdfPath);

const { chromium } = require('playwright');

(async () => {
  const url = process.env.URL || 'http://localhost:3000/waitlist';
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const el = document.querySelector('.hero-section .hero-waitlist[data-debug="hero-waitlist"]');
    if (!el) return { found: false };
    const s = window.getComputedStyle(el);
    return {
      found: true,
      outline: s.outline || null,
      outlineColor: s.outlineColor || null,
      outlineStyle: s.outlineStyle || null,
      outlineWidth: s.outlineWidth || null,
      boxShadow: s.boxShadow || null,
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
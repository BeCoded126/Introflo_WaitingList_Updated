const { chromium } = require('playwright');

(async () => {
  const urlBase = process.env.URL || 'http://localhost:3000';
  const pagesToCheck = ['/waitlist', '/'];
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X size
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1',
  });

  for (const p of pagesToCheck) {
    const page = await context.newPage();
    const logs = [];
    page.on('console', (msg) => {
      logs.push({ type: msg.type(), text: msg.text() });
    });
    page.on('pageerror', (err) => {
      logs.push({ type: 'pageerror', text: err.message });
    });
    try {
      await page.goto(urlBase + p, { waitUntil: 'networkidle' , timeout: 15000});
    } catch (err) {
      logs.push({ type: 'goto-error', text: String(err) });
    }
    // Capture screenshot
    await page.screenshot({ path: `./.tmp/screenshot${p === '/' ? 'index' : p.replace(/\//g,'')}.png`, fullPage: true });

    // Evaluate hero DOM and find large spacing elements
    const heroAnalysis = await page.evaluate(() => {
      function styleOf(el) {
        const s = window.getComputedStyle(el);
        return {
          display: s.display,
          visibility: s.visibility,
          height: s.height,
          marginTop: s.marginTop,
          marginBottom: s.marginBottom,
          paddingTop: s.paddingTop,
          paddingBottom: s.paddingBottom,
        };
      }

      const result = { page: location.pathname, items: [] };
      const hero = document.querySelector('.hero-section') || document.querySelector('section');
      if (!hero) {
        result.note = 'no hero section found';
        return result;
      }
      const heroRect = hero.getBoundingClientRect();
      result.heroRect = { top: heroRect.top, bottom: heroRect.bottom, height: heroRect.height };

      // Find nodes in hero that are visible and have bounding height > 40px
      const elems = Array.from(hero.querySelectorAll('*'));
      for (const el of elems) {
        const rect = el.getBoundingClientRect();
        if (rect.height > 40) {
          const s = styleOf(el);
          result.items.push({
            tag: el.tagName.toLowerCase(),
            className: el.className || null,
            id: el.id || null,
            rect: { top: rect.top, bottom: rect.bottom, height: rect.height, width: rect.width },
            style: s,
            outerHTMLSnippet: el.outerHTML.slice(0, 400),
          });
        }
      }

      // Identify large blank gaps between elements by sorting by top and finding gaps
      const sorted = result.items.slice().sort((a, b) => a.rect.top - b.rect.top);
      const gaps = [];
      for (let i = 0; i < sorted.length - 1; i++) {
        const cur = sorted[i];
        const next = sorted[i + 1];
        const gap = next.rect.top - cur.rect.bottom;
        if (gap > 20) {
          gaps.push({ after: cur.className, before: next.className, gap });
        }
      }
      result.gaps = gaps;
      // Also pick the element with largest rect.height
      result.largest = result.items.reduce((a, b) => (a.rect.height > b.rect.height ? a : b), result.items[0] || null);
      return result;
    });

    console.log('====', p, 'heroAnalysis ====');
    console.log(JSON.stringify(heroAnalysis, null, 2));

    console.log('====', p, 'logs ====');
    console.log(JSON.stringify(logs, null, 2));
    await page.close();
  }

  await browser.close();
})();

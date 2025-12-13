const { chromium } = require('playwright');

async function checkAt(width) {
  const url = process.env.URL || 'http://localhost:3000/waitlist';
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width, height: 812 } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const out = {};
    const title = document.querySelector('.hero-section .hero-title');
    if (title) {
      const r = title.getBoundingClientRect();
      out.title = {
        found: true,
        clientWidth: title.clientWidth,
        scrollWidth: title.scrollWidth,
        boundingWidth: Math.round(r.width),
        clipped: title.scrollWidth > title.clientWidth,
      };
    } else {
      out.title = { found: false };
    }

    const li3 = document.querySelector('.hero-section .hero-bullets li:nth-child(3)');
    if (li3) {
      const dot = li3.querySelector('.bullet-dot');
      const text = Array.from(li3.querySelectorAll('span')).find(s => !s.classList.contains('bullet-dot'));
      if (dot && text) {
        const d = dot.getBoundingClientRect();
        const t = text.getBoundingClientRect();
        out.bullet3 = {
          found: true,
          dotTop: Math.round(d.top),
          textTop: Math.round(t.top),
          offset: Math.round(d.top - t.top),
          dotHeight: Math.round(d.height),
          textHeight: Math.round(t.height)
        };
      } else {
        out.bullet3 = { found: false };
      }
    } else {
      out.bullet3 = { found: false };
    }

    const waitlist = document.querySelector('.hero-section .waitlist-form--hero');
    if (waitlist) {
      const s = window.getComputedStyle(waitlist);
      out.waitlist = {
        found: true,
        outline: s.outline || null,
        boxShadow: s.boxShadow || null
      };
    } else {
      out.waitlist = { found: false };
    }

    const input = document.querySelector('.hero-section input.waitlist-input');
    if (input) {
      const cs = window.getComputedStyle(input);
      const ph = window.getComputedStyle(input, '::placeholder');
      out.input = {
        found: true,
        border: cs.border || cs.borderTop || null,
        borderColor: cs.borderColor || null,
        fontSize: cs.fontSize || null,
        placeholderFontSize: ph ? ph.fontSize : null
      };
    } else {
      out.input = { found: false };
    }

    const button = document.querySelector('.hero-section .waitlist-button');
    if (button) {
      const cb = window.getComputedStyle(button);
      out.button = {
        found: true,
        border: cb.border || cb.borderTop || null,
        borderColor: cb.borderColor || null
      };
    } else {
      out.button = { found: false };
    }

    return out;
  });

  // Also collect footer waitlist info
  const footerInfo = await page.evaluate(() => {
    const wrapper = document.querySelector('footer .waitlist-form--footer');
    const input = document.querySelector('footer input.waitlist-input');
    const button = document.querySelector('footer .waitlist-button');
    return {
      wrapper: wrapper ? Array.from(wrapper.classList) : null,
      input: !!input,
      button: !!button,
    };
  });

  return { result, footerInfo };

  await browser.close();
  return result;
}

(async () => {
  const widths = [1200, 390, 320];
  const results = {};
  for (const w of widths) {
    results[w] = await checkAt(w);
  }
  console.log(JSON.stringify(results, null, 2));
})();

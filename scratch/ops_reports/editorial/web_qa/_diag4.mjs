import { chromium } from "file:///C:/Users/zh577/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules/playwright-core/index.mjs";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";

const CANDIDATES = {
  "0 baseline (no fix)": "",
  "1 canvas{max-width:100%}": "canvas{max-width:100%}",
  "2 canvas{width:100%;height:100%}": "canvas{width:100%!important;height:100%!important}",
  "3 .hero{position:relative}+canvas max-w": ".hero{position:relative}canvas{max-width:100%}",
  "4 canvas{position:absolute;width:100%;height:100%;max-width:100%}": "canvas{width:100%!important;height:100%!important;max-width:100%!important}",
};

const b = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
for (const [name, css] of Object.entries(CANDIDATES)) {
  for (const dev of [320, 390]) {
    const ctx = await b.newContext({ viewport: { width: dev, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: UA });
    if (css) await ctx.addInitScript((c) => {
      const add = () => { const s = document.createElement("style"); s.textContent = c; (document.head || document.documentElement).appendChild(s); };
      if (document.head) add(); else document.addEventListener("readystatechange", add, { once: true });
      new MutationObserver((_, o) => { if (document.head) { add(); o.disconnect(); } }).observe(document.documentElement, { childList: true });
    }, css);
    const p = await ctx.newPage();
    try {
      await p.goto("https://jasoncholloway.com/", { waitUntil: "domcontentloaded" });
      await p.waitForTimeout(2600);
      const r = await p.evaluate(() => {
        const c = document.querySelector("canvas");
        const cr = c ? c.getBoundingClientRect() : null;
        const hero = document.querySelector(".hero");
        return {
          inner: window.innerWidth, docSW: document.documentElement.scrollWidth,
          canvasBox: cr ? `${Math.round(cr.width)}x${Math.round(cr.height)}` : "none",
          canvasAttr: c ? `${c.width}x${c.height}` : "none",
          heroW: hero ? Math.round(hero.getBoundingClientRect().width) : null,
          heroPos: hero ? getComputedStyle(hero).position : null,
        };
      });
      console.log(`${name.padEnd(46)} dev=${dev} -> inner=${r.inner} docSW=${r.docSW} canvasBox=${r.canvasBox} canvasAttr=${r.canvasAttr} hero=${r.heroW}(${r.heroPos})`);
    } catch (e) { console.log(`${name} dev=${dev} ERROR ${String(e).slice(0, 90)}`); }
    await ctx.close();
  }
}
await b.close();

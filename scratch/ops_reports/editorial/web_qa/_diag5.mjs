import { chromium } from "file:///C:/Users/zh577/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules/playwright-core/index.mjs";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const b = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
const ctx = await b.newContext({ viewport: { width: 320, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: UA });
const p = await ctx.newPage();
await p.goto("https://jasoncholloway.com/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2600);

console.log(JSON.stringify(await p.evaluate(() => {
  const log = [];
  const inner0 = window.innerWidth;
  // every element whose border box extends past the device width, incl. fixed
  const wide = [];
  for (const el of document.querySelectorAll("html, body, body *")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none") continue;
    const r = el.getBoundingClientRect();
    if (r.right > 320.5 || r.width > 320.5) {
      wide.push({ el: el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : ""),
        w: +r.width.toFixed(1), left: +r.left.toFixed(1), right: +r.right.toFixed(1), pos: cs.position, transform: cs.transform === "none" ? "" : "T" });
    }
  }
  log.push({ inner0, docSW: document.documentElement.scrollWidth, bodySW: document.body.scrollWidth, wideCount: wide.length, wide: wide.slice(0, 20) });
  return log;
}), null, 1));

// bisect: hide suspects one at a time, force reflow, re-read innerWidth
const SUSPECTS = ["#mobile-nav", ".bg-sacred-geometry", "canvas", ".header", "footer", ".hero", "main"];
for (const sel of SUSPECTS) {
  const r = await p.evaluate((sel) => {
    const els = [...document.querySelectorAll(sel)];
    const prev = els.map((e) => e.style.display);
    els.forEach((e) => (e.style.display = "none"));
    void document.documentElement.offsetWidth;
    const w = { inner: window.innerWidth, docSW: document.documentElement.scrollWidth };
    els.forEach((e, i) => (e.style.display = prev[i]));
    void document.documentElement.offsetWidth;
    return { n: els.length, ...w };
  }, sel);
  console.log(`hide ${sel.padEnd(22)} (n=${r.n}) -> inner=${r.inner} docSW=${r.docSW}`);
}

// and: what does innerWidth do if we hide EVERYTHING but keep <main>?
console.log(JSON.stringify(await p.evaluate(() => {
  const out = {};
  const kids = [...document.body.children];
  const prev = kids.map((k) => k.style.display);
  for (let i = 0; i < kids.length; i++) {
    kids.forEach((k, j) => (k.style.display = j === i ? "" : "none"));
    void document.documentElement.offsetWidth;
    out[kids[i].tagName.toLowerCase() + "." + (typeof kids[i].className === "string" ? kids[i].className.trim().split(/\s+/)[0] : "")] =
      `${window.innerWidth}/${document.documentElement.scrollWidth}`;
  }
  kids.forEach((k, j) => (k.style.display = prev[j]));
  return out;
}), null, 1));

await b.close();

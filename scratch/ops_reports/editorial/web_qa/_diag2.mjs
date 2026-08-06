import { chromium } from "file:///C:/Users/zh577/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules/playwright-core/index.mjs";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const b = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
const ctx = await b.newContext({ viewport: { width: 320, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: UA });
const p = await ctx.newPage();
await p.goto("https://jasoncholloway.com/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2500);

console.log(JSON.stringify(await p.evaluate(() => {
  const inner = window.innerWidth;
  const rigid = [];
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none") continue;
    const r = el.getBoundingClientRect();
    // things wider than the *device* width that are not simply full-bleed
    if (r.width > 321 && r.width <= inner + 2) {
      const parent = el.parentElement;
      const pw = parent ? parent.getBoundingClientRect().width : 0;
      // report only leaf-ish / constrained things
      if (cs.whiteSpace === "nowrap" || /px/.test(cs.minWidth) && parseFloat(cs.minWidth) > 300 || (el.children.length === 0 && el.scrollWidth > 321))
        rigid.push({ el: el.tagName.toLowerCase() + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : ""),
          w: Math.round(r.width), sw: el.scrollWidth, minW: cs.minWidth, ws: cs.whiteSpace, pw: Math.round(pw), text: (el.textContent || "").trim().slice(0, 40) });
    }
  }
  // binary-search the true min width contributor: widest min-content among block boxes
  const probes = [];
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none") continue;
    const r = el.getBoundingClientRect();
    if (r.width >= inner - 1 && el.children.length <= 2) {
      probes.push({ el: el.tagName.toLowerCase() + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : ""), w: Math.round(r.width), display: cs.display, gtc: cs.gridTemplateColumns, text: (el.textContent || "").trim().slice(0, 40) });
    }
  }
  return { inner, docSW: document.documentElement.scrollWidth, rigid: rigid.slice(0, 25), probes: probes.slice(0, 25) };
}), null, 1));

// newsletter row geometry
console.log("\n### NEWSLETTER ROW ###");
console.log(JSON.stringify(await p.evaluate(() => {
  const out = [];
  for (const btn of document.querySelectorAll("button[type=submit]")) {
    const row = btn.parentElement;
    const inp = row.querySelector("input[type=email]");
    const rb = btn.getBoundingClientRect(), rr = row.getBoundingClientRect();
    out.push({
      rowW: Math.round(rr.width), rowDisplay: getComputedStyle(row).display, rowFlexWrap: getComputedStyle(row).flexWrap, rowGap: getComputedStyle(row).gap,
      btnW: Math.round(rb.width), btnSW: btn.scrollWidth, btnShrink: getComputedStyle(btn).flexShrink, btnWS: getComputedStyle(btn).whiteSpace,
      inpW: inp ? Math.round(inp.getBoundingClientRect().width) : null, inpMinW: inp ? getComputedStyle(inp).minWidth : null, inpFlex: inp ? getComputedStyle(inp).flex : null,
      text: btn.textContent.trim(),
    });
  }
  return out;
}), null, 1));

await b.close();

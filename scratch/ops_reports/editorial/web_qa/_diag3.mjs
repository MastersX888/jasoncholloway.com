import { chromium } from "file:///C:/Users/zh577/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules/playwright-core/index.mjs";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const b = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
const ctx = await b.newContext({ viewport: { width: 320, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: UA });
const p = await ctx.newPage();
await p.goto("https://jasoncholloway.com/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2500);

// Clamp the document to the real device width, then find what still sticks out.
const out = await p.evaluate(() => {
  const DEV = 320;
  const st = document.createElement("style");
  st.textContent = `html,body{width:${DEV}px!important;max-width:${DEV}px!important;overflow-x:hidden!important}`;
  document.head.appendChild(st);
  // force reflow
  void document.body.offsetWidth;

  const bad = [];
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    if (cs.position === "fixed") continue; // sized by viewport, always a symptom
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    const overflows = r.right > DEV + 1 || r.width > DEV + 1;
    if (!overflows) continue;
    // deepest offenders only: no overflowing element child
    let childOverflows = false;
    for (const c of el.children) {
      const ccs = getComputedStyle(c);
      if (ccs.display === "none" || ccs.position === "fixed") continue;
      const cr = c.getBoundingClientRect();
      if (cr.right > DEV + 1 || cr.width > DEV + 1) { childOverflows = true; break; }
    }
    if (childOverflows) continue;
    bad.push({
      el: el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : ""),
      w: Math.round(r.width), right: Math.round(r.right), sw: el.scrollWidth,
      pos: cs.position, display: cs.display, ws: cs.whiteSpace, minW: cs.minWidth,
      cssW: cs.width, flex: cs.flex, gtc: cs.gridTemplateColumns,
      parent: el.parentElement ? el.parentElement.tagName.toLowerCase() + (typeof el.parentElement.className === "string" && el.parentElement.className ? "." + el.parentElement.className.trim().split(/\s+/).slice(0, 2).join(".") : "") : null,
      parentDisplay: el.parentElement ? getComputedStyle(el.parentElement).display : null,
      text: (el.textContent || "").trim().slice(0, 45),
    });
  }
  st.remove();
  return bad.slice(0, 25);
});
console.log("### DEEPEST OVERFLOWERS WHEN BODY CLAMPED TO 320 ###");
console.log(JSON.stringify(out, null, 1));

// hero CTA row geometry
console.log("\n### HERO CTA ROW ###");
console.log(JSON.stringify(await p.evaluate(() => {
  const row = document.querySelector(".hero-ctas");
  if (!row) return null;
  const cs = getComputedStyle(row);
  return { w: Math.round(row.getBoundingClientRect().width), wrap: cs.flexWrap, gap: cs.gap,
    kids: [...row.children].map(k => { const r = k.getBoundingClientRect(); const kc = getComputedStyle(k);
      return { t: k.textContent.trim().slice(0, 26), w: Math.round(r.width), sw: k.scrollWidth, shrink: kc.flexShrink, ws: kc.whiteSpace, pad: kc.padding }; }) };
}), null, 1));

await b.close();

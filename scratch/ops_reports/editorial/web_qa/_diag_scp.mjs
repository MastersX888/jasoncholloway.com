import { chromium } from "file:///C:/Users/zh577/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules/playwright-core/index.mjs";
import path from "node:path";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\zh577\\.gemini\\antigravity\\scratch\\jasoncholloway\\scratch\\ops_reports\\editorial\\web_qa";
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";

const b = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });

for (const vpw of [320, 390]) {
  const ctx = await b.newContext({ viewport: { width: vpw, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: UA });
  const p = await ctx.newPage();
  await p.goto("https://seventhcitypress.com/contact/", { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);

  const info = await p.evaluate(() => {
    const widest = [];
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      if (cs.display === "none") continue;
      const r = el.getBoundingClientRect();
      if (r.width > window.innerWidth * 0.98 && r.width > 400) {
        widest.push({
          el: el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : ""),
          w: Math.round(r.width),
          left: Math.round(r.left),
          right: Math.round(r.right),
          cssWidth: cs.width, minWidth: cs.minWidth, maxWidth: cs.maxWidth,
          display: cs.display, gridCols: cs.gridTemplateColumns, flexDir: cs.flexDirection,
          whiteSpace: cs.whiteSpace, overflowX: cs.overflowX,
          text: (el.textContent || "").trim().slice(0, 40),
        });
      }
    }
    // min-content probe: what is the widest un-shrinkable descendant
    const rigid = [];
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      if (cs.display === "none") continue;
      const r = el.getBoundingClientRect();
      if (r.width > 320 && (cs.whiteSpace === "nowrap" || parseFloat(cs.minWidth) > 320 || /px/.test(cs.width) && parseFloat(cs.width) > 400)) {
        rigid.push({ el: el.tagName.toLowerCase() + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).slice(0,2).join(".") : ""), w: Math.round(r.width), whiteSpace: cs.whiteSpace, minWidth: cs.minWidth, cssWidth: cs.width, text: (el.textContent||"").trim().slice(0,40) });
      }
    }
    const grids = [...document.querySelectorAll("*")].filter(e => getComputedStyle(e).display === "grid").map(e => ({
      el: e.tagName.toLowerCase() + (typeof e.className === "string" && e.className ? "." + e.className.trim().split(/\s+/).slice(0,3).join(".") : ""),
      cols: getComputedStyle(e).gridTemplateColumns,
      w: Math.round(e.getBoundingClientRect().width),
    }));
    return {
      innerWidth: window.innerWidth,
      outerWidth: window.outerWidth,
      docScrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      visualViewport: window.visualViewport ? { w: Math.round(window.visualViewport.width), scale: window.visualViewport.scale } : null,
      devicePixelRatio: window.devicePixelRatio,
      viewportMeta: document.querySelector('meta[name=viewport]')?.content,
      widest: widest.slice(0, 20),
      rigid: rigid.slice(0, 15),
      grids: grids.slice(0, 15),
      inputW: Math.round(document.querySelector("#contact-name")?.getBoundingClientRect().width || 0),
    };
  });
  console.log(`\n########## scp/contact/ device width=${vpw} ##########`);
  console.log(JSON.stringify(info, null, 1));

  // hamburger behaviour
  const tog = await p.$(".mobile-menu-toggle");
  const tb = await tog.boundingBox();
  const covered = await p.evaluate(() => {
    const t = document.querySelector(".mobile-menu-toggle");
    const r = t.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const top = document.elementFromPoint(cx, cy);
    return {
      togRect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      centerPoint: { cx: Math.round(cx), cy: Math.round(cy) },
      elementAtCenter: top ? top.tagName.toLowerCase() + (typeof top.className === "string" && top.className ? "." + top.className.trim().split(/\s+/)[0] : "") : null,
      isToggleOrChild: top ? (top === t || t.contains(top)) : false,
      inViewport: r.right <= window.innerWidth && r.left >= 0,
    };
  });
  console.log("HAMBURGER HIT-TEST: " + JSON.stringify(covered));

  // force JS click to see if handler works at all
  const jsClick = await p.evaluate(() => {
    document.querySelector(".mobile-menu-toggle").click();
    return true;
  });
  await p.waitForTimeout(700);
  const after = await p.evaluate(() => {
    const n = document.querySelector("#mobile-nav");
    const r = n.getBoundingClientRect();
    return { drawerLeft: Math.round(r.left), drawerRight: Math.round(r.right), innerWidth: window.innerWidth, ariaExpanded: document.querySelector(".mobile-menu-toggle").getAttribute("aria-expanded"), transform: getComputedStyle(n).transform, links: [...n.querySelectorAll("a")].map(a=>{const lr=a.getBoundingClientRect();return {t:(a.textContent||'').trim(),x:Math.round(lr.x),w:Math.round(lr.width),h:Math.round(lr.height),vis:lr.left<window.innerWidth}}) };
  });
  console.log("AFTER JS CLICK: " + JSON.stringify(after));
  await p.screenshot({ path: path.join(OUT, `scp_contact_navopen_${vpw}w.jpg`), type: "jpeg", quality: 55 });
  await ctx.close();
}

// SCP footer white-on-white check
const ctx2 = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: UA });
const p2 = await ctx2.newPage();
await p2.goto("https://seventhcitypress.com/", { waitUntil: "networkidle" });
await p2.waitForTimeout(1200);
const foot = await p2.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll(".social-link-handle, .social-link, footer a, footer span")) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    let bgEl = el, bg = "transparent";
    while (bgEl) { const c = getComputedStyle(bgEl).backgroundColor; if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) { bg = c + " <- " + bgEl.tagName.toLowerCase() + "." + (typeof bgEl.className==='string'?bgEl.className.trim().split(/\s+/)[0]:''); break; } bgEl = bgEl.parentElement; }
    out.push({ el: el.tagName.toLowerCase() + "." + (typeof el.className === "string" ? el.className.trim().split(/\s+/)[0] : ""), text: (el.textContent||'').trim().slice(0,28), color: cs.color, bgChain: bg, y: Math.round(r.top + window.scrollY) });
  }
  return out.slice(0, 30);
});
console.log("\n########## SCP FOOTER COLORS ##########");
console.log(JSON.stringify(foot, null, 1));
await p2.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await p2.waitForTimeout(900);
await p2.screenshot({ path: path.join(OUT, "scp_footer_390x844.jpg"), type: "jpeg", quality: 60 });

// jch gold pull-quote contrast
const p3 = await ctx2.newPage();
await p3.goto("https://jasoncholloway.com/", { waitUntil: "networkidle" });
await p3.waitForTimeout(1200);
const pq = await p3.evaluate(() => {
  const els = [...document.querySelectorAll("p")].filter(e => (e.textContent||'').includes("technical spec"));
  return els.map(e => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect();
    let bgEl = e, bg="none"; while(bgEl){const c=getComputedStyle(bgEl).backgroundColor; if(c && !/rgba\(0, 0, 0, 0\)/.test(c)){bg=c+" <- "+bgEl.tagName.toLowerCase()+"."+(typeof bgEl.className==='string'?bgEl.className.trim().split(/\s+/)[0]:'');break;} bgEl=bgEl.parentElement;}
    return { text:(e.textContent||'').trim().slice(0,60), color: cs.color, bgChain: bg, y: Math.round(r.top+window.scrollY), parentBgImage: getComputedStyle(e.parentElement).backgroundImage.slice(0,60) }; });
});
console.log("\n########## JCH PULL-QUOTE ##########");
console.log(JSON.stringify(pq, null, 1));
if (pq.length) { await p3.evaluate((y) => window.scrollTo(0, y - 150), pq[0].y); await p3.waitForTimeout(700); await p3.screenshot({ path: path.join(OUT, "jch_pullquote_contrast_390x844.jpg"), type: "jpeg", quality: 65 }); }

await b.close();
console.log("\nDIAG DONE");

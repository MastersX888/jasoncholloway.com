/** Focused re-check of the 3 checks that failed in _verify_fixes.mjs. */
import { chromium } from "file:///C:/Users/zh577/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules/playwright-core/index.mjs";
import fs from "node:fs";
import path from "node:path";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\zh577\\.gemini\\antigravity\\scratch\\jasoncholloway\\scratch\\ops_reports\\editorial\\web_qa";
const WT = "C:\\Users\\zh577\\.gemini\\antigravity\\scratch\\_webfix_wt";
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const SCP_CSS = fs.readFileSync(path.join(WT, "seventhcitypress/app/globals.css"), "utf8");
const JCH_CSS = fs.readFileSync(path.join(WT, "app/responsive.css"), "utf8");

async function applyFixes(p, site) {
  await p.evaluate(({ css, site }) => {
    if (site === "scp") {
      for (const d of document.querySelectorAll("section .container > div[style*='340px']")) { d.removeAttribute("style"); d.classList.add("resp-main-sidebar"); }
      for (const a of document.querySelectorAll("a[href^='mailto:press@']")) if (a.closest(".card")) a.classList.add("card-link");
      for (const a of document.querySelectorAll("a[href$='Masters_X_Press_Kit.pdf']")) if (!a.classList.contains("btn")) { a.classList.add("card-link"); a.style.display = ""; }
      for (const el of document.querySelectorAll(".footer [style*='--text-faint']")) { el.classList.add("footer-faint"); el.style.color = ""; }
    } else {
      for (const inp of document.querySelectorAll(".newsletter-input")) {
        const row = inp.parentElement; const wasCol = getComputedStyle(row).flexDirection === "column";
        row.removeAttribute("style"); row.classList.add("newsletter-row"); if (wasCol) row.classList.add("newsletter-row-compact");
      }
      for (const a of document.querySelectorAll(".card a[href^='mailto:'], .card a[href^='https://seventhcitypress.com/']")) {
        if (a.classList.contains("btn")) continue;
        a.classList.add("card-link");
        if (a.style.display === "block") { a.style.display = ""; a.style.width = "100%"; a.style.justifyContent = "center"; }
      }
    }
    for (const el of document.querySelectorAll("input, textarea, select")) el.style.outline = "";
    const s = document.createElement("style"); s.textContent = css; document.body.appendChild(s);
    const kill = document.createElement("style");
    kill.textContent = ".animate-fade-up,.animate-fade-in{animation:none!important;opacity:1!important;transform:none!important}";
    document.body.appendChild(kill);
  }, { css: site === "scp" ? SCP_CSS : JCH_CSS, site });
  await p.waitForTimeout(400);
}

const b = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });

// --- contrast recheck on SCP (light-context SocialLinks) ---
for (const url of ["https://seventhcitypress.com/", "https://seventhcitypress.com/contact/"]) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, userAgent: UA });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(1800);
  await applyFixes(p, "scp");
  const r = await p.evaluate(() => {
    const parse = (c) => { const m = c.match(/[\d.]+/g); return m ? m.map(Number) : null; };
    const over = (fg, bg) => { const a = fg[3] === undefined ? 1 : fg[3]; return [0, 1, 2].map((i) => a * fg[i] + (1 - a) * bg[i]); };
    const effBg = (el) => { let st = [], n = el; while (n && n !== document.documentElement) { const c = parse(getComputedStyle(n).backgroundColor); if (c && (c[3] === undefined || c[3] > 0)) st.push(c); n = n.parentElement; } st.push([255, 255, 255]); let bg = st[st.length - 1]; for (let i = st.length - 2; i >= 0; i--) bg = over(st[i], bg); return bg; };
    const eop = (el) => { let o = 1, n = el; while (n && n !== document.documentElement) { o *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; } return o; };
    const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    const L = (x) => 0.2126 * lin(x[0]) + 0.7152 * lin(x[1]) + 0.0722 * lin(x[2]);
    const out = [], socials = [];
    for (const el of document.querySelectorAll("body *")) {
      if (el.children.length) continue;
      const txt = (el.textContent || "").trim(); if (!txt) continue;
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      const rr = el.getBoundingClientRect(); if (!rr.width || !rr.height) continue;
      const bg = effBg(el); let fg = parse(cs.color);
      fg = over([fg[0], fg[1], fg[2], (fg[3] === undefined ? 1 : fg[3]) * eop(el)], bg);
      const ratio = (Math.max(L(fg), L(bg)) + 0.05) / (Math.min(L(fg), L(bg)) + 0.05);
      const fs = parseFloat(cs.fontSize), req = fs >= 24 || (fs >= 18.66 && parseInt(cs.fontWeight) >= 700) ? 3 : 4.5;
      const row = { el: el.tagName.toLowerCase() + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/)[0] : ""), text: txt.slice(0, 30), ratio: +ratio.toFixed(2), req, fs: +fs.toFixed(1) };
      if (ratio < req) out.push(row);
      if (el.closest(".social-links") || (el.closest(".footer-links") && !el.closest(".footer"))) socials.push(row);
    }
    return { fails: out, socials: socials.slice(0, 10) };
  });
  console.log(`\n### ${url} contrast ###`);
  console.log("FAILS: " + (r.fails.length ? JSON.stringify(r.fails, null, 1) : "none"));
  console.log("light-context social/footer link samples: " + JSON.stringify(r.socials));
  await ctx.close();
}

// --- jch homepage clipping + layout viewport at 320 ---
const ctx = await b.newContext({ viewport: { width: 320, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: UA });
const p = await ctx.newPage();
await p.goto("https://jasoncholloway.com/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2200);
await applyFixes(p, "jch");
console.log("\n### jch / @320 ###");
console.log(JSON.stringify(await p.evaluate(() => {
  const clipped = [];
  for (const el of document.querySelectorAll("body *")) {
    if (el.children.length) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || /auto|scroll/.test(cs.overflowX)) continue;
    if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 4) clipped.push({ el: el.tagName.toLowerCase(), sw: el.scrollWidth, cw: el.clientWidth, text: (el.textContent || "").trim().slice(0, 30) });
  }
  const btns = [...document.querySelectorAll(".card .btn")].map((x) => { const r = x.getBoundingClientRect(); return { t: x.textContent.trim().slice(0, 22), w: Math.round(r.width), sw: x.scrollWidth }; });
  return { inner: window.innerWidth, docSW: document.documentElement.scrollWidth, clipped, cardBtns: btns.slice(0, 8) };
}), null, 1));
await p.screenshot({ path: path.join(OUT, "FIXED_jch_home_320x568.jpg"), type: "jpeg", quality: 40, clip: { x: 0, y: 0, width: 320, height: 568 } });
await ctx.close();
await b.close();
console.log("\nVERIFY2 DONE");

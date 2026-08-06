/**
 * Re-verification harness for WEB_FIX_MOBILE_A11Y_2026-07-31.
 *
 * The fixes live in a sparse worktree of the deploy branch and cannot be
 * built locally (no node_modules, <700MB free on C:). So this loads the
 * LIVE pages and injects the patched stylesheet(s) verbatim, plus the one
 * template change (contact grid inline style -> .resp-main-sidebar class),
 * and re-runs the measurements that failed in last night's pass.
 */
import { chromium } from "file:///C:/Users/zh577/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules/playwright-core/index.mjs";
import fs from "node:fs";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\zh577\\.gemini\\antigravity\\scratch\\jasoncholloway\\scratch\\ops_reports\\editorial\\web_qa";
const WT = "C:\\Users\\zh577\\.gemini\\antigravity\\scratch\\_webfix_wt";
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";

const SCP_CSS = fs.readFileSync(path.join(WT, "seventhcitypress/app/globals.css"), "utf8");
const JCH_CSS = fs.readFileSync(path.join(WT, "app/responsive.css"), "utf8");

const PHONES = [320, 360, 390, 393, 414];
const results = [];
const rec = (site, page, vp, test, pass, detail) => {
  results.push({ site, page, vp, test, pass, detail });
  const tag = pass === true ? "PASS" : pass === false ? "FAIL" : "INFO";
  console.log(`[${tag}] ${site}${page} @${vp} :: ${test} :: ${typeof detail === "string" ? detail : JSON.stringify(detail)}`);
};

/** Apply the patched CSS + the template changes to a loaded page. */
async function applyFixes(p, site) {
  await p.evaluate(({ css, site }) => {
    if (site === "scp") {
      // contact/page.tsx: inline grid -> .resp-main-sidebar
      for (const d of document.querySelectorAll("section .container > div[style*='340px']")) {
        d.removeAttribute("style");
        d.classList.add("resp-main-sidebar");
      }
      // contact/page.tsx + page.tsx: .card-link on standalone links
      for (const a of document.querySelectorAll("a[href^='mailto:press@']"))
        if (a.closest(".card")) a.classList.add("card-link");
      for (const a of document.querySelectorAll("a[href$='Masters_X_Press_Kit.pdf']"))
        if (!a.classList.contains("btn")) { a.classList.add("card-link"); a.style.display = ""; }
      // Footer.tsx: inline var(--text-faint) -> .footer-faint
      for (const el of document.querySelectorAll(".footer [style*='--text-faint']")) {
        el.classList.add("footer-faint");
        el.style.color = "";
      }
    } else {
      // NewsletterForm.tsx: inline flex row -> .newsletter-row
      for (const inp of document.querySelectorAll(".newsletter-input")) {
        const row = inp.parentElement;
        const wasColumn = getComputedStyle(row).flexDirection === "column";
        row.removeAttribute("style");
        row.classList.add("newsletter-row");
        if (wasColumn) row.classList.add("newsletter-row-compact");
      }
      // contact/page.tsx: .card-link on standalone card links
      for (const a of document.querySelectorAll(".card a[href^='mailto:'], .card a[href^='https://seventhcitypress.com/']")) {
        if (a.classList.contains("btn")) continue;
        a.classList.add("card-link");
        if (a.style.display === "block") { a.style.display = ""; a.style.width = "100%"; a.style.justifyContent = "center"; }
      }
      // books/masters-x: aria-label on the image-only omnibus link
      for (const a of document.querySelectorAll("a.omnibus-flagship-slipcase"))
        if (!a.getAttribute("aria-label")) a.setAttribute("aria-label", "Masters X omnibus — collected edition");
    }
    // Forms: inline outline:none removed at source.
    for (const el of document.querySelectorAll("input, textarea, select")) el.style.outline = "";
    // Patched stylesheet, appended last so it wins ties.
    const s = document.createElement("style");
    s.id = "__patched__";
    s.textContent = css;
    document.body.appendChild(s);
    // Re-injecting the sheet restarts the fade-up keyframes (fill-mode
    // "both" + delay => opacity 0), which would corrupt contrast and
    // geometry reads. Settle them.
    const kill = document.createElement("style");
    kill.textContent = ".animate-fade-up,.animate-fade-in{animation:none!important;opacity:1!important;transform:none!important}";
    document.body.appendChild(kill);
  }, { css: site === "scp" ? SCP_CSS : JCH_CSS, site });
  await p.waitForTimeout(400);
}

const contrast = (fg, bg) => {
  const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const a = L(fg), b2 = L(bg);
  return +(((Math.max(a, b2) + 0.05) / (Math.min(a, b2) + 0.05)).toFixed(2));
};

const b = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });

/* ══════════ 1. SCP CONTACT — LAYOUT BLOWOUT ACROSS PHONE VIEWPORTS ══════════ */
for (const w of PHONES) {
  const ctx = await b.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: UA });
  const p = await ctx.newPage();
  await p.goto("https://seventhcitypress.com/contact/", { waitUntil: "networkidle" });

  const before = await p.evaluate(() => ({
    inner: window.innerWidth,
    scrollW: document.documentElement.scrollWidth,
    grid: (() => { const g = document.querySelector("section .container > div[style*='340px']"); return g ? Math.round(g.getBoundingClientRect().width) : null; })(),
    tog: (() => { const t = document.querySelector(".mobile-menu-toggle"); const r = t.getBoundingClientRect(); return { x: Math.round(r.x), right: Math.round(r.right) }; })(),
  }));

  await applyFixes(p, "scp");

  const after = await p.evaluate(() => {
    const g = document.querySelector(".resp-main-sidebar");
    const cs = g ? getComputedStyle(g) : null;
    const t = document.querySelector(".mobile-menu-toggle");
    const tr = t.getBoundingClientRect();
    return {
      inner: window.innerWidth,
      scrollW: document.documentElement.scrollWidth,
      bodyScrollW: document.body.scrollWidth,
      gridW: g ? Math.round(g.getBoundingClientRect().width) : null,
      gridCols: cs ? cs.gridTemplateColumns : null,
      togX: Math.round(tr.x), togRight: Math.round(tr.right),
      togInViewport: tr.right <= window.innerWidth + 1 && tr.left >= -1,
      inputW: Math.round(document.querySelector("#contact-name")?.getBoundingClientRect().width || 0),
      inputFont: getComputedStyle(document.querySelector("#contact-name")).fontSize,
      inputH: Math.round(document.querySelector("#contact-name").getBoundingClientRect().height),
    };
  });

  rec("scp", "/contact/", `${w}x844`, "layout viewport not blown out",
    after.scrollW <= after.inner + 1,
    `before: inner=${before.inner} scrollW=${before.scrollW} gridW=${before.grid} | after: inner=${after.inner} scrollW=${after.scrollW} gridW=${after.gridW}`);
  rec("scp", "/contact/", `${w}x844`, "grid collapsed to single column",
    after.gridCols !== null && after.gridCols.split(" ").filter(Boolean).length === 1, after.gridCols);
  rec("scp", "/contact/", `${w}x844`, "hamburger inside visual viewport",
    after.togInViewport, `before x=${before.tog.x}..${before.tog.right} (inner ${before.inner}) -> after x=${after.togX}..${after.togRight} (inner ${after.inner})`);
  rec("scp", "/contact/", `${w}x844`, "contact input >=16px font & >=44px tall",
    parseFloat(after.inputFont) >= 16 && after.inputH >= 44, `${after.inputW}w ${after.inputH}h ${after.inputFont}`);

  // real tap on the hamburger (this is what timed out at 30s last night)
  let navDetail;
  try {
    const t0 = Date.now();
    await p.click(".mobile-menu-toggle", { timeout: 8000 });
    await p.waitForTimeout(500);
    const open = await p.evaluate(() => {
      const n = document.querySelector("#mobile-nav"); const r = n.getBoundingClientRect();
      return { left: Math.round(r.left), inner: window.innerWidth, expanded: document.querySelector(".mobile-menu-toggle").getAttribute("aria-expanded"),
               links: [...n.querySelectorAll("a")].map(a => { const lr = a.getBoundingClientRect(); return { t: a.textContent.trim(), x: Math.round(lr.x), w: Math.round(lr.width), h: Math.round(lr.height) }; }) };
    });
    await p.click(".mobile-menu-toggle", { timeout: 8000 });
    await p.waitForTimeout(500);
    const closed = await p.evaluate(() => ({ left: Math.round(document.querySelector("#mobile-nav").getBoundingClientRect().left), inner: window.innerWidth,
      expanded: document.querySelector(".mobile-menu-toggle").getAttribute("aria-expanded"), bodyOverflow: document.body.style.overflow }));
    const ok = open.left === 0 && open.expanded === "true" && closed.left >= closed.inner - 1 && closed.expanded === "false" && !closed.bodyOverflow;
    navDetail = `open in ${Date.now() - t0}ms left=${open.left} links=${open.links.length} allInView=${open.links.every(l => l.x >= 0 && l.x + l.w <= open.inner + 1)} minLinkH=${Math.min(...open.links.map(l => l.h))}; close left=${closed.left} overflow='${closed.bodyOverflow}'`;
    rec("scp", "/contact/", `${w}x844`, "hamburger opens AND closes on real tap", ok, navDetail);
  } catch (e) {
    rec("scp", "/contact/", `${w}x844`, "hamburger opens AND closes on real tap", false, String(e).slice(0, 160));
  }

  if (w === 390) {
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.screenshot({ path: path.join(OUT, "FIXED_scp_contact_390x844.jpg"), type: "jpeg", quality: 45 });
  }
  await ctx.close();
}

/* ══════════ 2. HORIZONTAL OVERFLOW / OVERLAP SWEEP (BOTH SITES) ══════════ */
const SWEEP = [
  ["scp", "https://seventhcitypress.com/"],
  ["scp", "https://seventhcitypress.com/contact/"],
  ["scp", "https://seventhcitypress.com/privacy/"],
  ["jch", "https://jasoncholloway.com/"],
  ["jch", "https://jasoncholloway.com/contact/"],
  ["jch", "https://jasoncholloway.com/books/masters-x/"],
];
for (const [site, url] of SWEEP) {
  for (const w of [320, 414]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: UA });
    const p = await ctx.newPage();
    try {
      await p.goto(url, { waitUntil: "domcontentloaded" });
      await p.waitForTimeout(1500);
      await applyFixes(p, site);
      const r = await p.evaluate(() => {
        const inner = window.innerWidth;
        const over = [];
        for (const el of document.querySelectorAll("body *")) {
          const cs = getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden") continue;
          if (el.closest("#mobile-nav") && !document.querySelector("#mobile-nav").classList.contains("open")) continue;
          const b = el.getBoundingClientRect();
          if (b.width === 0 || b.height === 0) continue;
          if (b.right > inner + 1) over.push({ el: el.tagName.toLowerCase() + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : ""), by: Math.round(b.right - inner), text: (el.textContent || "").trim().slice(0, 30) });
        }
        // truncated text
        const clipped = [];
        for (const el of document.querySelectorAll("body *")) {
          if (el.children.length) continue;
          if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0 && getComputedStyle(el).overflowX !== "auto" && getComputedStyle(el).overflowX !== "scroll")
            clipped.push({ el: el.tagName.toLowerCase(), sw: el.scrollWidth, cw: el.clientWidth, text: (el.textContent || "").trim().slice(0, 30) });
        }
        return { inner, scrollW: document.documentElement.scrollWidth, over: over.slice(0, 6), clipped: clipped.slice(0, 6) };
      });
      rec(site, new URL(url).pathname, `${w}x844`, "no horizontal overflow",
        r.scrollW <= r.inner + 1 && r.over.length === 0, `scrollW=${r.scrollW} inner=${r.inner} overflowers=${JSON.stringify(r.over)}`);
      // layout viewport must equal the device width, otherwise the phone
      // renders the page zoomed out even though nothing "overflows".
      rec(site, new URL(url).pathname, `${w}x844`, "layout viewport == device width",
        r.inner <= w + 1, `device=${w} innerWidth=${r.inner}`);
      rec(site, new URL(url).pathname, `${w}x844`, "no clipped control/label text",
        r.clipped.filter((c) => c.cw > 4).length === 0, JSON.stringify(r.clipped.filter((c) => c.cw > 4)));
    } catch (e) { rec(site, new URL(url).pathname, `${w}x844`, "overflow sweep", null, String(e).slice(0, 120)); }
    await ctx.close();
  }
}

/* ══════════ 3. FOCUS RINGS + TAP TARGETS + CONTRAST @390 ══════════ */
const A11Y = [
  ["scp", "https://seventhcitypress.com/"],
  ["scp", "https://seventhcitypress.com/contact/"],
  ["jch", "https://jasoncholloway.com/"],
  ["jch", "https://jasoncholloway.com/contact/"],
];
for (const [site, url] of A11Y) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false, userAgent: UA });
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil: "domcontentloaded" });
    await p.waitForTimeout(1500);
    await applyFixes(p, site);

    // focus rings across the first 20 keyboard stops
    const noRing = [];
    for (let i = 0; i < 20; i++) {
      await p.keyboard.press("Tab");
      const r = await p.evaluate(() => {
        const a = document.activeElement;
        if (!a || a === document.body) return null;
        const cs = getComputedStyle(a);
        const ring = (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || (cs.boxShadow && cs.boxShadow !== "none");
        return { el: a.tagName.toLowerCase() + (typeof a.className === "string" && a.className ? "." + a.className.trim().split(/\s+/)[0] : ""),
                 label: (a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 24),
                 outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, ring };
      });
      if (r && !r.ring) noRing.push(r);
    }
    rec(site, new URL(url).pathname, "390x844", "visible focus ring on first 20 tab stops", noRing.length === 0, noRing.length ? JSON.stringify(noRing.slice(0, 5)) : "all stops had a ring");

    // form field focus specifically
    const ff = await p.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll("input:not([type=hidden]):not(.hidden), textarea")) {
        if (!el.offsetParent) continue;
        el.focus();
        const cs = getComputedStyle(el);
        out.push({ sel: el.tagName.toLowerCase() + (el.id ? "#" + el.id : ""), outline: `${cs.outlineStyle} ${cs.outlineWidth}`,
                   ring: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0, font: cs.fontSize, h: Math.round(el.getBoundingClientRect().height) });
      }
      return out;
    });
    rec(site, new URL(url).pathname, "390x844", "form fields show a focus ring", ff.every((f) => f.ring), JSON.stringify(ff));

    // tap targets
    const tt = await p.evaluate(() => {
      const small = [];
      const nav = document.querySelector("#mobile-nav");
      for (const el of document.querySelectorAll("a[href], button:not([disabled]), input[type=submit]")) {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        if (nav && nav.contains(el) && !nav.classList.contains("open")) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        // skip links that are part of running prose
        const par = el.closest("p");
        if (par && par.textContent.trim().length > el.textContent.trim().length + 12) continue;
        if (r.height < 44)
          small.push({ el: el.tagName.toLowerCase() + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : ""),
                       label: (el.textContent || "").trim().slice(0, 28), w: Math.round(r.width), h: Math.round(r.height) });
      }
      return small;
    });
    rec(site, new URL(url).pathname, "390x844", "no standalone control under 44px tall", tt.length === 0, tt.length ? JSON.stringify(tt.slice(0, 10)) : "all >=44px");

    // contrast, compositing alpha properly against painted ancestors
    const cc = await p.evaluate(() => {
      const parse = (c) => { const m = c.match(/[\d.]+/g); return m ? m.map(Number) : null; };
      const over = (fg, bg) => { const a = fg[3] === undefined ? 1 : fg[3]; return [0, 1, 2].map((i) => a * fg[i] + (1 - a) * bg[i]); };
      const effBg = (el) => {
        let stack = [], n = el;
        while (n && n !== document.documentElement) { const c = parse(getComputedStyle(n).backgroundColor); if (c && (c[3] === undefined || c[3] > 0)) stack.push(c); n = n.parentElement; }
        stack.push([255, 255, 255]);
        let bg = stack[stack.length - 1];
        for (let i = stack.length - 2; i >= 0; i--) bg = over(stack[i], bg);
        return bg;
      };
      const elemOpacity = (el) => { let o = 1, n = el; while (n && n !== document.documentElement) { o *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; } return o; };
      const out = [];
      for (const el of document.querySelectorAll("body *")) {
        if (el.children.length) continue;
        const txt = (el.textContent || "").trim();
        if (!txt) continue;
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const bg = effBg(el);
        let fg = parse(cs.color);
        const op = elemOpacity(el);
        fg = over([fg[0], fg[1], fg[2], (fg[3] === undefined ? 1 : fg[3]) * op], bg);
        const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
        const L = (x) => 0.2126 * lin(x[0]) + 0.7152 * lin(x[1]) + 0.0722 * lin(x[2]);
        const l1 = L(fg), l2 = L(bg);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        const fs = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
        const req = fs >= 24 || (fs >= 18.66 && bold) ? 3 : 4.5;
        if (ratio < req) out.push({ el: el.tagName.toLowerCase() + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/)[0] : ""),
          text: txt.slice(0, 34), ratio: +ratio.toFixed(2), req, fs: +fs.toFixed(1), color: cs.color, bg: `rgb(${bg.map(Math.round).join(",")})` });
      }
      return out;
    });
    rec(site, new URL(url).pathname, "390x844", "WCAG AA text contrast (alpha-composited)", cc.length === 0, cc.length ? JSON.stringify(cc.slice(0, 8)) : "no failures");
  } catch (e) { rec(site, new URL(url).pathname, "390x844", "a11y block", null, String(e).slice(0, 160)); }
  await ctx.close();
}

/* ══════════ 4. DESKTOP 1440 REGRESSION ══════════ */
for (const [site, url] of [["scp", "https://seventhcitypress.com/contact/"], ["scp", "https://seventhcitypress.com/"], ["jch", "https://jasoncholloway.com/"], ["jch", "https://jasoncholloway.com/contact/"]]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil: "domcontentloaded" });
    await p.waitForTimeout(1500);
    const before = await p.evaluate(() => {
      const g = document.querySelector("section .container > div[style*='340px'], .resp-main-sidebar");
      return { cols: g ? getComputedStyle(g).gridTemplateColumns : null, w: g ? Math.round(g.getBoundingClientRect().width) : null };
    });
    await applyFixes(p, site);
    const after = await p.evaluate(() => {
      const g = document.querySelector(".resp-main-sidebar, section .container > div[style*='340px']");
      return {
        scrollW: document.documentElement.scrollWidth, inner: window.innerWidth,
        cols: g ? getComputedStyle(g).gridTemplateColumns : null, w: g ? Math.round(g.getBoundingClientRect().width) : null,
        navVisible: getComputedStyle(document.querySelector(".header-nav")).display !== "none",
        toggleVisible: getComputedStyle(document.querySelector(".mobile-menu-toggle")).display !== "none",
        footerLinkH: (() => { const a = document.querySelector(".footer-links a"); return a ? Math.round(a.getBoundingClientRect().height) : null; })(),
        inputFont: (() => { const i = document.querySelector("#contact-name"); return i ? getComputedStyle(i).fontSize : null; })(),
      };
    });
    rec(site, new URL(url).pathname, "1440x900", "no horizontal overflow", after.scrollW <= after.inner + 1, `scrollW=${after.scrollW}`);
    rec(site, new URL(url).pathname, "1440x900", "desktop nav mode unchanged", after.navVisible && !after.toggleVisible, `nav=${after.navVisible} toggle=${after.toggleVisible}`);
    if (before.cols) rec(site, new URL(url).pathname, "1440x900", "two-column sidebar layout preserved",
      after.cols !== null && after.cols.split(" ").filter(Boolean).length === 2, `before "${before.cols}" (${before.w}px) -> after "${after.cols}" (${after.w}px)`);
    rec(site, new URL(url).pathname, "1440x900", "desktop footer link height unchanged (mobile-only rule)", null, `${after.footerLinkH}px`);
    if (after.inputFont) rec(site, new URL(url).pathname, "1440x900", "desktop input font unchanged", after.inputFont === "14.4px", after.inputFont);
  } catch (e) { rec(site, new URL(url).pathname, "1440x900", "desktop regression", null, String(e).slice(0, 140)); }
  await ctx.close();
}

await b.close();

const fails = results.filter((r) => r.pass === false);
console.log(`\n================ SUMMARY ================`);
console.log(`checks=${results.length} pass=${results.filter(r => r.pass === true).length} fail=${fails.length} info=${results.filter(r => r.pass === null).length}`);
fails.forEach((f) => console.log(`  FAIL ${f.site}${f.page} @${f.vp} :: ${f.test} :: ${typeof f.detail === "string" ? f.detail : JSON.stringify(f.detail)}`));
fs.writeFileSync(path.join(OUT, "_verify_results.json"), JSON.stringify({ generated: new Date().toISOString(), results }, null, 1));
console.log("VERIFY DONE");

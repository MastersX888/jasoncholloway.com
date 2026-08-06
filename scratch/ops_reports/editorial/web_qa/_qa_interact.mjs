// Interaction / a11y tests. Audit only — no real form submissions are sent.
import { chromium } from "file:///C:/Users/zh577/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules/playwright-core/index.mjs";
import fs from "node:fs";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\zh577\\.gemini\\antigravity\\scratch\\jasoncholloway\\scratch\\ops_reports\\editorial\\web_qa";
const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";

const CONTRAST = () => {
  window.__lum = (c) => {
    const m = c.match(/[\d.]+/g);
    if (!m) return null;
    const [r, g, b] = m.slice(0, 3).map(Number);
    const a = m.length > 3 ? Number(m[3]) : 1;
    return { r, g, b, a };
  };
  window.__effBg = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = window.__lum(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0.05) return c;
      n = n.parentElement;
    }
    return { r: 10, g: 10, b: 13, a: 1 };
  };
  window.__ratio = (fg, bg) => {
    const L = (c) => {
      const f = [c.r, c.g, c.b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
    };
    // composite fg over bg if translucent
    if (fg.a < 1) {
      fg = {
        r: fg.r * fg.a + bg.r * (1 - fg.a),
        g: fg.g * fg.a + bg.g * (1 - fg.a),
        b: fg.b * fg.a + bg.b * (1 - fg.a),
        a: 1,
      };
    }
    const l1 = L(fg),
      l2 = L(bg);
    return +((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2);
  };
};

const out = { generated: new Date().toISOString(), tests: [] };
const rec = (site, page, name, pass, detail) => {
  out.tests.push({ site, page, test: name, pass, detail });
  console.log(`[${pass === true ? "PASS" : pass === false ? "FAIL" : "INFO"}] ${site}${page} :: ${name} :: ${typeof detail === "string" ? detail : JSON.stringify(detail).slice(0, 400)}`);
};

async function mobileNavTest(page, site, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(800);

  const toggle = await page.$(".mobile-menu-toggle");
  if (!toggle) return rec(site, new URL(url).pathname, "hamburger exists", false, "no .mobile-menu-toggle found");

  const box0 = await toggle.boundingBox();
  const closed = await page.evaluate(() => {
    const n = document.querySelector("#mobile-nav");
    const cs = getComputedStyle(n);
    const r = n.getBoundingClientRect();
    return { transform: cs.transform, display: cs.display, ariaHidden: n.getAttribute("aria-hidden"), left: Math.round(r.left), visible: r.left < window.innerWidth - 5 };
  });
  rec(site, new URL(url).pathname, "hamburger tap target", box0.width >= 44 && box0.height >= 44, `${Math.round(box0.width)}x${Math.round(box0.height)} at x=${Math.round(box0.x)},y=${Math.round(box0.y)}`);
  rec(site, new URL(url).pathname, "drawer hidden before open", !closed.visible, closed);

  await toggle.click();
  await page.waitForTimeout(600);
  const opened = await page.evaluate(() => {
    const n = document.querySelector("#mobile-nav");
    const cs = getComputedStyle(n);
    const r = n.getBoundingClientRect();
    const links = [...n.querySelectorAll("a")].map((a) => {
      const lr = a.getBoundingClientRect();
      const lcs = getComputedStyle(a);
      return {
        label: (a.textContent || "").trim().slice(0, 40),
        href: a.getAttribute("href"),
        w: Math.round(lr.width),
        h: Math.round(lr.height),
        top: Math.round(lr.top),
        bottom: Math.round(lr.bottom),
        fontSize: parseFloat(lcs.fontSize),
        tabIndex: a.tabIndex,
        inViewport: lr.top >= 0 && lr.bottom <= window.innerHeight,
        clipped: lr.right > window.innerWidth + 2,
      };
    });
    return {
      transform: cs.transform,
      ariaHidden: n.getAttribute("aria-hidden"),
      ariaExpanded: document.querySelector(".mobile-menu-toggle").getAttribute("aria-expanded"),
      drawerTop: Math.round(r.top),
      drawerHeight: Math.round(r.height),
      innerHeight: window.innerHeight,
      bodyOverflow: document.body.style.overflow,
      headerHeight: Math.round(document.querySelector(".header-inner").getBoundingClientRect().height),
      headerBottom: Math.round(document.querySelector(".header-inner").getBoundingClientRect().bottom),
      links,
      scrollable: n.scrollHeight > n.clientHeight,
    };
  });
  rec(site, new URL(url).pathname, "drawer opens on tap", opened.transform === "none" || opened.transform.includes("matrix(1, 0, 0, 1, 0, 0)"), { transform: opened.transform, ariaExpanded: opened.ariaExpanded, ariaHidden: opened.ariaHidden });
  rec(site, new URL(url).pathname, "drawer top vs header bottom", Math.abs(opened.drawerTop - opened.headerBottom) <= 2, `drawerTop=${opened.drawerTop} headerBottom=${opened.headerBottom} headerH=${opened.headerHeight}`);
  rec(site, new URL(url).pathname, "all drawer links >=44px tall & in viewport", opened.links.every((l) => l.h >= 44 && l.inViewport && !l.clipped), opened.links);
  rec(site, new URL(url).pathname, "body scroll locked while open", opened.bodyOverflow === "hidden", opened.bodyOverflow);

  await page.screenshot({ path: path.join(OUT, `${site}_navdrawer_open_390x844.jpg`), type: "jpeg", quality: 55 });

  // close
  await page.click(".mobile-menu-toggle");
  await page.waitForTimeout(600);
  const reclosed = await page.evaluate(() => {
    const n = document.querySelector("#mobile-nav");
    const r = n.getBoundingClientRect();
    return { left: Math.round(r.left), inner: window.innerWidth, bodyOverflow: document.body.style.overflow, ariaExpanded: document.querySelector(".mobile-menu-toggle").getAttribute("aria-expanded") };
  });
  rec(site, new URL(url).pathname, "drawer closes on second tap", reclosed.left >= reclosed.inner - 5, reclosed);
  rec(site, new URL(url).pathname, "body scroll restored on close", reclosed.bodyOverflow === "", `overflow='${reclosed.bodyOverflow}'`);

  // same-page link tap while open (known React pathname-effect edge case)
  await page.click(".mobile-menu-toggle");
  await page.waitForTimeout(500);
  const samePath = new URL(url).pathname;
  const selfLink = await page.evaluate((sp) => {
    const links = [...document.querySelectorAll("#mobile-nav a")];
    const m = links.find((a) => {
      const h = a.getAttribute("href") || "";
      return h === sp || h === sp.replace(/\/$/, "") || h + "/" === sp;
    });
    return m ? m.getAttribute("href") : null;
  }, samePath);
  if (selfLink) {
    await page.click(`#mobile-nav a[href="${selfLink}"]`);
    await page.waitForTimeout(900);
    const after = await page.evaluate(() => {
      const n = document.querySelector("#mobile-nav");
      const r = n.getBoundingClientRect();
      return { left: Math.round(r.left), inner: window.innerWidth, bodyOverflow: document.body.style.overflow };
    });
    rec(site, samePath, "drawer closes after tapping current-page link", after.left >= after.inner - 5, { selfLink, ...after });
  } else {
    rec(site, samePath, "drawer closes after tapping current-page link", null, "no self-referencing link in drawer");
  }
}

async function formTest(page, site, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(800);
  const p = new URL(url).pathname;

  const fields = await page.evaluate(() => {
    return [...document.querySelectorAll("input:not([type=hidden]), textarea, select")].map((f) => {
      const cs = getComputedStyle(f);
      const r = f.getBoundingClientRect();
      return {
        el: f.tagName.toLowerCase() + (f.id ? "#" + f.id : ""),
        type: f.getAttribute("type"),
        name: f.getAttribute("name"),
        fontSizePx: parseFloat(cs.fontSize),
        outline: cs.outlineStyle + " " + cs.outlineWidth,
        w: Math.round(r.width),
        h: Math.round(r.height),
        required: f.hasAttribute("required"),
        display: cs.display,
      };
    });
  });
  const visibleFields = fields.filter((f) => f.display !== "none" && f.w > 0);
  rec(site, p, "inputs >=16px font (prevents iOS focus zoom)", visibleFields.every((f) => f.fontSizePx >= 16), visibleFields.map((f) => `${f.el}=${f.fontSizePx}px`).join(", "));
  rec(site, p, "input heights >=44px", visibleFields.every((f) => f.h >= 44), visibleFields.map((f) => `${f.el}=${f.h}px`).join(", "));

  // focus ring check
  const focusInfo = [];
  for (const f of visibleFields) {
    const sel = f.el.includes("#") ? f.el : `${f.el}[name="${f.name}"]`;
    try {
      await page.focus(sel);
      const fi = await page.evaluate((s) => {
        const e = document.querySelector(s);
        const cs = getComputedStyle(e);
        return { sel: s, outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth, outlineColor: cs.outlineColor, boxShadow: cs.boxShadow, borderColor: cs.borderColor };
      }, sel);
      const hasRing = (fi.outlineStyle !== "none" && parseFloat(fi.outlineWidth) > 0) || (fi.boxShadow && fi.boxShadow !== "none");
      focusInfo.push({ ...fi, hasRing });
    } catch (e) {
      focusInfo.push({ sel, err: String(e).slice(0, 80) });
    }
  }
  rec(site, p, "form fields show visible focus indicator", focusInfo.every((f) => f.hasRing), focusInfo);

  // contact form client-side validation (no network submit — empty submit short-circuits)
  const hasCustomForm = await page.$("form:not([action])");
  if (hasCustomForm) {
    const btn = await page.$('form:not([action]) button[type="submit"]');
    if (btn) {
      await btn.click();
      await page.waitForTimeout(700);
      const alert = await page.evaluate(() => {
        const a = document.querySelector('[role="alert"]');
        return a ? (a.textContent || "").trim() : null;
      });
      rec(site, p, "empty submit shows validation error (no network call)", !!alert, alert || "no [role=alert] appeared");
      await page.screenshot({ path: path.join(OUT, `${site}_contactform_validation_390x844.jpg`), type: "jpeg", quality: 55 });
    }
  }

  // native web3forms newsletter form: validity only, never submitted
  const nativeValidity = await page.evaluate(() => {
    const f = document.querySelector('form[action*="web3forms"]');
    if (!f) return null;
    const email = f.querySelector('input[type="email"]');
    if (!email) return null;
    email.value = "not-an-email";
    const bad = email.checkValidity();
    email.value = "reader@example.com";
    const good = email.checkValidity();
    email.value = "";
    return { action: f.getAttribute("action"), method: f.getAttribute("method"), rejectsBadEmail: !bad, acceptsGoodEmail: good, hasHoneypot: !!f.querySelector('[name="botcheck"]'), redirect: f.querySelector('[name="redirect"]')?.value || null };
  });
  if (nativeValidity) rec(site, p, "newsletter/chapter form HTML5 validation", nativeValidity.rejectsBadEmail && nativeValidity.acceptsGoodEmail, nativeValidity);
}

async function contrastTest(page, site, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(800);
  await page.evaluate(CONTRAST);
  const low = await page.evaluate(() => {
    const out = [];
    const els = document.querySelectorAll('a, button, .btn, p, li, h1, h2, h3, h4, span, label, small');
    for (const el of els) {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const direct = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 2);
      if (!direct) continue;
      const fg = window.__lum(cs.color);
      const bg = window.__effBg(el);
      if (!fg) continue;
      const ratio = window.__ratio(fg, bg);
      const fs = parseFloat(cs.fontSize);
      const bold = parseInt(cs.fontWeight) >= 700;
      const large = fs >= 24 || (fs >= 18.66 && bold);
      const min = large ? 3 : 4.5;
      if (ratio < min) {
        out.push({
          el: el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : ""),
          text: (el.textContent || "").trim().slice(0, 45),
          ratio, required: min, fontSize: fs, color: cs.color, bg: `rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`,
        });
      }
    }
    // dedupe by el+ratio
    const seen = new Set();
    return out.filter((o) => { const k = o.el + o.ratio; if (seen.has(k)) return false; seen.add(k); return true; }).sort((a, b) => a.ratio - b.ratio).slice(0, 25);
  });
  rec(site, new URL(url).pathname, "WCAG AA text contrast", low.length === 0, low);
}

async function keyboardFocusTest(page, site, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(700);
  const results = [];
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const e = document.activeElement;
      if (!e || e === document.body) return null;
      const cs = getComputedStyle(e);
      return {
        el: e.tagName.toLowerCase() + (e.className && typeof e.className === "string" ? "." + e.className.trim().split(/\s+/)[0] : ""),
        label: (e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 35),
        outlineStyle: cs.outlineStyle,
        outlineWidth: cs.outlineWidth,
        boxShadow: cs.boxShadow !== "none",
      };
    });
    if (info) results.push({ ...info, ring: (info.outlineStyle !== "none" && parseFloat(info.outlineWidth) > 0) || info.boxShadow });
  }
  const noRing = results.filter((r) => !r.ring);
  rec(site, new URL(url).pathname, "keyboard focus ring on first 12 tab stops", noRing.length === 0, noRing.length ? noRing : `all ${results.length} stops had a visible ring`);
}

async function run() {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
  const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: MOBILE_UA });
  const page = await mob.newPage();

  for (const [site, origin] of [["jch", "https://jasoncholloway.com"], ["scp", "https://seventhcitypress.com"]]) {
    try { await mobileNavTest(page, site, origin + "/"); } catch (e) { rec(site, "/", "mobileNavTest", false, String(e).slice(0, 200)); }
    try { await mobileNavTest(page, site, origin + "/contact/"); } catch (e) { rec(site, "/contact/", "mobileNavTest", false, String(e).slice(0, 200)); }
    try { await formTest(page, site, origin + "/contact/"); } catch (e) { rec(site, "/contact/", "formTest", false, String(e).slice(0, 200)); }
    try { await formTest(page, site, origin + "/"); } catch (e) { rec(site, "/", "formTest", false, String(e).slice(0, 200)); }
    try { await contrastTest(page, site, origin + "/"); } catch (e) { rec(site, "/", "contrastTest", false, String(e).slice(0, 200)); }
    try { await keyboardFocusTest(page, site, origin + "/"); } catch (e) { rec(site, "/", "keyboardFocusTest", false, String(e).slice(0, 200)); }
  }

  await mob.close();

  // Desktop 1440 regression
  const desk = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dp = await desk.newPage();
  for (const [site, origin] of [["jch", "https://jasoncholloway.com"], ["scp", "https://seventhcitypress.com"]]) {
    await dp.goto(origin + "/", { waitUntil: "networkidle", timeout: 45000 });
    await dp.waitForTimeout(800);
    const d = await dp.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      scrollWidth: document.documentElement.scrollWidth,
      navVisible: getComputedStyle(document.querySelector(".header-nav")).display !== "none",
      toggleVisible: getComputedStyle(document.querySelector(".mobile-menu-toggle")).display !== "none",
      navLinks: [...document.querySelectorAll(".header-nav a")].map((a) => (a.textContent || "").trim()),
    }));
    rec(site, "/", "desktop 1440 no h-overflow + correct nav mode", !d.overflow && d.navVisible && !d.toggleVisible, d);
  }
  await desk.close();
  await browser.close();

  fs.writeFileSync(path.join(OUT, "_interact_raw.json"), JSON.stringify(out, null, 1));
  console.log("INTERACT DONE tests=" + out.tests.length + " failures=" + out.tests.filter((t) => t.pass === false).length);
}

run().catch((e) => { console.error("FATAL", e); process.exit(1); });

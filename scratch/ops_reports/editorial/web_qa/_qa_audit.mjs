// Vivian website QA harness — audit only, no site mutation.
import { chromium } from "file:///C:/Users/zh577/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules/playwright-core/index.mjs";
import fs from "node:fs";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\zh577\\.gemini\\antigravity\\scratch\\jasoncholloway\\scratch\\ops_reports\\editorial\\web_qa";
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "320x568", w: 320, h: 568, mobile: true },
  { name: "360x800", w: 360, h: 800, mobile: true },
  { name: "390x844", w: 390, h: 844, mobile: true },
  { name: "393x852", w: 393, h: 852, mobile: true },
  { name: "414x896", w: 414, h: 896, mobile: true },
  { name: "768x1024", w: 768, h: 1024, mobile: true },
  { name: "1440x900", w: 1440, h: 900, mobile: false },
];

const SITES = {
  jch: {
    origin: "https://jasoncholloway.com",
    shot: ["/", "/about/", "/books/", "/books/masters-x/", "/books/masters-x/the-inheritance-of-frequency/", "/books/masters-x/omnibus/", "/field-notes/", "/contact/", "/chamber/"],
    all: null, // filled from sitemap
  },
  scp: {
    origin: "https://seventhcitypress.com",
    shot: ["/", "/contact/", "/privacy/"],
    all: null,
  },
};

const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";

function slug(u) {
  const p = new URL(u).pathname.replace(/^\/|\/$/g, "") || "home";
  return p.replace(/[^a-z0-9]+/gi, "-").slice(0, 60);
}

const AUDIT_FN = () => {
  const vw = window.innerWidth;
  const res = {};
  const vm = document.querySelector('meta[name="viewport"]');
  res.viewportMeta = vm ? vm.getAttribute("content") : null;
  res.lang = document.documentElement.getAttribute("lang");
  res.title = document.title;
  res.scrollWidth = document.documentElement.scrollWidth;
  res.bodyScrollWidth = document.body ? document.body.scrollWidth : 0;
  res.innerWidth = vw;
  res.horizontalOverflow = document.documentElement.scrollWidth > vw + 1;

  const desc = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) s += "#" + el.id;
    if (el.className && typeof el.className === "string")
      s += "." + el.className.trim().split(/\s+/).slice(0, 3).join(".");
    return s;
  };
  const visible = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  // Overflowing elements
  res.overflowers = [];
  for (const el of document.querySelectorAll("body *")) {
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    if (r.right > vw + 2 || r.left < -2) {
      const cs = getComputedStyle(el);
      res.overflowers.push({
        el: desc(el),
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
        overflowBy: Math.round(Math.max(r.right - vw, -r.left)),
        text: (el.textContent || "").trim().slice(0, 60),
        whiteSpace: cs.whiteSpace,
        minWidth: cs.minWidth,
        widthCss: cs.width,
        position: cs.position,
      });
    }
  }
  // keep only outermost-ish / dedupe
  res.overflowers = res.overflowers.slice(0, 60);

  // Interactive controls
  const sel = 'a[href], button, [role="button"], input:not([type="hidden"]), select, textarea, summary, [role="tab"], [role="switch"], [onclick]';
  const seen = new Set();
  res.controls = [];
  for (const el of document.querySelectorAll(sel)) {
    if (seen.has(el)) continue;
    seen.add(el);
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const vis = visible(el);
    const label =
      (el.getAttribute("aria-label") ||
        (el.textContent || "").trim() ||
        el.getAttribute("value") ||
        el.getAttribute("placeholder") ||
        el.getAttribute("title") ||
        "").replace(/\s+/g, " ").slice(0, 70);
    res.controls.push({
      el: desc(el),
      tag: el.tagName.toLowerCase(),
      type: el.getAttribute("type") || null,
      role: el.getAttribute("role") || null,
      label,
      href: el.getAttribute("href") || null,
      target: el.getAttribute("target") || null,
      rel: el.getAttribute("rel") || null,
      ariaLabel: el.getAttribute("aria-label") || null,
      ariaExpanded: el.getAttribute("aria-expanded"),
      disabled: el.disabled === true,
      visible: vis,
      w: Math.round(r.width),
      h: Math.round(r.height),
      x: Math.round(r.left),
      y: Math.round(r.top + window.scrollY),
      fontSize: parseFloat(cs.fontSize),
      color: cs.color,
      bg: cs.backgroundColor,
      display: cs.display,
      clippedRight: vis && r.right > vw + 2,
      clippedLeft: vis && r.left < -2,
      pointerEvents: cs.pointerEvents,
      cursor: cs.cursor,
    });
  }

  // Images
  res.images = [];
  for (const img of document.querySelectorAll("img")) {
    const r = img.getBoundingClientRect();
    res.images.push({
      src: (img.currentSrc || img.src || "").slice(0, 160),
      alt: img.getAttribute("alt"),
      hasAlt: img.hasAttribute("alt"),
      nw: img.naturalWidth,
      nh: img.naturalHeight,
      dw: Math.round(r.width),
      dh: Math.round(r.height),
      loading: img.getAttribute("loading"),
      broken: img.complete && img.naturalWidth === 0,
    });
  }

  // Headings
  res.headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
    lvl: +h.tagName[1],
    text: (h.textContent || "").trim().slice(0, 60),
    fontSize: parseFloat(getComputedStyle(h).fontSize),
    visible: visible(h),
  }));

  // Form fields w/o labels
  res.unlabeled = [];
  for (const f of document.querySelectorAll("input:not([type=hidden]):not([type=submit]):not([type=button]), select, textarea")) {
    const id = f.id;
    const hasLabel = (id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) || f.closest("label");
    if (!hasLabel && !f.getAttribute("aria-label") && !f.getAttribute("aria-labelledby")) {
      res.unlabeled.push({ el: desc(f), name: f.getAttribute("name"), placeholder: f.getAttribute("placeholder") });
    }
  }

  // Forms
  res.forms = [...document.querySelectorAll("form")].map((f) => ({
    action: f.getAttribute("action"),
    method: f.getAttribute("method"),
    id: f.id,
    fields: [...f.querySelectorAll("input,select,textarea")].map((i) => ({
      name: i.getAttribute("name"),
      type: i.getAttribute("type"),
      required: i.hasAttribute("required"),
    })),
  }));

  // Smallest visible body font
  let minFs = 999,
    minEl = null;
  for (const el of document.querySelectorAll("p,li,span,a,div,td,small,figcaption,label")) {
    if (!visible(el)) continue;
    const direct = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 3);
    if (!direct) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < minFs) {
      minFs = fs;
      minEl = desc(el) + " :: " + (el.textContent || "").trim().slice(0, 40);
    }
  }
  res.minFontSize = { px: minFs === 999 ? null : minFs, el: minEl };

  // Resources
  const rs = performance.getEntriesByType("resource");
  let total = 0;
  const byType = {};
  const big = [];
  for (const r of rs) {
    const sz = r.transferSize || r.encodedBodySize || 0;
    total += sz;
    byType[r.initiatorType] = (byType[r.initiatorType] || 0) + sz;
    if (sz > 120000) big.push({ url: r.name.slice(0, 140), kb: Math.round(sz / 1024), type: r.initiatorType });
  }
  const nav = performance.getEntriesByType("navigation")[0];
  res.perf = {
    resourceCount: rs.length,
    totalKB: Math.round(total / 1024),
    byTypeKB: Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, Math.round(v / 1024)])),
    bigResources: big.sort((a, b) => b.kb - a.kb).slice(0, 12),
    domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
    loadEvent: nav ? Math.round(nav.loadEventEnd) : null,
    transferSizeDoc: nav ? nav.transferSize : null,
  };
  res.vitals = window.__vitals || {};

  // http:// subresources (mixed content)
  res.insecure = rs.filter((r) => r.name.startsWith("http://")).map((r) => r.name.slice(0, 140));

  // links inventory
  res.links = [...document.querySelectorAll("a[href]")].map((a) => a.href);
  return res;
};

const VITALS_INIT = () => {
  window.__vitals = { lcp: null, cls: 0, longTasks: 0 };
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__vitals.lcp = Math.round(e.startTime);
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__vitals.cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((l) => {
      window.__vitals.longTasks += l.getEntries().length;
    }).observe({ type: "longtask", buffered: true });
  } catch (e) {}
};

const results = { generated: new Date().toISOString(), pages: [] };

async function run() {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });

  for (const [key, site] of Object.entries(SITES)) {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({
        viewport: { width: vp.w, height: vp.h },
        deviceScaleFactor: 1,
        isMobile: vp.mobile,
        hasTouch: vp.mobile,
        userAgent: vp.mobile ? MOBILE_UA : undefined,
      });
      await ctx.addInitScript(VITALS_INIT);
      const page = await ctx.newPage();

      for (const p of site.shot) {
        const url = site.origin + p;
        const console_ = [];
        const failed = [];
        const statuses = [];
        page.removeAllListeners();
        page.on("console", (m) => {
          if (m.type() === "error" || m.type() === "warning")
            console_.push({ type: m.type(), text: m.text().slice(0, 300) });
        });
        page.on("pageerror", (e) => console_.push({ type: "pageerror", text: String(e).slice(0, 300) }));
        page.on("requestfailed", (r) => failed.push({ url: r.url().slice(0, 160), err: r.failure()?.errorText }));
        page.on("response", (r) => {
          if (r.status() >= 400) statuses.push({ url: r.url().slice(0, 160), status: r.status() });
        });

        let navErr = null,
          status = null;
        try {
          const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
          status = resp ? resp.status() : null;
        } catch (e) {
          navErr = String(e).slice(0, 200);
          try { await page.waitForTimeout(2000); } catch {}
        }
        await page.waitForTimeout(1200);
        // trigger lazy content
        try {
          await page.evaluate(async () => {
            const step = window.innerHeight;
            for (let y = 0; y < document.body.scrollHeight; y += step) {
              window.scrollTo(0, y);
              await new Promise((r) => setTimeout(r, 80));
            }
            window.scrollTo(0, 0);
          });
        } catch {}
        await page.waitForTimeout(600);

        let audit = null;
        try {
          audit = await page.evaluate(AUDIT_FN);
        } catch (e) {
          audit = { error: String(e).slice(0, 300) };
        }

        const shotName = `${key}_${slug(url)}_${vp.name}.jpg`;
        try {
          await page.screenshot({
            path: path.join(OUT, shotName),
            fullPage: true,
            type: "jpeg",
            quality: 50,
          });
        } catch (e) {
          // fullPage can fail on very tall pages
          try {
            await page.screenshot({ path: path.join(OUT, shotName), type: "jpeg", quality: 50 });
          } catch {}
        }

        results.pages.push({
          site: key,
          url,
          viewport: vp.name,
          status,
          navErr,
          screenshot: shotName,
          console: console_,
          failedRequests: failed,
          badStatuses: statuses,
          audit,
        });
        console.log(`done ${key} ${p} @ ${vp.name} status=${status} overflow=${audit?.horizontalOverflow}`);
      }
      await ctx.close();
    }
  }

  await browser.close();
  fs.writeFileSync(path.join(OUT, "_audit_raw.json"), JSON.stringify(results, null, 1));
  console.log("WROTE _audit_raw.json pages=" + results.pages.length);
}

run().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});

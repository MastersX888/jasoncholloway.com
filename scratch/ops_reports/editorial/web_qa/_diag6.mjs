import { chromium } from "file:///C:/Users/zh577/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules/playwright-core/index.mjs";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const b = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
const ctx = await b.newContext({ viewport: { width: 320, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: UA });
const p = await ctx.newPage();
await p.goto("https://jasoncholloway.com/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2600);

console.log(JSON.stringify(await p.evaluate(() => {
  const DEV = 320;
  const path = [];
  let node = document.querySelector("main");

  const innerAfterHiding = (el) => {
    const prev = el.style.display;
    el.style.display = "none";
    void document.documentElement.offsetWidth;
    const w = window.innerWidth;
    el.style.display = prev;
    void document.documentElement.offsetWidth;
    return w;
  };

  // descend: at each level find the child that, when hidden, restores 320
  for (let depth = 0; depth < 14 && node; depth++) {
    const kids = [...node.children];
    let culprit = null;
    for (const k of kids) {
      if (getComputedStyle(k).display === "none") continue;
      if (innerAfterHiding(k) <= DEV + 1) { culprit = k; break; }
    }
    const cs = getComputedStyle(node);
    const r = node.getBoundingClientRect();
    path.push({
      depth,
      el: node.tagName.toLowerCase() + (node.id ? "#" + node.id : "") + (typeof node.className === "string" && node.className ? "." + node.className.trim().split(/\s+/).slice(0, 3).join(".") : ""),
      w: +r.width.toFixed(1), sw: node.scrollWidth,
      display: cs.display, gtc: cs.gridTemplateColumns, flexWrap: cs.flexWrap,
      minW: cs.minWidth, cssW: cs.width, ws: cs.whiteSpace, overflowX: cs.overflowX,
      padding: cs.padding,
      text: (node.textContent || "").trim().slice(0, 50),
      foundCulprit: !!culprit,
    });
    if (!culprit) break;
    node = culprit;
  }
  return path;
}), null, 1));

await b.close();

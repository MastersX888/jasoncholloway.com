import fs from "node:fs";
const OUT = "C:\\Users\\zh577\\.gemini\\antigravity\\scratch\\jasoncholloway\\scratch\\ops_reports\\editorial\\web_qa";
const d = JSON.parse(fs.readFileSync(OUT + "\\_audit_raw.json", "utf8"));

const L = (s) => console.log(s);

L("PAGES=" + d.pages.length);

// 1. viewport meta + overflow
L("\n=== VIEWPORT META (unique) ===");
L(JSON.stringify([...new Set(d.pages.map((p) => p.audit?.viewportMeta))]));

L("\n=== HORIZONTAL OVERFLOW ===");
const ovf = d.pages.filter((p) => p.audit?.horizontalOverflow);
L("pages with overflow: " + ovf.length);
ovf.forEach((p) => L(`  ${p.site} ${new URL(p.url).pathname} @${p.viewport}: scrollWidth=${p.audit.scrollWidth} vw=${p.audit.innerWidth}`));

L("\n=== OVERFLOWING ELEMENTS (any viewport) ===");
const ovEl = {};
for (const p of d.pages) for (const o of p.audit?.overflowers || []) {
  const k = `${p.site}|${o.el}|${o.text.slice(0, 25)}`;
  (ovEl[k] ||= { ...o, vps: new Set(), pages: new Set() });
  ovEl[k].vps.add(p.viewport); ovEl[k].pages.add(new URL(p.url).pathname);
}
Object.entries(ovEl).slice(0, 30).forEach(([k, v]) => L(`  ${k} :: overflowBy=${v.overflowBy}px w=${v.width} vps=${[...v.vps].join(",")} pages=${[...v.pages].slice(0,3).join(",")}`));
if (!Object.keys(ovEl).length) L("  none");

// 2. console errors / failed requests / bad statuses
L("\n=== CONSOLE / NETWORK ===");
const cons = {};
for (const p of d.pages) for (const c of p.console || []) {
  const k = c.type + " :: " + c.text.slice(0, 150);
  (cons[k] ||= { n: 0, pages: new Set() }); cons[k].n++; cons[k].pages.add(p.site + new URL(p.url).pathname);
}
Object.entries(cons).sort((a,b)=>b[1].n-a[1].n).slice(0, 25).forEach(([k, v]) => L(`  [${v.n}x] ${k}\n      on: ${[...v.pages].slice(0, 4).join(", ")}`));
if (!Object.keys(cons).length) L("  no console errors/warnings");

const fails = {};
for (const p of d.pages) for (const f of p.failedRequests || []) { const k = f.err + " " + f.url; (fails[k] ||= 0); fails[k]++; }
L("  --- failed requests ---");
Object.entries(fails).slice(0, 20).forEach(([k, n]) => L(`  [${n}x] ${k}`));
if (!Object.keys(fails).length) L("   none");

const bad = {};
for (const p of d.pages) for (const b of p.badStatuses || []) { const k = b.status + " " + b.url; (bad[k] ||= new Set()).add(p.site + new URL(p.url).pathname); }
L("  --- >=400 responses ---");
Object.entries(bad).slice(0, 20).forEach(([k, v]) => L(`  ${k}  (on ${[...v].slice(0,3).join(", ")})`));
if (!Object.keys(bad).length) L("   none");

L("\n=== MIXED CONTENT (http:// subresources) ===");
const ins = new Set();
for (const p of d.pages) for (const i of p.audit?.insecure || []) ins.add(i);
L(ins.size ? [...ins].join("\n") : "  none");

// 3. Controls
L("\n=== CONTROL INVENTORY (mobile 390x844) ===");
for (const site of ["jch", "scp"]) {
  const pages = d.pages.filter((p) => p.site === site && p.viewport === "390x844");
  L(`--- ${site} ---`);
  for (const p of pages) {
    const ctrls = (p.audit?.controls || []).filter((c) => c.visible);
    const small = ctrls.filter((c) => c.h < 44 || c.w < 44);
    const tiny = ctrls.filter((c) => c.h < 24 || c.w < 24);
    const clipped = ctrls.filter((c) => c.clippedRight || c.clippedLeft);
    const noLabel = ctrls.filter((c) => !c.label && !c.ariaLabel);
    L(`  ${new URL(p.url).pathname}: visible=${ctrls.length} <44px=${small.length} <24px=${tiny.length} clipped=${clipped.length} unlabeled=${noLabel.length}`);
    if (clipped.length) clipped.slice(0,5).forEach(c=>L(`      CLIPPED ${c.el} "${c.label}" x=${c.x} w=${c.w}`));
    if (noLabel.length) noLabel.slice(0,5).forEach(c=>L(`      NOLABEL ${c.el} href=${c.href} ${c.w}x${c.h}`));
  }
}

L("\n=== UNDERSIZED CONTROLS DETAIL (390x844, h<44) grouped ===");
const und = {};
for (const p of d.pages.filter((x) => x.viewport === "390x844")) {
  for (const c of (p.audit?.controls || []).filter((c) => c.visible && (c.h < 44 || c.w < 44))) {
    const k = `${p.site}|${c.el}|${c.label.slice(0, 30)}`;
    (und[k] ||= { ...c, pages: new Set() }); und[k].pages.add(new URL(p.url).pathname);
  }
}
Object.values(und).sort((a, b) => a.h * a.w - b.h * b.w).slice(0, 45).forEach((c) =>
  L(`  ${c.w}x${c.h}px  <${c.tag}> "${c.label}" [${c.el}] href=${(c.href||'').slice(0,45)} pages=${[...c.pages].slice(0, 2).join(",")}`)
);

L("\n=== CONTROLS TOO CLOSE TOGETHER (390x844, gap<8px vertical) ===");
for (const p of d.pages.filter((x) => x.viewport === "390x844")) {
  const cs = (p.audit?.controls || []).filter((c) => c.visible).sort((a, b) => a.y - b.y);
  for (let i = 1; i < cs.length; i++) {
    const a = cs[i - 1], b = cs[i];
    const gap = b.y - (a.y + a.h);
    if (gap >= 0 && gap < 8 && Math.abs(a.x - b.x) < 60 && a.h < 60 && b.h < 60)
      L(`  ${p.site}${new URL(p.url).pathname}: "${a.label.slice(0,25)}" -> "${b.label.slice(0,25)}" gap=${gap}px`);
  }
}

// 4. images
L("\n=== IMAGES ===");
for (const site of ["jch", "scp"]) {
  const pgs = d.pages.filter((p) => p.site === site && p.viewport === "390x844");
  const noAlt = new Set(), broken = new Set(), over = new Set();
  let total = 0;
  for (const p of pgs) for (const im of p.audit?.images || []) {
    total++;
    if (!im.hasAlt) noAlt.add(im.src);
    if (im.broken) broken.add(im.src);
    if (im.nw && im.dw && im.nw > im.dw * 2.5 && im.dw > 0) over.add(`${im.src} natural=${im.nw}x${im.nh} shown=${im.dw}x${im.dh}`);
  }
  L(`  ${site}: imgs=${total} missingAlt=${noAlt.size} broken=${broken.size} oversized=${over.size}`);
  [...noAlt].slice(0, 8).forEach((s) => L(`     NOALT ${s}`));
  [...broken].slice(0, 8).forEach((s) => L(`     BROKEN ${s}`));
  [...over].slice(0, 10).forEach((s) => L(`     OVERSIZED ${s}`));
}

// 5. headings
L("\n=== HEADING HIERARCHY (390x844) ===");
for (const p of d.pages.filter((x) => x.viewport === "390x844")) {
  const hs = (p.audit?.headings || []).filter((h) => h.visible);
  const h1 = hs.filter((h) => h.lvl === 1).length;
  const skips = [];
  for (let i = 1; i < hs.length; i++) if (hs[i].lvl - hs[i - 1].lvl > 1) skips.push(`h${hs[i - 1].lvl}->h${hs[i].lvl} "${hs[i].text.slice(0,30)}"`);
  if (h1 !== 1 || skips.length) L(`  ${p.site}${new URL(p.url).pathname}: h1count=${h1} skips=[${skips.slice(0, 4).join("; ")}]`);
}

// 6. font sizes
L("\n=== SMALLEST VISIBLE FONT (390x844) ===");
d.pages.filter((x) => x.viewport === "390x844").forEach((p) => L(`  ${p.site}${new URL(p.url).pathname}: ${p.audit?.minFontSize?.px}px  ${(p.audit?.minFontSize?.el||'').slice(0,70)}`));

// 7. unlabeled fields
L("\n=== UNLABELED FORM FIELDS ===");
const uf = new Set();
for (const p of d.pages) for (const u of p.audit?.unlabeled || []) uf.add(`${p.site}${new URL(p.url).pathname} ${u.el} name=${u.name}`);
L(uf.size ? [...uf].join("\n") : "  none");

// 8. perf
L("\n=== PERFORMANCE (390x844 mobile) ===");
for (const p of d.pages.filter((x) => x.viewport === "390x844")) {
  const a = p.audit || {};
  L(`  ${p.site}${new URL(p.url).pathname}: ${a.perf?.totalKB}KB / ${a.perf?.resourceCount} reqs | LCP=${a.vitals?.lcp}ms CLS=${(a.vitals?.cls ?? 0).toFixed(3)} longTasks=${a.vitals?.longTasks} | DCL=${a.perf?.domContentLoaded}ms load=${a.perf?.loadEvent}ms`);
  (a.perf?.bigResources || []).slice(0, 4).forEach((b) => L(`       ${b.kb}KB ${b.type} ${b.url.slice(0, 110)}`));
}

L("\n=== PERF DESKTOP 1440 ===");
for (const p of d.pages.filter((x) => x.viewport === "1440x900")) {
  const a = p.audit || {};
  L(`  ${p.site}${new URL(p.url).pathname}: ${a.perf?.totalKB}KB LCP=${a.vitals?.lcp}ms CLS=${(a.vitals?.cls ?? 0).toFixed(3)} overflow=${a.horizontalOverflow}`);
}

// 9. cdn-cgi email links post-JS
L("\n=== cdn-cgi EMAIL-PROTECTION LINKS REMAINING AFTER JS ===");
const cg = new Set();
for (const p of d.pages) for (const l of p.audit?.links || []) if (l.includes("cdn-cgi/l/email-protection")) cg.add(p.site + new URL(p.url).pathname + " -> " + l.slice(0, 90));
L(cg.size ? [...cg].slice(0, 12).join("\n") : "  none remaining (JS decoded them to mailto:)");

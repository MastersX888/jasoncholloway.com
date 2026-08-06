// Link + status checker for both SCP sites. Read-only.
import fs from "node:fs";
const OUT = "C:\\Users\\zh577\\.gemini\\antigravity\\scratch\\jasoncholloway\\scratch\\ops_reports\\editorial\\web_qa";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";

async function getSitemap(origin) {
  const r = await fetch(origin + "/sitemap.xml", { headers: { "user-agent": UA } });
  const t = await r.text();
  return [...t.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

async function check(url, method = "GET") {
  try {
    const c = AbortSignal.timeout(30000);
    const r = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow", signal: c, method });
    return { url, status: r.status, finalUrl: r.url, ct: r.headers.get("content-type") };
  } catch (e) {
    return { url, status: 0, err: String(e.message || e).slice(0, 120) };
  }
}

const out = { generated: new Date().toISOString() };

for (const origin of ["https://jasoncholloway.com", "https://seventhcitypress.com"]) {
  const key = origin.includes("jason") ? "jch" : "scp";
  const locs = await getSitemap(origin);
  out[key + "_sitemap"] = [];
  const internalLinks = new Set(locs);
  const externalLinks = new Set();

  for (const u of locs) {
    const r = await check(u);
    out[key + "_sitemap"].push(r);
    if (r.status === 200 && (r.ct || "").includes("html")) {
      try {
        const html = await (await fetch(u, { headers: { "user-agent": UA } })).text();
        for (const m of html.matchAll(/href="([^"]+)"/g)) {
          let h = m[1];
          if (h.startsWith("#") || h.startsWith("mailto:") || h.startsWith("tel:") || h.startsWith("data:")) continue;
          if (h.startsWith("/")) internalLinks.add(origin + h);
          else if (h.startsWith("http")) {
            if (h.startsWith(origin)) internalLinks.add(h);
            else externalLinks.add(h);
          }
        }
      } catch {}
    }
  }
  out[key + "_internal"] = [];
  for (const u of internalLinks) out[key + "_internal"].push(await check(u));
  out[key + "_external"] = [...externalLinks];
}

// Retail / catalog verification
const RETAIL = [
  "https://www.amazon.com/dp/B0H4KYMSM1",
  "https://www.amazon.com/dp/B0H4KQ4YQJ",
  "https://www.amazon.com/dp/B0H4L36X21",
];
out.retail = [];
for (const u of RETAIL) out.retail.push(await check(u));

fs.writeFileSync(OUT + "\\_links_raw.json", JSON.stringify(out, null, 1));
console.log("LINKCHECK DONE");
for (const k of Object.keys(out)) {
  if (Array.isArray(out[k])) {
    const bad = out[k].filter((x) => x && x.status !== undefined && x.status !== 200);
    console.log(k, "total=" + out[k].length, "nonOK=" + bad.length);
    bad.slice(0, 40).forEach((b) => console.log("   ", b.status, b.url, b.err || ""));
  }
}

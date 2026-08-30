// Report which .py files scripts/check-page-counts.mjs now actually inspects,
// applying the gate's own traversal rules. Read-only; changes nothing.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const gate = readFileSync(join(REPO_ROOT, "scripts", "check-page-counts.mjs"), "utf8");

// Pull SKIP_DIRS straight out of the gate so this cannot drift from it.
const skipBlock = gate.match(/const SKIP_DIRS = new Set\(\[([\s\S]*?)\]\);/)[1];
const SKIP_DIRS = new Set(
  [...skipBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1])
);
const catalog = JSON.parse(
  readFileSync(join(REPO_ROOT, "lib", "data", "ingram-catalog.json"), "utf8")
);
const ISBNS = catalog.editions.map((e) => e.isbn);

const CLAIM = /(?<![\w.#-])(\d{2,4})\s*(?:pages\b|pp\.)|\b(?:page[_\s]?count|numberofpages)\b["'\s:=>{}()]{0,8}(\d{2,4})\b/gi;

const scanned = [];
const skipped = [];

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(abs);
      continue;
    }
    if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".py")) continue;
    const rel = relative(REPO_ROOT, abs).split(sep).join("/");
    if (/\.(bak|orig|tmp|old|swp)$/i.test(entry.name)) { skipped.push([rel, "backup name"]); continue; }
    if (/\.PRE_[A-Z0-9_]+\./.test(entry.name)) { skipped.push([rel, "PRE_ backup"]); continue; }
    if (statSync(abs).size > 4 * 1024 * 1024) { skipped.push([rel, "over 4 MB"]); continue; }
    let text;
    try { text = readFileSync(abs, "utf8"); } catch { skipped.push([rel, "unreadable"]); continue; }
    if (!text.includes("979") && !text.includes("978")) continue; // gate early-returns
    const isbnHits = ISBNS.filter((i) => text.includes(i));
    CLAIM.lastIndex = 0;
    const claims = [...text.matchAll(CLAIM)].map((m) => m[0].trim());
    scanned.push([rel, isbnHits, claims]);
  }
}

walk(REPO_ROOT);

console.log(`SKIP_DIRS read from the gate: ${[...SKIP_DIRS].join(", ")}\n`);
console.log(`.py files the gate now inspects for real (ISBN present): ${scanned.length}\n`);
for (const [rel, isbns, claims] of scanned) {
  console.log(`  ${rel}`);
  console.log(`      catalog ISBNs present : ${isbns.length ? isbns.join(", ") : "(none of ours)"}`);
  console.log(`      page-count claims     : ${claims.length ? claims.join(" | ") : "none"}`);
}
if (skipped.length) {
  console.log(`\nexcluded by name/size: ${skipped.length}`);
  for (const [rel, why] of skipped) console.log(`  ${rel}  (${why})`);
}

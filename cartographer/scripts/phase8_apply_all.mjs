#!/usr/bin/env node
/**
 * Apply fix_quality_hill.json (change:true only) + fix_geo_prose.json to corpus in-place.
 * Emits FIX_CHANGELOG.md
 */
import fs from "fs";
import path from "path";

const ROOT = "/workspace/cartographer";
const CORPUS = path.join(ROOT, "corpus");
const BOOKS = {
  1: "MASTERS_X_BOOK1_DEMY_9798256008048.txt",
  2: "MASTERS_X_BOOK2_DEMY_9798256009953.txt",
  3: "MASTERS_X_BOOK3_DEMY_9798256010072.txt",
};

const qh = JSON.parse(fs.readFileSync(path.join(ROOT, "artifacts/fix_quality_hill.json"), "utf8"));
const geo = JSON.parse(fs.readFileSync(path.join(ROOT, "artifacts/fix_geo_prose.json"), "utf8"));

const qhEdits = qh
  .filter((x) => x.change)
  .map((x, i) => ({
    id: `qh-${x.book}-${x.line ?? x.line_start ?? i}`,
    book: x.book,
    old: x.old,
    new: x.new,
    ruling: x.class || "HQ",
    note: x.rationale || "",
  }));

const all = [...geo, ...qhEdits];
const log = [];

for (const [book, name] of Object.entries(BOOKS)) {
  const src = path.join(CORPUS, name);
  let text = fs.readFileSync(src, "utf8");
  const bookEdits = all.filter((e) => String(e.book) === book);
  for (const e of bookEdits) {
    const count = text.split(e.old).length - 1;
    if (count !== 1) {
      console.error(`FAIL ${e.id}: matches=${count}`);
      console.error("OLD:", JSON.stringify(e.old.slice(0, 200)));
      // try trimmed variants for leading space issues
      process.exit(1);
    }
    text = text.replace(e.old, e.new);
    log.push({
      id: e.id,
      book: Number(book),
      ruling: e.ruling,
      note: e.note || "",
      old: e.old,
      new: e.new,
    });
    console.log(`OK ${e.id}`);
  }
  fs.writeFileSync(src, text);
  console.log(`Wrote ${src}`);
}

// Verification sweep
const bad = [
  /Hotel Phillips Building office/i,
  /2847 Genessee/,
  /MISSOURI\s*\n?\s*COLD STORAGE CO/,
  /Bethany Falls\s*\n?\s*Limestone Company/,
  /Washington County, Missouri/,
  /fifty-five feet below the surface/,
  /Somewhere below them, 160 feet/,
  /West Bottoms, where, 160 feet/,
  /buildings of Troost/,
  /Troost corridor empty/,
  /second floor of the Washington Street/,
  /11 PM\. Quality Hill\. The Foundation empty/,
  /Foundation's mailbox\. Quality Hill/,
  /Quality Hill entrance on graduation/,
  /mailbox on Quality Hill held/,
];

for (const [book, name] of Object.entries(BOOKS)) {
  const text = fs.readFileSync(path.join(CORPUS, name), "utf8");
  for (const re of bad) {
    if (re.test(text)) {
      console.error(`VERIFY FAIL B${book}: ${re}`);
      process.exit(1);
    }
  }
}
console.log("VERIFY OK — banned strings absent");

// Changelog
let md = `# FIX CHANGELOG — CARTOGRAPHER Phase 8
**Date:** 2026-07-28  
**Model:** Claude Opus 5 (adjudication/prose) + apply script  
**Corpus:** \`cartographer/corpus/MASTERS_X_BOOK*_DEMY_*.txt\`

Author rulings applied from \`AUTHOR_DECISION_BRIEF.md\` (locked).

| # | ID | Book | Ruling | Summary |
|---|---|---|---|---|
`;
log.forEach((e, i) => {
  const summary = (e.note || e.new.slice(0, 80)).replace(/\n/g, " ").slice(0, 100);
  md += `| ${i + 1} | ${e.id} | B${e.book} | ${e.ruling} | ${summary} |\n`;
});
md += `\n## Detail\n\n`;
for (const e of log) {
  md += `### ${e.id} (B${e.book}, ${e.ruling})\n`;
  if (e.note) md += `${e.note}\n\n`;
  md += "```diff\n";
  for (const l of e.old.split("\n")) md += `- ${l}\n`;
  for (const l of e.new.split("\n")) md += `+ ${l}\n`;
  md += "```\n\n";
}
md += `## Notes\n`;
md += `- Omnibus raw extract and audiobook scripts not auto-synced; DEMY-named corpus is the fix target.\n`;
md += `- Residence still sometimes called "apartment" while Book 3 house/porch language exists — author dwelling-type decision, out of geo scope (except balcony→porch at B3:4213).\n`;
md += `- Genessee address: **1647**; storage co.: **RIVERWARDS COLD STORAGE CO. 1923**.\n`;

fs.writeFileSync(path.join(ROOT, "FIX_CHANGELOG.md"), md);
fs.writeFileSync(path.join(ROOT, "artifacts/fix_applied_log.json"), JSON.stringify(log, null, 2));
console.log(`Changelog: ${log.length} edits`);

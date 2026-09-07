#!/usr/bin/env node
/**
 * Apply artifacts/fix_geo_prose.json to the corpus, or to a scratch copy.
 *
 * Usage:
 *   node scripts/phase8_apply_fix_geo_prose.mjs --out-dir /tmp/fixed --diff
 *   node scripts/phase8_apply_fix_geo_prose.mjs --in-place
 */
import fs from "fs";
import path from "path";

const ROOT = "/workspace/cartographer";
const CORPUS = path.join(ROOT, "corpus");
const SPEC = path.join(ROOT, "artifacts", "fix_geo_prose.json");

const BOOKS = {
  1: "MASTERS_X_BOOK1_DEMY_9798256008048.txt",
  2: "MASTERS_X_BOOK2_DEMY_9798256009953.txt",
  3: "MASTERS_X_BOOK3_DEMY_9798256010072.txt",
};

function arg(name) {
  const i = process.argv.indexOf(name);
  return i === -1 ? null : process.argv[i + 1];
}

/** Print a unified-style context diff for each replaced block. */
function printBlockDiff(book, edit, beforeLines) {
  const start = edit.line_start;
  const end = edit.line_end;
  const ctx = 3;
  const from = Math.max(1, start - ctx);
  const to = Math.min(beforeLines.length, end + ctx);
  console.log(`@@ B${book}:${start}-${end}  ${edit.id}  (ruling ${edit.ruling}) @@`);
  for (let i = from; i < start; i++) console.log(" " + beforeLines[i - 1]);
  for (const l of edit.old.split("\n")) console.log("-" + l);
  for (const l of edit.new.split("\n")) console.log("+" + l);
  for (let i = end + 1; i <= to; i++) console.log(" " + beforeLines[i - 1]);
  console.log("");
}

function main() {
  const inPlace = process.argv.includes("--in-place");
  const outDir = arg("--out-dir");
  const wantDiff = process.argv.includes("--diff");

  if (!inPlace && !outDir) {
    console.error("pass --in-place or --out-dir <dir>");
    process.exit(2);
  }

  const edits = JSON.parse(fs.readFileSync(SPEC, "utf8"));
  if (!inPlace) fs.mkdirSync(outDir, { recursive: true });

  for (const [book, name] of Object.entries(BOOKS)) {
    const src = path.join(CORPUS, name);
    const original = fs.readFileSync(src, "utf8");
    const originalLines = original.split("\n");
    let text = original;
    let applied = 0;

    for (const e of edits.filter((x) => String(x.book) === book)) {
      if (text.split(e.old).length - 1 !== 1) {
        console.error(`ERROR ${e.id}: expected exactly 1 match`);
        process.exit(1);
      }
      if (wantDiff) printBlockDiff(book, e, originalLines);
      text = text.replace(e.old, e.new);
      applied++;
    }

    const dest = inPlace ? src : path.join(outDir, name);
    fs.writeFileSync(dest, text);
    console.log(`B${book}: applied ${applied} edits -> ${dest}`);
  }
}

main();

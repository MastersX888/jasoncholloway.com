// What else sits on a line with a catalog ISBN in the .py files the gate scans?
// Needed to size the false-positive risk of a positional (unlabelled-column) rule.

import { readFileSync } from "node:fs";

const catalog = JSON.parse(readFileSync("lib/data/ingram-catalog.json", "utf8"));
const ISBNS = catalog.editions.map((e) => e.isbn);
const COUNTS = new Map(catalog.editions.map((e) => [e.isbn, e.pageCount]));

const FILES = [
  "scripts/generate_press_kit.py",
  "scripts/generate_press_kit.PRE_PRESSKIT_2026-08-29.py.bak",
  "scripts/sync-ingram-metadata.py",
  "audiobook_project/pipeline/omnibus_audiobook/build_scripts.py",
];

const BARE = /(?<![\w.$])(\d{2,4})(?![\w.])/g;

for (const file of FILES) {
  console.log(`\n=== ${file}`);
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const onLine = ISBNS.filter((isbn) => line.includes(isbn));
    if (onLine.length === 0) return;
    BARE.lastIndex = 0;
    const bare = [...line.matchAll(BARE)].map((m) => Number(m[1]));
    const expected = onLine.map((isbn) => COUNTS.get(isbn));
    const bad = bare.filter((v) => !expected.includes(v));
    console.log(
      `  L${i + 1}  isbn=${onLine.join(",")} expect=${expected.join(",")} ` +
        `bare=[${bare.join(",")}] unexplained=[${bad.join(",")}]`
    );
    console.log(`        ${line.trim().slice(0, 110)}`);
  });
}

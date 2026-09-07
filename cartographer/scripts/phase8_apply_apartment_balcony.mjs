#!/usr/bin/env node
/**
 * Apply artifacts/fix_apartment_balcony.json to the Book 3 corpus.
 *
 * Locked author ruling: Blake & Nadia's Quality Hill residence is an APARTMENT
 * with a BALCONY, not a house with a porch.
 *
 * Every edit is line-scoped and asserts exactly one match on its recorded line,
 * so the pass cannot silently double-apply or drift if the corpus moves.
 *
 * Usage:
 *   node scripts/phase8_apply_apartment_balcony.mjs --in-place
 *   node scripts/phase8_apply_apartment_balcony.mjs --verify
 */
import fs from "fs";
import path from "path";

const ROOT = "/workspace/cartographer";
const BOOK3 = path.join(ROOT, "corpus", "MASTERS_X_BOOK3_DEMY_9798256010072.txt");
const SPEC = path.join(ROOT, "artifacts", "fix_apartment_balcony.json");

function main() {
  const inPlace = process.argv.includes("--in-place");
  const verify = process.argv.includes("--verify");

  if (!inPlace && !verify) {
    console.error("pass --in-place or --verify");
    process.exit(2);
  }

  const spec = JSON.parse(fs.readFileSync(SPEC, "utf8"));
  const lines = fs.readFileSync(BOOK3, "utf8").split("\n");

  for (const e of spec.edits) {
    const idx = e.line - 1;
    const line = lines[idx];
    const probe = verify ? e.new : e.old;
    const count = line.split(probe).length - 1;
    if (count !== 1) {
      console.error(
        `ERROR line ${e.line}: expected exactly 1 match for ${JSON.stringify(probe)}, found ${count}`
      );
      console.error(`  line: ${JSON.stringify(line)}`);
      process.exit(1);
    }
    if (inPlace) lines[idx] = line.replace(e.old, e.new);
  }

  if (inPlace) {
    fs.writeFileSync(BOOK3, lines.join("\n"));
    console.log(`applied ${spec.edits.length} edits -> ${BOOK3}`);
  } else {
    console.log(`verified ${spec.edits.length} edits in place -> ${BOOK3}`);
  }

  const residualPorch = [];
  const residualHouse = [];
  lines.forEach((line, i) => {
    if (/porch/i.test(line)) residualPorch.push(`${i + 1}:${line}`);
    if (/\bhouses?\b/i.test(line)) residualHouse.push(`${i + 1}:${line}`);
  });
  const allowed = new Set(spec.kept_unchanged.map((k) => k.line));
  const unexpected = [...residualPorch, ...residualHouse].filter(
    (l) => !allowed.has(Number(l.split(":")[0]))
  );

  console.log(`residual "porch": ${residualPorch.length}`);
  residualPorch.forEach((l) => console.log(`  ${l}`));
  console.log(`residual "house": ${residualHouse.length}`);
  residualHouse.forEach((l) => console.log(`  ${l}`));

  if (unexpected.length) {
    console.error("ERROR: undocumented residual house/porch lines:");
    unexpected.forEach((l) => console.error(`  ${l}`));
    process.exit(1);
  }
  console.log("OK: every residual house/porch line is a documented keep.");
}

main();

#!/usr/bin/env node
// Fail when a script in a must-be-tracked directory is invisible to git.
//
// The recurring failure this guards is not any single .gitignore rule. It is
// that `*.py` makes every new script untracked by default, so a script can be
// written, relied on, and lost without git ever having seen it -- which is how
// production_staging/_scripts_from_windows/audit_body_italics.py was lost, and
// how scripts/generate_press_kit.py was rewritten on 2026-08-29 with `git diff`
// reporting nothing.
//
// NOT WIRED INTO `prebuild`. It fails on the current tree by design, because
// the scripts it names have not been committed yet. Wiring it in before that
// commit lands would break `npm run build`.
//
//   node scripts/check-tracked-coverage.mjs                 # all directories
//   node scripts/check-tracked-coverage.mjs <dir> [<dir>..] # only these
//
// Exits 0 when every required script is tracked, 1 otherwise.

import { execFileSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

// Non-recursive, one entry per `!<dir>/*.<ext>` negation in .gitignore, so the
// two cannot drift apart. Add a line here whenever you add a negation there.
const MUST_TRACK = [
  ["scripts", [".py", ".mjs", ".ps1"]],
  ["cartographer", [".py"]],
  ["cartographer/scripts", [".mjs"]],
  ["production_staging", [".py"]],
  ["production_staging/_docs", [".py"]],
  ["production_staging/_scripts_from_windows", [".py"]],
  ["scratch/_press_tools", [".py", ".mjs"]],
  ["the-bridge-worker", [".py"]],
];

// Deliberate carve-outs. These mirror the re-ignore rules in .gitignore; a file
// matching one of them is expected to be absent from git.
const EXEMPT = [
  /^scripts\/_[^/]*\.py$/, // one-off social-ops drivers
  /\.bak$/,
  /\.PRE_[A-Z0-9_]+\./,
];

const only = process.argv.slice(2);
const dirs = only.length
  ? MUST_TRACK.filter(([d]) => only.some((o) => d === o.replace(/\/+$/, "")))
  : MUST_TRACK;

if (only.length && dirs.length === 0) {
  console.error(`no must-track directory matches: ${only.join(", ")}`);
  process.exit(2);
}

const tracked = new Set(
  execFileSync("git", ["ls-files"], { cwd: ROOT, encoding: "utf8", maxBuffer: 64 << 20 })
    .split("\n")
    .filter(Boolean)
);

const required = [];
for (const [dir, exts] of dirs) {
  let entries;
  try {
    entries = readdirSync(join(ROOT, dir), { withFileTypes: true });
  } catch {
    continue; // directory not present in this checkout
  }
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!exts.some((e) => entry.name.toLowerCase().endsWith(e))) continue;
    const rel = `${dir}/${entry.name}`;
    if (EXEMPT.some((re) => re.test(rel))) continue;
    if (statSync(join(ROOT, rel)).size === 0) continue; // empty placeholder
    required.push(rel);
  }
}

const missing = required.filter((p) => !tracked.has(p));

// Tracked-but-ignored is not a failure -- git follows a tracked file regardless
// of ignore rules -- but it is one `git rm --cached` away from becoming one.
let fragile = [];
const trackedHere = required.filter((p) => tracked.has(p));
if (trackedHere.length) {
  try {
    const out = execFileSync("git", ["check-ignore", "--no-index", "-v", "--", ...trackedHere], {
      cwd: ROOT,
      encoding: "utf8",
    });
    fragile = out
      .split("\n")
      .filter((l) => l && !/^[^\t]*:!/.test(l))
      .map((l) => l.split("\t")[1]);
  } catch {
    // exit 1 means nothing matched, which is the good case
  }
}

console.log(`checked ${required.length} script(s) across ${dirs.length} director(ies)`);
if (fragile.length) {
  console.log(`\ntracked but still matched by an ignore rule (${fragile.length}):`);
  for (const p of fragile) console.log(`  ${p}`);
}
if (missing.length) {
  console.error(`\nNOT TRACKED BY GIT (${missing.length}) -- these can be lost silently:`);
  for (const p of missing) console.error(`  ${p}`);
  console.error(`\nRun \`git add\` on each, or add a carve-out to EXEMPT in ${"scripts/check-tracked-coverage.mjs"}.`);
  process.exit(1);
}
console.log("\nall required scripts are tracked");

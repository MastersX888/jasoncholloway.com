#!/usr/bin/env node
// Prebuild gate: no backup file may sit under a `public/` directory.
//
// On 2026-08-29 three `.bak` files were found under `public/`, and one of them,
// `bg-rose-window.png.bak`, was confirmed live-served from the previous build.
// Two others held superseded canon prose. Everything under `public/` is copied
// verbatim into the static export, and nothing in the pipeline filtered these
// out, so any backup dropped there publishes itself.
//
// This fails the build rather than stripping the file, because a backup under
// `public/` means someone saved it in the wrong place and the copy they wanted
// to keep is at risk. Deleting it silently would destroy that copy.
//
// The walk is a direct filesystem walk on purpose: these files are gitignored,
// so `git ls-files` and most glob tooling report them as absent.
//
// Exits 0 when clean, 1 if any backup file is found.

import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = fileURLToPath(new URL("..", import.meta.url));

/** Both projects deploy their own `public/` tree. */
const PUBLIC_DIRS = [
  join(REPO_ROOT, "public"),
  join(REPO_ROOT, "seventhcitypress", "public"),
];

/**
 * Backup and scratch suffixes, matched at the end of the filename so that
 * `bg-rose-window.png.bak` is caught as well as `notes.bak`.
 */
const BACKUP_PATTERN =
  /\.(bak|bak\d*|backup|orig|old|tmp|temp|save|swp|swo|rej|~)$/i;

/** Editor and tooling leftovers that are not suffix-shaped. */
const BACKUP_NAME_PATTERN = /(^|[.-])(copy|conflicted copy)\b|~$|^#.*#$/i;

const found = [];

function walk(directory) {
  let entries;
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return; // Directory absent in this project; nothing to check.
  }
  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(absolutePath);
      continue;
    }
    if (!entry.isFile()) continue;
    if (BACKUP_PATTERN.test(entry.name) || BACKUP_NAME_PATTERN.test(entry.name)) {
      found.push(relative(REPO_ROOT, absolutePath).split(sep).join("/"));
    }
  }
}

for (const publicDir of PUBLIC_DIRS) walk(publicDir);

if (found.length > 0) {
  console.error("\npublic/ backup-file gate FAILED\n");
  console.error(
    `  ${found.length} backup file(s) under public/. Everything under public/ is`
  );
  console.error("  published verbatim, so these would be served live:\n");
  for (const path of found) console.error(`    ${path}`);
  console.error(
    "\nMove them out of public/ — production_staging/ is the place for superseded"
  );
  console.error(
    "copies. The build will not delete them for you, because the backup may be the\nonly remaining copy.\n"
  );
  process.exit(1);
}

console.log("public/ backup-file gate OK — no backup files under either public/ tree.");

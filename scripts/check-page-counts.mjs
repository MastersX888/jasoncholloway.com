#!/usr/bin/env node
// Prebuild gate: no page count may disagree with lib/data/ingram-catalog.json.
//
// On 2026-08-02 a stale page-count table was published from this repo to
// TheStoryGraph, Goodreads, Open Library and Pinterest, and into the site's own
// JSON-LD `numberOfPages`, because seven separate files each held their own copy
// and one was missed. The catalog JSON is now the only place a count may live.
// This gate exists so a second copy cannot reappear unnoticed: it scans the
// source tree for page-count claims sitting near one of the print ISBNs and
// fails the build when a claim disagrees with the catalog.
//
// Exits 0 when consistent, 1 on any mismatch or structural problem.
//
// This gate polices counts that ARE published; it says nothing about a count
// that is deliberately withheld, and it cannot. The EPUB editions publish no
// `numberOfPages` at all, by ruling, because the catalog's EPUB counts are
// unverified July estimates and a reflowable EPUB has no fixed pagination. The
// catalog must keep an integer pageCount for those ISBNs — the loader below
// requires one — so a green run here is not permission to emit the field.
// See EBOOK_PAGECOUNT_RULING_2026-08-30.md before adding it anywhere.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = fileURLToPath(new URL("..", import.meta.url));
const CATALOG_PATH = join(REPO_ROOT, "lib", "data", "ingram-catalog.json");

/** How far from an ISBN a page-count claim still counts as describing it. */
const WINDOW_LINES = 30;

/**
 * Directories never scanned. Build output and dependencies are derived; the
 * others are historical records, staged artifacts, and separate sub-projects
 * that legitimately quote page counts as they stood on a past date, where
 * correcting them would falsify the record. `_wikidata` in particular holds
 * John Hawkes's own page counts, not this author's.
 */
const SKIP_DIRS = new Set([
  ".git",
  ".next",
  "node_modules",
  "out",
  "__pycache__",
  "scratch",
  "production_staging",
  "debt_consolidation_handoff",
  "universe_memory",
  "_wikidata",
  // Separate sub-projects, excluded from the root tsconfig for the same reason.
  "groundswell-monitor",
  "kc-events",
  "kimi-analyst",
  "the-bridge-worker",
  "author_patches",
  "scp_verification_return",
  "website_elevation_handoff",
]);

/**
 * Only files that ship, or that feed something that ships. Prose documentation
 * is deliberately not scanned: it quotes superseded figures on purpose when
 * recording what went wrong, and it reaches no reader as metadata.
 *
 * `.py` is here because leaving it out is what let this gate pass while
 * `scripts/generate_press_kit.py` held eight stale counts and published them to
 * both live domains as a PDF press kit. Python in this repo is not test
 * scaffolding: it generates press material, retail feeds, and print interiors.
 * The scripts that legitimately quote superseded figures — the Windows interior
 * builders and the archived one-off runs — all live under `production_staging/`
 * and `scratch/`, which SKIP_DIRS already excludes, so widening by extension
 * does not reach them.
 */
const SCAN_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".csv",
  ".xml",
  ".py",
]);

/** The source of truth and the two modules that read it may hold the numbers. */
const ALLOWED_TO_HOLD_COUNTS = new Set([
  "lib/data/ingram-catalog.json",
  "lib/data/pageCounts.ts",
  "seventhcitypress/lib/pageCounts.ts",
  "scripts/check-page-counts.mjs",
]);

function fail(problems) {
  console.error("\npage-count gate FAILED\n");
  for (const problem of problems) console.error(`  ${problem}`);
  console.error(
    "\n  lib/data/ingram-catalog.json is the single source of truth for page counts."
  );
  console.error(
    "  Derive the number from it (lib/data/pageCounts.ts) instead of writing it down again.\n"
  );
  process.exit(1);
}

// ── Load the authoritative counts ────────────────────────────────────────────

let catalog;
try {
  catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
} catch (error) {
  fail([`Could not read ${relative(REPO_ROOT, CATALOG_PATH)}: ${error.message}`]);
}

if (!Array.isArray(catalog.editions) || catalog.editions.length === 0) {
  fail(["ingram-catalog.json has no `editions` array."]);
}

/** isbn -> { pageCount, format } where format is "HC" | "PB" | "EB". */
const editions = new Map();
const FORMAT_CODES = { Hardcover: "HC", Paperback: "PB", Ebook: "EB" };

for (const edition of catalog.editions) {
  if (typeof edition.isbn !== "string" || !Number.isInteger(edition.pageCount)) {
    fail([`Edition ${edition.isbn ?? "(no isbn)"} has no integer pageCount.`]);
  }
  if (editions.has(edition.isbn)) {
    fail([`ISBN ${edition.isbn} appears twice in \`editions\`.`]);
  }
  editions.set(edition.isbn, {
    pageCount: edition.pageCount,
    format: FORMAT_CODES[edition.formatLabel] ?? null,
  });
}

const problems = [];

// ── The file's own internal duplication ──────────────────────────────────────
// `scripts/sync-ingram-metadata.py` writes `editions` and `byIsbn` from a single
// dict, so a regenerated file cannot disagree with itself. A hand-edit can, and
// a hand-edit is how the stale table shipped. The shape belongs to the
// generator, so the two copies are checked for agreement rather than removed.

if (!catalog.byIsbn || typeof catalog.byIsbn !== "object") {
  problems.push("ingram-catalog.json has no `byIsbn` map.");
} else {
  const mirroredCount = Object.keys(catalog.byIsbn).length;
  if (mirroredCount !== editions.size) {
    problems.push(
      `ingram-catalog.json: \`editions\` has ${editions.size} entries but ` +
        `\`byIsbn\` has ${mirroredCount}.`
    );
  }
  for (const [isbn, { pageCount }] of editions) {
    const mirrored = catalog.byIsbn[isbn];
    if (!mirrored) {
      problems.push(`ingram-catalog.json: \`byIsbn\` is missing ISBN ${isbn}.`);
    } else if (mirrored.pageCount !== pageCount) {
      problems.push(
        `ingram-catalog.json disagrees with itself for ISBN ${isbn}: ` +
          `editions=${pageCount} but byIsbn=${mirrored.pageCount}.`
      );
    }
  }
}

// ── Scan the source tree for second copies ───────────────────────────────────

/**
 * A page-count claim: a 2- to 4-digit integer presented as a number of pages.
 * Requiring the page-count vocabulary, and requiring an ISBN nearby, is what
 * keeps the scan off the many innocent occurrences of these digits —
 * `pp. 113-178` (in-fiction pagination in the research archive), `"247 pages"`
 * (a fictional in-universe document in lib/data/blogPosts.ts), John Hawkes's
 * own P1104 values, CSS lengths like `minmax(260px, 1fr)`, SVG coordinates,
 * the 170.55 frequency, and framework codes such as `E734` or `Error(u(156))`.
 */
const CLAIM_PATTERNS = [
  // `pageCountHC: 163`, `pagesHc: 163`, `"Page Count (HC)": "163 pages"`
  { qualified: true, pattern: /\bpage[_\s]?counts?[_\s]?(hc|pb)\b\D{0,20}?(\d{2,4})\b/gi },
  { qualified: true, pattern: /\bpages(hc|pb)\b\D{0,20}?(\d{2,4})\b/gi },
  { qualified: true, pattern: /\bpage\s*count\s*\(\s*(hc|pb)\s*\)\D{0,20}?(\d{2,4})\b/gi },
  // `pageCount: 163`, `numberOfPages: 163`, `Page Count: 163`. The gap is kept
  // narrow so that prose such as `page count drift" alarm on 2026-08-29` is not
  // read as a claim of 2026 pages.
  { qualified: false, pattern: /\b(?:page[_\s]?count|numberofpages)\b["'\s:=>{}()]{0,8}(\d{2,4})\b/gi },
  // `163 pages`, `163 pp.`, and the HTML-entity spacing the press-kit
  // generator emits into its PDFs: `684&nbsp;pp`.
  { qualified: false, pattern: /(?<![\w.#-])(\d{2,4})(?:\s|&nbsp;|&#160;)*(?:pages\b|pp\b)/gi },
];

/** Every page count the catalog currently holds, in any format. */
const ALL_COUNTS = new Set([...editions.values()].map(({ pageCount }) => pageCount));

/**
 * A positional table writes the count as an unlabelled column —
 * `("Paperback", "9798256008048", "178", "$16.99")` — carrying none of the
 * page-count vocabulary the patterns above depend on. That is the exact shape in
 * which `scripts/generate_press_kit.py` held eight stale counts and published
 * them to both live domains while this gate reported OK. So in Python, a bare
 * 2- to 4-digit integer sharing a line with a catalog ISBN must be that
 * edition's page count. Prices and trim sizes carry a decimal point, dates and
 * ranges carry a hyphen, and the ISBN itself is thirteen digits, so none of them
 * match.
 */
const BARE_INTEGER = /(?<![\w.$-])(\d{2,4})(?![\w.-])/g;

/** Every count currently in the catalog, for the unqualified-claim check. */
function claimsIn(text) {
  const claims = [];
  for (const { qualified, pattern } of CLAIM_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      claims.push({
        format: qualified ? match[1].toUpperCase() : null,
        value: Number(qualified ? match[2] : match[1]),
        index: match.index,
        text: match[0],
      });
    }
  }
  return claims;
}

function scanFile(absolutePath) {
  const relativePath = relative(REPO_ROOT, absolutePath).split(sep).join("/");
  if (ALLOWED_TO_HOLD_COUNTS.has(relativePath)) return;
  const isPython = relativePath.endsWith(".py");

  let text;
  try {
    text = readFileSync(absolutePath, "utf8");
  } catch {
    return; // Unreadable or not text; nothing to check.
  }
  if (!text.includes("979") && !text.includes("978")) return; // No ISBN at all.

  const lines = text.split("\n");
  // Character offset of the start of each line, to map an index to a line.
  const lineStarts = [];
  let offset = 0;
  for (const line of lines) {
    lineStarts.push(offset);
    offset += line.length + 1;
  }
  const lineOf = (index) => {
    let low = 0;
    let high = lineStarts.length - 1;
    while (low < high) {
      const mid = Math.ceil((low + high) / 2);
      if (lineStarts[mid] <= index) low = mid;
      else high = mid - 1;
    }
    return low;
  };

  // Which ISBNs occur on which lines.
  const isbnLines = [];
  for (const isbn of editions.keys()) {
    let index = text.indexOf(isbn);
    while (index !== -1) {
      isbnLines.push({ isbn, line: lineOf(index) });
      index = text.indexOf(isbn, index + isbn.length);
    }
  }
  if (isbnLines.length === 0) return;

  const reported = new Set();

  for (const claim of claimsIn(text)) {
    const claimLine = lineOf(claim.index);
    const nearby = isbnLines.filter(
      ({ line }) => Math.abs(line - claimLine) <= WINDOW_LINES
    );
    if (nearby.length === 0) {
      // A generator prints its ISBN table in one function and describes the same
      // editions in prose in another: the omnibus figures in
      // generate_press_kit.py sit some 265 lines below the ISBNs, far outside
      // WINDOW_LINES, which is why the press release and synopses could
      // contradict the table. In Python, therefore, a page-count claim anywhere
      // in a file that names a catalog ISBN must be a count the catalog holds.
      if (!isPython || claim.format || ALL_COUNTS.has(claim.value)) continue;
      const orphanKey = `${claimLine}:${claim.text}`;
      if (reported.has(orphanKey)) continue;
      reported.add(orphanKey);
      problems.push(
        `${relativePath}:${claimLine + 1}: claims ${claim.value} pages, which is not the ` +
          `page count of any edition in the catalog:\n` +
          `      ${lines[claimLine].trim()}`
      );
      continue;
    }

    const key = `${claimLine}:${claim.text}`;
    if (reported.has(key)) continue;

    if (claim.format) {
      // A format-qualified claim must match the ISBN of that format nearby.
      // This is the case that caught the original regression: in books.ts
      // `pageCountHC` sits about fourteen lines below `isbn_hc`.
      const target = nearby.find(
        ({ isbn }) => editions.get(isbn).format === claim.format
      );
      if (!target) continue;
      const expected = editions.get(target.isbn).pageCount;
      if (claim.value !== expected) {
        reported.add(key);
        problems.push(
          `${relativePath}:${claimLine + 1}: ISBN ${target.isbn} (${claim.format}) is ` +
            `${expected} pages in the catalog, but this claims ${claim.value}:\n` +
            `      ${lines[claimLine].trim()}`
        );
      }
      continue;
    }

    // An unqualified claim must be the real count of one of the editions whose
    // ISBN appears nearby. That is what a book page legitimately does when it
    // prints hardcover and paperback counts side by side, and it is enough to
    // catch a stale value, which matches no current edition at all.
    const permitted = new Set(
      nearby.map(({ isbn }) => editions.get(isbn).pageCount)
    );
    if (!permitted.has(claim.value)) {
      reported.add(key);
      const expectations = nearby
        .map(({ isbn }) => `${isbn}=${editions.get(isbn).pageCount}`)
        .join(", ");
      problems.push(
        `${relativePath}:${claimLine + 1}: claims ${claim.value} pages, which is not ` +
          `the count of any edition named nearby (${expectations}):\n` +
          `      ${lines[claimLine].trim()}`
      );
    }
  }

  if (!isPython) return;

  // Unlabelled columns: a number standing beside an ISBN, with no vocabulary.
  const isbnsByLine = new Map();
  for (const { isbn, line } of isbnLines) {
    if (!isbnsByLine.has(line)) isbnsByLine.set(line, []);
    isbnsByLine.get(line).push(isbn);
  }

  for (const [lineIndex, isbnsHere] of isbnsByLine) {
    const line = lines[lineIndex];
    const permitted = new Set(
      isbnsHere.map((isbn) => editions.get(isbn).pageCount)
    );
    BARE_INTEGER.lastIndex = 0;
    let match;
    while ((match = BARE_INTEGER.exec(line)) !== null) {
      const value = Number(match[1]);
      if (permitted.has(value)) continue;
      const key = `${lineIndex}:bare:${value}`;
      if (reported.has(key)) continue;
      reported.add(key);
      const expectations = isbnsHere
        .map((isbn) => `${isbn}=${editions.get(isbn).pageCount}`)
        .join(", ");
      problems.push(
        `${relativePath}:${lineIndex + 1}: the bare number ${value} sits on a line with ` +
          `${expectations}. A count written beside an ISBN must come from the catalog:\n` +
          `      ${line.trim()}`
      );
    }
  }
}

function walk(directory) {
  let entries;
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(absolutePath);
      continue;
    }
    if (!entry.isFile()) continue;
    // Backups hold superseded numbers by definition and are not shipped.
    if (/\.(bak|orig|tmp|old|swp)$/i.test(entry.name)) continue;
    if (/\.PRE_[A-Z0-9_]+\./.test(entry.name)) continue;
    const dot = entry.name.lastIndexOf(".");
    if (dot === -1) continue;
    if (!SCAN_EXTENSIONS.has(entry.name.slice(dot).toLowerCase())) continue;
    if (statSync(absolutePath).size > 4 * 1024 * 1024) continue;
    scanFile(absolutePath);
  }
}

walk(REPO_ROOT);

if (problems.length > 0) fail(problems);

console.log(
  `page-count gate OK — ${editions.size} editions consistent with ` +
    `lib/data/ingram-catalog.json (editions/byIsbn agree; no second copy in the source tree).`
);

#!/usr/bin/env node
/**
 * PHASE 1 — NORMALIZE (v2)
 * Split omnibus_v8 into DEMY-named book files; strip pagination artifacts;
 * preserve original book line numbers; detect slug lines even when not
 * blank-separated from following prose.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve from this file's location so the pipeline runs outside the original
// /workspace cloud environment; CARTOGRAPHER_ROOT still overrides if needed.
const ROOT =
  process.env.CARTOGRAPHER_ROOT ||
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(ROOT, "..");
const RAW = path.join(ROOT, "corpus_raw/omnibus_v8_fulltext.txt");
const OUT = path.join(ROOT, "artifacts");
const CORPUS = path.join(ROOT, "corpus");
const AUDIO = path.join(
  REPO,
  "audiobook_project/output/elevenlabs_scripts/masters-x-omnibus"
);

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(CORPUS, { recursive: true });

const BOOK_META = {
  1: { filename: "MASTERS_X_BOOK1_DEMY_9798256008048.txt" },
  2: { filename: "MASTERS_X_BOOK2_DEMY_9798256009953.txt" },
  3: { filename: "MASTERS_X_BOOK3_DEMY_9798256010072.txt" },
};

const allLines = fs.readFileSync(RAW, "utf8").split(/\r?\n/);
const volIdx = {};
for (let i = 0; i < allLines.length; i++) {
  const t = allLines[i].trim();
  if (t === "VOLUME ONE") volIdx[1] = i;
  if (t === "VOLUME TWO") volIdx[2] = i;
  if (t === "VOLUME THREE") volIdx[3] = i;
}
const volEnd = { 1: volIdx[2], 2: volIdx[3], 3: allLines.length };

const PAGE_RE = /^===== PAGE \d+ =====$/;
const RUNHEAD_RE = /^(MASTERS X|HOLLOWAY)$/;
const PAGENUM_RE = /^\d{1,3}$/;

function artifactType(line, prev, next) {
  const t = line.trim();
  if (!t) return null;
  if (PAGE_RE.test(t)) return "page_marker";
  if (RUNHEAD_RE.test(t)) return "running_head";
  if (PAGENUM_RE.test(t)) {
    const p = (prev || "").trim();
    const n = (next || "").trim();
    if (RUNHEAD_RE.test(p) || RUNHEAD_RE.test(n) || PAGE_RE.test(p) || PAGE_RE.test(n)) {
      return "page_number";
    }
  }
  return null;
}

const TIME_RE =
  /^(Morning|Afternoon|Evening|Night|Dawn|Dusk|Midnight|Noon|Later|That (?:night|morning|evening|afternoon)|Next (?:morning|day|evening)|The next|Late|Early|\d{1,2}\s*(?:AM|PM)|One (?:year|week|month|day)|Three days|Six months|October|November|December|January|February|March|April|May|June|July|August|September)\b/i;

const LOC_RE =
  /\b(Quality Hill|West Bottoms|SubTropolis|Westport|Foundation|kitchen|apartment|chamber|Iceland|Prague|Ghana|Reykjav\w*|cottage|Washington Street|Hotel Phillips|Troost|City Market|Cathedral|basement|hallway|office|laboratory|lab|Strahov|Murano|Venice|Overland Park|River Market|Power & Light|Broadway|Genessee|Meramec|Picture Cave|Mýrdalsjökull|Myrdalsjokull|Volta|Asante|Senate|hearing room|server room)\b/i;

function looksLikeSlugLine(raw) {
  const t = raw.replace(/^\s+/, "").trim();
  if (!t || t.length > 160) return false;
  if (/^(CHAPTER|PROLOGUE|EPILOGUE|VOLUME|SUB-BOOK|MASTERS X|HOLLOWAY)\b/i.test(t)) return false;
  if (/^=====/.test(t)) return false;
  if (/^\d{1,3}$/.test(t)) return false;
  // Multi-clause short locative openers
  const clauses = t.split(/\.\s+/).filter(Boolean);
  if (clauses.length >= 2 && clauses.length <= 5 && t.length <= 140) {
    if (TIME_RE.test(t) || LOC_RE.test(t)) return true;
  }
  if (TIME_RE.test(t) && LOC_RE.test(t) && t.length <= 140) return true;
  if (/^\d{1,2}\s*(AM|PM)\b/i.test(t) && /\./.test(t) && t.length <= 140) return true;
  // "Morning. The Quality Hill kitchen."
  if (/^(Morning|Afternoon|Evening|Night|Dawn)\.\s+/i.test(t) && t.length <= 120) return true;
  return false;
}

function detectChapter(line) {
  const t = line.trim();
  let m = t.match(/^CHAPTER\s+([A-Z0-9-]+)\b/i);
  if (m) return `chapter-${m[1].toLowerCase()}`;
  if (/^PROLOGUE\b/i.test(t)) return "prologue";
  if (/^EPILOGUE\b/i.test(t)) return "epilogue";
  if (/^SUB-BOOK\b/i.test(t)) return t.toLowerCase().replace(/\s+/g, "-");
  if (/^VOLUME\b/i.test(t)) return t.toLowerCase().replace(/\s+/g, "-");
  return null;
}

const POV_NAMES = [
  "Blake",
  "Nadia",
  "Andrew",
  "William",
  "James",
  "Eva",
  "Aldric",
  "Marcus",
  "Holt",
  "Asante",
  "Yuki",
  "Teresa",
  "Moreau",
];

function guessPov(text) {
  const scores = Object.fromEntries(POV_NAMES.map((n) => [n, 0]));
  for (const n of POV_NAMES) {
    const re = new RegExp(`\\b${n}\\b`, "g");
    const hits = text.match(re);
    if (hits) scores[n] += hits.length;
  }
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return ranked[0][1] > 0 ? ranked[0][0] : "";
}

function extractTime(slug) {
  const m = slug.match(
    /(\d{1,2}\s*(?:AM|PM)|Morning|Afternoon|Evening|Night|Dawn|Midnight|Noon|October|November|December|January|February|March|April|May|June|July|August|September[^.]{0,20})/i
  );
  return m ? m[0].trim() : "";
}

function extractLocation(slug) {
  const parts = slug
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const locPart = parts.find((p) => LOC_RE.test(p) && !TIME_RE.test(p));
  if (locPart) return locPart;
  const m = slug.match(LOC_RE);
  return m ? m[0] : "";
}

/** Augment slug detection from audiobook scripts (cleaner paragraph breaks). */
function loadAudioSlugs() {
  const slugs = { 1: [], 2: [], 3: [] };
  const files = fs.readdirSync(AUDIO).filter((f) => /^V0[123]_/.test(f)).sort();
  for (const f of files) {
    const book = Number(f.slice(1, 3));
    const lines = fs.readFileSync(path.join(AUDIO, f), "utf8").split(/\r?\n/);
    for (const line of lines) {
      const t = line.trim();
      if (!t) continue;
      if (looksLikeSlugLine(t) || (t.length < 140 && TIME_RE.test(t) && LOC_RE.test(t))) {
        slugs[book].push(t);
      }
      // Also: short lines that are pure location.time patterns common in scripts
      if (
        t.length < 120 &&
        /^[A-Z0-9]/.test(t) &&
        (t.match(/\./g) || []).length >= 1 &&
        (TIME_RE.test(t) || LOC_RE.test(t)) &&
        !t.includes('"') &&
        t.split(" ").length <= 18
      ) {
        if (!slugs[book].includes(t)) slugs[book].push(t);
      }
    }
  }
  return slugs;
}

const audioSlugs = loadAudioSlugs();

function normalizeForMatch(s) {
  return s
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const audioSlugNorm = {
  1: audioSlugs[1].map(normalizeForMatch),
  2: audioSlugs[2].map(normalizeForMatch),
  3: audioSlugs[3].map(normalizeForMatch),
};

function matchesAudioSlug(text, book) {
  const n = normalizeForMatch(text);
  if (n.length < 8) return false;
  return audioSlugNorm[book].some((a) => a === n || (n.length < 100 && a.startsWith(n)) || (a.length < 100 && n.startsWith(a)));
}

const paragraphs = [];
const scenes = [];
const lineMap = [];
const gate = { books: {}, audio_slug_candidates: Object.fromEntries([1, 2, 3].map((b) => [b, audioSlugs[b].length])) };

for (const book of [1, 2, 3]) {
  const start = volIdx[book];
  const end = volEnd[book];
  const bookLines = [];
  let bookLine = 0;
  let chapter = `volume-${book}`;
  let sceneId = 0;
  let sceneSlug = `${chapter}-open`;
  let chapterStartLine = 1;

  // First pass: emit book file + classify each line
  const classified = [];
  for (let i = start; i < end; i++) {
    bookLine++;
    const line = allLines[i];
    bookLines.push(line);
    const art = artifactType(line, allLines[i - 1], allLines[i + 1]);
    const ch = !art ? detectChapter(line) : null;
    if (ch) chapter = ch;
    const trimmed = line.replace(/^\s+/, "").trim();
    const isSlug =
      !art &&
      trimmed &&
      (looksLikeSlugLine(line) || matchesAudioSlug(trimmed, book));
    classified.push({
      book_line: bookLine,
      omnibus_line: i + 1,
      text: line,
      artifact: art || "",
      chapter,
      is_slug: Boolean(isSlug),
      is_blank: !trimmed,
      content: trimmed,
    });
    lineMap.push({
      book,
      book_line: bookLine,
      omnibus_line: i + 1,
      artifact: art || "",
      is_slug: Boolean(isSlug),
      text: line,
    });
  }

  fs.writeFileSync(path.join(CORPUS, BOOK_META[book].filename), bookLines.join("\n"), "utf8");

  // Second pass: build paragraphs from content lines
  let paraBuf = [];
  let paraStart = null;
  let paraEnd = null;
  let curChapter = classified[0]?.chapter || `volume-${book}`;
  let slugCount = 0;

  function flush(isSlugForce = false) {
    if (!paraBuf.length) return;
    const text = paraBuf.join(" ").replace(/\s+/g, " ").trim();
    if (!text) {
      paraBuf = [];
      paraStart = null;
      return;
    }
    const isSlug = isSlugForce || (paraBuf.length <= 2 && looksLikeSlugLine(text));
    paragraphs.push({
      book,
      orig_line_start: paraStart,
      orig_line_end: paraEnd,
      chapter_slug: curChapter,
      scene_slug: sceneSlug,
      is_slug: isSlug,
      text,
    });
    if (isSlug) {
      slugCount++;
      sceneId++;
      sceneSlug = `s${String(sceneId).padStart(3, "0")}-${text
        .slice(0, 52)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}`;
      scenes.push({
        book,
        scene_id: sceneSlug,
        chapter_slug: curChapter,
        line_start: paraStart,
        line_end: "",
        slug_text: text,
        is_slug: true,
        pov: "",
        time_marker: extractTime(text),
        asserted_location: extractLocation(text),
      });
    }
    paraBuf = [];
    paraStart = null;
    paraEnd = null;
  }

  for (const row of classified) {
    curChapter = row.chapter;
    if (row.artifact) {
      flush();
      continue;
    }
    if (row.is_blank) {
      flush();
      continue;
    }
    if (row.is_slug) {
      flush();
      paraStart = row.book_line;
      paraEnd = row.book_line;
      paraBuf = [row.content];
      flush(true);
      continue;
    }
    // chapter headers as their own non-slug paras
    if (detectChapter(row.content)) {
      flush();
      paraStart = row.book_line;
      paraEnd = row.book_line;
      paraBuf = [row.content];
      flush(false);
      continue;
    }
    if (paraStart == null) paraStart = row.book_line;
    paraEnd = row.book_line;
    paraBuf.push(row.content);
  }
  flush();

  // Close scene ends + POV
  const bookScenes = scenes.filter((s) => s.book === book);
  for (let i = 0; i < bookScenes.length; i++) {
    const sc = bookScenes[i];
    sc.line_end = i + 1 < bookScenes.length ? bookScenes[i + 1].line_start - 1 : bookLine;
    const nearby = paragraphs
      .filter(
        (p) =>
          p.book === book &&
          p.orig_line_start >= sc.line_start &&
          p.orig_line_start <= sc.line_start + 100
      )
      .map((p) => p.text)
      .join(" ");
    sc.pov = guessPov(nearby);
  }

  // Also create scenes from chapters that have no slug scenes (chapter = scene)
  const chaptersWithScenes = new Set(bookScenes.map((s) => s.chapter_slug));
  const chapterLines = {};
  for (const row of classified) {
    if (!chapterLines[row.chapter]) chapterLines[row.chapter] = { start: row.book_line, end: row.book_line };
    chapterLines[row.chapter].end = row.book_line;
  }
  for (const [ch, span] of Object.entries(chapterLines)) {
    if (chaptersWithScenes.has(ch)) continue;
    if (/^volume-/.test(ch)) continue;
    const nearby = paragraphs
      .filter((p) => p.book === book && p.chapter_slug === ch)
      .map((p) => p.text)
      .join(" ")
      .slice(0, 2000);
    scenes.push({
      book,
      scene_id: `ch-${ch}`,
      chapter_slug: ch,
      line_start: span.start,
      line_end: span.end,
      slug_text: ch,
      is_slug: false,
      pov: guessPov(nearby),
      time_marker: "",
      asserted_location: "",
    });
  }

  const words = bookLines.join(" ").split(/\s+/).filter(Boolean).length;
  gate.books[book] = {
    file: BOOK_META[book].filename,
    lines: bookLine,
    words,
    paragraphs: paragraphs.filter((p) => p.book === book).length,
    scenes: scenes.filter((s) => s.book === book).length,
    slug_lines: paragraphs.filter((p) => p.book === book && p.is_slug).length,
  };
}

fs.writeFileSync(
  path.join(OUT, "corpus_clean.jsonl"),
  paragraphs.map((p) => JSON.stringify(p)).join("\n") + "\n"
);

const sceneHeader =
  "book,scene_id,chapter_slug,line_start,line_end,slug_text,pov,time_marker,asserted_location,is_slug\n";
const sceneRows = scenes.map((s) =>
  [
    s.book,
    s.scene_id,
    s.chapter_slug,
    s.line_start,
    s.line_end,
    JSON.stringify(s.slug_text),
    s.pov,
    JSON.stringify(s.time_marker),
    JSON.stringify(s.asserted_location),
    s.is_slug,
  ].join(",")
);
fs.writeFileSync(path.join(OUT, "scene_manifest.csv"), sceneHeader + sceneRows.join("\n") + "\n");
fs.writeFileSync(
  path.join(OUT, "line_mapping.jsonl"),
  lineMap.map((r) => JSON.stringify(r)).join("\n") + "\n"
);

gate.total_paragraphs = paragraphs.length;
gate.total_scenes = scenes.length;
gate.total_slug_lines = paragraphs.filter((p) => p.is_slug).length;
gate.total_words = Object.values(gate.books).reduce((a, b) => a + b.words, 0);
fs.writeFileSync(path.join(OUT, "gate1_report.json"), JSON.stringify(gate, null, 2));

// Seed crosswalk
const SEEDS = [
  ["B2:825", 2, "Hotel Phillips Building office in November"],
  ["B2:1972", 2, "Foundation's Washington Street address but the apartment"],
  ["B2:2141", 2, "first cohort standing outside the Quality Hill entrance"],
  ["B2:2347", 2, "Foundation's mailbox. Quality Hill"],
  ["B2:4079", 2, "stone cottage and the Hotel Phillips"],
  ["B2:4097", 2, "11 PM. Quality Hill. The Foundation empty"],
  ["B2:4615", 2, "renovated building on Washington Street"],
  ["B2:4948", 2, "Washington Street lot"],
  ["B3:4023", 3, "West Bottoms, where, 160 feet below"],
  ["B3:4030", 3, "SubTropolis. He went back to the chamber at 8 PM"],
  ["B3:3078", 3, "160 feet below, in the SubTropolis limestone"],
  ["B3:3049", 3, "basalt chamber resonance is stable at 111.2"],
  ["B1:2864", 1, "commercial mining level, SubTropolis proper"],
  ["B1:2216", 1, "Bethany Falls Limestone Company"],
  ["B1:2211", 1, "well in Wyandotte"],
  ["B1:1934", 1, "2847 Genessee"],
  ["B1:498", 1, "studio in Westport"],
  ["B1:1752", 1, "Picture Cave"],
  ["B1:1355", 1, "Meramec Caverns"],
  ["B2:5428", 2, "Troost"],
  ["B3:4004", 3, "Troost"],
  ["B3:5174", 3, "Troost"],
  ["B2:2236", 2, "City Market"],
  ["B2:4657", 2, "Overland Park"],
  ["B1:1929", 1, "grain elevators"],
];

const xref = [];
for (const [seed, book, needle] of SEEDS) {
  const rows = lineMap.filter((r) => r.book === book);
  let hit = null;
  for (const r of rows) {
    if (r.text.includes(needle.slice(0, 40)) || r.text.toLowerCase().includes(needle.toLowerCase().slice(0, 35))) {
      hit = r;
      break;
    }
  }
  if (!hit) {
    for (let i = 0; i < rows.length - 1; i++) {
      const combo = rows[i].text + " " + rows[i + 1].text;
      if (combo.toLowerCase().includes(needle.toLowerCase().slice(0, 35))) {
        hit = rows[i];
        break;
      }
    }
  }
  xref.push({
    seed_cite: seed,
    book,
    corpus_line: hit ? hit.book_line : null,
    omnibus_line: hit ? hit.omnibus_line : null,
    matched_text: hit ? hit.text.trim().slice(0, 120) : null,
    found: Boolean(hit),
  });
}
fs.writeFileSync(path.join(OUT, "seed_xref.json"), JSON.stringify(xref, null, 2));
gate.seed_xref_found = xref.filter((x) => x.found).length;
gate.seed_xref_total = xref.length;

console.log("=== GATE 1 ===");
console.log(JSON.stringify(gate, null, 2));
console.log("\nSeed xref sample:");
for (const x of xref.slice(0, 12)) {
  console.log(`  ${x.seed_cite} → B${x.book}:${x.corpus_line} found=${x.found}`);
}

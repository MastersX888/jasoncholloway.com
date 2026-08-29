#!/usr/bin/env node
/**
 * PHASE 2 — CONCORDANCE (code only)
 * 100% recall extraction → entities.csv + entity_frequency.csv
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve from this file's location so the pipeline runs outside the original
// /workspace cloud environment; CARTOGRAPHER_ROOT still overrides if needed.
const ROOT =
  process.env.CARTOGRAPHER_ROOT ||
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CORPUS = path.join(ROOT, "corpus");
const OUT = path.join(ROOT, "artifacts");

const BOOKS = {
  1: "MASTERS_X_BOOK1_DEMY_9798256008048.txt",
  2: "MASTERS_X_BOOK2_DEMY_9798256009953.txt",
  3: "MASTERS_X_BOOK3_DEMY_9798256010072.txt",
};

const GAZETTEER = [
  "Quality Hill",
  "West Bottoms",
  "River Market",
  "City Market",
  "Crossroads",
  "Power & Light",
  "Power and Light",
  "Library District",
  "Garment District",
  "Columbus Park",
  "Union Station",
  "Crown Center",
  "Bartle Hall",
  "T-Mobile Center",
  "Kauffman Center",
  "Liberty Memorial",
  "National WWI Museum",
  "Hotel Phillips",
  "Kansas City Southern",
  "Cathedral of the Immaculate Conception",
  "Broadway",
  "Troost",
  "Gillham",
  "The Paseo",
  "Paseo",
  "Southwest Trafficway",
  "Ward Parkway",
  "Independence Ave",
  "Independence Avenue",
  "Truman Road",
  "8th Street Tunnel",
  "12th Street Viaduct",
  "I-35",
  "I-70",
  "I-670",
  "I-435",
  "Hwy 210",
  "Highway 210",
  "Westport",
  "Country Club Plaza",
  "Brookside",
  "Waldo",
  "Hyde Park",
  "Volker",
  "Nelson-Atkins",
  "Kemper",
  "UMKC",
  "Loose Park",
  "Swope Park",
  "Northland",
  "Clay County",
  "Platte County",
  "SubTropolis",
  "Hunt Midwest",
  "Charles B. Wheeler",
  "Downtown Airport",
  "KCI",
  "MCI",
  "18th & Vine",
  "Jazz District",
  "Sprint Center",
  "Wyandotte",
  "Kansas City, Kansas",
  "Overland Park",
  "Prairie Village",
  "Independence",
  "Lee's Summit",
  "Liberty",
  "Missouri River",
  "Kansas River",
  "Kaw River",
  "Bethany Falls",
  "Meramec Caverns",
  "Stanton",
  "Picture Cave",
  "Washington County",
  "Osage",
  "Whiteman",
  "Oscar-01",
  "Iceland",
  "Mýrdalsjökull",
  "Myrdalsjokull",
  "Reykjavík",
  "Reykjavik",
  "Prague",
  "Charles University",
  "Strahov",
  "Bohemia",
  "Murano",
  "Venice",
  "Washington D.C.",
  "Washington DC",
  "São Paulo",
  "Sao Paulo",
  "Northrop",
  "Mojave",
  "Genessee",
  "Genesee",
  "Washington Street",
  "Pennsylvania",
  "Jefferson",
  "Summit",
  "Main Street",
  "Grand Avenue",
  "Walnut",
  "Baltimore",
  "Central",
  "Foundation",
  "Cognigenics",
  "Moreau",
  "Specchi",
  "Aldric",
  "Ghana",
  "Volta",
  "Miller Nichols",
  "Nichols Library",
];

const STREET_RE =
  /\b([A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*)*\s+(?:Street|St\.?|Avenue|Ave\.?|Boulevard|Blvd\.?|Road|Rd\.?|Parkway|Terrace|Trafficway|Drive|Dr\.?|Viaduct|Tunnel))\b/g;
const ADDR_RE = /\b(\d{2,5}\s+[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*(?:\s+(?:Street|St\.?|Avenue|Ave\.?|Boulevard|Blvd\.?|Road|Rd\.?))?)\b/g;
const SPATIAL_RE =
  /\b(below|above|beneath|under|across|north of|south of|east of|west of|overlooking|down the street|blocks? from|miles? from|next to|beside|behind|in front of|around the corner from)\b/gi;
const DIST_RE = /\b(\d+(?:\.\d+)?\s*(?:minute|min|mile|block|foot|feet|ft|hour|Hz|hertz|degrees?)s?)\b/gi;
const MOTION_RE =
  /\b(drove|walked|took the|headed|turned onto|parked|arrived|left for|returned to|crossed|climbed|descended|flew|rode)\b/gi;
const MEASURE_RE =
  /\b(\d+(?:\.\d+)?\s*(?:feet|foot|ft|meters?|m|miles?|Hz|hertz|degrees?|°|percent|%)|\d{4})\b/gi;
const PROPER_RE =
  /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)\b/g;

const STOP_PROPER = new Set([
  "The Foundation",
  "He Was",
  "She Was",
  "It Was",
  "They Were",
  "In The",
  "On The",
  "At The",
  "Of The",
  "And The",
  "For The",
  "To The",
  "From The",
  "With The",
  "Chapter One",
  "Chapter Two",
  "Chapter Three",
  "Chapter Four",
  "Chapter Five",
  "Chapter Six",
  "Chapter Seven",
  "Chapter Eight",
  "Chapter Nine",
  "Chapter Ten",
  "Chapter Eleven",
  "Chapter Twelve",
  "Chapter Thirteen",
  "Chapter Fourteen",
  "Chapter Fifteen",
  "Chapter Sixteen",
  "Chapter Seventeen",
  "Chapter Eighteen",
  "Chapter Nineteen",
  "Chapter Twenty",
  "Masters X",
  "Jason Carroll",
  "Carroll Holloway",
]);

function csvEscape(s) {
  if (s == null) return "";
  const t = String(s);
  if (/[",\n\r]/.test(t)) return `"${t.replace(/"/g, '""')}"`;
  return t;
}

function contextWindow(lines, idx, n = 3) {
  const start = Math.max(0, idx - n);
  const end = Math.min(lines.length - 1, idx + n);
  return lines
    .slice(start, end + 1)
    .map((l, i) => `${start + i + 1}|${l}`)
    .join(" \\n ");
}

function motionOrLocNear(text, matchIndex, window = 40) {
  const lo = Math.max(0, matchIndex - window);
  const hi = Math.min(text.length, matchIndex + window);
  const slice = text.slice(lo, hi);
  return MOTION_RE.test(slice) || SPATIAL_RE.test(slice) || LOC_HINT_NEAR(slice);
}

function LOC_HINT_NEAR(slice) {
  return /\b(at|in|from|to|near|toward|towards|inside|outside)\b/i.test(slice);
}

const entities = []; // rows
let eid = 0;

function addEntity(row) {
  eid++;
  entities.push({ id: eid, ...row });
}

for (const [book, file] of Object.entries(BOOKS)) {
  const lines = fs.readFileSync(path.join(CORPUS, file), "utf8").split(/\r?\n/);
  const b = Number(book);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (/^===== PAGE/.test(trimmed)) continue;
    if (/^(MASTERS X|HOLLOWAY)$/.test(trimmed)) continue;
    if (/^\d{1,3}$/.test(trimmed)) continue;

    const ctx = () => contextWindow(lines, i, 3);

    // Gazetteer (case-insensitive)
    for (const g of GAZETTEER) {
      const re = new RegExp(`\\b${g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
      let m;
      while ((m = re.exec(line)) !== null) {
        addEntity({
          book: b,
          line: lineNo,
          category: "gazetteer",
          surface: m[0],
          normalized: g,
          matched_text: trimmed.slice(0, 240),
          context: ctx(),
        });
      }
    }

    // Street patterns
    STREET_RE.lastIndex = 0;
    let m;
    while ((m = STREET_RE.exec(line)) !== null) {
      addEntity({
        book: b,
        line: lineNo,
        category: "street",
        surface: m[1],
        normalized: m[1].replace(/\s+/g, " "),
        matched_text: trimmed.slice(0, 240),
        context: ctx(),
      });
    }

    // Numeric addresses
    ADDR_RE.lastIndex = 0;
    while ((m = ADDR_RE.exec(line)) !== null) {
      addEntity({
        book: b,
        line: lineNo,
        category: "address",
        surface: m[1],
        normalized: m[1].replace(/\s+/g, " "),
        matched_text: trimmed.slice(0, 240),
        context: ctx(),
      });
    }

    // Spatial predicates
    SPATIAL_RE.lastIndex = 0;
    while ((m = SPATIAL_RE.exec(line)) !== null) {
      addEntity({
        book: b,
        line: lineNo,
        category: "spatial_predicate",
        surface: m[1],
        normalized: m[1].toLowerCase(),
        matched_text: trimmed.slice(0, 240),
        context: ctx(),
      });
    }

    // Travel-time / distance near motion/location
    DIST_RE.lastIndex = 0;
    while ((m = DIST_RE.exec(line)) !== null) {
      if (motionOrLocNear(line, m.index, 40) || /feet|foot|Hz|hertz|mile|block|minute|hour/i.test(m[1])) {
        addEntity({
          book: b,
          line: lineNo,
          category: "distance_time",
          surface: m[1],
          normalized: m[1].toLowerCase().replace(/\s+/g, " "),
          matched_text: trimmed.slice(0, 240),
          context: ctx(),
        });
      }
    }

    // Directional motion
    MOTION_RE.lastIndex = 0;
    while ((m = MOTION_RE.exec(line)) !== null) {
      addEntity({
        book: b,
        line: lineNo,
        category: "motion",
        surface: m[1],
        normalized: m[1].toLowerCase(),
        matched_text: trimmed.slice(0, 240),
        context: ctx(),
      });
    }

    // Measured quantities (broader)
    MEASURE_RE.lastIndex = 0;
    while ((m = MEASURE_RE.exec(line)) !== null) {
      // Prefer physically meaningful
      if (/(feet|foot|ft|Hz|hertz|mile|meter|degree|°|percent)/i.test(m[1]) || /^(19|20)\d{2}$/.test(m[1])) {
        addEntity({
          book: b,
          line: lineNo,
          category: "measurement",
          surface: m[1],
          normalized: m[1].toLowerCase().replace(/\s+/g, " "),
          matched_text: trimmed.slice(0, 240),
          context: ctx(),
        });
      }
    }

    // Capitalized multi-word noun phrases
    PROPER_RE.lastIndex = 0;
    while ((m = PROPER_RE.exec(line)) !== null) {
      const surface = m[1];
      if (STOP_PROPER.has(surface)) continue;
      if (surface.split(" ").length > 6) continue;
      // skip if already covered as gazetteer exact
      addEntity({
        book: b,
        line: lineNo,
        category: "proper_noun_phrase",
        surface,
        normalized: surface,
        matched_text: trimmed.slice(0, 240),
        context: ctx(),
      });
    }
  }
}

// Write entities.csv
const header = [
  "id",
  "book",
  "line",
  "category",
  "surface",
  "normalized",
  "matched_text",
  "context",
];
const csv = [
  header.join(","),
  ...entities.map((e) =>
    header.map((h) => csvEscape(e[h])).join(",")
  ),
].join("\n");
fs.writeFileSync(path.join(OUT, "entities.csv"), csv + "\n");

// entity_frequency.csv — distinct capitalized / gazetteer / street / address entities
const freqMap = new Map();
for (const e of entities) {
  if (!["gazetteer", "street", "address", "proper_noun_phrase"].includes(e.category)) continue;
  const key = e.normalized;
  if (!freqMap.has(key)) {
    freqMap.set(key, { entity: key, count: 0, books: new Set(), categories: new Set(), lines: [] });
  }
  const row = freqMap.get(key);
  row.count++;
  row.books.add(e.book);
  row.categories.add(e.category);
  if (row.lines.length < 20) row.lines.push(`B${e.book}:${e.line}`);
}

const freqRows = [...freqMap.values()].sort((a, b) => b.count - a.count);
const freqCsv = [
  "entity,occurrence_count,books,categories,sample_lines",
  ...freqRows.map((r) =>
    [
      csvEscape(r.entity),
      r.count,
      [...r.books].sort().join(";"),
      [...r.categories].join(";"),
      csvEscape(r.lines.join("|")),
    ].join(",")
  ),
].join("\n");
fs.writeFileSync(path.join(OUT, "entity_frequency.csv"), freqCsv + "\n");

const capitalizedDistinct = freqRows.filter(
  (r) => r.categories.has("proper_noun_phrase") || r.categories.has("gazetteer") || r.categories.has("street")
).length;

const gate2 = {
  total_entity_occurrences: entities.length,
  distinct_entities: freqRows.length,
  distinct_capitalized_or_place: capitalizedDistinct,
  by_category: {},
};
for (const e of entities) {
  gate2.by_category[e.category] = (gate2.by_category[e.category] || 0) + 1;
}

fs.writeFileSync(path.join(OUT, "gate2_report.json"), JSON.stringify(gate2, null, 2));
console.log("=== GATE 2 ===");
console.log(JSON.stringify(gate2, null, 2));
if (capitalizedDistinct < 200) {
  console.error("FAIL: fewer than 200 distinct capitalized entities");
  process.exit(1);
}

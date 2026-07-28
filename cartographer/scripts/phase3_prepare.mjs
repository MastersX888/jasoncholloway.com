#!/usr/bin/env node
/**
 * PHASE 3 — Semantic pre-classification (deterministic) + chunk packs for workers
 */
import fs from "fs";
import path from "path";

const OUT = "/workspace/cartographer/artifacts";

// Minimal CSV parse without dependency
function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
  const headers = splitCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cols = splitCsvLine(line);
    const obj = {};
    headers.forEach((h, i) => (obj[h] = cols[i] ?? ""));
    return obj;
  });
}
function splitCsvLine(line) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (c === '"') inQ = false;
      else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") {
      out.push(cur);
      cur = "";
    } else cur += c;
  }
  out.push(cur);
  return out;
}

const REAL = new Set([
  "Quality Hill","West Bottoms","River Market","City Market","Crossroads","Power & Light","Power and Light",
  "Library District","Garment District","Columbus Park","Union Station","Crown Center","Bartle Hall",
  "T-Mobile Center","Kauffman Center","Liberty Memorial","National WWI Museum","Hotel Phillips",
  "Kansas City Southern","Cathedral of the Immaculate Conception","Broadway","Troost","Gillham","The Paseo","Paseo",
  "Southwest Trafficway","Ward Parkway","Independence Ave","Independence Avenue","Truman Road",
  "8th Street Tunnel","12th Street Viaduct","I-35","I-70","I-670","I-435","Hwy 210","Highway 210",
  "Westport","Country Club Plaza","Brookside","Waldo","Hyde Park","Volker","Nelson-Atkins","Kemper","UMKC",
  "Loose Park","Swope Park","Northland","Clay County","Platte County","SubTropolis","Hunt Midwest",
  "Charles B. Wheeler","Downtown Airport","KCI","MCI","18th & Vine","Jazz District","Sprint Center",
  "Wyandotte","Kansas City, Kansas","Overland Park","Prairie Village","Independence","Lee's Summit","Liberty",
  "Missouri River","Kansas River","Kaw River","Bethany Falls","Meramec Caverns","Stanton","Picture Cave",
  "Washington County","Osage","Whiteman","Oscar-01","Iceland","Mýrdalsjökull","Myrdalsjokull","Reykjavík",
  "Reykjavik","Prague","Charles University","Strahov","Bohemia","Murano","Venice","Washington D.C.",
  "Washington DC","São Paulo","Sao Paulo","Northrop","Mojave","Washington Street","Genessee","Genesee",
  "Pennsylvania","Jefferson","Summit","Miller Nichols","Nichols Library","Kansas City","Missouri",
  "Chartres","Reims","Ghana","Volta","Ashanti","Lviv","University of Ghana","NIH","Hilton",
  "Curio Collection","Bethany Falls Limestone",
]);

const FICTIONAL = new Set([
  "Cognigenics","Specchi","Aldric","Brother Aldric","Ars Notoria","Gospel of Mary",
  "Masters Foundation","William Masters Foundation","Keepers","Sisters of the Holy Mother",
  "Analysis Chamber","Distribution File","Completion Sect","Blackwood",
]);

const HYBRID_SEEDS = new Set([
  "Foundation","The Foundation","Masters Foundation","Moreau","Moreau chamber",
  "Hotel Phillips","Washington Street","Quality Hill","SubTropolis","West Bottoms",
  "2847 Genessee Street","Genessee Street","Bethany Falls Limestone Company",
]);

const freq = parseCsv(fs.readFileSync(path.join(OUT, "entity_frequency.csv"), "utf8"));
const entities = parseCsv(fs.readFileSync(path.join(OUT, "entities.csv"), "utf8"));

function classify(name) {
  if (HYBRID_SEEDS.has(name)) return "HYBRID";
  if (FICTIONAL.has(name)) return "FICTIONAL";
  if (REAL.has(name)) return "REAL_WORLD";
  // heuristics
  if (/Foundation|Chamber|Protocol|Cohort|Keeper|Grimoire|Notae/i.test(name)) return "HYBRID";
  if (/Street|Avenue|Ave|Boulevard|Blvd|Road|Parkway|River|County|Hill|Park|Plaza|Market|Station|Airport|Cavern|Cave|University|Cathedral|Hotel|Library|District/i.test(name))
    return "REAL_WORLD";
  if (/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+$/.test(name) && name.split(" ").length <= 3) return "AMBIGUOUS";
  return "AMBIGUOUS";
}

const classified = freq.map((r) => {
  const cls = classify(r.entity);
  return {
    entity: r.entity,
    class: cls,
    occurrence_count: Number(r.occurrence_count),
    books: r.books,
    categories: r.categories,
    sample_lines: r.sample_lines,
  };
});

fs.writeFileSync(path.join(OUT, "entity_classified_seed.json"), JSON.stringify(classified, null, 2));

// Build occurrence packs for key entities (for worker spatial-claim extraction)
const KEY = [
  "Quality Hill","Hotel Phillips","Washington Street","Foundation","SubTropolis","West Bottoms",
  "Moreau","Bethany Falls","Wyandotte","Genessee","Westport","Troost","City Market","Overland Park",
  "Picture Cave","Meramec Caverns","Strahov","Prague","Iceland","Reykjavik","Reykjavík","Mýrdalsjökull",
  "Broadway","Missouri River","Cognigenics","Specchi","Aldric","Charles University","Murano","Venice",
  "Ghana","Volta","2847 Genessee Street","Bethany Falls Limestone Company","Analysis Chamber",
];

const packs = {};
for (const key of KEY) {
  const hits = entities.filter(
    (e) =>
      e.normalized === key ||
      e.surface === key ||
      e.normalized.toLowerCase() === key.toLowerCase() ||
      e.matched_text.toLowerCase().includes(key.toLowerCase())
  );
  // Prefer gazetteer/street/address/proper
  const filtered = hits.filter((e) =>
    ["gazetteer", "street", "address", "proper_noun_phrase", "spatial_predicate", "distance_time", "measurement"].includes(e.category)
  );
  packs[key] = filtered.slice(0, 80).map((e) => ({
    book: Number(e.book),
    line: Number(e.line),
    category: e.category,
    surface: e.surface,
    text: e.matched_text,
    context: e.context,
  }));
}

fs.writeFileSync(path.join(OUT, "phase3_packs.json"), JSON.stringify(packs, null, 2));

const byClass = {};
for (const c of classified) byClass[c.class] = (byClass[c.class] || 0) + 1;

// Chunk AMBIGUOUS for workers
const amb = classified.filter((c) => c.class === "AMBIGUOUS" && c.occurrence_count >= 2);
const chunkSize = Math.ceil(amb.length / 6) || 1;
const chunks = [];
for (let i = 0; i < amb.length; i += chunkSize) {
  chunks.push(amb.slice(i, i + chunkSize));
}
chunks.forEach((ch, i) => {
  fs.writeFileSync(path.join(OUT, `phase3_chunk_${i}.json`), JSON.stringify(ch, null, 2));
});

console.log(JSON.stringify({ byClass, ambig_chunks: chunks.length, ambig_count: amb.length, key_packs: Object.keys(packs).length }, null, 2));

#!/usr/bin/env node
/**
 * Phase 8: build artifacts/fix_geo_prose.json from the LOCKED author rulings
 * in AUTHOR_DECISION_BRIEF.md.
 *
 * Each edit is a block of whole corpus lines (`old`) and its literary
 * replacement (`new`). The build verifies that every `old` occurs exactly once
 * in its book, that the edits do not collide, that quote characters survive the
 * rewrite, and that the rewrap leaves no orphan line mid-paragraph.
 *
 * Usage:
 *   node scripts/phase8_fix_geo_prose.mjs            # build + verify
 *   node scripts/phase8_fix_geo_prose.mjs --check    # verify only, write nothing
 */
import fs from "fs";
import path from "path";

const ROOT = "/workspace/cartographer";
const CORPUS = path.join(ROOT, "corpus");
const OUT = path.join(ROOT, "artifacts");

const BOOKS = {
  1: "MASTERS_X_BOOK1_DEMY_9798256008048.txt",
  2: "MASTERS_X_BOOK2_DEMY_9798256009953.txt",
  3: "MASTERS_X_BOOK3_DEMY_9798256010072.txt",
};

/**
 * ruling ids reference AUTHOR_DECISION_BRIEF.md section + locked option letter.
 * line_start/line_end are 1-indexed, inclusive, into the corpus book file.
 */
const EDITS = [
  {
    id: "b1-picture-cave-warren-osage",
    book: 1,
    line_start: 1356,
    line_end: 1358,
    ruling: "7B",
    note: "Washington County -> Warren County; one-clause Osage ancestral acknowledgment.",
    new: [
      ' "Picture Cave," she said. "Warren County, Missouri. Osage ancestral',
      "ground, sacred to them still. Dated to at least a thousand years ago.",
      'Pre-Columbian. Pre-European. Pre-Christian."',
    ].join("\n"),
  },
  {
    id: "b1-genessee-address-and-storage-sign",
    book: 1,
    line_start: 1504,
    line_end: 1506,
    ruling: "6A",
    note: "2847 -> 1647 Genessee (16xx-17xx band); fictional storage company replaces MISSOURI COLD STORAGE CO., which reads as the real KC Cold Storage Co. at 500 E 3rd.",
    new: [
      " 1647 Genessee Street looked abandoned. Graffiti on the loading",
      "dock. Windows covered with plywood. A faded sign: RIVERWARDS",
      "COLD STORAGE CO. 1923.",
    ].join("\n"),
  },
  {
    id: "b1-bethany-falls-precote-hunt-midwest",
    book: 1,
    line_start: 1725,
    line_end: 1727,
    ruling: "5B",
    note: "Bethany Falls is the limestone formation, not a company. Reframed on Midwest Precote / Hunt Midwest public history; no misconduct attributed. Plot point (voids predate the mining) preserved.",
    new: [
      " \"SubTropolis wasn't built. It was mined. Midwest Precote started",
      "room-and-pillar work in the Bethany Falls limestone in the 1940s, and",
      "Hunt Midwest turned the emptied rooms into an underground business",
      "district twenty years later. But the mining broke into voids nobody",
      "cut. The caves Moreau used were there decades before. Centuries",
      'before."',
    ].join("\n"),
  },
  {
    id: "b1-analysis-chamber-address",
    book: 1,
    line_start: 2073,
    line_end: 2073,
    ruling: "6A",
    note: "Second 2847 Genessee instance renumbered to match.",
    new: "The Analysis Chamber lived in the basement of 1647 Genessee Street.",
  },
  {
    id: "b1-subtropolis-commercial-depth",
    book: 1,
    line_start: 2243,
    line_end: 2251,
    ruling: "3A",
    note: "Commercial level 55 ft -> a hundred and fifty feet. Shaft reworded to 'bottomed out at' so the 160 ft reads as total depth below surface rather than 150 + 160.",
    new: [
      "condensation. The commercial mining level, SubTropolis proper, a",
      "hundred and fifty feet below the surface, ended here. Everything below",
      "this point was older, deeper, and no longer part of anyone's inventory.",
      "The shaft bottomed out at a hundred and sixty feet, in limestone that",
      "had been forming since before anything human existed. The first ten",
      "feet were lit by Andrew's flashlight. Rust-streaked concrete, bolts",
      "driven into bedrock. Then the light ended. Below that threshold,",
      "darkness. Not the absence of light but the presence of stone, the",
      "geological weight of 270 million years pressing inward from every",
      "direction.",
    ].join("\n"),
  },
  {
    id: "b2-quality-hill-window-pennsylvania",
    book: 2,
    line_start: 4123,
    line_end: 4126,
    ruling: "8A",
    note: "Troost Avenue is ~2 mi east and not visible from the Quality Hill apartment window; Pennsylvania is the district's residential spine.",
    new: [
      "window, Kansas City's February light fell on the buildings of",
      "Pennsylvania Avenue with the indifferent clarity that her city produced",
      "in winter, sharp, honest light that showed surfaces as they were without",
      "the kindness of cloud-filtered diffusion.",
    ].join("\n"),
  },
  {
    id: "b3-yuki-cohort-basalt-iceland",
    book: 3,
    line_start: 878,
    line_end: 881,
    ruling: "4A",
    note: "Basalt tagged to Iceland, consistent with her own recollection of 'the basalt caves' at B3:1047. Limestone stays with SubTropolis.",
    new: [
      "monitored, clinically supervised exposure to the 333.6 Hz harmonic in",
      "the Iceland basalt chamber. She was Cohort 4, the musician, the oboist",
      "whose ears had been trained to perceive pitch differences of less than",
      "one hertz. Andrew had flagged her as a candidate because her auditory",
    ].join("\n"),
  },
  {
    id: "b3-basalt-resonance-iceland-tag",
    book: 3,
    line_start: 2369,
    line_end: 2369,
    ruling: "4A",
    note: "KC hallway briefing: the basalt chamber is the Iceland field station feeding the Reykjavik uplink named in the next sentence. The KC demonstration chamber stays limestone.",
    new: "specification. The Iceland basalt chamber is stable at 111.2. Andrew,",
  },
  {
    id: "b3-mirrors-not-below-them",
    book: 3,
    line_start: 2391,
    line_end: 2399,
    ruling: "2A",
    note: "Andrew and Nadia are in the downtown Foundation hallway; the SubTropolis chamber cannot be below them.",
    new: [
      "hum. Across town, 160 feet below the Northland bluff, in the",
      "SubTropolis limestone, in the converted Moreau church basement that",
      "had become the Foundation\u2019s primary research chamber, the mirrors",
      "waited. Six parabolic surfaces, each ground to the Specchi",
      "specification by the Venetian workshop that Eva \u010cern\u00e1 had contracted,",
      "each surface carrying a reflective coating whose formula had been",
      "published and downloaded 14,000 times and that could now be fabricated",
      "in S\u00e3o Paulo for $340 per square meter but that the Foundation had",
      "sourced from Venice because some things deserved their original",
      "provenance.",
    ].join("\n"),
  },
  {
    id: "b3-foundation-not-on-troost",
    book: 3,
    line_start: 3109,
    line_end: 3114,
    ruling: "8A",
    note: "Foundation HQ is Washington Street / Quality Hill, not the Troost corridor. 'industrial' dropped since Quality Hill is not an industrial district.",
    new: [
      " Nadia had been at the Foundation since midnight, the streets of",
      "Quality Hill empty, the district's daytime commerce replaced by the",
      "nocturnal hush of a neighborhood that worked hard and slept deeply.",
      "The Foundation building's windows glowed against the dark brick",
      "facades of the surrounding buildings, a single lit structure in a block of",
      "sleeping commerce.",
    ].join("\n"),
  },
  {
    id: "b3-chamber-not-under-west-bottoms",
    book: 3,
    line_start: 3124,
    line_end: 3129,
    ruling: "2A",
    note: "West Bottoms kept as atmosphere below the Quality Hill bluff; the chamber moves to SubTropolis, 160 ft down, seven miles northeast across the river.",
    new: [
      "presence. The car's engine ticked as it cooled. The June night air carried",
      "the humidity and the distant ozone-sweetness of the Missouri River and",
      "the industrial memory of the West Bottoms below the bluff. Seven miles",
      "northeast, across the river at SubTropolis, 160 feet down, the Moreau",
      "chamber sat in its limestone silence, mirrors dormant, the",
      "seventy-two-hour resonance still decaying in the geological substrate.",
    ].join("\n"),
  },
  {
    id: "b3-troost-to-quality-hill-drive",
    book: 3,
    line_start: 4003,
    line_end: 4006,
    ruling: "8A",
    note: "Troost does not bound Quality Hill. She detours east to the community church, then cuts west on Twelfth and crosses Broadway to reach Washington Street. 5:40 AM October and the Foundation parking lot destination are unchanged.",
    new: [
      "were awake before the sun because the world required them. She drove",
      "the long way. East to Troost. Past the gas station. Past the church",
      "where they'd held the first community protocol session. Then west on",
      "Twelfth, across Broadway, up the bluff to Washington Street and the",
      "institutional district.",
    ].join("\n"),
  },
];

const MAX_COLS = 76;
const MIN_TAIL_COLS = 45;

function main() {
  const checkOnly = process.argv.includes("--check");
  const failures = [];

  const sources = {};
  const lines = {};
  for (const [n, name] of Object.entries(BOOKS)) {
    sources[n] = fs.readFileSync(path.join(CORPUS, name), "utf8");
    lines[n] = sources[n].split("\n");
  }

  const records = EDITS.map((e) => {
    const book = String(e.book);
    const old = lines[book].slice(e.line_start - 1, e.line_end).join("\n");

    const count = sources[book].split(old).length - 1;
    if (count !== 1) failures.push(`${e.id}: \`old\` occurs ${count}x in book ${book}`);
    if (old === e.new) failures.push(`${e.id}: no-op edit`);

    // Quote and paren characters must survive the rewrite untouched.
    for (const ch of ['"', "\u201c", "\u201d", "(", ")"]) {
      const a = old.split(ch).length - 1;
      const b = e.new.split(ch).length - 1;
      if (a !== b) failures.push(`${e.id}: '${ch}' count changed ${a} -> ${b}`);
    }

    for (const line of e.new.split("\n")) {
      if (line.length > MAX_COLS) {
        failures.push(`${e.id}: rewrapped line is ${line.length} cols (max ${MAX_COLS})`);
      }
    }

    // A short final line is only legitimate where the paragraph ends, i.e. the
    // following corpus line starts a new paragraph, is blank, or is a page marker.
    const tail = e.new.split("\n").at(-1);
    const follower = lines[book][e.line_end] ?? "";
    const endsParagraph =
      follower.startsWith(" ") || follower.trim() === "" || follower.startsWith("=====");
    if (tail.length < MIN_TAIL_COLS && !endsParagraph) {
      failures.push(`${e.id}: orphan tail line (${tail.length} cols) mid-paragraph`);
    }

    return {
      id: e.id,
      book: e.book,
      line_start: e.line_start,
      line_end: e.line_end,
      old,
      new: e.new,
      ruling: e.ruling,
      note: e.note,
    };
  });

  // Dry-run apply per book to prove the edits are mutually independent.
  for (const book of Object.keys(BOOKS)) {
    const bookEdits = records.filter((r) => String(r.book) === book);
    let applied = sources[book];
    for (const r of bookEdits) {
      if (applied.split(r.old).length - 1 !== 1) {
        failures.push(`${r.id}: not uniquely present after prior edits`);
        continue;
      }
      applied = applied.replace(r.old, r.new);
    }
    for (const r of bookEdits) {
      if (!applied.includes(r.new)) failures.push(`${r.id}: \`new\` absent after apply`);
    }
  }

  if (failures.length) {
    for (const f of failures) console.error("FAIL:", f);
    process.exit(1);
  }

  if (!checkOnly) {
    fs.mkdirSync(OUT, { recursive: true });
    const dest = path.join(OUT, "fix_geo_prose.json");
    fs.writeFileSync(dest, JSON.stringify(records, null, 2) + "\n");
    console.log(`OK: ${records.length} edits verified, wrote ${dest}`);
  } else {
    console.log(`OK: ${records.length} edits verified (check only)`);
  }

  for (const r of records) {
    const widths = r.new.split("\n").map((l) => l.length);
    console.log(
      `  ${r.ruling.padStart(3)}  ${r.id.padEnd(38)} B${r.book}:${r.line_start}-${r.line_end}  widths=[${widths}]`,
    );
  }
}

main();

#!/usr/bin/env node
/**
 * Phases 4–7: internal consistency findings + external matrix + defect register
 * Citations use corpus book_line (see seed_xref.json for Section 4 mapping).
 */
import fs from "fs";
import path from "path";

const ROOT = "/workspace/cartographer";
const OUT = path.join(ROOT, "artifacts");

function csvEscape(s) {
  if (s == null) return "";
  const t = String(s);
  if (/[",\n\r]/.test(t)) return `"${t.replace(/"/g, '""')}"`;
  return t;
}

const defects = [];

function add(d) {
  defects.push({
    id: `DX-${String(defects.length + 1).padStart(3, "0")}`,
    severity: d.severity,
    class: d.class,
    entity: d.entity,
    book: d.book,
    line_start: d.line_start,
    line_end: d.line_end ?? d.line_start,
    quoted_text: d.quoted_text,
    defect_description: d.defect_description,
    conflicts_with_ids: (d.conflicts_with_ids || []).join("|"),
    external_ground_truth: d.external_ground_truth || "",
    sources: (d.sources || []).join(" | "),
    confidence: d.confidence,
    canonical_ruling: d.canonical_ruling,
    proposed_fix: d.proposed_fix,
    fix_word_count: d.fix_word_count ?? "",
    ripple_ids: (d.ripple_ids || []).join("|"),
    local_reader_notices: d.local_reader_notices,
    author_decision_required: d.author_decision_required ? "YES" : "NO",
  });
}

// ========== DEFECTS ==========

add({
  severity: "CRITICAL",
  class: "INTERNAL_CONTRADICTION",
  entity: "Foundation / Hotel Phillips",
  book: 2,
  line_start: 619,
  line_end: 619,
  quoted_text: "The Hotel Phillips Building office in November.",
  defect_description:
    "Places Foundation institutional work at Hotel Phillips. Contradicts the fully-specified Washington Street third-floor offices (B2:3504) and Quality Hill Foundation scenes (B2:3108, B2:1773). Same-night pairing with Quality Hill Foundation empty at B2:3108 (~17 lines after B2:3091 Hotel Phillips mention in the phone-call coda).",
  conflicts_with_ids: ["DX-002", "DX-003"],
  external_ground_truth:
    "Hotel Phillips is at 106 W 12th St, Curio Collection by Hilton, east of Broadway in the downtown loop / Power & Light vicinity — outside Quality Hill (NRHP district bounded east by Broadway).",
  sources: [
    "https://www.hilton.com/en/hotels/mkccuqq-hotel-phillips-kansas-city/hotel-info/",
    "https://en.wikipedia.org/wiki/Quality_Hill,_Kansas_City",
    "HABS MO-518 / NRHP 78001657",
  ],
  confidence: "CONFIRMED",
  canonical_ruling:
    "Canon = Washington Street third floor (most fully specified + load-bearing). Hotel Phillips is not the Foundation HQ. Retain Hotel Phillips only if re-cast as a separate venue (meeting/coffee/speakeasy), else relocate those two mentions to Washington Street / Quality Hill offices.",
  proposed_fix:
    "Replace 'Hotel Phillips Building office' with 'Washington Street office' (or 'Foundation office') at B2:619 and B2:3091; OR insert early establishing line that Nadia sometimes works from a borrowed Hotel Phillips suite while HQ remains Washington Street (author must choose).",
  fix_word_count: 4,
  ripple_ids: ["DX-002"],
  local_reader_notices: "YES — locals know Hotel Phillips is not in Quality Hill.",
  author_decision_required: true,
});

add({
  severity: "CRITICAL",
  class: "INTERNAL_CONTRADICTION",
  entity: "Foundation / Hotel Phillips",
  book: 2,
  line_start: 3091,
  line_end: 3108,
  quoted_text:
    "the stone cottage and the Hotel Phillips Building office ... 11 PM. Quality Hill. The Foundation empty.",
  defect_description:
    "Within one scene/night, Nadia's institutional seat is named Hotel Phillips (B2:3091) then Quality Hill Foundation (B2:3108). Impossible as a single HQ.",
  conflicts_with_ids: ["DX-001", "DX-003"],
  external_ground_truth:
    "Hotel Phillips ≈0.3–0.4 mi east of Quality Hill / Washington Street; different neighborhood.",
  sources: [
    "https://www.hilton.com/en/hotels/mkccuqq-hotel-phillips-kansas-city/hotel-location/",
    "haversine matrix cartographer/kc_distance_matrix.csv",
  ],
  confidence: "CONFIRMED",
  canonical_ruling: "Same as DX-001: Washington Street / Quality Hill offices win; Hotel Phillips is the outlier (2 vs 7+).",
  proposed_fix: "See DX-001. Minimum: change B2:3091 'Hotel Phillips Building office' → 'Washington Street office'.",
  fix_word_count: 3,
  ripple_ids: ["DX-001"],
  local_reader_notices: "YES",
  author_decision_required: true,
});

add({
  severity: "MAJOR",
  class: "DEFENSIBLE_BUT_AMBIGUOUS",
  entity: "Quality Hill (apartment vs Foundation)",
  book: 2,
  line_start: 1494,
  line_end: 1773,
  quoted_text:
    "not the Foundation's Washington Street address but the apartment on Quality Hill ... Foundation's mailbox. Quality Hill ... Quality Hill entrance",
  defect_description:
    "Bare 'Quality Hill' names both Nadia's apartment and Foundation premises (entrance, mailbox, empty HQ at B2:3108; ~18 apartment uses in B3). Geographically both can sit in Quality Hill (Washington Street runs through the district), but the reader cannot tell which building a scene is in.",
  conflicts_with_ids: [],
  external_ground_truth:
    "Quality Hill NRHP district: roughly Broadway (E), Jefferson/I-35 (W), 10th/7th (N), 14th (S). Washington Street runs N–S through the district. Apartment + Foundation offices on Washington Street are mutually consistent; naming is not.",
  sources: [
    "https://en.wikipedia.org/wiki/Quality_Hill,_Kansas_City",
    "https://npgallery.nps.gov/AssetDetail/NRIS/78001657",
    "HABS MO-518",
  ],
  confidence: "CONFIRMED",
  canonical_ruling:
    "No factual relocation required. Disambiguate house style: 'the Washington Street offices' / 'the Foundation' vs 'the apartment' / 'the Quality Hill kitchen'. Optional early establishing passage fixing both addresses on the mental map.",
  proposed_fix:
    "Pass replacing bare 'Quality Hill' when meaning Foundation with 'Washington Street' or 'the Foundation offices'; keep 'Quality Hill' / 'the apartment' / 'the kitchen' for residence. Zero geography change.",
  fix_word_count: 40,
  ripple_ids: ["DX-001", "DX-002"],
  local_reader_notices:
    "YES — confusion reads as error even when geography is correct.",
  author_decision_required: true,
});

add({
  severity: "CRITICAL",
  class: "INTERNAL_CONTRADICTION",
  entity: "Moreau chamber / SubTropolis / West Bottoms",
  book: 3,
  line_start: 3126,
  line_end: 3132,
  quoted_text:
    "the industrial memory of the West Bottoms, where, 160 feet below ground, the Moreau chamber sat in its limestone silence ... \"SubTropolis. He went back to the chamber at 8 PM. Alone.\"",
  defect_description:
    "Same scene equates the Moreau chamber under the West Bottoms with SubTropolis nine lines later. These are ~8 miles apart and on opposite sides of the Missouri River relative to downtown.",
  conflicts_with_ids: ["DX-005"],
  external_ground_truth:
    "SubTropolis ≈39.161°N, 94.476°W, bluffs north of the Missouri River near I-435 / Hwy 210, ~7–9 mi NE of downtown. West Bottoms = floodplain at Kaw/Missouri confluence immediately below Quality Hill bluff. Straight-line ≈8 mi.",
  sources: [
    "https://en.wikipedia.org/wiki/SubTropolis",
    "https://huntmidwest.com/expertise/subtropolis/",
    "ULI case PDF (100–150 ft; 7 mi NE of downtown)",
  ],
  confidence: "CONFIRMED",
  canonical_ruling:
    "Canon chamber location = SubTropolis limestone (plot load-bearing across trilogy). West Bottoms sensory frame must not locate the chamber 'where' under the Bottoms. AUTHOR must choose: (A) cut West Bottoms clause; (B) make West Bottoms atmospheric only ('ozone of the river toward the Bottoms') while chamber remains SubTropolis; (C) invent a separate Bottoms chamber (high ripple, not recommended).",
  proposed_fix:
    "Preferred cheap fix: 'the industrial memory of the West Bottoms. Somewhere across the river, 160 feet below ground, the Moreau chamber…' then keep SubTropolis line. Or delete 'where, 160 feet below ground, the Moreau chamber sat…' and let SubTropolis carry location.",
  fix_word_count: 12,
  ripple_ids: ["DX-005", "DX-006"],
  local_reader_notices: "YES — Bottoms vs Northland is a local identity fact.",
  author_decision_required: true,
});

add({
  severity: "CRITICAL",
  class: "EXTERNAL_FACT_ERROR",
  entity: "SubTropolis under Foundation building",
  book: 3,
  line_start: 2391,
  line_end: 2393,
  quoted_text:
    "Somewhere below them, 160 feet below, in the SubTropolis limestone, in the converted Moreau church basement",
  defect_description:
    "Andrew and Nadia are in a Foundation building hallway (downtown / Washington Street context). Text asserts SubTropolis/Moreau chamber is 160 feet directly below them. SubTropolis cannot underlie downtown Quality Hill / Washington Street.",
  conflicts_with_ids: ["DX-004"],
  external_ground_truth:
    "SubTropolis is ~7.4 mi from Quality Hill / Washington Street (straight-line). Not contiguous underground with downtown.",
  sources: [
    "https://en.wikipedia.org/wiki/SubTropolis",
    "kc_distance_matrix.csv",
  ],
  confidence: "CONFIRMED",
  canonical_ruling:
    "Vertical 'below them' is externally impossible if they are downtown. Rewrite as distant chamber ('across town at SubTropolis, 160 feet below the Northland bluff') or move the conversation into SubTropolis itself.",
  proposed_fix:
    "Replace 'Somewhere below them, 160 feet below, in the SubTropolis limestone' with 'Across the river at SubTropolis, 160 feet below the bluff, in the limestone'.",
  fix_word_count: 18,
  ripple_ids: ["DX-004", "DX-006"],
  local_reader_notices: "YES",
  author_decision_required: false,
});

add({
  severity: "MAJOR",
  class: "INTERNAL_CONTRADICTION",
  entity: "SubTropolis depth",
  book: 1,
  line_start: 2243,
  line_end: 2245,
  quoted_text:
    "The commercial mining level, SubTropolis proper, fifty-five feet below the surface ... The shaft dropped a hundred and sixty feet",
  defect_description:
    "States commercial SubTropolis level at 55 ft, then shaft drops 160 ft further (~215 ft total to deep chamber). Conflicts with B3:2391 / B3:3126 '160 feet below ground' for the chamber, and with external commercial-depth citations (~100–160 ft).",
  conflicts_with_ids: ["DX-005", "DX-004"],
  external_ground_truth:
    "Wikipedia: up to 160 ft beneath surface in Bethany Falls limestone. ULI: limestone shelf begins 50–100 ft; leasable space ~100–150 ft. '55 ft' can describe top-of-shelf access but is too shallow for 'SubTropolis proper' commercial level as usually cited.",
  sources: [
    "https://en.wikipedia.org/wiki/SubTropolis",
    "ULI Subtropolis case study PDF",
  ],
  confidence: "CONFIRMED",
  canonical_ruling:
    "Adopt 160 ft as chamber depth (matches CANON.md and B3). Commercial level should read ~100–160 ft, not 55. Optional: 'the limestone shelf began fifty-five feet down; SubTropolis proper opened around a hundred and fifty'.",
  proposed_fix:
    "Change 'fifty-five feet' → 'a hundred and fifty feet' (or 'a hundred feet') for commercial level; keep shaft-to-deeper-chamber language only if a second fictional tier is intentional.",
  fix_word_count: 6,
  ripple_ids: ["DX-004", "DX-005"],
  local_reader_notices: "MAYBE — underground-industry locals / Hunt Midwest readers will notice.",
  author_decision_required: true,
});

add({
  severity: "MAJOR",
  class: "DEFENSIBLE_BUT_AMBIGUOUS",
  entity: "basalt chamber vs SubTropolis limestone",
  book: 3,
  line_start: 2369,
  line_end: 2391,
  quoted_text:
    "The basalt chamber resonance is stable at 111.2 ... Somewhere below them, 160 feet below, in the SubTropolis limestone",
  defect_description:
    "~22 lines apart: 'basalt chamber' and 'SubTropolis limestone'. May be Iceland basalt vs KC limestone (two chambers), but the hallway dialogue does not mark the distinction; readers may hear one chamber with contradictory lithology.",
  conflicts_with_ids: [],
  external_ground_truth:
    "KC SubTropolis = Bethany Falls limestone. Iceland volcanic terrain can host basalt. Two-chamber reading is geologically coherent if named clearly.",
  sources: [
    "https://en.wikipedia.org/wiki/SubTropolis",
    "CANON.md (Blake in Iceland B3)",
  ],
  confidence: "LIKELY",
  canonical_ruling:
    "Treat as two chambers. Add a four-word clarifier ('in Iceland, the basalt chamber…' / 'here, the limestone…').",
  proposed_fix:
    "Insert 'Iceland' or 'Reykjavík uplink' beside basalt; keep limestone for SubTropolis.",
  fix_word_count: 4,
  ripple_ids: [],
  local_reader_notices: "NO for KC locals; YES for careful geology readers.",
  author_decision_required: true,
});

add({
  severity: "MAJOR",
  class: "EXTERNAL_FACT_ERROR",
  entity: "Bethany Falls Limestone Company",
  book: 1,
  line_start: 1725,
  line_end: 1726,
  quoted_text:
    "The Bethany Falls Limestone Company found existing cave systems in the 1940s.",
  defect_description:
    "Bethany Falls is a geological formation name, not a historical mining company. SubTropolis mining began mid-1940s under Midwest Precote; commercial reuse via Hunt / Great Midwest from ~1960s/1970.",
  conflicts_with_ids: [],
  external_ground_truth:
    "Bethany Falls limestone = formation. Site mining from 1945 by Midwest Precote; Hunt Midwest / Great Midwest later developed SubTropolis.",
  sources: [
    "https://en.wikipedia.org/wiki/SubTropolis",
    "https://huntmidwest.com/expertise/subtropolis/",
  ],
  confidence: "CONFIRMED",
  canonical_ruling:
    "AUTHOR_MUST_RULE: deliberate fictional company (defensible) vs error. If error, rename to Midwest Precote / Hunt Midwest framing. If fiction, a single clarifying cue helps ('the outfit that called itself the Bethany Falls Limestone Company').",
  proposed_fix:
    "Option A (fiction keep): add 'so-called' or appositive. Option B (correct): 'Midwest Precote's crews found…' / 'Hunt Midwest later…'",
  fix_word_count: 8,
  ripple_ids: [],
  local_reader_notices: "YES for geology / underground-industry readers.",
  author_decision_required: true,
});

add({
  severity: "MAJOR",
  class: "EXTERNAL_FACT_ERROR",
  entity: "Wyandotte / SubTropolis distance",
  book: 1,
  line_start: 1722,
  line_end: 1723,
  quoted_text:
    "A reporter lowered into a well in Wyandotte discovered an underground river three miles from SubTropolis.",
  defect_description:
    "'Three miles from SubTropolis' understates the gap. Wyandotte County, KS centers ~8–9 mi from SubTropolis; even nearest KCK points are well over three miles.",
  conflicts_with_ids: [],
  external_ground_truth:
    "SubTropolis (Clay County, MO north of river) to Wyandotte County center ≈8.7 mi straight-line; to West Bottoms/KCK edge still ≫3 mi.",
  sources: ["kc_distance_matrix.csv", "https://en.wikipedia.org/wiki/SubTropolis"],
  confidence: "CONFIRMED",
  canonical_ruling:
    "Change 'three miles' → 'eight miles' or 'across the river several miles from'. Or relocate the well story to Clay County north of the river if the three-mile figure must stay.",
  proposed_fix: "three miles → eight miles (or 'nearly ten miles').",
  fix_word_count: 2,
  ripple_ids: [],
  local_reader_notices: "YES",
  author_decision_required: false,
});

add({
  severity: "MAJOR",
  class: "EXTERNAL_FACT_ERROR",
  entity: "2847 Genessee Street",
  book: 1,
  line_start: 1504,
  line_end: 1506,
  quoted_text:
    "2847 Genessee Street looked abandoned. ... MISSOURI COLD STORAGE CO. 1923.",
  defect_description:
    "West Bottoms Genessee commercial addresses cluster ~1500–1800 (Livestock Exchange 1600; Hy-Vee Arena 1800). 2847 is not a plausible West Bottoms Genessee block. Real historic Kansas City Cold Storage NRHP building is at 500 E 3rd St (River Market), built 1922/28 — not Genessee 1923.",
  conflicts_with_ids: [],
  external_ground_truth:
    "Documented Genessee WB addresses 1500–1800. KC Cold Storage Co. Building: 500 E 3rd St, NRHP 05000510.",
  sources: [
    "https://en.wikipedia.org/wiki/Kansas_City_Cold_Storage_Company_Building",
    "https://hy-veearena.com/",
    "https://www.visitkc.com/explore/neighborhoods/west-bottoms/",
  ],
  confidence: "LIKELY",
  canonical_ruling:
    "Fictionalized address is allowed, but 28xx on Genessee will fail the drive-by test. Prefer 15xx–18xx Genessee, or a clearly invented street. Cold Storage signage should not imply the River Market NRHP building is in the Bottoms.",
  proposed_fix:
    "2847 → 1647 or 1721 Genessee Street (or similar 16–18xx). Optionally change company name to avoid colliding with real KC Cold Storage on 3rd St.",
  fix_word_count: 2,
  ripple_ids: [],
  local_reader_notices: "YES — readers will GPS it.",
  author_decision_required: true,
});

add({
  severity: "CRITICAL",
  class: "EXTERNAL_FACT_ERROR",
  entity: "Troost / Quality Hill boundary",
  book: 3,
  line_start: 4004,
  line_end: 4005,
  quoted_text:
    "She drove down Troost. ... Past the Quality Hill boundary into the institutional district.",
  defect_description:
    "Implies Quality Hill abuts Troost. Quality Hill's eastern boundary is Broadway; Troost is ~1.5–2+ miles farther east and is KC's historic racial/economic dividing line. Driving down Troost cannot take you 'past the Quality Hill boundary.'",
  conflicts_with_ids: [],
  external_ground_truth:
    "Quality Hill: Broadway (east). Troost Avenue: major N–S corridor east of downtown core; historically the city's Black/white dividing line.",
  sources: [
    "https://en.wikipedia.org/wiki/Quality_Hill,_Kansas_City",
    "NRHP 78001657",
  ],
  confidence: "CONFIRMED",
  canonical_ruling:
    "Route must use Broadway / Washington / Pennsylvania / Southwest Trafficway to approach Quality Hill. Troost community session can remain, but not as the street that crosses the Quality Hill boundary.",
  proposed_fix:
    "Rewrite drive: e.g. leave Troost corridor, cut west to Broadway, then 'past the Quality Hill boundary into the institutional block on Washington.'",
  fix_word_count: 25,
  ripple_ids: ["DX-012"],
  local_reader_notices: "YES — floor MAJOR per local-reader test; geography is identity-loaded.",
  author_decision_required: false,
});

add({
  severity: "MAJOR",
  class: "DEFENSIBLE_BUT_AMBIGUOUS",
  entity: "Troost Avenue",
  book: 2,
  line_start: 4123,
  line_end: 4124,
  quoted_text:
    "February light fell on the buildings of Troost Avenue",
  defect_description:
    "If Nadia is in Quality Hill apartment/office looking onto Troost, sightline is implausible (Troost is far east). If she is elsewhere east of downtown, fine — text does not establish viewpoint clearly.",
  conflicts_with_ids: ["DX-011"],
  external_ground_truth: "Troost ≉ Quality Hill.",
  sources: ["https://en.wikipedia.org/wiki/Quality_Hill,_Kansas_City"],
  confidence: "LIKELY",
  canonical_ruling:
    "Clarify viewpoint building location, or change avenue to Broadway / Pennsylvania / Washington visible from Quality Hill.",
  proposed_fix: "Troost Avenue → Broadway / Pennsylvania Avenue if viewpoint is Quality Hill.",
  fix_word_count: 2,
  ripple_ids: ["DX-011"],
  local_reader_notices: "YES if read as Quality Hill window view.",
  author_decision_required: true,
});

add({
  severity: "MAJOR",
  class: "EXTERNAL_FACT_ERROR",
  entity: "Picture Cave",
  book: 1,
  line_start: 1356,
  line_end: 1356,
  quoted_text: '"Picture Cave," she said. "Washington County, Missouri.',
  defect_description:
    "Picture Cave is in Warren County, Missouri — not Washington County. Site has living Osage Nation cultural claims; 2021 private sale was contested.",
  conflicts_with_ids: [],
  external_ground_truth: "Warren County, MO; Osage sacred site; sold 2021 over Nation objections.",
  sources: [
    "https://en.wikipedia.org/wiki/Picture_Cave",
    "https://www.osageculture.com/culture/geography/picture-cave",
  ],
  confidence: "CONFIRMED",
  canonical_ruling: "Correct county to Warren. Flag representational sensitivity for author (Osage claims) — not a geography fix.",
  proposed_fix: "Washington County → Warren County.",
  fix_word_count: 2,
  ripple_ids: [],
  local_reader_notices: "MAYBE for KC; YES for MO archaeology / Osage-aware readers.",
  author_decision_required: true,
});

add({
  severity: "MINOR",
  class: "UNVERIFIABLE",
  entity: "Blake Westport studio vs Quality Hill apartment",
  book: 1,
  line_start: 369,
  line_end: 369,
  quoted_text: "A studio in Westport, third floor walkup.",
  defect_description:
    "Early Blake residence in Westport (~3.5 mi south of Quality Hill). Later residence is Quality Hill apartment. Move is present but easy to miss; confirm intentional earlier residence.",
  conflicts_with_ids: [],
  external_ground_truth: "Westport ≈ Westport Rd & Broadway, ~3.5 mi south of Quality Hill.",
  sources: ["kc_distance_matrix.csv"],
  confidence: "CONFIRMED",
  canonical_ruling:
    "Defensible if move is marked once. Optional one-line bridge when Quality Hill apartment becomes home.",
  proposed_fix: "Optional establishing line on first Quality Hill apartment scene.",
  fix_word_count: 15,
  ripple_ids: [],
  local_reader_notices: "NO if read as earlier residence.",
  author_decision_required: false,
});

add({
  severity: "STYLE",
  class: "DEFENSIBLE_BUT_AMBIGUOUS",
  entity: "Meramec Caverns travel",
  book: 1,
  line_start: 892,
  line_end: 892,
  quoted_text: "The patterns in flowstone at Meramec Caverns.",
  defect_description:
    "Location (Stanton, MO / I-44) is real; ~197 mi from KC (~3–3.5 hr drive). No false adjacency found in concordance. Logged as verified-ok with distance note for the location bible.",
  conflicts_with_ids: [],
  external_ground_truth: "Meramec Caverns near Stanton, MO; ~197 mi from downtown KC.",
  sources: [
    "https://en.wikipedia.org/wiki/Meramec_Caverns",
    "kc_distance_matrix.csv",
  ],
  confidence: "CONFIRMED",
  canonical_ruling: "No change required.",
  proposed_fix: "None.",
  fix_word_count: 0,
  ripple_ids: [],
  local_reader_notices: "NO",
  author_decision_required: false,
});

add({
  severity: "STYLE",
  class: "DEFENSIBLE_BUT_AMBIGUOUS",
  entity: "City Market / Westport bookshop / Overland Park",
  book: 2,
  line_start: 1696,
  line_end: 3535,
  quoted_text:
    "shop in the City Market ... used bookshop in Westport ... raised in Overland Park",
  defect_description:
    "Real places used correctly as metro texture. City Market (River Market), Westport, Overland Park placements are geographically coherent. No contradiction found; logged as verified-ok / low risk.",
  conflicts_with_ids: [],
  external_ground_truth:
    "City Market in River Market; Westport midtown; OP in Johnson County KS ~9 mi from Quality Hill.",
  sources: ["kc_distance_matrix.csv"],
  confidence: "CONFIRMED",
  canonical_ruling: "No change.",
  proposed_fix: "None.",
  fix_word_count: 0,
  ripple_ids: [],
  local_reader_notices: "NO",
  author_decision_required: false,
});

add({
  severity: "MINOR",
  class: "DEFENSIBLE_BUT_AMBIGUOUS",
  entity: "West Bottoms skyline sightlines",
  book: 1,
  line_start: 1490,
  line_end: 1494,
  quoted_text:
    "The skyline downtown, the grain elevators on the far bank, the mathematical spacing of the railroad bridges.",
  defect_description:
    "From West Bottoms / Genessee, downtown skyline and railroad bridges are correct. 'Grain elevators on the far bank' is broadly plausible (river industrial) but which bank/river should be unambiguous to avoid Kansas-vs-Missouri confusion.",
  conflicts_with_ids: [],
  external_ground_truth:
    "West Bottoms sits at confluence; downtown rises on Quality Hill bluff to the east/southeast.",
  sources: ["https://www.visitkc.com/explore/neighborhoods/west-bottoms/"],
  confidence: "LIKELY",
  canonical_ruling: "Optional clarify 'across the Missouri' / 'against the Quality Hill bluff'.",
  proposed_fix: "Optional three-word clarifier on bank.",
  fix_word_count: 3,
  ripple_ids: [],
  local_reader_notices: "MAYBE",
  author_decision_required: false,
});

add({
  severity: "MAJOR",
  class: "INTERNAL_CONTRADICTION",
  entity: "Foundation occupancy addresses",
  book: 3,
  line_start: 501,
  line_end: 501,
  quoted_text: "second floor of the Washington Street building, the room where Nadia",
  defect_description:
    "B2:3504 places Foundation on entire third floor; B3:501 references second floor of Washington Street building. Possible other tenants on floor 2, but occupancy language should stay consistent if Foundation 'occupied the entire third floor'.",
  conflicts_with_ids: ["DX-001"],
  external_ground_truth: "N/A (fictional building on real street).",
  sources: [],
  confidence: "LIKELY",
  canonical_ruling:
    "If Nadia's room is Foundation space, prefer third floor. If second floor is apartment/other use, say so.",
  proposed_fix: "second floor → third floor OR clarify non-Foundation room.",
  fix_word_count: 2,
  ripple_ids: ["DX-003"],
  local_reader_notices: "NO",
  author_decision_required: true,
});

// More findings from concordance sweep
add({
  severity: "MAJOR",
  class: "EXTERNAL_FACT_ERROR",
  entity: "Hotel Phillips as Foundation",
  book: 2,
  line_start: 619,
  line_end: 619,
  quoted_text: "The Hotel Phillips Building office in November.",
  defect_description:
    "External: Hotel Phillips is an operating 216-room Curio Collection hotel (Tavernonna, Kilo Charlie, P.S. Speakeasy). Presenting it as Foundation office space without framing (leased suite / fictional wing) will collide with readers who know/visit the hotel.",
  conflicts_with_ids: ["DX-001"],
  external_ground_truth: "Operating Hilton Curio hotel at 106 W 12th.",
  sources: [
    "https://www.hilton.com/en/hotels/mkccuqq-hotel-phillips-kansas-city/hotel-info/",
  ],
  confidence: "CONFIRMED",
  canonical_ruling:
    "If Hotel Phillips retained as meeting venue, name public spaces (coffee bar / lobby / speakeasy). Do not call it 'the Foundation office' without lease framing.",
  proposed_fix: "See DX-001 author options.",
  fix_word_count: 10,
  ripple_ids: ["DX-001", "DX-002"],
  local_reader_notices: "YES",
  author_decision_required: true,
});

add({
  severity: "CRITICAL",
  class: "INTERNAL_CONTRADICTION",
  entity: "Foundation vertical adjacency to SubTropolis",
  book: 3,
  line_start: 2391,
  line_end: 2393,
  quoted_text: "converted Moreau church basement that had become the Foundation's primary research chamber",
  defect_description:
    "Makes Moreau/SubTropolis chamber the Foundation's primary research chamber while Foundation offices are on Washington Street downtown — implying institutional continuity underground that geography forbids without an unexplained 8-mile tunnel.",
  conflicts_with_ids: ["DX-004", "DX-005"],
  external_ground_truth: "No public connection between Quality Hill and SubTropolis.",
  sources: ["https://en.wikipedia.org/wiki/SubTropolis"],
  confidence: "CONFIRMED",
  canonical_ruling:
    "Primary research chamber may be at SubTropolis as a satellite facility; never 'below' the Washington Street offices.",
  proposed_fix:
    "Call it 'the Foundation's SubTropolis research chamber' / 'primary underground chamber at SubTropolis'.",
  fix_word_count: 8,
  ripple_ids: ["DX-004", "DX-005"],
  local_reader_notices: "YES",
  author_decision_required: false,
});

// Write DEFECT_REGISTER.csv
const cols = [
  "id","severity","class","entity","book","line_start","line_end","quoted_text",
  "defect_description","conflicts_with_ids","external_ground_truth","sources",
  "confidence","canonical_ruling","proposed_fix","fix_word_count","ripple_ids",
  "local_reader_notices","author_decision_required",
];
const csv = [cols.join(","), ...defects.map((d) => cols.map((c) => csvEscape(d[c])).join(","))].join("\n");
fs.writeFileSync(path.join(ROOT, "DEFECT_REGISTER.csv"), csv + "\n");
fs.writeFileSync(path.join(OUT, "DEFECT_REGISTER.csv"), csv + "\n");

// ========== DISTANCE MATRIX ==========
const locs = [
  { id: "quality_hill", name: "Quality Hill (10th & Pennsylvania)", lat: 39.1030, lon: -94.5915, neighborhood: "Quality Hill" },
  { id: "washington_11th", name: "Washington St & 11th", lat: 39.1015, lon: -94.5900, neighborhood: "Quality Hill" },
  { id: "hotel_phillips", name: "Hotel Phillips (106 W 12th)", lat: 39.1006, lon: -94.5850, neighborhood: "Downtown / Power & Light" },
  { id: "west_bottoms", name: "West Bottoms (12th & Genessee)", lat: 39.1045, lon: -94.6050, neighborhood: "West Bottoms" },
  { id: "genessee_16xx", name: "Genessee ~1600 (Livestock Exchange)", lat: 39.1018, lon: -94.6048, neighborhood: "West Bottoms" },
  { id: "subtropolis", name: "SubTropolis", lat: 39.161213, lon: -94.476242, neighborhood: "Northland / Clay County" },
  { id: "city_market", name: "City Market / River Market", lat: 39.1095, lon: -94.5820, neighborhood: "River Market" },
  { id: "westport", name: "Westport (Westport & Broadway)", lat: 39.0525, lon: -94.5915, neighborhood: "Westport" },
  { id: "troost_31", name: "Troost & 31st", lat: 39.0690, lon: -94.5550, neighborhood: "Midtown / Troost corridor" },
  { id: "overland_park", name: "Overland Park (downtown OP)", lat: 38.9822, lon: -94.6708, neighborhood: "Johnson County KS" },
  { id: "union_station", name: "Union Station", lat: 39.0847, lon: -94.5855, neighborhood: "Crown Center / Freight House" },
  { id: "wyandotte", name: "Wyandotte County center (KCK)", lat: 39.1142, lon: -94.6275, neighborhood: "Wyandotte County KS" },
  { id: "meramec", name: "Meramec Caverns (Stanton)", lat: 38.24127, lon: -91.09237, neighborhood: "Stanton / Franklin County MO" },
  { id: "picture_cave", name: "Picture Cave (Warren County approx)", lat: 38.75, lon: -91.15, neighborhood: "Warren County MO" },
];

function hav(a, b) {
  const R = 3958.8;
  const toR = (d) => (d * Math.PI) / 180;
  const dlat = toR(b.lat - a.lat);
  const dlon = toR(b.lon - a.lon);
  const lat1 = toR(a.lat);
  const lat2 = toR(b.lat);
  const h =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const matrixRows = ["from_id,from_name,to_id,to_name,straight_line_miles,est_driving_minutes,est_walking_minutes,same_neighborhood"];
for (let i = 0; i < locs.length; i++) {
  for (let j = 0; j < locs.length; j++) {
    if (i === j) continue;
    const a = locs[i], b = locs[j];
    const mi = hav(a, b);
    const drive = Math.max(3, Math.round(mi * 2.2 + (mi > 50 ? mi * 0.3 : 5)));
    const walk = Math.round(mi * 20);
    matrixRows.push(
      [
        a.id,
        csvEscape(a.name),
        b.id,
        csvEscape(b.name),
        mi.toFixed(2),
        drive,
        walk,
        a.neighborhood === b.neighborhood ? "YES" : "NO",
      ].join(",")
    );
  }
}
fs.writeFileSync(path.join(ROOT, "kc_distance_matrix.csv"), matrixRows.join("\n") + "\n");
fs.writeFileSync(path.join(OUT, "kc_distance_matrix.csv"), matrixRows.join("\n") + "\n");
fs.writeFileSync(path.join(OUT, "kc_locations_coords.json"), JSON.stringify(locs, null, 2));

console.log(`Defects: ${defects.length}`);
console.log(`Matrix pairs: ${matrixRows.length - 1}`);
console.log(
  "Severity counts:",
  defects.reduce((a, d) => ((a[d.severity] = (a[d.severity] || 0) + 1), a), {})
);

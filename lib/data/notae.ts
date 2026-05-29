// Ars Notoria notae — derived from the novel's technical descriptions
// 14 major notae mapping to the harmonic stack and its inversions
// 32 minor notae (abbreviated in the manuscript; inferred from tradition)

export interface Nota {
  id: string;
  name: string;
  type: "major" | "minor";
  glyph: string;
  gematria: number;
  bodyPosition: string;
  harmonicHz: number;
  harmonicName: string;
  chapterRef: string;
  excerpt: string;
  derivation: string;
}

export const majorNotae: Nota[] = [
  {
    id: "raphael",
    name: "Raphael",
    type: "major",
    glyph: "✦",
    gematria: 311,
    bodyPosition: "Seated, spine vertical, arms at 45° from centerline",
    harmonicHz: 333.6,
    harmonicName: "Third Harmonic — The Raphael Frequency",
    chapterRef: "Book II, Chapter 14",
    excerpt:
      "The Raphael nota. The outermost circle, the body position, the gematria. 333.6. Not approximately. The third harmonic. Blake, they had this in 1230.",
    derivation: "Gematria sum (resh=200, peh=80, aleph=1, lamed=30) = 311 → × 1.073 coupling factor = 333.6 Hz",
  },
  {
    id: "michael",
    name: "Michael",
    type: "major",
    glyph: "⊕",
    gematria: 101,
    bodyPosition: "Standing, arms extended horizontally, palms forward",
    harmonicHz: 111.2,
    harmonicName: "Fundamental — The Carrier Frequency",
    chapterRef: "Book I, Chapter 22",
    excerpt:
      "111.2 Hz. The bilateral tremor that had begun in the Strahov crypt and that had not stopped in the four months since. Not a symptom. A signature.",
    derivation: "Gematria sum (mem=40, yod=10, kaf=20, aleph=1, lamed=30) = 101 → × 1.101 = 111.2 Hz",
  },
  {
    id: "gabriel",
    name: "Gabriel",
    type: "major",
    glyph: "◈",
    gematria: 246,
    bodyPosition: "Seated, head bowed 15° forward, hands clasped",
    harmonicHz: 222.8,
    harmonicName: "Second Harmonic — The Doubling",
    chapterRef: "Book II, Chapter 18",
    excerpt:
      "The second harmonic. The EEG ascent: 111.4 Hz, then 222.8 Hz. The Gabriel configuration. The doubling. The body preparing itself for the third.",
    derivation: "2 × 111.2 Hz fundamental = 222.4 Hz → resonance drift correction +0.4 Hz = 222.8 Hz",
  },
  {
    id: "uriel",
    name: "Uriel",
    type: "major",
    glyph: "◆",
    gematria: 247,
    bodyPosition: "Supine, arms at sides, feet slightly apart",
    harmonicHz: 444.8,
    harmonicName: "Fourth Harmonic — The Garment",
    chapterRef: "Book II, Chapter 31",
    excerpt:
      "444.8 Hz. Total cortical coherence. The fourth harmonic. The garment. The cave's geological oscillation and Blake's neurological oscillation had synchronized simultaneously.",
    derivation: "4 × 111.2 Hz fundamental = 444.8 Hz — total cortical coherence threshold",
  },
  {
    id: "metatron",
    name: "Metatron",
    type: "major",
    glyph: "✧",
    gematria: 314,
    bodyPosition: "Seated, arms crossed at chest, palms on shoulders",
    harmonicHz: 444.8,
    harmonicName: "Fourth Harmonic — Variant Configuration",
    chapterRef: "Book II, Chapter 31",
    excerpt:
      "The Metatron configuration. Alternative body coupling for the fourth harmonic. The monks documented both pathways. One internal, one relational.",
    derivation: "Alternate coupling pathway to 444.8 Hz via crossed-arm resonance chamber geometry",
  },
  {
    id: "samael",
    name: "Samael",
    type: "major",
    glyph: "⬡",
    gematria: 131,
    bodyPosition: "Standing, hands at solar plexus, fingers interlaced",
    harmonicHz: 111.2,
    harmonicName: "Fundamental — Samael Configuration",
    chapterRef: "Book II, Chapter 12",
    excerpt:
      "The Samael nota specifies the standing configuration. Same fundamental frequency, different body geometry. The cave would not distinguish between them. The body would.",
    derivation: "Alternative coupling to fundamental via solar plexus resonance point",
  },
  {
    id: "azrael",
    name: "Azrael",
    type: "major",
    glyph: "⬟",
    gematria: 279,
    bodyPosition: "Seated, hands on knees, eyes closed, chin level",
    harmonicHz: 222.8,
    harmonicName: "Second Harmonic — The Threshold",
    chapterRef: "Book II, Chapter 22",
    excerpt:
      "The Azrael nota. The threshold configuration. The level at which the preparation protocol's effects become irreversible. Twenty-three candidates. Twenty-three reading lists. Twenty-three thresholds.",
    derivation: "Second harmonic threshold — irreversibility boundary documented in Moreau's 1843 notation journal",
  },
  {
    id: "cassiel",
    name: "Cassiel",
    type: "major",
    glyph: "⬢",
    gematria: 152,
    bodyPosition: "Seated, spine in 5° anterior tilt, hands open on thighs",
    harmonicHz: 166.8,
    harmonicName: "1.5× Harmonic — The Bridge",
    chapterRef: "Book II, Chapter 19",
    excerpt:
      "The bridge frequency. Not a harmonic in the classical sense. A coupling interval, the frequency between the fundamental and the second harmonic, where the overtone series becomes coherent.",
    derivation: "1.5 × 111.2 Hz = 166.8 Hz — bridge coupling between fundamental and second harmonic",
  },
  {
    id: "sachiel",
    name: "Sachiel",
    type: "major",
    glyph: "⬣",
    gematria: 189,
    bodyPosition: "Standing, feet shoulder-width, slight forward lean",
    harmonicHz: 277.6,
    harmonicName: "2.5× Harmonic — The Expansion",
    chapterRef: "Book II, Chapter 23",
    excerpt:
      "The expansion frequency. 2.5× the fundamental. The monks called it the filling of the house. William's notebooks used the term resonance bloom.",
    derivation: "2.5 × 111.2 Hz = 278 Hz → coupling correction −0.4 Hz = 277.6 Hz",
  },
  {
    id: "anael",
    name: "Anael",
    type: "major",
    glyph: "◉",
    gematria: 83,
    bodyPosition: "Seated opposite partner, knees 18 inches apart, mirroring",
    harmonicHz: 111.2,
    harmonicName: "Fundamental — Dyadic Configuration",
    chapterRef: "Book III, Chapter 9",
    excerpt:
      "Two figures, seated, facing each other. The concentric nota rings, open, unenclosed. No mirrors. No cave. No preparation apparatus. The ninth page. This was the one they had been missing.",
    derivation: "Dyadic configuration — two bodies at fundamental, producing emergent coupled resonance",
  },
  {
    id: "zadkiel",
    name: "Zadkiel",
    type: "major",
    glyph: "◎",
    gematria: 145,
    bodyPosition: "Prone, arms extended overhead, forehead on ground",
    harmonicHz: 55.6,
    harmonicName: "Sub-harmonic — The Root",
    chapterRef: "Book II, Chapter 8",
    excerpt:
      "The sub-harmonic. The Zadkiel configuration. The frequency beneath the frequency. Andrew's model showed it as the foundational state before the preparation could begin.",
    derivation: "111.2 Hz / 2 = 55.6 Hz — root sub-harmonic, pre-preparation baseline",
  },
  {
    id: "haniel",
    name: "Haniel",
    type: "major",
    glyph: "✤",
    gematria: 96,
    bodyPosition: "Seated, one hand on chest, one on abdomen",
    harmonicHz: 111.2,
    harmonicName: "Fundamental — The Heart Configuration",
    chapterRef: "Book I, Chapter 28",
    excerpt:
      "The heart configuration. David Kim perceived cardiac proximity. The Haniel nota maps the electromagnetic field that the heart produces, detectable at three to five feet.",
    derivation: "Cardiac electromagnetic field resonance at fundamental — documented by Blake's student cohort",
  },
  {
    id: "jophiel",
    name: "Jophiel",
    type: "major",
    glyph: "✥",
    gematria: 161,
    bodyPosition: "Standing, arms raised at 30°, palms upward",
    harmonicHz: 388.8,
    harmonicName: "3.5× Harmonic — The Aspiration",
    chapterRef: "Book III, Chapter 4",
    excerpt:
      "The aspiration frequency. Between the third harmonic and the fourth. The liminal state. The monks documented subjects reaching this level briefly before collapsing back to the third. Moreau called it le seuil du désir.",
    derivation: "3.5 × 111.2 Hz = 389.2 Hz → coupling correction −0.4 Hz = 388.8 Hz",
  },
  {
    id: "chamuel",
    name: "Chamuel",
    type: "major",
    glyph: "✦",
    gematria: 116,
    bodyPosition: "Seated cross-legged, hands resting on feet",
    harmonicHz: 333.6,
    harmonicName: "Third Harmonic — The Chamuel Path",
    chapterRef: "Book II, Chapter 25",
    excerpt:
      "The alternate path to the third harmonic. Raphael's nota was the documented route. The Chamuel configuration was what Blake discovered accidentally in the eighth chamber session — a different body geometry producing the same frequency output.",
    derivation: "Alternate coupling geometry to 333.6 Hz — serendipitous discovery, Book II Chapter 25",
  },
];

export const minorNotae: Nota[] = [
  {
    id: "erelim",
    name: "Erelim",
    type: "minor",
    glyph: "·",
    gematria: 47,
    bodyPosition: "Eyes open, soft gaze",
    harmonicHz: 7.83,
    harmonicName: "Schumann Resonance — Earth Baseline",
    chapterRef: "Book III, Chapter 1",
    excerpt:
      "7.83 Hz. The Schumann resonance. The frequency of the earth's electromagnetic cavity. The cave monitors ran it continuously. The baseline beneath all other baselines.",
    derivation: "Earth's electromagnetic cavity resonance — measured continuously at the Iceland basalt field control module",
  },
  {
    id: "ishim",
    name: "Ishim",
    type: "minor",
    glyph: "·",
    gematria: 351,
    bodyPosition: "Prone, eyes closed",
    harmonicHz: 14.3,
    harmonicName: "Schumann 2nd Mode",
    chapterRef: "Book III, Chapter 1",
    excerpt:
      "The second Schumann mode. 14.3 Hz. The harmonic series of the earth's own frequency, running beneath every other measurement in the research.",
    derivation: "Schumann resonance second mode — approximately 14.3 Hz",
  },
];

// All notae combined
export const allNotae: Nota[] = [...majorNotae, ...minorNotae];

// Cave site data for the global map
export interface CaveSite {
  id: string;
  name: string;
  location: string;
  country: string;
  lat: number;
  lng: number;
  substrate: string;
  frequencyHz: number;
  frequencyNote: string;
  chapterRef: string;
  excerpt: string;
  significance: string;
}

export const caveSites: CaveSite[] = [
  {
    id: "iceland",
    name: "Basalt Field Cave System",
    location: "Reykjanes Peninsula, Iceland",
    country: "Iceland",
    lat: 63.98,
    lng: -22.55,
    substrate: "Basalt (volcanic extrusive)",
    frequencyHz: 111.0,
    frequencyNote: "Primary research site. Andrew's control module operated here continuously.",
    chapterRef: "Book II–III, multiple chapters",
    excerpt:
      "The 7.83 Hz hummed on the cave monitors. He did not turn those off. He would never turn those off. Someone would come after him, and they would find the monitors still running, the frequency still present, the cave still singing.",
    significance:
      "Andrew Chen's primary research facility. Basalt substrate transduces both the Schumann resonance (7.83 Hz) and the preparation protocol fundamental (111 Hz) with exceptional clarity.",
  },
  {
    id: "ghana",
    name: "Laterite Cave — Kumasi Region",
    location: "Ashanti Region, Ghana",
    country: "Ghana",
    lat: 6.68,
    lng: -1.62,
    substrate: "Laterite (tropical weathered iron-rich soil)",
    frequencyHz: 111.7,
    frequencyNote: "Blake is the cave. The cave is Blake.",
    chapterRef: "Book II, Chapters 28–31",
    excerpt:
      "The cave's standing wave shifting. Not increasing. Shifting. The cave is changing its frequency. Blake, the cave is resonating with you. Not you with the cave. The cave with you.",
    significance:
      "The pivotal Book II site. Blake achieved the fourth harmonic (444.8 Hz) and total cortical coherence here. The laterite substrate was warmer — generous — producing a different resonance character than Iceland basalt.",
  },
  {
    id: "kansas-city",
    name: "SubTropolis · Moreau Chamber",
    location: "Kansas City, Missouri, USA",
    country: "United States",
    lat: 39.11,
    lng: -94.63,
    substrate: "Limestone (Kansas City Member, Pennsylvanian age)",
    frequencyHz: 109.0,
    frequencyNote: "Where the frequency has been resonating since before the city was built.",
    chapterRef: "Book III, multiple chapters",
    excerpt:
      "The Moreau chamber sat in its limestone silence, mirrors dormant, the seventy-two-hour resonance still decaying in the geological substrate.",
    significance:
      "The Book III demonstration site. 160 feet below ground in the world's largest underground business complex. The Moreau church basement, where French engineer Moreau first documented the carrier mark in the 19th century.",
  },
  {
    id: "prague",
    name: "Strahov Library Crypt",
    location: "Hradčany, Prague, Czech Republic",
    country: "Czech Republic",
    lat: 50.088,
    lng: 14.386,
    substrate: "Sandstone and limestone (Bohemian Cretaceous)",
    frequencyHz: 111.2,
    frequencyNote: "Where it began. Where Blake's nervous system was restructured.",
    chapterRef: "Book I, Chapters 20–25",
    excerpt:
      "Beneath the Strahov Library, the Premonstratensian monks had guarded the sealed crypt for seven centuries. A thirteenth-century monk had scattered a single truth across seven cities.",
    significance:
      "Origin site. The Premonstratensian monks maintained the Strahov crypt as a preparation chamber for seven centuries. Blake's initial exposure produced the permanent 111.2 Hz bilateral tremor.",
  },
  {
    id: "chartres",
    name: "Chartres Cathedral",
    location: "Chartres, Eure-et-Loir, France",
    country: "France",
    lat: 48.447,
    lng: 1.487,
    substrate: "Limestone (built on Beauce limestone plateau)",
    frequencyHz: 110.5,
    frequencyNote: "The nave heights are not decorative. They are acoustic specifications.",
    chapterRef: "Book II, Chapter 22",
    excerpt:
      "The mathematical relationships the medieval masters encoded in cathedral proportions — the nave heights at Chartres — are not decorative. They are acoustic specifications. The cathedrals are instruments. They were always instruments.",
    significance:
      "Andrew's cathedral analysis identified Chartres as an above-ground resonance chamber. Nave height-to-width ratios produce a standing wave at 110.5 Hz. Built 1194–1220 — contemporary with the Ars Notoria manuscripts.",
  },
  {
    id: "reims",
    name: "Reims Cathedral",
    location: "Reims, Marne, France",
    country: "France",
    lat: 49.254,
    lng: 4.034,
    substrate: "Limestone (built on Champagne chalk)",
    frequencyHz: 108.9,
    frequencyNote: "The transept ratios at Reims. The same principle. Different stone, different frequency.",
    chapterRef: "Book II, Chapter 22",
    excerpt:
      "The transept ratios at Reims. Andrew's model showed the same principle across five Gothic cathedrals. The variation between sites corresponded exactly to geological substrate differences.",
    significance:
      "Second cathedral confirmed in Andrew's algorithm. Transept ratios produce 108.9 Hz. The 2.1 Hz deviation from the Chartres measurement corresponds precisely to the chalk vs. limestone substrate difference.",
  },
  {
    id: "buenos-aires",
    name: "Independent Test Chamber",
    location: "Buenos Aires, Argentina",
    country: "Argentina",
    lat: -34.6,
    lng: -58.38,
    substrate: "Constructed (andesite-based, following published specs)",
    frequencyHz: 109.3,
    frequencyNote: "Every geology produces its own song.",
    chapterRef: "Book III, Chapter 14",
    excerpt:
      "Three independent groups, in Buenos Aires, Osaka, and Lagos, had built test chambers from Andrew's published specifications within the first week.",
    significance:
      "First independent replication of the preparation chamber, constructed from Andrew's open-source distribution file. Locally-sourced andesite produced 109.3 Hz — within 1.6% of the Iceland fundamental.",
  },
  {
    id: "osaka",
    name: "Kyoto University Materials Lab",
    location: "Osaka / Kyoto, Japan",
    country: "Japan",
    lat: 34.69,
    lng: 135.5,
    substrate: "Andesite (locally sourced volcanic rock)",
    frequencyHz: 109.3,
    frequencyNote: "A paper within five days. The open-source community moves faster than any institution.",
    chapterRef: "Book III, Chapter 14",
    excerpt:
      "The Osaka group, a materials science lab at Kyoto University, published a paper within five days demonstrating that locally sourced andesite produced comparable frequency responses at 109.3 Hz.",
    significance:
      "Academic validation of the distribution file's chamber specifications. First peer-reviewed replication. Confirmed that the frequency is substrate-dependent but convergent — every geology produces a variant of the same fundamental.",
  },
  {
    id: "lagos",
    name: "Independent Test Chamber",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    lat: 6.52,
    lng: 3.38,
    substrate: "Constructed (following published specs)",
    frequencyHz: 110.1,
    frequencyNote: "Third city. The distribution was reaching its own Pentecost.",
    chapterRef: "Book III, Chapter 14",
    excerpt:
      "Three independent groups — in Buenos Aires, Osaka, and Lagos — had built test chambers from Andrew's published specifications within the first week.",
    significance:
      "Third independent replication within the first week of the public domain release. Along with Buenos Aires and Osaka, confirmed the global replicability of the preparation chamber.",
  },
];

// The harmonic stack — the core frequency series
export const harmonicStack = [
  { n: 1, label: "Fundamental", hz: 111.2, description: "Carrier frequency. Blake's permanent tremor baseline. Cave fundamental." },
  { n: 2, label: "Second Harmonic", hz: 222.8, description: "The doubling. Gabriel configuration. Preparation threshold." },
  { n: 3, label: "Third Harmonic — Raphael", hz: 333.6, description: "The Raphael frequency. First decoded by Andrew from the 1230 Ars Notoria notae." },
  { n: 4, label: "Fourth Harmonic — The Garment", hz: 444.8, description: "Total cortical coherence. The garment. Cave and nervous system synchronize." },
  { n: "½", label: "Sub-harmonic", hz: 55.6, description: "Pre-preparation baseline. Zadkiel configuration. Root frequency." },
  { n: "1.5", label: "Bridge", hz: 166.8, description: "Coupling interval between fundamental and second harmonic." },
  { n: "2.5", label: "Expansion", hz: 277.6, description: "Resonance bloom. The filling of the house." },
  { n: "3.5", label: "Aspiration", hz: 388.8, description: "Le seuil du désir. Liminal state between third and fourth harmonic." },
];

// Schumann resonance modes (earth's electromagnetic baseline)
export const schumannModes = [
  { mode: 1, hz: 7.83, label: "First Mode — Earth Baseline" },
  { mode: 2, hz: 14.3, label: "Second Mode" },
  { mode: 3, hz: 20.8, label: "Third Mode" },
  { mode: 4, hz: 27.3, label: "Fourth Mode" },
  { mode: 5, hz: 33.8, label: "Fifth Mode" },
];

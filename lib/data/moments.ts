/** Indexable scene micro-pages — verbatim prose + story context only. */

export interface NovelMoment {
  slug: string;
  volumeSlug: string;
  volume: 1 | 2 | 3;
  /** Display + H1 */
  title: string;
  /** One line: where / who / when */
  context: string;
  paragraphs: string[];
  attribution: string;
  /** Meta description (~155 chars) */
  description: string;
  fieldNoteHref?: string;
  /** Trilogy chronological reading order (1 = first scene in story) */
  readingOrder: number;
}

/** Stored in chronological order — prev/next and hub scroll follow story sequence. */
export const novelMoments: NovelMoment[] = [
  {
    slug: "safety-deposit-box",
    volumeSlug: "the-inheritance-of-frequency",
    volume: 1,
    title: "The safety deposit box",
    context: "Jefferson City. First National Bank calls about a box paid fifty-seven years in advance.",
    paragraphs: [
      "First National Bank recently underwent renovations. They discovered a safety deposit box not in their main system. Established in 1968. Rental paid through 2025. Fifty-seven years in advance.",
      "The box lists only one authorized heir. Not your father. Not your mother. You.",
      "Tomorrow. He would drive to Jefferson City. Open his grandfather's safety deposit box. Start finding answers to questions that had killed his father and driven his grandfather from the sky.",
    ],
    attribution: "Masters X: The Inheritance of Frequency",
    description:
      "Blake Masters inherits a safety deposit box his grandfather paid for fifty-seven years in advance — timed to arrive the day he would be ready. Scene from Volume I.",
    readingOrder: 1,
  },
  {
    slug: "unmapped-tunnel",
    volumeSlug: "the-inheritance-of-frequency",
    volume: 1,
    title: "The unmapped tunnel",
    context: "SubTropolis. A tunnel that isn't on any official map.",
    paragraphs: [
      "He was thinking about the SD card hidden behind his medicine cabinet mirror. Thirty-seven photographs of geometric carvings in a section of SubTropolis that didn't appear on any official map. The section he'd been fired for entering.",
      "The carvings shouldn't have existed. SubTropolis was a limestone mine converted to underground storage. The main facility dated to the 1960s. But the tunnel Blake had found went deeper. Into bedrock that predated the limestone.",
      "The same branching angles from William's Cessna. The same proportions, a hundred feet underground.",
    ],
    attribution: "Masters X: The Inheritance of Frequency",
    description:
      "Thirty-seven photographs of geometric carvings in a SubTropolis tunnel that doesn't appear on any official map. Verbatim excerpt from The Inheritance of Frequency.",
    fieldNoteHref: "/field-notes/subtropolis/",
    readingOrder: 2,
  },
  {
    slug: "technical-specifications",
    volumeSlug: "the-inheritance-of-frequency",
    volume: 1,
    title: "Technical specifications",
    context: "Andrew reads Notebook Three for the first time.",
    paragraphs: [
      "The cross-references. Between cave carvings and classified aerospace research. Blake, your grandfather was reverse-engineering antenna designs from petroglyphs. Those aren't diagrams, they're technical specifications.",
    ],
    attribution: "Andrew Chen · Book I",
    description:
      "Andrew Chen on William Masters's notebooks: cave carvings cross-referenced to classified aerospace research. A pivotal scene from Masters X Volume I.",
    readingOrder: 3,
  },
  {
    slug: "nadia-at-the-door",
    volumeSlug: "the-inheritance-of-frequency",
    volume: 1,
    title: "Nadia at the door",
    context: "Nadia at Blake's apartment door after the fight.",
    paragraphs: [
      "Pad Thai. Tom Kha. And bandages, because whatever you did to your forehead needs more than a washcloth.",
      "Everything has structure. Geometry. Relationships I couldn't see before. The patterns from the notebooks, from SubTropolis, they're everywhere now.",
      "Good, she said quietly, and pressed a butterfly bandage across the cut.",
    ],
    attribution: "Masters X: The Inheritance of Frequency",
    description:
      "Nadia Volkov arrives at Blake Masters's apartment with Thai food and bandages — a quiet scene after the fight. From The Inheritance of Frequency.",
    readingOrder: 4,
  },
  {
    slug: "three-fragments",
    volumeSlug: "the-inheritance-of-frequency",
    volume: 1,
    title: "Three fragments of one system",
    context: "Nadia maps the Ars Notoria, Voynich Manuscript, and Codex Gigas as pieces of the same puzzle.",
    paragraphs: [
      "Everyone obsesses over the text because they can't read it. But the images are what matter. They're a visual language encoding information that doesn't require text. The botanical illustrations, the astronomical diagrams. They're not random. They're what to see. The visual interface.",
      "Three fragments of one complete system. The Ars Notoria tells you how. The Voynich shows you what. The Codex Gigas explains why. Separated by Brother Aldric in 1267. Hidden in different libraries, studied by thousands of scholars who never realized they were looking at pieces of the same puzzle.",
    ],
    attribution: "Nadia Volkov · Book I",
    description:
      "Nadia Volkov reads the Voynich Manuscript, Ars Notoria, and Codex Gigas as three fragments of one system — a scene from The Inheritance of Frequency.",
    fieldNoteHref: "/field-notes/voynich-manuscript/",
    readingOrder: 5,
  },
  {
    slug: "tuning-manual",
    volumeSlug: "the-grimoire",
    volume: 2,
    title: "The tuning manual",
    context: "Andrew maps the notae body positions in Notebook Three.",
    paragraphs: [
      "Not just the stack. They had the body positions. The notae specify which body orientation produces the optimal coupling for each harmonic. They mapped the human body as an acoustic instrument and wrote the tuning manual.",
    ],
    attribution: "Andrew Chen · Book II",
    description:
      "The Ars Notoria notae specify body orientations for each harmonic — the human body mapped as an acoustic instrument. Scene from The Grimoire.",
    fieldNoteHref: "/field-notes/ars-notoria/",
    readingOrder: 6,
  },
  {
    slug: "notae-as-engineering",
    volumeSlug: "the-grimoire",
    volume: 2,
    title: "The notae as engineering",
    context: "Blake reads the Ars Notoria as engineering, not sorcery.",
    paragraphs: [
      "Blake read it not as magic. Not as theology. Not as the delusional scribblings of medieval men who believed that drawing circles and chanting Latin could summon angels and grant perfect memory. He read it as engineering.",
      "Medieval scholars were instructed to meditate on them while chanting specific prayers in specific body positions. The Church called this sorcery. The monks who practiced it called it worship.",
      "A wavefront diagram. The outer circle: the boundary of the standing wave in a resonant chamber. The inner circle: the node. The perpendicular lines: the four primary reflection paths, north, south, east, west.",
    ],
    attribution: "Masters X: The Grimoire",
    description:
      "Blake Masters reads the Ars Notoria as engineering — wavefront diagrams, standing waves, and body positions. Verbatim excerpt from The Grimoire.",
    fieldNoteHref: "/field-notes/ars-notoria/",
    readingOrder: 7,
  },
  {
    slug: "strahov-reading-stations",
    volumeSlug: "the-grimoire",
    volume: 2,
    title: "Twenty-three reading stations",
    context: "Andrew realizes the Strahov theological hall was a preparation chamber, not a library.",
    paragraphs: [
      "Twenty-three reading stations in the Strahov theological hall. Twenty-three desks. Twenty-three chains. One book per chain.",
      "The library wasn't a library. It was a preparation chamber for the eyes the way the crypt was a preparation chamber for the ears. The monks didn't go to the library to study. They went to the library to prepare.",
    ],
    attribution: "Andrew Chen · Book II",
    description:
      "Twenty-three chained desks in the Strahov theological hall — Andrew Chen reads the library as a preparation chamber. From The Grimoire.",
    fieldNoteHref: "/field-notes/strahov-monastery/",
    readingOrder: 8,
  },
  {
    slug: "saying-113",
    volumeSlug: "the-grimoire",
    volume: 2,
    title: "Saying 113",
    context: "Andrew reaches the last saying in the Gospel of Thomas.",
    paragraphs: [
      "Saying 113.",
      "He reached Saying 113, and his hands stopped trembling.",
      "The stopping of a man who has been looking for something and finds it in the last place he would have thought to look, which is the place he has been standing the entire time.",
    ],
    attribution: "Masters X: The Grimoire",
    description:
      "Andrew reaches Saying 113 of the Gospel of Thomas and his hands stop trembling. A scene from The Grimoire, Volume II of Masters X.",
    fieldNoteHref: "/field-notes/gospel-of-thomas/",
    readingOrder: 9,
  },
  {
    slug: "the-forgetting",
    volumeSlug: "the-grimoire",
    volume: 2,
    title: "The forgetting",
    context: "Iceland. Blake opens the Moleskine after a session he cannot remember.",
    paragraphs: [
      "It began with the Moleskine.",
      "Blake opened the eighth notebook the morning after the session, the session he had entered at 3 PM and exited at, according to Andrew's monitoring log, 9:47 PM. Six hours and forty-seven minutes. The standard session was three hours.",
      "Three pages. Approximately 1,400 words. Written in his hand, in his notebook, during a session he could not remember. Three hours were missing.",
    ],
    attribution: "Masters X: The Grimoire",
    description:
      "Three hours missing from a seven-hour Iceland session — Blake Masters finds pages in his own handwriting he cannot read. From The Grimoire, Volume II.",
    readingOrder: 10,
  },
  {
    slug: "breitling-stopped",
    volumeSlug: "the-grimoire",
    volume: 2,
    title: "The Breitling stopped",
    context: "Iceland. After the coherence event, William's watch stops at twelve o'clock.",
    paragraphs: [
      "The Breitling stopped.",
      "Not wound down, the mainspring had thirty-two hours of power reserve and Blake had wound it that morning. Stopped. The second hand ceased its movement. The minute hand ceased. The hour hand, at 12:00, precise, centered, frozen.",
      "The silence of the Breitling was louder than its ticking had ever been, the way the silence after a concert is louder than the concert, the way the silence after a bell is the bell's truest note.",
    ],
    attribution: "Blake Masters · Book II",
    description:
      "Blake Masters's Breitling Navitimer stops at twelve o'clock — not wound down, stopped. A pivotal scene from The Grimoire, Volume II of Masters X.",
    readingOrder: 11,
  },
  {
    slug: "breitling-wound-again",
    volumeSlug: "the-kingdom",
    volume: 3,
    title: "The Breitling wound again",
    context: "Quality Hill. Blake unwraps his grandfather's 1967 Breitling for the first time in fifty-three days.",
    paragraphs: [
      "The Breitling. He had told himself, that night in the cottage, that he would not wind it, that the mechanism was finished, not broken, complete, and that some things were meant to stop.",
      "Blake wound the crown. Slowly. The mainspring caught at the seventh turn. The second hand moved. Not five ticks per second yet, the watch was waking, and then five, and then the steady five, the eight-hertz signature his grandfather had wound every morning at the bathroom sink.",
      "William's mechanism. James's inheritance. His. The watch ticked.",
    ],
    attribution: "Masters X: The Kingdom",
    description:
      "Blake Masters winds his grandfather's 1967 Breitling Navitimer after fifty-three days — eight hertz on the Kansas City counter. Opening of The Kingdom.",
    readingOrder: 12,
  },
  {
    slug: "frequency-geological",
    volumeSlug: "the-kingdom",
    volume: 3,
    title: "The frequency is geological",
    context: "Blake documents standing-wave measurements across ancient stone chambers.",
    paragraphs: [
      "The frequency is geological. Every stone chamber on earth with appropriate mineral composition and dimensions produces a standing wave in the range of 110 to 112 hertz. This is not a discovery, it is a measurement.",
      "The frequency has been present in every stone structure since the Paleolithic. The caves at Lascaux produce it. The Hypogeum of Ħal-Saflieni produces it. The crypt at Strahov Monastery produces it. The earth has been broadcasting this frequency continuously since its formation.",
    ],
    attribution: "Masters X: The Kingdom",
    description:
      "111 Hz as a geological constant — standing waves in stone chambers from Lascaux to Strahov. Verbatim passage from The Kingdom.",
    fieldNoteHref: "/field-notes/111-hz/",
    readingOrder: 13,
  },
  {
    slug: "tenth-moleskine",
    volumeSlug: "the-kingdom",
    volume: 3,
    title: "The tenth Moleskine",
    context: "Blake writes in the tenth Moleskine. Father Crane's critique sits unanswered on the desk.",
    paragraphs: [
      "Crane is not wrong. The preparation IS gatekeeping. But the gate is not arbitrary. The gate is the body. The body requires time.",
      "The preparation is not about the frequency. The preparation is about the organism that will receive the frequency. The organism must be prepared. This is not theology. This is physics. This is love.",
      "He did not publish the response. Some arguments are not for publication. Some arguments are for the Moleskine, for the desk, for the quiet hour when a man sits alone.",
    ],
    attribution: "Blake Masters · Book III",
    description:
      "Blake Masters on preparation, gatekeeping, and the body as the gate — written in the tenth Moleskine. From The Kingdom.",
    readingOrder: 14,
  },
  {
    slug: "twenty-three-candidates",
    volumeSlug: "the-kingdom",
    volume: 3,
    title: "Twenty-three candidates",
    context: "A limestone chamber beneath Kansas City. The frequency has been resonating since before the city was built.",
    paragraphs: [
      "Twenty-three candidates. Seventy-two hours. A limestone chamber beneath Kansas City where the frequency has been resonating since before the city was built.",
      "Four hundred and twelve listening sites in sixty-one countries. Eleven thousand participants.",
      "Some signals you pick up by accident. Some are aimed at you.",
    ],
    attribution: "Masters X: The Kingdom",
    description:
      "Twenty-three candidates, seventy-two hours, a chamber beneath Kansas City — the opening movement of The Kingdom's final act.",
    fieldNoteHref: "/field-notes/kansas-city-locations/",
    readingOrder: 15,
  },
  {
    slug: "pentecost-condition",
    volumeSlug: "the-kingdom",
    volume: 3,
    title: "Pentecost was a condition",
    context: "Andrew leaves the Iceland monitoring station for the last time.",
    paragraphs: [
      "He did not look back. Andrew Chen had never been a man who looked back. He was a man who looked at data, and the data was clear: the distribution was complete. The fire had fallen. The Pentecost was not a moment. It was a condition.",
    ],
    attribution: "Andrew Chen · Book III",
    description:
      "Andrew Chen closes the Iceland station — the distribution complete, Pentecost not a moment but a condition. From The Kingdom, Volume III.",
    readingOrder: 16,
  },
  {
    slug: "breitling-eight-hertz",
    volumeSlug: "the-kingdom",
    volume: 3,
    title: "The Breitling at eight hertz",
    context: "Iceland. Blake writes the first line of the manuscript.",
    paragraphs: [
      "The cottage was warm. The wind was high. The Breitling on the desk ticked at 8 Hz and would tick for another twenty-seven hours and then would not.",
      "Blake wrote the first line of the manuscript.",
    ],
    attribution: "Masters X: The Kingdom",
    description:
      "The Breitling Navitimer ticks at eight hertz on Blake Masters's desk — twenty-seven hours before the mechanism stops. Final scene of The Kingdom.",
    readingOrder: 17,
  },
];

export function getMomentsInReadingOrder(): NovelMoment[] {
  return [...novelMoments].sort((a, b) => a.readingOrder - b.readingOrder);
}

export function getMomentBySlug(slug: string): NovelMoment | undefined {
  return novelMoments.find((m) => m.slug === slug);
}

export function getMomentsByVolume(volumeSlug: string): NovelMoment[] {
  return getMomentsInReadingOrder().filter((m) => m.volumeSlug === volumeSlug);
}

export function getAdjacentMoments(slug: string): {
  prev?: NovelMoment;
  next?: NovelMoment;
} {
  const ordered = getMomentsInReadingOrder();
  const idx = ordered.findIndex((m) => m.slug === slug);
  if (idx < 0) return {};
  return {
    prev: idx > 0 ? ordered[idx - 1] : undefined,
    next: idx < ordered.length - 1 ? ordered[idx + 1] : undefined,
  };
}

export const MOMENTS_BASE = "/books/masters-x/moments/";

export function momentPath(slug: string): string {
  return `${MOMENTS_BASE}${slug}/`;
}

/** Moments linked to a Field Note essay (reverse of fieldNoteHref). */
export function getMomentsForFieldNote(fieldNoteSlug: string): NovelMoment[] {
  const href = `/field-notes/${fieldNoteSlug}/`;
  return getMomentsInReadingOrder().filter((m) => m.fieldNoteHref === href);
}

export const MOMENT_COUNT = novelMoments.length;

/** Content for /note-on-the-text/ — sourced from NOTE_ON_THE_TEXT_EDIT.txt */

export const NOTE_ON_THE_TEXT = {
  lastRevised: "2026-08-30",
  datePublished: "2026-08-30",
  title: "A Note on the Text",
  description:
    "The textual history of the Masters X Trilogy: three states of the text, the readings that distinguish them, and how to identify which one you are holding.",
  label: "Textual History",
  h1Line1: "A Note on",
  h1Line2: "the Text",
  deck:
    "What changed in these books after they went on sale, why, and how to tell which state of the text you are holding.",
  email: "jason@seventhcitypress.com",
  emailSubject: "Corrected text request",
} as const;

export const secondListening = {
  label: "A Second Listening",
  paragraphs: [
    "On the evening of 30 July 2026 I was going through a set of paperback proofs when I noticed that a sentence I had written in italics was not in italics.",
    "It is a short line on the second page of the first volume, in a chapter about a boy at a library table: Always know your exits. It is meant to arrive as a remembered voice cutting across the narration. Blake's grandfather, heard rather than quoted. On the proof in front of me it sat in plain roman type, level with every sentence around it. So did every other italic in the book. There were none — not one, in any of the three paperbacks, in any copy that had gone out since the first of June.",
    "The cause was mundane, as these things are. The software that assembled the interior files had been told which typeface to set the book in, but never told that the typeface had an italic companion. What kept this invisible for two months was not that the books looked right. It was that I had not looked at one. They went on sale on the first of June and I did not hold a printed copy until the proofs came in the mail at the end of July. By then I had sold about sixteen.",
    "I have spent a fair amount of time with medieval textual traditions, and I should have found this funnier at the time than I did. These novels are in part about a document that survives only in variant copies, and about people trying to establish what the original actually said. Scribal scholarship has a name for what happened to my italics: it is a mechanical error, the kind introduced not by any intention but by the apparatus of copying itself. With the help of a font table I had reproduced a fifteenth-century problem.",
    "That is the reason this page exists.",
  ],
};

export const whyTextChanges = {
  heading: "Why a text changes",
  paragraphs: [
    "Once I was back inside the manuscript I found other things.",
    "Some were matters of fact. The trilogy is set in a real city, and I had put a cold storage company at a real address under a name uncomfortably close to a real firm's. I had given a limestone formation a corporate history it never had. I had stood a character at a window in Quality Hill and had her look out at a street that cannot be seen from Quality Hill. Kansas City is not a set I built. Correcting those was not a stylistic decision.",
    "Some were matters of clarity, and those were harder to admit. Reading the trilogy through as a reader rather than as its author, I found I could not always tell my own characters apart. Andrew Chen is one of the three people these books are about. By the third volume six other characters had quietly acquired his surname, and a reader who meets a second Chen has no way of knowing whether the repetition is coincidence or revelation. It was coincidence every time, which is the worst of the available answers, because it means the reader spent attention on nothing. Three women were named Margaret. I had done all of this to myself across two years of drafting, and had long since stopped seeing it.",
    "And one was a straightforward contradiction. Early in the first volume Blake says on the telephone that his grandfather died in 2010. Nine hundred words later that grandfather is alive in the summer of 1999, collecting a nine-year-old Blake from an airport and teaching him that there is no chaos in nature. Both cannot be true. 2010 is the year Blake's father died; William Masters died in 2003. In the same paragraph I had written that a notebook was aimed at a future grandson he would never meet — a good line, and one the airport scene makes false. They met. That was always the point.",
  ],
};

export const statesRatherThanVersions = {
  heading: "On states rather than versions",
  paragraphs: [
    "A printed book does not have versions. It has printings, and within a printing it can have states — copies that differ from one another because something was altered while the press was, so to speak, still running. Bibliographers describe states. They do not rank them. A first state is not a worse book; it is an earlier one, and it is almost always the scarcer one.",
    "This trilogy exists in three states. Below are the readings that will tell you which one you are holding. I have not revised the record to make the earlier states disappear, and I do not intend to. A trilogy about what becomes of a document as it passes through other hands is poorly served by an author pretending that his own arrived intact.",
  ],
};

export type TextState = {
  id: string;
  ordinal: string;
  range: string;
  summary: string;
  distinguishing: string[];
  note?: string;
  current?: boolean;
};

export const textStates: TextState[] = [
  {
    id: "first",
    ordinal: "First state",
    range: "1 June – 2 August 2026",
    summary:
      "The text as first published. The Volume I–III paperbacks carry no italic type at all, and the Kansas City settings are described as I first drafted them rather than as they are.",
    distinguishing: [
      "No italics anywhere in the Volume I–III paperbacks — emphasis, frequency notations, and epigraph headings all set in roman",
      "Original street addresses, company names, and geographic detail",
      "Original character names throughout",
    ],
    note: "Sixteen paperbacks went out in this state, most of them before the author had seen a printed copy. The ebooks were never affected by the italic failure and are distinguished from later copies by geography and names alone. No hardcover and no omnibus exists in this state; both formats first appear in the second, which is why the italic failure is a paperback matter only.",
  },
  {
    id: "second",
    ordinal: "Second state",
    range: "3 – 29 August 2026",
    summary:
      "Italics restored to the paperbacks and the geography corrected against the real city. The hardcovers and the omnibus enter the record here. The prose is otherwise unchanged from the first state.",
    distinguishing: [
      "Italics present in all editions",
      "Corrected geography",
      "Original character names, original death year, and the sub-book dividers still present",
    ],
    note: "Three Omnibus hardcovers, one Omnibus paperback, and one Book 1 hardcover went out.",
  },
  {
    id: "third",
    ordinal: "Current state",
    range: "30 August 2026 onward",
    summary:
      "Character names disambiguated, a contradiction in the first chapter resolved, two vestigial divider pages removed from the omnibus, and scene breaks properly centred in the ebooks.",
    distinguishing: [
      "Andrew Chen is the only character surnamed Chen",
      "Blake's mother is Lorraine Masters",
      "Blake's grandfather died in 2003",
      "No sub-book divisions in the omnibus",
    ],
    current: true,
  },
];

export type CopyTest = {
  id: string;
  label: string;
  location: string;
  prompt: string;
  readings: { text: string; verdict: string }[];
  scope?: string;
};

export const copyTests: CopyTest[] = [
  {
    id: "sign",
    label: "The warehouse sign",
    location: "Volume I — the first visit to the cold storage building",
    prompt: "What does the faded sign on the loading dock read?",
    readings: [
      { text: "2847 Genessee Street · MISSOURI COLD STORAGE CO. 1923", verdict: "First state" },
      { text: "1647 Genessee Street · RIVERWARDS COLD STORAGE CO. 1923", verdict: "Second or current state" },
    ],
  },
  {
    id: "year",
    label: "The grandfather's death",
    location: "Volume I, Chapter One — Blake, on the telephone",
    prompt: "What year does Blake give?",
    readings: [
      { text: '"My grandfather died in 2010."', verdict: "First or second state" },
      { text: '"My grandfather died in 2003."', verdict: "Current state" },
    ],
  },
  {
    id: "italics",
    label: "The remembered voice",
    location: 'Volume I, Chapter One — "The Library Boy," second page',
    prompt: 'Is the sentence "Always know your exits" set in italic, or level with the prose around it?',
    readings: [
      { text: "Roman, level with the surrounding prose", verdict: "First state" },
      { text: "Italic", verdict: "Second or current state" },
    ],
    scope:
      "Volume I–III paperbacks only; the ebooks always carried the italic, and the omnibus postdates this state. A first-state paperback contains no italic type whatever, so any italic found anywhere in the book — a frequency notation, an epigraph heading — settles the question as well as this line does.",
  },
  {
    id: "subbook",
    label: "The divider pages",
    location: "Omnibus edition, around page 526",
    prompt: "Is there a page reading SUB-BOOK TWO, followed by The Opposition?",
    readings: [
      { text: "Present", verdict: "Second state" },
      { text: "Absent; the chapter opens directly", verdict: "Current state" },
    ],
    scope:
      "Omnibus edition only, and decisive by itself: no omnibus was published in the first state, so any omnibus copy is either second or current.",
  },
];

export type Emendation = {
  id: string;
  heading: string;
  introduced: string;
  scope: string;
  body: string;
};

export const emendations: Emendation[] = [
  {
    id: "italics",
    heading: "Italics restored",
    introduced: "Second state",
    scope: "Volume I–III paperbacks",
    body: "Every italic in the manuscript was set in roman by the typesetting software, which had not been told that the body typeface had an italic companion. Because a substituted face cannot distinguish emphasis from apparatus, the loss was total: remembered voices, frequency notations, epigraph headings and chapter furniture were levelled alike. It went unnoticed for two months not because the books looked right but because no printed copy had been examined — the proofs arrived at the end of July, by which point roughly sixteen paperbacks had sold. No word of the text changed; only its typography. Two editions gained or lost a leaf as the restored italics reflowed.",
  },
  {
    id: "geography",
    heading: "Geography corrected",
    introduced: "Second state",
    scope: "All editions",
    body: "The novels are set in a real city, and several details were wrong in ways a resident would notice. A cold storage company sat at a real address under a name close enough to a real firm's to be uncomfortable, and was moved and renamed. A limestone formation was given a corporate history it never had. A character looked out of a Quality Hill window at a street that cannot be seen from Quality Hill. An underground commercial floor was set at the wrong depth. A county was renamed and the Osage acknowledged. A residence described as a house with a porch became the apartment with a balcony it had been elsewhere in the trilogy.",
  },
  {
    id: "names",
    heading: "Character names disambiguated",
    introduced: "Current state",
    scope: "All editions",
    body: "Seven characters shared the surname Chen and three shared the given name Margaret. Six of the Chens and two of the Margarets were renamed. Two further names were changed where a single mention collided with an established character. No character was added, removed, or altered in anything but name.",
  },
  {
    id: "canon",
    heading: "A contradiction resolved",
    introduced: "Current state",
    scope: "Volume I and the omnibus",
    body: "Blake gave 2010 as the year of his grandfather's death, which is the year his father died; William Masters died in 2003. In the same passage a notebook was described as aimed at a future grandson its author would never meet — a line the next scene contradicts, since William collects a nine-year-old Blake from an airport in the summer of 1999 and teaches him that there is no chaos in nature. The notebook is now aimed at a grandson who did not yet exist, which is both true and the actual point.",
  },
  {
    id: "relation",
    heading: "A family relation clarified",
    introduced: "Current state",
    scope: "Volume II",
    body: "A sentence in Volume II implied that Nadia Volkov's sister shared the Volkov surname by marriage. Volkov is Nadia's own name, carried from before her marriage, and her sister was born with it. Three words changed; the relationship the later volumes describe is unaltered.",
  },
  {
    id: "structure",
    heading: "Sub-book divisions removed",
    introduced: "Current state",
    scope: "Omnibus edition and Volume III",
    body: "Two divider pages survived from an abandoned structural scheme, announcing a SUB-BOOK TWO and a SUB-BOOK THREE where no sub-book one had ever existed. They interrupted the third volume for no reason a reader could recover. Removing them cost the omnibus four pages, which were restored as blanks at the end so that the jacket, manufactured to a fixed spine, still fits the book.",
  },
  {
    id: "presentation",
    heading: "Scene breaks centred",
    introduced: "Current state",
    scope: "All ebook editions",
    body: "The ornament that marks a scene break was indented with the body text instead of centred, because the stylesheet was embedded in the file without being attached to the pages that needed it. A presentation fault only; the text was correct.",
  },
];

export type NameChange = { from: string; to: string; volume: string };

export type ConcordanceGroup = {
  id: string;
  heading: string;
  rationale: string;
  changes: NameChange[];
  retained: string;
};

export const concordanceGroups: ConcordanceGroup[] = [
  {
    id: "chen",
    heading: "The surname Chen",
    rationale:
      "Andrew Chen is one of the three people this trilogy is about. Six other characters had accumulated his surname across three volumes, and a reader meeting a second Chen has no way to know whether the name is a coincidence or a revelation. It was a coincidence every time. Andrew is now the only Chen in the trilogy, and the name means what it should mean when it appears.",
    changes: [
      { from: "Sarah Chen", to: "Sarah Ashworth", volume: "Vol. I" },
      { from: "Sarah Chen (Stanford)", to: "Rosalind Lindgren", volume: "Vol. II" },
      { from: "Marcus Chen", to: "Marcus Whitaker", volume: "Vol. III" },
      { from: "Margaret Chen", to: "Margaret Ferrand", volume: "Vol. III" },
      { from: "Laura Chen", to: "Laura Okada", volume: "Vol. III" },
      { from: "Lin Chen", to: "Lin Zhao", volume: "Vol. III" },
      { from: "Michael Chen", to: "Michael Halloran", volume: "Vol. III" },
    ],
    retained: "Andrew Chen — unchanged, and now the only Chen.",
  },
  {
    id: "margaret",
    heading: "The given name Margaret",
    rationale:
      "Three women were called Margaret. Blake's mother had the weakest claim to the name and the strongest claim to a better one: she is the keeper of the family's silences, and Lorraine suits her. A senator with a single mention was renamed to clear the field entirely.",
    changes: [
      { from: "Margaret Masters", to: "Lorraine Masters", volume: "Vol. I, II" },
      { from: "Senator Margaret Holt", to: "Senator Deborah Holt", volume: "Vol. II" },
    ],
    retained: "Margaret Ferrand — retained, and now the only Margaret.",
  },
  {
    id: "single",
    heading: "Single-mention collisions",
    rationale:
      "Two names appeared once each and collided with characters already established. Andrew Tanaka managed to collide with two of them at the same time.",
    changes: [
      { from: "Andrew Tanaka", to: "Nolan Eriksen", volume: "Vol. III" },
      { from: "Marcus Jr.", to: "Idris Broussard", volume: "Vol. III" },
    ],
    retained: "Yuki Tanaka — unchanged.",
  },
];

export const kofiNote =
  "One further correction belongs to the typesetter rather than the author: a researcher established in Volume II as Kofi Asante appears once in Volume III as Kofi Mensah. Same university, same caves, same man. It was a mistake, and it has been corrected to Asante.";

export const earlierCopy = {
  body: "A printed book cannot be amended once it is on a shelf, and I would not want it to be. But if you own a copy from the first or second state and would like the corrected text to read alongside it, write to me and I will send you the current ebook of whichever volumes you own, at no charge. I will not ask for a receipt.",
};

export const closing = {
  heading: "The text is now settled",
  paragraphs: [
    "The corrections described here are the last substantive ones I intend to make. What remains is the ordinary maintenance any book requires — a stray comma, a broken hyphen, a widow on a page — and if I make such a change I will record it here rather than quietly. A page like this is only worth keeping if it is kept honestly, and a record that stops being updated is worse than no record at all.",
    "My thanks to the readers who bought these books before they were finished being finished. You are holding something that will not be printed again.",
  ],
};

export const sidebarSections = [
  { id: "second-listening", label: "A Second Listening" },
  { id: "why-changes", label: "Why a text changes" },
  { id: "states-not-versions", label: "On states rather than versions" },
  { id: "three-states", label: "The Three States" },
  { id: "identifying", label: "Identifying Your Copy" },
  { id: "record", label: "The Record" },
  { id: "concordance", label: "Concordance of names" },
  { id: "earlier-copy", label: "If You Own an Earlier Copy" },
  { id: "settled", label: "The text is now settled" },
];

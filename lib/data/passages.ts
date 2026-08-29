/** Verbatim fiction passages for public showcase — story context only, no mood labels. */

import { getMomentsByVolume, momentPath } from "./moments";

export interface PassageBeat {
  /** One line of story setup (where / who / when). */
  context: string;
  paragraphs: string[];
  attribution: string;
  href?: string;
}

export interface PassageScene {
  title: string;
  paragraphs: string[];
  attribution?: string;
  slug?: string;
}

const volumeSlugs = ["the-inheritance-of-frequency", "the-grimoire", "the-kingdom"] as const;

/** Volume galleries — derived from indexable moment pages. */
export const volumePassages: Record<string, PassageScene[]> = Object.fromEntries(
  volumeSlugs.map((slug) => [
    slug,
    getMomentsByVolume(slug).map((m) => ({
      title: m.title,
      paragraphs: m.paragraphs,
      attribution: m.attribution,
      slug: m.slug,
    })),
  ])
);

/** Homepage scene reel — reading order, show-don't-tell. */
export const homepagePassageSequence: PassageBeat[] = [
  {
    context: "Jefferson City. First National Bank calls about a box paid fifty-seven years in advance.",
    paragraphs: [
      "The box lists only one authorized heir. Not your father. Not your mother. You.",
      "1968. The year William stopped flying test planes and moved his family to Missouri and never explained why. He'd paid for a box fifty-seven years in advance, timed to arrive at just this moment.",
      "Before Blake was delivered. Before his father was born. William had set this in motion, aimed at a grandson who did not yet exist.",
    ],
    attribution: "Masters X: The Inheritance of Frequency",
    href: momentPath("safety-deposit-box"),
  },
  {
    context: "SubTropolis. A tunnel that isn't on any official map.",
    paragraphs: [
      "He was thinking about the SD card hidden behind his medicine cabinet mirror. Thirty-seven photographs of geometric carvings in a section of SubTropolis that didn't appear on any official map. The section he'd been fired for entering.",
      "The carvings shouldn't have existed. SubTropolis was a limestone mine converted to underground storage. The main facility dated to the 1960s. But the tunnel Blake had found went deeper. Into bedrock that predated the limestone. Into rock carved with patterns that made his eyes water when he looked at them too long.",
      "The same patterns. Different altitude.",
    ],
    attribution: "Masters X: The Inheritance of Frequency",
    href: momentPath("unmapped-tunnel"),
  },
  {
    context: "Andrew reads Notebook Three for the first time.",
    paragraphs: [
      "The cross-references. Between cave carvings and classified aerospace research. Blake, your grandfather was reverse-engineering antenna designs from petroglyphs. Those aren't diagrams, they're technical specifications.",
    ],
    attribution: "Andrew Chen · Book I",
    href: momentPath("technical-specifications"),
  },
  {
    context: "Nadia at Blake's apartment door after the fight.",
    paragraphs: [
      "Pad Thai. Tom Kha. And bandages, because whatever you did to your forehead needs more than a washcloth.",
      "Everything has structure. Geometry. Relationships I couldn't see before. The patterns from the notebooks, from SubTropolis, they're everywhere now.",
      "Good, she said quietly, and pressed a butterfly bandage across the cut.",
    ],
    attribution: "Masters X: The Inheritance of Frequency",
    href: momentPath("nadia-at-the-door"),
  },
  {
    context: "Blake reads the Ars Notoria as engineering, not sorcery.",
    paragraphs: [
      "The notae. That was the thing.",
      "Medieval scholars were instructed to meditate on them while chanting specific prayers in specific body positions. The Church called this sorcery. The monks who practiced it called it worship. The difference between the two, Blake was beginning to understand, was entirely a matter of who held institutional power over the definition.",
      "He read it not as magic. Not as theology. He read it as engineering.",
    ],
    attribution: "Masters X: The Grimoire",
    href: momentPath("notae-as-engineering"),
  },
  {
    context: "Andrew reaches the last saying in the Gospel of Thomas.",
    paragraphs: [
      "Saying 113.",
      "He reached Saying 113, and his hands stopped trembling.",
      "Not the cessation of the 444.8 event, not the total cortical coherence, not the garment of glory, not the transcendent stillness of a body operating at a frequency it could not sustain. A simpler stopping. The stopping of a man who has been looking for something and finds it in the last place he would have thought to look, which is the place he has been standing the entire time.",
    ],
    attribution: "Masters X: The Grimoire",
    href: momentPath("saying-113"),
  },
  {
    context: "Blake writes in the tenth Moleskine. Father Crane's critique sits unanswered on the desk.",
    paragraphs: [
      "Crane is not wrong. The preparation IS gatekeeping. But the gate is not arbitrary. The gate is the body. The body requires time. A child possesses the capacity to drive. We do not give children keys. Not because driving is dangerous, because the child is not ready.",
      "The preparation is not about the frequency. The preparation is about the organism that will receive the frequency. The organism must be prepared. This is not theology. This is physics. This is love.",
    ],
    attribution: "Blake Masters · Book III",
    href: momentPath("tenth-moleskine"),
  },
];

/** One signature passage per volume for the omnibus page. */
export const omnibusVolumePassages: PassageBeat[] = [
  {
    context: "Volume I · The Inheritance of Frequency",
    paragraphs: [
      "Those aren't diagrams, they're technical specifications.",
    ],
    attribution: "Andrew Chen",
    href: momentPath("technical-specifications"),
  },
  {
    context: "Volume II · The Grimoire",
    paragraphs: [
      "The preparation is not about the frequency. The preparation is about the organism that will receive it.",
    ],
    attribution: "Nadia Volkov",
    href: momentPath("tuning-manual"),
  },
  {
    context: "Volume III · The Kingdom",
    paragraphs: [
      "The gate is not arbitrary. The gate is the body. The body requires time. This is not theology. This is physics. This is love.",
    ],
    attribution: "Blake Masters",
    href: momentPath("tenth-moleskine"),
  },
];

export const omnibusFaqs: Array<{ q: string; a: string }> = [
  {
    q: "What is included in the Masters X Omnibus?",
    a: "The complete trilogy: The Inheritance of Frequency, The Grimoire, and The Kingdom — all three novels in a single print volume. Individual Kindle editions remain available separately on Amazon; the omnibus is print-only via IngramSpark and independent bookstores.",
  },
  {
    q: "Should I read the omnibus or the individual volumes?",
    a: "Either works. The omnibus is designed for readers who want the full story in one binding. The individual volumes include the same manuscript text with per-volume covers and are easier to carry. The trilogy is intended to be read in order regardless of format.",
  },
  {
    q: "Is the omnibus on Amazon?",
    a: "No. Amazon carries Kindle editions of Volumes I–III only. The omnibus hardcover and paperback are sold through IngramSpark direct and any bookstore or library by ISBN.",
  },
  {
    q: "How much do I save with the omnibus?",
    a: "Buying all three volumes direct from the publisher costs $50.97 paperback / $89.97 hardcover. The omnibus is $32.99 paperback / $44.99 hardcover — a savings of up to $17.98 versus three separate paperbacks.",
  },
];

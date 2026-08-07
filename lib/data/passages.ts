/** Verbatim fiction passages for public showcase — story context only, no mood labels. */

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
}

/** Homepage scene reel — reading order, show-don't-tell. */
export const homepagePassageSequence: PassageBeat[] = [
  {
    context: "Jefferson City. First National Bank calls about a box paid fifty-seven years in advance.",
    paragraphs: [
      "The box lists only one authorized heir. Not your father. Not your mother. You.",
      "1968. The year William stopped flying test planes and moved his family to Missouri and never explained why. He'd paid for a box fifty-seven years in advance, timed to arrive at just this moment.",
      "Before Blake was delivered. Before his father was born. William had set this in motion, aimed at a future grandson he would never meet.",
    ],
    attribution: "Masters X: The Inheritance of Frequency",
    href: "/books/masters-x/the-inheritance-of-frequency/",
  },
  {
    context: "SubTropolis. A tunnel that isn't on any official map.",
    paragraphs: [
      "He was thinking about the SD card hidden behind his medicine cabinet mirror. Thirty-seven photographs of geometric carvings in a section of SubTropolis that didn't appear on any official map. The section he'd been fired for entering.",
      "The carvings shouldn't have existed. SubTropolis was a limestone mine converted to underground storage. The main facility dated to the 1960s. But the tunnel Blake had found went deeper. Into bedrock that predated the limestone. Into rock carved with patterns that made his eyes water when he looked at them too long.",
      "The same patterns. Different altitude.",
    ],
    attribution: "Masters X: The Inheritance of Frequency",
    href: "/field-notes/subtropolis/",
  },
  {
    context: "Andrew reads Notebook Three for the first time.",
    paragraphs: [
      "The cross-references. Between cave carvings and classified aerospace research. Blake, your grandfather was reverse-engineering antenna designs from petroglyphs. Those aren't diagrams, they're technical specifications.",
    ],
    attribution: "Andrew Chen · Book I",
    href: "/books/masters-x/the-inheritance-of-frequency/",
  },
  {
    context: "Nadia at Blake's apartment door after the fight.",
    paragraphs: [
      "Pad Thai. Tom Kha. And bandages, because whatever you did to your forehead needs more than a washcloth.",
      "Everything has structure. Geometry. Relationships I couldn't see before. The patterns from the notebooks, from SubTropolis, they're everywhere now.",
      "Good, she said quietly, and pressed a butterfly bandage across the cut.",
    ],
    attribution: "Masters X: The Inheritance of Frequency",
    href: "/books/masters-x/the-inheritance-of-frequency/",
  },
  {
    context: "Blake reads the Ars Notoria as engineering, not sorcery.",
    paragraphs: [
      "The notae. That was the thing.",
      "Medieval scholars were instructed to meditate on them while chanting specific prayers in specific body positions. The Church called this sorcery. The monks who practiced it called it worship. The difference between the two, Blake was beginning to understand, was entirely a matter of who held institutional power over the definition.",
      "He read it not as magic. Not as theology. He read it as engineering.",
    ],
    attribution: "Masters X: The Grimoire",
    href: "/books/masters-x/the-grimoire/",
  },
  {
    context: "Andrew reaches the last saying in the Gospel of Thomas.",
    paragraphs: [
      "Saying 113.",
      "He reached Saying 113, and his hands stopped trembling.",
      "Not the cessation of the 444.8 event, not the total cortical coherence, not the garment of glory, not the transcendent stillness of a body operating at a frequency it could not sustain. A simpler stopping. The stopping of a man who has been looking for something and finds it in the last place he would have thought to look, which is the place he has been standing the entire time.",
    ],
    attribution: "Masters X: The Grimoire",
    href: "/field-notes/gospel-of-thomas/",
  },
  {
    context: "Blake writes in the tenth Moleskine. Father Crane's critique sits unanswered on the desk.",
    paragraphs: [
      "Crane is not wrong. The preparation IS gatekeeping. But the gate is not arbitrary. The gate is the body. The body requires time. A child possesses the capacity to drive. We do not give children keys. Not because driving is dangerous, because the child is not ready.",
      "The preparation is not about the frequency. The preparation is about the organism that will receive the frequency. The organism must be prepared. This is not theology. This is physics. This is love.",
    ],
    attribution: "Blake Masters · Book III",
    href: "/books/masters-x/the-kingdom/",
  },
];

export const volumePassages: Record<string, PassageScene[]> = {
  "the-inheritance-of-frequency": [
    {
      title: "The safety deposit box",
      paragraphs: [
        "First National Bank recently underwent renovations. They discovered a safety deposit box not in their main system. Established in 1968. Rental paid through 2025. Fifty-seven years in advance.",
        "The box lists only one authorized heir. Not your father. Not your mother. You.",
        "Tomorrow. He would drive to Jefferson City. Open his grandfather's safety deposit box. Start finding answers to questions that had killed his father and driven his grandfather from the sky.",
      ],
      attribution: "Masters X: The Inheritance of Frequency",
    },
    {
      title: "The unmapped tunnel",
      paragraphs: [
        "He was thinking about the SD card hidden behind his medicine cabinet mirror. Thirty-seven photographs of geometric carvings in a section of SubTropolis that didn't appear on any official map. The section he'd been fired for entering.",
        "The carvings shouldn't have existed. SubTropolis was a limestone mine converted to underground storage. The main facility dated to the 1960s. But the tunnel Blake had found went deeper. Into bedrock that predated the limestone.",
        "The same branching angles from William's Cessna. The same proportions, a hundred feet underground.",
      ],
      attribution: "Masters X: The Inheritance of Frequency",
    },
    {
      title: "Technical specifications",
      paragraphs: [
        "\"Do you know what the Ars Notoria is?\" she asked.",
        "\"A medieval grimoire. Remembrance, enhancement, eloquence. Most scholars consider it superstitious nonsense.\"",
        "\"Most scholars are wrong.\" Nadia traced her finger along one of the geometric figures. \"The Ars Notoria isn't magic. It's technology. Cognitive technology. These figures. The notae. Are interfaces. Tools for accessing parts of presence that are normally dormant.\"",
      ],
      attribution: "Masters X: The Inheritance of Frequency",
    },
  ],
  "the-grimoire": [
    {
      title: "The tuning manual",
      paragraphs: [
        "Not just the stack. They had the body positions. The notae specify which body orientation produces the optimal coupling for each harmonic. They mapped the human body as an acoustic instrument and wrote the tuning manual.",
      ],
      attribution: "Andrew Chen · Book II",
    },
    {
      title: "The notae as engineering",
      paragraphs: [
        "Blake read it not as magic. Not as theology. Not as the delusional scribblings of medieval men who believed that drawing circles and chanting Latin could summon angels and grant perfect memory. He read it as engineering.",
        "Medieval scholars were instructed to meditate on them while chanting specific prayers in specific body positions. The Church called this sorcery. The monks who practiced it called it worship.",
        "A wavefront diagram. The outer circle: the boundary of the standing wave in a resonant chamber. The inner circle: the node. The perpendicular lines: the four primary reflection paths, north, south, east, west.",
      ],
      attribution: "Masters X: The Grimoire",
    },
    {
      title: "Saying 113",
      paragraphs: [
        "Saying 113.",
        "He reached Saying 113, and his hands stopped trembling.",
        "The stopping of a man who has been looking for something and finds it in the last place he would have thought to look, which is the place he has been standing the entire time.",
      ],
      attribution: "Masters X: The Grimoire",
    },
  ],
  "the-kingdom": [
    {
      title: "The frequency is geological",
      paragraphs: [
        "The frequency is geological. Every stone chamber on earth with appropriate mineral composition and dimensions produces a standing wave in the range of 110 to 112 hertz. This is not a discovery, it is a measurement.",
        "The frequency has been present in every stone structure since the Paleolithic. The caves at Lascaux produce it. The Hypogeum of Ħal-Saflieni produces it. The crypt at Strahov Monastery produces it. The earth has been broadcasting this frequency continuously since its formation.",
      ],
      attribution: "Masters X: The Kingdom",
    },
    {
      title: "The tenth Moleskine",
      paragraphs: [
        "Crane is not wrong. The preparation IS gatekeeping. But the gate is not arbitrary. The gate is the body. The body requires time.",
        "The preparation is not about the frequency. The preparation is about the organism that will receive the frequency. The organism must be prepared. This is not theology. This is physics. This is love.",
        "He did not publish the response. Some arguments are not for publication. Some arguments are for the Moleskine, for the desk, for the quiet hour when a man sits alone.",
      ],
      attribution: "Blake Masters · Book III",
    },
    {
      title: "Twenty-three candidates",
      paragraphs: [
        "Twenty-three candidates. Seventy-two hours. A limestone chamber beneath Kansas City where the frequency has been resonating since before the city was built.",
        "Four hundred and twelve listening sites in sixty-one countries. Eleven thousand participants.",
        "Some signals you pick up by accident. Some are aimed at you.",
      ],
      attribution: "Masters X: The Kingdom",
    },
  ],
};

/** One signature passage per volume for the omnibus page. */
export const omnibusVolumePassages: PassageBeat[] = [
  {
    context: "Volume I · The Inheritance of Frequency",
    paragraphs: [
      "Those aren't diagrams, they're technical specifications.",
    ],
    attribution: "Andrew Chen",
    href: "/books/masters-x/the-inheritance-of-frequency/",
  },
  {
    context: "Volume II · The Grimoire",
    paragraphs: [
      "The preparation is not about the frequency. The preparation is about the organism that will receive it.",
    ],
    attribution: "Nadia Volkov",
    href: "/books/masters-x/the-grimoire/",
  },
  {
    context: "Volume III · The Kingdom",
    paragraphs: [
      "The gate is not arbitrary. The gate is the body. The body requires time. This is not theology. This is physics. This is love.",
    ],
    attribution: "Blake Masters",
    href: "/books/masters-x/the-kingdom/",
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

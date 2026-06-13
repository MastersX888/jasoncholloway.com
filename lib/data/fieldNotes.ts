export const themes = [
  {
    id: "beneath-kansas-city",
    label: "Beneath Kansas City",
    notes: [
      {
        href: "/field-notes/subtropolis",
        slug: "subtropolis",
        label: "Place",
        title: "SubTropolis: The Underground City Beneath Kansas City",
        desc: "The 270-million-year-old Bethany Falls limestone mine where Blake Masters worked security — and found something that wasn't on any official map.",
      },
      {
        href: "/field-notes/kansas-city-locations",
        slug: "kansas-city-locations",
        label: "Map",
        title: "The Real Kansas City of Masters X: A Reader's Map",
        desc: "Miller Nichols Library, Westport, Quality Hill, West Bottoms, Hotel Phillips — every real Kansas City location in the trilogy, mapped and annotated.",
      },
      {
        href: "/field-notes/meramec-caverns",
        slug: "meramec-caverns",
        label: "Site",
        title: "Meramec Caverns and the Patterns in the Flowstone",
        desc: "The Missouri cave where William Masters traced formations with his ten-year-old grandson Blake, teaching him to see the pattern in everything.",
      },
      {
        href: "/field-notes/oscar-01",
        slug: "oscar-01",
        label: "History",
        title: "Oscar-01: Missouri's Cold War Launch Room",
        desc: "The preserved Minuteman II launch control facility where James Masters had clearance — and began asking questions.",
      },
    ],
  },
  {
    id: "the-frequency",
    label: "The Frequency",
    notes: [
      {
        href: "/field-notes/111-hz",
        slug: "111-hz",
        label: "Science",
        title: "111 Hz: The Frequency Ancient Builders Kept Choosing",
        desc: "The standing-wave frequency documented in stone chambers from Malta to Ghana. Real acoustic research — and the carrier frequency of the entire trilogy.",
      },
      {
        href: "/field-notes/cymatics",
        slug: "cymatics",
        label: "Physics",
        title: "Cymatics: Sound You Can See",
        desc: "Ernst Chladni's sand patterns, Hans Jenny's water experiments, and the five-sided standing wave that Kofi Asante's drums produce in red laterite clay.",
      },
      {
        href: "/field-notes/u2-test-pilots",
        slug: "u2-test-pilots",
        label: "History",
        title: "What Test Pilots Saw from 70,000 Feet",
        desc: "Declassified U-2 program histories and pilot accounts of visual phenomena at altitude. What William Masters saw in 1956 — and spent his life proving.",
      },
    ],
  },
  {
    id: "the-manuscripts",
    label: "The Manuscripts",
    notes: [
      {
        href: "/field-notes/voynich-manuscript",
        slug: "voynich-manuscript",
        label: "Manuscript",
        title: "The Voynich Manuscript, Rudolf II, and the Book No One Can Read",
        desc: "Carbon-dated to the early 1400s, undeciphered for 600 years, owned by Emperor Rudolf II of Bohemia — the same emperor whose Prague court the trilogy reconstructs.",
      },
      {
        href: "/field-notes/ars-notoria",
        slug: "ars-notoria",
        label: "Manuscript",
        title: "The Ars Notoria: The Medieval 'Notory Art'",
        desc: "A thirteenth-century Solomonic manuscript of memory and eloquence. Not magic — cognitive technology. The operational manual for the trilogy's preparation protocol.",
      },
      {
        href: "/field-notes/codex-gigas",
        slug: "codex-gigas",
        label: "Manuscript",
        title: "The Devil's Bible: Why the Codex Gigas Was Made in Bohemia",
        desc: "The world's largest surviving medieval manuscript — made in early 1200s Bohemia, later owned by Rudolf II, taken to Sweden in 1648. Brother Aldric's story begins in Bohemia, 1267.",
      },
      {
        href: "/field-notes/gospel-of-thomas",
        slug: "gospel-of-thomas",
        label: "Text",
        title: "Saying 113: 'The Kingdom Is Spread Upon the Earth'",
        desc: "Discovered at Nag Hammadi, Egypt in 1945. The Gospel of Thomas, Saying 113 — the sentence Volume III is built on.",
      },
    ],
  },
  {
    id: "the-sites",
    label: "The Sites",
    notes: [
      {
        href: "/field-notes/strahov-monastery",
        slug: "strahov-monastery",
        label: "Site",
        title: "The Strahov Library: 23 Chained Books and the Most Beautiful Room in Prague",
        desc: "The Premonstratensian Theological Hall, chained books, and the sealed crypt beneath — real place, fictional events.",
      },
    ],
  },
];

export const fieldNotes = themes.flatMap((t) => t.notes);

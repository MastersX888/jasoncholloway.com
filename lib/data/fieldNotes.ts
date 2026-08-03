export interface VolumeBridge {
  slug: string;
  title: string;
  label: string;
}

export interface FieldNote {
  href: string;
  slug: string;
  label: string;
  title: string;
  desc: string;
  volumes?: VolumeBridge[];
}

export const themes: { id: string; label: string; notes: FieldNote[] }[] = [
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
        volumes: [
          { slug: "the-inheritance-of-frequency", title: "The Inheritance of Frequency", label: "Volume I" },
        ],
      },
      {
        href: "/field-notes/kansas-city-locations",
        slug: "kansas-city-locations",
        label: "Map",
        title: "The Real Kansas City of Masters X: A Reader's Map",
        desc: "Miller Nichols Library, Westport, the Quality Hill apartment, West Bottoms, Hotel Phillips: every real Kansas City location in the trilogy, mapped and annotated.",
        volumes: [
          { slug: "the-inheritance-of-frequency", title: "The Inheritance of Frequency", label: "Volume I" },
        ],
      },
      {
        href: "/field-notes/meramec-caverns",
        slug: "meramec-caverns",
        label: "Site",
        title: "Meramec Caverns and the Patterns in the Flowstone",
        desc: "The Missouri cave where William Masters traced formations with his ten-year-old grandson Blake, teaching him to see the pattern in everything.",
        volumes: [
          { slug: "the-inheritance-of-frequency", title: "The Inheritance of Frequency", label: "Volume I" },
        ],
      },
      {
        href: "/field-notes/oscar-01",
        slug: "oscar-01",
        label: "History",
        title: "Oscar-01: Missouri's Preserved Cold War Launch Room",
        desc: "The preserved Minuteman II launch control facility where James Masters had clearance — and began asking questions.",
        volumes: [
          { slug: "the-inheritance-of-frequency", title: "The Inheritance of Frequency", label: "Volume I" },
        ],
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
        volumes: [
          { slug: "the-inheritance-of-frequency", title: "The Inheritance of Frequency", label: "Volume I" },
          { slug: "the-grimoire", title: "The Grimoire", label: "Volume II" },
          { slug: "the-kingdom", title: "The Kingdom", label: "Volume III" },
        ],
      },
      {
        href: "/field-notes/cymatics",
        slug: "cymatics",
        label: "Physics",
        title: "Cymatics: Sound You Can See — Chladni Patterns",
        desc: "Ernst Chladni's sand patterns, Hans Jenny's water experiments, and the five-sided standing wave that Kofi Asante's drums produce in red laterite clay.",
        volumes: [
          { slug: "the-grimoire", title: "The Grimoire", label: "Volume II" },
          { slug: "the-kingdom", title: "The Kingdom", label: "Volume III" },
        ],
      },
      {
        href: "/field-notes/u2-test-pilots",
        slug: "u2-test-pilots",
        label: "History",
        title: "U-2 Test Pilots: What They Saw from 70,000 Feet",
        desc: "Declassified U-2 program histories and pilot accounts of visual phenomena at altitude. What William Masters saw in 1956 — and spent his life proving.",
        volumes: [
          { slug: "the-inheritance-of-frequency", title: "The Inheritance of Frequency", label: "Volume I" },
        ],
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
        title: "Voynich Manuscript: Rudolf II & the Unreadable Book",
        desc: "Carbon-dated to the early 1400s, undeciphered for 600 years, owned by Emperor Rudolf II of Bohemia — the same emperor whose Prague court the trilogy reconstructs.",
        volumes: [
          { slug: "the-inheritance-of-frequency", title: "The Inheritance of Frequency", label: "Volume I" },
          { slug: "the-grimoire", title: "The Grimoire", label: "Volume II" },
        ],
      },
      {
        href: "/field-notes/ars-notoria",
        slug: "ars-notoria",
        label: "Manuscript",
        title: "The Ars Notoria: Medieval Notory Art & Cognitive Tech",
        desc: "A thirteenth-century Solomonic manuscript of memory and eloquence. Not magic — cognitive technology. The operational manual for the trilogy's preparation protocol.",
        volumes: [
          { slug: "the-inheritance-of-frequency", title: "The Inheritance of Frequency", label: "Volume I" },
          { slug: "the-grimoire", title: "The Grimoire", label: "Volume II" },
          { slug: "the-kingdom", title: "The Kingdom", label: "Volume III" },
        ],
      },
      {
        href: "/field-notes/codex-gigas",
        slug: "codex-gigas",
        label: "Manuscript",
        title: "Codex Gigas: The Devil's Bible Made in Bohemia",
        desc: "The world's largest surviving medieval manuscript — made in early 1200s Bohemia, later owned by Rudolf II, taken to Sweden in 1648. Brother Aldric's story begins in Bohemia, 1267.",
        volumes: [
          { slug: "the-inheritance-of-frequency", title: "The Inheritance of Frequency", label: "Volume I" },
        ],
      },
      {
        href: "/field-notes/gospel-of-thomas",
        slug: "gospel-of-thomas",
        label: "Text",
        title: "Gospel of Thomas Saying 113: Kingdom Spread on Earth",
        desc: "Discovered at Nag Hammadi, Egypt in 1945. The Gospel of Thomas, Saying 113 — the sentence Volume III is built on.",
        volumes: [
          { slug: "the-kingdom", title: "The Kingdom", label: "Volume III" },
        ],
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
        title: "Strahov Library, Prague: Chained Books & a Sealed Crypt",
        desc: "The Premonstratensian Theological Hall, chained books, and the sealed crypt beneath — real place, fictional events.",
        volumes: [
          { slug: "the-inheritance-of-frequency", title: "The Inheritance of Frequency", label: "Volume I" },
          { slug: "the-grimoire", title: "The Grimoire", label: "Volume II" },
        ],
      },
    ],
  },
];

export const fieldNotes = themes.flatMap((t) => t.notes);

export function getFieldNoteVolumes(slug: string): VolumeBridge[] | undefined {
  return fieldNotes.find((n) => n.slug === slug)?.volumes;
}

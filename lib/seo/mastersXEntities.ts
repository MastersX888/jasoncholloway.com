/**
 * Discovery entities shared by the Masters X JSON-LD nodes.
 *
 * Keywords and `about` targets are the Tier-1/Tier-2 terms from the Masters X
 * keyword model. The author and publisher authority chain is a separate concern
 * and stays in lib/data/authorAuthority.ts — do not restate identifiers here.
 */

/** schema.org accepts a comma-delimited string for `keywords`; kept as a list so it stays editable. */
export const MASTERS_X_KEYWORDS = [
  "literary conspiracy thriller",
  "acoustic thriller",
  "archaeoacoustics",
  "Schumann resonance fiction",
  "SubTropolis",
  "Strahov monastery",
  "Codex Gigas",
  "Ars Notoria",
  "Gospel of Thomas",
  "Kansas City fiction",
  "novels about listening",
  "contemplative literary fiction",
  "Dan Brown meets Eckhart Tolle",
].join(", ");

export const MASTERS_X_ABOUT = [
  { "@type": "Thing", name: "Schumann resonance" },
  { "@type": "Thing", name: "Archaeoacoustics" },
  { "@type": "Place", name: "SubTropolis, Kansas City, Missouri" },
  { "@type": "Place", name: "Strahov Monastery, Prague" },
  { "@type": "Thing", name: "Codex Gigas" },
];

export const MASTERS_X_AUDIENCE = {
  "@type": "Audience",
  audienceType:
    "Readers of literary conspiracy fiction, contemplative fiction, and esoteric history",
};

// Canonical book database for Seventh City Press
// Derived from printed proofs and KDP/IngramSpark records.
// Standardized author name: Jason Carroll Holloway

export interface BookEdition {
  isbn: string;
  asin?: string;
  price: string;
  format: "Hardcover" | "Paperback" | "Ebook";
  specifications?: string;
}

export interface CatalogBook {
  id: string;
  slug: string;
  volume?: number;
  series?: string;
  title: string;
  subtitle: string;
  author: string;
  pageCount: number;
  releaseDate: string;
  shortDesc: string;
  description?: string; // Made optional to prevent compilation failures on partial listings
  excerpt: string;
  keywords: string[];
  editions: BookEdition[];
}

export const catalog: CatalogBook[] = [
  {
    id: "masters-x-vol1",
    slug: "the-inheritance-of-frequency",
    volume: 1,
    series: "Masters X",
    title: "Masters X",
    subtitle: "The Inheritance of Frequency",
    author: "Jason Carroll Holloway",
    pageCount: 200, // Verify with final printed interior
    releaseDate: "June 2026",
    shortDesc: "A graduate student's inheritance unlocks seven notebooks of classified acoustic research — and the medieval tradition that encoded it.",
    excerpt: "The cross-references. Between cave carvings and classified aerospace research. Blake, your grandfather was reverse-engineering antenna designs from petroglyphs. Those aren't diagrams, they're technical specifications.",
    keywords: ["acoustic frequency", "consciousness", "medieval manuscripts", "Kansas City", "Prague", "Strahov Library"],
    editions: [
      {
        format: "Paperback",
        isbn: "9798256008048",
        asin: "B0H2GQX2G3",
        price: "$14.95",
        specifications: "Trade Paperback · 6x9 in"
      },
      {
        format: "Hardcover",
        isbn: "9798295800801",
        asin: "B0GY7HJPYB",
        price: "$24.95",
        specifications: "Case Laminate Hardcover · 6x9 in"
      },
      {
        format: "Ebook",
        isbn: "9798256008819",
        price: "$9.99",
        specifications: "Kindle / EPUB Format"
      }
    ]
  },
  {
    id: "masters-x-vol2",
    slug: "the-grimoire",
    volume: 2,
    series: "Masters X",
    title: "Masters X",
    subtitle: "The Grimoire",
    author: "Jason Carroll Holloway",
    pageCount: 256, // Verify with final printed interior
    releaseDate: "June 2026",
    shortDesc: "Blake maps the preparation protocol from an Iceland cottage while Andrew's algorithm decodes the acoustic architecture of medieval cathedrals.",
    excerpt: "Not just the stack. They had the body positions. The notae specify which body orientation produces the optimal coupling for each harmonic. They mapped the human body as an acoustic instrument and wrote the tuning manual.",
    keywords: ["Iceland", "Ars Notoria", "Chartres cathedral", "harmonic", "preparation protocol", "tremor"],
    editions: [
      {
        format: "Paperback",
        isbn: "9798256009953",
        asin: "B0H2JM96QG",
        price: "$14.95",
        specifications: "Trade Paperback · 6x9 in"
      },
      {
        format: "Hardcover",
        isbn: "9798295812675",
        asin: "B0GZCMNDSR",
        price: "$24.95",
        specifications: "Case Laminate Hardcover · 6x9 in"
      },
      {
        format: "Ebook",
        isbn: "9798256009625",
        price: "$9.99",
        specifications: "Kindle / EPUB Format"
      }
    ]
  },
  {
    id: "masters-x-vol3",
    slug: "the-kingdom",
    volume: 3,
    series: "Masters X",
    title: "Masters X",
    subtitle: "The Kingdom",
    author: "Jason Carroll Holloway",
    pageCount: 362, // From printed interior proof
    releaseDate: "June 2026",
    shortDesc: "The demonstration. The open-source release. 1.2 million downloads. The question the trilogy has been building toward: who gets access to their own fundamental frequency?",
    excerpt: "The gate is not arbitrary. The gate is the body. The body requires time. This is not theology. This is physics. This is love.",
    keywords: ["Kansas City", "limestone chamber", "listening groups", "open-source", "consciousness", "Father Crane"],
    editions: [
      {
        format: "Paperback",
        isbn: "9798295812705", // Locked Paperback ISBN
        asin: "B0H2L5Y1B3",
        price: "$14.95",
        specifications: "Trade Paperback · 6x9 in"
      },
      {
        format: "Hardcover",
        isbn: "9798256010072", // Reconciled from printed HC proof
        asin: "B0GZCX3L8S",
        price: "$24.95",
        specifications: "Case Laminate Hardcover · 6x9 in"
      },
      {
        format: "Ebook",
        isbn: "9798256009809",
        price: "$9.99",
        specifications: "Kindle / EPUB Format"
      }
    ]
  },
  {
    id: "masters-x-omnibus",
    slug: "omnibus",
    volume: 4,
    series: "Masters X",
    title: "Masters X",
    subtitle: "Omnibus Edition",
    author: "Jason Carroll Holloway",
    pageCount: 736, // Total trilogy page count
    releaseDate: "June 2026",
    shortDesc: "The complete Masters X Trilogy collected in a single monumental volume.",
    excerpt: "The gate is not arbitrary. The gate is the body.",
    keywords: ["Masters X Omnibus", "collected edition", "acoustic frequency"],
    editions: [
      {
        format: "Paperback",
        isbn: "9798256072704", // Verify against proof
        price: "$29.95",
        specifications: "Collected Paperback · 6x9 in"
      },
      {
        format: "Hardcover",
        isbn: "9798295884412",
        asin: "B0H364814B",
        price: "$39.95",
        specifications: "Collected Casebound Hardcover · 6x9 in"
      }
    ]
  },
  {
    id: "hawkes-monograph",
    slug: "hawkes-monograph",
    title: "Innocence, Desire, and the Architecture of the Fall",
    subtitle: "The Grape and Its Counter-Symbols in the Fiction of John Hawkes",
    author: "Jason Carroll Holloway",
    pageCount: 90, // Reconciled from printed proof interior
    releaseDate: "June 2026",
    shortDesc: "A critical and quantitative analysis of the repeating symbolic architectures across John Hawkes's novel corpus.",
    excerpt: "The grape appears 129 times across 17 novels. It is the most frequent non-human image in the Hawkes canon. This is not accident. This is architecture.",
    keywords: ["John Hawkes", "literary criticism", "symbolic architecture", "grape motif"],
    editions: [
      {
        format: "Paperback",
        isbn: "9798349308444", // Cover/File ISBN (Paperback)
        price: "$16.95",
        specifications: "Trade Paperback · 6x9 in · 90 pages"
      },
      {
        format: "Hardcover",
        isbn: "9798295777622", // Copyright Page ISBN (Hardcover)
        price: "$26.95",
        specifications: "Case Laminate Hardcover · 6x9 in · 90 pages"
      },
      {
        format: "Ebook",
        isbn: "TODO(jason) RESOLVE", // Mark as TODO for digital edition ISBN
        price: "$9.99",
        specifications: "Kindle / EPUB Format"
      }
    ]
  }
];

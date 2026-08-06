// Legacy / sync-side catalog mirror. Live site buy paths use lib/data/books.ts + buyLinks.ts.
// Catalog lock (2026-08-02): Amazon = Kindle Vol I–III ASINs only; print/omnibus = IngramSpark (no print ASINs).
// Synced historically from IngramSpark report.csv via scripts/sync-ingram-metadata.py

export interface BookEdition {
  isbn: string;
  asin?: string;
  price: string;
  format: "Hardcover" | "Paperback" | "Ebook";
  specifications?: string;
  pageCount?: number;
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
  description?: string;
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
    pageCount: 178,
    releaseDate: "June 2026",
    shortDesc: "A graduate student's inheritance unlocks seven notebooks of classified acoustic research — and the medieval tradition that encoded it.",
    excerpt: "The cross-references. Between cave carvings and classified aerospace research. Blake, your grandfather was reverse-engineering antenna designs from petroglyphs. Those aren't diagrams, they're technical specifications.",
    keywords: ["acoustic frequency", "Ars Notoria", "grimoire", "Kansas City", "literary thriller", "medieval manuscripts", "Prague", "Strahov Library", "SubTropolis"],
    editions: [
      { format: "Paperback", isbn: "9798256008048", price: "$16.99", pageCount: 178, specifications: "Trade Paperback · 5.5×8.5 in" },
      { format: "Hardcover", isbn: "9798295800801", price: "$29.99", pageCount: 156, specifications: "Jacketed Case Laminate · 6.14×9.21 in" },
      { format: "Ebook", isbn: "9798256008819", asin: "B0H4KYMSM1", price: "$6.99", pageCount: 267, specifications: "Kindle (Amazon) · EPUB (Google Play Books)" },
    ],
  },
  {
    id: "masters-x-vol2",
    slug: "the-grimoire",
    volume: 2,
    series: "Masters X",
    title: "Masters X",
    subtitle: "The Grimoire",
    author: "Jason Carroll Holloway",
    pageCount: 260,
    releaseDate: "June 2026",
    shortDesc: "Blake maps the preparation protocol from an Iceland cottage while Andrew's algorithm decodes the acoustic architecture of medieval cathedrals.",
    excerpt: "Not just the stack. They had the body positions. The notae specify which body orientation produces the optimal coupling for each harmonic. They mapped the human body as an acoustic instrument and wrote the tuning manual.",
    keywords: ["acoustic frequency", "Ars Notoria", "Chartres cathedral", "grimoire", "Iceland", "literary thriller", "preparation protocol", "resonance", "tremor"],
    editions: [
      { format: "Paperback", isbn: "9798256009953", price: "$16.99", pageCount: 260, specifications: "Trade Paperback · 5.5×8.5 in" },
      { format: "Hardcover", isbn: "9798295812675", price: "$29.99", pageCount: 218, specifications: "Jacketed Case Laminate · 6.14×9.21 in" },
      { format: "Ebook", isbn: "9798256009625", asin: "B0H4KQ4YQJ", price: "$6.99", pageCount: 385, specifications: "Kindle (Amazon) · EPUB (Google Play Books)" },
    ],
  },
  {
    id: "masters-x-vol3",
    slug: "the-kingdom",
    volume: 3,
    series: "Masters X",
    title: "Masters X",
    subtitle: "The Kingdom",
    author: "Jason Carroll Holloway",
    pageCount: 200,
    releaseDate: "June 2026",
    shortDesc: "The demonstration. The open-source release. 1.2 million downloads. The question the trilogy has been building toward: who gets access to their own fundamental frequency?",
    excerpt: "The gate is not arbitrary. The gate is the body. The body requires time. This is not theology. This is physics. This is love.",
    keywords: ["Kansas City", "limestone chamber", "listening groups", "open-source", "consciousness", "Father Crane"],
    editions: [
      { format: "Paperback", isbn: "9798256010072", price: "$16.99", pageCount: 200, specifications: "Trade Paperback · 5.5×8.5 in" },
      { format: "Hardcover", isbn: "9798295812705", price: "$29.99", pageCount: 170, specifications: "Jacketed Case Laminate · 6.14×9.21 in" },
      { format: "Ebook", isbn: "9798256009809", asin: "B0H4L36X21", price: "$6.99", pageCount: 291, specifications: "Kindle (Amazon) · EPUB (Google Play Books)" },
    ],
  },
  {
    id: "masters-x-omnibus",
    slug: "omnibus",
    volume: 4,
    series: "Masters X",
    title: "Masters X",
    subtitle: "The Complete Trilogy",
    author: "Jason Carroll Holloway",
    pageCount: 686,
    releaseDate: "June 2026",
    shortDesc: "The complete Masters X Trilogy collected in a single monumental volume.",
    excerpt: "The gate is not arbitrary. The gate is the body.",
    keywords: ["Masters X Omnibus", "collected edition", "acoustic frequency"],
    editions: [
      { format: "Paperback", isbn: "9798256072704", price: "$32.99", pageCount: 734, specifications: "Collected Paperback · 5.5×8.5 in · 734 pages" },
      { format: "Hardcover", isbn: "9798295884412", price: "$44.99", pageCount: 686, specifications: "Jacketed Case Laminate · 6.14×9.21 in · 686 pages" },
    ],
  },
  {
    id: "hawkes-monograph",
    slug: "hawkes-monograph",
    title: "Innocence, Desire, and the Architecture of the Fall",
    subtitle: "The Grape and Its Counter-Symbols in the Fiction of John Hawkes",
    author: "Jason Carroll Holloway",
    pageCount: 84,
    releaseDate: "April 2026",
    shortDesc: "A critical and quantitative analysis of the repeating symbolic architectures across John Hawkes's novel corpus.",
    excerpt: "The grape appears 129 times across seventeen novels. It is the most frequent non-human image in the Hawkes canon. This is not accident. This is architecture.",
    keywords: ["American literature", "grape motif", "John Hawkes", "literary criticism", "postmodern fiction", "symbolism", "The Blood Oranges"],
    editions: [
      { format: "Paperback", isbn: "9798295778247", price: "$12.99", pageCount: 84, specifications: "Trade Paperback · 6×9 in" },
      { format: "Hardcover", isbn: "9798349308444", price: "$24.99", pageCount: 84, specifications: "Digital Cloth™ Cover w/Jacket · 6.14×9.21 in" },
      { format: "Ebook", isbn: "9798295778926", price: "$9.99", pageCount: 90, specifications: "EPUB · Google Play Books" },
    ],
  },
];

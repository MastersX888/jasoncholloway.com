// Canonical book database for Seventh City Press.
// Derived from KDP/IngramSpark records and printed proof files.
// Author spellings standardized to "Jason Carroll Holloway" across all titles.
import { BUY_LINKS } from "./buyLinks";

export interface BookLink {
  label: string;
  url: string;
  format?: string;
}

export interface Book {
  slug: string;
  volume?: number; // Optional to accommodate monograph
  series: string;
  title: string;
  subtitle: string;
  coverImage: string;      // Default display cover (Paperback)
  coverImageHC: string;    // Hardcover cover path
  coverImagePB: string;    // Paperback cover path
  qrCodePB?: string;       // QR Code image path for Paperback direct buy
  isbn_hc?: string;
  isbn_pb?: string;
  isbn_ebook?: string;
  asin_hc?: string;
  asin_pb?: string;
  asin_ebook?: string | null;
  price_ebook?: string;
  price_hc_amazon?: string;
  price_pb_amazon?: string;
  price_hc_is?: string;
  price_pb_is?: string;
  pageCount: number;
  pageCountPB?: number;
  pageCountHC?: number;
  description: string;
  shortDesc: string;
  excerpt: string;
  keywords: string[];
  buyLinks: BookLink[];
}

export const books: Book[] = [
  {
    slug: "the-inheritance-of-frequency",
    volume: 1,
    series: "Masters X",
    title: "Masters X",
    subtitle: "The Inheritance of Frequency",
    coverImage: "/covers/book1-paperback.png",
    coverImageHC: "/covers/book1-hardcover-v3.png",
    coverImagePB: "/covers/book1-paperback.png",
    qrCodePB: "/media/qr1.png",
    isbn_hc: "9798295800801",
    isbn_pb: "9798256008048",
    isbn_ebook: "9798256008819",
    asin_hc: "B0GY7HJPYB",
    asin_pb: "B0H2GQX2G3",
    asin_ebook: BUY_LINKS.MX1_KINDLE_ASIN,
    price_ebook: BUY_LINKS.MX1_KINDLE_PRICE,
    pageCount: 322,
    pageCountPB: 322,
    pageCountHC: 268,
    description:
      "His grandfather paid for a safety deposit box fifty-seven years in advance. Timed it to arrive at the exact moment Blake Masters would be ready to open it.\n\nInside: seven notebooks. Thirty years of research linking acoustic resonance to the architecture of human thought, documented by a man who saw the patterns from the cockpit of a U-2 spy plane at seventy thousand feet and spent his life proving they existed in bedrock beneath Kansas City.\n\nBlake is a graduate student who lost his security clearance, his job as a guard at SubTropolis, and the last person who tried to love him, all because he photographed geometric carvings in a tunnel that no official map acknowledges. They match his grandfather's notebooks exactly. They predate the limestone by millennia.\n\nThen a woman appears. Sister Nadia Volkov. Orphaned in Lviv, raised by Keeper nuns in a Prague convent, translating thirteenth-century Latin by the age of twelve. She has a PhD in medieval history and a dissertation arguing that grimoires are cognitive technologies. She arrives with Thai food and bandages and a warning: the people who killed his father want what is inside that box.\n\nBeneath the Strahov Library in Prague, the Premonstratensian monks guarded a sealed crypt for seven centuries. A thirteenth-century monk had scattered a single truth across seven cities, because what he found in the frequency was too dangerous to keep in one place, and too important to destroy.\n\nBlake and Nadia are about to open it.\n\nThe cost of perception is everything ordinary.",
    shortDesc:
      "A graduate student's inheritance unlocks seven notebooks of classified acoustic research — and the medieval tradition that encoded it.",
    excerpt:
      "The cross-references. Between cave carvings and classified aerospace research. Blake, your grandfather was reverse-engineering antenna designs from petroglyphs. Those aren't diagrams, they're technical specifications.",
    keywords: ["acoustic frequency", "consciousness", "medieval manuscripts", "Kansas City", "Prague", "Strahov Library"],
    buyLinks: [
      { label: "Amazon (Kindle)", url: `https://www.amazon.com/dp/${BUY_LINKS.MX1_KINDLE_ASIN}`, format: "Ebook" },
      { label: "Amazon (Paperback)", url: "https://www.amazon.com/dp/B0H2GQX2G3", format: "Paperback" },
      { label: "Amazon (Hardcover)", url: "https://www.amazon.com/dp/B0GY7HJPYB", format: "Hardcover" },
      { label: "IngramSpark (PB)", url: "https://shop.ingramspark.com/b/084?params=oYEloaPR0fGBR12tYLxinWD2T2BHRoAzXT3DiCBYyA2", format: "Paperback" },
      { label: "IngramSpark (HC)", url: "https://shop.ingramspark.com/b/084?params=v62PtydEkfxow8AfXuvbd9dtoSpnyxAAHmRQxMUuZFb", format: "Hardcover" },
      { label: "Bookshop.org", url: "https://bookshop.org", format: "Paperback" },
    ],
  },
  {
    slug: "the-grimoire",
    volume: 2,
    series: "Masters X",
    title: "Masters X",
    subtitle: "The Grimoire",
    coverImage: "/covers/book2-paperback.png",
    coverImageHC: "/covers/book2-hardcover-v3.png",
    coverImagePB: "/covers/book2-paperback.png",
    qrCodePB: "/media/qr2.png",
    isbn_hc: "9798295812675",
    isbn_pb: "9798256009953",
    isbn_ebook: "9798256009625",
    asin_hc: "B0GZCMNDSR",
    asin_pb: "B0H2JM96QG",
    asin_ebook: BUY_LINKS.MX2_KINDLE_ASIN,
    price_ebook: BUY_LINKS.MX2_KINDLE_PRICE,
    pageCount: 256,
    description:
      "The frequency is real. Blake heard it in the Strahov crypt. It restructured his nervous system in a way that cannot be reversed. Now he sits in a stone cottage on the Icelandic coast, writing the account of what happened in the seventh Moleskine with a pen that shakes when he sets it down. Bilateral tremor. 111.2 Hz. Permanent.\n\nWhat he is writing is both confession and instruction manual.\n\nThe Premonstratensian monks did not simply guard the frequency. They prepared for it. A fifteenth-century reading list recovered from a Charles University archive reveals twenty-three texts, Christian, Jewish, Hermetic, Islamic, required before any candidate could enter the crypt. The Ars Notoria. The Sefer Yetzirah. The Gospel of Mary. Twenty-three books to tune the mind before the frequency tuned the body.\n\nWhile Blake maps the preparation protocol from Iceland, Nadia holds the William Masters Foundation together from Kansas City, alone, at 5:12 every morning. Andrew Chen's algorithm has identified something no one expected. The mathematical relationships the medieval masters encoded in cathedral proportions, the nave heights at Chartres, the transept ratios at Reims, are not decorative. They are acoustic specifications. The cathedrals are instruments. They were always instruments.\n\nThe preparation is not about the frequency. The preparation is about the organism that will receive it.\n\nTwenty-three candidates are waiting.",
    shortDesc:
      "Blake maps the preparation protocol from an Iceland cottage while Andrew's algorithm decodes the acoustic architecture of medieval cathedrals.",
    excerpt:
      "Not just the stack. They had the body positions. The notae specify which body orientation produces the optimal coupling for each harmonic. They mapped the human body as an acoustic instrument and wrote the tuning manual.",
    keywords: ["Iceland", "Ars Notoria", "Chartres cathedral", "harmonic", "preparation protocol", "tremor"],
    buyLinks: [
      { label: "Amazon (Kindle)", url: `https://www.amazon.com/dp/${BUY_LINKS.MX2_KINDLE_ASIN}`, format: "Ebook" },
      { label: "Amazon (Paperback)", url: "https://www.amazon.com/dp/B0H2JM96QG", format: "Paperback" },
      { label: "Amazon (Hardcover)", url: "https://www.amazon.com/dp/B0GZCMNDSR", format: "Hardcover" },
      { label: "IngramSpark (PB)", url: "https://shop.ingramspark.com/b/084?params=tQ1ogc5ZoVGesfjTi07TDRzxnZu6iGrMQZwwoLpr8H0", format: "Paperback" },
      { label: "IngramSpark (HC)", url: "https://shop.ingramspark.com/b/084?params=jbxhmyTXaZYP9tOaUe5x3PaTlo0m50dkqx0QIcP0kQO", format: "Hardcover" },
      { label: "Bookshop.org", url: "https://bookshop.org", format: "Paperback" },
    ],
  },
  {
    slug: "the-kingdom",
    volume: 3,
    series: "Masters X",
    title: "Masters X",
    subtitle: "The Kingdom",
    coverImage: "/covers/book3-paperback.png",
    coverImageHC: "/covers/book3-hardcover-v3.png",
    coverImagePB: "/covers/book3-paperback.png",
    qrCodePB: "/media/qr3.png",
    isbn_hc: "9798295812705",
    isbn_pb: "9798256010072",
    isbn_ebook: "9798256009809", // Ebook ISBN
    asin_hc: "B0GZCX3L8S",
    asin_pb: "B0H2L5Y1B3",
    asin_ebook: BUY_LINKS.MX3_KINDLE_ASIN,
    price_ebook: BUY_LINKS.MX3_KINDLE_PRICE,
    pageCount: 362, // From printed interior proof
    description:
      "Blake Masters returns to Kansas City with a restructured nervous system, a preparation protocol that can safely expand human consciousness, and an argument he cannot answer.\n\nFather Crane has published a theological critique in Theological Studies that the Foundation cannot refute. If the frequency is what Jesus taught, if the kingdom of God within you is a technical description of human acoustic resonance, then the fifty-two-week preparation protocol is gatekeeping prayer. Every week a candidate spends in preparation is a week a suffering person is denied access to their own fundamental frequency.\n\nBlake knows Crane is right. The preparation IS gatekeeping. But the alternative is three seizures and two cardiac events and a 34% adverse event rate and the institutional disaster that follows when knowledge moves faster than readiness.\n\nTwenty-three candidates. Seventy-two hours. A limestone chamber beneath Kansas City where the frequency has been resonating since before the city was built.\n\nFour hundred and twelve listening sites in sixty-one countries. Eleven thousand participants. And a man sitting alone, writing in the ninth Moleskine with hands that tremble at 111.2 Hz:\n\nThe gate is not arbitrary. The gate is the body. The body requires time. This is not theology. This is physics. This is love.",
    shortDesc:
      "The demonstration. The open-source release. 1.2 million downloads. The question the trilogy has been building toward: who gets access to their own fundamental frequency?",
    excerpt:
      "The gate is not arbitrary. The gate is the body. The body requires time. This is not theology. This is physics. This is love.",
    keywords: ["Kansas City", "limestone chamber", "listening groups", "open-source", "consciousness", "Father Crane"],
    buyLinks: [
      { label: "Amazon (Kindle)", url: `https://www.amazon.com/dp/${BUY_LINKS.MX3_KINDLE_ASIN}`, format: "Ebook" },
      { label: "Amazon (Paperback)", url: "https://www.amazon.com/dp/B0H2L5Y1B3", format: "Paperback" },
      { label: "Amazon (Hardcover)", url: "https://www.amazon.com/dp/B0GZCX3L8S", format: "Hardcover" },
      { label: "IngramSpark (PB)", url: "https://shop.ingramspark.com/b/084?params=xkYCcaKlPEx7bhKAnxXKal6Yo1SWaPR9bZLFI0lrzsK", format: "Paperback" },
      { label: "IngramSpark (HC)", url: "https://shop.ingramspark.com/b/084?params=9U4mGdswEJmFH7KEFg6ksvEDygOX4FAcr2zBs7eH72i", format: "Hardcover" },
      { label: "Bookshop.org", url: "https://bookshop.org", format: "Paperback" },
    ],
  },
  {
    slug: "omnibus",
    volume: 4,
    series: "Masters X",
    title: "Masters X",
    subtitle: "Omnibus Edition",
    coverImage: "/covers/omnibus-hardcover-v3.png",
    coverImageHC: "/covers/omnibus-hardcover-v3.png",
    coverImagePB: "/covers/omnibus-hardcover-v3.png",
    isbn_hc: "9798295884412",
    isbn_pb: "9798256072704",
    asin_hc: "B0H364814B",
    asin_ebook: null, // No ebook version
    price_hc_amazon: "49.99",
    price_hc_is: "29.99",
    pageCount: 736, // Total trilogy page count
    description:
      "All three volumes collected in a single monumental volume. The complete Masters X Trilogy in one book, available in both hardcover and paperback editions.",
    shortDesc:
      "The complete Masters X Trilogy collected in a single monumental volume.",
    excerpt:
      "The gate is not arbitrary. The gate is the body.",
    keywords: ["Masters X Omnibus", "collected edition", "acoustic frequency"],
    buyLinks: [
      { label: "Amazon (Hardcover)", url: "https://www.amazon.com/dp/B0H364814B", format: "Hardcover" },
      { label: "IngramSpark (PB)", url: "https://shop.ingramspark.com/b/084?params=QCSm4Cs8X0r8XkWm865RXOqXWvU4FbMlEf4GhiViHuy", format: "Paperback" },
      { label: "IngramSpark (HC)", url: "https://shop.ingramspark.com/b/084?params=5euticmifKEyNYtkmPSmmxiTwypmN5nErByeUkomLfk", format: "Hardcover" },
    ],
  },
  {
    slug: "hawkes-monograph",
    series: "John Hawkes Critical Study",
    title: "Innocence, Desire, and the Architecture of the Fall",
    subtitle: "The Grape and Its Counter-Symbols in the Fiction of John Hawkes",
    coverImage: "/covers/hawkes-paperback.png",
    coverImageHC: "/covers/hawkes-hardcover.png",
    coverImagePB: "/covers/hawkes-paperback.png",
    isbn_hc: "9798295777622", // Hardcover ISBN
    isbn_pb: "9798349308444", // Paperback ISBN
    isbn_ebook: "9798295778926",
    asin_ebook: null,
    price_ebook: "9.99",
    pageCount: 90, // Reconciled from printed proof interior
    description:
      "John Hawkes is among the most challenging and least understood novelists of the twentieth century. His fiction operates through a symbolic register so dense, so precisely constructed, that conventional thematic criticism tends to slide off its surface. What Holloway's monograph proposes is a different methodology: to trace a single, seemingly peripheral image — the grape — through Hawkes's entire fictional career, and to discover that the grape is not peripheral at all.\n\nThe grape functions in Hawkes's fiction as a counter-symbol to the Christian tradition of grace. Where the liturgical tradition makes the grape sacred — the wine of communion, the blood of transformation — Hawkes uses the grape to mark the moments when his characters are most fully themselves, most fully animal, most fully present in the irreducible fact of their embodiment. Grace, in Hawkes, is not transcendence. It is immanence. It is the weight of the body against the earth.\n\nThe monograph traces this argument across seventeen novels, from The Cannibal (1949) through An Irish Eye (1997), with particular attention to The Lime Twig, Second Skin, The Blood Oranges, and the later trilogy (Travesty, The Passion Artist, Virginie: Her Two Lives).",
    shortDesc:
      "A critical and quantitative analysis of the repeating symbolic architectures across John Hawkes's novel corpus.",
    excerpt:
      "The grape appears 129 times across 17 novels. It is the most frequent non-human image in the Hawkes canon. This is not accident. This is architecture.",
    keywords: ["John Hawkes", "literary criticism", "symbolic architecture", "grape motif"],
    buyLinks: [
      { label: "IngramSpark (PB)", url: "https://shop.ingramspark.com/b/084?params=jXe3ooeHGvu40MxStyBhBq3zG9GDnsMEoktYWjm0boo", format: "Paperback" },
      { label: "IngramSpark (HC)", url: "https://shop.ingramspark.com/b/084?params=cFmJXOovjW3SXqwinBStngm3FhivplmhE85eUOxrPve", format: "Hardcover" },
    ],
  }
];

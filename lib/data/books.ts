// Canonical book data derived from Ingram listing details and manuscript ISBNs
export interface BookLink {
  label: string;
  url: string;
  format?: string;
}

export interface Book {
  slug: string;
  volume: number;
  series: string;
  title: string;
  subtitle: string;
  coverImage: string;      // Default display cover (Paperback)
  coverImageHC: string;    // Hardcover cover path
  coverImagePB: string;    // Paperback cover path
  isbn_hc?: string;
  isbn_pb?: string;
  isbn_ebook?: string;
  asin_hc?: string;
  asin_pb?: string;
  pageCount: number;
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
    coverImage: "/covers/book1-pb.png",
    coverImageHC: "/covers/book1-hc-v2.png",
    coverImagePB: "/covers/book1-pb.png",
    isbn_hc: "9798295800801",
    isbn_pb: "9798256008048",
    isbn_ebook: "9798256008819",
    asin_hc: "B0GY7HJPYB",
    asin_pb: "B0H2GQX2G3",
    pageCount: 200,
    description:
      "His grandfather paid for a safety deposit box fifty-seven years in advance. Timed it to arrive at the exact moment Blake Masters would be ready to open it.\n\nInside: seven notebooks. Thirty years of research linking acoustic resonance to the architecture of human thought, documented by a man who saw the patterns from the cockpit of a U-2 spy plane at seventy thousand feet and spent his life proving they existed in bedrock beneath Kansas City.\n\nBlake is a graduate student who lost his security clearance, his job as a guard at SubTropolis, and the last person who tried to love him, all because he photographed geometric carvings in a tunnel that no official map acknowledges. They match his grandfather's notebooks exactly. They predate the limestone by millennia.\n\nThen a woman appears. Sister Nadia Volkov. Orphaned in Lviv, raised by Keeper nuns in a Prague convent, translating thirteenth-century Latin by the age of twelve. She has a PhD in medieval history and a dissertation arguing that grimoires are cognitive technologies. She arrives with Thai food and bandages and a warning: the people who killed his father want what is inside that box.\n\nBeneath the Strahov Library in Prague, the Premonstratensian monks guarded a sealed crypt for seven centuries. A thirteenth-century monk had scattered a single truth across seven cities, because what he found in the frequency was too dangerous to keep in one place, and too important to destroy.\n\nBlake and Nadia are about to open it.\n\nThe cost of perception is everything ordinary.",
    shortDesc:
      "A graduate student's inheritance unlocks seven notebooks of classified acoustic research — and the medieval tradition that encoded it.",
    excerpt:
      "The cross-references. Between cave carvings and classified aerospace research. Blake, your grandfather was reverse-engineering antenna designs from petroglyphs. Those aren't diagrams, they're technical specifications.",
    keywords: ["acoustic frequency", "consciousness", "medieval manuscripts", "Kansas City", "Prague", "Strahov Library"],
    buyLinks: [
      { label: "Amazon (Paperback)", url: "https://www.amazon.com/dp/B0H2GQX2G3", format: "Paperback" },
      { label: "Amazon (Hardcover)", url: "https://www.amazon.com/dp/B0GY7HJPYB", format: "Hardcover" },
      { label: "IngramSpark", url: "https://www.ingramcontent.com", format: "Paperback" },
      { label: "Bookshop.org", url: "https://bookshop.org", format: "Paperback" },
    ],
  },
  {
    slug: "the-grimoire",
    volume: 2,
    series: "Masters X",
    title: "Masters X",
    subtitle: "The Grimoire",
    coverImage: "/covers/book2-pb.png",
    coverImageHC: "/covers/book2-hc-v2.png",
    coverImagePB: "/covers/book2-pb.png",
    isbn_hc: "9798295812675",
    isbn_pb: "9798256009953",
    isbn_ebook: "9798256009625",
    asin_hc: "B0GZCMNDSR",
    asin_pb: "B0H2JM96QG",
    pageCount: 256,
    description:
      "The frequency is real. Blake heard it in the Strahov crypt. It restructured his nervous system in a way that cannot be reversed. Now he sits in a stone cottage on the Icelandic coast, writing the account of what happened in the seventh Moleskine with a pen that shakes when he sets it down. Bilateral tremor. 111.2 Hz. Permanent.\n\nWhat he is writing is both confession and instruction manual.\n\nThe Premonstratensian monks did not simply guard the frequency. They prepared for it. A fifteenth-century reading list recovered from a Charles University archive reveals twenty-three texts — Christian, Jewish, Hermetic, Islamic — required before any candidate could enter the crypt. The Ars Notoria. The Sefer Yetzirah. The Gospel of Mary. Twenty-three books to tune the mind before the frequency tuned the body.\n\nWhile Blake maps the preparation protocol from Iceland, Nadia holds the William Masters Foundation together from Kansas City, alone, at 5:12 every morning. Andrew Chen's algorithm has identified something no one expected. The mathematical relationships the medieval masters encoded in cathedral proportions — the nave heights at Chartres, the transept ratios at Reims — are not decorative. They are acoustic specifications. The cathedrals are instruments. They were always instruments.\n\nThe preparation is not about the frequency. The preparation is about the organism that will receive it.\n\nTwenty-three candidates are waiting.",
    shortDesc:
      "Blake maps the preparation protocol from an Iceland cottage while Andrew's algorithm decodes the acoustic architecture of medieval cathedrals.",
    excerpt:
      "Not just the stack. They had the body positions. The notae specify which body orientation produces the optimal coupling for each harmonic. They mapped the human body as an acoustic instrument and wrote the tuning manual.",
    keywords: ["Iceland", "Ars Notoria", "Chartres cathedral", "harmonic", "preparation protocol", "tremor"],
    buyLinks: [
      { label: "Amazon (Paperback)", url: "https://www.amazon.com/dp/B0H2JM96QG", format: "Paperback" },
      { label: "Amazon (Hardcover)", url: "https://www.amazon.com/dp/B0GZCMNDSR", format: "Hardcover" },
      { label: "IngramSpark", url: "https://www.ingramcontent.com", format: "Paperback" },
      { label: "Bookshop.org", url: "https://bookshop.org", format: "Paperback" },
    ],
  },
  {
    slug: "the-kingdom",
    volume: 3,
    series: "Masters X",
    title: "Masters X",
    subtitle: "The Kingdom",
    coverImage: "/covers/book3-pb.png",
    coverImageHC: "/covers/book3-hc-v2.png",
    coverImagePB: "/covers/book3-pb.png",
    isbn_hc: "9798295812705",
    isbn_pb: "9798256010072",
    isbn_ebook: "9798256009809",
    asin_hc: "B0GZCX3L8S",
    asin_pb: "B0H2L5Y1B3",
    pageCount: 178,
    description:
      "Blake Masters returns to Kansas City with a restructured nervous system, a preparation protocol that can safely expand human consciousness, and an argument he cannot answer.\n\nFather Crane has published a theological critique in Theological Studies that the Foundation cannot refute. If the frequency is what Jesus taught, if the kingdom of God within you is a technical description of human acoustic resonance, then the fifty-two-week preparation protocol is gatekeeping prayer. Every week a candidate spends in preparation is a week a suffering person is denied access to their own fundamental frequency.\n\nBlake knows Crane is right. The preparation IS gatekeeping. But the alternative is three seizures and two cardiac events and a 34% adverse event rate and the institutional disaster that follows when knowledge moves faster than readiness.\n\nTwenty-three candidates. Seventy-two hours. A limestone chamber beneath Kansas City where the frequency has been resonating since before the city was built.\n\nFour hundred and twelve listening sites in sixty-one countries. Eleven thousand participants. And a man sitting alone, writing in the ninth Moleskine with hands that tremble at 111.2 Hz:\n\nThe gate is not arbitrary. The gate is the body. The body requires time. This is not theology. This is physics. This is love.",
    shortDesc:
      "The demonstration. The open-source release. 1.2 million downloads. The question the trilogy has been building toward: who gets access to their own fundamental frequency?",
    excerpt:
      "The gate is not arbitrary. The gate is the body. The body requires time. This is not theology. This is physics. This is love.",
    keywords: ["Kansas City", "limestone chamber", "listening groups", "open-source", "consciousness", "Father Crane"],
    buyLinks: [
      { label: "Amazon (Paperback)", url: "https://www.amazon.com/dp/B0H2L5Y1B3", format: "Paperback" },
      { label: "Amazon (Hardcover)", url: "https://www.amazon.com/dp/B0GZCX3L8S", format: "Hardcover" },
      { label: "IngramSpark", url: "https://www.ingramcontent.com", format: "Paperback" },
      { label: "Bookshop.org", url: "https://bookshop.org", format: "Paperback" },
    ],
  },
];

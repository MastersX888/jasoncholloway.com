export type BlogPostStatus = "published" | "hold" | "draft";

export interface BlogPost {
  slug: string;
  seriesNumber: number;
  title: string;
  dek: string;
  status: BlogPostStatus;
  datePublished: string;
  ogImage: string;
  fieldNotes: string[];
  metaTitle: string;
  metaDescription: string;
}

/** Published on jasoncholloway.com/blog/ — post 05 (Billings) on HOLD until author review. */
export const blogPosts: BlogPost[] = [
  {
    slug: "the-frequency-that-was-already-there",
    seriesNumber: 1,
    title: "The Frequency That Was Already There",
    dek: "111.2 Hz runs under every page of the Distribution File. The archaeoacoustics behind it is real. The decimal is fiction.",
    status: "published",
    datePublished: "2026-07-23",
    ogImage: "/og/field-notes/111-hz.png",
    fieldNotes: ["/field-notes/111-hz/", "/field-notes/cymatics/"],
    metaTitle: "The Frequency That Was Already There — 111.2 Hz Explained",
    metaDescription:
      "111.2 Hz runs under every page of the Masters X Distribution File. The archaeoacoustics behind it is real. The decimal is fiction. The honest account.",
  },
  {
    slug: "the-grimoire-that-was-a-study-aid",
    seriesNumber: 2,
    title: "The Grimoire That Was Actually a Study Aid",
    dek: "The Ars Notoria is a real medieval manual for accelerated learning. In Masters X, the only invention is that it works.",
    status: "published",
    datePublished: "2026-07-23",
    ogImage: "/og/field-notes/ars-notoria.png",
    fieldNotes: ["/field-notes/ars-notoria/", "/field-notes/cymatics/"],
    metaTitle: "The Grimoire That Was Actually a Study Aid — Ars Notoria",
    metaDescription:
      "The Ars Notoria is a real 13th-century manual for accelerated learning, condemned as cheating. In Masters X, the only invention is that it works.",
  },
  {
    slug: "sound-into-form-hans-jenny",
    seriesNumber: 3,
    title: "Sound Into Form: What Hans Jenny Actually Proved",
    dek: "Chladni figures, Jenny's cymatics triad, and the exact sentence where the record ends and the Masters X fiction begins.",
    status: "published",
    datePublished: "2026-07-23",
    ogImage: "/og/field-notes/cymatics.png",
    fieldNotes: ["/field-notes/cymatics/", "/field-notes/ars-notoria/"],
    metaTitle: "Sound Into Form: What Hans Jenny Actually Proved",
    metaDescription:
      "Chladni figures, Jenny's cymatics triad, and the exact sentence where the record ends and the Masters X fiction begins. The honest cymatics explainer.",
  },
  {
    slug: "why-kansas-city",
    seriesNumber: 4,
    title: "Why Kansas City? The Ground Itself Is Significant",
    dek: "Five independent traditions across two millennia identified the KC/Independence corridor as sacred ground.",
    status: "published",
    datePublished: "2026-07-23",
    ogImage: "/og/field-notes/kansas-city-locations.png",
    fieldNotes: ["/field-notes/kansas-city-locations/", "/field-notes/subtropolis/"],
    metaTitle: "Why Kansas City? The Ground Itself Is Significant",
    metaDescription:
      "Five independent traditions across two millennia identified the KC/Independence corridor as sacred ground. The research behind the Masters X setting.",
  },
  {
    slug: "the-man-who-built-a-city-under-zion",
    seriesNumber: 5,
    title: "The Man Who Built a City Under Zion",
    dek: "Roger Billings — HOLD. Not published until author reviews sourcing.",
    status: "hold",
    datePublished: "2026-07-23",
    ogImage: "/og/field-notes/subtropolis.png",
    fieldNotes: ["/field-notes/subtropolis/", "/field-notes/kansas-city-locations/"],
    metaTitle: "The Man Who Built a City Under Zion",
    metaDescription: "HOLD — pending author review of Roger Billings sourcing.",
  },
  {
    slug: "three-factions-one-declassified-document",
    seriesNumber: 6,
    title: "Three Factions, One Declassified Document",
    dek: "CIA-RDP96-00792R (1984): the declassified translation whose three camps became the Masters X factions.",
    status: "published",
    datePublished: "2026-07-23",
    ogImage: "/og/field-notes/hub.png",
    fieldNotes: [],
    metaTitle: "Three Factions, One Declassified Document",
    metaDescription:
      "CIA-RDP96-00792R (1984): the declassified translation whose three camps — suppress, verify, weaponize — became the Masters X factions. The record.",
  },
  {
    slug: "the-stone-remembers",
    seriesNumber: 7,
    title: "The Stone Remembers: A Fire in Westport",
    dek: "In 2011 a Kansas City church burned to its 1904 limestone walls — and the walls stood.",
    status: "published",
    datePublished: "2026-07-23",
    ogImage: "/og/field-notes/kansas-city-locations.png",
    fieldNotes: ["/field-notes/kansas-city-locations/"],
    metaTitle: "The Stone Remembers: A Fire in Westport",
    metaDescription:
      "In 2011 a Kansas City church burned to its 1904 limestone walls — and the walls stood. A correction, a fire, and the record behind the trilogy's line.",
  },
  {
    slug: "a-document-that-cannot-be-unreleased",
    seriesNumber: 8,
    title: "A Document That Cannot Be Un-Released",
    dek: "Masters X ends with a file: 247 pages, CC0, midnight. On the ethics of giving knowledge away.",
    status: "published",
    datePublished: "2026-07-23",
    ogImage: "/og/field-notes/hub.png",
    fieldNotes: [],
    metaTitle: "A Document That Cannot Be Un-Released",
    metaDescription:
      "Masters X ends with a file: 247 pages, CC0, midnight. On the ethics of giving knowledge away — and how to reprint a fictional document honestly.",
  },
];

const slugToFile: Record<string, string> = {
  "the-frequency-that-was-already-there": "01_frequency_that_was_already_there",
  "the-grimoire-that-was-a-study-aid": "02_grimoire_study_aid",
  "sound-into-form-hans-jenny": "03_sound_into_form",
  "why-kansas-city": "04_why_kansas_city",
  "the-man-who-built-a-city-under-zion": "05_man_under_zion",
  "three-factions-one-declassified-document": "06_three_factions_declassified",
  "the-stone-remembers": "07_stone_remembers",
  "a-document-that-cannot-be-unreleased": "08_document_cannot_be_unreleased",
};

export function getPublishedBlogPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.status === "published");
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogMarkdownFile(slug: string): string | undefined {
  return slugToFile[slug];
}

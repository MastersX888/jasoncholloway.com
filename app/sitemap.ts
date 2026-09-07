import type { MetadataRoute } from "next";
import { books } from "@/lib/data/books";
import { fieldNotes } from "@/lib/data/fieldNotes";
import { lastModified } from "@/lib/seo/lastModified";

export const dynamic = "force-static";

/** All sitemap URLs use trailing slashes to match next.config trailingSlash + page canonicals. */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jasoncholloway.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: lastModified("app/page.tsx"), changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/about/`, lastModified: lastModified("app/about/page.tsx"), changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/books/`, lastModified: lastModified("app/books/page.tsx"), changeFrequency: "monthly", priority: 0.95 },
    { url: `${baseUrl}/books/masters-x/`, lastModified: lastModified("app/books/masters-x/page.tsx"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/books/masters-x/omnibus/`, lastModified: lastModified("app/books/masters-x/omnibus/page.tsx"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/note-on-the-text/`, lastModified: lastModified("app/note-on-the-text/page.tsx"), changeFrequency: "yearly", priority: 0.75 },
    { url: `${baseUrl}/books/hawkes-monograph/`, lastModified: lastModified("app/books/hawkes-monograph/page.tsx"), changeFrequency: "yearly", priority: 0.9 },
    { url: `${baseUrl}/books/books-like-foucaults-pendulum/`, lastModified: lastModified("app/books/books-like-foucaults-pendulum/page.tsx"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/books/books-like-the-historian/`, lastModified: lastModified("app/books/books-like-the-historian/page.tsx"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/books/manuscripts-that-shouldnt-exist/`, lastModified: lastModified("app/books/manuscripts-that-shouldnt-exist/page.tsx"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/chamber/`, lastModified: lastModified("app/chamber/page.tsx"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/chamber/folio-visualizer/`, lastModified: lastModified("app/chamber/folio-visualizer/page.tsx"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/global-map/`, lastModified: lastModified("app/chamber/global-map/page.tsx"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/harmonic-stack/`, lastModified: lastModified("app/chamber/harmonic-stack/page.tsx"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/harmonic-derivations/`, lastModified: lastModified("app/chamber/harmonic-derivations/page.tsx"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/reading-sequence/`, lastModified: lastModified("app/chamber/reading-sequence/page.tsx"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/research-archive/`, lastModified: lastModified("app/chamber/research-archive/page.tsx"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/schumann-baseline/`, lastModified: lastModified("app/chamber/schumann-baseline/page.tsx"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/tremor-analysis/`, lastModified: lastModified("app/chamber/tremor-analysis/page.tsx"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/contact/`, lastModified: lastModified("app/contact/page.tsx"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/returns/`, lastModified: lastModified("app/returns/page.tsx"), changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/field-notes/`, lastModified: lastModified("app/field-notes/page.tsx"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/sitemap/`, lastModified: lastModified("app/sitemap/page.tsx"), changeFrequency: "weekly", priority: 0.5 },
  ];

  const trilogyBooks = books.filter((b) => b.series === "Masters X" && b.slug !== "omnibus");
  const bookRoutes: MetadataRoute.Sitemap = trilogyBooks.map((book) => ({
    url: `${baseUrl}/books/masters-x/${book.slug}/`,
    lastModified: lastModified("app/books/masters-x/[slug]/page.tsx"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Derived from fieldNotes.ts so hub ↔ sitemap stay in lockstep (12 essays).
  const fieldNoteRoutes: MetadataRoute.Sitemap = fieldNotes.map((note) => ({
    url: `${baseUrl}/field-notes/${note.slug}/`,
    lastModified: lastModified(`app/field-notes/${note.slug}/page.tsx`),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...bookRoutes, ...fieldNoteRoutes];
}

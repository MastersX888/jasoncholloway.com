import type { MetadataRoute } from "next";
import { books } from "@/lib/data/books";
import { fieldNotes } from "@/lib/data/fieldNotes";
import { momentPath, novelMoments } from "@/lib/data/moments";

export const dynamic = "force-static";

/** All sitemap URLs use trailing slashes to match next.config trailingSlash + page canonicals. */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jasoncholloway.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/about/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/books/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.95 },
    { url: `${baseUrl}/books/masters-x/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/books/masters-x/omnibus/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/books/masters-x/moments/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.82 },
    { url: `${baseUrl}/books/hawkes-monograph/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.9 },
    { url: `${baseUrl}/books/books-like-foucaults-pendulum/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/chamber/folio-visualizer/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/global-map/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/harmonic-stack/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/harmonic-derivations/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/reading-sequence/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/research-archive/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/schumann-baseline/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/chamber/tremor-analysis/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/contact/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/returns/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/field-notes/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/sitemap/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
  ];

  const trilogyBooks = books.filter((b) => b.series === "Masters X" && b.slug !== "omnibus");
  const bookRoutes: MetadataRoute.Sitemap = trilogyBooks.map((book) => ({
    url: `${baseUrl}/books/masters-x/${book.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Derived from fieldNotes.ts so hub ↔ sitemap stay in lockstep (12 essays).
  const fieldNoteRoutes: MetadataRoute.Sitemap = fieldNotes.map((note) => ({
    url: `${baseUrl}/field-notes/${note.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const momentRoutes: MetadataRoute.Sitemap = novelMoments.map((moment) => ({
    url: `${baseUrl}${momentPath(moment.slug)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...bookRoutes, ...momentRoutes, ...fieldNoteRoutes];
}

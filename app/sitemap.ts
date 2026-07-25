import type { MetadataRoute } from "next";
import { books } from "@/lib/data/books";
import { getPublishedBlogPosts } from "@/lib/data/blogPosts";

export const dynamic = "force-static";

/** All sitemap URLs use trailing slashes to match next.config trailingSlash + page canonicals. */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jasoncholloway.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/about/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/blog/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/books/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.95 },
    { url: `${baseUrl}/books/masters-x/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/books/masters-x/omnibus/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
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
    { url: `${baseUrl}/field-notes/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/sitemap/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
  ];

  const trilogyBooks = books.filter((b) => b.series === "Masters X" && b.slug !== "omnibus");
  const bookRoutes: MetadataRoute.Sitemap = trilogyBooks.map((book) => ({
    url: `${baseUrl}/books/masters-x/${book.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const fieldNoteSlugs = [
    "subtropolis",
    "111-hz",
    "voynich-manuscript",
    "ars-notoria",
    "strahov-monastery",
    "codex-gigas",
    "kansas-city-locations",
    "oscar-01",
    "u2-test-pilots",
    "cymatics",
    "gospel-of-thomas",
    "meramec-caverns",
  ];
  const fieldNoteRoutes: MetadataRoute.Sitemap = fieldNoteSlugs.map((slug) => ({
    url: `${baseUrl}/field-notes/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const publishedBlogPosts = getPublishedBlogPosts();
  const blogRoutes: MetadataRoute.Sitemap = publishedBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.datePublished),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...bookRoutes, ...fieldNoteRoutes, ...blogRoutes];
}

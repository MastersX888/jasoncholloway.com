import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Dates are fixed rather than `new Date()`: stamping every URL as changed on
 * every deploy is the fastest way to teach Google to ignore `lastmod`. Bump a
 * date when that page's content actually changes.
 */
const PAGE_UPDATED = new Date("2026-09-07");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://seventhcitypress.com";

  return [
    { url: `${baseUrl}/`, lastModified: PAGE_UPDATED, changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/contact/`, lastModified: PAGE_UPDATED, changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/press-kit/Masters_X_Press_Kit.pdf`, lastModified: PAGE_UPDATED, changeFrequency: "yearly", priority: 0.5 },
  ];
}

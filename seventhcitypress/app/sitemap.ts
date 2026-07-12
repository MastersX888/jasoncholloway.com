import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://seventhcitypress.com";

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/contact/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/press-kit/Masters_X_Press_Kit.pdf`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];
}

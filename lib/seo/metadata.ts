import type { Metadata } from "next";

export const SITE_URL = "https://jasoncholloway.com";
export const SITE_NAME = "Jason Carroll Holloway";

export type SeoImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

/** 1200×630 static file in public/ — served with a real image/png content type. */
export const DEFAULT_OG_IMAGE: SeoImage = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Jason Carroll Holloway — Masters X Trilogy, published by Seventh City Press",
};

export type BuildMetadataInput = {
  /** Page title. Passed through the layout's `%s | Jason Carroll Holloway` template unless `titleAbsolute`. */
  title: string;
  titleAbsolute?: boolean;
  description: string;
  /** Site-absolute route with a trailing slash, e.g. `/books/masters-x/`. */
  path: string;
  socialTitle?: string;
  socialDescription?: string;
  image?: SeoImage;
  ogType?: "website" | "article" | "book" | "profile";
  keywords?: string[];
  noindex?: boolean;
};

/**
 * Single source of truth for per-page metadata.
 *
 * Next.js resolves `openGraph` and `twitter` independently: a page that sets a
 * partial `openGraph` replaces the parent's entirely, and `twitter` never derives
 * from `openGraph`. Deriving both from the same inputs here is what keeps
 * og:url/og:image and the Twitter card from falling back to the site defaults.
 */
export function buildMetadata({
  title,
  titleAbsolute = false,
  description,
  path,
  socialTitle,
  socialDescription,
  image = DEFAULT_OG_IMAGE,
  ogType = "website",
  keywords,
  noindex = false,
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  // Share cards get the same brand-suffixed string the browser tab shows, so a
  // bare page title like "About" never ships as an og:title on its own.
  const cardTitle = socialTitle ?? (titleAbsolute ? title : `${title} | ${SITE_NAME}`);
  const cardDescription = socialDescription ?? description;

  const shared = {
    locale: "en_US",
    siteName: SITE_NAME,
    url,
    title: cardTitle,
    description: cardDescription,
    images: [image],
  };

  const openGraph: Metadata["openGraph"] =
    ogType === "article"
      ? { ...shared, type: "article" }
      : ogType === "book"
        ? { ...shared, type: "book" }
        : ogType === "profile"
          ? { ...shared, type: "profile" }
          : { ...shared, type: "website" };

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: cardTitle,
      description: cardDescription,
      images: [image.url],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

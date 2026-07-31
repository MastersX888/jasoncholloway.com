/** Mirror of ../lib/seo/metadata.ts — keep in sync. */
import type { Metadata } from "next";

export const SITE_URL = "https://seventhcitypress.com";
export const SITE_NAME = "Seventh City Press";

export type SeoImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

/** 1200×630 static file in public/. */
export const DEFAULT_OG_IMAGE: SeoImage = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Seventh City Press — independent literary imprint, Kansas City",
};

export type BuildMetadataInput = {
  title: string;
  titleAbsolute?: boolean;
  description: string;
  /** Site-absolute route with a trailing slash, e.g. `/contact/`. */
  path: string;
  socialTitle?: string;
  socialDescription?: string;
  image?: SeoImage;
  ogType?: "website" | "article" | "book" | "profile";
  noindex?: boolean;
};

/**
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
  noindex = false,
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
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

  // `openGraph` is a discriminated union on `type`, so each branch is spelled out
  // rather than spreading a union-typed `type` in.
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

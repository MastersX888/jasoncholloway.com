/**
 * Canonical social profile URLs — single source for footers, about/contact, JSON-LD.
 * Keep seventhcitypress/lib/data/social.ts in sync when updating.
 */

export const AUTHOR_SITE_URL = "https://jasoncholloway.com/";
export const IMPRINT_SITE_URL = "https://seventhcitypress.com/";

export const SOCIAL_INSTAGRAM_URL = "https://www.instagram.com/jasonhollowaykc/";
export const SOCIAL_FACEBOOK_URL = "https://www.facebook.com/jasonhollowaykc";
export const SOCIAL_X_URL = "https://x.com/jasonhollowaykc";
export const SOCIAL_PINTEREST_URL = "https://www.pinterest.com/seventhcitypress/";
export const SOCIAL_YOUTUBE_URL = "";

/** X @handle for twitter:site / twitter:creator (with or without @) */
export const SOCIAL_X_HANDLE = "jasonhollowaykc";

export type SocialLink = {
  href: string;
  label: string;
  handle: string;
};

const SOCIAL_CATALOG: SocialLink[] = [
  { href: SOCIAL_INSTAGRAM_URL, label: "Instagram", handle: "@jasonhollowaykc" },
  { href: SOCIAL_FACEBOOK_URL, label: "Facebook", handle: "facebook.com/jasonhollowaykc" },
  { href: SOCIAL_X_URL, label: "X", handle: "@jasonhollowaykc" },
  { href: SOCIAL_PINTEREST_URL, label: "Pinterest", handle: "pinterest.com/seventhcitypress" },
  { href: SOCIAL_YOUTUBE_URL, label: "YouTube", handle: "" },
];

export type WebLink = {
  href: string;
  label: string;
};

export const WEB_PRESENCE_LINKS: WebLink[] = [
  { href: AUTHOR_SITE_URL, label: "jasoncholloway.com" },
  { href: IMPRINT_SITE_URL, label: "seventhcitypress.com" },
];

export function getActiveSocialLinks(): SocialLink[] {
  return SOCIAL_CATALOG.filter((link) => Boolean(link.href));
}

/** rel=me targets — helps platforms verify cross-links back to this site */
export function socialMeUrls(): string[] {
  return getActiveSocialLinks().map((link) => link.href);
}

/** schema.org Organization.sameAs on author site */
export function publisherSameAs(): string[] {
  return [IMPRINT_SITE_URL, ...socialMeUrls()];
}

/** Normalize "@handle" → "handle" for Next.js Metadata API */
export function xHandleForMetadata(handle: string): string | undefined {
  const trimmed = handle.trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
}

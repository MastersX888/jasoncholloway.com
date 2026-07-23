/**
 * Canonical social profile URLs — single source for footers, about/contact, JSON-LD.
 * Keep seventhcitypress/lib/data/social.ts in sync when updating.
 */

export const SOCIAL_INSTAGRAM_URL = "https://www.instagram.com/jasonhollowaykc/";
export const SOCIAL_FACEBOOK_URL = "https://www.facebook.com/jasonhollowaykc";
export const SOCIAL_X_URL = "https://x.com/jasonhollowaykc";
export const SOCIAL_YOUTUBE_URL = "";

/** X @handle for twitter:site / twitter:creator (with or without @) */
export const SOCIAL_X_HANDLE = "jasonhollowaykc";

export type SocialLink = {
  href: string;
  label: string;
};

export function getActiveSocialLinks(): SocialLink[] {
  return [
    { href: SOCIAL_INSTAGRAM_URL, label: "Instagram" },
    { href: SOCIAL_FACEBOOK_URL, label: "Facebook" },
    { href: SOCIAL_X_URL, label: "X" },
    { href: SOCIAL_YOUTUBE_URL, label: "YouTube" },
  ].filter((link) => Boolean(link.href));
}

/** Normalize "@handle" → "handle" for Next.js Metadata API */
export function xHandleForMetadata(handle: string): string | undefined {
  const trimmed = handle.trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
}

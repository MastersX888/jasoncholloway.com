/**
 * Social profile URLs — keep in sync with /lib/data/socialProfiles.ts (author site).
 */

export const SOCIAL_INSTAGRAM_URL = "https://www.instagram.com/jasonhollowaykc/";
export const SOCIAL_FACEBOOK_URL = "https://www.facebook.com/jasonhollowaykc";
export const SOCIAL_X_URL = "https://x.com/jasonhollowaykc";
export const SOCIAL_YOUTUBE_URL = "";
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

export function imprintSameAs(): string[] {
  return [
    "https://jasoncholloway.com/",
    ...(SOCIAL_FACEBOOK_URL ? [SOCIAL_FACEBOOK_URL] : []),
    ...(SOCIAL_INSTAGRAM_URL ? [SOCIAL_INSTAGRAM_URL] : []),
    ...(SOCIAL_X_URL ? [SOCIAL_X_URL] : []),
    ...(SOCIAL_YOUTUBE_URL ? [SOCIAL_YOUTUBE_URL] : []),
  ];
}

export function xHandleForMetadata(handle: string): string | undefined {
  const trimmed = handle.trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
}

/**
 * Social profile URLs — keep in sync with /lib/data/socialProfiles.ts (author site).
 */

export const AUTHOR_SITE_URL = "https://jasoncholloway.com/";
export const IMPRINT_SITE_URL = "https://seventhcitypress.com/";

export const SOCIAL_INSTAGRAM_URL = "https://www.instagram.com/jasonhollowaykc/";
export const SOCIAL_FACEBOOK_URL = "https://www.facebook.com/jasonhollowaykc";
export const SOCIAL_X_URL = "https://x.com/jasonhollowaykc";
export const SOCIAL_PINTEREST_URL = "https://www.pinterest.com/seventhcitypress/";
export const SOCIAL_YOUTUBE_URL = "";
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

export function socialMeUrls(): string[] {
  return getActiveSocialLinks().map((link) => link.href);
}

export function imprintSameAs(): string[] {
  return [
    AUTHOR_SITE_URL,
    ...(SOCIAL_FACEBOOK_URL ? [SOCIAL_FACEBOOK_URL] : []),
    ...(SOCIAL_INSTAGRAM_URL ? [SOCIAL_INSTAGRAM_URL] : []),
    ...(SOCIAL_X_URL ? [SOCIAL_X_URL] : []),
    ...(SOCIAL_PINTEREST_URL ? [SOCIAL_PINTEREST_URL] : []),
    ...(SOCIAL_YOUTUBE_URL ? [SOCIAL_YOUTUBE_URL] : []),
  ];
}

export function xHandleForMetadata(handle: string): string | undefined {
  const trimmed = handle.trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
}

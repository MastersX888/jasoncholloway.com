/**
 * Mirror of lib/data/socialProfiles.ts — keep in sync.
 */

export const AUTHOR_SITE_URL = "https://jasoncholloway.com/";
export const IMPRINT_SITE_URL = "https://seventhcitypress.com/";

export const SOCIAL_INSTAGRAM_URL = "https://www.instagram.com/jasonhollowaykc/";
export const SOCIAL_FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61588710027163";
export const SOCIAL_X_URL = "https://x.com/jasonhollowaykc";
export const SOCIAL_PINTEREST_URL = "https://www.pinterest.com/seventhcitypress/";
export const SOCIAL_BLUESKY_URL = "https://bsky.app/profile/seventhcitypress.bsky.social";
export const SOCIAL_GOODREADS_URL =
  "https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway";
export const SOCIAL_STORYGRAPH_URL =
  "https://app.thestorygraph.com/profile/jason_carroll_holloway";

export const SOCIAL_X_HANDLE = "jasonhollowaykc";

export type SocialLink = {
  href: string;
  label: string;
  handle: string;
};

const SOCIAL_CATALOG: SocialLink[] = [
  { href: SOCIAL_INSTAGRAM_URL, label: "Instagram", handle: "@jasonhollowaykc" },
  { href: SOCIAL_FACEBOOK_URL, label: "Facebook", handle: "Jason Carroll Holloway" },
  { href: SOCIAL_X_URL, label: "X", handle: "@jasonhollowaykc" },
  { href: SOCIAL_PINTEREST_URL, label: "Pinterest", handle: "@seventhcitypress" },
  { href: SOCIAL_BLUESKY_URL, label: "Bluesky", handle: "@seventhcitypress.bsky.social" },
  { href: SOCIAL_GOODREADS_URL, label: "Goodreads", handle: "Jason Carroll Holloway" },
  { href: SOCIAL_STORYGRAPH_URL, label: "StoryGraph", handle: "jason_carroll_holloway" },
];

export function getActiveSocialLinks(): SocialLink[] {
  return SOCIAL_CATALOG.filter((link) => Boolean(link.href));
}

export function socialMeUrls(): string[] {
  return getActiveSocialLinks().map((link) => link.href);
}

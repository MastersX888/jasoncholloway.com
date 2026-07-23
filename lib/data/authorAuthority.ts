/** Locked authority identifiers — keep in sync with CANON.md §1B */

export const AUTHOR_ISNI = "0000 0005 3044 7935";
export const AUTHOR_ISNI_URL = "https://isni.org/isni/0000000530447935";
export const AUTHOR_GOODREADS_URL =
  "https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway";
export const AUTHOR_WIKIDATA_URL = "https://www.wikidata.org/wiki/Q140275300";
export const IMPRINT_URL = "https://seventhcitypress.com/";
export const AUTHOR_AMAZON_STORE_URL =
  "https://www.amazon.com/stores/Jason-Holloway/author/B08P54N4XZ";

/**
 * Social media profiles — add handles here when accounts are confirmed live.
 * These are imported into JSON-LD sameAs arrays and footer components.
 *
 * Instagram:  https://www.instagram.com/<handle>/
 * Facebook:   https://www.facebook.com/<page-name>/
 * X/Twitter:  https://x.com/<handle>
 * YouTube:    https://www.youtube.com/@<handle>
 */
export const SOCIAL_INSTAGRAM_URL = ""; // e.g. "https://www.instagram.com/seventhcitypress/"
export const SOCIAL_FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61592288371057";
export const SOCIAL_X_URL = ""; // e.g. "https://x.com/jasoncholloway"
export const SOCIAL_YOUTUBE_URL = ""; // e.g. "https://www.youtube.com/@seventhcitypress"

/** Twitter/X @handle for twitter:site / twitter:creator meta tags */
export const SOCIAL_X_HANDLE = ""; // e.g. "@seventhcitypress"

/** schema.org Person.sameAs — canonical order for JSON-LD */
export const authorSameAs = [
  AUTHOR_GOODREADS_URL,
  AUTHOR_ISNI_URL,
  AUTHOR_WIKIDATA_URL,
  AUTHOR_AMAZON_STORE_URL,
  IMPRINT_URL,
  // Social profiles added below when handles are confirmed:
  ...(SOCIAL_INSTAGRAM_URL ? [SOCIAL_INSTAGRAM_URL] : []),
  ...(SOCIAL_FACEBOOK_URL ? [SOCIAL_FACEBOOK_URL] : []),
  ...(SOCIAL_X_URL ? [SOCIAL_X_URL] : []),
  ...(SOCIAL_YOUTUBE_URL ? [SOCIAL_YOUTUBE_URL] : []),
] as const;

export const authorIsniIdentifier = {
  "@type": "PropertyValue" as const,
  propertyID: "ISNI",
  value: AUTHOR_ISNI,
};

/** Mirror of ../lib/data/authorAuthority.ts — keep in sync */

export const AUTHOR_ISNI = "0000 0005 3044 7935";
export const AUTHOR_ISNI_URL = "https://isni.org/isni/0000000530447935";
export const AUTHOR_GOODREADS_URL =
  "https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway";
export const AUTHOR_WIKIDATA_URL = "https://www.wikidata.org/wiki/Q140275300";
/** Wikidata item for the Masters X Trilogy itself (distinct from the author item). */
export const SERIES_WIKIDATA_URL = "https://www.wikidata.org/wiki/Q140276114";
/** Open Library author — merge #1584949 resolved 2026-07-30. */
export const AUTHOR_OPEN_LIBRARY_ID = "OL16482975A";
export const AUTHOR_OPEN_LIBRARY_URL =
  "https://openlibrary.org/authors/OL16482975A/Jason_Carroll_Holloway";
export const IMPRINT_URL = "https://seventhcitypress.com/";
export const AUTHOR_AMAZON_STORE_URL =
  "https://www.amazon.com/stores/Jason-Holloway/author/B08P54N4XZ";
/**
 * Everand lists two author records (988394129 and 974299721). Only the record
 * below is linked; the duplicate is pending a vendor merge request.
 */
export const AUTHOR_EVERAND_URL =
  "https://www.everand.com/author/988394129/Jason-Carroll-Holloway";

export const AUTHOR_INSTAGRAM_URL = "https://www.instagram.com/jasonhollowaykc/";
export const AUTHOR_FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61588710027163";
export const AUTHOR_X_URL = "https://x.com/jasonhollowaykc";
export const IMPRINT_PINTEREST_URL = "https://www.pinterest.com/seventhcitypress/";

/** Canonical schema.org @id for the publisher — identical on both domains. */
export const ORGANIZATION_ID = "https://seventhcitypress.com/#organization";
/** Canonical schema.org @id for the author — identical on both domains. */
export const PERSON_ID = "https://jasoncholloway.com/#person";

export const imprintSameAs = [
  "https://jasoncholloway.com/",
  AUTHOR_FACEBOOK_URL,
  AUTHOR_INSTAGRAM_URL,
  AUTHOR_X_URL,
  IMPRINT_PINTEREST_URL,
] as const;

/**
 * schema.org Person.sameAs — canonical order for JSON-LD.
 * Person only: URLs that identify Jason Carroll Holloway.
 * Series Wikidata (Q140276114) belongs on BookSeries.sameAs — not Person.sameAs.
 */
export const authorSameAs = [
  AUTHOR_WIKIDATA_URL,
  AUTHOR_ISNI_URL,
  AUTHOR_OPEN_LIBRARY_URL,
  AUTHOR_GOODREADS_URL,
  AUTHOR_AMAZON_STORE_URL,
  AUTHOR_EVERAND_URL,
  IMPRINT_URL,
  AUTHOR_INSTAGRAM_URL,
  AUTHOR_FACEBOOK_URL,
  AUTHOR_X_URL,
  IMPRINT_PINTEREST_URL,
] as const;

export const authorIsniIdentifier = {
  "@type": "PropertyValue" as const,
  propertyID: "ISNI",
  value: AUTHOR_ISNI,
};

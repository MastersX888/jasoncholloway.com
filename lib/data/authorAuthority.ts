/** Locked authority identifiers — keep in sync with CANON.md §1B */

export const AUTHOR_ISNI = "0000 0005 3044 7935";
export const AUTHOR_ISNI_URL = "https://isni.org/isni/0000000530447935";
export const AUTHOR_GOODREADS_URL =
  "https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway";
export const AUTHOR_WIKIDATA_URL = "https://www.wikidata.org/wiki/Q140275300";
export const IMPRINT_URL = "https://seventhcitypress.com/";
export const AUTHOR_AMAZON_STORE_URL =
  "https://www.amazon.com/stores/Jason-Holloway/author/B08P54N4XZ";

/** schema.org Person.sameAs — canonical order for JSON-LD */
export const authorSameAs = [
  AUTHOR_GOODREADS_URL,
  AUTHOR_ISNI_URL,
  AUTHOR_WIKIDATA_URL,
  AUTHOR_AMAZON_STORE_URL,
  IMPRINT_URL,
] as const;

export const authorIsniIdentifier = {
  "@type": "PropertyValue" as const,
  propertyID: "ISNI",
  value: AUTHOR_ISNI,
};

// Amazon availability policy (author-confirmed, July 2026):
// The ONLY live Amazon listings are the three Masters X Kindle editions below.
// Print editions (PB/HC) are sold direct via IngramSpark and orderable
// anywhere books are sold via ISBN. Do NOT add print ASINs here.
//
// REMOVED (July 2026): HAWKES_KINDLE_ASIN "B072BLH7X7" — this was the
// repurposed legacy KDP listing that caused the Goodreads misattribution.
// The listing has been taken down; the Hawkes monograph has no Amazon edition.
export const BUY_LINKS = {
  // Kindle ASINs — the only live Amazon products
  MX1_KINDLE_ASIN: "B0H4KYMSM1",
  MX2_KINDLE_ASIN: "B0H4KQ4YQJ",
  MX3_KINDLE_ASIN: "B0H4L36X21",

  // No ebook version exists for Omnibus
  MX_OMNIBUS_KINDLE_ASIN: null,

  // Pricing
  MX1_KINDLE_PRICE: "6.99",
  MX2_KINDLE_PRICE: "6.99",
  MX3_KINDLE_PRICE: "6.99",

  // Bookshop.org affiliate (list live Jul 2026)
  BOOKSHOP_AFFILIATE_ID: "126177",
  BOOKSHOP_LIST_URL:
    "https://bookshop.org/lists/masters-x-trilogy-seventh-city-press?affiliate=126177",
};

/** ISBN search with affiliate attribution. */
export function bookshopIsbnUrl(isbn: string): string {
  return `https://bookshop.org/search?keywords=${isbn}&affiliate=${BUY_LINKS.BOOKSHOP_AFFILIATE_ID}`;
}

/** Google Play Books search by EPUB ISBN (resolves to product once live). */
export function googlePlayIsbnUrl(isbn: string): string {
  return `https://play.google.com/store/search?q=${isbn}&c=books`;
}

/** Append affiliate param to an existing Bookshop URL. */
export function bookshopAffiliateUrl(url: string): string {
  const parsed = new URL(url);
  parsed.searchParams.set("affiliate", BUY_LINKS.BOOKSHOP_AFFILIATE_ID);
  return parsed.toString();
}

// Page counts are build data, not canon. `ingram-catalog.json` is the single
// source of truth for them: it is the IngramSpark sync artifact, so it holds the
// same numbers retailers and readers see in a listing. Nothing else in the repo
// may keep its own copy. A stale duplicate of the table reached four external
// sites and this site's JSON-LD on 2026-08-02 because seven separate places had
// to be corrected by hand and one was missed.
import ingramCatalog from "./ingram-catalog.json";

interface IngramEdition {
  isbn: string;
  pageCount: number;
}

const PAGE_COUNT_BY_ISBN = new Map<string, number>(
  (ingramCatalog.editions as IngramEdition[]).map((edition) => [
    edition.isbn,
    edition.pageCount,
  ])
);

/**
 * Page count for one edition, looked up by ISBN. Throws during the build rather
 * than rendering a wrong or missing number.
 */
export function pageCountForIsbn(isbn: string): number {
  const pageCount = PAGE_COUNT_BY_ISBN.get(isbn);
  if (pageCount === undefined) {
    throw new Error(
      `No IngramSpark record for ISBN ${isbn}; page count cannot be derived. ` +
        `Re-run scripts/sync-ingram-metadata.py against a fresh report.csv.`
    );
  }
  return pageCount;
}

// Page counts come from the author project's IngramSpark sync artifact, which is
// the single source of truth for them. This imprint site keeps no copy.
import ingramCatalog from "../../lib/data/ingram-catalog.json";

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
 * than emitting a wrong or missing `numberOfPages`.
 */
export function pageCountForIsbn(isbn: string): number {
  const pageCount = PAGE_COUNT_BY_ISBN.get(isbn);
  if (pageCount === undefined) {
    throw new Error(
      `No IngramSpark record for ISBN ${isbn}; page count cannot be derived.`
    );
  }
  return pageCount;
}

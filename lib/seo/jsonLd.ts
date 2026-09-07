type JsonLdNode = Record<string, unknown>;
type JsonLdInput = JsonLdNode | JsonLdNode[] | null | undefined | false;

/**
 * Serialise schema.org entities for a `<script type="application/ld+json">`.
 *
 * Several entities go out under one `@context` as an `@graph`, not as a
 * top-level array. Google reads both forms, so the array was never costing rich
 * results — but a site-audit crawler run against production silently skipped it
 * and reported only the entities from the `@graph` block in the root layout.
 * On this site the array form carried *every* rich-result type there is
 * (Article, Book, FAQPage, BreadcrumbList, BookSeries, CollectionPage), so the
 * more widely-parsed shape is worth the nothing it costs.
 *
 * A lone entity keeps its own `@context` and is emitted unchanged.
 */
export function jsonLdScript(...input: JsonLdInput[]): string {
  const nodes = input
    .flatMap((item) => (Array.isArray(item) ? item : [item]))
    .filter((item): item is JsonLdNode => Boolean(item));

  if (nodes.length === 1) return JSON.stringify(nodes[0]);

  const graph = nodes.map((node) => {
    const copy = { ...node };
    delete copy["@context"];
    return copy;
  });

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

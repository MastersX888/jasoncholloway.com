/**
 * No `metadata` export here on purpose. A partial `openGraph` at layout level
 * replaces the root layout's block wholesale rather than merging into it, which is
 * how every field note lost its `og:image` and `og:site_name`. Each note supplies a
 * complete block via `buildMetadata`.
 */
export default function FieldNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

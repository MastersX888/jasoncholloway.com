/**
 * Canonical Voynich / manuscript folio labels for captions, alt text, and SEO.
 * Prefer beineckeRef when present; Vol 4 entries may encode refs in folio (f.85v-86r).
 */

export interface FolioLike {
  folio: string;
  title: string;
  collection: string;
  beineckeRef?: string;
}

const BEINECKE_MS = "Beinecke MS 408";

/** Normalize stored ref to caption form (e.g. f68r3, f85v-86r). */
export function normalizeBeineckeRef(ref: string): string {
  const trimmed = ref.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("f.")) return `f${trimmed.slice(2)}`;
  if (trimmed.startsWith("f")) return trimmed;
  return trimmed;
}

/** Resolve Beinecke folio id from record fields. */
export function getBeineckeRef(folio: FolioLike): string | undefined {
  if (folio.collection !== "voynich") return undefined;
  if (folio.beineckeRef) return normalizeBeineckeRef(folio.beineckeRef);
  if (/^f\.\d/.test(folio.folio)) return normalizeBeineckeRef(folio.folio);
  return undefined;
}

/** Short caption: Voynich MS · Folio f68r3 · Beinecke MS 408 */
export function voynichCaption(folio: FolioLike): string {
  const ref = getBeineckeRef(folio);
  if (ref) return `Voynich MS · Folio ${ref} · ${BEINECKE_MS}`;
  return folio.title;
}

/** Alt text for img elements. */
export function voynichAltText(folio: FolioLike): string {
  const ref = getBeineckeRef(folio);
  if (ref) return `Voynich Manuscript folio ${ref} — ${BEINECKE_MS}`;
  return `${folio.title} — Voynich Manuscript`;
}

/** Sidebar label: f68r3 · Pleiades Rosette Foldout */
export function folioSidebarLabel(folio: FolioLike): string {
  const ref = getBeineckeRef(folio);
  if (ref) return `${ref} · ${folio.title}`;
  return `${folio.folio} · ${folio.title}`;
}

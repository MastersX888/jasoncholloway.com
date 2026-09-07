import { COVER_MANIFEST } from "@/lib/coverManifest.generated";

/**
 * Pages is a static export with `images.unoptimized`, so Next never generates a
 * srcset at request time. The widths are pre-built into public/covers by
 * `scripts/generate-cover-srcset.py`, which also writes the manifest imported
 * above — re-run it after adding or replacing a cover.
 *
 * Widths come from the manifest rather than a fixed list because covers do not
 * share a ceiling: the hardcover art is 2000px, the paperbacks 1000px. Emitting
 * a width a file does not actually have makes the browser pick a candidate that
 * then has to be upscaled, which is what made the paperbacks look soft.
 */
export function coverSrcSet(src: string): string | undefined {
  const entry = COVER_MANIFEST[src];
  if (!entry || entry.variants.length === 0) return undefined;
  return entry.variants.map((v) => `${v.src} ${v.w}w`).join(", ");
}

/** Intrinsic dimensions of the original, for width/height hints that reserve layout space. */
export function coverIntrinsic(src: string): { width: number; height: number } | undefined {
  const entry = COVER_MANIFEST[src];
  return entry ? { width: entry.width, height: entry.height } : undefined;
}

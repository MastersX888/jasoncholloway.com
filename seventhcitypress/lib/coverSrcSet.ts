import { COVER_MANIFEST } from "./coverManifest.generated";

/**
 * This site is a static export with `images.unoptimized`, so next/image never
 * emits a srcset — a 120px press thumbnail was pulling the full 2–3.8 MB print
 * PNG. The widths are pre-built into public/covers by the repo-root script
 * `scripts/generate-cover-srcset.py`, which also writes the manifest imported
 * above; re-run it after adding or replacing a cover.
 */
export function coverSrcSet(src: string): string | undefined {
  const entry = COVER_MANIFEST[src];
  if (!entry || entry.variants.length === 0) return undefined;
  return entry.variants.map((v) => `${v.src} ${v.w}w`).join(", ");
}

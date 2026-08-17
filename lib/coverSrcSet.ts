/** Display widths for cover srcset. Pages is a static export, so Next cannot
 *  generate these at request time — the files are pre-built in public/covers. */
export const COVER_SRCSET_WIDTHS = [660, 1320] as const;

/** Flip on after `scripts/generate-cover-srcset.py` writes the WebP files. */
export const COVER_SRCSET_READY = false;

const COVER_PATH = /^(\/covers\/.+)\.(png|jpe?g|webp)$/i;

export function coverSrcSet(src: string): string | undefined {
  if (!COVER_SRCSET_READY) return undefined;
  const match = src.match(COVER_PATH);
  if (!match) return undefined;
  const [, base] = match;
  const variants = COVER_SRCSET_WIDTHS.map((width) => `${base}-${width}w.webp ${width}w`);
  variants.push(`${src} 2000w`);
  return variants.join(", ");
}

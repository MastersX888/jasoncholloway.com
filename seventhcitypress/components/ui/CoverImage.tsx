import { coverSrcSet } from "@/lib/coverSrcSet";

interface CoverImageProps {
  src: string;
  alt: string;
  sizes: string;
  fit?: "cover" | "contain";
}

/**
 * Cover art for a static export. The WebP widths hang off a <source> rather than
 * the <img> so a browser without WebP support still resolves the original
 * through `src` instead of picking a candidate it cannot decode.
 */
export default function CoverImage({ src, alt, sizes, fit = "contain" }: CoverImageProps) {
  const srcSet = coverSrcSet(src);
  return (
    <picture style={{ display: "contents" }}>
      {srcSet ? <source type="image/webp" srcSet={srcSet} sizes={sizes} /> : null}
      <img
        src={src}
        sizes={sizes}
        alt={alt}
        decoding="async"
        loading="lazy"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: fit }}
      />
    </picture>
  );
}

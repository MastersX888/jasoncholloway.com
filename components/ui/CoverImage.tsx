import { coverSrcSet } from "@/lib/coverSrcSet";

interface CoverImageProps {
  src: string;
  alt: string;
  sizes: string;
  fill?: boolean;
  priority?: boolean;
  fit?: "cover" | "contain";
  className?: string;
}

/**
 * Cover art for a static export. Next/Image is unoptimized here, so it never
 * emits srcset — phones and retina laptops would paint a 2000px PNG into a
 * 70–220px box and the gold linework goes muddy. This uses pre-sharpened
 * WebP widths so each device downloads ~2–3× its CSS size.
 */
export default function CoverImage({
  src,
  alt,
  sizes,
  fill = false,
  priority = false,
  fit = "cover",
  className = "",
}: CoverImageProps) {
  const srcSet = coverSrcSet(src);
  const classes = ["cover-image", fill ? "cover-image--fill" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={classes}
      decoding="async"
      draggable={false}
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      style={fill ? { objectFit: fit } : { objectFit: fit, width: "100%", height: "auto" }}
    />
  );
}

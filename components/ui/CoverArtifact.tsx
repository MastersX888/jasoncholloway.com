import Image from "next/image";
import type { CSSProperties } from "react";

export type CoverFormat = "pb" | "hc" | "ebook" | "omnibus";

interface CoverArtifactProps {
  src: string;
  alt: string;
  format?: CoverFormat;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fit?: "cover" | "contain";
  width?: string | number;
  style?: CSSProperties;
}

const ASPECT: Record<CoverFormat, string> = {
  pb: "55/85",
  hc: "614/921",
  ebook: "2/3",
  omnibus: "614/921",
};

export default function CoverArtifact({
  src,
  alt,
  format = "pb",
  sizes = "200px",
  priority,
  className = "",
  fit = "cover",
  width,
  style,
}: CoverArtifactProps) {
  return (
    <div
      className={`cover-artifact cover-artifact--${format} ${className}`.trim()}
      style={{ ...(width ? { width, maxWidth: width } : {}), ...style }}
    >
      <div className="cover-artifact-inner">
        <div className="cover-artifact-spine" aria-hidden="true" />
        <div className="cover-artifact-face" style={{ aspectRatio: ASPECT[format] }}>
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: fit }}
            sizes={sizes}
            priority={priority}
          />
        </div>
        <div className="cover-artifact-ground" aria-hidden="true" />
      </div>
    </div>
  );
}

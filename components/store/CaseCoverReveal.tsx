"use client";

import { useState } from "react";
import Link from "next/link";
import CoverImage from "@/components/ui/CoverImage";
import type { CoverFormat } from "@/components/ui/CoverArtifact";

export interface CaseCoverPhoto {
  /** Photo of the case boards, hidden under the dust jacket. Omitted until
   * that photo is supplied — see ASSET_GAP_REPORT.md — in which case the
   * reveal shows a "photograph coming soon" placeholder instead of a 404. */
  src?: string;
  alt?: string;
}

interface CaseCoverRevealProps {
  jacket: { src: string; alt: string };
  caseCover?: CaseCoverPhoto;
  /** One-line description of the case design, shown once revealed. */
  caseNote?: string;
  format?: CoverFormat;
  sizes?: string;
  priority?: boolean;
  width?: string | number;
  /** Wraps the jacket face in a link to the product page. */
  detailHref?: string;
  detailLabel?: string;
  className?: string;
}

const ASPECT: Record<CoverFormat, string> = {
  pb: "55/85",
  hc: "614/921",
  ebook: "2/3",
  omnibus: "614/921",
};

/**
 * Every Masters X hardcover ships with two covers: the printed dust jacket,
 * and a second design stamped directly on the boards underneath it. The site
 * used to show only the jacket, which hid the case entirely and left buyers
 * unsure why "hardcover" pages only ever showed one image. This renders the
 * jacket by default with a labeled toggle to reveal the case, so the case
 * is an explained feature rather than a hidden surprise.
 */
export default function CaseCoverReveal({
  jacket,
  caseCover,
  caseNote,
  format = "omnibus",
  sizes = "280px",
  priority,
  width,
  detailHref,
  detailLabel,
  className = "",
}: CaseCoverRevealProps) {
  const [showCase, setShowCase] = useState(false);
  const hasCase = Boolean(caseCover);

  const jacketFace = (
    <div className={`case-reveal-face case-reveal-jacket${showCase ? " is-hidden" : ""}`}>
      <CoverImage src={jacket.src} alt={jacket.alt} fill sizes={sizes} priority={priority} />
    </div>
  );

  return (
    <div
      className={`case-reveal ${className}`.trim()}
      style={width ? { width, maxWidth: width } : undefined}
    >
      <div className="case-reveal-inner">
        <div className="case-reveal-spine" aria-hidden="true" />
        <div className="case-reveal-frame" style={{ aspectRatio: ASPECT[format] }}>
          {detailHref ? (
            <Link href={detailHref} aria-label={detailLabel} className="case-reveal-link">
              {jacketFace}
            </Link>
          ) : (
            jacketFace
          )}

          {hasCase && (
            <div
              className={`case-reveal-face case-reveal-case${showCase ? "" : " is-hidden"}`}
              aria-hidden={!showCase}
            >
              {caseCover?.src ? (
                <CoverImage
                  src={caseCover.src}
                  alt={caseCover.alt ?? "The hardcover case design, underneath the dust jacket"}
                  fill
                  sizes={sizes}
                />
              ) : (
                <div className="case-reveal-pending">
                  <span className="case-reveal-pending-mark" aria-hidden="true" />
                  <p>Case photograph coming soon</p>
                </div>
              )}
            </div>
          )}

          <span className="case-reveal-tag" aria-hidden="true">
            {showCase ? "The case" : "The jacket"}
          </span>
        </div>
        <div className="case-reveal-ground" aria-hidden="true" />
      </div>

      {hasCase && (
        <>
          <button
            type="button"
            className="case-reveal-toggle"
            onClick={() => setShowCase((v) => !v)}
            aria-pressed={showCase}
          >
            {showCase ? "↺ Show the dust jacket" : "✦ See what's under the jacket"}
          </button>
          {caseNote && <p className="case-reveal-note">{caseNote}</p>}
        </>
      )}
    </div>
  );
}

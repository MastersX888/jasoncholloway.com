"use client";

import { useId, useState } from "react";
import CoverArtifact from "@/components/ui/CoverArtifact";

type HardcoverCaseRevealProps = {
  subtitle: string;
  jacketSrc: string;
  caseSrc?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Hardcover editions ship a dust jacket over case-laminate art. The jacket is
 * what retailers show; the case is the concealed board art underneath.
 */
export default function HardcoverCaseReveal({
  subtitle,
  jacketSrc,
  caseSrc,
  sizes = "(max-width: 768px) 45vw, 180px",
  priority,
}: HardcoverCaseRevealProps) {
  const [showCase, setShowCase] = useState(false);
  const hintId = useId();
  const hasCase = Boolean(caseSrc);

  return (
    <div className="hc-case-reveal">
      <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-faint)", marginBottom: "0.4rem", textAlign: "center" }}>
        Hardcover
      </div>
      <CoverArtifact
        src={showCase && caseSrc ? caseSrc : jacketSrc}
        alt={
          showCase && caseSrc
            ? `${subtitle} — case laminate (concealed board art)`
            : `${subtitle} — dust jacket`
        }
        format="hc"
        fit="contain"
        sizes={sizes}
        priority={priority}
      />
      {hasCase ? (
        <button
          type="button"
          className="hc-case-reveal-toggle"
          aria-pressed={showCase}
          aria-describedby={hintId}
          onClick={() => setShowCase((v) => !v)}
        >
          {showCase ? "Show dust jacket" : "Reveal case laminate"}
        </button>
      ) : (
        <p id={hintId} className="hc-case-reveal-hint">
          Case laminate art ships under the jacket on every hardcover edition.
        </p>
      )}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/data/books";

interface CaseCoverShowcaseProps {
  book: Book;
  variant?: "full" | "compact";
  /** Optional CTA under the full showcase (e.g. homepage → omnibus page). */
  href?: string;
  ctaLabel?: string;
}

export default function CaseCoverShowcase({
  book,
  variant = "full",
  href,
  ctaLabel = "View Omnibus Edition",
}: CaseCoverShowcaseProps) {
  if (!book.coverImageCase) return null;

  if (variant === "compact") {
    const body = (
      <div className="case-cover-callout-inner">
        <div className="case-cover-callout-badge">Two Covers</div>
        <div className="case-cover-callout-text">
          <p className="case-cover-callout-headline">
            Every hardcover edition has a hidden second cover.
          </p>
          <p className="case-cover-callout-detail">
            Beneath the dust jacket, a case-laminate design printed directly on the boards.
            Collect the full set.
          </p>
        </div>
        <div className="case-cover-callout-thumb">
          <Image
            src={book.coverImageCase}
            alt={`${book.subtitle} — Case Cover (boards)`}
            width={80}
            height={120}
            style={{ objectFit: "cover", borderRadius: "4px", objectPosition: "center" }}
          />
        </div>
      </div>
    );
    return (
      <div className="case-cover-callout">
        {href ? (
          <Link href={href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            {body}
          </Link>
        ) : (
          body
        )}
      </div>
    );
  }

  return (
    <section className="case-cover-showcase">
      <div className="case-cover-showcase-header">
        <span className="label">The Hidden Cover</span>
        <h3 className="case-cover-showcase-title">
          Two Covers. One Book.
        </h3>
        <p className="case-cover-showcase-subtitle">
          The Masters X Omnibus hardcover carries two complete cover designs — the printed dust jacket
          and a case-laminate cover beneath it, printed directly on the boards. Remove the jacket
          and discover the second design.
        </p>
      </div>

      <div className="case-cover-showcase-grid">
        <div className="case-cover-showcase-card">
          <div className="case-cover-showcase-label">Dust Jacket</div>
          <div className="case-cover-showcase-image">
            <Image
              src={book.coverImageHC}
              alt={`${book.subtitle} — Dust Jacket`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 70vw, 280px"
              priority
            />
          </div>
          <p className="case-cover-showcase-caption">
            The retail cover — what you see on the shelf and in search results.
          </p>
        </div>

        <div className="case-cover-showcase-reveal">
          <div className="case-cover-showcase-arrow" aria-hidden="true">&#10140;</div>
          <span className="case-cover-showcase-reveal-text">Remove jacket</span>
        </div>

        <div className="case-cover-showcase-card case-cover-showcase-card--case">
          <div className="case-cover-showcase-label case-cover-showcase-label--gold">Case Cover</div>
          <div className="case-cover-showcase-image">
            <Image
              src={book.coverImageCase}
              alt={`${book.subtitle} — Case Cover (boards beneath dust jacket)`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 70vw, 280px"
              priority
            />
          </div>
          <p className="case-cover-showcase-caption">
            The hidden design — printed directly on the hardcover boards.
          </p>
        </div>
      </div>

      {href && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href={href} className="btn btn-gold">
            {ctaLabel}
          </Link>
        </div>
      )}
    </section>
  );
}

import Link from "next/link";
import { books } from "@/lib/data/books";
import CoverArtifact from "@/components/ui/CoverArtifact";
import BuyDirectButton from "@/components/ui/BuyDirectButton";
import OpenStoreButton from "@/components/store/OpenStoreButton";
import { findOffer, omnibusComparison, omnibusProduct } from "@/lib/data/storefront";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books — Jason Carroll Holloway",
  description:
    "The complete catalog from Seventh City Press: the Masters X Trilogy (three novels of acoustic frequency, medieval manuscripts, and Kansas City conspiracy) and the John Hawkes critical monograph. Available in hardcover, paperback, and Kindle.",
  alternates: {
    canonical: "https://jasoncholloway.com/books/",
  },
  openGraph: {
    title: "Books by Jason Carroll Holloway — Seventh City Press",
    description:
      "Masters X Trilogy · Omnibus Edition · Hawkes Monograph. Available now from Seventh City Press.",
    url: "https://jasoncholloway.com/books/",
  },
};

export default function BooksIndexPage() {
  const trilogy = books.filter((b) => b.series === "Masters X" && b.slug !== "omnibus");
  const omnibus = books.find((b) => b.slug === "omnibus");
  const hawkes = books.find((b) => b.slug === "hawkes-monograph");
  const omnibusHardcover = findOffer(omnibusProduct, "Hardcover");
  const omnibusPaperback = findOffer(omnibusProduct, "Paperback");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Books",
                item: "https://jasoncholloway.com/books/",
              },
            ],
          }),
        }}
      />

      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
              <span className="label">Seventh City Press · Catalog</span>
            </div>
            <h1 className="display-xl" style={{ marginBottom: "1rem" }}>
              Books
            </h1>
            <p
              style={{
                maxWidth: "55ch",
                color: "var(--text-muted)",
                fontSize: "1.05rem",
                lineHeight: 1.85,
              }}
            >
              Fiction built on real research. Criticism built on close reading.
              Everything published by Seventh City Press, available now.
            </p>
          </div>
        </div>
      </section>

      {/* ─── MASTERS X TRILOGY ─── */}
      <section
        className="section"
        style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border-faint)",
        }}
      >
        <div className="container">
          <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
            <span className="label">Fiction · Speculative Mystery</span>
          </div>
          <h2
            className="display-md"
            style={{ marginBottom: "0.75rem" }}
          >
            The Masters X Trilogy
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.95rem",
              lineHeight: 1.85,
              maxWidth: "60ch",
              marginBottom: "2.5rem",
            }}
          >
            Three novels tracing a safety deposit box, seven notebooks of classified
            acoustic research, and a sealed crypt beneath Prague's Strahov Monastery.
            For readers of Eco, Kostova, and Doerr.
          </p>

          {omnibus && (
            <div className="omnibus-flagship-card" style={{ marginTop: 0, marginBottom: "2.5rem" }}>
              <Link
                href="/books/masters-x/omnibus"
                className="omnibus-flagship-slipcase"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CoverArtifact
                  src={omnibus.coverImageHC}
                  alt="Masters X Omnibus — Complete Trilogy Hardcover"
                  format="omnibus"
                  sizes="140px"
                  priority
                />
              </Link>
              <div className="omnibus-flagship-body">
                <Link href="/books/masters-x/omnibus" style={{ textDecoration: "none", color: "inherit" }}>
                  <span className="label">Start here · Collected Edition</span>
                  <div className="omnibus-flagship-title">Masters X: The Complete Trilogy</div>
                </Link>
                <p className="omnibus-flagship-desc">
                  All three novels in a single volume — the flagship edition from Seventh
                  City Press.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                  {omnibusHardcover && (
                    <BuyDirectButton
                      label="Hardcover · Buy Direct"
                      url={omnibusHardcover.url}
                      ecommPrice={omnibusHardcover.price ?? ""}
                      msrpPrice={omnibusHardcover.listPrice}
                      itemId={omnibusHardcover.itemId}
                      itemName={omnibusHardcover.itemName}
                      itemVariant={omnibusHardcover.itemVariant}
                    />
                  )}
                  {omnibusPaperback && (
                    <BuyDirectButton
                      label="Paperback · Buy Direct"
                      url={omnibusPaperback.url}
                      ecommPrice={omnibusPaperback.price ?? ""}
                      msrpPrice={omnibusPaperback.listPrice}
                      itemId={omnibusPaperback.itemId}
                      itemName={omnibusPaperback.itemName}
                      itemVariant={omnibusPaperback.itemVariant}
                    />
                  )}
                </div>
                <p className="omnibus-savings-note">
                  ${omnibusComparison.hardcover.saving} less than the three hardcovers
                  bought separately.
                </p>
              </div>
            </div>
          )}

          <div className="resp-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }}>
            {trilogy.map((book) => (
              <Link
                key={book.slug}
                href={`/books/masters-x/${book.slug}`}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                }}
              >
                <CoverArtifact
                  src={book.coverImagePB}
                  alt={book.subtitle}
                  format="pb"
                  width="120px"
                  sizes="120px"
                  style={{ marginBottom: "1.25rem" }}
                />
                <div
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Volume {book.volume}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    color: "var(--text)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {book.subtitle}
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-faint)",
                  }}
                >
                  {book.pageCountPB ?? book.pageCount} pp · from ${book.price_pb_is} direct
                </div>
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
            <Link href="/books/masters-x" className="btn btn-gold">
              View the Trilogy
            </Link>
            <OpenStoreButton source="books_index">See all editions &amp; prices</OpenStoreButton>
          </div>
        </div>
      </section>

      {/* ─── HAWKES MONOGRAPH ─── */}
      {hawkes && (
        <section
          className="section"
          style={{ borderTop: "1px solid var(--border-faint)" }}
        >
          <div className="container">
            <div
              className="resp-2col"
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "2.5rem",
                alignItems: "start",
              }}
            >
              <CoverArtifact
                src={hawkes.coverImagePB}
                alt="Innocence, Desire, and the Architecture of the Fall"
                format="pb"
                width="120px"
                sizes="120px"
              />
              <div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Literary Criticism · Available Now
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    marginBottom: "0.75rem",
                  }}
                >
                  {hawkes.title}
                </h2>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.92rem",
                    lineHeight: 1.85,
                    marginBottom: "1.25rem",
                    maxWidth: "55ch",
                  }}
                >
                  {hawkes.shortDesc}
                </p>
                <Link href="/books/hawkes-monograph" className="btn btn-outline">
                  View Monograph
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── BRIDGE TO RESEARCH ─── */}
      <section
        className="section"
        style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border-faint)",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.95rem",
              marginBottom: "1.5rem",
              maxWidth: "50ch",
              margin: "0 auto 1.5rem",
            }}
          >
            The research archive underlying the trilogy is open and interactive.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/field-notes" className="btn btn-outline">
              Field Notes
            </Link>
            <Link
              href="/chamber"
              className="btn btn-ghost"
              style={{ color: "var(--cyan)" }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--cyan)",
                  display: "inline-block",
                  marginRight: "0.4rem",
                }}
              />
              Analysis Chamber
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

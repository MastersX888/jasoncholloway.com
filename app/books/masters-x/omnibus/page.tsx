import Link from "next/link";
import { books } from "@/lib/data/books";
import BuyDirectButton from "@/components/ui/BuyDirectButton";
import CoverArtifact from "@/components/ui/CoverArtifact";
import type { Metadata } from "next";

const omnibus = books.find((b) => b.slug === "omnibus");

export const metadata: Metadata = {
  title: "Masters X Omnibus Edition — Complete Trilogy",
  description:
    "The complete Masters X Trilogy in a single collected volume. Hardcover (686 pages) and paperback (734 pages) from Seventh City Press. Order direct via IngramSpark or by ISBN from any bookstore.",
  alternates: {
    canonical: "https://jasoncholloway.com/books/masters-x/omnibus/",
  },
  openGraph: {
    title: "Masters X Omnibus Edition — Complete Trilogy",
    description:
      "All three Masters X novels collected in one volume. Hardcover and paperback editions from Seventh City Press.",
    url: "https://jasoncholloway.com/books/masters-x/omnibus/",
  },
};

export default function OmnibusPage() {
  if (!omnibus) return null;

  const paragraphs = omnibus.description.split("\n\n");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": "https://jasoncholloway.com/books/masters-x/omnibus#work",
    name: `${omnibus.title}: ${omnibus.subtitle}`,
    author: { "@id": "https://jasoncholloway.com/#person" },
    publisher: { "@id": "https://jasoncholloway.com/#organization" },
    inLanguage: "English",
    workExample: [
      ...(omnibus.isbn_hc
        ? [
            {
              "@type": "Book",
              "@id": "https://jasoncholloway.com/books/masters-x/omnibus#hardcover",
              isbn: omnibus.isbn_hc,
              bookFormat: "https://schema.org/Hardcover",
              numberOfPages: omnibus.pageCountHC ?? omnibus.pageCount,
              potentialAction: omnibus.buyLinks.find((l) => l.label === "IngramSpark (HC)")
                ? {
                    "@type": "BuyAction",
                    target: omnibus.buyLinks.find((l) => l.label === "IngramSpark (HC)")!.url,
                  }
                : undefined,
              offers: omnibus.price_hc_is ? {
                "@type": "Offer",
                price: omnibus.price_hc_msrp ?? omnibus.price_hc_is,
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: omnibus.buyLinks.find((l) => l.label === "IngramSpark (HC)")?.url ?? "https://jasoncholloway.com/books/masters-x/omnibus/",
              } : undefined,
            },
          ]
        : []),
      ...(omnibus.isbn_pb
        ? [
            {
              "@type": "Book",
              "@id": "https://jasoncholloway.com/books/masters-x/omnibus#paperback",
              isbn: omnibus.isbn_pb,
              bookFormat: "https://schema.org/Paperback",
              numberOfPages: omnibus.pageCountPB ?? omnibus.pageCount,
              potentialAction: omnibus.buyLinks.find((l) => l.label === "IngramSpark (PB)")
                ? {
                    "@type": "BuyAction",
                    target: omnibus.buyLinks.find((l) => l.label === "IngramSpark (PB)")!.url,
                  }
                : undefined,
              offers: omnibus.price_pb_is ? {
                "@type": "Offer",
                price: omnibus.price_pb_msrp ?? omnibus.price_pb_is,
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: omnibus.buyLinks.find((l) => l.label === "IngramSpark (PB)")?.url ?? "https://jasoncholloway.com/books/masters-x/omnibus/",
              } : undefined,
            },
          ]
        : []),
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Books", item: "https://jasoncholloway.com/books" },
      { "@type": "ListItem", position: 2, name: "Masters X Trilogy", item: "https://jasoncholloway.com/books/masters-x/" },
      { "@type": "ListItem", position: 3, name: omnibus.subtitle, item: "https://jasoncholloway.com/books/masters-x/omnibus/" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbJsonLd]) }}
      />
      <section className="page-header" style={{ paddingBottom: "4rem" }}>
        <div className="container">
          <div className="page-header-inner">
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/books/masters-x" className="hover:text-foreground transition-colors">
                {omnibus.series}
              </Link>
              <span className="text-muted-foreground">·</span>
              <span className="text-foreground">Collected Edition</span>
            </div>

            <div className="resp-book-hero" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "3.5rem", alignItems: "start" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CoverArtifact
                  src={omnibus.coverImageHC}
                  alt="Masters X Omnibus Edition — Complete Trilogy Hardcover"
                  format="omnibus"
                  width="min(280px, 70vw)"
                  sizes="(max-width: 768px) 70vw, 280px"
                  priority
                />
              </div>

              <div>
                <p className="label" style={{ marginBottom: "0.75rem" }}>
                  {omnibus.series} · Collected Edition
                </p>
                <h1 className="display-lg" style={{ marginBottom: "0.5rem" }}>
                  {omnibus.subtitle}
                </h1>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1rem" }}>
                  By Jason Carroll Holloway · Seventh City Press
                </p>
                <div className="ms-pull" style={{ margin: "1rem 0" }}>
                  <p>{omnibus.excerpt}</p>
                </div>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "2rem" }}>
                  {omnibus.shortDesc}
                </p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {omnibus.buyLinks.map((link) => {
                    if (link.url.includes("shop.ingramspark.com") && link.format === "Paperback") {
                      return (
                        <BuyDirectButton
                          key={link.url}
                          label={link.label}
                          url={link.url}
                          ecommPrice={omnibus.price_pb_is ?? ""}
                          msrpPrice={omnibus.price_pb_msrp}
                        />
                      );
                    }
                    if (link.url.includes("shop.ingramspark.com") && link.format === "Hardcover") {
                      return (
                        <BuyDirectButton
                          key={link.url}
                          label={link.label}
                          url={link.url}
                          ecommPrice={omnibus.price_hc_is ?? ""}
                          msrpPrice={omnibus.price_hc_msrp}
                        />
                      );
                    }
                    return (
                      <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                        {link.label}
                      </a>
                    );
                  })}
                </div>
                {omnibus.price_pb_msrp && omnibus.price_pb_is && (
                  <p className="omnibus-savings-note">
                    All three volumes direct: <strong>${omnibus.price_pb_is} PB</strong> /{" "}
                    <strong>${omnibus.price_hc_is} HC</strong> — save up to $17.98 vs.
                    buying volumes individually.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="resp-main-sidebar" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "4rem" }}>
            <div>
              <div className="section-label-row" style={{ marginBottom: "2rem" }}>
                <span className="label">About the Omnibus</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
                {paragraphs.map((p, i) => (
                  <p key={i} style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem" }}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
                <span className="label">Volumes Included</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {books
                  .filter((b) => b.series === "Masters X" && b.slug !== "omnibus")
                  .map((vol) => (
                    <Link
                      key={vol.slug}
                      href={`/books/masters-x/${vol.slug}`}
                      style={{
                        padding: "1rem 1.25rem",
                        background: "var(--bg-surface)",
                        borderRadius: "var(--r-md)",
                        border: "1px solid var(--border)",
                        color: "var(--text-muted)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <span style={{ color: "var(--gold)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        Volume {vol.volume}
                      </span>
                      <div style={{ fontFamily: "var(--font-display)", color: "var(--text)", marginTop: "0.25rem" }}>
                        {vol.subtitle}
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="card">
                <div className="label" style={{ marginBottom: "1rem" }}>
                  Publication Details
                </div>
                {[
                  { k: "Publisher", v: "Seventh City Press" },
                  { k: "Hardcover ISBN", v: omnibus.isbn_hc ?? "" },
                  { k: "Paperback ISBN", v: omnibus.isbn_pb ?? "" },
                  { k: "Page Count (HC)", v: `${omnibus.pageCountHC ?? omnibus.pageCount} pages` },
                  { k: "Page Count (PB)", v: `${omnibus.pageCountPB ?? omnibus.pageCount} pages` },
                  { k: "Amazon", v: "No Amazon edition" },
                ].map((row) => (
                  <div
                    key={row.k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.82rem",
                      padding: "0.6rem 0",
                      borderBottom: "1px solid var(--border-faint)",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ color: "var(--text-faint)" }}>{row.k}</span>
                    <span
                      style={{
                        color: "var(--text-muted)",
                        textAlign: "right",
                        fontFamily: row.k.includes("ISBN") ? "var(--font-mono)" : undefined,
                        fontSize: row.k.includes("ISBN") ? "0.75rem" : undefined,
                      }}
                    >
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/books/masters-x" className="btn btn-outline" style={{ justifyContent: "center" }}>
                ← Back to Trilogy Hub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

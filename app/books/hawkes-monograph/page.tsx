import type { Metadata } from "next";
import CoverArtifact from "@/components/ui/CoverArtifact";
import NotaIcon from "@/components/ui/NotaIcon";
import BookViewTracker from "@/components/analytics/BookViewTracker";
import TrackedBuyLink from "@/components/ui/TrackedBuyLink";
import { googlePlayIsbnUrl } from "@/lib/data/buyLinks";
import { buildBookItem } from "@/lib/analytics/gtag";

export const metadata: Metadata = {
  title: "Innocence, Desire, and the Architecture of the Fall",
  description: "The Grape and Its Counter-Symbols in the Fiction of John Hawkes. By Jason Carroll Holloway. Published by Seventh City Press.",
  alternates: {
    canonical: "https://jasoncholloway.com/books/hawkes-monograph/",
  },
  openGraph: {
    url: "https://jasoncholloway.com/books/hawkes-monograph/",
  },
};

export default function HawkesMonographPage() {
  const editions: {
    format: string;
    cover: string;
    isbn: string;
    price: string;
    ecommPrice?: string;
    msrpPrice?: string;
    details: string;
    features: string;
    buyLabel?: string;
    buyUrl?: string;
    statusNote?: string;
  }[] = [
    {
      format: "Paperback",
      cover: "/covers/hawkes-paperback-web.png",
      isbn: "9798295778247",
      price: "$12.99 (reg. $14.99)",
      ecommPrice: "12.99",
      msrpPrice: "14.99",
      details: "Trade Paperback · 6×9 in · 84 pages",
      features: "Premium cream paper, matte cover finish",
      buyLabel: "Buy Paperback Direct",
      buyUrl: "https://shop.ingramspark.com/b/084?params=jXe3ooeHGvu40MxStyBhBq3zG9GDnsMEoktYWjm0boo",
    },
    {
      format: "Hardcover",
      cover: "/covers/hawkes-hardcover-web.png",
      isbn: "9798349308444",
      price: "$24.99 (reg. $29.99)",
      ecommPrice: "24.99",
      msrpPrice: "29.99",
      details: "Digital Cloth™ Cover w/Jacket · 6.14×9.21 in · 84 pages",
      features: "Stitch-bound, gold foil element stamping",
      buyLabel: "Buy Hardcover Direct",
      buyUrl: "https://shop.ingramspark.com/b/084?params=cFmJXOovjW3SXqwinBStngm3FhivplmhE85eUOxrPve",
    },
    {
      format: "Ebook",
      cover: "/covers/hawkes-ebook.png",
      isbn: "9798295778926",
      price: "$9.99",
      details: "EPUB · Reflowable · 90 pages",
      features: "High-resolution figures, full text search",
      statusNote: "Available on Google Play Books",
    }
  ];

  const monographTitle =
    "Innocence, Desire, and the Architecture of the Fall: The Grape and Its Counter-Symbols in the Fiction of John Hawkes";
  const viewItems = editions
    .filter((ed) => ed.isbn && ed.ecommPrice)
    .map((ed) =>
      buildBookItem({
        itemId: ed.isbn,
        itemName: `${monographTitle} (${ed.format})`,
        itemVariant: ed.format,
        price: ed.ecommPrice,
      })
    );
  const viewValue = viewItems[0]?.price;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": "https://jasoncholloway.com/books/hawkes-monograph/#work",
    "name": "Innocence, Desire, and the Architecture of the Fall: The Grape and Its Counter-Symbols in the Fiction of John Hawkes",
    "author": { "@id": "https://jasoncholloway.com/#person" },
    "publisher": { "@id": "https://jasoncholloway.com/#organization" },
    "inLanguage": "English",
    "numberOfPages": 84,
    "workExample": editions.flatMap((ed) =>
      ed.isbn ? [{
        "@type": "Book",
        "@id": `https://jasoncholloway.com/books/hawkes-monograph/#${ed.format.toLowerCase()}`,
        "isbn": ed.isbn,
        "bookFormat": ed.format === "Paperback"
          ? "https://schema.org/Paperback"
          : ed.format === "Hardcover"
            ? "https://schema.org/Hardcover"
            : "https://schema.org/EBook",
        "numberOfPages": 84,
        "potentialAction": ed.buyUrl ? {
          "@type": "BuyAction",
          "target": ed.buyUrl
        } : undefined,
        "offers": {
          "@type": "Offer",
          "price": ed.format === "Paperback"
            ? "14.99"
            : ed.format === "Hardcover"
              ? "29.99"
              : "9.99",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": ed.buyUrl ?? "https://jasoncholloway.com/books/hawkes-monograph/"
        }
      }] : []
    )
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Books",
        "item": "https://jasoncholloway.com/books/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Innocence, Desire, and the Architecture of the Fall",
        "item": "https://jasoncholloway.com/books/hawkes-monograph/"
      }
    ]
  };

  return (
    <>
      <BookViewTracker items={viewItems} value={viewValue} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbJsonLd]) }}
      />
      <section className="page-header" style={{ paddingBottom: "3rem" }}>
        <div className="container">
          <div className="page-header-inner">
            <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
              <span className="label">Literary Criticism · Seventh City Press</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
              <div>
                <h1 className="display-lg" style={{ marginBottom: "0.75rem" }}>
                  Innocence, Desire, and<br />
                  <span style={{ color: "var(--gold)", fontStyle: "italic" }}>the Architecture of the Fall</span>
                </h1>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                  The Grape and Its Counter-Symbols in the Fiction of John Hawkes
                </p>
                <p className="criticism-meta" style={{ marginBottom: "2rem" }}>
                  By Jason Carroll Holloway · Seventh City Press · Available Now
                </p>

                <div className="ms-pull" style={{ margin: "1.5rem 0", maxWidth: "65ch" }}>
                  <p>
                    The grape appears 129 times across 17 novels. It is the most frequent non-human image in the Hawkes canon.
                    This is not accident. This is architecture.
                  </p>
                  <cite>— Holloway, Abstract</cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editions Side-by-Side Grid */}
      <section style={{ borderTop: "1px solid var(--border-faint)", borderBottom: "1px solid var(--border-faint)", background: "var(--bg-surface)", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {editions.map((ed) => (
              <div key={ed.format} className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: "1.5rem", height: "100%", background: "var(--bg-raised)", borderColor: "var(--border)" }}>
                <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--gold)", fontWeight: 600, textAlign: "center" }}>
                  {ed.format} Edition
                </div>
                
                <CoverArtifact
                  src={ed.cover}
                  alt={`Innocence, Desire, and the Architecture of the Fall Cover (${ed.format})`}
                  format={ed.format === "Hardcover" ? "hc" : ed.format === "Ebook" ? "ebook" : "pb"}
                  fit="contain"
                  width="200px"
                  sizes="200px"
                  style={{ margin: "0 auto" }}
                />

                <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "center", marginTop: "0.5rem" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)" }}>{ed.price}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{ed.details}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>{ed.features}</div>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  {ed.buyUrl && ed.ecommPrice ? (
                    <TrackedBuyLink
                      href={ed.buyUrl}
                      itemId={ed.isbn}
                      itemName={`${monographTitle} (${ed.format})`}
                      itemVariant={ed.format}
                      price={ed.ecommPrice}
                      className="btn btn-gold buy-direct-is"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <span style={{ fontSize: "0.62rem", letterSpacing: "0.1em",
                                     textTransform: "uppercase", opacity: 0.75 }}>
                        Buy Direct · Best Price
                      </span>
                      <span className="price-row">
                        {ed.msrpPrice && (
                          <span className="price-msrp">
                            ${ed.msrpPrice}
                          </span>
                        )}
                        <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                          ${ed.ecommPrice}
                        </span>
                        {ed.msrpPrice && ed.ecommPrice && (
                          <span style={{ fontSize: "0.58rem", background: "rgba(255,255,255,0.18)",
                                         padding: "0.1em 0.4em", borderRadius: "2px",
                                         letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            save ${(parseFloat(ed.msrpPrice) - parseFloat(ed.ecommPrice)).toFixed(2)}
                          </span>
                        )}
                      </span>
                    </TrackedBuyLink>
                  ) : ed.buyUrl ? (
                    <a
                      href={ed.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-gold"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      {ed.buyLabel ?? `Buy ${ed.format} Direct`}
                    </a>
                  ) : ed.format === "Ebook" ? (
                    <a
                      href={googlePlayIsbnUrl(ed.isbn)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nota-link"
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--text-muted)",
                        justifyContent: "center",
                        padding: "0.85rem 0.5rem",
                        border: "1px solid var(--border-faint)",
                        borderRadius: "var(--r-md)",
                      }}
                    >
                      <NotaIcon variant="external" size={12} />
                      Google Play Books — {ed.price.replace("$", "")}
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "4rem" }}>
            <div>
              <div className="section-label-row"><span className="label">About the Monograph</span></div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem" }}>
                <p>
                  John Hawkes is among the most challenging and least understood novelists of the twentieth century.
                  His fiction operates through a symbolic register so dense, so precisely constructed, that conventional
                  thematic criticism tends to slide off its surface. What Holloway&apos;s monograph proposes is a different
                  methodology: to trace a single, seemingly peripheral image — the grape — through Hawkes&apos;s entire
                  fictional career, and to discover that the grape is not peripheral at all.
                </p>
                <p>
                  The grape functions in Hawkes&apos;s fiction as a counter-symbol to the Christian tradition of grace.
                  Where the liturgical tradition makes the grape sacred — the wine of communion, the blood of transformation —
                  Hawkes uses the grape to mark the moments when his characters are most fully themselves, most fully animal,
                  most fully present in the irreducible fact of their embodiment. Grace, in Hawkes, is not transcendence.
                  It is immanence. It is the weight of the body against the earth.
                </p>
                <p>
                  The monograph traces this argument across seventeen novels, from <em>The Cannibal</em> (1949) through
                  <em>An Irish Eye</em> (1997), with particular attention to <em>The Lime Twig</em>, <em>Second Skin</em>,
                  <em>The Blood Oranges</em>, and the later trilogy (<em>Travesty</em>, <em>The Passion Artist</em>,
                  <em>Virginie: Her Two Lives</em>).
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="card">
                <div className="label" style={{ marginBottom: "0.75rem" }}>Publication Details</div>
                {[
                  { k: "Author", v: "Jason Carroll Holloway" },
                  { k: "Publisher", v: "Seventh City Press" },
                  { k: "Subject", v: "John Hawkes (novelist)" },
                  { k: "Method", v: "Counter-symbol analysis" },
                  { k: "Status", v: "Available Now" },
                  { k: "Paperback ISBN", v: "9798295778247" },
                  { k: "Hardcover ISBN", v: "9798349308444" },
                  { k: "Ebook ISBN", v: "9798295778926" },
                ].map((row) => (
                  <div key={row.k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", padding: "0.5rem 0", borderBottom: "1px solid var(--border-faint)" }}>
                    <span style={{ color: "var(--text-faint)" }}>{row.k}</span>
                    <span style={{ color: "var(--text-muted)", fontFamily: row.k.includes("ASIN") ? "var(--font-mono)" : undefined }}>{row.v}</span>
                  </div>
                ))}
              </div>

              <div className="card">
                <div className="label" style={{ marginBottom: "0.75rem" }}>Texts Examined</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
                  {["Charivari (1949)", "The Cannibal (1949)", "The Beetle Leg (1951)", "The Lime Twig (1961)", "Second Skin (1964)",
                    "The Blood Oranges (1971)", "Death, Sleep & the Traveler (1974)", "Travesty (1976)",
                    "The Passion Artist (1979)", "Virginie: Her Two Lives (1982)", "Adventures in the Alaskan Skin Trade (1985)",
                    "Innocence in Extremis (1985)", "Humors of Blood & Skin (1984)", "Whistlejacket (1988)",
                    "Sweet William (1993)", "The Frog (1996)", "An Irish Eye (1997)"].map((t) => (
                    <div key={t} style={{ paddingBottom: "0.25rem", borderBottom: "1px solid var(--border-faint)", marginBottom: "0.25rem" }}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


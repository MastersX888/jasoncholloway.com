import Link from "next/link";
import Image from "next/image";
import { books } from "@/lib/data/books";
import type { Metadata } from "next";
import NewsletterForm from "@/components/layout/NewsletterForm";
import CoverArtifact from "@/components/ui/CoverArtifact";
import BuyDirectButton from "@/components/ui/BuyDirectButton";
import NotaIcon from "@/components/ui/NotaIcon";
import WaveDivider from "@/components/ui/WaveDivider";

export const metadata: Metadata = {
  title: "Masters X Trilogy — Kansas City Conspiracy Thriller",
  description:
    "Three novels following a fired Kansas City security guard who inherits classified acoustic research pointing to a sealed Prague crypt. For readers of Foucault's Pendulum, The Da Vinci Code, and Cloud Cuckoo Land. By Jason Carroll Holloway. Published by Seventh City Press.",
  alternates: {
    canonical: "https://jasoncholloway.com/books/masters-x/",
  },
  openGraph: {
    title: "Masters X Trilogy — Kansas City Conspiracy Thriller",
    description: "Three novels where the Voynich Manuscript, the Ars Notoria, and a 111 Hz frequency converge beneath Kansas City and Prague.",
    url: "https://jasoncholloway.com/books/masters-x/",
  },
};

export default function MastersXPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
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
                  "name": "Masters X Trilogy",
                  "item": "https://jasoncholloway.com/books/masters-x/"
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "BookSeries",
              "name": "Masters X Trilogy",
              "author": { "@id": "https://jasoncholloway.com/#person" },
              "publisher": { "@id": "https://jasoncholloway.com/#organization" },
              "locationCreated": {
                "@type": "Place",
                "name": "Kansas City, Missouri"
              },
              "genre": ["Conspiracy Thriller", "Literary Fiction", "Historical Fiction", "Mystery"],
              "description": "A Kansas City trilogy tracing the Voynich Manuscript, the Ars Notoria, and a 111 Hz archaeoacoustic frequency from SubTropolis to a sealed crypt beneath Prague's Strahov Monastery.",
              "hasPart": books.filter(b => b.series === "Masters X" && b.slug !== "omnibus").map(b => ({
                "@type": "Book",
                "name": b.title + ": " + b.subtitle,
                "url": `https://jasoncholloway.com/books/masters-x/${b.slug}/`
              }))
            }
          ])
        }}
      />
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
              <span className="label">Seventh City Press · Literary Fiction</span>
            </div>
            <h1 className="display-xl" style={{ marginBottom: "1rem" }}>
              Masters X<br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Trilogy</span>
            </h1>
            <p style={{ maxWidth: "62ch", color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              A safety deposit box, paid in advance for fifty-seven years, arrives the day Blake Masters
              is ready to receive it. Inside: seven notebooks, thirty years of classified research, and a
              cross-reference to a crypt that has been sealed since 1267. Three novels about what you do
              when you open something that was waiting specifically for you.
            </p>
            <p style={{ maxWidth: "60ch", color: "var(--text-faint)", fontSize: "0.9rem", fontStyle: "italic", marginBottom: "0.5rem" }}>
              For readers of Umberto Eco’s <em>Foucault’s Pendulum</em>, Dan Brown’s <em>The Da Vinci Code</em>, Elizabeth Kostova’s <em>The Historian</em>, and Anthony Doerr’s <em>Cloud Cuckoo Land</em>.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <WaveDivider />
      </div>

      {/* Series overview */}
      <section style={{ borderTop: "1px solid var(--border-faint)", background: "var(--bg-surface)", padding: "2rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { label: "Author", value: "Jason Carroll Holloway" },
              { label: "Publisher", value: "Seventh City Press" },
              { label: "Format", value: "HC · PB · Ebook" },
              { label: "Distribution", value: "IngramSpark · Global" },
              { label: "Total Pages", value: "686 HC · 734 PB" },
              { label: "BISAC", value: "FIC019000 · Literary Fiction" },
            ].map((item) => (
              <div key={item.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.25rem" }}>{item.label}</div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
            {books.filter(b => b.series === "Masters X" && b.slug !== "omnibus").map((book, i) => (
              <div key={book.slug} style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "380px 1fr" : "1fr 380px",
                gap: "4rem",
                alignItems: "start",
              }}
              className="book-detail-row"
              >
                {i % 2 !== 0 && (
                  <div>
                    <div className="badge badge-gold" style={{ marginBottom: "1rem" }}>Volume {book.volume} of 3</div>
                    <h2 className="display-md" style={{ marginBottom: "0.5rem" }}>{book.subtitle}</h2>
                    <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                      {book.title} By Jason Carroll Holloway
                    </p>
                    <BookBody book={book} />
                  </div>
                )}
                
                {/* Covers side-by-side */}
                <div className="bd-covers" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-faint)", marginBottom: "0.4rem", textAlign: "center" }}>Paperback</div>
                      <CoverArtifact
                        src={book.coverImagePB}
                        alt={`${book.subtitle} Paperback`}
                        format="pb"
                        fit="contain"
                        sizes="(max-width: 768px) 42vw, 180px"
                        priority={i === 0}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-faint)", marginBottom: "0.4rem", textAlign: "center" }}>Hardcover</div>
                      <CoverArtifact
                        src={book.coverImageHC}
                        alt={`${book.subtitle} Hardcover`}
                        format="hc"
                        fit="contain"
                        sizes="(max-width: 768px) 42vw, 180px"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                </div>

                {i % 2 === 0 && (
                  <div>
                    <div className="badge badge-gold" style={{ marginBottom: "1rem" }}>Volume {book.volume} of 3</div>
                    <h2 className="display-md" style={{ marginBottom: "0.5rem" }}>{book.subtitle}</h2>
                    <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                      {book.title} By Jason Carroll Holloway
                    </p>
                    <BookBody book={book} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-faint)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ background: "var(--bg-raised)", padding: "2rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-faint)" }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", marginBottom: "1.25rem", textAlign: "center" }}>Not ready to buy? Read the opening chapters free.</h4>
            <NewsletterForm compact={true} />
          </div>
        </div>
      </section>

      {/* Omnibus flagship */}
      {(() => {
        const omnibus = books.find(b => b.slug === "omnibus");
        if (!omnibus) return null;
        const pbLink = omnibus.buyLinks.find(l => l.url.includes("shop.ingramspark.com") && l.format === "Paperback");
        const hcLink = omnibus.buyLinks.find(l => l.url.includes("shop.ingramspark.com") && l.format === "Hardcover");
        return (
          <section className="section omnibus-flagship-hub" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-faint)", borderBottom: "1px solid var(--border-faint)" }}>
            <div className="container">
              <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
                <span className="label">Collected Edition</span>
              </div>
              <div className="omnibus-flagship-card">
                <Link href="/books/masters-x/omnibus" className="omnibus-flagship-slipcase" style={{ textDecoration: "none", color: "inherit" }}>
                  <CoverArtifact
                    src={omnibus.coverImageHC}
                    alt={`${omnibus.subtitle} — Complete Trilogy Hardcover`}
                    format="omnibus"
                    sizes="160px"
                  />
                </Link>
                <div className="omnibus-flagship-body">
                  <Link href="/books/masters-x/omnibus" style={{ textDecoration: "none", color: "inherit" }}>
                    <span className="label">Flagship Edition</span>
                    <div className="omnibus-flagship-title">{omnibus.subtitle}</div>
                  </Link>
                  <p className="omnibus-flagship-desc">
                    {omnibus.shortDesc ?? omnibus.description.split("\n\n")[0]}
                  </p>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                    {pbLink && (
                      <BuyDirectButton
                        label={pbLink.label}
                        url={pbLink.url}
                        ecommPrice={omnibus.price_pb_is ?? ""}
                        msrpPrice={omnibus.price_pb_msrp}
                      />
                    )}
                    {hcLink && (
                      <BuyDirectButton
                        label={hcLink.label}
                        url={hcLink.url}
                        ecommPrice={omnibus.price_hc_is ?? ""}
                        msrpPrice={omnibus.price_hc_msrp}
                      />
                    )}
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
          </section>
        );
      })()}
    </>
  );
}

function BookBody({ book }: { book: typeof books[0] }) {
  return (
    <>
      <div className="ms-pull" style={{ margin: "1rem 0" }}>
        <p>{book.excerpt}</p>
        <cite>{book.series}</cite>
      </div>
      <div style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        {book.description.split("\n\n")[0]}
      </div>
      
      {/* Editions Specifications list */}
      <div className="card" style={{ background: "var(--bg-raised)", borderColor: "var(--border)", padding: "1.25rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold)", marginBottom: "0.75rem", fontWeight: 600 }}>Available Formats & Specifications</div>
        
        {book.asin_ebook && (
          <a href={`https://www.amazon.com/dp/${book.asin_ebook}`} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ width: "100%", justifyContent: "center", marginBottom: "1rem", fontSize: "1rem", padding: "0.8rem" }}>
            Kindle Edition (Amazon) — ${book.price_ebook || "6.99"}
          </a>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>Paperback</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>ISBN: <span style={{ fontFamily: "var(--font-mono)" }}>{book.isbn_pb}</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginTop: "0.5rem" }}>
              {book.buyLinks.find(l => l.label === "IngramSpark (PB)") && (
                <a href={book.buyLinks.find(l => l.label === "IngramSpark (PB)")!.url} target="_blank" rel="noopener noreferrer" className="nota-link" style={{ fontSize: "0.78rem", color: "var(--gold)" }}>
                  <NotaIcon variant="forward" size={12} />
                  Buy Direct {book.price_pb_is ? `($${book.price_pb_is})` : "(Best Price)"}
                </a>
              )}
              {book.buyLinks.find(l => l.label === "Bookshop.org") && (
                <a href={book.buyLinks.find(l => l.label === "Bookshop.org")!.url} target="_blank" rel="noopener noreferrer" className="nota-link" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <NotaIcon variant="external" size={12} />
                  Order via Bookshop.org
                </a>
              )}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>Hardcover</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>ISBN: <span style={{ fontFamily: "var(--font-mono)" }}>{book.isbn_hc}</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginTop: "0.5rem" }}>
              {book.buyLinks.find(l => l.label === "IngramSpark (HC)") && (
                <a href={book.buyLinks.find(l => l.label === "IngramSpark (HC)")!.url} target="_blank" rel="noopener noreferrer" className="nota-link" style={{ fontSize: "0.78rem", color: "var(--gold)" }}>
                  <NotaIcon variant="forward" size={12} />
                  Buy Direct {book.price_hc_is ? `($${book.price_hc_is})` : "(Best Price)"}
                </a>
              )}
              <span style={{ fontSize: "0.78rem", color: "var(--text-faint)", display: "inline-block" }}>
                Orderable from any bookstore by ISBN
              </span>
            </div>
          </div>
        </div>

        {book.qrCodePB && book.buyLinks.find(l => l.label === "IngramSpark (PB)") && (
          <div style={{ marginTop: "1.25rem", padding: "1.25rem", borderRadius: "var(--r-md)", background: "var(--bg-surface)", border: "1px solid var(--border)", display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
             <Image src={book.qrCodePB} alt="QR Code to buy direct" width={80} height={80} style={{ borderRadius: "8px", flexShrink: 0, border: "1px solid var(--border-faint)", background: "white", padding: "4px" }} />
             <div style={{ flex: 1, minWidth: "180px" }}>
               <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gold)", marginBottom: "0.25rem" }}>Buy Direct & Save (Paperback)</div>
               <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem", lineHeight: 1.4 }}>Scan or click to purchase directly from the publisher — the best price on print editions.</div>
               <a href={book.buyLinks.find(l => l.label === "IngramSpark (PB)")!.url} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-sm" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", display: "inline-block", textAlign: "center" }}>
                  Buy Now {book.price_pb_is ? `($${book.price_pb_is})` : ""}
               </a>
             </div>
          </div>
        )}

        <div style={{ borderTop: "1px solid var(--border-faint)", marginTop: "1.25rem", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
          <span style={{ color: "var(--text-faint)" }}>Ebook ISBN: <span style={{ fontFamily: "var(--font-mono)" }}>{book.isbn_ebook}</span></span>
          <span style={{ color: "var(--text-faint)" }}>Page Count: {book.pageCountPB ?? book.pageCount} pages</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <Link href={`/books/masters-x/${book.slug}`} className="btn btn-gold btn-sm">
          Detailed Analysis & Excerpts
        </Link>
      </div>
    </>
  );
}

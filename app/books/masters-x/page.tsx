import Link from "next/link";
import Image from "next/image";
import { books } from "@/lib/data/books";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masters X Trilogy",
  description:
    "Three novels at the intersection of acoustic physics, medieval scholarship, and the architecture of human perception. By Jason C. Holloway. Published by Seventh City Press.",
};

export default function MastersXPage() {
  return (
    <>
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
            <p style={{ maxWidth: "62ch", color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1.85 }}>
              A safety deposit box, paid in advance for fifty-seven years, arrives the day Blake Masters
              is ready to receive it. Inside: seven notebooks, thirty years of classified research, and a
              cross-reference to a crypt that has been sealed since 1247. Three novels about what you do
              when you open something that was waiting specifically for you.
            </p>
          </div>
        </div>
      </section>

      {/* Series overview */}
      <section style={{ borderTop: "1px solid var(--border-faint)", background: "var(--bg-surface)", padding: "2rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { label: "Author", value: "Jason C. Holloway" },
              { label: "Publisher", value: "Seventh City Press LLC" },
              { label: "Format", value: "HC · PB · Ebook" },
              { label: "Distribution", value: "IngramSpark · Global" },
              { label: "Total Pages", value: "634 (Trilogy)" },
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
            {books.filter(b => b.slug !== "omnibus").map((book, i) => (
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
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-faint)", marginBottom: "0.4rem", textAlign: "center" }}>Paperback</div>
                      <div style={{
                        position: "relative",
                        aspectRatio: "2/3",
                        borderRadius: "var(--r-md)",
                        overflow: "hidden",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                        width: "100%",
                      }}>
                        <Image
                          src={book.coverImagePB}
                          alt={`${book.subtitle} Paperback`}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="180px"
                        />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-faint)", marginBottom: "0.4rem", textAlign: "center" }}>Hardcover</div>
                      <div style={{
                        position: "relative",
                        aspectRatio: "2/3",
                        borderRadius: "var(--r-md)",
                        overflow: "hidden",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                        width: "100%",
                      }}>
                        <Image
                          src={book.coverImageHC}
                          alt={`${book.subtitle} Hardcover`}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="180px"
                        />
                      </div>
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

      {/* Omnibus Section */}
      {(() => {
        const omnibus = books.find(b => b.slug === "omnibus");
        if (!omnibus) return null;
        return (
          <section className="section" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-faint)", borderBottom: "1px solid var(--border-faint)" }}>
            <div className="container">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>
                
                {/* Covers display */}
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
                  <div style={{
                    position: "relative",
                    width: 170,
                    aspectRatio: "2/3",
                    borderRadius: "var(--r-lg)",
                    overflow: "hidden",
                    boxShadow: "0 15px 45px rgba(0,0,0,0.6)",
                    transform: "rotate(-3deg)",
                    zIndex: 1,
                  }}>
                    <Image
                      src={omnibus.coverImagePB}
                      alt={`${omnibus.subtitle} Paperback`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="170px"
                    />
                  </div>
                  <div style={{
                    position: "relative",
                    width: 170,
                    aspectRatio: "2/3",
                    borderRadius: "var(--r-lg)",
                    overflow: "hidden",
                    boxShadow: "0 15px 45px rgba(0,0,0,0.6)",
                    transform: "rotate(3deg)",
                    marginTop: "1.5rem",
                    zIndex: 2,
                  }}>
                    <Image
                      src={omnibus.coverImageHC}
                      alt={`${omnibus.subtitle} Hardcover`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="170px"
                    />
                  </div>
                </div>

                {/* Info and buy links */}
                <div>
                  <div className="label" style={{ marginBottom: "0.5rem" }}>Collected Edition</div>
                  <h2 className="display-md" style={{ marginBottom: "1rem" }}>
                    {omnibus.subtitle}
                  </h2>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                    {omnibus.description}
                  </p>
                  
                  <div className="card" style={{ marginBottom: "1.5rem", background: "var(--bg-raised)", borderColor: "var(--border)" }}>
                    {[
                      { k: "Paperback ISBN", v: omnibus.isbn_pb },
                      { k: "Hardcover ISBN", v: omnibus.isbn_hc },
                      { k: "Page Count", v: `${omnibus.pageCount} pages` },
                    ].map((row) => (
                      <div key={row.k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", padding: "0.4rem 0", borderBottom: "1px solid var(--border-faint)" }}>
                        <span style={{ color: "var(--text-faint)" }}>{row.k}</span>
                        <span style={{ color: "var(--text-muted)", fontFamily: row.k.includes("ISBN") ? "var(--font-mono)" : undefined }}>{row.v}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    {omnibus.buyLinks.map(link => (
                      <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className={link.label.includes("Amazon") ? "btn btn-gold" : "btn btn-outline"}>
                        {link.label}
                      </a>
                    ))}
                  </div>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>Paperback</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>ISBN: <span style={{ fontFamily: "var(--font-mono)" }}>{book.isbn_pb}</span></div>
            <a href={`https://www.amazon.com/dp/${book.asin_pb}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.78rem", color: "var(--gold)", display: "inline-block", marginTop: "0.25rem" }}>Order on Amazon →</a>
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>Hardcover</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>ISBN: <span style={{ fontFamily: "var(--font-mono)" }}>{book.isbn_hc}</span></div>
            <a href={`https://www.amazon.com/dp/${book.asin_hc}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.78rem", color: "var(--gold)", display: "inline-block", marginTop: "0.25rem" }}>Order on Amazon →</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--border-faint)", marginTop: "0.75rem", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
          <span style={{ color: "var(--text-faint)" }}>Ebook ISBN: <span style={{ fontFamily: "var(--font-mono)" }}>{book.isbn_ebook}</span></span>
          <span style={{ color: "var(--text-faint)" }}>Page Count: {book.pageCount} pages</span>
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

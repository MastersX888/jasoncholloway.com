import Link from "next/link";
import type { Metadata } from "next";
import { books } from "@/lib/data/books";

export const metadata: Metadata = {
  title: "Seventh City Press",
  description:
    "Seventh City Press is an independent literary imprint publishing fiction and criticism that refuses the division between imaginative and intellectual work. Founded and published by Jason Carroll Holloway.",
  alternates: {
    canonical: "https://jasoncholloway.com/press/",
  },
};

export default function PressPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
              <span className="label">The Imprint</span>
            </div>
            <h1 className="display-xl" style={{ marginBottom: "1rem" }}>
              Seventh City<br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Press</span>
            </h1>
            <p style={{ maxWidth: "52ch", color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.8 }}>
              An independent literary press dedicated to fiction and criticism that refuses the division
              between imaginative and intellectual work.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
            <div>
              <div className="section-label-row"><span className="label">About the Press</span></div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.93rem" }}>
                <p>
                  Seventh City Press was founded by Jason Carroll Holloway as the publishing home for work
                  that operates at the intersection of imaginative and intellectual ambition — novels that think,
                  and criticism that speaks.
                </p>
                <p>
                  The name comes from the seven cities of the Aldric tradition in the Masters X Trilogy: Prague, Paris,
                  Rome, Constantinople, Toledo, Uppsala, and the unnamed seventh, the city where the frequency was first
                  heard. A press named for a threshold.
                </p>
                <p>
                  All titles are distributed globally through IngramSpark, available through Amazon, Bookshop.org,
                  independent booksellers, and library systems worldwide.
                </p>
              </div>
            </div>

            <div>
              <div className="section-label-row"><span className="label">Current Catalog</span></div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {books.map((b) => {
                  const isHawkes = b.slug === "hawkes-monograph";
                  const isOmnibus = b.slug === "omnibus";
                  
                  let title = `${b.series}: ${b.subtitle}`;
                  let type = "Novel · Literary Fiction";
                  let status = "Releasing June 2026";
                  let href = `/books/masters-x/${b.slug}`;

                  if (isHawkes) {
                    title = b.title;
                    type = "Literary Criticism";
                    status = "Available June 2026"; // Standardized release
                    href = "/books/hawkes-monograph";
                  } else if (isOmnibus) {
                    type = "Collected Edition";
                    href = "/books/masters-x";
                  }

                  // Use hardcover ISBN for the press sheet listing to represent the premium edition
                  const isbn = b.isbn_hc || b.isbn_pb || "";

                  return (
                    <Link key={b.slug} href={href} style={{ textDecoration: "none" }}>
                      <div className="card" style={{ gap: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                          <div>
                            <div style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", marginBottom: "0.25rem" }}>{title}</div>
                            <div style={{ fontSize: "0.7rem", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{type}</div>
                          </div>
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <div className="badge">{status}</div>
                            {isbn && (
                              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-faint)", marginTop: "0.3rem" }}>ISBN: {isbn}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="divider" style={{ margin: "4rem 0" }} />

          {/* Distribution */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {[
              { label: "Global Distribution", value: "IngramSpark", detail: "Lightning Source network · 40,000+ retail and library accounts" },
              { label: "Online Retail", value: "Amazon", detail: "HC, PB, and Kindle editions — all markets" },
              { label: "Independent Retail", value: "Bookshop.org", detail: "Supporting independent booksellers" },
              { label: "Library Access", value: "OverDrive · Baker & Taylor", detail: "Available to public library systems worldwide" },
              { label: "Wholesale Discount", value: "55%", detail: "Standard trade terms · Returns accepted" },
            ].map((item) => (
              <div key={item.label} className="card">
                <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-faint)", marginBottom: "0.4rem" }}>{item.label}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--gold)", marginBottom: "0.25rem" }}>{item.value}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

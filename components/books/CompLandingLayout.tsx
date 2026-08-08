import Link from "next/link";
import PassageExcerpt from "@/components/books/PassageExcerpt";
import type { PassageBeat } from "@/lib/data/passages";

export interface CompLandingLayoutProps {
  h1: React.ReactNode;
  lede: string;
  children: React.ReactNode;
  /** Verbatim scene excerpts with optional links to moment pages. */
  excerpts: PassageBeat[];
  excerptsHeading?: string;
}

/** Comparison / readalike landing — framing prose + verbatim Masters X excerpts. */
export default function CompLandingLayout({
  h1,
  lede,
  children,
  excerpts,
  excerptsHeading = "From the Masters X Trilogy",
}: CompLandingLayoutProps) {
  return (
    <>
      <section className="page-header" style={{ paddingBottom: "3rem" }}>
        <div className="container">
          <div className="page-header-inner">
            <h1 className="display-lg" style={{ marginBottom: "1rem" }}>
              {h1}
            </h1>
            <p style={{ maxWidth: "60ch", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              {lede}
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", lineHeight: 1.8, color: "var(--text)" }}>
            {children}

            {excerpts.length > 0 && (
              <div style={{ marginTop: "1rem", paddingTop: "2rem", borderTop: "1px solid var(--border-faint)" }}>
                <h2 className="label" style={{ marginBottom: "1.5rem" }}>
                  {excerptsHeading}
                </h2>
                {excerpts.map((excerpt, i) => (
                  <div key={i} style={{ marginBottom: "2rem" }}>
                    <p
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--text-faint)",
                        lineHeight: 1.6,
                        marginBottom: "0.85rem",
                        maxWidth: "65ch",
                      }}
                    >
                      {excerpt.context}
                    </p>
                    <PassageExcerpt
                      paragraphs={excerpt.paragraphs}
                      attribution={excerpt.attribution}
                    />
                    {excerpt.href && (
                      <Link
                        href={excerpt.href}
                        className="nota-link"
                        style={{ fontSize: "0.78rem", color: "var(--gold)", marginTop: "0.75rem", display: "inline-block" }}
                      >
                        Full scene →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "1rem", padding: "3rem 0", borderTop: "1px solid var(--border-faint)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", marginBottom: "1rem" }}>Begin with Volume I</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
                Explore the research archive in the Analysis Chamber, or read curated scenes from the trilogy.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/books/masters-x" className="btn btn-gold">
                  Explore the Trilogy
                </Link>
                <Link href="/books/masters-x/moments" className="btn btn-outline">
                  From the Novel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { books } from "@/lib/data/books";
import { fieldNotes } from "@/lib/data/fieldNotes";

export const metadata: Metadata = {
  title: "Site Index",
  description: "Directory of the Jason Carroll Holloway official digital platform and Seventh City Press.",
  alternates: {
    canonical: "https://jasoncholloway.com/sitemap/",
  },
};

export default function SitemapPage() {
  const volumes = books.filter(b => b.series === "Masters X" && b.slug !== "omnibus");
  const monograph = books.find(b => b.slug === "hawkes-monograph");

  return (
    <>
      <section className="page-header" style={{ paddingBottom: "3rem" }}>
        <div className="container">
          <div className="page-header-inner">
            <h1 className="display-lg" style={{ marginBottom: "1rem" }}>
              Site Index
            </h1>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem", minHeight: "60vh" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "3rem" }}>
            
            {/* Primary Nav */}
            <div>
              <h2 className="label" style={{ marginBottom: "1.25rem", borderBottom: "1px solid var(--border-faint)", paddingBottom: "0.5rem" }}>Platform</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li><Link href="/" className="hover-gold">Home</Link></li>
                <li><Link href="/about" className="hover-gold">About the Author</Link></li>
                <li><Link href="/press" className="hover-gold">Seventh City Press</Link></li>
                <li><Link href="/contact" className="hover-gold">Contact & Rights</Link></li>
              </ul>
            </div>

            {/* Books */}
            <div>
              <h2 className="label" style={{ marginBottom: "1.25rem", borderBottom: "1px solid var(--border-faint)", paddingBottom: "0.5rem" }}>Publications</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li><Link href="/books/masters-x" className="hover-gold" style={{ fontWeight: 600 }}>Masters X Trilogy</Link></li>
                {volumes.map(v => (
                  <li key={v.slug} style={{ paddingLeft: "1rem" }}><Link href={`/books/masters-x/${v.slug}`} className="hover-gold">Volume {v.volume}: {v.subtitle}</Link></li>
                ))}
                {monograph && (
                  <li style={{ marginTop: "0.5rem" }}><Link href={`/books/${monograph.slug}`} className="hover-gold" style={{ fontWeight: 600 }}>{monograph.title}</Link></li>
                )}
              </ul>
            </div>

            {/* Field Notes */}
            <div>
              <h2 className="label" style={{ marginBottom: "1.25rem", borderBottom: "1px solid var(--border-faint)", paddingBottom: "0.5rem" }}>Field Notes</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li><Link href="/field-notes" className="hover-gold" style={{ fontWeight: 600 }}>Field Notes Index</Link></li>
                {fieldNotes.map(n => (
                  <li key={n.slug} style={{ paddingLeft: "1rem" }}><Link href={`/field-notes/${n.slug}`} className="hover-gold">{n.title}</Link></li>
                ))}
              </ul>
            </div>

            {/* Analysis Chamber */}
            <div>
              <h2 className="label" style={{ marginBottom: "1.25rem", borderBottom: "1px solid var(--border-faint)", paddingBottom: "0.5rem" }}>Virtual Research</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li><Link href="/chamber" className="hover-gold" style={{ fontWeight: 600 }}>Analysis Chamber</Link></li>
                <li style={{ paddingLeft: "1rem" }}><Link href="/chamber/folio-visualizer" className="hover-gold">Folio Visualizer</Link></li>
                <li style={{ paddingLeft: "1rem" }}><Link href="/chamber/harmonic-stack" className="hover-gold">Harmonic Stack</Link></li>
                <li style={{ paddingLeft: "1rem" }}><Link href="/chamber/global-map" className="hover-gold">Global Map</Link></li>
                <li style={{ paddingLeft: "1rem" }}><Link href="/chamber/schumann-baseline" className="hover-gold">Schumann Monitor</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jason C. Holloway holds an M.A. in English Literature from Mercy University and is a writer and researcher whose work explores the intersection of acoustic science, medieval scholarship, and human consciousness. He is the author of the Masters X Trilogy, published by Seventh City Press.",
  alternates: {
    canonical: "https://jasoncholloway.com/about/",
  },
  openGraph: {
    url: "https://jasoncholloway.com/about/",
    images: [{ url: "https://jasoncholloway.com/og-image.png", width: 1200, height: 630, alt: "Jason C. Holloway — Masters X Trilogy" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "dateCreated": "2026-06-05T00:00:00Z",
            "mainEntity": {
              "@type": "Person",
              "@id": "https://jasoncholloway.com/#person",
              "name": "Jason Carroll Holloway",
              "alternateName": "Jason C. Holloway",
              "url": "https://jasoncholloway.com/",
              "jobTitle": "Author",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kansas City",
                "addressRegion": "MO",
                "addressCountry": "US"
              },
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Mercy University"
              },
              "knowsAbout": [
                "Voynich Manuscript",
                "Ars Notoria",
                "archaeoacoustics",
                "SubTropolis",
                "Strahov Monastery",
                "medieval manuscripts",
                "John Hawkes",
                "acoustic frequency",
                "conspiracy fiction"
              ],
              "worksFor": { "@id": "https://jasoncholloway.com/#organization" },
              "sameAs": [
                "https://amazon.com/author/jasoncholloway",
                "https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway"
              ]
            }
          })
        }}
      />
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
              <span className="label">The Author</span>
            </div>
            <h1 className="display-xl" style={{ marginBottom: "1rem" }}>
              Jason Carroll<br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Holloway</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "4rem", alignItems: "start" }}>
            <div>

              {/* About the Author */}
              <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
                <span className="label">About the Author</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", color: "var(--text-muted)", lineHeight: 1.9, fontSize: "1rem", marginBottom: "3rem" }}>
                <p>
                  Jason C. Holloway holds an M.A. in English Literature from Mercy University in Dobbs Ferry,
                  New York, as well as various degrees and certificates in Psychology, Sociology, Creative Writing,
                  and Data Analytics. He is a writer and researcher whose work explores the intersection of
                  acoustic science, medieval scholarship, and human consciousness. He lives in Kansas City.
                </p>
                <p>
                  The Masters X Trilogy follows Blake Masters, Nadia Volkov, and Andrew Chen across three novels.
                  The research program they construct in the fiction is built from real data: cave acoustics,
                  cathedral measurements, and medieval text traditions. The Analysis Chamber on this site runs the
                  same data Andrew runs in the novels.
                </p>
                <p>
                  Holloway&apos;s monograph on John Hawkes began as a Masters thesis and became something
                  larger: an account of how a writer can use a single recurring image to dismantle an entire
                  theological tradition across seventeen novels.
                </p>
                <p>
                  Seventh City Press was founded as the publishing home for work that operates at the
                  intersection of imaginative and intellectual ambition: novels that think, and criticism
                  that speaks.
                </p>
              </div>

              <div className="divider" style={{ margin: "3rem 0" }} />

              <div>
                <div className="label" style={{ marginBottom: "1.5rem" }}>Selected Works</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {[
                    {
                      title: "Masters X: The Inheritance of Frequency",
                      type: "Novel · Volume 1",
                      publisher: "Seventh City Press, 2026",
                      desc: "Seven notebooks. Thirty years of classified acoustic research. A sealed crypt beneath Prague.",
                    },
                    {
                      title: "Masters X: The Grimoire",
                      type: "Novel · Volume 2",
                      publisher: "Seventh City Press, 2026",
                      desc: "The Ars Notoria decoded. A preparation protocol for the frequency. Twenty-three candidates waiting.",
                    },
                    {
                      title: "Masters X: The Kingdom",
                      type: "Novel · Volume 3",
                      publisher: "Seventh City Press, 2026",
                      desc: "The demonstration. The argument. The open-source release. 1.2 million downloads.",
                    },
                    {
                      title: "Innocence, Desire, and the Architecture of the Fall",
                      type: "Literary Criticism",
                      publisher: "Seventh City Press, 2026",
                      desc: "The grape and its counter-symbols in the fiction of John Hawkes.",
                    },
                  ].map((work) => (
                    <div key={work.title} style={{ padding: "1.25rem", background: "var(--bg-surface)", borderRadius: "var(--r-md)", border: "1px solid var(--border)" }}>
                      <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.4rem" }}>{work.type}</div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: "0.25rem" }}>{work.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-faint)", marginBottom: "0.5rem" }}>{work.publisher}</div>
                      <div style={{ fontSize: "0.83rem", color: "var(--text-muted)", fontStyle: "italic" }}>{work.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{
                aspectRatio: "3/4",
                background: "linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-raised) 100%)",
                borderRadius: "var(--r-xl)",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                color: "var(--text-faint)",
                fontSize: "0.8rem",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  top: "0", left: "0", right: "0", bottom: "0",
                  background: "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
                }}></div>
                <div style={{ fontSize: "2rem", opacity: 0.3, fontFamily: "var(--font-display)", fontStyle: "italic" }}>JCH</div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", zIndex: 1 }}>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "0.05em" }}>Author Portrait</span>
                  <span style={{ fontSize: "0.75rem", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.15em" }}>Coming Soon</span>
                </div>
              </div>

              {/* Credentials card */}
              <div className="card" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                <div className="label" style={{ marginBottom: "1rem" }}>Credentials</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.85rem", color: "var(--text)", lineHeight: 1.5 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--gold)", marginBottom: "0.1rem" }}>M.A., English Literature</div>
                    <div style={{ color: "var(--text-faint)", fontSize: "0.8rem" }}>Mercy University, Dobbs Ferry, NY</div>
                  </div>
                  <div style={{ borderTop: "1px solid var(--border-faint)", paddingTop: "1rem" }}>
                    <div style={{ fontWeight: 600, color: "var(--gold)", marginBottom: "0.1rem" }}>B.A., Psychology/Sociology</div>
                    <div style={{ color: "var(--text-faint)", fontSize: "0.8rem" }}>Columbia College, Columbia, MO</div>
                  </div>
                  <div style={{ borderTop: "1px solid var(--border-faint)", paddingTop: "1rem" }}>
                    <div style={{ fontWeight: 600, color: "var(--gold)", marginBottom: "0.1rem" }}>Certifications</div>
                    <div style={{ color: "var(--text-faint)", fontSize: "0.8rem" }}>Creative Writing &amp; Data Analytics</div>
                  </div>
                </div>
              </div>

              {/* Press contact */}
              <div className="card" style={{ background: "var(--gold-glow)", borderColor: "var(--gold-dim)" }}>
                <div className="label" style={{ marginBottom: "0.75rem" }}>Publisher</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  Seventh City Press<br />
                  Jason C. Holloway, Publisher
                </p>
                <a href="mailto:press@jasoncholloway.com" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                  Contact for Rights and Press
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


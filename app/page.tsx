import Link from "next/link";
import Image from "next/image";
import { books } from "@/lib/data/books";
import WaveformHero from "@/components/chamber/WaveformHero";
import NewsletterForm from "@/components/layout/NewsletterForm";
import WaveDivider from "@/components/ui/WaveDivider";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Jason Carroll Holloway — Masters X Trilogy | Seventh City Press",
  titleAbsolute: true,
  description:
    "Beneath Kansas City's SubTropolis, a fired security guard inherits 30 years of classified research. The Masters X Trilogy — where the Voynich Manuscript, the Ars Notoria, and a 111 Hz frequency converge.",
  socialTitle: "Jason Carroll Holloway | Masters X Trilogy — Available Now",
  path: "/",
});

const pullQuotes = [
  {
    text: "Those aren't diagrams, they're technical specifications.",
    speaker: "Andrew Chen",
    ref: "Book I",
  },
  {
    text: "The preparation is not about the frequency. The preparation is about the organism that will receive it.",
    speaker: "Nadia Volkov",
    ref: "Book II",
  },
  {
    text: "The gate is not arbitrary. The gate is the body. The body requires time. This is not theology. This is physics. This is love.",
    speaker: "Blake Masters",
    ref: "Book III",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "mainEntity": {
              "@id": "https://jasoncholloway.com/#person"
            }
          })
        }}
      />
      <section className="hero">
        <div className="hero-bg" data-version="groundswell-v4" />
        <WaveformHero />
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow animate-fade-up">
              <div className="hero-eyebrow-line" />
              <span className="label">The Masters X Trilogy · Seventh City Press</span>
            </div>

            <h1 className="hero-title animate-fade-up delay-1" style={{ fontSize: "clamp(2.5rem, 6vw, 4.8rem)", lineHeight: 1.1 }}>
              Jason Carroll<br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Holloway</span>
            </h1>

            <p className="hero-sub animate-fade-up delay-2" style={{ maxWidth: "55ch", marginBottom: "2rem" }}>
              What the medieval masters encoded in cathedral geometry, grimoire tradition,
              and acoustic stonework wasn&apos;t mysticism. The Masters X Trilogy is the account of proving it.
            </p>

            <div className="animate-fade-up delay-3" style={{ maxWidth: "580px", marginBottom: "1.5rem" }}>
              <NewsletterForm compact={false} />
            </div>

            <div className="hero-ctas animate-fade-up delay-3" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", marginBottom: "3.5rem" }}>
              <Link href="/books/masters-x" className="btn btn-outline">
                Explore the Catalog
              </Link>
              <Link href="/chamber" className="btn btn-ghost" style={{ color: "var(--cyan)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--cyan)", display: "inline-block", marginRight: "0.4rem" }} />
                Analysis Chamber
              </Link>
            </div>

            <div className="artifact-strip animate-fade-up delay-4" role="list">
              <div className="artifact-item" role="listitem">
                <div className="artifact-img-wrap">
                  <img
                    src="/field-notes/voynich-folio-thumb.jpg"
                    alt="Voynich Manuscript folio f68r3 — Beinecke MS 408"
                    width={120} height={80}
                    style={{ objectFit: "cover", width: "100%", height: "100%", objectPosition: "center 40%" }}
                    loading="lazy"
                  />
                </div>
                <span className="artifact-caption">
                  Voynich MS · Folio f68r3 · Beinecke MS 408
                </span>
              </div>
              <div className="artifact-divider" aria-hidden="true" />
              <div className="artifact-item" role="listitem">
                <div className="artifact-img-wrap artifact-img-wave">
                  <svg viewBox="0 0 120 48" width="120" height="48" aria-hidden="true"
                       style={{ display: "block" }}>
                    <path
                      d="M0 24 Q10 8 20 24 Q30 40 40 24 Q50 8 60 24 Q70 40 80 24 Q90 8 100 24 Q110 40 120 24"
                      fill="none" stroke="var(--cyan)" strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <span className="artifact-caption">
                  111.2 Hz · Standing wave · limestone chamber
                </span>
              </div>
              <div className="artifact-divider" aria-hidden="true" />
              <div className="artifact-item" role="listitem">
                <div className="artifact-img-wrap">
                  <img
                    src="/field-notes/subtropolis-entrance.jpg"
                    alt="SubTropolis underground facility entrance, Kansas City, Missouri"
                    width={120} height={80}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    loading="lazy"
                  />
                </div>
                <span className="artifact-caption">
                  SubTropolis · Kansas City, MO
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <WaveDivider />
      </div>

      {/* ─── FEATURED WORKS ─── */}
      <section className="section" style={{ borderTop: "1px solid var(--border-faint)", background: "var(--bg-surface)" }}>
        <div className="container">
          <div className="section-label-row">
            <span className="label">Featured Publications</span>
          </div>

          <div className="resp-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "stretch" }}>
            
            {/* Masters X Trilogy Card */}
            <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2.5rem" }}>
              <div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>
                  Fiction · Speculative Mystery
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 400, marginBottom: "1rem" }}>
                  The Masters X Trilogy
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                  Blake Masters inherits a safety deposit box his grandfather paid for fifty-seven years in advance,
                  timed to arrive at the exact moment Blake would be ready. Inside: seven notebooks.
                  Thirty years of classified acoustic research. A cross-reference to a sealed crypt beneath Prague.
                  The trilogy is the account of what he did with that knowledge — and what it did to him.
                </p>

                {/* Volume and omnibus covers */}
                {(() => {
                  const volumes = books.filter((b) => b.series === "Masters X" && b.slug !== "omnibus");
                  const omnibus = books.find((b) => b.slug === "omnibus");
                  const coverThumb = (src: string, alt: string, aspect = "55/85") => (
                    <div key={alt} style={{
                      position: "relative",
                      width: "72px",
                      aspectRatio: aspect,
                      borderRadius: "var(--r-sm)",
                      overflow: "hidden",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                      border: "1px solid var(--border-faint)",
                      flexShrink: 0,
                    }}>
                      <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="72px" />
                    </div>
                  );
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", margin: "2rem 0" }}>
                      <div>
                        <div style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.6rem", textAlign: "center" }}>
                          Paperback Editions
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                          {volumes.map((b) => coverThumb(b.coverImagePB, `${b.subtitle} paperback`))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.6rem", textAlign: "center" }}>
                          Hardcover Editions
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                          {volumes.map((b) => coverThumb(b.coverImageHC, `${b.subtitle} hardcover`, "614/921"))}
                        </div>
                      </div>
                      {omnibus && (
                        <div>
                          <div style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.6rem", textAlign: "center", fontWeight: 600 }}>
                            Omnibus Edition · Complete Trilogy
                          </div>
                          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                            <Link href="/books/masters-x/omnibus" style={{ textDecoration: "none" }}>
                              <div style={{
                                position: "relative",
                                width: "120px",
                                aspectRatio: "614/921",
                                borderRadius: "var(--r-sm)",
                                overflow: "hidden",
                                boxShadow: "0 14px 35px rgba(0,0,0,0.55)",
                                border: "1px solid var(--gold-dim, var(--border-faint))",
                              }}>
                                <Image src={omnibus.coverImageHC} alt="Masters X Omnibus hardcover case" fill style={{ objectFit: "cover" }} sizes="120px" priority />
                              </div>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                <Link href="/books/masters-x" className="btn btn-gold" style={{ flex: 1, justifyContent: "center", minWidth: "140px" }}>
                  View Trilogy
                </Link>
                <Link href="/books/masters-x/the-inheritance-of-frequency" className="btn btn-outline" style={{ flex: 1, justifyContent: "center", minWidth: "140px" }}>
                  Volume I Details
                </Link>
                <Link href="/books/masters-x/omnibus" className="btn btn-outline" style={{ flex: 1, justifyContent: "center", minWidth: "140px" }}>
                  Omnibus Edition
                </Link>
              </div>
            </div>

            {/* Hawkes Monograph Card */}
            <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2.5rem" }}>
              <div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>
                  Literary Criticism · Available Now
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 400, marginBottom: "1rem" }}>
                  Innocence, Desire, and the Architecture of the Fall
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                  A study of John Hawkes across his complete seventeen-novel corpus. Holloway traces how the grape,
                  fermented, animal, transgressive, functions as a counter-symbol to Christian grace throughout
                  Hawkes&apos;s fiction, mapping the symbolic architecture of America&apos;s most demanding postmodern writer.
                </p>

                {/* Monograph Cover */}
                <div style={{ display: "flex", margin: "2rem 0", justifyContent: "center" }}>
                  <div style={{
                    position: "relative",
                    width: "80px",
                    aspectRatio: "2/3",
                    borderRadius: "var(--r-sm)",
                    overflow: "hidden",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                    border: "1px solid var(--border-faint)",
                    background: "#000",
                  }}>
                    <Image
                      src="/covers/hawkes-paperback-web.png"
                      alt="Cover of Innocence, Desire, and the Architecture of the Fall, a study of John Hawkes by Jason Carroll Holloway"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="80px"
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                <Link href="/books/hawkes-monograph" className="btn btn-gold" style={{ flex: 1, justifyContent: "center" }}>
                  View Monograph
                </Link>
                <Link href="/about" className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>
                  About the Project
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="container">
        <WaveDivider />
      </div>

      {/* ─── PULL QUOTES ─── */}
      <section className="section" style={{ borderTop: "1px solid var(--border-faint)", borderBottom: "1px solid var(--border-faint)" }}>
        <div className="container">
          <div className="grid-3" style={{ gap: "2rem" }}>
            {pullQuotes.map((q, i) => (
              <div key={i} className="ms-pull" style={{ margin: 0 }}>
                <p>{q.text}</p>
                <cite>{q.speaker} · {q.ref}</cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <WaveDivider />
      </div>

      {/* ─── GROUNDED IN REAL PLACES ─── */}
      <section className="section" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-faint)" }}>
        <div className="container">
          <div className="section-label-row">
            <span className="label">Grounded in Real Places</span>
          </div>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "2rem", maxWidth: "800px" }}>
            The trilogy is built on documented history. Every location in the novels can be visited, looked up, or found in a scholarly bibliography. Explore the research archive beneath the fiction:
          </p>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center", padding: "1.5rem 0", borderTop: "1px solid var(--border-faint)", borderBottom: "1px solid var(--border-faint)" }}>
            <span style={{ color: "var(--gold)", fontWeight: 500, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>The Field Notes:</span>
            <Link href="/field-notes/subtropolis" className="link" style={{ fontWeight: 500 }}>The City Beneath Kansas City</Link>
            <Link href="/field-notes/111-hz" className="link" style={{ fontWeight: 500 }}>The 111 Hz Phenomenon</Link>
            <Link href="/field-notes/voynich-manuscript" className="link" style={{ fontWeight: 500 }}>The Undeciphered Codex</Link>
            <Link href="/field-notes/ars-notoria" className="link" style={{ fontWeight: 500 }}>The Technology of Memory</Link>
            <Link href="/field-notes/strahov-monastery" className="link" style={{ fontWeight: 500 }}>The 12th-Century Chained Library</Link>
          </div>
          
          <div style={{ marginTop: "2rem" }}>
            <Link href="/field-notes" className="btn btn-outline">
              View the Complete Archive
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        <WaveDivider />
      </div>

      {/* ─── VIRTUAL ANALYSIS CHAMBER ─── */}
      <section className="section">
        <div className="container">
          <div className="resp-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4.5rem", alignItems: "center" }}>
            <div>
              <div className="section-label-row">
                <span className="label-cyan">Virtual Research Tool</span>
              </div>
              <h2 className="display-md" style={{ marginBottom: "1.5rem" }}>
                The Masters Analysis Chamber
              </h2>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1rem", marginBottom: "1.5rem" }}>
                The data underlying the trilogy is real. Cave resonance measurements converging near 111 Hz,
                documented across four continents. Medieval cathedral proportions encoding acoustic specifications.
                The Ars Notoria as a structured training protocol. The Chamber isn&apos;t an illustration of the novels
                — it&apos;s the research archive that preceded them, built open and accessible.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1rem", marginBottom: "2rem" }}>
                The Folio Pattern Visualizer lets you stack and rotate 181 historical manuscript pages from the
                Voynich Manuscript and Ars Notoria, watching sacred geometry overlay and tessellate into
                interference patterns. This is the pattern Blake saw. The one the books describe.
                You can see it for yourself.
              </p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Link href="/chamber" className="btn btn-gold">
                  Enter the Chamber
                </Link>
                <Link href="/chamber/folio-visualizer" className="btn btn-outline" style={{ color: "var(--cyan)", borderColor: "var(--cyan-dim)" }}>
                  Try the Folio Visualizer
                </Link>
              </div>
            </div>

            {/* Chamber Mockup graphic */}
            <div style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-xl)",
              padding: "2rem",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}>
              <div className="label-cyan" style={{ borderBottom: "1px solid var(--border-faint)", paddingBottom: "0.75rem" }}>
                Active Session Monitor
              </div>
              
              {[
                { label: "Layer I: Harmonic Stack", desc: "111.2 → 444.8 Hz derivations" },
                { label: "Layer II: Global Cave Map", desc: "9 sites mapped Convergent at ~111 Hz" },
                { label: "Layer III: Schumann Monitor", desc: "7.83 Hz real-time baseline" },
                { label: "Layer IV: Folio Visualizer", desc: "181 database leaves overlayable" },
              ].map((layer, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text)" }}>{layer.label}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-faint)" }}>{layer.desc}</div>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--cyan)" }}>
                    [ONLINE]
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT / IMMERSIVE BRAND ─── */}
      <section className="section" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-faint)" }}>
        <div className="container">
          <div className="grid-2" style={{ gap: "4rem", alignItems: "center" }}>
            <div>
              <div className="section-label-row">
                <span className="label">The Imprint & The Author</span>
              </div>
              <h2 className="display-md" style={{ marginBottom: "1.25rem" }}>Jason Carroll Holloway</h2>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Link href="/about" className="btn btn-outline">About the Author</Link>
                <a href="https://seventhcitypress.com/" className="btn btn-ghost">Seventh City Press</a>
              </div>
            </div>

            <div style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-xl)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}>
              <div className="label" style={{ marginBottom: "0.5rem" }}>Catalog Distribution Details</div>
              {[
                { label: "Publisher", value: "Seventh City Press" },
                { label: "Imprint", value: "Seventh City Press" },
                { label: "Release Date", value: "June 1, 2026" },
                { label: "Formats Available", value: "Hardcover · Paperback · Ebook" },
                { label: "Global Distribution", value: "IngramSpark · Bookshop.org · Kindle · Google Play" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-faint)" }}>
                  <span style={{ color: "var(--text-faint)" }}>{item.label}</span>
                  <span style={{ color: "var(--text-muted)" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

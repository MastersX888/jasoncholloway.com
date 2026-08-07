import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Virtual Masters Analysis Chamber",
  description:
    "Interactive acoustic research tools from Masters X — harmonic stack, cave map, Schumann baseline, and the open research archive.",
  path: "/chamber/",
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Analysis Chamber",
      "item": "https://jasoncholloway.com/chamber/"
    }
  ]
};

const panels = [
  {
    layer: "Layer I",
    icon: "∿",
    title: "Harmonic Stack Explorer",
    subtitle: "The Ars Notoria as Acoustic Engineering",
    desc: "The 14 major notae of the Ars Notoria are not symbolic diagrams. They are acoustic specifications — each encoding a body position, gematria derivation, and precise harmonic frequency output. Andrew decoded the first in Book II (the Raphael nota, 333.6 Hz). This explorer lets you work through the full stack.",
    freq: "111.2 → 444.8 Hz",
    href: "/chamber/harmonic-stack",
    book: "Book II, Chapters 12–25",
    quote: "Not just the stack. They had the body positions. They mapped the human body as an acoustic instrument and wrote the tuning manual.",
  },
  {
    layer: "Layer II",
    icon: "⊕",
    title: "Global Cave Site Map",
    subtitle: "Convergence Toward 111 Hz",
    desc: "Iceland basalt (111.0 Hz). Ghana laterite (111.7 Hz). Kansas City limestone (109.0 Hz). Chartres limestone (110.5 Hz). Nine documented sites across four continents, each with its own geological signature — all converging within 3% of the fundamental. The map is interactive; each site opens a modal with geological data, manuscript excerpts, and frequency comparison.",
    freq: "9 sites · 4 continents",
    href: "/chamber/global-map",
    book: "Books I–III",
    quote: "Every geology produces its own song.",
  },
  {
    layer: "Layer III",
    icon: "〜",
    title: "Schumann Resonance Baseline",
    subtitle: "The Earth's Electromagnetic Heartbeat",
    desc: "7.83 Hz is the resonant frequency of the earth's electromagnetic cavity — the space between the surface and the ionosphere. Andrew's Iceland control module monitored it continuously, 24/7. It is the ground truth beneath every other measurement in the research. This oscilloscope renders the Schumann resonance and its five modes in real time.",
    freq: "7.83 Hz · 5 modes",
    href: "/chamber/schumann-baseline",
    book: "Book III, Chapter 1",
    quote: "The 7.83 Hz hummed on the cave monitors. He did not turn those off. He would never turn those off.",
  },
  {
    layer: "Layer IV",
    icon: "≋",
    title: "Tremor Convergence Analysis",
    subtitle: "The Carrier Frequency — Within 0.04 Hz",
    desc: "Blake's bilateral tremor baseline: 111.2 Hz. Iceland cave fundamental: 111.0 Hz. Ghana laterite: 111.7 Hz. Andrew's laser vibrometer model resonated at 111.19 Hz — within four-hundredths of a hertz of the target. This convergence plot visualizes the match between biological baseline, geological environment, and preparation protocol specification.",
    freq: "Δf < 0.04 Hz",
    href: "/chamber/tremor-analysis",
    book: "Book II, Chapter 29",
    quote: "The model resonated at 111.19 Hz. Within four-hundredths of a hertz. The data was clean. The proof of concept was proved. It works.",
  },
  {
    layer: "Layer V",
    icon: "⬡",
    title: "Research Archive",
    subtitle: "The 247-Page Distribution File",
    desc: "Andrew released seven years of acoustic consciousness research as Creative Commons at midnight in Book III. The distribution file — 247 pages — contained preparation protocols, chamber specifications, harmonic derivations, facilitator training, and acoustic appendices. 1.2 million downloads, 47 countries, translated into five languages within the first week.",
    freq: "1.2M downloads · CC0",
    href: "/chamber/research-archive",
    book: "Book III, Chapter 14",
    quote: "The key made a click. The click was approximately 3,200 Hz, a brief percussive event that lasted four milliseconds and that was, Andrew reflected, the most consequential four milliseconds of his career.",
  },
  {
    layer: "Layer VI",
    icon: "⧉",
    title: "Folio Pattern Visualizer",
    subtitle: "Tessellation & Layer Stacking Stage",
    desc: "The books describe how the sacred geometry from the folios, when overlayed, tesselates and creates new patterns. Only by overlaying multiple pages can you see what Blake was seeing. Stack historical folios (Voynich Manuscript, Ars Notoria Notae) in this interactive workspace. Align them to the secret angles to achieve Harmonic Resonance.",
    freq: "181 folios · Blend Stage",
    href: "/chamber/folio-visualizer",
    book: "Book II, Chapter 24",
    quote: "The Voynich biological section isn't depicting one chamber. It's depicting eight. Connected by the tube system, the acoustic pathways...",
  },
];

export default function ChamberPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="page-header page-header-chamber">
        <div className="container">
          <div className="page-header-inner">
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", alignItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 12px var(--cyan)" }} />
              <span className="label-cyan">Virtual Research Tool · Masters X Trilogy</span>
            </div>

            <h1 className="display-xl" style={{ marginBottom: "1rem" }}>
              Masters Analysis<br />
              <span className="glow-cyan">Chamber</span>
            </h1>

            <p style={{ maxWidth: "58ch", color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Andrew Chen spent seven years building an acoustic consciousness research platform.
              What follows is a faithful replication — six interactive layers letting you explore the
              manuscript&apos;s central claim: that specific frequencies embedded in ancient notation systems
              correspond to measurable neurological states.
            </p>

            <div style={{
              display: "inline-flex",
              background: "var(--bg-surface)",
              border: "1px solid var(--cyan-dim)",
              borderRadius: "var(--r-md)",
              padding: "0.75rem 1.25rem",
              gap: "2rem",
              flexWrap: "wrap",
            }}>
              {[
                { v: "7.83 Hz", l: "Schumann Baseline" },
                { v: "111.2 Hz", l: "Carrier Frequency" },
                { v: "333.6 Hz", l: "Raphael Harmonic" },
                { v: "444.8 Hz", l: "Coherence Threshold" },
              ].map((item) => (
                <div key={item.l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-mono)", color: "var(--cyan)", fontSize: "1rem", lineHeight: 1 }}>{item.v}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-faint)", letterSpacing: "0.08em", marginTop: "0.25rem" }}>{item.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Panels */}
      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {panels.map((panel) => (
              <Link key={panel.href} href={panel.href} style={{ textDecoration: "none" }}>
                <div className="card card-cyan" style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "2rem", alignItems: "start", padding: "2rem" }}>
                  <div style={{ textAlign: "center" }}>
                    <div className="chamber-panel-icon" style={{ width: 60, height: 60, fontSize: "1.8rem", margin: "0 auto 0.75rem" }}>{panel.icon}</div>
                    <div className="label-cyan" style={{ fontSize: "0.62rem" }}>{panel.layer}</div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 500 }}>{panel.title}</h2>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--cyan)", whiteSpace: "nowrap" }}>{panel.freq}</span>
                    </div>
                    <p style={{ color: "var(--gold)", fontSize: "0.8rem", fontStyle: "italic", marginBottom: "0.75rem" }}>{panel.subtitle}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1rem" }}>{panel.desc}</p>
                    <div style={{ borderLeft: "2px solid var(--cyan-dim)", paddingLeft: "1rem" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                        &ldquo;{panel.quote}&rdquo;
                      </p>
                      <p style={{ fontSize: "0.7rem", color: "var(--cyan)", marginTop: "0.25rem", letterSpacing: "0.08em" }}>{panel.book}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ padding: "3rem 0", borderTop: "1px solid var(--border-faint)" }}>
        <div className="container">
          <div style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-lg)",
            padding: "1.5rem 2rem",
            fontSize: "0.82rem",
            color: "var(--text-faint)",
            lineHeight: 1.7,
          }}>
            <strong style={{ color: "var(--text-muted)" }}>Research Note:</strong> The Analysis Chamber replicates the fictional research system developed by Andrew Chen in the Masters X Trilogy. Frequency values, cave site data, Ars Notoria harmonic derivations, and gematria calculations are drawn directly from the manuscript text. The Schumann resonance (7.83 Hz) is a real geophysical measurement. All other claims exist within the world of the novels and should be read as literary speculation grounded in historical sources (Ars Notoria, Strahov Library archives, Chartres acoustic studies).
          </div>
        </div>
      </section>

      <section style={{ padding: "4rem 0", borderTop: "1px solid var(--border-faint)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            marginBottom: "0.75rem"
          }}>
            Research companion to the Masters X Trilogy
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 500,
            marginBottom: "1rem",
            color: "var(--text)"
          }}>
            The data is real. The story is the account of what it means.
          </h2>
          <p style={{
            color: "var(--text-muted)",
            maxWidth: "52ch",
            margin: "0 auto 2rem",
            lineHeight: 1.75,
            fontSize: "0.95rem"
          }}>
            The Analysis Chamber precedes the trilogy — the research archive that Andrew Chen
            built before Blake understood what it proved. The novels are the account of what
            happened when he understood.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/books/masters-x/" className="btn btn-gold">
              View the Trilogy
            </a>
            <a href="/books/masters-x/the-inheritance-of-frequency/" className="btn btn-outline">
              Start with Volume I
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

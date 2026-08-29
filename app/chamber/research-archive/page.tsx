import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Research Archive — Virtual Masters Analysis Chamber",
  description:
    "The 247-page distribution file released by Andrew Chen. Seven years of acoustic consciousness research. 1.2 million downloads. Creative Commons.",
  path: "/chamber/research-archive/",
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
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Research Archive",
      "item": "https://jasoncholloway.com/chamber/research-archive/"
    }
  ]
};

const archiveSections = [
  {
    id: "prep-protocols",
    section: "Part I",
    title: "Preparation Protocols",
    pages: "pp. 1–58",
    summary: "The 52-week preparation curriculum documented by the William Masters Foundation following Blake's initial results. Includes the reading list of 23 texts (the Strahov/Charles University sequence), weekly facilitator instructions, candidate screening criteria (EEG baseline requirements, cardiac thresholds), and the adverse event protocol developed after the Maryland incident.",
    chapterRef: "Book II, Chapters 14–28; Book III, Chapters 1–8",
    keyContent: [
      "23-text reading sequence (full Premonstratensian corpus; chamber annotates core 15)",
      "EEG baseline screening: candidate must demonstrate spontaneous beta coherence >40%",
      "Cardiac monitoring thresholds: session pull at <40 BPM",
      "6-hour session maximum (Nadia's condition)",
      "Post-session integration protocol: 72 hours minimum",
    ],
    status: "Documented",
  },
  {
    id: "chamber-specs",
    section: "Part II",
    title: "Chamber Specifications",
    pages: "pp. 59–112",
    summary: "Technical specifications for constructing a preparation chamber from locally sourced geological materials. Derived from Andrew's Iceland basalt field configuration. Includes substrate selection guide (frequency response tables for 14 rock types), dimensional specifications, mirror array configuration (the 12-mirror Moreau configuration), acoustic dampening requirements, and monitoring equipment setup.",
    chapterRef: "Book II, Chapters 6–11; Book III, Chapters 12–14",
    keyContent: [
      "Preferred substrate: basalt (volcanic extrusive) — produces 109–112 Hz range",
      "Alternative: andesite (109.3 Hz confirmed by Kyoto University replication)",
      "Chamber dimensions: minimum 3m × 3m × 2.4m",
      "12-mirror Moreau configuration (original 1843 design recovered from Brill Archive)",
      "Monitoring requirements: EEG (64-channel minimum), cardiac, seismograph",
    ],
    status: "Documented",
  },
  {
    id: "harmonic-derivations",
    section: "Part III",
    title: "Harmonic Frequency Derivations",
    pages: "pp. 113–178",
    summary: "Andrew's full derivation of the harmonic stack from the Ars Notoria notae. Includes gematria analysis of all 14 major notae, the body-position coupling model (the central theoretical contribution), the frequency response curves for each harmonic, and the 40 inversion frequencies documented in the supplementary appendix.",
    chapterRef: "Book II, Chapters 12–25",
    keyContent: [
      "14 major notae → 14 harmonic frequencies (111.2 to 444.8 Hz + inversions)",
      "Gematria method: Hebrew letter values + coupling factor (1.073–1.101 range)",
      "Body-position coupling model: 47 pages of acoustic engineering specifications",
      "40 inversion frequencies: the counter-frequencies documented in Moreau's journals",
      "Cathedral cross-reference: Chartres (110.5 Hz) and Reims (108.9 Hz) derivations",
    ],
    status: "Documented",
  },
  {
    id: "facilitator-training",
    section: "Part IV",
    title: "Facilitator Training Manual",
    pages: "pp. 179–220",
    summary: "Training documentation for the 1,200 certified facilitators operating the Foundation's global listening site network. Developed from Nadia Volkov's institutional protocols. Includes session management, adverse event response, candidate psychological preparation, post-session integration support, and the boundary maintenance framework Blake developed after the Maryland incident analysis.",
    chapterRef: "Book III, Chapters 5–11",
    keyContent: [
      "Session management: pre-session EEG baseline, in-session monitoring, post-session protocol",
      "Adverse event response: three tiers (observe, intervene, terminate)",
      "Candidate psychological preparation: 8-week pre-protocol orientation",
      "Post-session integration: 72-hour minimum, facilitator daily check-in",
      "412 global listening sites operating as of Book III epilogue",
    ],
    status: "Documented",
  },
  {
    id: "acoustic-appendix",
    section: "Appendix",
    title: "Acoustic Research Appendix",
    pages: "pp. 221–247",
    summary: "Technical appendices including: (A) full seismographic data from the Iceland basalt field, Ghana laterite caves, and Kansas City limestone, (B) EEG session logs from the 23 Foundation candidates, anonymized, (C) the Kyoto University replication data (andesite, 109.3 Hz), (D) the Buenos Aires and Lagos replication confirmations, and (E) Andrew's final personal research notes, written in the Iceland control module in the 72 hours before the public release.",
    chapterRef: "Book III, Chapters 13–14",
    keyContent: [
      "Seismographic data: Iceland (111.0), Ghana (111.7), Kansas City (109.0), Prague (111.2) Hz",
      "EEG logs: 23 candidates, full harmonic progression records",
      "Kyoto replication: andesite, 109.3 Hz (within 1.6% of fundamental)",
      "Buenos Aires and Lagos confirmations: 110.8 and 110.1 Hz respectively",
      "Andrew's personal notes: 23 pages, midnight before the release",
    ],
    status: "Documented",
  },
];

const downloadStats = [
  { value: "1.2M", label: "Downloads — Week 1" },
  { value: "47", label: "Countries" },
  { value: "5", label: "Translations — Community" },
  { value: "3", label: "Independent Replications" },
  { value: "247", label: "Pages" },
  { value: "CC0", label: "License — Public Domain" },
];

export default function ResearchArchivePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="page-header page-header-chamber">
        <div className="container">
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", alignItems: "center" }}>
            <Link href="/chamber" className="btn btn-ghost btn-sm">← Chamber</Link>
            <span className="label-cyan">Layer V</span>
          </div>
          <h1 className="display-lg" style={{ marginBottom: "0.75rem" }}>
            Research<br />
            <span className="glow-cyan">Archive</span>
          </h1>
          <p style={{ maxWidth: "54ch", color: "var(--text-muted)", lineHeight: 1.7 }}>
            The 247-page distribution file Andrew Chen released to the public domain at midnight.
            Seven years of acoustic consciousness research. The key made a click. 3,200 Hz. Four milliseconds.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">

          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "0",
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
            marginBottom: "3rem",
          }}>
            {downloadStats.map((stat, i) => (
              <div key={i} style={{
                padding: "1.25rem",
                textAlign: "center",
                borderRight: i < 5 ? "1px solid var(--border-faint)" : undefined,
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.4rem", color: "var(--cyan)", lineHeight: 1, marginBottom: "0.25rem" }}>{stat.value}</div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-faint)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Release moment */}
          <div className="ms-pull" style={{ marginBottom: "3rem" }}>
            <p>
              Midnight. The site went live. Andrew pressed the key. The key was the enter key on a standard laptop keyboard,
              the key that had launched a billion emails and a thousand startups and that now released seven years of acoustic
              consciousness research into the public domain. The key made a click. The click was approximately 3,200 Hz,
              a brief percussive event that lasted four milliseconds and that was, Andrew reflected, the most consequential
              four milliseconds of his career.
            </p>
            <cite>— Andrew Chen · Book III, Chapter 14</cite>
          </div>

          {/* Archive table */}
          <div className="section-label-row"><span className="label-cyan">Distribution File — Contents</span></div>

          <div style={{ overflow: "auto" }}>
            <table className="archive-table">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Title</th>
                  <th>Pages</th>
                  <th>Status</th>
                  <th>Chapter Reference</th>
                </tr>
              </thead>
              <tbody>
                {archiveSections.map((section) => (
                  <tr key={section.id}>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--cyan)", whiteSpace: "nowrap" }}>{section.section}</td>
                    <td style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem" }}>{section.title}</td>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", whiteSpace: "nowrap" }}>{section.pages}</td>
                    <td>
                      <span className="badge badge-cyan">{section.status}</span>
                    </td>
                    <td style={{ fontSize: "0.75rem" }}>{section.chapterRef}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section details */}
          <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="section-label-row"><span className="label">Section Details</span></div>
            {archiveSections.map((section) => (
              <div key={section.id} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                  <div>
                    <span className="label-cyan" style={{ marginRight: "0.75rem" }}>{section.section}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-faint)" }}>{section.pages}</span>
                  </div>
                  <span className="badge badge-cyan">{section.status}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", marginBottom: "0.75rem" }}>{section.title}</h3>
                <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "1rem" }}>{section.summary}</p>
                <div style={{ marginBottom: "0.75rem" }}>
                  <div className="label" style={{ marginBottom: "0.5rem", fontSize: "0.65rem", color: "var(--text-faint)" }}>Key Contents</div>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    {section.keyContent.map((item, i) => (
                      <li key={i} style={{ fontSize: "0.8rem", color: "var(--text-muted)", paddingLeft: "1rem", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: "var(--cyan-dim)" }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--cyan)", letterSpacing: "0.06em" }}>{section.chapterRef}</div>
              </div>
            ))}
          </div>

          
          {/* CTA Section */}
          <div style={{ marginTop: "4rem", padding: "3rem", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "var(--gold)" }}></div>
            <span className="label" style={{ display: "block", marginBottom: "1rem", color: "var(--gold)" }}>Access the Research</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", marginBottom: "1rem", color: "var(--text)" }}>Download the Distribution File</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
              Get the complete 247-page in-universe research document. Plus, receive the Prologue and first five chapters of Volume I alongside the file.
            </p>
            <form action="https://api.web3forms.com/submit" method="POST" style={{ display: "flex", gap: "1rem", maxWidth: "450px", margin: "0 auto", flexDirection: "column" }}>
              <input type="hidden" name="access_key" value="29ea1914-9c58-4abf-b4e1-4e71e9a27186" />
              <input type="hidden" name="subject" value="Chapter request — Masters X opening chapters" />
              <input type="hidden" name="from_name" value="jasoncholloway.com" />
              <input type="hidden" name="redirect" value="https://jasoncholloway.com/chapters-sent/" />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
              <input type="email" name="email" placeholder="Email Address" required style={{ width: "100%", padding: "1rem", borderRadius: "var(--r-sm)", border: "1px solid var(--border)", background: "var(--bg-raised)", color: "var(--text)", fontFamily: "var(--font-ui)", fontSize: "1rem", outline: "none" }} />
              <button type="submit" className="btn btn-gold" style={{ padding: "1rem", fontSize: "1rem", width: "100%", cursor: "pointer", border: "none" }}>Access the File</button>
            </form>
            <div style={{ marginTop: "2.5rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-faint)" }}>
              f = 111.2 Hz
            </div>
            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "1.5rem", fontSize: "0.85rem", flexWrap: "wrap" }}>
              <Link href="/chamber/reading-sequence" style={{ color: "var(--cyan)", textDecoration: "none" }}>Core Reading Sequence (15) →</Link>
              <Link href="/chamber/harmonic-derivations" style={{ color: "var(--cyan)", textDecoration: "none" }}>Harmonic Derivations →</Link>
            </div>
          </div>

          {/* Note */}
          <div style={{ marginTop: "3rem", padding: "1.25rem 1.5rem", background: "var(--bg-surface)", borderRadius: "var(--r-md)", border: "1px solid var(--border-faint)", fontSize: "0.82rem", color: "var(--text-faint)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text-muted)" }}>Archive Note:</strong> The distribution file described above exists within the world of the Masters X Trilogy. The section summaries and key contents are derived directly from manuscript text — from descriptions of what Andrew&apos;s research contained and what the preparation protocol specified. Jason Carroll Holloway built a novel whose technical claims are internally consistent enough to document. Future editions may include selected research materials formatted as in-universe documents.
          </div>
        </div>
      </section>
    </>
  );
}

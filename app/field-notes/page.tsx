import Link from "next/link";
import type { Metadata } from "next";
import { themes, fieldNotes } from "@/lib/data/fieldNotes";

export const metadata: Metadata = {
  title: "Field Notes — The Real History Beneath Masters X",
  description:
    "Every place, manuscript, and phenomenon in the Masters X Trilogy is documented. SubTropolis, the Voynich Manuscript, the Ars Notoria, 111 Hz archaeoacoustics, the Strahov Monastery — read the real history that the fiction is built on.",
  alternates: {
    canonical: "https://jasoncholloway.com/field-notes/",
  },
  openGraph: {
    title: "Field Notes — The Real History Beneath Masters X",
    description:
      "Every place, manuscript, and phenomenon in the Masters X Trilogy is documented. SubTropolis, the Voynich Manuscript, the Ars Notoria, 111 Hz archaeoacoustics, the Strahov Monastery — read the real history.",
    url: "https://jasoncholloway.com/field-notes/",
    images: [{ url: "https://jasoncholloway.com/og/field-notes/hub.png", width: 1200, height: 630, alt: "Field Notes — Real History Beneath Masters X, by Jason Carroll Holloway" }],
  },
};

export default function FieldNotesHub() {
  const allNotes = fieldNotes;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Field Notes — The Real History Beneath Masters X",
    "url": "https://jasoncholloway.com/field-notes/",
    "description": "A series of articles documenting the real places, manuscripts, and phenomena that the Masters X Trilogy is built on.",
    "author": { "@id": "https://jasoncholloway.com/#person" },
    "hasPart": allNotes.map(n => ({
      "@type": "Article",
      "name": n.title,
      "url": `https://jasoncholloway.com${n.href}/`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jasoncholloway.com/" },
      { "@type": "ListItem", "position": 2, "name": "Field Notes", "item": "https://jasoncholloway.com/field-notes/" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([collectionJsonLd, breadcrumbJsonLd]) }}
      />

      {/* Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
              <span className="label">Jason C. Holloway · Seventh City Press</span>
            </div>
            <h1 className="display-xl" style={{ marginBottom: "1rem" }}>
              Field Notes —<br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Real History</span>
            </h1>
            <p style={{ maxWidth: "62ch", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.85, marginBottom: "1.5rem" }}>
              Every place, manuscript, and phenomenon in the Masters X Trilogy is documented and verifiable. SubTropolis is real. The Strahov Monastery is real. The Voynich Manuscript sits in Yale&apos;s Beinecke Library. The 111 Hz standing-wave frequency has been measured by acoustic researchers in stone chambers on four continents. These Field Notes are the documented record — real history, honestly told, that opens onto fiction.
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-faint)", fontStyle: "italic" }}>
              The fiction is the payoff, not the disguise. Real places, fictional events.
            </p>
          </div>
        </div>
      </section>

      {/* Themed sections */}
      {themes.map(theme => (
        <section key={theme.id} className="section" style={{ borderTop: "1px solid var(--border-faint)" }}>
          <div className="container">
            <div className="section-label-row">
              <span className="label">{theme.label}</span>
            </div>
            <div className="fn-hub-grid">
              {theme.notes.map(note => (
                <Link key={note.href} href={note.href} className="fn-hub-card">
                  <div className="fn-hub-card-label">{note.label}</div>
                  <div className="fn-hub-card-title">{note.title}</div>
                  <div className="fn-hub-card-desc">{note.desc}</div>
                  <div className="fn-hub-card-arrow">Read the Field Note →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-faint)" }}>
        <div className="container" style={{ maxWidth: "700px", textAlign: "center" }}>
          <h2 className="display-md" style={{ marginBottom: "1rem" }}>The fiction is built on all of this.</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.85, marginBottom: "2rem" }}>
            The Masters X Trilogy follows what happens when a fired Kansas City security guard inherits 30 years of classified acoustic research — and follows the cross-references into a sealed Prague crypt.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/books/masters-x" className="btn btn-gold">Read the Trilogy</Link>
            <Link href="/chamber" className="btn btn-outline" style={{ color: "var(--cyan)", borderColor: "var(--cyan-dim)" }}>Enter the Analysis Chamber</Link>
          </div>
        </div>
      </section>
    </>
  );
}


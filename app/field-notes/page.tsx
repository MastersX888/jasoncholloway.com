import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field Notes — The Real History Beneath Masters X",
  description:
    "Every place, manuscript, and phenomenon in the Masters X Trilogy is documented. SubTropolis, the Voynich Manuscript, the Ars Notoria, 111 Hz archaeoacoustics, the Strahov Monastery — read the real history that the fiction is built on.",
  alternates: {
    canonical: "https://jasoncholloway.com/field-notes/",
  },
  openGraph: {
    title: "Field Notes — The Real History Beneath Masters X | Jason Carroll Holloway",
    description:
      "Every place, manuscript, and phenomenon in the Masters X Trilogy is documented. SubTropolis, the Voynich Manuscript, the Ars Notoria, 111 Hz archaeoacoustics, the Strahov Monastery — read the real history.",
    url: "https://jasoncholloway.com/field-notes/",
    images: [{ url: "https://jasoncholloway.com/og/field-notes/hub.png", width: 1200, height: 630, alt: "Field Notes — Real History Beneath Masters X, by Jason Carroll Holloway" }],
  },
};

const themes = [
  {
    id: "beneath-kansas-city",
    label: "Beneath Kansas City",
    notes: [
      {
        href: "/field-notes/subtropolis",
        slug: "subtropolis",
        label: "Place",
        title: "SubTropolis: The Underground City Beneath Kansas City",
        desc: "The 270-million-year-old Bethany Falls limestone mine where Blake Masters worked security — and found something that wasn't on any official map.",
      },
      {
        href: "/field-notes/kansas-city-locations",
        slug: "kansas-city-locations",
        label: "Map",
        title: "The Real Kansas City of Masters X: A Reader's Map",
        desc: "Miller Nichols Library, Westport, Quality Hill, West Bottoms, Hotel Phillips — every real Kansas City location in the trilogy, mapped and annotated.",
      },
      {
        href: "/field-notes/meramec-caverns",
        slug: "meramec-caverns",
        label: "Site",
        title: "Meramec Caverns and the Patterns in the Flowstone",
        desc: "The Missouri cave where William Masters traced formations with his ten-year-old grandson Blake, teaching him to see the pattern in everything.",
      },
      {
        href: "/field-notes/oscar-01",
        slug: "oscar-01",
        label: "History",
        title: "Oscar-01: Missouri's Cold War Launch Room",
        desc: "The preserved Minuteman II launch control facility where James Masters had clearance — and began asking questions.",
      },
    ],
  },
  {
    id: "the-frequency",
    label: "The Frequency",
    notes: [
      {
        href: "/field-notes/111-hz",
        slug: "111-hz",
        label: "Science",
        title: "111 Hz: The Frequency Ancient Builders Kept Choosing",
        desc: "The standing-wave frequency documented in stone chambers from Malta to Ghana. Real acoustic research — and the carrier frequency of the entire trilogy.",
      },
      {
        href: "/field-notes/cymatics",
        slug: "cymatics",
        label: "Physics",
        title: "Cymatics: Sound You Can See",
        desc: "Ernst Chladni's sand patterns, Hans Jenny's water experiments, and the five-sided standing wave that Kofi Asante's drums produce in red laterite clay.",
      },
      {
        href: "/field-notes/u2-test-pilots",
        slug: "u2-test-pilots",
        label: "History",
        title: "What Test Pilots Saw from 70,000 Feet",
        desc: "Declassified U-2 program histories and pilot accounts of visual phenomena at altitude. What William Masters saw in 1956 — and spent his life proving.",
      },
    ],
  },
  {
    id: "the-manuscripts",
    label: "The Manuscripts",
    notes: [
      {
        href: "/field-notes/voynich-manuscript",
        slug: "voynich-manuscript",
        label: "Manuscript",
        title: "The Voynich Manuscript, Rudolf II, and the Book No One Can Read",
        desc: "Carbon-dated to the early 1400s, undeciphered for 600 years, owned by Emperor Rudolf II of Bohemia — the same emperor whose Prague court the trilogy reconstructs.",
      },
      {
        href: "/field-notes/ars-notoria",
        slug: "ars-notoria",
        label: "Manuscript",
        title: "The Ars Notoria: The Medieval 'Notory Art'",
        desc: "A thirteenth-century Solomonic manuscript of memory and eloquence. Not magic — cognitive technology. The operational manual for the trilogy's preparation protocol.",
      },
      {
        href: "/field-notes/codex-gigas",
        slug: "codex-gigas",
        label: "Manuscript",
        title: "The Devil's Bible: Why the Codex Gigas Was Made in Bohemia",
        desc: "The world's largest surviving medieval manuscript — made in early 1200s Bohemia, later owned by Rudolf II, taken to Sweden in 1648. Brother Aldric's story begins in Bohemia, 1267.",
      },
      {
        href: "/field-notes/gospel-of-thomas",
        slug: "gospel-of-thomas",
        label: "Text",
        title: "Saying 113: 'The Kingdom Is Spread Upon the Earth'",
        desc: "Discovered at Nag Hammadi, Egypt in 1945. The Gospel of Thomas, Saying 113 — the sentence Volume III is built on.",
      },
    ],
  },
  {
    id: "the-sites",
    label: "The Sites",
    notes: [
      {
        href: "/field-notes/strahov-monastery",
        slug: "strahov-monastery",
        label: "Site",
        title: "The Strahov Library: 23 Chained Books and the Most Beautiful Room in Prague",
        desc: "The Premonstratensian Theological Hall, chained books, and the sealed crypt beneath — real place, fictional events.",
      },
    ],
  },
];

export default function FieldNotesHub() {
  const allNotes = themes.flatMap(t => t.notes);

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


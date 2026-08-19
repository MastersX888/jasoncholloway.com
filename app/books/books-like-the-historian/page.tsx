import Link from "next/link";
import type { Metadata } from "next";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Books Like The Historian by Elizabeth Kostova: The Masters X Trilogy",
  description:
    "Looking for books like The Historian? The Masters X Trilogy by Jason Carroll Holloway is a multi-generational archival investigation — a 1267 Bohemian scriptorium, seven inherited notebooks, and a sealed crypt beneath Prague.",
  socialTitle: "Books Like The Historian | Jason Carroll Holloway",
  socialDescription:
    "If The Historian's pleasure was the archive — letters inside books inside centuries — the Masters X Trilogy runs on the same engine: seven notebooks, fifty-seven years of patience, and a crypt beneath Strahov.",
  path: "/books/books-like-the-historian/",
  ogType: "article",
});

const faqs = [
  {
    q: "What should I read if I loved The Historian by Elizabeth Kostova?",
    a: "The Masters X Trilogy by Jason Carroll Holloway is built on the same structural pleasure: a mystery carried across generations through documents — a prologue reconstructed from a 1267 Bohemian scriptorium, seven leather notebooks left by a grandfather, and a distribution file compiled by a man who signs his work. Where Kostova's archive hunts Dracula, Holloway's hunts a frequency — one measured by real acoustic researchers in stone chambers on four continents.",
  },
  {
    q: "Is Masters X a vampire novel like The Historian?",
    a: "No — and that is the honest difference. There are no vampires in Masters X. What Kostova's readers tend to love most is not the monster but the method: libraries, letters, patient scholarship that turns dangerous. Masters X keeps the method and replaces the monster with archaeoacoustics, medieval manuscript traditions, and a figure in a Bohemian scriptorium whose fingers were not quite fingers.",
  },
  {
    q: "How long is the Masters X Trilogy compared to The Historian?",
    a: "The Historian runs about 700 pages in its hardcover edition. The Masters X omnibus — all three novels in one volume — is 686 pages in hardcover and 734 in paperback. The three volumes are also available individually for readers who prefer to start with one.",
  },
  {
    q: "Where does the Masters X Trilogy take place?",
    a: "It begins in Kansas City — the Miller Nichols Library, and the real SubTropolis limestone complex beneath the city — then moves to Bohemia in 1267, the Strahov Monastery in Prague, Mýrdalsjökull in Iceland, and Ghana's Volta Region. Like The Historian, it is a traveler's archive; unlike it, its home ground is the American Midwest.",
  },
];

const ldScripts = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Books Like The Historian by Elizabeth Kostova: The Masters X Trilogy",
    "url": "https://jasoncholloway.com/books/books-like-the-historian/",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "author": { "@id": "https://jasoncholloway.com/#person" },
    "publisher": { "@id": "https://jasoncholloway.com/#organization" },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://jasoncholloway.com/books/books-like-the-historian/",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jasoncholloway.com/" },
      { "@type": "ListItem", "position": 2, "name": "Books", "item": "https://jasoncholloway.com/books/" },
      { "@type": "ListItem", "position": 3, "name": "Books Like The Historian", "item": "https://jasoncholloway.com/books/books-like-the-historian/" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  },
];

export default function TheHistorianCompPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldScripts) }}
      />

      <section className="page-header" style={{ paddingBottom: "3rem" }}>
        <div className="container">
          <div className="page-header-inner">
            <nav className="fn-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="fn-breadcrumb-sep">›</span>
              <Link href="/books">Books</Link>
              <span className="fn-breadcrumb-sep">›</span>
              <span style={{ color: "var(--text-muted)" }}>Books Like The Historian</span>
            </nav>
            <h1 className="display-lg" style={{ marginBottom: "1.5rem", maxWidth: "20ch" }}>
              Books Like <em>The Historian</em>
            </h1>
            <p className="fn-lede" style={{ maxWidth: "62ch" }}>
              Elizabeth Kostova&apos;s novel taught a generation of readers that the archive itself could be the
              adventure — letters inside books inside centuries, a mystery inherited rather than found. The Masters
              X Trilogy runs on the same engine.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", lineHeight: 1.8, color: "var(--text)" }}>

            <h2 className="fn-h2">The same architecture</h2>
            <p>
              <em>The Historian</em> is a novel of documents: a narrator reconstructing her parents&apos; story from
              letters, a mentor&apos;s disappearance recorded in fragments, a medieval book with a dragon at its
              center. Its suspense comes from patience — the reader assembles the past exactly the way the
              characters do.
            </p>
            <p>
              Masters X is assembled the same way. It opens in a Bohemian scriptorium in 1267, narrated by the man
              reconstructing it: <em>part scholarship, part imagination, part a knowing that happens when
              you&apos;ve held the pages a dead man copied.</em> It arrives in the present as an inheritance — a safety
              deposit box paid for fifty-seven years in advance, containing seven leather notebooks of classified
              research. And it frames itself, the way Kostova&apos;s nested narrators do, as a compiled account: Blake
              Masters&apos; ten Moleskines, and the Distribution File that carries them.
            </p>
            <p>
              Both novels understand that a library can be a thriller&apos;s set piece. Both send their researchers
              into monasteries and crypts. Both are, at bottom, love letters to the people who preserve what
              everyone else is too busy to read.
            </p>

            <h2 className="fn-h2">The honest differences</h2>
            <div style={{ background: "var(--bg-raised)", padding: "2rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-faint)" }}>
              <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem", color: "var(--text-muted)" }}>
                <li><strong>No vampires.</strong> The thing in Masters X&apos;s scriptorium is stranger and less classifiable — a figure whose words bypass the ears, whose fingers were not quite fingers. The dread is acoustic and geometric, not gothic.</li>
                <li><strong>Different map.</strong> Kostova&apos;s geography is Oxford, Istanbul, the Balkans. Masters X is rooted in the American Midwest — Kansas City&apos;s{" "}
                  <Link href="/field-notes/subtropolis" className="hover-gold" style={{ color: "var(--gold)" }}>SubTropolis</Link>{" "}
                  and Ozark lake country — before it reaches{" "}
                  <Link href="/field-notes/strahov-monastery" className="hover-gold" style={{ color: "var(--gold)" }}>Prague</Link>,{" "}
                  Iceland, and Ghana.</li>
                <li><strong>Physics at the center.</strong> Where The Historian&apos;s mystery is dynastic evil, Masters X&apos;s is a frequency —{" "}
                  <Link href="/field-notes/111-hz" className="hover-gold" style={{ color: "var(--gold)" }}>111 Hz</Link>{" "}
                  — documented by real researchers in real stone chambers, and carried into fiction with the receipts attached.</li>
              </ul>
            </div>

            <h2 className="fn-h2">For the reader who loved the research</h2>
            <p>
              Kostova&apos;s readers famously reward the feeling that <em>it was really researched.</em> Masters X
              makes the research itself public: the{" "}
              <Link href="/field-notes" className="hover-gold" style={{ color: "var(--gold)" }}>Field Notes</Link>{" "}
              document the real manuscripts, sites, and acoustic science under the fiction, and the{" "}
              <Link href="/chamber" className="hover-gold" style={{ color: "var(--gold)" }}>Analysis Chamber</Link>{" "}
              lets you work with the same materials — 181 manuscript folios you can overlay and rotate yourself.
            </p>

            <h2 className="fn-h2">From the Prologue, <em>The Inheritance of Frequency</em></h2>
            <blockquote className="fn-excerpt">
              <p style={{ marginBottom: "0.75rem" }}>
                I wasn&apos;t there. Nobody alive was there. But the manuscripts survived, and the monastery records
                survived, and the margin notes in Brother Aldric&apos;s own hand survived seven centuries of weather
                and war and slow forgetting. What follows is my reconstruction, part scholarship, part imagination,
                part a knowing that happens when you&apos;ve held the pages a dead man copied and felt the weight of
                what he carried.
              </p>
              <cite>— Blake Masters, Mýrdalsjökull, Iceland · Masters X, Volume I</cite>
            </blockquote>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1rem 0" }}>
              <Link href="/books/masters-x/omnibus" className="btn btn-gold">
                Get the Complete Trilogy
              </Link>
              <Link href="/books/masters-x/the-inheritance-of-frequency" className="btn btn-outline">
                Start with Volume I
              </Link>
            </div>

            <div style={{ background: "var(--bg-raised)", padding: "1.5rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-faint)" }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", marginBottom: "0.5rem" }}>
                Opening chapters of Volume I are free.
              </h4>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "1rem" }}>
                The archive, in fictional form — delivered by email. No spam; unsubscribe anytime.
              </p>
              <NewsletterForm compact={true} />
            </div>

            <h2 className="fn-h2">Frequently Asked Questions</h2>
            <div className="fn-faq">
              {faqs.map((faq, i) => (
                <div key={i} className="fn-faq-item">
                  <div className="fn-faq-q">{faq.q}</div>
                  <div className="fn-faq-a">{faq.a}</div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: "0.8rem", color: "var(--text-faint)", marginTop: "1rem", lineHeight: 1.6, borderTop: "1px solid var(--border-faint)", paddingTop: "1.5rem" }}>
              <em>The Historian is a novel by Elizabeth Kostova (2005), referenced here for reader guidance. Masters X is fiction by Jason Carroll Holloway; the manuscripts, places, and acoustic research it draws on are real and documented in the Field Notes.</em>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Books Like Foucault's Pendulum: The Masters X Trilogy",
  description:
    "Looking for books like Foucault's Pendulum? Jason Carroll Holloway's Masters X Trilogy is a literary conspiracy of real medieval manuscripts and acoustic science — the book Blake Masters is reading when the story begins is Eco's.",
  socialTitle: "Books Like Foucault's Pendulum | Jason Carroll Holloway",
  socialDescription:
    "Eco's novel is named inside this one — Blake Masters is reading Foucault's Pendulum for the fourth time when the Masters X Trilogy begins. Real Voynich, Ars Notoria, and Codex Gigas; 111 Hz archaeoacoustics; Kansas City to Prague.",
  path: "/books/books-like-foucaults-pendulum/",
  ogType: "article",
});

const faqs = [
  {
    q: "What should I read after Foucault's Pendulum?",
    a: "The Masters X Trilogy by Jason Carroll Holloway is built for that reader: a literary conspiracy grounded in real undeciphered manuscripts — the Voynich Manuscript, the Ars Notoria, and the Codex Gigas — and in archaeoacoustics, the study of sound in ancient stone spaces. It trades Eco's invented conspiracy for a documented-material mystery, and it moves from Kansas City's SubTropolis to a sealed crypt beneath Prague's Strahov Monastery.",
  },
  {
    q: "Is Foucault's Pendulum actually referenced in the Masters X Trilogy?",
    a: "Yes. In Chapter One of The Inheritance of Frequency, Blake Masters is reading Foucault's Pendulum for the fourth time in the Miller Nichols Library at UMKC when the story finds him. The novel returns to Eco's book at the trilogy's climax. The comparison is not marketing — it is inside the fiction.",
  },
  {
    q: "How is Masters X different from Foucault's Pendulum?",
    a: "Three honest differences. First, pace: Eco's novel is famously deliberate; Masters X is slow-burn but plotted as a thriller, and its three volumes run 686 pages in the omnibus hardcover. Second, ground: Eco's conspiracy is European and textual; Masters X is rooted in the American Midwest — the SubTropolis limestone complex under Kansas City — before it reaches Prague, Iceland, and Ghana. Third, stakes: in Eco the invented conspiracy becomes lethally real; in Masters X the manuscripts were never a game, and the frequency was always physics.",
  },
  {
    q: "Where should I start with the Masters X Trilogy?",
    a: "Most readers start with the omnibus edition — Masters X: The Complete Trilogy — which collects all three volumes (The Inheritance of Frequency, The Grimoire, The Kingdom) in one hardcover or paperback at a lower price than the volumes bought separately. The opening chapters of Volume I are also free by email on this site.",
  },
];

const ldScripts = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Books Like Foucault's Pendulum: The Masters X Trilogy",
    "url": "https://jasoncholloway.com/books/books-like-foucaults-pendulum/",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "author": { "@id": "https://jasoncholloway.com/#person" },
    "publisher": { "@id": "https://jasoncholloway.com/#organization" },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://jasoncholloway.com/books/books-like-foucaults-pendulum/",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jasoncholloway.com/" },
      { "@type": "ListItem", "position": 2, "name": "Books", "item": "https://jasoncholloway.com/books/" },
      { "@type": "ListItem", "position": 3, "name": "Books Like Foucault's Pendulum", "item": "https://jasoncholloway.com/books/books-like-foucaults-pendulum/" },
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

export default function FoucaultsPendulumCompPage() {
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
              <span style={{ color: "var(--text-muted)" }}>Books Like Foucault&apos;s Pendulum</span>
            </nav>
            <h1 className="display-lg" style={{ marginBottom: "1.5rem", maxWidth: "20ch" }}>
              Books Like <em>Foucault&apos;s Pendulum</em>
            </h1>
            <p className="fn-lede" style={{ maxWidth: "62ch" }}>
              Umberto Eco&apos;s novel proved a conspiracy thriller could be built from real bibliography instead of
              cardboard history. If you finished it and wanted more — the Masters X Trilogy was written in its
              direct line. In fact, <em>Foucault&apos;s Pendulum</em> is the book Blake Masters is reading when his
              story begins.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", lineHeight: 1.8, color: "var(--text)" }}>

            <h2 className="fn-h2">What Eco gave you</h2>
            <p>
              <em>Foucault&apos;s Pendulum</em> set the standard for the intellectual thriller. It demonstrated that a
              conspiracy novel didn&apos;t need to dumb down its history — it could weaponize it. Casaubon, Belbo, and
              Diotallevi feed six centuries of occult bibliography into a computer named Abulafia and invent a Plan —
              and the Plan, being believed, becomes lethal. The book&apos;s real subject was never the Templars. It was
              the human hunger for pattern, and what that hunger costs.
            </p>
            <p>
              Nothing since has quite replaced it. The commercial descendants kept the conspiracy and dropped the
              scholarship. The literary descendants kept the erudition and dropped the engine. Readers who loved
              Eco&apos;s book have been looking for the whole combination ever since.
            </p>

            <h2 className="fn-h2">What Masters X does with that inheritance</h2>
            <p>
              The Masters X Trilogy begins in the Miller Nichols Library in Kansas City, where a fired security
              guard named Blake Masters is reading <em>Foucault&apos;s Pendulum</em> for the fourth time. A safety
              deposit box his grandfather paid for fifty-seven years in advance arrives at the exact moment Blake is
              ready for it. Inside: seven leather notebooks and thirty years of classified acoustic research.
            </p>
            <p>
              Where Eco&apos;s characters invent a conspiracy from real books, Blake decodes a reality from real
              artifacts. The trilogy&apos;s engine is a genuine triangulation — the{" "}
              <Link href="/field-notes/voynich-manuscript" className="hover-gold" style={{ color: "var(--gold)" }}>Voynich Manuscript</Link>, the{" "}
              <Link href="/field-notes/ars-notoria" className="hover-gold" style={{ color: "var(--gold)" }}>Ars Notoria</Link>, and the{" "}
              <Link href="/field-notes/codex-gigas" className="hover-gold" style={{ color: "var(--gold)" }}>Codex Gigas</Link>{" "}
              are real undeciphered or legendary manuscripts, and in the fiction they are three fragments of one
              system. The{" "}
              <Link href="/field-notes/111-hz" className="hover-gold" style={{ color: "var(--gold)" }}>111 Hz resonance</Link>{" "}
              measured in stone chambers is real archaeoacoustic research.{" "}
              <Link href="/field-notes/subtropolis" className="hover-gold" style={{ color: "var(--gold)" }}>SubTropolis</Link>{" "}
              is a real underground city beneath Kansas City, and the{" "}
              <Link href="/field-notes/strahov-monastery" className="hover-gold" style={{ color: "var(--gold)" }}>Strahov Monastery</Link>{" "}
              in Prague is a real place with a real crypt tradition.
            </p>

            <div style={{ background: "var(--bg-raised)", padding: "2rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-faint)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", marginBottom: "1rem" }}>
                The honest differences
              </h3>
              <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem", color: "var(--text-muted)" }}>
                <li><strong>Pace.</strong> Eco is famously deliberate. Masters X is a slow burn, but it is plotted as a thriller — a watcher in the library, a file that should not exist, a countdown the reader only later understands.</li>
                <li><strong>Ground.</strong> Eco&apos;s conspiracy is European and textual. Masters X is Heartland esoterica — Missouri limestone, Ozark water, Kansas City streets — before it opens onto Bohemia, Iceland, and Ghana.</li>
                <li><strong>Stakes.</strong> In Eco, the invented Plan becomes real because people believe it. In Masters X, nothing was invented. The manuscripts were never a game, and the frequency was always physics.</li>
              </ul>
            </div>

            <h2 className="fn-h2">From Chapter One, <em>The Inheritance of Frequency</em></h2>
            <blockquote className="fn-excerpt">
              <p style={{ marginBottom: "0.75rem" }}>
                Blake adjusted the Breitling Navitimer on his wrist and turned another page of Foucault&apos;s
                Pendulum. Fourth time through. Some obsessions weren&apos;t chosen. Some found you the way water finds
                cracks. Patiently, inevitably, following the path of least resistance until something gives.
              </p>
              <p>He didn&apos;t notice the woman at the table three rows over. Not yet. She was watching him.</p>
              <cite>— Masters X: The Inheritance of Frequency, Chapter One</cite>
            </blockquote>

            <h2 className="fn-h2">Where to start</h2>
            <p>
              Most readers go straight to the{" "}
              <Link href="/books/masters-x/omnibus" className="hover-gold" style={{ color: "var(--gold)" }}>omnibus edition</Link>{" "}
              — all three novels in one 686-page hardcover or 734-page paperback, one order, one shipping charge.
              Prefer to test the water first?{" "}
              <Link href="/books/masters-x/the-inheritance-of-frequency" className="hover-gold" style={{ color: "var(--gold)" }}>
                Volume I: The Inheritance of Frequency
              </Link>{" "}
              stands on its own, and its opening chapters are free by email below.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1rem 0" }}>
              <Link href="/books/masters-x/omnibus" className="btn btn-gold">
                Get the Complete Trilogy
              </Link>
              <Link href="/chamber" className="btn btn-outline" style={{ color: "var(--cyan)", borderColor: "var(--cyan-dim)" }}>
                Enter the Analysis Chamber
              </Link>
            </div>

            <div style={{ background: "var(--bg-raised)", padding: "1.5rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-faint)" }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", marginBottom: "0.5rem" }}>
                Opening chapters of Volume I are free.
              </h4>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "1rem" }}>
                Same research thread, fictional form — delivered by email. No spam; unsubscribe anytime.
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
              <em>Foucault&apos;s Pendulum is a novel by Umberto Eco (1988), referenced here for reader guidance. Masters X is fiction by Jason Carroll Holloway; the manuscripts, places, and acoustic research it draws on are real and documented in the Field Notes.</em>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

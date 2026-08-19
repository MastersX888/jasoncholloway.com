import Link from "next/link";
import type { Metadata } from "next";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Manuscripts That Shouldn't Exist: Voynich, Codex Gigas, Ars Notoria",
  description:
    "The Voynich Manuscript, the Codex Gigas, and the Ars Notoria are real books that resist explanation — and the fiction they inspire, from The Rule of Four and The Club Dumas to the Masters X Trilogy.",
  socialTitle: "Manuscripts That Shouldn't Exist | Jason Carroll Holloway",
  socialDescription:
    "Three real manuscripts no one can fully explain — and the novels built from them. A reader's guide to impossible books, ending in Kansas City.",
  path: "/books/manuscripts-that-shouldnt-exist/",
  ogType: "article",
});

const faqs = [
  {
    q: "What are the most mysterious manuscripts in the world?",
    a: "Three recur in every serious account. The Voynich Manuscript (Beinecke MS 408), carbon-dated to 1404–1438, written in a script no one has deciphered in 600 years. The Codex Gigas, the 'Devil's Bible,' the largest surviving medieval manuscript, legendarily written in a single night. And the Ars Notoria, a medieval ritual text that promised knowledge through prayer, figures, and fasting rather than study — a grimoire that claims to be a shortcut to the entire curriculum.",
  },
  {
    q: "What novels are based on real mysterious manuscripts?",
    a: "The strongest tradition includes The Rule of Four by Ian Caldwell and Dustin Thomason (built on the real Hypnerotomachia Poliphili of 1499), The Club Dumas by Arturo Pérez-Reverte (built on the real trade in rare books and a fictional Dumas manuscript), and the Masters X Trilogy by Jason Carroll Holloway (built on the real Voynich Manuscript, Ars Notoria, and Codex Gigas, which the fiction treats as three fragments of one system).",
  },
  {
    q: "Has anyone decoded the Voynich Manuscript?",
    a: "No. As of 2026, no decipherment is accepted by mainstream scholarship. Statistical analysis confirms the text behaves like a natural language — it obeys Zipf's law — but no proposed key, cipher, or machine-learning approach has produced a verified translation. It remains, literally, an unread book.",
  },
  {
    q: "Where can I see these manuscripts?",
    a: "The Voynich Manuscript is digitized in full at Yale's Beinecke Library online. The Codex Gigas is held by the National Library of Sweden in Stockholm, also digitized. Ars Notoria manuscripts survive in several European collections; the tradition is documented in scholarly editions. The Analysis Chamber on this site lets you overlay 181 Voynich and Ars Notoria folios yourself — the interpretive framework is the novel's, but the folios are real.",
  },
];

const ldScripts = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Manuscripts That Shouldn't Exist: Voynich, Codex Gigas, Ars Notoria — and the Fiction They Inspire",
    "url": "https://jasoncholloway.com/books/manuscripts-that-shouldnt-exist/",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "author": { "@id": "https://jasoncholloway.com/#person" },
    "publisher": { "@id": "https://jasoncholloway.com/#organization" },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://jasoncholloway.com/books/manuscripts-that-shouldnt-exist/",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jasoncholloway.com/" },
      { "@type": "ListItem", "position": 2, "name": "Books", "item": "https://jasoncholloway.com/books/" },
      { "@type": "ListItem", "position": 3, "name": "Manuscripts That Shouldn't Exist", "item": "https://jasoncholloway.com/books/manuscripts-that-shouldnt-exist/" },
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

export default function ManuscriptsThatShouldntExistPage() {
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
              <span style={{ color: "var(--text-muted)" }}>Manuscripts That Shouldn&apos;t Exist</span>
            </nav>
            <h1 className="display-lg" style={{ marginBottom: "1.5rem", maxWidth: "22ch" }}>
              Manuscripts That Shouldn&apos;t Exist
            </h1>
            <p className="fn-lede" style={{ maxWidth: "62ch" }}>
              Some books refuse to be explained. They survive wars, burnings, and six centuries of cryptanalysis,
              and they sit in the world&apos;s great libraries still holding their secrets. Three of them anchor the
              Masters X Trilogy. Here is the honest record — and the fiction they keep generating.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", lineHeight: 1.8, color: "var(--text)" }}>

            <h2 className="fn-h2">1. The Voynich Manuscript — the book no one can read</h2>
            <p>
              Carbon-dated to 1404–1438, written in an unidentified script that obeys the statistical laws of real
              language, illustrated with plants that match no known species. Owned, legend says, by Emperor Rudolf
              II of Bohemia, who paid 600 gold ducats for it. Now Beinecke MS 408 at Yale. Six hundred years of
              cryptanalysts — including the best machine-learning approaches available in 2026 — have produced no
              accepted decipherment.{" "}
              <Link href="/field-notes/voynich-manuscript" className="hover-gold" style={{ color: "var(--gold)" }}>
                Read the full Field Note →
              </Link>
            </p>

            <h2 className="fn-h2">2. The Codex Gigas — the Devil&apos;s Bible</h2>
            <p>
              The largest surviving medieval manuscript: 92 centimeters tall, 75 kilograms, reputedly the work of a
              single scribe — a feat handwriting analysis suggests would have taken twenty to thirty years of
              continuous labor, compressed by legend into a single night purchased with a soul. It contains a Bible,
              two chronicles, a medical text, a calendar, and one famous full-page portrait of the Devil. Also part
              of Rudolf II&apos;s Prague collection — meaning the two most mysterious manuscripts in Europe slept in
              the same castle.{" "}
              <Link href="/field-notes/codex-gigas" className="hover-gold" style={{ color: "var(--gold)" }}>
                Read the full Field Note →
              </Link>
            </p>

            <h2 className="fn-h2">3. The Ars Notoria — the grimoire that promised everything</h2>
            <p>
              A medieval ritual text with an extraordinary pitch: the whole curriculum — grammar, logic, rhetoric,
              theology, memory itself — delivered not by study but by prayer, fasting, and the contemplation of
              sacred figures called <em>notae</em>. Universities condemned it; monks copied it anyway. It is, in
              effect, a claim that knowledge has a technology, and that the technology can be received rather than
              earned.{" "}
              <Link href="/field-notes/ars-notoria" className="hover-gold" style={{ color: "var(--gold)" }}>
                Read the full Field Note →
              </Link>
            </p>

            <h2 className="fn-h2">The fiction they keep generating</h2>
            <p>
              Impossible manuscripts make a specific kind of novel possible — one where the detective work is real
              bibliography. The tradition&apos;s landmarks:
            </p>
            <div style={{ background: "var(--bg-raised)", padding: "2rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-faint)", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: "var(--gold)" }}>The Rule of Four</strong> — Ian Caldwell &amp; Dustin Thomason
                (2004). Two Princeton seniors against the <em>Hypnerotomachia Poliphili</em>, a real and genuinely
                bizarre coded romance of 1499. The gold standard for scholarship-as-thriller.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: "var(--gold)" }}>The Club Dumas</strong> — Arturo Pérez-Reverte (1993). A
                mercenary book-hunter chasing a Dumas manuscript collides with a real occult text,{" "}
                <em>The Nine Doors</em>. Rare-book trade rendered as noir.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: "var(--gold)" }}>The Historian</strong> — Elizabeth Kostova (2005). The archive
                itself as adventure: a medieval book with a dragon at its center, hunted across three generations.{" "}
                <Link href="/books/books-like-the-historian" className="hover-gold" style={{ color: "var(--gold)" }}>
                  More for Kostova readers →
                </Link>
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: "var(--gold)" }}>Foucault&apos;s Pendulum</strong> — Umberto Eco (1988). The
                genre&apos;s conscience: what happens when the bibliography is weaponized.{" "}
                <Link href="/books/books-like-foucaults-pendulum" className="hover-gold" style={{ color: "var(--gold)" }}>
                  More for Eco readers →
                </Link>
              </p>
            </div>

            <h2 className="fn-h2">And the one that asks: what if they&apos;re the same book?</h2>
            <p>
              The Masters X Trilogy begins from a question no one else asks in fiction: the Voynich, the Ars
              Notoria, and the Codex Gigas are all real, all resistant, all tied to the same few centuries and the
              same Prague orbit. What if they are three fragments of one system — separated deliberately, in 1267,
              by a Bohemian monk named Brother Aldric, into seven satchels scattered across seven cities?
            </p>
            <p>
              That claim is fiction, and we say so plainly. The manuscripts are not. The{" "}
              <Link href="/chamber/folio-visualizer" className="hover-gold" style={{ color: "var(--gold)" }}>Analysis Chamber</Link>{" "}
              lets you test the pattern yourself with 181 real folios.
            </p>

            <h2 className="fn-h2">From <em>The Inheritance of Frequency</em></h2>
            <blockquote className="fn-excerpt">
              <p style={{ marginBottom: "0.75rem" }}>
                &ldquo;Three fragments of one complete system,&rdquo; Nadia said. &ldquo;The Ars Notoria tells you how.
                The Voynich shows you what. The Codex Gigas explains why. Separated by Brother Aldric in 1267.
                Hidden in seven cities.&rdquo;
              </p>
              <cite>— Masters X: The Inheritance of Frequency</cite>
            </blockquote>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1rem 0" }}>
              <Link href="/books/masters-x/omnibus" className="btn btn-gold">
                Get the Complete Trilogy
              </Link>
              <Link href="/field-notes" className="btn btn-outline">
                Browse the Field Notes
              </Link>
            </div>

            <div style={{ background: "var(--bg-raised)", padding: "1.5rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-faint)" }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", marginBottom: "0.5rem" }}>
                Opening chapters of Volume I are free.
              </h4>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "1rem" }}>
                Three real manuscripts, one fictional system — delivered by email. No spam; unsubscribe anytime.
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
              <em>The novels referenced (The Rule of Four, The Club Dumas, The Historian, Foucault&apos;s Pendulum) are the works of their respective authors, cited for reader guidance. Masters X is fiction by Jason Carroll Holloway; the manuscripts described above are real, and their documented history is sourced in the Field Notes.</em>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

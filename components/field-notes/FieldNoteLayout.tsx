import Link from "next/link";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { getFieldNoteVolumes } from "@/lib/data/fieldNotes";
import { getMomentsForFieldNote, momentPath } from "@/lib/data/moments";

export interface FaqItem {
  q: string;
  a: string;
}

export interface RelatedNote {
  href: string;
  label: string;
  theme: string;
}

export interface FieldNoteProps {
  slug: string;
  title: string;         // H1 — human-curiosity phrasing
  titleTag: string;      // <title> tag (set in page metadata, passed for JSON-LD)
  theme: string;         // e.g. "Beneath Kansas City" | "The Frequency" | "The Manuscripts" | "The Sites"
  lede: string;          // 2–3 sentence lede (featured snippet bid)
  record: React.ReactNode;   // THE RECORD section content
  pattern: React.ReactNode;  // THE PATTERN section content
  fiction: React.ReactNode;  // THE FICTION section content (intro prose)
  excerpt: {
    paragraphs: string[];    // verbatim excerpt lines
    attribution: string;     // e.g. "Masters X: The Inheritance of Frequency"
  };
  bookHref: string;          // link to the relevant book page
  faqs: FaqItem[];
  relatedNotes: RelatedNote[];
  datePublished?: string;    // ISO date, e.g. "2026-06-12"
}

export default function FieldNoteLayout({
  slug,
  title,
  titleTag,
  lede,
  record,
  pattern,
  fiction,
  excerpt,
  bookHref,
  faqs,
  relatedNotes,
  datePublished = "2026-06-12",
}: FieldNoteProps) {
  const baseUrl = "https://jasoncholloway.com";
  const url = `${baseUrl}/field-notes/${slug}/`;
  const relatedMoments = getMomentsForFieldNote(slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": titleTag,
    "url": url,
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": { "@id": `${baseUrl}/#person` },
    "publisher": { "@id": `${baseUrl}/#organization` },
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "image": `${baseUrl}/og/field-notes/${slug}.jpg`,
  };

  const faqJsonLd = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  } : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/` },
      { "@type": "ListItem", "position": 2, "name": "Field Notes", "item": `${baseUrl}/field-notes/` },
      { "@type": "ListItem", "position": 3, "name": title, "item": url },
    ],
  };

  const ldScripts = [articleJsonLd, breadcrumbJsonLd, ...(faqJsonLd ? [faqJsonLd] : [])];
  const volumes = getFieldNoteVolumes(slug);

  return (
    <div data-register="research">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldScripts) }}
      />

      {/* ─── PAGE HEADER ─── */}
      <section className="page-header" style={{ paddingBottom: "3rem" }}>
        <div className="container">
          <div className="page-header-inner">
            {/* Breadcrumb */}
            <nav className="fn-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="fn-breadcrumb-sep">›</span>
              <Link href="/field-notes">Field Notes</Link>
              <span className="fn-breadcrumb-sep">›</span>
              <span style={{ color: "var(--text-muted)" }}>{title}</span>
            </nav>

            <div style={{ marginBottom: "0.75rem" }}>
              <span className="label">Field Notes — Real History Beneath Masters X</span>
            </div>
            <h1 className="display-lg" style={{ marginBottom: "1.5rem", maxWidth: "18ch" }}>
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE BODY ─── */}
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container">
          <div className="resp-main-sidebar" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "4rem", alignItems: "start" }}>
            {/* Main column */}
            <article className="fn-article">
              {/* Lede */}
              <p className="fn-lede">{lede}</p>

              {/* THE RECORD */}
              <h2 className="fn-h2">The Record</h2>
              {record}

              {/* THE PATTERN */}
              <h2 className="fn-h2">The Pattern</h2>
              {pattern}

              {/* THE FICTION */}
              <h2 className="fn-h2">The Fiction</h2>
              {fiction}

              {/* Volume bridge */}
              <div style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                padding: "0.75rem 1rem",
                background: "var(--gold-glow)",
                borderRadius: "var(--r-sm)",
                borderLeft: "3px solid var(--gold)",
                marginBottom: "1.5rem",
              }}>
                This history appears in{" "}
                <Link href={bookHref} style={{ color: "var(--gold)", fontWeight: 500 }}>
                  the Masters X Trilogy
                </Link>
                {" — "}fiction built on the documented record above.
              </div>

              {/* Excerpt */}
              <blockquote className="fn-excerpt">
                {excerpt.paragraphs.map((para, i) => (
                  <p key={i} style={{ marginBottom: i < excerpt.paragraphs.length - 1 ? "0.75rem" : 0 }}>{para}</p>
                ))}
                <cite>— {excerpt.attribution}</cite>
              </blockquote>

              {/* Soft series bridge + volume CTA */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "2rem 0 1rem" }}>
                <Link href={bookHref} className="btn btn-gold">
                  Read the Novel →
                </Link>
                <Link href="/books/masters-x" className="btn btn-outline">
                  View the Trilogy
                </Link>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "52ch" }}>
                If this place stuck with you, the trilogy starts where the maps go quiet — same research thread, fictional form.
              </p>

              {/* One soft ask: free Volume I chapters via newsletter → /chapters-sent/ */}
              <div style={{ background: "var(--bg-raised)", padding: "1.5rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-faint)", marginBottom: "3rem" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", marginBottom: "0.5rem" }}>
                  Opening chapters of Volume I are free.
                </h4>
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "1rem" }}>
                  Same documented history, in novel form — delivered by email. No spam; unsubscribe anytime.
                </p>
                <NewsletterForm compact={true} />
              </div>

              {/* FAQ */}
              {faqs.length > 0 && (
                <>
                  <h2 className="fn-h2">Frequently Asked Questions</h2>
                  <div className="fn-faq">
                    {faqs.map((faq, i) => (
                      <div key={i} className="fn-faq-item">
                        <div className="fn-faq-q">{faq.q}</div>
                        <div className="fn-faq-a">{faq.a}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Author box */}
              <div className="fn-author-box">
                <div className="fn-author-avatar" aria-hidden="true">JH</div>
                <div>
                  <div className="fn-author-name">Jason Carroll Holloway</div>
                  <div className="fn-author-bio">
                    M.A. English Literature · Kansas City, MO. Author of the Masters X Trilogy and the John Hawkes monograph. The research archive underlying the trilogy is open and interactive at the Analysis Chamber.
                  </div>
                  <div className="fn-author-links">
                    <Link href="/about">About the Author</Link>
                    <Link href="/chamber">Analysis Chamber</Link>
                    <Link href="/books/masters-x">Masters X Trilogy</Link>
                  </div>
                </div>
              </div>

              {/* Footer disclaimer */}
              <p style={{ fontSize: "0.8rem", color: "var(--text-faint)", marginTop: "2rem", lineHeight: 1.6, borderTop: "1px solid var(--border-faint)", paddingTop: "1.5rem" }}>
                <em>Masters X is fiction. The historical places, manuscripts, and scientific research described in The Record are real and sourced. The events, characters, and fictional interpretations described in The Fiction are invented by the author and presented clearly as such.</em>
              </p>
            </article>

            {/* Sidebar */}
            <aside style={{ position: "sticky", top: "80px" }}>
              {relatedMoments.length > 0 && (
                <div className="fn-related" style={{ marginBottom: "1.5rem" }}>
                  <div className="fn-related-title">From the Novel</div>
                  <div className="fn-related-links">
                    {relatedMoments.map((moment) => (
                      <Link key={moment.slug} href={momentPath(moment.slug)}>
                        <span style={{ opacity: 0.5 }}>→</span> {moment.title}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/books/masters-x/moments"
                    style={{ display: "block", marginTop: "1rem", fontSize: "0.78rem", color: "var(--text-faint)", textDecoration: "none" }}
                  >
                    All scenes →
                  </Link>
                </div>
              )}
              {/* Related notes */}
              {relatedNotes.length > 0 && (
                <div className="fn-related" style={{ marginBottom: "1.5rem" }}>
                  <div className="fn-related-title">Related Field Notes</div>
                  <div className="fn-related-links">
                    {relatedNotes.map(note => (
                      <Link key={note.href} href={note.href}>
                        <span style={{ opacity: 0.5 }}>→</span> {note.label}
                      </Link>
                    ))}
                  </div>
                  <Link href="/field-notes" style={{ display: "block", marginTop: "1rem", fontSize: "0.78rem", color: "var(--text-faint)", textDecoration: "none" }}>
                    All Field Notes →
                  </Link>
                </div>
              )}

              {/* In the novels */}
              <div style={{ background: "var(--bg-surface)", border: "1px solid var(--gold-dim)", borderRadius: "var(--r-lg)", padding: "1.25rem" }}>
                <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
                  In the Novels
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "1rem" }}>
                  This history appears in the Masters X Trilogy — three novels by Jason Carroll Holloway, published June 2026 by Seventh City Press.
                </p>
                {volumes && volumes.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {volumes.map((vol) => (
                      <Link
                        key={vol.slug}
                        href={`/books/masters-x/${vol.slug}/`}
                        className="btn btn-outline"
                        style={{ width: "100%", justifyContent: "center", fontSize: "0.82rem" }}
                      >
                        {vol.label}: {vol.title} →
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link href="/books/masters-x/the-inheritance-of-frequency/" className="btn btn-gold btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                    Start Reading
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

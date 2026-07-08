import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { books } from "@/lib/data/books";
import NewsletterForm from "@/components/layout/NewsletterForm";
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return books.filter(b => b.series === "Masters X" && b.slug !== "omnibus").map((book) => ({
    slug: book.slug,
  }));
}
import type { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) return {};

  const volumeTitles: Record<string, string> = {
    "the-inheritance-of-frequency": "The Inheritance of Frequency — Masters X Book 1",
    "the-grimoire": "The Grimoire — Masters X Book 2",
    "the-kingdom": "The Kingdom — Masters X Book 3",
  };

  const volumeDescs: Record<string, string> = {
    "the-inheritance-of-frequency": "A fired Kansas City security guard inherits classified acoustic research linking SubTropolis carvings, the Voynich Manuscript, and a Prague crypt sealed since 1267. For readers of Foucault's Pendulum and The Da Vinci Code.",
    "the-grimoire": "Blake Masters maps a medieval preparation protocol from an Iceland cottage as Andrew's algorithm decodes the acoustic architecture of Chartres Cathedral. The Ars Notoria is not magic — it's cognitive technology.",
    "the-kingdom": "The demonstration: 111.2 Hz, a Kansas City limestone chamber, and 1.2 million open-source downloads. Who gets access to their own fundamental frequency? Masters X Book 3.",
  };

  const title = volumeTitles[slug] ?? book.subtitle;
  const description = volumeDescs[slug] ?? book.excerpt;

  return {
    title,
    description,
    keywords: slug === "the-inheritance-of-frequency"
      ? [...book.keywords, "conspiracy thriller", "books like the da vinci code", "voynich manuscript fiction", "consciousness thriller", "medieval manuscript thriller", "SubTropolis"]
      : slug === "the-grimoire"
      ? [...book.keywords, "Chartres cathedral acoustics", "medieval grimoire fiction", "Ars Notoria explained", "Iceland novel"]
      : [...book.keywords, "books about frequency", "sound healing fiction", "Kansas City novel", "Gospel of Thomas"],
    openGraph: {
      title,
      description,
      url: `https://jasoncholloway.com/books/masters-x/${slug}/`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://jasoncholloway.com/books/masters-x/${slug}/`,
    },
  };
}
export default function BookPage({ params }: Props) {
  const { slug } = use(params);
  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();

  const prevBook = books.find((b) => b.series === "Masters X" && b.volume === (book.volume ?? 0) - 1);
  const nextBook = books.find((b) => b.series === "Masters X" && b.volume === (book.volume ?? 0) + 1);

  const paragraphs = book.description.split("\n\n").filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": `https://jasoncholloway.com/books/masters-x/${book.slug}#work`,
    "name": `${book.title}: ${book.subtitle}`,
    "author": { "@id": "https://jasoncholloway.com/#person" },
    "publisher": { "@id": "https://jasoncholloway.com/#organization" },
    "inLanguage": "English",
    "workExample": [
      ...(book.isbn_pb ? [{
        "@type": "Book",
        "@id": `https://jasoncholloway.com/books/masters-x/${book.slug}#paperback`,
        "isbn": book.isbn_pb,
        "bookFormat": "https://schema.org/Paperback",
        "numberOfPages": book.pageCount,
        "potentialAction": book.asin_pb ? {
          "@type": "BuyAction",
          "target": `https://www.amazon.com/dp/${book.asin_pb}`
        } : undefined
      }] : []),
      ...(book.isbn_hc ? [{
        "@type": "Book",
        "@id": `https://jasoncholloway.com/books/masters-x/${book.slug}#hardcover`,
        "isbn": book.isbn_hc,
        "bookFormat": "https://schema.org/Hardcover",
        "numberOfPages": book.pageCount,
        "potentialAction": book.asin_hc ? {
          "@type": "BuyAction",
          "target": `https://www.amazon.com/dp/${book.asin_hc}`
        } : undefined
      }] : []),
      ...(book.isbn_ebook ? [{
        "@type": "Book",
        "@id": `https://jasoncholloway.com/books/masters-x/${book.slug}#ebook`,
        "isbn": book.isbn_ebook,
        "bookFormat": "https://schema.org/EBook",
        "numberOfPages": book.pageCount,
        "potentialAction": book.asin_ebook ? {
          "@type": "BuyAction",
          "target": `https://www.amazon.com/dp/${book.asin_ebook}`
        } : undefined
      }] : [])
    ]
  };

  // Per-volume FAQ data
  const faqData: Record<string, Array<{q: string; a: string}>> = {
    "the-inheritance-of-frequency": [
      { q: "Do I need to read Masters X in order?", a: "Yes — the trilogy is designed to be read in sequence. Volume I establishes all the characters, locations, and the core mystery. Volume II deepens the preparation protocol. Volume III resolves everything. Starting with Volume I is the only recommended path." },
      { q: "Is The Inheritance of Frequency a standalone novel?", a: "It functions as a complete first act with a satisfying arc, but the story continues directly into The Grimoire. The three volumes are best understood as a single, continuous novel published in three parts." },
      { q: "Is the Voynich Manuscript in this novel?", a: "Yes. The Folio Visualizer in the Analysis Chamber is built around 181 Voynich Manuscript folios and Ars Notoria notae. The novel's plot pivots on Nadia's discovery that the Voynich Manuscript, the Ars Notoria, and the Codex Gigas are three expressions of a single system." },
      { q: "Where can I buy The Inheritance of Frequency?", a: "Available in Hardcover, Paperback, and Kindle editions on Amazon, and direct from IngramSpark. See the edition links on this page." },
    ],
    "the-grimoire": [
      { q: "Do I need to read Volume I before The Grimoire?", a: "Yes. The Grimoire picks up immediately after the events of The Inheritance of Frequency and assumes full knowledge of the first volume's revelations." },
      { q: "What is the Ars Notoria, really?", a: "The Ars Notoria is a real thirteenth-century Solomonic manuscript, available in institutional collections worldwide. It uses geometric figures called notae and structured prayers to develop memory and eloquence. The Grimoire's fictional reading is that the notae are interfaces — cognitive technology, not magic. Read the full history in the Field Notes." },
      { q: "Is Chartres Cathedral's acoustics real?", a: "Cathedral acoustics are a real and documented field. The specific frequency relationships in the novel are the trilogy's fictional architecture, built on real acoustic research into medieval sacred spaces." },
      { q: "Where can I buy The Grimoire?", a: "Available in Hardcover, Paperback, and Kindle editions on Amazon, and direct from IngramSpark. See the edition links on this page." },
    ],
    "the-kingdom": [
      { q: "Do I need to read Volumes I and II before The Kingdom?", a: "Absolutely. The Kingdom is the culmination of a three-volume story. It will not make sense without the first two volumes." },
      { q: "What is the 111 Hz frequency in the novel?", a: "111 Hz is a standing-wave frequency documented by acoustic researchers in multiple ancient stone chambers worldwide, including the Hħal-Saflieni Hypogeum in Malta. The trilogy uses this documented research as its scientific foundation." },
      { q: "Is 'The Kingdom of God is within you' a real saying?", a: "Saying 113 of the Gospel of Thomas reads: 'The kingdom of God is spread upon the earth, and people do not see it.' The Gospel of Thomas is a real first-century text discovered at Nag Hammadi, Egypt in 1945. It is available in scholarly translation." },
      { q: "Where can I buy The Kingdom?", a: "Available in Hardcover, Paperback, and Kindle editions on Amazon, and direct from IngramSpark. See the edition links on this page." },
    ],
  };

  const volumeFaqs = faqData[slug] ?? [];

  // Per-volume Real Elements sidebar data
  const realElementsData: Record<string, Array<{label: string; href: string}>> = {
    "the-inheritance-of-frequency": [
      { label: "SubTropolis, Kansas City", href: "/field-notes/subtropolis" },
      { label: "The Voynich Manuscript", href: "/field-notes/voynich-manuscript" },
      { label: "The Strahov Monastery Library", href: "/field-notes/strahov-monastery" },
      { label: "The Ars Notoria", href: "/field-notes/ars-notoria" },
      { label: "Oscar-01 Launch Control", href: "/field-notes/oscar-01" },
    ],
    "the-grimoire": [
      { label: "111 Hz: Ancient Chamber Acoustics", href: "/field-notes/111-hz" },
      { label: "The Ars Notoria", href: "/field-notes/ars-notoria" },
      { label: "Cymatics: Sound Made Visible", href: "/field-notes/cymatics" },
    ],
    "the-kingdom": [
      { label: "Gospel of Thomas, Saying 113", href: "/field-notes/gospel-of-thomas" },
      { label: "111 Hz: Ancient Chamber Acoustics", href: "/field-notes/111-hz" },
      { label: "The Real Kansas City of Masters X", href: "/field-notes/kansas-city-locations" },
      { label: "Meramec Caverns", href: "/field-notes/meramec-caverns" },
    ],
  };

  const volumeRealElements = realElementsData[slug] ?? [];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Books",
        "item": "https://jasoncholloway.com/books"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Masters X Trilogy",
        "item": "https://jasoncholloway.com/books/masters-x"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": book.subtitle,
        "item": `https://jasoncholloway.com/books/masters-x/${book.slug}/`
      }
    ]
  };

  const faqJsonLd = volumeFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": volumeFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbJsonLd, ...(faqJsonLd ? [faqJsonLd] : [])]) }}
      />
      <section className="page-header" style={{ paddingBottom: "4rem" }}>
        <div className="container">
          <div className="page-header-inner">
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/books/masters-x" className="hover:text-foreground transition-colors">
              {book.series}
            </Link>
            <span className="text-muted-foreground">·</span>
            <span className="text-foreground">{book.title}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "3.5rem", alignItems: "start" }}>
              
              {/* Covers side-by-side */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-faint)", marginBottom: "0.4rem", textAlign: "center" }}>Paperback</div>
                    <div style={{
                      position: "relative",
                      aspectRatio: "2/3",
                      borderRadius: "var(--r-md)",
                      overflow: "hidden",
                      boxShadow: "0 15px 45px rgba(0,0,0,0.6)",
                      width: "100%",
                      background: "#000",
                    }}>
                      <Image
                        src={book.coverImagePB}
                        alt={`${book.subtitle} Paperback Cover`}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="180px"
                        priority
                      />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-faint)", marginBottom: "0.4rem", textAlign: "center" }}>Hardcover</div>
                    <div style={{
                      position: "relative",
                      aspectRatio: "2/3",
                      borderRadius: "var(--r-md)",
                      overflow: "hidden",
                      boxShadow: "0 15px 45px rgba(0,0,0,0.6)",
                      width: "100%",
                      background: "#000",
                    }}>
                      <Image
                        src={book.coverImageHC}
                        alt={`${book.subtitle} Hardcover Cover`}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="180px"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="label" style={{ marginBottom: "0.75rem" }}>{book.series} · {book.title}</p>
                <h1 className="display-lg" style={{ marginBottom: "0.5rem" }}>{book.subtitle}</h1>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1rem" }}>
                  By Jason Carroll Holloway · Seventh City Press
                </p>

                <div className="ms-pull" style={{ margin: "1rem 0" }}>
                  <p>{book.excerpt}</p>
                </div>
                
                {book.asin_ebook && (
                  <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <a href={`https://www.amazon.com/dp/${book.asin_ebook}`} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ width: "100%", justifyContent: "center", fontSize: "1.1rem", padding: "1rem" }}>
                      Read on Kindle — ${book.price_ebook || "6.99"}
                    </a>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      {book.asin_pb && (
                        <a href={`https://www.amazon.com/dp/${book.asin_pb}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: "center", fontSize: "0.85rem" }}>
                          Paperback Edition
                        </a>
                      )}
                      {book.asin_hc && (
                        <a href={`https://www.amazon.com/dp/${book.asin_hc}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: "center", fontSize: "0.85rem" }}>
                          Hardcover Edition
                        </a>
                      )}
                    </div>
                    {book.slug === "the-inheritance-of-frequency" && (
                      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "center", marginTop: "0.5rem" }}>
                        <em>Volume 1 of the complete Masters X Trilogy — all three volumes available now.</em>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description & Editions */}
      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "4.5rem" }}>
            <div>
              <div className="section-label-row" style={{ marginBottom: "2rem" }}>
                <span className="label">About the Book</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
                {paragraphs.map((p, i) => (
                  <p key={i} style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem" }}>
                    {p}
                  </p>
                ))}
              </div>
              
              {book.slug === "the-inheritance-of-frequency" && (
                <div style={{ marginBottom: "3rem", padding: "1rem", borderLeft: "2px solid var(--gold)", background: "var(--bg-raised)", color: "var(--text-muted)", fontSize: "0.95rem", fontStyle: "italic" }}>
                  For readers of Dan Brown's symbology thrillers, Umberto Eco's manuscript mysteries, and Blake Crouch's consciousness fiction.
                </div>
              )}
              
              <div style={{ marginBottom: "3rem", background: "var(--bg-raised)", padding: "1.5rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-faint)" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: "1rem" }}>Not ready to buy? Read the opening chapters free.</h4>
                <NewsletterForm compact={true} />
              </div>

              {/* Show All Editions Side-by-Side */}
              <div className="section-label-row" style={{ marginBottom: "2rem" }}>
                <span className="label">Print & Digital Editions</span>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                {/* Paperback Card */}
                <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold)", marginBottom: "0.5rem", fontWeight: 600 }}>Paperback Edition</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                      Retail Format · Trade Paperback
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-faint)", marginBottom: "1rem" }}>
                      ISBN: <span style={{ fontFamily: "var(--font-mono)" }}>{book.isbn_pb}</span><br />
                      ASIN: <span style={{ fontFamily: "var(--font-mono)" }}>{book.asin_pb}</span><br />
                      Page Count: {book.pageCountPB || book.pageCount} pages
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {book.buyLinks.find(l => l.label === "IngramSpark (PB)") && (
                      <a href={book.buyLinks.find(l => l.label === "IngramSpark (PB)")!.url} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                        Buy Direct {book.price_pb_is ? `— $${book.price_pb_is}` : "— Best Price"}
                      </a>
                    )}
                    {book.asin_pb && (
                      <a href={`https://www.amazon.com/dp/${book.asin_pb}`} target="_blank" rel="noopener noreferrer" className={book.buyLinks.find(l => l.label === "IngramSpark (PB)") ? "btn btn-outline" : "btn btn-gold"} style={{ width: "100%", justifyContent: "center" }}>
                        Amazon {book.price_pb_amazon ? `— $${book.price_pb_amazon}` : ""}
                      </a>
                    )}
                  </div>
                </div>

                {/* Hardcover Card */}
                <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold)", marginBottom: "0.5rem", fontWeight: 600 }}>Hardcover Edition</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                      Jacketed Hardcover · Case Laminate
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-faint)", marginBottom: "1rem" }}>
                      ISBN: <span style={{ fontFamily: "var(--font-mono)" }}>{book.isbn_hc}</span><br />
                      ASIN: <span style={{ fontFamily: "var(--font-mono)" }}>{book.asin_hc}</span><br />
                      Page Count: {book.pageCountHC || book.pageCount} pages
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {book.buyLinks.find(l => l.label === "IngramSpark (HC)") && (
                      <a href={book.buyLinks.find(l => l.label === "IngramSpark (HC)")!.url} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                        Buy Direct {book.price_hc_is ? `— $${book.price_hc_is}` : "— Best Price"}
                      </a>
                    )}
                    {book.asin_hc && (
                      <a href={`https://www.amazon.com/dp/${book.asin_hc}`} target="_blank" rel="noopener noreferrer" className={book.buyLinks.find(l => l.label === "IngramSpark (HC)") ? "btn btn-outline" : "btn btn-gold"} style={{ width: "100%", justifyContent: "center" }}>
                        Amazon {book.price_hc_amazon ? `— $${book.price_hc_amazon}` : ""}
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Publication Details */}
              <div className="card">
                <div className="label" style={{ marginBottom: "1rem" }}>Publication Details</div>
                {[
                  { k: "Author", v: "Jason Carroll Holloway" },
                  { k: "Publisher", v: "Seventh City Press" },
                  { k: "Series", v: `${book.series} Vol. ${book.volume}` },
                  { k: "Laminate", v: "Matte" },
                  { k: "Interior Color", v: "Premium Color (70lb)" },
                  { k: "Ebook ISBN", v: book.isbn_ebook || "" },
                ].map((row) => (
                  <div key={row.k} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.82rem",
                    padding: "0.6rem 0",
                    borderBottom: "1px solid var(--border-faint)",
                    gap: "1rem",
                  }}>
                    <span style={{ color: "var(--text-faint)" }}>{row.k}</span>
                    <span style={{ color: "var(--text-muted)", textAlign: "right", fontFamily: row.k.includes("ISBN") ? "var(--font-mono)" : undefined, fontSize: row.k.includes("ISBN") ? "0.75rem" : undefined }}>{row.v}</span>
                  </div>
                ))}
              </div>

              {/* EPUB/Ebook buying card */}
              <div className="card" style={{ background: "var(--gold-glow)", borderColor: "var(--gold-dim)" }}>
                <div className="label" style={{ marginBottom: "0.5rem" }}>Digital Edition</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                  EPUB standard ebook available for Kindle, Nook, and Apple Books.
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {book.asin_ebook && (
                    <a href={`https://www.amazon.com/dp/${book.asin_ebook}`} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                      Purchase Kindle Ebook
                    </a>
                  )}
                </div>
              </div>

              {/* Keywords */}
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {book.keywords.map((kw) => (
                    <span key={kw} className="badge">{kw}</span>
                  ))}
                </div>
              </div>

              {/* Real Elements Field Notes */}
              {volumeRealElements.length > 0 && (
                <div className="card" style={{ borderColor: "var(--gold-dim)" }}>
                  <div className="label" style={{ marginBottom: "0.75rem" }}>The Real History</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem", lineHeight: 1.5 }}>
                    Every place and document in this volume is real. Read the documented history:
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {volumeRealElements.map(el => (
                      <Link key={el.href} href={el.href} style={{
                        fontSize: "0.82rem",
                        color: "var(--gold)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "0.3rem 0",
                        borderBottom: "1px solid var(--border-faint)",
                      }}>
                        <span style={{ opacity: 0.6 }}>→</span> {el.label}
                      </Link>
                    ))}
                  </div>
                  <Link href="/field-notes" style={{ display: "block", marginTop: "0.75rem", fontSize: "0.78rem", color: "var(--text-faint)" }}>
                    All Field Notes →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {volumeFaqs.length > 0 && (
        <section className="section" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-faint)" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div className="section-label-row">
              <span className="label">Frequently Asked Questions</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {volumeFaqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: "1px solid var(--border-faint)", paddingBottom: "1.5rem" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 500, marginBottom: "0.5rem", color: "var(--text)" }}>{faq.q}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation between books */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-faint)", padding: "3rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}>
            {prevBook ? (
              <Link href={`/books/masters-x/${prevBook.slug}`} className="card" style={{ flex: 1, textDecoration: "none" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>← Previous</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>Volume {prevBook.volume}: {prevBook.subtitle}</div>
              </Link>
            ) : <div style={{ flex: 1 }} />}

            <Link href="/books/masters-x" className="btn btn-outline" style={{ alignSelf: "center", whiteSpace: "nowrap" }}>
              All Three Volumes
            </Link>

            {nextBook ? (
              <Link href={`/books/masters-x/${nextBook.slug}`} className="card" style={{ flex: 1, textDecoration: "none", textAlign: "right" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Next →</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>Volume {nextBook.volume}: {nextBook.subtitle}</div>
              </Link>
            ) : <div style={{ flex: 1 }} />}
          </div>
        </div>
      </section>
    </>
  );
}

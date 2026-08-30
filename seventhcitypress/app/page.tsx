import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ORGANIZATION_ID, organizationNode, personNode } from "../lib/entities";
import { buildMetadata } from "../lib/metadata";
import { pageCountForIsbn } from "../lib/pageCounts";
import styles from './press-page.module.css';

// DRAFT COPY — pending Vivian QC and Jason's approval.
// The previous title ("Press & Media Kit — Masters X Trilogy") was an absolute
// title that bypassed the layout's brand template, so the imprint's only homepage
// never contained the imprint's own name — the one query it can realistically own.
export const metadata: Metadata = buildMetadata({
  title: "Seventh City Press — Literary Imprint, Kansas City",
  titleAbsolute: true,
  description:
    "Independent Kansas City imprint publishing the Masters X Trilogy by Jason Carroll Holloway. Press kit, fact sheet, bios, and review copies.",
  socialTitle: "Seventh City Press — Literary Imprint, Kansas City",
  socialDescription:
    "Masters X Trilogy press kit, fact sheet, author bios, and review copy requests from Seventh City Press.",
  path: "/",
});

const AUTHOR_REF = { "@id": personNode["@id"] };
const PUBLISHER_REF = { "@id": ORGANIZATION_ID };

/**
 * Catalog facts, stated once. Print and the omnibus are IngramSpark only; Amazon
 * carries the three Kindle editions and nothing else. Every `@id` matches the node
 * the author site emits for the same edition so the two documents describe one set
 * of works rather than two.
 */
const CATALOG = [
  {
    slug: "the-inheritance-of-frequency",
    name: "Masters X: The Inheritance of Frequency",
    description:
      "Seven notebooks. Thirty years of classified acoustic research. A sealed crypt beneath Prague.",
    isbnPb: "9798256008048",
    isbnHc: "9798295800801",
    isbnEbook: "9798256008819",
    asin: "B0H4KYMSM1",
    position: 1,
  },
  {
    slug: "the-grimoire",
    name: "Masters X: The Grimoire",
    description:
      "The Ars Notoria decoded. A preparation protocol for the frequency. Twenty-three candidates waiting.",
    isbnPb: "9798256009953",
    isbnHc: "9798295812675",
    isbnEbook: "9798256009625",
    asin: "B0H4KQ4YQJ",
    position: 2,
  },
  {
    slug: "the-kingdom",
    name: "Masters X: The Kingdom",
    description:
      "The demonstration, the argument, and an open-source release that reaches 1.2 million downloads.",
    isbnPb: "9798256010072",
    isbnHc: "9798295812705",
    isbnEbook: "9798256009809",
    asin: "B0H4L36X21",
    position: 3,
  },
] as const;

const PB_PUBLISHED = "2026-06-01";
const HC_PUBLISHED = "2026-05-14";
const SERIES_ID = "https://jasoncholloway.com/books/masters-x/#series";

const bookNodes = CATALOG.map((book) => {
  const pageUrl = `https://jasoncholloway.com/books/masters-x/${book.slug}/`;
  return {
    "@type": "Book",
    "@id": `${pageUrl}#work`,
    name: book.name,
    url: pageUrl,
    description: book.description,
    author: AUTHOR_REF,
    publisher: PUBLISHER_REF,
    inLanguage: "en",
    datePublished: HC_PUBLISHED,
    genre: ["Conspiracy Fiction", "Literary Fiction", "Thriller"],
    isPartOf: { "@id": SERIES_ID },
    position: book.position,
    workExample: [
      {
        "@type": "Book",
        "@id": `${pageUrl}#paperback`,
        name: `${book.name} (Paperback)`,
        url: pageUrl,
        isbn: book.isbnPb,
        bookFormat: "https://schema.org/Paperback",
        bookEdition: "First Edition",
        inLanguage: "en",
        datePublished: PB_PUBLISHED,
        numberOfPages: pageCountForIsbn(book.isbnPb),
        author: AUTHOR_REF,
        publisher: PUBLISHER_REF,
      },
      {
        "@type": "Book",
        "@id": `${pageUrl}#hardcover`,
        name: `${book.name} (Hardcover)`,
        url: pageUrl,
        isbn: book.isbnHc,
        bookFormat: "https://schema.org/Hardcover",
        bookEdition: "First Edition",
        inLanguage: "en",
        datePublished: HC_PUBLISHED,
        numberOfPages: pageCountForIsbn(book.isbnHc),
        author: AUTHOR_REF,
        publisher: PUBLISHER_REF,
      },
      {
        "@type": "Book",
        "@id": `${pageUrl}#ebook`,
        name: `${book.name} (Kindle / EPUB)`,
        url: pageUrl,
        isbn: book.isbnEbook,
        bookFormat: "https://schema.org/EBook",
        inLanguage: "en",
        datePublished: PB_PUBLISHED,
        author: AUTHOR_REF,
        publisher: PUBLISHER_REF,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "ASIN",
          value: book.asin,
        },
      },
    ],
  };
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    ...bookNodes,
    {
      "@type": "WebPage",
      "@id": "https://seventhcitypress.com/#webpage",
      url: "https://seventhcitypress.com/",
      name: "Seventh City Press — Independent Literary Imprint, Kansas City",
      description:
        "Imprint profile, press materials, media kit, and review copy requests for the Masters X Trilogy by Jason Carroll Holloway.",
      isPartOf: { "@id": "https://seventhcitypress.com/#website" },
      about: { "@id": organizationNode["@id"] },
      publisher: PUBLISHER_REF,
    },
  ],
};

const kitFiles = [
  {
    label: "Press Release",
    desc: "Full release — the story, the books, the author",
    file: "Masters_X_Press_Release.pdf",
    pages: "2pp",
  },
  {
    label: "Fact Sheet",
    desc: "Complete ISBN matrix, BISAC codes, pricing, and distribution channels",
    file: "Masters_X_Fact_Sheet.pdf",
    pages: "2pp",
  },
  {
    label: "Author Bios",
    desc: "One-line, short, standard, and extended bios — ready to quote",
    file: "Holloway_Author_Bios.pdf",
    pages: "1pp",
  },
  {
    label: "Series & Synopses",
    desc: "Series premise and book-by-book synopses",
    file: "Masters_X_Synopses.pdf",
    pages: "1pp",
  },
];

const trilogyCovers = [
  { label: "Vol. I — Paperback", src: "/covers/book1-paperback-web.jpg" },
  { label: "Vol. I — Hardcover", src: "/covers/book1-hardcover-v3.png" },
  { label: "Vol. II — Paperback", src: "/covers/book2-paperback-web.jpg" },
  { label: "Vol. II — Hardcover", src: "/covers/book2-hardcover-v3.png" },
  { label: "Vol. III — Paperback", src: "/covers/book3-paperback-web.jpg" },
  { label: "Vol. III — Hardcover", src: "/covers/book3-hardcover-v3.png" },
];

const omnibusCovers = [
  { label: "Omnibus — Dust Jacket", src: "/covers/omnibus-hardcover-v3.png" },
  { label: "Omnibus — Case Cover", src: "/covers/omnibus-hc-case-front.png" },
];

function CoverThumb({ label, src, featured = false }: { label: string; src: string; featured?: boolean }) {
  const width = 120;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.65rem" }}>
      <div style={{
        position: "relative",
        width: `${width}px`,
        aspectRatio: "2/3",
        borderRadius: "var(--r-sm)",
        overflow: "hidden",
        boxShadow: featured
          ? "0 16px 40px rgba(196,163,90,0.22), 0 14px 35px rgba(0,0,0,0.55)"
          : "0 10px 25px rgba(0,0,0,0.5)",
        border: featured ? "1px solid var(--gold-dim, var(--border-faint))" : "1px solid var(--border-faint)",
        background: "var(--bg-raised)",
      }}>
        <Image src={src} alt={label} fill style={{ objectFit: "cover" }} sizes={`${width}px`} priority={featured} />
      </div>
      <span style={{
        fontSize: "0.68rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--text-faint)",
        textAlign: "center",
        maxWidth: "130px",
        lineHeight: 1.4,
      }}>
        {label}
      </span>
    </div>
  );
}

export default function PressPage() {
  return (
    <>
      {/*
        Plain <script>. next/script defaults to `afterInteractive`, which injected
        this graph client-side only — it was absent from the static export, so no
        crawler ever saw the publisher's Book markup.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero">
        <div className="hero-bg" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow animate-fade-up">
              <div className="hero-eyebrow-line" />
              <span className="label">Seventh City Press · Communications Desk</span>
            </div>

            {/* DRAFT COPY — pending Vivian QC and Jason's approval. The H1 was
                "Press & Media Kit", which left the imprint's own name off its only
                homepage. The phrase now leads the sub-head and heads the download
                section below, so nothing is lost. */}
            <h1 className="hero-title animate-fade-up delay-1" style={{ fontSize: "clamp(2.5rem, 6vw, 4.8rem)", lineHeight: 1.1 }}>
              Seventh City Press
            </h1>

            <p className="hero-sub animate-fade-up delay-2" style={{ maxWidth: "55ch", marginBottom: "2.5rem" }}>
              Press &amp; media kit for the Masters X Trilogy — an independent literary imprint in Kansas City. Press materials, review copy requests, and downloadable assets.
            </p>

            <a
              href="/press-kit/Masters_X_Press_Kit.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="animate-fade-up delay-3"
              style={{
                fontSize: "0.78rem",
                color: "var(--text-faint)",
                textDecoration: "underline",
                marginTop: "0.5rem",
                display: "inline-block",
                marginBottom: "2rem",
              }}
            >
              Download Press Kit (PDF)
            </a>

            <div className="hero-stats animate-fade-up delay-4">
              <div>
                <div className="hero-stat-num">3 Novels</div>
                <div className="hero-stat-label">+ Complete Omnibus</div>
              </div>
              <div>
                <div className="hero-stat-num">14</div>
                <div className="hero-stat-label">Active ISBNs</div>
              </div>
              <div>
                <div className="hero-stat-num">Global</div>
                <div className="hero-stat-label">Distribution</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From the Novel — flagship excerpts (author site) */}
      <section className="section" style={{ borderTop: "1px solid var(--border-faint)", background: "var(--bg-surface)", paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
        <div className="container" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 className="label" style={{ marginBottom: "1rem", textAlign: "center" }}>From the Novel</h2>
          <p style={{ textAlign: "center", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "2rem", fontSize: "0.95rem" }}>
            Verbatim scenes from the Masters X Trilogy — curated at the author site.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              {
                quote: "Those aren't diagrams, they're technical specifications.",
                attr: "Andrew Chen · Volume I",
                href: "https://jasoncholloway.com/books/masters-x/moments/technical-specifications/",
              },
              {
                quote: "The Ars Notoria tells you how. The Voynich shows you what. The Codex Gigas explains why.",
                attr: "Nadia Volkov · Volume I",
                href: "https://jasoncholloway.com/books/masters-x/moments/three-fragments/",
              },
              {
                quote: "The gate is not arbitrary. The gate is the body. This is not theology. This is physics. This is love.",
                attr: "Blake Masters · Volume III",
                href: "https://jasoncholloway.com/books/masters-x/moments/tenth-moleskine/",
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "1.25rem 1.5rem",
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border-faint)",
                  borderRadius: "var(--r-md)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <blockquote style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.6, margin: "0 0 0.5rem", color: "var(--text)" }}>
                  {item.quote}
                </blockquote>
                <cite style={{ fontSize: "0.78rem", color: "var(--text-faint)", fontStyle: "normal" }}>— {item.attr}</cite>
              </a>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <a
              href="https://jasoncholloway.com/books/masters-x/moments/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.85rem", color: "var(--gold, #c4a35a)", textDecoration: "underline" }}
            >
              All seventeen scenes at jasoncholloway.com →
            </a>
          </p>
        </div>
      </section>

      {/* Cover Gallery */}
      <section className="section" style={{ borderTop: "1px solid var(--border-faint)", background: "var(--bg-surface)", paddingBottom: "2.5rem" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "1.75rem", paddingTop: "0.5rem" }}>
            <h2 className="label">Cover Art — Masters X Trilogy</h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "1.5rem",
            justifyItems: "center",
            maxWidth: "920px",
            margin: "0 auto 2.5rem",
          }}>
            {trilogyCovers.map((cover) => (
              <CoverThumb key={cover.label} label={cover.label} src={cover.src} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <h3 className="label">Omnibus Edition</h3>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.75rem", flexWrap: "wrap", alignItems: "center" }}>
            {omnibusCovers.map((cover) => (
              <CoverThumb
                key={cover.label}
                label={cover.label}
                src={cover.src}
                featured={cover.src.includes("omnibus")}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles['press-page']}>

            <article className={styles['press-card']} aria-label="Press release">
              <div className={styles['press-card-eyebrow']}>FOR IMMEDIATE RELEASE</div>
              <h2 className={styles['press-headline']}>
                Jason Carroll Holloway Launches the Masters&nbsp;X&nbsp;Trilogy
              </h2>
              <p className={styles['press-dek']}>
                A conspiracy of frequency, medieval manuscripts, and the city
                beneath the city — three novels and a complete omnibus from Seventh
                City Press.
              </p>

              <div className={styles['press-body']}>
                <p>
                  <strong>KANSAS CITY, MO</strong> — Author Jason Carroll Holloway
                  and his independent imprint Seventh City Press have released the{" "}
                  <strong>Masters&nbsp;X&nbsp;Trilogy</strong>, a three-volume work of
                  literary conspiracy fiction. The trilogy —{" "}
                  <em>The Inheritance of Frequency</em>, <em>The Grimoire</em>, and{" "}
                  <em>The Kingdom</em> — is available in hardcover, paperback, and
                  ebook, alongside a complete one-volume omnibus.
                </p>

                <p>
                  The story begins beneath Kansas City. A fired security guard named
                  Blake Masters inherits a safety deposit box his grandfather paid for
                  fifty-seven years in advance, timed to open at the exact moment
                  Blake would be ready for it. Inside: seven notebooks, thirty years
                  of classified acoustic research, and a cross-reference to a crypt
                  that has been sealed beneath Prague since 1267. The trilogy is the
                  account of what Blake does with that knowledge — and what it does to
                  him.
                </p>

                <p>
                  The series braids documented history into fiction: the undeciphered
                  Voynich Manuscript and the medieval Ars Notoria; the science of
                  archaeoacoustics and a 111.2&nbsp;Hz frequency that recurs in caves
                  and cathedrals across four continents; and the real, subterranean
                  geography of Kansas City, from the SubTropolis cavern complex
                  upward. Every location in the novels can be visited, looked up, or
                  found in a scholarly bibliography — and much of the underlying data
                  is published openly through the{" "}
                  <a href="https://jasoncholloway.com/chamber/research-archive/" style={{ color: "var(--ink)", textDecoration: "underline", textDecorationColor: "var(--border)" }}>Analysis Chamber</a>,
                  a research archive on the author site that runs the same measurements
                  the characters run in the books.
                </p>

                <div className="ms-pull" style={{ margin: "2.5rem 0" }}>
                  <p>
                    &ldquo;What the medieval masters encoded in cathedral geometry and
                    grimoire tradition wasn&rsquo;t mysticism — it was a technology we had
                    simply forgotten how to read. The Masters&nbsp;X&nbsp;Trilogy is
                    the account of learning to read it again.&rdquo;
                  </p>
                  <cite>— Jason Carroll Holloway</cite>
                </div>

                <p className={styles['press-comps']}>
                  For readers of Umberto Eco&rsquo;s <em>Foucault&rsquo;s Pendulum</em>, Dan
                  Brown&rsquo;s <em>The Da Vinci Code</em>, Elizabeth Kostova&rsquo;s{" "}
                  <em>The Historian</em>, and Anthony Doerr&rsquo;s{" "}
                  <em>Cloud Cuckoo Land</em>.
                </p>

                <h2 className={styles['press-section']}>The Books</h2>

                <div className={styles['press-books']}>
                  <a href="https://jasoncholloway.com/books/masters-x/the-inheritance-of-frequency/" className={styles['book-row']}>
                    <div className={styles['book-meta']}>
                      <span className={styles['vol-label']}>Vol.&nbsp;I</span>
                      <span className={styles['book-title']}>The Inheritance of Frequency</span>
                    </div>
                    <div className={styles['book-desc']}>
                      Seven notebooks. Thirty years of classified acoustic research. A sealed crypt beneath Prague.
                    </div>
                  </a>
                  <a href="https://jasoncholloway.com/books/masters-x/the-grimoire/" className={styles['book-row']}>
                    <div className={styles['book-meta']}>
                      <span className={styles['vol-label']}>Vol.&nbsp;II</span>
                      <span className={styles['book-title']}>The Grimoire</span>
                    </div>
                    <div className={styles['book-desc']}>
                      The Ars Notoria decoded. A preparation protocol for the frequency. Twenty-three candidates waiting.
                    </div>
                  </a>
                  <a href="https://jasoncholloway.com/books/masters-x/the-kingdom/" className={styles['book-row']}>
                    <div className={styles['book-meta']}>
                      <span className={styles['vol-label']}>Vol.&nbsp;III</span>
                      <span className={styles['book-title']}>The Kingdom</span>
                    </div>
                    <div className={styles['book-desc']}>
                      The demonstration and the argument — and an open-source release that reaches 1.2&nbsp;million downloads.
                    </div>
                  </a>
                  <a href="https://jasoncholloway.com/books/masters-x/omnibus/" className={styles['book-row']}>
                    <div className={styles['book-meta']}>
                      <span className={styles['vol-label']}>Omnibus</span>
                      <span className={styles['book-title']}>Masters X: The Complete Trilogy</span>
                    </div>
                    <div className={styles['book-desc']}>
                      All three novels in a single volume, in hardcover and paperback.
                    </div>
                  </a>
                </div>

                <h2 className={styles['press-section']}>Availability</h2>
                <p>
                  Hardcover and paperback distributed globally through IngramSpark —
                  orderable from any bookstore by ISBN and available via Bookshop.org
                  and library systems (OverDrive, Baker&nbsp;&amp;&nbsp;Taylor).
                  Kindle editions on Amazon at $6.99. EPUB editions on Google Play Books
                  (trilogy and Hawkes monograph). Full ISBNs, page counts, pricing by market, and BISAC subject codes appear in the
                  Fact Sheet below.
                </p>

                <div className={styles['press-abouts']}>
                  <div>
                    <h2 className={styles['press-section']}>About the Author</h2>
                    <p>
                      Jason Carroll Holloway is a writer and researcher based in
                      Kansas City and the founder of Seventh City Press. His work
                      explores the intersection of acoustic science, medieval
                      scholarship, and human consciousness. He holds an M.A. in
                      English Literature from Mercy University in Dobbs Ferry, New
                      York, along with degrees and certificates in psychology,
                      sociology, creative writing, and data analytics. He lives and
                      writes in Kansas City.
                    </p>
                  </div>
                  <div>
                    <h2 className={styles['press-section']}>About Seventh City Press</h2>
                    <p>
                      Seventh City Press is an independent literary imprint founded by
                      Jason Carroll Holloway to publish work that refuses the division
                      between imaginative and intellectual work — novels that think,
                      and criticism that speaks. The name comes from the seven cities
                      of the Aldric tradition in the Masters&nbsp;X&nbsp;Trilogy.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* ── Download kit ──────────────────────────────────────────────── */}
            <section className={styles['press-kit-section']} aria-label="Press kit downloads">
              <div className={styles['section-label-row']}>
                <h2 className={styles['label']}>Press &amp; Media Kit</h2>
              </div>
              <p className={styles['press-kit-intro']}>
                Download the complete kit or individual sheets. All files are print-ready PDF.
              </p>

              <a
                href="/press-kit/Masters_X_Press_Kit.pdf"
                download
                className="btn btn-gold"
                style={{ display: "flex", width: "100%", justifyContent: "center", padding: "1.25rem", fontSize: "1.1rem", marginBottom: "2rem" }}
                aria-label="Download complete Masters X Trilogy press kit PDF"
              >
                Download Complete Press Kit (8 pages · PDF)
              </a>

              <div className={styles['kit-files']}>
                {kitFiles.map((f) => (
                  <a
                    key={f.file}
                    href={`/press-kit/${f.file}`}
                    download
                    className={styles['kit-file-card']}
                    aria-label={`Download ${f.label} PDF`}
                  >
                    <div className={styles['kf-meta-row']}>
                      <span className={styles['kf-label']}>{f.label}</span>
                      <span className={styles['kf-meta']}>{f.pages} · PDF</span>
                    </div>
                    <span className={styles['kf-desc']}>{f.desc}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* ── Contact ───────────────────────────────────────────────────── */}
            <section className={styles['press-contact']} aria-label="Press contact">
              <div style={{ background: "var(--bg-raised)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "2.5rem", textAlign: "center" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "1rem", color: "var(--text)" }}>Review Copies &amp; Interviews</h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                  Review copies and interview requests are available to accredited reviewers and journalists.
                </p>
                <Link href="/contact/" className="btn btn-outline" style={{ display: "inline-flex" }}>
                  Contact the Communications Desk
                </Link>
              </div>
            </section>

          </div>
        </div>
      </section>
    </>
  );
}

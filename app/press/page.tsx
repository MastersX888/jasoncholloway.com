import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import styles from './press-page.module.css';

export const metadata: Metadata = {
  title: "Press | Jason Carroll Holloway — Masters X Trilogy",
  description:
    "Press materials for the Masters X Trilogy by Jason Carroll Holloway (Seventh City Press). Includes press release, fact sheet, author bio, and synopses. Review copies available on request.",
  openGraph: {
    title: "Press — Masters X Trilogy | Jason Carroll Holloway",
    description:
      "A conspiracy of frequency, medieval manuscripts, and the city beneath the city. Three novels and a complete omnibus from Seventh City Press.",
    url: "https://jasoncholloway.com/press",
    siteName: "Jason Carroll Holloway",
    type: "website",
  },
  alternates: { canonical: "https://jasoncholloway.com/press" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://jasoncholloway.com/#author",
      name: "Jason Carroll Holloway",
      url: "https://jasoncholloway.com",
      jobTitle: "Author",
      description:
        "Writer and researcher at the intersection of acoustic science, medieval scholarship, and human consciousness.",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Mercy University",
        sameAs: "https://www.mercy.edu",
      },
      sameAs: [
        "https://www.goodreads.com/author/show/20924993",
        "https://www.wikidata.org/wiki/Q140275300",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://jasoncholloway.com/#publisher",
      name: "Seventh City Press",
      url: "https://jasoncholloway.com",
      founder: { "@id": "https://jasoncholloway.com/#author" },
      location: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Kansas City", addressRegion: "MO" } },
    },
    {
      "@type": "Book",
      name: "The Inheritance of Frequency",
      author: { "@id": "https://jasoncholloway.com/#author" },
      publisher: { "@id": "https://jasoncholloway.com/#publisher" },
      isbn: "9798256008048",
      datePublished: "2026-06-01",
      numberOfPages: 178,
      inLanguage: "en",
      bookFormat: "Paperback",
      genre: ["Conspiracy Fiction", "Literary Fiction", "Thriller"],
      description:
        "Seven notebooks. Thirty years of classified acoustic research. A sealed crypt beneath Prague.",
    },
    {
      "@type": "Book",
      name: "The Grimoire",
      author: { "@id": "https://jasoncholloway.com/#author" },
      publisher: { "@id": "https://jasoncholloway.com/#publisher" },
      isbn: "9798256009953",
      datePublished: "2026-06-01",
      numberOfPages: 260,
      inLanguage: "en",
      bookFormat: "Paperback",
      genre: ["Conspiracy Fiction", "Literary Fiction", "Thriller"],
      description:
        "The Ars Notoria decoded. A preparation protocol for the frequency. Twenty-three candidates waiting.",
    },
    {
      "@type": "Book",
      name: "The Kingdom",
      author: { "@id": "https://jasoncholloway.com/#author" },
      publisher: { "@id": "https://jasoncholloway.com/#publisher" },
      isbn: "9798256010072",
      datePublished: "2026-06-01",
      numberOfPages: 200,
      inLanguage: "en",
      bookFormat: "Paperback",
      genre: ["Conspiracy Fiction", "Literary Fiction", "Thriller"],
      description:
        "The demonstration, the argument, and an open-source release that reaches 1.2 million downloads.",
    },
    {
      "@type": "WebPage",
      "@id": "https://jasoncholloway.com/press",
      url: "https://jasoncholloway.com/press",
      name: "Press — Masters X Trilogy | Jason Carroll Holloway",
      description:
        "Press materials, media kit, and review copy requests for the Masters X Trilogy by Jason Carroll Holloway.",
      author: { "@id": "https://jasoncholloway.com/#author" },
      dateModified: new Date().toISOString().split("T")[0],
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
    desc: "Complete ISBN matrix, BISAC codes, pricing, trade terms",
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
  { label: "Vol. I — Paperback", src: "/covers/book1-paperback.png" },
  { label: "Vol. I — Hardcover", src: "/covers/book1-hardcover-v3.png" },
  { label: "Vol. II — Paperback", src: "/covers/book2-paperback.png" },
  { label: "Vol. II — Hardcover", src: "/covers/book2-hardcover-v3.png" },
  { label: "Vol. III — Paperback", src: "/covers/book3-paperback.png" },
  { label: "Vol. III — Hardcover", src: "/covers/book3-hardcover-v3.png" },
];

const omnibusCovers = [
  { label: "Omnibus — Hardcover", src: "/covers/omnibus-hardcover-v3.png" },
];

function CoverThumb({ label, src }: { label: string; src: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.65rem" }}>
      <div style={{
        position: "relative",
        width: "120px",
        aspectRatio: "2/3",
        borderRadius: "var(--r-sm)",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        border: "1px solid var(--border-faint)",
        background: "#000",
      }}>
        <Image src={src} alt={label} fill style={{ objectFit: "contain" }} sizes="120px" />
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
      <Script
        id="press-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero">
        <div className="hero-bg" data-version="groundswell-v4" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow animate-fade-up">
              <div className="hero-eyebrow-line" />
              <span className="label">Seventh City Press · Communications Desk</span>
            </div>

            <h1 className="hero-title animate-fade-up delay-1" style={{ fontSize: "clamp(2.5rem, 6vw, 4.8rem)", lineHeight: 1.1 }}>
              Press &amp; Media Kit
            </h1>

            <p className="hero-sub animate-fade-up delay-2" style={{ maxWidth: "55ch", marginBottom: "2.5rem" }}>
              Press materials, review copy requests, and downloadable media kit for the Masters X Trilogy.
            </p>

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

      {/* Cover Gallery */}
      <section className="section" style={{ borderTop: "1px solid var(--border-faint)", background: "var(--bg-surface)", paddingBottom: "2.5rem" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "1.75rem", paddingTop: "0.5rem" }}>
            <span className="label">Cover Art — Masters X Trilogy</span>
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
            <span className="label">Omnibus Edition</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            {omnibusCovers.map((cover) => (
              <CoverThumb key={cover.label} label={cover.label} src={cover.src} />
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
                  is published openly through the <Link href="/chamber/research-archive" style={{ color: "var(--cyan)", textDecoration: "none" }}>Analysis Chamber</Link>, a research archive
                  on this site that runs the same measurements the characters run in
                  the books.
                </p>

                <div className="ms-pull" style={{ margin: "2.5rem 0" }}>
                  <p>
                    "What the medieval masters encoded in cathedral geometry and
                    grimoire tradition wasn't mysticism — it was a technology we had
                    simply forgotten how to read. The Masters&nbsp;X&nbsp;Trilogy is
                    the account of learning to read it again."
                  </p>
                  <cite>— Jason Carroll Holloway</cite>
                </div>

                <p className={styles['press-comps']}>
                  For readers of Umberto Eco's <em>Foucault's Pendulum</em>, Dan
                  Brown's <em>The Da Vinci Code</em>, Elizabeth Kostova's{" "}
                  <em>The Historian</em>, and Anthony Doerr's{" "}
                  <em>Cloud Cuckoo Land</em>.
                </p>

                <h2 className={styles['press-section']}>The Books</h2>

                <div className={styles['press-books']}>
                  <Link href="/books/masters-x/the-inheritance-of-frequency" className={styles['book-row']}>
                    <div className={styles['book-meta']}>
                      <span className={styles['vol-label']}>Vol.&nbsp;I</span>
                      <span className={styles['book-title']}>The Inheritance of Frequency</span>
                    </div>
                    <div className={styles['book-desc']}>
                      Seven notebooks. Thirty years of classified acoustic research. A sealed crypt beneath Prague.
                    </div>
                  </Link>
                  <Link href="/books/masters-x/the-grimoire" className={styles['book-row']}>
                    <div className={styles['book-meta']}>
                      <span className={styles['vol-label']}>Vol.&nbsp;II</span>
                      <span className={styles['book-title']}>The Grimoire</span>
                    </div>
                    <div className={styles['book-desc']}>
                      The Ars Notoria decoded. A preparation protocol for the frequency. Twenty-three candidates waiting.
                    </div>
                  </Link>
                  <Link href="/books/masters-x/the-kingdom" className={styles['book-row']}>
                    <div className={styles['book-meta']}>
                      <span className={styles['vol-label']}>Vol.&nbsp;III</span>
                      <span className={styles['book-title']}>The Kingdom</span>
                    </div>
                    <div className={styles['book-desc']}>
                      The demonstration and the argument — and an open-source release that reaches 1.2&nbsp;million downloads.
                    </div>
                  </Link>
                  <Link href="/books/masters-x/omnibus" className={styles['book-row']}>
                    <div className={styles['book-meta']}>
                      <span className={styles['vol-label']}>Omnibus</span>
                      <span className={styles['book-title']}>Masters X: The Complete Trilogy</span>
                    </div>
                    <div className={styles['book-desc']}>
                      All three novels in a single volume, in hardcover and paperback.
                    </div>
                  </Link>
                </div>

                <h2 className={styles['press-section']}>Availability</h2>
                <p>
                  Hardcover, paperback, and ebook. Distributed globally through
                  IngramSpark and available via Amazon, Bookshop.org, and library
                  systems (OverDrive, Baker&nbsp;&amp;&nbsp;Taylor). Ebook editions
                  from $5.99. Full ISBNs, page counts, pricing by market, and BISAC
                  subject codes appear in the Fact Sheet below.
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
                <span className={styles['label']}>PRESS KIT</span>
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
                <Link href="/contact" className="btn btn-outline" style={{ display: "inline-flex" }}>
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

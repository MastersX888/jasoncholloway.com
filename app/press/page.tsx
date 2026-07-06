// app/press/page.tsx
// Drop this file at: src/app/press/page.tsx  (or app/press/page.tsx)
// Put the PDFs in: public/press-kit/
//   - Masters_X_Press_Release.pdf
//   - Masters_X_Fact_Sheet.pdf
//   - Holloway_Author_Bios.pdf
//   - Masters_X_Synopses.pdf
//   - Masters_X_Press_Kit.pdf  (combined)

import type { Metadata } from "next";
import Script from "next/script";
import styles from './press-page.module.css';

// ── Page metadata ──────────────────────────────────────────────────────────
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

// ── JSON-LD structured data ────────────────────────────────────────────────
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
    // Book: The Inheritance of Frequency
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
    // Book: The Grimoire
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
    // Book: The Kingdom
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
    // WebPage schema for the press page itself
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

// ── Kit file manifest ──────────────────────────────────────────────────────
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

// ── Component ──────────────────────────────────────────────────────────────
export default function PressPage() {
  return (
    <>
      <Script
        id="press-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className={styles['press-page']}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <header className={styles['press-header']}>
          <p className={styles['press-eyebrow']}>For Immediate Release</p>
          <h1 className={styles['press-headline']}>
            Jason Carroll Holloway Launches the Masters&nbsp;X&nbsp;Trilogy
          </h1>
          <p className={styles['press-dek']}>
            A conspiracy of frequency, medieval manuscripts, and the city
            beneath the city — three novels and a complete omnibus from Seventh
            City Press.
          </p>
        </header>

        {/* ── Body copy — this is what Google indexes ─────────────────── */}
        <article className={styles['press-body']} aria-label="Press release">

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
            is published openly through the Analysis Chamber, a research archive
            on this site that runs the same measurements the characters run in
            the books.
          </p>

          <blockquote className={styles['press-quote']}>
            <p>
              "What the medieval masters encoded in cathedral geometry and
              grimoire tradition wasn't mysticism — it was a technology we had
              simply forgotten how to read. The Masters&nbsp;X&nbsp;Trilogy is
              the account of learning to read it again."
            </p>
            <cite>— Jason Carroll Holloway</cite>
          </blockquote>

          <p className={styles['press-comps']}>
            For readers of Umberto Eco's <em>Foucault's Pendulum</em>, Dan
            Brown's <em>The Da Vinci Code</em>, Elizabeth Kostova's{" "}
            <em>The Historian</em>, and Anthony Doerr's{" "}
            <em>Cloud Cuckoo Land</em>.
          </p>

          {/* ── The Books ─────────────────────────────────────────────── */}
          <h2 className={styles['press-section']}>The Books</h2>

          <dl className={styles['press-books']}>
            <div>
              <dt>
                <span className={styles['vol-label']}>Vol.&nbsp;I</span>
                <em>The Inheritance of Frequency</em>
              </dt>
              <dd>
                Seven notebooks. Thirty years of classified acoustic research. A
                sealed crypt beneath Prague.
              </dd>
            </div>
            <div>
              <dt>
                <span className={styles['vol-label']}>Vol.&nbsp;II</span>
                <em>The Grimoire</em>
              </dt>
              <dd>
                The Ars Notoria decoded. A preparation protocol for the
                frequency. Twenty-three candidates waiting.
              </dd>
            </div>
            <div>
              <dt>
                <span className={styles['vol-label']}>Vol.&nbsp;III</span>
                <em>The Kingdom</em>
              </dt>
              <dd>
                The demonstration and the argument — and, within the novel's own
                events, an open-source release that reaches 1.2&nbsp;million
                downloads.
              </dd>
            </div>
            <div>
              <dt>
                <span className={styles['vol-label']}>Omnibus</span>
                <em>Masters X: The Complete Trilogy</em>
              </dt>
              <dd>All three novels in a single volume, in hardcover and paperback.</dd>
            </div>
          </dl>

          {/* ── Availability ──────────────────────────────────────────── */}
          <h2 className={styles['press-section']}>Availability</h2>
          <p>
            Hardcover, paperback, and ebook. Distributed globally through
            IngramSpark and available via Amazon, Bookshop.org, and library
            systems (OverDrive, Baker&nbsp;&amp;&nbsp;Taylor). Ebook editions
            from $5.99. Full ISBNs, page counts, pricing by market, and BISAC
            subject codes appear in the Fact Sheet below.
          </p>

          {/* ── About ─────────────────────────────────────────────────── */}
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
        </article>

        {/* ── Download kit ──────────────────────────────────────────────── */}
        <section className={styles['press-kit-section']} aria-label="Press kit downloads">
          <h2 className={styles['press-section']}>Press Kit</h2>
          <p className={styles['press-kit-intro']}>
            Download the complete kit or individual sheets. All files are
            print-ready PDF.
          </p>

          <a
            href="/press-kit/Masters_X_Press_Kit.pdf"
            download
            className={styles['kit-download-all']}
            aria-label="Download complete Masters X Trilogy press kit PDF"
          >
            <span className={styles['kit-dl-icon']} aria-hidden="true">↓</span>
            <span>
              <strong>Download Complete Press Kit</strong>
              <span className={styles['kit-dl-sub']}>All four documents · 8 pages · PDF</span>
            </span>
          </a>

          <ul className={styles['kit-files']} role="list">
            {kitFiles.map((f) => (
              <li key={f.file}>
                <a
                  href={`/press-kit/${f.file}`}
                  download
                  aria-label={`Download ${f.label} PDF`}
                >
                  <span className={styles['kf-label']}>{f.label}</span>
                  <span className={styles['kf-desc']}>{f.desc}</span>
                  <span className={styles['kf-meta']}>{f.pages} · PDF</span>
                  <span className={styles['kf-arrow']} aria-hidden="true">↓</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Contact ───────────────────────────────────────────────────── */}
        <section className={styles['press-contact']} aria-label="Press contact">
          <p>
            Review copies and interview requests are available to accredited
            reviewers and journalists.{" "}
            <a href="/contact">Contact the Communications Desk →</a>
          </p>
        </section>

      </main>
    </>
  );
}

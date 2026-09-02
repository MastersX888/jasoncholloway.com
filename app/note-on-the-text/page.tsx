import type { Metadata } from "next";
import Link from "next/link";
import {
  NOTE_ON_THE_TEXT,
  closing,
  concordanceGroups,
  copyTests,
  earlierCopy,
  emendations,
  kofiNote,
  secondListening,
  sidebarSections,
  statesRatherThanVersions,
  textStates,
  whyTextChanges,
} from "@/lib/data/noteOnTheText";
import styles from "./note-on-the-text.module.css";

export const metadata: Metadata = {
  title: { absolute: "A Note on the Text — Masters X Trilogy" },
  description: NOTE_ON_THE_TEXT.description,
  alternates: {
    canonical: "https://jasoncholloway.com/note-on-the-text/",
  },
  openGraph: {
    title: "A Note on the Text — Masters X Trilogy",
    description: NOTE_ON_THE_TEXT.description,
    url: "https://jasoncholloway.com/note-on-the-text/",
    type: "article",
    publishedTime: "2026-08-30",
    modifiedTime: "2026-08-30",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: NOTE_ON_THE_TEXT.title,
      description: NOTE_ON_THE_TEXT.description,
      datePublished: NOTE_ON_THE_TEXT.datePublished,
      dateModified: NOTE_ON_THE_TEXT.lastRevised,
      author: { "@id": "https://jasoncholloway.com/#person" },
      publisher: { "@id": "https://jasoncholloway.com/#organization" },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://jasoncholloway.com/note-on-the-text/",
      },
      about: {
        "@type": "BookSeries",
        name: "Masters X Trilogy",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://jasoncholloway.com/" },
        { "@type": "ListItem", position: 2, name: "Books", item: "https://jasoncholloway.com/books/" },
        { "@type": "ListItem", position: 3, name: "Masters X Trilogy", item: "https://jasoncholloway.com/books/masters-x/" },
        { "@type": "ListItem", position: 4, name: NOTE_ON_THE_TEXT.title, item: "https://jasoncholloway.com/note-on-the-text/" },
      ],
    },
  ],
};

export default function NoteOnTheTextPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className={styles.breadcrumbSep}>›</span>
              <Link href="/books">Books</Link>
              <span className={styles.breadcrumbSep}>›</span>
              <Link href="/books/masters-x">Masters X</Link>
              <span className={styles.breadcrumbSep}>›</span>
              <span>{NOTE_ON_THE_TEXT.title}</span>
            </nav>
            <span className="label">{NOTE_ON_THE_TEXT.label}</span>
            <h1 className="display-lg" style={{ marginBottom: "1rem" }}>
              {NOTE_ON_THE_TEXT.h1Line1}
              <br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>{NOTE_ON_THE_TEXT.h1Line2}</span>
            </h1>
            <p className="fn-lede" style={{ maxWidth: "42ch" }}>{NOTE_ON_THE_TEXT.deck}</p>
            <p className={styles.metaLine}>
              Last revised {NOTE_ON_THE_TEXT.lastRevised} · Published {NOTE_ON_THE_TEXT.datePublished}
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container">
          <div className={styles.layout}>
            <article className={`${styles.article} ${styles.prose}`}>
              <p className={styles.sectionLabel} id="second-listening">{secondListening.label}</p>
              {secondListening.paragraphs.map((para, i) => (
                <p key={i}>
                  {i === 1 ? (
                    <>
                      It is a short line on the second page of the first volume, in a chapter about a boy at a library table:{" "}
                      <span className={styles.emphasis}>Always know your exits.</span> It is meant to arrive as a remembered voice cutting across the narration. Blake&apos;s grandfather, heard rather than quoted. On the proof in front of me it sat in plain roman type, level with every sentence around it. So did every other italic in the book. There were none — not one, in any of the three paperbacks, in any copy that had gone out since the first of June.
                    </>
                  ) : (
                    para
                  )}
                </p>
              ))}

              <h2 className="fn-h2" id="why-changes">{whyTextChanges.heading}</h2>
              {whyTextChanges.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <h2 className="fn-h2" id="states-not-versions">{statesRatherThanVersions.heading}</h2>
              {statesRatherThanVersions.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <p className={styles.sectionLabel} id="three-states">The Three States</p>
              <div className={styles.stateGrid}>
                {textStates.map((state) => (
                  <div
                    key={state.id}
                    className={`${styles.stateCard} ${state.current ? styles.stateCardCurrent : ""}`}
                  >
                    <div className={styles.stateOrdinal}>{state.ordinal}</div>
                    <div className={styles.stateRange}>{state.range}</div>
                    <p className={styles.stateSummary}>{state.summary}</p>
                    <ul className={styles.stateList}>
                      {state.distinguishing.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {state.note ? <p className={styles.stateNote}>{state.note}</p> : null}
                  </div>
                ))}
              </div>

              <p className={styles.sectionLabel} id="identifying">Identifying Your Copy</p>
              <p className={styles.intro}>
                The first two tests are enough on their own. The address was corrected before the death year was, so the two readings together resolve any copy — of any edition, in any format — to a single state. The remaining tests are supplementary, and apply only to the editions named.
              </p>
              {copyTests.map((test, i) => (
                <div key={test.id} className={styles.testCard}>
                  <div className={styles.testLabel}>{i + 1}. {test.label}</div>
                  <div className={styles.testLocation}>{test.location}</div>
                  <p className={styles.testPrompt}>{test.prompt}</p>
                  {test.readings.map((reading) => (
                    <div key={reading.verdict + reading.text} className={styles.readingRow}>
                      <span className={styles.readingText}>{reading.text}</span>
                      <span className={styles.verdict}>{reading.verdict}</span>
                    </div>
                  ))}
                  {test.scope ? <p className={styles.testScope}>{test.scope}</p> : null}
                </div>
              ))}

              <p className={styles.sectionLabel} id="record">The Record</p>
              <p className={styles.intro}>
                Every emendation made since publication, in the order the states occurred. Nothing here alters the events of the novels or the fate of any character.
              </p>
              {emendations.map((item) => (
                <div key={item.id} className={styles.emendation}>
                  <h3>{item.heading}</h3>
                  <div className={styles.emendationMeta}>
                    Introduced: {item.introduced} · Scope: {item.scope}
                  </div>
                  <p>{item.body}</p>
                </div>
              ))}

              <p className={styles.sectionLabel} id="concordance">Concordance of names</p>
              <p className={styles.intro}>
                For anyone who read an earlier state and would like to reconcile it with a current copy. Names on the left appear in the first and second states; names on the right are current.
              </p>
              {concordanceGroups.map((group) => (
                <div key={group.id} className={styles.concordanceGroup}>
                  <h3>{group.heading}</h3>
                  <p className={styles.concordanceRationale}>{group.rationale}</p>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Earlier state</th>
                        <th aria-hidden="true" />
                        <th>Current</th>
                        <th>Vol.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.changes.map((row) => (
                        <tr key={row.from + row.to}>
                          <td>{row.from}</td>
                          <td className={styles.arrow}>→</td>
                          <td>{row.to}</td>
                          <td>{row.volume}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className={styles.retained}>{group.retained}</p>
                </div>
              ))}
              <p className={styles.kofiNote}>{kofiNote}</p>

              <p className={styles.sectionLabel} id="earlier-copy">If You Own an Earlier Copy</p>
              <div className={styles.ctaBox}>
                <p>{earlierCopy.body}</p>
                <a
                  className={styles.emailLink}
                  href={`mailto:${NOTE_ON_THE_TEXT.email}?subject=${encodeURIComponent(NOTE_ON_THE_TEXT.emailSubject)}`}
                >
                  {NOTE_ON_THE_TEXT.email}
                </a>
              </div>

              <h2 className="fn-h2" id="settled">{closing.heading}</h2>
              {closing.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <p className={styles.footerLink}>
                <Link href="/books/masters-x">The Masters X Trilogy →</Link>
              </p>
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarTitle}>On this page</div>
                <nav className={styles.sidebarNav} aria-label="On this page">
                  {sidebarSections.map((item) => (
                    <a key={item.id} href={`#${item.id}`}>
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarTitle}>The Trilogy</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "0.75rem" }}>
                  Masters X — three novels by Jason Carroll Holloway, published June 2026 by Seventh City Press.
                </p>
                <Link href="/books/masters-x" style={{ fontSize: "0.85rem" }}>
                  View the trilogy →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

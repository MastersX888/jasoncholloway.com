import Link from "next/link";
import PassageExcerpt from "@/components/books/PassageExcerpt";
import NotaIcon from "@/components/ui/NotaIcon";
import WaveDivider from "@/components/ui/WaveDivider";
import type { NovelMoment } from "@/lib/data/moments";
import { getAdjacentMoments, momentPath } from "@/lib/data/moments";
import { books } from "@/lib/data/books";

interface MomentLayoutProps {
  moment: NovelMoment;
}

/** Single-scene micro-page — story context + verbatim excerpt, indexable. */
export default function MomentLayout({ moment }: MomentLayoutProps) {
  const { prev, next } = getAdjacentMoments(moment.slug);
  const volume = books.find((b) => b.slug === moment.volumeSlug);
  const baseUrl = "https://jasoncholloway.com";
  const url = `${baseUrl}${momentPath(moment.slug)}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: moment.title,
    description: moment.description,
    url,
    datePublished: "2026-06-01",
    dateModified: "2026-08-07",
    author: { "@id": `${baseUrl}/#person` },
    publisher: { "@id": `${baseUrl}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: {
      "@type": "Book",
      name: volume ? `${volume.title}: ${volume.subtitle}` : "Masters X",
      url: `${baseUrl}/books/masters-x/${moment.volumeSlug}/`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Books", item: `${baseUrl}/books/` },
      { "@type": "ListItem", position: 2, name: "Masters X", item: `${baseUrl}/books/masters-x/` },
      { "@type": "ListItem", position: 3, name: "From the Novel", item: `${baseUrl}/books/masters-x/moments/` },
      { "@type": "ListItem", position: 4, name: moment.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]) }}
      />
      <section className="page-header" style={{ paddingBottom: "3rem" }}>
        <div className="container">
          <div className="page-header-inner" style={{ maxWidth: "820px" }}>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "1.25rem",
                flexWrap: "wrap",
                alignItems: "center",
                fontSize: "0.85rem",
              }}
            >
              <Link href="/books/masters-x" className="hover:text-foreground transition-colors">
                Masters X
              </Link>
              <span className="text-muted-foreground">·</span>
              <Link href="/books/masters-x/moments" className="hover:text-foreground transition-colors">
                From the Novel
              </Link>
              {volume && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <Link href={`/books/masters-x/${volume.slug}`} className="hover:text-foreground transition-colors">
                    Volume {volume.volume}
                  </Link>
                </>
              )}
            </div>
            <p className="label" style={{ marginBottom: "0.75rem" }}>
              Volume {moment.volume} · Scene {moment.readingOrder} of {10}
            </p>
            <h1 className="display-md" style={{ marginBottom: "1rem" }}>
              {moment.title}
            </h1>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                lineHeight: 1.75,
                maxWidth: "65ch",
              }}
            >
              {moment.context}
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <WaveDivider />
      </div>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <PassageExcerpt paragraphs={moment.paragraphs} attribution={moment.attribution} />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border-faint)",
            }}
          >
            {volume && (
              <Link href={`/books/masters-x/${volume.slug}`} className="btn btn-outline btn-sm">
                Volume {volume.volume}: {volume.subtitle}
              </Link>
            )}
            {moment.fieldNoteHref && (
              <Link href={moment.fieldNoteHref} className="btn btn-ghost btn-sm" style={{ color: "var(--cyan)" }}>
                The real history →
              </Link>
            )}
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--border-faint)", padding: "2.5rem 0", background: "var(--bg-surface)" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
            {prev ? (
              <Link href={momentPath(prev.slug)} className="card" style={{ flex: 1, minWidth: "200px", textDecoration: "none" }}>
                <div className="nota-nav-label" style={{ fontSize: "0.7rem", color: "var(--text-faint)", marginBottom: "0.35rem" }}>
                  <NotaIcon variant="back" size={12} />
                  Previous scene
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>{prev.title}</div>
              </Link>
            ) : (
              <div style={{ flex: 1 }} />
            )}
            {next ? (
              <Link
                href={momentPath(next.slug)}
                className="card"
                style={{ flex: 1, minWidth: "200px", textDecoration: "none", textAlign: "right" }}
              >
                <div className="nota-nav-label" style={{ fontSize: "0.7rem", color: "var(--text-faint)", marginBottom: "0.35rem", justifyContent: "flex-end" }}>
                  Next scene
                  <NotaIcon variant="forward" size={12} />
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>{next.title}</div>
              </Link>
            ) : (
              <div style={{ flex: 1 }} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

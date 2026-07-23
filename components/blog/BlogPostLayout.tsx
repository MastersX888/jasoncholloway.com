import Link from "next/link";

interface BlogPostLayoutProps {
  slug: string;
  title: string;
  seriesNumber: number;
  datePublished: string;
  fieldNotes: string[];
  children: React.ReactNode;
}

export default function BlogPostLayout({
  slug,
  title,
  seriesNumber,
  datePublished,
  fieldNotes,
  children,
}: BlogPostLayoutProps) {
  const baseUrl = "https://jasoncholloway.com";
  const url = `${baseUrl}/blog/${slug}/`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    url,
    datePublished,
    dateModified: datePublished,
    author: { "@id": `${baseUrl}/#person` },
    publisher: { "@id": `${baseUrl}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: {
      "@type": "Blog",
      name: "The Facts Behind the Fiction",
      url: `${baseUrl}/blog/`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="blog-article">
        <section className="page-header">
          <div className="container">
            <div className="page-header-inner">
              <div className="section-label-row" style={{ marginBottom: "1rem" }}>
                <Link href="/blog/" className="label" style={{ textDecoration: "none" }}>
                  The Facts Behind the Fiction · Essay {seriesNumber}
                </Link>
              </div>
              <h1 className="display-lg" style={{ marginBottom: "1rem" }}>
                {title}
              </h1>
              <p style={{ color: "var(--text-faint)", fontSize: "0.88rem" }}>
                Jason Carroll Holloway · Seventh City Press ·{" "}
                {new Date(datePublished).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container blog-prose">{children}</div>
        </section>

        {fieldNotes.length > 0 && (
          <section className="section" style={{ borderTop: "1px solid var(--border-faint)" }}>
            <div className="container" style={{ maxWidth: "var(--max-w-prose)" }}>
              <div className="section-label-row">
                <span className="label">Related Field Notes</span>
              </div>
              <nav className="footer-links">
                {fieldNotes.map((href) => (
                  <Link key={href} href={href}>
                    {href.replace("/field-notes/", "").replace(/\/$/, "").replace(/-/g, " ")}
                  </Link>
                ))}
              </nav>
            </div>
          </section>
        )}

        <section className="section" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-faint)" }}>
          <div className="container" style={{ maxWidth: "700px", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)", fontStyle: "italic", marginBottom: "1.5rem" }}>
              The facts are in the files. The fiction is in the books.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/books/masters-x/" className="btn btn-gold">
                Read the Trilogy
              </Link>
              <Link href="/field-notes/" className="btn btn-outline" style={{ color: "var(--cyan)", borderColor: "var(--cyan-dim)" }}>
                Field Notes
              </Link>
              <Link href="/blog/" className="btn btn-outline">
                All Essays
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

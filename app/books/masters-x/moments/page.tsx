import Link from "next/link";
import { books } from "@/lib/data/books";
import { getMomentsInReadingOrder, momentPath, MOMENT_COUNT } from "@/lib/data/moments";
import WaveDivider from "@/components/ui/WaveDivider";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "From the Novel · Masters X Scenes",
  description:
    "Seventeen verbatim scenes from the Masters X trilogy in chronological order — SubTropolis, the Breitling Navitimer, Saying 113, and the chamber beneath Kansas City.",
  socialDescription:
    "Seventeen indexable scenes from the Masters X trilogy in story order: verbatim prose and context only.",
  path: "/books/masters-x/moments/",
});

export default function MomentsHubPage() {
  const baseUrl = "https://jasoncholloway.com";
  const url = `${baseUrl}/books/masters-x/moments/`;
  const scenes = getMomentsInReadingOrder();

  const hubDescription =
    "Seventeen verbatim scenes from the Masters X trilogy in chronological reading order — from the safety deposit box through the Breitling on Blake Masters's desk.";

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "From the Novel — Masters X Scenes",
    description: hubDescription,
    url,
    hasPart: scenes.map((m) => ({
      "@type": "Article",
      name: m.title,
      url: `${baseUrl}${momentPath(m.slug)}`,
      position: m.readingOrder,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <section className="page-header" style={{ paddingBottom: "3rem" }}>
        <div className="container">
          <div className="page-header-inner" style={{ maxWidth: "820px" }}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/books/masters-x" className="hover:text-foreground transition-colors">
                Masters X
              </Link>
              <span className="text-muted-foreground">·</span>
              <span className="text-foreground">From the Novel</span>
            </div>
            <h1 className="display-lg" style={{ marginBottom: "1rem" }}>
              From the Novel
            </h1>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1.05rem", maxWidth: "62ch" }}>
              {MOMENT_COUNT} scenes in chronological order — verbatim manuscript prose with story context only.
              Scroll the sequence as the trilogy unfolds: Volume I inheritance, Volume II preparation, Volume III convergence.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <WaveDivider />
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: "820px" }}>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            {scenes.map((scene) => {
              const book = books.find((b) => b.slug === scene.volumeSlug);
              return (
                <li key={scene.slug}>
                  <Link
                    href={momentPath(scene.slug)}
                    style={{
                      display: "block",
                      padding: "1.15rem 1.35rem",
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--r-md)",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "0.35rem" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
                        {scene.title}
                      </div>
                      <span className="label" style={{ fontSize: "0.65rem", opacity: 0.85 }}>
                        Scene {scene.readingOrder} · Vol. {scene.volume}
                        {book ? ` · ${book.subtitle}` : ""}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-faint)", lineHeight: 1.6, margin: 0 }}>
                      {scene.context}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                        fontSize: "0.92rem",
                        color: "var(--text-muted)",
                        marginTop: "0.75rem",
                        marginBottom: 0,
                        lineHeight: 1.55,
                      }}
                    >
                      {scene.paragraphs[0].length > 140
                        ? `${scene.paragraphs[0].slice(0, 137)}…`
                        : scene.paragraphs[0]}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ol>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2rem" }}>
            {books
              .filter((b) => b.series === "Masters X" && b.slug !== "omnibus")
              .map((book) => (
                <Link key={book.slug} href={`/books/masters-x/${book.slug}`} className="btn btn-outline btn-sm">
                  Volume {book.volume} — synopsis &amp; editions
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

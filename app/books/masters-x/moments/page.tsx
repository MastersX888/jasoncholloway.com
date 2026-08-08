import Link from "next/link";
import { books } from "@/lib/data/books";
import { getMomentsByVolume, momentPath, novelMoments } from "@/lib/data/moments";
import WaveDivider from "@/components/ui/WaveDivider";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "From the Novel · Masters X Scenes",
  description:
    "Verbatim scenes from the Masters X trilogy — safety deposit boxes, SubTropolis tunnels, the Voynich Manuscript, Saying 113, and the chamber beneath Kansas City. Read in order.",
  socialDescription:
    "Twelve indexable scenes from the Masters X trilogy: verbatim prose and story context, volume by volume.",
  path: "/books/masters-x/moments/",
});

const volumeSlugs = ["the-inheritance-of-frequency", "the-grimoire", "the-kingdom"] as const;

export default function MomentsHubPage() {
  const baseUrl = "https://jasoncholloway.com";
  const url = `${baseUrl}/books/masters-x/moments/`;

  const hubDescription =
    "Verbatim scenes from the Masters X trilogy — safety deposit boxes, SubTropolis tunnels, the Ars Notoria, Saying 113, and the chamber beneath Kansas City. Read in order.";

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "From the Novel — Masters X Scenes",
    description: hubDescription,
    url,
    hasPart: novelMoments.map((m) => ({
      "@type": "Article",
      name: m.title,
      url: `${baseUrl}${momentPath(m.slug)}`,
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
              Twelve scenes from the trilogy in reading order — verbatim manuscript prose with story context only.
              Each page is a single moment from the books, indexed for search and linked to the volume it belongs to.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <WaveDivider />
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: "820px" }}>
          {volumeSlugs.map((volSlug) => {
            const book = books.find((b) => b.slug === volSlug);
            const scenes = getMomentsByVolume(volSlug);
            if (!book || scenes.length === 0) return null;
            return (
              <div key={volSlug} style={{ marginBottom: "3.5rem" }}>
                <div className="section-label-row" style={{ marginBottom: "1.25rem" }}>
                  <h2 className="label">
                    Volume {book.volume} · {book.subtitle}
                  </h2>
                </div>
                <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {scenes.map((scene) => (
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
                        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: "0.35rem" }}>
                          {scene.title}
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
                  ))}
                </ol>
                <Link
                  href={`/books/masters-x/${volSlug}`}
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: "1.25rem" }}
                >
                  Volume {book.volume} — full synopsis &amp; editions
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

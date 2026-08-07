import Link from "next/link";
import { books } from "@/lib/data/books";
import { BUY_LINKS } from "@/lib/data/buyLinks";
import CoverArtifact from "@/components/ui/CoverArtifact";
import HardcoverCaseReveal from "@/components/ui/HardcoverCaseReveal";
import WaveDivider from "@/components/ui/WaveDivider";
import TrackedBuyLink from "@/components/ui/TrackedBuyLink";
import BookViewTracker from "@/components/analytics/BookViewTracker";
import { buildBookItem } from "@/lib/analytics/gtag";
import {
  buildBookGraph,
  MASTERS_X_SERIES_ID,
  MASTERS_X_VOLUME_SLUGS,
} from "@/lib/seo/bookSchema";
import { buildMetadata } from "@/lib/seo/metadata";
import PassageExcerpt from "@/components/books/PassageExcerpt";
import { omnibusFaqs, omnibusVolumePassages } from "@/lib/data/passages";
import type { Metadata } from "next";

const omnibus = books.find((b) => b.slug === "omnibus");

const OMNIBUS_PATH = "/books/masters-x/omnibus/";
const OMNIBUS_URL = `https://jasoncholloway.com${OMNIBUS_PATH}`;

export const metadata: Metadata = buildMetadata({
  title: "Masters X Omnibus | Complete Trilogy",
  description:
    "All three Masters X novels in one volume — hardcover and paperback from Seventh City Press, via IngramSpark or any bookstore by ISBN.",
  socialDescription:
    "All three Masters X novels collected in one volume. Hardcover and paperback from Seventh City Press.",
  path: OMNIBUS_PATH,
  ogType: "book",
  image: {
    url: "https://jasoncholloway.com/books/masters-x/omnibus/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Masters X: Omnibus Edition — cover",
  },
});

export default function OmnibusPage() {
  if (!omnibus) return null;

  const paragraphs = omnibus.description.split("\n\n");

  // The omnibus is print-only on IngramSpark. `buildBookGraph` emits no ebook or
  // Amazon action because the data carries no ebook ISBN and no ASIN.
  const jsonLd = buildBookGraph(omnibus, {
    pageUrl: OMNIBUS_URL,
    name: `${omnibus.title}: ${omnibus.subtitle}`,
    description: omnibus.shortDesc,
    genre: ["Conspiracy Fiction", "Literary Fiction", "Thriller"],
    image: `https://jasoncholloway.com${omnibus.coverImageHC}`,
    extra: {
      isPartOf: { "@id": MASTERS_X_SERIES_ID },
      hasPart: MASTERS_X_VOLUME_SLUGS.map((slug) => ({
        "@id": `https://jasoncholloway.com/books/masters-x/${slug}/#work`,
      })),
    },
  });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Books", item: "https://jasoncholloway.com/books/" },
      { "@type": "ListItem", position: 2, name: "Masters X Trilogy", item: "https://jasoncholloway.com/books/masters-x/" },
      { "@type": "ListItem", position: 3, name: omnibus.subtitle, item: "https://jasoncholloway.com/books/masters-x/omnibus/" },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: omnibusFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const omnibusDisplayName = `${omnibus.title}: ${omnibus.subtitle}`;
  const pbLink = omnibus.buyLinks.find((l) => l.label === "IngramSpark (PB)");
  const hcLink = omnibus.buyLinks.find((l) => l.label === "IngramSpark (HC)");
  const bookshopPbLink = omnibus.buyLinks.find(
    (l) => l.label.startsWith("Bookshop.org") && l.format === "Paperback"
  );
  const bookshopHcLink = omnibus.buyLinks.find(
    (l) => l.label.startsWith("Bookshop.org") && l.format === "Hardcover"
  );
  const viewItems = [
    ...(omnibus.isbn_pb
      ? [
          buildBookItem({
            itemId: omnibus.isbn_pb,
            itemName: `${omnibusDisplayName} (Paperback)`,
            itemVariant: "Paperback",
            price: omnibus.price_pb_is,
          }),
        ]
      : []),
    ...(omnibus.isbn_hc
      ? [
          buildBookItem({
            itemId: omnibus.isbn_hc,
            itemName: `${omnibusDisplayName} (Hardcover)`,
            itemVariant: "Hardcover",
            price: omnibus.price_hc_is,
          }),
        ]
      : []),
  ];
  const viewValue = viewItems[0]?.price;

  return (
    <>
      <BookViewTracker items={viewItems} value={viewValue} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbJsonLd, faqJsonLd]) }}
      />
      <section className="page-header" style={{ paddingBottom: "4rem" }}>
        <div className="container">
          <div className="page-header-inner">
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/books/masters-x" className="hover:text-foreground transition-colors">
                {omnibus.series}
              </Link>
              <span className="text-muted-foreground">·</span>
              <span className="text-foreground">Collected Edition</span>
            </div>

            <div className="resp-book-hero" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "3.5rem", alignItems: "start" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <HardcoverCaseReveal
                  subtitle={omnibus.subtitle}
                  jacketSrc={omnibus.coverImageHC}
                  caseSrc={omnibus.coverImageCase}
                  sizes="(max-width: 768px) 70vw, 280px"
                  priority
                />
              </div>

              <div>
                <p className="label" style={{ marginBottom: "0.75rem" }}>
                  {omnibus.series} · Collected Edition
                </p>
                <h1 className="display-lg" style={{ marginBottom: "0.5rem" }}>
                  {omnibus.subtitle}
                </h1>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1rem" }}>
                  By Jason Carroll Holloway · Seventh City Press
                </p>
                <div className="ms-pull" style={{ margin: "1rem 0" }}>
                  <p>{omnibus.excerpt}</p>
                </div>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "2rem" }}>
                  {omnibus.shortDesc}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  {pbLink && omnibus.isbn_pb && (
                    <TrackedBuyLink
                      href={pbLink.url}
                      itemId={omnibus.isbn_pb}
                      itemName={`${omnibusDisplayName} (Paperback)`}
                      itemVariant="Paperback"
                      price={omnibus.price_pb_is}
                      className="btn btn-gold buy-direct-is"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <span style={{ fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.75 }}>
                        Buy Direct · Best Price
                      </span>
                      <span className="price-row">
                        {omnibus.price_pb_msrp && (
                          <span className="price-msrp">${omnibus.price_pb_msrp}</span>
                        )}
                        <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                          {omnibus.price_pb_is ? `$${omnibus.price_pb_is}` : "Best Price"}
                        </span>
                        {omnibus.price_pb_msrp && omnibus.price_pb_is && (
                          <span style={{ fontSize: "0.58rem", background: "rgba(255,255,255,0.18)", padding: "0.1em 0.4em", borderRadius: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            save ${(parseFloat(omnibus.price_pb_msrp) - parseFloat(omnibus.price_pb_is)).toFixed(2)}
                          </span>
                        )}
                      </span>
                    </TrackedBuyLink>
                  )}
                  {hcLink && omnibus.isbn_hc && (
                    <TrackedBuyLink
                      href={hcLink.url}
                      itemId={omnibus.isbn_hc}
                      itemName={`${omnibusDisplayName} (Hardcover)`}
                      itemVariant="Hardcover"
                      price={omnibus.price_hc_is}
                      className="btn btn-gold buy-direct-is"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <span style={{ fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.75 }}>
                        Buy Direct · Best Price
                      </span>
                      <span className="price-row">
                        {omnibus.price_hc_msrp && (
                          <span className="price-msrp">${omnibus.price_hc_msrp}</span>
                        )}
                        <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                          {omnibus.price_hc_is ? `$${omnibus.price_hc_is}` : "Best Price"}
                        </span>
                        {omnibus.price_hc_msrp && omnibus.price_hc_is && (
                          <span style={{ fontSize: "0.58rem", background: "rgba(255,255,255,0.18)", padding: "0.1em 0.4em", borderRadius: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            save ${(parseFloat(omnibus.price_hc_msrp) - parseFloat(omnibus.price_hc_is)).toFixed(2)}
                          </span>
                        )}
                      </span>
                    </TrackedBuyLink>
                  )}
                </div>
                {(bookshopPbLink || bookshopHcLink) && (
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                    Also on{" "}
                    <a href={BUY_LINKS.BOOKSHOP_LIST_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>
                      Bookshop.org
                    </a>{" "}
                    (independent bookstores).
                  </p>
                )}
                {omnibus.price_pb_msrp && omnibus.price_pb_is && (
                  <p className="omnibus-savings-note">
                    All three volumes direct: <strong>${omnibus.price_pb_is} PB</strong> /{" "}
                    <strong>${omnibus.price_hc_is} HC</strong> — save up to $17.98 vs.
                    buying volumes individually.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <WaveDivider />
      </div>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="resp-main-sidebar" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "4rem" }}>
            <div>
              <div className="section-label-row" style={{ marginBottom: "2rem" }}>
                <h2 className="label">About the Omnibus</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
                {paragraphs.map((p, i) => (
                  <p key={i} style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem" }}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="section-label-row" style={{ marginBottom: "2rem" }}>
                <h2 className="label">Print Editions, ISBNs &amp; Where to Buy</h2>
              </div>
              <div className="resp-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2.5rem" }}>
                <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold)", marginBottom: "0.5rem", fontWeight: 600 }}>Paperback Edition</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-faint)", marginBottom: "1rem" }}>
                      ISBN: <span style={{ fontFamily: "var(--font-mono)" }}>{omnibus.isbn_pb}</span><br />
                      {omnibus.pageCountPB ?? omnibus.pageCount} pages
                    </div>
                  </div>
                  {pbLink && omnibus.isbn_pb && (
                    <TrackedBuyLink
                      href={pbLink.url}
                      itemId={omnibus.isbn_pb}
                      itemName={`${omnibusDisplayName} (Paperback)`}
                      itemVariant="Paperback"
                      price={omnibus.price_pb_is}
                      className="btn btn-gold buy-direct-is"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <span style={{ fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.75 }}>
                        Buy Direct · Best Price
                      </span>
                      <span className="price-row">
                        {omnibus.price_pb_msrp && <span className="price-msrp">${omnibus.price_pb_msrp}</span>}
                        <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>${omnibus.price_pb_is}</span>
                      </span>
                    </TrackedBuyLink>
                  )}
                </div>
                <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold)", marginBottom: "0.5rem", fontWeight: 600 }}>Hardcover Edition</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-faint)", marginBottom: "1rem" }}>
                      ISBN: <span style={{ fontFamily: "var(--font-mono)" }}>{omnibus.isbn_hc}</span><br />
                      {omnibus.pageCountHC ?? omnibus.pageCount} pages
                    </div>
                  </div>
                  {hcLink && omnibus.isbn_hc && (
                    <TrackedBuyLink
                      href={hcLink.url}
                      itemId={omnibus.isbn_hc}
                      itemName={`${omnibusDisplayName} (Hardcover)`}
                      itemVariant="Hardcover"
                      price={omnibus.price_hc_is}
                      className="btn btn-gold buy-direct-is"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <span style={{ fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.75 }}>
                        Buy Direct · Best Price
                      </span>
                      <span className="price-row">
                        {omnibus.price_hc_msrp && <span className="price-msrp">${omnibus.price_hc_msrp}</span>}
                        <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>${omnibus.price_hc_is}</span>
                      </span>
                    </TrackedBuyLink>
                  )}
                </div>
              </div>

              <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
                <h2 className="label">From the Trilogy</h2>
              </div>
              {omnibusVolumePassages.map((beat) => (
                <div key={beat.context} style={{ marginBottom: "2rem" }}>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-faint)", marginBottom: "0.6rem" }}>
                    {beat.context}
                  </p>
                  <PassageExcerpt paragraphs={beat.paragraphs} attribution={beat.attribution} />
                </div>
              ))}

              <div className="section-label-row" style={{ marginBottom: "1.5rem", marginTop: "2.5rem" }}>
                <h2 className="label">Volumes Included</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {books
                  .filter((b) => b.series === "Masters X" && b.slug !== "omnibus")
                  .map((vol) => (
                    <Link
                      key={vol.slug}
                      href={`/books/masters-x/${vol.slug}`}
                      style={{
                        padding: "1rem 1.25rem",
                        background: "var(--bg-surface)",
                        borderRadius: "var(--r-md)",
                        border: "1px solid var(--border)",
                        color: "var(--text-muted)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <span style={{ color: "var(--gold)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        Volume {vol.volume}
                      </span>
                      <div style={{ fontFamily: "var(--font-display)", color: "var(--text)", marginTop: "0.25rem" }}>
                        {vol.subtitle}
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="card">
                <div className="label" style={{ marginBottom: "1rem" }}>
                  Publication Details
                </div>
                {[
                  { k: "Publisher", v: "Seventh City Press" },
                  { k: "Hardcover ISBN", v: omnibus.isbn_hc ?? "" },
                  { k: "Paperback ISBN", v: omnibus.isbn_pb ?? "" },
                  { k: "Page Count (HC)", v: `${omnibus.pageCountHC ?? omnibus.pageCount} pages` },
                  { k: "Page Count (PB)", v: `${omnibus.pageCountPB ?? omnibus.pageCount} pages` },
                  { k: "Amazon", v: "No Amazon edition" },
                ].map((row) => (
                  <div
                    key={row.k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.82rem",
                      padding: "0.6rem 0",
                      borderBottom: "1px solid var(--border-faint)",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ color: "var(--text-faint)" }}>{row.k}</span>
                    <span
                      style={{
                        color: "var(--text-muted)",
                        textAlign: "right",
                        fontFamily: row.k.includes("ISBN") ? "var(--font-mono)" : undefined,
                        fontSize: row.k.includes("ISBN") ? "0.75rem" : undefined,
                      }}
                    >
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/books/masters-x" className="btn btn-outline" style={{ justifyContent: "center" }}>
                ← Back to Trilogy Hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <WaveDivider />
      </div>

      <section className="section" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-faint)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="section-label-row">
            <h2 className="label">Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {omnibusFaqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--border-faint)", paddingBottom: "1.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 500, marginBottom: "0.5rem", color: "var(--text)" }}>
                  {faq.q}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

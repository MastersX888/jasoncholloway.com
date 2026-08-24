import Link from "next/link";
import { BUY_LINKS } from "@/lib/data/buyLinks";
import { getOmnibusBook, OMNIBUS_PATH, omnibusSavingsLine } from "@/lib/data/trilogyCheckout";
import BuyDirectButton from "@/components/ui/BuyDirectButton";
import CoverArtifact from "@/components/ui/CoverArtifact";

type OmnibusFlagshipHubProps = {
  primary?: boolean;
};

export default function OmnibusFlagshipHub({ primary = false }: OmnibusFlagshipHubProps) {
  const omnibus = getOmnibusBook();
  if (!omnibus) return null;

  const pbLink = omnibus.buyLinks.find(
    (l) => l.url.includes("shop.ingramspark.com") && l.format === "Paperback"
  );
  const hcLink = omnibus.buyLinks.find(
    (l) => l.url.includes("shop.ingramspark.com") && l.format === "Hardcover"
  );

  return (
    <section
      className={`section omnibus-flagship-hub${primary ? " omnibus-flagship-hub--primary" : ""}`}
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-faint)",
        borderBottom: "1px solid var(--border-faint)",
      }}
    >
      <div className="container">
        <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
          <span className="label">{primary ? "Best way to buy the trilogy" : "Collected Edition"}</span>
        </div>
        {primary && (
          <p
            style={{
              color: "var(--text-muted)",
              maxWidth: "52ch",
              lineHeight: 1.75,
              fontSize: "0.95rem",
              marginBottom: "1.25rem",
            }}
          >
            Ingram checkout is one title per order. The omnibus puts all three novels in a single cart — one
            shipping charge, lower price than three separate volumes.
          </p>
        )}
        <div className="omnibus-flagship-card">
          <Link href={OMNIBUS_PATH} className="omnibus-flagship-slipcase" style={{ textDecoration: "none", color: "inherit" }}>
            <CoverArtifact
              src={omnibus.coverImageHC}
              alt={`${omnibus.subtitle} — Complete Trilogy Hardcover`}
              format="omnibus"
              sizes="160px"
              priority={primary}
            />
          </Link>
          <div className="omnibus-flagship-body">
            <Link href={OMNIBUS_PATH} style={{ textDecoration: "none", color: "inherit" }}>
              <span className="label">Flagship Edition</span>
              <div className="omnibus-flagship-title">{omnibus.subtitle}</div>
            </Link>
            <p className="omnibus-flagship-desc">
              {omnibus.shortDesc ?? omnibus.description.split("\n\n")[0]}
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              {pbLink && (
                <BuyDirectButton
                  label="Complete Trilogy · Paperback"
                  url={pbLink.url}
                  ecommPrice={omnibus.price_pb_is ?? ""}
                  msrpPrice={omnibus.price_pb_msrp}
                  itemId={omnibus.isbn_pb}
                  itemName={`${omnibus.title}: ${omnibus.subtitle} (Paperback)`}
                  itemVariant="Paperback"
                />
              )}
              {hcLink && (
                <BuyDirectButton
                  label="Complete Trilogy · Hardcover"
                  url={hcLink.url}
                  ecommPrice={omnibus.price_hc_is ?? ""}
                  msrpPrice={omnibus.price_hc_msrp}
                  itemId={omnibus.isbn_hc}
                  itemName={`${omnibus.title}: ${omnibus.subtitle} (Hardcover)`}
                  itemVariant="Hardcover"
                />
              )}
            </div>
            <p className="omnibus-savings-note">{omnibusSavingsLine()}</p>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>
              <Link href={OMNIBUS_PATH} className="nota-link" style={{ color: "var(--gold)" }}>
                Omnibus details &amp; excerpts →
              </Link>
              {" · "}
              <a
                href={BUY_LINKS.BOOKSHOP_LIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nota-link"
                style={{ color: "var(--text-muted)" }}
              >
                Bookshop.org list
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

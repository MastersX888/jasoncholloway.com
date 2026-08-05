import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Returns & Refunds",
  description:
    "Print books from Seventh City Press are fulfilled by IngramSpark print-on-demand. Orders are non-refundable and non-returnable except for defective products, which IngramSpark may reprint or refund at its discretion.",
  path: "/returns/",
});

const returnPolicyJsonLd = {
  "@context": "https://schema.org",
  "@type": "MerchantReturnPolicy",
  name: "Seventh City Press print book returns (IngramSpark Share & Sell)",
  applicableCountry: "US",
  returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
  merchantReturnLink: "https://jasoncholloway.com/returns/",
  additionalProperty: {
    "@type": "PropertyValue",
    name: "Defective product handling",
    value:
      "Custom print-on-demand books containing defects may be reprinted or refunded at IngramSpark’s discretion under its Share & Sell Terms of Sale.",
  },
};

export default function ReturnsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(returnPolicyJsonLd) }}
      />

      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
              <span className="label">Seventh City Press</span>
            </div>
            <h1 className="display-xl" style={{ marginBottom: "1rem" }}>
              Returns &amp;<br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Refunds</span>
            </h1>
            <p style={{ color: "var(--text-muted)", maxWidth: "36rem", lineHeight: 1.7, fontSize: "1.05rem" }}>
              Print books listed on this site are published by Seventh City Press and fulfilled by IngramSpark
              print-on-demand (Share &amp; Sell). Checkout, manufacturing, shipping, and order remedies are governed by
              IngramSpark&apos;s{" "}
              <a
                href="https://www.ingramspark.com/ecommerce-terms-of-sale"
                style={{ color: "var(--gold)" }}
                rel="noopener noreferrer"
                target="_blank"
              >
                Share &amp; Sell Terms of Sale
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1rem" }}>
            <div>
              <h2 className="display-md" style={{ marginBottom: "0.75rem", fontSize: "1.35rem" }}>IngramSpark return policy</h2>
              <p>
                Because all print products are custom-made,{" "}
                <strong>all items are non-refundable and non-returnable</strong>. Products that contain defects may be
                reprinted or refunded at IngramSpark&apos;s discretion and in accordance with applicable law.
              </p>
              <p style={{ marginTop: "1rem" }}>
                IngramSpark does not support general refunds or buyer&apos;s-remorse returns. Orders cannot be edited or
                cancelled after they are submitted.
              </p>
            </div>

            <div>
              <h2 className="display-md" style={{ marginBottom: "0.75rem", fontSize: "1.35rem" }}>Damaged, defective, or wrong item</h2>
              <p>
                If your book arrives damaged, defective, or not as described, report the issue to IngramSpark. They
                typically print and ship a replacement within a few business days after resolving the request.
              </p>
              <ol style={{ paddingLeft: "1.25rem", marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <li>
                  Use IngramSpark&apos;s{" "}
                  <a
                    href="https://www.ingramspark.com/report-an-issue"
                    style={{ color: "var(--gold)" }}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Report an Issue
                  </a>{" "}
                  form (also linked from your order confirmation email).
                </li>
                <li>Have ready the email address used at checkout and your order number.</li>
                <li>Include a clear description of the problem and photos of damage or defects when applicable.</li>
              </ol>
              <p style={{ marginTop: "1rem" }}>
                For lost, undelivered, or damaged shipments, use the same report process referenced in your shipping
                confirmation.
              </p>
            </div>

            <div>
              <h2 className="display-md" style={{ marginBottom: "0.75rem", fontSize: "1.35rem" }}>How we can help</h2>
              <p>
                Seventh City Press does not process IngramSpark checkout refunds or returns. If you need help locating
                your order details or phrasing a defect claim, email{" "}
                <a href="mailto:info@seventhcitypress.com" style={{ color: "var(--gold)" }}>
                  info@seventhcitypress.com
                </a>{" "}
                with your name, order date, title, and a brief description of the issue. We will point you to the correct
                IngramSpark channel.
              </p>
            </div>

            <div>
              <h2 className="display-md" style={{ marginBottom: "0.75rem", fontSize: "1.35rem" }}>UK and EU consumers</h2>
              <p>
                Where Ingram Content Group UK Ltd. fulfills your order, additional consumer rights may apply for faulty
                or not-as-described goods (including a full refund if the item is faulty within 30 days of delivery).
                Those rights are stated in IngramSpark&apos;s Terms of Sale and are handled through IngramSpark&apos;s
                report process.
              </p>
            </div>

            <div>
              <h2 className="display-md" style={{ marginBottom: "0.75rem", fontSize: "1.35rem" }}>Other retailers</h2>
              <p>
                Books or digital editions purchased through third-party retailers (Amazon Kindle, Bookshop.org, Apple
                Books, Google Play, Kobo, libraries, and similar) follow that retailer&apos;s own return or refund
                policy. Contact the seller you paid directly.
              </p>
            </div>

            <div className="card" style={{ background: "var(--bg-surface)", borderColor: "var(--border)", padding: "1.25rem 1.5rem" }}>
              <div className="label" style={{ marginBottom: "0.5rem" }}>Publisher</div>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>
                Seventh City Press LLC<br />
                9169 W State St #4418<br />
                Garden City, ID 83714<br />
                <a href="mailto:info@seventhcitypress.com" style={{ color: "var(--gold)" }}>info@seventhcitypress.com</a>
              </p>
              <p style={{ margin: "1rem 0 0", fontSize: "0.85rem" }}>
                Official policy source:{" "}
                <a
                  href="https://www.ingramspark.com/ecommerce-terms-of-sale"
                  style={{ color: "var(--cyan)" }}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  IngramSpark Share &amp; Sell Terms of Sale
                </a>
                . Questions about rights or review copies? See{" "}
                <Link href="/contact/" style={{ color: "var(--cyan)" }}>Contact &amp; Press</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

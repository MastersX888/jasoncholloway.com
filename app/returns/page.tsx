import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Returns & Refunds",
  description:
    "Return and refund policy for print books sold by Seventh City Press through jasoncholloway.com — 30-day returns for damaged, defective, or incorrect orders.",
  path: "/returns/",
});

const returnPolicyJsonLd = {
  "@context": "https://schema.org",
  "@type": "MerchantReturnPolicy",
  name: "Seventh City Press print book returns",
  applicableCountry: "US",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 30,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/ReturnShippingFees",
  refundType: "https://schema.org/FullRefund",
  merchantReturnLink: "https://jasoncholloway.com/returns/",
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
              Print books listed on this site are published by Seventh City Press and fulfilled via print-on-demand
              (IngramSpark). This policy applies to physical book orders placed through retailer links or direct
              purchase paths associated with jasoncholloway.com.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1rem" }}>
            <div>
              <h2 className="display-md" style={{ marginBottom: "0.75rem", fontSize: "1.35rem" }}>Return window</h2>
              <p>
                You may request a return within <strong>30 days of delivery</strong> if your book arrives{" "}
                <strong>damaged</strong>, <strong>defective</strong>, or if we shipped the <strong>wrong title or format</strong>.
              </p>
            </div>

            <div>
              <h2 className="display-md" style={{ marginBottom: "0.75rem", fontSize: "1.35rem" }}>Condition</h2>
              <p>
                Books must be returned in <strong>resalable condition</strong> (no writing, highlighting, or water damage
                unless the item was defective when received). We cannot accept returns for buyer&apos;s remorse on opened
                copies that are no longer resalable.
              </p>
            </div>

            <div>
              <h2 className="display-md" style={{ marginBottom: "0.75rem", fontSize: "1.35rem" }}>How to start a return</h2>
              <ol style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <li>
                  Email{" "}
                  <a href="mailto:info@seventhcitypress.com" style={{ color: "var(--gold)" }}>
                    info@seventhcitypress.com
                  </a>{" "}
                  with your name, order date, title purchased, and a brief description of the issue.
                </li>
                <li>Include photos of damage or packing errors if applicable.</li>
                <li>We will reply with return authorization and mailing instructions within 2 business days.</li>
              </ol>
            </div>

            <div>
              <h2 className="display-md" style={{ marginBottom: "0.75rem", fontSize: "1.35rem" }}>Return shipping</h2>
              <p>
                <strong>Customer pays return shipping</strong> for returns that are not our error. If we sent the wrong
                item or a clearly defective copy, we will provide a prepaid return label or reimburse reasonable return
                postage.
              </p>
            </div>

            <div>
              <h2 className="display-md" style={{ marginBottom: "0.75rem", fontSize: "1.35rem" }}>Refunds</h2>
              <p>
                Approved refunds are processed to your original payment method within <strong>5–10 business days</strong>{" "}
                after we receive and inspect the returned book. Shipping charges on the original order are non-refundable
                unless the return is due to our error.
              </p>
            </div>

            <div>
              <h2 className="display-md" style={{ marginBottom: "0.75rem", fontSize: "1.35rem" }}>Digital products</h2>
              <p>
                eBooks and audiobooks sold through third-party retailers (Amazon, Apple Books, Google Play, Kobo, etc.)
                follow each store&apos;s own return policy. Contact that retailer directly for digital order issues.
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
                Questions about rights or review copies? See{" "}
                <Link href="/contact/" style={{ color: "var(--cyan)" }}>Contact &amp; Press</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

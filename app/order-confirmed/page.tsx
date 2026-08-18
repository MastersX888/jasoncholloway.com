import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Thank you for ordering from Seventh City Press.",
  robots: { index: false, follow: false },
};

export default function OrderConfirmedPage() {
  return (
    <section className="container" style={{ padding: "6rem 0 4rem", maxWidth: "42rem" }}>
      <span className="label">Seventh City Press</span>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
          fontWeight: 400,
          margin: "0.75rem 0 1rem",
        }}
      >
        Thank you — your order is in
      </h1>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
        Payment was processed securely through Stripe. You will receive a receipt by email.
        Print editions are produced to order and typically ship within a few business days.
      </p>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "2rem" }}>
        Questions about your order?{" "}
        <a href="mailto:info@seventhcitypress.com" style={{ color: "var(--gold)" }}>
          info@seventhcitypress.com
        </a>
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link href="/" className="btn btn-gold">
          Back to the homepage
        </Link>
        <Link href="/books" className="btn btn-ghost">
          Browse the catalog
        </Link>
      </div>
    </section>
  );
}

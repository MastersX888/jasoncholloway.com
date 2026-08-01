import type { Metadata } from "next";
import ContactForm from "@/components/layout/ContactForm";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Press Inquiries",
  description:
    "Contact Seventh City Press for media inquiries, interview requests, and review copy requests for the Masters X Trilogy by Jason Carroll Holloway.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
              <span className="label">Press Inquiries</span>
            </div>
            <h1 className="display-xl" style={{ marginBottom: "1rem" }}>
              Reach the<br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Communications Desk</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container">
          <div className="resp-main-sidebar">
            <div>
              <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
                <h2 className="label">Media &amp; Press Inquiries</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1rem", marginBottom: "2rem" }}>
                <p>
                  For interview requests, podcast appearances, and media commentary regarding the{" "}
                  <strong>Masters X Trilogy</strong> and{" "}
                  <em>Innocence, Desire, and the Architecture of the Fall</em>, please contact
                  the Seventh City Press communications desk.
                </p>
                <p>
                  Jason Carroll Holloway is available for selective interviews, literary panels,
                  and discussions exploring his approach to fiction, structuralist criticism,
                  and the integration of esoteric histories into the modern novel.
                </p>
                <p>
                  You may also reach us directly at{" "}
                  <a href="mailto:press@seventhcitypress.com" style={{ color: "var(--gold)" }}>
                    press@seventhcitypress.com
                  </a>.
                </p>
              </div>

              <div style={{ marginBottom: "3rem" }}>
                <ContactForm />
              </div>

              <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
                <h2 className="label">Review Copies &amp; Academic Requests</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1rem" }}>
                <p>
                  Print and digital galley proofs of the <strong>Masters X Trilogy</strong> (Vols I–III)
                  and the <strong>Hawkes Monograph</strong> are available to accredited reviewers, literary
                  journalists, and academic instructors. Please submit your request with your credentials,
                  publication name, and shipping details.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="card" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                <div className="label" style={{ marginBottom: "0.75rem" }}>Press Kit</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  Download the official press package. Contains high-resolution book covers,
                  author bios, and press release sheets.
                </p>
                <a
                  href="/press-kit/Masters_X_Press_Kit.pdf"
                  download
                  className="btn btn-gold btn-sm"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  Download Press Kit
                </a>
              </div>

              <div className="card" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                <div className="label" style={{ marginBottom: "0.75rem" }}>Press Contact</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                  Direct press inquiries:
                </p>
                <a
                  href="mailto:press@seventhcitypress.com"
                  className="card-link"
                  style={{ fontSize: "0.85rem", color: "var(--gold)", fontFamily: "var(--font-mono)" }}
                >
                  press@seventhcitypress.com
                </a>
              </div>

              <div className="card" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                <div className="label" style={{ marginBottom: "0.75rem" }}>Author Site</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                  Full catalog, field notes, and the Analysis Chamber:
                </p>
                <a
                  href="https://jasoncholloway.com/"
                  style={{ fontSize: "0.85rem", color: "var(--gold)" }}
                >
                  jasoncholloway.com →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

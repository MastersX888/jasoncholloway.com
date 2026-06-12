import type { Metadata } from "next";
import ContactForm from "@/components/layout/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Press — Jason Carroll Holloway",
  description:
    "Get in touch with Jason C. Holloway or Seventh City Press for rights, media inquiries, review copies, and press kit downloads.",
  alternates: {
    canonical: "https://jasoncholloway.com/contact/",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
              <span className="label">Contact & Inquiries</span>
            </div>
            <h1 className="display-xl" style={{ marginBottom: "1rem" }}>
              Reach the<br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Publisher</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "4rem", alignItems: "start" }}>
            <div>
              <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
                <span className="label">Media & Press Inquiries</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1rem", marginBottom: "2rem" }}>
                <p>
                  For interview requests, podcast appearances, and media commentary regarding the 
                  <strong> Masters X Trilogy</strong> and 
                  <em> Innocence, Desire, and the Architecture of the Fall</em>, please contact 
                  the Seventh City Press media team.
                </p>
                <p>
                  Jason C. Holloway is available for selective interviews, literary panels, 
                  and discussions exploring his approach to fiction, structuralist criticism, 
                  and the integration of esoteric histories into the modern novel.
                </p>
              </div>

              <div style={{ marginBottom: "3rem" }}>
                <ContactForm />
              </div>

              <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
                <span className="label">Review Copies & Academic Requests</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1rem" }}>
                <p>
                  Print and digital galley proofs of the <strong>Masters X Trilogy</strong> (Vols I-III) and 
                  the <strong>Hawkes Monograph</strong> are available to accredited reviewers, literary journalists, 
                  and academic instructors. Please submit your request via email with your credentials, publication 
                  name, and shipping details.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="card" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                <div className="label" style={{ marginBottom: "0.75rem" }}>Press Kit</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  Download the official press package for the June 2026 launch. Contains high-resolution book covers, 
                  author headshots, canonical bios, and press release sheets.
                </p>
                <div 
                  className="btn btn-gold" 
                  style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem", opacity: 0.6, cursor: "not-allowed" }}
                >
                  Download Press Kit (Coming Soon)
                </div>
              </div>

              <div className="card" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                <div className="label-cyan" style={{ marginBottom: "0.75rem" }}>Mailing Address</div>
                <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
                  Seventh City Press<br />
                  Attn: Communications Desk<br />
                  Kansas City, Missouri
                </p>
                <div style={{ borderTop: "1px solid var(--border-faint)", marginTop: "1rem", paddingTop: "0.75rem", fontSize: "0.72rem", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
                  LAT: 39.0997° N<br />
                  LNG: 94.5786° W
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


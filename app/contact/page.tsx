import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Press — Jason Carroll Holloway",
  description:
    "Get in touch with Jason Carroll Holloway or Seventh City Press LLC for rights, media inquiries, review copies, and press kit downloads.",
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
                  acoustic research behind the <strong>Masters X Trilogy</strong> or 
                  <em>Innocence, Desire, and the Architecture of the Fall</em>, please contact 
                  the Seventh City Press media team.
                </p>
                <p>
                  Jason Carroll Holloway is available for selective interviews, literary panels, 
                  and discussions focused on structuralist criticism, medieval grimoire technology, 
                  and acoustic physics.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }}>
                <div className="card" style={{ padding: "1.5rem" }}>
                  <div className="label-cyan" style={{ marginBottom: "0.5rem" }}>Press Contact</div>
                  <div style={{ fontSize: "1.1rem", fontFamily: "var(--font-display)", color: "var(--text)", marginBottom: "0.25rem" }}>
                    Media Relations
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-faint)", marginBottom: "0.75rem" }}>
                    Seventh City Press LLC
                  </div>
                  <a href="mailto:press@jasoncholloway.com" style={{ fontSize: "0.9rem", color: "var(--cyan)", textDecoration: "underline" }}>
                    press@jasoncholloway.com
                  </a>
                </div>

                <div className="card" style={{ padding: "1.5rem" }}>
                  <div className="label" style={{ marginBottom: "0.5rem" }}>Rights & Licensing</div>
                  <div style={{ fontSize: "1.1rem", fontFamily: "var(--font-display)", color: "var(--text)", marginBottom: "0.25rem" }}>
                    Rights Department
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-faint)", marginBottom: "0.75rem" }}>
                    Translation, Film & Audio
                  </div>
                  <a href="mailto:rights@jasoncholloway.com" style={{ fontSize: "0.9rem", color: "var(--gold)", textDecoration: "underline" }}>
                    rights@jasoncholloway.com
                  </a>
                </div>
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
                <a 
                  href="/press-kit.zip" 
                  download 
                  className="btn btn-gold" 
                  style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem" }}
                >
                  Download Press Kit (.zip)
                </a>
              </div>

              <div className="card" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                <div className="label-cyan" style={{ marginBottom: "0.75rem" }}>Mailing Address</div>
                <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
                  Seventh City Press LLC<br />
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

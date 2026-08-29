import type { Metadata } from "next";
import ContactForm from "@/components/layout/ContactForm";
import SocialLinks from "@/components/layout/SocialLinks";

export const metadata: Metadata = {
  title: "Contact & Press",
  description:
    "Get in touch with Jason Carroll Holloway or Seventh City Press for order support, damaged or defective books, rights, media inquiries, review copies, and press kit downloads.",
  alternates: {
    canonical: "https://jasoncholloway.com/contact/",
  },
  openGraph: {
    url: "https://jasoncholloway.com/contact/",
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
          <div className="resp-main-sidebar" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "4rem", alignItems: "start" }}>
            <div>
              <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
                <span className="label">Order Support</span>
              </div>
              <div className="card" style={{ background: "var(--bg-surface)", borderColor: "var(--border)", marginBottom: "3rem" }}>
                <h2 className="display-md" style={{ marginBottom: "0.75rem", fontSize: "1.35rem" }}>
                  Did you receive a damaged book?
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1rem" }}>
                  <p>
                    If your copy arrived with a printing or binding defect — uncut or stuck pages, misprinted
                    text, a damaged cover — that is a manufacturing defect, and the printer,{" "}
                    <strong>IngramSpark, will replace it</strong>. There is no need to return the defective copy
                    first.
                  </p>
                  <p>
                    If you bought the book through the direct checkout on this site (an IngramSpark Share Link /
                    e-commerce order), you file the claim yourself as the buyer. It is the faster path — these
                    claims are not routed through the publisher queue. Here is exactly what to do:
                  </p>
                  <ol style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    <li>
                      Find your original <strong>order-confirmation email</strong>. It contains your{" "}
                      <strong>Order Number</strong>.
                    </li>
                    <li>
                      Open IngramSpark&apos;s consumer claim form:{" "}
                      <a
                        href="https://www.ingramspark.com/report-an-issue"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--gold)" }}
                      >
                        ingramspark.com/report-an-issue
                      </a>
                    </li>
                    <li>
                      Use the <strong>same email address you used at checkout</strong>. IngramSpark matches your
                      claim to that address and the order number.
                    </li>
                    <li>
                      Describe the defect (for example, &ldquo;the book arrived with uncut top pages&rdquo;) and
                      request a replacement.
                    </li>
                  </ol>
                  <p>
                    Direct Share Link purchases are not refunded, but defective copies <strong>are</strong>{" "}
                    replaced. Once IngramSpark accepts the request, their usual practice is to print and ship the
                    replacement within <strong>two to three business days</strong>.
                  </p>
                  <p style={{ margin: 0 }}>
                    If anything in the form is unclear, or if they ask for something you don&apos;t have, email{" "}
                    <a href="mailto:jason@seventhcitypress.com" style={{ color: "var(--gold)", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
                      jason@seventhcitypress.com
                    </a>{" "}
                    and I will help. And thank you for reading — I&apos;m sorry the first copy wasn&apos;t right.
                  </p>
                </div>
              </div>

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
                  Jason Carroll Holloway is available for selective interviews, literary panels,
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
                <SocialLinks title="Follow" />
              </div>

              <div className="card" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                <div className="label" style={{ marginBottom: "0.75rem" }}>Press Kit</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  Download the official press package for the Masters X Trilogy. Contains high-resolution book covers,
                  author headshots, canonical bios, and press release sheets.
                </p>
                <a
                  href="/press-kit/Masters_X_Press_Kit.pdf"
                  download
                  className="btn btn-gold"
                  style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem" }}
                  aria-label="Download complete Masters X Trilogy press kit PDF"
                >
                  Download Press Kit (PDF)
                </a>
                <a href="https://seventhcitypress.com/" style={{ display: "block", marginTop: "0.75rem", fontSize: "0.78rem", color: "var(--text-faint)", textAlign: "center" }}>
                  Press &amp; media kit at Seventh City Press →
                </a>
              </div>

              {/* Contact emails — role-based */}
              <div className="card" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                <div className="label" style={{ marginBottom: "0.75rem" }}>Email</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.83rem", lineHeight: 1.5 }}>
                  <div>
                    <div style={{ color: "var(--text-faint)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.15rem" }}>General inquiries</div>
                    <a href="mailto:info@seventhcitypress.com" style={{ color: "var(--gold)", fontFamily: "var(--font-mono)" }}>info@seventhcitypress.com</a>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-faint)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.15rem" }}>Jason directly</div>
                    <a href="mailto:jason@seventhcitypress.com" style={{ color: "var(--gold)", fontFamily: "var(--font-mono)" }}>jason@seventhcitypress.com</a>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-faint)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.15rem" }}>Media &amp; review copies</div>
                    <a href="https://seventhcitypress.com/" style={{ color: "var(--cyan)" }}>seventhcitypress.com →</a>
                  </div>
                </div>
              </div>

              <div className="card" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                <div className="label-cyan" style={{ marginBottom: "0.75rem" }}>Mailing Address</div>
                <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
                  Seventh City Press<br />
                  9169 W State St #4418<br />
                  Garden City, ID 83714
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Seventh City Press, jasoncholloway.com, and publisher marketing tools including Pinterest integration.",
  alternates: {
    canonical: "https://seventhcitypress.com/privacy/",
  },
  openGraph: {
    url: "https://seventhcitypress.com/privacy/",
    title: "Privacy Policy | Seventh City Press",
  },
  robots: { index: true, follow: true },
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "Who we are",
    body: [
      "Seventh City Press LLC (“Seventh City Press,” “we,” “us”) is an independent literary imprint based in Kansas City, Missouri. We publish the Masters X Trilogy and related works by Jason Carroll Holloway.",
      "This policy applies to seventhcitypress.com, jasoncholloway.com, and publisher-operated tools that connect to third-party services (including Pinterest) on our behalf.",
    ],
  },
  {
    title: "Information we collect",
    body: [
      "Contact forms: name, email address, and message content when you submit a press inquiry or contact request.",
      "Newsletter sign-ups: email address when you opt in to author or imprint dispatches.",
      "Analytics: aggregated, non-identifying usage data (page views, referral sources) via standard web analytics.",
      "Pinterest integration: when you authorize our publisher Pinterest tools via OAuth, we receive an access token and basic account metadata required to create and manage pins on our business account. We never ask for or store your Pinterest password.",
    ],
  },
  {
    title: "How we use information",
    body: [
      "Respond to press, media, and reader inquiries.",
      "Send newsletters you have requested (you may unsubscribe at any time).",
      "Improve site content and measure reach of our books and Field Notes.",
      "Create and schedule marketing pins linking to jasoncholloway.com book pages, Field Notes, and Analysis Chamber tools — only on Seventh City Press–owned Pinterest accounts.",
    ],
  },
  {
    title: "What we do not do",
    body: [
      "We do not sell personal information.",
      "We do not collect Pinterest login credentials — authentication uses Pinterest’s official OAuth flow only.",
      "We do not share contact details with third parties except service providers that help us operate the site (e.g., form delivery, email dispatch) under confidentiality obligations.",
    ],
  },
  {
    title: "Cookies and third parties",
    body: [
      "Our sites may use cookies or similar technologies for basic functionality and analytics. Third-party platforms (Pinterest, Google, Cloudflare) may set their own cookies when you visit linked content or embedded widgets.",
      "Pinterest’s use of data is governed by Pinterest’s Privacy Policy when you interact with Pinterest or authorize our app.",
    ],
  },
  {
    title: "Data retention and security",
    body: [
      "Contact and newsletter data are retained only as long as needed to fulfill the request or maintain your subscription.",
      "OAuth tokens for Pinterest are stored securely and revoked when no longer required.",
      "We use industry-standard hosting (Cloudflare Pages) and HTTPS for all public pages.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You may request access, correction, or deletion of personal data we hold about you by emailing press@seventhcitypress.com.",
      "You may revoke Pinterest authorization at any time in your Pinterest account settings under Connected apps.",
    ],
  },
  {
    title: "Children",
    body: [
      "Our sites and books are intended for general audiences. We do not knowingly collect personal information from children under 13.",
    ],
  },
  {
    title: "Changes",
    body: [
      "We may update this policy from time to time. The “Last updated” date below reflects the most recent revision. Continued use of our sites after changes constitutes acceptance of the updated policy.",
    ],
  },
  {
    title: "Contact",
    body: [
      "Seventh City Press LLC · Kansas City, Missouri",
      "Email: press@seventhcitypress.com",
      "Author site: jasoncholloway.com · Imprint site: seventhcitypress.com",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
              <span className="label">Legal</span>
            </div>
            <h1 className="display-xl" style={{ marginBottom: "1rem" }}>
              Privacy<br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Policy</span>
            </h1>
            <p style={{ color: "var(--text-muted)", maxWidth: "36rem", lineHeight: 1.7 }}>
              Last updated: July 22, 2026
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ maxWidth: "720px" }}>
            {sections.map((section) => (
              <div key={section.title} style={{ marginBottom: "2.5rem" }}>
                <h2
                  className="display-md"
                  style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "var(--text)" }}
                >
                  {section.title}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1rem" }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <p style={{ fontSize: "0.9rem", color: "var(--text-faint)", marginTop: "2rem" }}>
              <Link href="/contact/" style={{ color: "var(--gold)" }}>
                Contact the communications desk
              </Link>
              {" · "}
              <a href="https://jasoncholloway.com/contact/" style={{ color: "var(--gold)" }}>
                Author site contact
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

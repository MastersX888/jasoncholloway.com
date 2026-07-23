import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">Jason Carroll Holloway</div>
            <div className="footer-brand-press">Seventh City Press</div>
            <p className="footer-brand-desc" style={{ marginBottom: "1.5rem" }}>
              Kansas City conspiracy fiction where the Voynich Manuscript, the Ars Notoria, SubTropolis, and a 111 Hz frequency converge. Three novels by Jason Carroll Holloway.
            </p>
            <div style={{ maxWidth: "380px" }}>
              <div className="footer-col-title" style={{ marginBottom: "0.5rem", color: "var(--text-muted)" }}>Newsletter Dispatch</div>
              <NewsletterForm compact={true} />
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <SocialLinks />
            </div>
          </div>

          <div>
            <div className="footer-col-title">Books</div>
            <nav className="footer-links">
              <Link href="/books">Full Catalog</Link>
              <Link href="/books/masters-x">Masters X Trilogy</Link>
              <Link href="/books/masters-x/the-inheritance-of-frequency">The Inheritance of Frequency</Link>
              <Link href="/books/masters-x/the-grimoire">The Grimoire</Link>
              <Link href="/books/masters-x/the-kingdom">The Kingdom</Link>
              <Link href="/books/masters-x/omnibus">Omnibus Edition</Link>
              <Link href="/books/hawkes-monograph">Hawkes Monograph</Link>
            </nav>
          </div>

          <div>
            <div className="footer-col-title">Research & Field Notes</div>
            <nav className="footer-links">
              <Link href="/field-notes">Field Notes Hub</Link>
              <Link href="/field-notes/subtropolis">SubTropolis</Link>
              <Link href="/field-notes/111-hz">111 Hz</Link>
              <Link href="/field-notes/voynich-manuscript">Voynich Manuscript</Link>
              <Link href="/chamber">Analysis Chamber</Link>
              <Link href="/chamber/harmonic-stack">Harmonic Stack</Link>
              <Link href="/chamber/research-archive">Research Archive</Link>
            </nav>
          </div>

          <div>
            <div className="footer-col-title">Publisher</div>
            <nav className="footer-links">
              <a href="https://seventhcitypress.com/">Seventh City Press</a>
              <Link href="/about">About the Author</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/returns">Returns &amp; Refunds</Link>
              <a href="https://seventhcitypress.com/privacy/">Privacy Policy</a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} Jason Carroll Holloway · Seventh City Press LLC · All rights reserved</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-faint)" }}>
            f = 111.2 Hz
          </span>
        </div>
      </div>
    </footer>
  );
}

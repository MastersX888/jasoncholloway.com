import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">Jason Carroll Holloway</div>
            <div className="footer-brand-press">Seventh City Press LLC</div>
            <p className="footer-brand-desc" style={{ marginBottom: "1.5rem" }}>
              Literary fiction at the intersection of acoustic physics, medieval scholarship, and
              the architecture of human perception.
            </p>
            <div style={{ maxWidth: "380px" }}>
              <div className="footer-col-title" style={{ marginBottom: "0.5rem", color: "var(--text-muted)" }}>Newsletter Dispatch</div>
              <NewsletterForm compact={true} />
            </div>
          </div>

          <div>
            <div className="footer-col-title">Books</div>
            <nav className="footer-links">
              <Link href="/books/masters-x">Masters X Trilogy</Link>
              <Link href="/books/masters-x/the-inheritance-of-frequency">The Inheritance of Frequency</Link>
              <Link href="/books/masters-x/the-grimoire">The Grimoire</Link>
              <Link href="/books/masters-x/the-kingdom">The Kingdom</Link>
              <Link href="/books/hawkes-monograph">Hawkes Monograph</Link>
            </nav>
          </div>

          <div>
            <div className="footer-col-title">Research</div>
            <nav className="footer-links">
              <Link href="/chamber">Analysis Chamber</Link>
              <Link href="/chamber/harmonic-stack">Harmonic Stack</Link>
              <Link href="/chamber/global-map">Global Site Map</Link>
              <Link href="/chamber/schumann-baseline">Schumann Baseline</Link>
              <Link href="/chamber/research-archive">Research Archive</Link>
            </nav>
          </div>

          <div>
            <div className="footer-col-title">Publisher</div>
            <nav className="footer-links">
              <Link href="/press">Seventh City Press</Link>
              <Link href="/about">About the Author</Link>
              <Link href="/contact">Contact</Link>
              <a href="https://www.ingramspark.com" target="_blank" rel="noopener noreferrer">
                IngramSpark
              </a>
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

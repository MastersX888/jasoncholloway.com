export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">Seventh City Press</div>
            <div className="footer-brand-sub">Independent Literary Imprint</div>
            <p className="footer-brand-desc" style={{ marginBottom: "1.5rem" }}>
              Publishing work that refuses the division between imaginative and
              intellectual work — novels that think, and criticism that speaks.
              Kansas City, Missouri.
            </p>
            <p style={{ fontSize: "0.82rem", color: "var(--text-faint)" }}>
              press@seventhcitypress.com
            </p>
          </div>

          <div>
            <div className="footer-col-title">Catalog</div>
            <nav className="footer-links">
              <a href="https://jasoncholloway.com/books/">Full Catalog</a>
              <a href="https://jasoncholloway.com/books/masters-x/">Masters X Trilogy</a>
              <a href="https://jasoncholloway.com/books/masters-x/the-inheritance-of-frequency/">The Inheritance of Frequency</a>
              <a href="https://jasoncholloway.com/books/masters-x/the-grimoire/">The Grimoire</a>
              <a href="https://jasoncholloway.com/books/masters-x/the-kingdom/">The Kingdom</a>
              <a href="https://jasoncholloway.com/books/masters-x/omnibus/">Omnibus Edition</a>
              <a href="https://jasoncholloway.com/books/hawkes-monograph/">Hawkes Monograph</a>
            </nav>
          </div>

          <div>
            <div className="footer-col-title">Press</div>
            <nav className="footer-links">
              <a href="/">Press Home</a>
              <a href="/contact/">Contact</a>
              <a href="/press-kit/Masters_X_Press_Kit.pdf" download>Download Press Kit</a>
              <a href="https://jasoncholloway.com/about/">About the Author</a>
              <a href="https://jasoncholloway.com/chamber/research-archive/">Research Archive</a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} Seventh City Press LLC · Jason Carroll Holloway · All rights reserved</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-faint)" }}>
            f = 111.2 Hz
          </span>
        </div>
      </div>
    </footer>
  );
}

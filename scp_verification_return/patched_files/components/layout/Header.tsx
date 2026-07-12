"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/books/masters-x", label: "Masters X" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/books/hawkes-monograph", label: "Monograph" },
  { href: "https://seventhcitypress.com/", label: "Press", external: true },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="header-logo">
            <span className="header-logo-name">Jason Carroll Holloway</span>
            <span className="header-logo-press">Seventh City Press</span>
          </Link>

          <nav className="header-nav">
            {navItems.map((item) =>
              item.external ? (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${pathname.startsWith(item.href) ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link href="/chamber" className="nav-chamber" style={{ marginLeft: "0.5rem" }}>
              <span className="nav-chamber-dot" />
              Analysis Chamber
            </Link>
          </nav>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`mmt-bar ${menuOpen ? "open" : ""}`} />
            <span className={`mmt-bar ${menuOpen ? "open" : ""}`} />
            <span className={`mmt-bar ${menuOpen ? "open" : ""}`} />
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`mobile-nav ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {navItems.map((item) =>
          item.external ? (
            <a
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              tabIndex={menuOpen ? 0 : -1}
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-nav-link ${pathname.startsWith(item.href) ? "active" : ""}`}
              tabIndex={menuOpen ? 0 : -1}
            >
              {item.label}
            </Link>
          )
        )}
        <Link
          href="/chamber"
          className="mobile-nav-link mobile-nav-chamber"
          tabIndex={menuOpen ? 0 : -1}
        >
          <span className="nav-chamber-dot" />
          Analysis Chamber
        </Link>
      </nav>
    </header>
  );
}

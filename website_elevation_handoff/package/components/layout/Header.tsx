"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/books/masters-x", label: "Masters X" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/books/hawkes-monograph", label: "Monograph" },
  { href: "/press", label: "Press" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${pathname.startsWith(item.href) ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/chamber" className="nav-chamber" style={{ marginLeft: "0.5rem" }}>
              <span className="nav-chamber-dot" />
              Analysis Chamber
            </Link>
          </nav>

          {/* Mobile menu toggle — hidden on desktop via responsive.css */}
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

      {/* Mobile navigation drawer */}
      <nav
        id="mobile-nav"
        className={`mobile-nav ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-nav-link ${pathname.startsWith(item.href) ? "active" : ""}`}
            tabIndex={menuOpen ? 0 : -1}
          >
            {item.label}
          </Link>
        ))}
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

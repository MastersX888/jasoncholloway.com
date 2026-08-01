"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Press" },
  { href: "https://jasoncholloway.com/books/", label: "Catalog", external: true },
  { href: "https://jasoncholloway.com/about/", label: "Author", external: true },
  { href: "/contact/", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="header-logo">
            <span className="header-logo-name">Seventh City Press</span>
            <span className="header-logo-sub">Literary Imprint · Kansas City</span>
          </Link>

          <nav className="header-nav">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              )
            )}
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
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          )
        )}
      </nav>
    </header>
  );
}

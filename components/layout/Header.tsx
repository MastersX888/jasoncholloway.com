"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        </div>
      </div>
    </header>
  );
}

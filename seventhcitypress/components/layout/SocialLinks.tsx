import {
  AUTHOR_SITE_URL,
  IMPRINT_SITE_URL,
  WEB_PRESENCE_LINKS,
  getActiveSocialLinks,
} from "@/lib/data/social";

type SocialLinksProps = {
  title?: string;
  className?: string;
  /** full = social + both websites; footer = social + sibling site only */
  variant?: "full" | "footer";
};

export default function SocialLinks({
  title = "Follow",
  className,
  variant = "footer",
}: SocialLinksProps) {
  const links = getActiveSocialLinks();
  if (links.length === 0) return null;

  const webLinks =
    variant === "full"
      ? WEB_PRESENCE_LINKS
      : WEB_PRESENCE_LINKS.filter((link) => link.href !== IMPRINT_SITE_URL);

  return (
    <div className={className}>
      <div className="footer-col-title">{title}</div>
      <nav className="footer-links social-links" aria-label={title}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="me noopener noreferrer"
            className="social-link-row"
          >
            <span>{link.label}</span>
            <span className="social-link-handle">{link.handle}</span>
          </a>
        ))}
      </nav>

      {webLinks.length > 0 && (
        <>
          <div className="footer-col-title" style={{ marginTop: "1rem" }}>
            Websites
          </div>
          <nav className="footer-links" aria-label="Websites">
            {webLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </>
      )}
    </div>
  );
}

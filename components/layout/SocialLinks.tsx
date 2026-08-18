import { getActiveSocialLinks } from "@/lib/data/socialProfiles";

type SocialLinksProps = {
  title?: string;
  className?: string;
};

export default function SocialLinks({ title = "Follow", className }: SocialLinksProps) {
  const links = getActiveSocialLinks();
  if (links.length === 0) return null;

  return (
    <div className={className}>
      <div className="footer-col-title">{title}</div>
      <nav className="footer-links social-links" aria-label={title}>
        {links.map((link) => (
          <a
            key={link.href}
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
    </div>
  );
}

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
      <nav className="footer-links" aria-label={title}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="me noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

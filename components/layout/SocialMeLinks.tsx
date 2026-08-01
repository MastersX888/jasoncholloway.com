import { socialMeUrls } from "@/lib/data/socialProfiles";

/** rel=me link tags for social profile verification */
export default function SocialMeLinks() {
  return (
    <>
      {socialMeUrls().map((href) => (
        <link key={href} rel="me" href={href} />
      ))}
    </>
  );
}

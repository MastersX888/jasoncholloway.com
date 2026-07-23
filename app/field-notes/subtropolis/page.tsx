import FieldNoteLayout from "@/components/field-notes/FieldNoteLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SubTropolis: The Underground City Beneath Kansas City",
  description:
    "SubTropolis is a 55-million-square-foot limestone mine beneath Kansas City, Missouri — the world's largest underground business complex. Here's the documented history, and what a novelist found down there.",
  alternates: { canonical: "https://jasoncholloway.com/field-notes/subtropolis/" },
  openGraph: {
    title: "SubTropolis: The Underground City Beneath Kansas City | Field Notes",
    description:
      "270-million-year-old Bethany Falls limestone, ~1,700 daily workers, National Archives film vaults, and a tunnel that wasn't on any map. The real SubTropolis — and the fiction it inspired.",
    url: "https://jasoncholloway.com/field-notes/subtropolis/",
    images: [{ url: "https://jasoncholloway.com/og/field-notes/subtropolis.png", width: 1200, height: 630, alt: "Illustration: limestone pillars in an underground corridor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SubTropolis: The Underground City Beneath Kansas City | Field Notes",
    description:
      "270-million-year-old limestone, 1,700 daily workers, National Archives film vaults, and a tunnel that wasn't on any map. The real SubTropolis — and the fiction it inspired.",
    images: [{ url: "https://jasoncholloway.com/og/field-notes/subtropolis.png", alt: "Illustration: limestone pillars in an underground corridor" }],
  },
};

const faqs = [
  {
    q: "Can you visit SubTropolis?",
    a: "SubTropolis is an active commercial facility and not a public tourist attraction. It is not open for general visits. Some tenants and commercial partners have access, and occasional guided tours have been arranged for media and institutional groups, but there is no regular public entry.",
  },
  {
    q: "How deep is SubTropolis?",
    a: "The tunnels run up to roughly 150-160 feet beneath the bluffs, depending on the section. The limestone ceiling — the \"room and pillar\" mine structure — is typically 25 feet high.",
  },
  {
    q: "What companies are in SubTropolis?",
    a: "Tenants have included the U.S. Postal Service, the National Archives and Records Administration (which stores millions of military personnel records there), film and digital media vaults, and hundreds of other commercial storage and light-industrial tenants. The facility is operated by Hunt Midwest.",
  },
  {
    q: "Is SubTropolis in the Masters X Trilogy?",
    a: "Yes. In The Inheritance of Frequency, Blake Masters works as a G4S security guard at SubTropolis before being fired for photographing a section of tunnel that doesn't appear on any official map. The carvings he found there — in bedrock that predates the limestone — are the inciting event of the trilogy.",
  },
];

const related = [
  { href: "/field-notes/kansas-city-locations", label: "The Real Kansas City of Masters X", theme: "Beneath Kansas City" },
  { href: "/field-notes/111-hz", label: "111 Hz: The Frequency Ancient Builders Kept Choosing", theme: "The Frequency" },
  { href: "/field-notes/oscar-01", label: "Oscar-01: Missouri's Cold War Launch Room", theme: "Beneath Kansas City" },
];

const GBS_VIDEO_ID = "b1YDufouqbY";
const GBS_VIDEO_URL = `https://www.youtube.com/watch?v=${GBS_VIDEO_ID}`;
const GBS_EMBED_URL = `https://www.youtube-nocookie.com/embed/${GBS_VIDEO_ID}`;

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "The Hidden Metropolis Beneath Kansas City",
  description:
    "Great Big Story documentary on SubTropolis — the world's largest underground business complex, 150 feet beneath Kansas City, Missouri.",
  thumbnailUrl: "https://jasoncholloway.com/og/field-notes/subtropolis.png",
  uploadDate: "2015-11-04",
  duration: "PT1M37S",
  embedUrl: GBS_EMBED_URL,
  contentUrl: GBS_VIDEO_URL,
  publisher: {
    "@type": "Organization",
    name: "Great Big Story",
    url: "https://www.youtube.com/@GreatBigStory",
  },
};

export default function SubTropolisNote() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <FieldNoteLayout
      slug="subtropolis"
      title="SubTropolis: The Underground City Beneath Kansas City"
      titleTag="SubTropolis: The Underground City Beneath Kansas City"
      theme="Beneath Kansas City"
      lede="SubTropolis is a 55-million-square-foot active commercial complex excavated from Pennsylvanian-age Bethany Falls limestone, roughly 270 million years old, beneath the bluffs north of downtown Kansas City, Missouri. It is the largest underground business complex in the world. Roughly 1,700 people go to work there every day — and most of Kansas City has never been inside it."
      record={
        <>
          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: "var(--r-lg)",
                border: "1px solid var(--border-faint)",
                backgroundColor: "black",
              }}
            >
              <iframe
                src={GBS_EMBED_URL}
                title="The Hidden Metropolis Beneath Kansas City — Great Big Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-faint)", marginTop: "0.5rem", fontStyle: "italic", lineHeight: 1.6 }}>
              The City Beneath the City — documentary short on SubTropolis (1:37). Source:{" "}
              <a href={GBS_VIDEO_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>
                Great Big Story
              </a>
              {" — "}
              <em>The Hidden Metropolis Beneath Kansas City</em>
            </p>
          </div>
          <p className="fn-body">
            The limestone beneath Kansas City is Pennsylvanian-age Bethany Falls limestone, deposited approximately 270 million years ago, when the interior of North America was a shallow inland sea. By the late nineteenth century, Kansas City's builders were quarrying it for construction. By the mid-twentieth century, they noticed something: the excavated chambers maintained a constant 65°F year-round, with near-perfect humidity and zero vibration. They were, in other words, ideal warehouses.
          </p>
          <p className="fn-body">
            Hunt Midwest began developing the industrial underground complex formally in the 1960s, trademarking the name SubTropolis — a portmanteau of "subterranean" and "metropolitan." Today the facility covers an ~55 million sq ft total excavated footprint, with roughly 9–10 million sq ft of developed, leasable space across a working limestone mine, making it the largest underground business complex in the world by square footage. Tenants include the U.S. Postal Service, the National Archives and Records Administration (which stores millions of federal military personnel records there, many irreplaceable), and hundreds of commercial tenants in storage, light manufacturing, and film preservation. The constant temperature and humidity make it particularly valuable for archival and cold-chain storage.
          </p>
          <p className="fn-body">
            The "room and pillar" mining method leaves massive limestone pillars intact to support the ceiling — typically 25 feet overhead. Workers drive on roads, work in offices, and operate in conditions that feel uncannily like an ordinary business park, except that the sky is gray limestone and the air is cool regardless of the season. Approximately 1,700 people commute underground every working day.
          </p>
          <p className="fn-body">
            Sources:{" "}
            <a href="https://www.huntmidwest.com/subtropolis/" target="_blank" rel="noopener noreferrer">Hunt Midwest official site</a>;{" "}
            <a href="https://en.wikipedia.org/wiki/SubTropolis" target="_blank" rel="noopener noreferrer">Wikipedia: SubTropolis</a>;{" "}
            <a href="https://www.atlasobscura.com/places/subtropolis" target="_blank" rel="noopener noreferrer">Atlas Obscura</a>.
          </p>
        </>
      }
      pattern={
        <>
          <p className="fn-body">
            What makes SubTropolis strange — and narratively irresistible — is not its scale but its secrecy. The facility's complete tunnel map has never been publicly released. The footprint of the active complex is documented; the full extent of the excavated limestone caverns is not. The Bethany Falls formation continues for miles in multiple directions beneath the Kansas City metro area. Not all of it has been commercially developed. Some of it has been surveyed. Some of it, presumably, has not.
          </p>
          <p className="fn-body">
            There is also the question of what the Bethany Falls limestone replaced. The formation was deposited roughly 270 million years ago — but the bedrock beneath it, the Pre-Cambrian basement rock, is far older. In some locations in Missouri, that basement rock has been exposed. It has never been systematically surveyed for markings. The mine's commercial focus is on the limestone, which is where the stable ceiling is, and where the utilities run. What lies below the limestone is not commercially relevant.
          </p>
          <p className="fn-body">
            That gap — between the documented facility and the unexplored bedrock beneath it — is the gap the trilogy occupies.
          </p>
        </>
      }
      fiction={
        <>
          <p className="fn-body">
            In <em>The Inheritance of Frequency</em>, Blake Masters works as a G4S security guard at SubTropolis. On a routine patrol of a lesser-used section, he finds a tunnel that doesn't appear on any of the facility's official maps. Deep in that tunnel, in bedrock that predates the limestone — predates the mine by orders of magnitude — he photographs geometric carvings. The carvings match proportions from his grandfather&apos;s notebooks exactly.
          </p>
          <p className="fn-body">
            He is fired for the photographs. This is the inciting event of the trilogy.
          </p>
          <p className="fn-body">
            The carvings, the unauthorized tunnel, and what they imply about the age and purpose of the chambers are the trilogy&apos;s invention. The limestone mine, the commercial tenants, the National Archives vault, the constant temperature, the 1,700 daily workers, and the general uncanniness of a city beneath the city — all of that is exactly as documented.
          </p>
        </>
      }
      excerpt={{
        paragraphs: [
          "He was thinking about the SD card hidden behind his medicine cabinet mirror. Thirty-seven photographs of geometric carvings in a section of SubTropolis that didn't appear on any official map. The section he'd been fired for entering.",
          "The carvings shouldn't have existed. SubTropolis was a limestone mine converted to underground storage. The main facility dated to the 1960s. But the tunnel Blake had found went deeper. Into bedrock that predated the limestone. Into rock carved with patterns that made his eyes water when he looked at them too long. The same branching angles from William's Cessna. The same proportions, a hundred feet underground.",
          "The same patterns. Different altitude.",
        ],
        attribution: "Masters X: The Inheritance of Frequency",
      }}
      bookHref="/books/masters-x/the-inheritance-of-frequency"
      faqs={faqs}
      relatedNotes={related}
    />
    </>
  );
}

/**
 * Shared schema.org entity nodes.
 *
 * The Person and Organization nodes below are the single canonical definition of
 * those entities and are emitted with identical `@id`s on jasoncholloway.com and
 * seventhcitypress.com, so search engines resolve one author and one publisher
 * rather than two half-described pairs. The imprint app mirrors this file at
 * `seventhcitypress/lib/entities.ts`.
 */
import {
  authorIsniIdentifier,
  authorSameAs,
  imprintSameAs,
  ORGANIZATION_ID,
  PERSON_ID,
} from "@/lib/data/authorAuthority";

export { ORGANIZATION_ID, PERSON_ID };

export const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Jason Carroll Holloway",
  alternateName: ["Jason C. Holloway", "Jason Holloway"],
  url: "https://jasoncholloway.com/",
  jobTitle: "Author",
  description:
    "Writer and researcher at the intersection of acoustic science, medieval scholarship, and human consciousness.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kansas City",
    addressRegion: "MO",
    addressCountry: "US",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Mercy University",
    sameAs: "https://www.mercy.edu",
  },
  knowsAbout: [
    "Voynich Manuscript",
    "Ars Notoria",
    "archaeoacoustics",
    "SubTropolis",
    "Strahov Monastery",
    "medieval manuscripts",
    "John Hawkes",
    "acoustic frequency",
    "conspiracy fiction",
  ],
  worksFor: { "@id": ORGANIZATION_ID },
  identifier: authorIsniIdentifier,
  sameAs: [...authorSameAs],
} as const;

export const organizationNode = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Seventh City Press",
  alternateName: "Seventh City Press LLC",
  url: "https://seventhcitypress.com/",
  description:
    "Independent literary imprint founded by Jason Carroll Holloway, publishing work that refuses the division between imaginative and intellectual writing. Kansas City, Missouri.",
  logo: {
    "@type": "ImageObject",
    url: "https://seventhcitypress.com/og-image.png",
    width: 1200,
    height: 630,
  },
  founder: { "@id": PERSON_ID },
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kansas City",
      addressRegion: "MO",
      addressCountry: "US",
    },
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Press",
      email: "press@seventhcitypress.com",
    },
    {
      "@type": "ContactPoint",
      contactType: "General",
      email: "info@seventhcitypress.com",
    },
  ],
  sameAs: [...imprintSameAs],
} as const;

export const authorWebSiteNode = {
  "@type": "WebSite",
  "@id": "https://jasoncholloway.com/#website",
  url: "https://jasoncholloway.com/",
  name: "Jason Carroll Holloway",
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en",
} as const;

/** Site-wide `@graph` for jasoncholloway.com. */
export const authorSiteGraph = {
  "@context": "https://schema.org",
  "@graph": [authorWebSiteNode, personNode, organizationNode],
} as const;

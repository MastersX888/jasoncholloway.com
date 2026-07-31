/**
 * Mirror of ../lib/seo/entities.ts — keep in sync.
 *
 * The Person and Organization nodes must be byte-identical in meaning to the ones
 * emitted on jasoncholloway.com, including the `@id`s. Two domains describing the
 * same author and the same publisher under different identities is what splits the
 * entity in search engines' eyes.
 */
import {
  authorIsniIdentifier,
  authorSameAs,
  imprintSameAs,
  ORGANIZATION_ID,
  PERSON_ID,
} from "./authorAuthority";

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

export const imprintWebSiteNode = {
  "@type": "WebSite",
  "@id": "https://seventhcitypress.com/#website",
  url: "https://seventhcitypress.com/",
  name: "Seventh City Press",
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en",
} as const;

/** Site-wide `@graph` for seventhcitypress.com. */
export const imprintSiteGraph = {
  "@context": "https://schema.org",
  "@graph": [imprintWebSiteNode, personNode, organizationNode],
} as const;

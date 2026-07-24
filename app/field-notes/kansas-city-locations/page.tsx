import FieldNoteLayout from "@/components/field-notes/FieldNoteLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Real Kansas City of Masters X: A Reader's Map",
  description:
    "Every Kansas City location in the Masters X Trilogy is real: Miller Nichols Library at UMKC, Westport, Quality Hill, the Hotel Phillips Building, the West Bottoms, the KC Streetcar corridor. The events are fiction. The geography is exact.",
  alternates: { canonical: "https://jasoncholloway.com/field-notes/kansas-city-locations/" },
  openGraph: {
    title: "The Real Kansas City of Masters X: A Reader's Map | Field Notes",
    description:
      "The corner table at Miller Nichols Library. The Quality Hill apartment. The Hotel Phillips downtown. The KC Streetcar on Main Street. Every location is real. The events are the novel's invention.",
    url: "https://jasoncholloway.com/field-notes/kansas-city-locations/",
    images: [
      {
        url: "https://jasoncholloway.com/og/field-notes/kansas-city-locations.png",
        width: 1200,
        height: 630,
        alt: "Illustration: Kansas City skyline viewed from the West Bottoms bluffs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Real Kansas City of Masters X: A Reader's Map | Field Notes",
    description:
      "Quality Hill apartment, Hotel Phillips, KC Streetcar, West Bottoms, Miller Nichols Library. Every location in Masters X is real. The events are fiction.",
    images: [{ url: "https://jasoncholloway.com/og/field-notes/kansas-city-locations.png", alt: "Illustration: Kansas City skyline viewed from the West Bottoms bluffs" }],
  },
};

const faqs = [
  {
    q: "What Kansas City neighborhoods are in Masters X?",
    a: "The trilogy is set primarily in Westport, the West Bottoms (Genessee Street area), downtown Kansas City (Hotel Phillips area), and the apartment building the novels call Quality Hill, where Blake and Nadia live. Miller Nichols Library at UMKC is the opening setting.",
  },
  {
    q: "Can I visit the locations in Masters X?",
    a: "Yes. Miller Nichols Library is open to UMKC students and the public for research. Westport and the West Bottoms are walkable neighborhoods. The KC Streetcar runs along Main Street. The apartment building the novels call Quality Hill is a private residence, not a public landmark.",
  },
  {
    q: "Is Jason Carroll Holloway from Kansas City?",
    a: "Yes. The author lives and works in Kansas City, Missouri. The city is rendered from direct local knowledge.",
  },
  {
    q: "Are there books set in Kansas City?",
    a: "Kansas City has a surprisingly thin fiction tradition given its size and history. Notable fiction set in Kansas City includes Robert Altman's film Kansas City (1996), some of Calvin Trillin's essays and fiction, and now the Masters X Trilogy.",
  },
];

const related = [
  { href: "/field-notes/subtropolis", label: "SubTropolis", theme: "Beneath Kansas City" },
  { href: "/field-notes/oscar-01", label: "Oscar-01: Missouri's Cold War Launch Room", theme: "Beneath Kansas City" },
  { href: "/field-notes/meramec-caverns", label: "Meramec Caverns", theme: "Beneath Kansas City" },
];

export default function KansasCityLocationsNote() {
  return (
    <FieldNoteLayout
      slug="kansas-city-locations"
      title="The Real Kansas City of Masters X: A Reader's Map"
      titleTag="The Real Kansas City of Masters X: A Reader's Map"
      theme="Beneath Kansas City"
      lede="Every Kansas City location in the Masters X Trilogy is real: the corner table at Miller Nichols Library at UMKC, the Westport walkup apartments, the Quality Hill apartment where Blake and Nadia live, the Hotel Phillips Building downtown, the street-level streetcar corridor, the West Bottoms' industrial blocks. The events that happen there are fiction. The geography is exact."
      record={
        <>
          <p className="fn-body">
            Kansas City, Missouri, not to be confused with Kansas City, Kansas, is a mid-sized American city of approximately 500,000 people at the confluence of the Kansas and Missouri Rivers. It is historically significant as a gateway city for westward expansion, a rail hub, and a center of American jazz culture.
          </p>
          <p className="fn-body">
            The specific locations in the trilogy include: <strong>Miller Nichols Library</strong> at the University of Missouri–Kansas City (UMKC), a real campus library and the primary research library for the university on Volker Boulevard. <strong>Quality Hill</strong>, in the novels, names the apartment building where Blake and Nadia live: the kitchen where the east-window light crosses the table, the balcony, the driveway. It is not the historic neighborhood of the same name on Kansas City maps. <strong>The West Bottoms</strong>, the low-lying industrial district west of downtown, below the bluffs, historically a stockyards and meatpacking area, now a mix of antique markets, event spaces, and artists' studios.
          </p>
          <p className="fn-body">
            <strong>The Hotel Phillips Building</strong>, a downtown Kansas City landmark completed in 1931, an Art Deco tower at 106 W. 12th Street. <strong>The KC Streetcar</strong>, the Kansas City Streetcar, a modern light-rail line opened in 2016 running along Main Street through the downtown Crossroads Arts District and Crown Center neighborhoods. <strong>Westport</strong>, a neighborhood district of bars, restaurants, and shops in the midtown area of Kansas City, historically significant as the last outfitting point for wagon trains heading west.
          </p>
        </>
      }
      pattern={
        <>
          <p className="fn-body">
            Kansas City is an underused setting in American literary fiction, despite its significant history, its unusual geography built on river bluffs above a wide floodplain, its role in jazz history, and the striking contrast between its dense historic neighborhoods and its underground limestone infrastructure. The city rewards close attention: the bluffs above the West Bottoms, the view from those bluffs toward the river, the strange persistence of the stockyards grid in streets now occupied by antique dealers and wedding venues.
          </p>
          <p className="fn-body">
            SubTropolis, visible only as an unmarked hill from Cemetery Road NE, is one of the great invisible urban landmarks in America. The city has layers, geological and historical and architectural, that most of its own residents have never fully registered. The Masters X Trilogy is partly an argument that Kansas City is stranger and more significant than American fiction has so far noticed.
          </p>
        </>
      }
      fiction={
        <>
          <p className="fn-body">
            Blake Masters' Kansas City is the city as it physically exists, rendered as precisely as the author can manage. The corner table at Miller Nichols Library is in the right part of the building, near the right radiator. The Quality Hill apartment has the kitchen the novel describes, with the east-window light crossing the table at the speed of the earth's rotation. The Hotel Phillips has the lobby the novel describes.
          </p>
          <p className="fn-body">
            What happens in those locations, Blake's firing from SubTropolis, the discovery of his grandfather's notebooks, the meetings with Nadia and Andrew, the events in the West Bottoms warehouse, is the trilogy's invention. The city itself is not. The author lives there.
          </p>
        </>
      }
      excerpt={{
        paragraphs: [
          "The corner table at Miller Nichols Library had been Blake Masters' territory for three years.",
          "Back to the wall. Clear sightline to both exits. Close enough to the radiator to stay warm in October, far enough to avoid the clanking when the old pipes kicked on. His grandfather had taught him to choose seats like this. Always know your exits.",
        ],
        attribution: "Masters X: The Inheritance of Frequency",
      }}
      bookHref="/books/masters-x/the-inheritance-of-frequency"
      faqs={faqs}
      relatedNotes={related}
    />
  );
}

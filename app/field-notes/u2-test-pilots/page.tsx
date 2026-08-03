import FieldNoteLayout from "@/components/field-notes/FieldNoteLayout";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "U-2 Test Pilots: What They Saw from 70,000 Feet",
  description:
    "Declassified U-2 histories and pilot accounts from the edge of the stratosphere — and what William Masters saw in 1956 that he spent a lifetime proving.",
  socialTitle: "U-2 Test Pilots: What They Saw from 70,000 Feet | Field Notes",
  socialDescription:
    "Above 99% of the atmosphere. Stars visible in daytime. The curvature of the earth at the horizon. Documented U-2 pilot experience — and what William Masters claims he saw in 1956.",
  path: "/field-notes/u2-test-pilots/",
  ogType: "article",
  image: {
    url: "https://jasoncholloway.com/og/field-notes/u2-test-pilots.png",
    width: 1024,
    height: 1024,
    alt: "Illustration: view from 70,000 feet — deep black sky above, earth's curvature below",
  },
});

const faqs = [
  {
    q: "What is the U-2 spy plane?",
    a: "The Lockheed U-2 is a high-altitude reconnaissance aircraft developed by the CIA's Skunk Works division in the mid-1950s. It is designed to fly at altitudes above 70,000 feet for long-duration photographic reconnaissance missions. It remains in limited service as of 2026.",
  },
  {
    q: "What altitude does the U-2 fly at?",
    a: "The U-2 flies at approximately 70,000 feet (about 21 km), above 99% of the atmosphere. At this altitude, the sky appears deep blue-black, stars are visible during the day, and the curvature of the earth is visible at the horizon.",
  },
  {
    q: "What is Skunk Works?",
    a: "Skunk Works is the advanced development division of Lockheed (now Lockheed Martin), responsible for highly classified aircraft programs. Founded by Kelly Johnson, it developed the U-2, the SR-71 Blackbird, the F-117 Nighthawk, and other significant aircraft. The name comes from the Al Capp comic strip Li'l Abner.",
  },
  {
    q: "Who is William Masters in the trilogy?",
    a: "William Masters is Blake's grandfather, a former U-2 reconnaissance pilot who in 1956 saw something from altitude that he spent the rest of his life trying to prove was real. His seven notebooks, left in a safety deposit box timed to arrive after his death, are the inciting inheritance of Volume I.",
  },
];

const related = [
  { href: "/field-notes/oscar-01", label: "Oscar-01: Missouri's Cold War Launch Room", theme: "Beneath Kansas City" },
  { href: "/field-notes/subtropolis", label: "SubTropolis, Kansas City", theme: "Beneath Kansas City" },
  { href: "/field-notes/111-hz", label: "111 Hz: The Frequency", theme: "The Frequency" },
];

export default function U2TestPilotsNote() {
  return (
    <FieldNoteLayout
      slug="u2-test-pilots"
      title="U-2 Test Pilots: What They Saw from 70,000 Feet"
      titleTag="U-2 Test Pilots: What They Saw from 70,000 Feet"
      theme="The Frequency"
      lede="The Lockheed U-2 reconnaissance aircraft flew at altitudes above 70,000 feet — the edge of the stratosphere, where the sky is black and the curvature of the earth is visible. The pilots who flew it operated under extraordinary physical and psychological conditions, with minimal life-support margin and no ejection capability at maximum altitude. What they reported seeing and experiencing has been documented in declassified program histories and published memoirs."
      record={
        <>
          <p className="fn-body">
            The Lockheed U-2 was developed by the Skunk Works division of Lockheed under engineer Kelly Johnson, with CIA funding, in the mid-1950s. The first flight occurred in August 1955. The aircraft entered operational reconnaissance service in 1956 and conducted its first overflight of the Soviet Union in July 1956.
          </p>
          <p className="fn-body">
            The U-2 flies at approximately 70,000 feet — above 99% of the atmosphere. At that altitude, the sky is deep blue-black; stars are visible during the day; the curvature of the earth is apparent at the horizon. Pilots wore full pressure suits, essentially proto-spacesuits, and breathed 100% oxygen. The aircraft's design — extremely long wings, single engine — made it unforgiving at maximum altitude.
          </p>
          <p className="fn-body">
            The CIA's program history, declassified in 1998 and published as <em>The U-2 Program</em> by Gregory Pedlow and Donald Welzenbach, documents the program's development, operations, and the famous 1960 Gary Powers shootdown. Published pilot memoirs include accounts of the visual and psychological experience of flight at extreme altitude. Pilots consistently reported the exceptional clarity and strangeness of the view — the visible curvature, the blackness of the sky, the silence.
          </p>
          <p className="fn-body">
            Sources: Pedlow, Gregory W. and Donald E. Welzenbach. <em>The CIA and the U-2 Program, 1954–1974</em> (CIA History Staff, 1998, declassified); Atomic Heritage Foundation.
          </p>
        </>
      }
      pattern={
        <>
          <p className="fn-body">
            The documented experience of high-altitude flight is genuinely disorienting in ways that are hard to convey. The combination of isolation, oxygen saturation, extreme visual clarity, and the physical strangeness of the pressure suit creates an altered perceptual context. Pilots have reported, in memoirs and recorded interviews, that the altitude produced a sense of unusual visual acuity — that details far below on the earth's surface, and patterns in cloud formations and terrain, became strikingly visible in ways they had not anticipated.
          </p>
          <p className="fn-body">
            This is consistent with the optical physics of reduced atmospheric scattering at altitude. Whether any pilot in 1956 saw what William Masters describes in his letter is, of course, the novel's claim, not the historical record. The perceptual conditions that make the claim plausible — the blackness, the clarity, the isolation, the altered physiology of high-altitude flight — are documented fact.
          </p>
        </>
      }
      fiction={
        <>
          <p className="fn-body">
            William Masters' letter, left in the safety deposit box with his seven notebooks, describes a reconnaissance mission in 1956: the first time he saw the pattern. From seventy thousand feet, on a classified mission photographing Soviet installations, he saw something in cloud formations and terrain features that matched mathematical sequences from medieval manuscripts he had been studying. The higher he flew, the more clearly he could see it. Once he saw it, he could not unsee it.
          </p>
          <p className="fn-body">
            The U-2 program, the 1956 operational date, the pressure suits, the reconnaissance photography, and the documented perceptual conditions of high-altitude flight are all real. William Masters, his specific mission, and what he reports seeing are the trilogy's invention. This section contains no biographical claims about the author's family. It is based entirely on declassified program histories and published pilot accounts.
          </p>
        </>
      }
      excerpt={{
        paragraphs: [
          "I saw them first from seventy thousand feet. U-2 reconnaissance, 1956. The mission was classified, photographing Soviet installations. But I saw something else. Patterns in cloud formations that matched mathematical sequences I'd seen in medieval manuscripts. Proportional relationships in view features that shouldn't exist. The higher I flew, the more I could see. And once I saw them, I couldn't unsee them.",
        ],
        attribution: "Masters X: The Inheritance of Frequency",
      }}
      bookHref="/books/masters-x/the-inheritance-of-frequency"
      faqs={faqs}
      relatedNotes={related}
    />
  );
}

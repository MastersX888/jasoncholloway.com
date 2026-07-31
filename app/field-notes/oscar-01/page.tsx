import FieldNoteLayout from "@/components/field-notes/FieldNoteLayout";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Oscar-01: Missouri's Cold War Launch Room (You Can Stand Inside It)",
  description:
    "Oscar-01 is a real preserved Minuteman II ICBM launch control facility at Whiteman Air Force Base in Johnson County, Missouri. During the Cold War, a two-person crew sat 60 feet underground, ready to turn the keys for up to ten nuclear missiles. That reality is the ground the Masters X Trilogy builds on.",
  socialTitle: "Oscar-01: Missouri's Cold War Launch Room (You Can Stand Inside It) | Field Notes",
  socialDescription:
    "60 feet underground. Two officers. Two keys out of reach of each other. 150 Minuteman II missiles across the Missouri countryside. Oscar-01 is preserved. You can stand in the capsule where James Masters worked.",
  path: "/field-notes/oscar-01/",
  ogType: "article",
  image: {
    url: "https://jasoncholloway.com/og/field-notes/oscar-01.png",
    width: 1024,
    height: 1024,
    alt: "Illustration: a Minuteman II launch control capsule interior, 60 feet underground",
  },
});

const faqs = [
  {
    q: "Can you visit Oscar-01?",
    a: "The Oscar-01 Launch Control Facility at Whiteman AFB is a historic site. Access for the general public may require coordination with the base public affairs office; check current availability through the Whiteman AFB website or the Atomic Heritage Foundation.",
  },
  {
    q: "What is a Minuteman ICBM?",
    a: "The Minuteman is a land-based intercontinental ballistic missile, the primary U.S. land-based nuclear deterrent since the early 1960s. Minuteman III missiles remain in service as of 2026; the earlier Minuteman II was decommissioned following the START II treaty in the 1990s.",
  },
  {
    q: "Where are Minuteman missile silos in Missouri?",
    a: "The former 351st Missile Wing operated 150 Minuteman II silos across Johnson, Pettis, Benton, Henry, and surrounding counties in central Missouri. Most were decommissioned and destroyed in the 1990s. Only Oscar-01, the launch control facility, was preserved.",
  },
  {
    q: "Is Oscar-01 in Masters X fiction?",
    a: "The brass tag CR-60/68093 and the designation Oscar-01 are drawn from real equipment designations used in the Minuteman program. James Masters' specific work there, and the events surrounding his death, are the novel's fiction.",
  },
];

const related = [
  { href: "/field-notes/subtropolis", label: "SubTropolis, Kansas City", theme: "Beneath Kansas City" },
  { href: "/field-notes/u2-test-pilots", label: "What Test Pilots Saw from 70,000 Feet", theme: "The Frequency" },
  { href: "/field-notes/kansas-city-locations", label: "The Real Kansas City of Masters X", theme: "Beneath Kansas City" },
];

export default function Oscar01Note() {
  return (
    <FieldNoteLayout
      slug="oscar-01"
      title="Oscar-01: Missouri's Cold War Launch Room (You Can Stand Inside It)"
      titleTag="Oscar-01: Missouri's Cold War Launch Room (You Can Stand Inside It)"
      theme="Beneath Kansas City"
      lede="Oscar-01 is a real preserved Minuteman II ICBM launch control facility at Whiteman Air Force Base in Johnson County, Missouri. It is open to the public as a historic site. During the Cold War, a two-person crew — a launch control officer and a deputy — sat 60 feet underground in a capsule, ready to turn the launch keys for up to ten Minuteman II missiles. That reality is the ground the trilogy builds on."
      record={
        <>
          <p className="fn-body">
            The Minuteman ICBM program was the backbone of the United States land-based nuclear deterrent from the early 1960s. Whiteman Air Force Base in Knob Noster, Missouri (approximately 70 miles southeast of Kansas City) hosted the 351st Strategic Missile Wing, which operated 150 Minuteman II ICBMs across the Missouri countryside during the Cold War. The launch control facilities (LCFs) were designated by the phonetic alphabet: Alpha, Bravo, Charlie... Oscar. Oscar-01 was the wing headquarters' launch control center.
          </p>
          <p className="fn-body">
            Each LCF consisted of a surface support building and an underground Launch Control Capsule (LCC), a hardened steel-and-concrete cylinder suspended on shock absorbers 60 feet underground. Two officers on 24-hour rotating alert sat in that capsule, able to receive, authenticate, and execute a launch order for up to ten Minuteman II missiles if directed.
          </p>
          <p className="fn-body">
            The 351st Missile Wing was deactivated in 1995 as part of the START II treaty, and its 150 silos were decommissioned and destroyed. Oscar-01 was preserved by the Air Force as a historic site and was listed on the National Register of Historic Places.
          </p>
          <p className="fn-body">
            Sources: <a href="https://www.atomicheritage.org" target="_blank" rel="noopener noreferrer">Atomic Heritage Foundation</a>; National Park Service; Whiteman AFB public affairs.
          </p>
        </>
      }
      pattern={
        <>
          <p className="fn-body">
            The launch control capsule is a remarkable space to stand in. It is genuinely small — a cylinder barely large enough for two people and the equipment they need to end human civilization. The brass equipment tags are real; the procedural documentation is real; the launch checklist is real. The procedures were designed so that two people had to agree — to turn two separate keys simultaneously, each out of reach of the other.
          </p>
          <p className="fn-body">
            This design was intentional, and its logic is exactly as strange as it sounds: the most consequential human action in history required two people to decide together, in a room the size of a large walk-in closet, 60 feet underground. The equipment, the procedures, and the physical reality of the capsule are all preserved and documented. The strangeness is not the trilogy's invention. It is the strangeness of actual Cold War deterrence logic, physically embodied in a cylinder of hardened concrete in Johnson County, Missouri.
          </p>
        </>
      }
      fiction={
        <>
          <p className="fn-body">
            In <em>The Inheritance of Frequency</em>, James Masters — Blake's father — was a launch control officer at Oscar-01 who began asking questions about things he encountered in the facility's documentation. He died in a single-car accident on a road he had driven a thousand times, three days after initiating an inquiry through official channels. The accident is ruled accidental. Blake has never believed it.
          </p>
          <p className="fn-body">
            The brass tag CR-60/68093 — found beneath his grandfather's notebooks in the safety deposit box — links three generations of the Masters family to the same buried facility. What James found in the Oscar-01 documentation, and who wanted him to stop looking, is the trilogy's central mystery across Volumes I and II. The facility is real. James Masters, his clearance, his questions, and his death are the fiction.
          </p>
        </>
      }
      excerpt={{
        paragraphs: [
          "Beneath the notebooks: a brass equipment tag. Engraved letters: CR-60 / 68093. On the back: Oscar-01.",
          "His father's facility. The launch control center where James Masters had worked, where he'd had clearance to go places civilians weren't allowed, where he'd started asking questions and died three days later on a road he'd driven a thousand times.",
        ],
        attribution: "Masters X: The Inheritance of Frequency",
      }}
      bookHref="/books/masters-x/the-inheritance-of-frequency"
      faqs={faqs}
      relatedNotes={related}
    />
  );
}

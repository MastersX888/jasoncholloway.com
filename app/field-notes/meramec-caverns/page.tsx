import FieldNoteLayout from "@/components/field-notes/FieldNoteLayout";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Meramec Caverns and the Patterns in the Flowstone",
  description:
    "Meramec Caverns is a real commercial cave attraction in Stanton, Missouri, open since 1935. Jesse James reportedly used it as a hideout. Its flowstone formations are among the most dramatic in the Midwest. In the Masters X Trilogy, a young Blake Masters stands in those formations with his grandfather and learns to see the pattern.",
  socialTitle: "Meramec Caverns and the Patterns in the Flowstone | Field Notes",
  socialDescription:
    "The Stage Curtain formation. Jesse James. Route 66. Constant 58°F. And in the fiction: William Masters crouching to his grandson's eye level in the flowstone, tracing the pattern that appears in rivers, veins, trees, and lightning.",
  path: "/field-notes/meramec-caverns/",
  ogType: "article",
  image: {
    url: "https://jasoncholloway.com/og/field-notes/meramec-caverns.png",
    width: 1024,
    height: 1024,
    alt: "Illustration: flowstone formations in Meramec Caverns, Missouri",
  },
});

const faqs = [
  {
    q: "Where is Meramec Caverns?",
    a: "Meramec Caverns is located in Stanton, Missouri, approximately 60 miles southwest of St. Louis via Interstate 44. It sits along the Meramec River in the Ozark foothills.",
  },
  {
    q: "Can you visit Meramec Caverns?",
    a: "Yes. Meramec Caverns is a commercial cave attraction open to the public, typically April through November. Tours run regularly and last approximately one hour. See merameccaverns.com for current hours and ticket prices.",
  },
  {
    q: "What is Meramec Caverns famous for?",
    a: "Meramec Caverns is best known for its Stage Curtain flowstone formation, its Jesse James legend, and as one of the most dramatic cave attractions in Missouri. It was a major stop on the historic Route 66 corridor.",
  },
  {
    q: "Is Meramec Caverns in Masters X?",
    a: "Yes. William Masters takes a young Blake to Meramec Caverns and teaches him to see the self-repeating patterns in the flowstone — the same patterns, William says, that appear in rivers, veins, trees, and lightning. This is Blake's first lesson in what William has been trying to prove.",
  },
];

const related = [
  { href: "/field-notes/subtropolis", label: "SubTropolis, Kansas City", theme: "Beneath Kansas City" },
  { href: "/field-notes/kansas-city-locations", label: "The Real Kansas City of Masters X", theme: "Beneath Kansas City" },
  { href: "/field-notes/oscar-01", label: "Oscar-01: Missouri's Cold War Launch Room", theme: "Beneath Kansas City" },
];

export default function MeramecCavernsNote() {
  return (
    <FieldNoteLayout
      slug="meramec-caverns"
      title="Meramec Caverns and the Patterns in the Flowstone"
      titleTag="Meramec Caverns and the Patterns in the Flowstone"
      theme="Beneath Kansas City"
      lede="Meramec Caverns is a real commercial cave attraction along the Meramec River in Stanton, Missouri, approximately an hour southwest of St. Louis. It has been open to tourists since 1935. Jesse James reportedly used it as a hideout. The cave's flowstone formations — calcite deposits built up over millions of years of slow water flow — are among the most dramatic in the Midwest. In the Masters X Trilogy, a young Blake Masters stands in those formations with his grandfather and learns to see the pattern."
      record={
        <>
          <p className="fn-body">
            Meramec Caverns is located in Stanton, Missouri, in the Ozark region, and formed in Gasconade dolomite rock over hundreds of millions of years. The cave is approximately 4.6 miles long, though the tourist tour covers approximately one mile of developed passages. It is best known for the Stage Curtain — a massive formation of flowstone drapery approximately 70 feet wide and 35 feet high, created by thin sheets of calcite mineral deposit laid down by slow-flowing water over geological time.
          </p>
          <p className="fn-body">
            The Jesse James connection: the cave was reportedly used as a hideout by the James-Younger Gang after the Northfield, Minnesota bank raid of 1876. Whether this is historical fact or promotional legend is disputed, but it has been good for tourism since the cave's modern development in the 1930s. Lyman Riley opened the cave to commercial tours in 1933–1935. It has been a Missouri landmark and roadside attraction ever since, reaching its peak in the era of U.S. Route 66 tourism (Route 66 passes nearby). The cave maintains a constant temperature of approximately 58°F year-round.
          </p>
          <p className="fn-body">
            Sources: <a href="https://www.merameccaverns.com" target="_blank" rel="noopener noreferrer">merameccaverns.com</a>; Missouri Department of Natural Resources.
          </p>
        </>
      }
      pattern={
        <>
          <p className="fn-body">
            Flowstone formations — the smooth, layered calcite deposits that cover cave walls and floors and build up into curtains, shelves, and columns — have a distinctive branching and layering structure that emerges from the same physical process that creates river deltas, fern fronds, and the bronchial tree of the human lung: fractal self-similarity across scales. The pattern that grows at 0.001 millimeters per year in a Missouri cave is structurally related to the pattern that grows across geological time in river systems.
          </p>
          <p className="fn-body">
            This is not the trilogy's metaphor; it is a documented property of fractal geometry, described by Benoit Mandelbrot beginning in the 1970s. What the trilogy does is place a specific character — William Masters, who has been looking for this pattern in bedrock and cloud formations and manuscript diagrams — at his grandson's eye level in the flowstone, where the pattern is unmistakably present, growing at a rate of less than a millimeter per year, in a commercial cave in Missouri.
          </p>
        </>
      }
      fiction={
        <>
          <p className="fn-body">
            The Meramec Caverns scene is Blake's first memory of his grandfather explaining the pattern. He is young — old enough to remember, young enough that the stalactites are at eye level. William crouches down beside him and traces the flowstone curtain, showing him how the structure repeats: the same branching geometry at the scale of a cave formation, at the scale of a stream drainage, at the scale of a river delta, at the scale of the veins in Blake's own hand.
          </p>
          <p className="fn-body">
            This is Blake's first lesson. The cave, the formations, the Jesse James legend visible on the gift shop signage outside — all real. The conversation between grandfather and grandson, and what William has spent thirty years trying to prove, is the trilogy's invention.
          </p>
        </>
      }
      excerpt={{
        paragraphs: [
          "\"See the formations?\" William's voice echoed off walls that had never felt artificial light. \"See how they repeat?\"",
          "Blake saw rock. Stalactites dripping from the ceiling. Stalagmites rising to meet them. \"They're just shapes,\" he said.",
          "\"Nothing in nature is random, Blake.\" William crouched, eyes level with his grandson's. He traced a finger along the stone curtain, following lines Blake couldn't see.",
          "\"It's the same pattern as the water that carved it. The same as the streams on the surface. The same as the rivers.\" His eyes gleamed. \"And that structure is the same as the veins in your body. The same as the branches of a tree. The same as lightning.\"",
        ],
        attribution: "Masters X: The Inheritance of Frequency",
      }}
      bookHref="/books/masters-x/the-inheritance-of-frequency"
      faqs={faqs}
      relatedNotes={related}
    />
  );
}

import FieldNoteLayout from "@/components/field-notes/FieldNoteLayout";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  // Short enough that the layout's " | Jason Carroll Holloway" suffix still fits the
  // ~60-character SERP window; the h1 below carries the fuller phrasing.
  title: "Archaeoacoustics: What It Measures",
  description:
    "Archaeoacoustics is the study of how ancient built spaces behave acoustically. What the field measures, what it has established, and what it has not.",
  socialTitle: "Archaeoacoustics: How Ancient Sound Is Measured | Field Notes",
  socialDescription:
    "Caves, chambered tombs, and stone circles have measurable acoustic properties. The measurements are real and reproducible. Whether the builders intended them is the open question — and the internet has been answering it far too confidently.",
  path: "/field-notes/archaeoacoustics/",
  ogType: "article",
  keywords: [
    "archaeoacoustics",
    "what is archaeoacoustics",
    "ancient acoustics",
    "acoustic archaeology",
    "megalithic acoustics",
    "cave resonance research",
    "Ħal-Saflieni Hypogeum",
    "Paul Devereux",
  ],
  image: {
    // No bespoke card for this note yet — it borrows the Field Notes hub card.
    url: "https://jasoncholloway.com/og/field-notes/hub.png",
    width: 1024,
    height: 1024,
    alt: "Illustration: a stone chamber cross-section overlaid with a resonance curve",
  },
});

const faqs = [
  {
    q: "What is archaeoacoustics?",
    a: "Archaeoacoustics is the study of the acoustic properties of ancient sites — caves, chambered tombs, temples, and stone circles. Researchers record and analyse the resonant frequencies, reverberation times, and sound behaviour of prehistoric and historic built environments in order to ask whether those acoustic properties were designed or incidental. It sits at the intersection of archaeology, acoustics, and the anthropology of ritual.",
  },
  {
    q: "Is archaeoacoustics a real science?",
    a: "The measurement side is unambiguously real: acoustic properties of enclosed stone spaces can be recorded with standard instrumentation, the results are reproducible, and the findings appear in peer-reviewed archaeological and acoustics journals. The interpretive side is genuinely contested. Establishing that a chamber resonates at a given frequency is straightforward; establishing that its builders selected that frequency on purpose is not, and mainstream archaeology remains cautious about functional claims.",
  },
  {
    q: "How do researchers measure the acoustics of an ancient site?",
    a: "The core technique is impulse response measurement. A researcher excites the space with a broadband sound — a swept sine tone, a starter pistol, a balloon burst — and records how the space responds with calibrated microphones. From that recording you can derive the reverberation time, the resonant modes, and the frequency response of the chamber. Those results are then compared against the geometry and mineral composition of the space, because both determine which standing waves a room can sustain.",
  },
  {
    q: "Who are the main researchers in archaeoacoustics?",
    a: "Paul Devereux is among the most cited, both for site measurements across Britain and Ireland and for the book Stone Age Soundtracks. Iegor Reznikoff and Michel Dauvois published influential work on the relationship between resonance and the placement of Palaeolithic cave paintings. Aaron Watson and David Keating carried out well-known acoustic analyses of megalithic monuments in prehistoric Britain, including Camster Round.",
  },
  {
    q: "Does archaeoacoustics prove ancient builders designed for sound?",
    a: "No, and the honest researchers in the field do not claim it does. What the record supports is that certain ancient spaces have pronounced acoustic behaviour, that sound was a meaningful part of many ancient ritual traditions, and that in some painted caves the imagery clusters in the more resonant areas. Whether that reflects deliberate acoustic design, empirical discovery, or the unavoidable physics of building with stone at human scale is not resolved by the archaeological record.",
  },
];

const related = [
  { href: "/field-notes/111-hz", label: "111 Hz: The Recurring Frequency", theme: "The Frequency" },
  { href: "/field-notes/cymatics", label: "Cymatics: Sound Made Visible", theme: "The Frequency" },
  { href: "/field-notes/strahov-monastery", label: "The Strahov Library, Prague", theme: "The Sites" },
  { href: "/field-notes/subtropolis", label: "SubTropolis, Kansas City", theme: "Beneath Kansas City" },
];

export default function ArchaeoacousticsNote() {
  return (
    <FieldNoteLayout
      slug="archaeoacoustics"
      title="Archaeoacoustics: Measuring How Old Rooms Listen"
      titleTag="Archaeoacoustics: What It Measures"
      theme="The Frequency"
      ogImage="https://jasoncholloway.com/og/field-notes/hub.png"
      lede="Archaeoacoustics is the study of how ancient built spaces behave as acoustic instruments — how caves, chambered tombs, temples, and stone circles resonate, reverberate, and shape a human voice. The measurements are real, reproducible, and published. What they mean is one of the most honestly unresolved questions in archaeology, and one of the most dishonestly answered questions on the internet."
      record={
        <>
          <p className="fn-body">
            The field is younger than the sites it studies. Systematic acoustic measurement of ancient structures began in earnest in the late twentieth century, when portable recording equipment became good enough to take into a cave. Before that, the acoustic character of ancient spaces was a matter of anecdote — visitors noticed that certain chambers did something strange to the voice, and there the observation stopped.
          </p>
          <p className="fn-body">
            The method that made the field possible is impulse response measurement, and it is the same technique used to characterise a concert hall. You excite the space with a broadband sound — a swept sine tone, a starter pistol, a burst balloon — and record what the space does to it. From a single good recording you can extract the reverberation time, the frequency response, and the resonant modes: the specific frequencies at which the room reinforces sound rather than absorbing it. Those modes are not mystical. They are a function of dimensions and material, in the same way that the length of an organ pipe determines its pitch.
          </p>
          <p className="fn-body">
            What the published measurements show is consistent enough to be interesting. Iegor Reznikoff and Michel Dauvois, working in French painted caves, reported that Palaeolithic imagery is disproportionately concentrated in the acoustically resonant parts of those caves. Aaron Watson and David Keating measured megalithic monuments in prehistoric Britain, including Camster Round, and documented pronounced low-frequency behaviour inside chambered structures. Paul Devereux and colleagues extended site measurement across Britain and Ireland and argued, in{" "}
            <em>Stone Age Soundtracks</em> and in the acoustics literature, that Neolithic chambers cluster in a narrow band of resonant frequencies. The single most-cited case is the Oracle Chamber of the Ħal-Saflieni Hypogeum in Malta, a Neolithic limestone complex where the resonance is strong enough that a chanting male voice becomes physically uncomfortable.
          </p>
          <p className="fn-body">
            So the discipline has an established core: ancient enclosed stone spaces can be measured, they behave in describable ways, and some of them behave dramatically. That is the part that survives scrutiny. The specific numbers are covered separately in the{" "}
            <Link href="/field-notes/111-hz" style={{ color: "var(--gold)" }}>
              111 Hz Field Note
            </Link>
            , which deals with the frequency band these measurements keep landing in.
          </p>
        </>
      }
      pattern={
        <>
          <p className="fn-body">
            Everything difficult about archaeoacoustics lives in one word: intentionality. A measurement tells you that a chamber resonates. It cannot tell you whether anyone wanted it to. There are three explanations for every result the field produces, and the data rarely distinguishes between them — the builders designed for the acoustic effect; the builders noticed the effect after the fact and kept building that way; or the effect is an unavoidable byproduct of enclosing space with stone at the scale of a human body. All three predict the same spectrograph.
          </p>
          <p className="fn-body">
            This is why serious archaeoacoustic papers are so heavily hedged, and it is also why the field has been so thoroughly misrepresented outside the literature. A measured resonance is a modest, defensible finding. Somewhere between the journal and the search results it becomes a claim that ancient priesthoods engineered consciousness-altering chambers, which the research does not support and does not attempt to support. The wellness and consciousness literature in particular has built a large edifice on a small foundation, and it tends to cite the acoustic measurements accurately while citing the neurological claims not at all.
          </p>
          <p className="fn-body">
            The interesting position, and the one this site tries to hold, is that the gap is real and does not need inflating. Ancient people built precisely. They built for ritual. Sound mattered to ritual in nearly every documented tradition. And the rooms they left behind demonstrably do things to the voice. None of that adds up to proof of acoustic engineering, and all of it is more than enough to make the question worth asking. The{" "}
            <Link href="/field-notes/cymatics" style={{ color: "var(--gold)" }}>
              cymatics Field Note
            </Link>{" "}
            covers the related question of what sound does to matter, which has a firmer experimental basis and a similar history of overstatement.
          </p>
        </>
      }
      fiction={
        <>
          <p className="fn-body">
            The trilogy takes the gap and fills it, which is what fiction is for. In the novels, archaeoacoustics is not a cautious subfield producing hedged papers — it is the discipline that accidentally rediscovers a system. Eva Černá&apos;s work on the Strahov crypt circulates as a legitimate paper in a legitimate journal, and it is that paper, not any conspiracy, that brings Dr. Kofi Asante of the University of Ghana into the story: he has been measuring caves in the Volta Region and his numbers match hers to within two percent.
          </p>
          <p className="fn-body">
            That is the fictional move, stated plainly. The real field measures individual sites and declines to generalise. The trilogy&apos;s version measures individual sites and finds that they agree — that a crypt in Prague, a limestone mine under Kansas City, and six laterite caves in Ghana are all reporting the same figure, and that the agreement is the discovery. No such correspondence exists in the literature. The sites are real, the measurements in the novels are modelled on real ones, and the system connecting them is invented.
          </p>
        </>
      }
      excerpt={{
        paragraphs: [
          '"I am a professor of archaeoacoustics who measures caves with lasers. My grandfather measured caves with his ears. We get the same numbers."',
        ],
        attribution: "Masters X: The Grimoire",
      }}
      bookHref="/books/masters-x/the-grimoire"
      faqs={faqs}
      relatedNotes={related}
    />
  );
}

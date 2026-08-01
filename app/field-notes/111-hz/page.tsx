import FieldNoteLayout from "@/components/field-notes/FieldNoteLayout";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "111 Hz: The Frequency Ancient Builders Kept Choosing",
  description:
    "111 Hz is a standing-wave frequency documented by acoustic researchers in stone chambers from the Ħal-Saflieni Hypogeum in Malta to caves in Ghana. Here is the documented research — and the trilogy built on it.",
  socialTitle: "111 Hz: The Frequency Ancient Builders Kept Choosing | Field Notes",
  socialDescription:
    "The Ħal-Saflieni Hypogeum, Lascaux, Chartres, the Volta Region caves of Ghana. Acoustic researchers have documented a recurring resonant frequency across ancient stone structures. This is the honest explainer.",
  path: "/field-notes/111-hz/",
  ogType: "article",
  image: {
    url: "https://jasoncholloway.com/og/field-notes/111-hz.png",
    width: 1024,
    height: 1024,
    alt: "Illustration: waveform diagram etched like a medieval manuscript",
  },
});

const faqs = [
  {
    q: "Why do ancient temples resonate at 111 Hz?",
    a: "The short answer is: we don't fully know. The documented fact is that acoustic researchers — most notably Dr. Aaron Watson and David Keating at Camster Round, and later teams at Ħal-Saflieni — have measured resonant frequencies in the 95–120 Hz range in multiple ancient stone enclosures. Whether this was intentional design or architectural coincidence is actively debated. The honest answer is that no definitive explanation exists.",
  },
  {
    q: "What does 111 Hz do to the brain?",
    a: "This question is more contested than most 111 Hz content online suggests. Some researchers have reported that low-frequency resonance in enclosed spaces can produce measurable neurological effects, including altered EEG patterns. Popular press has amplified these findings significantly beyond what the research supports. The trilogy treats the effect as real and significant within its fictional framework, while the Field Note presents the actual research accurately.",
  },
  {
    q: "What is the Ħal-Saflieni Hypogeum?",
    a: "The Ħal-Saflieni Hypogeum is an underground Neolithic temple in Malta, carved from limestone approximately 3600–2500 BCE. It is a UNESCO World Heritage Site. The Oracle Chamber within the Hypogeum is the location most associated with the 111 Hz resonance research. Access is tightly controlled — only 80 visitors per day are permitted.",
  },
  {
    q: "What is archaeoacoustics?",
    a: "Archaeoacoustics is the study of the acoustic properties of ancient sites — caves, megalithic structures, temples. Researchers in the field record and analyze the resonant frequencies, reverberation times, and sound behavior of prehistoric and historic built environments to understand whether acoustic properties were designed or incidental.",
  },
];

const related = [
  { href: "/field-notes/subtropolis", label: "SubTropolis, Kansas City", theme: "Beneath Kansas City" },
  { href: "/field-notes/strahov-monastery", label: "The Strahov Library, Prague", theme: "The Sites" },
  { href: "/field-notes/cymatics", label: "Cymatics: Sound Made Visible", theme: "The Frequency" },
  { href: "/field-notes/gospel-of-thomas", label: "Saying 113: Gospel of Thomas", theme: "The Manuscripts" },
];

export default function HzNote() {
  return (
    <FieldNoteLayout
      slug="111-hz"
      title="111 Hz: The Frequency Ancient Builders Kept Choosing"
      titleTag="111 Hz: The Frequency Ancient Builders Kept Choosing"
      theme="The Frequency"
      lede="Acoustic researchers have documented a recurring resonant frequency — approximately 110 to 112 Hz — in stone chambers ranging from Neolithic caves in Malta to Palaeolithic painted caves in France to underground rock-cut temples in India. The pattern is real and measured. Whether it was intentional is genuinely debated. This is the most honest account of that research you will find."
      record={
        <>
          <p className="fn-body">
            The most frequently cited source for the 111 Hz claim is research conducted at the Ħal-Saflieni Hypogeum in Malta — a Neolithic limestone temple complex dating to approximately 3600–2500 BCE, now a UNESCO World Heritage Site. In the Oracle Chamber of the Hypogeum, researchers have documented a pronounced resonant frequency around 110–111 Hz. The chamber&apos;s geometry — a roughly oval space with a curved limestone ceiling — produces strong standing waves at this frequency; male voices chanting in this range create a particularly intense reverberant effect.
          </p>
          <p className="fn-body">
            Dr. Paul Devereux, a researcher in archaeoacoustics, and colleagues systematically measured resonant frequencies at multiple megalithic sites across Britain and Ireland. Their work, summarized in the journal{" "}
            <a href="https://doi.org/10.1121/1.414642" target="_blank" rel="noopener noreferrer">
              <em>Journal of the Acoustical Society of America</em>
            </a>{" "}
            and in Devereux&apos;s book <em>Stone Age Soundtracks</em>, found that Neolithic chambers — including chambered tombs and stone circles — consistently produced peak resonant frequencies in the 95–120 Hz range. Devereux hypothesized that these chambers may have been designed, at least in part, for their acoustic properties.
          </p>
          <p className="fn-body">
            The Lascaux caves in the Dordogne region of France — site of Palaeolithic paintings dating to approximately 17,000 years ago — have also been acoustically analyzed. Researchers including Iegor Reznikoff and Michel Dauvois observed that cave paintings in Lascaux and other painted caves are disproportionately located in areas of high acoustic resonance. Their published findings (in the <em>Bulletin de la Société Préhistorique Française</em>, 1988) suggested that sound may have been a meaningful component of whatever ritual or cognitive purpose these spaces served. This finding is compelling but not universally accepted; mainstream archaeology remains cautious about functional interpretations of decorative cave art.
          </p>
          <p className="fn-body">
            Claims about 111 Hz and specific neurological effects (particularly claims about the deactivation of the prefrontal cortex and the activation of spiritual states) circulate widely in wellness and consciousness communities. These claims are significantly less well-supported than the underlying acoustic data. UCLA has been cited in popular press in connection with neuroimaging studies of resonance; the specific claims are difficult to verify in the primary literature. This Field Note presents only what the published research actually claims.
          </p>
        </>
      }
      pattern={
        <>
          <p className="fn-body">
            The unresolved question is intentionality. The acoustic properties of stone chambers at these frequencies are a function of geometry and material — limestone at roughly 25-foot scales produces standing waves in this range the way a pipe organ pipe of a given length produces a given pitch. Did Neolithic builders consciously design for this? Did they discover it empirically and build in response to it? Or is it coincidental — the byproduct of building with stone in enclosed spaces of human scale?
          </p>
          <p className="fn-body">
            The honest answer, in 2026, is that the archaeological record does not resolve this question. What the record does show is that ancient human beings were capable of building complex, precisely engineered structures; that they used these structures for ritual purposes; and that sound was a meaningful component of many ancient ritual traditions worldwide. The gap between what we can measure and what we can explain is exactly the kind of gap that serious fiction occupies.
          </p>
          <p className="fn-body">
            The{" "}
            <Link href="/chamber/harmonic-stack" style={{ color: "var(--gold)" }}>
              Harmonic Stack in the Analysis Chamber
            </Link>{" "}
            lets you explore the 111.2 Hz frequency and its derivations (444.8 Hz, 222.4 Hz, 55.6 Hz) as an interactive instrument. The data underlying it is real.
          </p>
        </>
      }
      fiction={
        <>
          <p className="fn-body">
            The trilogy makes a specific argument about 111 Hz that goes beyond the documented research. In the novels, the frequency is not merely a resonant property of certain chambers — it is a standing wave produced by the earth itself, present in every appropriately dimensioned stone enclosure, and capable of producing specific cognitive effects in a prepared organism. The preparation protocol, the 52-week sequence documented in the Ars Notoria and recovered from the Strahov Library, is the fiction&apos;s account of what ancient practitioners understood that contemporary acoustics does not.
          </p>
          <p className="fn-body">
            The chapter-header frequency system in the trilogy is mapped directly onto the real data: 109 Hz (SubTropolis Kansas City limestone) → 111.2 Hz (Strahov Monastery crypt) → 3.915 Hz (Iceland basalt) → 7.83 Hz (Schumann resonance). Each frequency is documented; the fiction is the claim that they form a coherent system.
          </p>
        </>
      }
      excerpt={{
        paragraphs: [
          '"The frequency is geological. Every stone chamber on earth with appropriate mineral composition and dimensions produces a standing wave in the range of 110 to 112 hertz. This is not a discovery, it is a measurement. The frequency has been present in every stone structure since the Paleolithic. The caves at Lascaux produce it. The Hypogeum of Ħal-Saflieni produces it. The crypt at Strahov Monastery produces it. The laterite caves of the Volta Region in Ghana produce it. The earth has been broadcasting this frequency continuously since its formation."',
        ],
        attribution: "Masters X: The Kingdom",
      }}
      bookHref="/books/masters-x/the-inheritance-of-frequency"
      faqs={faqs}
      relatedNotes={related}
    />
  );
}

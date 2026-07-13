import FieldNoteLayout from "@/components/field-notes/FieldNoteLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Ars Notoria: The Medieval 'Notory Art' That Promised Instant Knowledge",
  description:
    "The Ars Notoria is a real thirteenth-century manuscript held in the British Library and the Bibliothèque nationale de France. It promises, through structured visual contemplation and prayer, the rapid acquisition of the seven liberal arts. Most scholars call it superstition. A minority call it cognitive technology.",
  alternates: { canonical: "https://jasoncholloway.com/field-notes/ars-notoria/" },
  openGraph: {
    title: "The Ars Notoria: The Medieval 'Notory Art' That Promised Instant Knowledge | Field Notes",
    description:
      "A real thirteenth-century manuscript promising the rapid acquisition of knowledge through geometric figures called notae. The Inquisition condemned it. Cognitive scientists find it surprisingly familiar.",
    url: "https://jasoncholloway.com/field-notes/ars-notoria/",
    images: [
      {
        url: "https://jasoncholloway.com/og/field-notes/ars-notoria.png",
        width: 1200,
        height: 630,
        alt: "Illustration: a medieval geometric nota diagram from the Ars Notoria",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is the Ars Notoria real?",
    a: "Yes. It is a real thirteenth-century manuscript held in multiple institutional collections including the British Library and the Bibliothèque nationale de France. Modern scholarly editions exist. It belongs to the Solomonic tradition of medieval learned magic.",
  },
  {
    q: "What does the Ars Notoria promise?",
    a: "The text promises the acquisition of the seven liberal arts — grammar, rhetoric, logic, arithmetic, geometry, music, astronomy — through structured contemplation of geometric figures called notae combined with specific prayers and a prescribed schedule of practice.",
  },
  {
    q: "Is the Ars Notoria dangerous?",
    a: "The manuscript was condemned by the medieval Inquisition and by Albertus Magnus, which tells us how seriously it was taken. Modern readers are unlikely to find it dangerous; they may find it strange, beautiful, or fascinating depending on their prior assumptions about medieval cognition.",
  },
  {
    q: "Is the Ars Notoria connected to the Voynich Manuscript?",
    a: "In the Masters X Trilogy, yes — Nadia's central discovery is that the Voynich Manuscript, the Ars Notoria, and the Codex Gigas are three expressions of a common system. This is the novel's invention, not documented scholarship.",
  },
];

const related = [
  { href: "/field-notes/voynich-manuscript", label: "The Voynich Manuscript", theme: "The Manuscripts" },
  { href: "/field-notes/codex-gigas", label: "The Codex Gigas", theme: "The Manuscripts" },
  { href: "/field-notes/strahov-monastery", label: "The Strahov Library", theme: "The Sites" },
];

export default function ArsNotoriaNote() {
  return (
    <FieldNoteLayout
      slug="ars-notoria"
      title="The Ars Notoria: The Medieval 'Notory Art' That Promised Instant Knowledge"
      titleTag="The Ars Notoria: The Medieval 'Notory Art' That Promised Instant Knowledge"
      theme="The Manuscripts"
      lede="The Ars Notoria is a real thirteenth-century manuscript, present in institutional collections worldwide. It belongs to the Solomonic tradition of magical texts and promises, through structured visual contemplation and prayer, the rapid acquisition of knowledge, memory, and eloquence. Most scholars have treated it as superstition. A minority have treated it as cognitive technology."
      record={
        <>
          <p className="fn-body">
            The Ars Notoria ("the Notory Art") belongs to the Solomonic tradition — a body of medieval texts attributed, at least nominally, to the biblical King Solomon. The earliest manuscripts date to the mid-thirteenth century. The text instructs its reader to contemplate geometric figures called <em>notae</em> — complex diagrams bearing prayers in Latin, Hebrew, Greek, and occasionally unknown scripts — while reciting specific prayers over a prescribed schedule. The goal is the acquisition of the seven liberal arts (grammar, rhetoric, logic, arithmetic, geometry, music, and astronomy) with unusual speed and retention.
          </p>
          <p className="fn-body">
            The manuscript is held in multiple institutional collections including the British Library (MS Sloane 1712) and the Bibliothèque nationale de France. A modern critical edition and translation by Julian Veenstra was published by Brill in 1998. A more accessible translation by J. H. Peterson was published as <em>The Notory Art of Solomon</em> (2019, including the 1657 Robert Turner translation). The notae themselves are striking objects — dense, elaborate diagrams that appear to combine visual contemplation with structured memorization schedules.
          </p>
          <p className="fn-body">
            Sources: Veenstra, Jan R. <em>Magic and Divination at the Courts of Burgundy and France</em> (Brill, 1998); Peterson, J. H. <em>The Notory Art of Solomon</em> (2019); British Library MS Sloane 1712.
          </p>
        </>
      }
      pattern={
        <>
          <p className="fn-body">
            The text's mechanism — extended periods of visual contemplation combined with structured repetition and specific physical postures — maps surprisingly well onto what cognitive science calls "elaborative encoding" and spaced-repetition learning, though the manuscript predates these frameworks by seven centuries. Whether this represents genuine empirical discovery by medieval practitioners, sophisticated coincidence, or something else is unknown.
          </p>
          <p className="fn-body">
            The Ars Notoria was condemned by the Inquisition and Albertus Magnus in the thirteenth century — which is either evidence of its heterodoxy or evidence of its perceived efficacy, depending on how you read medieval institutional responses. Institutions rarely mobilize against texts they consider trivial. The vehemence of the condemnation suggests the manuscript was circulating widely and was being taken seriously by readers who had the resources to commission copies.
          </p>
        </>
      }
      fiction={
        <>
          <p className="fn-body">
            In <em>The Inheritance of Frequency</em>, Nadia — the trilogy's linguist and primary decoder — treats the Ars Notoria not as a grimoire but as a technical manual. Her argument, which the novel develops over two volumes, is that the <em>notae</em> are interfaces: specifically calibrated visual objects designed to produce measurable neurological states in sufficiently prepared observers. The preparation schedule described in the manuscript — its fasting requirements, its posture instructions, its prayer sequences — is, in her reading, a protocol for reaching a specific frequency of cortical coherence before engaging the figures.
          </p>
          <p className="fn-body">
            This is the trilogy's invention, not documented scholarship. The manuscript is real. Nadia's interpretation of it is the novel.
          </p>
        </>
      }
      excerpt={{
        paragraphs: [
          "\"Do you know what the Ars Notoria is?\" she asked.",
          "\"A medieval grimoire. Remembrance, enhancement, eloquence. Most scholars consider it superstitious nonsense.\"",
          "\"Most scholars are wrong.\" Nadia traced her finger along one of the geometric figures. \"The Ars Notoria isn't magic. It's technology. Cognitive technology. These figures. The notae. Are interfaces. Tools for accessing parts of presence that are normally dormant.\"",
        ],
        attribution: "Masters X: The Inheritance of Frequency",
      }}
      bookHref="/books/masters-x/the-inheritance-of-frequency"
      faqs={faqs}
      relatedNotes={related}
    />
  );
}

import FieldNoteLayout from "@/components/field-notes/FieldNoteLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saying 113: 'The Kingdom Is Spread Upon the Earth, and People Do Not See It'",
  description:
    "The Gospel of Thomas is a real first-century text discovered at Nag Hammadi, Egypt in 1945. It contains 114 sayings attributed to Jesus, with no narrative, no miracles, no resurrection — only words. Saying 113 is the sentence Volume III of the Masters X Trilogy is built on.",
  alternates: { canonical: "https://jasoncholloway.com/field-notes/gospel-of-thomas/" },
  openGraph: {
    title: "Saying 113: 'The Kingdom Is Spread Upon the Earth, and People Do Not See It' | Field Notes",
    description:
      "Discovered at Nag Hammadi, Egypt, 1945. 114 sayings. No miracles, no resurrection. Saying 113: the kingdom is already here, spread upon the earth — and people don't see it. Volume III of Masters X is built on this sentence.",
    url: "https://jasoncholloway.com/field-notes/gospel-of-thomas/",
    images: [
      {
        url: "https://jasoncholloway.com/og/field-notes/gospel-of-thomas.png",
        width: 1200,
        height: 630,
        alt: "Illustration: Coptic manuscript page from the Nag Hammadi library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saying 113: 'The Kingdom Is Spread Upon the Earth, and People Do Not See It'",
    description:
      "Discovered at Nag Hammadi, 1945. 114 sayings. No miracles. Saying 113: the kingdom is already here — and people don't see it. Volume III of Masters X is built on this sentence.",
    images: [{ url: "https://jasoncholloway.com/og/field-notes/gospel-of-thomas.png", alt: "Illustration: Coptic manuscript page from the Nag Hammadi library" }],
  },
};

const faqs = [
  {
    q: "Is the Gospel of Thomas part of the Bible?",
    a: "No. The Gospel of Thomas is not included in the canonical New Testament. It was discovered in 1945 at Nag Hammadi, Egypt, as part of a collection of early Christian and Gnostic texts. It is considered apocryphal.",
  },
  {
    q: "What is Saying 113 of the Gospel of Thomas?",
    a: "Saying 113 reads: His disciples asked when the kingdom would come. Jesus replied that it would not come by watching for it — that it would not be located here or there — but that the Father's kingdom is spread upon the earth, and people do not see it.",
  },
  {
    q: "When was the Gospel of Thomas written?",
    a: "Most scholars date the underlying Greek text to the first or second century CE, with estimates ranging from approximately 50–140 CE. The surviving Coptic manuscript from Nag Hammadi dates to the fourth century.",
  },
  {
    q: "How is the Gospel of Thomas connected to Masters X?",
    a: "Volume III of the Masters X Trilogy, The Kingdom, is structured around Saying 113 — the argument that the kingdom is present, immanent, and perceptible if the conditions for perception are met. The preparation protocol of the trilogy is the fiction's account of what those conditions are.",
  },
];

const related = [
  { href: "/field-notes/111-hz", label: "111 Hz: The Frequency", theme: "The Frequency" },
  { href: "/field-notes/ars-notoria", label: "The Ars Notoria", theme: "The Manuscripts" },
  { href: "/field-notes/voynich-manuscript", label: "The Voynich Manuscript", theme: "The Manuscripts" },
];

export default function GospelOfThomasNote() {
  return (
    <FieldNoteLayout
      slug="gospel-of-thomas"
      title="Saying 113: 'The Kingdom Is Spread Upon the Earth, and People Do Not See It'"
      titleTag="Saying 113: 'The Kingdom Is Spread Upon the Earth, and People Do Not See It'"
      theme="The Manuscripts"
      lede="The Gospel of Thomas is a real first-century text discovered at Nag Hammadi, Egypt in 1945. It contains 114 sayings attributed to Jesus, with no narrative, no miracles, no resurrection — only words. Saying 113 reads: 'The kingdom of God is spread upon the earth, and people do not see it.' Volume III of the Masters X Trilogy is built on this sentence."
      record={
        <>
          <p className="fn-body">
            The Gospel of Thomas was discovered in December 1945 at Nag Hammadi in Upper Egypt, as part of a collection of twelve leather-bound codices buried in the fourth century CE. The codices were written in Coptic, a late form of Egyptian, but the Gospel of Thomas is generally considered a translation of an earlier Greek text. Most scholars date the original composition to the first or second century CE, with the most common scholarly estimate being the second half of the first century — contemporary with, or slightly later than, the canonical Gospel of John.
          </p>
          <p className="fn-body">
            The Gospel of Thomas is a sayings gospel — it contains 114 aphorisms attributed to Jesus, without narrative framing, without miracles, and without an account of the Passion or Resurrection. Many of the sayings parallel passages in the synoptic gospels (Matthew, Mark, Luke); others are unique to Thomas. Saying 113 in the standard numbering reads: <em>"His disciples said to him, 'When will the kingdom come?' Jesus said, 'It will not come by watching for it. It will not be said, Look here! or Look there! Rather, the Father's kingdom is spread out upon the earth, and people don't see it.'"</em>
          </p>
          <p className="fn-body">
            The Gospel of Thomas was not included in the canonical New Testament; it is considered apocryphal by mainstream Christianity and canonical or important in various Gnostic traditions. Major scholarly translations include those by Thomas O. Lambdin (in <em>The Nag Hammadi Library in English</em>, 1977) and Marvin Meyer.
          </p>
          <p className="fn-body">
            Sources: <em>The Nag Hammadi Library in English</em> (ed. James Robinson, HarperOne, 1977); <em>The Nag Hammadi Scriptures</em> (ed. Marvin Meyer, HarperOne, 2007).
          </p>
        </>
      }
      pattern={
        <>
          <p className="fn-body">
            The Gospel of Thomas's consistent theme is the immanence of the kingdom — its presence in the world as it is, unrecognized. This is distinct from the eschatological (end-times) reading of "the kingdom of God" dominant in mainstream Christianity. Thomas's Jesus does not announce the coming of a future kingdom; he points to a present condition that his listeners are not perceiving.
          </p>
          <p className="fn-body">
            Whether this represents an earlier tradition, an alternative tradition, or a later Gnostic development within Christianity is an active scholarly debate with no consensus resolution. For the Masters X Trilogy, the significance is direct: the "kingdom" the trilogy's third volume pursues is not supernatural or posthumous. It is present, here, in a frequency the earth has been broadcasting since its formation — and the preparation protocol is the fiction's answer to Thomas's implied question: what would it take to see what is already spread upon the earth?
          </p>
        </>
      }
      fiction={
        <>
          <p className="fn-body">
            <em>The Kingdom</em>, Volume III of the Masters X Trilogy, is structured as an extended engagement with Saying 113. Blake's completed preparation — the full protocol assembled from the Voynich Manuscript, the Ars Notoria, the Codex Gigas, the Strahov chamber, and the frequency data — is the trilogy's fictional answer to the saying's implied challenge: the kingdom is here, and people do not see it. The preparation, in the fiction, is what produces the capacity to see.
          </p>
          <p className="fn-body">
            The specific moment in the excerpt — Andrew reaching Saying 113 in the Gospel of Thomas, his hands stopping trembling — occurs after the climax of Volume II, as he begins to understand what the protocol is actually preparing its practitioners to perceive. The Gospel of Thomas, Saying 113, and the scholarly debates around it are real. Andrew's reading of it, and what he does next, are the trilogy's invention.
          </p>
        </>
      }
      excerpt={{
        paragraphs: [
          "Saying 113.",
          "He reached Saying 113, and his hands stopped trembling.",
          "Not the cessation of the 444.8 event, not the total cortical coherence, not the garment of glory, not the transcendent stillness of a body operating at a frequency it could not sustain. A simpler stopping. The stopping of a man who has been looking for something and finds it in the last place he would have thought to look, which is the place he has been standing the entire time.",
        ],
        attribution: "Masters X: The Grimoire",
      }}
      bookHref="/books/masters-x/the-kingdom"
      faqs={faqs}
      relatedNotes={related}
    />
  );
}

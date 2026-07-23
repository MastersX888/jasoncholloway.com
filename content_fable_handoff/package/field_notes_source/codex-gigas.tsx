import FieldNoteLayout from "@/components/field-notes/FieldNoteLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Devil's Bible: Why the Codex Gigas Was Made in Bohemia — and What Else Was",
  description:
    "The Codex Gigas — the Devil's Bible — is the largest surviving medieval manuscript in the world. Made in thirteenth-century Bohemia, owned by Emperor Rudolf II, seized by Sweden in 1648. The trilogy's prologue begins in Bohemia, 1267, forty years after its completion.",
  alternates: { canonical: "https://jasoncholloway.com/field-notes/codex-gigas/" },
  openGraph: {
    title: "The Devil's Bible: Why the Codex Gigas Was Made in Bohemia — and What Else Was | Field Notes",
    description:
      "92 cm tall, 75 kg, made by one monk over decades. Emperor Rudolf II owned it. The Swedish army took it in 1648. High-res scans are at codexgigas.se. The trilogy's prologue starts forty years after its completion.",
    url: "https://jasoncholloway.com/field-notes/codex-gigas/",
    images: [
      {
        url: "https://jasoncholloway.com/og/field-notes/codex-gigas.png",
        width: 1200,
        height: 630,
        alt: "Illustration: the full-page Devil illustration from the Codex Gigas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Devil's Bible: Why the Codex Gigas Was Made in Bohemia | Field Notes",
    description:
      "92 cm tall, 75 kg, made by one monk over decades. Emperor Rudolf II owned it. The Swedish army took it in 1648. The trilogy's prologue starts forty years after its completion.",
    images: [{ url: "https://jasoncholloway.com/og/field-notes/codex-gigas.png", alt: "Illustration: the full-page Devil illustration from the Codex Gigas" }],
  },
};

const faqs = [
  {
    q: "Where is the Codex Gigas now?",
    a: "The Codex Gigas has been in the National Library of Sweden (Kungliga biblioteket) in Stockholm since 1648, when it was taken from Prague as war booty during the Thirty Years War. High-resolution digital scans of the entire manuscript are available at codexgigas.se.",
  },
  {
    q: "Did one monk really write the entire Codex Gigas?",
    a: "The legend of Hermann the Recluse holds that a single monk created it in a single night with the Devil's assistance. Modern paleographic analysis confirms it was the work of a single scribe — which is genuinely remarkable — but over a period of decades, not one night. The legend is medieval, not historical.",
  },
  {
    q: "Who owned the Codex Gigas?",
    a: "The documented owners include the Benedictine monastery of Podlažice (where it was made), the Cistercian monastery of Sedlec, the Benedictine monastery of Broumov, and Emperor Rudolf II of Bohemia. After Rudolf, it went to his brother Emperor Matthias, then to the Benedictine abbey at Broumov, before being taken by the Swedish army in 1648.",
  },
  {
    q: "Is the Codex Gigas connected to the Voynich Manuscript?",
    a: "Only through the historical fact that both were owned by Emperor Rudolf II of Bohemia. No scholarly connection between the texts themselves has been established. The trilogy's claim that they share a common structural origin is a fictional invention.",
  },
];

const related = [
  { href: "/field-notes/voynich-manuscript", label: "The Voynich Manuscript", theme: "The Manuscripts" },
  { href: "/field-notes/ars-notoria", label: "The Ars Notoria", theme: "The Manuscripts" },
  { href: "/field-notes/strahov-monastery", label: "The Strahov Library", theme: "The Sites" },
];

export default function CodexGigasNote() {
  return (
    <FieldNoteLayout
      slug="codex-gigas"
      title="The Devil's Bible: Why the Codex Gigas Was Made in Bohemia — and What Else Was"
      titleTag="The Devil's Bible: Why the Codex Gigas Was Made in Bohemia — and What Else Was"
      theme="The Manuscripts"
      lede="The Codex Gigas — the Devil's Bible — is the largest surviving medieval manuscript in the world. It was made in early thirteenth-century Bohemia, reportedly by a single monk. Emperor Rudolf II owned it. The Swedish army took it from Prague in 1648. It now sits in the National Library of Sweden. The trilogy's prologue begins in Bohemia, 1267, forty years after its completion."
      record={
        <>
          <p className="fn-body">
            The Codex Gigas (Latin: "Giant Book") was produced at the Benedictine monastery of Podlažice in Bohemia (now the Czech Republic), dating to the early thirteenth century. It is approximately 92 cm tall, 50 cm wide, and 22 cm thick, and weighs about 75 kg. The manuscript contains the complete Latin Vulgate Bible, the works of Josephus, Isidore of Seville's <em>Etymologiae</em>, Cosmas of Prague's <em>Chronica Boëmorum</em>, and various medical and encyclopedic texts — essentially a complete library of knowledge of its time, assembled in a single volume. The manuscript's most distinctive illustration is a full-page image of the Devil — the source of its popular name.
          </p>
          <p className="fn-body">
            Tradition holds that it was produced by a single monk named Hermann the Recluse, who made a vow to produce the manuscript in a single night after breaking his monastic vows and being sentenced to be walled alive; he was assisted in this superhuman feat, according to legend, by the Devil himself. Modern paleographic analysis has concluded it was produced by a single scribe over a period of decades.
          </p>
          <p className="fn-body">
            Emperor Rudolf II of Bohemia acquired the Codex Gigas for his legendary collection at Prague Castle. The Swedish army, during the Thirty Years War, seized it from Prague as war booty in 1648 and brought it to Stockholm. It has been in the collections of the National Library of Sweden (<em>Kungliga biblioteket</em>) ever since, where it was displayed publicly for the first time in 2007. It is now accessible in full-resolution digital form at <a href="https://www.codexgigas.se" target="_blank" rel="noopener noreferrer">codexgigas.se</a>.
          </p>
          <p className="fn-body">
            Sources: <a href="https://www.kb.se/codex-gigas" target="_blank" rel="noopener noreferrer">National Library of Sweden</a>; Wikipedia: Codex Gigas.
          </p>
        </>
      }
      pattern={
        <>
          <p className="fn-body">
            Three manuscripts — the Voynich Manuscript, the Ars Notoria, and the Codex Gigas — share a single historical owner: Emperor Rudolf II of Bohemia. This is not a fictional claim; it is documented fact. Rudolf II (1552–1612) was one of the most extraordinary collectors of esoteric and occult materials in European history, reigning from Prague Castle and actively patronizing alchemists, astrologers, and scholars of the occult. The convergence of three enigmatic manuscripts in a single collection is the factual foundation the trilogy builds on.
          </p>
          <p className="fn-body">
            The Codex Gigas also connects to Uppsala, Sweden — where it has physically been since 1648. The trilogy's seven-city dispersal scheme in the prologue includes Uppsala. This is not coincidence; the author placed it where the real manuscript went.
          </p>
        </>
      }
      fiction={
        <>
          <p className="fn-body">
            The trilogy's prologue is set in Bohemia, 1267 — approximately forty years after the Codex Gigas was completed at Podlažice. The prologue's monk, Brother Aldric, is completing a different manuscript entirely — one that will be dispersed across seven cities before it can be reassembled. The Codex Gigas provides the prologue's historical texture: the parchment costs, the lamp black and iron gall ink, the physical reality of producing a manuscript of extraordinary scale in the thirteenth century.
          </p>
          <p className="fn-body">
            The specific manuscript Aldric is completing, its dispersal across seven cities, and its connection to the Voynich Manuscript and the Ars Notoria are entirely the trilogy's invention. The Codex Gigas, the monastery of Podlažice, and the documented history of the manuscript's long journey from Bohemia to Stockholm are exactly as the historical record shows.
          </p>
        </>
      }
      excerpt={{
        paragraphs: [
          "Restless candlelight guttered.",
          "Brother Aldric steadied his hand. Seven years. Two thousand, five hundred and fifty-six days of transcription. And now, in the small hours before Matins, each final figure.",
          "He dipped the quill in ink that had cost the monastery three months' tithes. Lamp black mixed with iron gall, thickened with dark arabic until it flowed like blood from a fresh wound. The parchment was calf vellum, scraped so thin that candlelight passed through it like stained glass. Forty calves had died for this manuscript. Aldric had blessed each one.",
        ],
        attribution: "Masters X: The Inheritance of Frequency (Prologue, Bohemia 1267)",
      }}
      bookHref="/books/masters-x/the-inheritance-of-frequency"
      faqs={faqs}
      relatedNotes={related}
    />
  );
}

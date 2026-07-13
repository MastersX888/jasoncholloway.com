import FieldNoteLayout from "@/components/field-notes/FieldNoteLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Voynich Manuscript, Rudolf II, and the Book No One Can Read",
  description:
    "The Voynich Manuscript is a real medieval codex at Yale's Beinecke Library — carbon-dated to the early 1400s, written in an undeciphered script, owned by Emperor Rudolf II of Bohemia. Here is the documented history.",
  alternates: { canonical: "https://jasoncholloway.com/field-notes/voynich-manuscript/" },
  openGraph: {
    title: "The Voynich Manuscript, Rudolf II, and the Book No One Can Read | Field Notes",
    description:
      "Carbon-dated to the early 1400s, undeciphered for 600 years, owned by Emperor Rudolf II of Bohemia — the same emperor whose Prague court the Masters X Trilogy reconstructs. The real history.",
    url: "https://jasoncholloway.com/field-notes/voynich-manuscript/",
    images: [{ url: "https://jasoncholloway.com/og/field-notes/voynich-manuscript.png", width: 1200, height: 630, alt: "Illustration: botanical and rosette motifs in the style of a medieval manuscript" }],
  },
};

const faqs = [
  {
    q: "Has the Voynich Manuscript been solved?",
    a: "No. As of 2026, no decipherment of the Voynich Manuscript is accepted by mainstream scholarship. Multiple claimed decipherments have been published, some receiving significant media attention, but none has survived peer review or produced verified translations of more than a few isolated words.",
  },
  {
    q: "Who owned the Voynich Manuscript?",
    a: "The most famous owner was Emperor Rudolf II of Bohemia (1552–1612), who reportedly purchased it for 600 gold ducats. After Rudolf's death it passed through several hands, eventually reaching the Collegio Romano in Rome. Wilfrid Voynich, the Polish bookseller for whom it is named, acquired it from the Jesuit library at Villa Mondragone in 1912. Yale University's Beinecke Library acquired it in 1969.",
  },
  {
    q: "What language is the Voynich Manuscript written in?",
    a: "The script has not been identified as any known language or cipher. Statistical analysis shows that it has the word-frequency distribution of a natural language, but no alphabet, no language, and no cipher system proposed to date has produced a convincing consistent decipherment.",
  },
  {
    q: "Is the Voynich Manuscript in the Masters X Trilogy?",
    a: "Yes. The Folio Visualizer in the Analysis Chamber displays 181 Voynich Manuscript folios alongside Ars Notoria notae figures. In The Inheritance of Frequency, Nadia discovers that the Voynich Manuscript, the Ars Notoria, and the Codex Gigas share a common underlying structure — a claim that is the trilogy's invention, not documented scholarship.",
  },
];

const related = [
  { href: "/field-notes/ars-notoria", label: "The Ars Notoria", theme: "The Manuscripts" },
  { href: "/field-notes/codex-gigas", label: "The Devil's Bible: Codex Gigas", theme: "The Manuscripts" },
  { href: "/field-notes/strahov-monastery", label: "The Strahov Library, Prague", theme: "The Sites" },
];

export default function VoynichNote() {
  return (
    <FieldNoteLayout
      slug="voynich-manuscript"
      title="The Voynich Manuscript, Rudolf II, and the Book No One Can Read"
      titleTag="The Voynich Manuscript, Rudolf II, and the Book No One Can Read"
      theme="The Manuscripts"
      lede="The Voynich Manuscript is a real medieval document, carbon-dated to the early fifteenth century, written entirely in an undeciphered script that has resisted 600 years of analysis. It sits in Yale University's Beinecke Rare Book & Manuscript Library as MS 408. No one knows what it says. One of its most famous owners was Emperor Rudolf II of Bohemia — the same emperor whose Prague court the Masters X Trilogy reconstructs."
      record={
        <>
          <p className="fn-body">
            The manuscript now called the Voynich Manuscript — Beinecke MS 408 — is a small codex of approximately 240 vellum pages, written in an unidentified script and illustrated with botanical drawings, astronomical diagrams, figures, and geometric rosettes. Radiocarbon dating conducted at the University of Arizona in 2009 dated the vellum to approximately 1404–1438. This means the manuscript was produced in the early fifteenth century, though whether it was written then or inscribed on older vellum is unknown.
          </p>
          <p className="fn-body">
            The manuscript&apos;s provenance before the seventeenth century is fragmentary. The earliest clearly documented reference is a letter from 1666, written by Georg Baresch, a Prague alchemist who had owned it for many years and was puzzled by it. Baresch believed the manuscript might contain ancient Egyptian secrets written in cipher. He sent a copy of some pages to Athanasius Kircher, the Jesuit polymath in Rome, seeking help — Kircher did not provide a solution.
          </p>
          <p className="fn-body">
            The connection to Emperor Rudolf II of Bohemia (1552–1612) comes from the same letter chain. Rudolf was one of the most avid collectors of rarities and occult manuscripts in European history, and an earlier letter in the Baresch-Kircher correspondence mentions that Rudolf II had purchased the manuscript for 600 gold ducats — a substantial sum suggesting it was considered significant. Rudolf&apos;s collection at Prague Castle was legendary: he amassed astronomical instruments, automata, alchemical laboratories, animals, paintings by Dürer and Arcimboldo, and one of the greatest libraries of esoteric manuscripts in Europe. This is the court the Masters X Trilogy reconstructs. The Codex Gigas — the Devil&apos;s Bible, another real manuscript, another note in this series — was also part of Rudolf&apos;s collection.
          </p>
          <p className="fn-body">
            Wilfrid Voynich, a Polish-Lithuanian antiquarian bookseller based in London, acquired the manuscript in 1912 from the Jesuit library at Villa Mondragone in Frascati, Italy. He named it — as happens with mysterious manuscripts — after himself. After his death, it passed through several hands until 1969, when Yale&apos;s Beinecke Rare Book and Manuscript Library acquired it as Beinecke MS 408. High-resolution scans of all folios are available online at the Beinecke&apos;s digital collections.
          </p>
          <p className="fn-body">
            Sources:{" "}
            <a href="https://beinecke.library.yale.edu/collections/highlights/voynich-manuscript" target="_blank" rel="noopener noreferrer">Beinecke Library</a>;{" "}
            <a href="https://en.wikipedia.org/wiki/Voynich_manuscript" target="_blank" rel="noopener noreferrer">Wikipedia: Voynich Manuscript</a>;{" "}
            <a href="https://www.sciencedirect.com/science/article/pii/S1040618213007982" target="_blank" rel="noopener noreferrer">Radiocarbon dating study (2011)</a>.
          </p>
        </>
      }
      pattern={
        <>
          <p className="fn-body">
            The Voynich Manuscript&apos;s resistance to decipherment is genuinely strange. Statistical analysis has confirmed that the text obeys Zipf&apos;s law — the word-frequency distribution characteristic of natural languages — which rules out simple random generation. Some patterns resemble natural-language syntax. But no proposed key has produced translations that make consistent sense. The most sophisticated computational and cryptographic methods available in 2026, including approaches using machine learning, have not solved it.
          </p>
          <p className="fn-body">
            This opens three possibilities, none of which has been ruled out: the manuscript is a real text in an unknown language or invented language; it is a sophisticated hoax designed to appear meaningful while containing none; or it uses a cipher system that has not yet been identified. The Rudolf II connection adds a fourth dimension — Rudolf was a patron of alchemists and astrologers and a collector of genuine rarities. His paying 600 ducats for it suggests it was either genuinely significant to him or a very convincing fraud.
          </p>
          <p className="fn-body">
            The botanical illustrations are particularly interesting: many of the plants depicted do not correspond to any identified real species. They are not clearly symbolic heraldic plants; they appear to be biological illustrations of something. What something is unknown.
          </p>
        </>
      }
      fiction={
        <>
          <p className="fn-body">
            The Folio Visualizer in the{" "}
            <a href="/chamber/folio-visualizer" style={{ color: "var(--gold)" }}>Analysis Chamber</a>{" "}
            lets you explore 181 Voynich Manuscript folios alongside Ars Notoria notae. You can overlay, tessellate, and rotate them to see the geometric interference patterns Blake Masters sees in the trilogy. The manuscript itself is real; the interpretive framework the tool uses is the novel&apos;s.
          </p>
          <p className="fn-body">
            The trilogy&apos;s central claim about the Voynich Manuscript is that it is one of three manuscripts — alongside the Ars Notoria and the Codex Gigas — that are variations on a common original: a single system expressed in three different visual languages. This is Nadia&apos;s discovery in <em>The Inheritance of Frequency</em>. It is a fictional claim. No such relationship has been documented in scholarship.
          </p>
          <p className="fn-body">
            The Rudolf II connection, however, is entirely factual: he owned both the Voynich Manuscript and the Codex Gigas, the two other manuscripts in the trilogy&apos;s triad. That convergence of real ownership is the historical fact the fiction is built on.
          </p>
        </>
      }
      excerpt={{
        paragraphs: [
          "He pulled up a three-column display. Ars Notoria fragments on the left. Voynich manuscript scans in the middle. Codex Gigas reproductions on the right. The same proportional relationships. The same underlying structure expressed in three different visual languages.",
          '"They match," Blake said.',
          '"Better than match." Andrew zoomed into a seven-fold rosette appearing in all three. "Strip away the surface differences and it\'s the same figure. Same proportions. Same mathematical relationships. Every algorithm returned the same result: these three images are copies of a common original."',
          "Nadia had been standing behind them. Now she moved forward, and what she said next changed everything.",
          '"They\'re not three manuscripts. They\'re one system."',
        ],
        attribution: "Masters X: The Inheritance of Frequency",
      }}
      bookHref="/books/masters-x/the-inheritance-of-frequency"
      faqs={faqs}
      relatedNotes={related}
    />
  );
}

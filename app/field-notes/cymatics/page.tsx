import FieldNoteLayout from "@/components/field-notes/FieldNoteLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cymatics: Sound You Can See",
  description:
    "Cymatics is the study of visible sound — the geometric patterns that sound waves create in physical matter at specific frequencies. Ernst Chladni first documented the phenomenon in the eighteenth century. Hans Jenny extended it in the twentieth. The patterns are real, reproducible, and geometrically striking.",
  alternates: { canonical: "https://jasoncholloway.com/field-notes/cymatics/" },
  openGraph: {
    title: "Cymatics: Sound You Can See | Field Notes",
    description:
      "Sand on a metal plate. A violin bow at the edge. Resonant frequency. Geometric patterns emerge from nowhere — hexagons, stars, mandalas. Ernst Chladni documented it in 1787. The physics hasn't changed.",
    url: "https://jasoncholloway.com/field-notes/cymatics/",
    images: [
      {
        url: "https://jasoncholloway.com/og/field-notes/cymatics.png",
        width: 1200,
        height: 630,
        alt: "Illustration: cymatics patterns — geometric figures in sand on a vibrating plate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cymatics: Sound You Can See | Field Notes",
    description:
      "Sand on a metal plate. A violin bow at the edge. Resonant frequency. Geometric patterns emerge from nowhere — hexagons, stars, mandalas. Ernst Chladni documented it in 1787.",
    images: [{ url: "https://jasoncholloway.com/og/field-notes/cymatics.png", alt: "Illustration: cymatics patterns — geometric figures in sand on a vibrating plate" }],
  },
};

const faqs = [
  {
    q: "What is cymatics?",
    a: "Cymatics is the study of visible sound patterns — the geometric shapes that appear in sand, powder, or liquid when a surface is vibrated at specific frequencies. The term was coined by Swiss physician Hans Jenny in the 1960s, building on Ernst Chladni's eighteenth-century experiments.",
  },
  {
    q: "What are Chladni figures?",
    a: "Chladni figures are the patterns produced when fine sand on a vibrating plate moves to the nodal lines — the stationary areas of the plate at resonant frequencies. They were first systematically documented by Ernst Chladni in 1787. Different frequencies produce different patterns.",
  },
  {
    q: "Is cymatics real science?",
    a: "Yes. The underlying physics is real and well-documented — Chladni figures are reproducible in any physics laboratory. Some claims made in popular cymatics content (especially about healing effects of specific frequencies on biological systems) go beyond what the research demonstrates and should be evaluated skeptically.",
  },
  {
    q: "Does 111 Hz produce a specific cymatics pattern?",
    a: "The Chladni pattern produced by 111 Hz depends on the material, geometry, and size of the vibrating surface. The hexagonal pattern described in The Grimoire for the Strahov chamber is the trilogy's fictional specification; the physics is real, the specific pattern at Strahov is invented.",
  },
];

const related = [
  { href: "/field-notes/111-hz", label: "111 Hz: The Frequency", theme: "The Frequency" },
  { href: "/field-notes/subtropolis", label: "SubTropolis, Kansas City", theme: "Beneath Kansas City" },
  { href: "/field-notes/gospel-of-thomas", label: "Gospel of Thomas", theme: "The Manuscripts" },
];

export default function CymaticsNote() {
  return (
    <FieldNoteLayout
      slug="cymatics"
      title="Cymatics: Sound You Can See"
      titleTag="Cymatics: Sound You Can See"
      theme="The Frequency"
      lede="Cymatics is the study of visible sound — the patterns that sound waves create in physical matter when vibrated at specific frequencies. Ernst Chladni, a German physicist, first documented the phenomenon in the eighteenth century using sand on metal plates. Hans Jenny extended the research in the twentieth century using liquids and fine powders. The patterns are real, reproducible, and geometrically striking. The pentagon pattern in the trilogy is the fictional detail; the physics is not."
      record={
        <>
          <p className="fn-body">
            Ernst Chladni (1756–1827), a German physicist, first systematically documented what are now called Chladni figures by drawing a violin bow across the edge of a metal plate covered with fine sand. At resonant frequencies, the sand moves to the nodal lines — the places where the plate is stationary — creating geometric patterns. Different frequencies produce different patterns: simple shapes at low frequencies, more complex geometries at higher ones. Chladni's patterns are reproducible by anyone with a metal plate, fine sand, and a bow or frequency generator.
          </p>
          <p className="fn-body">
            Hans Jenny (1904–1972), a Swiss physician and philosopher, extended Chladni's experiments in the 1960s using a wide range of materials — fine powders, liquids, pastes — and published his findings in a two-volume work titled <em>Kymatik</em> (1967 and 1972), later translated into English as <em>Cymatics</em>. Jenny coined the term "cymatics" for the study. His publications demonstrated that different frequencies produce distinctly different patterns in liquid and powder, and that these patterns can be complex and geometrically precise.
          </p>
          <p className="fn-body">
            Jenny's work is scientifically documented. Some of the claims made by subsequent cymatics enthusiasts — particularly claims about healing frequencies and specific resonance effects on water — go significantly beyond what Jenny's research demonstrates.
          </p>
          <p className="fn-body">
            Sources: Chladni, Ernst. <em>Entdeckungen über die Theorie des Klanges</em> (1787); Jenny, Hans. <em>Kymatik</em>, Vols. I–II (1967, 1972).
          </p>
        </>
      }
      pattern={
        <>
          <p className="fn-body">
            The Chladni figures at the 111–112 Hz range on a circular plate are visually striking — they tend toward hexagonal geometry, which is the most common close-packing pattern in nature (honeycombs, basalt columns, graphite). The frequency that produces hexagonal Chladni patterns on a circular plate of a given size and material depends on the plate's physical properties. Different materials and plate geometries produce different patterns at the same frequency.
          </p>
          <p className="fn-body">
            The five-sided (pentagonal) pattern Kofi Asante describes in <em>The Grimoire</em> is the trilogy's fictional specific; pentagonal symmetry in standing waves is rarer than hexagonal but can be produced under specific conditions. The encounter of two different cymatics traditions — the hexagonal Strahov pattern and Kofi's pentagonal African drum pattern — is the moment in Volume II where the trilogy's argument about a common underlying system becomes explicit.
          </p>
        </>
      }
      fiction={
        <>
          <p className="fn-body">
            In <em>The Grimoire</em>, Nadia has spent months mapping the Strahov chamber's resonant frequency — the specific frequency at which the chamber produces a stable standing-wave pattern. That pattern, in the trilogy's fiction, is hexagonal. When she encounters Kofi Asante's footage of West African traditional drumming producing a five-sided pattern in red laterite clay, she recognizes it as the same system — a different expression of the same underlying geometry, produced by a different instrument in a different culture, eight hundred years apart.
          </p>
          <p className="fn-body">
            The hexagonal Strahov pattern, the pentagonal African drum pattern, and Nadia's inference that they share a structural origin are entirely the trilogy's invention. The cymatics physics — Chladni figures, resonant frequencies, the dependence of pattern on material and geometry — is real.
          </p>
        </>
      }
      excerpt={{
        paragraphs: [
          "Nadia watched her water glass. The surface shuddered. Concentric rings appeared on the water, cymatics patterns.",
          "But not the Strahov pattern.",
          "The Strahov cymatics produced hexagons. She'd seen them in Andrew's documentation a hundred times. Clean, six-sided, the geometry of basalt columns and honeycombs and carbon molecules. The pattern of a frequency asserting order on a liquid surface.",
          "This was different. Concentric pentagons. Five-sided. A geometry she'd never seen in the Foundation's data. A pattern that was eight hundred years old, produced by drums and caves and red laterite clay.",
          "\"My grandfather called it 'speaking to the ground,'\" Kofi said. \"He said if you spoke correctly, the ground would answer.\"",
        ],
        attribution: "Masters X: The Grimoire",
      }}
      bookHref="/books/masters-x/the-grimoire"
      faqs={faqs}
      relatedNotes={related}
    />
  );
}

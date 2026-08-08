import Link from "next/link";
import type { Metadata } from "next";
import CompLandingLayout from "@/components/books/CompLandingLayout";
import { momentPath } from "@/lib/data/moments";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Books Like Foucault's Pendulum: The Masters X Trilogy",
  titleAbsolute: true,
  description:
    "Looking for books like Foucault's Pendulum? Jason Carroll Holloway's Masters X Trilogy is a sprawling conspiracy thriller that weaves real medieval manuscripts and acoustic science into a modern mystery.",
  path: "/books/books-like-foucaults-pendulum/",
  image: {
    url: "https://jasoncholloway.com/books/masters-x/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Masters X Trilogy by Jason Carroll Holloway — Seventh City Press",
  },
});

export default function FoucaultsPendulumCompPage() {
  return (
    <CompLandingLayout
      h1={
        <>
          Books Like <em>Foucault&apos;s Pendulum</em>
        </>
      }
      lede="If you are looking for novels that combine deep historical research, medieval manuscript traditions, and sprawling intellectual conspiracies, discover the Masters X Trilogy."
      excerpts={[
        {
          context: "Andrew reads Notebook Three for the first time.",
          paragraphs: [
            "The cross-references. Between cave carvings and classified aerospace research. Blake, your grandfather was reverse-engineering antenna designs from petroglyphs. Those aren't diagrams, they're technical specifications.",
          ],
          attribution: "Andrew Chen · Book I",
          href: momentPath("technical-specifications"),
        },
        {
          context: "Blake reads the Ars Notoria as engineering, not sorcery.",
          paragraphs: [
            "Blake read it not as magic. Not as theology. He read it as engineering.",
            "A wavefront diagram. The outer circle: the boundary of the standing wave in a resonant chamber. The inner circle: the node.",
          ],
          attribution: "Masters X: The Grimoire",
          href: momentPath("notae-as-engineering"),
        },
      ]}
    >
      <p>
        Umberto Eco&apos;s <em>Foucault&apos;s Pendulum</em> set the standard for the intellectual thriller. It demonstrated
        that a conspiracy novel didn&apos;t need to dumb down its history — it could weaponize it. It showed that the
        Voynich Manuscript, the Knights Templar, and Rosicrucian manifestos were more thrilling when treated with
        rigorous, almost academic obsession.
      </p>
      <p>
        For readers searching for <strong>books like Foucault&apos;s Pendulum</strong>, Jason Carroll Holloway&apos;s{" "}
        <Link href="/books/masters-x" className="hover-gold" style={{ textDecoration: "underline", color: "var(--gold)" }}>
          Masters X Trilogy
        </Link>{" "}
        operates in that exact tradition.
      </p>

      <div style={{ background: "var(--bg-raised)", padding: "2rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-faint)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "1rem" }}>The Architecture of the Conspiracy</h2>
        <p style={{ marginBottom: "1rem" }}>
          Where Eco&apos;s protagonists feed the history of the occult into a computer named Abulafia, the protagonists of
          the Masters X Trilogy are acoustic engineers and manuscript historians. They aren&apos;t inventing a conspiracy;
          they are decoding an architectural and acoustic reality that has been hidden in plain sight for centuries.
        </p>
        <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-muted)" }}>
          <li>
            <strong>Real Manuscripts:</strong> the trilogy hinges on genuine texts like the{" "}
            <Link href="/field-notes/voynich-manuscript" className="hover-gold">
              Voynich Manuscript
            </Link>{" "}
            and the{" "}
            <Link href="/field-notes/ars-notoria" className="hover-gold">
              Ars Notoria
            </Link>
            .
          </li>
          <li>
            <strong>Archaeoacoustics:</strong> the conspiracy is physical, centered around the{" "}
            <Link href="/field-notes/111-hz" className="hover-gold">
              111 Hz resonance frequency
            </Link>{" "}
            in ancient stone chambers.
          </li>
          <li>
            <strong>Real Locations:</strong> from{" "}
            <Link href="/field-notes/subtropolis" className="hover-gold">
              SubTropolis
            </Link>{" "}
            beneath Kansas City to the crypts of the{" "}
            <Link href="/field-notes/strahov-monastery" className="hover-gold">
              Strahov Monastery
            </Link>{" "}
            in Prague.
          </li>
        </ul>
      </div>

      <p>
        Like <em>Foucault&apos;s Pendulum</em>, the Masters X Trilogy demands a reader willing to engage with complex
        ideas — from cognitive science to medieval theology. It is a thriller that thinks.
      </p>
    </CompLandingLayout>
  );
}

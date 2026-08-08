import Link from "next/link";
import type { Metadata } from "next";
import CompLandingLayout from "@/components/books/CompLandingLayout";
import { momentPath } from "@/lib/data/moments";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Literary Conspiracy Fiction with Real Manuscripts",
  titleAbsolute: true,
  description:
    "Literary conspiracy thrillers built on real manuscripts — the Voynich Manuscript, Ars Notoria, Codex Gigas, and 111 Hz chamber acoustics. Read excerpts from the Masters X Trilogy.",
  path: "/books/literary-conspiracy-fiction/",
  image: {
    url: "https://jasoncholloway.com/books/masters-x/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Masters X Trilogy by Jason Carroll Holloway — Seventh City Press",
  },
});

export default function LiteraryConspiracyCompPage() {
  return (
    <CompLandingLayout
      h1="Literary Conspiracy Fiction with Real Manuscripts"
      lede="For readers who want conspiracies grounded in documented history — undeciphered codices, medieval memory arts, and acoustic research you can look up."
      excerpts={[
        {
          context: "Nadia reads three medieval manuscripts as fragments of one system.",
          paragraphs: [
            "Three fragments of one complete system. The Ars Notoria tells you how. The Voynich shows you what. The Codex Gigas explains why. Separated by Brother Aldric in 1267.",
          ],
          attribution: "Nadia Volkov · Book I",
          href: momentPath("three-fragments"),
        },
        {
          context: "SubTropolis. A tunnel that isn't on any official map.",
          paragraphs: [
            "Thirty-seven photographs of geometric carvings in a section of SubTropolis that didn't appear on any official map. The section he'd been fired for entering.",
            "The same branching angles from William's Cessna. The same proportions, a hundred feet underground.",
          ],
          attribution: "Masters X: The Inheritance of Frequency",
          href: momentPath("unmapped-tunnel"),
        },
      ]}
    >
      <p>
        The best literary conspiracy fiction does not invent its sources from whole cloth. It selects real documents,
        real sites, and real scientific measurements — then asks what happens when a character takes them seriously
        enough to follow the pattern wherever it leads.
      </p>
      <p>
        Jason Carroll Holloway&apos;s{" "}
        <Link href="/books/masters-x" className="hover-gold" style={{ textDecoration: "underline", color: "var(--gold)" }}>
          Masters X Trilogy
        </Link>{" "}
        is built on that contract. Every major manuscript and location in the novels can be visited, catalogued, or
        found in a scholarly bibliography. The Field Notes archive documents the real history; the fiction shows what
        it feels like when the pattern closes.
      </p>

      <div style={{ background: "var(--bg-raised)", padding: "2rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-faint)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "1rem" }}>Real sources in the fiction</h2>
        <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-muted)" }}>
          <li>
            <Link href="/field-notes/voynich-manuscript" className="hover-gold">
              Voynich Manuscript
            </Link>{" "}
            (Beinecke MS 408) — undeciphered botanical and astronomical codex
          </li>
          <li>
            <Link href="/field-notes/ars-notoria" className="hover-gold">
              Ars Notoria
            </Link>{" "}
            — thirteenth-century memory and eloquence notae
          </li>
          <li>
            <Link href="/field-notes/codex-gigas" className="hover-gold">
              Codex Gigas
            </Link>{" "}
            — the largest surviving medieval manuscript
          </li>
          <li>
            <Link href="/field-notes/111-hz" className="hover-gold">
              111 Hz standing waves
            </Link>{" "}
            in ancient stone chambers
          </li>
          <li>
            <Link href="/field-notes/subtropolis" className="hover-gold">
              SubTropolis
            </Link>{" "}
            — 55 million square feet of limestone mine beneath Kansas City
          </li>
        </ul>
      </div>

      <p>
        Also for readers of Umberto Eco&apos;s{" "}
        <Link href="/books/books-like-foucaults-pendulum" className="hover-gold">
          Foucault&apos;s Pendulum
        </Link>
        , Dan Brown&apos;s <em>The Da Vinci Code</em>, and Anthony Doerr&apos;s <em>Cloud Cuckoo Land</em> — literary
        conspiracy with room to think.
      </p>
    </CompLandingLayout>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import CompLandingLayout from "@/components/books/CompLandingLayout";
import { momentPath } from "@/lib/data/moments";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Books Like The Historian: The Masters X Trilogy",
  titleAbsolute: true,
  description:
    "Looking for books like The Historian? Jason Carroll Holloway's Masters X Trilogy combines European manuscript research, slow-burn literary suspense, and real archives from Prague to Kansas City.",
  path: "/books/books-like-the-historian/",
  image: {
    url: "https://jasoncholloway.com/books/masters-x/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Masters X Trilogy by Jason Carroll Holloway — Seventh City Press",
  },
});

export default function HistorianCompPage() {
  return (
    <CompLandingLayout
      h1={
        <>
          Books Like <em>The Historian</em>
        </>
      }
      lede="For readers who want manuscript archives, European settings, and a conspiracy that earns its revelations slowly — not in a single weekend."
      excerpts={[
        {
          context: "Jefferson City. A safety deposit box paid fifty-seven years in advance.",
          paragraphs: [
            "The box lists only one authorized heir. Not your father. Not your mother. You.",
            "Tomorrow. He would drive to Jefferson City. Open his grandfather's safety deposit box. Start finding answers to questions that had killed his father and driven his grandfather from the sky.",
          ],
          attribution: "Masters X: The Inheritance of Frequency",
          href: momentPath("safety-deposit-box"),
        },
        {
          context: "Andrew reads the Strahov theological hall as preparation, not scholarship.",
          paragraphs: [
            "Twenty-three reading stations in the Strahov theological hall. Twenty-three desks. Twenty-three chains. One book per chain.",
            "The library wasn't a library. It was a preparation chamber for the eyes the way the crypt was a preparation chamber for the ears.",
          ],
          attribution: "Andrew Chen · Book II",
          href: momentPath("strahov-reading-stations"),
        },
      ]}
    >
      <p>
        Elizabeth Kostova&apos;s <em>The Historian</em> taught a generation of readers that the archive could be a
        thriller. Letters in dusty libraries. A mystery passed between generations. A European city where the past is
        still physically present in stone and ink.
      </p>
      <p>
        <Link href="/books/masters-x" className="hover-gold" style={{ textDecoration: "underline", color: "var(--gold)" }}>
          Masters X
        </Link>{" "}
        works in that lane — but the inheritance arrives through acoustic engineering, classified notebooks, and a
        sealed crypt beneath the{" "}
        <Link href="/field-notes/strahov-monastery" className="hover-gold">
          Strahov Monastery Library
        </Link>{" "}
        in Prague.
      </p>

      <div style={{ background: "var(--bg-raised)", padding: "2rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-faint)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "1rem" }}>What Kostova readers will recognize</h2>
        <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-muted)" }}>
          <li>
            <strong>Real manuscripts:</strong> the{" "}
            <Link href="/field-notes/voynich-manuscript" className="hover-gold">
              Voynich Manuscript
            </Link>
            , the{" "}
            <Link href="/field-notes/ars-notoria" className="hover-gold">
              Ars Notoria
            </Link>
            , and the{" "}
            <Link href="/field-notes/codex-gigas" className="hover-gold">
              Codex Gigas
            </Link>{" "}
            — treated as documents, not props.
          </li>
          <li>
            <strong>Generational inheritance:</strong> a grandfather&apos;s research timed to reach the grandson who can
            receive it.
          </li>
          <li>
            <strong>European anchor:</strong> Prague, Strahov, and a crypt sealed since 1267 — mapped against real
            geography.
          </li>
        </ul>
      </div>

      <p>
        Where <em>The Historian</em> moves through letters and travel, Masters X moves through frequency measurements,
        underground Kansas City, and a preparation protocol written in medieval notae. Same patience. Different instrument.
      </p>
    </CompLandingLayout>
  );
}

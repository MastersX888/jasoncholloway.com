import { Feed } from "feed";
import { books } from "@/lib/data/books";

export const dynamic = "force-static";

export async function GET() {
  const siteUrl = "https://jasoncholloway.com";

  const feed = new Feed({
    title: "Jason C. Holloway — Field Notes",
    description: "The documented real history beneath the Masters X Trilogy.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    image: `${siteUrl}/og/field-notes/hub.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Jason C. Holloway`,
    updated: new Date(), // Using current date for static generation
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteUrl}/field-notes/rss.xml`,
    },
    author: {
      name: "Jason Carroll Holloway",
      link: siteUrl,
    },
  });

  const notes = [
    {
      title: "SubTropolis: The Underground City Beneath Kansas City",
      id: "subtropolis",
      link: `${siteUrl}/field-notes/subtropolis`,
      description: "SubTropolis is a 55-million-square-foot limestone mine beneath Kansas City. Here's the documented history, and what a novelist found down there.",
      date: new Date("2026-06-12"),
    },
    {
      title: "111 Hz: The Frequency Ancient Builders Kept Choosing",
      id: "111-hz",
      link: `${siteUrl}/field-notes/111-hz`,
      description: "111 Hz is a standing-wave frequency documented by acoustic researchers in ancient stone chambers. Here is the documented research.",
      date: new Date("2026-06-12"),
    },
    {
      title: "The Voynich Manuscript, Rudolf II, and the Book No One Can Read",
      id: "voynich-manuscript",
      link: `${siteUrl}/field-notes/voynich-manuscript`,
      description: "Carbon-dated to the early 1400s, undeciphered for 600 years, owned by Emperor Rudolf II of Bohemia.",
      date: new Date("2026-06-12"),
    },
    {
      title: "The Ars Notoria: The Medieval 'Notory Art' That Promised Instant Knowledge",
      id: "ars-notoria",
      link: `${siteUrl}/field-notes/ars-notoria`,
      description: "A thirteenth-century Solomonic manuscript that promises rapid acquisition of knowledge through geometric contemplation.",
      date: new Date("2026-06-12"),
    },
    {
      title: "The Strahov Library: 23 Chained Books and the Most Beautiful Room in Prague",
      id: "strahov-monastery",
      link: `${siteUrl}/field-notes/strahov-monastery`,
      description: "The Premonstratensian Theological Hall, chained books, and the sealed crypt beneath — real place, fictional events.",
      date: new Date("2026-06-12"),
    },
    {
      title: "The Devil's Bible: Why the Codex Gigas Was Made in Bohemia",
      id: "codex-gigas",
      link: `${siteUrl}/field-notes/codex-gigas`,
      description: "The largest surviving medieval manuscript in the world. Owned by Rudolf II. The real history.",
      date: new Date("2026-06-12"),
    },
    {
      title: "The Real Kansas City of Masters X: A Reader's Map",
      id: "kansas-city-locations",
      link: `${siteUrl}/field-notes/kansas-city-locations`,
      description: "Every Kansas City location in the Masters X Trilogy is real. The events that happen there are fiction. The geography is exact.",
      date: new Date("2026-06-12"),
    },
    {
      title: "Oscar-01: Missouri's Cold War Launch Room",
      id: "oscar-01",
      link: `${siteUrl}/field-notes/oscar-01`,
      description: "Oscar-01 is a real preserved Minuteman II ICBM launch control facility at Whiteman Air Force Base. You can stand inside it.",
      date: new Date("2026-06-12"),
    },
    {
      title: "What Test Pilots Saw from 70,000 Feet",
      id: "u2-test-pilots",
      link: `${siteUrl}/field-notes/u2-test-pilots`,
      description: "The U-2 reconnaissance aircraft flew at altitudes where the sky is black and the curvature of the earth is visible. What pilots reported seeing.",
      date: new Date("2026-06-12"),
    },
    {
      title: "Cymatics: Sound You Can See",
      id: "cymatics",
      link: `${siteUrl}/field-notes/cymatics`,
      description: "Cymatics is the study of visible sound — the patterns that sound waves create in physical matter when vibrated at specific frequencies.",
      date: new Date("2026-06-12"),
    },
    {
      title: "Saying 113: 'The Kingdom Is Spread Upon the Earth'",
      id: "gospel-of-thomas",
      link: `${siteUrl}/field-notes/gospel-of-thomas`,
      description: "The Gospel of Thomas is a real first-century text discovered at Nag Hammadi. Volume III of the Masters X Trilogy is built on Saying 113.",
      date: new Date("2026-06-12"),
    },
    {
      title: "Meramec Caverns and the Patterns in the Flowstone",
      id: "meramec-caverns",
      link: `${siteUrl}/field-notes/meramec-caverns`,
      description: "Flowstone formations in Meramec Caverns and the fractal geometry of nature.",
      date: new Date("2026-06-12"),
    },
  ];

  notes.forEach((note) => {
    feed.addItem({
      title: note.title,
      id: note.id,
      link: note.link,
      description: note.description,
      author: [
        {
          name: "Jason Carroll Holloway",
          link: "https://jasoncholloway.com",
        },
      ],
      date: note.date,
      image: `${siteUrl}/og/field-notes/${note.id}.png`,
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}


import { Feed } from "feed";
import { fieldNotes } from "@/lib/data/fieldNotes";

export const dynamic = "force-static";

export async function GET() {
  const siteUrl = "https://jasoncholloway.com";

  const feed = new Feed({
    title: "Jason Carroll Holloway — Field Notes",
    description: "The documented real history beneath the Masters X Trilogy.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    image: `${siteUrl}/og/field-notes/hub.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Jason Carroll Holloway`,
    updated: new Date(),
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteUrl}/field-notes/rss.xml`,
    },
    author: {
      name: "Jason Carroll Holloway",
      link: siteUrl,
    },
  });

  // Parity with hub + sitemap: derive items from fieldNotes.ts
  fieldNotes.forEach((note) => {
    feed.addItem({
      title: note.title,
      id: note.slug,
      link: `${siteUrl}/field-notes/${note.slug}/`,
      description: note.desc,
      author: [
        {
          name: "Jason Carroll Holloway",
          link: "https://jasoncholloway.com",
        },
      ],
      date: new Date("2026-06-12"),
      image: `${siteUrl}/og/field-notes/${note.slug}.png`,
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

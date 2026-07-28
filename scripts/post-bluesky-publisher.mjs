#!/usr/bin/env node
/**
 * Post publisher-voice social copy to Bluesky for Seventh City Press.
 * Usage: node scripts/post-bluesky-publisher.mjs <slot> [--dry-run]
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOCIAL_CONTENT = path.join(ROOT, "content/blog/SOCIAL_PUBLISHER_VOICE.md");
const STATUS_FILE = path.join(ROOT, ".social-post-status-publisher.json");

const HANDLE = "seventhcitypress.bsky.social";
const APP_PASSWORD = "gk9C2UaWbUJ9uDn";

function getBlueskyText(slot) {
  const content = fs.readFileSync(SOCIAL_CONTENT, "utf8");
  const slotPattern = new RegExp(
    `## Slot ${slot} ·[\\s\\S]*?(?=## Slot \\d+ ·|$)`,
  );
  const slotContent = content.match(slotPattern)?.[0];
  if (!slotContent) throw new Error(`Slot ${slot} not found`);

  const section =
    slotContent.match(/### Bluesky\r?\n\r?\n([\s\S]*?)(?=\r?\n### )/)?.[1];
  if (!section) throw new Error(`Bluesky section missing for slot ${slot}`);

  return section
    .split("\n")
    .map((line) => line.replace(/^>\s?/, ""))
    .join("\n")
    .trim();
}

function linkFacets(text) {
  const facets = [];
  const re = /(?:https?:\/\/)?(jasoncholloway\.com\/[^\s]+)/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    const uri = match[0].startsWith("http")
      ? match[0]
      : `https://${match[0]}`;
    facets.push({
      index: {
        byteStart: Buffer.byteLength(text.slice(0, match.index), "utf8"),
        byteEnd: Buffer.byteLength(
          text.slice(0, match.index + match[0].length),
          "utf8",
        ),
      },
      features: [{ $type: "app.bsky.richtext.facet#link", uri }],
    });
  }
  return facets;
}

function markPosted(slot) {
  const status = fs.existsSync(STATUS_FILE)
    ? JSON.parse(fs.readFileSync(STATUS_FILE, "utf8"))
    : {};
  if (!status[slot]) status[slot] = {};
  status[slot].bluesky = new Date().toISOString();
  fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2) + "\n");
}

async function createSession(handle, password) {
  const res = await fetch(
    "https://bsky.social/xrpc/com.atproto.server.createSession",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: handle, password }),
    },
  );
  const data = await res.json();
  if (!data.accessJwt) {
    throw new Error(`Bluesky auth failed: ${JSON.stringify(data)}`);
  }
  return data;
}

async function createPost(session, text) {
  const record = {
    $type: "app.bsky.feed.post",
    text,
    facets: linkFacets(text),
    createdAt: new Date().toISOString(),
    langs: ["en"],
  };

  const res = await fetch(
    "https://bsky.social/xrpc/com.atproto.repo.createRecord",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessJwt}`,
      },
      body: JSON.stringify({
        repo: session.did,
        collection: "app.bsky.feed.post",
        record,
      }),
    },
  );

  const data = await res.json();
  if (!data.uri) {
    throw new Error(`Bluesky post failed: ${JSON.stringify(data)}`);
  }
  return data;
}

async function main() {
  const slot = parseInt(process.argv[2], 10);
  const dryRun = process.argv.includes("--dry-run");

  if (!slot) {
    console.error(
      "Usage: node scripts/post-bluesky-publisher.mjs <slot> [--dry-run]",
    );
    process.exit(1);
  }

  const text = getBlueskyText(slot);

  console.log(
    `[seventhcitypress] Slot ${slot} Bluesky post (${text.length} chars)`,
  );
  console.log("---");
  console.log(text);
  console.log("---");

  if (dryRun) {
    console.log("Dry run only. Not posting.");
    return;
  }

  const session = await createSession(HANDLE, APP_PASSWORD);
  console.log(`Authenticated as @${session.handle}`);

  const result = await createPost(session, text);
  const rkey = result.uri.split("/").pop();
  const url = `https://bsky.app/profile/${session.handle}/post/${rkey}`;

  markPosted(slot);
  console.log(`Posted: ${url}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

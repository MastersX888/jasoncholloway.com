#!/usr/bin/env node
/**
 * Bluesky profile setup + blog post for personal author account.
 *
 * Usage:
 *   node scripts/bluesky-setup.mjs profile [--dry-run]
 *   node scripts/bluesky-setup.mjs post <slot> [--dry-run]
 *   node scripts/bluesky-setup.mjs all <slot> [--dry-run]
 *   node scripts/bluesky-setup.mjs preview <slot>
 *
 * Env (repo .env or groundswell-monitor/.env):
 *   BLUESKY_HANDLE=jasonhollowaykc.bsky.social
 *   BLUESKY_APP_PASSWORD=...
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOCIAL_CONTENT = path.join(ROOT, "content/blog/SOCIAL_FROM_BLOG.md");
const STATUS_FILE = path.join(ROOT, ".social-post-status.json");
const ENV_CANDIDATES = [
  path.join(ROOT, ".env"),
  path.join(ROOT, "groundswell-monitor/.env"),
];

const MAX_GRAPHEMES = 300;
const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });

const AUTHOR_PROFILE = {
  displayName: "Jason C. Holloway",
  description:
    "Author · Masters X Trilogy · KC fiction rooted in real history · Voynich MS · SubTropolis · 111 Hz · Seventh City Press · jasoncholloway.com/blog",
  avatarUrl: process.env.BLUESKY_AVATAR_URL || "",
};

function loadEnv() {
  for (const envPath of ENV_CANDIDATES) {
    if (!fs.existsSync(envPath)) continue;
    const parsed = Object.fromEntries(
      fs
        .readFileSync(envPath, "utf8")
        .split(/\r?\n/)
        .filter((line) => line && !line.startsWith("#"))
        .map((line) => {
          const i = line.indexOf("=");
          return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
        }),
    );
    if (parsed.BLUESKY_HANDLE && parsed.BLUESKY_APP_PASSWORD) {
      return {
        handle: parsed.BLUESKY_HANDLE.replace(/^@/, ""),
        password: parsed.BLUESKY_APP_PASSWORD,
        source: envPath,
      };
    }
  }
  throw new Error(
    "BLUESKY_HANDLE and BLUESKY_APP_PASSWORD not found. Add personal account creds to .env",
  );
}

function getBlueskyText(slot) {
  const content = fs.readFileSync(SOCIAL_CONTENT, "utf8");
  const slotPattern = new RegExp(`## Slot ${slot} ·[\\s\\S]*?(?=## Slot \\d+ ·|$)`);
  const slotContent = content.match(slotPattern)?.[0];
  if (!slotContent) throw new Error(`Slot ${slot} not found`);

  const section = slotContent.match(/### Bluesky\r?\n\r?\n([\s\S]*?)(?=\r?\n### )/)?.[1];
  if (!section) throw new Error(`Bluesky section missing for slot ${slot}`);

  return section
    .split(/\r?\n/)
    .map((line) => line.replace(/^>\s?/, ""))
    .join("\n")
    .trim();
}

function graphemeLength(text) {
  return [...segmenter.segment(text)].length;
}

function splitByGraphemes(text, max) {
  const graphemes = [...segmenter.segment(text)].map((part) => part.segment);
  const parts = [];
  for (let i = 0; i < graphemes.length; i += max) {
    parts.push(graphemes.slice(i, i + max).join(""));
  }
  return parts;
}

function splitIntoThread(text, max = MAX_GRAPHEMES) {
  if (graphemeLength(text) <= max) return [text];

  const paragraphs = text.split(/\n\n+/).filter(Boolean);
  const chunks = [];
  let current = "";

  const pushCurrent = () => {
    if (current) {
      chunks.push(current);
      current = "";
    }
  };

  for (const paragraph of paragraphs) {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
    if (graphemeLength(candidate) <= max) {
      current = candidate;
      continue;
    }

    pushCurrent();

    if (graphemeLength(paragraph) <= max) {
      current = paragraph;
      continue;
    }

    const sentences =
      paragraph.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g)?.map((part) => part.trim()) || [
        paragraph,
      ];

    for (const sentence of sentences) {
      if (!sentence) continue;
      const next = current ? `${current} ${sentence}` : sentence;
      if (graphemeLength(next) <= max) {
        current = next;
        continue;
      }

      pushCurrent();
      if (graphemeLength(sentence) <= max) {
        current = sentence;
      } else {
        chunks.push(...splitByGraphemes(sentence, max));
      }
    }
  }

  pushCurrent();
  return chunks;
}

function linkFacets(text) {
  const facets = [];
  const re = /(?:https?:\/\/)?(jasoncholloway\.com\/[^\s]+)/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    const uri = match[0].startsWith("http") ? match[0] : `https://${match[0]}`;
    facets.push({
      index: {
        byteStart: Buffer.byteLength(text.slice(0, match.index), "utf8"),
        byteEnd: Buffer.byteLength(text.slice(0, match.index + match[0].length), "utf8"),
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

async function api(pathname, { method = "GET", token, body } = {}) {
  const res = await fetch(`https://bsky.social/xrpc/${pathname}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`${pathname} failed: ${JSON.stringify(data)}`);
  }
  return data;
}

async function createSession(handle, password) {
  return api("com.atproto.server.createSession", {
    method: "POST",
    body: { identifier: handle, password },
  });
}

async function uploadImage(token, imageUrl) {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Failed to fetch avatar: ${imageUrl}`);
  const bytes = new Uint8Array(await res.arrayBuffer());
  const mimeType = res.headers.get("content-type") || "image/png";

  const uploadRes = await fetch("https://bsky.social/xrpc/com.atproto.repo.uploadBlob", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": mimeType,
    },
    body: bytes,
  });
  const upload = await uploadRes.json();
  if (!upload.blob) throw new Error(`Upload failed: ${JSON.stringify(upload)}`);
  return upload.blob;
}

async function getProfileRecord(token, did) {
  try {
    const data = await api(
      `com.atproto.repo.getRecord?repo=${encodeURIComponent(did)}&collection=app.bsky.actor.profile&rkey=self`,
      { token },
    );
    return { record: data.value, cid: data.cid };
  } catch {
    return { record: { $type: "app.bsky.actor.profile" }, cid: null };
  }
}

async function updateProfile(session, dryRun) {
  const { displayName, description, avatarUrl } = AUTHOR_PROFILE;
  console.log("Profile update:");
  console.log(`  displayName: ${displayName}`);
  console.log(`  description: ${description}`);
  console.log(`  avatarUrl:   ${avatarUrl || "(skip — set BLUESKY_AVATAR_URL to upload)"}`);

  if (dryRun) {
    console.log("Dry run — profile not saved.");
    return;
  }

  let avatar;
  if (avatarUrl) {
    avatar = await uploadImage(session.accessJwt, avatarUrl);
  }
  const existing = await getProfileRecord(session.accessJwt, session.did);
  const record = {
    ...existing.record,
    $type: "app.bsky.actor.profile",
    displayName,
    description,
    ...(avatar ? { avatar } : {}),
  };

  await api("com.atproto.repo.putRecord", {
    method: "POST",
    token: session.accessJwt,
    body: {
      repo: session.did,
      collection: "app.bsky.actor.profile",
      rkey: "self",
      record,
      ...(existing.cid ? { swapRecord: existing.cid } : {}),
    },
  });
  console.log(`Profile updated: https://bsky.app/profile/${session.handle}`);
}

function previewThread(text) {
  const parts = splitIntoThread(text);
  console.log(`Thread preview (${parts.length} post${parts.length === 1 ? "" : "s"}):`);
  parts.forEach((part, index) => {
    console.log(`--- ${index + 1}/${parts.length} (${graphemeLength(part)} graphemes) ---`);
    console.log(part);
  });
  return parts;
}

async function createPostRecord(session, text, reply, dryRun) {
  const record = {
    $type: "app.bsky.feed.post",
    text,
    facets: linkFacets(text),
    createdAt: new Date().toISOString(),
    langs: ["en"],
    ...(reply ? { reply } : {}),
  };

  if (dryRun) return null;

  const data = await api("com.atproto.repo.createRecord", {
    method: "POST",
    token: session.accessJwt,
    body: {
      repo: session.did,
      collection: "app.bsky.feed.post",
      record,
    },
  });

  const rkey = data.uri.split("/").pop();
  const url = `https://bsky.app/profile/${session.handle}/post/${rkey}`;
  return { uri: data.uri, cid: data.cid, url };
}

async function createThread(session, text, dryRun) {
  const parts = splitIntoThread(text);
  previewThread(text);

  if (dryRun) {
    console.log("Dry run — thread not published.");
    return null;
  }

  let root = null;
  let parent = null;
  let firstUrl = null;

  for (const part of parts) {
    const reply =
      root && parent
        ? {
            root: { uri: root.uri, cid: root.cid },
            parent: { uri: parent.uri, cid: parent.cid },
          }
        : undefined;

    const posted = await createPostRecord(session, part, reply, dryRun);
    if (!posted) break;

    if (!root) {
      root = posted;
      firstUrl = posted.url;
    }
    parent = posted;
    console.log(`Posted: ${posted.url}`);
  }

  return firstUrl;
}

async function main() {
  const [command, arg, ...rest] = process.argv.slice(2);
  const dryRun = rest.includes("--dry-run") || process.argv.includes("--dry-run");

  if (!command) {
    console.error(
      "Usage: node scripts/bluesky-setup.mjs <profile|post|all|preview> [slot] [--dry-run]",
    );
    process.exit(1);
  }

  if (command === "preview") {
    const slot = parseInt(arg, 10);
    if (!slot) {
      console.error("Slot number required for preview");
      process.exit(1);
    }
    previewThread(getBlueskyText(slot));
    return;
  }

  const env = loadEnv();
  console.log(`Using credentials from ${env.source}`);
  console.log(`Handle: @${env.handle}`);

  if (command === "profile") {
    const session = await createSession(env.handle, env.password);
    await updateProfile(session, dryRun);
    return;
  }

  if (command === "post" || command === "all") {
    const slot = parseInt(arg, 10);
    if (!slot) {
      console.error("Slot number required for post/all");
      process.exit(1);
    }
    const session = await createSession(env.handle, env.password);
    if (command === "all") {
      await updateProfile(session, dryRun);
    }
    const text = getBlueskyText(slot);
    await createThread(session, text, dryRun);
    if (!dryRun) markPosted(slot);
    return;
  }

  console.error(`Unknown command: ${command}`);
  process.exit(1);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

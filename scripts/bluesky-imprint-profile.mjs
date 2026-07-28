#!/usr/bin/env node
/**
 * Update Seventh City Press Bluesky imprint profile (logo, bio, links).
 * No posting — profile only.
 *
 * Usage:
 *   node scripts/bluesky-imprint-profile.mjs [--dry-run]
 *
 * Env (first match wins):
 *   BLUESKY_IMPRINT_HANDLE / BLUESKY_IMPRINT_APP_PASSWORD
 *   or BLUESKY_HANDLE / BLUESKY_APP_PASSWORD in groundswell-monitor/pipeline/.env
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const ENV_CANDIDATES = [
  path.join(ROOT, ".env"),
  path.join(ROOT, "groundswell-monitor/.env"),
  path.join(ROOT, "groundswell-monitor/pipeline/.env"),
];

const IMPRINT_PROFILE = {
  displayName: "Seventh City Press",
  description:
    "Independent literary imprint · Kansas City, MO · Masters X Trilogy · seventhcitypress.com · jasoncholloway.com · press@seventhcitypress.com",
  avatarPath: path.join(
    ROOT,
    "seventhcitypress/public/brand/scp-logo-profile-720.png",
  ),
};

function loadImprintEnv() {
  const envImprintHandle = process.env.BLUESKY_IMPRINT_HANDLE?.replace(/^@/, "");
  const envImprintPassword = process.env.BLUESKY_IMPRINT_APP_PASSWORD;
  if (envImprintHandle && envImprintPassword) {
    return {
      handle: envImprintHandle,
      password: envImprintPassword,
      source: "process.env",
    };
  }

  const envHandle = process.env.BLUESKY_HANDLE?.replace(/^@/, "");
  const envPassword = process.env.BLUESKY_APP_PASSWORD;
  if (envHandle?.includes("seventhcitypress") && envPassword) {
    return {
      handle: envHandle,
      password: envPassword,
      source: "process.env",
    };
  }

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

    const imprintHandle = parsed.BLUESKY_IMPRINT_HANDLE?.replace(/^@/, "");
    const imprintPassword = parsed.BLUESKY_IMPRINT_APP_PASSWORD;
    if (imprintHandle && imprintPassword) {
      return { handle: imprintHandle, password: imprintPassword, source: envPath };
    }

    const handle = parsed.BLUESKY_HANDLE?.replace(/^@/, "");
    const password = parsed.BLUESKY_APP_PASSWORD;
    if (handle?.includes("seventhcitypress") && password) {
      return { handle, password, source: envPath };
    }
  }

  throw new Error(
    "Imprint Bluesky creds not found. Set BLUESKY_IMPRINT_HANDLE + BLUESKY_IMPRINT_APP_PASSWORD, or keep seventhcitypress creds in pipeline/.env",
  );
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

async function uploadBlobFromPath(token, filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Avatar file not found: ${filePath}`);
  }
  const bytes = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mimeType =
    ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : ext === ".webp" ? "image/webp" : "image/png";

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

async function updateImprintProfile(session, dryRun) {
  const { displayName, description, avatarPath } = IMPRINT_PROFILE;

  console.log("Imprint profile update:");
  console.log(`  displayName: ${displayName}`);
  console.log(`  description: ${description}`);
  console.log(`  avatar:      ${avatarPath}`);

  if (dryRun) {
    console.log("Dry run — profile not saved.");
    return;
  }

  const avatar = await uploadBlobFromPath(session.accessJwt, avatarPath);
  const existing = await getProfileRecord(session.accessJwt, session.did);
  const record = {
    ...existing.record,
    $type: "app.bsky.actor.profile",
    displayName,
    description,
    avatar,
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

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const env = loadImprintEnv();
  console.log(`Using credentials from ${env.source}`);
  console.log(`Handle: @${env.handle}`);

  const session = await createSession(env.handle, env.password);
  await updateImprintProfile(session, dryRun);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

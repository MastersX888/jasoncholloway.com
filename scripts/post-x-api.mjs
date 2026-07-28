#!/usr/bin/env node
/**
 * Post blog social copy to X (Twitter) via v2 API with OAuth 1.0a.
 * Usage: node scripts/post-x-api.mjs <slot> [--dry-run]
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOCIAL_CONTENT = path.join(ROOT, "content/blog/SOCIAL_FROM_BLOG.md");
const STATUS_FILE = path.join(ROOT, ".social-post-status.json");

function loadEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) throw new Error(".env file not found");
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
  const required = [
    "TWITTER_CONSUMER_KEY",
    "TWITTER_CONSUMER_SECRET",
    "TWITTER_ACCESS_TOKEN",
    "TWITTER_ACCESS_TOKEN_SECRET",
  ];
  for (const key of required) {
    if (!parsed[key]) throw new Error(`${key} not found in .env`);
  }
  return parsed;
}

function getXPostText(slot) {
  const content = fs.readFileSync(SOCIAL_CONTENT, "utf8");
  const slotPattern = new RegExp(
    `## Slot ${slot} ·[\\s\\S]*?(?=\\n## Slot \\d+ ·|\\n## Held:|$)`,
  );
  const slotContent = content.match(slotPattern)?.[0];
  if (!slotContent) throw new Error(`Slot ${slot} not found`);

  const xSection = slotContent.match(
    /### X\r?\n\r?\n([\s\S]*?)(?=\r?\n### [A-Z])/,
  )?.[1];
  if (!xSection) throw new Error(`X section missing for slot ${slot}`);

  const postAMatch = xSection.match(
    /\*\*Post A\*\*\r?\n((?:>.*(?:\r?\n|$))+)/,
  );
  if (!postAMatch) throw new Error(`Post A missing in X section for slot ${slot}`);

  return postAMatch[1]
    .split(/\r?\n/)
    .map((line) => line.replace(/^>\s?/, ""))
    .join("\n")
    .trim();
}

function percentEncode(str) {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function generateOAuthSignature(method, url, params, consumerSecret, tokenSecret) {
  const sortedParams = Object.keys(params)
    .sort()
    .map((k) => `${percentEncode(k)}=${percentEncode(params[k])}`)
    .join("&");

  const baseString = [
    method.toUpperCase(),
    percentEncode(url),
    percentEncode(sortedParams),
  ].join("&");

  const signingKey = `${percentEncode(consumerSecret)}&${percentEncode(tokenSecret)}`;
  return crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");
}

function buildAuthHeader(method, url, env) {
  const oauthParams = {
    oauth_consumer_key: env.TWITTER_CONSUMER_KEY,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: env.TWITTER_ACCESS_TOKEN,
    oauth_version: "1.0",
  };

  const signature = generateOAuthSignature(
    method,
    url,
    oauthParams,
    env.TWITTER_CONSUMER_SECRET,
    env.TWITTER_ACCESS_TOKEN_SECRET,
  );

  oauthParams.oauth_signature = signature;

  const header = Object.keys(oauthParams)
    .sort()
    .map((k) => `${percentEncode(k)}="${percentEncode(oauthParams[k])}"`)
    .join(", ");

  return `OAuth ${header}`;
}

function markPosted(slot) {
  const status = fs.existsSync(STATUS_FILE)
    ? JSON.parse(fs.readFileSync(STATUS_FILE, "utf8"))
    : {};
  if (!status[slot]) status[slot] = {};
  status[slot].x = new Date().toISOString();
  fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2) + "\n");
}

async function postTweet(text, env) {
  const url = "https://api.twitter.com/2/tweets";
  const authHeader = buildAuthHeader("POST", url, env);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({ text }),
  });

  const body = await res.text();
  if (!res.ok) {
    throw new Error(
      `X API error ${res.status}: ${body}`,
    );
  }
  return JSON.parse(body);
}

async function main() {
  const slot = parseInt(process.argv[2], 10);
  const dryRun = process.argv.includes("--dry-run");

  if (!slot) {
    console.error("Usage: node scripts/post-x-api.mjs <slot> [--dry-run]");
    process.exit(1);
  }

  const env = loadEnv();
  const text = getXPostText(slot);

  console.log(`Slot ${slot} X post (${text.length} chars)`);
  console.log("---");
  console.log(text);
  console.log("---");

  if (dryRun) {
    console.log("Dry run only. Not posting.");
    return;
  }

  const result = await postTweet(text, env);
  const tweetId = result.data?.id;
  const tweetUrl = tweetId
    ? `https://x.com/i/web/status/${tweetId}`
    : "(no ID returned)";

  markPosted(slot);
  console.log(`Posted: ${tweetUrl}`);
  return tweetUrl;
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

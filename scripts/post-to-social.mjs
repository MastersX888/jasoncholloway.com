#!/usr/bin/env node
/**
 * Social media posting workflow for "The Facts Behind the Fiction" blog series.
 * 
 * Manages posting to X (Twitter), Bluesky, and Instagram (excludes LinkedIn per author request).
 * Content source: content/blog/SOCIAL_FROM_BLOG.md
 * 
 * Usage:
 *   node scripts/post-to-social.mjs list                    # Show posting schedule
 *   node scripts/post-to-social.mjs post <slot> <platform>  # Post specific slot
 *   node scripts/post-to-social.mjs status                  # Show what's been posted
 * 
 * Environment variables required:
 *   TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET
 *   BLUESKY_HANDLE, BLUESKY_APP_PASSWORD
 *   INSTAGRAM_ACCESS_TOKEN (or Meta Business Suite manual posting)
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOCIAL_CONTENT = path.join(ROOT, "content/blog/SOCIAL_FROM_BLOG.md");
const STATUS_FILE = path.join(ROOT, ".social-post-status.json");

// Posting schedule from SOCIAL_FROM_BLOG.md
const SCHEDULE = [
  { slot: 1, essay: "01 Frequency", url: "/blog/the-frequency-that-was-already-there/", status: "Approved" },
  { slot: 2, essay: "03 Cymatics", url: "/blog/sound-into-form-hans-jenny/", status: "Approved" },
  { slot: 3, essay: "04 Kansas City", url: "/blog/why-kansas-city/", status: "Approved" },
  { slot: 4, essay: "02 Ars Notoria", url: "/blog/the-grimoire-that-was-a-study-aid/", status: "Approved" },
  { slot: 5, essay: "07 Stone Remembers", url: "/blog/the-stone-remembers/", status: "Ready" },
  { slot: 6, essay: "06 Three Factions", url: "/blog/three-factions-one-declassified-document/", status: "Ready" },
  { slot: 7, essay: "08 Cannot Be Un-Released", url: "/blog/a-document-that-cannot-be-unreleased/", status: "Ready" },
];

// Load posting status
function loadStatus() {
  if (!fs.existsSync(STATUS_FILE)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(STATUS_FILE, "utf8"));
}

// Save posting status
function saveStatus(status) {
  fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2));
}

// Mark post as completed
function markPosted(slot, platform) {
  const status = loadStatus();
  if (!status[slot]) {
    status[slot] = {};
  }
  status[slot][platform] = new Date().toISOString();
  saveStatus(status);
}

// List schedule
function listSchedule() {
  console.log("\n📅 Social Media Posting Schedule\n");
  console.log("Platforms: X (Twitter), Bluesky, Instagram (LinkedIn excluded)\n");
  
  const status = loadStatus();
  
  SCHEDULE.forEach((item) => {
    const posted = status[item.slot] || {};
    const xStatus = posted.x ? "✅" : "⬜";
    const bskyStatus = posted.bluesky ? "✅" : "⬜";
    const igStatus = posted.instagram ? "✅" : "⬜";
    
    console.log(`Slot ${item.slot}: ${item.essay}`);
    console.log(`  ${xStatus} X  ${bskyStatus} Bluesky  ${igStatus} Instagram`);
    console.log(`  ${item.url}`);
    console.log();
  });
}

// Show posting status
function showStatus() {
  console.log("\n📊 Posting Status\n");
  
  const status = loadStatus();
  let totalPosts = 0;
  let completedPosts = 0;
  
  SCHEDULE.forEach((item) => {
    const posted = status[item.slot] || {};
    ["x", "bluesky", "instagram"].forEach((platform) => {
      totalPosts++;
      if (posted[platform]) {
        completedPosts++;
      }
    });
  });
  
  console.log(`Progress: ${completedPosts}/${totalPosts} posts completed`);
  console.log(`Remaining: ${totalPosts - completedPosts} posts\n`);
  
  listSchedule();
}

// Extract content for a specific slot
function getSlotContent(slot) {
  const content = fs.readFileSync(SOCIAL_CONTENT, "utf8");
  const slotPattern = new RegExp(`## Slot ${slot}[\\s\\S]*?(?=## Slot \\d+|$)`, "m");
  const match = content.match(slotPattern);
  
  if (!match) {
    throw new Error(`Content for slot ${slot} not found`);
  }
  
  return match[0];
}

// Post to X (Twitter)
async function postToX(slot) {
  console.log(`\n🐦 Posting slot ${slot} to X (Twitter)...\n`);
  
  const content = getSlotContent(slot);
  
  // Extract X posts (Post A and Post B)
  const xSection = content.match(/### X\n\n([\s\S]*?)(?=### |$)/);
  if (!xSection) {
    throw new Error("X content not found");
  }
  
  console.log("Content to post:");
  console.log(xSection[1]);
  console.log("\n⚠️  Manual posting required:");
  console.log("1. Copy the content above");
  console.log("2. Post to X at https://x.com/compose/tweet");
  console.log("3. Confirm when posted");
  
  markPosted(slot, "x");
}

// Post to Bluesky
async function postToBluesky(slot) {
  console.log(`\n🦋 Posting slot ${slot} to Bluesky...\n`);
  
  const content = getSlotContent(slot);
  
  const bskySection = content.match(/### Bluesky\n\n([\s\S]*?)(?=### |$)/);
  if (!bskySection) {
    throw new Error("Bluesky content not found");
  }
  
  console.log("Content to post:");
  console.log(bskySection[1]);
  console.log("\n⚠️  Manual posting required:");
  console.log("1. Copy the content above");
  console.log("2. Post to Bluesky at https://bsky.app");
  console.log("3. Confirm when posted");
  
  markPosted(slot, "bluesky");
}

// Post to Instagram
async function postToInstagram(slot) {
  console.log(`\n📸 Posting slot ${slot} to Instagram...\n`);
  
  const content = getSlotContent(slot);
  
  const igSection = content.match(/### Instagram\n\n([\s\S]*?)(?=### |$)/);
  if (!igSection) {
    throw new Error("Instagram content not found");
  }
  
  console.log("Content to post:");
  console.log(igSection[1]);
  console.log("\n⚠️  Manual posting required:");
  console.log("1. Copy the caption above");
  console.log("2. Create carousel with images described in the content");
  console.log("3. Post via Instagram app or Meta Business Suite");
  console.log("4. Confirm when posted");
  
  markPosted(slot, "instagram");
}

// Main command handler
async function main() {
  const [command, ...args] = process.argv.slice(2);
  
  if (!command || command === "list") {
    listSchedule();
    return;
  }
  
  if (command === "status") {
    showStatus();
    return;
  }
  
  if (command === "post") {
    const [slotStr, platform] = args;
    
    if (!slotStr || !platform) {
      console.error("Usage: node scripts/post-to-social.mjs post <slot> <platform>");
      console.error("Platforms: x, bluesky, instagram");
      process.exit(1);
    }
    
    const slot = parseInt(slotStr, 10);
    if (!SCHEDULE.find((s) => s.slot === slot)) {
      console.error(`Invalid slot: ${slot}`);
      process.exit(1);
    }
    
    switch (platform.toLowerCase()) {
      case "x":
      case "twitter":
        await postToX(slot);
        break;
      case "bluesky":
      case "bsky":
        await postToBluesky(slot);
        break;
      case "instagram":
      case "ig":
        await postToInstagram(slot);
        break;
      default:
        console.error(`Unknown platform: ${platform}`);
        console.error("Valid platforms: x, bluesky, instagram");
        process.exit(1);
    }
    
    return;
  }
  
  console.error(`Unknown command: ${command}`);
  console.error("Available commands: list, status, post");
  process.exit(1);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});

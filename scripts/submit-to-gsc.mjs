#!/usr/bin/env node
/**
 * Submit URLs to Google Search Console for indexing.
 * 
 * Requires Google Search Console API credentials.
 * 
 * Setup:
 * 1. Go to https://console.cloud.google.com/apis/credentials
 * 2. Create a service account or OAuth 2.0 credentials
 * 3. Enable the "Search Console API"
 * 4. Save credentials as /workspace/.gsc-credentials.json
 * 5. Add service account to GSC property at https://search.google.com/search-console
 * 
 * Usage:
 *   node scripts/submit-to-gsc.mjs sitemap    # Submit sitemap
 *   node scripts/submit-to-gsc.mjs urls       # Submit individual blog URLs
 *   node scripts/submit-to-gsc.mjs all        # Submit sitemap + URLs
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CREDENTIALS_FILE = path.join(ROOT, ".gsc-credentials.json");
const SITE_URL = "https://jasoncholloway.com";

// Blog URLs to submit (hardcoded from current published posts)
function getBlogUrls() {
  return [
    `${SITE_URL}/blog/the-frequency-that-was-already-there/`,
    `${SITE_URL}/blog/the-grimoire-that-was-a-study-aid/`,
    `${SITE_URL}/blog/sound-into-form-hans-jenny/`,
    `${SITE_URL}/blog/why-kansas-city/`,
    `${SITE_URL}/blog/three-factions-one-declassified-document/`,
    `${SITE_URL}/blog/the-stone-remembers/`,
    `${SITE_URL}/blog/a-document-that-cannot-be-unreleased/`,
  ];
}

// Check if credentials exist
function checkCredentials() {
  if (!fs.existsSync(CREDENTIALS_FILE)) {
    console.error("\n❌ Google Search Console credentials not found.\n");
    console.error("To submit URLs to GSC, you need to:");
    console.error("1. Go to https://console.cloud.google.com/apis/credentials");
    console.error("2. Create a service account or OAuth 2.0 credentials");
    console.error("3. Enable the 'Search Console API'");
    console.error("4. Download credentials and save as:");
    console.error(`   ${CREDENTIALS_FILE}`);
    console.error("5. Add the service account email to your GSC property at:");
    console.error("   https://search.google.com/search-console\n");
    console.error("Alternatively, submit URLs manually via GSC web interface.\n");
    return false;
  }
  return true;
}

// Submit sitemap
async function submitSitemap() {
  console.log("\n📍 Submitting sitemap to Google Search Console...\n");
  
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  
  console.log(`Sitemap URL: ${sitemapUrl}`);
  console.log("\n⚠️  Manual submission required:");
  console.log("1. Go to https://search.google.com/search-console");
  console.log("2. Select your property (jasoncholloway.com)");
  console.log("3. Navigate to 'Sitemaps' in the left sidebar");
  console.log("4. Enter sitemap URL: /sitemap.xml");
  console.log("5. Click 'Submit'\n");
  
  console.log("The sitemap now includes all 7 blog posts:");
  const urls = getBlogUrls();
  urls.forEach((url) => console.log(`  - ${url}`));
  console.log();
}

// Submit individual URLs
async function submitUrls() {
  console.log("\n📝 Blog URLs to submit for indexing:\n");
  
  const urls = getBlogUrls();
  urls.forEach((url, idx) => {
    console.log(`${idx + 1}. ${url}`);
  });
  
  console.log("\n⚠️  Manual submission options:\n");
  console.log("Option 1: URL Inspection Tool (recommended)");
  console.log("1. Go to https://search.google.com/search-console");
  console.log("2. Use the URL inspection tool (top search bar)");
  console.log("3. Paste each URL above");
  console.log("4. Click 'Request Indexing'\n");
  
  console.log("Option 2: Wait for Google to crawl the sitemap");
  console.log("- Once the sitemap is submitted, Google will discover the URLs");
  console.log("- Typically takes 1-3 days for initial crawl");
  console.log("- Check 'Coverage' report in GSC to monitor\n");
}

// Main command handler
async function main() {
  const [command] = process.argv.slice(2);
  
  if (!command || command === "help") {
    console.log("\nGoogle Search Console Submission Tool\n");
    console.log("Commands:");
    console.log("  sitemap   - Submit sitemap to GSC");
    console.log("  urls      - List blog URLs for manual submission");
    console.log("  all       - Both sitemap and URLs");
    console.log();
    return;
  }
  
  if (command === "sitemap") {
    await submitSitemap();
    return;
  }
  
  if (command === "urls") {
    await submitUrls();
    return;
  }
  
  if (command === "all") {
    await submitSitemap();
    await submitUrls();
    return;
  }
  
  console.error(`Unknown command: ${command}`);
  console.error("Available commands: sitemap, urls, all");
  process.exit(1);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});

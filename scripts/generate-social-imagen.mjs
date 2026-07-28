#!/usr/bin/env node
/**
 * Generate social media graphics via Google Imagen 4 Ultra (same stack as IndiePress).
 *
 * Setup: add GOOGLE_API_KEY or GEMINI_API_KEY to .env at repo root.
 * Get a key: https://aistudio.google.com/apikey
 *
 * Usage:
 *   node scripts/generate-social-imagen.mjs --dry-run
 *   node scripts/generate-social-imagen.mjs --slot 1
 *   node scripts/generate-social-imagen.mjs --slot 1 --slot 2
 *   node scripts/generate-social-imagen.mjs --all
 *   node scripts/generate-social-imagen.mjs --asset slot1-hero-xfb
 *   node scripts/generate-social-imagen.mjs --model gemini-2.5-flash-image
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const MANIFEST_PATH = join(REPO_ROOT, "content/social/imagen-manifest.json");
const PROGRESS_PATH = join(REPO_ROOT, ".social-imagen-progress.json");
const ENV_PATH = join(REPO_ROOT, ".env");
const OUTPUT_REPO = join(REPO_ROOT, "public/social/imagen");
const OUTPUT_DESKTOP = join(process.env.USERPROFILE || process.env.HOME || "", "Desktop", "social-imagen");

const DEFAULT_MODEL = "gemini-2.5-flash-image";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const IMAGEN_MODELS = new Set([
  "imagen-4.0-ultra-generate-001",
  "imagen-4.0-generate-001",
  "imagen-4.0-fast-generate-001",
]);
const REQUEST_DELAY_MS = 5000;
const MAX_RETRIES = 5;
const RETRY_BASE_MS = 10000;

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

function loadEnv() {
  loadEnvFile(ENV_PATH);
  // Historical IndiePress location (if restored on this machine)
  loadEnvFile("C:\\Users\\zh577\\IndiePress\\angelological-codex\\.env");
}

function getApiKey() {
  return process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || "";
}

function parseArgs(argv) {
  const opts = {
    dryRun: false,
    slots: new Set(),
    assets: new Set(),
    all: false,
    model: DEFAULT_MODEL,
    imageSize: "2K",
    force: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--all") opts.all = true;
    else if (arg === "--force") opts.force = true;
    else if (arg === "--1k") opts.imageSize = "1K";
    else if (arg === "--2k") opts.imageSize = "2K";
    else if (arg === "--slot" && argv[i + 1]) opts.slots.add(Number(argv[++i]));
    else if (arg === "--asset" && argv[i + 1]) opts.assets.add(argv[++i]);
    else if (arg === "--model" && argv[i + 1]) opts.model = argv[++i];
    else if (arg === "--help" || arg === "-h") {
      console.log(`Usage:
  node scripts/generate-social-imagen.mjs [--dry-run] [--all | --slot N ... | --asset id ...]
    [--model gemini-2.5-flash-image] [--1k|--2k] [--force]

Requires GOOGLE_API_KEY or GEMINI_API_KEY in ${ENV_PATH}`);
      process.exit(0);
    }
  }
  return opts;
}

function loadManifest() {
  return JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
}

function loadProgress() {
  if (!existsSync(PROGRESS_PATH)) return { completed: {} };
  return JSON.parse(readFileSync(PROGRESS_PATH, "utf8"));
}

function saveProgress(progress) {
  writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2) + "\n");
}

function selectAssets(manifest, opts) {
  let assets = manifest.assets;
  if (opts.assets.size) {
    assets = assets.filter((a) => opts.assets.has(a.id));
  } else if (!opts.all) {
    if (opts.slots.size === 0) opts.slots = new Set([1, 2]);
    assets = assets.filter((a) => opts.slots.has(a.slot));
  }
  return assets;
}

function mapAspectRatio(aspectRatio) {
  // Imagen supports 1:1, 3:4, 4:3, 9:16, 16:9 — not 2:3 (Pinterest)
  if (aspectRatio === "2:3") return "3:4";
  return aspectRatio;
}

function buildPrompt(manifest, asset) {
  return `${asset.prompt}. ${manifest.style_suffix}`;
}

function isImagenModel(model) {
  return IMAGEN_MODELS.has(model) || model.startsWith("imagen-");
}

async function generateImage(prompt, aspectRatio, opts) {
  const key = getApiKey();
  const imagenAr = mapAspectRatio(aspectRatio);
  const useImagen = isImagenModel(opts.model);
  const url = `${API_BASE}/${opts.model}:${useImagen ? "predict" : "generateContent"}`;
  const body = useImagen
    ? {
        instances: [{ prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: imagenAr,
          imageSize: opts.imageSize,
          personGeneration: "allow_adult",
        },
      }
    : {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ["IMAGE"],
          imageConfig: { aspectRatio: imagenAr },
        },
      };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": key,
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON (${res.status}): ${text.slice(0, 400)}`);
  }

  if (!res.ok) {
    const msg =
      json?.error?.message ||
      json?.message ||
      (typeof json === "string" ? json : JSON.stringify(json).slice(0, 300));
    throw new Error(`${opts.model} API ${res.status}: ${msg}`);
  }

  if (!useImagen) {
    const parts = json?.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      const data = part.inlineData?.data || part.inline_data?.data;
      if (data) return Buffer.from(data, "base64");
    }
    throw new Error(`No image in generateContent response: ${JSON.stringify(json).slice(0, 300)}`);
  }

  const predictions = json.predictions || json.generatedImages || [];
  if (!predictions.length) {
    throw new Error(`No predictions in response: ${JSON.stringify(json).slice(0, 300)}`);
  }

  const first = predictions[0];
  if (first.bytesBase64Encoded) {
    return Buffer.from(first.bytesBase64Encoded, "base64");
  }
  if (first.image?.imageBytes) {
    return Buffer.from(first.image.imageBytes, "base64");
  }
  throw new Error(`No image bytes in prediction: ${JSON.stringify(first).slice(0, 200)}`);
}

function saveImage(buf, destPath) {
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, buf);
}

async function generateAsset(manifest, asset, opts, progress) {
  if (
    !opts.force &&
    progress.completed[asset.id]?.path &&
    existsSync(progress.completed[asset.id].path)
  ) {
    console.log(`⏭  ${asset.id} already done → ${progress.completed[asset.id].path}`);
    return progress.completed[asset.id].path;
  }

  const prompt = buildPrompt(manifest, asset);
  const imagenAr = mapAspectRatio(asset.aspect_ratio);
  console.log(`\n▶ ${asset.id} (${asset.aspect_ratio} → ${imagenAr})`);
  console.log(`  ${prompt.slice(0, 140)}…`);

  if (opts.dryRun) return null;

  let buf;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      buf = await generateImage(prompt, asset.aspect_ratio, opts);
      break;
    } catch (err) {
      const retryable = /\b(429|503|500|overloaded|high demand|quota)\b/i.test(err.message);
      if (!retryable || attempt === MAX_RETRIES) throw err;
      const wait = RETRY_BASE_MS * Math.pow(2, attempt) + Math.random() * 2000;
      console.log(`  ⏳ ${err.message.slice(0, 80)}… retry ${attempt + 1}/${MAX_RETRIES} in ${(wait / 1000).toFixed(0)}s`);
      await sleep(wait);
    }
  }
  const repoPath = join(OUTPUT_REPO, `slot${asset.slot}`, asset.filename);
  saveImage(buf, repoPath);

  const desktopDir = join(OUTPUT_DESKTOP, asset.desktop_subdir || `slot${asset.slot}`);
  mkdirSync(desktopDir, { recursive: true });
  const desktopPath = join(desktopDir, asset.filename);
  copyFileSync(repoPath, desktopPath);

  if (asset.also_copy_as) {
    for (const alias of asset.also_copy_as) {
      copyFileSync(repoPath, join(OUTPUT_REPO, `slot${asset.slot}`, alias));
      copyFileSync(repoPath, join(desktopDir, alias));
    }
  }

  progress.completed[asset.id] = {
    path: repoPath,
    desktop: desktopPath,
    model: opts.model,
    generatedAt: new Date().toISOString(),
  };
  saveProgress(progress);

  console.log(`  ✓ ${repoPath}`);
  console.log(`  ✓ ${desktopPath}`);
  return repoPath;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  loadEnv();
  const opts = parseArgs(process.argv);
  const manifest = loadManifest();
  const assets = selectAssets(manifest, opts);
  const progress = loadProgress();

  if (opts.dryRun) {
    console.log(`Dry run — ${assets.length} assets, model: ${opts.model}\n`);
    for (const asset of assets) {
      const imagenAr = mapAspectRatio(asset.aspect_ratio);
      console.log(`• ${asset.id} → ${asset.filename} (${asset.aspect_ratio} → ${imagenAr})`);
      console.log(`  ${buildPrompt(manifest, asset)}\n`);
    }
    return;
  }

  const key = getApiKey();
  if (!key) {
    console.error(`
No Google/Gemini API key found.

Add your key to:
  ${ENV_PATH}

Example:
  GOOGLE_API_KEY=your_key_here

Get a key at https://aistudio.google.com/apikey
(same key used for IndiePress Imagen Ultra pipelines)

Then run:
  node scripts/generate-social-imagen.mjs --slot 1
`);
    process.exit(1);
  }

  mkdirSync(OUTPUT_REPO, { recursive: true });
  mkdirSync(OUTPUT_DESKTOP, { recursive: true });

  console.log(`Generating ${assets.length} assets via ${opts.model} (${opts.imageSize})…`);
  console.log(`Repo output: ${OUTPUT_REPO}`);
  console.log(`Desktop output: ${OUTPUT_DESKTOP}`);

  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];
    try {
      await generateAsset(manifest, asset, opts, progress);
      if (i < assets.length - 1) await sleep(REQUEST_DELAY_MS);
    } catch (err) {
      console.error(`\n✗ ${asset.id}: ${err.message}`);
      process.exitCode = 1;
    }
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

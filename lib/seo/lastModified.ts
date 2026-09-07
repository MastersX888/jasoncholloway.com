import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

/**
 * Last-commit date for a source file, for sitemap `lastModified`.
 *
 * `new Date()` at build time stamps every URL as changed on every deploy, which
 * is the fastest way to teach Google to ignore the field entirely. Git already
 * knows when each page actually changed, so use that.
 *
 * Falls back to `FALLBACK` when git is unavailable or the history is shallow
 * (some CI checkouts clone with `--depth=1`), because a stable wrong-but-old
 * date is still a better signal than a fresh one on every build.
 */
const FALLBACK = new Date("2026-09-07");

const cache = new Map<string, Date>();

export function lastModified(sourcePath: string): Date {
  const cached = cache.get(sourcePath);
  if (cached) return cached;

  let result = FALLBACK;
  try {
    if (existsSync(sourcePath)) {
      const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", sourcePath], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      const parsed = out ? new Date(out) : null;
      if (parsed && !Number.isNaN(parsed.getTime())) result = parsed;
    }
  } catch {
    // git missing, not a repo, or a shallow clone — keep the fallback.
  }

  cache.set(sourcePath, result);
  return result;
}

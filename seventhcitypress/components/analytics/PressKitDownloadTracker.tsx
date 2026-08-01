"use client";

import { useEffect } from "react";
import { trackFileDownload } from "@/lib/analytics/gtag";

/**
 * Reports press-kit PDF clicks to GA4.
 *
 * Implemented as one delegated document listener rather than an onClick on each
 * link: the press kit is linked from the hero, a five-tile grid, the contact page,
 * and the site-wide footer, and a single listener cannot fall out of sync with them.
 * Renders nothing, so it introduces no markup or layout change.
 */
export default function PressKitDownloadTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      const path = href.startsWith("http")
        ? new URL(href, window.location.origin).pathname
        : href;
      if (!path.startsWith("/press-kit/")) return;

      const fileName = path.split("/").pop() ?? path;
      const extension = fileName.includes(".") ? fileName.split(".").pop()! : "";

      trackFileDownload({
        fileName,
        fileExtension: extension,
        linkUrl: new URL(href, window.location.origin).toString(),
        linkText: link.textContent?.trim() || undefined,
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

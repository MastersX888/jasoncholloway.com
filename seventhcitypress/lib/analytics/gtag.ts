/**
 * GA4 configuration for seventhcitypress.com.
 *
 * The imprint site shares the author site's GA4 property on purpose, so press-kit
 * traffic and author-site traffic land in one report instead of two disconnected
 * ones. Reusing the measurement ID needs no new credentials and works today.
 *
 * If Jason later creates a dedicated web data stream for this domain, set
 * `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the Cloudflare Pages project and nothing else
 * has to change. See PRESS_KIT_MEASUREMENT notes in the SEO fixes report.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-79RDL3BDEH";

/** Domains treated as one site for GA4 cross-domain measurement. */
export const GA_LINKER_DOMAINS = [
  "seventhcitypress.com",
  "jasoncholloway.com",
];

type GtagArgs =
  | ["event", string, Record<string, unknown>?]
  | ["config", string, Record<string, unknown>?]
  | ["js", Date];

declare global {
  interface Window {
    gtag?: (...args: GtagArgs) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fires GA4's `file_download` event. The press kit 404'd in production for two
 * months without anyone noticing because nothing on this domain was measured;
 * this is the signal that makes that class of failure visible.
 */
export function trackFileDownload(params: {
  fileName: string;
  fileExtension: string;
  linkUrl: string;
  linkText?: string;
}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "file_download", {
    file_name: params.fileName,
    file_extension: params.fileExtension,
    link_url: params.linkUrl,
    ...(params.linkText ? { link_text: params.linkText } : {}),
  });
}

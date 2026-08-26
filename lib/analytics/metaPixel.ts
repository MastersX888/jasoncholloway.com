/** Meta Pixel — created 2026-08-26 in Events Manager (ad account 1029210490026605)
 * specifically so the Facebook ad campaign can optimize for actual buyer intent
 * instead of raw landing-page views. Books sell through Amazon/IngramSpark, not a
 * checkout on this site, so Meta can never see a real Purchase event here — the
 * click on a "Buy" link (the moment someone leaves this site to go buy) is the
 * closest real signal Meta can observe, so that's what gets tracked.
 */
export const META_PIXEL_ID = "1050578230946524";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fbqEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", eventName, params);
}

/** Fired on every click of a "Buy Direct" / retailer link — mirrors the GA4
 * begin_checkout + Google Ads proxy-conversion pattern in trackBeginCheckout.
 * InitiateCheckout (not Lead) is the correct standard Meta event for "clicked
 * through toward buying," and is what a Sales-objective campaign optimizes on. */
export function trackMetaInitiateCheckout(value?: number, contentIds?: string[]) {
  fbqEvent("InitiateCheckout", {
    currency: "USD",
    value: typeof value === "number" && !Number.isNaN(value) ? value : undefined,
    content_ids: contentIds && contentIds.length ? contentIds : undefined,
    content_type: "product",
  });
}

/**
 * Trilogy / omnibus checkout routing — Share & Sell is one ISBN per cart.
 * Omnibus is the single-checkout path for complete-trilogy print buyers.
 */
import { books } from "./books";

export const TRILOGY_HUB_PATH = "/books/masters-x/";
export const OMNIBUS_PATH = "/books/masters-x/omnibus/";

export function getOmnibusBook() {
  return books.find((b) => b.slug === "omnibus");
}

/** Sum of direct IngramSpark prices for Vol I–III (same format). */
export function trilogyIndividualTotal(format: "Paperback" | "Hardcover"): number {
  const vols = books.filter((b) => b.series === "Masters X" && b.slug !== "omnibus");
  const key = format === "Paperback" ? "price_pb_is" : "price_hc_is";
  return vols.reduce((sum, b) => sum + parseFloat(b[key] ?? "0"), 0);
}

export function trilogySavings(format: "Paperback" | "Hardcover"): number {
  const omnibus = getOmnibusBook();
  if (!omnibus) return 0;
  const omnibusPrice =
    format === "Paperback" ? omnibus.price_pb_is : omnibus.price_hc_is;
  if (!omnibusPrice) return 0;
  return Math.round((trilogyIndividualTotal(format) - parseFloat(omnibusPrice)) * 100) / 100;
}

/** Paste-ready for UI — one Share & Sell checkout vs three. */
export function omnibusSavingsLine(): string {
  const pb = trilogySavings("Paperback");
  const hc = trilogySavings("Hardcover");
  return `One checkout, one shipping charge — save $${pb.toFixed(2)} (paperback) or $${hc.toFixed(2)} (hardcover) vs. three separate orders.`;
}

/** Paid/social campaign landing — omnibus page, not trilogy hub. */
export function omnibusCampaignUrl(
  source: string,
  medium: string,
  campaign: string
): string {
  const url = new URL(`https://jasoncholloway.com${OMNIBUS_PATH}`);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

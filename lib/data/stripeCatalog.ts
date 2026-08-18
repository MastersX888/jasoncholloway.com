/** Stripe Checkout SKU keys — must match offer `key` values in storefront.ts,
 *  plus the synthetic bundle SKU below. Price IDs live in Cloudflare env vars. */

export type StripeSku =
  | "omnibus-hardcover"
  | "omnibus-paperback"
  | "the-inheritance-of-frequency-hardcover"
  | "the-inheritance-of-frequency-paperback"
  | "the-grimoire-hardcover"
  | "the-grimoire-paperback"
  | "the-kingdom-hardcover"
  | "the-kingdom-paperback"
  | "hawkes-monograph-hardcover"
  | "hawkes-monograph-paperback"
  | "hardcover-set";

/** Maps each SKU to the Cloudflare Pages secret that holds its Stripe Price ID. */
export const STRIPE_PRICE_ENV: Record<StripeSku, string | string[]> = {
  "omnibus-hardcover": "STRIPE_PRICE_OMNIBUS_HC",
  "omnibus-paperback": "STRIPE_PRICE_OMNIBUS_PB",
  "the-inheritance-of-frequency-hardcover": "STRIPE_PRICE_MX1_HC",
  "the-inheritance-of-frequency-paperback": "STRIPE_PRICE_MX1_PB",
  "the-grimoire-hardcover": "STRIPE_PRICE_MX2_HC",
  "the-grimoire-paperback": "STRIPE_PRICE_MX2_PB",
  "the-kingdom-hardcover": "STRIPE_PRICE_MX3_HC",
  "the-kingdom-paperback": "STRIPE_PRICE_MX3_PB",
  "hawkes-monograph-hardcover": "STRIPE_PRICE_HAWKES_HC",
  "hawkes-monograph-paperback": "STRIPE_PRICE_HAWKES_PB",
  /** Three line items, one cart, one shipping charge — the set Ingram cannot sell. */
  "hardcover-set": [
    "STRIPE_PRICE_MX1_HC",
    "STRIPE_PRICE_MX2_HC",
    "STRIPE_PRICE_MX3_HC",
  ],
};

export function isStripeSku(value: string): value is StripeSku {
  return value in STRIPE_PRICE_ENV;
}

/** When true at build time, print buy buttons route to /api/checkout instead of Ingram. */
export const stripeCheckoutEnabled =
  process.env.NEXT_PUBLIC_STRIPE_CHECKOUT === "true";

export function stripeCheckoutPath(sku: string): string {
  return `/api/checkout?sku=${encodeURIComponent(sku)}`;
}

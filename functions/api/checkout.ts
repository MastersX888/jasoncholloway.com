/** Creates a Stripe Checkout Session and redirects the buyer.
 *  Google Pay and Apple Pay appear automatically when enabled on the Stripe account. */

interface Env {
  STRIPE_SECRET_KEY?: string;
  STRIPE_PRICE_OMNIBUS_HC?: string;
  STRIPE_PRICE_OMNIBUS_PB?: string;
  STRIPE_PRICE_MX1_HC?: string;
  STRIPE_PRICE_MX1_PB?: string;
  STRIPE_PRICE_MX2_HC?: string;
  STRIPE_PRICE_MX2_PB?: string;
  STRIPE_PRICE_MX3_HC?: string;
  STRIPE_PRICE_MX3_PB?: string;
  STRIPE_PRICE_HAWKES_HC?: string;
  STRIPE_PRICE_HAWKES_PB?: string;
  /** Flat USD shipping added at checkout (e.g. "5.99"). Omit to skip shipping line. */
  STRIPE_SHIPPING_USD?: string;
  SITE_ORIGIN?: string;
}

type SkuSpec = string | string[];

const SKU_PRICES: Record<string, SkuSpec> = {
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
  "hardcover-set": [
    "STRIPE_PRICE_MX1_HC",
    "STRIPE_PRICE_MX2_HC",
    "STRIPE_PRICE_MX3_HC",
  ],
};

function siteOrigin(env: Env, request: Request): string {
  return env.SITE_ORIGIN?.replace(/\/$/, "") ?? new URL(request.url).origin;
}

function resolvePriceIds(env: Env, spec: SkuSpec): string[] {
  const keys = Array.isArray(spec) ? spec : [spec];
  const ids: string[] = [];
  for (const key of keys) {
    const priceId = env[key as keyof Env];
    if (typeof priceId === "string" && priceId.startsWith("price_")) {
      ids.push(priceId);
    }
  }
  return ids;
}

async function createCheckoutSession(
  secretKey: string,
  priceIds: string[],
  origin: string,
  shippingUsd?: string
): Promise<{ url?: string; error?: string }> {
  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("success_url", `${origin}/order-confirmed/?session_id={CHECKOUT_SESSION_ID}`);
  body.set("cancel_url", `${origin}/#buy`);
  body.set("billing_address_collection", "required");
  body.set("shipping_address_collection[allowed_countries][0]", "US");
  body.set("phone_number_collection[enabled]", "true");

  priceIds.forEach((priceId, index) => {
    body.set(`line_items[${index}][price]`, priceId);
    body.set(`line_items[${index}][quantity]`, "1");
  });

  if (shippingUsd) {
    const cents = Math.round(parseFloat(shippingUsd) * 100);
    if (Number.isFinite(cents) && cents > 0) {
      body.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
      body.set(
        "shipping_options[0][shipping_rate_data][fixed_amount][amount]",
        String(cents)
      );
      body.set(
        "shipping_options[0][shipping_rate_data][fixed_amount][currency]",
        "usd"
      );
      body.set(
        "shipping_options[0][shipping_rate_data][display_name]",
        "Standard US shipping (printed to order)"
      );
    }
  }

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const payload = (await response.json()) as { url?: string; error?: { message?: string } };
  if (!response.ok) {
    return { error: payload.error?.message ?? "Stripe session failed" };
  }
  return { url: payload.url };
}

export const onRequestGet = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const sku = context.request.url
    ? new URL(context.request.url).searchParams.get("sku")?.trim()
    : null;

  if (!sku || !(sku in SKU_PRICES)) {
    return new Response("Unknown or missing sku", { status: 400 });
  }

  const secretKey = context.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return new Response("Checkout is not configured yet", { status: 503 });
  }

  const priceIds = resolvePriceIds(context.env, SKU_PRICES[sku]);
  if (priceIds.length === 0) {
    return new Response("Price not configured for this edition", { status: 503 });
  }

  const origin = siteOrigin(context.env, context.request);
  const session = await createCheckoutSession(
    secretKey,
    priceIds,
    origin,
    context.env.STRIPE_SHIPPING_USD
  );

  if (!session.url) {
    return new Response(session.error ?? "Could not start checkout", { status: 502 });
  }

  return Response.redirect(session.url, 303);
};

export const GA_MEASUREMENT_ID = "G-79RDL3BDEH";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type GaItem = {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
  price?: number;
  quantity?: number;
};

export function buildBookItem({
  itemId,
  itemName,
  itemVariant,
  price,
}: {
  itemId: string;
  itemName: string;
  itemVariant?: string;
  price?: string | number;
}): GaItem {
  const parsedPrice =
    typeof price === "string" ? parseFloat(price) : price;

  return {
    item_id: itemId,
    item_name: itemName,
    item_brand: "Seventh City Press",
    item_category: "Books",
    item_variant: itemVariant,
    price: parsedPrice && !Number.isNaN(parsedPrice) ? parsedPrice : undefined,
    quantity: 1,
  };
}

function gtagEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

export function trackViewItem(items: GaItem[], value?: number) {
  gtagEvent("view_item", {
    currency: "USD",
    value,
    items,
  });
}

export function trackBeginCheckout(items: GaItem[], value?: number) {
  gtagEvent("begin_checkout", {
    currency: "USD",
    value,
    items,
  });
}

export function trackGenerateLead() {
  gtagEvent("generate_lead");
}

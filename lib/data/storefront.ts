// Purchase-first view of the catalog: every buyable edition, flattened and
// ordered the way a reader who arrived to buy expects to see it (omnibus
// hardcover first). Prices, ISBNs, and retailer URLs all come from books.ts —
// this module reshapes that data, it never introduces new commerce facts.
import { books, type Book } from "./books";
import { BUY_LINKS, bookshopIsbnUrl, googlePlayIsbnUrl } from "./buyLinks";
import { stripeCheckoutEnabled, stripeCheckoutPath } from "./stripeCatalog";

export type CoverShape = "pb" | "hc" | "ebook" | "omnibus";

export type OfferChannel = "direct" | "kindle" | "google-play" | "bookshop";

export interface StoreOffer {
  key: string;
  /** Consumer-facing format name: Hardcover, Paperback, Kindle, Ebook. */
  format: string;
  /** Row label in the buy box — the edition title for set rows. */
  label: string;
  /** Optional row qualifier, e.g. "Book I". */
  eyebrow?: string;
  /** ISBN (print) or ASIN (Kindle) — doubles as the GA4 item_id. */
  itemId: string;
  itemName: string;
  itemVariant: string;
  url: string;
  price?: string;
  listPrice?: string;
  channel: OfferChannel;
  channelLabel: string;
  fulfillment?: string;
}

/**
 * What a reader actually has to do to pay, per channel. Print checkout is
 * IngramSpark's and takes cards only; wallet checkout on print would require
 * Seventh City Press to run its own checkout (see docs/CHECKOUT_ROADMAP.md).
 */
export const PAYMENT_NOTES: Record<OfferChannel, string> = {
  direct: stripeCheckoutEnabled
    ? "Card · Google Pay · Apple Pay — secure checkout on Seventh City Press"
    : "Card checkout (Visa · Mastercard · Amex) — no account to create",
  kindle: "Checkout with your existing Amazon account",
  "google-play": "Checkout with your Google account · Google Pay",
  bookshop: "Card or wallet checkout at Bookshop.org",
};

export interface StoreSecondaryLink {
  label: string;
  url: string;
}

export interface StoreCover {
  src: string;
  alt: string;
  shape: CoverShape;
  caption?: string;
}

export interface StoreProduct {
  id: string;
  kind: "omnibus" | "set" | "volume" | "monograph";
  /** Short label for the buy box selector. */
  tabLabel: string;
  badge?: string;
  title: string;
  byline: string;
  blurb: string;
  spec?: string;
  detailHref: string;
  covers: StoreCover[];
  /** The design hidden under the dust jacket, stamped on the case boards. */
  caseCover?: { src?: string; alt?: string };
  caseCoverNote?: string;
  offers: StoreOffer[];
  /** Sum of the offer prices for multi-order products (the hardcover set). */
  bundleTotal?: string;
  bundleNote?: string;
  /** Why this edition is the one to buy, shown under the offer rows. */
  valueNote?: string;
  secondaryLinks: StoreSecondaryLink[];
}

const DIRECT_LABEL = "Direct from Seventh City Press";
// IngramSpark Share & Sell fulfillment window, per their order FAQ.
const DIRECT_FULFILLMENT = "Printed to order · ships in 2–3 business days";

function directCheckoutUrl(offerKey: string, ingramUrl: string): string {
  return stripeCheckoutEnabled ? stripeCheckoutPath(offerKey) : ingramUrl;
}

function ingramUrl(book: Book, format: "Hardcover" | "Paperback"): string | undefined {
  return book.buyLinks.find(
    (link) => link.url.includes("shop.ingramspark.com") && link.format === format
  )?.url;
}

function bookName(book: Book): string {
  return book.series === "Masters X" ? `${book.title}: ${book.subtitle}` : book.title;
}

function printOffer(book: Book, format: "Hardcover" | "Paperback"): StoreOffer | null {
  const url = ingramUrl(book, format);
  const itemId = format === "Hardcover" ? book.isbn_hc : book.isbn_pb;
  if (!url || !itemId) return null;
  const offerKey = `${book.slug}-${format.toLowerCase()}`;

  return {
    key: offerKey,
    format,
    label: format,
    itemId,
    itemName: `${bookName(book)} (${format})`,
    itemVariant: format,
    url: directCheckoutUrl(offerKey, url),
    price: format === "Hardcover" ? book.price_hc_is : book.price_pb_is,
    listPrice: format === "Hardcover" ? book.price_hc_msrp : book.price_pb_msrp,
    channel: "direct",
    channelLabel: DIRECT_LABEL,
    fulfillment: DIRECT_FULFILLMENT,
  };
}

function kindleOffer(book: Book): StoreOffer | null {
  if (!book.asin_ebook) return null;

  return {
    key: `${book.slug}-kindle`,
    format: "Kindle",
    label: "Kindle",
    itemId: book.asin_ebook,
    itemName: `${bookName(book)} (Kindle)`,
    itemVariant: "Kindle",
    url: `https://www.amazon.com/dp/${book.asin_ebook}`,
    price: book.price_ebook,
    channel: "kindle",
    channelLabel: "Amazon",
    fulfillment: "Delivered instantly to your Kindle app or device",
  };
}

function googlePlayOffer(book: Book): StoreOffer | null {
  if (!book.isbn_ebook || book.asin_ebook) return null;

  return {
    key: `${book.slug}-google-play`,
    format: "Ebook",
    label: "Ebook",
    itemId: book.isbn_ebook,
    itemName: `${bookName(book)} (Ebook)`,
    itemVariant: "Ebook",
    url: googlePlayIsbnUrl(book.isbn_ebook),
    price: book.price_ebook,
    channel: "google-play",
    channelLabel: "Google Play Books",
    fulfillment: "Read in the Google Play Books app",
  };
}

function googlePlaySecondary(book: Book): StoreSecondaryLink[] {
  if (!book.isbn_ebook || !book.asin_ebook) return [];
  return [{ label: "Google Play Books (EPUB)", url: googlePlayIsbnUrl(book.isbn_ebook) }];
}

function bookshopSecondary(book: Book): StoreSecondaryLink[] {
  const links: StoreSecondaryLink[] = [];
  if (book.isbn_pb) {
    links.push({
      label: "Bookshop.org — paperback (supports independent bookstores)",
      url: bookshopIsbnUrl(book.isbn_pb),
    });
  }
  if (book.isbn_hc) {
    links.push({
      label: "Bookshop.org — hardcover (supports independent bookstores)",
      url: bookshopIsbnUrl(book.isbn_hc),
    });
  }
  return links;
}

function money(total: number): string {
  return total.toFixed(2);
}

const omnibus = books.find((b) => b.slug === "omnibus");
const volumes = books
  .filter((b) => b.series === "Masters X" && b.slug !== "omnibus")
  .sort((a, b) => (a.volume ?? 0) - (b.volume ?? 0));
const hawkes = books.find((b) => b.slug === "hawkes-monograph");

if (!omnibus) throw new Error("storefront: omnibus edition missing from books.ts");
if (volumes.length !== 3) throw new Error("storefront: expected three Masters X volumes");

const ROMAN = ["I", "II", "III"];

function volumeTotal(format: "Hardcover" | "Paperback"): number {
  return volumes.reduce((sum, book) => {
    const price = format === "Hardcover" ? book.price_hc_is : book.price_pb_is;
    return sum + parseFloat(price ?? "0");
  }, 0);
}

/** What the three volumes cost bought separately, versus the omnibus. */
export const omnibusComparison = {
  hardcover: {
    omnibus: omnibus.price_hc_is ?? "",
    volumes: money(volumeTotal("Hardcover")),
    saving: money(volumeTotal("Hardcover") - parseFloat(omnibus.price_hc_is ?? "0")),
  },
  paperback: {
    omnibus: omnibus.price_pb_is ?? "",
    volumes: money(volumeTotal("Paperback")),
    saving: money(volumeTotal("Paperback") - parseFloat(omnibus.price_pb_is ?? "0")),
  },
};

export const omnibusProduct: StoreProduct = {
  id: "omnibus",
  kind: "omnibus",
  tabLabel: "Complete Trilogy (Omnibus)",
  badge: "Best value",
  title: "Masters X: The Complete Trilogy",
  byline: "Omnibus Edition · Jason Carroll Holloway",
  blurb:
    "All three novels in one volume. The edition to buy if you want the whole story in a single book.",
  spec: `${omnibus.pageCountHC ?? omnibus.pageCount} pages hardcover · ${omnibus.pageCountPB ?? omnibus.pageCount} pages paperback`,
  detailHref: "/books/masters-x/omnibus",
  covers: [
    {
      src: omnibus.coverImageHC,
      alt: "Masters X Omnibus Edition hardcover — the complete trilogy in one volume",
      shape: "omnibus",
    },
  ],
  caseCover: omnibus.caseCoverImage
    ? { src: omnibus.caseCoverImage, alt: omnibus.caseCoverAlt }
    : omnibus.caseCoverAlt
      ? { alt: omnibus.caseCoverAlt }
      : undefined,
  caseCoverNote: omnibus.caseCoverNote,
  offers: [printOffer(omnibus, "Hardcover"), printOffer(omnibus, "Paperback")].filter(
    (offer): offer is StoreOffer => offer !== null
  ),
  valueNote: `One book, one order, one shipping charge. The three hardcovers bought separately come to $${omnibusComparison.hardcover.volumes} plus three shipping charges — the omnibus hardcover is $${omnibusComparison.hardcover.saving} less for the same three novels.`,
  secondaryLinks: bookshopSecondary(omnibus),
};

const setOffers: StoreOffer[] = volumes
  .map((book): StoreOffer | null => {
    const offer = printOffer(book, "Hardcover");
    if (!offer) return null;
    return {
      ...offer,
      eyebrow: `Book ${ROMAN[(book.volume ?? 1) - 1]}`,
      label: book.subtitle,
    };
  })
  .filter((offer): offer is StoreOffer => offer !== null);

export const hardcoverSetProduct: StoreProduct = {
  id: "hardcover-set",
  kind: "set",
  tabLabel: "Hardcover Set (Books I–III)",
  badge: "Three-volume set",
  title: "The Masters X Hardcover Set",
  byline: "Books I–III · Jason Carroll Holloway",
  blurb:
    "The three individual hardcovers, matched as a set on the shelf. Buy all three, or start with Book I.",
  spec: `Three hardcover volumes · ${volumes.reduce((sum, book) => sum + (book.pageCountHC ?? book.pageCount), 0)} pages total`,
  detailHref: "/books/masters-x",
  covers: volumes.map((book) => ({
    src: book.coverImageHC,
    alt: `${book.subtitle} hardcover — Masters X Book ${ROMAN[(book.volume ?? 1) - 1]}`,
    shape: "hc" as CoverShape,
    caption: `Book ${ROMAN[(book.volume ?? 1) - 1]}`,
  })),
  offers: setOffers,
  bundleTotal: money(
    setOffers.reduce((sum, offer) => sum + parseFloat(offer.price ?? "0"), 0)
  ),
  // IngramSpark Share & Sell links are one title per order with no cart, so
  // three hardcovers means three orders and three shipping charges. Readers who
  // want one shipment need either the omnibus or a retailer with a real cart.
  bundleNote:
    "plus three separate shipping charges — IngramSpark bills each title as its own order. For all three in one shipment, use the one-cart link below, or take the omnibus hardcover: one book, one order, one shipping charge.",
  secondaryLinks: [
    ...(stripeCheckoutEnabled
      ? [
          {
            label: "All three hardcovers — one cart, one shipping charge (Stripe)",
            url: stripeCheckoutPath("hardcover-set"),
          },
        ]
      : []),
    {
      label: "All three in one cart at Bookshop.org — one order, one shipping charge",
      url: BUY_LINKS.BOOKSHOP_LIST_URL,
    },
  ],
};

export const volumeProducts: StoreProduct[] = volumes.map((book) => {
  const numeral = ROMAN[(book.volume ?? 1) - 1];

  return {
    id: book.slug,
    kind: "volume" as const,
    tabLabel: `Book ${numeral} — ${book.subtitle}`,
    title: `${book.title}: ${book.subtitle}`,
    byline: `Book ${numeral} of the trilogy · Jason Carroll Holloway`,
    blurb: book.shortDesc,
    spec: `${book.pageCountPB ?? book.pageCount} pages paperback · ${book.pageCountHC ?? book.pageCount} pages hardcover`,
    detailHref: `/books/masters-x/${book.slug}`,
    covers: [
      {
        src: book.coverImageHC,
        alt: `${book.subtitle} hardcover — Masters X Book ${numeral}`,
        shape: "hc" as CoverShape,
      },
    ],
    offers: [
      printOffer(book, "Hardcover"),
      printOffer(book, "Paperback"),
      kindleOffer(book),
    ].filter((offer): offer is StoreOffer => offer !== null),
    secondaryLinks: [...googlePlaySecondary(book), ...bookshopSecondary(book)],
  };
});

export const monographProduct: StoreProduct | null = hawkes
  ? {
      id: hawkes.slug,
      kind: "monograph",
      tabLabel: "Hawkes Monograph (Criticism)",
      title: hawkes.title,
      byline: "Literary criticism · Jason Carroll Holloway",
      blurb: hawkes.shortDesc,
      spec: `${hawkes.pageCount} pages`,
      detailHref: "/books/hawkes-monograph",
      covers: [
        {
          src: hawkes.coverImageHC,
          alt: "Innocence, Desire, and the Architecture of the Fall — hardcover",
          shape: "hc",
        },
      ],
      offers: [
        printOffer(hawkes, "Hardcover"),
        printOffer(hawkes, "Paperback"),
        googlePlayOffer(hawkes),
      ].filter((offer): offer is StoreOffer => offer !== null),
      secondaryLinks: bookshopSecondary(hawkes),
    }
  : null;

/** Buy-box order: what a reader who came to buy should see, top to bottom. */
export const storeProducts: StoreProduct[] = [
  omnibusProduct,
  hardcoverSetProduct,
  ...volumeProducts,
  ...(monographProduct ? [monographProduct] : []),
];

export function findOffer(product: StoreProduct, format: string): StoreOffer | undefined {
  return product.offers.find((offer) => offer.format === format);
}

/** Cheapest way to start reading, quoted in the buy box footer. */
export const kindleEntryPrice = volumeProducts[0]?.offers.find(
  (offer) => offer.channel === "kindle"
)?.price;

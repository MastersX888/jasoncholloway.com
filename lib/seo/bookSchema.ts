/**
 * schema.org Book graph builder.
 *
 * One builder serves every title page so the required and recommended properties
 * from Google's Book structured-data documentation (`url`, `image`, ISO 639-1
 * `inLanguage`, `datePublished`, `description`) cannot drift apart between the
 * trilogy volumes, the omnibus, and the monograph.
 *
 * Retailer routing is a catalog rule, not a presentation choice: Kindle editions
 * point at Amazon, and every print edition points at IngramSpark. The omnibus has
 * no Amazon product at all, so it must never emit an Amazon action.
 */
import {
  ORGANIZATION_ID,
  PERSON_ID,
  SERIES_WIKIDATA_URL,
} from "@/lib/data/authorAuthority";
import type { Book } from "@/lib/data/books";
import { googlePlayIsbnUrl } from "@/lib/data/buyLinks";

export const SITE_ORIGIN = "https://jasoncholloway.com";

export const MASTERS_X_SERIES_URL = `${SITE_ORIGIN}/books/masters-x/`;
export const MASTERS_X_SERIES_ID = `${MASTERS_X_SERIES_URL}#series`;
export const MASTERS_X_VOLUME_SLUGS = [
  "the-inheritance-of-frequency",
  "the-grimoire",
  "the-kingdom",
] as const;

const AUTHOR_REF = { "@id": PERSON_ID };
const PUBLISHER_REF = { "@id": ORGANIZATION_ID };

const WEB_PLATFORMS = [
  "https://schema.org/DesktopWebPlatform",
  "https://schema.org/MobileWebPlatform",
];

const APP_PLATFORMS = [
  ...WEB_PLATFORMS,
  "https://schema.org/IOSPlatform",
  "https://schema.org/AndroidPlatform",
];

type ReadActionInput = {
  url: string;
  price?: string;
  platforms: string[];
  /** Omitted for Amazon: Amazon is the seller of Kindle editions, not the imprint. */
  sellerIsImprint: boolean;
};

function readAction({ url, price, platforms, sellerIsImprint }: ReadActionInput) {
  return {
    "@type": "ReadAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: url,
      actionPlatform: platforms,
    },
    ...(price
      ? {
          expectsAcceptanceOf: {
            "@type": "Offer",
            price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            ...(sellerIsImprint ? { seller: PUBLISHER_REF } : {}),
          },
        }
      : {}),
  };
}

export type BookGraphOptions = {
  /** Canonical page URL, trailing slash included. */
  pageUrl: string;
  /** Display name for the work, e.g. "Masters X: The Grimoire". */
  name: string;
  description: string;
  genre: string[];
  /** Absolute cover image URL. */
  image?: string;
  /** `@id` of the BookSeries this volume belongs to. */
  seriesId?: string;
  position?: number;
  /** Extra top-level properties, e.g. `about` on the Hawkes monograph. */
  extra?: Record<string, unknown>;
};

export function buildBookGraph(book: Book, options: BookGraphOptions) {
  const {
    pageUrl,
    name,
    description,
    genre,
    image,
    seriesId,
    position,
    extra,
  } = options;

  const pbUrl = book.buyLinks.find((l) => l.label === "IngramSpark (PB)")?.url;
  const hcUrl = book.buyLinks.find((l) => l.label === "IngramSpark (HC)")?.url;

  const workExample: Record<string, unknown>[] = [];

  if (book.isbn_pb) {
    workExample.push({
      "@type": "Book",
      "@id": `${pageUrl}#paperback`,
      name: `${name} (Paperback)`,
      url: pageUrl,
      isbn: book.isbn_pb,
      bookFormat: "https://schema.org/Paperback",
      bookEdition: "First Edition",
      inLanguage: "en",
      ...(book.datePublishedPB ? { datePublished: book.datePublishedPB } : {}),
      numberOfPages: book.pageCountPB ?? book.pageCount,
      author: AUTHOR_REF,
      publisher: PUBLISHER_REF,
      ...(pbUrl
        ? {
            potentialAction: readAction({
              url: pbUrl,
              price: book.price_pb_is,
              platforms: WEB_PLATFORMS,
              sellerIsImprint: true,
            }),
          }
        : {}),
    });
  }

  if (book.isbn_hc) {
    workExample.push({
      "@type": "Book",
      "@id": `${pageUrl}#hardcover`,
      name: `${name} (Hardcover)`,
      url: pageUrl,
      isbn: book.isbn_hc,
      bookFormat: "https://schema.org/Hardcover",
      bookEdition: "First Edition",
      inLanguage: "en",
      ...(book.datePublishedHC ? { datePublished: book.datePublishedHC } : {}),
      numberOfPages: book.pageCountHC ?? book.pageCount,
      author: AUTHOR_REF,
      publisher: PUBLISHER_REF,
      ...(hcUrl
        ? {
            potentialAction: readAction({
              url: hcUrl,
              price: book.price_hc_is,
              platforms: WEB_PLATFORMS,
              sellerIsImprint: true,
            }),
          }
        : {}),
    });
  }

  if (book.isbn_ebook) {
    const ebookActions = [
      readAction({
        url: googlePlayIsbnUrl(book.isbn_ebook),
        price: book.price_ebook,
        platforms: APP_PLATFORMS,
        sellerIsImprint: false,
      }),
    ];
    if (book.asin_ebook) {
      ebookActions.unshift(
        readAction({
          url: `https://www.amazon.com/dp/${book.asin_ebook}`,
          price: book.price_ebook,
          platforms: APP_PLATFORMS,
          sellerIsImprint: false,
        }),
      );
    }

    workExample.push({
      "@type": "Book",
      "@id": `${pageUrl}#ebook`,
      name: book.asin_ebook
        ? `${name} (Kindle / EPUB)`
        : `${name} (EPUB)`,
      url: pageUrl,
      isbn: book.isbn_ebook,
      bookFormat: "https://schema.org/EBook",
      inLanguage: "en",
      ...(book.datePublishedEbook
        ? { datePublished: book.datePublishedEbook }
        : {}),
      author: AUTHOR_REF,
      publisher: PUBLISHER_REF,
      ...(book.asin_ebook
        ? {
            identifier: {
              "@type": "PropertyValue",
              propertyID: "ASIN",
              value: book.asin_ebook,
            },
          }
        : {}),
      potentialAction: ebookActions.length === 1 ? ebookActions[0] : ebookActions,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": `${pageUrl}#work`,
    name,
    url: pageUrl,
    ...(image ? { image } : {}),
    description,
    author: AUTHOR_REF,
    publisher: PUBLISHER_REF,
    inLanguage: "en",
    datePublished: book.datePublished,
    genre,
    ...(seriesId ? { isPartOf: { "@id": seriesId } } : {}),
    ...(position ? { position } : {}),
    ...(extra ?? {}),
    workExample,
  };
}

/** BookSeries node for `/books/masters-x/`, referenced by each volume's `isPartOf`. */
export const mastersXSeriesNode = {
  "@context": "https://schema.org",
  "@type": "BookSeries",
  "@id": MASTERS_X_SERIES_ID,
  name: "Masters X Trilogy",
  url: MASTERS_X_SERIES_URL,
  description:
    "Three novels following a fired Kansas City security guard who inherits classified acoustic research pointing to a sealed Prague crypt.",
  author: { "@id": PERSON_ID },
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en",
  genre: ["Conspiracy Fiction", "Literary Fiction", "Thriller"],
  locationCreated: {
    "@type": "Place",
    name: "Kansas City, Missouri",
  },
  numberOfItems: MASTERS_X_VOLUME_SLUGS.length,
  sameAs: [SERIES_WIKIDATA_URL],
  hasPart: MASTERS_X_VOLUME_SLUGS.map((slug) => ({
    "@id": `${SITE_ORIGIN}/books/masters-x/${slug}/#work`,
  })),
} as const;

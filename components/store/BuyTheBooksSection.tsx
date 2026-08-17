// First thing on the homepage: the omnibus hardcover, the three-volume
// hardcover set, and a route to every other edition. A reader who arrived to
// buy a book should not have to scroll or navigate to find a price.
import Link from "next/link";
import Image from "next/image";
import TrackedBuyLink from "@/components/ui/TrackedBuyLink";
import TrilogyShelf from "@/components/store/TrilogyShelf";
import OpenStoreButton from "@/components/store/OpenStoreButton";
import {
  hardcoverSetProduct,
  kindleEntryPrice,
  omnibusComparison,
  omnibusProduct,
} from "@/lib/data/storefront";

export default function BuyTheBooksSection() {
  const [hardcover, paperback] = omnibusProduct.offers;
  const cover = omnibusProduct.covers[0];

  return (
    <section className="buy-first" id="buy" aria-labelledby="buy-first-heading">
      <div className="container">
        <div className="buy-first-head">
          <span className="label">Buy the books · Direct from Seventh City Press</span>
          <h2 className="buy-first-heading" id="buy-first-heading">
            The Masters X Trilogy is available now
          </h2>
          <p className="buy-first-intro">
            Hardcover, paperback, and Kindle. Print editions ship direct from the
            publisher — printed to order, delivered in a few days, at a lower price than
            retail.
          </p>
        </div>

        <div className="buy-first-grid">
          <article className="buy-first-primary">
            <Link
              href={omnibusProduct.detailHref}
              className="buy-first-cover"
              aria-label="Omnibus edition details"
            >
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="(max-width: 768px) 45vw, 220px"
                style={{ objectFit: "cover" }}
                priority
              />
            </Link>

            <div className="buy-first-primary-body">
              <span className="buy-first-badge">{omnibusProduct.badge} · start here</span>
              <h3 className="buy-first-title">{omnibusProduct.title}</h3>
              <p className="buy-first-byline">{omnibusProduct.byline}</p>
              <p className="buy-first-blurb">
                All three novels in one volume — {omnibusProduct.spec}.
              </p>

              <div className="buy-first-ctas">
                <TrackedBuyLink
                  href={hardcover.url}
                  itemId={hardcover.itemId}
                  itemName={hardcover.itemName}
                  itemVariant={hardcover.itemVariant}
                  price={hardcover.price}
                  className="btn btn-gold btn-lg buy-first-cta"
                  aria-label={`Buy the omnibus hardcover for $${hardcover.price} direct from Seventh City Press`}
                >
                  Buy the hardcover — ${hardcover.price}
                  {hardcover.listPrice && (
                    <span className="buy-first-cta-list">list ${hardcover.listPrice}</span>
                  )}
                </TrackedBuyLink>

                <TrackedBuyLink
                  href={paperback.url}
                  itemId={paperback.itemId}
                  itemName={paperback.itemName}
                  itemVariant={paperback.itemVariant}
                  price={paperback.price}
                  className="btn btn-outline btn-lg buy-first-cta"
                  aria-label={`Buy the omnibus paperback for $${paperback.price} direct from Seventh City Press`}
                >
                  Paperback — ${paperback.price}
                </TrackedBuyLink>
              </div>

              <p className="buy-first-savings">
                The hardcover omnibus is ${omnibusComparison.hardcover.omnibus} against $
                {omnibusComparison.hardcover.volumes} for the three hardcovers bought
                separately — ${omnibusComparison.hardcover.saving} less for the same three
                novels.
              </p>
              <p className="buy-first-fulfillment">{hardcover.fulfillment}</p>
            </div>
          </article>

          <article className="buy-first-set">
            <span className="label">Or the three hardcovers, Books I–III</span>
            <TrilogyShelf covers={hardcoverSetProduct.covers} priority />

            <ul className="buy-first-set-offers">
              {hardcoverSetProduct.offers.map((offer) => (
                <li key={offer.key}>
                  <span className="buy-first-set-volume">{offer.eyebrow}</span>
                  <span className="buy-first-set-title">{offer.label}</span>
                  <TrackedBuyLink
                    href={offer.url}
                    itemId={offer.itemId}
                    itemName={offer.itemName}
                    itemVariant={offer.itemVariant}
                    price={offer.price}
                    className="btn btn-outline btn-sm buy-first-set-btn"
                    aria-label={`Buy ${offer.itemName} for $${offer.price} direct from Seventh City Press`}
                  >
                    Hardcover ${offer.price}
                  </TrackedBuyLink>
                </li>
              ))}
            </ul>

            <p className="buy-first-set-note">
              Set total ${hardcoverSetProduct.bundleTotal}, ordered as three separate
              purchases. Paperbacks and Kindle editions are in the full list below.
            </p>
          </article>
        </div>

        <div className="buy-first-foot">
          <p>
            Prefer an ebook? Kindle editions of Books I–III are ${kindleEntryPrice} each on
            Amazon. Every edition, format, and price is in one list:
          </p>
          <OpenStoreButton source="homepage_buy_section" className="btn btn-gold">
            See all editions &amp; prices
          </OpenStoreButton>
          <Link href="/books" className="btn btn-ghost">
            Browse the full catalog
          </Link>
        </div>
      </div>
    </section>
  );
}

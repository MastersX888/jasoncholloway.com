import CoverImage from "@/components/ui/CoverImage";
import type { StoreCover } from "@/lib/data/storefront";

interface TrilogyShelfProps {
  covers: StoreCover[];
  /**
   * A photograph of the three hardcovers together (spines on a shelf). Until
   * that photography exists, the shelf is rendered from the cover art — see
   * ASSET_GAP_REPORT.md.
   */
  photo?: { src: string; alt: string };
  priority?: boolean;
}

export default function TrilogyShelf({ covers, photo, priority }: TrilogyShelfProps) {
  if (photo) {
    return (
      <div className="shelf shelf-photo">
        <CoverImage
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 768px) 90vw, 420px"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div className="shelf">
      <div className="shelf-books">
        {covers.map((cover) => (
          <div key={cover.src} className="shelf-book">
            <span className="shelf-book-spine" aria-hidden="true" />
            <div className="shelf-book-face" style={{ aspectRatio: "614 / 921" }}>
              <CoverImage
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="(max-width: 620px) 30vw, 104px"
                priority={priority}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="shelf-plank" aria-hidden="true" />
      <div className="shelf-captions">
        {covers.map((cover) => (
          <span key={`${cover.src}-caption`} className="shelf-caption">
            {cover.caption}
          </span>
        ))}
      </div>
    </div>
  );
}

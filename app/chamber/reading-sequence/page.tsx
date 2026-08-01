import type { Metadata } from "next";
import Link from "next/link";
import styles from './reading-sequence.module.css';
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "The Reading Sequence — 15 Texts Behind Masters X",
  titleAbsolute: true,
  description: "The annotated reading sequence from the Masters X Trilogy: fifteen texts curated by Eva Černá, from the Ars Notoria to the Sefer Yetzirah, each annotated for the acoustic-consciousness research the novels document.",
  path: "/chamber/reading-sequence/",
  ogType: "article",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "The Reading Sequence",
      "description": "The annotated reading sequence from the Masters X distribution file \u2014 fifteen texts curated by Eva \u010cern\u00e1.",
      "author": {
        "@type": "Person",
        "name": "Jason Carroll Holloway",
        "url": "https://jasoncholloway.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Seventh City Press"
      }
    },
    {
      "@type": "ItemList",
      "name": "The Reading Sequence",
      "numberOfItems": 15,
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Book",
            "name": "Sirach (Ecclesiasticus)",
            "author": {
              "@type": "Person",
              "name": "Ben Sira (c. 180 BCE)"
            },
            "inLanguage": "Hebrew/Greek"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Book",
            "name": "2 Esdras (Fourth Book of Ezra)",
            "author": {
              "@type": "Person",
              "name": "Anonymous (1st c. CE)"
            },
            "inLanguage": "Latin"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Book",
            "name": "The Gospel of Mary",
            "author": {
              "@type": "Person",
              "name": "Anonymous (2nd c.)"
            },
            "inLanguage": "Coptic"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "Book",
            "name": "The Ars Notoria",
            "author": {
              "@type": "Person",
              "name": "Anonymous (13th c.)"
            },
            "inLanguage": "Latin"
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "Book",
            "name": "Sefer Yetzirah",
            "author": {
              "@type": "Person",
              "name": "Anonymous (attrib. Abraham)"
            },
            "inLanguage": "Hebrew"
          }
        },
        {
          "@type": "ListItem",
          "position": 6,
          "item": {
            "@type": "Book",
            "name": "The Cloud of Unknowing",
            "author": {
              "@type": "Person",
              "name": "Anonymous (14th c.)"
            },
            "inLanguage": "Middle English"
          }
        },
        {
          "@type": "ListItem",
          "position": 7,
          "item": {
            "@type": "Book",
            "name": "De Harmonia Mundi",
            "author": {
              "@type": "Person",
              "name": "Francesco Giorgi (1525)"
            },
            "inLanguage": "Latin"
          }
        },
        {
          "@type": "ListItem",
          "position": 8,
          "item": {
            "@type": "Book",
            "name": "The Zohar (Sifra di-Tzeniuta)",
            "author": {
              "@type": "Person",
              "name": "Anonymous (13th c.)"
            },
            "inLanguage": "Aramaic"
          }
        },
        {
          "@type": "ListItem",
          "position": 9,
          "item": {
            "@type": "Book",
            "name": "Harmonices Mundi (Bk III\u2013IV)",
            "author": {
              "@type": "Person",
              "name": "Johannes Kepler (1619)"
            },
            "inLanguage": "Latin"
          }
        },
        {
          "@type": "ListItem",
          "position": 10,
          "item": {
            "@type": "Book",
            "name": "The Chymical Wedding",
            "author": {
              "@type": "Person",
              "name": "J.V. Andreae (1616)"
            },
            "inLanguage": "German"
          }
        },
        {
          "@type": "ListItem",
          "position": 11,
          "item": {
            "@type": "Book",
            "name": "Theologia Germanica",
            "author": {
              "@type": "Person",
              "name": "Anonymous (14th c.)"
            },
            "inLanguage": "German"
          }
        },
        {
          "@type": "ListItem",
          "position": 12,
          "item": {
            "@type": "Book",
            "name": "The Emerald Tablet (with glosses)",
            "author": {
              "@type": "Person",
              "name": "Anonymous (attrib. Hermes)"
            },
            "inLanguage": "Latin"
          }
        },
        {
          "@type": "ListItem",
          "position": 13,
          "item": {
            "@type": "Book",
            "name": "Moreau\u2019s Chamber Journals (I\u2013III)",
            "author": {
              "@type": "Person",
              "name": "Father Benjamin Moreau (1870s)"
            },
            "inLanguage": "French/English"
          }
        },
        {
          "@type": "ListItem",
          "position": 14,
          "item": {
            "@type": "Book",
            "name": "The Specchi Production Records",
            "author": {
              "@type": "Person",
              "name": "Specchi family (1340\u20131720)"
            },
            "inLanguage": "Italian/Latin"
          }
        },
        {
          "@type": "ListItem",
          "position": 15,
          "item": {
            "@type": "Book",
            "name": "Andrew Chen \u2014 Reconstruction Notes",
            "author": {
              "@type": "Person",
              "name": "A. Chen (present day)"
            },
            "inLanguage": "English"
          }
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles['rs-wrap']}>
        <p className={styles['rs-eyebrow']}>Analysis Chamber · The Distribution File</p>
  <h1 className={styles['rs-h1']}>The Reading Sequence</h1>
  <p className={styles['rs-lede']}>The reading list is not devotional. Each text is assigned because it contains a specific technical element the candidate will later need: a proportion, a posture, a discipline of attention, a fragment of the coupling model.</p>
  <p className={styles['rs-intro']}>Within the Masters X Trilogy, the William Masters Foundation prescribes a fixed sequence of fifteen texts as the first phase of preparation — the reading sequence held in the Strahov and Charles University collections. <em>The Ars Notoria is read first, in ignorance, and last, in understanding.</em> Between those two readings lie twenty-one texts that make the difference. What follows is the annotated sequence as it appears in the distribution file Andrew Chen released to the public domain.</p>

  <div className={styles['rs-divider']}><span>The Sequence</span></div>

  <ol className={styles['rs-list']}>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>01</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>Sirach (Ecclesiasticus)</h3>
        <p className={styles['rs-meta']}>Ben Sira (c. 180 BCE) · Hebrew/Greek · <span className={styles['rs-shelf']}>Strahov Premonstratensian Library</span></p>
        <p className={styles['rs-annotation']}>Fifty-one chapters plus an implied fifty-second silence. The template for the 52-week protocol.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>02</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>2 Esdras (Fourth Book of Ezra)</h3>
        <p className={styles['rs-meta']}>Anonymous (1st c. CE) · Latin · <span className={styles['rs-shelf']}>Charles University Archives</span></p>
        <p className={styles['rs-annotation']}>The text that broke everything open. The apocalyptic vision read as preparation.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>03</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>The Gospel of Mary</h3>
        <p className={styles['rs-meta']}>Anonymous (2nd c.) · Coptic · <span className={styles['rs-shelf']}>Berlin Codex 8502.1</span></p>
        <p className={styles['rs-annotation']}>The ascent of the soul through the four powers. Peter&#x27;s dismissal is the institutional failure the Foundation was built to avoid.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>04</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>The Ars Notoria</h3>
        <p className={styles['rs-meta']}>Anonymous (13th c.) · Latin · <span className={styles['rs-shelf']}>Strahov DG.IV.7</span></p>
        <p className={styles['rs-annotation']}>The core text. The notae as acoustic-geometric specifications.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>05</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>Sefer Yetzirah</h3>
        <p className={styles['rs-meta']}>Anonymous (attrib. Abraham) · Hebrew · <span className={styles['rs-shelf']}>Charles University MS 1892</span></p>
        <p className={styles['rs-annotation']}>The book of formation. The thirty-two paths and the doctrine of sounded letters.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>06</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>The Cloud of Unknowing</h3>
        <p className={styles['rs-meta']}>Anonymous (14th c.) · Middle English · <span className={styles['rs-shelf']}>Charles University MS 3310</span></p>
        <p className={styles['rs-annotation']}>The apophatic discipline. How not-knowing prepares the listening mind.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>07</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>De Harmonia Mundi</h3>
        <p className={styles['rs-meta']}>Francesco Giorgi (1525) · Latin · <span className={styles['rs-shelf']}>Strahov BF.II.14</span></p>
        <p className={styles['rs-annotation']}>Cathedral proportion as sounded ratio. The numerical soul of architecture.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>08</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>The Zohar (Sifra di-Tzeniuta)</h3>
        <p className={styles['rs-meta']}>Anonymous (13th c.) · Aramaic · <span className={styles['rs-shelf']}>Strahov DG.IV.19</span></p>
        <p className={styles['rs-annotation']}>The book of concealment. The face and the counter-face.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>09</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>Harmonices Mundi (Bk III–IV)</h3>
        <p className={styles['rs-meta']}>Johannes Kepler (1619) · Latin · <span className={styles['rs-shelf']}>Charles University MS 2890</span></p>
        <p className={styles['rs-annotation']}>The consonances as geometric necessity. The ear as an instrument of proof.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>10</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>The Chymical Wedding</h3>
        <p className={styles['rs-meta']}>J.V. Andreae (1616) · German · <span className={styles['rs-shelf']}>Strahov BF.III.1</span></p>
        <p className={styles['rs-annotation']}>The seven-day preparation. The allegory read as protocol.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>11</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>Theologia Germanica</h3>
        <p className={styles['rs-meta']}>Anonymous (14th c.) · German · <span className={styles['rs-shelf']}>Strahov BF.IV.8</span></p>
        <p className={styles['rs-annotation']}>The surrendered will. The emptying that precedes reception.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>12</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>The Emerald Tablet (with glosses)</h3>
        <p className={styles['rs-meta']}>Anonymous (attrib. Hermes) · Latin · <span className={styles['rs-shelf']}>Charles University MS 1901</span></p>
        <p className={styles['rs-annotation']}>As above, so below. The coupling principle in its oldest formulation.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>13</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>Moreau’s Chamber Journals (I–III)</h3>
        <p className={styles['rs-meta']}>Father Benjamin Moreau (1870s) · French/English · <span className={styles['rs-shelf']}>William Masters Foundation Archive</span></p>
        <p className={styles['rs-annotation']}>The original SubTropolis chamber construction. The Specchi mirrors installed.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>14</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>The Specchi Production Records</h3>
        <p className={styles['rs-meta']}>Specchi family (1340–1720) · Italian/Latin · <span className={styles['rs-shelf']}>Venetian State Archives / Eva Černá transcriptions</span></p>
        <p className={styles['rs-annotation']}>Three hundred eighty years of parabolic acoustic mirrors. Speculorum perfectum.</p>
      </div>
    </li>
    <li className={styles['rs-item']}>
      <div className={styles['rs-num']}>15</div>
      <div className={styles['rs-body']}>
        <h3 className={styles['rs-title']}>Andrew Chen — Reconstruction Notes</h3>
        <p className={styles['rs-meta']}>A. Chen (present day) · English · <span className={styles['rs-shelf']}>William Masters Foundation</span></p>
        <p className={styles['rs-annotation']}>The bridge document. How the preceding texts were read into a protocol.</p>
      </div>
    </li>
  </ol>

  <div className={styles['rs-foot']}>
    <p>This reading sequence appears in <strong>Part I: Preparation Protocols</strong> of the 247-page distribution file — the complete acoustic-consciousness research document released within the events of <em>The Kingdom</em>. <Link href="/chamber/research-archive/">Read about the full distribution file →</Link></p>
    <p style={{ marginTop: "10px" }}>The harmonic frequency data derived from these texts is documented separately: <Link href="/chamber/harmonic-derivations/">The Harmonic Frequency Derivations →</Link></p>
    <p className={styles['rs-mark']}>f = 111.2 Hz · Seventh City Press · Kansas City, Missouri</p>
  </div>
      </main>
    </>
  );
}

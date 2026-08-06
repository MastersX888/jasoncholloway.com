import type { Metadata } from "next";
import Link from "next/link";
import styles from './harmonic-derivations.module.css';
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "The Harmonic Frequency Derivations | Masters X Trilogy",
  titleAbsolute: true,
  description: "The eight major harmonic frequencies of the Masters X Trilogy, derived from the Ars Notoria: from the 111.2 Hz fundamental to 889.6 Hz, with coupling factors, quality factors, forty inversion frequencies, and cathedral cross-references.",
  path: "/chamber/harmonic-derivations/",
  ogType: "article",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "The Harmonic Frequency Derivations",
      "description": "The eight major harmonic frequencies of the Masters X Trilogy, derived from the Ars Notoria notae \u2014 from the 111.2 Hz fundamental to 889.6 Hz, with coupling factors, quality factors, and forty inversion frequencies.",
      "author": {
        "@type": "Person",
        "name": "Jason Carroll Holloway",
        "url": "https://jasoncholloway.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Seventh City Press"
      },
      "isPartOf": {
        "@type": "CreativeWork",
        "name": "Masters X Trilogy"
      }
    },
    {
      "@type": "Dataset",
      "name": "Masters X Harmonic Stack",
      "description": "Eight major harmonic frequencies derived from the Ars Notoria, 111.2\u2013889.6 Hz, with coupling factors 1.073\u20131.101.",
      "creator": {
        "@type": "Person",
        "name": "Andrew Chen (in-universe)"
      },
      "variableMeasured": [
        "frequency Hz",
        "coupling factor",
        "quality factor",
        "bandwidth Hz"
      ],
      "license": "https://creativecommons.org/publicdomain/zero/1.0/"
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
      <main className={styles['hd-wrap']}>
        <p className={styles['hd-eyebrow']}>Analysis Chamber · The Distribution File</p>
  <h1 className={styles['hd-h1']}>The Harmonic Frequency Derivations</h1>
  <p className={styles['hd-lede']}>Each of the eight chambers on the harmonic series encodes, through its Hebrew letter-value and a coupling factor, a specific frequency between the 111.2 Hz fundamental and its eighth harmonic at 889.6 Hz.</p>
  <p className={styles['hd-intro']}>This is the theoretical heart of the Masters X Trilogy's distribution file: Andrew Chen's complete derivation of the harmonic stack. The claim is precise and falsifiable — any reader with the Hebrew values and the coupling method can reproduce every frequency independently. The full derivation, the forty inversion frequencies, and the two cathedral cross-references are documented below.</p>

  <div className={styles['hd-spec']}>
    <div><div className={styles['k']}>Fundamental</div><div className={`${styles['v']} ${styles['gold']}`}>111.2 Hz</div></div>
    <div><div className={styles['k']}>Eighth (8·f0)</div><div className={styles['v']}>889.6 Hz</div></div>
    <div><div className={styles['k']}>Chambers</div><div className={styles['v']}>8</div></div>
    <div><div className={styles['k']}>Sub-harmonic</div><div className={styles['v']}>3.915 Hz</div></div>
    <div><div className={styles['k']}>Inversions</div><div className={styles['v']}>40</div></div>
    <div><div className={styles['k']}>The click</div><div className={styles['v']}>3,200 Hz · 4 ms</div></div>
  </div>

  <div className={styles['hd-section']}><span>The Eight Major Harmonics</span></div>
  <p className={styles['hd-intro']}>For each nota, the Hebrew letter-value is taken as the harmonic index; the coupling factor — derived from the figure's geometry — scales the index against the fundamental; the result is normalized to the 111.2–889.6 Hz band.</p>
  <div className={styles['hd-tablewrap']}>
    <table>
      <thead><tr><th>CHAMBER</th><th>FREQ Hz</th><th>RATIO</th><th>Q</th><th>BW Hz</th><th>PHASE COH</th></tr></thead>
      <tbody>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>1</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>111.2</td>
        <td className={styles['mono']}>1:1</td>
        <td className={styles['mono']}>19.3</td>
        <td className={styles['mono']}>1.41</td>
        <td className={styles['mono']}>0.97</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>2</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>222.4</td>
        <td className={styles['mono']}>2:1</td>
        <td className={styles['mono']}>12.8</td>
        <td className={styles['mono']}>3.24</td>
        <td className={styles['mono']}>0.968</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>3</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>333.6</td>
        <td className={styles['mono']}>3:1</td>
        <td className={styles['mono']}>26.7</td>
        <td className={styles['mono']}>3.48</td>
        <td className={styles['mono']}>0.923</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>4</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>444.8</td>
        <td className={styles['mono']}>4:1</td>
        <td className={styles['mono']}>25.4</td>
        <td className={styles['mono']}>3.23</td>
        <td className={styles['mono']}>0.985</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>5</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>556.0</td>
        <td className={styles['mono']}>5:1</td>
        <td className={styles['mono']}>13.8</td>
        <td className={styles['mono']}>0.74</td>
        <td className={styles['mono']}>0.965</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>6</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>667.2</td>
        <td className={styles['mono']}>6:1</td>
        <td className={styles['mono']}>37.3</td>
        <td className={styles['mono']}>0.68</td>
        <td className={styles['mono']}>0.94</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>7</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>778.4</td>
        <td className={styles['mono']}>7:1</td>
        <td className={styles['mono']}>30.1</td>
        <td className={styles['mono']}>2.0</td>
        <td className={styles['mono']}>0.989</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>8</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>889.6</td>
        <td className={styles['mono']}>8:1</td>
        <td className={styles['mono']}>23.7</td>
        <td className={styles['mono']}>1.06</td>
        <td className={styles['mono']}>0.967</td>
      </tr>
      </tbody>
    </table>
  </div>
  <p className={styles['hd-note']}>The frequencies ascend from the 111.2 Hz fundamental to 889.6 Hz across the eight harmonics. Each is fixed in phase relation to the fundamental; it is this fixed relation, repeated across all eight, that constitutes the harmonic stack.</p>

  <div className={styles['hd-section']}><span>The Forty Inversion Frequencies</span></div>
  <p className={styles['hd-intro']}>Moreau's journals record a counter-set of forty inversion frequencies — used to bring a candidate down out of reception, in reverse, at the end of a session. They are the descent, and they are as important as the harmonics themselves.</p>
  <div className={styles['hd-tablewrap']}>
    <table>
      <thead><tr>
        <th>#</th><th>Inversion Hz</th><th>Depth</th><th>Source Nota</th><th>State</th>
      </tr></thead>
      <tbody>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>01</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>101.45</td>
        <td className={styles['mono']}>-5.9 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Prima</td>
        <td>transient</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>02</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>124.43</td>
        <td className={styles['mono']}>-18.1 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Secunda</td>
        <td>transient</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>03</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>146.41</td>
        <td className={styles['mono']}>-3.8 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Tertia</td>
        <td>antinodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>04</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>171.01</td>
        <td className={styles['mono']}>-16.8 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Quarta</td>
        <td>damped</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>05</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>193.27</td>
        <td className={styles['mono']}>-8.6 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Quinta</td>
        <td>nodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>06</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>217.2</td>
        <td className={styles['mono']}>-10.2 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Sexta</td>
        <td>antinodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>07</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>241.31</td>
        <td className={styles['mono']}>-4.1 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Septima</td>
        <td>nodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>08</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>264.5</td>
        <td className={styles['mono']}>-14.9 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Octava</td>
        <td>nodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>09</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>288.95</td>
        <td className={styles['mono']}>-15.1 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Nona</td>
        <td>antinodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>10</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>310.47</td>
        <td className={styles['mono']}>-11.8 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Decima</td>
        <td>transient</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>11</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>335.02</td>
        <td className={styles['mono']}>-5.6 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Undecima</td>
        <td>nodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>12</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>358.13</td>
        <td className={styles['mono']}>-6.8 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Duodecima</td>
        <td>standing</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>13</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>382.63</td>
        <td className={styles['mono']}>-3.2 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Tertiadecima</td>
        <td>stable</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>14</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>405.76</td>
        <td className={styles['mono']}>-16.1 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Quartadecima</td>
        <td>transient</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>15</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>100.02</td>
        <td className={styles['mono']}>-9.7 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Prima</td>
        <td>standing</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>16</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>123.59</td>
        <td className={styles['mono']}>-5.1 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Secunda</td>
        <td>antinodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>17</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>148.38</td>
        <td className={styles['mono']}>-11.6 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Tertia</td>
        <td>stable</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>18</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>169.4</td>
        <td className={styles['mono']}>-6.0 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Quarta</td>
        <td>standing</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>19</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>195.42</td>
        <td className={styles['mono']}>-9.1 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Quinta</td>
        <td>standing</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>20</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>217.76</td>
        <td className={styles['mono']}>-16.5 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Sexta</td>
        <td>nodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>21</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>240.48</td>
        <td className={styles['mono']}>-14.3 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Septima</td>
        <td>stable</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>22</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>263.52</td>
        <td className={styles['mono']}>-17.0 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Octava</td>
        <td>antinodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>23</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>286.82</td>
        <td className={styles['mono']}>-12.8 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Nona</td>
        <td>standing</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>24</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>311.58</td>
        <td className={styles['mono']}>-16.3 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Decima</td>
        <td>antinodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>25</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>335.36</td>
        <td className={styles['mono']}>-6.4 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Undecima</td>
        <td>damped</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>26</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>356.34</td>
        <td className={styles['mono']}>-5.5 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Duodecima</td>
        <td>damped</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>27</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>381.87</td>
        <td className={styles['mono']}>-11.1 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Tertiadecima</td>
        <td>standing</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>28</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>406.82</td>
        <td className={styles['mono']}>-15.5 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Quartadecima</td>
        <td>standing</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>29</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>99.85</td>
        <td className={styles['mono']}>-8.2 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Prima</td>
        <td>damped</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>30</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>123.16</td>
        <td className={styles['mono']}>-18.0 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Secunda</td>
        <td>damped</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>31</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>146.4</td>
        <td className={styles['mono']}>-16.2 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Tertia</td>
        <td>antinodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>32</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>170.55</td>
        <td className={styles['mono']}>-18.1 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Quarta</td>
        <td>antinodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>33</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>195.36</td>
        <td className={styles['mono']}>-9.8 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Quinta</td>
        <td>stable</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>34</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>217.18</td>
        <td className={styles['mono']}>-5.7 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Sexta</td>
        <td>stable</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>35</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>242.02</td>
        <td className={styles['mono']}>-5.6 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Septima</td>
        <td>damped</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>36</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>264.64</td>
        <td className={styles['mono']}>-7.6 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Octava</td>
        <td>transient</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>37</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>287.35</td>
        <td className={styles['mono']}>-17.2 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Nona</td>
        <td>damped</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>38</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>310.03</td>
        <td className={styles['mono']}>-17.0 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Decima</td>
        <td>nodal</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>39</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>335.77</td>
        <td className={styles['mono']}>-6.4 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Undecima</td>
        <td>damped</td>
      </tr>
      <tr>
        <td className={`${styles['mono']} ${styles['gold']}`}>40</td>
        <td className={`${styles['mono']} ${styles['freq']}`}>357.08</td>
        <td className={styles['mono']}>-12.9 dB</td>
        <td className={`${styles['mono']} ${styles['dim']}`}>Nota Duodecima</td>
        <td>standing</td>
      </tr>
      </tbody>
    </table>
  </div>

  <div className={styles['hd-section']}><span>Cathedral Cross-Reference</span></div>
  <p className={styles['hd-intro']}>The derivation is confirmed against two independent medieval structures whose acoustic signatures were measured directly. Both fall within the tuning range of the fundamental — and both, the file argues, were built to it.</p>
  <div className={styles['hd-cathedral']}>
    <div className={styles['hd-cath']}>
      <h4>Chartres Cathedral</h4>
      <div className={styles['cf']}>108.0 Hz</div>
      <p>Within 3.2 Hz of the fundamental. The proportions of the nave encode the same frequency the notae encode.</p>
    </div>
    <div className={styles['hd-cath']}>
      <h4>Reims Cathedral</h4>
      <div className={styles['cf']}>111.8 Hz</div>
      <p>Within 0.6 Hz of the fundamental. The cathedrals are the model's oldest confirmation: the frequency was known, and built into stone, long before it was written into the Ars Notoria.</p>
    </div>
  </div>

  <div className={styles['hd-foot']}>
    <p>These derivations appear in <strong>Part III: Harmonic Frequency Derivations</strong> of the 247-page distribution file released within the events of <em>The Kingdom</em>. The preparation that precedes them is documented in <Link href="/chamber/reading-sequence/">The Reading Sequence →</Link></p>
    <p style={{ marginTop: "10px" }}><Link href="/chamber/research-archive/">Read about the full distribution file →</Link></p>
    <p className={styles['hd-mark']}>f = 111.2 Hz · Seventh City Press · Kansas City, Missouri</p>
  </div>
      </main>
    </>
  );
}

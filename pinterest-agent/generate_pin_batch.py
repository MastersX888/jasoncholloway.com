"""
Generate a Pinterest Bulk Upload CSV for manual pin creation.
Pinterest Business Hub supports CSV bulk upload: 
  pinterest.com/business/hub → Create → Create pins → Bulk create

Also re-creates the pins that were lost when the Prague board was deleted.
"""

import csv
import json
from pathlib import Path

BASE = "https://jasoncholloway.com"
OUTPUT = Path(__file__).parent / "output"
OUTPUT.mkdir(exist_ok=True)

BOARD_IDS = {
    "Masters X Trilogy — Books & Editions": "1110700395541688804",
    "Facts Behind the Fiction — Masters X": "1110700395541708529",
    "Real Kansas City — Masters X Locations": "1110700395541708530",
    "Medieval Manuscripts & Esoteric Archives": "1110700395541688795",
    "Acoustic Science & Cymatics": "1110700395541689385",
    "Seventh City Press — Author & Imprint": "1110700395541708531",
    "Hawkes Monograph — Literary Criticism": "1110700395541708532",
    "Reading Masters X — Guides & Companions": "1110700395541708533",
}

pins = []

# ═══════════════════════════════════════════
# MASTERS X TRILOGY — BOOKS & EDITIONS
# ═══════════════════════════════════════════
board = "Masters X Trilogy — Books & Editions"

pins.append({
    "board": board,
    "title": "The Inheritance of Frequency — Hardcover",
    "description": "Hardcover collector's edition with printed case laminate beneath the dust jacket. Vol I of the Masters X Trilogy by Jason Carroll Holloway. ISBN 9798295800801. #MastersXTrilogy #Hardcover #BookDesign #LiteraryThriller",
    "link": f"{BASE}/books/masters-x/the-inheritance-of-frequency/",
    "image_url": f"{BASE}/covers/book1-hardcover-v3.png",
    "alt_text": "Masters X Vol I The Inheritance of Frequency hardcover cover"
})
pins.append({
    "board": board,
    "title": "Two Covers One Book — Vol I Case Laminate",
    "description": "Hardcover collectors know the secret: a printed case laminate under the dust jacket. The hidden second cover of Vol I. Seventh City Press · Jason Carroll Holloway. #TwoCoversOneBook #Hardcover #MastersXTrilogy #BookDesign",
    "link": f"{BASE}/books/masters-x/the-inheritance-of-frequency/#case-cover",
    "image_url": f"{BASE}/covers/book1-case.png",
    "alt_text": "Masters X Vol I case laminate art — hidden cover beneath dust jacket"
})
pins.append({
    "board": board,
    "title": "The Grimoire — Paperback | Masters X Vol II",
    "description": "Prague. The Strahov Monastery. A frequency key hidden in medieval notation. Vol II of the Masters X Trilogy by Jason Carroll Holloway. ISBN 9798256009953. #MastersXTrilogy #Prague #LiteraryThriller",
    "link": f"{BASE}/books/masters-x/the-grimoire/",
    "image_url": f"{BASE}/covers/book2-paperback.png",
    "alt_text": "Masters X Vol II The Grimoire paperback cover"
})
pins.append({
    "board": board,
    "title": "The Grimoire — Hardcover | Masters X Vol II",
    "description": "Hardcover collector's edition with printed case laminate beneath the dust jacket. Vol II of the Masters X Trilogy. ISBN 9798295812675. #MastersXTrilogy #Hardcover #LiteraryThriller",
    "link": f"{BASE}/books/masters-x/the-grimoire/#hardcover",
    "image_url": f"{BASE}/covers/book2-hardcover-v3.png",
    "alt_text": "Masters X Vol II The Grimoire hardcover cover"
})
pins.append({
    "board": board,
    "title": "Two Covers One Book — Vol II Case Laminate",
    "description": "Hardcover collectors know the secret: a printed case laminate under the dust jacket. Vol II's hidden second cover reveals the Strahov cipher. Seventh City Press. #TwoCoversOneBook #Hardcover #BookDesign",
    "link": f"{BASE}/books/masters-x/the-grimoire/#case-cover",
    "image_url": f"{BASE}/covers/book2-case.png",
    "alt_text": "Masters X Vol II The Grimoire case laminate art"
})
pins.append({
    "board": board,
    "title": "The Kingdom — Paperback | Masters X Vol III",
    "description": "The frequency engine activated. Every thread converges. Vol III of the Masters X Trilogy by Jason Carroll Holloway. ISBN 9798256010072. #MastersXTrilogy #LiteraryThriller #KansasCity",
    "link": f"{BASE}/books/masters-x/the-kingdom/",
    "image_url": f"{BASE}/covers/book3-paperback.png",
    "alt_text": "Masters X Vol III The Kingdom paperback cover"
})
pins.append({
    "board": board,
    "title": "The Kingdom — Hardcover | Masters X Vol III",
    "description": "Hardcover collector's edition with printed case laminate. Vol III of the Masters X Trilogy. ISBN 9798295812705. #MastersXTrilogy #Hardcover #CollectorEdition",
    "link": f"{BASE}/books/masters-x/the-kingdom/#hardcover",
    "image_url": f"{BASE}/covers/book3-hardcover-v3.png",
    "alt_text": "Masters X Vol III The Kingdom hardcover cover"
})
pins.append({
    "board": board,
    "title": "Two Covers One Book — Vol III Case Laminate",
    "description": "Hardcover collectors know the secret: a printed case laminate under the dust jacket. The final hidden cover. Seventh City Press · Jason Carroll Holloway. #TwoCoversOneBook #Hardcover #MastersXTrilogy",
    "link": f"{BASE}/books/masters-x/the-kingdom/#case-cover",
    "image_url": f"{BASE}/covers/book3-case.png",
    "alt_text": "Masters X Vol III The Kingdom case laminate art"
})
pins.append({
    "board": board,
    "title": "Masters X Omnibus — Hardcover",
    "description": "All three novels in one volume. 900+ pages. The definitive edition of the Masters X Trilogy with cathedral-within case laminate. ISBN 9798295884412. #MastersXTrilogy #Omnibus #CompleteSeries",
    "link": f"{BASE}/books/masters-x/omnibus/",
    "image_url": f"{BASE}/covers/omnibus-hardcover-v3.png",
    "alt_text": "Masters X Complete Trilogy Omnibus hardcover cover"
})
pins.append({
    "board": board,
    "title": "Two Covers One Book — Omnibus Case Laminate",
    "description": "Cathedral-within figure on the case laminate — the hidden second cover of the complete trilogy omnibus. Seventh City Press · Jason Carroll Holloway. #TwoCoversOneBook #Hardcover #Omnibus #BookDesign",
    "link": f"{BASE}/books/masters-x/omnibus/#case-cover",
    "image_url": f"{BASE}/covers/omnibus-case.png",
    "alt_text": "Masters X omnibus hardcover case laminate art"
})
pins.append({
    "board": board,
    "title": "Masters X Trilogy — Kindle & eBook",
    "description": "Read the trilogy digitally. The Inheritance of Frequency, The Grimoire, The Kingdom — all available on Kindle. By Jason Carroll Holloway from Seventh City Press. #MastersXTrilogy #Kindle #eBook",
    "link": f"{BASE}/books/masters-x/the-inheritance-of-frequency/#kindle",
    "image_url": f"{BASE}/covers/book1-ebook.jpg",
    "alt_text": "Masters X Vol I The Inheritance of Frequency ebook cover"
})
pins.append({
    "board": board,
    "title": "The Grimoire — eBook & Kindle Edition",
    "description": "Vol II of the Masters X Trilogy. Prague, the Strahov Library, a frequency key in medieval notation. Available on Kindle. ISBN 9798256009625. #MastersXTrilogy #Kindle #eBook",
    "link": f"{BASE}/books/masters-x/the-grimoire/#kindle",
    "image_url": f"{BASE}/covers/book2-ebook.jpg",
    "alt_text": "Masters X Vol II The Grimoire ebook cover"
})
pins.append({
    "board": board,
    "title": "The Kingdom — eBook & Kindle Edition",
    "description": "Vol III of the Masters X Trilogy. The frequency engine activated. Available on Kindle. ISBN 9798256009809. #MastersXTrilogy #Kindle #eBook",
    "link": f"{BASE}/books/masters-x/the-kingdom/#kindle",
    "image_url": f"{BASE}/covers/book3-ebook.jpg",
    "alt_text": "Masters X Vol III The Kingdom ebook cover"
})

# ═══════════════════════════════════════════
# FACTS BEHIND THE FICTION
# ═══════════════════════════════════════════
board = "Facts Behind the Fiction — Masters X"

pins.append({
    "board": board,
    "title": "The Voynich Manuscript — Beinecke MS 408",
    "description": "240 parchment pages of undeciphered script held at Yale's Beinecke Library since 1969. Central to the Masters X Trilogy. This is documented history, not fiction. #VoynichManuscript #BeineckeLibrary #RealHistory",
    "link": f"{BASE}/field-notes/voynich-manuscript/",
    "image_url": f"{BASE}/og/field-notes/voynich-manuscript.png",
    "alt_text": "Voynich Manuscript research — Beinecke MS 408"
})
pins.append({
    "board": board,
    "title": "Strahov Monastery — Prague Since 1143",
    "description": "Baroque theological hall in Prague — Premonstratensian monastery since 1143. Real location from the Masters X Trilogy. 23 chained books. The most beautiful room in Prague. #StrahovMonastery #Prague #MedievalLibrary",
    "link": f"{BASE}/field-notes/strahov-monastery/",
    "image_url": f"{BASE}/og/field-notes/strahov-monastery.png",
    "alt_text": "Strahov Monastery library research"
})
pins.append({
    "board": board,
    "title": "Cymatics — Sound You Can See",
    "description": "Hans Jenny documented how sound organizes matter into visible patterns. Real physics behind the trilogy's frequency engine. #Cymatics #AcousticScience #SoundVisualization #FactsBehindFiction",
    "link": f"{BASE}/field-notes/cymatics/",
    "image_url": f"{BASE}/og/field-notes/cymatics.png",
    "alt_text": "Cymatics field note — sound visualization"
})
pins.append({
    "board": board,
    "title": "111 Hz — The Archaeoacoustic Frequency",
    "description": "Standing waves at 111 Hz in Neolithic chambers from Malta to Ireland. Documented archaeoacoustic research. Real science in the Masters X Trilogy. #111Hz #Archaeoacoustics #FactsBehindFiction",
    "link": f"{BASE}/field-notes/111-hz/",
    "image_url": f"{BASE}/og/field-notes/111-hz.png",
    "alt_text": "111 Hz archaeoacoustics field note"
})
pins.append({
    "board": board,
    "title": "Ars Notoria — Medieval Cognitive Technology",
    "description": "A medieval ritual text promising perfect memory through geometric figures and invocation. Referenced in the Masters X Trilogy. Documented, real history. #ArsNotoria #MedievalManuscripts #FactsBehindFiction",
    "link": f"{BASE}/field-notes/ars-notoria/",
    "image_url": f"{BASE}/og/field-notes/ars-notoria.png",
    "alt_text": "Ars Notoria medieval text research"
})
pins.append({
    "board": board,
    "title": "Codex Gigas — The Devil's Bible",
    "description": "Largest surviving medieval manuscript. Created in a single night according to legend. Now in Stockholm's National Library. Referenced in the Masters X Trilogy. #CodexGigas #MedievalManuscripts #Bohemia",
    "link": f"{BASE}/field-notes/codex-gigas/",
    "image_url": f"{BASE}/og/field-notes/codex-gigas.png",
    "alt_text": "Codex Gigas research visualization"
})
pins.append({
    "board": board,
    "title": "SubTropolis — Underground City, Kansas City",
    "description": "1,100 acres of commercial space carved into limestone bluffs. Real. Visitable. Central to the Masters X Trilogy. #SubTropolis #KansasCity #UndergroundCity #FactsBehindFiction",
    "link": f"{BASE}/field-notes/subtropolis/",
    "image_url": f"{BASE}/og/field-notes/subtropolis.png",
    "alt_text": "SubTropolis underground Kansas City"
})
pins.append({
    "board": board,
    "title": "Gospel of Thomas — Saying 113",
    "description": "'The Kingdom of the Father is spread upon the earth and men do not see it.' Gnostic text central to the trilogy's thematic architecture. #GospelOfThomas #Gnostic #FactsBehindFiction",
    "link": f"{BASE}/field-notes/gospel-of-thomas/",
    "image_url": f"{BASE}/og/field-notes/gospel-of-thomas.png",
    "alt_text": "Gospel of Thomas field note"
})
pins.append({
    "board": board,
    "title": "Meramec Caverns — Missouri Limestone",
    "description": "Documented cave system in Missouri's limestone belt. Part of the geological reality grounding the Masters X Trilogy. #MeramecCaverns #Missouri #Caves #FactsBehindFiction",
    "link": f"{BASE}/field-notes/meramec-caverns/",
    "image_url": f"{BASE}/og/field-notes/meramec-caverns.png",
    "alt_text": "Meramec Caverns research visualization"
})
pins.append({
    "board": board,
    "title": "Oscar-01 — Malmstrom AFB 1967 Incident",
    "description": "March 1967. Ten nuclear ICBMs simultaneously disabled at Malmstrom. Documented. Declassified. Referenced in the Masters X Trilogy. #Oscar01 #Malmstrom #Declassified #FactsBehindFiction",
    "link": f"{BASE}/field-notes/oscar-01/",
    "image_url": f"{BASE}/og/field-notes/oscar-01.png",
    "alt_text": "Oscar-01 missile incident field note"
})
pins.append({
    "board": board,
    "title": "U-2 Test Pilots — Cold War Reconnaissance",
    "description": "CIA reconnaissance program. Documented history behind the geopolitical substrate of the Masters X Trilogy. #U2 #ColdWar #TestPilots #FactsBehindFiction",
    "link": f"{BASE}/field-notes/u2-test-pilots/",
    "image_url": f"{BASE}/og/field-notes/u2-test-pilots.png",
    "alt_text": "U-2 test pilots field note"
})
pins.append({
    "board": board,
    "title": "Field Notes — All Research Behind Masters X",
    "description": "The complete library of documented research behind the Masters X Trilogy. Real places, real manuscripts, real science. Explore the facts behind the fiction. #FieldNotes #Research #MastersXTrilogy",
    "link": f"{BASE}/field-notes/",
    "image_url": f"{BASE}/og/field-notes/hub.png",
    "alt_text": "Field Notes hub — all research"
})

# ═══════════════════════════════════════════
# REAL KANSAS CITY
# ═══════════════════════════════════════════
board = "Real Kansas City — Masters X Locations"

pins.append({
    "board": board,
    "title": "SubTropolis — 1,100 Acres Underground",
    "description": "The world's largest underground business complex carved into limestone bluffs below the Missouri River. Every tunnel in Masters X is real. #KansasCity #SubTropolis #UndergroundKC",
    "link": f"{BASE}/field-notes/subtropolis/#kansas-city",
    "image_url": f"{BASE}/og/field-notes/subtropolis.png",
    "alt_text": "SubTropolis underground Kansas City"
})
pins.append({
    "board": board,
    "title": "Kansas City Locations — Masters X Map",
    "description": "Westport, West Bottoms, Quality Hill, Hotel Phillips, SubTropolis — every real KC location in the trilogy. Fiction built on documented geography. #KansasCity #KC #LiteraryKC #MastersXTrilogy",
    "link": f"{BASE}/field-notes/kansas-city-locations/",
    "image_url": f"{BASE}/og/field-notes/kansas-city-locations.png",
    "alt_text": "Kansas City locations from Masters X Trilogy"
})
pins.append({
    "board": board,
    "title": "Meramec Caverns — Missouri Underground",
    "description": "Missouri's limestone cavern system. The geological reality beneath the Masters X Trilogy's underground sequences. Real. Visitable. #MeramecCaverns #Missouri #Underground #KansasCity",
    "link": f"{BASE}/field-notes/meramec-caverns/#missouri",
    "image_url": f"{BASE}/og/field-notes/meramec-caverns.png",
    "alt_text": "Meramec Caverns Missouri"
})

# ═══════════════════════════════════════════
# MEDIEVAL MANUSCRIPTS & ESOTERIC ARCHIVES
# ═══════════════════════════════════════════
board = "Medieval Manuscripts & Esoteric Archives"

pins.append({
    "board": board,
    "title": "Voynich Manuscript Folio f1r — Opening Page",
    "description": "The first folio of Beinecke MS 408. Undeciphered for 600 years. Central artifact in the Masters X Trilogy. #VoynichManuscript #MedievalManuscripts #Beinecke",
    "link": f"{BASE}/chamber/folio-visualizer/#f1r",
    "image_url": f"{BASE}/folios/voynich/Vol%201/voynich-004.jpg",
    "alt_text": "Voynich Manuscript folio f1r opening page"
})
pins.append({
    "board": board,
    "title": "Voynich Manuscript — Botanical Section",
    "description": "One of 113 plant illustrations in the Voynich Manuscript. No identified species matches. Documented mystery. #VoynichManuscript #BotanicalIllustration #MedievalMystery",
    "link": f"{BASE}/chamber/folio-visualizer/#botanical",
    "image_url": f"{BASE}/folios/voynich/Vol%201/voynich-005.jpg",
    "alt_text": "Voynich Manuscript botanical section folio"
})
pins.append({
    "board": board,
    "title": "Voynich Foldout f85v-86r — Astronomical",
    "description": "Largest foldout folio in the Voynich Manuscript. Astronomical or cosmological diagram. Still undeciphered. #VoynichManuscript #Astronomy #MedievalManuscripts",
    "link": f"{BASE}/chamber/folio-visualizer/#f85v-86r",
    "image_url": f"{BASE}/folios/voynich/Vol%204/f85v-86r.jpg",
    "alt_text": "Voynich Manuscript astronomical foldout f85v-86r"
})
pins.append({
    "board": board,
    "title": "Strahov Monastery — 23 Chained Books",
    "description": "Baroque theological hall in Prague — Premonstratensian monastery since 1143. 23 chained books, the most beautiful room in Prague. Real location from Masters X. #StrahovMonastery #Prague #MedievalLibrary",
    "link": f"{BASE}/field-notes/strahov-monastery/#manuscript",
    "image_url": f"{BASE}/og/field-notes/strahov-monastery.png",
    "alt_text": "Strahov Monastery library Prague"
})
pins.append({
    "board": board,
    "title": "Ars Notoria — Memory Through Geometry",
    "description": "Medieval text promising perfect memory through geometric figures and sacred invocation. The cognitive technology referenced in the Masters X Trilogy. #ArsNotoria #MedievalManuscripts #SacredGeometry",
    "link": f"{BASE}/field-notes/ars-notoria/#manuscript",
    "image_url": f"{BASE}/og/field-notes/ars-notoria.png",
    "alt_text": "Ars Notoria medieval manuscript research"
})
pins.append({
    "board": board,
    "title": "Codex Gigas — Bohemia's Devil's Bible",
    "description": "92cm tall. 165 calfskin pages. The largest surviving medieval manuscript. Now in Stockholm. From Bohemia. Referenced in the Masters X Trilogy. #CodexGigas #DevilsBible #MedievalManuscripts",
    "link": f"{BASE}/field-notes/codex-gigas/#manuscript",
    "image_url": f"{BASE}/og/field-notes/codex-gigas.png",
    "alt_text": "Codex Gigas research"
})

# ═══════════════════════════════════════════
# ACOUSTIC SCIENCE & CYMATICS
# ═══════════════════════════════════════════
board = "Acoustic Science & Cymatics"

pins.append({
    "board": board,
    "title": "Cymatics — Hans Jenny's Sound Patterns",
    "description": "Hans Jenny documented how sound organizes matter into visible geometric patterns. Real physics behind the Masters X frequency engine. #Cymatics #HansJenny #SoundVisualization",
    "link": f"{BASE}/field-notes/cymatics/#jenny",
    "image_url": f"{BASE}/og/field-notes/cymatics.png",
    "alt_text": "Cymatics — Hans Jenny sound patterns"
})
pins.append({
    "board": board,
    "title": "111 Hz Standing Waves — Neolithic to Now",
    "description": "The same frequency resonates in Malta's Hypogeum, Newgrange, and the Oracle Chamber. Documented archaeoacoustic research. #111Hz #Archaeoacoustics #StandingWaves",
    "link": f"{BASE}/field-notes/111-hz/#resonance",
    "image_url": f"{BASE}/og/field-notes/111-hz.png",
    "alt_text": "111 Hz standing waves archaeoacoustic research"
})
pins.append({
    "board": board,
    "title": "Ars Notoria as Acoustic Specification",
    "description": "Medieval ritual text reframed as frequency protocol. The Harmonic Stack analysis from the Masters X Analysis Chamber. #ArsNotoria #AcousticScience #HarmonicStack",
    "link": f"{BASE}/chamber/harmonic-stack/#acoustic",
    "image_url": f"{BASE}/og/field-notes/ars-notoria.png",
    "alt_text": "Harmonic Stack — Ars Notoria as acoustic spec"
})

# ═══════════════════════════════════════════
# SEVENTH CITY PRESS
# ═══════════════════════════════════════════
board = "Seventh City Press — Author & Imprint"

pins.append({
    "board": board,
    "title": "Seventh City Press — Literary Publisher",
    "description": "Fiction built on real research. Criticism built on close reading. Independent literary imprint based in Kansas City, Missouri. #SeventhCityPress #IndependentPublishing #LiteraryFiction",
    "link": "https://seventhcitypress.com/",
    "image_url": f"{BASE}/covers/omnibus-hardcover-v3.png",
    "alt_text": "Seventh City Press — Masters X Trilogy omnibus"
})
pins.append({
    "board": board,
    "title": "Jason Carroll Holloway — Author",
    "description": "Author of the Masters X Trilogy and the Hawkes monograph. Fiction grounded in documented research. From Seventh City Press, Kansas City. #JasonCarrollHolloway #Author #LiteraryFiction",
    "link": f"{BASE}/",
    "image_url": f"{BASE}/covers/book1-hardcover-v3.png",
    "alt_text": "Jason Carroll Holloway author"
})
pins.append({
    "board": board,
    "title": "All Books from Seventh City Press",
    "description": "Masters X Trilogy, complete omnibus, and the Hawkes monograph. Available in hardcover, paperback, and Kindle. #SeventhCityPress #Books #LiteraryFiction",
    "link": f"{BASE}/books/",
    "image_url": f"{BASE}/og/field-notes/hub.png",
    "alt_text": "Seventh City Press complete catalog"
})
pins.append({
    "board": board,
    "title": "Privacy & Terms — Seventh City Press",
    "description": "Our commitment to your privacy. No invasive tracking, no data sales. Seventh City Press values your trust. #Privacy #SeventhCityPress",
    "link": "https://seventhcitypress.com/privacy/",
    "image_url": f"{BASE}/covers/omnibus-case.png",
    "alt_text": "Seventh City Press privacy policy"
})

# ═══════════════════════════════════════════
# HAWKES MONOGRAPH
# ═══════════════════════════════════════════
board = "Hawkes Monograph — Literary Criticism"

pins.append({
    "board": board,
    "title": "Innocence, Desire & the Fall — Paperback",
    "description": "A critical and quantitative analysis of the repeating symbolic architectures across John Hawkes's novel corpus. By Jason Carroll Holloway. ISBN 9798295778247. #JohnHawkes #LiteraryCriticism",
    "link": f"{BASE}/books/hawkes-monograph/",
    "image_url": f"{BASE}/covers/hawkes-paperback-web.png",
    "alt_text": "Innocence Desire Architecture of the Fall paperback"
})
pins.append({
    "board": board,
    "title": "Innocence, Desire & the Fall — Hardcover",
    "description": "Hardcover edition. 200+ pages of close reading and quantitative pattern analysis of John Hawkes's novels. ISBN 9798349308444. From Seventh City Press. #JohnHawkes #Hardcover #LiteraryCriticism",
    "link": f"{BASE}/books/hawkes-monograph/#hardcover",
    "image_url": f"{BASE}/covers/hawkes-hardcover-web.png",
    "alt_text": "Innocence Desire Architecture of the Fall hardcover"
})
pins.append({
    "board": board,
    "title": "John Hawkes — Structural Patterns",
    "description": "Repeating architectures of innocence and transgression in The Lime Twig, Second Skin, The Blood Oranges, and beyond. Quantitative literary criticism. #JohnHawkes #LiteraryAnalysis #Structuralism",
    "link": f"{BASE}/books/hawkes-monograph/#analysis",
    "image_url": f"{BASE}/covers/hawkes-ebook.jpg",
    "alt_text": "John Hawkes structural analysis ebook"
})

# ═══════════════════════════════════════════
# READING MASTERS X
# ═══════════════════════════════════════════
board = "Reading Masters X — Guides & Companions"

pins.append({
    "board": board,
    "title": "Reading Order — Where to Start Masters X",
    "description": "Start with Vol I: The Inheritance of Frequency. Then The Grimoire. Then The Kingdom. Or start with the Complete Trilogy Omnibus. #MastersXTrilogy #ReadingOrder #BookRecommendation",
    "link": f"{BASE}/chamber/reading-sequence/",
    "image_url": f"{BASE}/covers/book1-paperback.png",
    "alt_text": "Masters X reading order guide"
})
pins.append({
    "board": board,
    "title": "The Analysis Chamber — Companion Content",
    "description": "Interactive tools, folio visualizers, harmonic stack breakdowns, and reading guides. Companion content for serious readers of Masters X. #AnalysisChamber #MastersX #CompanionContent",
    "link": f"{BASE}/chamber/",
    "image_url": f"{BASE}/og/field-notes/voynich-manuscript.png",
    "alt_text": "Masters X Analysis Chamber hub"
})
pins.append({
    "board": board,
    "title": "Books Like Foucault's Pendulum",
    "description": "If you loved Umberto Eco, you'll love the Masters X Trilogy. Real history. Real manuscripts. Real conspiracy — grounded in documentation, not genre tropes. #FoucaultsPendulum #UmbertoEco #LiteraryConspiracy",
    "link": f"{BASE}/books/books-like-foucaults-pendulum/",
    "image_url": f"{BASE}/covers/book1-paperback.png",
    "alt_text": "Books like Foucaults Pendulum — Masters X Trilogy"
})
pins.append({
    "board": board,
    "title": "Voynich Folio Explorer — Interactive",
    "description": "Browse every folio of the Voynich Manuscript while reading the Masters X Trilogy. Interactive reading companion. #VoynichManuscript #InteractiveReading #MastersX",
    "link": f"{BASE}/chamber/folio-visualizer/",
    "image_url": f"{BASE}/folios/voynich/Vol%201/voynich-008.jpg",
    "alt_text": "Voynich folio visualizer interactive"
})
pins.append({
    "board": board,
    "title": "Harmonic Stack — Ars Notoria Decoded",
    "description": "The Harmonic Stack: Ars Notoria reinterpreted as acoustic specification. Deep-dive companion content from the Analysis Chamber. #HarmonicStack #ArsNotoria #MastersX",
    "link": f"{BASE}/chamber/harmonic-stack/",
    "image_url": f"{BASE}/og/field-notes/ars-notoria.png",
    "alt_text": "Harmonic Stack analysis"
})

# ═══════════════════════════════════════════
# WRITE OUTPUTS
# ═══════════════════════════════════════════

# 1. CSV for Pinterest bulk upload
csv_path = OUTPUT / "pinterest_bulk_upload.csv"
with open(csv_path, "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["Title", "Description", "Link", "Image URL", "Board", "Alt Text"])
    writer.writeheader()
    for p in pins:
        writer.writerow({
            "Title": p["title"],
            "Description": p["description"],
            "Link": p["link"],
            "Image URL": p["image_url"],
            "Board": p["board"],
            "Alt Text": p["alt_text"]
        })

# 2. JSON for API script
json_path = OUTPUT / "pins_to_create.json"
with open(json_path, "w") as f:
    json.dump(pins, f, indent=2)

print(f"Generated {len(pins)} pins")
print(f"  CSV:  {csv_path}")
print(f"  JSON: {json_path}")
print(f"\nBreakdown by board:")
board_counts = {}
for p in pins:
    board_counts[p["board"]] = board_counts.get(p["board"], 0) + 1
for board, count in sorted(board_counts.items()):
    print(f"  {board}: {count} pins")

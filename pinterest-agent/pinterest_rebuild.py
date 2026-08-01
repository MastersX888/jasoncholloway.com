"""
Pinterest Account Rebuild — Operation Pinboard
Transforms the account from 4 legacy boards + 24 scattered pins
into a polished, professional 8-board presence with 80+ pins.
"""

import time
import json
import sys
from pinterest_client import PinterestClient

BASE = "https://jasoncholloway.com"

client = PinterestClient()

# ─────────────────────────────────────────────
# STEP 1: Identify and delete duplicate pins
# ─────────────────────────────────────────────

def step1_delete_duplicates():
    print("\n═══ STEP 1: DELETING DUPLICATE PINS ═══\n")
    boards = client.paginate_all(client.list_boards)
    
    all_pins = []
    for b in boards:
        pins = client.paginate_all(client.list_board_pins, b["id"])
        for p in pins:
            p["_board_id"] = b["id"]
            p["_board_name"] = b["name"]
        all_pins.extend(pins)
    
    seen_links = {}
    duplicates = []
    for p in all_pins:
        key = (p.get("link", ""), p.get("title", ""))
        if key in seen_links:
            duplicates.append(p)
        else:
            seen_links[key] = p

    # Also find pins with identical link (regardless of title)
    link_seen = {}
    for p in all_pins:
        link = p.get("link", "")
        if not link:
            continue
        if link in link_seen:
            if p not in duplicates:
                duplicates.append(p)
        else:
            link_seen[link] = p

    # Additionally, the untitled pin (empty title) should be removed
    for p in all_pins:
        if not p.get("title", "").strip() and p not in duplicates:
            duplicates.append(p)

    print(f"Found {len(duplicates)} duplicate/empty pins to remove:")
    for p in duplicates:
        print(f"  DELETE [{p['id']}] '{p.get('title', '(no title)')}' on '{p['_board_name']}'")
        client.delete_pin(p["id"])
        print(f"    ✓ Deleted")
    
    print(f"\n✓ Removed {len(duplicates)} duplicate pins")
    return len(duplicates)


# ─────────────────────────────────────────────
# STEP 2: Restructure boards
# ─────────────────────────────────────────────

BOARD_TAXONOMY = {
    "Masters X Trilogy — Books & Editions": {
        "description": "The complete Masters X Trilogy by Jason Carroll Holloway. Three novels of acoustic frequency, medieval manuscripts, and Kansas City conspiracy. Hardcover, paperback, and Kindle from Seventh City Press.",
        "rename_from": "Literary Conspiracy Thrillers"
    },
    "Facts Behind the Fiction — Masters X": {
        "description": "Every place, manuscript, and phenomenon in the Masters X Trilogy is documented and verifiable. SubTropolis is real. The Strahov Monastery is real. The Voynich Manuscript sits in Yale's Beinecke Library.",
        "create_new": True
    },
    "Real Kansas City — Masters X Locations": {
        "description": "SubTropolis, Westport, West Bottoms, Quality Hill, Hotel Phillips — every real Kansas City location in the Masters X Trilogy, explored and annotated.",
        "create_new": True
    },
    "Medieval Manuscripts & Esoteric Archives": {
        "description": "Illuminated manuscripts, sealed crypts, monastic libraries, and the lost knowledge traditions that fuel the Masters X Trilogy. From the Voynich Manuscript to the Codex Gigas.",
        "rename_from": "Voynich Manuscript & Codices"
    },
    "Acoustic Science & Cymatics": {
        "description": "111 Hz standing waves. Chladni patterns. The Schumann resonance. Real acoustic science and archaeoacoustic research behind the Masters X Trilogy.",
        "rename_from": "Frequency & Esoteric History"
    },
    "Seventh City Press — Author & Imprint": {
        "description": "Behind the scenes at Seventh City Press. Author updates, publication milestones, and the craft behind fiction built on real research.",
        "create_new": True
    },
    "Hawkes Monograph — Literary Criticism": {
        "description": "A critical and quantitative analysis of the repeating symbolic architectures across John Hawkes's novel corpus. From Seventh City Press.",
        "create_new": True
    },
    "Reading Masters X — Guides & Companions": {
        "description": "Character maps, reading order guides, timeline infographics, and companion materials for readers of the Masters X Trilogy.",
        "create_new": True
    },
}

def step2_restructure_boards():
    print("\n═══ STEP 2: RESTRUCTURING BOARDS ═══\n")
    boards = client.paginate_all(client.list_boards)
    board_map = {b["name"]: b for b in boards}
    final_boards = {}

    for target_name, config in BOARD_TAXONOMY.items():
        # Already exists with target name
        if target_name in board_map:
            print(f"  Already exists: '{target_name}'")
            final_boards[target_name] = board_map[target_name]
            continue
            
        if "rename_from" in config:
            old_name = config["rename_from"]
            if old_name in board_map:
                print(f"  Renaming '{old_name}' → '{target_name}'")
                updated = client.update_board(
                    board_map[old_name]["id"],
                    name=target_name,
                    description=config["description"]
                )
                final_boards[target_name] = updated
            else:
                print(f"  '{old_name}' not found, creating '{target_name}' fresh")
                new_board = client.create_board(target_name, config["description"])
                final_boards[target_name] = new_board
        elif config.get("create_new"):
            print(f"  Creating new board: '{target_name}'")
            new_board = client.create_board(target_name, config["description"])
            final_boards[target_name] = new_board

    # Move pins from "Prague & Strahov Library" to "Medieval Manuscripts"
    prague_board = board_map.get("Prague & Strahov Library")
    medieval_board = final_boards.get("Medieval Manuscripts & Esoteric Archives")
    if prague_board and medieval_board:
        print(f"\n  Moving pins from 'Prague & Strahov Library' → 'Medieval Manuscripts & Esoteric Archives'")
        prague_pins = client.paginate_all(client.list_board_pins, prague_board["id"])
        for p in prague_pins:
            try:
                client.update_pin(p["id"], board_id=medieval_board["id"])
                print(f"    Moved: {p.get('title', '(untitled)')}")
            except Exception as e:
                print(f"    Failed to move {p['id']}: {e}")
        print(f"  Deleting empty 'Prague & Strahov Library' board")
        client.delete_board(prague_board["id"])

    # Move "Reading Sequence" pin to Reading Guides board if present
    reading_board = final_boards.get("Reading Masters X — Guides & Companions")
    if medieval_board and reading_board:
        med_pins = client.paginate_all(client.list_board_pins, medieval_board["id"])
        for p in med_pins:
            if "Reading Sequence" in p.get("title", ""):
                client.update_pin(p["id"], board_id=reading_board["id"])
                print(f"    Moved 'Reading Sequence' pin to Reading Guides board")

    print(f"\n✓ Board restructure complete. Final boards:")
    for name, b in final_boards.items():
        print(f"    [{b['id']}] {name}")
    
    return final_boards


# ─────────────────────────────────────────────
# STEP 3: Create comprehensive pin content
# ─────────────────────────────────────────────

def get_board_id(final_boards, name):
    for bname, b in final_boards.items():
        if name.lower() in bname.lower():
            return b["id"]
    return None

def step3_create_pins(final_boards):
    print("\n═══ STEP 3: CREATING COMPREHENSIVE PIN CONTENT ═══\n")
    
    # Fetch existing pins to avoid re-creating
    all_existing_links = set()
    boards = client.paginate_all(client.list_boards)
    for b in boards:
        pins = client.paginate_all(client.list_board_pins, b["id"])
        for p in pins:
            if p.get("link"):
                all_existing_links.add(p["link"])
    
    print(f"  {len(all_existing_links)} existing pin links found (will skip duplicates)\n")

    created = 0
    skipped = 0

    def create_if_new(board_name, title, description, link, image_url, alt_text=None):
        nonlocal created, skipped
        board_id = get_board_id(final_boards, board_name)
        if not board_id:
            print(f"  ⚠ Board not found: {board_name}")
            return
        if link in all_existing_links:
            skipped += 1
            return
        try:
            client.create_pin(board_id, title, description, link, image_url, alt_text)
            all_existing_links.add(link)
            created += 1
            print(f"  ✓ [{created}] {title[:60]}")
        except Exception as e:
            print(f"  ✗ FAILED: {title[:50]} — {e}")

    # ── MASTERS X TRILOGY BOARD ──
    board = "Masters X Trilogy"
    
    # Book 1 covers
    create_if_new(board,
        "The Inheritance of Frequency — Paperback | Masters X Vol I",
        "A fired Kansas City security guard inherits classified acoustic research linking SubTropolis to the Voynich Manuscript. Vol I of the Masters X Trilogy by Jason Carroll Holloway. Paperback from Seventh City Press. ISBN 9798256008048. #MastersXTrilogy #ConspiracyFiction #LiteraryThriller",
        f"{BASE}/books/masters-x/the-inheritance-of-frequency/",
        f"{BASE}/covers/book1-paperback.png",
        "Masters X Vol I The Inheritance of Frequency paperback cover")

    create_if_new(board,
        "The Inheritance of Frequency — Hardcover | Masters X Vol I",
        "Hardcover collector's edition with printed case laminate beneath the dust jacket. Vol I of the Masters X Trilogy. By Jason Carroll Holloway. ISBN 9798295800801. #MastersXTrilogy #Hardcover #BookDesign",
        f"{BASE}/books/masters-x/the-inheritance-of-frequency/#hardcover",
        f"{BASE}/covers/book1-hardcover-v3.png",
        "Masters X Vol I The Inheritance of Frequency hardcover cover")

    create_if_new(board,
        "Two Covers. One Book. — The Inheritance of Frequency",
        "Hardcover collectors know the secret: a printed case laminate under the dust jacket. The hidden second cover of Vol I. Seventh City Press · Jason Carroll Holloway. #TwoCoversOneBook #Hardcover #MastersXTrilogy #BookDesign",
        f"{BASE}/books/masters-x/the-inheritance-of-frequency/#case",
        f"{BASE}/covers/book1-case.png",
        "Masters X Vol I case laminate art — hidden cover beneath dust jacket")

    # Book 2 covers
    create_if_new(board,
        "The Grimoire — Paperback | Masters X Vol II",
        "Prague. The Strahov Monastery. A frequency key hidden in medieval notation. Vol II of the Masters X Trilogy by Jason Carroll Holloway. Paperback from Seventh City Press. ISBN 9798256009953. #MastersXTrilogy #Prague #StrahowMonastery",
        f"{BASE}/books/masters-x/the-grimoire/",
        f"{BASE}/covers/book2-paperback.png",
        "Masters X Vol II The Grimoire paperback cover")

    create_if_new(board,
        "The Grimoire — Hardcover | Masters X Vol II",
        "Hardcover collector's edition with printed case laminate beneath the dust jacket. Vol II of the Masters X Trilogy. ISBN 9798295812675. #MastersXTrilogy #Hardcover #LiteraryThriller",
        f"{BASE}/books/masters-x/the-grimoire/#hardcover",
        f"{BASE}/covers/book2-hardcover-v3.png",
        "Masters X Vol II The Grimoire hardcover cover")

    create_if_new(board,
        "Two Covers. One Book. — The Grimoire",
        "Hardcover collectors know the secret: a printed case laminate under the dust jacket. Vol II's hidden second cover reveals the Strahov cipher. Seventh City Press. #TwoCoversOneBook #Hardcover #BookDesign",
        f"{BASE}/books/masters-x/the-grimoire/#case",
        f"{BASE}/covers/book2-case.png",
        "Masters X Vol II The Grimoire case laminate art")

    # Book 3 covers
    create_if_new(board,
        "The Kingdom — Paperback | Masters X Vol III",
        "The frequency engine activated. Every thread converges. Vol III of the Masters X Trilogy by Jason Carroll Holloway. Paperback from Seventh City Press. ISBN 9798256010072. #MastersXTrilogy #LiteraryThriller #KansasCity",
        f"{BASE}/books/masters-x/the-kingdom/",
        f"{BASE}/covers/book3-paperback.png",
        "Masters X Vol III The Kingdom paperback cover")

    create_if_new(board,
        "The Kingdom — Hardcover | Masters X Vol III",
        "Hardcover collector's edition with printed case laminate. Vol III of the Masters X Trilogy. ISBN 9798295812705. #MastersXTrilogy #Hardcover #CollectorEdition",
        f"{BASE}/books/masters-x/the-kingdom/#hardcover",
        f"{BASE}/covers/book3-hardcover-v3.png",
        "Masters X Vol III The Kingdom hardcover cover")

    create_if_new(board,
        "Two Covers. One Book. — The Kingdom",
        "Hardcover collectors know the secret: a printed case laminate under the dust jacket. The final hidden cover. Seventh City Press · Jason Carroll Holloway. #TwoCoversOneBook #Hardcover #MastersXTrilogy",
        f"{BASE}/books/masters-x/the-kingdom/#case",
        f"{BASE}/covers/book3-case.png",
        "Masters X Vol III The Kingdom case laminate art")

    # Omnibus
    create_if_new(board,
        "Masters X — Complete Trilogy Omnibus Hardcover",
        "All three novels in one volume. 900+ pages. The definitive edition of the Masters X Trilogy. Hardcover with cathedral-within case laminate. ISBN 9798295884412. #MastersXTrilogy #Omnibus #CompleteSeries",
        f"{BASE}/books/masters-x/omnibus/",
        f"{BASE}/covers/omnibus-hardcover-v3.png",
        "Masters X Complete Trilogy Omnibus hardcover cover")

    create_if_new(board,
        "Two Covers. One Book. — Masters X Omnibus",
        "Cathedral-within figure on the case laminate — the hidden second cover of the complete trilogy omnibus. Seventh City Press · Jason Carroll Holloway. #TwoCoversOneBook #Hardcover #Omnibus #BookDesign",
        f"{BASE}/books/masters-x/omnibus/#case",
        f"{BASE}/covers/omnibus-case.png",
        "Masters X omnibus hardcover case laminate art")

    create_if_new(board,
        "Masters X Trilogy — Kindle & eBook Editions",
        "Read the trilogy digitally. The Inheritance of Frequency, The Grimoire, The Kingdom — all three available on Kindle. By Jason Carroll Holloway. #MastersXTrilogy #Kindle #eBook #ReadingList",
        f"{BASE}/books/masters-x/the-inheritance-of-frequency/#kindle",
        f"{BASE}/covers/book1-ebook.jpg",
        "Masters X Vol I The Inheritance of Frequency ebook cover")

    # ── FACTS BEHIND THE FICTION BOARD ──
    board = "Facts Behind the Fiction"

    create_if_new(board,
        "The Voynich Manuscript — Beinecke MS 408 at Yale",
        "240 parchment pages of undeciphered script, held at Yale's Beinecke Library since 1969. Central to the Masters X Trilogy. This is documented history, not fiction. #VoynichManuscript #BeineckeLibrary #RealHistory #FactsBehindFiction",
        f"{BASE}/field-notes/voynich-manuscript/",
        f"{BASE}/og/field-notes/voynich-manuscript.png",
        "Voynich Manuscript research visualization")

    create_if_new(board,
        "Strahov Monastery — 23 Chained Books in Prague",
        "Baroque theological hall in Prague — Premonstratensian monastery since 1143. Real location from the Masters X Trilogy. #StrahowMonastery #Prague #MedievalLibrary #FactsBehindFiction",
        f"{BASE}/field-notes/strahov-monastery/",
        f"{BASE}/og/field-notes/strahov-monastery.png",
        "Strahov Monastery library research visualization")

    create_if_new(board,
        "Cymatics — Sound You Can See",
        "Hans Jenny documented how sound organizes matter into visible patterns. Real physics behind the trilogy's frequency engine. #Cymatics #AcousticScience #SoundVisualization #FactsBehindFiction",
        f"{BASE}/field-notes/cymatics/",
        f"{BASE}/og/field-notes/cymatics.png",
        "Cymatics field note research visualization")

    create_if_new(board,
        "111 Hz — The Archaeoacoustic Frequency",
        "Standing waves at 111 Hz in Neolithic chambers from Malta to Ireland. Documented archaeoacoustic research. Real science in the Masters X Trilogy. #111Hz #Archaeoacoustics #FactsBehindFiction #AcousticScience",
        f"{BASE}/field-notes/111-hz/",
        f"{BASE}/og/field-notes/111-hz.png",
        "111 Hz archaeoacoustics field note")

    create_if_new(board,
        "Ars Notoria — Medieval Cognitive Technology",
        "A medieval ritual text promising perfect memory through geometric figures and invocation. Referenced in the Masters X Trilogy. Documented, real history. #ArsNotoria #MedievalManuscripts #FactsBehindFiction",
        f"{BASE}/field-notes/ars-notoria/",
        f"{BASE}/og/field-notes/ars-notoria.png",
        "Ars Notoria medieval text research visualization")

    create_if_new(board,
        "Codex Gigas — The Devil's Bible of Bohemia",
        "Largest surviving medieval manuscript. Created in a single night according to legend. Now in Stockholm's National Library. Referenced in the Masters X Trilogy. #CodexGigas #MedievalManuscripts #Bohemia #FactsBehindFiction",
        f"{BASE}/field-notes/codex-gigas/",
        f"{BASE}/og/field-notes/codex-gigas.png",
        "Codex Gigas field note research visualization")

    create_if_new(board,
        "SubTropolis — The Underground City Beneath Kansas City",
        "1,100 acres of commercial space carved into limestone bluffs. Real. Visitable. Central to the Masters X Trilogy. #SubTropolis #KansasCity #UndergroundCity #FactsBehindFiction",
        f"{BASE}/field-notes/subtropolis/",
        f"{BASE}/og/field-notes/subtropolis.png",
        "SubTropolis underground Kansas City research visualization")

    create_if_new(board,
        "Gospel of Thomas — Saying 113",
        "'The Kingdom of the Father is spread upon the earth and men do not see it.' Gnostic text central to the trilogy's thematic architecture. #GospelOfThomas #Gnostic #FactsBehindFiction",
        f"{BASE}/field-notes/gospel-of-thomas/",
        f"{BASE}/og/field-notes/gospel-of-thomas.png",
        "Gospel of Thomas field note visualization")

    create_if_new(board,
        "Meramec Caverns — Missouri's Limestone Underworld",
        "Documented cave system in Missouri's limestone belt. Part of the geological reality grounding the Masters X Trilogy. #MeramecCaverns #Missouri #Caves #FactsBehindFiction",
        f"{BASE}/field-notes/meramec-caverns/",
        f"{BASE}/og/field-notes/meramec-caverns.png",
        "Meramec Caverns field note visualization")

    create_if_new(board,
        "Oscar-01 — Malmstrom AFB Missile Incident",
        "March 1967. Ten nuclear ICBMs simultaneously disabled at Malmstrom. Documented. Declassified. Referenced in the Masters X Trilogy. #Oscar01 #Malmstrom #UFO #FactsBehindFiction",
        f"{BASE}/field-notes/oscar-01/",
        f"{BASE}/og/field-notes/oscar-01.png",
        "Oscar-01 missile incident field note visualization")

    create_if_new(board,
        "U-2 Test Pilots — Cold War Reconnaissance",
        "CIA reconnaissance program. Documented history behind the geopolitical substrate of the Masters X Trilogy. #U2 #ColdWar #TestPilots #FactsBehindFiction",
        f"{BASE}/field-notes/u2-test-pilots/",
        f"{BASE}/og/field-notes/u2-test-pilots.png",
        "U-2 test pilots field note visualization")

    create_if_new(board,
        "Field Notes — All Research Behind Masters X",
        "The complete library of documented research behind the Masters X Trilogy. Real places, real manuscripts, real science. Explore the facts behind the fiction. #FieldNotes #Research #FactsBehindFiction #MastersXTrilogy",
        f"{BASE}/field-notes/",
        f"{BASE}/og/field-notes/hub.png",
        "Field Notes hub page — all research")

    # ── REAL KANSAS CITY BOARD ──
    board = "Real Kansas City"

    create_if_new(board,
        "SubTropolis — 1,100 Acres Underground in Kansas City",
        "The world's largest underground business complex carved into limestone bluffs below the Missouri River. Every tunnel in Masters X is real and visitable. #KansasCity #SubTropolis #UndergroundKC #MastersXTrilogy",
        f"{BASE}/field-notes/subtropolis/#kc",
        f"{BASE}/og/field-notes/subtropolis.png",
        "SubTropolis underground Kansas City")

    create_if_new(board,
        "Kansas City Locations in Masters X — Map & Guide",
        "Westport, West Bottoms, Quality Hill, Hotel Phillips, SubTropolis — every real KC location in the trilogy. Fiction built on documented geography. #KansasCity #KC #LiteraryKC #MastersXTrilogy",
        f"{BASE}/field-notes/kansas-city-locations/",
        f"{BASE}/og/field-notes/kansas-city-locations.png",
        "Kansas City locations from Masters X Trilogy map")

    # ── MEDIEVAL MANUSCRIPTS BOARD ──
    board = "Medieval Manuscripts"

    create_if_new(board,
        "Voynich Manuscript Folio f1r — The Opening Page",
        "The first folio of Beinecke MS 408. Undeciphered for 600 years. Central artifact in the Masters X Trilogy. #VoynichManuscript #MedievalManuscripts #Beinecke #IlluminatedManuscript",
        f"{BASE}/chamber/folio-visualizer/#f1r",
        f"{BASE}/folios/voynich/Vol%201/voynich-004.jpg",
        "Voynich Manuscript folio f1r opening page")

    create_if_new(board,
        "Voynich Manuscript — Botanical Section Folio",
        "One of 113 plant illustrations in the Voynich Manuscript. No identified species matches. Documented mystery. #VoynichManuscript #BotanicalIllustration #MedievalMystery",
        f"{BASE}/chamber/folio-visualizer/#botanical",
        f"{BASE}/folios/voynich/Vol%201/voynich-005.jpg",
        "Voynich Manuscript botanical section folio")

    create_if_new(board,
        "Voynich Manuscript — Astronomical Foldout f85v-86r",
        "Largest foldout folio in the Voynich Manuscript. Astronomical or cosmological diagram. Still undeciphered. #VoynichManuscript #Astronomy #MedievalManuscripts",
        f"{BASE}/chamber/folio-visualizer/#f85v",
        f"{BASE}/folios/voynich/Vol%204/f85v-86r.jpg",
        "Voynich Manuscript astronomical foldout f85v-86r")

    create_if_new(board,
        "Explore 181 Voynich Folios — Interactive Visualizer",
        "Every folio of Beinecke MS 408, browsable online. Built for the Masters X reading experience. #VoynichManuscript #InteractiveExplorer #DigitalHumanities",
        f"{BASE}/chamber/folio-visualizer/",
        f"{BASE}/og/field-notes/voynich-manuscript.png",
        "Voynich Manuscript folio visualizer tool")

    # ── ACOUSTIC SCIENCE BOARD ──
    board = "Acoustic Science"

    create_if_new(board,
        "Cymatics — Hans Jenny's Sound Patterns",
        "Hans Jenny documented how sound organizes matter into visible geometric patterns. Real physics behind the Masters X frequency engine. #Cymatics #HansJenny #SoundVisualization #AcousticScience",
        f"{BASE}/field-notes/cymatics/#jenny",
        f"{BASE}/og/field-notes/cymatics.png",
        "Cymatics research — Hans Jenny sound patterns")

    create_if_new(board,
        "111 Hz Standing Waves — Neolithic to Now",
        "The same frequency resonates in Malta's Hypogeum, Newgrange, and the Oracle Chamber at Ħal-Saflieni. Documented archaeoacoustic research. #111Hz #Archaeoacoustics #StandingWaves #AcousticScience",
        f"{BASE}/field-notes/111-hz/#resonance",
        f"{BASE}/og/field-notes/111-hz.png",
        "111 Hz standing waves archaeoacoustic research")

    create_if_new(board,
        "Ars Notoria as Acoustic Specification",
        "Medieval ritual text reframed as frequency protocol. The Harmonic Stack analysis from the Masters X Analysis Chamber. #ArsNotoria #AcousticScience #HarmonicStack #MastersX",
        f"{BASE}/chamber/harmonic-stack/",
        f"{BASE}/og/field-notes/ars-notoria.png",
        "Harmonic Stack — Ars Notoria as acoustic spec")

    # ── SEVENTH CITY PRESS BOARD ──
    board = "Seventh City Press"

    create_if_new(board,
        "Seventh City Press — Independent Literary Publisher",
        "Fiction built on real research. Criticism built on close reading. Independent literary imprint based in Kansas City, Missouri. #SeventhCityPress #IndependentPublishing #LiteraryFiction",
        "https://seventhcitypress.com/",
        f"{BASE}/covers/omnibus-hardcover-v3.png",
        "Seventh City Press publisher — Masters X Trilogy omnibus")

    create_if_new(board,
        "Jason Carroll Holloway — Author",
        "Author of the Masters X Trilogy and the Hawkes monograph. Fiction grounded in documented research. From Seventh City Press, Kansas City. #JasonCarrollHolloway #Author #LiteraryFiction",
        f"{BASE}/",
        f"{BASE}/covers/book1-hardcover-v3.png",
        "Jason Carroll Holloway author page")

    create_if_new(board,
        "All Books from Seventh City Press",
        "The Masters X Trilogy, the complete omnibus, and Innocence Desire and the Architecture of the Fall. Available in hardcover, paperback, and Kindle. #SeventhCityPress #BookList #LiteraryFiction",
        f"{BASE}/books/",
        f"{BASE}/og/field-notes/hub.png",
        "Seventh City Press complete book catalog")

    # ── JOHN HAWKES MONOGRAPH BOARD ──
    board = "Hawkes Monograph"

    create_if_new(board,
        "Innocence, Desire, and the Architecture of the Fall — Paperback",
        "A critical and quantitative analysis of the repeating symbolic architectures across John Hawkes's novel corpus. By Jason Carroll Holloway. From Seventh City Press. ISBN 9798295778247. #JohnHawkes #LiteraryCriticism #StructuralAnalysis",
        f"{BASE}/books/hawkes-monograph/",
        f"{BASE}/covers/hawkes-paperback-web.png",
        "Innocence Desire Architecture of the Fall paperback cover")

    create_if_new(board,
        "Innocence, Desire, and the Architecture of the Fall — Hardcover",
        "Hardcover edition of the Hawkes structural analysis. 200+ pages of close reading and quantitative pattern analysis. ISBN 9798349308444. #JohnHawkes #LiteraryCriticism #Hardcover",
        f"{BASE}/books/hawkes-monograph/#hardcover",
        f"{BASE}/covers/hawkes-hardcover-web.png",
        "Innocence Desire Architecture of the Fall hardcover cover")

    create_if_new(board,
        "John Hawkes — Structural Patterns Across the Corpus",
        "Repeating architectures of innocence and transgression in The Lime Twig, Second Skin, The Blood Oranges, and beyond. Quantitative literary criticism. #JohnHawkes #LiteraryAnalysis #Structuralism",
        f"{BASE}/books/hawkes-monograph/#analysis",
        f"{BASE}/covers/hawkes-ebook.jpg",
        "John Hawkes structural analysis ebook cover")

    # ── READING GUIDES BOARD ──
    board = "Reading Masters X"

    create_if_new(board,
        "Where to Start — Masters X Reading Order Guide",
        "Start with Vol I: The Inheritance of Frequency. Then The Grimoire. Then The Kingdom. Or dive into the Complete Trilogy Omnibus. Reading sequence guidance for the Masters X Trilogy. #MastersXTrilogy #ReadingOrder #BookRecommendation",
        f"{BASE}/chamber/reading-sequence/",
        f"{BASE}/covers/book1-paperback.png",
        "Masters X reading order guide — start with Vol I")

    create_if_new(board,
        "The Analysis Chamber — Deep Companion Content",
        "Interactive analysis tools, folio visualizers, harmonic stack breakdowns, and reading guides. Companion content for serious readers of the Masters X Trilogy. #AnalysisChamber #MastersX #CompanionContent",
        f"{BASE}/chamber/",
        f"{BASE}/og/field-notes/voynich-manuscript.png",
        "Masters X Analysis Chamber — companion content hub")

    create_if_new(board,
        "Books Like Foucault's Pendulum — Literary Conspiracy Fiction",
        "If you loved Umberto Eco, you'll love the Masters X Trilogy. Real history. Real manuscripts. Real conspiracy — grounded in documentation, not genre tropes. #FoucaultsPendulum #UmbertoEco #LiteraryConspiracy #MastersXTrilogy",
        f"{BASE}/books/books-like-foucaults-pendulum/",
        f"{BASE}/covers/book1-paperback.png",
        "Books like Foucaults Pendulum recommendation")

    create_if_new(board,
        "Voynich Folio Explorer — 181 Pages Interactive",
        "Browse every folio of the Voynich Manuscript while reading the Masters X Trilogy. Built-in reading companion from the Analysis Chamber. #VoynichManuscript #InteractiveReading #MastersX",
        f"{BASE}/chamber/folio-visualizer/#reader",
        f"{BASE}/folios/voynich/Vol%201/voynich-008.jpg",
        "Voynich folio visualizer interactive reading companion")

    create_if_new(board,
        "Harmonic Stack Analysis — Ars Notoria Decoded",
        "The Harmonic Stack: Ars Notoria reinterpreted as acoustic specification. Deep-dive companion content from the Analysis Chamber. #HarmonicStack #ArsNotoria #MastersX #AnalysisChamber",
        f"{BASE}/chamber/harmonic-stack/#guide",
        f"{BASE}/og/field-notes/ars-notoria.png",
        "Harmonic Stack analysis — Ars Notoria decoded for readers")

    print(f"\n✓ Created {created} new pins (skipped {skipped} existing)")
    return created


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────

if __name__ == "__main__":
    print("╔═══════════════════════════════════════════════╗")
    print("║  OPERATION PINBOARD — FULL ACCOUNT REBUILD   ║")
    print("╚═══════════════════════════════════════════════╝")

    deleted = step1_delete_duplicates()
    time.sleep(2)
    
    final_boards = step2_restructure_boards()
    time.sleep(2)
    
    created = step3_create_pins(final_boards)
    
    print("\n" + "═" * 50)
    print(f"REBUILD COMPLETE")
    print(f"  Duplicates removed: {deleted}")
    print(f"  New pins created: {created}")
    print(f"  Target boards: {len(final_boards)}")
    print("═" * 50)

# Outstand v2 Publish Report
**Executed:** 2026-07-30 05:47 UTC  
**Jason approval:** publish all v2 (2026-07-30 evening)

## Summary

| Metric | Count |
|--------|------:|
| Total posts | 21 |
| Published OK | **21** |
| Failed | 0 |

### By bucket

| Bucket | OK | Total |
|--------|---:|------:|
| Instagram carousels | 7 | 7 |
| X + Facebook (3 accounts each) | 7 | 7 |
| Pinterest | 7 | 7 |

## Publish method

- **IG / X / FB:** Immediate publish via Outstand (accounts set at POST creation)
- **Pinterest:** PATCH `pinterest.board_id` + `link` + `title`, then PATCH `scheduledAt=now`
- **Pinterest board:** `1110700395541688804` (Literary Conspiracy Thrillers — same as v1)
- **Script:** `scripts/publish_outstand_v2.py` · raw results: `.outstand-v2-publish-results.json`

## Results

| Post ID | Bucket | Slot | Topic | Status | Live URLs |
|---------|--------|-----:|-------|--------|-----------|
| `FEPVh` | instagram | 1 | Frequency | OK | [IG](https://www.instagram.com/p/DbZ7HHSjYxb/) |
| `gIiz1` | instagram | 2 | Cymatics | OK | [IG](https://www.instagram.com/p/DbZ7KA4DSYj/) |
| `Oxr7T` | instagram | 3 | Kansas City | OK | [IG](https://www.instagram.com/p/DbZ7PndjgUB/) |
| `ySUef` | instagram | 4 | Ars Notoria | OK | [IG](https://www.instagram.com/p/DbZ7ReVigjb/) |
| `TpuHk` | instagram | 5 | Stone Remembers | OK | [IG](https://www.instagram.com/p/DbZ7W78jRlB/) |
| `BK2vq` | instagram | 6 | Three Factions | OK | [IG](https://www.instagram.com/p/DbZ7XfLiNCB/) |
| `mvXEE` | instagram | 7 | Unreleased | OK | [IG](https://www.instagram.com/p/DbZ7a95jV0I/) |
| `Jh6i6` | x_facebook | 1 | Frequency | OK | [X](https://x.com/i/status/2082689862918905970) · [FB Author](https://facebook.com/1224164874114610_122099902407290334) · [FB SCP](https://facebook.com/1172985912572281_122102080851409612) |
| `4nymj` | x_facebook | 2 | Cymatics | OK | [X](https://x.com/i/status/2082689899325493522) · [FB Author](https://facebook.com/1224164874114610_122099902575290334) · [FB SCP](https://facebook.com/1172985912572281_122102080953409612) |
| `7PmTO` | x_facebook | 3 | Kansas City | OK | [X](https://x.com/i/status/2082689938596712859) · [FB Author](https://facebook.com/1224164874114610_122099902773290334) · [FB SCP](https://facebook.com/1172985912572281_122102081049409612) |
| `ZA0Vm` | x_facebook | 4 | Ars Notoria | OK | [X](https://x.com/i/status/2082689976718762082) · [FB Author](https://facebook.com/1224164874114610_122099903133290334) · [FB SCP](https://facebook.com/1172985912572281_122102081163409612) |
| `NTCsA` | x_facebook | 5 | Stone Remembers | OK | [X](https://x.com/i/status/2082690017323778280) · [FB Author](https://facebook.com/1224164874114610_122099903475290334) · [FB SCP](https://facebook.com/1172985912572281_122102081403409612) |
| `8enPj` | x_facebook | 6 | Three Factions | OK | [X](https://x.com/i/status/2082690052233044274) · [FB Author](https://facebook.com/1224164874114610_122099903739290334) · [FB SCP](https://facebook.com/1172985912572281_122102081661409612) |
| `HoaSC` | x_facebook | 7 | Unreleased | OK | [X](https://x.com/i/status/2082690088236912959) · [FB Author](https://facebook.com/1224164874114610_122099904243290334) · [FB SCP](https://facebook.com/1172985912572281_122102081931409612) |
| `Irl0J` | pinterest | 1 | Frequency | OK | [Pin](https://www.pinterest.com/pin/1110700326881412517/) |
| `ySUIq` | pinterest | 2 | Cymatics | OK | [Pin](https://www.pinterest.com/pin/1110700326881412524/) |
| `cNGhW` | pinterest | 3 | Kansas City | OK | [Pin](https://www.pinterest.com/pin/1110700326881412528/) |
| `Q2hIc` | pinterest | 4 | Ars Notoria | OK | [Pin](https://www.pinterest.com/pin/1110700326881412535/) |
| `lQJgD` | pinterest | 5 | Stone Remembers | OK | [Pin](https://www.pinterest.com/pin/1110700326881412541/) |
| `ei9tY` | pinterest | 6 | Three Factions | OK | [Pin](https://www.pinterest.com/pin/1110700326881412550/) |
| `CuzcX` | pinterest | 7 | Unreleased | OK | [Pin](https://www.pinterest.com/pin/1110700326881412558/) |

## Notes

- **Pinterest board_id required:** Outstand now rejects Pinterest without `pinterest.board_id`. v1 posts had this set at creation; v2 assignment omitted it. Fixed at publish time via PATCH.
- **ySUIq slot 2:** Script logged 409 on schedule PATCH (race — post already publishing); verified live after poll.
- **v1 posts untouched** — edit-first policy. v2 are additive publishes.
- **Bluesky** not in scope this pass.

## Failures

None — all 21 posts live.

# USPS Form 1583 — Seventh City Press / PhysicalAddress

Pulled from Gmail attachment `1165628-ps1583.pdf` (PhysicalAddress signup, May 31 2026).

## Files

| File | Purpose |
|------|---------|
| `1165628-ps1583_original.pdf` | PhysicalAddress pre-fill from signup |
| `1165628-ps1583_FILLED.pdf` | Latest filled version (repo copy) |
| `user_fields.json` | Your home address + ID (not committed — keep local) |
| `fill_1583.py` | Re-generate filled PDF after editing `user_fields.json` |

Desktop copy: **`USPS_Form_1583_SeventhCityPress_FILLED.pdf`**

## Already filled

- CMRA address: 9169 W State St #4418, Garden City, ID 83714
- Applicant: Jason Carroll Holloway
- Phone / email: 9132250808, zh5779485@gmail.com
- Service type: **Business/Organization** (Seventh City Press LLC)
- Section 7 business block (SCP LLC + CMRA address)
- Protected individual: **No**

## You must add (in `user_fields.json`)

1. **Home address** (Section 4f–4i) — your real Missouri residence, **not** the Idaho CMRA address
2. **Driver's license** number + expiration (Section 8)
3. Same home address auto-copies to Section 9 (address ID)

## Notarization (required before mail flows)

PhysicalAddress cannot process mail until Form 1583 is notarized.

**Easiest path (~$20):**

1. Edit `user_fields.json` and run `python fill_1583.py`
2. Log in at [physicaladdress.com](https://physicaladdress.com)
3. Use their **Proof.com** link from the May 31 email to notarize online
4. They receive the completed form automatically

**Or:** print → sign Section 13 in ink → notary → upload to PhysicalAddress.

## After approval

New mail to **Jason Holloway, 9169 W State St #4418, Garden City, ID 83714** should scan into your dashboard. Mail that arrived while the account was inactive may have been returned — resend if needed.

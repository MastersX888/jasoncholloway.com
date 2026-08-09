"""
Pinterest OAuth2 Authorization Code Flow.

Generates and stores an access token for the Pinterest API v5.
Requires PINTEREST_APP_ID and PINTEREST_APP_SECRET in .env or environment.
"""

import base64
import json
import os
import sys
import webbrowser
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv()

TOKEN_FILE = Path(__file__).parent / ".pinterest_token.json"
OAUTH_BASE = "https://www.pinterest.com/oauth"
TOKEN_URL = "https://api.pinterest.com/v5/oauth/token"
REDIRECT_URI = "https://localhost/callback"

SCOPES = [
    "boards:read",
    "boards:write",
    "pins:read",
    "pins:write",
    "user_accounts:read",
]


def get_credentials():
    app_id = os.getenv("PINTEREST_APP_ID")
    app_secret = os.getenv("PINTEREST_APP_SECRET")
    if not app_id or not app_secret:
        print("ERROR: PINTEREST_APP_ID and PINTEREST_APP_SECRET must be set.")
        print("Add them to .env or export them in your shell.")
        sys.exit(1)
    return app_id, app_secret


def build_auth_url(app_id: str) -> str:
    scope_str = ",".join(SCOPES)
    return (
        f"{OAUTH_BASE}/?response_type=code"
        f"&client_id={app_id}"
        f"&redirect_uri={REDIRECT_URI}"
        f"&scope={scope_str}"
        f"&state=pinboard-agent"
    )


def exchange_code(app_id: str, app_secret: str, code: str) -> dict:
    credentials = f"{app_id}:{app_secret}"
    b64_credentials = base64.b64encode(credentials.encode()).decode()

    headers = {
        "Authorization": f"Basic {b64_credentials}",
        "Content-Type": "application/x-www-form-urlencoded",
    }

    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
    }

    resp = requests.post(TOKEN_URL, headers=headers, data=data, timeout=30)

    if resp.status_code != 200:
        print(f"ERROR: Token exchange failed ({resp.status_code})")
        print(resp.text)
        sys.exit(1)

    return resp.json()


def save_token(token_data: dict):
    with open(TOKEN_FILE, "w") as f:
        json.dump(token_data, f, indent=2)
    print(f"Token saved to {TOKEN_FILE}")
    print(f"Access token expires in {token_data.get('expires_in', '?')} seconds.")


def refresh_token(app_id: str, app_secret: str, refresh_tok: str) -> dict:
    credentials = f"{app_id}:{app_secret}"
    b64_credentials = base64.b64encode(credentials.encode()).decode()

    headers = {
        "Authorization": f"Basic {b64_credentials}",
        "Content-Type": "application/x-www-form-urlencoded",
    }

    data = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_tok,
    }

    resp = requests.post(TOKEN_URL, headers=headers, data=data, timeout=30)

    if resp.status_code != 200:
        print(f"ERROR: Token refresh failed ({resp.status_code})")
        print(resp.text)
        sys.exit(1)

    return resp.json()


def main():
    app_id, app_secret = get_credentials()

    if TOKEN_FILE.exists():
        with open(TOKEN_FILE) as f:
            existing = json.load(f)
        if existing.get("refresh_token"):
            print("Existing token found. Attempting refresh...")
            token_data = refresh_token(app_id, app_secret, existing["refresh_token"])
            save_token(token_data)
            return

    auth_url = build_auth_url(app_id)

    print("=" * 60)
    print("Pinterest OAuth2 Authorization")
    print("=" * 60)
    print()
    print("Open this URL in your browser:")
    print()
    print(f"  {auth_url}")
    print()
    print("After authorizing, you'll be redirected to a localhost URL.")
    print("Copy the 'code' parameter from that URL and paste it below.")
    print()

    try:
        webbrowser.open(auth_url)
    except Exception:
        pass

    code = input("Paste authorization code here: ").strip()
    if not code:
        print("No code provided. Aborting.")
        sys.exit(1)

    print("Exchanging code for access token...")
    token_data = exchange_code(app_id, app_secret, code)
    save_token(token_data)

    print()
    print("Done! Set PINTEREST_ACCESS_TOKEN in your .env:")
    print(f"  PINTEREST_ACCESS_TOKEN={token_data['access_token']}")


if __name__ == "__main__":
    main()

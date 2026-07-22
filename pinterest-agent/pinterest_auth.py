"""Pinterest OAuth 2.0 helper for Operation Pinboard."""

from __future__ import annotations

import os
import json
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
from threading import Thread
from urllib.parse import parse_qs, urlencode, urlparse

import requests
from dotenv import load_dotenv

from agent_utils import ROOT, TOKEN_FILE, save_json, setup_logging

load_dotenv(ROOT / ".env")
logger = setup_logging()

DEFAULT_SCOPES = "boards:read,boards:write,pins:read,pins:write,user_accounts:read"
AUTH_URL = "https://www.pinterest.com/oauth/"
TOKEN_URL = "https://api.pinterest.com/v5/oauth/token"


def build_auth_url(app_id: str, redirect_uri: str, scopes: str, state: str) -> str:
    params = urlencode(
        {
            "client_id": app_id,
            "redirect_uri": redirect_uri,
            "response_type": "code",
            "scope": scopes,
            "state": state,
        }
    )
    return f"{AUTH_URL}?{params}"


def exchange_code(
    app_id: str,
    app_secret: str,
    code: str,
    redirect_uri: str,
) -> dict:
    response = requests.post(
        TOKEN_URL,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": redirect_uri,
        },
        auth=(app_id, app_secret),
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


def refresh_access_token(app_id: str, app_secret: str, refresh_token: str) -> dict:
    response = requests.post(
        TOKEN_URL,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
        },
        auth=(app_id, app_secret),
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


def save_token(token_data: dict) -> None:
    save_json(TOKEN_FILE, token_data)
    access = token_data.get("access_token", "")
    if access:
        logger.info("Access token saved to %s", TOKEN_FILE)
    refresh = token_data.get("refresh_token")
    if refresh:
        logger.info("Refresh token included — store .env PINTEREST_REFRESH_TOKEN for renewals")


def run_oauth_flow(manual: bool = False) -> dict:
    app_id = os.environ["PINTEREST_APP_ID"]
    app_secret = os.environ["PINTEREST_APP_SECRET"]
    redirect_uri = os.environ.get("PINTEREST_REDIRECT_URI", "http://127.0.0.1:8085/callback")
    scopes = os.environ.get("PINTEREST_SCOPES", DEFAULT_SCOPES)
    state = "scp_pinterest_audit"

    auth_url = build_auth_url(app_id, redirect_uri, scopes, state)
    print("\n1. Ensure this redirect URI is registered in your Pinterest app:")
    print(f"   {redirect_uri}\n")
    print("2. Open this authorization URL:\n")
    print(auth_url)
    print()

    if manual:
        code = input("Paste the authorization code from the redirect URL: ").strip()
    else:
        code_holder: dict[str, str] = {}

        class CallbackHandler(BaseHTTPRequestHandler):
            def do_GET(self):  # noqa: N802
                parsed = urlparse(self.path)
                if parsed.path != urlparse(redirect_uri).path:
                    self.send_response(404)
                    self.end_headers()
                    return
                params = parse_qs(parsed.query)
                code_holder["code"] = params.get("code", [""])[0]
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"Authorization complete. Return to the terminal.")

            def log_message(self, format, *args):  # noqa: A003
                return

        host = urlparse(redirect_uri).hostname or "127.0.0.1"
        port = urlparse(redirect_uri).port or 8085
        server = HTTPServer((host, port), CallbackHandler)
        thread = Thread(target=server.handle_request, daemon=True)
        thread.start()
        webbrowser.open(auth_url)
        print(f"Waiting for OAuth callback on {redirect_uri} ...")
        thread.join(timeout=180)
        server.server_close()
        code = code_holder.get("code", "")
        if not code:
            code = input("No callback received. Paste the authorization code manually: ").strip()

    token_data = exchange_code(app_id, app_secret, code, redirect_uri)
    save_token(token_data)
    expires = token_data.get("expires_in", "unknown")
    print(f"\nToken exchange OK. Expires in {expires} seconds.")
    print(f"Saved to {TOKEN_FILE}")
    print("\nAdd to .env:")
    print(f"PINTEREST_ACCESS_TOKEN={token_data.get('access_token', '')}")
    if token_data.get("refresh_token"):
        print(f"PINTEREST_REFRESH_TOKEN={token_data.get('refresh_token')}")
    return token_data


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Pinterest OAuth for Seventh City Press")
    parser.add_argument("--manual", action="store_true", help="Paste code instead of local callback server")
    args = parser.parse_args()
    run_oauth_flow(manual=args.manual)

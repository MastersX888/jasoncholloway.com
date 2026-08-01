"""Pinterest API v5 client for Operation Pinboard."""

from __future__ import annotations

import os
import time
from typing import Any, Callable

import requests
from dotenv import load_dotenv

from agent_utils import ROOT, TOKEN_FILE, load_json, setup_logging

load_dotenv(ROOT / ".env")
logger = setup_logging()


class PinterestClient:
    BASE_URL = "https://api.pinterest.com/v5"
    SANDBOX_URL = "https://api-sandbox.pinterest.com/v5"

    def __init__(self, access_token: str | None = None, sandbox: bool = False):
        token = access_token or os.environ.get("PINTEREST_ACCESS_TOKEN")
        if not token and TOKEN_FILE.exists():
            token = load_json(TOKEN_FILE).get("access_token")
        if not token:
            raise RuntimeError(
                "No Pinterest access token. Run: python pinboard.py auth"
            )
        self.token = token
        self.sandbox = sandbox
        if sandbox:
            self.BASE_URL = self.SANDBOX_URL
        self.headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json",
        }
        self.request_count = 0

    def _request(self, method: str, endpoint: str, **kwargs: Any) -> dict | list | None:
        url = f"{self.BASE_URL}{endpoint}"
        for attempt in range(5):
            self.request_count += 1
            response = requests.request(
                method, url, headers=self.headers, timeout=60, **kwargs
            )
            logger.info(
                "%s %s -> %s",
                method,
                endpoint,
                response.status_code,
            )
            if response.status_code == 429:
                wait = 2**attempt
                logger.warning("Rate limited. Waiting %ss...", wait)
                time.sleep(wait)
                continue
            if response.status_code == 204:
                return None
            if response.status_code >= 400:
                logger.error("API error %s: %s", response.status_code, response.text[:500])
            response.raise_for_status()
            if not response.text:
                return None
            return response.json()
        raise RuntimeError(f"Failed after retries: {method} {endpoint}")

    def list_boards(self, bookmark: str | None = None) -> dict:
        params: dict[str, Any] = {"page_size": 25}
        if bookmark:
            params["bookmark"] = bookmark
        return self._request("GET", "/boards", params=params)  # type: ignore[return-value]

    def get_board(self, board_id: str) -> dict:
        return self._request("GET", f"/boards/{board_id}")  # type: ignore[return-value]

    def list_board_sections(self, board_id: str) -> dict:
        return self._request("GET", f"/boards/{board_id}/sections")  # type: ignore[return-value]

    def list_board_pins(self, board_id: str, bookmark: str | None = None) -> dict:
        params: dict[str, Any] = {"page_size": 25}
        if bookmark:
            params["bookmark"] = bookmark
        return self._request("GET", f"/boards/{board_id}/pins", params=params)  # type: ignore[return-value]

    def list_section_pins(
        self, board_id: str, section_id: str, bookmark: str | None = None
    ) -> dict:
        params: dict[str, Any] = {"page_size": 25}
        if bookmark:
            params["bookmark"] = bookmark
        return self._request(
            "GET", f"/boards/{board_id}/sections/{section_id}/pins", params=params
        )  # type: ignore[return-value]

    def create_board(self, name: str, description: str, privacy: str = "PUBLIC") -> dict:
        time.sleep(1)
        return self._request(
            "POST",
            "/boards",
            json={"name": name, "description": description, "privacy": privacy},
        )  # type: ignore[return-value]

    def delete_board(self, board_id: str) -> None:
        time.sleep(1)
        self._request("DELETE", f"/boards/{board_id}")

    def update_board(self, board_id: str, **kwargs: Any) -> dict:
        time.sleep(1)
        return self._request("PATCH", f"/boards/{board_id}", json=kwargs)  # type: ignore[return-value]

    def get_pin(self, pin_id: str) -> dict:
        return self._request("GET", f"/pins/{pin_id}")  # type: ignore[return-value]

    def create_pin(
        self,
        board_id: str,
        title: str,
        description: str,
        link: str,
        image_url: str,
        alt_text: str | None = None,
        board_section_id: str | None = None,
    ) -> dict:
        payload: dict[str, Any] = {
            "board_id": board_id,
            "title": title[:100],
            "description": description[:500],
            "link": link,
            "media_source": {"source_type": "image_url", "url": image_url},
        }
        if alt_text:
            payload["alt_text"] = alt_text[:500]
        if board_section_id:
            payload["board_section_id"] = board_section_id
        time.sleep(2)
        return self._request("POST", "/pins", json=payload)  # type: ignore[return-value]

    def update_pin(self, pin_id: str, **kwargs: Any) -> dict:
        time.sleep(1)
        return self._request("PATCH", f"/pins/{pin_id}", json=kwargs)  # type: ignore[return-value]

    def delete_pin(self, pin_id: str) -> None:
        time.sleep(1)
        self._request("DELETE", f"/pins/{pin_id}")

    def get_pin_analytics(
        self,
        pin_id: str,
        start_date: str,
        end_date: str,
        metric_types: str = "IMPRESSION,SAVE,PIN_CLICK",
    ) -> dict | None:
        try:
            return self._request(
                "GET",
                f"/pins/{pin_id}/analytics",
                params={
                    "start_date": start_date,
                    "end_date": end_date,
                    "metric_types": metric_types,
                },
            )  # type: ignore[return-value]
        except Exception as exc:  # noqa: BLE001
            logger.warning("Analytics unavailable for pin %s: %s", pin_id, exc)
            return None

    def get_user_account(self) -> dict:
        return self._request("GET", "/user_account")  # type: ignore[return-value]

    def paginate_all(self, method: Callable[..., dict], *args: Any, **kwargs: Any) -> list:
        all_items: list = []
        bookmark = None
        while True:
            result = method(*args, bookmark=bookmark, **kwargs)
            all_items.extend(result.get("items", []))
            bookmark = result.get("bookmark")
            if not bookmark:
                break
            time.sleep(0.5)
        return all_items

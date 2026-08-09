"""
Pinterest API v5 Client.

Full-featured wrapper with rate limiting, exponential backoff,
pagination, and comprehensive logging.
"""

import logging
import os
import time
from typing import Any, Optional

import requests
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("pinterest_client")

BASE_URL = "https://api.pinterest.com/v5"

MAX_RETRIES = 5
INITIAL_BACKOFF = 1.0
BACKOFF_MULTIPLIER = 2.0
PAGE_SIZE = 25


class PinterestAPIError(Exception):
    def __init__(self, status_code: int, message: str, response: dict = None):
        self.status_code = status_code
        self.message = message
        self.response = response or {}
        super().__init__(f"Pinterest API {status_code}: {message}")


class PinterestClient:
    """Pinterest API v5 client with rate limiting and full CRUD support."""

    def __init__(self, access_token: str = None):
        self.access_token = access_token or os.getenv("PINTEREST_ACCESS_TOKEN")
        if not self.access_token:
            raise ValueError(
                "PINTEREST_ACCESS_TOKEN required. Set in .env or pass directly."
            )
        self.session = requests.Session()
        self.session.headers.update(
            {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json",
            }
        )
        self._request_count = 0

    def _request(
        self,
        method: str,
        endpoint: str,
        params: dict = None,
        json_data: dict = None,
        retries: int = MAX_RETRIES,
    ) -> dict:
        url = f"{BASE_URL}{endpoint}"
        backoff = INITIAL_BACKOFF

        for attempt in range(retries):
            self._request_count += 1
            logger.info(
                "API %s %s (attempt %d/%d)", method, endpoint, attempt + 1, retries
            )

            try:
                resp = self.session.request(
                    method, url, params=params, json=json_data, timeout=30
                )
            except requests.exceptions.RequestException as e:
                logger.error("Request failed: %s", e)
                if attempt < retries - 1:
                    time.sleep(backoff)
                    backoff *= BACKOFF_MULTIPLIER
                    continue
                raise

            if resp.status_code == 429:
                retry_after = int(resp.headers.get("Retry-After", backoff))
                logger.warning("Rate limited. Waiting %ds...", retry_after)
                time.sleep(retry_after)
                backoff *= BACKOFF_MULTIPLIER
                continue

            if resp.status_code >= 500:
                logger.warning("Server error %d. Retrying...", resp.status_code)
                time.sleep(backoff)
                backoff *= BACKOFF_MULTIPLIER
                continue

            if resp.status_code == 204:
                return {}

            if resp.status_code >= 400:
                try:
                    error_body = resp.json()
                except Exception:
                    error_body = {"raw": resp.text}
                raise PinterestAPIError(
                    resp.status_code,
                    error_body.get("message", resp.text),
                    error_body,
                )

            if not resp.content:
                return {}

            return resp.json()

        raise PinterestAPIError(429, "Max retries exceeded due to rate limiting")

    def _paginate(self, endpoint: str, params: dict = None) -> list:
        """Collect all items across paginated responses."""
        all_items = []
        params = params or {}
        params["page_size"] = PAGE_SIZE
        bookmark = None

        while True:
            if bookmark:
                params["bookmark"] = bookmark
            elif "bookmark" in params:
                del params["bookmark"]

            data = self._request("GET", endpoint, params=params)
            items = data.get("items", [])
            all_items.extend(items)

            bookmark = data.get("bookmark")
            if not bookmark:
                break

            logger.info("Paginating %s — %d items so far", endpoint, len(all_items))

        return all_items

    # --- User Account ---

    def get_user_account(self) -> dict:
        return self._request("GET", "/user_account")

    # --- Boards ---

    def list_boards(self, privacy: str = None) -> list:
        params = {}
        if privacy:
            params["privacy"] = privacy
        return self._paginate("/boards", params=params)

    def get_board(self, board_id: str) -> dict:
        return self._request("GET", f"/boards/{board_id}")

    def create_board(self, name: str, description: str = "", privacy: str = "PUBLIC") -> dict:
        return self._request(
            "POST",
            "/boards",
            json_data={
                "name": name,
                "description": description,
                "privacy": privacy,
            },
        )

    def update_board(self, board_id: str, **kwargs) -> dict:
        return self._request("PATCH", f"/boards/{board_id}", json_data=kwargs)

    def delete_board(self, board_id: str) -> dict:
        return self._request("DELETE", f"/boards/{board_id}")

    # --- Sections ---

    def list_sections(self, board_id: str) -> list:
        return self._paginate(f"/boards/{board_id}/sections")

    def list_section_pins(self, board_id: str, section_id: str) -> list:
        return self._paginate(f"/boards/{board_id}/sections/{section_id}/pins")

    def create_section(self, board_id: str, name: str) -> dict:
        return self._request(
            "POST",
            f"/boards/{board_id}/sections",
            json_data={"name": name},
        )

    # --- Pins ---

    def list_pins(self, board_id: str) -> list:
        return self._paginate(f"/boards/{board_id}/pins")

    def get_pin(self, pin_id: str) -> dict:
        return self._request("GET", f"/pins/{pin_id}")

    def create_pin(
        self,
        board_id: str,
        title: str,
        description: str,
        link: str = None,
        media_source: dict = None,
        alt_text: str = None,
        board_section_id: str = None,
    ) -> dict:
        data: dict[str, Any] = {
            "board_id": board_id,
            "title": title,
            "description": description,
        }
        if link:
            data["link"] = link
        if media_source:
            data["media_source"] = media_source
        if alt_text:
            data["alt_text"] = alt_text
        if board_section_id:
            data["board_section_id"] = board_section_id
        return self._request("POST", "/pins", json_data=data)

    def update_pin(self, pin_id: str, **kwargs) -> dict:
        return self._request("PATCH", f"/pins/{pin_id}", json_data=kwargs)

    def delete_pin(self, pin_id: str) -> dict:
        return self._request("DELETE", f"/pins/{pin_id}")

    # --- Analytics ---

    def get_pin_analytics(
        self,
        pin_id: str,
        start_date: str,
        end_date: str,
        metric_types: list = None,
    ) -> dict:
        if metric_types is None:
            metric_types = [
                "IMPRESSION",
                "SAVE",
                "PIN_CLICK",
                "OUTBOUND_CLICK",
            ]
        params = {
            "start_date": start_date,
            "end_date": end_date,
            "metric_types": ",".join(metric_types),
        }
        return self._request("GET", f"/pins/{pin_id}/analytics", params=params)

    def get_board_analytics(
        self,
        board_id: str,
        start_date: str,
        end_date: str,
        metric_types: list = None,
    ) -> dict:
        if metric_types is None:
            metric_types = [
                "IMPRESSION",
                "SAVE",
                "PIN_CLICK",
                "OUTBOUND_CLICK",
            ]
        params = {
            "start_date": start_date,
            "end_date": end_date,
            "metric_types": ",".join(metric_types),
        }
        return self._request("GET", f"/boards/{board_id}/analytics", params=params)

    @property
    def request_count(self) -> int:
        return self._request_count

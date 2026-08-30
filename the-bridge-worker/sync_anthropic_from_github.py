#!/usr/bin/env python3
"""Update GitHub CF_API_TOKEN and trigger sync_bridge_anthropic workflow."""
import base64
import json
import subprocess
import sys
import time
import urllib.error
import urllib.request

from nacl import encoding, public

REPO = "MastersX888/groundswell-monitor"
ENV_PATH = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\groundswell-monitor\pipeline\.env"


def git_cred():
    proc = subprocess.run(
        ["git", "credential", "fill"],
        input="protocol=https\nhost=github.com\n\n",
        capture_output=True,
        text=True,
        check=True,
    )
    user = password = None
    for line in proc.stdout.splitlines():
        if line.startswith("username="):
            user = line.split("=", 1)[1]
        if line.startswith("password="):
            password = line.split("=", 1)[1]
    if not user or not password:
        raise RuntimeError("GitHub credentials not found")
    return user, password


def seal(public_key: str, secret_value: str) -> str:
    pk = public.PublicKey(public_key.encode("utf-8"), encoding.Base64Encoder())
    sealed = public.SealedBox(pk).encrypt(secret_value.encode("utf-8"))
    return base64.b64encode(sealed).decode("utf-8")


def github_request(url, user, token, method="GET", data=None):
    auth = base64.b64encode(f"{user}:{token}".encode()).decode()
    headers = {
        "Authorization": f"Basic {auth}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    body = None
    if data is not None:
        headers["Content-Type"] = "application/json"
        body = json.dumps(data).encode()
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    with urllib.request.urlopen(req) as resp:
        return resp.status, resp.read().decode()


def main():
    env_text = open(ENV_PATH, encoding="utf-8").read()
    cf_token = next(
        line.split("=", 1)[1].strip()
        for line in env_text.splitlines()
        if line.startswith("CF_API_TOKEN=")
    )
    user, gh_token = git_cred()

    _, key_json = github_request(
        f"https://api.github.com/repos/{REPO}/actions/secrets/public-key",
        user,
        gh_token,
    )
    key = json.loads(key_json)
    status, _ = github_request(
        f"https://api.github.com/repos/{REPO}/actions/secrets/CF_API_TOKEN",
        user,
        gh_token,
        "PUT",
        {"encrypted_value": seal(key["key"], cf_token), "key_id": key["key_id"]},
    )
    print("update CF_API_TOKEN:", status)

    status, body = github_request(
        f"https://api.github.com/repos/{REPO}/actions/workflows/sync_bridge_anthropic.yml/dispatches",
        user,
        gh_token,
        "POST",
        {"ref": "main"},
    )
    print("dispatch:", status, body)

    for _ in range(36):
        time.sleep(5)
        _, runs_json = github_request(
            f"https://api.github.com/repos/{REPO}/actions/workflows/sync_bridge_anthropic.yml/runs?per_page=1",
            user,
            gh_token,
        )
        run = json.loads(runs_json)["workflow_runs"][0]
        print("run:", run["status"], run.get("conclusion"))
        if run["status"] == "completed":
            return 0 if run.get("conclusion") == "success" else 1
    return 1


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except urllib.error.HTTPError as exc:
        print("HTTP error:", exc.code, exc.read().decode(), file=sys.stderr)
        raise

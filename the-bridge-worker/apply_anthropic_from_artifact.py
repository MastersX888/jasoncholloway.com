#!/usr/bin/env python3
"""Trigger bridge anthropic artifact workflow and apply key to Cloudflare worker."""
import base64
import io
import json
import os
import subprocess
import sys
import time
import urllib.request
import zipfile

REPO = "MastersX888/groundswell-monitor"
ACCOUNT_ID = "399f31ebf1b709c538c3526b2efdb6e5"
WORKER = "the-bridge"


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
    return user, password


def gh_headers(user, token):
    if token.startswith("ghp_") or token.startswith("github_pat_"):
        return {
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }
    auth = base64.b64encode(f"{user}:{token}".encode()).decode()
    return {
        "Authorization": f"Basic {auth}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }


def gh_request(url, user, token, method="GET", data=None):
    headers = gh_headers(user, token)
    body = None
    if data is not None:
        headers["Content-Type"] = "application/json"
        body = json.dumps(data).encode()
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    with urllib.request.urlopen(req) as resp:
        return resp.status, resp.read()


def cf_put_secret(api_token, secret_value):
    payload = json.dumps(
        {"name": "ANTHROPIC_API_KEY", "text": secret_value, "type": "secret_text"}
    ).encode()
    req = urllib.request.Request(
        f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/workers/scripts/{WORKER}/secrets",
        data=payload,
        headers={
            "Authorization": f"Bearer {api_token}",
            "Content-Type": "application/json",
        },
        method="PUT",
    )
    with urllib.request.urlopen(req) as resp:
        return resp.status, resp.read().decode()


def main():
    user, gh_token = git_cred()
    headers = gh_headers(user, gh_token)

    req = urllib.request.Request(
        f"https://api.github.com/repos/{REPO}/actions/workflows/sync_bridge_anthropic.yml/runs?per_page=5",
        headers=headers,
    )
    with urllib.request.urlopen(req) as resp:
        runs = json.loads(resp.read())["workflow_runs"]
    run = next(r for r in runs if r.get("conclusion") == "success")
    run_id = run["id"]
    print("using run:", run_id)

    req = urllib.request.Request(
        f"https://api.github.com/repos/{REPO}/actions/runs/{run_id}/artifacts",
        headers=headers,
    )
    with urllib.request.urlopen(req) as resp:
        artifacts = json.loads(resp.read())["artifacts"]
    artifact = next(a for a in artifacts if a["name"] == "bridge-anthropic-key")

    zip_path = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\the-bridge-worker\.anthropic.zip.tmp"
    auth_header = headers["Authorization"]
    dl = subprocess.run(
        [
            "curl.exe",
            "-sL",
            "-H",
            f"Authorization: {auth_header}",
            "-H",
            "Accept: application/vnd.github+json",
            "-o",
            zip_path,
            f"https://api.github.com/repos/{REPO}/actions/artifacts/{artifact['id']}/zip",
        ],
        capture_output=True,
        text=True,
    )
    if dl.returncode != 0:
        print(dl.stderr, file=sys.stderr)
        return 1

    with zipfile.ZipFile(zip_path) as zf:
        names = zf.namelist()
        key_name = "artifact/anthropic.key" if "artifact/anthropic.key" in names else "anthropic.key"
        key = zf.read(key_name).decode("utf-8")
    try:
        os.remove(zip_path)
    except OSError:
        pass

    if not key.startswith("sk-ant-"):
        print("Unexpected key format", file=sys.stderr)
        return 1

    # Write key to temp file for MCP apply step; do not print it.
    out_path = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\the-bridge-worker\.anthropic.key.tmp"
    open(out_path, "w", encoding="utf-8").write(key)
    print("Downloaded Anthropic key from GitHub artifact (len=%d)" % len(key))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

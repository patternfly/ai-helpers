#!/usr/bin/env python3
"""Duplicate a Jira epic into the PatternFly (PF) space and link it to a feature.

Usage:
    python duplicate_epic.py <epic> <feature>

Arguments:
    epic     Issue key (e.g., COST-7170) or full Jira URL
    feature  Issue key (e.g., PF-3406) or full Jira URL

Environment variables:
    JIRA_USER_EMAIL   Atlassian account email
    JIRA_API_TOKEN    API token from id.atlassian.com/manage/api-tokens
    JIRA_BASE_URL     (optional) Defaults to https://redhat.atlassian.net
"""

import os
import re
import sys

import requests
from requests.auth import HTTPBasicAuth

JIRA_BASE_URL = os.environ.get("JIRA_BASE_URL", "https://redhat.atlassian.net")
PF_PROJECT = "PF"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def parse_issue_key(value: str) -> str:
    """Extract an issue key from a URL or return it as-is."""
    match = re.search(r"/browse/([A-Z]+-\d+)", value)
    if match:
        return match.group(1)
    if re.match(r"^[A-Z]+-\d+$", value):
        return value
    raise ValueError(f"Cannot parse issue key from: {value!r}")


def make_session() -> requests.Session:
    email = os.environ.get("JIRA_USER_EMAIL")
    token = os.environ.get("JIRA_API_TOKEN")
    if not email or not token:
        sys.exit(
            "ERROR: Set JIRA_USER_EMAIL and JIRA_API_TOKEN environment variables.\n"
            "       Create a token at https://id.atlassian.com/manage/api-tokens"
        )
    session = requests.Session()
    session.auth = HTTPBasicAuth(email, token)
    session.headers.update({"Accept": "application/json", "Content-Type": "application/json"})
    return session


def api_get(session: requests.Session, path: str) -> dict:
    r = session.get(f"{JIRA_BASE_URL}/rest/api/3/{path}")
    r.raise_for_status()
    return r.json()


def api_post(session: requests.Session, path: str, data: dict) -> dict:
    r = session.post(f"{JIRA_BASE_URL}/rest/api/3/{path}", json=data)
    r.raise_for_status()
    return r.json() if r.text else {}


def api_put(session: requests.Session, path: str, data: dict) -> None:
    r = session.put(f"{JIRA_BASE_URL}/rest/api/3/{path}", json=data)
    r.raise_for_status()


# ---------------------------------------------------------------------------
# Jira operations
# ---------------------------------------------------------------------------

def get_current_user(session: requests.Session) -> str:
    """Return the accountId of the authenticated user."""
    data = api_get(session, "myself")
    return data["accountId"]


def get_issue(session: requests.Session, key: str) -> dict:
    return api_get(session, f"issue/{key}")


def find_existing_clone(session: requests.Session, original_key: str) -> str | None:
    """Return the key of an existing PF clone, or None.

    Checks the original epic's Duplicate links for any inward issue whose key
    starts with the PF project prefix.  The link shape on the original (which
    is the *outward* side of "X duplicates Y") exposes the inward issue:

        {type: {name: "Duplicate"}, inwardIssue: {key: "PF-NNN"}}
    """
    issue = get_issue(session, original_key)
    for link in issue.get("fields", {}).get("issuelinks", []):
        if link.get("type", {}).get("name") == "Duplicate":
            inward = link.get("inwardIssue", {})
            key = inward.get("key", "")
            if key.startswith(f"{PF_PROJECT}-"):
                return key
    return None


def clone_issue(session: requests.Session, original_key: str, account_id: str) -> str:
    """Create a new Epic in the PF project copied from the original. Returns the new key."""
    issue = get_issue(session, original_key)
    fields = issue["fields"]

    new_fields: dict = {
        "project": {"key": PF_PROJECT},
        "summary": fields.get("summary", ""),
        "issuetype": {"name": "Epic"},
        "assignee": {"accountId": account_id},
    }

    if fields.get("description"):
        new_fields["description"] = fields["description"]

    if fields.get("labels"):
        new_fields["labels"] = fields["labels"]

    result = api_post(session, "issue", {"fields": new_fields})
    return result["key"]


def has_duplicate_link(session: requests.Session, new_key: str, original_key: str) -> bool:
    """Return True if new_key already shows 'is duplicated by original_key'.

    When new_key is the *inward* issue, the REST response exposes the outward
    issue (the one that "duplicates" it):

        {type: {name: "Duplicate"}, outwardIssue: {key: original_key}}
    """
    issue = get_issue(session, new_key)
    for link in issue.get("fields", {}).get("issuelinks", []):
        if link.get("type", {}).get("name") == "Duplicate":
            outward = link.get("outwardIssue", {}).get("key", "")
            if outward == original_key:
                return True
    return False


def add_duplicate_link(session: requests.Session, new_key: str, original_key: str) -> None:
    """Add 'new_key is duplicated by original_key' to new_key's linked work items."""
    api_post(session, "issueLink", {
        "type": {"name": "Duplicate"},
        "inwardIssue": {"key": new_key},      # new_key  → "is duplicated by"
        "outwardIssue": {"key": original_key}, # original → "duplicates"
    })


def update_issue(session: requests.Session, key: str, parent_key: str, account_id: str) -> None:
    """Set the parent and assignee on an issue (works for both new and existing clones)."""
    api_put(session, f"issue/{key}", {
        "fields": {
            "parent": {"key": parent_key},
            "assignee": {"accountId": account_id},
        }
    })


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(
            "Usage: python duplicate_epic.py <epic> <feature>\n"
            "  epic    — e.g., COST-7170 or https://redhat.atlassian.net/browse/COST-7170\n"
            "  feature — e.g., PF-3406  or https://redhat.atlassian.net/browse/PF-3406"
        )

    original_key = parse_issue_key(sys.argv[1])
    feature_key = parse_issue_key(sys.argv[2])

    session = make_session()

    # Step 1 — resolve current user
    print("Resolving current user...")
    account_id = get_current_user(session)
    print(f"Assignee account ID: {account_id}")

    # Step 2 — find or create the PF clone
    print(f"Checking for existing PF clone of {original_key}...")
    new_key = find_existing_clone(session, original_key)

    if new_key:
        print(f"Found existing clone: {new_key}")
    else:
        print(f"Cloning {original_key} into {PF_PROJECT} project...")
        new_key = clone_issue(session, original_key, account_id)
        print(f"Created: {new_key}")

    # Step 3 — ensure "is duplicated by" link
    if has_duplicate_link(session, new_key, original_key):
        print(f"'Is duplicated by' link already present on {new_key}")
    else:
        print(f"Adding 'is duplicated by {original_key}' link to {new_key}...")
        add_duplicate_link(session, new_key, original_key)
        print("Link added")

    # Step 4 — set parent and assignee
    print(f"Assigning {new_key} to current user and setting parent to {feature_key}...")
    update_issue(session, new_key, feature_key, account_id)
    print("Updated")

    # Step 4 — display results
    print(f"\nDone!")
    print(f"  Feature:       {JIRA_BASE_URL}/browse/{feature_key}")
    print(f"  New Epic:      {JIRA_BASE_URL}/browse/{new_key}")
    print(f"  Original Epic: {JIRA_BASE_URL}/browse/{original_key}")


if __name__ == "__main__":
    main()

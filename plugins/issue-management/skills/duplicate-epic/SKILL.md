---
name: duplicate-epic
description: Use when `/duplicate-epic <issue> <feature>` should clone a Jira Epic, Story, or Bug into the PF project, resolve non-epic inputs to their parent epic, link back to the source, and attach the new epic to a PF feature.
disable-model-invocation: true
---

# Duplicate Epic

Clones a Jira epic (e.g., from the `COST` project) into the PatternFly (`PF`) Jira space, ensures it carries an "is duplicated by" link referencing the original, and sets it as a child of the given feature.

## Requirements

| Tool | Purpose | Install |
|---|---|---|
| `curl` | Jira REST API calls | pre-installed on macOS; `brew install curl` |
| `jq` | JSON parsing and payload construction | `brew install jq` |

The script checks for both tools at startup and exits with a helpful message if either is missing.

## Input Parsing

The command takes exactly two positional arguments:

| Position | Name | Description |
|---|---|---|
| `$1` | `issue` | Any Jira issue key or full URL — Epic, Story, Bug, etc. |
| `$2` | `feature` | The PF feature key or full URL to assign the new epic to |

Both bare keys and full URLs are accepted:

| Input | Parsed key |
|---|---|
| `COST-7355` | `COST-7355` |
| `https://redhat.atlassian.net/browse/COST-7355` | `COST-7355` |
| `PF-3868` | `PF-3868` |
| `https://redhat.atlassian.net/browse/PF-3868` | `PF-3868` |

Pass `$1` and `$2` directly to the script — no further parsing required.

## Prerequisites

The script requires two environment variables:

| Variable | Description |
|---|---|
| `JIRA_USER_EMAIL` | Atlassian account email |
| `JIRA_API_TOKEN` | API token from [id.atlassian.com/manage/api-tokens](https://id.atlassian.com/manage/api-tokens) |

If either is missing, ask the user for their email and direct them to create an API token, then set the variables inline when running the script.

## Workflow

Run the script from the skill directory:

```bash
cd $CLAUDE_SKILL_DIR
bash scripts/duplicate_epic.sh <issue> <feature>
```

The first argument (`issue`) may be an Epic, Story, Bug, or any other issue type. If it is not an Epic, the script automatically resolves its parent epic before cloning.

**Examples:**

```bash
bash scripts/duplicate_epic.sh COST-7355 PF-3868
bash scripts/duplicate_epic.sh COST-7309 PF-3868   # story/bug — script walks up to parent epic automatically
```

With inline credentials:

```bash
JIRA_USER_EMAIL="you@example.com" JIRA_API_TOKEN="your-token" \
  bash scripts/duplicate_epic.sh COST-7170 PF-3406
```

## What the Script Does

1. **Resolve current user** — looks up the account ID for the authenticated user (used for the assignee field).
2. **Resolve to an epic** — fetches the given issue. If it is not an `Epic` (e.g., it is a Story or Bug), the script walks up to its parent epic using `fields.parent` (next-gen projects) or `fields.customfield_10014` (classic epic link). Exits with an error if no parent epic can be found.
3. **Find existing clone** — checks the resolved epic's `Duplicate` issue links for any `PF-` issue; skips creation if found.
4. **Clone** — if no clone exists, creates a new Epic in the `PF` project copying the summary and labels. The description is sanitized before cloning: `mediaSingle` and `media` nodes (embedded attachments) are stripped, so embedded images and file attachments will not appear in the PF copy.
5. **Ensure "is duplicated by" link** — adds a `Duplicate` link so the new epic displays "is duplicated by {ORIGINAL EPIC}" in its linked work items; skips if already present.
6. **Set parent and assignee** — assigns the new epic as a child of the given feature and assigns it to the current user (resolved automatically via the API token).
7. **Display results** — prints clickable URLs for the feature, new epic, and original epic.

## Output

After a successful run, display these URLs to the user:

```
Feature:       https://redhat.atlassian.net/browse/PF-3406
New Epic:      https://redhat.atlassian.net/browse/PF-XXXX
Original Epic: https://redhat.atlassian.net/browse/COST-7170
Input Issue:   https://redhat.atlassian.net/browse/COST-7309   ← only shown when input was not itself an epic
```

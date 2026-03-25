---
name: duplicate-epic
description: Duplicates an Atlassian Jira epic into the PatternFly (PF) project space, adds an "is duplicated by" link referencing the original, and assigns it as a child of a given feature. This allows the PatternFly team to trace Jira work items up a hierarchy in the product Jira project. Use when asked to "duplicate epic X for feature Y", clone a COST epic to PatternFly, or replicate a Jira epic under a PF feature.
---

# Duplicate Epic

Clones a Jira epic (e.g., from the `COST` project) into the PatternFly (`PF`) Jira space, ensures it carries an "is duplicated by" link referencing the original, and sets it as a child of the given feature.

## Input Parsing

Accept issue identifiers as either bare keys or full URLs:

| Input | Parsed key |
|---|---|
| `COST-7170` | `COST-7170` |
| `https://redhat.atlassian.net/browse/COST-7170` | `COST-7170` |
| `PF-3406` | `PF-3406` |
| `https://redhat.atlassian.net/browse/PF-3406` | `PF-3406` |

## Prerequisites

The script requires two environment variables:

| Variable | Description |
|---|---|
| `JIRA_USER_EMAIL` | Atlassian account email |
| `JIRA_API_TOKEN` | API token from [id.atlassian.com/manage/api-tokens](https://id.atlassian.com/manage/api-tokens) |

If either is missing, ask the user for their email and direct them to create an API token, then set the variables inline when running the script.

Requires the `requests` package (`python3 -m pip install requests`).

## Workflow

Run the script from the skill directory:

```bash
cd /path/to/plugins/pf-react/skills/duplicate-epic
python3 scripts/duplicate_epic.py <epic> <feature>
```

**Examples:**

```bash
python3 scripts/duplicate_epic.py COST-7170 PF-3406
python3 scripts/duplicate_epic.py https://redhat.atlassian.net/browse/COST-7170 https://redhat.atlassian.net/browse/PF-3406
```

With inline credentials:

```bash
JIRA_USER_EMAIL="you@example.com" JIRA_API_TOKEN="your-token" \
  python3 scripts/duplicate_epic.py COST-7170 PF-3406
```

## What the Script Does

1. **Find existing clone** — checks the original epic's `Duplicate` issue links for any `PF-` issue; skips creation if found.
2. **Clone** — if no clone exists, creates a new Epic in the `PF` project copying the summary, description, and labels.
3. **Ensure "is duplicated by" link** — adds a `Duplicate` link so the new epic displays "is duplicated by {ORIGINAL}" in its linked work items; skips if already present.
4. **Set parent** — assigns the new epic as a child of the given feature via the `parent` field.
5. **Display results** — prints clickable URLs for the feature, new epic, and original epic.

## Output

After a successful run, display these URLs to the user:

```
Feature:       https://redhat.atlassian.net/browse/PF-3406
New Epic:      https://redhat.atlassian.net/browse/PF-XXXX
Original Epic: https://redhat.atlassian.net/browse/COST-7170
```

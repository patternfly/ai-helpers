---
name: analytics-repo-pruning
description: Flags archived or inactive Git repositories listed in PatternFly Analytics repos.json so entries can be pruned. Use when reviewing repos.json, auditing tracked codebases, or removing stale or archived repos from analytics.
---

# Analytics repo pruning

Keep PatternFly Analytics from tracking **archived** repositories and repos with **no meaningful code activity** past a configurable threshold (default **730 days**).

## Plugin placement

This skill lives under **repo-management** as **cross-repo / analytics inventory** work (repository health and maintenance).

## Input

- **File:** `repos.json` (project root or path the user supplies). Expect a top-level `repos` array; each entry has `git` (clone URL) and `name` (display label).

## Outcomes

For every row, assign one bucket:

| Bucket | Meaning |
|--------|---------|
| **archived** | Host marks the project archived / read-only |
| **stale** | Last code activity is before the cutoff |
| **could not verify** | Auth failure, network, or unsupported host—**not** the same as stale |
| **active** | Neither archived nor stale |

Use the host’s best signal for **real code activity** (e.g. last push to the default branch), not noisy metadata-only updates. Field names and API notes: [reference.md](reference.md).

## How to work

1. Read `repos.json` and collect all `git` URLs with their `name`.
2. For each URL, determine host (**GitHub**, **GitLab** including private instances, or other).
3. Query the host using **whatever authenticated access the user’s environment already provides** (host CLI, REST with tokens, etc.). Prefer a deterministic per-repo lookup; if one path fails, try another before giving up.
4. Do **not** treat auth or network failures as “stale”—bucket those as **could not verify** with a short reason.
5. Produce the report below. **Do not** remove or edit `repos.json` entries unless the user explicitly asks.

## Edge cases

- **404 / moved / renamed:** Flag for manual verification; do not assume delete.
- **Forks and mirrors:** Same rules; stale mirrors may still be poor analytics targets.
- **Unknown hosts:** **could not verify** with explanation—not stale.

## Optional script

For a repeatable local run, execute the bundled **Bash** script `scripts/analytics-repo-pruning.sh` next to this skill. Requires `jq` and either `gh` or `curl` (typically pre-installed). Pass the path to `repos.json`; optional `--days <n>` and `--json`. Does not modify `repos.json`.

## Report format

Use markdown with:

1. **Threshold** (days) and **run date**
2. **Archived** — table: name, git, notes
3. **Stale** — table: name, git, last activity (and which field was used)
4. **Could not verify** — table: name, git, reason
5. **Active** — brief count or one-line summary

**Good output:** Clear buckets, honest “unknown,” timestamps tied to named fields, no silent edits to the JSON file.

**Bad output:** Calling repos stale because API calls failed, or pruning the list without explicit user consent.

## Additional resources

- [reference.md](reference.md) — host APIs, fields, encoding, and CLI patterns

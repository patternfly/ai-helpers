# Reference: hosts, APIs, and fields

## GitHub

**REST:** `GET /repos/{owner}/{repo}` (same payload as `gh api repos/OWNER/REPO`).

| Field | Use |
|-------|-----|
| `archived` | `true` → archived |
| `pushed_at` | Prefer for “code activity” (last push); compare ISO 8601 to cutoff |
| `updated_at` | Noisier (issues, wiki, settings); avoid as primary stale signal |
| `disabled` | Rare; policy-disabled repo |

Parse `owner` and `repo` from HTTPS or SSH URLs (strip trailing `.git`). Example metadata pull:

```bash
gh api "repos/OWNER/REPO" --jq '{archived, pushed_at, updated_at, html_url}'
```

If the host CLI is unavailable, use REST with a token the environment already exposes (e.g. `GITHUB_TOKEN`). Anonymous quotas are tight—prefer authenticated access.

**Stale:** `pushed_at` is null or older than the cutoff.

## GitLab

**REST:** `GET /api/v4/projects/:id` where `:id` is numeric id or **URL-encoded path** (`namespace%2Fproject`).

| Field | Use |
|-------|-----|
| `archived` | `true` → archived |
| `last_repository_update` | Prefer when present (closest to “last git activity”) |
| `last_activity_at` | Broader activity (issues, MRs, pushes); fallback |

**Example request** (replace host, path, token):

```bash
curl --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  "https://gitlab.example.com/api/v4/projects/PATH_ENCODED"
```

Private instances need a token with at least **read_api**. **401/403/404** on private or renamed projects: treat as **could not verify**, not stale.

**Encoding path:** e.g. `group/my-project` → `group%2Fmy-project`

```bash
python3 -c "import urllib.parse; print(urllib.parse.quote('group/my-project', safe=''))"
```

**GitLab.com:** Some public projects respond without a token; private repos need a token.

## Batch workflow (assistant or script)

1. Parse all `git` URLs from `repos.json`.
2. Group by host where helpful (github.com, gitlab hosts, etc.).
3. For each URL, record `name`, URL, archived flag, activity timestamp, and classification notes.
4. Emit the markdown report defined in `SKILL.md`; do not modify `repos.json` unless the user requests it.

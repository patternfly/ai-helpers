#!/usr/bin/env bash
# Reads repos.json and checks each remote for archive status and last activity.
# GitHub: prefers gh CLI; falls back to curl + GITHUB_TOKEN.
# GitLab: curl + GITLAB_TOKEN / PRIVATE_TOKEN.
#
# Requirements: jq, and either gh or curl (both typically pre-installed).
#
# Usage (from the project that contains repos.json, default file ./repos.json):
#   bash plugins/repo-management/skills/analytics-repo-pruning/scripts/analytics-repo-pruning.sh repos.json
#   bash .../analytics-repo-pruning.sh --days 730 repos.json
#   bash .../analytics-repo-pruning.sh --json repos.json

set -euo pipefail

DAYS=730
OUTPUT_JSON=false
REPOS_FILE="repos.json"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --days)
      DAYS="${2:-}"
      [[ "$DAYS" =~ ^[0-9]+$ && "$DAYS" -ge 1 ]] || { echo "Invalid --days value" >&2; exit 1; }
      shift 2 ;;
    --json)  OUTPUT_JSON=true; shift ;;
    --help|-h)
      echo "Usage: $0 [--days N] [--json] [repos.json]" >&2; exit 0 ;;
    -*)  echo "Unknown option: $1" >&2; exit 1 ;;
    *)   REPOS_FILE="$1"; shift ;;
  esac
done

command -v jq >/dev/null 2>&1 || { echo "Error: jq is required but not found" >&2; exit 1; }

HAS_GH=false;   command -v gh   >/dev/null 2>&1 && HAS_GH=true
HAS_CURL=false;  command -v curl >/dev/null 2>&1 && HAS_CURL=true

$HAS_GH || $HAS_CURL || { echo "Error: either gh or curl is required" >&2; exit 1; }

[[ -f "$REPOS_FILE" ]] || { echo "File not found: $REPOS_FILE" >&2; exit 1; }

jq -e '.repos | type == "array"' "$REPOS_FILE" >/dev/null 2>&1 || {
  echo "repos.json must contain a \"repos\" array" >&2; exit 1
}

CUTOFF_EPOCH=$(( $(date +%s) - DAYS * 86400 ))
GENERATED_AT=$(date -u +%Y-%m-%dT%H:%M:%SZ)

RESULTS=$(mktemp)
trap 'rm -f "$RESULTS"' EXIT

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

# ISO 8601 → epoch seconds (tries GNU date, then BSD/macOS date)
iso_to_epoch() {
  local dt="${1:-}"
  [[ -z "$dt" || "$dt" == "null" ]] && { echo 0; return; }
  date -d "$dt" +%s 2>/dev/null && return
  local clean
  clean=$(echo "$dt" | sed -E 's/^([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}).*/\1Z/')
  date -juf "%Y-%m-%dT%H:%M:%SZ" "$clean" +%s 2>/dev/null && return
  echo 0
}

# Epoch → YYYY-MM-DD (cross-platform)
epoch_to_date() {
  date -u -r "$1" +%Y-%m-%d 2>/dev/null || date -u -d "@$1" +%Y-%m-%d 2>/dev/null || echo "unknown"
}

# Epoch → ISO timestamp (cross-platform)
epoch_to_iso() {
  date -u -r "$1" +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u -d "@$1" +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || echo "unknown"
}

# Classify: archived | stale | unknown | ok
classify() {
  local status="$1" archived="$2" activity_at="$3"
  [[ "$status" == "unknown" ]] && { echo "unknown"; return; }
  [[ "$archived" == "true" ]] && { echo "archived"; return; }
  [[ -z "$activity_at" || "$activity_at" == "null" ]] && { echo "stale"; return; }
  local epoch
  epoch=$(iso_to_epoch "$activity_at")
  [[ "$epoch" -eq 0 ]] && { echo "unknown"; return; }
  [[ "$epoch" -lt "$CUTOFF_EPOCH" ]] && { echo "stale"; return; }
  echo "ok"
}

emit_unknown() {
  jq -nc --arg n "$1" --arg g "$2" --arg r "$3" \
    '{name:$n, git:$g, bucket:"unknown", reason:$r}' >> "$RESULTS"
}

# ---------------------------------------------------------------------------
# Host checks
# ---------------------------------------------------------------------------

check_github() {
  local name="$1" git_url="$2" owner_repo=""

  if [[ "$git_url" =~ ^git@github\.com:([^/]+)/(.+)$ ]]; then
    owner_repo="${BASH_REMATCH[1]}/${BASH_REMATCH[2]%.git}"
  elif [[ "$git_url" =~ github\.com/([^/]+)/([^/?#]+) ]]; then
    owner_repo="${BASH_REMATCH[1]}/${BASH_REMATCH[2]%.git}"
  else
    emit_unknown "$name" "$git_url" "Could not parse as github.com URL"; return
  fi

  local api_json=""
  if $HAS_GH; then
    api_json=$(gh api "repos/$owner_repo" 2>/dev/null) || api_json=""
  fi
  if [[ -z "$api_json" ]] && $HAS_CURL && [[ -n "${GITHUB_TOKEN:-}" ]]; then
    api_json=$(curl -sf \
      -H "Authorization: Bearer $GITHUB_TOKEN" \
      -H "Accept: application/vnd.github+json" \
      -H "User-Agent: patternfly-analytics-repo-pruning" \
      "https://api.github.com/repos/$owner_repo" 2>/dev/null) || api_json=""
  fi
  if [[ -z "$api_json" ]]; then
    emit_unknown "$name" "$git_url" "GitHub API failed (check gh auth or GITHUB_TOKEN)"; return
  fi

  local archived activity_at html_url bucket
  archived=$(echo "$api_json" | jq -r '.archived // false')
  activity_at=$(echo "$api_json" | jq -r '.pushed_at // empty')
  html_url=$(echo "$api_json" | jq -r '.html_url // empty')
  bucket=$(classify "" "$archived" "$activity_at")

  jq -nc --arg n "$name" --arg g "$git_url" \
    --arg ar "$archived" --arg aa "${activity_at:-}" \
    --arg hu "${html_url:-$git_url}" --arg b "$bucket" \
    '{name:$n, git:$g, host:"github", archived:($ar=="true"),
      activityAt:$aa, activityField:"pushed_at", htmlUrl:$hu, bucket:$b}' >> "$RESULTS"
}

check_gitlab() {
  local name="$1" git_url="$2"
  local token="${GITLAB_TOKEN:-${GITLAB_PRIVATE_TOKEN:-${PRIVATE_TOKEN:-}}}"

  local base="" project_path=""
  if [[ "$git_url" =~ ^(https?://[^/]+)/(.+) ]]; then
    base="${BASH_REMATCH[1]}"
    project_path="${BASH_REMATCH[2]%.git}"
    project_path="${project_path#/}"
    project_path="${project_path%/}"
  else
    emit_unknown "$name" "$git_url" "Could not parse GitLab URL"; return
  fi

  [[ -z "$token" ]] && { emit_unknown "$name" "$git_url" "GITLAB_TOKEN (or PRIVATE_TOKEN) not set"; return; }
  $HAS_CURL || { emit_unknown "$name" "$git_url" "curl required for GitLab API"; return; }

  local encoded api_json
  encoded=$(printf '%s' "$project_path" | jq -sRr @uri)
  api_json=$(curl -sf \
    -H "PRIVATE-TOKEN: $token" \
    -H "User-Agent: patternfly-analytics-repo-pruning" \
    "$base/api/v4/projects/$encoded" 2>/dev/null) || {
    emit_unknown "$name" "$git_url" "GitLab API request failed"; return
  }

  local archived last_repo last_act activity_at="" activity_field="" html_url bucket
  archived=$(echo "$api_json" | jq -r '.archived // false')
  last_repo=$(echo "$api_json" | jq -r '.last_repository_update // empty')
  last_act=$(echo "$api_json" | jq -r '.last_activity_at // empty')
  html_url=$(echo "$api_json" | jq -r '.web_url // empty')

  if [[ -n "$last_repo" ]]; then
    activity_at="$last_repo"; activity_field="last_repository_update"
  elif [[ -n "$last_act" ]]; then
    activity_at="$last_act"; activity_field="last_activity_at"
  fi

  bucket=$(classify "" "$archived" "$activity_at")
  jq -nc --arg n "$name" --arg g "$git_url" \
    --arg ar "$archived" --arg aa "${activity_at:-}" --arg af "${activity_field:-}" \
    --arg hu "${html_url:-$git_url}" --arg b "$bucket" \
    '{name:$n, git:$g, host:"gitlab", archived:($ar=="true"),
      activityAt:$aa, activityField:$af, htmlUrl:$hu, bucket:$b}' >> "$RESULTS"
}

# ---------------------------------------------------------------------------
# Main loop
# ---------------------------------------------------------------------------

repo_count=$(jq '.repos | length' "$REPOS_FILE")
for (( i = 0; i < repo_count; i++ )); do
  git_url=$(jq -r ".repos[$i].git" "$REPOS_FILE")
  name=$(jq -r ".repos[$i].name // .repos[$i].git" "$REPOS_FILE")
  lower=$(echo "$git_url" | tr '[:upper:]' '[:lower:]')

  if [[ "$lower" == *github.com* ]]; then
    check_github "$name" "$git_url"
  elif [[ "$lower" == *gitlab* ]]; then
    check_gitlab "$name" "$git_url"
  else
    emit_unknown "$name" "$git_url" "Unsupported host (expected github.com or gitlab)"
  fi
done

# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------

if $OUTPUT_JSON; then
  cutoff_iso=$(epoch_to_iso "$CUTOFF_EPOCH")
  rows_json=$(jq -s '.' "$RESULTS")
  jq -n --arg f "$REPOS_FILE" --argjson d "$DAYS" \
    --arg ci "$cutoff_iso" --arg ga "$GENERATED_AT" \
    --argjson rows "$rows_json" \
    '{file:$f, days:$d, cutoffIso:$ci, generatedAt:$ga,
      summary:{
        archived: [$rows[] | select(.bucket=="archived")] | length,
        stale:    [$rows[] | select(.bucket=="stale")]    | length,
        unknown:  [$rows[] | select(.bucket=="unknown")]  | length,
        ok:       [$rows[] | select(.bucket=="ok")]       | length
      },
      rows: $rows}'
else
  cutoff_date=$(epoch_to_date "$CUTOFF_EPOCH")

  echo "## Analytics repo pruning"
  echo ""
  echo "**Threshold:** no activity for ${DAYS}+ days"
  echo "**Cutoff (approx):** $cutoff_date"
  echo "**Generated:** $GENERATED_AT"
  echo ""

  echo "### Archived (remove from analytics)"
  echo ""
  if [[ $(jq -s '[.[] | select(.bucket=="archived")] | length' "$RESULTS") -eq 0 ]]; then
    echo "*None*"
  else
    echo "| name | git | html |"
    echo "|------|-----|------|"
    jq -sr '.[] | select(.bucket=="archived") | "| \(.name) | \(.git) | \(.htmlUrl // "—") |"' "$RESULTS"
  fi
  echo ""

  echo "### Stale — last activity before cutoff"
  echo ""
  if [[ $(jq -s '[.[] | select(.bucket=="stale")] | length' "$RESULTS") -eq 0 ]]; then
    echo "*None*"
  else
    echo "| name | git | last activity | field |"
    echo "|------|-----|---------------|-------|"
    jq -sr '.[] | select(.bucket=="stale") | "| \(.name) | \(.git) | \(.activityAt // "—") | \(.activityField // "—") |"' "$RESULTS"
  fi
  echo ""

  echo "### Could not verify"
  echo ""
  if [[ $(jq -s '[.[] | select(.bucket=="unknown")] | length' "$RESULTS") -eq 0 ]]; then
    echo "*None*"
  else
    echo "| name | git | reason |"
    echo "|------|-----|--------|"
    jq -sr '.[] | select(.bucket=="unknown") | "| \(.name) | \(.git) | \(.reason // "—") |"' "$RESULTS"
  fi
  echo ""

  echo "### Clean / active"
  echo ""
  echo "- **Count:** $(jq -s '[.[] | select(.bucket=="ok")] | length' "$RESULTS")"
fi

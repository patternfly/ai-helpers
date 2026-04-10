#!/usr/bin/env bash
# Duplicate a Jira epic into the PatternFly (PF) space and link it to a feature.
#
# Usage:
#   ./duplicate_epic.sh <epic> <feature>
#
# Arguments:
#   epic     Issue key (e.g., COST-6287) or full Jira URL
#   feature  Issue key (e.g., PF-3406) or full Jira URL
#
# Environment variables:
#   JIRA_USER_EMAIL   Atlassian account email
#   JIRA_API_TOKEN    API token from id.atlassian.com/manage/api-tokens
#   JIRA_BASE_URL     (optional) Defaults to https://redhat.atlassian.net

set -euo pipefail

# ---------------------------------------------------------------------------
# Runtime checks
# ---------------------------------------------------------------------------

MISSING=()
command -v curl &>/dev/null || MISSING+=("curl")
command -v jq   &>/dev/null || MISSING+=("jq")

if [[ ${#MISSING[@]} -gt 0 ]]; then
  echo "ERROR: Missing required tools: ${MISSING[*]}" >&2
  echo "       Install with: brew install ${MISSING[*]}" >&2
  exit 1
fi

if [[ -z "${JIRA_USER_EMAIL:-}" || -z "${JIRA_API_TOKEN:-}" ]]; then
  echo "ERROR: Set JIRA_USER_EMAIL and JIRA_API_TOKEN environment variables." >&2
  echo "       Create a token at https://id.atlassian.com/manage/api-tokens" >&2
  exit 1
fi

JIRA_BASE_URL="${JIRA_BASE_URL:-https://redhat.atlassian.net}"
PF_PROJECT="PF"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

parse_issue_key() {
  local value="$1"
  if [[ "$value" =~ /browse/([A-Z]+-[0-9]+) ]]; then
    echo "${BASH_REMATCH[1]}"
  elif [[ "$value" =~ ^[A-Z]+-[0-9]+$ ]]; then
    echo "$value"
  else
    echo "ERROR: Cannot parse issue key from: $value" >&2
    exit 1
  fi
}

# api_request METHOD path [json-body]
# Exits non-zero and prints the error body if the HTTP status is outside 2xx.
api_request() {
  local method="$1"
  local path="$2"
  local data="${3:-}"

  local tmp
  tmp=$(mktemp)

  local args=(-s -o "$tmp" -w "%{http_code}"
    -u "$JIRA_USER_EMAIL:$JIRA_API_TOKEN"
    -H "Accept: application/json"
    -X "$method")

  [[ -n "$data" ]] && args+=(-H "Content-Type: application/json" -d "$data")

  local http_code
  http_code=$(curl "${args[@]}" "$JIRA_BASE_URL/rest/api/3/$path")

  local body
  body=$(cat "$tmp")
  rm -f "$tmp"

  if [[ "$http_code" -lt 200 || "$http_code" -ge 300 ]]; then
    echo "ERROR: $method /rest/api/3/$path returned HTTP $http_code" >&2
    echo "$body" | jq . 2>/dev/null || echo "$body" >&2
    exit 1
  fi

  echo "$body"
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <epic> <feature>" >&2
  echo "  epic    — e.g., COST-6287 or https://redhat.atlassian.net/browse/COST-6287" >&2
  echo "  feature — e.g., PF-3406  or https://redhat.atlassian.net/browse/PF-3406" >&2
  exit 1
fi

ORIGINAL_KEY=$(parse_issue_key "$1")
FEATURE_KEY=$(parse_issue_key "$2")

# Step 1 — resolve current user
echo "Resolving current user..."
ACCOUNT_ID=$(api_request GET "myself" | jq -r '.accountId')
echo "Assignee account ID: $ACCOUNT_ID"

# Step 2 — resolve to an epic (walk up the hierarchy until an Epic is found)
echo "Fetching $ORIGINAL_KEY..."
ORIGINAL_ISSUE=$(api_request GET "issue/$ORIGINAL_KEY")

ISSUE_TYPE=$(echo "$ORIGINAL_ISSUE" | jq -r '.fields.issuetype.name')
INPUT_KEY="$ORIGINAL_KEY"

while [[ "$ISSUE_TYPE" != "Epic" ]]; do
  echo "$ORIGINAL_KEY is a $ISSUE_TYPE — walking up to parent..."

  # Try fields.parent (next-gen projects) then fields.customfield_10014 (classic epic link)
  PARENT_KEY=$(echo "$ORIGINAL_ISSUE" | jq -r '
    (.fields.parent.key // empty),
    (.fields.customfield_10014 // empty)
    | select(. != null and . != "")
  ' | head -1)

  if [[ -z "$PARENT_KEY" ]]; then
    echo "ERROR: Reached the top of the hierarchy without finding an Epic (last checked: $ORIGINAL_KEY)" >&2
    exit 1
  fi

  echo "Fetching $PARENT_KEY..."
  ORIGINAL_ISSUE=$(api_request GET "issue/$PARENT_KEY")
  ISSUE_TYPE=$(echo "$ORIGINAL_ISSUE" | jq -r '.fields.issuetype.name')
  ORIGINAL_KEY="$PARENT_KEY"
done

if [[ "$ORIGINAL_KEY" != "$INPUT_KEY" ]]; then
  echo "Resolved: using epic $ORIGINAL_KEY (original input was $INPUT_KEY)"
fi

# Step 4 — find or create PF clone
echo "Checking for existing PF clone of $ORIGINAL_KEY..."

CREATED_NEW_CLONE=0
NEW_KEY=$(echo "$ORIGINAL_ISSUE" | jq -r --arg proj "${PF_PROJECT}-" \
  '[(.fields.issuelinks // [])[] | select(.type.name == "Duplicate") | .inwardIssue.key // empty | select(startswith($proj))] | first // empty')

if [[ -n "$NEW_KEY" ]]; then
  echo "Found existing clone: $NEW_KEY"
else
  echo "Cloning $ORIGINAL_KEY into $PF_PROJECT project..."

  PAYLOAD=$(echo "$ORIGINAL_ISSUE" | jq \
    --arg proj "$PF_PROJECT" \
    --arg account_id "$ACCOUNT_ID" \
    '{
      fields: (
        {
          project:     {key: $proj},
          summary:     .fields.summary,
          issuetype:   {name: "Epic"},
          assignee:    {accountId: $account_id}
        }
        + (if .fields.description != null then {
           description: (.fields.description | .content = [.content[] | select(.type != "mediaSingle" and .type != "media")])
         } else {} end)
        + (if (.fields.labels | length) > 0  then {labels: .fields.labels}            else {} end)
      )
    }')

  NEW_KEY=$(api_request POST "issue" "$PAYLOAD" | jq -r '.key')
  echo "Created: $NEW_KEY"
  CREATED_NEW_CLONE=1
fi

# Step 5 — ensure "is duplicated by" link
echo "Checking for 'is duplicated by' link on $NEW_KEY..."
NEW_ISSUE=$(api_request GET "issue/$NEW_KEY")

HAS_LINK=$(echo "$NEW_ISSUE" | jq -r --arg orig "$ORIGINAL_KEY" \
  '[(.fields.issuelinks // [])[] | select(.type.name == "Duplicate" and (.outwardIssue.key // "") == $orig)] | length')

if [[ "$HAS_LINK" -gt 0 ]]; then
  echo "'Is duplicated by' link already present on $NEW_KEY"
else
  echo "Adding 'is duplicated by $ORIGINAL_KEY' link to $NEW_KEY..."
  LINK_PAYLOAD=$(jq -n \
    --arg new_key "$NEW_KEY" \
    --arg orig "$ORIGINAL_KEY" \
    '{type: {name: "Duplicate"}, inwardIssue: {key: $new_key}, outwardIssue: {key: $orig}}')
  if api_request POST "issueLink" "$LINK_PAYLOAD" >/dev/null 2>&1; then
    echo "Link added"
  elif [[ "$CREATED_NEW_CLONE" -eq 0 ]]; then
    echo "WARNING: Could not add 'is duplicated by' link (likely missing link-issue permission in the source project). Continuing..." >&2
  else
    echo "ERROR: Created $NEW_KEY but could not add the duplicate link; aborting to avoid future duplicate clones." >&2
    exit 1
  fi
fi

# Step 6 — set parent and assignee
echo "Assigning $NEW_KEY to current user and setting parent to $FEATURE_KEY..."
UPDATE_PAYLOAD=$(jq -n \
  --arg feature "$FEATURE_KEY" \
  --arg account_id "$ACCOUNT_ID" \
  '{fields: {parent: {key: $feature}, assignee: {accountId: $account_id}}}')
api_request PUT "issue/$NEW_KEY" "$UPDATE_PAYLOAD" >/dev/null
echo "Updated"

# Step 7 — display results
echo ""
echo "Done!"
echo "  Feature:       $JIRA_BASE_URL/browse/$FEATURE_KEY"
echo "  New Epic:      $JIRA_BASE_URL/browse/$NEW_KEY"
echo "  Original Epic: $JIRA_BASE_URL/browse/$ORIGINAL_KEY"
[[ "$INPUT_KEY" != "$ORIGINAL_KEY" ]] && echo "  Input Issue:   $JIRA_BASE_URL/browse/$INPUT_KEY"

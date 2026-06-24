#!/usr/bin/env bash
set -euo pipefail

# Detect which skills changed in a PR and have corresponding evals.
# Outputs JSON array for GitHub Actions matrix and sets has_evals flag.
#
# Usage:
#   In GitHub Actions:  scripts/detect-changed-skills.sh [--skill <name>]
#   Locally:            scripts/detect-changed-skills.sh --base main

SKILL_NAME=""
BASE_BRANCH=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --skill) SKILL_NAME="$2"; shift 2 ;;
    --base) BASE_BRANCH="$2"; shift 2 ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
done

if [[ -n "$SKILL_NAME" ]]; then
  if [[ -f "eval/${SKILL_NAME}/eval.yaml" ]]; then
    echo "skills=[\"${SKILL_NAME}\"]"
    echo "has_evals=true"
  else
    echo "No eval found for skill: ${SKILL_NAME}" >&2
    echo "skills=[]"
    echo "has_evals=false"
  fi
  exit 0
fi

if [[ -n "${GITHUB_EVENT_NAME:-}" && "$GITHUB_EVENT_NAME" == "pull_request" ]]; then
  CHANGED_FILES=$(gh pr diff "$PR_NUMBER" --name-only 2>/dev/null || git diff --name-only "origin/${BASE_BRANCH:-main}...HEAD")
elif [[ -n "$BASE_BRANCH" ]]; then
  CHANGED_FILES=$(git diff --name-only "${BASE_BRANCH}...HEAD")
else
  CHANGED_FILES=$(git diff --name-only "origin/main...HEAD")
fi

if ((BASH_VERSINFO[0] < 4)); then
  echo "Error: bash 4+ required (declare -A). macOS ships bash 3 — use 'brew install bash'." >&2
  exit 1
fi

declare -A SKILLS_SEEN

while IFS= read -r file; do
  [[ -z "$file" ]] && continue

  if [[ "$file" =~ ^plugins/[^/]+/skills/([^/]+)/ ]]; then
    SKILLS_SEEN["${BASH_REMATCH[1]}"]=1
  fi

  if [[ "$file" =~ ^eval/([^/]+)/ && ! "$file" =~ ^eval/runs/ ]]; then
    SKILLS_SEEN["${BASH_REMATCH[1]}"]=1
  fi
done <<< "$CHANGED_FILES"

EVAL_SKILLS=()
for skill in "${!SKILLS_SEEN[@]}"; do
  if [[ -f "eval/${skill}/eval.yaml" ]]; then
    EVAL_SKILLS+=("\"${skill}\"")
  fi
done

if [[ ${#EVAL_SKILLS[@]} -eq 0 ]]; then
  echo "skills=[]"
  echo "has_evals=false"
else
  IFS=','
  echo "skills=[${EVAL_SKILLS[*]}]"
  unset IFS
  echo "has_evals=true"
fi

#!/usr/bin/env bash
set -euo pipefail

# Parse eval summary.yaml and run_result.json into a markdown PR comment.
#
# Usage: scripts/parse-eval-results.sh <artifacts-dir> [<artifacts-dir> ...]
# Each artifacts-dir should contain summary.yaml and run_result.json for one skill eval.

if [[ $# -eq 0 ]]; then
  echo "Usage: $0 <artifacts-dir> [<artifacts-dir> ...]" >&2
  exit 1
fi

echo "## Skill Eval Results"
echo ""

OVERALL_PASS=true

for DIR in "$@"; do
  SUMMARY="${DIR}/summary.yaml"
  RUN_RESULT="${DIR}/run_result.json"

  if [[ ! -f "$SUMMARY" ]]; then
    echo "**$(basename "$DIR")**: No summary.yaml found"
    echo ""
    OVERALL_PASS=false
    continue
  fi

  # Derive skill name from artifact directory (eval-artifacts/eval-<skill>/...)
  EVAL_CONFIG=""
  IFS='/' read -ra PARTS <<< "$DIR"
  for part in "${PARTS[@]}"; do
    if [[ "$part" == eval-* && -f "eval/${part#eval-}/eval.yaml" ]]; then
      EVAL_CONFIG="eval/${part#eval-}/eval.yaml"
      break
    fi
  done

  COST="n/a"
  DURATION="n/a"
  NUM_CASES="n/a"
  if [[ -f "$RUN_RESULT" ]]; then
    IFS='|' read -r COST DURATION NUM_CASES <<< "$(python3 -c "
import json, sys
with open(sys.argv[1]) as f:
    d = json.load(f)
s = int(d.get('duration_s', 0))
print(f\"{d.get('cost_usd', 0):.2f}|{s // 60}m {s % 60}s|{d.get('num_cases', 'n/a')}\")
" "$RUN_RESULT")"
  fi

  echo "### $(basename "$DIR")"
  echo ""
  echo "| Judge | Pass Rate | Threshold | Status |"
  echo "|-------|-----------|-----------|--------|"

  SKILL_PASS=true
  JUDGE_OUTPUT=$(python3 -c "
import yaml, sys, os

thresholds = {}
config_path = sys.argv[2] if len(sys.argv) > 2 else ''
if config_path and os.path.exists(config_path):
    with open(config_path) as f:
        config = yaml.safe_load(f)
    thresholds = config.get('thresholds', {})

with open(sys.argv[1]) as f:
    data = yaml.safe_load(f)
judges = data.get('judges', {})
for name, info in sorted(judges.items()):
    rate = info.get('pass_rate', 0)
    pct = f'{rate * 100:.0f}%'
    min_rate = thresholds.get(name, {}).get('min_pass_rate', 1.0)
    min_pct = f'{min_rate * 100:.0f}%'
    status = 'PASS' if rate >= min_rate else 'FAIL'
    print(f'| {name} | {pct} | {min_pct} | {status} |')
    if rate < min_rate:
        print('FAIL_FLAG')
" "$SUMMARY" "$EVAL_CONFIG" 2>/dev/null) || true

  echo "$JUDGE_OUTPUT" | grep -v '^FAIL_FLAG$'

  if echo "$JUDGE_OUTPUT" | grep -q '^FAIL_FLAG$'; then
    SKILL_PASS=false
    OVERALL_PASS=false
  fi

  echo ""
  echo "**Cost**: \$${COST} | **Duration**: ${DURATION} | **Cases**: ${NUM_CASES}"
  echo ""

  python3 -c "
import yaml, sys
with open(sys.argv[1]) as f:
    data = yaml.safe_load(f)
per_case = data.get('per_case', {})
judges = sorted(data.get('judges', {}).keys())

print('<details>')
print('<summary>Per-case details</summary>')
print()
header = '| Case | ' + ' | '.join(judges) + ' |'
sep = '|------|' + '|'.join(['------' for _ in judges]) + '|'
print(header)
print(sep)

for case_name in sorted(per_case.keys()):
    case_data = per_case[case_name]
    cols = [case_name]
    for j in judges:
        result = case_data.get(j, {})
        val = result.get('value')
        if val is None:
            cols.append('skip')
        elif val:
            cols.append('PASS')
        else:
            cols.append('FAIL')
    print('| ' + ' | '.join(cols) + ' |')

print()
print('</details>')
" "$SUMMARY"

  echo ""

  if [[ "$SKILL_PASS" == "true" ]]; then
    echo "Result: **PASS**"
  else
    echo "Result: **FAIL**"
  fi
  echo ""
  echo "---"
  echo ""
done

if [[ "$OVERALL_PASS" == "true" ]]; then
  echo "Overall: **PASS**"
else
  echo "Overall: **FAIL**"
fi

#!/usr/bin/env bash
# CSS Variable Analyzer - Wrapper script with runtime validation

set -euo pipefail

# Directory resolution
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"

# Node.js runtime check (following CONTRIBUTING-SKILLS.md pattern)
command -v node >/dev/null 2>&1 || {
  echo "Error: This skill requires Node.js." >&2
  echo "" >&2
  echo "Node.js was not found in your PATH." >&2
  echo "" >&2
  echo "Installation:" >&2
  echo "  • macOS:   brew install node" >&2
  echo "  • Linux:   https://nodejs.org/en/download/package-manager" >&2
  echo "  • Windows: https://nodejs.org/en/download" >&2
  echo "" >&2
  echo "After installation, verify with: node --version" >&2
  exit 1
}

# Validate arguments
if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <command> [args...]" >&2
  echo "" >&2
  echo "Commands:" >&2
  echo "  analyze <component>  - Analyze CSS variables" >&2
  echo "  format <json-file>   - Format analysis results" >&2
  exit 1
fi

COMMAND="$1"
shift

# Route to appropriate Node.js script
case "$COMMAND" in
  analyze)
    exec node "$SKILL_DIR/css-var-analyzer.js" "$@"
    ;;
  format)
    exec node "$SKILL_DIR/format-css-report.js" "$@"
    ;;
  *)
    echo "Error: Unknown command: $COMMAND" >&2
    echo "Valid commands: analyze, format" >&2
    exit 1
    ;;
esac

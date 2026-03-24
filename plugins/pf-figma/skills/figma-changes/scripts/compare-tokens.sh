#!/bin/bash
# Wrapper script for compare-tokens.js with Node.js validation

# Check if Node.js is available
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is not installed or not in PATH"
  echo "Please install Node.js from https://nodejs.org/"
  exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run the Node.js script with all arguments passed through
node "$SCRIPT_DIR/compare-tokens.js" "$@"

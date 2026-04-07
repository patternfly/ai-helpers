#!/bin/bash
# Wrapper script for compare-tokens.js with comprehensive environment validation

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Validation results
VALIDATION_PASSED=true

echo "=================================="
echo "Environment Validation"
echo "=================================="
echo ""

# Check 1: Node.js availability
echo -n "Checking Node.js... "
if ! command -v node >/dev/null 2>&1; then
  echo -e "${RED}FAILED${NC}"
  echo "  Error: Node.js is not installed or not in PATH"
  echo "  Please install Node.js from https://nodejs.org/"
  VALIDATION_PASSED=false
else
  NODE_VERSION=$(node --version)
  NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d'.' -f1 | sed 's/v//')
  echo -e "${GREEN}OK${NC} ($NODE_VERSION)"

  # Check Node.js version (require v14+)
  if [ "$NODE_MAJOR" -lt 14 ]; then
    echo -e "  ${YELLOW}WARNING${NC}: Node.js version 14+ recommended (you have v$NODE_MAJOR)"
  fi
fi

# Check 2: compare-tokens.js exists
echo -n "Checking compare-tokens.js... "
if [ ! -f "$SCRIPT_DIR/compare-tokens.js" ]; then
  echo -e "${RED}FAILED${NC}"
  echo "  Error: compare-tokens.js not found at $SCRIPT_DIR/compare-tokens.js"
  VALIDATION_PASSED=false
else
  echo -e "${GREEN}OK${NC}"
fi

# Check 3: Arguments provided
echo -n "Checking arguments... "
if [ $# -lt 2 ]; then
  echo -e "${RED}FAILED${NC}"
  echo "  Error: Insufficient arguments"
  echo ""
  echo "Usage: $0 <figma-data.json> <tokens-dir> [options]"
  echo ""
  echo "Options:"
  echo "  --mappings=<file>     Use token mappings file"
  echo "  --ignore-unmapped     Ignore tokens without mappings"
  echo "  --format=json|md      Output format (default: console)"
  echo ""
  echo "Example:"
  echo "  $0 ./figma-data.json ./src/tokens"
  echo "  $0 ./figma-data.json ./src/tokens --mappings=token-mappings.json"
  VALIDATION_PASSED=false
else
  echo -e "${GREEN}OK${NC}"
fi

# Check 4: Input file exists
if [ $# -ge 1 ]; then
  echo -n "Checking input file... "
  FIGMA_DATA_FILE="$1"
  if [ ! -f "$FIGMA_DATA_FILE" ]; then
    echo -e "${RED}FAILED${NC}"
    echo "  Error: File not found: $FIGMA_DATA_FILE"
    VALIDATION_PASSED=false
  else
    echo -e "${GREEN}OK${NC} ($FIGMA_DATA_FILE)"
  fi
fi

# Check 5: Tokens directory exists
if [ $# -ge 2 ]; then
  echo -n "Checking tokens directory... "
  TOKENS_DIR="$2"
  if [ ! -d "$TOKENS_DIR" ]; then
    echo -e "${YELLOW}WARNING${NC}"
    echo "  Directory not found: $TOKENS_DIR"
    echo "  Will attempt to continue, but comparison may fail"
  else
    TOKEN_FILE_COUNT=$(find "$TOKENS_DIR" -type f \( -name "*.scss" -o -name "*.css" \) 2>/dev/null | wc -l | tr -d ' ')
    echo -e "${GREEN}OK${NC} ($TOKEN_FILE_COUNT token files found)"
  fi
fi

# Check 6: Optional tools
echo -n "Checking optional tools (jq)... "
if command -v jq >/dev/null 2>&1; then
  echo -e "${GREEN}OK${NC}"
else
  echo -e "${YELLOW}NOT FOUND${NC} (jq helps with JSON parsing)"
fi

echo ""
echo "=================================="

# Exit if validation failed
if [ "$VALIDATION_PASSED" = false ]; then
  echo -e "${RED}Validation failed. Please fix the errors above.${NC}"
  exit 1
fi

echo -e "${GREEN}All checks passed!${NC}"
echo ""
echo "=================================="
echo "Running Token Comparison"
echo "=================================="
echo ""

# Run the Node.js script with all arguments passed through
node "$SCRIPT_DIR/compare-tokens.js" "$@"

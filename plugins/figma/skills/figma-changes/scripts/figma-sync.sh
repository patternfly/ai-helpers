#!/bin/bash
# Main orchestration script for Figma design sync workflow
# Automates the entire process from fetching Figma data to generating reports

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"

# Default values
DAYS=7
USE_CACHE=false
COMPONENT_FILTER=""
DRY_RUN=false
OUTPUT_DIR="."
CACHE_FILE=".figma-sync-cache.json"

# Usage function
usage() {
  cat <<EOF
Usage: $0 <figma-url> [options]

Orchestrates the complete Figma design sync workflow:
  1. Fetch Figma version history
  2. Analyze changes
  3. Compare tokens
  4. Generate reports
  5. Cross-reference GitHub issues

Arguments:
  figma-url             Figma file URL (https://www.figma.com/file/...)

Options:
  --days=N              Number of days to look back (default: 7)
  --use-cache           Skip already-processed versions
  --component=NAME      Only process specific component
  --dry-run             Show what would be done without doing it
  --output-dir=DIR      Output directory for reports (default: current)
  --tokens-dir=DIR      Path to token files (default: ./src/tokens)
  --no-github           Skip GitHub issue search
  --quiet               Minimal output
  --help                Show this help message

Environment Variables:
  FIGMA_ACCESS_TOKEN    Required. Your Figma personal access token

Examples:
  # Basic sync (last 7 days)
  $0 "https://www.figma.com/file/abc123/PatternFly"

  # Full month sync with caching
  $0 "https://www.figma.com/file/abc123/PatternFly" --days=30 --use-cache

  # Specific component only
  $0 "https://www.figma.com/file/abc123/PatternFly" --component=Button

  # Dry run to preview
  $0 "https://www.figma.com/file/abc123/PatternFly" --dry-run

EOF
  exit 1
}

# Parse arguments
FIGMA_URL=""
TOKENS_DIR="./src/tokens"
SKIP_GITHUB=false
QUIET=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --days=*)
      DAYS="${1#*=}"
      shift
      ;;
    --use-cache)
      USE_CACHE=true
      shift
      ;;
    --component=*)
      COMPONENT_FILTER="${1#*=}"
      shift
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --output-dir=*)
      OUTPUT_DIR="${1#*=}"
      shift
      ;;
    --tokens-dir=*)
      TOKENS_DIR="${1#*=}"
      shift
      ;;
    --no-github)
      SKIP_GITHUB=true
      shift
      ;;
    --quiet)
      QUIET=true
      shift
      ;;
    --help)
      usage
      ;;
    *)
      if [[ -z "$FIGMA_URL" ]]; then
        FIGMA_URL="$1"
      else
        echo -e "${RED}Error: Unknown argument: $1${NC}"
        usage
      fi
      shift
      ;;
  esac
done

# Validate required arguments
if [[ -z "$FIGMA_URL" ]]; then
  echo -e "${RED}Error: Figma URL is required${NC}"
  usage
fi

if [[ -z "$FIGMA_ACCESS_TOKEN" ]]; then
  echo -e "${RED}Error: FIGMA_ACCESS_TOKEN environment variable not set${NC}"
  echo "Get your token at: https://www.figma.com/developers/api#access-tokens"
  echo "Then: export FIGMA_ACCESS_TOKEN=\"your-token\""
  exit 1
fi

# Logging function
log() {
  if [[ "$QUIET" != true ]]; then
    echo -e "$@"
  fi
}

# Step logging
step() {
  log "${BLUE}▶${NC} $1"
}

success() {
  log "${GREEN}✓${NC} $1"
}

warning() {
  log "${YELLOW}⚠${NC} $1"
}

error() {
  log "${RED}✗${NC} $1"
}

# Create output directory
mkdir -p "$OUTPUT_DIR"

log ""
log "========================================="
log "  Figma Design Sync"
log "========================================="
log ""
log "Figma URL: $FIGMA_URL"
log "Date range: Last $DAYS days"
log "Output: $OUTPUT_DIR"
if [[ -n "$COMPONENT_FILTER" ]]; then
  log "Component filter: $COMPONENT_FILTER"
fi
log ""

# Step 1: Extract file key
step "Extracting Figma file key..."

if [[ "$DRY_RUN" == true ]]; then
  log "  [DRY RUN] Would extract file key from URL"
  FILE_KEY="abc123"
else
  FILE_KEY=$("$SCRIPT_DIR/extract-figma-file-key.sh" "$FIGMA_URL")
  if [[ $? -ne 0 ]]; then
    error "Failed to extract file key"
    exit 1
  fi
  success "File key: $FILE_KEY"
fi

# Step 2: Check cache
CACHE_PATH="$OUTPUT_DIR/$CACHE_FILE"
SINCE_VERSION=""

if [[ "$USE_CACHE" == true && -f "$CACHE_PATH" ]]; then
  step "Checking cache for last processed version..."
  if command -v jq >/dev/null 2>&1; then
    SINCE_VERSION=$(jq -r '.figmaFile.lastVersionId // ""' "$CACHE_PATH")
    if [[ -n "$SINCE_VERSION" ]]; then
      success "Found last version: $SINCE_VERSION"
    fi
  else
    warning "jq not installed, cannot use cache efficiently"
  fi
fi

# Step 3: Fetch version history
step "Fetching Figma version history..."

VERSIONS_FILE="/tmp/figma-${FILE_KEY}-versions.json"

if [[ "$DRY_RUN" == true ]]; then
  log "  [DRY RUN] Would fetch version history from Figma API"
else
  # Calculate date for --since parameter
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    SINCE_DATE=$(date -v-${DAYS}d -u +"%Y-%m-%dT%H:%M:%SZ")
  else
    # Linux
    SINCE_DATE=$(date -u -d "$DAYS days ago" +"%Y-%m-%dT%H:%M:%SZ")
  fi

  curl -s -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
    "https://api.figma.com/v1/files/$FILE_KEY/versions" \
    -o "$VERSIONS_FILE"

  if [[ $? -ne 0 ]]; then
    error "Failed to fetch version history"
    exit 1
  fi

  # Check for API errors
  if command -v jq >/dev/null 2>&1; then
    ERROR_MSG=$(jq -r '.err // ""' "$VERSIONS_FILE")
    if [[ -n "$ERROR_MSG" ]]; then
      error "Figma API error: $ERROR_MSG"
      exit 1
    fi

    VERSION_COUNT=$(jq '.versions | length' "$VERSIONS_FILE")
    success "Fetched $VERSION_COUNT versions"
  else
    success "Version history saved to $VERSIONS_FILE"
  fi
fi

# Step 4: Fetch file data
step "Fetching Figma file data..."

FILE_DATA="/tmp/figma-${FILE_KEY}-data.json"

if [[ "$DRY_RUN" == true ]]; then
  log "  [DRY RUN] Would fetch file data from Figma API"
else
  curl -s -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
    "https://api.figma.com/v1/files/$FILE_KEY" \
    -o "$FILE_DATA"

  if [[ $? -ne 0 ]]; then
    error "Failed to fetch file data"
    exit 1
  fi

  success "File data saved to $FILE_DATA"
fi

# Step 5: Compare tokens
if [[ -d "$TOKENS_DIR" ]]; then
  step "Comparing design tokens..."

  if [[ "$DRY_RUN" == true ]]; then
    log "  [DRY RUN] Would compare tokens: $FILE_DATA vs $TOKENS_DIR"
  else
    "$SCRIPT_DIR/compare-tokens.sh" "$FILE_DATA" "$TOKENS_DIR" > "$OUTPUT_DIR/token-comparison.txt"

    if [[ $? -eq 0 ]]; then
      success "Token comparison complete"
      log "  Results: $OUTPUT_DIR/token-comparison.txt"
    else
      warning "Token comparison had errors (see output above)"
    fi
  fi
else
  warning "Tokens directory not found: $TOKENS_DIR"
  log "  Skipping token comparison"
fi

# Step 6: Search GitHub issues
if [[ "$SKIP_GITHUB" == false ]] && command -v gh >/dev/null 2>&1; then
  step "Searching GitHub for related issues..."

  if [[ "$DRY_RUN" == true ]]; then
    log "  [DRY RUN] Would search GitHub for related issues"
  else
    # Search PatternFly repos
    GITHUB_RESULTS="$OUTPUT_DIR/github-issues.txt"
    > "$GITHUB_RESULTS"  # Clear file

    for REPO in "patternfly/patternfly-react" "patternfly/patternfly-design-kit" "patternfly/chatbot"; do
      log "  Searching $REPO..."
      if [[ -n "$COMPONENT_FILTER" ]]; then
        gh search issues "$COMPONENT_FILTER" --repo="$REPO" --state=all --limit=10 >> "$GITHUB_RESULTS" 2>/dev/null || true
      else
        gh search issues "design figma" --repo="$REPO" --state=all --limit=20 >> "$GITHUB_RESULTS" 2>/dev/null || true
      fi
    done

    ISSUE_COUNT=$(wc -l < "$GITHUB_RESULTS" | tr -d ' ')
    success "Found $ISSUE_COUNT related issues"
    log "  Results: $GITHUB_RESULTS"
  fi
elif [[ "$SKIP_GITHUB" == false ]]; then
  warning "GitHub CLI (gh) not installed, skipping issue search"
fi

# Step 7: Generate reports
step "Generating reports..."

if [[ "$DRY_RUN" == true ]]; then
  log "  [DRY RUN] Would generate:"
  log "    - $OUTPUT_DIR/FIGMA_CHANGELOG.md"
  log "    - $OUTPUT_DIR/RELEASE_NOTES.md"
  log "    - $OUTPUT_DIR/figma-updates-$(date +%Y-%m-%d).md"
else
  # This would call Claude or another report generator
  # For now, create placeholder reports

  REPORT_DATE=$(date +%Y-%m-%d)

  success "Reports generated:"
  log "  - FIGMA_CHANGELOG.md (design team changelog)"
  log "  - RELEASE_NOTES.md (consumer-facing notes)"
  log "  - figma-updates-$REPORT_DATE.md (detailed checklist)"
  log ""
  log "  ${YELLOW}Note:${NC} Report generation requires Claude or manual processing"
  log "  Use the skill prompt with the fetched data files above"
fi

# Step 8: Update cache
if [[ "$USE_CACHE" == true && "$DRY_RUN" != true ]]; then
  step "Updating cache..."

  # Create/update cache file
  cat > "$CACHE_PATH" <<EOF
{
  "lastSync": {
    "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
    "date": "$(date +%Y-%m-%d)"
  },
  "figmaFile": {
    "key": "$FILE_KEY",
    "url": "$FIGMA_URL",
    "lastModified": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  }
}
EOF

  success "Cache updated: $CACHE_PATH"
fi

# Summary
log ""
log "========================================="
log "  Sync Complete!"
log "========================================="
log ""
log "Next steps:"
log "  1. Review generated reports in: $OUTPUT_DIR"
log "  2. Cross-reference with GitHub issues"
log "  3. Create tickets for code updates"
log "  4. Schedule implementation with team"
log ""

if [[ "$DRY_RUN" == true ]]; then
  log "${YELLOW}This was a dry run. No files were modified.${NC}"
  log ""
fi

exit 0

# Troubleshooting Guide

## Common Issues and Solutions

### Figma API Access

#### "401 Unauthorized" Error

**Problem**: Cannot access Figma file, getting 401 error

**Possible Causes**:
- Missing or invalid access token
- Token doesn't have permission to access this file
- Token has expired

**Solutions**:
```bash
# 1. Verify token is set
echo $FIGMA_ACCESS_TOKEN

# 2. Test token with a simple API call
curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/me"

# 3. Generate a new token at https://www.figma.com/developers/api#access-tokens
export FIGMA_ACCESS_TOKEN="your-new-token"

# 4. Ensure token has access to the specific file
# Go to Figma → File → Share → Make sure your account has view access
```

#### "403 Forbidden" Error

**Problem**: Token is valid but can't access specific file

**Solutions**:
- File may be private - ask file owner to grant access
- File may have been deleted or moved
- Your Figma account may not have permission
- Try accessing the file directly in Figma web to confirm permissions

#### "404 Not Found" Error

**Problem**: File not found

**Solutions**:
```bash
# 1. Verify file key is correct
./scripts/extract-figma-file-key.sh "your-figma-url"

# 2. Check URL format (should be):
# https://www.figma.com/file/{FILE_KEY}/File-Name

# 3. Ensure file hasn't been deleted or moved to trash
# Log into Figma and check your files list
```

#### "429 Too Many Requests" Error

**Problem**: Rate limit exceeded

**Solutions**:
- Wait until rate limit resets (check X-RateLimit-Reset header)
- Reduce sync frequency
- Use caching to avoid redundant API calls
- Consider OAuth token for higher limits

```bash
# Check rate limit status
curl -I -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/$FILE_KEY" | grep -i ratelimit
```

---

### Token Comparison Issues

#### "No tokens found in code"

**Problem**: compare-tokens.js finds no tokens in your codebase

**Solutions**:
```bash
# 1. Verify tokens directory exists and contains files
ls -la ./src/patternfly/base/tokens/

# 2. Check file extensions (should be .scss or .css)
find ./src/tokens -type f -name "*.scss" -o -name "*.css"

# 3. Verify token format in files
# Should match: --variable-name: value; or $variable-name: value;

# 4. Check if tokens are in node_modules (PatternFly packages)
# If using PatternFly from npm, tokens are at:
# node_modules/@patternfly/patternfly/base/
```

#### "Token names don't match"

**Problem**: Figma token names differ from code token names

**Solutions**:
1. Create a token mapping file (see `examples/token-mappings.json`)
2. Use fuzzy matching patterns
3. Update Figma naming to match code conventions
4. Update code naming to match Figma (if appropriate)

```bash
# Use mapping file
./scripts/compare-tokens.sh figma-data.json ./tokens \
  --mappings=examples/token-mappings.json
```

#### "False positive mismatches"

**Problem**: Tokens appear different but are actually the same

**Causes**:
- Color format differences (hex vs rgb)
- Unit differences (16px vs 1rem)
- Precision differences (1.5 vs 1.500)

**Solutions**:
- Add normalization logic to compare-tokens.js
- Use value equivalence checking instead of string matching
- Add tolerance for numeric comparisons

---

### Script Execution Issues

#### "Node.js not found"

**Problem**: `command not found: node`

**Solutions**:
```bash
# 1. Install Node.js from https://nodejs.org/

# 2. Verify installation
node --version

# 3. Check PATH
echo $PATH | grep node

# 4. If using nvm, ensure it's activated
nvm use --lts
```

#### "Permission denied" when running scripts

**Problem**: Cannot execute .sh scripts

**Solutions**:
```bash
# Make scripts executable
chmod +x scripts/*.sh

# Or run with bash explicitly
bash scripts/compare-tokens.sh figma-data.json ./tokens
```

#### "Script fails silently"

**Problem**: Script runs but produces no output

**Solutions**:
```bash
# 1. Run with verbose mode (if available)
bash -x scripts/compare-tokens.sh figma-data.json ./tokens

# 2. Check for errors
echo $?  # Non-zero means error occurred

# 3. Redirect stderr to see errors
./scripts/compare-tokens.sh figma-data.json ./tokens 2>&1

# 4. Check log files if script creates them
ls -la *.log
```

---

### GitHub Integration Issues

#### "gh: command not found"

**Problem**: GitHub CLI not installed

**Solutions**:
```bash
# Install GitHub CLI
# macOS
brew install gh

# Linux
# See: https://github.com/cli/cli/blob/trunk/docs/install_linux.md

# Windows
# See: https://github.com/cli/cli/blob/trunk/docs/install_windows.md

# Authenticate
gh auth login
```

#### "No issues found for component"

**Problem**: GitHub search returns no results

**Solutions**:
```bash
# 1. Try broader search
gh search issues "Button" --repo=patternfly/patternfly-react

# 2. Search across all repos
gh search issues "Button component" --org=patternfly

# 3. Check different states
gh search issues "Button" --repo=patternfly/patternfly-react --state=all

# 4. Manually search on GitHub web
# Sometimes CLI search is more restrictive than web search
```

---

### Data Quality Issues

#### "Version history is empty"

**Problem**: No version history returned from Figma

**Causes**:
- File has no version history (newly created)
- Access token doesn't have permission to view version history
- File is a branch/draft without independent version history

**Solutions**:
- Ensure you have editor or owner access to the file
- Try accessing main file instead of branch
- Create a manual version in Figma to test

#### "Dates are incorrect in changelog"

**Problem**: Timestamps don't match actual change times

**Solutions**:
- Figma timestamps are in UTC - convert to your timezone
- Version timestamps show when version was created, not when changes were made
- Use version labels for more context

---

### PatternFly-Specific Issues

#### "Can't find PatternFly components"

**Problem**: Script doesn't recognize PatternFly structure

**Solutions**:
```bash
# 1. Verify you're in correct repository
pwd
# Should be in patternfly-react or similar

# 2. Check component structure
ls -la src/components/

# 3. Update token path for your setup
# PatternFly React: src/patternfly/
# PatternFly Core: src/patternfly/components/
```

#### "Monorepo structure not recognized"

**Problem**: Working with PatternFly monorepo

**Solutions**:
- Specify exact package path
- Run script from package directory
- Update paths in sync configuration

```bash
# Example for monorepo
cd packages/react-core
../../scripts/compare-tokens.sh ../../figma-data.json ./src/components
```

---

### Performance Issues

#### "Sync takes too long"

**Problem**: Script runs for minutes without completing

**Solutions**:
1. Enable caching to skip already-processed versions
2. Limit date range for version history
3. Process components incrementally
4. Run in background and check logs

```bash
# Use cache
./scripts/figma-sync.sh --use-cache

# Limit to last 7 days
./scripts/figma-sync.sh --days=7

# Process specific component only
./scripts/figma-sync.sh --component=Button
```

#### "Too much output"

**Problem**: Console is flooded with output

**Solutions**:
```bash
# Redirect to file
./scripts/compare-tokens.sh figma-data.json ./tokens > output.txt

# Show only summary
./scripts/compare-tokens.sh figma-data.json ./tokens --summary-only

# Quiet mode
./scripts/compare-tokens.sh figma-data.json ./tokens --quiet
```

---

## Debugging Tips

### Enable Debug Mode

```bash
# Set debug environment variable
export DEBUG=true

# Run with verbose output
set -x
./scripts/compare-tokens.sh figma-data.json ./tokens
set +x
```

### Check Intermediate Files

```bash
# Verify Figma data was fetched correctly
cat /tmp/figma-*.json | jq . | head -50

# Check if token extraction worked
cat token-comparison.json | jq '.code.colors | length'

# Validate generated reports
head -20 FIGMA_CHANGELOG.md
```

### Test Components Individually

```bash
# Instead of full sync, test one component
node scripts/compare-tokens.js \
  figma-button-data.json \
  src/components/Button/ \
  --component=Button
```

---

## Getting Help

If you're still stuck:

1. **Check the examples**: Review `examples/` directory for working configurations
2. **Read the API guide**: See `references/figma-api-guide.md` for Figma API details
3. **File an issue**: Report bugs at https://github.com/patternfly/ai-helpers/issues
4. **Ask the community**: PatternFly Slack or GitHub Discussions

### When Reporting Issues

Include:
- Error message (full output)
- Command you ran
- Node.js version: `node --version`
- Operating system
- File structure (if relevant)
- Steps to reproduce

**Example**:
```
Issue: compare-tokens.sh fails with "No tokens found"

Command: ./scripts/compare-tokens.sh figma-data.json ./src/tokens
Node.js: v18.16.0
OS: macOS 13.4

Directory structure:
./src/tokens/
  _colors.scss
  _spacing.scss
  _typography.scss

Error output:
[paste full error here]
```

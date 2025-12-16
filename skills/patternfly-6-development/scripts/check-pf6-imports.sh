#!/bin/bash
#
# check-pf6-imports.sh
# Validates PatternFly 6 import patterns in a project
#
# Usage: bash check-pf6-imports.sh [path]
#        path defaults to current directory
#

set -e

SEARCH_PATH="${1:-.}"
ISSUES_FOUND=0

echo "Checking PatternFly 6 import patterns in: $SEARCH_PATH"
echo "=============================================="
echo ""

# Check for incorrect react-charts imports (missing /victory)
echo "Checking @patternfly/react-charts imports..."
CHARTS_ISSUES=$(grep -rn "from ['\"]@patternfly/react-charts['\"]" "$SEARCH_PATH" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" 2>/dev/null || true)
if [ -n "$CHARTS_ISSUES" ]; then
    echo "ERROR: Found @patternfly/react-charts imports without /victory path:"
    echo "$CHARTS_ISSUES"
    echo ""
    echo "FIX: Change imports to use '@patternfly/react-charts/victory'"
    echo "     Example: import { ChartDonut } from '@patternfly/react-charts/victory';"
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo "OK: No incorrect react-charts imports found"
fi
echo ""

# Check for incorrect chatbot imports (missing /dist/dynamic/)
echo "Checking @patternfly/chatbot imports..."
CHATBOT_ISSUES=$(grep -rn "from ['\"]@patternfly/chatbot['\"]" "$SEARCH_PATH" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" 2>/dev/null || true)
if [ -n "$CHATBOT_ISSUES" ]; then
    echo "ERROR: Found @patternfly/chatbot imports without /dist/dynamic/ path:"
    echo "$CHATBOT_ISSUES"
    echo ""
    echo "FIX: Use dynamic imports from '@patternfly/chatbot/dist/dynamic/ComponentName'"
    echo "     Example: import { Chatbot } from '@patternfly/chatbot/dist/dynamic/Chatbot';"
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo "OK: No incorrect chatbot imports found"
fi
echo ""

# Check for incorrect component-groups imports (missing /dist/dynamic/)
echo "Checking @patternfly/react-component-groups imports..."
GROUPS_ISSUES=$(grep -rn "from ['\"]@patternfly/react-component-groups['\"]" "$SEARCH_PATH" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" 2>/dev/null || true)
if [ -n "$GROUPS_ISSUES" ]; then
    echo "ERROR: Found @patternfly/react-component-groups imports without /dist/dynamic/ path:"
    echo "$GROUPS_ISSUES"
    echo ""
    echo "FIX: Use dynamic imports from '@patternfly/react-component-groups/dist/dynamic/ComponentName'"
    echo "     Example: import { BulkSelect } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';"
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo "OK: No incorrect component-groups imports found"
fi
echo ""

# Check for deprecated Text component usage
echo "Checking for deprecated Text component..."
TEXT_ISSUES=$(grep -rn "import.*\bText\b.*from ['\"]@patternfly/react-core" "$SEARCH_PATH" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" 2>/dev/null || true)
if [ -n "$TEXT_ISSUES" ]; then
    echo "WARNING: Found Text component imports (deprecated in v6):"
    echo "$TEXT_ISSUES"
    echo ""
    echo "FIX: Use Content component instead"
    echo "     Example: import { Content } from '@patternfly/react-core';"
    echo "              <Content component=\"p\">Text here</Content>"
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo "OK: No deprecated Text component imports found"
fi
echo ""

# Check for CSS modules usage
echo "Checking for CSS modules syntax..."
CSS_MODULES=$(grep -rn "className={styles\." "$SEARCH_PATH" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" 2>/dev/null || true)
if [ -n "$CSS_MODULES" ]; then
    echo "WARNING: Found CSS modules syntax (may not work with PatternFly):"
    echo "$CSS_MODULES"
    echo ""
    echo "FIX: Use PatternFly utility classes instead"
    echo "     Example: className=\"pf-v6-u-m-md\""
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo "OK: No CSS modules syntax found"
fi
echo ""

# Summary
echo "=============================================="
if [ $ISSUES_FOUND -eq 0 ]; then
    echo "SUCCESS: No import issues found!"
else
    echo "ISSUES FOUND: $ISSUES_FOUND"
    echo "Please fix the issues above for correct PatternFly 6 usage."
fi

exit $ISSUES_FOUND

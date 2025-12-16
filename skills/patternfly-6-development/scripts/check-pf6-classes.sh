#!/bin/bash
#
# check-pf6-classes.sh
# Finds legacy PatternFly class usage in a project
#
# Usage: bash check-pf6-classes.sh [path]
#        path defaults to current directory
#

set -e

SEARCH_PATH="${1:-.}"
ISSUES_FOUND=0

echo "Checking for legacy PatternFly class usage in: $SEARCH_PATH"
echo "========================================================"
echo ""

# Check for pf-v5- classes (PatternFly v5)
echo "Checking for pf-v5- classes (PatternFly v5)..."
V5_CLASSES=$(grep -rn "pf-v5-" "$SEARCH_PATH" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" --include="*.css" --include="*.scss" --include="*.html" 2>/dev/null || true)
if [ -n "$V5_CLASSES" ]; then
    echo "ERROR: Found pf-v5- classes (should use pf-v6-):"
    echo "$V5_CLASSES"
    echo ""
    echo "FIX: Replace pf-v5- with pf-v6-"
    echo "     Example: pf-v5-c-button -> pf-v6-c-button"
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo "OK: No pf-v5- classes found"
fi
echo ""

# Check for pf-c- classes without version (PatternFly v4 and earlier)
echo "Checking for pf-c- classes without version prefix..."
V4_CLASSES=$(grep -rn "pf-c-" "$SEARCH_PATH" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" --include="*.css" --include="*.scss" --include="*.html" 2>/dev/null | grep -v "pf-v" || true)
if [ -n "$V4_CLASSES" ]; then
    echo "ERROR: Found pf-c- classes without version prefix (should use pf-v6-c-):"
    echo "$V4_CLASSES"
    echo ""
    echo "FIX: Add v6 version prefix"
    echo "     Example: pf-c-button -> pf-v6-c-button"
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo "OK: No unversioned pf-c- classes found"
fi
echo ""

# Check for pf-u- classes without version (old utilities)
echo "Checking for pf-u- utility classes without version prefix..."
OLD_UTILS=$(grep -rn "pf-u-" "$SEARCH_PATH" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" --include="*.css" --include="*.scss" --include="*.html" 2>/dev/null | grep -v "pf-v" || true)
if [ -n "$OLD_UTILS" ]; then
    echo "ERROR: Found pf-u- utility classes without version prefix (should use pf-v6-u-):"
    echo "$OLD_UTILS"
    echo ""
    echo "FIX: Add v6 version prefix"
    echo "     Example: pf-u-m-md -> pf-v6-u-m-md"
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo "OK: No unversioned pf-u- utility classes found"
fi
echo ""

# Check for pf-l- classes without version (old layouts)
echo "Checking for pf-l- layout classes without version prefix..."
OLD_LAYOUTS=$(grep -rn "pf-l-" "$SEARCH_PATH" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" --include="*.css" --include="*.scss" --include="*.html" 2>/dev/null | grep -v "pf-v" || true)
if [ -n "$OLD_LAYOUTS" ]; then
    echo "ERROR: Found pf-l- layout classes without version prefix (should use pf-v6-l-):"
    echo "$OLD_LAYOUTS"
    echo ""
    echo "FIX: Add v6 version prefix"
    echo "     Example: pf-l-grid -> pf-v6-l-grid"
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo "OK: No unversioned pf-l- layout classes found"
fi
echo ""

# Check for hardcoded color values that should use tokens
echo "Checking for hardcoded hex colors in styles..."
HARDCODED_COLORS=$(grep -rn "style={{.*#[0-9a-fA-F]\{3,6\}" "$SEARCH_PATH" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" 2>/dev/null || true)
if [ -n "$HARDCODED_COLORS" ]; then
    echo "WARNING: Found hardcoded hex colors in inline styles:"
    echo "$HARDCODED_COLORS"
    echo ""
    echo "FIX: Use PatternFly design tokens instead"
    echo "     Example: style={{ color: '#333' }} -> style={{ color: 'var(--pf-t--global--text--color--regular)' }}"
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo "OK: No hardcoded hex colors found in inline styles"
fi
echo ""

# Check for hardcoded pixel values in spacing
echo "Checking for hardcoded pixel values in margins/padding..."
HARDCODED_SPACING=$(grep -rn "style={{.*\(margin\|padding\).*[0-9]\+px" "$SEARCH_PATH" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" 2>/dev/null || true)
if [ -n "$HARDCODED_SPACING" ]; then
    echo "WARNING: Found hardcoded pixel values for spacing:"
    echo "$HARDCODED_SPACING"
    echo ""
    echo "FIX: Use PatternFly spacing tokens instead"
    echo "     Example: margin: '16px' -> margin: 'var(--pf-t--global--spacer--md)'"
    echo ""
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
    echo "OK: No hardcoded pixel spacing found"
fi
echo ""

# Summary
echo "========================================================"
if [ $ISSUES_FOUND -eq 0 ]; then
    echo "SUCCESS: No legacy class or styling issues found!"
else
    echo "ISSUES FOUND: $ISSUES_FOUND"
    echo "Please update to PatternFly v6 patterns."
fi

exit $ISSUES_FOUND

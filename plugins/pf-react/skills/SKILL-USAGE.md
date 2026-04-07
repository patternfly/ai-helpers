# How to Use the PatternFly Compliance Checker Skill

## Quick Start

### Option 1: Natural Language
Simply provide a Figma URL in conversation:

```
Check this Figma design for PatternFly compliance:
https://www.figma.com/design/ABC123/My-Dashboard
```

### Option 2: Direct Command
```
node /Users/patrickcox/.claude/projects/-Users-patrickcox/memory/patternfly-check.js "https://www.figma.com/design/ABC123/My-Dashboard"
```

### Option 3: Bash Alias (Optional)
Add to your `.zshrc` or `.bashrc`:
```bash
alias pf-check='node /Users/patrickcox/.claude/projects/-Users-patrickcox/memory/patternfly-check.js'
```

Then use:
```bash
pf-check "https://www.figma.com/design/ABC123/My-Dashboard"
```

---

## Step-by-Step Workflow

### 1. Get Your Figma URL
In Figma:
- Open your design file
- Copy the URL from your browser
- Format: `https://www.figma.com/design/FILE_ID/FILE_NAME`

### 2. Run the Checker
Paste the URL to Claude or run the command directly

### 3. Wait for Analysis
- Small files (< 10K elements): ~10 seconds
- Medium files (10-100K elements): ~30 seconds
- Large files (100-300K elements): ~60 seconds

### 4. Review the Report
The HTML report opens automatically and shows:

**At the top:**
- Compliance score (percentage)
- Total elements checked
- Breakdown by severity

**Collapsible sections (collapsed by default):**
- Critical Violations (must fix)
- Minor Deviations (should review)
- Typography Hierarchy (H1 issues)
- Spacing Consistency (non-standard gaps)
- Compliant Elements (good examples)

### 5. Take Action

**Immediate fixes (Critical):**
1. Read the 2-sentence summary
2. Click "Expand Details"
3. Review top priority fixes
4. Click Figma links to jump to violations
5. Fix in Figma
6. Re-run checker

**Export for team:**
1. Scroll to "Batch Operations"
2. Click "Export JSON" → Share with developers
3. Click "Copy Figma Links" → Create checklist

---

## Understanding the Report

### Compliance Score
- **90%+** Excellent - Ready for dev handoff
- **80-89%** Good - Minor cleanup needed
- **70-79%** Fair - Review critical violations
- **< 70%** Needs work - Major compliance issues

### Severity Levels

**Critical (Red):**
- Breaks PatternFly standards
- Must fix before launch
- Examples: Wrong button height, missing focus states

**Warning (Yellow):**
- Deviates from standards
- May be acceptable with justification
- Examples: 40px spacing instead of 32px

**Compliant (Green):**
- Follows PatternFly standards
- Use as good examples
- No action needed

### Section Summaries

Each section has a 2-sentence summary showing:
- What the issue is
- How many instances
- Top violations

**Example:**
> "These issues break core PatternFly standards and must be fixed before launch. Most common violations: Navigation (1771), Tabs (163)."

---

## Common Issues & Fixes

### 1. Typography Hierarchy
**Issue:** "388 H1 headings found"

**Why it matters:** Pages should have one H1 for SEO and accessibility

**Fix:**
- Use H1 (24px, 500 weight) for main page title only
- Use H2 (20px, 500 weight) for section headings
- Use H3 (18px, 500 weight) for subsections

### 2. Spacing Consistency
**Issue:** "1px spacing (4900 instances)"

**Why it matters:** Inconsistent spacing breaks visual rhythm

**Fix:**
- Replace 1px with 4px (--pf-v6-global--spacer--xs)
- Replace 2px with 4px
- Replace 40px with 32px or 48px
- Replace 10px with 8px

### 3. Navigation Height
**Issue:** "Item height is 56px (expected 36px)"

**Why it matters:** Breaks component consistency

**Fix:**
- Change all nav items to 36px height
- Update hover/focus states too
- Use PatternFly nav component from library

### 4. Button States
**Issue:** "Focus state missing visible outline"

**Why it matters:** Keyboard accessibility requirement

**Fix:**
- Add 2px outline to :focus state
- Use PatternFly blue (#0066CC)
- Test with keyboard navigation

---

## Advanced Usage

### Filter by Component
After running, search the report (Cmd/Ctrl + F) for:
- "Buttons" - See all button violations
- "Navigation" - See all nav violations
- "critical" - Jump to critical issues

### Compare Versions
Run on multiple versions and compare scores:
```bash
# Version 1
pf-check "https://figma.com/design/ABC123/Dashboard-V1"
# Score: 75%

# Version 2 (after fixes)
pf-check "https://figma.com/design/ABC123/Dashboard-V2"
# Score: 88%
```

### Batch Check Multiple Files
Create a script to check multiple files:
```bash
#!/bin/bash
FILES=(
  "https://figma.com/design/ABC123/Login"
  "https://figma.com/design/XYZ789/Dashboard"
  "https://figma.com/design/DEF456/Settings"
)

for url in "${FILES[@]}"; do
  node patternfly-check.js "$url"
  sleep 5  # Rate limit friendly
done
```

### Integration with Jira
1. Run checker → Export JSON
2. Parse JSON in script
3. Create Jira tickets for critical violations
4. Example ticket:
   ```
   Title: Fix navigation height in Dashboard
   Description: 703 nav items have 56px height, should be 36px
   Link: [Figma deep link]
   ```

---

## Troubleshooting

### "FIGMA_TOKEN not found"
**Solution:** Create `figma-config.env` with your token:
```bash
echo "FIGMA_TOKEN=your-token-here" > /Users/patrickcox/.claude/projects/-Users-patrickcox/memory/figma-config.env
```

Get token from: https://www.figma.com/settings → Personal Access Tokens

### "Cannot access Figma file"
**Solution:**
- Check you have view/edit permissions
- Verify the URL is correct
- Try opening the URL in your browser first

### "Rate limit exceeded"
**Solution:**
- Wait 60 seconds
- Figma allows 1000 API requests per minute
- For large files, this is rare

### Report not opening
**Solution:**
```bash
# Find the report file
ls -lt ~/patternfly-compliance-report-*.html | head -1

# Open manually
open ~/patternfly-compliance-report-[timestamp].html
```

### Score seems wrong
**Check:**
- Is the file complete (not work-in-progress)?
- Are components named clearly?
- Are you using PatternFly library components?
- Run on a smaller test file to verify

---

## Tips for Success

### Before Running
- [ ] Complete all design work
- [ ] Name component states clearly (Button:hover, Input - disabled)
- [ ] Use PatternFly Figma library when possible
- [ ] Organize layers logically

### After Running
- [ ] Fix all critical violations first
- [ ] Review typography hierarchy
- [ ] Standardize spacing
- [ ] Check microcopy consistency
- [ ] Export JSON for dev handoff
- [ ] Re-run to verify fixes

### Best Practices
- Run before design reviews
- Aim for 85%+ compliance
- Fix patterns (not individual instances)
- Share report with team
- Track score improvements over time

---

## Support

**Tool Issues:**
- Check `/Users/patrickcox/.claude/projects/-Users-patrickcox/memory/NEW-FEATURES-SUMMARY.md`
- Review skill spec: `patternfly-check-skill.md`

**PatternFly Questions:**
- Docs: https://www.patternfly.org/
- Design guidelines: https://www.patternfly.org/design-guidelines/
- Tokens: https://www.patternfly.org/design-foundations/tokens

**Figma API:**
- Docs: https://www.figma.com/developers/api
- Token management: https://www.figma.com/settings

---

## Quick Reference

**Command:**
```bash
node /Users/patrickcox/.claude/projects/-Users-patrickcox/memory/patternfly-check.js "<url>"
```

**Output Location:**
```
/Users/patrickcox/patternfly-compliance-report-[timestamp].html
```

**Key Sections:**
1. Executive Summary (score, breakdown)
2. Component Sources (library usage %)
3. Top Priority Fixes (patterns to fix)
4. Critical Violations (must fix)
5. Minor Deviations (should review)
6. Typography Hierarchy (H1 issues)
7. Spacing Consistency (non-standard gaps)
8. Compliant Elements (good examples)
9. Batch Operations (export, copy links)

**Success Criteria:**
- 90%+ compliance score
- < 20 critical violations
- No H1 hierarchy issues
- Consistent spacing patterns
- 70%+ PatternFly library usage

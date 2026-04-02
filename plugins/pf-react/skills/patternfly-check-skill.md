# PatternFly Compliance Checker

## Purpose
Check Figma UI prototypes against PatternFly v6 design system standards. Analyzes components, spacing, typography, colors, and UX patterns to ensure compliance with Red Hat's design system.

## User Persona
UX designers creating prototypes in Figma for Red Hat enterprise software products.

## Trigger
User provides a Figma file URL to check for PatternFly v6 compliance.

Keywords: PatternFly, compliance, design system, check figma, validate design

## Prerequisites
- Figma token stored in: `/Users/patrickcox/.claude/projects/-Users-patrickcox/memory/figma-config.env`
- Node.js installed
- User has view/edit access to the Figma file

## Input
- Figma file URL (design or file format)
  - Example: `https://www.figma.com/design/ABC123/My-Design`
  - Example: `https://www.figma.com/file/ABC123/My-Design`

## Execution Steps

### 1. Validate Input
Check if the provided URL is a valid Figma URL:
```bash
# URL should contain figma.com/design/ or figma.com/file/
```

### 2. Run Compliance Checker
Execute the PatternFly compliance checker script:
```bash
node /Users/patrickcox/.claude/projects/-Users-patrickcox/memory/patternfly-check.js "<figma-url>"
```

### 3. Parse Results
The tool will:
- Fetch the Figma file via API
- Analyze all components, spacing, typography, colors
- Check component states (hover, focus, disabled)
- Validate spacing relationships
- Check typography hierarchy (H1 usage)
- Analyze microcopy consistency
- Track component library usage
- Generate HTML report with Figma deep links

### 4. Open Report
Automatically open the generated HTML report in the default browser:
```bash
# Report will be named: patternfly-compliance-report-<timestamp>.html
# Located in: /Users/patrickcox/
```

### 5. Display Summary
Show the compliance summary to the user:
- Total elements checked
- Critical violations count
- Minor deviations count
- Compliant elements count
- Overall compliance score (percentage)
- Report file location

## Output

**Console Output:**
```
Fetching Figma file: <file-id>...
✓ File loaded: <file-name>
Analyzing design...

Analysis complete!
- Total elements checked: X
- Critical violations: Y
- Minor deviations: Z
- Compliant elements: W
- Overall score: XX%

✓ Report saved to: /Users/patrickcox/patternfly-compliance-report-<timestamp>.html
  Open this file in your browser to view the full report.
```

**HTML Report Includes:**
- Executive summary with compliance score
- Component sources (PatternFly library vs custom)
- Top priority fixes (pattern-based)
- Critical violations (collapsible, with summaries)
- Minor deviations (collapsible, with summaries)
- Typography hierarchy issues (multiple H1s)
- Spacing consistency analysis
- Compliant elements (good examples)
- Microcopy consistency checks
- Batch operations (JSON export, copy Figma links)
- Resources and recommendations

## What Gets Checked

### Components (17 types)
- Buttons (height, radius, states)
- Form inputs (height, focus states)
- Cards (padding, radius)
- Alerts (padding, borders, icons)
- Navigation (item height, active indicators)
- Tables (row height, cell padding)
- Modals (width, padding, header)
- Tooltips (size, padding, text)
- Pagination (button sizes)
- Breadcrumbs (spacing, separators)
- Badges (padding, radius, font)
- Tabs (height, active indicators)
- Accordions (padding, icons)
- Wizards (step sizes, spacing)
- Drawers (width, padding)

### Design Tokens
- Colors (PatternFly palette)
- Typography (Red Hat fonts, sizes, weights)
- Spacing (4px, 8px, 16px, 24px, 32px, 48px, 64px scale)
- Border radius (3px, 8px, 30px)

### Advanced Checks
- Component states (hover, focus, disabled, error)
- Spacing relationships (gaps between elements)
- Typography hierarchy (H1 count and sequence)
- Microcopy consistency (Delete vs Remove, Cancel vs Close)
- Component library sync (detached instances)

## Usage Examples

### Example 1: Basic Check
```
User: Check this Figma design for PatternFly compliance
      https://www.figma.com/design/ABC123/Dashboard-Redesign
```

### Example 2: With Context
```
User: I need to validate my virtualization dashboard against PatternFly v6
      https://www.figma.com/design/XYZ789/VM-Dashboard
```

### Example 3: Short Form
```
User: /patternfly-check https://www.figma.com/file/ABC123/Login-Flow
```

## Error Handling

### Missing Figma Token
```
Error: FIGMA_TOKEN not found in figma-config.env
→ Solution: Create figma-config.env with your Figma personal access token
```

### Invalid URL
```
Error: Invalid Figma URL format
→ Solution: Provide a valid Figma file or design URL
```

### API Access Error
```
Error: Cannot access Figma file
→ Solution: Ensure you have view/edit permissions for the file
```

### No Violations Found
If compliance is 100%, celebrate! The report will show only compliant elements.

## Post-Check Actions

After generating the report, suggest:

1. **Review Priority Fixes**
   - Focus on critical violations first
   - Use pattern-based grouping to fix multiple issues at once

2. **Export Violations**
   - Click "Export JSON" for developer handoff
   - Click "Copy Figma Links" for team review checklist

3. **Address Architecture Issues**
   - Fix typography hierarchy (multiple H1s)
   - Standardize spacing values
   - Align microcopy terminology

4. **Track Improvements**
   - Re-run checker after fixes
   - Compare scores over time
   - Aim for 90%+ compliance before dev handoff

## Tips for Best Results

### Naming Conventions
- Name component states clearly: `Button - Hover`, `Input:focus`, `Button (disabled)`
- Use descriptive layer names for better error messages

### Component Organization
- Use PatternFly Figma library when possible
- Avoid detaching components (they won't get updates)
- Keep consistent spacing throughout

### Before Running
- Ensure all pages are complete (not work-in-progress)
- Review component naming for clarity
- Check that states are properly labeled

## Integration Ideas

### With Jira
Export JSON and import violations as Jira tickets for tracking

### With CI/CD
Run automatically when Figma files are updated (using webhooks)

### With Team Workflow
- Run before design reviews
- Require 80%+ compliance before dev handoff
- Track team compliance trends over time

## Success Metrics

**Good Compliance:**
- 80%+ overall score
- < 50 critical violations
- No typography hierarchy issues
- Consistent spacing patterns

**Excellent Compliance:**
- 90%+ overall score
- < 20 critical violations
- 70%+ PatternFly library usage
- No architectural issues

## Notes

- First run may be slow for large files (200K+ elements)
- Report file size scales with violations (2-5MB typical)
- Figma API rate limits: 1000 requests per minute
- Token expires: Check Figma settings if auth fails

## Version
Tool Version: 2.0 (March 2026)
PatternFly Version: v6
Features: Component states, spacing analysis, typography hierarchy, microcopy checking, batch operations

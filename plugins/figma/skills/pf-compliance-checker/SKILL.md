---
name: pf-compliance-checker
description: Check Figma designs against PatternFly v6 design system standards. Use when a user provides a Figma URL and wants to validate compliance with PatternFly colors, typography, spacing, components, and UX patterns.
---

# PatternFly Compliance Checker

Analyze Figma prototypes against PatternFly v6 design system standards — components, spacing, typography, colors, and UX patterns.

## Requirements

- Node.js 18+
- `node-fetch` package (`npm install node-fetch`)
- `FIGMA_TOKEN` environment variable (or a `figma-config.env` file in the scripts directory)
- View access to the Figma file

## Workflow

### Step 1: Validate input

Accept a Figma file URL from the user. Valid formats:
- `https://www.figma.com/design/FILE_ID/FILE_NAME`
- `https://www.figma.com/file/FILE_ID/FILE_NAME`

### Step 2: Run the checker

```bash
node "$CLAUDE_SKILL_DIR/scripts/patternfly-check.js" "<figma-url>"
```

The script fetches the Figma file via API and analyzes all elements for PatternFly v6 compliance. An HTML report opens automatically in the browser.

### Step 3: Present the summary

After the script completes, summarize the results for the user:

- Overall compliance score (percentage)
- Critical violations count and top categories
- Minor deviations count
- Recommendations for priority fixes

### Step 4: Suggest next steps

- Focus on critical violations first — use pattern-based grouping to fix multiple issues at once
- Use the "Export JSON" button in the report for developer handoff
- Re-run after fixes to track improvement

## What gets checked

**Components** (17 types): buttons, form inputs, cards, alerts, navigation, tables, modals, tooltips, pagination, breadcrumbs, badges, tabs, accordions, wizards, drawers

**Design tokens**: colors (PatternFly palette), typography (Red Hat fonts, sizes, weights), spacing (4px grid scale), border radius

**Advanced checks**: component states (hover, focus, disabled), spacing relationships, typography hierarchy (H1 count), microcopy consistency (Delete vs Remove), component library usage (detached instances)

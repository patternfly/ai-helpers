---
name: figma-changes
description: Identify Figma design changes and generate code update checklists. Use when the user asks to "check Figma updates", "track design changes", "what changed in Figma", "create changelog from Figma", or "what code needs updating based on Figma".
version: 3.1.0
---

# Figma Design Change Tracker

Track Figma design updates and generate code checklists for PatternFly.

## What This Skill Does

1. Fetches recent changes from Figma version history
2. Analyzes design updates to components
3. Compares design specs with code implementation
4. Generates three types of reports (see below)
5. Creates actionable checklists for developers

## Output Files

**FIGMA_CHANGELOG.md** - Internal design team changelog with all updates
**RELEASE_NOTES.md** - Consumer-facing release notes
**figma-updates-[date].md** - Detailed checklist with token changes

See [Report Templates](references/) for examples.

## What to Analyze

For each component update, focus on:

- **Colors** - Background, border, text, hover/focus states
- **Typography** - Font size, weight, line height
- **Spacing** - Padding, gaps, margins
- **Layout** - Dimensions, alignment, structure
- **Variants** - States (hover, focus, disabled) and sizes
- **Changes** - Elements added or removed

## Status Determination

Assign each update one of three statuses:

**✅ Design-only** - Figma documenting what's already in code
**⚠️ Code update needed** - Design is ahead of code
**🔍 Needs verification** - Unclear if code matches design

### How to Determine Status

1. Check if there's a related GitHub issue
   - Issue closed/merged → Likely ✅ Design-only
   - Issue open → Likely ⚠️ Code update needed
   - No issue → Check token comparison

2. Compare design tokens with code
   - Values match → ✅ Design-only
   - Values differ → ⚠️ Code update needed
   - Can't compare → 🔍 Needs verification

3. Check recent git commits (last 2 weeks)
   - Recent work on component → Possibly ✅ Design-only
   - No recent work → Possibly ⚠️ Code update needed

> See [references/troubleshooting.md](references/troubleshooting.md) for detailed decision tree and automation commands.

## Report Format

### For Each Component Update

Include:
- **Date** - When the design was updated
- **Designer** - Who made the change
- **Page/Context** - Where in Figma (e.g., "Chatbot: Filters")
- **Status** - ✅ / ⚠️ / 🔍
- **Links** - Figma, PatternFly.org, GitHub issues

### For Code Updates (⚠️ status only)

Create token comparison tables:

| ✓ | Token | Current | New | Where Used |
|---|-------|---------|-----|------------|
| [ ] | `--pf-c-button--BackgroundColor` | `#0066CC` | `#004080` | Button background |

List files that need updating:
- `Button.scss` - Update color tokens
- `Button.md` - Update documentation
- `Button.test.tsx` - Update snapshots

## Key Guidelines

**Be Specific** - Use exact token names and values
**Link Everything** - Figma, PatternFly.org, GitHub
**Prioritize** - High (breaking, a11y), Medium (updates), Low (docs)
**Note Context** - Always include the Figma page/section

## Examples

**Code Update Needed:**
```
### Button - 2026-03-16
**Status**: ⚠️ Code update needed
**By**: Sarah Designer | **Page**: Component Library

Primary button color updated for better accessibility (WCAG AA).

Token: `--pf-c-button--m-primary--BackgroundColor`
Change: `#0066CC` → `#004080`
```

**Design-Only:**
```
### Card - 2026-03-10
**Status**: ✅ Design-only
**Related**: Issue #915 (closed)

Figma updated to match PatternFly 6.0.0. No code changes needed.
```

## Additional Resources

- [Report Templates](references/) - Example outputs
- [Troubleshooting](references/troubleshooting.md) - Common issues
- [Validation Checklists](references/validation-checklists.md) - Quality checks
- [Token Mappings](examples/token-mappings.json) - Figma ↔ Code mapping

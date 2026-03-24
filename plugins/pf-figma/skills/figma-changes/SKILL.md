---
name: figma-changes
description: Identify Figma design changes and generate code update checklists. Use when the user asks to "check Figma updates", "track design changes", "what changed in Figma", "create changelog from Figma", or "what code needs updating based on Figma".
version: 3.0.0
---

# Figma Design Change Tracker

Track Figma design updates and generate code checklists for PatternFly.

## Output Files

Generate three files per sync:

1. **FIGMA_CHANGELOG.md** - Internal changelog (table format)
2. **RELEASE_NOTES.md** - Consumer-facing release notes
3. **figma-updates-[date].md** - Detailed code checklist with token changes

## Workflow

### Step 1: Fetch Figma Version History

```bash
export FIGMA_ACCESS_TOKEN="user_token"
FILE_KEY=$(echo "$URL" | sed -n 's/.*\/file\/\([^\/]*\).*/\1/p')

curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/$FILE_KEY/versions" -o /tmp/figma-${FILE_KEY}-versions.json
```

### Step 2: Create Summary & Changelog

Parse version history and create changelog using table format (see Report Template section below)

### Step 3: Cross-Reference GitHub Issues

Search patternfly-design-kit and chatbot repos for related issues. Use GitHub API or `gh` CLI to find matching issues by component name and link them in reports.

### Step 4: Analyze Figma Designs

For each component update, extract design specs focusing on:

1. **Colors**: Background, border, text, hover/focus states
2. **Typography**: Font size, weight, line height
3. **Spacing**: Padding, gaps, margins
4. **Layout**: Dimensions, alignment, structure changes
5. **Variants**: Different states (hover, focus, disabled) and sizes
6. **New/Removed**: Elements added or removed

### Step 5: Create Visual Comparison

Create comparison table with:
- Link to Figma design
- Link to PatternFly.org component
- List key visual differences

### Step 6: Identify Code Changes Needed

For each component update, determine what code changes are needed:

1. **Identify the Figma page/context** - Use GitHub issue titles to determine the proper scope
   - Example: "Chatbot: Filter/Sorting" → This is for Chatbot component, not general filters
   - Example: "Library theming: Alerts" → This is a theming update to Alert component
   - **Always note the page/section in Figma** where the update occurred

2. **Identify the component** in PatternFly codebase and find its documentation

3. **Cross-reference GitHub issues** for existing work

4. **Determine if code update is needed**:
   - ✅ **Design-only update**: Figma is documenting what's already implemented in code
   - ⚠️ **Code update needed**: Figma design is ahead of code implementation
   - 🔍 **Verification needed**: Unclear if code matches design - needs manual check

5. **Map to code files** on patternfly.org repository (only if code update needed)

6. **Create actionable checklist items with visual references**

**Checklist Format:**
```markdown
### [Component Name]

**Date**: [Date] | **By**: [Designer] | **Page**: [Figma page/section]
**Status**: ✅ Design-only | ⚠️ Code update needed | 🔍 Needs verification
**Links**: [PatternFly.org](link) | [Figma](link) | [Issue #XXX](link)

#### Token Changes (if ⚠️ Code update needed)

**Color Tokens**
| ✓ | Token | Current | New | Where Used |
|---|-------|---------|-----|------------|
| [ ] | `--pf-c-[component]--BackgroundColor` | `#FFFFFF` | `#F5F5F5` | Background |

**Spacer Tokens**
| ✓ | Token | Current | New | Where Used |
|---|-------|---------|-----|------------|
| [ ] | `--pf-c-[component]--PaddingBlockStart` | `12px` | `16px` | Top padding |

**Dimension Tokens**
| ✓ | Token | Current | New | Where Used |
|---|-------|---------|-----|------------|
| [ ] | `--pf-c-[component]--MinWidth` | `200px` | `240px` | Min width |

#### Files to Update
- `[Component].scss` - Update tokens
- `[Component].md` - Update docs
- `[Component].test.tsx` - Update snapshots
```

## Report Templates

Generate three types of reports (see [references/](references/) for detailed templates):

### 1. Design Changelog (FIGMA_CHANGELOG.md)

Internal table-based changelog for design team. See [template-changelog.md](references/template-changelog.md) for the full template.

### 2. Release Notes (RELEASE_NOTES.md)

Consumer-facing release notes. See [template-release-notes.md](references/template-release-notes.md) for the full template.

### 3. Detailed Report with Code Checklist

Comprehensive report with token changes and actionable checklists. See [template-detailed-report.md](references/template-detailed-report.md) for the full template.

## Key Guidelines

1. **Be Specific**: Include exact token names and values (e.g., "update `--pf-c-button--BackgroundColor` from #0066CC to #004080")
2. **Determine Status**: Check GitHub issues - closed/merged = ✅ Design-only, open = ⚠️ Code needed, unclear = 🔍 Verify
3. **Prioritize**: High (breaking changes, a11y, new features), Medium (minor updates), Low (docs only)
4. **Link Everything**: Figma, PatternFly.org, GitHub issues and files

## Common Scenarios

**Scenario 1: Code Update Needed**
```markdown
### Button Component - 2026-03-16
**Status**: ⚠️ Code update needed
**Change**: Primary button color updated for better contrast

#### Token Changes:
| ✓ | Token | Current | New | Where Used |
|---|-------|---------|-----|------------|
| [ ] | `--pf-c-button--m-primary--BackgroundColor` | `#0066CC` | `#004080` | Primary button background |
```

**Scenario 2: Design-Only Update**
```markdown
### Card Component - 2026-03-10
**Status**: ✅ Design-only
**Related Issue**: [#915](link) - Closed/Merged

**Notes**: Figma updated to match existing PatternFly 6.0.0 implementation. No code changes needed.
```

## Output Principles

- Start with changelog (what, when, who)
- Categorize by status (⚠️ Code needed, ✅ Design-only, 🔍 Verify)
- Create detailed checklists only for code updates needed
- Use tables for easy scanning
- Include exact file paths and token names
- Link to Figma, PatternFly.org, and GitHub

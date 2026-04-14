---
name: figma-changes
description: Track layer-level Figma design changes with variant tracking, smart filtering, and copy-paste ready exports for Slack/Jira/GitHub. Use when the user asks to "check Figma updates", "track design changes", "what changed in Figma", or "create changelog from Figma".
version: 3.5.0
---

# Figma Design Change Tracker

Track layer-level Figma design updates and generate comprehensive, detailed changelogs for PatternFly.

## Output Files

Generate three files per sync:

1. **FIGMA_CHANGELOG.md** - Internal changelog (detailed table format)
2. **RELEASE_NOTES.md** - Consumer-facing release notes
3. **CHANGELOG_EXPORT.md** - Clean Markdown export (ready for Slack/Jira/GitHub)

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

### Step 4: Analyze Figma Component Changes with Smart Filtering

For each component update, fetch the component structure and compare layer-by-layer, **filtering for visual changes only**.

**VISUAL CHANGES (Include in changelog):**

**Added Layers/Elements:**
- New frames, groups, or shapes
- New text layers
- New icons or images
- **New variants or states added to existing components** (e.g., "Disabled state", "Large size", "Error variant")
- New component instances

**Removed Layers/Elements:**
- Deleted frames, groups, or shapes
- Removed text layers
- Removed icons or images
- Removed variants or states

**Modified Layers/Elements:**
- **Semantic Color Tokens**: 
  - Background colors, border colors, fill colors, stroke colors
  - Text colors, icon colors
  - State-specific colors (hover, focus, active, disabled)
  - Theme color assignments
- **Semantic Dimension Tokens**:
  - Width, height, min/max dimensions
  - Padding, margin, gap values
  - Border width, corner radius
  - Icon sizes, font sizes
- **Typography**: Font family, weight, line height, letter spacing
- **Layout**: Position, alignment, auto-layout settings, grid changes
- **Properties**: Opacity, effects (shadows, blur), blending modes
- **Text Content**: Label text, placeholder text, example content
- **Component Structure**: Nesting changes, layer reorganization

**METADATA UPDATES (Exclude from changelog or separate section):**
- Component descriptions
- Layer name changes (without structural change)
- Documentation/annotation updates
- Scope changes (private → team library)
- Tags or labels
- Comments or notes
- Version descriptions
- Organization/category changes

**Smart Filtering Rules:**
1. **Skip metadata-only updates**: If only descriptions, names, or scopes changed, exclude from main changelog
2. **Focus on visual impact**: Only include changes that affect how the component looks or behaves
3. **Token changes matter**: Semantic token updates (color, spacing, size) are always included
4. **Structure changes matter**: Layer additions/removals or reorganization are included
5. **Optional metadata section**: Optionally create a separate "Documentation Updates" section at the end for metadata changes

Use the Figma API to:
```bash
# Get component details
curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/$FILE_KEY/nodes?ids=$NODE_ID"
```

Compare current state with previous version, applying smart filters to determine visual-only changes.

### Step 5: Create Visual Comparison

Create comparison table with:
- Link to Figma design
- Link to PatternFly.org component (if applicable)
- List key visual differences
- Designer name and date
- Related GitHub issues

## Report Template

Generate two comprehensive reports:

### 1. Design Changelog (FIGMA_CHANGELOG.md)

Internal detailed changelog for design team:

```markdown
# Design Changelog
**Period**: [Date Range]

## ✅ Added

### New Components/Patterns
| Component/Pattern | What Was Added | Page/Context | Designer | Date | Related Issue |
|-------------------|----------------|--------------|----------|------|---------------|
| **[Component Name]** | [Brief description] | [Page] | [Designer] | [Date] | [Link] |

**Layer Details:**
- ➕ Added [layer name]: [description]
- ➕ Added [layer name]: [description]

---

### New Variants Added to Existing Components
| Component | Variants Added | Page/Context | Designer | Date | Related Issue |
|-----------|----------------|--------------|----------|------|---------------|
| **[Component Name]** | [Variant names] | [Page] | [Designer] | [Date] | [Link] |

**Variant Details:**
- ➕ **[Variant name]**: [Description of the variant and what it looks like]
  - Properties: [Key visual properties]
  - Use case: [When to use this variant]
- ➕ **[Variant name]**: [Description]
  - Properties: [Key visual properties]
  - Use case: [When to use this variant]

---

## ❌ Removed
| Component/Pattern | What Was Removed | Page/Context | Designer | Date | Related Issue |
|-------------------|------------------|--------------|----------|------|---------------|
| **[Component Name]** | [Brief description] | [Page] | [Designer] | [Date] | [Link] |

**Layer Details:**
- ➖ Removed [layer name]: [what it was]
- ➖ Removed [layer name]: [what it was]
- ➖ Deleted variant: [variant name]

---

## 🔨 Fixed
| Component | Issue Fixed | Page/Context | Designer | Date | Related Issue |
|-----------|-------------|--------------|----------|------|---------------|
| **[Name]** | [What fixed] | [Page] | [Designer] | [Date] | [Link] |

**Layer Details:**
- 🔧 Fixed [layer name]: [what was wrong → what's fixed]

---

## 🎨 Modified
| Component | What Changed | Page/Context | Designer | Date | Related Issue |
|-----------|--------------|--------------|----------|------|---------------|
| **[Component Name]** | [Summary of changes] | [Page] | [Designer] | [Date] | [Link] |

**Layer Details:**
- 🔄 Modified [layer name]:
  - Color: [old value] → [new value]
  - Size: [old value] → [new value]
  - Position: [old value] → [new value]
- 🔄 Modified [layer name]:
  - Font: [old value] → [new value]
  - Text: "[old text]" → "[new text]"

---

## 📊 Summary
**Total Updates**: [Count]
- Added: [#] components/layers
- Removed: [#] components/layers  
- Fixed: [#] issues
- Modified: [#] components/layers

**Contributors**: [List]

---

## 📝 Documentation Updates (Optional)

Only include this section if there are significant metadata updates worth noting:

| Component | Documentation Change | Date |
|-----------|---------------------|------|
| **[Component Name]** | Updated description to clarify usage guidelines | [Date] |
| **[Component Name]** | Added scope documentation for accessibility | [Date] |

_Note: Metadata-only updates (descriptions, scopes, tags) are tracked separately to keep the main changelog focused on visual changes._
```

### 2. Release Notes (RELEASE_NOTES.md)

Consumer-facing release notes:

```markdown
# PatternFly Design Updates - [Month Year]

## What's New

**[Component/Pattern Name]**
[Brief description and where to use it]
- **Reference**: [PatternFly Docs](link)
- **GitHub issue**: [#XXX](link)

## Bug Fixes

**[Component Name]**
What was fixed and impact.
- **Action needed**: [What users should do]
- **Reference**: [#XXX](link)

## Updates & Improvements

**[X] component updates** - [Brief summary of improvements]
- **Action needed**: Review commonly used components

## For Developers

### Components to Review
1. [Component] - [What changed]
2. [Component] - [What changed]

### Testing Recommendations
- [Key area to test]
- [Key area to test]

**Summary**: [X] updates - [Y] new, [Z] fixes, [W] improvements
```

### 3. Clean Markdown Export (CHANGELOG_EXPORT.md)

Copy-paste ready format for Slack, Jira, and GitHub:

```markdown
# Design Updates - [Date Range]

## ✅ What's New

**[Component Name]** - New component/pattern
- ➕ Added [layer/feature]
- ➕ Added [layer/feature]
- [Link to Figma](url) | [Issue #XXX](url)

**[Component Name]** - New variants added
- ➕ Variant: [Name] - [Brief description]
- ➕ Variant: [Name] - [Brief description]
- [Link to Figma](url) | [Issue #XXX](url)

---

## ❌ Removed

**[Component Name]** - [Brief description]
- ➖ Removed [layer/feature]
- ➖ Removed [layer/feature]
- [Link to Figma](url) | [Issue #XXX](url)

---

## 🔨 Bug Fixes

**[Component Name]** - [What was fixed]
- 🔧 Fixed [specific issue]
- [Link to Figma](url) | [Issue #XXX](url)

---

## 🎨 Updates

**[Component Name]** - [What changed]
- 🔄 [Layer]: [old] → [new]
- 🔄 [Layer]: [old] → [new]
- [Link to Figma](url) | [Issue #XXX](url)

**[Component Name]** - [What changed]
- 🔄 [Layer]: [old] → [new]
- [Link to Figma](url)

---

**Total Changes**: [#] updates ([#] new, [#] removed, [#] fixed, [#] modified)
**By**: [Designer names]
**Period**: [Date range]
```

**Format Guidelines for CHANGELOG_EXPORT.md:**
- Use simple bullet lists (no tables)
- Keep entries concise and scannable
- Include clickable links to Figma and GitHub
- Group by category with clear emoji headers
- One-line summaries with key details in bullets
- Ready to copy-paste into Slack channels, Jira tickets, or GitHub discussions
- Mobile-friendly formatting

## Key Guidelines

1. **Smart Filtering - Visual Changes Only**: 
   - ✅ Include: Semantic color/dimension token changes, layer additions/removals, typography, spacing, layout
   - ❌ Exclude: Metadata updates (descriptions, scopes, tags, comments, documentation)
   - Focus on changes that impact how components look or behave
   
2. **Be Specific**: Include exact layer names, property values (colors, sizes, fonts), and before/after comparisons

3. **Track Layer-Level Changes**: Don't just say "Button updated" - specify which layers changed and how

4. **Categorize Properly**: 
   - Added (✅): 
     - New components or patterns
     - New layers within components
     - **New variants added to existing components** (show separately in a dedicated subsection)
   - Removed (❌): Deleted components, layers, or variants
   - Fixed (🔨): Bug fixes and corrections
   - Modified (🎨): Visual changes to existing layers (color, size, position, etc.)

5. **Use Clear Symbols**: ➕ Added, ➖ Removed, 🔧 Fixed, 🔄 Modified

6. **Show Value Changes**: Always include "old value → new value" format for visual properties

7. **Link Everything**: Figma designs, PatternFly.org docs, and GitHub issues

8. **Provide Context**: Include the Figma page/section and component hierarchy

9. **Separate Metadata (Optional)**: If there are significant metadata updates, add them in a separate "Documentation Updates" section at the end

## Example Changelog Entry

```markdown
## ✅ Added

### New Components/Patterns
| Component/Pattern | What Was Added | Page/Context | Designer | Date | Related Issue |
|-------------------|----------------|--------------|----------|------|---------------|
| **Chatbot: Filter & Sorting** | New filter and sorting controls | Patterns & Extensions > Chatbot | Kayla Chumley | Mar 16, 2026 | [#899](link) |

**Layer Details:**
- ➕ Added "Filter dropdown": Dropdown menu component with multi-select
- ➕ Added "Sort button": Icon button with ascending/descending states
- ➕ Added "Active filters": Chip group showing selected filters

---

### New Variants Added to Existing Components
| Component | Variants Added | Page/Context | Designer | Date | Related Issue |
|-----------|----------------|--------------|----------|------|---------------|
| **Button Component** | Disabled, Loading, XL size | Components > Buttons | Designer Name | Mar 12, 2026 | [#892](link) |

**Variant Details:**
- ➕ **Disabled state**: Reduced opacity (40%), no hover interaction, cursor not-allowed
  - Properties: Opacity `40%`, Cursor `not-allowed`, No hover effect
  - Use case: When action is unavailable or pending
- ➕ **Loading state**: Spinner icon replaces text, disabled interaction
  - Properties: Spinner icon (16px), Text hidden, Width maintains
  - Use case: During async operations
- ➕ **Extra Large (XL) size**: Larger variant for prominent actions
  - Properties: Height `56px`, Font size `20px`, Padding `24px horizontal`
  - Use case: Hero sections, primary CTAs

---

| Component | Variants Added | Page/Context | Designer | Date | Related Issue |
|-----------|----------------|--------------|----------|------|---------------|
| **Alert Component** | Success, Warning states | Components > Alerts | Designer Name | Mar 14, 2026 | [#895](link) |

**Variant Details:**
- ➕ **Success state**: Green theme with checkmark icon
  - Properties: Background `#E6F4EA`, Border `#34A853`, Icon `checkmark-circle`
  - Use case: Confirmation messages
- ➕ **Warning state**: Yellow theme with warning icon
  - Properties: Background `#FFF4E5`, Border `#F9AB00`, Icon `warning-triangle`
  - Use case: Cautionary information

---

## ❌ Removed
| Component/Pattern | What Was Removed | Page/Context | Designer | Date | Related Issue |
|-------------------|------------------|--------------|----------|------|---------------|
| **Button Component** | Deprecated outline variant | Components > Buttons | Designer Name | Mar 10, 2026 | [#888](link) |

**Layer Details:**
- ➖ Removed "Outline border" layer
- ➖ Removed "Outline hover state" variant
- ➖ Deleted "Outline + icon" variant

---

## 🔨 Fixed
| Component | Issue Fixed | Page/Context | Designer | Date | Related Issue |
|-----------|-------------|--------------|----------|------|---------------|
| **Forms: Checkbox** | Fixed alignment of description text | Components > Form components | Kayla Chumley | Feb 19, 2026 | [#909](link) |

**Layer Details:**
- 🔧 Fixed "Description text" layer: Vertical alignment off by 2px → Now centered
- 🔧 Fixed "Checkbox icon": Not aligned with label baseline → Now aligned

---

## 🎨 Modified
| Component | What Changed | Page/Context | Designer | Date | Related Issue |
|-----------|--------------|--------------|----------|------|---------------|
| **Alert Component** | Updated colors and spacing | Components > Alerts | Designer Name | Mar 5, 2026 | [#901](link) |

**Layer Details:**
- 🔄 Modified "Alert background":
  - Fill color: `#F0F0F0` → `#F5F5F5`
  - Corner radius: `4px` → `8px`
- 🔄 Modified "Alert icon":
  - Size: `16px` → `20px`
  - Color: `#0066CC` → `#004080`
- 🔄 Modified "Alert title text":
  - Font weight: `500` → `600`
  - Line height: `20px` → `24px`
```

## Example Clean Export (CHANGELOG_EXPORT.md)

```markdown
# Design Updates - Feb 19 - Mar 16, 2026

## ✅ What's New

**Chatbot: Filter & Sorting** - New filter and sorting pattern
- ➕ Added Filter dropdown with multi-select
- ➕ Added Sort button with ascending/descending states
- ➕ Added Active filters chip group
- [View in Figma](https://figma.com/...) | [Issue #899](https://github.com/...)

**Button Component** - New variants added
- ➕ Variant: Disabled - Reduced opacity, no interaction
- ➕ Variant: Loading - Spinner icon, maintains width
- ➕ Variant: XL size - 56px height for prominent CTAs
- [View in Figma](https://figma.com/...) | [Issue #892](https://github.com/...)

---

## ❌ Removed

**Button Component** - Deprecated outline variant
- ➖ Removed outline border layer
- ➖ Removed outline hover state variant
- [View in Figma](https://figma.com/...) | [Issue #888](https://github.com/...)

---

## 🔨 Bug Fixes

**Forms: Checkbox** - Fixed alignment issues
- 🔧 Fixed description text vertical alignment (off by 2px)
- 🔧 Fixed checkbox icon alignment with label baseline
- [View in Figma](https://figma.com/...) | [Issue #909](https://github.com/...)

---

## 🎨 Updates

**Alert Component** - Updated colors and spacing
- 🔄 Alert background: Fill `#F0F0F0` → `#F5F5F5`, Corner radius `4px` → `8px`
- 🔄 Alert icon: Size `16px` → `20px`, Color `#0066CC` → `#004080`
- 🔄 Alert title: Font weight `500` → `600`, Line height `20px` → `24px`
- [View in Figma](https://figma.com/...) | [Issue #901](https://github.com/...)

---

**Total Changes**: 4 updates (1 new, 1 removed, 1 fixed, 1 modified)
**By**: Kayla Chumley, Designer Name
**Period**: Feb 19 - Mar 16, 2026
```

## Smart Filtering Examples

### ✅ INCLUDE in Changelog (Visual Changes)

```
❌ Change: Button component description updated
✅ SKIP - This is metadata only

✅ Change: Button background color changed from #0066CC to #004080
✅ INCLUDE - Semantic color token change

❌ Change: Alert component scope changed from "Private" to "Team Library"
✅ SKIP - Metadata/organizational change

✅ Change: Alert padding changed from 12px to 16px
✅ INCLUDE - Semantic dimension token change

❌ Change: Card component renamed from "Card_v1" to "Card Component"
✅ SKIP - Layer name change without visual impact

✅ Change: Card component - removed shadow layer
✅ INCLUDE - Structural/visual change

❌ Change: Tooltip description added: "Use for contextual help"
✅ SKIP - Documentation update

✅ Change: Tooltip font size changed from 12px to 14px
✅ INCLUDE - Typography/dimension change

❌ Change: Button component tagged with "Primary Actions"
✅ SKIP - Metadata/tag update

✅ Change: Button icon size changed from 16px to 20px
✅ INCLUDE - Visual/dimension change

❌ Change: Navigation component documentation updated with usage examples
✅ SKIP - Documentation only

✅ Change: Navigation spacing between items changed from 8px to 12px
✅ INCLUDE - Semantic spacing token change
```

### Filtering Decision Tree

```
Is this change:
├─ Layer added/removed? → ✅ INCLUDE
├─ Visual property changed (color, size, position, opacity)? → ✅ INCLUDE
├─ Semantic token changed (color, dimension, spacing)? → ✅ INCLUDE
├─ Typography changed (font, weight, size, line-height)? → ✅ INCLUDE
├─ Text content changed (labels, placeholders)? → ✅ INCLUDE
├─ Component structure reorganized? → ✅ INCLUDE
└─ Only metadata changed (description, scope, tags, name)? → ❌ SKIP (or separate section)
```

## Output Principles

- Organize by category: Added (✅), Removed (❌), Fixed (🔨), Modified (🎨)
- Include high-level summary tables for quick scanning
- Follow each table with detailed "Layer Details" sections
- For each layer change, specify:
  - Layer name (exact as it appears in Figma)
  - What property changed
  - Before and after values (e.g., `#0066CC → #004080`)
- Use clear symbols: ➕ Added, ➖ Removed, 🔧 Fixed, 🔄 Modified
- Group related layer changes under the same component
- Link to Figma designs, PatternFly.org, and GitHub issues
- Include component hierarchy context (e.g., "Button > Primary variant > Icon layer")

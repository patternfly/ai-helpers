---
name: figma-icon-finder
description: Identifies PatternFly icons used in Figma mockups and provides the correct import statements for React components. Use when given a Figma screenshot or URL and the user needs to know which PatternFly icons to import.
argument-hint: "[path/to/figma-screenshot.png] or [figma-url] or use @file for autocomplete"
---

# Figma Icon Finder

Analyze Figma design mockups to identify PatternFly icons and provide the correct import statements for React implementation.

## Workflow

### Step 1: Get the design image

- If `$ARGUMENTS` contains an image file path (`.png`, `.jpg`, `.jpeg`, `.webp`): read and analyze it
- If `$ARGUMENTS` contains a Figma URL: ask the user to provide a screenshot
- If no arguments: ask the user for a screenshot path

### Step 2: Load icon reference

Read `references/common-icons.md` for the full categorized icon list with visual descriptions and usage patterns.

### Step 3: Analyze the design

Examine the image and identify all icons. For each icon:

1. Note its visual characteristics (shape, style, filled vs outlined)
2. Consider its context (where it appears, what action it represents)
3. Match to PatternFly icons using the reference and visual similarity
4. If uncertain, list candidates with confidence levels

### Step 4: Categorize icons

Separate identified icons into two groups:

**Explicit import icons** — icons you need to import from `@patternfly/react-icons`:
- Action icons (edit, delete, copy, etc.)
- Status indicators used standalone
- Navigation and object icons

**Component-managed icons** — icons automatically handled by PatternFly components (no import needed):
- Checkbox states → `Checkbox` component
- Tree expand/collapse → `TreeView` component
- Sort indicators → `Table` with sort props
- Search input icons → `SearchInput` component
- Dropdown/Select carets → `Dropdown`/`Select` components
- Pagination controls → `Pagination` component

Ask the user their preferred output detail level (brief vs detailed) and whether to include component-managed icons in the report.

### Step 5: Generate report

**Brief format** — for each icon, show the component usage and a combined import statement:

```tsx
// Modal close button (top-right corner)
<TimesCircleIcon />

// Error status indicator
<Icon status="danger"><ExclamationCircleIcon /></Icon>
```

```typescript
import { TimesCircleIcon, ExclamationCircleIcon } from '@patternfly/react-icons';
import { Icon } from '@patternfly/react-core';
```

**Detailed format** — for each icon, include:
- Visual description and location in the design
- PatternFly match with confidence level
- Import statement and usage example
- Context-specific notes (accessibility, status wrapping, etc.)
- A combined copy-paste-ready import block at the end

For status icons, always show the `Icon` wrapper pattern:

```tsx
import { Icon } from '@patternfly/react-core';

<Icon status="success"><CheckCircleIcon /></Icon>
<Icon status="danger"><ExclamationCircleIcon /></Icon>
<Icon status="warning"><ExclamationTriangleIcon /></Icon>
<Icon status="info"><InfoCircleIcon /></Icon>
```

### Accessibility reminders

- Interactive icons in buttons need `aria-label` or visible text
- Decorative icons should have `aria-hidden="true"`
- Status icons should use the `Icon` wrapper with `status` prop

## Edge Cases

- **Multiple possible matches**: list all candidates with confidence levels and recommend based on semantic context
- **Low-quality image**: request a higher-resolution screenshot and provide best guesses
- **Component-managed icons**: explain that no import is needed and which component handles it

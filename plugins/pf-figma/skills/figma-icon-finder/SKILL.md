---
name: figma-icon-finder
description: Identifies PatternFly icons used in Figma mockups and provides the correct import statements for React components. Works with any PatternFly-based application.
argument-hint: "[path/to/figma-screenshot.png] or [figma-url] or use @file for autocomplete"
allowed-tools: Read, WebFetch, AskUserQuestion
---

# Figma Icon Finder

Analyze Figma design mockups to identify which PatternFly icons are being used and provide the exact import statements needed for implementation in any PatternFly-based application.

## Usage

```
# Analyze a Figma screenshot
/figma-icon-finder @mockup.png

# Analyze from clipboard (if screenshot path provided)
/figma-icon-finder ~/Downloads/figma-design.png

# Provide Figma URL (will ask user to provide screenshot)
/figma-icon-finder https://www.figma.com/...
```

## Workflow

### Step 1: Get the design image

1. **Check for input**:
   - If `$ARGUMENTS` contains a file path ending in `.png`, `.jpg`, `.jpeg`, or `.webp`: use that path
   - If `$ARGUMENTS` contains a Figma URL: inform user that direct Figma API access requires authentication, ask them to:
     - Take a screenshot of the design
     - Provide the screenshot path
   - If no arguments: ask user for screenshot path

2. **Read the image**:
   ```
   Read the image file at the provided path. Since Claude is multimodal, you will be able to see the image visually.
   ```

### Step 2: Load PatternFly icon reference

Reference the common icons guide to assist with matching:

**PatternFly Icon Reference**: All PatternFly icons follow a consistent naming convention:
- Icon names are in PascalCase
- Most icons end with `Icon` suffix (e.g., `AddCircleIcon`, `TrashIcon`)
- Icons are categorized by purpose:
  - Action icons (e.g., `EditIcon`, `DeleteIcon`, `AddCircleIcon`)
  - Status icons (e.g., `CheckCircleIcon`, `ErrorCircleOIcon`, `WarningTriangleIcon`)
  - Navigation icons (e.g., `ArrowRightIcon`, `ExternalLinkAltIcon`)
  - Object icons (e.g., `FileIcon`, `FolderIcon`, `ImageIcon`)

Common PatternFly icon patterns to recognize:
- **Plus/Add**: `PlusIcon`, `PlusCircleIcon`, `AddCircleOIcon`
- **Delete/Remove**: `TrashIcon`, `MinusCircleIcon`, `TimesIcon`, `TimesCircleIcon`
- **Edit**: `PencilAltIcon`, `EditIcon`
- **Search**: `SearchIcon`
- **Filter**: `FilterIcon`
- **Info/Help**: `InfoCircleIcon`, `QuestionCircleIcon`, `HelpIcon`
- **Success**: `CheckCircleIcon`, `CheckIcon`
- **Warning**: `WarningTriangleIcon`, `ExclamationTriangleIcon`
- **Error**: `ErrorCircleOIcon`, `ExclamationCircleIcon`, `TimesCircleIcon`
- **Navigation**: `ArrowRightIcon`, `ArrowLeftIcon`, `ChevronRightIcon`, `ChevronDownIcon`
- **External**: `ExternalLinkAltIcon`, `ExternalLinkSquareAltIcon`
- **Expand/Collapse**: `AngleDownIcon`, `AngleRightIcon`, `CompressIcon`, `ExpandIcon`
- **Copy**: `CopyIcon`
- **Download**: `DownloadIcon`
- **Upload**: `UploadIcon`
- **Lock**: `LockIcon`, `LockOpenIcon`
- **Monitoring**: `MonitoringIcon`, `ChartLineIcon`
- **Settings**: `CogIcon`

See the `references/common-icons.md` file for a comprehensive list organized by category.

### Step 3: Analyze the design image

Using your multimodal vision capabilities, carefully examine the image and:

1. **Identify all icons** present in the design:
   - Look for small graphical elements that represent actions, states, or objects
   - Note their visual characteristics (shape, style, purpose)
   - Consider their context (where they appear, what they're associated with)

2. **Describe each icon** in detail:
   - Shape (circle, triangle, square, line-based)
   - Purpose (action, status, navigation, object)
   - Visual elements (arrows, checks, crosses, plus signs, etc.)
   - Color/style (outlined vs. filled, though PatternFly icons are typically monochrome)

3. **Match to PatternFly icons**:
   - Use the icon reference from Step 2
   - Match based on:
     - Visual similarity
     - Semantic purpose
     - Common usage patterns in PatternFly applications
   - If uncertain between multiple options, list all possibilities with confidence ratings

### Step 4: Categorize icons and confirm scope

Before generating the full report, categorize identified icons into two groups:

1. **Explicit import icons** - Icons that need to be imported from `@patternfly/react-icons`:
   - Action icons (e.g., `EditIcon`, `TrashIcon`, `CopyIcon`)
   - Status indicators used standalone (e.g., `CheckCircleIcon`, `ExclamationTriangleIcon`)
   - Object/content icons (e.g., `FolderIcon`, `DesktopIcon`, `FileIcon`)
   - Navigation icons (e.g., `ExternalLinkAltIcon`)
   - Custom icons not automatically provided by components

2. **Component-managed icons** - Icons automatically handled by PatternFly components:
   - Checkbox states (checked, unchecked, indeterminate) - managed by `Checkbox` component
   - Tree expand/collapse icons - managed by `TreeView` component
   - Sort indicators - managed by `Table` component with sort props
   - Search input icons - included in `SearchInput` component
   - Dropdown/Select carets - managed by `Dropdown`/`Select` components
   - Pagination controls - managed by `Pagination` component
   - Accordion expand/collapse - managed by `Accordion` component

**Always ask the user two questions** using the AskUserQuestion tool:

**Question 1 - Output Format:**
```
Question: "What level of detail would you like in the icon analysis report?"

Options:
- "Brief" (Recommended) - Just show the icon components to use (e.g., <FolderIcon />)
- "Detailed" - Full report with imports, usage examples, notes, and accessibility reminders
```

**Question 2 - Icon Scope** (only if component-managed icons are detected):
```
Question: "I found some icons that are automatically handled by PatternFly components (like checkbox states, tree expand/collapse, or sort indicators). Would you like me to include details about these component-managed icons in the report?"

Options:
- "Focus on explicit imports only" (Recommended) - Only show icons you need to import
- "Include component-managed icons too" - Show all icons with notes about which are component-managed
```

Based on the user's responses, adjust the report accordingly.

### Step 5: Generate implementation code

For each identified icon (filtered by user preference from Step 4), provide:

1. **Import statement**:
   ```typescript
   import { IconName } from '@patternfly/react-icons';
   ```

2. **Usage example**:
   ```tsx
   <IconName />
   // or with size
   <IconName size="sm" />
   // for status icons, use PatternFly Icon wrapper
   <Icon status="danger"><IconName /></Icon>
   ```

3. **Common props** (if relevant to the context):
   - `size`: `"sm" | "md" | "lg" | "xl"`
   - `status`: `"success" | "danger" | "warning" | "info" | "custom"` (for status icons)
   - `color`: CSS color value (only when not using status prop)
   - `title`: Accessible title for screen readers
   - `aria-hidden`: Whether to hide from screen readers (use `true` if icon is decorative)

4. **Context-specific guidance**:
   - If icon is in a button: remind to include accessible text or aria-label
   - If icon indicates status: wrap in PatternFly `<Icon status="...">` component
   - If icon is interactive: note accessibility requirements

### Step 6: Provide reference documentation

For each identified icon, include a link to view it in the PatternFly documentation:

```
https://www.patternfly.org/components/icons/
```

## Output Format

Generate a report based on the user's preference:

### Brief Format

If the user chose "Brief", provide a concise list showing just the icon components to use:

```markdown
# Figma Icon Analysis - Brief

## Icons to Use

**[Short description/location]**
```tsx
<FolderIcon />
```

**[Short description/location]**
```tsx
<Icon status="danger"><ExclamationCircleIcon /></Icon>
```

**[Short description/location]**
```tsx
<DesktopIcon />
```

---

**Import statements**:
```typescript
import { FolderIcon, ExclamationCircleIcon, DesktopIcon } from '@patternfly/react-icons';
import { Icon } from '@patternfly/react-core';
```

**Component-managed** (if user chose to include them):
- Checkboxes - use `<Checkbox />` component
- Tree expand/collapse - use `<TreeView />` component
- Sort indicators - use `<Table>` with sort props
```

### Detailed Format

If the user chose "Detailed", provide a comprehensive report in this format.

**Note**: If the user chose to include component-managed icons, clearly mark them with a note like "⚙️ Component-managed" in the icon title and explain that no explicit import is needed.

```markdown
# Figma Icon Analysis

## Design Overview
[Brief description of the design/mockup being analyzed]

## Icons Identified

### Icon 1: [Icon Name]
**Visual Description**: [What you see in the design]
**PatternFly Match**: `IconName` (confidence: High/Medium/Low)
**Location in Design**: [Where it appears]

**Import**:
\`\`\`typescript
import { IconName } from '@patternfly/react-icons';
\`\`\`

**Usage**:
\`\`\`tsx
<IconName aria-hidden="true" />
\`\`\`

**Notes**: [Any context-specific implementation notes]

---

### Icon 2: [Icon Name]
[Repeat format for each icon]

---

### Icon N: [Component-managed Icon] ⚙️ Component-managed
**Visual Description**: [What you see in the design]
**PatternFly Component**: `ComponentName` (automatically handles this icon)
**Location in Design**: [Where it appears]

**Usage**:
\`\`\`tsx
<ComponentName /> // Icon is automatically included
\`\`\`

**Notes**: This icon is automatically managed by the PatternFly component. No explicit import needed.

---

## Summary

Total icons identified: [count]

**All imports** (copy-paste ready):
\`\`\`typescript
import {
  IconName1,
  IconName2,
  IconName3,
} from '@patternfly/react-icons';
\`\`\`

## Accessibility Reminders

- [ ] All interactive icons have accessible labels (aria-label or visible text)
- [ ] Decorative icons have `aria-hidden="true"`
- [ ] Status icons use appropriate ARIA roles or live regions
- [ ] Icon colors meet WCAG contrast requirements

## PatternFly Resources

- [Icons Documentation](https://www.patternfly.org/components/icons/)
- [Design Guidelines](https://www.patternfly.org/design-guidelines/styles/icons/)
- [@patternfly/react-icons Package](https://www.npmjs.com/package/@patternfly/react-icons)
```

## Edge Cases

### Multiple possible matches
If multiple icons could match:
1. List all candidates with confidence levels
2. Show visual differences between options
3. Recommend based on:
   - Common usage in PatternFly applications
   - Semantic meaning in context
   - Visual similarity
   - PatternFly design guidelines

### Low-quality or ambiguous image
If the image quality makes identification difficult:
1. Request a higher-resolution screenshot
2. Provide best guesses with low confidence ratings
3. Suggest opening the Figma design directly for clarity

## Examples

### Example 1: Brief Output

**Input**: Screenshot of a modal with a red circle-X icon in the top-right corner

**Output (Brief format)**:

```markdown
# Figma Icon Analysis - Brief

## Icons to Use

**Modal close button (top-right corner)**
\`\`\`tsx
<TimesCircleIcon />
\`\`\`

---

**Import statements**:
\`\`\`typescript
import { TimesCircleIcon } from '@patternfly/react-icons';
\`\`\`
```

### Example 2: Detailed Output

**Input**: Screenshot of a modal with a red circle-X icon in the top-right corner

**Output (Detailed format)**:

```markdown
### Close Button Icon
**Visual Description**: Red circle with an X inside, located in top-right corner of modal
**PatternFly Match**: `TimesCircleIcon` (confidence: High)
**Location in Design**: Modal header, close button

**Import**:
\`\`\`typescript
import { TimesCircleIcon } from '@patternfly/react-icons';
\`\`\`

**Usage**:
\`\`\`tsx
<Button
  variant="plain"
  aria-label="Close"
  onClick={onClose}
>
  <TimesCircleIcon aria-hidden="true" />
</Button>
\`\`\`

**Notes**: This is a standard modal close button. The icon should be placed inside a Button component with variant="plain" and an accessible label since the icon alone doesn't convey meaning to screen readers.

## PatternFly Icon Component

For status icons (success, danger, warning, info), use the PatternFly `Icon` component instead of applying colors directly:

```tsx
import { Icon } from '@patternfly/react-core';
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, InfoCircleIcon } from '@patternfly/react-icons';

// Success (green)
<Icon status="success"><CheckCircleIcon /></Icon>

// Danger/Error (red)
<Icon status="danger"><ExclamationCircleIcon /></Icon>

// Warning (orange)
<Icon status="warning"><ExclamationTriangleIcon /></Icon>

// Info (blue)
<Icon status="info"><InfoCircleIcon /></Icon>

// Custom color (when status doesn't apply)
<Icon><SomeIcon color="var(--pf-v6-global--Color--100)" /></Icon>
```

**Available status values**: `success`, `danger`, `warning`, `info`, `custom`

This pattern ensures consistent coloring across the application and makes status semantics explicit in the code.
```

## Success Criteria

- Image successfully analyzed and all visible icons identified
- Each icon matched to the correct PatternFly icon name
- User preference for output format (brief vs. detailed) collected and applied
- User preference for icon scope (explicit imports only vs. including component-managed) collected when relevant
- Import statements provided for all identified icons
- **Brief format**: Concise list of icon components with minimal explanation
- **Detailed format**: Full usage examples, accessibility considerations, and contextual notes
- Alternative suggestions provided when exact matches aren't available

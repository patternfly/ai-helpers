---
name: pf-figma-design
description: Build PatternFly screens in Figma using the PF design kit. Use when the user asks to "create a PatternFly page in Figma", "build a PF dashboard", "design a PF layout in Figma", "create a screen with PatternFly components", or any task involving constructing Figma designs with the PatternFly component library.
---

# PatternFly Figma Design

Build PatternFly application screens in Figma using the official PatternFly Design Kit components, variables, and styles.

## Prerequisites

This skill provides **PatternFly-specific rules** layered on top of two official Figma skills. You **MUST** load both before any `use_figma` call:

1. **figma-use** — API rules, critical gotchas, error recovery. Load this before every `use_figma` call.
2. **figma-generate-design** — Screen-building workflow: discover components via `search_design_system`, import them, compose layouts section-by-section.

Follow all rules from those skills. This skill adds PatternFly conventions on top.

### Required tools

- Figma MCP server must be connected
- Target Figma file must have the [PatternFly Design Kit](https://www.figma.com/community/file/1370151925110689873) enabled as a library
- If the PatternFly MCP (`@patternfly/patternfly-mcp`) is available, use it for current component props and examples

## Workflow

Follow the `figma-generate-design` workflow (Steps 1-6) with these PatternFly-specific additions at each step.

### Step 1: Understand the Screen (PatternFly additions)

Map every section of the target screen to PatternFly components:

| Screen region | PatternFly components |
|---|---|
| Application shell | Page, Masthead, PageSidebar, PageSection |
| Header bar | Masthead > MastheadMain > MastheadToggle + MastheadBrand; MastheadContent |
| Side navigation | PageSidebar > PageSidebarBody > Nav > NavList > NavItem |
| Content areas | PageSection (one per distinct content block) |
| Data views | Table, DataList, Card grid |
| Filters / actions | Toolbar > ToolbarContent > ToolbarItem |
| Overlays | Modal (ModalHeader, ModalBody, ModalFooter), Drawer |
| Empty views | EmptyState |

### Step 2: Discover PF Design System Assets

#### 2a: Discover PatternFly components

Search for PF components using these terms with `search_design_system` (`includeComponents: true`):

**Layout:** "Page", "Masthead", "Sidebar"
**Navigation:** "Nav", "Tabs", "Breadcrumb"
**Content:** "Card", "Table", "DataList", "DescriptionList", "EmptyState"
**Actions:** "Button", "Toolbar", "Dropdown", "Menu", "Select"
**Feedback:** "Alert", "Modal", "Drawer", "Popover", "Tooltip"
**Forms:** "TextInput", "FormGroup", "Checkbox", "Radio", "Switch", "Slider"
**Indicators:** "Label", "Badge", "Spinner", "Progress", "Icon"

If the target file already has PatternFly screens, inspect existing instances first (preferred over `search_design_system` — see `figma-generate-design` Step 2a).

#### 2b: Discover PatternFly variables

Search for PF variables with `search_design_system` (`includeVariables: true`):

**Backgrounds:** "global/background", "background/color/primary", "background/color/secondary"
**Text:** "global/text/color", "text/color/regular", "text/color/subtle", "text/color/link"
**Borders:** "global/border/color", "border/width", "border/radius"
**Spacing:** "global/spacer", "spacer/100", "spacer/200", "spacer/300", "spacer/400"
**Icons:** "global/icon/color", "icon/size"
**Status:** "color/status/danger", "color/status/success", "color/status/warning", "color/status/info"
**Shadows:** "box-shadow"

See [references/pf-token-guide.md](references/pf-token-guide.md) for the full token reference and binding rules.

#### 2c: Discover PatternFly styles

Search for text and effect styles with `search_design_system` (`includeStyles: true`):

**Text styles:** "heading", "body", "title", "display", "code"
**Effect styles:** "shadow", "elevation"

### Step 3: Create the Page Wrapper (PatternFly additions)

Name the wrapper frame after the screen purpose (e.g., "Dashboard", "Settings", "User List"). Set it to:
- Width: `1440` (standard PF desktop breakpoint)
- Layout: `VERTICAL`, `HUG` height
- Background: bind to the PF `global/background/color/primary/default` variable

### Step 4: Build Sections (PatternFly rules)

When building each section, follow PatternFly component hierarchy rules. **This is the most important PatternFly-specific guidance.**

Read [references/pf-component-hierarchy.md](references/pf-component-hierarchy.md) before composing any layout.

#### Naming conventions

Name every frame/layer to match its PatternFly component:

| Frame name | Maps to |
|---|---|
| `Page` | Root application frame |
| `Masthead` | Application header |
| `MastheadMain` | Left section (toggle + brand) |
| `MastheadContent` | Right section (toolbar, user menu) |
| `PageSidebar` | Sidebar container |
| `PageSidebarBody` | Sidebar content area |
| `PageSection` | Each content section |
| `Card` | Card container |
| `CardHeader` | Card title area |
| `CardBody` | Card content area |
| `CardFooter` | Card actions area |
| `Toolbar` | Action/filter bar |
| `ToolbarContent` | Toolbar layout wrapper |
| `ToolbarItem` | Individual toolbar control |
| `Nav` | Navigation component |
| `NavList` | Navigation list |
| `NavItem` | Navigation link |
| `Modal` | Dialog overlay |
| `ModalHeader` | Dialog title |
| `ModalBody` | Dialog content |
| `ModalFooter` | Dialog actions |

#### Token binding rules

Never hardcode hex colors or pixel spacing. Bind PatternFly variables:

- **Backgrounds:** use `setBoundVariable` or `setBoundVariableForPaint` with PF background variables
- **Text colors:** bind PF text color variables to text fills
- **Spacing:** bind PF spacer variables to padding and gap properties
- **Border radius:** bind PF border radius variables
- **Shadows:** apply PF effect styles for box-shadow

See [references/pf-token-guide.md](references/pf-token-guide.md) for the complete mapping.

#### Variant selection

When creating component instances, select the correct variant. PatternFly components have specific variant naming conventions.

See [references/pf-variant-guide.md](references/pf-variant-guide.md) for variant selection guidance per component.

### Step 5: Validate (PatternFly additions)

After composing each section, verify:

1. **Hierarchy** — Component nesting matches PatternFly rules (no Card content without CardBody, no NavItem without NavList, etc.)
2. **Tokens** — No hardcoded colors; all fills, spacing, and radii use PF variables
3. **Variants** — Correct component variant selected (e.g., primary vs secondary button)
4. **Naming** — All frames named after their PatternFly component counterparts
5. **Accessibility** — Icon-only buttons have text labels, tables have headers, navigation has aria-labels

## Common PatternFly Page Patterns

### Standard application shell

Build in this order:

1. **Page wrapper** — vertical auto-layout, 1440px wide
2. **Masthead** — horizontal auto-layout, FILL width
   - MastheadMain (toggle + brand logo)
   - MastheadContent (toolbar with user menu)
3. **Body area** — horizontal auto-layout, FILL width
   - PageSidebar (fixed width ~250px, vertical auto-layout)
     - PageSidebarBody (Nav > NavList > NavItems)
   - Main content (vertical auto-layout, FILL width)
     - PageSection (breadcrumb)
     - PageSection (page title)
     - PageSection (main content, FILL height)

### Dashboard layout

After the application shell, fill the main PageSection with:
- Toolbar (filters, view toggles)
- Card grid (use auto-layout with wrap, gap bound to PF spacer)

### Data table view

After the application shell, fill the main PageSection with:
- Toolbar (search, filters, pagination)
- Table (Thead + Tbody rows)
- Or DataList for non-tabular data

### Detail / settings page

After the application shell, fill the main PageSection with:
- Tabs component for section switching
- DescriptionList for key-value display
- Card groups for related settings

## Reference Files

| File | When to read |
|---|---|
| [pf-component-hierarchy.md](references/pf-component-hierarchy.md) | Before composing any PF layout — nesting rules for all major component families |
| [pf-token-guide.md](references/pf-token-guide.md) | Before binding any color, spacing, or typography — PF variable conventions and mappings |
| [pf-variant-guide.md](references/pf-variant-guide.md) | Before selecting component variants — correct variant names and when to use each |

---
name: pf-figma-design
description: Build PatternFly screens in Figma using the PF design kit. Use when the user asks to "create a PatternFly page in Figma", "build a PF dashboard", "design a PF layout in Figma", "create a screen with PatternFly components", or any task involving constructing Figma designs with the PatternFly component library.
---

# PatternFly Figma Design

Build PatternFly application screens in Figma using the official PatternFly Design Kit and Patterns & Extensions libraries — components, variables, and styles.

## Prerequisites

**Load `figma-use` before every `use_figma` call.** It contains critical API rules (color ranges, font loading, error recovery) that apply to every script.

Always pass `skillNames: "pf-figma-design"` when calling `use_figma`.

### Required tools

- Figma MCP server must be connected
- Target Figma file must have both PatternFly libraries enabled:
  - [PatternFly 6: Components](https://www.figma.com/design/VMEX8Xg2nzhBX8rfBx53jp/PatternFly-6--Components) — core UI components
  - [PatternFly 6: Patterns & Extensions](https://www.figma.com/design/MSr6kVEOuAxmPOkjg7x8PO/PatternFly-6--Patterns---Extensions) — higher-level patterns
- If the PatternFly MCP (`@patternfly/patternfly-mcp`) is available, use it for current component props and examples

## Core Token Set

Always discover these tokens — they cover 90% of PF screens. Search with `search_design_system` (`includeVariables: true`).

| Purpose | Search term | Bind to |
|---|---|---|
| Page background | `"global/background/color/primary"` | Page frame fills |
| Content background | `"global/background/color/secondary"` | Card, sidebar fills |
| Numbered backgrounds | `"global/background/color/100"` through `"700"` | Contrast areas |
| Body text | `"global/text/color/regular"` | All body text |
| Subtle text | `"global/text/color/subtle"` | Secondary labels, descriptions |
| Link text | `"global/text/color/link"` | Links, action text |
| Small spacing (4px) | `"global/spacer/100"` | Tight gaps |
| Medium spacing (8px) | `"global/spacer/200"` | Control gaps, small padding |
| Standard spacing (16px) | `"global/spacer/300"` | Standard padding, section gaps |
| Large spacing (24px) | `"global/spacer/400"` | Section margins, card gaps |
| XL spacing (32px) | `"global/spacer/500"` | Major section separation |
| Default border | `"global/border/color/default"` | Card, divider borders |
| Small radius (4px) | `"global/border/radius/100"` | Cards, inputs |
| Medium radius (6px) | `"global/border/radius/200"` | Larger containers |
| Border width (1px) | `"global/border/width/100"` | Standard borders |

**Never hardcode hex colors or pixel spacing.** Use `setBoundVariable` for spacing/radii and `setBoundVariableForPaint` for colors. Apply text styles with `node.textStyleId` and effect styles with `node.effectStyleId`.

For status colors, on-context foreground pairing, font tokens, or the full token catalog, see [references/pf-token-guide.md](references/pf-token-guide.md).

## Core Hierarchy Rules

These 4 component hierarchies cover the app shell used by nearly every PF screen. Violating them produces layouts that break PF spacing and responsive behavior.

### Page Layout

```
Page (root frame, vertical auto-layout)
├── Masthead (horizontal auto-layout, FILL width)
│   ├── MastheadMain (horizontal auto-layout)
│   │   ├── MastheadToggle (hamburger button)
│   │   └── MastheadBrand > MastheadLogo
│   └── MastheadContent (horizontal auto-layout, FILL width)
│       └── Toolbar (search, notifications, user menu)
├── Body (horizontal auto-layout, FILL width)
│   ├── PageSidebar (fixed width ~250px, vertical auto-layout)
│   │   └── PageSidebarBody (vertical auto-layout, FILL height)
│   │       └── Nav
│   └── Main content (vertical auto-layout, FILL width)
│       ├── PageSection [breadcrumb] (optional)
│       ├── PageSection [page title]
│       └── PageSection [content] (FILL height)
```

**Critical rules:**
- MastheadBrand goes inside MastheadMain, never directly in Masthead
- Nav goes inside PageSidebarBody inside PageSidebar, never directly in PageSidebar
- Every content block in the main area must be wrapped in a PageSection

### Card

```
Card (vertical auto-layout, border + radius)
├── CardHeader (horizontal auto-layout — title, actions)
│   └── CardTitle (text)
├── CardBody (vertical auto-layout — content, provides padding)
└── CardFooter (horizontal auto-layout — actions)
```

Never place content directly inside Card — always use CardHeader, CardBody, or CardFooter.

### Toolbar

```
Toolbar (horizontal auto-layout)
└── ToolbarContent (REQUIRED)
    ├── ToolbarGroup (optional, groups related items)
    │   └── ToolbarItem (wraps each control)
    ├── ToolbarItem (direct child also valid)
    └── ToolbarItem variant="pagination" (right-aligned)
```

Every control (button, input, select) must be wrapped in a ToolbarItem. Never place controls directly in ToolbarContent or Toolbar.

### Navigation

```
Nav (vertical auto-layout)
└── NavList (REQUIRED)
    ├── NavItem (link)
    ├── NavExpandable (collapsible group)
    │   └── NavItem (nested)
    └── NavGroup (titled section)
        └── NavItem
```

NavItems cannot go directly in Nav — they must be inside NavList.

For Modal, Drawer, EmptyState, Table, DataList, Tabs, Chatbot, Login, and other component hierarchies, see [references/pf-component-hierarchy.md](references/pf-component-hierarchy.md).

## Workflow

### Step 1: Understand the Screen

Before touching Figma:

1. Read relevant source files (if building from code) or clarify the target layout.
2. Identify major sections and map each to PatternFly components using the table below.
3. Determine which recipe (below) applies.

| Screen region | PatternFly components | Library |
|---|---|---|
| Application shell | Page, Masthead, PageSidebar, PageSection | Components |
| Header bar | Masthead > MastheadMain + MastheadContent | Components |
| Side navigation | PageSidebar > PageSidebarBody > Nav > NavList > NavItem | Components |
| Content areas | PageSection (one per distinct content block) | Components |
| Data views | Table, DataList, Card grid | Components |
| Filters / actions | Toolbar > ToolbarContent > ToolbarItem | Components |
| Overlays | Modal, Drawer | Components |
| Empty views | EmptyState | Components |
| Login / auth | Login page pattern | Patterns & Extensions |
| AI assistant | Chatbot pattern | Patterns & Extensions |
| Error pages | Error state patterns | Patterns & Extensions |
| Catalog views | Catalog pattern | Patterns & Extensions |

### Step 2: Discover Design System Assets

Run these `search_design_system` calls in parallel for the components and tokens your screen needs.

**Components** (`includeComponents: true`): Search for each PF component your screen uses. Common terms from the Components library: `"Page"`, `"Masthead"`, `"Sidebar"`, `"Nav"`, `"Card"`, `"Table"`, `"Toolbar"`, `"Button"`, `"Dropdown"`, `"Select"`, `"Modal"`, `"Alert"`, `"TextInput"`, `"FormGroup"`, `"Label"`, `"Badge"`, `"Tabs"`, `"EmptyState"`, `"Breadcrumb"`.

**Variables** (`includeVariables: true`): Search for the Core Token Set terms listed above.

**Styles** (`includeStyles: true`): Search `"heading"`, `"body"`, `"title"`, `"code"`, `"shadow"`.

**Shortcut — inspect existing screens:** If the target file already has PatternFly screens, inspect existing instances instead of searching. A single `use_figma` call walking an existing frame's instances gives an exact component map:

```js
const frame = figma.currentPage.findOne(n => n.name === "Existing Screen");
const uniqueSets = new Map();
frame.findAll(n => n.type === "INSTANCE").forEach(inst => {
  const mc = inst.mainComponent;
  const cs = mc?.parent?.type === "COMPONENT_SET" ? mc.parent : null;
  const key = cs ? cs.key : mc?.key;
  const name = cs ? cs.name : mc?.name;
  if (key && !uniqueSets.has(key)) {
    uniqueSets.set(key, { name, key, isSet: !!cs, sampleVariant: mc.name });
  }
});
return [...uniqueSets.values()];
```

**Include component properties** — create a temporary instance, read its `componentProperties` (and those of nested instances), then remove the temp instance. You need TEXT property keys for `setProperties()` overrides.

### Step 3: Create the Page Wrapper

Create the wrapper in its own `use_figma` call. Position it away from existing content:

```js
let maxX = 0;
for (const child of figma.currentPage.children) {
  maxX = Math.max(maxX, child.x + child.width);
}
const wrapper = figma.createFrame();
wrapper.name = "Dashboard"; // name after screen purpose
wrapper.layoutMode = "VERTICAL";
wrapper.primaryAxisAlignItems = "CENTER";
wrapper.counterAxisAlignItems = "CENTER";
wrapper.resize(1440, 100);
wrapper.layoutSizingHorizontal = "FIXED";
wrapper.layoutSizingVertical = "HUG";
wrapper.x = maxX + 200;
wrapper.y = 0;
// Bind PF background variable
const bgVar = await figma.variables.importVariableByKeyAsync("BG_KEY");
wrapper.fills = [figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', bgVar
)];
return { success: true, wrapperId: wrapper.id };
```

### Step 4: Build Sections Inside the Wrapper

Build one section per `use_figma` call. Fetch the wrapper by ID at the start of each script. Follow the recipe for your screen type (below).

**Critical rules:**
- **Do NOT** build sections as top-level children and reparent later — `appendChild()` across calls silently fails.
- Set `layoutSizingHorizontal = "FILL"` **after** appending to the wrapper.
- Return `createdNodeIds` from every call.
- Name every frame after its PatternFly component counterpart.
- Override placeholder text with `setProperties()` using the property keys from Step 2.
- Import components by key with `figma.importComponentSetByKeyAsync(key)`.
- Bind all colors via `setBoundVariableForPaint`, all spacing via `setBoundVariable`.

### Step 5: Validate

After each section, call `get_screenshot` on the section node ID (not just the full page — full-page screenshots hide issues at reduced resolution).

Check for:
1. **Hierarchy** — nesting matches PF rules (no Card content without CardBody, no NavItem without NavList, etc.)
2. **Tokens** — no hardcoded colors; all fills, spacing, and radii use PF variables
3. **Variants** — correct component variant selected (see [references/pf-variant-guide.md](references/pf-variant-guide.md) when unsure)
4. **Naming** — all frames named after their PF component counterparts
5. **Text** — no placeholder text remaining ("Title", "Heading", "Button")
6. **Clipping** — no cropped/clipped text from line heights or frame sizing
7. **Overlaps** — no overlapping elements from incorrect sizing or missing auto-layout

## Screen Recipes

Each recipe is self-contained. Follow the Workflow steps above, using the recipe to guide Step 2 (discovery) and Step 4 (building).

### Application Shell

The base for most PF screens. Build this first, then fill the main PageSection with content from another recipe.

**Components to discover:** `"Page"`, `"Masthead"`, `"Nav"`, `"Button"`, `"Toolbar"`

**Tokens to discover:** Core Token Set (above)

**Styles to discover:** `"heading"`, `"body"`

**Build order:**

1. **Page wrapper** — 1440px, VERTICAL, HUG, bg = `global/background/color/primary/default`
2. **Masthead** — HORIZONTAL, FILL width
   - MastheadMain → MastheadToggle + MastheadBrand > MastheadLogo
   - MastheadContent → Toolbar instance (user menu, notifications)
3. **Body** — HORIZONTAL, FILL width
   - PageSidebar (fixed ~250px, VERTICAL) → PageSidebarBody → Nav > NavList > NavItems
   - Main content (VERTICAL, FILL width)
     - PageSection [breadcrumb] (optional)
     - PageSection [page title] — heading text styled with PF heading text style
     - PageSection [content] — FILL height, this is where recipe-specific content goes

### Dashboard

Extends the Application Shell. Fill the main PageSection [content] with:

**Additional components:** `"Card"`, `"Toolbar"`, `"Select"`, `"Badge"`

**Build order (inside main PageSection):**

1. **Toolbar** → ToolbarContent → ToolbarItem (search) + ToolbarItem (filter dropdown) + ToolbarItem (view toggle)
2. **Card grid** — frame with HORIZONTAL auto-layout, `layoutWrap: "WRAP"`, gap = `global/spacer/400`
3. **Each Card** — FIXED width (calc from grid), Card > CardHeader (CardTitle) + CardBody (stat value + label)
4. Bind card backgrounds to `global/background/color/primary/default`, borders to `global/border/color/default`, radius to `global/border/radius/100`

### Data Table View

Extends the Application Shell. Fill the main PageSection [content] with:

**Additional components:** `"Table"`, `"Toolbar"`, `"Pagination"`, `"Select"`, `"TextInput"`, `"Button"`

**Build order (inside main PageSection):**

1. **Toolbar** → ToolbarContent → ToolbarItem (search TextInput) + ToolbarItem (filter Select) + ToolbarItem (bulk actions Button) + ToolbarItem (Pagination, right-aligned)
2. **Table** → Thead (Tr > Th cells for each column) + Tbody (Tr > Td cells per row)
3. Use compact table variant for data-dense views, striped for long tables

### Detail / Settings Page

Extends the Application Shell. Fill the main PageSection [content] with:

**Additional components:** `"Tabs"`, `"DescriptionList"`, `"Switch"`, `"Card"`, `"FormGroup"`

**Build order (inside main PageSection):**

1. **Tabs** — tab bar with tab labels for each section (e.g., General, Notifications, Security)
2. **Active tab panel** — VERTICAL auto-layout containing:
   - DescriptionList (DescriptionListGroup > DescriptionListTerm + DescriptionListDescription) for read-only key-value pairs
   - Cards with FormGroups for editable settings
   - Switch toggles for boolean options

### Login Page (Patterns & Extensions)

**Does NOT use the Application Shell.** Standalone full-page layout.

**Components to discover:** `"Login"` from Patterns & Extensions library

**Build order:**

1. **LoginPage** — full-viewport frame, HORIZONTAL layout
   - LoginBrandArea (left side — brand image or illustration)
   - LoginFormArea (right side)
     - LoginHeader (logo + title)
     - LoginForm → FormGroup (username TextInput) + FormGroup (password TextInput) + Button (primary, "Log in")
     - LoginFooter (forgot password link, SSO buttons, language selector)
2. Form fields must have visible labels (not placeholder-only)

See [references/pf-variant-guide.md](references/pf-variant-guide.md) for Login variant selection (simple, with-SSO, centered, etc.).

### Chatbot / AI Assistant (Patterns & Extensions)

Can be embedded in the Application Shell (inside a PageSection, Modal, or Drawer) or standalone.

**Components to discover:** `"Chatbot"`, `"Message"`, `"MessageBar"`, `"WelcomePrompt"` from Patterns & Extensions

**Build order:**

1. **Chatbot** — VERTICAL, fixed or responsive dimensions
   - ChatbotContent (FILL height) → ChatbotWelcomePrompt (for empty state) or MessageBox (scrollable, VERTICAL)
     - Message instances — user messages right-aligned, assistant messages left-aligned
   - ChatbotFooter (bottom) → MessageBar (input + send button)

See [references/pf-component-hierarchy.md](references/pf-component-hierarchy.md) for Chatbot nesting rules and display mode variants.

### Error / Empty Pages (Patterns & Extensions)

**Does NOT use the Application Shell.** Full-page centered layout.

**Components to discover:** `"Error"`, `"Not found"`, `"Access denied"` from Patterns & Extensions

| Pattern | Icon | Title | Primary action |
|---|---|---|---|
| Generic error | ExclamationCircleIcon (danger) | "Something went wrong" | "Return to homepage" |
| Not found (404) | PathMissingIcon | "Page not found" | "Return to homepage" |
| Access denied (403) | LockIcon | "Access denied" | "Return to homepage" |

These are pre-composed EmptyState patterns. Import the pattern component and override text.

### Catalog View (Patterns & Extensions)

Extends the Application Shell. Fill the main PageSection [content] with:

**Components to discover:** `"Catalog"` from Patterns & Extensions, `"Toolbar"`, `"Card"`

**Build order (inside main PageSection):**

1. **Toolbar** → ToolbarContent → ToolbarItem (search) + ToolbarItem (category filter) + ToolbarItem (grid/list toggle)
2. **Catalog grid** — HORIZONTAL wrap auto-layout, gap = `global/spacer/400`
3. **Each CatalogTile** (Card-based) → CardHeader (icon + title) + CardBody (description, tags) + CardFooter (action link)

## Responsive Breakpoints

| Name | Width | When to create |
|---|---|---|
| Desktop (default) | 1440 | Always — standard PF breakpoint |
| Tablet | 768 | When sidebar collapses or layout reflows |
| Mobile | 375 | When mobile experience is required |

**Responsive behavior:**
- **Tablet:** PageSidebar collapses (hidden or overlay via MastheadToggle), Body becomes single-column, card grid reduces columns
- **Mobile:** Masthead simplifies (brand + hamburger only), cards stack vertically, Toolbar wraps or collapses into dropdown

Create additional artboards at these widths when the user requests responsive designs.

## State Coverage

For each major content area, consider whether the user needs frames for:

| State | Component | When to include |
|---|---|---|
| **Default** | Populated with representative data | Always |
| **Empty** | EmptyState component (no data yet) | When content may be absent |
| **Loading** | Skeleton or Spinner placeholders | When data loads asynchronously |
| **Error** | Inline Alert or error EmptyState | When operations can fail |

Ask the user which states to include if not specified.

## Designer Handoff Checklist

After completing the screen, verify:

- [ ] All text layers use PF text styles (not raw font settings)
- [ ] No detached component instances — all instances linked to the PF library
- [ ] Frame names match PF component names (enables Code Connect mapping)
- [ ] Card grid uses auto-layout with wrap (not absolute positioning)
- [ ] All colors bound to PF variables (test: variable names visible in the right panel)
- [ ] All spacing bound to PF spacer variables
- [ ] Colors resolve correctly in dark mode variable set (if applicable)
- [ ] Interactive states present where needed (hover, active, disabled variants)
- [ ] No placeholder text remaining ("Title", "Heading", "Button")

## Reference Files

Read these **only** when building the specific components they cover. The core rules above handle 90% of screens.

| File | Read ONLY when |
|---|---|
| [pf-component-hierarchy.md](references/pf-component-hierarchy.md) | Building Modal, Drawer, EmptyState, Table, DataList, DescriptionList, Tabs, Chatbot, Login, or Catalog — components not covered by the core hierarchy rules above |
| [pf-token-guide.md](references/pf-token-guide.md) | Using status colors, on-context foreground pairing (`on-brand`, `on-danger`, etc.), font tokens, icon size tokens, or purpose-specific spacers — tokens not in the Core Token Set above |
| [pf-variant-guide.md](references/pf-variant-guide.md) | Choosing between Alert types, Table variants, EmptyState sizes, Modal sizes, Login variants, Label colors, Chatbot display modes, or Tab styles |

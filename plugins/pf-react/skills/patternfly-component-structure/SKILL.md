---
name: PatternFly Component Structure
description: Guide for correctly composing PatternFly React components with proper structural hierarchy. Use when building UIs with @patternfly/react-core or @patternfly/react-table, or when debugging layout issues like misaligned content, unexpected padding/margins, or broken spacing.
---

Guide for correctly composing PatternFly React components with proper
structural hierarchy. Use this skill when building UIs with
`@patternfly/react-core` or `@patternfly/react-table`, or when debugging
layout issues like misaligned content, unexpected padding/margins, or
broken spacing. This skill prevents the #1 cause of broken PatternFly
layouts: missing intermediate wrapper components.

## PatternFly MCP

If the `@patternfly/patternfly-mcp` MCP server is available, use it to
look up the latest component documentation, design guidelines, and coding
examples. This skill provides structural hierarchy rules; the MCP provides
live, up-to-date props documentation and interactive examples from
patternfly.org.

Use this skill's hierarchy rules first, then consult the MCP for:
- Detailed prop options and their current defaults
- The latest coding examples for specific component variants
- Design guidelines for when to use one component vs another
- Any new components or props not yet covered by this skill

## Why This Matters

PatternFly components rely on specific parent-child nesting to produce
correct layouts. Each wrapper component applies CSS classes that control
spacing, padding, alignment, and responsive behavior. When intermediate
wrappers are skipped, the layout breaks in subtle ways -- misaligned
content, missing padding, collapsed sections -- and the instinct is to
reach for custom CSS to "fix" it. That custom CSS is a bandaid over an
incorrect component tree.

**The rule is simple: if PatternFly provides a wrapper component, use it.**
The wrapper exists because the CSS depends on it.

## Required Component Hierarchies

### Page Layout

```
Page
├── masthead={<Masthead />}          (prop, not child)
├── sidebar={<PageSidebar />}        (prop, not child)
├── PageGroup                        (optional, groups related sections)
│   ├── PageBreadcrumb               (breadcrumb-specific section)
│   └── PageSection                  (content section)
└── PageSection                      (content section -- use this, not raw divs)
    └── [content]                    (auto-wrapped in PageBody)
```

- Always wrap page content in `PageSection` -- it controls padding, background color, and vertical fill
- `PageSection` auto-wraps children in `PageBody` (horizontal padding). Disable with `hasBodyWrapper={false}` only if you need multiple `PageBody` areas
- `PageSidebar` must contain `PageSidebarBody` -- without it, sidebar content has no spacing
- `masthead` and `sidebar` are **props** on `Page`, not children

```tsx
// WRONG
<Page masthead={header}>
  <div className="my-content">Hello</div>
</Page>

// CORRECT
<Page masthead={header}>
  <PageSection>Hello</PageSection>
</Page>
```

### Masthead

```
Masthead
├── MastheadMain
│   ├── MastheadToggle
│   │   └── PageToggleButton
│   └── MastheadBrand
│       └── MastheadLogo
└── MastheadContent                 (right-aligned content)
```

- `MastheadMain` groups toggle and brand -- skipping it breaks the flex layout
- `MastheadToggle` wraps the toggle button for correct sizing
- `MastheadLogo` needs `component="a"` if it should be a link

### Toolbar

```
Toolbar
└── ToolbarContent                   (REQUIRED)
    ├── ToolbarGroup                 (optional, for grouping)
    │   └── ToolbarItem              (REQUIRED around each control)
    ├── ToolbarItem                  (direct child also OK)
    ├── ToolbarToggleGroup           (for responsive collapsible filters)
    │   └── ToolbarGroup
    │       └── ToolbarFilter        (wraps filter controls + manages labels)
    └── ToolbarItem variant="pagination"
```

- `ToolbarContent` is **never optional** -- it creates the content section and provides context
- `ToolbarItem` wraps every individual control for proper spacing

```tsx
// WRONG
<Toolbar>
  <Button>Action</Button>
  <SearchInput />
</Toolbar>

// CORRECT
<Toolbar>
  <ToolbarContent>
    <ToolbarItem><Button>Action</Button></ToolbarItem>
    <ToolbarItem><SearchInput /></ToolbarItem>
  </ToolbarContent>
</Toolbar>
```

### Card

```
Card
├── CardHeader                       (for title, actions, expand toggle)
│   └── CardTitle
├── CardBody                         (content wrapper -- controls padding)
├── CardFooter                       (bottom section)
└── CardExpandableContent            (for expandable cards)
    ├── CardBody
    └── CardFooter
```

- `CardBody` provides padding -- without it, content is flush against card edges
- For expandable cards, toggled content goes in `CardExpandableContent`
- Multiple `CardBody` components are allowed for visually separated sections

### Modal

```
Modal
├── ModalHeader                      (title + optional description)
├── ModalBody                        (scrollable content area)
└── ModalFooter                      (action buttons)
```

- Provide `aria-labelledby` on Modal matching `labelId` on `ModalHeader`, or provide `aria-label`
- `onClose` on Modal is required for the close button to render
- `ModalBody` provides the scrollable content area

### Drawer

```
Drawer
└── DrawerContent panelContent={<DrawerPanelContent />}   (prop, not child)
    └── DrawerContentBody

DrawerPanelContent                     (passed as prop to DrawerContent)
├── DrawerHead
│   ├── [title content]
│   └── DrawerActions
│       └── DrawerCloseButton
├── DrawerPanelDescription             (optional)
└── DrawerPanelBody
```

- `DrawerPanelContent` is passed via the `panelContent` **prop** -- not as a child
- `DrawerContentBody` wraps the main content
- `DrawerCloseButton` must be inside `DrawerActions` inside `DrawerHead`

```tsx
// WRONG
<Drawer isExpanded={expanded}>
  <DrawerContent>
    <div>Main content</div>
    <DrawerPanelContent>Panel</DrawerPanelContent>
  </DrawerContent>
</Drawer>

// CORRECT
<Drawer isExpanded={expanded}>
  <DrawerContent panelContent={
    <DrawerPanelContent>
      <DrawerHead>
        Title
        <DrawerActions><DrawerCloseButton onClick={close} /></DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>Panel content</DrawerPanelBody>
    </DrawerPanelContent>
  }>
    <DrawerContentBody>Main content</DrawerContentBody>
  </DrawerContent>
</Drawer>
```

### Navigation

```
Nav
└── NavList                           (REQUIRED)
    ├── NavItem
    ├── NavExpandable                 (requires title prop)
    │   └── NavItem
    └── NavGroup                      (creates its own internal NavList)
        └── NavItem
```

- `NavList` is required -- it provides the `<ul>` and manages scroll buttons
- `NavItem` must be a child of `NavList` or `NavExpandable`, never directly under `Nav`
- `NavGroup` creates its own internal `NavList` -- do NOT wrap its children in another NavList

### Table

```
Table
├── Caption                          (optional, first child)
├── Thead
│   └── Tr
│       └── Th                       (requires accessible name)
└── Tbody                            (can have multiple)
    └── Tr
        └── Td                       (use dataLabel for mobile responsiveness)
```

- Always use `Thead` and `Tbody` wrappers -- `Tr` directly in `Table` breaks the structure
- Use `Th` in `Thead` rows and `Td` in `Tbody` rows -- don't mix them
- `Td` should have `dataLabel` prop for mobile-responsive layouts
- For expandable rows, wrap content in `ExpandableRowContent` inside a `Td` with `colSpan`

### DataList

```
DataList                              (requires aria-label)
└── DataListItem                      (requires aria-labelledby)
    ├── DataListItemRow               (always-visible row content)
    │   ├── DataListControl           (optional: toggle, drag, checkbox)
    │   ├── DataListItemCells          (REQUIRED cell container)
    │   │   └── DataListCell           (via dataListCells prop)
    │   └── DataListAction
    └── DataListContent               (expandable content)
```

- `DataListItemRow` is required -- it provides the flex layout
- `DataListItemCells` is required -- cells are passed via the `dataListCells` prop, not as direct children
- `DataListContent` is a sibling of `DataListItemRow`, not nested inside it

### Tabs

```
Tabs                                  (requires activeKey or defaultActiveKey)
└── Tab                               (uses title prop for label, children for panel)
```

- Tab labels go in the `title` prop, not as children -- children become the tab panel content
- Use `TabTitleIcon` and `TabTitleText` inside the `title` prop for proper styling
- Each `Tab` needs a unique `eventKey`

```tsx
// WRONG
<Tabs activeKey={key}>
  <Tab>Users</Tab>
</Tabs>

// CORRECT
<Tabs activeKey={key}>
  <Tab eventKey={0} title={<TabTitleText>Users</TabTitleText>}>
    Users panel content here
  </Tab>
</Tabs>
```

### EmptyState

```
EmptyState
├── EmptyStateHeader                  (or use titleText prop on EmptyState)
│   └── EmptyStateIcon
├── EmptyStateBody
└── EmptyStateFooter
    └── EmptyStateActions
```

- `EmptyStateIcon` must be inside `EmptyStateHeader`, not directly in `EmptyState`
- Don't mix direct props (`titleText`, `icon`) with explicit `EmptyStateHeader` children -- pick one

### DescriptionList

```
DescriptionList
└── DescriptionListGroup              (REQUIRED)
    ├── DescriptionListTerm
    └── DescriptionListDescription
```

- `DescriptionListGroup` is required -- putting terms or descriptions directly in `DescriptionList` breaks the layout

### Sidebar

```
Sidebar
├── SidebarPanel
└── SidebarContent
```

- Use `isPanelRight` on `Sidebar` to control panel position
- Width on `SidebarPanel` is a breakpoint object: `width={{ md: 'width_25' }}`

## When You See Custom CSS for Spacing

If you encounter custom CSS that adjusts padding, margins, or alignment on
PatternFly components, check whether a missing wrapper component is the
real cause:

- `padding`/`margin` overrides on page content -> missing `PageSection` or `PageBody`
- `gap` or spacing fixes on toolbar items -> missing `ToolbarContent` or `ToolbarItem`
- Alignment hacks on card content -> missing `CardBody`
- Spacing issues in navigation -> missing `NavList` wrapper
- Layout issues in description lists -> missing `DescriptionListGroup`
- Drawer panel not appearing -> `panelContent` passed as child instead of prop

Before adding custom CSS, verify the component tree matches the hierarchies
above. The fix is almost always structural, not stylistic.

## Detailed References

For comprehensive props, context details, and advanced patterns, see:

- `references/page-layout.md` -- Page, PageSection, PageGroup, PageSidebar, Masthead
- `references/containers.md` -- Card, Modal, Drawer, EmptyState, Sidebar
- `references/data-components.md` -- Table, DataList, DescriptionList
- `references/navigation-toolbar.md` -- Nav, Tabs, Toolbar

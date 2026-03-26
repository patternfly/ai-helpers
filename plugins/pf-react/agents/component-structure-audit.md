---
name: component-structure-audit
description: PatternFly React structural composition rules — required hierarchies, wrapper components, and props-vs-children patterns. Use when writing, reviewing, or refactoring PatternFly UI so layouts rely on correct trees, not custom CSS.
---

# PatternFly component structure

Enforce correct **parent-child composition**: PatternFly’s layout CSS targets named wrappers — use them; avoid raw divs or bare controls where a component expects **`ToolbarContent`**, **`NavList`**, **`CardBody`**, etc. For **repo scans and violation reports**, use `skills/patternfly-component-structure/SKILL.md`.

## Page and shell

- **`Page`**: Put main content in **`PageSection`** (or **`PageGroup`** with sections inside). Do not use arbitrary divs as direct children for primary content.
- **`masthead`** and **`sidebar`** are **`Page` props**, not children.
- **`PageSection`** auto-wraps children in **`PageBody`** for horizontal padding. Use **`hasBodyWrapper={false}`** only when you need multiple **`PageBody`** regions.
- **`PageSidebar`** must wrap its content in **`PageSidebarBody`**.

## Masthead

```
Masthead
├── MastheadMain
│   ├── MastheadToggle → PageToggleButton
│   └── MastheadBrand → MastheadLogo
└── MastheadContent
```

**MastheadMain** groups toggle and brand for flex layout. **MastheadLogo** uses **`component="a"`** when it should be a link.

## Toolbar

```
Toolbar
└── ToolbarContent   ← required
    └── ToolbarGroup / ToolbarItem / ToolbarToggleGroup …
```

**ToolbarContent** is never optional. Each control should sit in a **`ToolbarItem`** (directly or inside **`ToolbarGroup`**).

## Card

```
Card
├── CardHeader → CardTitle (optional)
├── CardBody      ← provides padding; don’t skip for main content
├── CardFooter
└── CardExpandableContent (expandable cards)
```

Expandable content belongs in **`CardExpandableContent`**, not only in **`CardBody`**.

## Modal

```
Modal
├── ModalHeader
├── ModalBody
└── ModalFooter
```

Set **`aria-labelledby`** to match **`ModalHeader`**’s label id, or **`aria-label`**. **`onClose`** is required for the close affordance.

## Drawer

- **`DrawerPanelContent`** is passed as **`panelContent`** on **`DrawerContent`**, not as a sibling child inside **`DrawerContent`**.
- Main column content goes in **`DrawerContentBody`**.
- **`DrawerCloseButton`** belongs under **`DrawerActions`** inside **`DrawerHead`**.

## Navigation

```
Nav
└── NavList   ← required
    ├── NavItem
    ├── NavExpandable → NavItem
    └── NavGroup → NavItem   ← NavGroup owns an internal NavList; don’t wrap its children in another NavList
```

## Table (`@patternfly/react-table`)

```
Table
├── Caption (optional, first)
├── Thead → Tr → Th
└── Tbody → Tr → Td
```

Never put **`Tr`** directly under **`Table`**. Use **`dataLabel`** on **`Td`** for responsive/stacked layouts. Expandable row content uses **`ExpandableRowContent`** inside **`Td`** with appropriate **`colSpan`**.

## DataList

- **`DataList`** needs **`aria-label`**; **`DataListItem`** needs **`aria-labelledby`**.
- **`DataListItemRow`** is required; cells go through **`DataListItemCells`** / **`dataListCells`**, not ad hoc structure.
- **`DataListContent`** is a **sibling** of **`DataListItemRow`**, not nested inside the row.

## Tabs

- Panel content is **`Tab`**’s **children**; the visible tab label is the **`title`** prop (often **`TabTitleText`** / **`TabTitleIcon`**), not raw text children.
- Each **`Tab`** needs a unique **`eventKey`**.

## EmptyState

**`EmptyStateIcon`** lives under **`EmptyStateHeader`**, not directly under **`EmptyState`**. Do not mix shortcut props (`titleText`, `icon`) with an explicit **`EmptyStateHeader`** tree — pick one approach.

## DescriptionList

**`DescriptionListGroup`** is required between **`DescriptionList`** and **`DescriptionListTerm`** / **`DescriptionListDescription`**.

## Sidebar

**`Sidebar`** composes **`SidebarPanel`** and **`SidebarContent`**. Panel width uses breakpoint objects (see **`references/containers.md`**).

## Deeper reference

Props tables, anti-patterns, and full examples: `skills/patternfly-component-structure/references/` (`page-layout.md`, `containers.md`, `data-components.md`, `navigation-toolbar.md`).

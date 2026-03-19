---
name: component-structure-audit
description: Audit PatternFly React component hierarchies for structural violations. Use when reviewing code for incorrect component nesting, missing wrapper components, or debugging layout issues caused by broken PatternFly component trees.
---

# PatternFly Component Structure Audit

Scan a codebase for PatternFly React component hierarchy violations -- missing wrappers, incorrect nesting, and props-vs-children mistakes that break layouts.

## How to Run

1. Ask the user which directory or files to audit. Default to the current working directory.
2. Search for files importing from `@patternfly/react-core` or `@patternfly/react-table`.
3. For each file, check for the violations listed below.
4. Report findings grouped by file, with line numbers and the specific violation.
5. If the user requests fixes, apply them. Only fix unambiguous structural issues -- if a fix would change behavior or requires design decisions, report it and ask.

## Violations to Detect

### Page Layout

- `<Page>` with direct content children that aren't `<PageSection>` or `<PageGroup>`
- `<PageSidebar>` without a `<PageSidebarBody>` child
- `<PageSection hasBodyWrapper={false}>` without explicit `<PageBody>` children (flag as informational)

### Masthead

- `<Masthead>` with `<MastheadBrand>` or `<MastheadToggle>` not wrapped in `<MastheadMain>`
- `<MastheadLogo>` used outside of `<MastheadBrand>`

### Toolbar

- `<Toolbar>` with children that aren't `<ToolbarContent>`
- Controls (Button, SearchInput, Select, etc.) directly inside `<ToolbarContent>` or `<ToolbarGroup>` without a `<ToolbarItem>` wrapper

### Card

- `<Card>` with content directly inside it (not wrapped in `<CardBody>`, `<CardHeader>`, or `<CardFooter>`)
- Expandable cards missing `<CardExpandableContent>`

### Modal

- `<Modal>` without `<ModalHeader>`, `<ModalBody>`, or `<ModalFooter>` children
- `<Modal>` missing `aria-labelledby` or `aria-label`

### Drawer

- `<DrawerPanelContent>` passed as a child of `<DrawerContent>` instead of via the `panelContent` prop
- `<DrawerContent>` without `<DrawerContentBody>`
- `<DrawerCloseButton>` not inside `<DrawerActions>` inside `<DrawerHead>`

### Navigation

- `<Nav>` with `<NavItem>` children not wrapped in `<NavList>`
- `<NavGroup>` children wrapped in an extra `<NavList>` (NavGroup creates its own)

### Table

- `<Table>` with `<Tr>` directly as children (missing `<Thead>` or `<Tbody>`)
- `<Th>` used inside `<Tbody>` rows or `<Td>` used inside `<Thead>` rows
- `<Td>` missing `dataLabel` prop (flag as warning, not error)

### DataList

- `<DataList>` missing `aria-label`
- `<DataListItem>` without `<DataListItemRow>`
- `<DataListItemRow>` without `<DataListItemCells>`
- `<DataListContent>` nested inside `<DataListItemRow>` instead of as a sibling

### Tabs

- `<Tab>` with label text as children instead of using the `title` prop
- `<Tab>` missing `eventKey`

### EmptyState

- `<EmptyStateIcon>` directly inside `<EmptyState>` instead of inside `<EmptyStateHeader>`
- Mixing `titleText`/`icon` props with explicit `<EmptyStateHeader>` children

### DescriptionList

- `<DescriptionListTerm>` or `<DescriptionListDescription>` directly inside `<DescriptionList>` without `<DescriptionListGroup>`

## Report Format

For each violation found, report:

```
[ERROR|WARN] file/path.tsx:42 - <Toolbar> has direct children that are not <ToolbarContent>
  Found: <Button> as direct child of <Toolbar>
  Fix: Wrap children in <ToolbarContent><ToolbarItem>...</ToolbarItem></ToolbarContent>
```

Use `ERROR` for violations that will break layout. Use `WARN` for best-practice issues (missing `dataLabel`, informational notes).

### Summary

After scanning, provide a summary:

```
Scanned: 23 files
Errors: 7 (across 4 files)
Warnings: 3 (across 2 files)
```

Group errors by violation type so the user can see patterns (e.g., "5 instances of missing ToolbarContent wrapper").

## Applying Fixes

When the user asks to fix violations:

1. Only fix structural issues where the correct hierarchy is unambiguous.
2. Preserve all existing props, event handlers, and content.
3. Do not reformat or refactor surrounding code.
4. Show the user what changed after applying fixes.

Fixes that are safe to auto-apply:
- Wrapping children in missing intermediate components (ToolbarContent, ToolbarItem, CardBody, NavList, DescriptionListGroup, etc.)
- Moving `<DrawerPanelContent>` from children to the `panelContent` prop
- Adding `<Thead>`/`<Tbody>` wrappers around table rows

Fixes that require user input:
- Adding missing `aria-label` or `aria-labelledby` (needs user-provided text)
- Choosing between `titleText` prop vs `<EmptyStateHeader>` children
- Restructuring complex nested components where intent is unclear

## Custom CSS Check

When a violation is found near custom CSS that adjusts spacing/padding/margins on PatternFly components, flag it:

```
[INFO] file/path.tsx:42 - Custom CSS spacing override detected near structural violation
  .my-toolbar-fix { padding: 8px } may be compensating for missing <ToolbarContent>
  Fixing the structure may make this CSS unnecessary
```

## References

This agent enforces the hierarchy rules defined in the PatternFly Component Structure skill. For detailed component hierarchies and prop documentation, see:

- `skills/patternfly-component-structure/SKILL.md`
- `skills/patternfly-component-structure/references/`

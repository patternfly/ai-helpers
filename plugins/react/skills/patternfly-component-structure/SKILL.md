---
name: patternfly-component-structure
description: Guide for PatternFly React component structure — audits, correct nesting, and layout debugging. Use when building with @patternfly/react-core or @patternfly/react-table, scanning code for hierarchy violations, or fixing spacing and alignment issues.
---

Use this skill when you need a **structural audit** of PatternFly usage, or when fixing layouts caused by skipped wrappers. For day-to-day composition rules while writing UI, use the **component-structure-audit** agent (react plugin) or your client’s equivalent subagent for PatternFly structure.

## PatternFly MCP

If `@patternfly/patternfly-mcp` is available, use it for current props, examples, and new components. This skill and the reference files define **nesting and wrapper rules**; the MCP fills in API details.

## Why structure matters

Layout CSS targets specific parent-child trees. Skipping wrappers (`ToolbarContent`, `CardBody`, `PageSection`, etc.) breaks spacing and alignment; custom CSS is usually papering over a wrong tree. **Use every structural wrapper PatternFly provides for that region.**

## Where the hierarchies live

Reference files hold trees, props notes, examples, and anti-patterns — not duplicated here:

| Area | File |
|------|------|
| Page, PageSection, PageGroup, PageSidebar, Masthead | `references/page-layout.md` |
| Card, Modal, Drawer, EmptyState, Sidebar | `references/containers.md` |
| Table, DataList, DescriptionList | `references/data-components.md` |
| Nav, Tabs, Toolbar | `references/navigation-toolbar.md` |

Read the relevant file before suggesting structure for that family.

## Auditing component structure

### How to run

1. Ask the user which directory or files to audit. Default to the current working directory.
2. Search for files importing from `@patternfly/react-core` or `@patternfly/react-table`.
3. For each file, check for the violations below.
4. Report findings grouped by file, with line numbers and the specific violation.
5. If the user requests fixes, apply them. Only fix unambiguous structural issues — if a fix would change behavior or needs a design decision, report it and ask.

### Violations to detect

Use the same structural rules as the **component-structure-audit** agent; during a scan, flag the issues below. **Anti-pattern examples** live in the reference files for each family.

| Area | Flag |
|------|------|
| Page layout | Direct `<Page>` children that aren’t `<PageSection>` / `<PageGroup>`; `<PageSidebar>` without `<PageSidebarBody>`; `<PageSection hasBodyWrapper={false}>` without `<PageBody>` (info) |
| Masthead | `<MastheadBrand>` / `<MastheadToggle>` not under `<MastheadMain>`; `<MastheadLogo>` outside `<MastheadBrand>` |
| Toolbar | `<Toolbar>` children aren’t `<ToolbarContent>`; controls in `<ToolbarContent>` / `<ToolbarGroup>` without `<ToolbarItem>` |
| Card | Raw content in `<Card>` outside `<CardBody>` / `<CardHeader>` / `<CardFooter>`; expandable card missing `<CardExpandableContent>` |
| Modal | Missing `<ModalHeader>` / `<ModalBody>` / `<ModalFooter>`; missing `aria-labelledby` or `aria-label` |
| Drawer | `<DrawerPanelContent>` as child of `<DrawerContent>` instead of `panelContent`; `<DrawerContent>` without `<DrawerContentBody>`; `<DrawerCloseButton>` not under `<DrawerActions>` in `<DrawerHead>` |
| Navigation | `<NavItem>` not under `<NavList>`; extra `<NavList>` inside `<NavGroup>` |
| Table | `<Tr>` direct under `<Table>`; `<Th>` in body rows or `<Td>` in header rows; `<Td>` without `dataLabel` (**WARN**) |
| DataList | Missing `aria-label` on `<DataList>`; item without `<DataListItemRow>`; row without `<DataListItemCells>`; `<DataListContent>` inside `<DataListItemRow>` (should be sibling) |
| Tabs | Tab label as children instead of `title`; `<Tab>` without `eventKey` |
| EmptyState | `<EmptyStateIcon>` directly under `<EmptyState>`; mixing `titleText`/`icon` with explicit `<EmptyStateHeader>` |
| DescriptionList | Terms/descriptions directly under `<DescriptionList>` without `<DescriptionListGroup>` |

### Report format

For each violation:

```
[ERROR|WARN] file/path.tsx:42 - <Toolbar> has direct children that are not <ToolbarContent>
  Found: <Button> as direct child of <Toolbar>
  Fix: Wrap children in <ToolbarContent><ToolbarItem>...</ToolbarItem></ToolbarContent>
```

Use `ERROR` for layout-breaking issues; `WARN` for best-practice gaps. End with a summary:

```
Scanned: 23 files
Errors: 7 (across 4 files)
Warnings: 3 (across 2 files)
```

Group by violation type so patterns are visible.

### Applying fixes

1. Only fix structure when the correct hierarchy is unambiguous.
2. Preserve props, handlers, and content.
3. Do not reformat unrelated code.
4. Summarize what changed.

**Usually safe:** Wrapping in missing intermediates (`ToolbarContent`, `ToolbarItem`, `CardBody`, `NavList`, `DescriptionListGroup`, …); moving `DrawerPanelContent` to `panelContent`; adding `<Thead>` / `<Tbody>`.

**Needs user input:** New `aria-label` / `aria-labelledby` text; choosing `titleText` vs `<EmptyStateHeader>`; unclear nested intent.

### Custom CSS

**During an audit:** If spacing or padding overrides sit next to a structural issue, add an info line, e.g.:

```
[INFO] file/path.tsx:42 - Custom CSS spacing override near structural violation
  .my-toolbar-fix { padding: 8px } may compensate for missing <ToolbarContent>
```

**Before suggesting new overrides:** Map the symptom to a missing wrapper when possible — page content → `PageSection` / `PageBody`; toolbar → `ToolbarContent` / `ToolbarItem`; card → `CardBody`; nav → `NavList`; description list → `DescriptionListGroup`; drawer panel → `panelContent` prop (see reference files for full trees).

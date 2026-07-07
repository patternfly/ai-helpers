---
name: pf-react-breaking-changes
description: >-
  Scan code for @patternfly/react-* API breaking changes and produce a markdown
  report. Use when upgrading PatternFly React versions, auditing component API
  usage, or checking for removed props, renamed components, or import path changes.
disable-model-invocation: true
---

# PF React Breaking Changes

Identify **@patternfly/react-* API breaking changes** in a codebase and deliver a markdown report. Do not include CSS class migrations, `@patternfly/patternfly` changes, or non-React packages (for example `@patternfly/chatbot`).

For CSS class and token name migrations, use `pf-class-migration-scanner` instead.

## Scope

### In scope (report these)

Packages matching `@patternfly/react-*`, including:

- `@patternfly/react-core`, `@patternfly/react-table`, `@patternfly/react-charts`
- `@patternfly/react-component-groups`, `@patternfly/react-drag-drop`, `@patternfly/react-tokens`
- Other `@patternfly/react-*` extension packages

Breaking change types:

| Category | Examples |
|----------|----------|
| Removed or deprecated components | `Chip` → `Label`, deprecated `Modal` import path |
| Renamed components or subcomponents | `Text` → `Content`, `KebabToggle` → `MenuToggle` |
| Removed, renamed, or retyped props | `isActive` removed, `isDisabled` → behavior change |
| Import or export path changes | `@patternfly/react-charts` → `@patternfly/react-charts/victory` |
| Composition or API structure changes | `EmptyStateHeader` no longer exported; new required wrappers |
| Renamed TypeScript types or enums | `SplitButtonOptions` deleted, enum value removed |
| Hook or render-prop signature changes | Callback arity or argument shape changed |

### Out of scope (do not report)

- PatternFly CSS classes (`pf-v5-*`, `pf-c-*`, `pf-v6-u-*`, etc.)
- CSS custom properties in stylesheets (unless imported from `@patternfly/react-tokens`)
- `@patternfly/patternfly`, `@patternfly/chatbot`, `@patternfly/patternfly-mcp`
- App-level refactors unrelated to PatternFly API changes
- Purely visual/CSS override breakage without a React API change

## Workflow

### 1. Establish context

Confirm with the user (or infer from `package.json` / git diff):

- **Scan path** — directory or files (default: project `src/`)
- **From version** — current PatternFly React version(s)
- **To version** — target version (for example PF5 → PF6, or `6.2.0` → `6.3.0`)
- **Packages** — which `@patternfly/react-*` packages are in use

Read `package.json` (and lockfile if needed) for installed `@patternfly/react-*` versions.

### 2. Inventory PatternFly React usage

Search the scan path for imports and API usage:

```bash
rg "@patternfly/react-" --glob "*.{ts,tsx,js,jsx}" <scan-path>
rg "from ['\"]@patternfly/react-" --glob "*.{ts,tsx,js,jsx}" <scan-path>
```

Build a list of:

- Packages imported
- Components, hooks, types, and enums used
- Props passed to PatternFly components (focus on props known to break between versions)

Group by file for cross-referencing.

### 3. Load authoritative breaking changes

Use the **PatternFly MCP server** before guessing:

1. `searchPatternFlyDocs` with queries like `upgrade`, `upgradeguide`, `release notes`, or specific component names.
2. `usePatternFlyDocs` for:
   - `upgradeguide` — PF6 upgrade guide and codemod rule list
   - Release notes for the target version range
   - Component docs/schemas for removed props or renamed exports

If the PatternFly MCP server is unavailable, continue without stalling: reference the [pf-codemods README](https://github.com/patternfly/pf-codemods) rule list and the [PatternFly upgrade guide](https://www.patternfly.org/get-started/upgrade/) directly, and check GitHub release notes for the target version range.

For **PF5 → PF6**, also reference the [pf-codemods README](https://github.com/patternfly/pf-codemods) rule list — each rule maps to a documented breaking change with PR links.

For **minor/patch upgrades**, check the target release notes and GitHub PRs for `@patternfly/react-core` and related packages.

### 4. Optional — validate with pf-codemods

When upgrading to PF6 (or when the user asks for machine verification), run a **dry run** (no `--fix`):

```bash
npx @patternfly/pf-codemods@latest --v6 <scan-path>
```

Use codemod output to supplement MCP findings. Codemod hits are **in scope** because they flag React API breaking changes. Do not auto-fix unless the user requests it.

### 5. Cross-reference codebase

For each known breaking change in the version range:

1. Search the inventory for affected components, props, imports, or types.
2. Record **file path**, **line number**, **current usage**, and **required change**.
3. Assign **severity**:
   - **Critical** — build/runtime failure (removed export, removed required prop replacement, invalid import)
   - **High** — deprecated API with recommended replacement; behavior change likely
   - **Medium** — deprecated but still works via `@patternfly/react-core/deprecated`; manual follow-up advised

4. Assign **confidence**:
   - **high** — direct match (import of removed component, use of removed prop name)
   - **medium** — usage pattern likely affected (composition change, markup change affecting tests)
   - **low** — possible impact; note for manual review

Do not invent breaking changes. If MCP/docs do not document a change for the stated version range, omit it or mark as "unverified — manual review".

### 6. Generate the markdown report

Write the report to a file the user can share (default: `pf-react-breaking-changes-report.md` in the project root unless the user specifies otherwise).

Use the template in [references/report-template.md](references/report-template.md).

Present the report to the user and summarize the highest-severity items.

## Detection patterns

When MCP/docs identify a breaking change, search the codebase with targeted patterns.

The examples below use **PF5 → PF6** component and prop names (`Chip`, `KebabToggle`, `Tile`). For minor/patch upgrades (for example `6.2.0` → `6.3.0`), derive search patterns from the breaking changes documented in release notes — do not blindly search for these PF5→PF6 names.

```bash
# Removed or deprecated components
rg "\bChip\b|\bKebabToggle\b|\bTile\b" --glob "*.{ts,tsx}" <scan-path>

# Renamed components
rg "\bText\b.*@patternfly/react-core|\bContentHeader\b" --glob "*.{ts,tsx}" <scan-path>

# Removed props (examples — extend per version docs)
rg "isActive|isHidden|hasNoPadding|backgroundColor|leftBorderVariant" --glob "*.{ts,tsx}" <scan-path>

# Import path changes
rg "from ['\"]@patternfly/react-charts['\"]" --glob "*.{ts,tsx}" <scan-path>
rg "from ['\"]@patternfly/react-core/deprecated['\"]" --glob "*.{ts,tsx}" <scan-path>

# React tokens
rg "@patternfly/react-tokens" --glob "*.{ts,tsx}" <scan-path>
```

Adapt patterns to the breaking changes documented for the user's version range — do not rely on this fixed list alone.

## Related tools

| Tool | When to use |
|------|-------------|
| `pf-class-migration-scanner` | CSS class and legacy token names in markup/styles |
| `pf-import-checker` | Invalid import paths after upgrade |
| `pf-codemods` | Automated fixes for many PF5 → PF6 React API changes |
| PatternFly MCP | Authoritative upgrade guide, release notes, component schemas |

## Quality checklist

Before delivering the report:

- [ ] Every finding references an `@patternfly/react-*` API change
- [ ] No CSS-only or `@patternfly/patternfly` findings included
- [ ] Each finding has file location, current code, migration guidance, severity, and confidence
- [ ] Version range and scan scope are documented in the report header
- [ ] Summary counts match the detailed findings

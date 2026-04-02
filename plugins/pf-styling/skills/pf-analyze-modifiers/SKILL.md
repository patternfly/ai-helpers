---
name: pf-analyze-modifiers
description: Find, list, and summarize PatternFly component modifiers (pf-m- classes) across the codebase. Use when analyzing component styling patterns, documenting modifier usage, or auditing CSS consistency.
---

# Analyze Modifiers

Discover, analyze, and document PatternFly modifier classes (`pf-m-*`) across component SCSS files. Search the codebase for modifier patterns, calculate usage statistics, and produce organized Markdown reports.

## Input

The user will specify a scope: all components (default), a specific component, a specific modifier, or a directory. If no scope is given, analyze all components.

## Output

Write a Markdown file with:

### Summary
- Total unique modifiers found
- Total components analyzed
- Top 5 most frequently used modifiers (with count)
- Top 5 components with the most modifiers (with count)

### Modifier Listings

**Default: By Modifier (Alphabetical)**
```markdown
## pf-m-{modifier-name}
- Component1
- Component2
```

**Alternative: By Component**
```markdown
## Component Name
- pf-m-modifier1
- pf-m-modifier2
```

### File naming
- `modifiers-listing.md` for complete listings
- `{component-name}-modifiers.md` for component-specific analysis
- `{modifier-name}-usage.md` for modifier-specific analysis

## Usage Examples

### Analyze all modifiers
```text
User: /pf-styling:pf-analyze-modifiers
```

### Analyze specific component
```text
User: /pf-styling:pf-analyze-modifiers for the Button component
```

### Find modifier usage
```text
User: /pf-styling:pf-analyze-modifiers find where pf-m-disabled is used
```

### Compare modifiers
```text
User: /pf-styling:pf-analyze-modifiers compare pf-m-expanded and pf-m-collapsed
```

## Modifier Categories Reference

### State
pf-m-disabled, pf-m-active, pf-m-current, pf-m-selected, pf-m-hover, pf-m-focus

### Size
pf-m-sm, pf-m-md, pf-m-lg, pf-m-xl, pf-m-2xl, pf-m-compact

### Layout
pf-m-vertical, pf-m-horizontal, pf-m-inline, pf-m-block, pf-m-grid

### Visual
pf-m-plain, pf-m-bordered, pf-m-raised, pf-m-filled, pf-m-outline

### Color
pf-m-red, pf-m-blue, pf-m-green, pf-m-orange, pf-m-purple, pf-m-teal, pf-m-yellow

### Responsive
pf-m-{base}-on-sm, pf-m-{base}-on-md, pf-m-{base}-on-lg, pf-m-{base}-on-xl, pf-m-{base}-on-2xl

### Semantic/Status
pf-m-success, pf-m-warning, pf-m-danger, pf-m-info, pf-m-custom

## Notes

- Some components have multiple SCSS files (e.g., Table: table.scss, table-grid.scss, table-tree-view.scss) - consolidate under a single component name.
- Some modifiers use dynamic values (`pf-m-align-items-*`, `pf-m-width-*`, `pf-m-inset-*`) - list with asterisk notation.
- Include responsive variants, pseudo-state contexts, and element-specific modifiers (e.g., `pf-v6-c-component__item.pf-m-current`).

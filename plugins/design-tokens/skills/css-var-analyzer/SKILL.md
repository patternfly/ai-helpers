---
name: css-var-analyzer
description: Analyze CSS custom property usage, redefinitions, and naming patterns in PatternFly SCSS components. Use when auditing --pf- variables, debugging missing definitions, tracing SCSS variable cascades, or finding unused CSS custom properties.
---

# CSS Variable Analyzer

Analyze CSS variable usage, redefinitions, and naming patterns in PatternFly SCSS components.

## What It Analyzes

- **Variable redefinitions** - How variables cascade through modifiers, states, and nested selectors
- **Undefined variables** - Variables used but never defined within the component
- **Unused variables** - Variables defined but never referenced
- **Naming conventions** - Validates SCSS interpolation (`--#{$component}--property`) vs hardcoded names
- **Redefinition chains** - Complete cascade documentation for any variable

## Requirements

**Node.js** is required to run the analysis scripts.

```bash
command -v node >/dev/null 2>&1 || { echo "Error: This skill requires Node.js." >&2; exit 1; }
```

The skill expects a PatternFly project structure with components in `src/patternfly/components/`.

## Usage

### Basic analysis
```text
Analyze CSS variables for the tabs component
```

### Variable drill-down
```text
Show me the redefinition chain for the inset variable in tabs
```

### Modifier analysis
```text
Show me variables for the vertical modifier in tabs
```

## How It Works

The skill uses two Node.js scripts in `$CLAUDE_SKILL_DIR`:

1. **css-var-analyzer.js** - Parses SCSS files, extracts variable definitions/usages, builds redefinition chains, detects issues
2. **format-css-report.js** - Formats the analysis JSON into readable Markdown reports

The analyzer categorizes definitions by context: root (`@include pf-root`), modifier (`.pf-m-*`), state (`:hover`, `:focus`), media query, breakpoint, and nested selectors.

## Output

A Markdown report with:
- Summary statistics (total vars, redefined count/%, undefined, unused, naming violations)
- Issues section (undefined variables, unused variables, naming violations)
- Redefinition summary (top 15 most-redefined variables)
- For drill-downs: complete definition chain with file locations, contexts, and code snippets

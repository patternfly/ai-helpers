# CSS Variable Analyzer Skill

Analyzes CSS variable usage, redefinitions, and naming patterns in PatternFly SCSS components.

## Quick Start

Ask your AI assistant:

```
Analyze CSS variables for the tabs component
```

```
Show me the redefinition chain for the inset variable in tabs
```

```
Show me variables for the vertical modifier in tabs
```

## What It Analyzes

- ✅ Total variables defined
- ✅ Redefinition chains and cascade patterns
- ✅ Undefined variables (component-scoped)
- ✅ Unused variables
- ✅ Naming convention violations
- ✅ Modifier-specific variable overrides

## Files

- **SKILL.md** - Skill definition and instructions
- **css-var-analyzer.js** - SCSS parsing and analysis engine
- **format-css-report.js** - Markdown report formatter

## Requirements

- Node.js
- PatternFly project structure (`src/patternfly/components/`)
- SCSS files using PatternFly's variable interpolation pattern

## Example Output

The skill generates markdown reports showing:

- Summary statistics (total variables, redefinitions, issues)
- Detailed redefinition chains with context
- Code snippets with file paths and line numbers
- Modifier-specific variable lists

See SKILL.md for detailed documentation and examples.

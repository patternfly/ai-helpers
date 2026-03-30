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

**Node.js** - Required to run the analysis scripts.

- **Install:** `brew install node` (macOS) or visit [nodejs.org](https://nodejs.org/)
- **Verify:** `node --version` should print v14.0.0 or higher
- **Note:** The skill will display a helpful error message if Node.js is missing

**PatternFly project structure:**
- Components in `src/patternfly/components/`
- SCSS files using PatternFly's variable interpolation pattern

## Troubleshooting

### Error: "This skill requires Node.js"

Node.js is not installed or not in your PATH. Install it:

- **macOS:** `brew install node`
- **Linux:** See [package manager guide](https://nodejs.org/en/download/package-manager)
- **Windows:** Download from [nodejs.org](https://nodejs.org/en/download)

After installation, verify: `node --version`

## Example Output

The skill generates markdown reports showing:

- Summary statistics (total variables, redefinitions, issues)
- Detailed redefinition chains with context
- Code snippets with file paths and line numbers
- Modifier-specific variable lists

See SKILL.md for detailed documentation and examples.

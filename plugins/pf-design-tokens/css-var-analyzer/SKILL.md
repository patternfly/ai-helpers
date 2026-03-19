# CSS Variable Analyzer

Analyze CSS variable usage, redefinitions, and naming patterns in PatternFly SCSS components.

## What This Skill Does

This skill helps you understand CSS variable patterns in PatternFly components by analyzing:

- **Variable redefinitions** - Track how variables cascade through modifiers, states, and nested selectors
- **Undefined variables** - Find variables used but never defined within the component
- **Unused variables** - Identify variables defined but never referenced
- **Naming conventions** - Validate that variables use SCSS interpolation (e.g., `--#{$tabs}--property`) instead of hardcoded names
- **Redefinition chains** - Show the complete cascade of how a variable is redefined across different contexts

## When to Use This Skill

Use this skill when you need to:

- Audit a component's CSS variable usage
- Understand complex redefinition patterns
- Find potential cleanup opportunities (unused variables)
- Debug missing variable definitions
- Analyze how modifiers affect variables
- Document variable cascading behavior

## How to Use

### Basic Analysis

Ask to analyze a component's CSS variables:

**Input**: "Analyze CSS variables for the tabs component"

**Output**: A summary report containing:
- Total variable count
- Redefinition statistics (count and percentage)
- List of undefined variables (component-scoped only)
- List of unused variables
- Naming violations (if any)
- Top 15 most-redefined variables

### Variable Drill-Down

Ask to see the redefinition chain for a specific variable:

**Input**: "Show me the redefinition chain for the inset variable in tabs"

**Output**: A detailed report showing:
- All locations where the variable is defined
- Context for each definition (root, modifier, state, nested)
- Code snippets with line numbers
- Usage examples showing where the variable is referenced

### Modifier Analysis

Ask to see all variables within a specific modifier:

**Input**: "Show me variables for the vertical modifier in tabs"

**Output**: A list of all variables defined or overridden in that modifier with values and locations.

## Implementation Details

The skill uses two Node.js scripts located in this directory:

1. **css-var-analyzer.js** - Parses SCSS files to extract variable definitions and usages
2. **format-css-report.js** - Formats the analysis into readable markdown reports

### Analysis Process

When invoked, the skill:

1. Locates the component's SCSS file(s) in `src/patternfly/components/`
2. Loads SCSS variable mappings from `sass-utilities/namespaces-components.scss` (e.g., `$tabs` → `pf-v6-c-tabs`)
3. Parses all variable definitions with context tracking (scope, selector, line number)
4. Parses all variable usages (in `var()` functions and direct references)
5. Builds redefinition chains by grouping definitions by variable name
6. Detects issues:
   - **Undefined**: Used but not defined in component files
   - **Unused**: Defined but never referenced
   - **Naming violations**: Hardcoded variable names instead of SCSS interpolation
7. Generates a formatted markdown report

### Context Tracking

The analyzer categorizes definitions by context:

- **Root**: Variables defined in `@include pf-root($component)`
- **Modifier**: Variables in `.pf-m-{modifier}` classes
- **State**: Variables in pseudo-classes (`:hover`, `:focus`, `:disabled`)
- **Media Query**: Variables within `@media` blocks
- **Breakpoint**: Variables in `@include pf-v6-apply-breakpoint($bp)` blocks
- **Nested**: Variables in complex combined selectors

### Pattern Detection

The analyzer recognizes these patterns:

- **SCSS interpolation**: `--#{$tabs}--inset`
- **BEM elements**: `--#{$tabs}__link--Color`
- **BEM modifiers**: `--#{$tabs}--m-vertical--Width`
- **Nested patterns**: `--#{$tabs}__item--m-current__link--Color`
- **Fallback values**: `var(--#{$tabs}--Width, initial)`

## Understanding the Output

### "Undefined" Variables

Variables shown as undefined are used in the component but not defined within its SCSS file(s). This typically includes:

- **Global theme tokens** (e.g., `--pf-t--global--spacer--sm`) - These are expected and defined in theme files
- **Component-specific variables** - These might indicate missing definitions

The report filters global tokens from the issues section.

### Redefinition Chains

Redefinitions show how CSS variables cascade:

1. **Base definition** - Initial value set in the root scope
2. **Modifier overrides** - How modifiers change the value
3. **State changes** - How states like `:hover` affect the value
4. **Nested overrides** - Complex cascading in combined selectors

This is normal CSS behavior and helps understand the cascade pattern.

### Naming Violations

PatternFly uses SCSS variable interpolation for consistency:

```scss
// ✓ Correct - uses interpolation
--#{$tabs}--inset: 0;

// ✗ Incorrect - hardcoded
--pf-v6-c-tabs--inset: 0;
```

## Example Output

### Summary Report

```markdown
# CSS Variable Analysis: tabs

## Summary
- **Total variables defined**: 174
- **Variables redefined**: 61 (35%)
- **Undefined variables**: 3
- **Unused variables**: 3
- **Naming violations**: 0

## Issues

### Undefined Variables
Variables used but never defined in this component:
- `--#{$tabs}--m-vertical--link-accent--Width` (used in tabs.scss:375)
- `--#{$tabs}--m-vertical--link-accent--Height` (used in tabs.scss:376)

### Unused Variables
Variables defined but never used:
- `--#{$tabs}--m-box__item--m-current--first-child__link--before--BorderInlineStartWidth` (defined in tabs.scss:256)

## Redefinition Summary
Top variables by redefinition count:
1. `--#{$tabs}--inset` - 10 redefinitions
2. `--#{$tabs}__link--BackgroundColor` - 8 redefinitions
...
```

### Redefinition Chain

```markdown
# Redefinition Chain: `--#{$tabs}--inset`

## Variable Information
- **Total definitions**: 10
- **First defined**: tabs.scss:22
- **Usage count**: 7

## Definition Chain

### 1. Base Definition (tabs.scss:22)
**Context**: root
**Selector**: `pf-root($tabs)`

```scss
--#{$tabs}--inset: 0;
```

### 2. Redefinition (tabs.scss:361)
**Context**: modifier
**Selector**: `pf-m-vertical`

```scss
--#{$tabs}--inset: var(--#{$tabs}--m-vertical--inset);
```
```

## Tone and Style

When presenting analysis results:

- Be concise and factual
- Highlight actionable issues (undefined/unused variables)
- Explain context when showing redefinition chains
- Use markdown formatting for clarity
- Include file paths and line numbers for easy navigation
- Distinguish between component-scoped issues and expected global token references

## Requirements

- Node.js runtime
- PatternFly project structure with components in `src/patternfly/components/`
- SCSS files using variable interpolation pattern

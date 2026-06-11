# Comparison: pf-design-token-check vs pf-raw-colors-scan

## Overview

`pf-design-token-check` is a comprehensive replacement for `pf-raw-colors-scan` with expanded scope and better token recommendations.

## Key Differences

### Scope

| Feature | pf-raw-colors-scan | pf-design-token-check |
|---------|-------------------|----------------------|
| Colors | ✅ | ✅ |
| Spacing | ❌ | ✅ |
| Typography | ❌ | ✅ |
| Shadows | ❌ | ✅ |
| Border Radius | ❌ | ✅ |

### Token Recommendations

**pf-raw-colors-scan:**
- Generic recommendation: "Replace with a semantic or primitive design token"
- No token hierarchy
- No specific token suggestions

**pf-design-token-check:**
- Shows full token hierarchy: Raw → Palette → Base → Semantic
- Always recommends semantic tokens when they exist
- Suggests semantic token names with PatternFly conventions when they don't exist
- Provides before/after examples for each violation

### File Support

Both support:
- CSS/SCSS
- CSS-in-JS
- React inline styles

### Output Format

**pf-raw-colors-scan:**
```
- File Name: Button.scss
- File Path: src/components/Button.scss
- Line Number: 42
- Property: background-color
- Raw Value: #c9190b
- Recommendation: "Replace with a semantic or primitive design token"
```

**pf-design-token-check:**
```
### 1. Button.scss

- File Path: `src/components/Button/Button.scss`
- Line Number: `42`
- Property: `background-color`
- Raw Value: `#c9190b`
- Token Hierarchy:
  1. Raw value: `#c9190b`
  2. Palette token: `--pf-t--color--red--40`
  3. Base token: `--pf-t--global--color--status--danger--default`
  4. Semantic token: `--pf-v6-c-button--m-danger--BackgroundColor`
- Recommendation: Replace with `var(--pf-v6-c-button--m-danger--BackgroundColor)`
- Example:
  ```css
  /* Before */
  background-color: #c9190b;
  
  /* After */
  background-color: var(--pf-v6-c-button--m-danger--BackgroundColor);
  ```
```

## Migration Path

`pf-raw-colors-scan` should be considered deprecated in favor of `pf-design-token-check`.

**For users:**
- Replace `/pf-raw-colors-scan` with `/pf-design-token-check`
- Get more comprehensive coverage and better recommendations

**For maintainers:**
- Consider adding deprecation notice to `pf-raw-colors-scan`
- Direct users to `pf-design-token-check` for all design token auditing

## When to Use Each

**Use pf-design-token-check:**
- For all new design token auditing
- When you need comprehensive coverage (colors, spacing, typography, shadows)
- When you want specific token recommendations with hierarchy
- When refactoring to PatternFly v6

**Use pf-raw-colors-scan:**
- For legacy compatibility only
- Consider migrating to `pf-design-token-check`

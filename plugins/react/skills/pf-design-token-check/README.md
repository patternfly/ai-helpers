# pf-design-token-check

Detects hardcoded CSS values (colors, spacing, typography, shadows, border radius) that should use PatternFly design tokens. Works across CSS, SCSS, CSS-in-JS, and React inline styles.

## When to Use

- Auditing existing code for design token compliance
- Code review to catch hardcoded values before merge
- Refactoring legacy code to use the PatternFly design system
- Enforcing design system standards in your codebase

## What It Detects

### Colors
- HEX values: `#c9190b`, `#fff`
- RGB/RGBA: `rgb(201, 25, 11)`, `rgba(0, 0, 0, 0.5)`
- HSL/HSLA: `hsl(4, 88%, 44%)`
- Named colors: `red`, `white`, `black`, `transparent`

### Spacing
- Margins, padding, gaps, insets
- Pixel, rem, and em values: `16px`, `1rem`, `0.5em`

### Typography
- Font sizes: `24px`, `1.5rem`
- Font weights: `600`, `bold`
- Line heights: `1.5`, `24px`
- Font families: hardcoded font stacks

### Shadows
- Box shadows: `0 4px 8px rgba(0,0,0,0.1)`
- Text shadows

### Border Radius
- Pixel and percentage values: `4px`, `50%`

## How It Works

The skill follows the PatternFly token hierarchy and uses category-appropriate token types:

1. **Raw Value** → Detects the hardcoded value
2. **Token Category** → Determines the correct token type based on CSS property
3. **Base Token** → Finds the appropriate category token (e.g., `--spacer`, `--motion`, `--color`)
4. **Semantic Token** → Recommends component-specific token (e.g., `--pf-v6-c-button--m-danger--BackgroundColor`)

**The skill always recommends semantic tokens when they exist.** If a semantic token doesn't exist, it suggests creating one with proper naming conventions.

### Token Category Mapping

The skill uses property-specific token categories:

- **Spacing** (padding, margin, gap, insets, outline-offset) → `--spacer` tokens
- **Typography** (font-size, font-weight, line-height) → `--font` tokens
- **Motion** (animation, transition, transform) → `--motion` tokens
- **Icons** (icon width/height/font-size) → `--icon` tokens
- **Colors** (color, background-color, border-color) → `--color` tokens
- **Borders** (border-width, border-radius) → `--border` tokens
- **Shadows** (box-shadow, text-shadow) → `--shadow` tokens
- **Z-index** (z-index) → `--z-index` tokens

## Usage

### Scan a Single File

```bash
/pf-design-token-check src/components/Button/Button.scss
```

### Scan Multiple Files

```bash
/pf-design-token-check src/components/**/*.scss
```

### Scan React Components

```bash
/pf-design-token-check src/components/Card.tsx
```

### Example Output

```
## Design Token Violations Found: 3

### 1. Button.scss

- **File Path:** `src/components/Button/Button.scss`
- **Line Number:** `42`
- **Property:** `background-color`
- **Raw Value:** `#c9190b`
- **Token Hierarchy:**
  1. Raw value: `#c9190b`
  2. Palette token: `--pf-t--color--red--40`
  3. Base token: `--pf-t--global--color--status--danger--default`
  4. Semantic token: `--pf-v6-c-button--m-danger--BackgroundColor`
- **Recommendation:** Replace with `var(--pf-v6-c-button--m-danger--BackgroundColor)`
- **Example:**
  ```css
  /* Before */
  background-color: #c9190b;
  
  /* After */
  background-color: var(--pf-v6-c-button--m-danger--BackgroundColor);
  ```

## Summary
- Total violations: 3
- Colors: 1
- Spacing: 1
- Typography: 1
```

## Token Naming Conventions

When suggesting new semantic tokens, the skill follows PatternFly conventions:

```
--pf-v6-c-{component}[--m-{modifier}]__{element}--{property}
```

**Examples:**
- `--pf-v6-c-nav--m-docked__link--PaddingInlineStart`
- `--pf-v6-c-button--m-primary--BackgroundColor`
- `--pf-v6-c-card--BoxShadow`

## What It Ignores

- Values already using design tokens: `var(--pf-v6-...)`
- Token definitions in PatternFly source files
- Calc expressions using tokens: `calc(var(--pf-...) + 8px)`
- Values in comments
- Test files and mock data (unless explicitly requested)

## Related Skills

- `pf-raw-colors-scan` - Color-only scanning (legacy, use this skill instead)
- `pf-token-auditor` - Audit Figma designs against PF6 token architecture
- `pf-compliance-checker` - Check Figma designs for PF6 standards

## References

- [PatternFly Design Tokens Documentation](https://www.patternfly.org/tokens)
- [Issue #101: Create pf-design-token-check skill](https://github.com/patternfly/ai-helpers/issues/101)

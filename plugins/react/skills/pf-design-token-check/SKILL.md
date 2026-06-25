---
name: pf-design-token-check
description: Detect hardcoded color, spacing, typography, and shadow values that have PF token equivalents and suggest the correct design token replacements. Works on CSS, SCSS, CSS-in-JS, and inline styles. Use when auditing stylesheets for hardcoded values, enforcing design token compliance, or refactoring styles to use PatternFly tokens.
---

### Objective
Analyze the provided code to find any raw values (colors, spacing, typography, shadows, etc.) assigned to styling properties. Flag these values as technical debt and suggest their replacement with PatternFly design tokens, following the token hierarchy: Raw value → Palette token → Base Token → Semantic Token. **Always recommend semantic tokens when they exist.**

### Token Hierarchy Priority
When suggesting token replacements, follow this priority order:
1. **Semantic Token** (PREFERRED): Component or context-specific tokens (e.g., `--pf-v6-c-button--BackgroundColor`)
2. **Base Token**: Generic design system tokens (e.g., `--pf-t--global--color--brand--default`)
3. **Palette Token**: Only if no semantic or base token exists (e.g., `--pf-t--color--blue--40`)
4. **Raw Value**: If no token exists, keep the raw value and suggest creating a semantic token

### Scanning Logic

#### 1. Color Detection
**Regex Pattern Match:** Identify values matching:
- HEX values, RGBA or RGB values, HSLA or HSL values

**Named Colors (X11 List):**
- Flag all 148 CSS standard named colors (e.g., 'aliceblue' through 'yellowgreen')
- Common values: 'white', 'black', 'red', 'blue', 'transparent', 'currentColor'

**Property Filter:** Only flag these values if assigned to CSS color properties:
- `color`, `background-color`, `background`, `border-color`, `border`, `border-top-color`, `border-right-color`, `border-bottom-color`, `border-left-color`, `outline-color`, `box-shadow`, `text-shadow`, `fill`, `stroke`

#### 2. Spacing Detection
**Pattern Match:** Identify values for spacing properties:
- `px`, `rem`, `em`, `pt`, `vw`, `dvw`, `vh`, `dvh`

**Property Filter:** Only flag these values if assigned to spacing properties:
- `margin`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left`, `margin-inline`, `margin-inline-start`, `margin-inline-end`, `margin-block`, `margin-block-start`, `margin-block-end`
- `padding`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`, `padding-inline`, `padding-inline-start`, `padding-inline-end`, `padding-block`, `padding-block-start`, `padding-block-end`
- `gap`, `column-gap`, `row-gap`
- `inset`, `inset-inline`, `inset-inline-start`, `inset-inline-end`, `inset-block`, `inset-block-start`, `inset-block-end`
- `top`, `right`, `bottom`, `left`

#### 3. Typography Detection
**Font Size Pattern Match:**
- `px`, `rem`, `em`, `pt`, `vw`, `dvw`, `vh`, `dvh`, `ch` in `font-size`

**Font Weight Pattern Match:**
- Numeric: `100`, `200`,  `300`, `400`, `500`, `600`, `700`, `800`, `900` in `font-weight`
- Named: `normal`, `bold`, `bolder`, `lighter` in `font-weight`

**Line Height Pattern Match:**
- Unitless numbers in `line-height`
- Pixels/rems: same as font-size patterns in `line-height`

**Font Family Pattern Match:**
- Hardcoded font stacks in `font-family`

**Property Filter:**
- `font-size`, `font-weight`, `line-height`, `font-family`, `letter-spacing`

#### 4. Shadow Detection
**Box Shadow Pattern Match:**
- Multiple shadow values separated by commas

**Text Shadow Pattern Match:**
- Same as box-shadow patterns

**Property Filter:**
- `box-shadow`, `text-shadow`

#### 5. Border Radius Detection
**Pattern Match:**
- `px`, `%`, `rem`, `em`

**Property Filter:**
- `border-radius`, `border-top-left-radius`, `border-top-right-radius`, `border-bottom-left-radius`, `border-bottom-right-radius`

### File Type Support

#### HTML Inline Styles
- HTML inline property: `<div style="property: 'value'">`

#### CSS/SCSS Files
- Standard property declarations: `property: value;`
- SCSS variables: `$variable: value;` (flag if not already a token reference)
- CSS custom properties: `--custom-prop: value;` (flag if not PF token)

#### CSS-in-JS (JavaScript/TypeScript)
- Object notation: `{ property: 'value' }`
- Template literals with CSS: `` `property: value;` ``
- styled-components, emotion, etc.

#### React Inline Styles
- JSX style prop: `<div style={{ property: 'value' }}>`
- Style object definitions: `const styles = { property: 'value' }`

### Exception Handling
**Do NOT flag:**
1. Values already using design tokens (e.g., `var(--pf-v6-...)`)
2. CSS custom property definitions within PatternFly token files (e.g., files in `patternfly/base/tokens/`)
3. Values in comments
4. Values in test files or mock data (unless explicitly requested)

### Token Matching Process

#### Step 1: Check Working File for Existing Tokens
Before searching PatternFly token files, check if the current file already has a matching token defined or imported.

#### Step 2: Search PatternFly Token Files
Look in `patternfly/base/tokens/` directory, in the node_modules/@patternfly/patternfly/base/tokens directory, or any additional tokens folder present in the users working directories:
- `tokens-default.scss` - Default token definitions
- `tokens-dark.scss` - Dark theme tokens
- `tokens-felt.scss` - Felt token definitions
- `tokens-felt-dark.scss` - Felt Dark token definitions
- `tokens-felt-glass-dark.scss` - Felt Glass Dark theme tokens
- `tokens-felt-glass.scss` - Felt Glass theme tokens
- `tokens-felt-highcontrast-dark.scss` - Felt High Contrast Dark theme tokens
- `tokens-felt-highcontrast.scss` - Felt High Contrast tokens
- `tokens-glass.scss` - Glass theme tokens
- `tokens-glass-dark.scss` - Glass Dark theme tokens
- `tokens-highcontrast-dark.scss` - High Contrast Dark theme tokens
- `tokens-highcontrast.scss` - High Contrast theme tokens
- Component-specific token files

#### Step 2.5: Token Category Mapping
When searching for tokens, use the appropriate token category based on the CSS property. PatternFly uses specific token naming patterns for different property types:

**Spacing Properties** → Use `--spacer` tokens:
- Properties: `padding`, `padding-*`, `margin`, `margin-*`, `gap`, `column-gap`, `row-gap`, `inset`, `inset-*`, `top`, `right`, `bottom`, `left`, `outline-offset`
- Token pattern: `--pf-t--global--spacer--{size}` or `--pf-v6-c-{component}--{property}` referencing spacer tokens
- Examples: `--pf-t--global--spacer--md`, `--pf-t--global--spacer--lg`, `--pf-v6-c-button--PaddingInline`

**Text/Typography Properties** → Use `--text` or `--font` tokens:
- Properties: `font-size`, `font-weight`, `line-height`, `letter-spacing`, `font-family`
- Token patterns:
  - Font size: `--pf-t--global--font--size--{scale}`
  - Font weight: `--pf-t--global--font--weight--{weight}`
  - Line height: `--pf-t--global--font--line-height--{scale}`
  - Font family: `--pf-t--global--font--family--{type}`
- Examples: `--pf-t--global--font--size--body--default`, `--pf-t--global--font--weight--bold`

**Motion/Animation Properties** → Use `--motion` tokens:
- Properties: `animation`, `animation-duration`, `animation-timing-function`, `transition`, `transition-duration`, `transition-timing-function`, `transform`
- Token pattern: `--pf-t--global--motion--{property}`
- Examples: `--pf-t--global--motion--duration--default`, `--pf-t--global--motion--timing-function--ease-in`

**Icon Properties** → Use `--icon` tokens:
- Properties: `width`, `height` (when applied to icon elements), `font-size` (for icon fonts)
- Token pattern: `--pf-t--global--icon--size--{scale}` or `--pf-v6-c-{component}__icon--FontSize`
- Examples: `--pf-t--global--icon--size--md`, `--pf-v6-c-button__icon--FontSize`

**Color Properties** → Use `--color` tokens:
- Properties: `color`, `background-color`, `border-color`, `fill`, `stroke`, `outline-color`
- Token patterns:
  - Palette: `--pf-t--color--{color}--{shade}`
  - Base: `--pf-t--global--color--{context}--{variant}`
  - Semantic: `--pf-v6-c-{component}--{property}`
- Examples: `--pf-t--global--color--brand--default`, `--pf-v6-c-button--BackgroundColor`

**Border/Shape Properties** → Use `--border` tokens:
- Properties: `border-width`, `border-radius`, `border-style`
- Token patterns:
  - Border width: `--pf-t--global--border--width--{scale}`
  - Border radius: `--pf-t--global--border--radius--{scale}`
- Examples: `--pf-t--global--border--width--default`, `--pf-t--global--border--radius--medium`

**Shadow Properties** → Use `--shadow` or `--box-shadow` tokens:
- Properties: `box-shadow`, `text-shadow`
- Token pattern: `--pf-t--global--shadow--{scale}` or `--pf-v6-c-{component}--BoxShadow`
- Examples: `--pf-t--global--shadow--sm`, `--pf-v6-c-card--BoxShadow`

**Z-index Properties** → Use `--z-index` tokens:
- Properties: `z-index`
- Token pattern: `--pf-t--global--z-index--{layer}`
- Examples: `--pf-t--global--z-index--modal`, `--pf-t--global--z-index--tooltip`

**Important:** When recommending tokens, always use the category-appropriate token type. For example:
- ❌ Don't suggest a generic spacing value for padding
- ✅ Do suggest a `--spacer` token for padding
- ❌ Don't suggest a color token for animation timing
- ✅ Do suggest a `--motion` token for animation timing

#### Step 3: Follow Token Chain
Work through the hierarchy to find the semantic token:
1. Match the raw value to a palette token (e.g., `#c9190b` → `--pf-t--color--red--40`)
2. Find base tokens that reference the palette token (e.g., `--pf-t--global--color--status--danger--default`)
3. Find semantic tokens that reference the base token (e.g., `--pf-v6-c-button--m-danger--BackgroundColor`)

#### Step 4: Recommend Semantic Token
If a semantic token exists for the component and context, recommend it. If no semantic token exists but the property and value match a common pattern, suggest a semantic token name following PatternFly conventions:

**Semantic Token Naming Pattern:**
```
--pf-v6-c-{component}[--m-{modifier}]__{element}--{property}
```

**Examples:**
- `--pf-v6-c-nav--m-docked__link--PaddingInlineStart` (nav component, docked modifier, link element, padding-inline-start property)
- `--pf-v6-c-button--m-primary--BackgroundColor` (button component, primary modifier, background-color property)
- `--pf-v6-c-card--BoxShadow` (card component, box-shadow property)

### Output Format

For every violation found, provide:

**Header:**
```
## Design Token Violations Found: {count}
```

**Per Violation:**
```
### {n}. {File Name}

- **File Path:** `{path}`
- **Line Number:** `{number}`
- **Property:** `{css-property}`
- **Raw Value:** `{detected-value}`
- **Token Hierarchy:**
  1. Raw value: `{value}`
  2. Palette token: `{--pf-t--color--blue--40}` (if found)
  3. Base token: `{--pf-t--global--color--brand--default}` (if found)
  4. Semantic token: `{--pf-v6-c-component--Property}` (if found)
- **Recommendation:** Replace with `var({semantic-token})` {or} Create semantic token `{suggested-name}` that references `{base-token}`
- **Example:**
  ```css
  /* Before */
  {property}: {raw-value};
  
  /* After */
  {property}: var({semantic-token});
  ```
```

**Summary:**
```
## Summary
- Total violations: {count}
- Colors: {count}
- Spacing: {count}
- Typography: {count}
- Shadows: {count}
- Border radius: {count}

## Next Steps
1. Replace raw values with recommended semantic tokens
2. If semantic tokens don't exist, create them in the appropriate component SCSS file
3. Follow PatternFly token naming conventions for new tokens
```

### Example Violations

**Color Example:**
```css
/* Violation */
.pf-c-button--m-danger {
  background-color: #c9190b;
}

/* Token Hierarchy */
1. Raw: #c9190b
2. Palette: --pf-t--color--red--40
3. Base: --pf-t--global--color--status--danger--default
4. Semantic: --pf-v6-c-button--m-danger--BackgroundColor

/* Recommendation */
.pf-c-button--m-danger {
  background-color: var(--pf-v6-c-button--m-danger--BackgroundColor);
}
```

**Spacing Example:**
```css
/* Violation */
.pf-c-nav--m-docked .pf-c-nav__link {
  padding-inline-start: 16px;
}

/* Token Hierarchy */
1. Raw: 16px
2. Base: --pf-t--global--spacer--md (16px)
3. Semantic: --pf-v6-c-nav--m-docked__link--PaddingInlineStart (--pf-t--global--spacer--md)

/* Recommendation */
.pf-c-nav--m-docked .pf-c-nav__link {
  padding-inline-start: var(--pf-v6-c-nav--m-docked__link--PaddingInlineStart);
}

/* If semantic token doesn't exist, suggest: */
/* Create token in nav.scss: */
--pf-v6-c-nav--m-docked__link--PaddingInlineStart: var(--pf-t--global--spacer--md);
```

**Typography Example:**
```css
/* Violation */
.pf-c-title {
  font-size: 24px;
  font-weight: 600;
}

/* Token Hierarchy */
1. Raw font-size: 24px → --pf-t--global--font--size--heading--h3
2. Raw font-weight: 600 → --pf-t--global--font--weight--semibold

/* Recommendation */
.pf-c-title {
  font-size: var(--pf-t--global--font--size--heading--h3);
  font-weight: var(--pf-t--global--font--weight--semibold);
}
```

**Motion Example:**
```css
/* Violation */
.pf-c-modal {
  transition: opacity 200ms ease-in;
  animation-duration: 300ms;
}

/* Token Hierarchy */
1. Raw transition-duration: 200ms → --pf-t--global--motion--duration--default
2. Raw timing-function: ease-in → --pf-t--global--motion--timing-function--ease-in
3. Raw animation-duration: 300ms → --pf-t--global--motion--duration--long

/* Recommendation */
.pf-c-modal {
  transition: opacity var(--pf-t--global--motion--duration--default) var(--pf-t--global--motion--timing-function--ease-in);
  animation-duration: var(--pf-t--global--motion--duration--long);
}
```

**Icon Size Example:**
```css
/* Violation */
.pf-c-button__icon {
  font-size: 16px;
  width: 16px;
  height: 16px;
}

/* Token Hierarchy */
1. Raw: 16px → --pf-t--global--icon--size--md
2. Semantic: --pf-v6-c-button__icon--FontSize

/* Recommendation */
.pf-c-button__icon {
  font-size: var(--pf-v6-c-button__icon--FontSize);
  width: var(--pf-v6-c-button__icon--FontSize);
  height: var(--pf-v6-c-button__icon--FontSize);
}
```

**Border Radius Example:**
```css
/* Violation */
.pf-c-card {
  border-radius: 8px;
}

/* Token Hierarchy */
1. Raw: 8px → --pf-t--global--border--radius--medium
2. Semantic: --pf-v6-c-card--BorderRadius

/* Recommendation */
.pf-c-card {
  border-radius: var(--pf-v6-c-card--BorderRadius);
}
```

**Shadow Example:**
```css
/* Violation */
.pf-c-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Token Hierarchy */
1. Raw: 0 4px 8px rgba(0, 0, 0, 0.15) → --pf-t--global--shadow--md
2. Semantic: --pf-v6-c-card--BoxShadow

/* Recommendation */
.pf-c-card {
  box-shadow: var(--pf-v6-c-card--BoxShadow);
}
```

**Outline Offset Example (uses --spacer):**
```css
/* Violation */
.pf-c-button:focus {
  outline-offset: 4px;
}

/* Token Hierarchy */
1. Raw: 4px → --pf-t--global--spacer--xs
2. Semantic: --pf-v6-c-button--focus--OutlineOffset

/* Recommendation */
.pf-c-button:focus {
  outline-offset: var(--pf-v6-c-button--focus--OutlineOffset);
}

/* Note: outline-offset uses --spacer tokens, not border tokens */
```

### Workflow
1. Scan the provided file(s) for raw values across all categories
2. For each violation, determine the token hierarchy
3. Search for existing semantic tokens in PatternFly
4. If semantic token exists, recommend it
5. If semantic token doesn't exist, suggest creating one with proper naming
6. Provide clear before/after examples
7. Summarize findings by category

# pf-design-token-check

Detect hardcoded CSS values (colors, spacing, typography, shadows, border radius) and suggest PatternFly design token replacements. Works across CSS, SCSS, CSS-in-JS, and React inline styles.

## Documentation

- **[SKILL.md](SKILL.md)** - Complete skill instructions, scanning logic, and token hierarchy
- **[reference/comparison.md](reference/comparison.md)** - Comparison with pf-raw-colors-scan
- **[reference/example-violations.md](reference/example-violations.md)** - Example violations and token replacement patterns

## Quick Start

```bash
# Scan a single file
/pf-design-token-check src/components/Button/Button.scss

# Scan multiple files
/pf-design-token-check src/components/**/*.scss

# Scan React components
/pf-design-token-check src/components/Card.tsx
```

## What It Detects

- **Colors**: HEX, RGB/RGBA, HSL/HSLA, named colors
- **Spacing**: margins, padding, gaps, insets (px, rem, em)
- **Typography**: font sizes, weights, line heights, font families
- **Shadows**: box shadows, text shadows
- **Border radius**: pixel and percentage values

The skill follows the PatternFly token hierarchy (Raw → Palette → Base → Semantic) and **always recommends semantic tokens when they exist**.

## Output

For each violation, the skill provides:
- File path and line number
- Full token hierarchy
- Specific semantic token recommendation
- Before/after code example

See [SKILL.md](SKILL.md) for complete documentation.

## Related Skills

- `pf-raw-colors-scan` - Color-only scanning with simpler output
- `pf-token-auditor` - Audit Figma designs against PF6 token architecture
- `pf-compliance-checker` - Check Figma designs for PF6 standards

## References

- [PatternFly Design Tokens Documentation](https://www.patternfly.org/tokens)
- [Issue #101: Create pf-design-token-check skill](https://github.com/patternfly/ai-helpers/issues/101)

# Design Foundations Plugin

Design foundation reference and auditing — tokens, icons, colors, spacing — for PatternFly applications. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install design-foundations@ai-helpers
```

For enhanced results, also install the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp).

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

Skills for working with design system foundations:

- Scanning for raw color values missing a design token mapping
- Auditing design token usage and CSS variable patterns
- Building and copying design tokens for PatternFly core
- Finding icons from the Red Hat Design System

Browse `skills/` for available skills (invoked as `/design-foundations:<skill-name>`).

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Design Foundations](https://www.patternfly.org/design-foundations)

## License

MIT
